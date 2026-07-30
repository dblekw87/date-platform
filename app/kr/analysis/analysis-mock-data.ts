export type AnalysisStatus =
  | "작성 중"
  | "근거 확인 중"
  | "추가 확인 필요"
  | "새 근거 검토 필요"
  | "현재 판단 유지"
  | "판단 수정 필요"
  | "검토 완료"
  | "종료";

export type ConfidenceState = "공식 확인" | "복수 출처 확인" | "단일 출처" | "미확인";

export type AnalysisMock = {
  id: string;
  title: string;
  status: AnalysisStatus;
  primaryAction: string;
  updatedAt: string;
  currentQuestion: {
    text: string;
    author: string;
    editedAt: string;
  };
  target: {
    name: string;
    code: string;
    market: string;
    company: string;
    theme: string;
    event: string;
  };
  summary: {
    newChange: string;
    evidenceCount: string;
    relatedCount: string;
  };
  changes: {
    type: string;
    time: string;
    before: string;
    after: string;
    evidence: string;
    reviewNeeded: string;
  }[];
  officialFacts: {
    fact: string;
    source: string;
    publishedAt: string;
    confidence: ConfidenceState;
    evidenceHref: string;
    related: string;
  }[];
  marketObservations: {
    label: string;
    value: string;
    observedAt: string;
  }[];
  userInterpretation: {
    text: string;
    rationale: string;
    linkedEvidence: string;
    editedAt: string;
  };
  alternatives: {
    interpretation: string;
    reason: string;
    neededEvidence: string;
    state: ConfidenceState;
  }[];
  hypotheses: {
    text: string;
    state: "검토 중" | "일부 확인" | "확인 필요" | "반박 근거 존재" | "종료";
    linkedEvidence: string;
    requiredCondition: string;
    decision: string;
  }[];
  unknowns: {
    item: string;
    whyImportant: string;
    neededInfo: string;
    recheckCondition: string;
    linked: string;
  }[];
  reviewConditions: {
    condition: string;
    type: string;
    state: string;
    evidence: string;
    checkedAt: string;
    met: string;
  }[];
  evidence: {
    title: string;
    type: string;
    source: string;
    publishedAt: string;
    confidence: ConfidenceState;
    href: string;
    linkedSection: string;
    supports: string;
    limitation: string;
  }[];
  related: {
    name: string;
    type: string;
    reason: string;
    href?: string;
    evidenceCount: string;
  }[];
  themes: string[];
  nextChecks: {
    item: string;
    reason: string;
    due: string;
    evidence: string;
    done: string;
  }[];
  history: {
    time: string;
    title: string;
    linked: string;
    confidence: ConfidenceState;
    before: string;
    after: string;
    reason: string;
  }[];
};

