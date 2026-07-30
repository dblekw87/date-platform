export type ChangeView = "latest" | "analysis" | "empty";

export type ChangeStatus =
  | "새로 확인됨"
  | "검토 필요"
  | "분석 영향 있음"
  | "미확인 유지"
  | "공식 확인 완료"
  | "정정됨"
  | "반영 완료"
  | "보류"
  | "무관함";

export type ChangePriority = "Priority 1" | "Priority 2" | "Priority 3" | "Priority 4";

export type ChangeItem = {
  id: string;
  priority: ChangePriority;
  type: string;
  title: string;
  relatedEntity: string;
  relatedAnalysis: string;
  analysisHref: string;
  evidenceHref: string;
  evidenceTitle: string;
  evidenceType: string;
  source: string;
  publishedAt: string;
  confidence: string;
  correctionState: string;
  before: {
    known: string;
    state: string;
    evidence: string;
    reviewedAt: string;
  };
  after: {
    confirmed: string;
    state: string;
    evidence: string;
    changedAt: string;
  };
  whatChanged: string;
  whyReview: string;
  remainingUnknown: string;
  affectedSection: string;
  reviewCondition: string;
  lastAnalysisUpdate: string;
  status: ChangeStatus;
  readState: string;
  primaryAction: string;
};

export type WatchChange = {
  name: string;
  code: string;
  officialCount: string;
  hasAnalysis: string;
  keyChange: string;
  confidence: string;
  checkedAt: string;
  href: string;
};

export type AppliedChange = {
  appliedAt: string;
  analysis: string;
  section: string;
  state: ChangeStatus;
  history: string;
  href: string;
};

export type NextCheck = {
  item: string;
  reason: string;
  due: string;
  href: string;
};

export type ChangesMock = {
  view: ChangeView;
  title: string;
  description: string;
  lastCheckedAt: string;
  changeCount: string;
  analysisImpactCount: string;
  correctedCount: string;
  unresolvedCount: string;
  primaryChange: string;
  primaryAction: string;
  changes: ChangeItem[];
  analysisImpacts: ChangeItem[];
  officialEvidence: ChangeItem[];
  corrections: ChangeItem[];
  watchlist: WatchChange[];
  unresolved: ChangeItem[];
  applied: AppliedChange[];
  nextChecks: NextCheck[];
  isEmpty: boolean;
};

