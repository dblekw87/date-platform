export type ConfidenceState = "공식 확인" | "복수 출처 확인" | "단일 출처" | "미확인";

export type EvidenceFact = {
  fact: string;
  location: string;
  source: string;
  confidence: ConfidenceState;
  relatedEntity: string;
};

export type EvidenceRelation = {
  name: string;
  type: string;
  reason: string;
  href?: string;
  evidenceCount: string;
};

export type EvidenceTimeline = {
  time: string;
  title: string;
  linked: string;
  confidence: ConfidenceState;
};

export type EvidenceMock = {
  id: string;
  title: string;
  type: string;
  sourceName: string;
  sourceType: string;
  sourceTitle: string;
  sourceIdentifier: string;
  publishedAt: string;
  retrievedAt: string;
  lastCheckedAt: string;
  correctionState: string;
  confidence: ConfidenceState;
  relatedStocks: string[];
  relatedCompanies: string[];
  relatedThemes: string[];
  relatedMarkets: string[];
  quickView: {
    disclosed: string;
    whyCheck: string;
    keyFact: string;
    currentState: string;
    unresolved: string;
  };
  officialFacts: EvidenceFact[];
  cannotConfirm: string[];
  interpretationScope: {
    officialFact: string;
    possibleInterpretation: string;
    alternativeInterpretation: string;
    limitation: string;
  };
  relatedEntities: EvidenceRelation[];
  marketReaction: {
    before: string;
    after: string;
    volume: string;
    theme: string;
    index: string;
    caution: string;
  };
  timeline: EvidenceTimeline[];
  nextChecks: string[];
  linkedEvidence: {
    title: string;
    href: string;
    source: string;
    publishedAt: string;
    confidence: ConfidenceState;
    supports: string;
    limitation: string;
  }[];
};

