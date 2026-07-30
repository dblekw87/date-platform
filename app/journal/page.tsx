"use client";

import Link from "next/link";
import styles from "./page.module.scss";

type JournalEntry = {
  id: string;
  recordedAt: string;
  evidenceObservedAt: string;
  researchSnapshotAt: string;
  lastReviewedAt: string;
  observation: string;
  hypothesis: string;
  decision: string;
  why: string;
  linkedEvidence: string;
  relatedEntity: { label: string; href: string };
  relatedTheme: string;
  expectedCondition: string;
  invalidatingCondition: string;
  confidenceBoundary: {
    evidenceCoverage: string;
    assumptionRisk: string;
    reviewConfidence: string;
  };
  status: string;
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Research", href: "/research" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Journal", href: "/journal" },
  { label: "Community", href: null }
];

const entries: JournalEntry[] = [
  {
    id: "ENTRY-001",
    recordedAt: "Mock recorded 2026-07-29 13:20",
    evidenceObservedAt: "Evidence observed at Mock 10:10",
    researchSnapshotAt: "Research snapshot at Mock 13:00",
    lastReviewedAt: "Last reviewed Mock 14:00",
    observation: "EV-117이 환율 민감도와 성장주 반응을 같은 window에서 연결했습니다.",
    hypothesis: "정책 범위와 공급망 노출이 확인되면 Semiconductor 관련 Entity 검토 우선순위가 높아질 수 있습니다.",
    decision: "Research Workspace에서 EV-117을 Lead Evidence로 유지하고 EV-122 contradiction을 다음 검토 대상으로 둡니다.",
    why: "복수 Source cue는 있으나 policy scope와 company-level exposure는 아직 확정되지 않았습니다.",
    linkedEvidence: "EV-117",
    relatedEntity: { label: "Samsung Electronics", href: "/entity/005930" },
    relatedTheme: "Semiconductor",
    expectedCondition: "추가 Source가 정책 scope와 시행 시점을 명확히 합니다.",
    invalidatingCondition: "EV-122 contradiction이 같은 source window에서 더 강한 boundary를 요구합니다.",
    confidenceBoundary: {
      evidenceCoverage: "Moderate Evidence Coverage",
      assumptionRisk: "Moderate Assumption Risk",
      reviewConfidence: "Needs Revalidation"
    },
    status: "In Review"
  },
  {
    id: "ENTRY-002",
    recordedAt: "Mock recorded 2026-07-29 14:10",
    evidenceObservedAt: "Evidence observed at Mock 10:15",
    researchSnapshotAt: "Research snapshot at Mock 13:30",
    lastReviewedAt: "Review pending",
    observation: "EV-104는 AI infrastructure cue를 제공하지만 Source가 제한적입니다.",
    hypothesis: "두 번째 Source가 발견되면 Apple과 AI Theme의 relation을 Research comparison에 추가할 수 있습니다.",
    decision: "EV-104는 Supporting Evidence로 유지하고 Decision 확정 근거로 사용하지 않습니다.",
    why: "Source coverage가 낮고 Open Question과 연결된 required source가 남아 있습니다.",
    linkedEvidence: "EV-104",
    relatedEntity: { label: "Apple", href: "/entity/AAPL" },
    relatedTheme: "AI",
    expectedCondition: "같은 timeframe의 publisher-labeled source가 추가됩니다.",
    invalidatingCondition: "AI capex cue가 source-limited 상태로 남거나 relation이 Theme 수준에서만 머뭅니다.",
    confidenceBoundary: {
      evidenceCoverage: "Low Evidence Coverage",
      assumptionRisk: "Moderate Assumption Risk",
      reviewConfidence: "Before Review"
    },
    status: "Needs Review"
  },
  {
    id: "ENTRY-003",
    recordedAt: "Mock recorded 2026-07-29 15:25",
    evidenceObservedAt: "Evidence observed at Mock 12:05",
    researchSnapshotAt: "Research snapshot at Mock 15:00",
    lastReviewedAt: "Last reviewed Mock 15:40",
    observation: "EV-122가 시장 반응을 원인 관계로 읽는 해석에 강한 boundary를 요구했습니다.",
    hypothesis: "Contradicting Evidence가 유지되면 Research decision은 가격 반응보다 source method 검증으로 이동해야 합니다.",
    decision: "Market reaction을 decision proof로 사용하지 않고 Freshness와 contradiction review를 우선합니다.",
    why: "시장 가격 변화는 context이며 Evidence relation을 대체하지 않습니다.",
    linkedEvidence: "EV-122",
    relatedEntity: { label: "NVIDIA", href: "/entity/NVDA" },
    relatedTheme: "Infrastructure",
    expectedCondition: "Contradicting source의 method와 universe가 확인됩니다.",
    invalidatingCondition: "동일 publisher의 later note가 earlier breadth cue를 supersede합니다.",
    confidenceBoundary: {
      evidenceCoverage: "Moderate Evidence Coverage",
      assumptionRisk: "High Assumption Risk",
      reviewConfidence: "Needs Revalidation"
    },
    status: "Boundary Strong"
  }
];

