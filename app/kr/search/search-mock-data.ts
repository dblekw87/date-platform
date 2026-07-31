export type SearchResultStatus =
  | "공식 확인"
  | "공식 발표"
  | "복수 출처 확인"
  | "단일 출처"
  | "미확인"
  | "관심 종목"
  | "분석 있음"
  | "재검토 필요";

export type SearchStockResult = {
  id: string;
  name: string;
  code: string;
  market: string;
  company: string;
  industry: string;
  recentEvidence: string;
  publishedAt: string;
  confidence: SearchResultStatus;
  watchState: "관심 종목" | "미추적";
  analysisState: "분석 있음" | "분석 없음" | "재검토 필요";
  lastChecked: string;
  nextAction: string;
  priceNote?: string;
  href: string;
  evidenceHref: string;
  analysisHref?: string;
};

export type SearchCompanyResult = {
  id: string;
  name: string;
  representativeStock: string;
  linkedSecurityCount: number;
  markets: string;
  business: string;
  industry: string;
  recentEvidence: string;
  analysis: string;
  href: string;
};

export type SearchThemeResult = {
  id: string;
  name: string;
  description: string;
  relatedCount: number;
  representativeStocks: string[];
  recentEvidence: string;
  uncheckedPoint: string;
  marketContext: string;
  analysisState: "관련 분석 있음" | "관련 분석 없음" | "재검토 필요";
  href: string;
};

export type SearchEvidenceResult = {
  id: string;
  title: string;
  type: string;
  source: string;
  publishedAt: string;
  confidence: SearchResultStatus;
  correction: "정정 있음" | "정정 없음";
  relatedStocks: string[];
  relatedCompanies: string[];
  keyFact: string;
  href: string;
};

export type SearchAnalysisResult = {
  id: string;
  title: string;
  stock: string;
  currentQuestion: string;
  status: "작성 중" | "재검토 필요" | "근거 확인 중";
  updatedAt: string;
  newEvidence: string;
  reviewRequired: string;
  href: string;
};

export type SearchRecentContext = {
  id: string;
  kind: "이어서 볼 분석" | "최근 확인한 공식 근거" | "최근 본 종목" | "관심 종목" | "최근 검색어";
  title: string;
  meta: string;
  href: string;
  action: string;
};

export type SearchRecentTerm = {
  term: string;
  searchedAt: string;
  href: string;
};

export type SearchMockResult = {
  mode: "idle" | "typing" | "stock-code" | "ticker" | "theme" | "evidence" | "empty";
  query: string;
  requestedState: string;
  safeStateLabel?: string;
  isIdle: boolean;
  isEmpty: boolean;
  heroTitle: string;
  heroDescription: string;
  exactResult?: SearchStockResult | SearchCompanyResult | SearchThemeResult | SearchEvidenceResult;
  exactResultKind?: "종목" | "기업" | "테마" | "공식 근거";
  autocomplete: {
    stocks: SearchStockResult[];
    companies: SearchCompanyResult[];
    themes: SearchThemeResult[];
    evidence: SearchEvidenceResult[];
  };
  stocks: SearchStockResult[];
  companies: SearchCompanyResult[];
  themes: SearchThemeResult[];
  evidence: SearchEvidenceResult[];
  analyses: SearchAnalysisResult[];
  recentContext: SearchRecentContext[];
  recentTerms: SearchRecentTerm[];
  emptyMessages: {
    overall: string;
    stocks: string;
    companies: string;
    themes: string;
    evidence: string;
    analyses: string;
    code: string;
    typo: string;
  };
};

