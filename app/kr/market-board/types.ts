export type MarketBoardTabId = "market" | "news" | "calendar" | "breaking" | "flow";

export type RegionCode = "US" | "KR" | "GLOBAL" | "CRYPTO";

export type SourceProvider = "mock" | "toss" | "kis" | "krx" | "dart" | "sec" | "news" | "market";

export type Tone = "up" | "down" | "flat";

export type MarketBoardTab = {
  id: MarketBoardTabId;
  label: string;
  description: string;
};

export type MarketSnapshotDto = {
  id: string;
  label: string;
  market: RegionCode;
  instrumentType: "index" | "future" | "rate" | "fx" | "commodity" | "crypto";
  symbol: string;
  value: string;
  change?: string;
  changeRate?: string;
  tone: Tone;
  note: string;
  timestamp: string;
  source: SourceProvider;
};

export type MarketBriefDto = {
  id: string;
  region: string;
  title: string;
  points: string[];
  source: SourceProvider;
  timestamp: string;
};

export type NewsHeadlineDto = {
  id: string;
  time: string;
  source: string;
  region: "US" | "KR" | "GLOBAL";
  publishedAt: string;
  originalUrl: string;
  label: string;
  text: string;
  originalText?: string;
  provider: SourceProvider;
  isNew?: boolean;
};

export type CalendarEventDto = {
  id: string;
  date: string;
  day: string;
  type: "실적" | "공모주" | "매크로" | "FOMC" | "공시";
  title: string;
  market: "미국" | "국내";
  check: string;
  detail: string;
  source: string;
  originalUrl?: string;
  publishedAt?: string;
};

export type DisclosureRegion = "us" | "kr";

export type DisclosureTab = {
  id: DisclosureRegion;
  label: string;
  description: string;
};

export type DisclosureItemDto = {
  id: string;
  market: "US" | "KR";
  source: "SEC" | "DART" | "KRX" | "FED" | "FDA";
  urgency: string;
  companyName?: string;
  symbol?: string;
  issuerType?: "large-cap" | "small-cap" | "unknown";
  eventType?: string;
  accessionNumber?: string;
  isNew?: boolean;
  formType: string;
  title: string;
  filedAt: string;
  originalUrl: string;
  tags: string[];
  action: string;
};

export type FlowItemDto = {
  id: string;
  label: string;
  status: string;
  detail: string;
  source: SourceProvider;
  timestamp: string;
};

export type LeaderRegion = "us" | "kr";

export type LeaderTab = {
  id: LeaderRegion;
  label: string;
};

export type LeadingStockDto = {
  id: string;
  symbol: string;
  name: string;
  market: "US" | "KR";
  marketLabel: string;
  burst: string;
  turnover: string;
  intraday: string;
  reason: string;
  caution: string;
  timestamp: string;
  source: SourceProvider;
};

export type ReactionCandidateDto = {
  id: string;
  group: string;
  name: string;
  signal: string;
  caution: string;
  source: SourceProvider;
  timestamp: string;
};

export type AdSlotDto = {
  id: "top" | "middle" | "bottom";
  label: string;
  reserved: boolean;
};

export type ProviderStatusDto = {
  id: Exclude<SourceProvider, "mock">;
  label: string;
  status: "ready" | "mock" | "error";
  message: string;
  checkedAt: string;
};

export type MarketBoardData = {
  tabs: MarketBoardTab[];
  disclosureTabs: DisclosureTab[];
  leaderTabs: LeaderTab[];
  adSlots: AdSlotDto[];
  providerStatuses: ProviderStatusDto[];
  macroSnapshot: MarketSnapshotDto[];
  marketBrief: MarketBriefDto[];
  headlineFlow: NewsHeadlineDto[];
  calendarItems: CalendarEventDto[];
  usDisclosures: DisclosureItemDto[];
  krDisclosures: DisclosureItemDto[];
  flowItems: FlowItemDto[];
  usLeadingStocks: LeadingStockDto[];
  krLeadingStocks: LeadingStockDto[];
  smallCapScanner: ReactionCandidateDto[];
};
