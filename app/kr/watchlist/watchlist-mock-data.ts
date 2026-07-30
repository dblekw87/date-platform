export type WatchlistView = "default" | "review" | "lists" | "empty";

export type TrackingStatus =
  | "확인 필요"
  | "새 공식 정보 있음"
  | "Analysis 재검토 필요"
  | "미확인 내용 유지"
  | "다음 확인 대기"
  | "현재 변화 없음"
  | "추적 보류"
  | "추적 종료";

export type WatchlistItem = {
  id: string;
  name: string;
  code: string;
  market: string;
  company: string;
  themes: string[];
  etf: string;
  price: string;
  move: string;
  trackingReason: string;
  status: TrackingStatus;
  priority: 1 | 2 | 3 | 4;
  whyNow: string;
  officialInfoCount: number;
  unknownCount: number;
  analysisCount: number;
  analysisStatus: string;
  conditionState: string;
  lastCheckedAt: string;
  lastOfficialAt: string;
  nextCheckAt: string;
  nextCheckReason: string;
  keyChange: string;
  changeCount: number;
  correctionState: string;
  analysisImpact: string;
  primaryAction: string;
  stockHref: string;
  changesHref: string;
  evidenceHref: string;
  analysisHref: string;
};

export type WatchEvidence = {
  id: string;
  stockName: string;
  stockCode: string;
  title: string;
  type: string;
  source: string;
  publishedAt: string;
  confidence: string;
  correction: string;
  analysisImpact: string;
  href: string;
};

export type WatchAnalysis = {
  id: string;
  stockName: string;
  title: string;
  status: string;
  updatedAt: string;
  newEvidenceCount: number;
  affectedSection: string;
  conditionState: string;
  reviewReason: string;
  analysisHref: string;
  changesHref: string;
  evidenceHref: string;
};

export type NextCheck = {
  id: string;
  stockName: string;
  dueAt: string;
  reason: string;
  evidence: string;
  analysis: string;
  state: string;
  doneState: string;
  href: string;
};

export type WatchListGroup = {
  id: string;
  name: string;
  itemCount: number;
  reviewNeededCount: number;
  officialInfoCount: number;
  leadTarget: string;
  description: string;
  href: string;
};

export type PausedTracking = {
  id: string;
  name: string;
  code: string;
  state: "추적 보류" | "추적 종료" | "관심 제거";
  handledAt: string;
  reason: string;
  linkedAnalysis: string;
  href: string;
};

export type EmptyStateCopy = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  actions: {
    href: string;
    label: string;
  }[];
};

export type AddFlowMock = {
  target: string;
  reasons: string[];
  nextCheckOptions: string[];
  analysisOptions: string[];
};

export type WatchlistMock = {
  view: WatchlistView;
  requestedView: string;
  isUnknownView: boolean;
  isEmpty: boolean;
  title: string;
  description: string;
  totalCount: number;
  reviewNeededCount: number;
  officialInfoCount: number;
  analysisReviewCount: number;
  dueCount: number;
  pausedCount: number;
  lastCheckedAt: string;
  primaryAction: string;
  leadItem?: WatchlistItem;
  reviewItems: WatchlistItem[];
  officialEvidence: WatchEvidence[];
  analysisReviews: WatchAnalysis[];
  nextChecks: NextCheck[];
  stableItems: WatchlistItem[];
  listGroups: WatchListGroup[];
  pausedItems: PausedTracking[];
  emptyStates: EmptyStateCopy[];
  addFlow: AddFlowMock;
};