const samsungAnalysis: AnalysisMock = {
  id: "samsung-semiconductor-001",
  title: "삼성전자 반도체 공급망 영향 분석",
  status: "새 근거 검토 필요",
  primaryAction: "새 근거 검토하기",
  updatedAt: "마지막 업데이트 예시 11:20",
  currentQuestion: {
    text: "반도체 규제 변화가 삼성전자의 공급망과 실적에 실제로 영향을 주는가?",
    author: "사용자 작성 Placeholder",
    editedAt: "질문 수정 예시 10:50"
  },
  target: {
    name: "삼성전자",
    code: "005930",
    market: "KOSPI",
    company: "Samsung Electronics Co., Ltd.",
    theme: "반도체 · AI 인프라",
    event: "반도체 규제 범위 확대 가능성"
  },
  summary: {
    newChange: "새로운 공식 근거 후보가 기존 미확인 내용과 연결됐습니다.",
    evidenceCount: "연결된 근거 3개",
    relatedCount: "관련 종목 2개"
  },
  changes: [
    {
      type: "새로운 공식 투자 근거 추가",
      time: "변경 시각 예시 11:10",
      before: "정책 적용 범위 미확인",
      after: "공식 문서 후보에서 일부 범위 확인",
      evidence: "dart-samsung-001",
      reviewNeeded: "기존 해석과 판단 변경 조건을 다시 확인해야 합니다."
    },
    {
      type: "관련 시장 변화",
      time: "관찰 시각 예시 10:45",
      before: "KOSPI 선물 반응 확인 전",
      after: "KOSPI 선물과 반도체 테마 동시 반응 관찰",
      evidence: "시장 데이터 Placeholder",
      reviewNeeded: "시장 반응은 원인으로 단정하지 않고 보조 기준으로만 봅니다."
    }
  ],
  officialFacts: [
    {
      fact: "공식 문서 후보에서 반도체 공급망 검토 대상 범위 일부가 확인됩니다.",
      source: "OpenDART Placeholder",
      publishedAt: "공개 시각 예시 09:30",
      confidence: "공식 확인",
      evidenceHref: "/kr/evidence?id=dart-samsung-001",
      related: "삼성전자 · SK하이닉스"
    },
    {
      fact: "AI 인프라 투자 확대와 HBM 수요가 같은 테마 안에서 연결됩니다.",
      source: "기업 IR Placeholder",
      publishedAt: "공개 시각 예시 10:20",
      confidence: "복수 출처 확인",
      evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
      related: "NVIDIA · SK하이닉스"
    }
  ],
  marketObservations: [
    { label: "가격 변화 Mock", value: "장중 변동 확대 여부 확인 중", observedAt: "관찰 시각 예시 10:45" },
    { label: "거래량 변화 Mock", value: "평소 대비 확인 중", observedAt: "관찰 시각 예시 10:45" },
    { label: "관련 지수 변화", value: "KOSPI와 KOSPI 선물 동시 확인", observedAt: "관찰 시각 예시 10:50" },
    { label: "관련 기업 반응", value: "SK하이닉스와 NVIDIA 반응 비교 필요", observedAt: "관찰 시각 예시 11:00" }
  ],
  userInterpretation: {
    text: "현재 정보는 삼성전자 공급망 노출 가능성을 검토하게 하지만, 실적 영향은 아직 확인되지 않았습니다.",
    rationale: "공식 문서와 시장 반응이 같은 시간대에 관찰됐지만 직접 인과관계는 확인되지 않았습니다.",
    linkedEvidence: "dart-samsung-001",
    editedAt: "내 해석 수정 예시 11:15"
  },
  alternatives: [
    {
      interpretation: "시장 반응은 반도체 규제보다 미국 선물과 환율 변화의 영향일 수 있습니다.",
      reason: "NASDAQ 선물과 USD/KRW 변화가 같은 시간대에 관찰됐습니다.",
      neededEvidence: "시장 기준점 변화와 관련 기업 공식 발표",
      state: "단일 출처"
    },
    {
      interpretation: "공급망 영향은 삼성전자보다 HBM 노출도가 큰 기업에 더 직접적일 수 있습니다.",
      reason: "HBM 수요 관련 근거가 별도로 확인됐습니다.",
      neededEvidence: "기업별 공급 물량 또는 계약 조건",
      state: "미확인"
    }
  ],
  hypotheses: [
    {
      text: "정책 적용 범위가 메모리 공급망까지 확대되면 관련 기업 비교가 필요하다.",
      state: "확인 필요",
      linkedEvidence: "dart-samsung-001",
      requiredCondition: "정책 적용 대상 기업 또는 품목의 공식 확정",
      decision: "유지"
    },
    {
      text: "AI 인프라 투자 확대가 HBM 수요를 통해 국내 반도체 기업에 연결될 수 있다.",
      state: "일부 확인",
      linkedEvidence: "ir-semiconductor-001",
      requiredCondition: "국내 기업 공급 물량 또는 계약 조건 확인",
      decision: "유지"
    }
  ],
  unknowns: [
    {
      item: "정책 적용 대상 기업의 정확한 범위",
      whyImportant: "공급망 노출 해석의 전제가 됩니다.",
      neededInfo: "공식 시행 문서 또는 기관 발표",
      recheckCondition: "후속 공시 또는 기관 발표가 나올 때",
      linked: "dart-samsung-001"
    },
    {
      item: "실적 반영 시점",
      whyImportant: "현재 해석이 단기 실적 영향으로 확대되는 것을 막기 위해 필요합니다.",
      neededInfo: "기업 실적 발표 또는 가이던스",
      recheckCondition: "다음 실적 발표 전후",
      linked: "ir-semiconductor-001"
    }
  ],
  reviewConditions: [
    {
      condition: "후속 공시에서 적용 대상이 삼성전자 공급망과 직접 연결될 때",
      type: "공식 공시 발생",
      state: "대기 중",
      evidence: "dart-samsung-001",
      checkedAt: "마지막 확인 예시 11:20",
      met: "미충족"
    },
    {
      condition: "관련 기업이 공식 발표에서 공급 물량 또는 계약 조건을 공개할 때",
      type: "관련 기업 공식 발표",
      state: "추가 확인 필요",
      evidence: "ir-semiconductor-001",
      checkedAt: "마지막 확인 예시 11:20",
      met: "일부 충족"
    }
  ],
  evidence: [
    {
      title: "삼성전자 공급망 검토 대상 관련 전자공시 Placeholder",
      type: "전자공시",
      source: "OpenDART Placeholder",
      publishedAt: "공개 시각 예시 09:30",
      confidence: "공식 확인",
      href: "/kr/evidence?id=dart-samsung-001",
      linkedSection: "공식 사실 · 판단 변경 조건",
      supports: "공급망 검토 대상 관련 공식 문서 후보가 확인됩니다.",
      limitation: "정책 적용 범위와 실적 영향은 단정할 수 없습니다."
    },
    {
      title: "AI 인프라 투자 확대 관련 기업 공식 발표 Placeholder",
      type: "기업 공식 발표",
      source: "기업 IR Placeholder",
      publishedAt: "공개 시각 예시 10:20",
      confidence: "복수 출처 확인",
      href: "/kr/evidence?id=ir-semiconductor-001",
      linkedSection: "내 해석 · 다른 해석",
      supports: "AI 인프라 투자와 HBM 수요 연결을 확인합니다.",
      limitation: "개별 기업 실적 반영 규모는 확인되지 않았습니다."
    }
  ],
  related: [
    { name: "삼성전자", type: "대표 종목", reason: "현재 분석의 중심 대상입니다.", href: "/kr/stock/005930", evidenceCount: "근거 3개" },
    { name: "SK하이닉스", type: "관련 종목", reason: "HBM과 메모리 공급망 비교 대상입니다.", href: "/kr/stock/000660", evidenceCount: "근거 2개" },
    { name: "NVIDIA", type: "관련 기업", reason: "AI 인프라와 HBM 수요 연결점입니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" }
  ],
  themes: ["반도체", "AI 인프라", "공급망"],
  nextChecks: [
    { item: "후속 공시 확인", reason: "정책 적용 범위를 확인해야 합니다.", due: "다음 확인 예시 15:00", evidence: "dart-samsung-001", done: "대기 중" },
    { item: "관련 기업 공식 발표 확인", reason: "공급 물량과 계약 조건 확인이 필요합니다.", due: "다음 확인 예시 장 마감 후", evidence: "ir-semiconductor-001", done: "진행 전" }
  ],
  history: [
    {
      time: "11:20",
      title: "분석 상태 변경",
      linked: "새 근거 검토 필요",
      confidence: "공식 확인",
      before: "근거 확인 중",
      after: "새 근거 검토 필요",
      reason: "새 공식 근거 후보가 추가됐습니다."
    },
    {
      time: "11:15",
      title: "내 해석 수정",
      linked: "dart-samsung-001",
      confidence: "단일 출처",
      before: "공급망 영향 가능성만 기록",
      after: "실적 영향은 미확인으로 분리",
      reason: "공식 사실과 해석 범위를 분리했습니다."
    }
  ]
};