const baseChanges: ChangeItem[] = [
  {
    id: "CHG-001",
    priority: "Priority 1",
    type: "기존 미확인 내용 공식 확인",
    title: "정책 적용 범위 일부가 공식 문서 후보와 연결됐습니다.",
    relatedEntity: "삼성전자 005930",
    relatedAnalysis: "삼성전자 반도체 공급망 영향 분석",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001",
    evidenceHref: "/kr/evidence?id=dart-samsung-001",
    evidenceTitle: "삼성전자 공급망 검토 대상 관련 전자공시 Placeholder",
    evidenceType: "전자공시",
    source: "OpenDART Placeholder",
    publishedAt: "공개 시각 예시 09:30",
    confidence: "공식 확인",
    correctionState: "최신 문서 우선",
    before: {
      known: "정책 적용 범위가 미확인 항목으로 남아 있었습니다.",
      state: "미확인 유지",
      evidence: "이전 투자 근거 없음",
      reviewedAt: "마지막 검토 예시 10:50"
    },
    after: {
      confirmed: "공식 문서 후보에서 일부 적용 범위가 확인됐습니다.",
      state: "공식 확인 완료",
      evidence: "dart-samsung-001",
      changedAt: "변경 시각 예시 11:10"
    },
    whatChanged: "기존 미확인 항목이 공식 근거와 연결됐습니다.",
    whyReview: "판단 변경 조건과 연결되어 기존 해석을 다시 확인해야 합니다.",
    remainingUnknown: "실적 반영 시점과 최종 적용 범위는 아직 확인되지 않았습니다.",
    affectedSection: "미확인 내용 · 판단 변경 조건",
    reviewCondition: "정책 적용 범위 확정",
    lastAnalysisUpdate: "분석 수정 예시 10:50",
    status: "분석 영향 있음",
    readState: "검토 필요",
    primaryAction: "분석 다시 확인하기"
  },
  {
    id: "CHG-002",
    priority: "Priority 1",
    type: "기존 투자 근거 정정",
    title: "기존 공식 발표의 적용 대상 문구가 정정됐습니다.",
    relatedEntity: "SK하이닉스 000660",
    relatedAnalysis: "SK하이닉스 HBM 수요 변화 분석",
    analysisHref: "/kr/analysis?id=hynix-hbm-001",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
    evidenceTitle: "AI 인프라 투자 확대 관련 기업 공식 발표 Placeholder",
    evidenceType: "기업 공식 발표",
    source: "기업 IR Placeholder",
    publishedAt: "정정 시각 예시 10:20",
    confidence: "공식 발표",
    correctionState: "정정됨",
    before: {
      known: "적용 대상 기업 범위가 넓게 해석될 수 있었습니다.",
      state: "복수 출처 확인",
      evidence: "이전 IR 문서 Placeholder",
      reviewedAt: "마지막 검토 예시 전일 15:20"
    },
    after: {
      confirmed: "정정 발표에서 적용 대상 범위가 일부 조정됐습니다.",
      state: "정정됨",
      evidence: "ir-semiconductor-001",
      changedAt: "변경 시각 예시 10:20"
    },
    whatChanged: "이전 해석의 적용 대상 범위가 줄어들 수 있습니다.",
    whyReview: "HBM 공급망 해석과 관련 기업 비교 기준을 다시 봐야 합니다.",
    remainingUnknown: "정정 내용의 실적 반영 규모는 아직 확인되지 않았습니다.",
    affectedSection: "내 해석 · 다른 해석 가능성",
    reviewCondition: "관련 기업 공식 발표 확인",
    lastAnalysisUpdate: "분석 수정 예시 전일 15:20",
    status: "정정됨",
    readState: "검토 필요",
    primaryAction: "정정 내용 확인하기"
  },
  {
    id: "CHG-003",
    priority: "Priority 2",
    type: "새로운 공식 투자 근거",
    title: "반도체 공급망 관련 새 공식 근거가 추가됐습니다.",
    relatedEntity: "삼성전자 005930",
    relatedAnalysis: "삼성전자 반도체 공급망 영향 분석",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001",
    evidenceHref: "/kr/evidence?id=dart-samsung-001",
    evidenceTitle: "공급망 검토 대상 관련 전자공시 Placeholder",
    evidenceType: "전자공시",
    source: "OpenDART Placeholder",
    publishedAt: "공개 시각 예시 09:30",
    confidence: "공식 확인",
    correctionState: "정정 없음",
    before: {
      known: "공급망 노출 범위는 추가 확인 항목으로 남아 있었습니다.",
      state: "추가 확인 필요",
      evidence: "EV 후보",
      reviewedAt: "마지막 접속 예시 09:00"
    },
    after: {
      confirmed: "공식 문서 후보가 새롭게 확인됐습니다.",
      state: "새로 확인됨",
      evidence: "dart-samsung-001",
      changedAt: "변경 시각 예시 09:45"
    },
    whatChanged: "확인할 수 있는 공식 근거 후보가 늘었습니다.",
    whyReview: "분석의 공식 사실 영역에 연결할지 확인해야 합니다.",
    remainingUnknown: "정책 영향 규모는 아직 단정할 수 없습니다.",
    affectedSection: "공식 사실",
    reviewCondition: "후속 공시 확인",
    lastAnalysisUpdate: "분석 수정 예시 10:50",
    status: "새로 확인됨",
    readState: "읽지 않음",
    primaryAction: "새 근거 확인하기"
  },
  {
    id: "CHG-004",
    priority: "Priority 3",
    type: "관심 종목 공식 상태 변경",
    title: "관심 종목에서 공식 확인 상태가 바뀌었습니다.",
    relatedEntity: "NVIDIA NVDA",
    relatedAnalysis: "AI 인프라 관련 분석 Placeholder",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001",
    evidenceHref: "/kr/evidence?id=ir-semiconductor-001",
    evidenceTitle: "AI 인프라 투자 확대 관련 기업 공식 발표 Placeholder",
    evidenceType: "기업 공식 발표",
    source: "기업 IR Placeholder",
    publishedAt: "공개 시각 예시 10:20",
    confidence: "복수 출처 확인",
    correctionState: "정정 없음",
    before: {
      known: "AI 인프라 투자 확대는 단일 출처 수준이었습니다.",
      state: "단일 출처",
      evidence: "IR 후보",
      reviewedAt: "마지막 확인 예시 전일 장 마감 후"
    },
    after: {
      confirmed: "복수 출처 확인 상태로 바뀌었습니다.",
      state: "복수 출처 확인",
      evidence: "ir-semiconductor-001",
      changedAt: "변경 시각 예시 10:40"
    },
    whatChanged: "확인 상태가 한 단계 높아졌습니다.",
    whyReview: "관련 종목과 테마 연결을 다시 확인할 수 있습니다.",
    remainingUnknown: "개별 기업 실적 반영 규모는 확인되지 않았습니다.",
    affectedSection: "관련 대상 · 다음 확인 항목",
    reviewCondition: "관련 기업 공식 발표 확인",
    lastAnalysisUpdate: "분석 없음",
    status: "공식 확인 완료",
    readState: "확인함",
    primaryAction: "관련 종목 보기"
  },
  {
    id: "CHG-005",
    priority: "Priority 3",
    type: "시장 관찰",
    title: "KOSPI 선물과 반도체 테마가 동시에 반응했습니다.",
    relatedEntity: "반도체 테마",
    relatedAnalysis: "삼성전자 반도체 공급망 영향 분석",
    analysisHref: "/kr/analysis?id=samsung-semiconductor-001",
    evidenceHref: "/kr/market",
    evidenceTitle: "시장 데이터 Placeholder",
    evidenceType: "시장 관찰",
    source: "시장 데이터 Placeholder",
    publishedAt: "관찰 시각 예시 10:45",
    confidence: "미확인",
    correctionState: "공식 근거 없음",
    before: {
      known: "시장 반응과 공식 정보의 연결은 확인되지 않았습니다.",
      state: "미확인 유지",
      evidence: "공식 투자 근거 없음",
      reviewedAt: "마지막 확인 예시 10:00"
    },
    after: {
      confirmed: "선물과 테마 반응이 함께 관찰됐습니다.",
      state: "시장 관찰만 확인됨",
      evidence: "시장 데이터 Placeholder",
      changedAt: "변경 시각 예시 10:45"
    },
    whatChanged: "보조 관찰 정보가 추가됐습니다.",
    whyReview: "원인으로 단정하지 않고 분석의 시장 관찰 영역에만 참고해야 합니다.",
    remainingUnknown: "직접적인 인과관계는 확인되지 않았습니다.",
    affectedSection: "관찰된 시장 변화",
    reviewCondition: "공식 근거 추가 확인",
    lastAnalysisUpdate: "분석 수정 예시 10:50",
    status: "미확인 유지",
    readState: "보류",
    primaryAction: "시장 흐름 보기"
  }
];

