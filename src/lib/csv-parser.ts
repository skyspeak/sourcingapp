import type { DealInput } from "./types";

export type CSVRow = {
  name: string;
  space: string;
  stage: string;
  summary: string;
  location: string;
  fundraisingTarget: string;
  useOfFunds: string;
  dealsSoldMonthly?: string;
  commitmentsMonthly?: string;
  tractionNotes: string;
  founders: string;
  accomplishments: string;
  team: string;
  customers: string;
  comps: string;
  deckUrl?: string;
};

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumber(value: string | undefined): number | null {
  if (!value || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function csvRowToDealInput(row: CSVRow): DealInput | null {
  // Validate required fields
  if (!row.name || !row.space || !row.stage || !row.summary || !row.fundraisingTarget) {
    return null;
  }

  const input: DealInput = {
    name: row.name.trim(),
    space: row.space.trim(),
    stage: row.stage.trim(),
    summary: row.summary.trim(),
    location: row.location?.trim() || "",
    fundraisingTarget: row.fundraisingTarget.trim(),
    useOfFunds: row.useOfFunds?.trim() || "",
    traction: {
      dealsSoldMonthly: parseNumber(row.dealsSoldMonthly),
      commitmentsMonthly: parseNumber(row.commitmentsMonthly),
      notes: row.tractionNotes?.trim() || "",
    },
    founders: parseList(row.founders),
    accomplishments: parseList(row.accomplishments),
    team: parseList(row.team),
    customers: parseList(row.customers),
    comps: parseList(row.comps),
  };

  // Add deck if URL provided
  if (row.deckUrl && row.deckUrl.trim()) {
    input.deck = {
      externalUrl: row.deckUrl.trim(),
      uploadedAt: new Date().toISOString(),
    };
  }

  return input;
}

export function generateSampleCSV(): string {
  const headers = [
    "name",
    "space",
    "stage",
    "summary",
    "location",
    "fundraisingTarget",
    "useOfFunds",
    "dealsSoldMonthly",
    "commitmentsMonthly",
    "tractionNotes",
    "founders",
    "accomplishments",
    "team",
    "customers",
    "comps",
    "deckUrl",
  ];

  const sampleRow = [
    "Aurora Analytics",
    "AI-enabled revenue intelligence for mid-market SaaS",
    "Seed",
    "Turns product usage into forecastable pipeline with automated expansion signals",
    "San Francisco, CA",
    "$2.5M seed round",
    "Scale GTM, expand data integrations, and hire senior engineering",
    "18",
    "12",
    "3 enterprise pilots, 115% net revenue retention, 4 design partners converting",
    "Maya Chen — ex-Stripe PM | Leo Park — ex-Snowflake engineer",
    "YC W23 alumni | Signed LOIs with 4 public SaaS companies",
    "3 engineers | 1 product designer | 1 sales lead",
    "Launchpad CRM | CloudDock | Orbitly",
    "Gong (NASDAQ: GONG) | Clari (private) | Apollo (private)",
    "https://example.com/deck.pdf",
  ];

  return [headers.join(","), sampleRow.join(",")].join("\n");
}
