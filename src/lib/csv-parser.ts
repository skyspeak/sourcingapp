import type { DealInput } from "./types";

export type CSVRow = {
  name: string;
  companyLink?: string;
  tldr?: string;
  space: string;
  stage: string;
  summary: string;
  location: string;
  fundraisingTarget: string;
  pastRaise?: string;
  pastValuation?: string;
  expectedValuation?: string;
  tentativeTimeline?: string;
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
    companyLink: row.companyLink?.trim() || undefined,
    tldr: row.tldr?.trim() || undefined,
    space: row.space.trim(),
    stage: row.stage.trim(),
    summary: row.summary.trim(),
    location: row.location?.trim() || "",
    fundraisingTarget: row.fundraisingTarget.trim(),
    pastRaise: row.pastRaise?.trim() || undefined,
    pastValuation: row.pastValuation?.trim() || undefined,
    expectedValuation: row.expectedValuation?.trim() || undefined,
    tentativeTimeline: row.tentativeTimeline?.trim() || undefined,
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
    "companyLink",
    "tldr",
    "space",
    "stage",
    "summary",
    "location",
    "fundraisingTarget",
    "pastRaise",
    "pastValuation",
    "expectedValuation",
    "tentativeTimeline",
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
    "https://auroraanalytics.com",
    "AI-powered revenue intelligence that predicts expansion opportunities",
    "AI-enabled revenue intelligence for mid-market SaaS",
    "Seed",
    "Turns product usage into forecastable pipeline with automated expansion signals",
    "San Francisco, CA",
    "$2.5M seed round",
    "$500K pre-seed",
    "$2M post-money",
    "$10M post-money",
    "Closing Q2 2026",
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
