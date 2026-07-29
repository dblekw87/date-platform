"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.scss";

type Publisher = {
  name: string;
  type: string;
};

type Source = {
  id: string;
  publisher: Publisher;
  title: string;
  type: string;
  publishedTime: string;
  retrievedTime: string;
  availability: string;
  urlPlaceholder: string;
  reliabilityPlaceholder: string;
  excerptPlaceholder: string;
};

type Freshness = {
  publishedAt: string;
  retrievedAt: string;
  observedAt: string;
  lastVerifiedAt: string;
  status: string;
  staleRisk: string;
  revalidationNeeded: string;
  rationale: string;
};

type Boundary = {
  supports: string;
  doesNotSupport: string;
  missingInformation: string;
  scopeLimitation: string;
  assumption: string;
  overInterpretationRisk: string;
};

type RelatedEntity = {
  type: "Security" | "Company" | "Market" | "Sector" | "Industry" | "Event" | "Theme";
  label: string;
  detail: string;
  href?: string;
};

type EvidenceRelation = {
  id: string;
  title: string;
  relationshipType: "Supports" | "Contradicts" | "Adds Context" | "Supersedes" | "Needs Revalidation";
  source: string;
  freshness: string;
  status: string;
};

type TimelineEvent = {
  time: string;
  title: string;
  type: string;
  linkedEvidence: string;
  relatedEntity: string;
  sequenceContext: string;
};

type Interpretation = {
  label: string;
  linkedEvidence: string[];
  generated: string;
  confidence: string;
  reviewStatus: string;
  originalSourceEntry: string;
  summary: string;
};

type OpenQuestion = {
  question: string;
  whyOpen: string;
  requiredEvidence: string;
  ownerScope: string;
  status: string;
} | null;

type Discussion = {
  opinionLabel: string;
  authorPlaceholder: string;
  position: string;
  evidenceReferenced: string;
  boundary: string;
  replyCount: string;
};

type EvidenceDetail = {
  id: string;
  title: string;
  identity: {
    evidenceType: string;
    status: string;
    createdAt: string;
    observedAt: string;
    updatedAt: string;
    sourceCount: string;
    relatedEntityCount: string;
    hasOpenQuestion: string;
  };
  claim: {
    primaryClaim: string;
    supportingFinding: string;
    scope: string;
    validationStatus: string;
    confidencePlaceholder: string;
  };
  sources: Source[];
  freshness: Freshness;
  boundary: Boundary;
  relatedContext: RelatedEntity[];
  supportingEvidence: EvidenceRelation[];
  contradictingEvidence: EvidenceRelation[];
  timeline: TimelineEvent[];
  interpretation: Interpretation;
  openQuestion: OpenQuestion;
  discussion: Discussion;
  relatedEvidence: EvidenceRelation[];
};

const navigationItems = [
  { label: "Home", href: "/", enabled: true },
  { label: "Discover", href: null, enabled: false },
  { label: "Research", href: "/research", enabled: true },
  { label: "Monitoring", href: null, enabled: false },
  { label: "Journal", href: null, enabled: false },
  { label: "Community", href: null, enabled: false },
  { label: "Search", href: null, enabled: false },
  { label: "Profile", href: null, enabled: false }
];

const evidenceAliases: Record<string, string> = {
  "EV-KR-01": "EV-104",
  "EV-KR-02": "EV-122",
  "EV-KR-03": "EV-117",
  "EV-KR-04": "EV-122",
  "EV-US-01": "EV-117",
  "EV-US-02": "EV-117",
  "EV-US-03": "EV-122",
  "EV-US-04": "EV-104"
};