const hynixAnalysis: AnalysisMock = {
  ...samsungAnalysis,
  id: "hynix-hbm-001",
  title: "SK하이닉스 HBM 수요 변화 분석",
  status: "추가 확인 필요",
  primaryAction: "추가 확인 내용 정리하기",
  updatedAt: "마지막 업데이트 예시 11:05",
  currentQuestion: {
    text: "HBM 공급 확대가 SK하이닉스의 실적에 언제 반영되는가?",
    author: "사용자 작성 Placeholder",
    editedAt: "질문 수정 예시 10:35"
  },
  target: {
    name: "SK하이닉스",
    code: "000660",
    market: "KOSPI",
    company: "SK hynix Inc.",
    theme: "HBM · 반도체",
    event: "AI 인프라 투자 확대"
  },
  summary: {
    newChange: "HBM 수요 연결 근거는 확인됐지만 공급 물량과 반영 시점은 아직 확인이 필요합니다.",
    evidenceCount: "연결된 근거 2개",
    relatedCount: "관련 종목 3개"
  },
  changes: [
    {
      type: "관련 기업 공식 발표",
      time: "변경 시각 예시 10:20",
      before: "HBM 수요 연결 근거 부족",
      after: "기업 발표에서 AI 인프라 투자 확대 확인",
      evidence: "ir-semiconductor-001",
      reviewNeeded: "HBM 공급 확대가 개별 실적에 반영되는 시점은 별도 확인이 필요합니다."
    }
  ],
  officialFacts: [
    {
      fact: "기업 공식 발표에서 AI 인프라 투자 확대 방향이 확인됩니다.",
      source: "기업 IR Placeholder",
      publishedAt: "공개 시각 예시 10:20",
      confidence: "복수 출처 확인",
      evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
      related: "SK하이닉스 · NVIDIA"
    }
  ],
  userInterpretation: {
    text: "HBM 수요 방향은 긍정적인 분석 재료가 될 수 있지만 공급 물량과 가격 조건은 아직 확인되지 않았습니다.",
    rationale: "공식 발표는 수요 방향을 확인하지만 개별 기업 실적 규모를 직접 확인하지 않습니다.",
    linkedEvidence: "ir-semiconductor-001",
    editedAt: "내 해석 수정 예시 10:55"
  },
  related: [
    { name: "SK하이닉스", type: "대표 종목", reason: "현재 분석의 중심 대상입니다.", href: "/kr/stock/000660", evidenceCount: "근거 2개" },
    { name: "삼성전자", type: "관련 종목", reason: "메모리와 HBM 공급망 비교 대상입니다.", href: "/kr/stock/005930", evidenceCount: "근거 3개" },
    { name: "NVIDIA", type: "관련 기업", reason: "AI 인프라와 HBM 수요 연결점입니다.", href: "/kr/stock/NVDA", evidenceCount: "근거 2개" },
    { name: "Micron", type: "경쟁 기업", reason: "메모리 공급 경쟁 구도에서 비교합니다.", href: "/kr/stock/MU", evidenceCount: "근거 1개" }
  ],
  themes: ["HBM", "반도체", "AI 인프라"],
  nextChecks: [
    { item: "공급 물량 확인", reason: "수요가 실제 매출로 연결되는지 확인해야 합니다.", due: "다음 확인 예시 장 마감 후", evidence: "ir-semiconductor-001", done: "대기 중" },
    { item: "실적 반영 시점 확인", reason: "분기별 실적 영향 해석을 제한하기 위해 필요합니다.", due: "다음 실적 발표 전후", evidence: "기업 실적 발표", done: "진행 전" }
  ]
};

