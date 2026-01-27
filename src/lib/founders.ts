import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { Founder, FounderInput } from "./types";

const dataFilePath = path.join(process.cwd(), "data", "founders.json");

type FounderStore = {
  founders: Founder[];
};

const emptyStore: FounderStore = { founders: [] };

async function ensureStore(): Promise<void> {
  const dir = path.dirname(dataFilePath);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(emptyStore, null, 2), "utf8");
  }
}

async function readStore(): Promise<FounderStore> {
  await ensureStore();
  const raw = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(raw) as FounderStore;
}

async function writeStore(store: FounderStore): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2), "utf8");
}

export async function getFounders(): Promise<Founder[]> {
  const store = await readStore();
  return store.founders.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getFounderById(id: string): Promise<Founder | null> {
  const store = await readStore();
  return store.founders.find((founder) => founder.id === id) ?? null;
}

export async function createFounder(input: FounderInput): Promise<Founder> {
  const store = await readStore();
  const now = new Date().toISOString();
  const founder: Founder = {
    ...input,
    id:
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 48) || crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  store.founders.push(founder);
  await writeStore(store);
  return founder;
}
