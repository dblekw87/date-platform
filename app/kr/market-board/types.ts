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
  sourceDetail?: string;
  region: "US" | "KR" | "GLOBAL";
  publishedAt: string;
  originalUrl: string;
  label: string;
  text: string;
  originalText?: string;
  relatedSymbols?: string[];
  relatedThemes?: string[];
  provider: SourceProvider;
  isNew?: boolean;
};

export type CalendarEventDto = {
  id: string;
  date: string;
  day: string;
  type: "실적" | "공모주" | "신규상장" | "매크로" | "FOMC" | "공시";
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
  /** Exchange the figures came from. NXT before the KRX bell, KRX after it. */
  venue?: "KRX" | "NXT";
  /** Sector the backend classified this stock into, "미분류" when it could not. */
  theme?: string;
  /** Raw figures behind the formatted strings, for ranking without re-parsing. */
  turnoverValue?: number;
  changeRateValue?: number;
  /**
   * Turnover added since an earlier sample. Absent until the backend has held
   * two samples far enough apart, and on the first refresh of a session.
   */
  recentTurnover?: string;
  recentTurnoverValue?: number;
  recentTurnoverShare?: number;
  recentWindowMinutes?: number;
  burst: string;
  turnover: string;
  intraday: string;
  reason: string;
  caution: string;
  timestamp: string;
  source: SourceProvider;
};

/** Why a stock concentrated, not what it belongs to. */
export type DayLeaderKind = "거래대금 집중" | "거래량 급증" | "순간 쏠림";

/** Whether a 2등주 exists behind this leader. */
export type DayLeaderPairing = "단독 주도" | "테마 주도";

/**
 * Whether the reason belongs to one company or to everyone in its business.
 * 고유 means no 짝꿍 follows from it, however strong the theme looks.
 */
export type CatalystKind = "고유" | "공유";

/** The headline the backend read the leader's reason from. */
export type DayLeaderCatalystDto = {
  /** Set when the reason is a negative one, kept only if nothing better matched. */
  adverse?: boolean;
  kind: CatalystKind;
  label: string;
  headline: string;
  originalUrl: string;
  publishedAt: string;
  source: string;
};

/**
 * A stock the day's money concentrated on, ranked apart from themes.
 * A leader can lead alone; a theme needs several names moving together.
 */
export type DayLeaderDto = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  market: "US" | "KR";
  /** "개별 종목" when the backend found no theme to place it in. */
  theme: string;
  kind: DayLeaderKind;
  pairTrade: DayLeaderPairing;
  /** Other rising stocks in the same theme — the 짝꿍 candidates. */
  peerCount: number;
  /** Share of the leader pool's turnover, 0 to 1. */
  turnoverShare: number;
  recentTurnoverShare: number;
  changeRateValue: number;
  turnover: string;
  intraday: string;
  /** Measured figures behind the ranking, in the order worth checking. */
  evidence: string[];
  /** Absent when no headline explained the move — shown as 이유 미확인. */
  catalyst?: DayLeaderCatalystDto;
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
  usDayLeaders: DayLeaderDto[];
  krDayLeaders: DayLeaderDto[];
  smallCapScanner: ReactionCandidateDto[];
};