const appliedChanges: AppliedChange[] = [
  {
    appliedAt: "반영 시각 예시 11:30",
    analysis: "삼성전자 반도체 공급망 영향 분석",
    section: "공식 사실",
    state: "반영 완료",
    history: "새 공식 근거를 공식 사실 후보로 연결",
    href: "/kr/analysis?id=samsung-semiconductor-001#facts-title"
  },
  {
    appliedAt: "반영 시각 예시 전일 16:20",
    analysis: "SK하이닉스 HBM 수요 변화 분석",
    section: "다음 확인 항목",
    state: "반영 완료",
    history: "관련 기업 발표 확인 항목 추가",
    href: "/kr/analysis?id=hynix-hbm-001#next-title"
  }
];

const watchlist: WatchChange[] = [
  {
    name: "삼성전자",
    code: "005930",
    officialCount: "새 공식 정보 2개",
    hasAnalysis: "분석 있음",
    keyChange: "공급망 적용 범위 관련 공식 근거 후보가 추가됐습니다.",
    confidence: "공식 확인",
    checkedAt: "마지막 확인 예시 11:10",
    href: "/kr/stock/005930"
  },
  {
    name: "SK하이닉스",
    code: "000660",
    officialCount: "정정 정보 1개",
    hasAnalysis: "분석 있음",
    keyChange: "HBM 관련 공식 발표 문구가 정정됐습니다.",
    confidence: "정정됨",
    checkedAt: "마지막 확인 예시 10:20",
    href: "/kr/stock/000660"
  }
];

const nextChecks: NextCheck[] = [
  {
    item: "정정 공시 원문 확인",
    reason: "기존 해석 범위가 달라질 수 있습니다.",
    due: "다음 확인 예시 13:00",
    href: "/kr/evidence?id=ir-semiconductor-001"
  },
  {
    item: "삼성전자 분석 다시 보기",
    reason: "미확인 내용 일부가 공식 근거와 연결됐습니다.",
    due: "다음 확인 예시 장 마감 전",
    href: "/kr/analysis?id=samsung-semiconductor-001"
  },
  {
    item: "시장 관찰은 보조 정보로 유지",
    reason: "공식 인과관계가 확인되지 않았습니다.",
    due: "다음 공식 정보 확인 전까지",
    href: "/kr/market"
  }
];