const items: WatchlistItem[] = [
  {
    id: "watch-samsung",
    name: "삼성전자",
    code: "005930",
    market: "KOSPI",
    company: "Samsung Electronics",
    themes: ["반도체", "AI 인프라"],
    etf: "반도체 ETF",
    price: "현재가 예시 xx,xxx",
    move: "예시 +0.0%",
    trackingReason: "공식 공시 대기",
    status: "확인 필요",
    priority: 1,
    whyNow: "정정된 공식 정보와 새 Evidence가 기존 분석의 판단 변경 조건에 접근했습니다.",
    officialInfoCount: 2,
    unknownCount: 2,
    analysisCount: 1,
    analysisStatus: "새 근거 검토 필요",
    conditionState: "판단 변경 조건 접근",
    lastCheckedAt: "마지막 확인 예시 오늘 09:00",
    lastOfficialAt: "공개 시각 예시 오늘 11:10",
    nextCheckAt: "다음 확인 예시 오늘 장 마감 후",
    nextCheckReason: "후속 공시에서 적용 범위 확인",
    keyChange: "기존 미확인 항목 일부가 공식 근거와 연결됐습니다.",
    changeCount: 3,
    correctionState: "정정 정보 있음",
    analysisImpact: "Analysis 영향 있음",
    primaryAction: "달라진 내용 확인하기",
    stockHref: "/kr/stock/005930",
    changesHref: "/kr/changes?view=analysis",
    evidenceHref: "/kr/evidence?id=dart-samsung-001",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001"
  },
  {
    id: "watch-hynix",
    name: "SK하이닉스",
    code: "000660",
    market: "KOSPI",
    company: "SK hynix",
    themes: ["HBM", "반도체"],
    etf: "반도체 ETF",
    price: "현재가 예시 xxx,xxx",
    move: "예시 -0.0%",
    trackingReason: "실적 발표 확인",
    status: "Analysis 재검토 필요",
    priority: 1,
    whyNow: "HBM 관련 공식 발표 문구가 정정되어 기존 해석 범위를 다시 봐야 합니다.",
    officialInfoCount: 1,
    unknownCount: 1,
    analysisCount: 1,
    analysisStatus: "판단 수정 필요",
    conditionState: "조건 충족 가능성",
    lastCheckedAt: "마지막 확인 예시 전일 15:20",
    lastOfficialAt: "정정 시각 예시 오늘 10:20",
    nextCheckAt: "다음 확인 예시 오늘 13:00",
    nextCheckReason: "정정 발표의 적용 범위 확인",
    keyChange: "적용 대상 범위가 일부 조정됐습니다.",
    changeCount: 2,
    correctionState: "정정됨",
    analysisImpact: "내 해석 영향",
    primaryAction: "분석 다시 보기",
    stockHref: "/kr/stock/000660",
    changesHref: "/kr/changes?view=analysis",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
    analysisHref: "/kr/analysis?id=hynix-hbm-001"
  },
  {
    id: "watch-nvidia",
    name: "NVIDIA",
    code: "NVDA",
    market: "NASDAQ",
    company: "NVIDIA",
    themes: ["AI 인프라", "반도체"],
    etf: "미국 반도체 ETF",
    price: "현재가 예시 xxx.xx",
    move: "예시 +0.0%",
    trackingReason: "관련 기업 발표 확인",
    status: "새 공식 정보 있음",
    priority: 2,
    whyNow: "AI 인프라 투자 관련 기업 발표가 관심 종목과 연결됐습니다.",
    officialInfoCount: 1,
    unknownCount: 2,
    analysisCount: 0,
    analysisStatus: "연결된 Analysis 없음",
    conditionState: "조건 없음",
    lastCheckedAt: "마지막 확인 예시 어제 장 마감 후",
    lastOfficialAt: "공개 시각 예시 오늘 10:40",
    nextCheckAt: "다음 확인 예시 이번 주",
    nextCheckReason: "관련 기업 공식 발표 확인",
    keyChange: "복수 출처 확인 상태로 바뀐 공식 정보가 있습니다.",
    changeCount: 1,
    correctionState: "정정 없음",
    analysisImpact: "Analysis 없음",
    primaryAction: "새 근거 확인하기",
    stockHref: "/kr/stock/NVDA",
    changesHref: "/kr/changes?view=latest",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
    analysisHref: "/kr/analysis"
  },
  {
    id: "watch-apple",
    name: "Apple",
    code: "AAPL",
    market: "NASDAQ",
    company: "Apple",
    themes: ["AI 기기", "공급망"],
    etf: "미국 대형 기술주 ETF",
    price: "현재가 예시 xxx.xx",
    move: "예시 -0.0%",
    trackingReason: "공급망 변화 확인",
    status: "미확인 내용 유지",
    priority: 2,
    whyNow: "공급망 관련 공식 입장은 아직 확인되지 않았고 다음 확인 항목이 남아 있습니다.",
    officialInfoCount: 0,
    unknownCount: 3,
    analysisCount: 0,
    analysisStatus: "연결된 Analysis 없음",
    conditionState: "미확인 유지",
    lastCheckedAt: "마지막 확인 예시 오늘 09:40",
    lastOfficialAt: "마지막 공식 정보 예시 전일 16:00",
    nextCheckAt: "다음 확인 예시 내일 장 시작 전",
    nextCheckReason: "공급망 기업 공식 입장 확인",
    keyChange: "시장 관찰은 있지만 공식 원인은 확인되지 않았습니다.",
    changeCount: 1,
    correctionState: "정정 없음",
    analysisImpact: "Analysis 없음",
    primaryAction: "확인 항목 보기",
    stockHref: "/kr/stock/AAPL",
    changesHref: "/kr/changes?view=latest",
    evidenceHref: "/kr/evidence",
    analysisHref: "/kr/analysis"
  },
  {
    id: "watch-kospi-etf",
    name: "KODEX 반도체",
    code: "091160",
    market: "ETF",
    company: "ETF",
    themes: ["반도체", "ETF"],
    etf: "KODEX 반도체",
    price: "현재가 예시 xx,xxx",
    move: "예시 +0.0%",
    trackingReason: "테마 확산 확인",
    status: "다음 확인 대기",
    priority: 3,
    whyNow: "반도체 테마 공식 정보가 추가되면 구성 종목 영향을 다시 확인합니다.",
    officialInfoCount: 0,
    unknownCount: 1,
    analysisCount: 0,
    analysisStatus: "연결된 Analysis 없음",
    conditionState: "대기 중",
    lastCheckedAt: "마지막 확인 예시 오늘 10:00",
    lastOfficialAt: "마지막 공식 정보 예시 전일",
    nextCheckAt: "다음 확인 예시 이번 주 금요일",
    nextCheckReason: "ETF 구성 종목 변화 확인",
    keyChange: "다음 확인 시점까지 현재 추적 상태를 유지합니다.",
    changeCount: 0,
    correctionState: "정정 없음",
    analysisImpact: "영향 없음",
    primaryAction: "다음 확인 보기",
    stockHref: "/kr/theme",
    changesHref: "/kr/changes?view=latest",
    evidenceHref: "/kr/evidence",
    analysisHref: "/kr/analysis"
  },
  {
    id: "watch-lg-energy",
    name: "LG에너지솔루션",
    code: "373220",
    market: "KOSPI",
    company: "LG Energy Solution",
    themes: ["배터리", "미국 연관 종목"],
    etf: "배터리 ETF",
    price: "현재가 예시 xxx,xxx",
    move: "예시 0.0%",
    trackingReason: "규제 변화 확인",
    status: "현재 변화 없음",
    priority: 4,
    whyNow: "마지막 확인 이후 중요한 공식 변화가 없습니다.",
    officialInfoCount: 0,
    unknownCount: 1,
    analysisCount: 0,
    analysisStatus: "연결된 Analysis 없음",
    conditionState: "다음 확인 대기",
    lastCheckedAt: "마지막 확인 예시 전일 14:30",
    lastOfficialAt: "마지막 공식 정보 예시 3일 전",
    nextCheckAt: "다음 확인 예시 다음 규제 시행일 전",
    nextCheckReason: "규제 시행일 확인",
    keyChange: "다음 확인 시점까지 현재 추적 상태를 유지합니다.",
    changeCount: 0,
    correctionState: "정정 없음",
    analysisImpact: "영향 없음",
    primaryAction: "종목 보기",
    stockHref: "/kr/stock/373220",
    changesHref: "/kr/changes?view=latest",
    evidenceHref: "/kr/evidence",
    analysisHref: "/kr/analysis"
  }
];

