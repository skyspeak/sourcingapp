("use server");

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
import type { DealInput } from "./types";

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
    space: getText(formData, "space"),
    stage: getText(formData, "stage"),
    summary: getText(formData, "summary"),
    location: getText(formData, "location"),
    fundraisingTarget: getText(formData, "fundraisingTarget"),
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

  cookies().set(accessCookie, email || "viewer", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  redirect(`/share/${token}`);
}