const stocks: SearchStockResult[] = [
  {
    id: "samsung",
    name: "삼성전자",
    code: "005930",
    market: "KOSPI",
    company: "삼성전자 주식회사",
    industry: "반도체 · 모바일 · 가전",
    recentEvidence: "반도체 설비투자 관련 사업보고서 정정 공시",
    publishedAt: "2026.07.29 16:10",
    confidence: "공식 발표",
    watchState: "관심 종목",
    analysisState: "재검토 필요",
    lastChecked: "2026.07.30 09:20",
    nextAction: "정정 공시가 기존 분석 조건에 닿는지 확인",
    priceNote: "가격 정보는 보조 참고",
    href: "/kr/stock/005930",
    evidenceHref: "/kr/evidence?id=dart-samsung-001",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001"
  },
  {
    id: "hynix",
    name: "SK하이닉스",
    code: "000660",
    market: "KOSPI",
    company: "SK하이닉스 주식회사",
    industry: "메모리 반도체 · HBM",
    recentEvidence: "HBM 공급 관련 IR 발표",
    publishedAt: "2026.07.28 10:00",
    confidence: "공식 확인",
    watchState: "관심 종목",
    analysisState: "분석 있음",
    lastChecked: "2026.07.30 11:30",
    nextAction: "공급 일정 표현이 이전 분석과 다른지 확인",
    priceNote: "등락률은 순위 기준에서 제외",
    href: "/kr/stock/000660",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
    analysisHref: "/kr/analysis?id=hynix-hbm-001"
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    code: "NVDA",
    market: "NASDAQ",
    company: "NVIDIA Corporation",
    industry: "AI 가속기 · 데이터센터",
    recentEvidence: "데이터센터 매출 관련 공식 실적 발표",
    publishedAt: "2026.07.26 06:00",
    confidence: "공식 발표",
    watchState: "미추적",
    analysisState: "분석 없음",
    lastChecked: "최근 확인 기록 없음",
    nextAction: "국내 반도체 공급망과 연결된 공식 정보 확인",
    priceNote: "해외 티커 결과",
    href: "/kr/market",
    evidenceHref: "/kr/changes?view=latest"
  }
];

const companies: SearchCompanyResult[] = [
  {
    id: "samsung-company",
    name: "삼성전자 주식회사",
    representativeStock: "삼성전자 005930",
    linkedSecurityCount: 2,
    markets: "KOSPI · 우선주 포함",
    business: "반도체, 모바일, 소비자 가전",
    industry: "전기전자",
    recentEvidence: "사업보고서 정정 공시",
    analysis: "삼성 반도체 투자 가설 재검토",
    href: "/kr/stock/005930"
  },
  {
    id: "nvidia-company",
    name: "NVIDIA Corporation",
    representativeStock: "NVDA",
    linkedSecurityCount: 1,
    markets: "NASDAQ",
    business: "GPU, 데이터센터 가속기, 소프트웨어",
    industry: "미국 반도체",
    recentEvidence: "공식 실적 발표",
    analysis: "연결된 국내 분석 없음",
    href: "/kr/market"
  }
];

const themes: SearchThemeResult[] = [
  {
    id: "semiconductor",
    name: "반도체 공급망",
    description: "국내 메모리, 장비, 고객사 공식 발표를 함께 확인하는 추적 묶음",
    relatedCount: 8,
    representativeStocks: ["삼성전자", "SK하이닉스", "한미반도체"],
    recentEvidence: "HBM 공급 관련 IR 발표",
    uncheckedPoint: "해외 고객사 발주 일정은 아직 직접 확인 필요",
    marketContext: "시장 화면의 반도체 섹터에서 관련 종목 확인",
    analysisState: "재검토 필요",
    href: "/kr/market"
  },
  {
    id: "supply-contract",
    name: "공급계약 확인",
    description: "공급계약 공시와 정정 여부를 기준으로 관련 종목을 묶어 확인",
    relatedCount: 5,
    representativeStocks: ["삼성전자", "SK하이닉스"],
    recentEvidence: "계약 기간 변경 정정 공시",
    uncheckedPoint: "계약 상대방별 세부 조건은 Evidence에서 확인",
    marketContext: "최근 변화 화면에서 공식 변화 비교",
    analysisState: "관련 분석 있음",
    href: "/kr/changes?view=latest"
  }
];