const dartSamsung: EvidenceMock = {
  id: "dart-samsung-001",
  title: "삼성전자 공급망 검토 대상 관련 전자공시 Placeholder",
  type: "전자공시",
  sourceName: "OpenDART Placeholder",
  sourceType: "전자공시 시스템",
  sourceTitle: "반도체 공급망 검토 대상 관련 공시 예시",
  sourceIdentifier: "DART-PLACEHOLDER-001",
  publishedAt: "공개 시각 예시 09:30",
  retrievedAt: "원문 확인 예시 09:36",
  lastCheckedAt: "마지막 확인 예시 10:40",
  correctionState: "정정 공시 없음 Placeholder",
  confidence: "공식 확인",
  relatedStocks: ["005930", "000660"],
  relatedCompanies: ["삼성전자", "SK하이닉스"],
  relatedThemes: ["반도체", "AI 인프라"],
  relatedMarkets: ["KOSPI", "KOSPI 선물", "NASDAQ", "USD/KRW"],
  quickView: {
    disclosed: "반도체 공급망 검토 대상과 관련된 공식 공시 후보가 공개됐습니다.",
    whyCheck: "국내 대형 반도체 기업의 공급망 노출과 관련 기업 비교에 연결될 수 있습니다.",
    keyFact: "공시 시각과 검토 대상 범위 일부가 원문에서 확인됩니다.",
    currentState: "공식 문서 확인 상태입니다.",
    unresolved: "실적 반영 시점과 정책 적용 범위는 추가 확인이 필요합니다."
  },
  officialFacts: [
    {
      fact: "공시가 공개된 시각은 예시 09:30입니다.",
      location: "원문 머리말",
      source: "OpenDART Placeholder",
      confidence: "공식 확인",
      relatedEntity: "삼성전자"
    },
    {
      fact: "검토 대상 범위에 반도체 공급망 항목이 포함됩니다.",
      location: "주요 내용 항목",
      source: "OpenDART Placeholder",
      confidence: "공식 확인",
      relatedEntity: "삼성전자 · SK하이닉스"
    },
    {
      fact: "후속 세부 조건은 별도 확인 대상으로 남아 있습니다.",
      location: "추가 설명 항목",
      source: "OpenDART Placeholder",
      confidence: "공식 확인",
      relatedEntity: "반도체 공급망"
    }
  ],
  cannotConfirm: [
    "공식 문서만으로 실적 개선 여부를 단정할 수 없습니다.",
    "주가 반응의 직접 원인이 이 공시라고 확정할 수 없습니다.",
    "정책 시행 시점과 유예 기간은 아직 확인되지 않았습니다.",
    "관련 해외 기업의 공식 입장은 별도 문서가 필요합니다."
  ],
  interpretationScope: {
    officialFact: "이 공시는 공급망 검토 대상 관련 공식 정보가 공개됐다는 사실을 확인합니다.",
    possibleInterpretation: "관련 기업의 공급망 노출을 비교하는 분석 출발점이 될 수 있습니다.",
    alternativeInterpretation: "시장 반응은 환율, 미국 선물, 업종 수급 등 다른 요인과 동시에 발생했을 수 있습니다.",
    limitation: "실적 영향과 가격 방향은 이 근거만으로 판단하지 않습니다."
  },
  relatedEntities: [
    { name: "삼성전자", type: "직접 관련 종목", reason: "공시와 직접 연결된 국내 대형 반도체 기업입니다.", href: "/kr/stock/005930", evidenceCount: "근거 3개" },
    { name: "SK하이닉스", type: "공급망 관련 기업", reason: "HBM과 메모리 공급망 비교 대상으로 함께 확인합니다.", href: "/kr/stock/000660", evidenceCount: "근거 2개" },
    { name: "NVIDIA", type: "관련 미국 기업", reason: "AI 인프라와 HBM 수요 흐름에서 연결됩니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" },
    { name: "반도체 ETF", type: "관련 ETF", reason: "테마 확산 여부를 확인하는 보조 경로입니다.", href: "/kr/theme", evidenceCount: "근거 3개" }
  ],
  marketReaction: {
    before: "공개 전 가격 상태 Mock: 장 초반 보합권 예시",
    after: "공개 후 가격 상태 Mock: 변동 확대 여부 확인 중",
    volume: "거래량 변화 Mock: 평소 대비 확인 중",
    theme: "관련 테마 반응: 반도체 테마 확산 여부 확인",
    index: "관련 지수 반응: KOSPI와 KOSPI 선물 동시 확인",
    caution: "시장 반응은 Evidence와 동시에 발생한 변화이며 직접적인 인과관계가 확인되지 않을 수 있습니다."
  },
  timeline: [
    { time: "09:30", title: "공식 전자공시 공개", linked: "OpenDART Placeholder", confidence: "공식 확인" },
    { time: "09:36", title: "원문 항목 확인", linked: "공시 주요 내용", confidence: "공식 확인" },
    { time: "10:05", title: "관련 시장 반응 확인", linked: "KOSPI · KOSPI 선물", confidence: "단일 출처" },
    { time: "10:40", title: "분석 업데이트 필요 항목 표시", linked: "미확인 항목", confidence: "미확인" }
  ],
  nextChecks: ["후속 공시 확인", "정책 적용 대상 기업 범위 확인", "실적 반영 시점 확인", "관련 해외 기업 공식 발표 확인"],
  linkedEvidence: [
    {
      title: "HBM 수요 확대와 AI 인프라 투자 연결 근거",
      href: "/kr/evidence?id=ir-semiconductor-001",
      source: "기업 IR Placeholder",
      publishedAt: "공개 시각 예시 10:20",
      confidence: "복수 출처 확인",
      supports: "AI 인프라 투자와 HBM 수요가 같은 테마에서 연결됩니다.",
      limitation: "개별 기업 실적 영향은 직접 확인되지 않았습니다."
    }
  ]
};