const officialEvidence: WatchEvidence[] = [
  {
    id: "watch-ev-samsung",
    stockName: "삼성전자",
    stockCode: "005930",
    title: "삼성전자 공급망 검토 대상 관련 전자공시 Placeholder",
    type: "전자공시",
    source: "OpenDART Placeholder",
    publishedAt: "공개 시각 예시 오늘 11:10",
    confidence: "공식 확인",
    correction: "정정 정보 있음",
    analysisImpact: "삼성전자 반도체 공급망 영향 분석",
    href: "/kr/evidence?id=dart-samsung-001"
  },
  {
    id: "watch-ev-hynix",
    stockName: "SK하이닉스",
    stockCode: "000660",
    title: "AI 인프라 투자 확대 관련 기업 공식 발표 Placeholder",
    type: "기업 공식 발표",
    source: "기업 IR Placeholder",
    publishedAt: "정정 시각 예시 오늘 10:20",
    confidence: "공식 발표",
    correction: "정정됨",
    analysisImpact: "SK하이닉스 HBM 수요 변화 분석",
    href: "/kr/evidence?id=ir-semiconductor-001"
  },
  {
    id: "watch-ev-nvidia",
    stockName: "NVIDIA",
    stockCode: "NVDA",
    title: "AI 인프라 투자 계획 확대 관련 공식 발표 Placeholder",
    type: "기업 공식 발표",
    source: "기업 IR Placeholder",
    publishedAt: "공개 시각 예시 오늘 10:40",
    confidence: "복수 출처 확인",
    correction: "정정 없음",
    analysisImpact: "연결된 Analysis 없음",
    href: "/kr/evidence?id=ir-semiconductor-001"
  }
];

