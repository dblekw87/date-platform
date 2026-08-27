export type MarketBoardTabId = "market" | "news" | "calendar" | "breaking" | "flow" | "trade";

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
  issuerType?: "large-cap" | "mid-cap" | "small-cap" | "unknown";
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

/**
 * A stock the exchange has stopped trading.
 *
 * Kept apart from the leader types because a halted stock has no turnover to be
 * ranked by and so appears in no ranking — which is exactly why the board could
 * not show one before. Size is the thing that makes it readable: 한화 at 5.9조
 * halted and 삼부토건 at 797억 halted are not the same event.
 */
export type HaltedStockDto = {
  id: string;
  symbol: string;
  name: string;
  market: string;
  issuerType: "large-cap" | "mid-cap" | "small-cap" | "unknown";
  closePrice: number | null;
  changeRateValue: number | null;
  marketCapValue: number | null;
  turnoverValue: number | null;
  /** The session this state was read on — a halt rarely clears in a day. */
  sessionDate: string;
  /**
   * Why the exchange stopped it, from the halt filing when one has been
   * collected. Absent for the great majority right now: the filings only start
   * accumulating from the day collection began, and most halts predate it.
   *
   * There is deliberately no resume date. No free source publishes one — KIND's
   * halt list carries market, name and reason and no dates at all — and for
   * most halt types it does not exist in advance, since 조회공시요구 lifts when
   * the company answers and 실질심사 when the review ends.
   */
  haltReason?: string | null;
  /** When that filing landed, which is the closest thing to a start date. */
  haltedAt?: string | null;
};

/**
 * 이 종목의 밤을 좌우하는 미국 지표.
 *
 * 나스닥은 시장 전체의 밤이지 이 종목의 밤이 아닙니다. 실측으로 갈라놓은 두 갈래만
 * 값이 붙고 나머지는 null입니다 — 근거 없는 짝을 지어 주느니 말을 안 합니다.
 *
 *   sox  반도체. 2년 500거래일, 하이닉스 상관 SOX 0.42 vs 나스닥 0.36
 *   btc  가상화폐. 상관 0.24에 표본 14일이라 얇습니다
 */
export type NightTriggerDto = {
  id: "btc" | "sox";
  /** `thin`이면 화면이 표본이 얇다는 말을 같이 합니다. */
  strength: "measured" | "thin";
};

/**
 * 종가배팅 후보 — 오늘 종가에 사서 내일 시가에 팔 만한 자리.
 *
 * `measured`가 타입의 일부인 이유는 미국 급등 후보와 같습니다: 숫자 없이 종목만
 * 늘어놓은 표는 추천으로 읽히고, 그 말을 할 자격이 없습니다.
 *
 * 재는 값이 갭이 아니라 **그날 밤 평균 대비 초과분**인 것도 의도입니다. 밤이 갭의
 * 대부분을 정하고 예측할 수도 없으니 -- 전쟁이 나면 다 같이 떨어집니다 -- 초과분만
 * 종목 선택의 몫입니다. 나스닥 선물은 옆에 맥락으로 두되 이 숫자에 섞지 않습니다.
 */
export type CloseBetCandidateDto = {
  id: string;
  symbol: string;
  name: string;
  market: string;
  /**
   * 규모 등급. 문턱도 성적도 규모마다 따로 재기 때문에 상승률이 아니라 규모입니다 —
   * 대형주 5%와 소형주 15%를 한 등급표에 놓을 수 없습니다.
   */
  tier: "대형" | "소형" | "중형";
  changeRateValue: number;
  closePrice: number;
  turnoverValue: number;
  marketCapValue: number | null;
  /**
   * 회전율 — 상장주식수의 몇 %가 그날 손바뀌었는가. 진입 조건입니다(5%↑).
   *
   * 20일 평균 대비 거래량 배수를 대체했습니다. 배수는 크기를 못 걸러내서 규모별로
   * 문턱이 셋이어야 했는데, 회전율은 애초에 주식수로 나눈 값이라 하나로 됩니다.
   */
  turnoverRatio: number;
  /** 20일 평균 거래량 대비. 조건이 아니라 참고값입니다. */
  volumeRatio: number;
  /** 0에 가까울수록 종가가 고가에 붙었다는 뜻입니다. */
  upperShadow: number;
  /** 60일 고점을 몇 % 넘겼는가. */
  breakMargin: number;
  nightTrigger: NightTriggerDto | null;
  sessionDate: string;
  /**
   * 장중 값인가.
   *
   * 종가배팅은 마감 30분 전에 결정하는 매매라 목록이 그 시간에 살아 있어야 하고,
   * 그때 값은 아직 닫히지 않은 캔들에서 나옵니다 — 종가도 윗꼬리도 15:30까지
   * 바뀝니다. 확정된 일봉으로 계산했을 때만 false입니다.
   */
  provisional: boolean;
  /** 장중 값이 어느 시각 기준인지. 확정 후에는 null입니다. */
  observedAt: string | null;
  /**
   * 이 등급이 과거에 실제로 어땠는가. 캘리브레이션이 없으면 null이고, 그때는 후보
   * 자체를 내보내지 않습니다.
   */
  measured: {
    /** 밤 평균을 이긴 비율. 승률이 아니라 "밤만큼은 했는가"입니다. */
    beatRate: number;
    /** 초과분 평균(%p). 화면이 앞세우는 숫자입니다. */
    excessMean: number;
    /** 갭상승 빈도. 초과분과 같이 보여야 오해가 없습니다. */
    gapUpRate: number;
    samples: number;
    nights: number;
    window: string;
  } | null;
};