const irSemiconductor: EvidenceMock = {
  ...dartSamsung,
  id: "ir-semiconductor-001",
  title: "AI 인프라 투자 확대 관련 기업 공식 발표 Placeholder",
  type: "기업 공식 발표",
  sourceName: "기업 IR Placeholder",
  sourceType: "기업 공식 발표",
  sourceTitle: "AI 인프라 투자 확대와 공급망 관련 발표 예시",
  sourceIdentifier: "IR-PLACEHOLDER-001",
  publishedAt: "공개 시각 예시 10:20",
  retrievedAt: "원문 확인 예시 10:27",
  lastCheckedAt: "마지막 확인 예시 11:10",
  confidence: "복수 출처 확인",
  relatedStocks: ["000660", "005930", "NVDA"],
  relatedCompanies: ["SK하이닉스", "삼성전자", "NVIDIA", "Micron"],
  relatedThemes: ["HBM", "AI 인프라", "반도체"],
  relatedMarkets: ["KOSPI", "NASDAQ", "NASDAQ 선물"],
  quickView: {
    disclosed: "AI 인프라 투자 확대와 공급망 관련 기업 발표가 확인됐습니다.",
    whyCheck: "HBM 수요와 국내 반도체 공급망을 함께 비교할 수 있는 근거입니다.",
    keyFact: "발표 주체, 공개 시각, 투자 확대 방향이 공식 자료에서 확인됩니다.",
    currentState: "복수 출처 확인 상태입니다.",
    unresolved: "국내 개별 기업의 매출 반영 규모는 아직 단정할 수 없습니다."
  },
  officialFacts: [
    {
      fact: "AI 인프라 투자 확대 방향이 기업 공식 발표에 포함됐습니다.",
      location: "IR 발표 주요 내용",
      source: "기업 IR Placeholder",
      confidence: "복수 출처 확인",
      relatedEntity: "NVIDIA · SK하이닉스"
    },
    {
      fact: "HBM과 메모리 공급망이 관련 항목으로 언급됩니다.",
      location: "공급망 설명 항목",
      source: "기업 IR Placeholder",
      confidence: "복수 출처 확인",
      relatedEntity: "SK하이닉스 · 삼성전자"
    }
  ],
  cannotConfirm: [
    "국내 기업별 공급 물량은 공식적으로 확인되지 않았습니다.",
    "발표 내용만으로 특정 종목의 가격 방향을 판단할 수 없습니다.",
    "ETF 구성 변화는 별도 자료 확인이 필요합니다."
  ],
  interpretationScope: {
    officialFact: "이 발표는 AI 인프라 투자 확대 방향이 공식적으로 공개됐다는 사실을 확인합니다.",
    possibleInterpretation: "HBM과 메모리 공급망 관련 기업을 비교하는 근거로 사용할 수 있습니다.",
    alternativeInterpretation: "시장 반응은 기술주 선물, 환율, 금리 기대 변화와 함께 해석해야 합니다.",
    limitation: "개별 기업 실적 반영 규모는 공식 자료만으로 산정하지 않습니다."
  },
  relatedEntities: [
    { name: "SK하이닉스", type: "직접 관련 종목", reason: "HBM 수요와 직접 연결되는 국내 반도체 기업입니다.", href: "/kr/stock/000660", evidenceCount: "근거 2개" },
    { name: "삼성전자", type: "공급망 관련 기업", reason: "메모리와 HBM 공급망 비교 대상으로 연결됩니다.", href: "/kr/stock/005930", evidenceCount: "근거 3개" },
    { name: "NVIDIA", type: "관련 미국 기업", reason: "AI 인프라 투자 수요의 주요 연결점입니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" },
    { name: "Micron", type: "경쟁 기업", reason: "메모리 공급 경쟁 구도에서 비교합니다.", href: "/kr/stock/MU", evidenceCount: "근거 1개" }
  ],
  marketReaction: {
    before: "공개 전 가격 상태 Mock: 기술주 선물 확인 중",
    after: "공개 후 가격 상태 Mock: HBM 관련 종목 반응 확인 중",
    volume: "거래량 변화 Mock: 관련 종목별 차이 확인 중",
    theme: "관련 테마 반응: AI 인프라와 HBM 테마 동시 확인",
    index: "관련 지수 반응: NASDAQ 선물과 KOSPI 반도체 흐름 확인",
    caution: "시장 반응은 발표와 동시에 관찰된 변화이며 직접 원인으로 단정하지 않습니다."
  },
  timeline: [
    { time: "10:20", title: "기업 공식 발표 공개", linked: "기업 IR Placeholder", confidence: "공식 확인" },
    { time: "10:27", title: "공급망 관련 항목 확인", linked: "원문 주요 내용", confidence: "복수 출처 확인" },
    { time: "10:45", title: "관련 미국 기업과 국내 기업 반응 비교", linked: "시장 데이터", confidence: "단일 출처" },
    { time: "11:10", title: "개별 기업 영향 미확인 항목 표시", linked: "추가 확인 항목", confidence: "미확인" }
  ],
  nextChecks: ["관련 기업 후속 발표 확인", "공급 물량 또는 계약 조건 확인", "ETF 구성 변화 확인", "NASDAQ 선물 반응 재확인"],
  linkedEvidence: [
    {
      title: "삼성전자 공급망 검토 대상 관련 전자공시 Placeholder",
      href: "/kr/evidence?id=dart-samsung-001",
      source: "OpenDART Placeholder",
      publishedAt: "공개 시각 예시 09:30",
      confidence: "공식 확인",
      supports: "공급망 검토 대상 관련 공식 문서가 존재합니다.",
      limitation: "정책 적용 범위는 아직 단정할 수 없습니다."
    }
  ]
};