const evidenceDetails: Record<string, EvidenceDetail> = {
  "EV-104": {
    id: "EV-104",
    title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
    identity: {
      evidenceType: "Monitoring-linked Evidence · Mock",
      status: "Needs Review · Prototype",
      createdAt: "Created: Mock 2026-07-29 09:40",
      observedAt: "Observed: Mock 2026-07-29 10:15",
      updatedAt: "Updated: Mock 2026-07-29 11:20",
      sourceCount: "1 Mock Source",
      relatedEntityCount: "1 Related Entity",
      hasOpenQuestion: "Open Question 있음"
    },
    claim: {
      primaryClaim:
        "Monitoring 신호가 단일 Source에 의존하고 있어, 같은 Claim을 판단하기 전에 추가 Evidence가 필요한 상태입니다.",
      supportingFinding:
        "Mock 관찰상 동일 조건이 한 번 반복되었지만, Source와 trigger 관계가 아직 충분히 검증되지 않았습니다.",
      scope: "Scope: Samsung Electronics와 관련된 Monitoring rule 후보에 한정",
      validationStatus: "Validation Status: Needs Review",
      confidencePlaceholder: "Confidence Placeholder: Low to Medium, reviewer required"
    },
    sources: [
      {
        id: "SRC-104-A",
        publisher: { name: "Mock Publisher A", type: "News Desk Placeholder" },
        title: "Prototype monitoring event memo",
        type: "News summary cue",
        publishedTime: "Published: Mock 2026-07-29 09:35",
        retrievedTime: "Retrieved: Mock 2026-07-29 10:02",
        availability: "Available as placeholder only",
        urlPlaceholder: "Source URL Placeholder: external link disabled",
        reliabilityPlaceholder: "Reliability Placeholder: not scored",
        excerptPlaceholder: "Original Excerpt Placeholder: 짧은 인용 위치만 표시하며 실제 원문 전체를 포함하지 않습니다."
      }
    ],
    freshness: {
      publishedAt: "Published At: Mock 09:35",
      retrievedAt: "Retrieved At: Mock 10:02",
      observedAt: "Observed At: Mock 10:15",
      lastVerifiedAt: "Last Verified At: Mock 11:20",
      status: "Freshness Status: Needs Review",
      staleRisk: "Stale Risk: Medium because only one Source has been observed",
      revalidationNeeded: "Revalidation Needed: Yes",
      rationale:
        "Freshness 판단 근거 Placeholder: Source 기준 시점과 Monitoring 관찰 시점 사이의 간격은 짧지만, 검증 Source가 하나뿐입니다."
    },
    boundary: {
      supports: "Supports: Monitoring signal이 Evidence review 후보가 될 수 있음을 지지합니다.",
      doesNotSupport: "Does Not Support: 실제 매수/매도 판단 또는 확정된 이벤트 결과를 지지하지 않습니다.",
      missingInformation: "Missing Information: 동일 조건의 반복 Source, trigger 산식, publisher method.",
      scopeLimitation: "Scope Limitation: 단일 Security context와 단일 Source cue에 제한됩니다.",
      assumption: "Assumption: Monitoring rule이 동일 조건을 같은 방식으로 관찰한다는 Mock 가정입니다.",
      overInterpretationRisk: "Risk of Over-interpretation: 단일 신호를 시장 전체 방향으로 확대 해석할 위험이 있습니다."
    },
    relatedContext: [
      { type: "Security", label: "005930", detail: "Samsung Electronics", href: "/entity/005930" },
      { type: "Event", label: "Mock morning monitoring event", detail: "Event relation placeholder" },
      { type: "Theme", label: "Monitoring trigger", detail: "Theme placeholder" }
    ],
    supportingEvidence: [
      {
        id: "EV-117",
        title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
        relationshipType: "Adds Context",
        source: "Mock Source: Research memo",
        freshness: "Freshness: Mock current",
        status: "Status: Timeline linked"
      }
    ],
    contradictingEvidence: [],
    timeline: [
      {
        time: "10:15",
        title: "Monitoring signal observed",
        type: "Signal Event",
        linkedEvidence: "EV-104",
        relatedEntity: "005930",
        sequenceContext: "First observed monitoring cue"
      },
      {
        time: "11:20",
        title: "Evidence review requested",
        type: "Review Event",
        linkedEvidence: "EV-104",
        relatedEntity: "Samsung Electronics",
        sequenceContext: "Review remains open because Source count is one"
      }
    ],
    interpretation: {
      label: "AI-assisted Interpretation",
      linkedEvidence: ["EV-104", "EV-117"],
      generated: "Generated Mock Placeholder",
      confidence: "Confidence Placeholder: Review required",
      reviewStatus: "Review Status: Before review",
      originalSourceEntry: "Original Source Entry Placeholder: SRC-104-A",
      summary:
        "Interpretation은 단일 Source와 Monitoring cue를 연결해 읽는 보조 해석입니다. Evidence 자체나 Source truth를 대체하지 않습니다."
    },
    openQuestion: {
      question: "동일 Monitoring 조건이 다른 Source 또는 시간대에서도 반복되는가?",
      whyOpen: "Source가 1개이고 trigger 산식이 placeholder이기 때문에 검증이 닫히지 않았습니다.",
      requiredEvidence: "Required Evidence: 추가 Source, 반복 Event, trigger method note",
      ownerScope: "Owner / Scope Placeholder: Research reviewer",
      status: "Status: Open"
    },
    discussion: {
      opinionLabel: "Opinion Preview · Not Evidence",
      authorPlaceholder: "Author Placeholder: community member",
      position: "Position: cautious",
      evidenceReferenced: "Evidence Referenced: EV-104",
      boundary: "Boundary: 의견은 Evidence나 Source 검증을 대체하지 않습니다.",
      replyCount: "Reply Count Placeholder: Mock 4 replies"
    },
    relatedEvidence: [
      {
        id: "EV-117",
        title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
        relationshipType: "Adds Context",
        source: "Mock Source: Research memo",
        freshness: "Freshness: Mock current",
        status: "Status: Available"
      },
      {
        id: "EV-122",
        title: "시장 폭 차이가 특정 테마에 집중되는지 확인",
        relationshipType: "Needs Revalidation",
        source: "Mock Source: Market breadth memo",
        freshness: "Freshness: Stale risk",
        status: "Status: Boundary strong"
      }
    ]
  },
  "EV-117": {
    id: "EV-117",
    title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
    identity: {
      evidenceType: "Macro / Market Context Evidence · Mock",
      status: "Timeline Linked · Prototype",
      createdAt: "Created: Mock 2026-07-29 09:20",
      observedAt: "Observed: Mock 2026-07-29 10:10",
      updatedAt: "Updated: Mock 2026-07-29 13:00",
      sourceCount: "2 Mock Sources",
      relatedEntityCount: "2 Related Entities",
      hasOpenQuestion: "Open Question 없음"
    },
    claim: {
      primaryClaim:
        "환율 민감도와 성장주 반응이 같은 시간대에 관찰되어 Entity 검토의 관련 맥락으로 사용할 수 있습니다.",
      supportingFinding: "복수 Source가 같은 방향의 context cue를 제공하지만, 최종 판단은 Source 원문 확인 이후에만 가능합니다.",
      scope: "Scope: USD/KRW, NASDAQ, AAPL, 005930 관련 cross-market context",
      validationStatus: "Validation Status: In Review",
      confidencePlaceholder: "Confidence Placeholder: Medium, method not finalized"
    },
    sources: [
      {
        id: "SRC-117-A",
        publisher: { name: "Mock Publisher B", type: "Research Provider Placeholder" },
        title: "Prototype FX and growth sensitivity note",
        type: "Research memo",
        publishedTime: "Published: Mock 2026-07-29 09:10",
        retrievedTime: "Retrieved: Mock 2026-07-29 09:45",
        availability: "Available as placeholder only",
        urlPlaceholder: "Source URL Placeholder: external link disabled",
        reliabilityPlaceholder: "Reliability Placeholder: method not attached",
        excerptPlaceholder: "Original Excerpt Placeholder: Source A short excerpt location, not copied full text."
      },
      {
        id: "SRC-117-B",
        publisher: { name: "Mock Publisher C", type: "Market Data Commentary Placeholder" },
        title: "Prototype market breadth and FX context",
        type: "Market commentary",
        publishedTime: "Published: Mock 2026-07-29 09:50",
        retrievedTime: "Retrieved: Mock 2026-07-29 10:05",
        availability: "Available as placeholder only",
        urlPlaceholder: "Source URL Placeholder: external link disabled",
        reliabilityPlaceholder: "Reliability Placeholder: provider method gap",
        excerptPlaceholder: "Original Excerpt Placeholder: Source B excerpt marker only."
      }
    ],
    freshness: {
      publishedAt: "Published At: Mock 09:10 / 09:50",
      retrievedAt: "Retrieved At: Mock 09:45 / 10:05",
      observedAt: "Observed At: Mock 10:10",
      lastVerifiedAt: "Last Verified At: Mock 13:00",
      status: "Freshness Status: Current with method gap",
      staleRisk: "Stale Risk: Low to Medium because market context can change intraday",
      revalidationNeeded: "Revalidation Needed: Conditional",
      rationale:
        "Freshness 판단 근거 Placeholder: 복수 Source의 기준 시점이 가깝고 Timeline에 연결되어 있으나, intraday context이므로 재확인이 필요합니다."
    },
    boundary: {
      supports: "Supports: 환율과 성장주 민감도를 함께 검토해야 한다는 context cue.",
      doesNotSupport: "Does Not Support: 특정 Security의 확정된 방향성 또는 투자 판단.",
      missingInformation: "Missing Information: source methodology, revision policy, later session update.",
      scopeLimitation: "Scope Limitation: Cross-market context이며 개별 기업 실적 근거가 아닙니다.",
      assumption: "Assumption: Source A와 Source B가 같은 market window를 설명한다는 Prototype 가정입니다.",
      overInterpretationRisk: "Risk of Over-interpretation: Macro cue를 개별 Entity 결과로 직접 치환할 위험이 있습니다."
    },
    relatedContext: [
      { type: "Security", label: "AAPL", detail: "Apple", href: "/entity/AAPL" },
      { type: "Security", label: "005930", detail: "Samsung Electronics", href: "/entity/005930" },
      { type: "Market", label: "NASDAQ", detail: "Market index context, not Security route" },
      { type: "Theme", label: "FX sensitivity", detail: "Theme placeholder" }
    ],
    supportingEvidence: [
      {
        id: "EV-104",
        title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
        relationshipType: "Adds Context",
        source: "Mock Source: Monitoring memo",
        freshness: "Freshness: Needs review",
        status: "Status: Open question"
      }
    ],
    contradictingEvidence: [],
    timeline: [
      {
        time: "09:10",
        title: "First source published",
        type: "Source Event",
        linkedEvidence: "EV-117",
        relatedEntity: "FX sensitivity theme",
        sequenceContext: "Source A begins the evidence window"
      },
      {
        time: "10:05",
        title: "Second source retrieved",
        type: "Source Retrieval",
        linkedEvidence: "EV-117",
        relatedEntity: "AAPL / 005930",
        sequenceContext: "Multiple Source context becomes available"
      },
      {
        time: "13:00",
        title: "Timeline relation verified",
        type: "Verification Event",
        linkedEvidence: "EV-117",
        relatedEntity: "NASDAQ",
        sequenceContext: "Timeline cue remains linked but not final judgment"
      }
    ],
    interpretation: {
      label: "Interpretation Preview",
      linkedEvidence: ["EV-117", "EV-104"],
      generated: "Generated Mock Placeholder",
      confidence: "Confidence Placeholder: Medium after review",
      reviewStatus: "Review Status: In progress",
      originalSourceEntry: "Original Source Entry Placeholder: SRC-117-A / SRC-117-B",
      summary:
        "복수 Source를 바탕으로 한 읽기 보조 해석입니다. Source Provider와 Publisher의 method gap은 그대로 남겨둡니다."
    },
    openQuestion: null,
    discussion: {
      opinionLabel: "Opinion Preview · Not Evidence",
      authorPlaceholder: "Author Placeholder: research community member",
      position: "Position: neutral",
      evidenceReferenced: "Evidence Referenced: EV-117",
      boundary: "Boundary: 토론은 Source validation을 대체하지 않습니다.",
      replyCount: "Reply Count Placeholder: Mock 9 replies"
    },
    relatedEvidence: [
      {
        id: "EV-104",
        title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
        relationshipType: "Adds Context",
        source: "Mock Source: Monitoring memo",
        freshness: "Freshness: Needs review",
        status: "Status: Available"
      },
      {
        id: "EV-122",
        title: "시장 폭 차이가 특정 테마에 집중되는지 확인",
        relationshipType: "Supports",
        source: "Mock Source: Market breadth memo",
        freshness: "Freshness: Stale risk",
        status: "Status: Boundary strong"
      }
    ]
  },
  "EV-122": {
    id: "EV-122",
    title: "시장 폭 차이가 특정 테마에 집중되는지 확인",
    identity: {
      evidenceType: "Market Breadth Evidence · Mock",
      status: "Boundary Strong · Prototype",
      createdAt: "Created: Mock 2026-07-29 08:50",
      observedAt: "Observed: Mock 2026-07-29 10:40",
      updatedAt: "Updated: Mock 2026-07-29 12:30",
      sourceCount: "2 Mock Sources",
      relatedEntityCount: "4 Related Context Items",
      hasOpenQuestion: "Open Question 있음"
    },
    claim: {
      primaryClaim:
        "시장 폭 차이가 특정 테마에 집중되어 보이나, 일부 Source는 다른 해석을 요구하므로 Boundary를 강하게 유지해야 합니다.",
      supportingFinding:
        "한 Source는 테마 집중을 지지하고, 다른 Source는 전체 시장 확산 지표의 지연 가능성을 제시합니다.",
      scope: "Scope: KOSPI / KOSDAQ breadth, technology theme, AAPL and 005930 comparison",
      validationStatus: "Validation Status: Contradicted / Needs Review",
      confidencePlaceholder: "Confidence Placeholder: Low until contradiction is reviewed"
    },
    sources: [
      {
        id: "SRC-122-A",
        publisher: { name: "Mock Publisher D", type: "Market Breadth Provider Placeholder" },
        title: "Prototype sector breadth concentration note",
        type: "Market breadth memo",
        publishedTime: "Published: Mock 2026-07-29 08:50",
        retrievedTime: "Retrieved: Mock 2026-07-29 10:40",
        availability: "Available as placeholder only",
        urlPlaceholder: "Source URL Placeholder: external link disabled",
        reliabilityPlaceholder: "Reliability Placeholder: calculation method unavailable",
        excerptPlaceholder: "Original Excerpt Placeholder: concentration signal excerpt marker."
      },
      {
        id: "SRC-122-B",
        publisher: { name: "Mock Publisher D", type: "Market Breadth Provider Placeholder" },
        title: "Prototype breadth lag caution note",
        type: "Contradicting market memo",
        publishedTime: "Published: Mock 2026-07-29 11:20",
        retrievedTime: "Retrieved: Mock 2026-07-29 12:05",
        availability: "Available as placeholder only",
        urlPlaceholder: "Source URL Placeholder: external link disabled",
        reliabilityPlaceholder: "Reliability Placeholder: same publisher, different note",
        excerptPlaceholder: "Original Excerpt Placeholder: caution note marker only."
      }
    ],
    freshness: {
      publishedAt: "Published At: Mock 08:50 / 11:20",
      retrievedAt: "Retrieved At: Mock 10:40 / 12:05",
      observedAt: "Observed At: Mock 10:40",
      lastVerifiedAt: "Last Verified At: Mock 12:30",
      status: "Freshness Status: Stale Risk present",
      staleRisk: "Stale Risk: High because breadth can change quickly and contradiction exists",
      revalidationNeeded: "Revalidation Needed: Yes",
      rationale:
        "Freshness 판단 근거 Placeholder: Source 간 시간차와 해석 충돌이 있어 최신성 자체가 신뢰 판단의 핵심입니다."
    },
    boundary: {
      supports: "Supports: 특정 테마에 시장 관심이 집중되는지 검토해야 한다는 문제 제기.",
      doesNotSupport: "Does Not Support: 시장 전체가 약하거나 특정 Security가 반드시 영향을 받는다는 결론.",
      missingInformation: "Missing Information: breadth calculation method, later update, source revision log.",
      scopeLimitation: "Scope Limitation: Market breadth context이며 Company fundamentals가 아닙니다.",
      assumption: "Assumption: Mock breadth memo가 동일 universe를 비교한다는 가정입니다.",
      overInterpretationRisk: "Risk of Over-interpretation: 테마 집중 cue를 확정된 sector rotation으로 해석할 위험이 큽니다."
    },
    relatedContext: [
      { type: "Security", label: "005930", detail: "Samsung Electronics", href: "/entity/005930" },
      { type: "Security", label: "AAPL", detail: "Apple", href: "/entity/AAPL" },
      { type: "Sector", label: "Technology Hardware", detail: "Sector placeholder" },
      { type: "Industry", label: "Semiconductors and Consumer Devices", detail: "Industry placeholder" },
      { type: "Market", label: "KOSDAQ", detail: "Market index context, not Entity route" }
    ],
    supportingEvidence: [
      {
        id: "EV-117",
        title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
        relationshipType: "Supports",
        source: "Mock Source: FX and market memo",
        freshness: "Freshness: Current with method gap",
        status: "Status: In review"
      }
    ],
    contradictingEvidence: [
      {
        id: "EV-104",
        title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
        relationshipType: "Contradicts",
        source: "Mock Source: Monitoring memo",
        freshness: "Freshness: Needs review",
        status: "Status: single Source"
      }
    ],
    timeline: [
      {
        time: "08:50",
        title: "Breadth concentration source published",
        type: "Source Event",
        linkedEvidence: "EV-122",
        relatedEntity: "Technology theme",
        sequenceContext: "First breadth cue appears"
      },
      {
        time: "12:05",
        title: "Contradicting source retrieved",
        type: "Contradiction Event",
        linkedEvidence: "EV-122",
        relatedEntity: "KOSDAQ",
        sequenceContext: "Later note requires stronger boundary"
      }
    ],
    interpretation: {
      label: "AI-assisted Interpretation",
      linkedEvidence: ["EV-122", "EV-117", "EV-104"],
      generated: "Generated Mock Placeholder",
      confidence: "Confidence Placeholder: Low until contradiction resolved",
      reviewStatus: "Review Status: Reviewing contradiction",
      originalSourceEntry: "Original Source Entry Placeholder: SRC-122-A / SRC-122-B",
      summary:
        "충돌 Evidence가 있으므로 Interpretation은 결론이 아니라 검토 경로 안내입니다. Contradicting Evidence가 우선 확인되어야 합니다."
    },
    openQuestion: {
      question: "두 Source가 같은 시장 universe와 같은 산식으로 breadth를 비교했는가?",
      whyOpen: "Publisher는 같지만 Source note가 다르고, 산식 method가 placeholder입니다.",
      requiredEvidence: "Required Evidence: calculation method, revision log, later source update",
      ownerScope: "Owner / Scope Placeholder: Evidence reviewer",
      status: "Status: Open / Revalidation needed"
    },
    discussion: {
      opinionLabel: "Opinion Preview · Not Evidence",
      authorPlaceholder: "Author Placeholder: community analyst",
      position: "Position: skeptical",
      evidenceReferenced: "Evidence Referenced: EV-122 / EV-104",
      boundary: "Boundary: 반대 의견은 Evidence relation 검토 대상이지 Source truth가 아닙니다.",
      replyCount: "Reply Count Placeholder: Mock 15 replies"
    },
    relatedEvidence: [
      {
        id: "EV-117",
        title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
        relationshipType: "Adds Context",
        source: "Mock Source: Research memo",
        freshness: "Freshness: Current with method gap",
        status: "Status: In review"
      },
      {
        id: "EV-104",
        title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
        relationshipType: "Needs Revalidation",
        source: "Mock Source: Monitoring memo",
        freshness: "Freshness: Needs review",
        status: "Status: Open question"
      }
    ]
  }
};