const unknownAnalysis: AnalysisMock = {
  ...samsungAnalysis,
  id: "unknown",
  title: "확인할 수 없는 분석입니다.",
  status: "작성 중",
  primaryAction: "새 분석 시작하기",
  updatedAt: "마지막 업데이트 없음",
  currentQuestion: {
    text: "분석 질문이 아직 없습니다.",
    author: "작성자 없음",
    editedAt: "수정 시각 없음"
  },
  target: {
    name: "분석 대상 없음",
    code: "코드 없음",
    market: "시장 없음",
    company: "기업 정보 없음",
    theme: "관련 테마 없음",
    event: "주요 변화 없음"
  },
  summary: {
    newChange: "해당 분석을 확인할 수 없습니다.",
    evidenceCount: "연결된 근거 없음",
    relatedCount: "관련 종목 없음"
  },
  changes: [],
  officialFacts: [],
  marketObservations: [],
  userInterpretation: {
    text: "사용자 해석이 없습니다.",
    rationale: "공식 근거가 연결되지 않았습니다.",
    linkedEvidence: "없음",
    editedAt: "수정 시각 없음"
  },
  alternatives: [],
  hypotheses: [],
  unknowns: [],
  reviewConditions: [],
  evidence: [],
  related: [],
  themes: [],
  nextChecks: [],
  history: []
};

export function getAnalysisMock(id?: string | string[]): AnalysisMock {
  const value = Array.isArray(id) ? id[0] : id;
  const normalized = value?.trim().toLowerCase() ?? "samsung-semiconductor-001";

  if (normalized === "samsung-semiconductor-001") {
    return samsungAnalysis;
  }

  if (normalized === "hynix-hbm-001") {
    return hynixAnalysis;
  }

  return { ...unknownAnalysis, id: value || "unknown" };
}
