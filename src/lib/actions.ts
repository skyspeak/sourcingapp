"use server";

import path from "path";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  addShareLink,
  attachDeck,
  createDeal,
  createShareToken,
  getDealById,
  getShareLinkByToken,
  sanitizeFilename,
  updateDeal,
} from "./data";
import { createFounder } from "./founders";
import type { DealInput, FounderInput } from "./types";

function getText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function parseList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseNumber(value: string): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildDealInput(formData: FormData): DealInput {
  return {
    name: getText(formData, "name"),
    companyLink: getText(formData, "companyLink") || undefined,
    tldr: getText(formData, "tldr") || undefined,
    space: getText(formData, "space"),
    stage: getText(formData, "stage"),
    summary: getText(formData, "summary"),
    location: getText(formData, "location"),
    fundraisingTarget: getText(formData, "fundraisingTarget"),
    pastRaise: getText(formData, "pastRaise") || undefined,
    pastValuation: getText(formData, "pastValuation") || undefined,
    expectedValuation: getText(formData, "expectedValuation") || undefined,
    tentativeTimeline: getText(formData, "tentativeTimeline") || undefined,
    useOfFunds: getText(formData, "useOfFunds"),
    traction: {
      dealsSoldMonthly: parseNumber(getText(formData, "dealsSoldMonthly")),
      commitmentsMonthly: parseNumber(getText(formData, "commitmentsMonthly")),
      notes: getText(formData, "tractionNotes"),
    },
    founders: parseList(getText(formData, "founders")),
    accomplishments: parseList(getText(formData, "accomplishments")),
    team: parseList(getText(formData, "team")),
    customers: parseList(getText(formData, "customers")),
    comps: parseList(getText(formData, "comps")),
  };
}

export async function createDealAction(formData: FormData): Promise<void> {
  const input = buildDealInput(formData);
  const deal = await createDeal(input);
  redirect(`/deals/${deal.id}`);
}

export async function updateDealAction(
  id: string,
  formData: FormData
): Promise<void> {
  const input = buildDealInput(formData);
  const updated = await updateDeal(id, input);
  if (!updated) {
    redirect("/deals");
  }
  redirect(`/deals/${id}`);
}

export async function uploadDeckAction(id: string, formData: FormData): Promise<void> {
  const deal = await getDealById(id);
  if (!deal) {
    redirect("/deals");
  }

  const externalUrl = getText(formData, "externalUrl");
  const file = formData.get("deckFile");

  let deck = deal.deck;
  if (externalUrl) {
    deck = {
      externalUrl,
      uploadedAt: new Date().toISOString(),
    };
  } else if (file instanceof File && file.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "decks");
    await fs.mkdir(uploadDir, { recursive: true });
    const safeName = sanitizeFilename(file.name);
    const fileName = `${deal.id}-${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    deck = {
      fileName: file.name,
      filePath: `/decks/${fileName}`,
      uploadedAt: new Date().toISOString(),
    };
  }

  if (deck) {
    await attachDeck(id, deck);
  }

  redirect(`/deals/${id}`);
}

export async function createShareLinkAction(
  id: string,
  formData: FormData
): Promise<void> {
  const password = getText(formData, "password");
  const emailGateRequired = getText(formData, "emailGateRequired") === "on";
  const token = createShareToken();

  await addShareLink(id, {
    token,
    password: password || undefined,
    emailGateRequired,
  });

  redirect(`/deals/${id}`);
}

export async function verifyShareAccessAction(
  token: string,
  formData: FormData
): Promise<void> {
  const email = getText(formData, "email");
  const password = getText(formData, "password");

  const accessCookie = `share_access_${token}`;
  const shareData = await getShareLinkByToken(token);
  if (!shareData) {
    redirect(`/share/${token}?error=not-found`);
  }

  if (shareData.shareLink.emailGateRequired && !email) {
    redirect(`/share/${token}?error=missing-email`);
  }

  if (shareData.shareLink.password && shareData.shareLink.password !== password) {
    redirect(`/share/${token}?error=wrong-password`);
  }

  const cookieStore = await cookies();
  cookieStore.set(accessCookie, email || "viewer", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  redirect(`/share/${token}`);
}

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "sourcing-admin";

export async function loginAdminAction(formData: FormData): Promise<void> {
  const password = getText(formData, "password");
  const next = getText(formData, "next") || "/admin";

  if (password !== ADMIN_SECRET) {
    redirect(`/admin?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_access", "true", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
  });

  redirect(next);
}

export async function createFounderAction(formData: FormData): Promise<void> {
  const input: FounderInput = {
    name: getText(formData, "name"),
    title: getText(formData, "title"),
    bio: getText(formData, "bio"),
    accomplishments: parseList(getText(formData, "accomplishments")),
    linkedin: getText(formData, "linkedin") || undefined,
  };

  const founder = await createFounder(input);
  redirect(`/founders/${founder.id}`);
}

export async function bulkUploadDealsAction(
  csvContent: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  const Papa = (await import("papaparse")).default;
  const { csvRowToDealInput } = await import("./csv-parser");

  const result = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  let successCount = 0;
  let failedCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < result.data.length; i++) {
    const row = result.data[i];
    const rowNum = i + 2; // +2 for header row and 1-based indexing

    try {
      const dealInput = csvRowToDealInput(row as any);
      if (!dealInput) {
        errors.push(`Row ${rowNum}: Missing required fields`);
        failedCount++;
        continue;
      }

      await createDeal(dealInput);
      successCount++;
    } catch (error) {
      errors.push(`Row ${rowNum}: ${error instanceof Error ? error.message : "Unknown error"}`);
      failedCount++;
    }
  }

  return { success: successCount, failed: failedCount, errors };
}