const evidence: SearchEvidenceResult[] = [
  {
    id: "dart-samsung-001",
    title: "반도체 설비투자 관련 사업보고서 정정 공시",
    type: "DART 공시",
    source: "금융감독원 전자공시",
    publishedAt: "2026.07.29 16:10",
    confidence: "공식 발표",
    correction: "정정 있음",
    relatedStocks: ["삼성전자"],
    relatedCompanies: ["삼성전자 주식회사"],
    keyFact: "설비투자 설명 문구와 일부 수치 주석이 정정됨",
    href: "/kr/evidence?id=dart-samsung-001"
  },
  {
    id: "ir-semiconductor-001",
    title: "HBM 공급 관련 IR 발표",
    type: "IR 자료",
    source: "회사 공식 IR",
    publishedAt: "2026.07.28 10:00",
    confidence: "공식 확인",
    correction: "정정 없음",
    relatedStocks: ["SK하이닉스"],
    relatedCompanies: ["SK하이닉스 주식회사"],
    keyFact: "HBM 공급 일정과 고객사 협의 진행 상태가 공식 자료에 포함됨",
    href: "/kr/evidence?id=ir-semiconductor-001"
  }
];

const analyses: SearchAnalysisResult[] = [
  {
    id: "samsung-semiconductor-001",
    title: "삼성 반도체 투자 가설 재검토",
    stock: "삼성전자 005930",
    currentQuestion: "정정 공시가 기존 설비투자 가정에 영향을 주는가",
    status: "재검토 필요",
    updatedAt: "2026.07.30 12:30",
    newEvidence: "새 공식 근거 1건",
    reviewRequired: "판단 변경 조건 접근",
    href: "/kr/analysis?id=samsung-semiconductor-001"
  },
  {
    id: "hynix-hbm-001",
    title: "SK하이닉스 HBM 공급 일정 확인",
    stock: "SK하이닉스 000660",
    currentQuestion: "공식 IR의 공급 일정 표현이 이전 가설과 일치하는가",
    status: "근거 확인 중",
    updatedAt: "2026.07.29 18:15",
    newEvidence: "새 공식 근거 1건",
    reviewRequired: "Section 확인 필요",
    href: "/kr/analysis?id=hynix-hbm-001"
  }
];

const recentContext: SearchRecentContext[] = [
  {
    id: "recent-analysis",
    kind: "이어서 볼 분석",
    title: "삼성 반도체 투자 가설 재검토",
    meta: "새 공식 근거 1건 · 판단 변경 조건 접근",
    href: "/kr/analysis?id=samsung-semiconductor-001",
    action: "분석 이어서 보기"
  },
  {
    id: "recent-evidence",
    kind: "최근 확인한 공식 근거",
    title: "HBM 공급 관련 IR 발표",
    meta: "회사 공식 IR · 2026.07.28",
    href: "/kr/evidence?id=ir-semiconductor-001",
    action: "공식 근거 확인"
  },
  {
    id: "recent-stock",
    kind: "최근 본 종목",
    title: "삼성전자 005930",
    meta: "마지막 확인 2026.07.30 09:20",
    href: "/kr/stock/005930",
    action: "종목 보기"
  },
  {
    id: "watchlist",
    kind: "관심 종목",
    title: "확인 필요한 관심 대상 4개",
    meta: "정정 공시와 분석 재검토 항목 포함",
    href: "/kr/watchlist?view=review",
    action: "관심 변화 확인"
  },
  {
    id: "recent-term",
    kind: "최근 검색어",
    title: "반도체",
    meta: "오늘 09:12 다시 검색 가능",
    href: "/kr/search?q=반도체",
    action: "다시 검색"
  }
];

const recentTerms: SearchRecentTerm[] = [
  { term: "삼성", searchedAt: "오늘 09:12", href: "/kr/search?q=삼성" },
  { term: "005930", searchedAt: "어제 18:20", href: "/kr/search?q=005930" },
  { term: "공급계약", searchedAt: "어제 16:45", href: "/kr/search?q=공급계약" }
];