const normalizeEvidenceId = (id: string | string[] | undefined) => {
  const rawId = Array.isArray(id) ? id[0] : id;
  return rawId?.trim().toUpperCase() ?? "";
};

export default function EvidenceDetailPage() {
  const params = useParams<{ id: string }>();
  const routeEvidenceId = normalizeEvidenceId(params.id);
  const evidenceId = evidenceAliases[routeEvidenceId] ?? routeEvidenceId;
  const evidence = evidenceDetails[evidenceId];
  const [isBoundaryExpanded, setIsBoundaryExpanded] = useState(true);
  const [isInterpretationExpanded, setIsInterpretationExpanded] = useState(false);
  const [openQuestionStatus, setOpenQuestionStatus] = useState(evidence?.openQuestion?.status ?? "Status: None");

  if (!evidence) {
    return (
      <main className={styles.evidenceShell}>
        <GlobalHeader />
        <section className={styles.unknownState} aria-labelledby="unknown-evidence-title">
          <span className={styles.kicker}>Evidence Unknown · Wireframe State</span>
          <h1 id="unknown-evidence-title">확인되지 않은 Evidence입니다.</h1>
          <p>
            입력된 Evidence ID <strong>{routeEvidenceId || "unknown-evidence"}</strong>는 현재 Prototype Mock Evidence에 없습니다.
            실제 API 실패가 아니라 Wireframe용 미확인 상태입니다.
          </p>
          <div className={styles.mainActions} aria-label="Unknown Evidence navigation">
            <Link href="/">Home으로 돌아가기</Link>
            <Link href="/entity/005930">Entity Entry</Link>
            <Link href="/">Search Entry</Link>
            <Link href="/research">Research Entry</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.evidenceShell}>
      <GlobalHeader />
      <div className={styles.evidenceFrame}>
        <nav className={styles.returnNavigation} aria-label="Evidence return navigation">
          <Link href="/">Home</Link>
          <Link href={evidence.relatedContext.find((context) => context.href)?.href ?? "/entity/005930"}>Entity</Link>
          <Link href="/research">Research</Link>
        </nav>

        <section className={styles.hero} aria-labelledby="evidence-title">
          <div className={styles.identityBlock}>
            <span className={styles.kicker}>Evidence Identity · Mock / Prototype</span>
            <h1 id="evidence-title">{evidence.id}</h1>
            <dl className={styles.identityGrid}>
              {Object.entries(evidence.identity).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.claimBlock}>
            <span className={styles.kicker}>Claim / Finding</span>
            <h2>{evidence.title}</h2>
            <dl>
              <div>
                <dt>Primary Claim</dt>
                <dd>{evidence.claim.primaryClaim}</dd>
              </div>
              <div>
                <dt>Supporting Finding</dt>
                <dd>{evidence.claim.supportingFinding}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{evidence.claim.scope}</dd>
              </div>
              <div>
                <dt>Validation Status</dt>
                <dd>{evidence.claim.validationStatus}</dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd>{evidence.claim.confidencePlaceholder}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.sourceSection} aria-labelledby="source-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Original Source</span>
            <h2 id="source-title">Source와 Publisher 분리</h2>
            <p>Source는 origin cue이며 Publisher는 content-producing responsibility입니다. 실제 외부 URL과 원문 전체는 포함하지 않습니다.</p>
          </div>
          <div className={styles.sourceList}>
            {evidence.sources.map((source) => (
              <article className={styles.sourceCard} key={source.id}>
                <div>
                  <span>{source.id}</span>
                  <h3>{source.title}</h3>
                </div>
                <dl>
                  <div>
                    <dt>Publisher Name</dt>
                    <dd>{source.publisher.name}</dd>
                  </div>
                  <div>
                    <dt>Publisher Type</dt>
                    <dd>{source.publisher.type}</dd>
                  </div>
                  <div>
                    <dt>Source Type</dt>
                    <dd>{source.type}</dd>
                  </div>
                  <div>
                    <dt>Published Time</dt>
                    <dd>{source.publishedTime}</dd>
                  </div>
                  <div>
                    <dt>Retrieved Time</dt>
                    <dd>{source.retrievedTime}</dd>
                  </div>
                  <div>
                    <dt>Source Availability</dt>
                    <dd>{source.availability}</dd>
                  </div>
                  <div>
                    <dt>Reliability</dt>
                    <dd>{source.reliabilityPlaceholder}</dd>
                  </div>
                </dl>
                <button aria-label={`Original Source Entry placeholder for ${source.id}`} className={styles.sourceAction} type="button">
                  {source.urlPlaceholder}
                </button>
                <p>{source.excerptPlaceholder}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.freshnessSection} aria-labelledby="freshness-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Freshness</span>
            <h2 id="freshness-title">Freshness 판단 구조</h2>
          </div>
          <dl className={styles.freshnessGrid}>
            {Object.entries(evidence.freshness).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.boundarySection} aria-labelledby="boundary-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Boundary</span>
            <h2 id="boundary-title">Evidence 신뢰 판단의 경계</h2>
            <p>접힘 상태에서도 Supports, Does Not Support, Missing Information은 남깁니다.</p>
          </div>
          <div className={styles.boundarySummary}>
            <article>
              <span>Supports</span>
              <strong>{evidence.boundary.supports}</strong>
            </article>
            <article>
              <span>Does Not Support</span>
              <strong>{evidence.boundary.doesNotSupport}</strong>
            </article>
            <article>
              <span>Missing Information</span>
              <strong>{evidence.boundary.missingInformation}</strong>
            </article>
          </div>
          <button
            aria-controls="boundary-expanded"
            aria-expanded={isBoundaryExpanded}
            className={styles.toggleButton}
            onClick={() => setIsBoundaryExpanded((expanded) => !expanded)}
            type="button"
          >
            Boundary 상세 {isBoundaryExpanded ? "접기" : "펼치기"}
          </button>
          {isBoundaryExpanded ? (
            <dl className={styles.boundaryDetail} id="boundary-expanded">
              <div>
                <dt>Scope Limitation</dt>
                <dd>{evidence.boundary.scopeLimitation}</dd>
              </div>
              <div>
                <dt>Assumption</dt>
                <dd>{evidence.boundary.assumption}</dd>
              </div>
              <div>
                <dt>Risk of Over-interpretation</dt>
                <dd>{evidence.boundary.overInterpretationRisk}</dd>
              </div>
            </dl>
          ) : null}
        </section>

        <section className={styles.relatedContextSection} aria-labelledby="related-context-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Related Context</span>
            <h2 id="related-context-title">타입별 관련 Context</h2>
          </div>
          <div className={styles.relatedContextGrid}>
            {evidence.relatedContext.map((context) =>
              context.href ? (
                <Link
                  aria-label={`Related Entity ${context.label} ${context.detail} 보기`}
                  href={context.href}
                  key={`${context.type}-${context.label}`}
                >
                  <span>{context.type}</span>
                  <strong>{context.label}</strong>
                  <small>{context.detail}</small>
                </Link>
              ) : (
                <article key={`${context.type}-${context.label}`}>
                  <span>{context.type}</span>
                  <strong>{context.label}</strong>
                  <small>{context.detail}</small>
                </article>
              )
            )}
          </div>
        </section>

        <section className={styles.relationSection} aria-labelledby="relations-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Evidence Relation</span>
            <h2 id="relations-title">Supporting / Contradicting Evidence</h2>
            <p>관계 타입은 Wireframe 검증용 Mock Label이며 확정 정책이 아닙니다.</p>
          </div>
          <EvidenceRelationList title="Supporting Evidence" items={evidence.supportingEvidence} />
          <EvidenceRelationList title="Contradicting Evidence" items={evidence.contradictingEvidence} emptyLabel="Contradicting Evidence 없음" />
        </section>

        <section className={styles.timelineSection} aria-labelledby="timeline-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Timeline / Event</span>
            <h2 id="timeline-title">언제 어떤 Event가 발생했는가</h2>
            <p>Timeline은 Event 순서와 Evidence 연결만 담당합니다.</p>
          </div>
          <ol className={styles.timelineFeed}>
            {evidence.timeline.map((event) => (
              <li key={`${event.time}-${event.title}`}>
                <time>{event.time}</time>
                <div>
                  <span>{event.type}</span>
                  <strong>{event.title}</strong>
                  <p>{event.sequenceContext}</p>
                  <small>Linked Evidence: {event.linkedEvidence} · Related Entity: {event.relatedEntity}</small>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>{evidence.interpretation.label}</span>
            <h2 id="interpretation-title">Interpretation Preview</h2>
            <p>{evidence.interpretation.summary}</p>
          </div>
          <button
            aria-controls="interpretation-detail"
            aria-expanded={isInterpretationExpanded}
            className={styles.toggleButton}
            onClick={() => setIsInterpretationExpanded((expanded) => !expanded)}
            type="button"
          >
            Interpretation 근거 {isInterpretationExpanded ? "접기" : "펼치기"}
          </button>
          {isInterpretationExpanded ? (
            <dl className={styles.interpretationDetail} id="interpretation-detail">
              <div>
                <dt>Linked Evidence</dt>
                <dd>{evidence.interpretation.linkedEvidence.join(" / ")}</dd>
              </div>
              <div>
                <dt>Generated</dt>
                <dd>{evidence.interpretation.generated}</dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd>{evidence.interpretation.confidence}</dd>
              </div>
              <div>
                <dt>Review Status</dt>
                <dd>{evidence.interpretation.reviewStatus}</dd>
              </div>
              <div>
                <dt>Original Source Entry</dt>
                <dd>{evidence.interpretation.originalSourceEntry}</dd>
              </div>
            </dl>
          ) : null}
        </section>

        <section className={styles.openQuestionSection} aria-labelledby="open-question-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Open Question</span>
            <h2 id="open-question-title">남아 있는 검증 질문</h2>
          </div>
          {evidence.openQuestion ? (
            <div className={styles.openQuestionCard}>
              <strong>{evidence.openQuestion.question}</strong>
              <p>{evidence.openQuestion.whyOpen}</p>
              <small>{evidence.openQuestion.requiredEvidence}</small>
              <small>{evidence.openQuestion.ownerScope}</small>
              <label>
                Status Placeholder
                <select value={openQuestionStatus} onChange={(event) => setOpenQuestionStatus(event.target.value)}>
                  <option>{evidence.openQuestion.status}</option>
                  <option>Status: Reviewing</option>
                  <option>Status: Waiting for Source</option>
                </select>
              </label>
            </div>
          ) : (
            <article className={styles.openQuestionCard}>
              <strong>Open Question 없음</strong>
              <p>현재 Mock Evidence는 열린 질문이 없는 케이스를 검증합니다.</p>
              <small>{openQuestionStatus}</small>
            </article>
          )}
        </section>

        <section className={styles.discussionSection} aria-labelledby="discussion-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Discussion</span>
            <h2 id="discussion-title">Opinion Boundary</h2>
          </div>
          <dl>
            {Object.entries(evidence.discussion).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.relationSection} aria-labelledby="related-evidence-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Related Evidence</span>
            <h2 id="related-evidence-title">다음으로 비교할 Evidence</h2>
          </div>
          <EvidenceRelationList title="Related Evidence" items={evidence.relatedEvidence} />
        </section>

        <section className={styles.mainActionSection} aria-label="Evidence main actions">
          <Link href="#source-title">Original Source 확인</Link>
          <Link href={evidence.relatedContext.find((context) => context.href)?.href ?? "/entity/005930"}>Related Entity 이동</Link>
          <Link href={`/evidence/${evidence.relatedEvidence[0]?.id ?? evidence.id}`}>Related Evidence 이동</Link>
          <Link href="/research">Research로 이어가기</Link>
        </section>
      </div>
      <footer className={styles.footer}>
        <span>DATE Evidence Detail Wireframe</span>
        <span>Mock / Prototype data only</span>
      </footer>
    </main>
  );
}

function EvidenceRelationList({
  title,
  items,
  emptyLabel = "관련 Evidence 없음"
}: {
  title: string;
  items: EvidenceRelation[];
  emptyLabel?: string;
}) {
  return (
    <div className={styles.relationList} aria-label={title}>
      {items.length > 0 ? (
        items.map((item) => (
          <Link aria-label={`Related Evidence ${item.id} ${item.relationshipType} 보기`} href={`/evidence/${item.id}`} key={`${title}-${item.id}`}>
            <span>{item.relationshipType}</span>
            <strong>{item.id} · {item.title}</strong>
            <small>{item.source}</small>
            <small>{item.freshness}</small>
            <em>{item.status}</em>
          </Link>
        ))
      ) : (
        <article>
          <span>{emptyLabel}</span>
          <strong>Mock / Prototype empty state</strong>
        </article>
      )}
    </div>
  );
}

function GlobalHeader() {
  return (
    <header className={styles.globalHeader}>
      <Link className={styles.logo} href="/" aria-label="DATE Home">
        DATE
      </Link>
      <nav className={styles.globalNavigation} aria-label="Global Navigation">
        {navigationItems.map((item) =>
          item.enabled && item.href ? (
            <Link className={styles.navLink} href={item.href} key={item.label}>
              {item.label}
            </Link>
          ) : (
            <button className={styles.disabledNavLink} disabled key={item.label} type="button">
              {item.label}
            </button>
          )
        )}
      </nav>
      <div className={styles.guestActions} aria-label="Guest Header Actions">
        <button type="button">Search</button>
        <button type="button">Theme</button>
        <button type="button">Notify</button>
        <button type="button">Login</button>
      </div>
    </header>
  );
}
