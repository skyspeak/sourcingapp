import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { Deal, DealInput, DealUpdate, ShareLink } from "./types";

const dataFilePath = path.join(process.cwd(), "data", "deals.json");

type DealStore = {
  deals: Deal[];
};

const emptyStore: DealStore = { deals: [] };

async function ensureStore(): Promise<void> {
  const dir = path.dirname(dataFilePath);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(emptyStore, null, 2), "utf8");
  }
}

async function readStore(): Promise<DealStore> {
  await ensureStore();
  const raw = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(raw) as DealStore;
}

async function writeStore(store: DealStore): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2), "utf8");
}

export async function getDeals(): Promise<Deal[]> {
  const store = await readStore();
  return store.deals.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getDealById(id: string): Promise<Deal | null> {
  const store = await readStore();
  return store.deals.find((deal) => deal.id === id) ?? null;
}

export async function createDeal(input: DealInput): Promise<Deal> {
  const store = await readStore();
  const now = new Date().toISOString();
  const deal: Deal = {
    ...input,
    id: input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 48) || crypto.randomUUID(),
    shareLinks: input.shareLinks ?? [],
    createdAt: now,
    updatedAt: now,
  };
  store.deals.push(deal);
  await writeStore(store);
  return deal;
}

export async function updateDeal(id: string, input: DealUpdate): Promise<Deal | null> {
  const store = await readStore();
  const index = store.deals.findIndex((deal) => deal.id === id);
  if (index === -1) {
    return null;
  }
  const now = new Date().toISOString();
  const updated: Deal = {
    ...store.deals[index],
    ...input,
    updatedAt: now,
  };
  store.deals[index] = updated;
  await writeStore(store);
  return updated;
}

export async function attachDeck(
  id: string,
  deck: DealInput["deck"]
): Promise<Deal | null> {
  const deal = await getDealById(id);
  if (!deal) {
    return null;
  }
  return updateDeal(id, { deck });
}

export async function addShareLink(
  id: string,
  shareLink: Omit<ShareLink, "createdAt">
): Promise<ShareLink | null> {
  const store = await readStore();
  const deal = store.deals.find((item) => item.id === id);
  if (!deal) {
    return null;
  }
  const newLink: ShareLink = {
    ...shareLink,
    createdAt: new Date().toISOString(),
  };
  deal.shareLinks = [newLink, ...deal.shareLinks];
  deal.updatedAt = new Date().toISOString();
  await writeStore(store);
  return newLink;
}

export async function getShareLinkByToken(token: string): Promise<{
  deal: Deal;
  shareLink: ShareLink;
} | null> {
  const store = await readStore();
  for (const deal of store.deals) {
    const shareLink = deal.shareLinks.find((link) => link.token === token);
    if (shareLink) {
      return { deal, shareLink };
    }
  }
  return null;
}

export function createShareToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function sanitizeFilename(filename: string): string {
  const base = filename.split("/").pop() ?? "deck";
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}
