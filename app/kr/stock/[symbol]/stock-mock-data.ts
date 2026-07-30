export type StockEvidence = {
  title: string;
  source: string;
  publishedAt: string;
  confidence: "공식 확인" | "복수 출처 확인" | "단일 출처" | "미확인";
  supports: string;
  limitation: string;
  relatedCompanies: string;
  relatedMarket: string;
  relatedTheme: string;
};

export type RelatedEntity = {
  name: string;
  type: string;
  reason: string;
  href?: string;
  evidenceCount: string;
};

export type StockMock = {
  symbol: string;
  name: string;
  market: string;
  kind: string;
  sector: string;
  themes: string[];
  price: string;
  change: string;
  sessionState: string;
  updatedAt: string;
  firstChange: string;
  confidence: "공식 확인" | "복수 출처 확인" | "단일 출처" | "미확인";
  causalLabel: string;
  changeSummary: string;
  whyItMayMatter: string;
  confirmedFacts: string[];
  notConfirmed: string[];
  relatedMarkets: string[];
  leadEvidence: StockEvidence;
  supportingEvidence: StockEvidence[];
  alternativeEvidence: StockEvidence[];
  openQuestions: {
    title: string;
    needed: string;
    recheck: string;
    limitation: string;
  }[];
  marketReaction: {
    priceFlow: string;
    volume: string;
    index: string;
    theme: string;
  };
  relatedEntities: RelatedEntity[];
  timeline: {
    time: string;
    title: string;
    linked: string;
    confidence: "공식 확인" | "복수 출처 확인" | "단일 출처" | "미확인";
  }[];
};

const samsung: StockMock = {
  symbol: "005930",
  name: "삼성전자",
  market: "KOSPI",
  kind: "종목·기업",
  sector: "반도체",
  themes: ["반도체", "AI 인프라"],
  price: "현재가 예시 xx,xxx",
  change: "예시 +0.0%",
  sessionState: "장 중",
  updatedAt: "마지막 업데이트 예시 10:40",
  firstChange: "반도체 규제 범위 확대 가능성과 HBM 공급망 영향을 먼저 확인해야 합니다.",
  confidence: "공식 확인",
  causalLabel: "움직임과 연결된 정보",
  changeSummary: "공식 발표 후보가 반도체 공급망과 매출 노출 판단에 연결될 수 있습니다.",
  whyItMayMatter: "국내 대형 반도체 기업의 수출, 장비, HBM 공급망 해석에 영향을 줄 수 있습니다.",
  confirmedFacts: ["관련 공식 발표 후보가 감지됐습니다.", "관련 시장은 KOSPI와 NASDAQ입니다.", "관련 테마는 반도체와 AI 인프라입니다."],
  notConfirmed: ["정책 적용 범위는 아직 확정되지 않았습니다.", "시행 시점과 유예 기간은 추가 확인이 필요합니다."],
  relatedMarkets: ["KOSPI", "KOSPI 선물", "NASDAQ", "USD/KRW"],
  leadEvidence: {
    title: "반도체 규제 범위 확대 가능성 관련 공식 발표 후보",
    source: "공식 출처 Placeholder",
    publishedAt: "공개 시각 예시 09:30",
    confidence: "공식 확인",
    supports: "관련 발표 후보가 삼성전자 공급망 검토 대상과 연결될 수 있음을 확인합니다.",
    limitation: "규제 적용 범위와 시행 시점은 아직 단정할 수 없습니다.",
    relatedCompanies: "SK하이닉스 · NVIDIA · Apple",
    relatedMarket: "KOSPI · NASDAQ",
    relatedTheme: "반도체 · AI 인프라"
  },
  supportingEvidence: [
    {
      title: "AI 인프라 투자 확대와 HBM 수요 연결 후보",
      source: "공식 발표 Placeholder",
      publishedAt: "마지막 확인 예시 10:20",
      confidence: "복수 출처 확인",
      supports: "HBM 수요와 AI 인프라 투자가 같은 테마 안에서 연결됩니다.",
      limitation: "삼성전자 실적 영향으로 직접 단정할 수 없습니다.",
      relatedCompanies: "NVIDIA · SK하이닉스",
      relatedMarket: "NASDAQ · KOSPI",
      relatedTheme: "AI 인프라"
    }
  ],
  alternativeEvidence: [
    {
      title: "환율 변화가 수출주 해석에 미치는 영향",
      source: "시장 데이터 Placeholder",
      publishedAt: "마지막 확인 예시 11:10",
      confidence: "단일 출처",
      supports: "USD/KRW 변화가 수출주 해석의 보조 기준점이 됩니다.",
      limitation: "환율만으로 종목 움직임의 원인을 단정할 수 없습니다.",
      relatedCompanies: "대형 수출주",
      relatedMarket: "USD/KRW",
      relatedTheme: "환율 민감도"
    }
  ],
  openQuestions: [
    {
      title: "정책 적용 대상 기업의 범위",
      needed: "공식 시행 문서 또는 기관 발표",
      recheck: "다시 확인 예시 15:00",
      limitation: "현재 해석은 공급망 노출 가능성에 머뭅니다."
    }
  ],
  marketReaction: {
    priceFlow: "작은 가격 흐름 Placeholder",
    volume: "거래량 예시: 평소 대비 확인 중",
    index: "KOSPI와 KOSPI 선물 동시 확인",
    theme: "반도체 테마 확산 여부 확인"
  },
  relatedEntities: [
    { name: "SK하이닉스", type: "같은 산업 기업", reason: "HBM과 메모리 공급망으로 연결됩니다.", href: "/kr/stock/000660", evidenceCount: "근거 2개" },
    { name: "NVIDIA", type: "관련 미국 기업", reason: "AI 인프라와 HBM 수요의 주요 연결점입니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" },
    { name: "Apple", type: "공급망 관련 기업", reason: "AI 기기와 부품 공급망 해석에 연결됩니다.", href: "/kr/stock/AAPL", evidenceCount: "근거 1개" },
    { name: "반도체 ETF", type: "관련 ETF", reason: "테마 확산을 확인하는 보조 경로입니다.", href: "/kr/theme", evidenceCount: "근거 3개" }
  ],
  timeline: [
    { time: "미국장 종료", title: "NASDAQ 선물과 반도체 관련주 반응 확인", linked: "시장 데이터", confidence: "복수 출처 확인" },
    { time: "공식 정보", title: "반도체 규제 관련 발표 후보 감지", linked: "대표 근거", confidence: "공식 확인" },
    { time: "한국장 개장", title: "KOSPI 선물과 삼성전자 반응 비교", linked: "시장 반응", confidence: "단일 출처" },
    { time: "장 중", title: "관련 테마와 종목으로 영향 범위 확장", linked: "분석 업데이트", confidence: "미확인" }
  ]
};

