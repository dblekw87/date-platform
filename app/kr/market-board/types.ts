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

/**
 * How an event reaches this stock — the part that makes it this stock's reason
 * rather than somebody else's news.
 *
 * "전방 수요" is the one worth spelling out: the event happened to a company
 * upstream of this one, so the stock is downstream of a reason it did not
 * cause. 엔비디아 실적 is 심텍's reason by that path and nobody else's by name.
 */
export type ReasonPath = "공시" | "보유 지분" | "산업 뉴스" | "시장 국면" | "전방 수요" | "종목 뉴스";

/**
 * One reason a leader rose, with the evidence standing behind it.
 *
 * `confidence` is how much evidence there is, not a probability that the stock
 * keeps rising. A filing the company made itself outranks a headline that
 * merely mentioned its industry, and the number says so.
 */
export type DayLeaderReasonDto = {
  id: string;
  confidence: number;
  /** Measured figures and quoted headlines — never an inferred sentence. */
  evidence: string[];
  kind: CatalystKind;
  originalUrl?: string;
  path: ReasonPath;
  publishedAt?: string;
  title: string;
};

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
  /**
   * Ranked reasons, strongest evidence first, at most three. Empty when nothing
   * cleared the evidence floor — which is shown as 이유 미확인 rather than
   * filled with the best of a bad set. Domestic leaders only for now: the
   * ownership graph and the KOSPI regime check are both domestic.
   */
  reasons?: DayLeaderReasonDto[];
  caution: string;
  timestamp: string;
  source: SourceProvider;
};

/**
 * A US stock that could run tomorrow, carrying the rate it was ranked by.
 *
 * Distinct from DayLeaderDto in tense. A leader is a stock the day's money has
 * already gone to; a candidate has not moved yet, and the only thing that can
 * be said about it is how often stocks in its condition have moved. Which is
 * why the probability is part of the type rather than a footnote — a row of
 * small caps with no number beside it reads as a recommendation.
 */
/** The SEC filing a candidate is standing on, when there is one. */
export type SurgeCatalystDto = {
  formType: string;
  label: string;
  /** Sessions between the filing and the close the candidate was scored on. */
  daysAgo: number;
};

export type SurgeCandidateDto = {
  id: string;
  symbol: string;
  name: string;
  market: "US";
  /** Session the figures are measured from — always before the one predicted. */
  asOf: string;
  horizonDays: number;
  price: string;
  /** 대기 has not moved in over a week; 이미 급등 ran within it and may continue. */
  stage: "대기" | "이미 급등";
  /** Null for half of them — most surges have no filing behind them at all. */
  catalyst: SurgeCatalystDto | null;
  /** Sessions since this stock last ran. Null when it never has. */
  daysSinceLastRun: number | null;
  /** Measured frequency for this stock's bucket, 0 to 1. */
  probability: number;
  probabilityLabel: string;
  marketCapValue: number;
  /** Day's volume divided by shares outstanding. 1 means the share count turned over once. */
  turnoverValue: number;
  evidence: string[];
  caution: string;
};

/**
 * A watched stock moving outside the regular session.
 *
 * The board's other US figures are all closing prices. This one is live, and it
 * exists because 72% of surges are already up more than 50% before the US open —
 * by the time a Seoul reader sees a list built from the close, the move it was
 * predicting has usually started.
 */
export type PremarketMoverDto = {
  id: string;
  symbol: string;
  name: string;
  /** Which extended session this reading came from. */
  phase: "pre" | "regular" | "post";
  phaseLabel: string;
  previousClose: number;
  last: number;
  high: number;
  /** Move to the session high, against yesterday's close. */
  highRate: number;
  changeRate: number;
  /** What the candidate list scored it at before it moved. Null if it dropped off. */
  probability: number | null;
};

/** One stock that could follow the leader of its theme. */
export type PairCandidateDto = {
  changeRateValue: number;
  /**
   * Whether this name is also in the 주도주 list. Mostly false, and that is the
   * point: a follower is smaller than what it follows, so it rarely makes a
   * turnover ranking at all.
   */
  inLeaderBoard: boolean;
  name: string;
  symbol: string;
  turnover: string;
};

/**
 * 짝꿍매매 — a theme's leader and the stocks that have not moved with it yet.
 *
 * Grouped by theme rather than by leader because that is the unit the trade is
 * read in: 반도체 is moving, and here is what is still behind it. The 주도주
 * list answers a different question (where did the money go) and repeats a
 * theme whenever two of its names lead.
 */
export type PairTradeDto = {
  id: string;
  candidates: PairCandidateDto[];
  leader: {
    changeRateValue: number;
    name: string;
    symbol: string;
    turnover: string;
  };
  /**
   * How far the best follower still is from the leader, in percentage points.
   * This is the room left in the trade; negative means the follower already ran
   * harder than the leader did, which is the same theme read too late.
   */
  leadGap: number;
  market: "KR";
  theme: string;
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
  krPairTrades: PairTradeDto[];
  usSurgeCandidates: SurgeCandidateDto[];
  usPremarketMovers: PremarketMoverDto[];
  smallCapScanner: ReactionCandidateDto[];
};
