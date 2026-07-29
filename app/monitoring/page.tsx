"use client";

import Link from "next/link";
import styles from "./page.module.scss";

type SignalStatus =
  | "Unverified Signal"
  | "Source Located"
  | "Evidence Candidate"
  | "Evidence Linked"
  | "Dismissed";

type MonitoringRule = {
  target: string;
  targetType: "Entity" | "Theme" | "Evidence" | "Research Context";
  scope: string;
  ruleType: string;
  triggerCondition: string;
  lastChecked: string;
  lastMeaningfulChange: string;
  status: string;
  reviewHref: string;
};

type ChangeItem = {
  changeType: string;
  changeSummary: string;
  targetType: string;
  relatedContext: string;
  triggerCondition: string;
  detectedAt: string;
  sourceLinkStatus: string;
  evidenceStatus: SignalStatus;
  priority: "High" | "Medium" | "Low";
  reviewStatus: string;
  primaryEntry: { label: string; href: string };
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Research", href: "/research" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Journal", href: null },
  { label: "Community", href: null }
];

const activeMonitoring: MonitoringRule[] = [
  {
    target: "Samsung Electronics",
    targetType: "Entity",
    scope: "Security + Company context for semiconductor exposure",
    ruleType: "Contradicting Evidence 추가",
    triggerCondition: "EV-117과 충돌하는 Evidence candidate가 감지될 때",
    lastChecked: "Mock checked 09:40",
    lastMeaningfulChange: "Mock contradiction candidate detected",
    status: "Active / Review required",
    reviewHref: "/evidence/EV-122"
  },
  {
    target: "Apple",
    targetType: "Entity",
    scope: "AI device supply-chain context",
    ruleType: "새로운 Evidence 발견",
    triggerCondition: "AI capex와 연결된 Source가 발견될 때",
    lastChecked: "Mock checked 10:10",
    lastMeaningfulChange: "Mock new source located",
    status: "Active / Source located",
    reviewHref: "/entity/AAPL"
  },
  {
    target: "Semiconductor",
    targetType: "Theme",
    scope: "Discovery candidate set and related Entity relationship",
    ruleType: "Entity Relationship 변경",
    triggerCondition: "Theme와 Entity 연결 사유가 변경될 때",
    lastChecked: "Mock checked 10:45",
    lastMeaningfulChange: "Mock related context changed",
    status: "Watching",
    reviewHref: "/discover"
  },
  {
    target: "EV-117",
    targetType: "Evidence",
    scope: "Lead Evidence used in Research Workspace",
    ruleType: "Freshness 임계치 도달",
    triggerCondition: "Last verified placeholder가 review window를 넘을 때",
    lastChecked: "Mock checked 11:20",
    lastMeaningfulChange: "Mock freshness degraded",
    status: "Active / Revalidation needed",
    reviewHref: "/evidence/EV-117"
  },
  {
    target: "Semiconductor Export Scope Research",
    targetType: "Research Context",
    scope: "Samsung Electronics + EV-117 + Semiconductor",
    ruleType: "Open Question 관련 Source 발견",
    triggerCondition: "Policy scope Source placeholder가 발견될 때",
    lastChecked: "Mock checked 12:00",
    lastMeaningfulChange: "Mock open question source candidate",
    status: "Active / Research review",
    reviewHref: "/research"
  }
];