const summary = [
  "Total Decisions 3",
  "Active Hypotheses 3",
  "Reviewed Decisions 1",
  "Open Questions 2",
  "Linked Evidence 3",
  "Linked Research 1"
];

const evidenceSnapshots = entries.map((entry) => ({
  entryId: entry.id,
  evidenceId: entry.linkedEvidence,
  captured: "Captured at decision time",
  source: `Mock Source snapshot for ${entry.linkedEvidence}`,
  freshness: entry.evidenceObservedAt,
  boundary: "Snapshot boundary preserved; current Evidence may differ",
  validation: entry.status
}));

const openQuestions = [
  {
    question: "정책 범위가 indirect supply-chain exposure까지 확장되는가?",
    missingEvidence: "Policy scope source",
    requiredSource: "Official policy or provider method note",
    status: "Open",
    priority: "High"
  },
  {
    question: "AI infrastructure cue가 복수 Source로 검증되는가?",
    missingEvidence: "Second comparable source",
    requiredSource: "Publisher-labeled research",
    status: "Needs Review",
    priority: "Medium"
  }
];

export default function JournalPage() {
  return (
    <main className={styles.journalShell}>
      <header className={styles.globalHeader}>
        <Link className={styles.logo} href="/">DATE</Link>
        <nav className={styles.globalNavigation} aria-label="Global Navigation">
          {navigationItems.map((item) =>
            item.href ? (
              <Link
                aria-current={item.href === "/journal" ? "page" : undefined}
                className={item.href === "/journal" ? styles.activeNavLink : styles.navLink}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <button className={styles.disabledNavLink} disabled key={item.label} type="button">{item.label}</button>
            )
          )}
        </nav>
        <div className={styles.headerActions}>
          <Link href="/discover">Search</Link>
          <button disabled type="button">Theme</button>
          <button disabled type="button">Notify</button>
          <button disabled type="button">Login</button>
        </div>
      </header>

      <div className={styles.journalFrame}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/discover">Discovery</Link></li>
            <li><Link href="/entity/005930">Entity</Link></li>
            <li><Link href="/evidence/EV-117">Evidence</Link></li>
            <li><Link href="/research">Research</Link></li>
            <li><Link href="/monitoring">Monitoring</Link></li>
            <li><Link aria-current="page" href="/journal">Journal</Link></li>
          </ol>
        </nav>

        <section className={styles.journalHeader} aria-labelledby="journal-title">
          <div>
            <span className={styles.kicker}>Journal Workspace / Decision History</span>
            <h1 id="journal-title">Journal은 당시 판단과 가설, 근거의 시점을 보존합니다.</h1>
            <p>결과나 수익률 기록이 아니라 Research 과정에서 만들어진 Decision Context를 시간 흐름으로 남기는 Workspace입니다.</p>
          </div>
          <dl>
            <div><dt>Journal Count</dt><dd>3</dd></div>
            <div><dt>Decision Count</dt><dd>3</dd></div>
            <div><dt>Last Updated</dt><dd>Mock updated time</dd></div>
            <div><dt>Journal Status</dt><dd>Mock In Review</dd></div>
          </dl>
          <div className={styles.headerActionsRow}>
            <Link href="/research">View Research</Link>
            <Link href="/monitoring">Return to Monitoring</Link>
          </div>
        </section>

        <section className={styles.summarySection} aria-labelledby="summary-title">
          <h2 id="summary-title">Journal Summary</h2>
          <div className={styles.summaryGrid}>
            {summary.map((item) => <article key={item}><span>{item}</span><strong>Mock</strong></article>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="timeline-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Decision Timeline</span>
            <h2 id="timeline-title">Evidence event가 아니라 Decision의 흐름</h2>
          </div>
          <ol className={styles.timelineList}>
            {entries.map((entry) => (
              <li key={entry.id}>
                <time>{entry.recordedAt}</time>
                <div>
                  <strong>{entry.decision}</strong>
                  <small>Related Research: Semiconductor Export Scope Research</small>
                  <small>Related Evidence: {entry.linkedEvidence}</small>
                  <em>Status: {entry.status}</em>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="entries-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Decision Entries</span>
            <h2 id="entries-title">Hypothesis와 Decision을 분리한 공통 문법</h2>
          </div>
          <div className={styles.entryGrid}>
            {entries.map((entry) => (
              <article key={entry.id}>
                <span>{entry.id}</span>
                <h3>{entry.decision}</h3>
                <dl>
                  <div><dt>Recorded At</dt><dd>{entry.recordedAt}</dd></div>
                  <div><dt>Observation</dt><dd>{entry.observation}</dd></div>
                  <div><dt>Hypothesis</dt><dd>{entry.hypothesis}</dd></div>
                  <div><dt>Decision</dt><dd>{entry.decision}</dd></div>
                  <div><dt>Why</dt><dd>{entry.why}</dd></div>
                  <div><dt>Linked Evidence</dt><dd>{entry.linkedEvidence}</dd></div>
                  <div><dt>Related Entity</dt><dd>{entry.relatedEntity.label}</dd></div>
                  <div><dt>Related Theme</dt><dd>{entry.relatedTheme}</dd></div>
                  <div><dt>Expected Condition</dt><dd>{entry.expectedCondition}</dd></div>
                  <div><dt>Invalidating Condition</dt><dd>{entry.invalidatingCondition}</dd></div>
                  <div><dt>Confidence Boundary</dt><dd>{entry.confidenceBoundary.evidenceCoverage} / {entry.confidenceBoundary.assumptionRisk} / {entry.confidenceBoundary.reviewConfidence}</dd></div>
                  <div><dt>Status</dt><dd>{entry.status}</dd></div>
                </dl>
                <div className={styles.entryActions}>
                  <Link href="/research">Research</Link>
                  <Link href={`/evidence/${entry.linkedEvidence}`}>Evidence</Link>
                  <Link href={entry.relatedEntity.href}>Entity</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-snapshot-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Evidence Snapshot</span>
            <h2 id="evidence-snapshot-title">현재 상태가 아니라 Decision 당시 참고 상태</h2>
          </div>
          <div className={styles.snapshotGrid}>
            {evidenceSnapshots.map((snapshot) => (
              <article key={`${snapshot.entryId}-${snapshot.evidenceId}`}>
                <span>{snapshot.captured}</span>
                <strong>{snapshot.entryId} / {snapshot.evidenceId}</strong>
                <small>Source: {snapshot.source}</small>
                <small>Freshness: {snapshot.freshness}</small>
                <small>Boundary: {snapshot.boundary}</small>
                <small>Validation: {snapshot.validation}</small>
                <Link href={`/evidence/${snapshot.evidenceId}`}>Evidence Detail</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="research-snapshot-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Research Snapshot</span>
            <h2 id="research-snapshot-title">Decision과 연결된 Workspace Snapshot</h2>
          </div>
          <article className={styles.researchSnapshot}>
            <span>Research snapshot at Mock 13:00</span>
            <strong>Semiconductor Export Scope Research</strong>
            <p>Active Focus: Samsung Electronics + Semiconductor</p>
            <p>Compared Evidence: EV-104 / EV-117 / EV-122</p>
            <p>Open Questions: policy scope, second source requirement</p>
            <Link href="/research">Research Workspace</Link>
          </article>
        </section>

        <section className={styles.section} id="decision-review" aria-labelledby="review-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Decision Review</span>
            <h2 id="review-title">결과 평가가 아니라 판단 품질 검토</h2>
          </div>
          <div className={styles.reviewGrid}>
            {entries.map((entry) => (
              <article key={`review-${entry.id}`}>
                <span>{entry.id}</span>
                <dl>
                  <div><dt>Original Hypothesis</dt><dd>{entry.hypothesis}</dd></div>
                  <div><dt>Original Decision</dt><dd>{entry.decision}</dd></div>
                  <div><dt>What Changed</dt><dd>Mock: Evidence relation and interpretation boundary changed.</dd></div>
                  <div><dt>Evidence Added</dt><dd>EV-104 / EV-117 placeholder</dd></div>
                  <div><dt>Evidence Contradicted</dt><dd>EV-122 contradiction candidate</dd></div>
                  <div><dt>Assumption Invalidated</dt><dd>{entry.invalidatingCondition}</dd></div>
                  <div><dt>Current Assessment</dt><dd>Assess reasoning quality only; no outcome or P/L judgment.</dd></div>
                  <div><dt>Lessons Learned Placeholder</dt><dd>Preserve Source/Freshness/Boundary before carrying Decision forward.</dd></div>
                  <div><dt>Next Review Condition</dt><dd>{entry.expectedCondition}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="questions-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Open Questions</span>
            <h2 id="questions-title">Decision의 약한 부분</h2>
          </div>
          <div className={styles.questionGrid}>
            {openQuestions.map((item) => (
              <article key={item.question}>
                <span>{item.priority}</span>
                <strong>{item.question}</strong>
                <small>Missing Evidence: {item.missingEvidence}</small>
                <small>Required Source: {item.requiredSource}</small>
                <em>Status: {item.status}</em>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.emptyStates} aria-labelledby="empty-title">
          <h2 id="empty-title">Wireframe Empty / Placeholder States</h2>
          <div>
            {["Journal Entry 없음", "Linked Evidence 없음", "Research Snapshot 없음", "Open Question 없음", "Review 전 상태", "Evidence가 변경된 상태"].map((item) => (
              <article key={item}><strong>{item}</strong><small>Mock empty state / 저장 실패 또는 기술 오류 아님</small></article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>DATE Journal Wireframe / Mock Prototype</span>
        <nav aria-label="Journal Footer Navigation">
          <Link href="/research">View Research</Link>
          <Link href="/monitoring">Return to Monitoring</Link>
          <Link href="/evidence/EV-117">Lead Evidence</Link>
        </nav>
      </footer>
    </main>
  );
}