const unknownEvidence: EvidenceMock = {
  id: "unknown",
  title: "확인 가능한 공식 정보가 없습니다.",
  type: "투자 근거 Placeholder",
  sourceName: "출처 없음",
  sourceType: "문서 유형 없음",
  sourceTitle: "문서 제목 없음",
  sourceIdentifier: "식별자 없음",
  publishedAt: "공개 시각 없음",
  retrievedAt: "원문 확인 없음",
  lastCheckedAt: "마지막 확인 없음",
  correctionState: "정정 여부 없음",
  confidence: "미확인",
  relatedStocks: [],
  relatedCompanies: [],
  relatedThemes: [],
  relatedMarkets: [],
  quickView: {
    disclosed: "공식적으로 확인된 정보가 없습니다.",
    whyCheck: "정확한 근거 식별자나 공식 출처를 먼저 확인해야 합니다.",
    keyFact: "현재 원문에서 확인 가능한 사실이 없습니다.",
    currentState: "미확인 상태입니다.",
    unresolved: "출처, 공개 시각, 관련 종목이 모두 확인 대상입니다."
  },
  officialFacts: [],
  cannotConfirm: ["공식 문서 존재 여부", "공개 시각", "관련 종목", "시장 반응과의 연결", "분석에 사용할 수 있는 사실"],
  interpretationScope: {
    officialFact: "현재 공식 사실을 확인할 수 없습니다.",
    possibleInterpretation: "검색 또는 시장 화면에서 공식 출처가 있는 근거를 다시 선택해야 합니다.",
    alternativeInterpretation: "입력한 식별자가 잘못됐거나 아직 Prototype 데이터에 없는 근거일 수 있습니다.",
    limitation: "이 상태는 기술 오류가 아니라 공식 정보 없음 Placeholder입니다."
  },
  relatedEntities: [],
  marketReaction: {
    before: "공개 전 가격 상태 없음",
    after: "공개 후 가격 상태 없음",
    volume: "거래량 변화 없음",
    theme: "관련 테마 없음",
    index: "관련 지수 없음",
    caution: "공식 정보가 없으므로 시장 반응과 연결하지 않습니다."
  },
  timeline: [{ time: "확인 필요", title: "공식 원문이 연결되지 않았습니다.", linked: "검색 필요", confidence: "미확인" }],
  nextChecks: ["공식 출처 검색", "관련 종목에서 근거 다시 확인", "시장 화면으로 돌아가기"],
  linkedEvidence: []
};

export function getEvidenceMock(id?: string | string[]): EvidenceMock {
  const value = Array.isArray(id) ? id[0] : id;
  const normalized = value?.trim().toLowerCase() ?? "dart-samsung-001";

  if (normalized === "dart-samsung-001") {
    return dartSamsung;
  }

  if (normalized === "ir-semiconductor-001") {
    return irSemiconductor;
  }

  return { ...unknownEvidence, id: value || "unknown" };
}
