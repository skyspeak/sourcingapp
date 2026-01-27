export type ShareLink = {
  token: string;
  password?: string;
  emailGateRequired: boolean;
  createdAt: string;
};

export type Deck = {
  fileName?: string;
  filePath?: string;
  externalUrl?: string;
  uploadedAt: string;
};

export type Deal = {
  id: string;
  name: string;
  space: string;
  stage: string;
  summary: string;
  location: string;
  fundraisingTarget: string;
  useOfFunds: string;
  traction: {
    dealsSoldMonthly?: number | null;
    commitmentsMonthly?: number | null;
    notes: string;
  };
  founders: string[];
  accomplishments: string[];
  team: string[];
  customers: string[];
  comps: string[];
  deck?: Deck;
  shareLinks: ShareLink[];
  createdAt: string;
  updatedAt: string;
};

export type DealInput = Omit<
  Deal,
  "id" | "createdAt" | "updatedAt" | "shareLinks" | "deck"
> & {
  shareLinks?: ShareLink[];
  deck?: Deck;
};

export type DealUpdate = Partial<DealInput>;

export type Founder = {
  id: string;
  name: string;
  title: string;
  bio: string;
  accomplishments: string[];
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
};

export type FounderInput = Omit<Founder, "id" | "createdAt" | "updatedAt">;