/**
 * 짝꿍매매 후보 — 같은 테마 1등주가 상한가에 잠겼을 때의 2등주.
 *
 * 메커니즘이 상한가에 있습니다. 상한가는 더 높은 값에 거래가 안 되는 상태라 그
 * 종목을 사려던 수요가 같은 테마의 다음 종목으로 넘칩니다. 미국에서 같은 매매가
 * 성립하지 않은 것도 가격제한폭이 없어서입니다.
 *
 * 스캘핑에 가까운 매매라 `provisional`이 대부분 true입니다 — 1등주가 상한가에서
 * 풀릴 수도, 2등주가 더 갈 수도 있어 목록이 몇 분 만에 바뀝니다.
 */
export type LimitPairDto = {
  id: string;
  theme: string;
  /**
   * 잠겼는가와 얼마나 붙어 있는가, 두 축입니다.
   *
   *   상한가·밀착   612건  +5.550%p  상회 76%
   *   상한가·근접   123건  +0.162%p  상회 46%
   *   상한가·여유   962건  +0.403%p  상회 49%
   *   상한가 근접    77건  — 표본이 100건에 못 미쳐 성적을 붙이지 않습니다
   *
   * `상한가 진행중`은 장중 경로에만 있습니다 — 1등주가 15~27%를 달리는 동안 6%p
   * 안쪽에 붙은 2등주로, 잠기기 전에 잡는 자리입니다. 일봉으로는 궤적을 볼 수 없어
   * 성적표가 없고, 분봉 4일치 관찰만 있습니다.
   */
  tier: "상한가·밀착" | "상한가·근접" | "상한가·여유" | "상한가 근접" | "상한가 진행중";
  /** 1등주가 실제로 상한가에 잠겼는가. 근접(27~29%)과 성적이 다릅니다. */
  locked: boolean;
  /** 1등주 상승률 − 2등주 상승률. 0에 가까울수록 둘이 나란히 달린다는 뜻입니다. */
  leadGap: number;
  leader: { symbol: string; name: string; changeRateValue: number; turnoverValue: number };
  second: { symbol: string; name: string; changeRateValue: number; turnoverValue: number; closePrice?: number };
  market: string;
  marketCapValue: number | null;
  nightTrigger: NightTriggerDto | null;
  sessionDate: string;
  provisional: boolean;
  observedAt: string | null;
  /**
   * 이 등급이 과거에 실제로 어땠는가.
   *
   * 한 가지 유보가 있습니다. 여기 숫자는 **종가 매수·익일 시가 매도**를 잰 값인데,
   * 실제 짝꿍매매는 장중에 들어가 장중에 나오는 매매입니다. 같은 자리를 재긴 했지만
   * 같은 보유구간은 아닙니다 — 분봉 이력이 쌓이면 그쪽으로 다시 재야 합니다.
   */
  measured: {
    beatRate: number;
    excessMean: number;
    gapUpRate: number;
    /** 하루를 들고 있었을 때. 갭만 먹는 매매라는 것을 보여줍니다. */
    holdExcessMean: number;
    samples: number;
    nights: number;
    window: string;
  } | null;
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
   * Each session's closing rate, kept apart.
   *
   * `changeRateValue` follows whichever book is open, so after 20:02 it reverts
   * to the KRX close and reads +23.17% for a stock 토스 shows at +19.03% —
   * both true, of different sessions. Absent for a symbol the collector has no
   * samples of today, and `after` is absent until the evening has traded.
   */
  sessionChangeRates?: { after?: number; regular?: number };
  volumeValue?: number;
  /** Today's volume against its own average, which is what a burst means. */
  volumeRatioValue?: number;
  /** Position in the turnover ranking the leaders were drawn from. */
  rank?: number;
  /**
   * 시장 지정 — 관리종목, 투자주의·경고·위험, 거래정지, 정리매매, 단기과열.
   * Absent when the exchange has designated nothing, which is the usual case.
   */
  cautionLabels?: string[];
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
   * filled with the best of a bad set.
   *
   * Both markets carry these, but not through the same paths: 보유 지분 and
   * 산업 뉴스 are domestic only, because no free US filing carries a stake's
   * book value and the theme fan-out has no exact match to key on in English.
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
  /**
   * 개장까지 프리마켓에서 오른 폭. 정규장에 남아 있는 것이 이 값에 달렸습니다 —
   * 1,503건 실측에서 50~100%는 개장 30분 뒤 종가 +21.2%였고, 300%↑는 −5.7%였습니다.
   * 개장 전이면 진행 중인 값이고, 프리마켓 거래가 없었으면 null입니다.
   */
  preGain: number | null;
  /**
   * 정규장 첫 5분봉의 방향. 같은 실측에서 프리 150~300% 구간의 30분 종가가
   * 양봉이면 +3.7%(승률 56%), 음봉이면 −9.8%(33%)로 갈렸습니다.
   *
   * `forming`은 아직 5분이 안 지난 것이고 `before`는 개장 전입니다. 둘을 `red`와
   * 같이 두면 화면이 "아직 모른다"와 "아니다"를 구분하지 못합니다.
   */
  openBarState: "before" | "forming" | "green" | "red" | "unknown";
  /** 정규장 시가. 실제로 살 수 있었던 첫 가격입니다. */
  openPrice: number | null;
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
 * 함께 움직인 테마 — 1등주와 같이 오른 멤버들.
 *
 * 이름이 짝꿍매매가 아닌 이유: 짝꿍매매는 1등주가 상한가에 잠겼을 때 2등주를 잡는
 * 매매이고 그것은 LimitPairDto가 따로 냅니다. 여기는 상한가를 요구하지 않습니다.
 *
 * Grouped by theme rather than by leader because that is the unit the trade is
 * read in: 반도체 is moving, and here is what is still behind it. The 주도주
 * list answers a different question (where did the money go) and repeats a
 * theme whenever two of its names lead.
 */
export type PairTradeDto = {
  id: string;
  candidates: PairCandidateDto[];
  /**
   * 테마 자체가 얼마나 움직였는지 — 견적이 있는 멤버 전체의 중앙값이며 하락한
   * 멤버도 셉니다. 카드에 보이는 목록은 오른 종목만 걸러 놓은 것이라, 그것만으로는
   * 테마가 움직였는지 한 종목이 움직였는지 구분되지 않습니다.
   *
   * SI(시스템통합)가 이 값이 필요한 이유입니다 — 비트플래닛 한 종목이 +30%,
   * 나머지는 +0.5~1%. 중앙값 +0.79%가 그 사실을 한 줄로 말합니다.
   *
   * null이면 셀 멤버가 없었다는 뜻이고, 화면은 아무 말도 하지 않습니다.
   */
  themeMove?: number | null;
  /** 중앙값을 낸 표본 수. 몇 종목을 보고 한 말인지 없으면 읽을 수 없습니다. */
  themeBreadth?: number | null;
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
  krAfterPairs?: PairTradeDto[];
  krEtfLeaders?: LeadingStockDto[];
  usEtfLeaders?: LeadingStockDto[];
  krPairTrades: PairTradeDto[];
  krCloseBetCandidates?: CloseBetCandidateDto[];
  krLimitPairs?: LimitPairDto[];
  krHaltedStocks?: HaltedStockDto[];
  /**
   * 강세 테마 source rows, one list per trading session.
   *
   * The live leader board follows whichever book is open, so a single list read
   * as "today's strong themes" was describing the NXT evening after 15:40 and
   * left the regular session with no panel. Grouping still happens here — the
   * two-rising-names rule lives in one place — but the rows come pre-split.
   */
  krSessionThemeStocks?: { after: LeadingStockDto[]; regular: LeadingStockDto[] };
  usSurgeCandidates: SurgeCandidateDto[];
  usPremarketMovers: PremarketMoverDto[];
  smallCapScanner: ReactionCandidateDto[];
};