const analysisReviews: WatchAnalysis[] = [
  {
    id: "watch-analysis-samsung",
    stockName: "삼성전자",
    title: "삼성전자 반도체 공급망 영향 분석",
    status: "새 근거 검토 필요",
    updatedAt: "마지막 수정 예시 오늘 10:50",
    newEvidenceCount: 2,
    affectedSection: "미확인 내용 · 판단 변경 조건",
    conditionState: "판단 변경 조건 접근",
    reviewReason: "기존 미확인 항목 일부가 공식 근거와 연결됐습니다.",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001",
    changesHref: "/kr/changes?view=analysis",
    evidenceHref: "/kr/evidence?id=dart-samsung-001"
  },
  {
    id: "watch-analysis-hynix",
    stockName: "SK하이닉스",
    title: "SK하이닉스 HBM 수요 변화 분석",
    status: "판단 수정 필요",
    updatedAt: "마지막 수정 예시 전일 15:20",
    newEvidenceCount: 1,
    affectedSection: "내 해석 · 다른 해석 가능성",
    conditionState: "조건 충족 가능성",
    reviewReason: "정정 발표로 적용 대상 범위 해석을 다시 봐야 합니다.",
    analysisHref: "/kr/analysis?id=hynix-hbm-001",
    changesHref: "/kr/changes?view=analysis",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001"
  }
];

const nextChecks: NextCheck[] = [
  {
    id: "next-samsung",
    stockName: "삼성전자",
    dueAt: "오늘 장 마감 후",
    reason: "후속 공시 확인",
    evidence: "dart-samsung-001",
    analysis: "삼성전자 반도체 공급망 영향 분석",
    state: "확인 필요",
    doneState: "미완료",
    href: "/kr/evidence?id=dart-samsung-001"
  },
  {
    id: "next-hynix",
    stockName: "SK하이닉스",
    dueAt: "오늘 13:00",
    reason: "정정 발표 적용 범위 확인",
    evidence: "ir-semiconductor-001",
    analysis: "SK하이닉스 HBM 수요 변화 분석",
    state: "도래",
    doneState: "미완료",
    href: "/kr/analysis?id=hynix-hbm-001"
  },
  {
    id: "next-apple",
    stockName: "Apple",
    dueAt: "내일 장 시작 전",
    reason: "공급망 기업 공식 발표 확인",
    evidence: "공식 발표 대기",
    analysis: "연결된 Analysis 없음",
    state: "대기",
    doneState: "예정",
    href: "/kr/stock/AAPL"
  },
  {
    id: "next-etf",
    stockName: "KODEX 반도체",
    dueAt: "이번 주 금요일",
    reason: "ETF 구성 종목 변화 확인",
    evidence: "공식 정보 대기",
    analysis: "연결된 Analysis 없음",
    state: "대기",
    doneState: "예정",
    href: "/kr/theme"
  }
];