const emptyMessages = {
  overall: "입력한 검색어와 일치하는 대상을 찾지 못했습니다.",
  stocks: "일치하는 종목 결과가 없습니다.",
  companies: "일치하는 기업 결과가 없습니다.",
  themes: "일치하는 테마 결과가 없습니다.",
  evidence: "일치하는 공식 근거 결과가 없습니다.",
  analyses: "일치하는 분석 결과가 없습니다.",
  code: "알 수 없는 종목 코드입니다. 숫자 코드 또는 영문 티커를 다시 확인하세요.",
  typo: "검색어 입력 오류 가능성이 있습니다. 띄어쓰기나 종목 코드를 다시 확인하세요."
};

function normalizeValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function baseResult(query: string, state: string): SearchMockResult {
  return {
    mode: "idle",
    query,
    requestedState: state,
    isIdle: true,
    isEmpty: false,
    heroTitle: "검색",
    heroDescription: "종목, 기업, 테마, 공식 근거, 기존 분석을 찾고 다음 확인 화면으로 이동합니다.",
    autocomplete: {
      stocks: stocks.slice(0, 2),
      companies: companies.slice(0, 1),
      themes: themes.slice(0, 1),
      evidence: evidence.slice(0, 1)
    },
    stocks: [],
    companies: [],
    themes: [],
    evidence: [],
    analyses: [],
    recentContext,
    recentTerms,
    emptyMessages
  };
}

export function getSearchMock(queryParam?: string | string[], stateParam?: string | string[]): SearchMockResult {
  const query = normalizeValue(queryParam).trim();
  const state = normalizeValue(stateParam).trim();
  const result = baseResult(query, state);
  const upperQuery = query.toUpperCase();

  if (!query || state === "idle") {
    return {
      ...result,
      safeStateLabel: state && state !== "idle" ? "알 수 없는 상태는 검색 전 화면으로 처리했습니다." : undefined
    };
  }

  if (query === "없는검색어") {
    return {
      ...result,
      mode: "empty",
      isIdle: false,
      isEmpty: true,
      autocomplete: { stocks: [], companies: [], themes: [], evidence: [] }
    };
  }

  if (query === "005930") {
    return {
      ...result,
      mode: "stock-code",
      isIdle: false,
      exactResult: stocks[0],
      exactResultKind: "종목",
      stocks: stocks.slice(0, 2),
      companies: companies.slice(0, 1),
      evidence: evidence.slice(0, 1),
      analyses: analyses.slice(0, 1)
    };
  }

  if (upperQuery === "NVDA") {
    return {
      ...result,
      mode: "ticker",
      isIdle: false,
      exactResult: stocks[2],
      exactResultKind: "종목",
      stocks: [stocks[2]],
      companies: [companies[1]],
      themes: themes.slice(0, 1),
      evidence: [],
      analyses: []
    };
  }

  if (query.includes("반도체")) {
    return {
      ...result,
      mode: "theme",
      isIdle: false,
      exactResult: themes[0],
      exactResultKind: "테마",
      stocks: stocks.slice(0, 2),
      companies,
      themes,
      evidence,
      analyses
    };
  }

  if (query.includes("공급계약")) {
    return {
      ...result,
      mode: "evidence",
      isIdle: false,
      exactResult: evidence[1],
      exactResultKind: "공식 근거",
      stocks: stocks.slice(0, 2),
      companies: [],
      themes: [themes[1]],
      evidence,
      analyses: analyses.slice(1)
    };
  }

  if (query.includes("삼성")) {
    return {
      ...result,
      mode: "typing",
      isIdle: false,
      exactResult: companies[0],
      exactResultKind: "기업",
      stocks: [stocks[0]],
      companies: [companies[0]],
      themes: themes.slice(0, 1),
      evidence: evidence.slice(0, 1),
      analyses: analyses.slice(0, 1)
    };
  }

  return {
    ...result,
    mode: "empty",
    isIdle: false,
    isEmpty: true,
    autocomplete: { stocks: [], companies: [], themes: [], evidence: [] }
  };
}