const changes: ChangeItem[] = [
  {
    changeType: "Evidence contradiction",
    changeSummary: "EV-122가 EV-117의 단순 risk-on 해석과 충돌하는 candidate로 감지되었습니다.",
    targetType: "Evidence",
    relatedContext: "EV-117 / EV-122 / Samsung Electronics",
    triggerCondition: "Contradicting Evidence 추가",
    detectedAt: "Mock detected 10:35",
    sourceLinkStatus: "Source Located",
    evidenceStatus: "Evidence Linked",
    priority: "High",
    reviewStatus: "Waiting for review",
    primaryEntry: { label: "Evidence 검토", href: "/evidence/EV-122" }
  },
  {
    changeType: "Freshness degradation",
    changeSummary: "Lead Evidence EV-117의 검증 기준 시점이 Monitoring review window에 도달했습니다.",
    targetType: "Evidence",
    relatedContext: "EV-117 / Research Workspace",
    triggerCondition: "Freshness 임계치 도달",
    detectedAt: "Mock detected 11:20",
    sourceLinkStatus: "Evidence Source already linked",
    evidenceStatus: "Evidence Linked",
    priority: "High",
    reviewStatus: "Revalidation needed",
    primaryEntry: { label: "Research에서 검토", href: "/research" }
  },
  {
    changeType: "Unverified signal",
    changeSummary: "AI infrastructure 관련 change cue가 감지됐지만 아직 Source와 연결되지 않았습니다.",
    targetType: "Theme",
    relatedContext: "AI / Apple / NVIDIA placeholder",
    triggerCondition: "새로운 변화 cue 감지",
    detectedAt: "Mock detected 12:05",
    sourceLinkStatus: "No Source linked",
    evidenceStatus: "Unverified Signal",
    priority: "Medium",
    reviewStatus: "Source verification required",
    primaryEntry: { label: "Discovery context", href: "/discover" }
  }
];

const evidenceChanges = [
  { type: "New Evidence", id: "EV-104", source: "Mock Source candidate", freshness: "Fresh after Source link", boundary: "Source-limited; not final Evidence truth", href: "/evidence/EV-104" },
  { type: "Updated Evidence", id: "EV-117", source: "Mock linked source set", freshness: "Revalidation needed", boundary: "Cross-market context only", href: "/evidence/EV-117" },
  { type: "Contradicting Evidence", id: "EV-122", source: "Mock market memo", freshness: "Stale risk present", boundary: "Contradiction requires review", href: "/evidence/EV-122" },
  { type: "Revalidated Evidence", id: "EV-117", source: "Mock source reviewed", freshness: "Mock reviewed status", boundary: "Still not investment decision", href: "/research" }
];

const entityChanges = [
  { entity: "Samsung Electronics", type: "New Relationship", exposure: "Export regulation exposure placeholder", evidence: "EV-117 / EV-122", status: "Review required", href: "/entity/005930" },
  { entity: "Apple", type: "Exposure Change Placeholder", exposure: "AI device supply-chain relation", evidence: "EV-104", status: "Source located", href: "/entity/AAPL" },
  { entity: "NVIDIA", type: "Related Entity", exposure: "Infrastructure demand placeholder", evidence: "EV-122", status: "Unknown Entity route supported", href: "/entity/NVDA" }
];

const themeChanges = [
  { theme: "Semiconductor", changeType: "Related Evidence changed", summary: "Contradicting Evidence가 Theme candidate set에 추가되었습니다.", discovery: "DISC-001", evidence: "EV-122", freshness: "Stale risk", status: "Needs review" },
  { theme: "AI", changeType: "Signal detected", summary: "AI infrastructure change cue가 감지됐지만 Source 연결 전입니다.", discovery: "DISC-002", evidence: "No linked Evidence yet", freshness: "Not applicable until Evidence link", status: "Unverified Signal" },
  { theme: "Infrastructure", changeType: "Relationship context changed", summary: "Entity relationship placeholder가 Research context와 연결되었습니다.", discovery: "DISC-003", evidence: "EV-117", freshness: "Mock current", status: "Watching" }
];

const freshnessAlerts = [
  { evidence: "EV-117", current: "Revalidation needed", lastVerified: "Mock 13:00", revalidation: "Yes", priority: "High", reason: "Lead Evidence가 Research 판단 context에 직접 연결되어 있습니다." },
  { evidence: "EV-122", current: "Stale risk", lastVerified: "Mock 12:30", revalidation: "Yes", priority: "High", reason: "Contradicting Evidence가 존재해 최신성 저하가 판단을 흔들 수 있습니다." },
  { evidence: "EV-104", current: "Fresh but source-limited", lastVerified: "Mock 11:20", revalidation: "Conditional", priority: "Medium", reason: "Open Question과 관련된 추가 Source 확인이 필요합니다." }
];