const listGroups: WatchListGroup[] = [
  {
    id: "list-semiconductor",
    name: "반도체",
    itemCount: 4,
    reviewNeededCount: 2,
    officialInfoCount: 3,
    leadTarget: "삼성전자",
    description: "반도체, HBM, AI 인프라 관련 대상을 함께 봅니다.",
    href: "/kr/watchlist?view=lists#list-semiconductor"
  },
  {
    id: "list-earnings",
    name: "실적 발표 대기",
    itemCount: 2,
    reviewNeededCount: 1,
    officialInfoCount: 1,
    leadTarget: "SK하이닉스",
    description: "실적 발표에서 확인할 항목이 있는 종목입니다.",
    href: "/kr/watchlist?view=lists#list-earnings"
  },
  {
    id: "list-disclosure",
    name: "공시 확인",
    itemCount: 3,
    reviewNeededCount: 2,
    officialInfoCount: 2,
    leadTarget: "삼성전자",
    description: "전자공시와 정정 정보를 우선 확인합니다.",
    href: "/kr/watchlist?view=lists#list-disclosure"
  },
  {
    id: "list-us",
    name: "미국 연관 종목",
    itemCount: 3,
    reviewNeededCount: 1,
    officialInfoCount: 1,
    leadTarget: "NVIDIA",
    description: "미국 기업 발표와 국내 종목 연결을 추적합니다.",
    href: "/kr/watchlist?view=lists#list-us"
  }
];

const pausedItems: PausedTracking[] = [
  {
    id: "paused-battery",
    name: "LG에너지솔루션",
    code: "373220",
    state: "추적 보류",
    handledAt: "보류 시각 예시 전일 16:20",
    reason: "다음 규제 시행일 전까지 새 공식 정보 대기",
    linkedAnalysis: "연결된 Analysis 없음",
    href: "/kr/stock/373220"
  },
  {
    id: "ended-old-theme",
    name: "2차전지 테마 Basket",
    code: "THEME-BATTERY",
    state: "추적 종료",
    handledAt: "종료 시각 예시 3일 전",
    reason: "현재 추적을 마치고 기록만 보존",
    linkedAnalysis: "이전 테마 검토 기록",
    href: "/kr/journal"
  },
  {
    id: "removed-sample",
    name: "이전 관심 종목 Placeholder",
    code: "REMOVED",
    state: "관심 제거",
    handledAt: "제거 시각 예시 5일 전",
    reason: "현재 Watchlist에서 제거, 과거 기록 유지",
    linkedAnalysis: "과거 Changes 기록 유지",
    href: "/kr/journal"
  }
];

const emptyStates: EmptyStateCopy[] = [
  {
    id: "empty-watchlist",
    eyebrow: "관심 종목 없음",
    title: "아직 추적 중인 종목이 없습니다.",
    description: "종목을 추가하면 관심 이유, 새 공식 정보, 다음 확인 시점을 함께 관리할 수 있습니다.",
    actions: [
      { href: "/kr/search", label: "종목 검색하기" },
      { href: "/kr/market", label: "시장에서 종목 찾기" },
      { href: "/kr/stock/005930", label: "최근 본 종목 확인하기" }
    ]
  },
  {
    id: "empty-change",
    eyebrow: "새 변화 없음",
    title: "마지막 확인 이후 중요한 공식 변화가 없습니다.",
    description: "변화가 없어도 현재 Analysis와 다음 확인 시점을 다시 볼 수 있습니다.",
    actions: [
      { href: "/kr/analysis?id=samsung-semiconductor-001", label: "현재 Analysis 확인하기" },
      { href: "#next-check-title", label: "다음 확인 시점 보기" }
    ]
  },
  {
    id: "empty-analysis",
    eyebrow: "Analysis 없음",
    title: "연결된 Analysis가 없습니다.",
    description: "종목 또는 Evidence에서 사용자가 직접 분석을 시작할 수 있습니다.",
    actions: [
      { href: "/kr/stock/005930", label: "종목에서 분석 시작하기" },
      { href: "/kr/evidence?id=dart-samsung-001", label: "Evidence에서 분석 시작하기" }
    ]
  },
  {
    id: "empty-evidence",
    eyebrow: "Evidence 없음",
    title: "새롭게 확인된 공식 정보가 없습니다.",
    description: "시장 관찰만 있는 경우 공식 사실처럼 표현하지 않고 보조 정보로 유지합니다.",
    actions: [
      { href: "/kr/market", label: "시장 관찰 보기" },
      { href: "/kr/evidence", label: "공식 정보 확인하기" }
    ]
  },
  {
    id: "empty-done",
    eyebrow: "모든 항목 확인 완료",
    title: "현재 확인이 필요한 관심 대상이 없습니다.",
    description: "다음 확인 시점과 현재 변화 없는 항목은 계속 유지됩니다.",
    actions: [
      { href: "#next-check-title", label: "다음 확인 시점 보기" },
      { href: "#stable-title", label: "현재 변화 없음 항목 보기" }
    ]
  }
];