const hynix: StockMock = {
  ...samsung,
  symbol: "000660",
  name: "SK하이닉스",
  sector: "반도체",
  themes: ["HBM", "반도체"],
  firstChange: "HBM 수요와 AI 인프라 투자 확대 근거를 먼저 확인해야 합니다.",
  changeSummary: "AI 인프라 투자 확대와 HBM 공급망 관련 정보가 연결됐습니다.",
  relatedMarkets: ["KOSPI", "KOSPI 선물", "NASDAQ"],
  leadEvidence: {
    ...samsung.leadEvidence,
    title: "HBM 수요 확대와 AI 인프라 투자 연결 근거",
    relatedCompanies: "삼성전자 · NVIDIA · Micron",
    relatedTheme: "HBM · 반도체"
  },
  relatedEntities: [
    { name: "삼성전자", type: "같은 산업 기업", reason: "메모리와 HBM 공급망에서 함께 비교됩니다.", href: "/kr/stock/005930", evidenceCount: "근거 3개" },
    { name: "NVIDIA", type: "관련 미국 기업", reason: "AI 가속기와 HBM 수요의 주요 연결점입니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" },
    { name: "Micron", type: "경쟁 기업", reason: "메모리 공급 경쟁 구도에서 비교됩니다.", href: "/kr/stock/MU", evidenceCount: "근거 1개" }
  ]
};

const unknownStock: StockMock = {
  symbol: "UNKNOWN",
  name: "확인되지 않은 종목",
  market: "시장 미확인",
  kind: "종목 Placeholder",
  sector: "업종 미확인",
  themes: ["관련 테마 없음"],
  price: "현재가 예시 없음",
  change: "등락 예시 없음",
  sessionState: "확인 불가",
  updatedAt: "마지막 업데이트 없음",
  firstChange: "공식 정보가 확인되지 않은 종목입니다.",
  confidence: "미확인",
  causalLabel: "현재 확인된 변화",
  changeSummary: "이 종목에 연결된 공식 정보가 아직 없습니다.",
  whyItMayMatter: "정확한 종목 코드나 공식 정보를 확인한 뒤 분석을 시작해야 합니다.",
  confirmedFacts: ["입력한 종목 코드에 대한 Prototype 데이터가 없습니다."],
  notConfirmed: ["종목명, 시장, 관련 근거, 관련 기업을 확인할 수 없습니다."],
  relatedMarkets: ["시장 미확인"],
  leadEvidence: {
    title: "공식 정보 없음",
    source: "출처 없음",
    publishedAt: "공개 시각 없음",
    confidence: "미확인",
    supports: "현재 확인할 수 있는 공식 정보가 없습니다.",
    limitation: "종목과 근거를 연결할 수 없습니다.",
    relatedCompanies: "없음",
    relatedMarket: "없음",
    relatedTheme: "없음"
  },
  supportingEvidence: [],
  alternativeEvidence: [],
  openQuestions: [
    {
      title: "종목 코드 확인",
      needed: "정확한 종목 코드 또는 검색 결과",
      recheck: "검색에서 다시 확인",
      limitation: "현재 화면은 오류가 아니라 Placeholder 상태입니다."
    }
  ],
  marketReaction: {
    priceFlow: "가격 흐름 없음",
    volume: "거래량 없음",
    index: "관련 지수 없음",
    theme: "관련 테마 없음"
  },
  relatedEntities: [],
  timeline: [
    { time: "확인 필요", title: "공식 정보가 아직 연결되지 않았습니다.", linked: "검색 필요", confidence: "미확인" }
  ]
};

export function getStockMock(symbol: string): StockMock {
  const normalized = symbol.trim().toUpperCase();

  if (normalized === "005930") {
    return samsung;
  }

  if (normalized === "000660") {
    return hynix;
  }

  return { ...unknownStock, symbol };
}