const reviewQueue = [
  { priority: "1", evidence: "EV-122", entity: "Samsung Electronics", why: "Evidence contradiction이 Lead Evidence interpretation을 바꿀 수 있습니다.", basis: "Evidence contradiction / Entity impact scope", href: "/evidence/EV-122" },
  { priority: "2", evidence: "EV-117", entity: "Research Workspace", why: "Freshness degradation이 Research Workspace status를 In Review로 유지시킵니다.", basis: "Freshness degradation / Source verification requirement", href: "/research" },
  { priority: "3", evidence: "EV-104", entity: "Apple", why: "Open Question 관련 Source 후보가 발견됐지만 아직 검증되지 않았습니다.", basis: "Open Question relevance / Source verification requirement", href: "/evidence/EV-104" }
];

export default function MonitoringPage() {
  return (
    <main className={styles.monitoringShell}>
      <header className={styles.globalHeader}>
        <Link className={styles.logo} href="/">DATE</Link>
        <nav className={styles.globalNavigation} aria-label="Global Navigation">
          {navigationItems.map((item) =>
            item.href ? (
              <Link aria-current={item.href === "/monitoring" ? "page" : undefined} className={item.href === "/monitoring" ? styles.activeNavLink : styles.navLink} href={item.href} key={item.label}>
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

      <div className={styles.monitoringFrame}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/discover">Discovery</Link></li>
            <li><Link href="/entity/005930">Entity</Link></li>
            <li><Link href="/evidence/EV-117">Evidence</Link></li>
            <li><Link href="/research">Research</Link></li>
            <li><Link aria-current="page" href="/monitoring">Monitoring</Link></li>
          </ol>
        </nav>

        <section className={styles.monitoringHeader} aria-labelledby="monitoring-title">
          <div>
            <span className={styles.kicker}>Monitoring Workspace / Change Detection</span>
            <h1 id="monitoring-title">Monitoring은 변화와 Trigger를 감지하는 Workspace입니다.</h1>
            <p>Entity, Theme, Evidence, Research Context를 저장하지 않고 선택한 context의 변화 후보와 review 순서만 표현합니다.</p>
          </div>
          <dl>
            <div><dt>Active Monitoring</dt><dd>5</dd></div>
            <div><dt>Entity</dt><dd>3</dd></div>
            <div><dt>Theme</dt><dd>2</dd></div>
            <div><dt>Evidence</dt><dd>3</dd></div>
            <div><dt>Last Updated</dt><dd>Mock updated time</dd></div>
            <div><dt>Status</dt><dd>Mock In Review</dd></div>
          </dl>
          <div className={styles.headerActionsRow}>
            <a href="#review-queue">Review Changes</a>
            <Link href="/research">Return to Research</Link>
          </div>
        </section>

        <section className={styles.summarySection} aria-labelledby="summary-title">
          <h2 id="summary-title">Monitoring Summary</h2>
          <div className={styles.summaryGrid}>
            {["Active Rule 5", "Pending Review 3", "New Evidence 1", "Freshness Alerts 3", "Contradicting Evidence 1", "Open Questions 2"].map((item) => (
              <article key={item}><span>{item}</span><strong>Mock</strong></article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="active-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Active Monitoring</span>
            <h2 id="active-title">Rule과 Trigger를 분리한 관찰 대상</h2>
          </div>
          <div className={styles.ruleGrid}>
            {activeMonitoring.map((item) => (
              <article key={`${item.target}-${item.ruleType}`}>
                <span>{item.targetType}</span>
                <h3>{item.target}</h3>
                <dl>
                  <div><dt>Monitoring Scope</dt><dd>{item.scope}</dd></div>
                  <div><dt>Rule Type</dt><dd>{item.ruleType}</dd></div>
                  <div><dt>Trigger Condition</dt><dd>{item.triggerCondition}</dd></div>
                  <div><dt>Last Checked</dt><dd>{item.lastChecked}</dd></div>
                  <div><dt>Last Meaningful Change</dt><dd>{item.lastMeaningfulChange}</dd></div>
                  <div><dt>Status</dt><dd>{item.status}</dd></div>
                </dl>
                <Link href={item.reviewHref}>Review Entry</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="feed-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Change Feed</span>
            <h2 id="feed-title">시간순이 아니라 검토 우선순위 기준</h2>
          </div>
          <div className={styles.changeFeed}>
            {changes.map((item) => (
              <article key={`${item.changeType}-${item.detectedAt}`}>
                <span>{item.priority} Priority</span>
                <h3>{item.changeType}</h3>
                <p>{item.changeSummary}</p>
                <dl>
                  <div><dt>Target Type</dt><dd>{item.targetType}</dd></div>
                  <div><dt>Related Context</dt><dd>{item.relatedContext}</dd></div>
                  <div><dt>Trigger Condition</dt><dd>{item.triggerCondition}</dd></div>
                  <div><dt>Detected At</dt><dd>{item.detectedAt}</dd></div>
                  <div><dt>Source Link Status</dt><dd>{item.sourceLinkStatus}</dd></div>
                  <div><dt>Evidence Status</dt><dd>{item.evidenceStatus}</dd></div>
                  <div><dt>Review Status</dt><dd>{item.reviewStatus}</dd></div>
                </dl>
                <Link href={item.primaryEntry.href}>{item.primaryEntry.label}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-changes-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Evidence Changes</span>
            <h2 id="evidence-changes-title">Source-linked 이후에만 Freshness와 Boundary 참조</h2>
          </div>
          <div className={styles.compactGrid}>
            {evidenceChanges.map((item) => (
              <article key={`${item.type}-${item.id}`}>
                <span>{item.type}</span>
                <strong>{item.id}</strong>
                <small>Source: {item.source}</small>
                <small>Freshness: {item.freshness}</small>
                <small>Boundary: {item.boundary}</small>
                <Link href={item.href}>Review Entry</Link>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.dualSections}>
          <section className={styles.section} aria-labelledby="entity-changes-title">
            <div className={styles.sectionLead}><h2 id="entity-changes-title">Entity Changes</h2></div>
            <div className={styles.listStack}>
              {entityChanges.map((item) => (
                <article key={item.entity}>
                  <span>{item.type}</span><strong>{item.entity}</strong><p>{item.exposure}</p><small>Related Evidence: {item.evidence}</small><em>{item.status}</em><Link href={item.href}>Entity Detail</Link>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.section} aria-labelledby="theme-changes-title">
            <div className={styles.sectionLead}><h2 id="theme-changes-title">Theme Changes</h2></div>
            <div className={styles.listStack}>
              {themeChanges.map((item) => (
                <article key={item.theme}>
                  <span>{item.theme}</span><strong>{item.changeType}</strong><p>{item.summary}</p><small>Related Discovery: {item.discovery}</small><small>Related Evidence: {item.evidence}</small><small>Freshness: {item.freshness}</small><em>{item.status}</em>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="freshness-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Freshness Alerts</span>
            <h2 id="freshness-title">검토가 필요한 이유를 포함</h2>
          </div>
          <div className={styles.compactGrid}>
            {freshnessAlerts.map((item) => (
              <article key={item.evidence}>
                <span>{item.priority}</span><strong>{item.evidence}</strong><small>Current Freshness: {item.current}</small><small>Last Verified: {item.lastVerified}</small><small>Revalidation Needed: {item.revalidation}</small><p>{item.reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="review-queue" aria-labelledby="review-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Review Queue</span>
            <h2 id="review-title">알림 목록이 아니라 먼저 검토할 순서</h2>
          </div>
          <div className={styles.reviewQueue}>
            {reviewQueue.map((item) => (
              <article key={item.priority}>
                <span>Priority {item.priority}</span>
                <strong>{item.evidence} / {item.entity}</strong>
                <p>{item.why}</p>
                <small>Priority Basis: {item.basis}</small>
                <Link href={item.href}>Entry</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.emptyStates} aria-labelledby="empty-title">
          <h2 id="empty-title">Wireframe Empty / Placeholder States</h2>
          <div>
            {["Active Monitoring 없음", "Change Feed 없음", "Review Queue 없음", "Source가 연결되지 않은 Signal", "Evidence로 연결된 Signal"].map((item) => (
              <article key={item}><strong>{item}</strong><small>Mock empty state / 기술 오류 아님</small></article>
            ))}
          </div>
        </section>
      </div>
      <footer className={styles.footer}>
        <span>DATE Monitoring Wireframe / Mock Prototype</span>
        <nav aria-label="Monitoring Footer Navigation">
          <Link href="/research">Return to Research</Link>
          <Link href="/evidence/EV-117">Lead Evidence</Link>
          <Link href="/entity/005930">Current Entity</Link>
        </nav>
      </footer>
    </main>
  );
}