const addFlow: AddFlowMock = {
  target: "삼성전자 005930",
  reasons: ["공식 공시 대기", "실적 발표 확인", "규제 변화 확인", "공급망 변화 확인", "관련 기업 발표 확인", "가설 검증", "Analysis 재검토", "단순 관심"],
  nextCheckOptions: ["오늘 장 마감 후", "내일 장 시작 전", "다음 실적 발표일", "후속 공시 공개 시점"],
  analysisOptions: ["삼성전자 반도체 공급망 영향 분석", "SK하이닉스 HBM 수요 변화 분석", "연결하지 않음"]
};

function createMock(view: WatchlistView, requestedView: string, isUnknownView: boolean): WatchlistMock {
  const reviewItems = view === "review" ? items.filter((item) => item.priority <= 2) : items.filter((item) => item.status !== "추적 보류" && item.status !== "추적 종료");
  const leadItem = reviewItems.find((item) => item.priority === 1) ?? reviewItems[0];
  const empty = view === "empty";

  return {
    view,
    requestedView,
    isUnknownView,
    isEmpty: empty,
    title: empty ? "아직 추적 중인 관심 종목이 없습니다." : view === "review" ? "먼저 다시 볼 관심 대상을 좁혀 봅니다." : view === "lists" ? "사용자 목록은 짧게 묶고 우선순위는 잃지 않습니다." : "관심 종목을 지속적으로 추적합니다.",
    description: empty
      ? "관심 종목을 추가하면 왜 보는지, 새 공식 정보가 있는지, 다음에 무엇을 확인할지 함께 관리합니다."
      : "시세 테이블이 아니라 관심 이유, 새 공식 정보, Analysis 재검토, 다음 확인 시점을 중심으로 보는 화면입니다.",
    totalCount: empty ? 0 : items.length,
    reviewNeededCount: empty ? 0 : items.filter((item) => item.priority === 1 || item.status === "확인 필요").length,
    officialInfoCount: empty ? 0 : items.filter((item) => item.officialInfoCount > 0).length,
    analysisReviewCount: empty ? 0 : analysisReviews.length,
    dueCount: empty ? 0 : nextChecks.filter((item) => item.state === "도래" || item.state === "확인 필요").length,
    pausedCount: empty ? 0 : pausedItems.length,
    lastCheckedAt: empty ? "마지막 확인 없음" : "마지막 전체 확인 예시 오늘 09:00",
    primaryAction: empty ? "종목 검색하기" : leadItem?.primaryAction ?? "관심 변화 확인하기",
    leadItem: empty ? undefined : leadItem,
    reviewItems: empty ? [] : reviewItems,
    officialEvidence: empty ? [] : officialEvidence,
    analysisReviews: empty ? [] : analysisReviews,
    nextChecks: empty ? [] : nextChecks,
    stableItems: empty ? [] : items.filter((item) => item.status === "현재 변화 없음" || item.status === "다음 확인 대기"),
    listGroups: empty ? [] : listGroups,
    pausedItems: empty ? [] : pausedItems,
    emptyStates,
    addFlow
  };
}

export function getWatchlistMock(view?: string | string[]): WatchlistMock {
  const requestedView = Array.isArray(view) ? view[0] ?? "default" : view ?? "default";

  if (requestedView === "review") return createMock("review", requestedView, false);
  if (requestedView === "lists") return createMock("lists", requestedView, false);
  if (requestedView === "empty") return createMock("empty", requestedView, false);
  if (requestedView === "default") return createMock("default", requestedView, false);

  return createMock("default", requestedView, true);
}