const latestChanges: ChangesMock = {
  view: "latest",
  title: "마지막 확인 이후 달라진 내용을 봅니다.",
  description: "뉴스 피드가 아니라 기존 분석과 공식 근거 기준으로 달라진 내용을 비교합니다.",
  lastCheckedAt: "마지막 확인 예시 오늘 09:00",
  changeCount: "새 변화 5개",
  analysisImpactCount: "분석 영향 2개",
  correctedCount: "정정 1개",
  unresolvedCount: "미확인 유지 1개",
  primaryChange: "기존 미확인 내용이 공식 근거와 연결됐습니다.",
  primaryAction: "달라진 내용 확인하기",
  changes: baseChanges,
  analysisImpacts: baseChanges.filter((item) => item.status === "분석 영향 있음" || item.affectedSection.includes("내 해석")),
  officialEvidence: baseChanges.filter((item) => item.evidenceType !== "시장 관찰"),
  corrections: baseChanges.filter((item) => item.status === "정정됨"),
  watchlist,
  unresolved: baseChanges.filter((item) => item.status === "미확인 유지" || item.remainingUnknown.includes("아직")),
  applied: appliedChanges,
  nextChecks,
  isEmpty: false
};

const analysisChanges: ChangesMock = {
  ...latestChanges,
  view: "analysis",
  title: "기존 분석에 영향을 줄 수 있는 변화입니다.",
  description: "사용자의 판단을 자동으로 바꾸지 않고, 어떤 분석 영역을 다시 볼지 알려줍니다.",
  lastCheckedAt: "마지막 분석 수정 이후",
  changeCount: "분석 연결 변화 4개",
  analysisImpactCount: "분석 영향 4개",
  correctedCount: "정정 1개",
  unresolvedCount: "미확인 유지 2개",
  primaryChange: "삼성전자와 SK하이닉스 분석 모두 재검토가 필요합니다.",
  primaryAction: "분석 다시 검토하기",
  changes: baseChanges.filter((item) => item.relatedAnalysis !== "AI 인프라 관련 분석 Placeholder"),
  analysisImpacts: baseChanges.filter((item) => item.relatedAnalysis !== "AI 인프라 관련 분석 Placeholder"),
  officialEvidence: baseChanges.filter((item) => item.evidenceType !== "시장 관찰"),
  unresolved: baseChanges.filter((item) => item.remainingUnknown.includes("아직") || item.status === "미확인 유지")
};

const emptyChanges: ChangesMock = {
  view: "empty",
  title: "마지막 확인 이후 중요한 공식 변화가 없습니다.",
  description: "새 변화가 없을 때도 기존 분석, 관심 종목, 시장 기준점을 다시 확인할 수 있습니다.",
  lastCheckedAt: "마지막 확인 예시 오늘 11:30",
  changeCount: "새 변화 0개",
  analysisImpactCount: "분석 영향 0개",
  correctedCount: "정정 0개",
  unresolvedCount: "미확인 유지 0개",
  primaryChange: "검토할 새 공식 변화가 없습니다.",
  primaryAction: "시장으로 이동하기",
  changes: [],
  analysisImpacts: [],
  officialEvidence: [],
  corrections: [],
  watchlist: [],
  unresolved: [],
  applied: [],
  nextChecks: [
    {
      item: "기존 분석 다시 보기",
      reason: "새 변화가 없어도 다음 확인 시점이 가까운 항목을 확인할 수 있습니다.",
      due: "필요할 때",
      href: "/kr/analysis?id=samsung-semiconductor-001"
    },
    {
      item: "관심 종목 확인하기",
      reason: "관심 종목이 있으면 이후 변화 비교 기준이 생깁니다.",
      due: "관심 종목 추가 전",
      href: "/kr/watchlist"
    },
    {
      item: "시장으로 이동하기",
      reason: "전체 시장에서 공식 정보가 새로 확인됐는지 볼 수 있습니다.",
      due: "지금",
      href: "/kr/market"
    }
  ],
  isEmpty: true
};

export function getChangesMock(view?: string | string[]): ChangesMock {
  const value = Array.isArray(view) ? view[0] : view;
  if (value === "analysis") return analysisChanges;
  if (value === "empty") return emptyChanges;
  return latestChanges;
}
