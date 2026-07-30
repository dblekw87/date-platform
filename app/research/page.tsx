"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.scss";

type EvidenceStatus = "Needs Review" | "In Review" | "Boundary Strong";
type WorkspaceStatus = "Draft" | "In Review" | "Completed";

type EvidenceItem = {
  id: string;
  title: string;
  claim: string;
  source: string;
  freshness: string;
  boundary: string;
  validation: EvidenceStatus;
  supportingCount: number;
  contradictingCount: number;
  hasOpenQuestion: boolean;
  relatedEntity: {
    label: string;
    href: string;
  };
  relatedTheme: string;
  role: "Lead Evidence" | "Supporting Evidence" | "Contradicting Evidence";
};

type ResearchFlowItem = {
  step: "Observation" | "Evidence Added" | "Interpretation Updated" | "Open Question" | "Research Status";
  time: string;
  title: string;
  evidence: string;
  status: string;
};

type RelatedEntity = {
  name: string;
  symbol: string;
  type: "Security" | "Company";
  relatedEvidence: string;
  exposure: string;
  href: string;
};

type RelatedTheme = {
  name: string;
  evidenceCount: string;
  entityCount: string;
  freshness: string;
  status: string;
};

type OpenQuestion = {
  question: string;
  priority: "High" | "Medium" | "Low";
  blocking: "Blocking" | "Not Blocking";
  missingEvidence: string;
  requiredSource: string;
  currentStatus: string;
};

const workspace = {
  title: "Semiconductor Export Scope Research",
  focus: "Active Focus: Semiconductor supply chain / Samsung Electronics",
  status: "In Review" as WorkspaceStatus,
  target: "Security + Theme comparison",
  lastUpdated: "Mock updated time placeholder",
  relatedEntityCount: "3",
  evidenceCount: "3",
  openQuestionCount: "2"
};

const evidenceItems: EvidenceItem[] = [
  {
    id: "EV-117",
    title: "Policy scope change may affect semiconductor supply chain exposure",
    claim: "Export control scope could expand beyond direct chip shipments.",
    source: "Mock source set: policy memo + provider note",
    freshness: "Fresh / retrieved mock same-day",
    boundary: "Does not confirm enforcement date or company-level revenue effect.",
    validation: "In Review",
    supportingCount: 2,
    contradictingCount: 0,
    hasOpenQuestion: true,
    relatedEntity: { label: "Samsung Electronics", href: "/entity/005930" },
    relatedTheme: "Semiconductor",
    role: "Lead Evidence"
  },
  {
    id: "EV-104",
    title: "AI infrastructure capital expenditure signal remains source-limited",
    claim: "Capital spending language suggests continued infrastructure demand.",
    source: "Mock source: provider A excerpt placeholder",
    freshness: "Fresh / last verified mock",
    boundary: "Single-source cue; does not validate supplier allocation.",
    validation: "Needs Review",
    supportingCount: 1,
    contradictingCount: 1,
    hasOpenQuestion: true,
    relatedEntity: { label: "Apple", href: "/entity/AAPL" },
    relatedTheme: "AI",
    role: "Supporting Evidence"
  },
  {
    id: "EV-122",
    title: "Long-duration rate reaction conflicts with the simple risk-on interpretation",
    claim: "Macro reaction may be inconsistent with a broad growth-positive reading.",
    source: "Mock source set: market note + dated source cue",
    freshness: "Stale risk / revalidation needed",
    boundary: "Market reaction is context, not proof of causal policy impact.",
    validation: "Boundary Strong",
    supportingCount: 0,
    contradictingCount: 2,
    hasOpenQuestion: false,
    relatedEntity: { label: "NVIDIA", href: "/entity/NVDA" },
    relatedTheme: "Infrastructure",
    role: "Contradicting Evidence"
  }
];

const workspaceSummary = [
  ["Evidence", "3"],
  ["Sources", "5 Mock"],
  ["Entities", "3"],
  ["Themes", "3"],
  ["Research Flow", "5"],
  ["Interpretations", "1 Mock"]
];

const researchFlow: ResearchFlowItem[] = [
  {
    step: "Observation",
    time: "Mock T-04",
    title: "Policy language changed from product to supply-chain exposure.",
    evidence: "EV-117",
    status: "Observed"
  },
  {
    step: "Evidence Added",
    time: "Mock T-03",
    title: "Provider note added source-limited AI infrastructure cue.",
    evidence: "EV-104",
    status: "Needs review"
  },
  {
    step: "Interpretation Updated",
    time: "Mock T-02",
    title: "Interpretation boundary narrowed to exposure mapping only.",
    evidence: "EV-117 / EV-122",
    status: "Generated mock"
  },
  {
    step: "Open Question",
    time: "Mock T-01",
    title: "Company-level revenue exposure remains unverified.",
    evidence: "EV-117",
    status: "Blocking"
  },
  {
    step: "Research Status",
    time: "Mock now",
    title: "Workspace remains in review until source scope is validated.",
    evidence: "Workspace",
    status: workspace.status
  }
];

const relatedEntities: RelatedEntity[] = [
  {
    name: "Samsung Electronics",
    symbol: "005930",
    type: "Security",
    relatedEvidence: "EV-117, EV-104",
    exposure: "Mock exposure: HBM and semiconductor supply-chain mapping",
    href: "/entity/005930"
  },
  {
    name: "Apple",
    symbol: "AAPL",
    type: "Security",
    relatedEvidence: "EV-104",
    exposure: "Mock exposure: device AI supply-chain dependency",
    href: "/entity/AAPL"
  },
  {
    name: "NVIDIA",
    symbol: "NVDA",
    type: "Company",
    relatedEvidence: "EV-122",
    exposure: "Mock exposure: infrastructure demand and policy boundary",
    href: "/entity/NVDA"
  }
];

const relatedThemes: RelatedTheme[] = [
  {
    name: "AI",
    evidenceCount: "2 Evidence",
    entityCount: "2 Entities",
    freshness: "Fresh",
    status: "Candidate set active"
  },
  {
    name: "Semiconductor",
    evidenceCount: "3 Evidence",
    entityCount: "3 Entities",
    freshness: "Mixed freshness",
    status: "Primary research theme"
  },
  {
    name: "Infrastructure",
    evidenceCount: "1 Evidence",
    entityCount: "2 Entities",
    freshness: "Stale risk",
    status: "Boundary review"
  }
];

const openQuestions: OpenQuestion[] = [
  {
    question: "Does the policy scope apply to indirect supply-chain exposure?",
    priority: "High",
    blocking: "Blocking",
    missingEvidence: "Company-specific exposure mapping",
    requiredSource: "Policy scope source or provider method note",
    currentStatus: "Open / blocks Completed state"
  },
  {
    question: "Is the AI infrastructure cue supported by more than one provider?",
    priority: "Medium",
    blocking: "Not Blocking",
    missingEvidence: "Second source with comparable timeframe",
    requiredSource: "Publisher-labeled research or source availability cue",
    currentStatus: "Needs review"
  }
];

const notes = [
  ["Observation", "Policy and infrastructure signals overlap, but source confidence differs by Evidence."],
  ["Hypothesis", "The useful research path is exposure mapping, not price reaction attribution."],
  ["Remaining Questions", "Policy timing and company-specific supplier impact remain unresolved."],
  ["Next Step", "Check original source placeholder and compare EV-117 against EV-122 before moving to decision context."]
];

export default function ResearchWorkspacePage() {
  const [workspaceStatus, setWorkspaceStatus] = useState<WorkspaceStatus>(workspace.status);
  const [activeTheme, setActiveTheme] = useState("Semiconductor");

  return (
    <main className={styles.pageShell}>
      <header className={styles.globalHeader}>
        <Link className={styles.brand} href="/" aria-label="DATE Home">
          DATE
        </Link>
        <nav className={styles.globalNav} aria-label="Global navigation">
          <Link href="/">Home</Link>
          <Link href="/discover">Discover</Link>
          <Link aria-current="page" href="/research">Research</Link>
          <Link href="/monitoring">Monitoring</Link>
          <Link href="/journal">Journal</Link>
          <span aria-disabled="true">Community</span>
        </nav>
        <div className={styles.headerActions} aria-label="Guest actions">
          <Link href="/discover">Search</Link>
          <button type="button" disabled>
            Theme
          </button>
          <button type="button" disabled>
            Alerts
          </button>
          <button type="button" disabled>
            Login
          </button>
        </div>
      </header>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/discover">Discovery</Link></li>
          <li><Link href="/entity/005930">Entity</Link></li>
          <li><Link href="/evidence/EV-117">Evidence</Link></li>
          <li><Link aria-current="page" href="/research">Research</Link></li>
        </ol>
      </nav>

      <aside className={styles.researchContextBar} aria-label="Research Context Bar">
        <div>
          <span>Active Workspace</span>
          <strong>{workspace.title}</strong>
        </div>
        <div>
          <span>Current Focus</span>
          <strong>Samsung Electronics + Semiconductor</strong>
        </div>
        <div>
          <span>Workspace Status</span>
          <strong>{workspaceStatus}</strong>
        </div>
        <div>
          <span>Selected Evidence</span>
          <strong>EV-117</strong>
        </div>
      </aside>

      <section className={styles.researchHeader} aria-labelledby="research-title">
        <div className={styles.headerCopy}>
          <span className={styles.kicker}>Research Workspace / Mock Prototype</span>
          <h1 id="research-title">{workspace.title}</h1>
          <p>
            Evidence를 비교하고 Source, Freshness, Boundary를 보존하면서 분석 판단을 구성하는
            읽기와 분석 전용 workspace입니다.
          </p>
        </div>
        <aside className={styles.workspaceState} aria-label="Workspace state">
          <div>
            <span>Workspace Status</span>
            <select
              aria-label="Workspace Status mock selector"
              value={workspaceStatus}
              onChange={(event) => setWorkspaceStatus(event.target.value as WorkspaceStatus)}
            >
              <option>Draft</option>
              <option>In Review</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <span>Active Focus</span>
            <strong>{workspace.focus}</strong>
          </div>
          <dl>
            <div>
              <dt>Related Entity</dt>
              <dd>{workspace.relatedEntityCount}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{workspace.evidenceCount}</dd>
            </div>
            <div>
              <dt>Open Question</dt>
              <dd>{workspace.openQuestionCount}</dd>
            </div>
            <div>
              <dt>Last Updated</dt>
              <dd>{workspace.lastUpdated}</dd>
            </div>
          </dl>
        </aside>
        <div className={styles.headerCtas} aria-label="Research actions">
          <Link href="/evidence/EV-117">Return to Evidence</Link>
          <a href="#comparison">Compare Evidence</a>
          <Link href="/monitoring">Open Monitoring</Link>
          <button type="button" disabled>
            Add Evidence Placeholder
          </button>
        </div>
      </section>

      <section className={styles.summaryStrip} aria-labelledby="summary-title">
        <div>
          <span className={styles.kicker}>Workspace Summary</span>
          <h2 id="summary-title">현재 분석 구성</h2>
        </div>
        <div className={styles.summaryGrid}>
          {workspaceSummary.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.activeEvidence} aria-labelledby="active-evidence-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Active Evidence</span>
          <h2 id="active-evidence-title">검토 중인 Evidence</h2>
          <p>Lead Evidence를 먼저 두고 Supporting / Contradicting Evidence를 같은 경계로 비교합니다.</p>
        </div>
        <div className={styles.evidenceList}>
          {evidenceItems.map((item) => (
            <article className={styles.evidenceRow} key={item.id}>
              <div>
                <span>{item.role}</span>
                <h3>{item.id}</h3>
              </div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.boundary}</p>
              </div>
              <dl>
                <div>
                  <dt>Source</dt>
                  <dd>{item.source}</dd>
                </div>
                <div>
                  <dt>Freshness</dt>
                  <dd>{item.freshness}</dd>
                </div>
                <div>
                  <dt>Validation</dt>
                  <dd>{item.validation}</dd>
                </div>
              </dl>
              <div className={styles.rowLinks}>
                <Link href={item.relatedEntity.href}>{item.relatedEntity.label}</Link>
                <Link href={`/evidence/${item.id}`}>Evidence Detail</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.comparisonSection} id="comparison" aria-labelledby="comparison-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Evidence Comparison</span>
          <h2 id="comparison-title">차이를 드러내는 비교 Matrix</h2>
          <p>Desktop에서는 Matrix, Tablet과 Mobile에서는 Evidence별 Stack으로 전환됩니다.</p>
        </div>
        <div className={styles.comparisonMatrix} role="table" aria-label="Evidence comparison matrix">
          <div className={styles.matrixHeader} role="row">
            <span role="columnheader">Evidence</span>
            <span role="columnheader">Claim</span>
            <span role="columnheader">Source</span>
            <span role="columnheader">Freshness</span>
            <span role="columnheader">Boundary</span>
            <span role="columnheader">Validation</span>
            <span role="columnheader">Support</span>
            <span role="columnheader">Contradict</span>
            <span role="columnheader">Open Q</span>
          </div>
          {evidenceItems.map((item) => (
            <div className={styles.matrixRow} role="row" key={item.id}>
              <span role="cell" data-label="Evidence">
                <Link href={`/evidence/${item.id}`}>{item.id}</Link>
              </span>
              <span role="cell" data-label="Claim">{item.claim}</span>
              <span role="cell" data-label="Source">{item.source}</span>
              <span role="cell" data-label="Freshness">{item.freshness}</span>
              <span role="cell" data-label="Boundary">{item.boundary}</span>
              <span role="cell" data-label="Validation">{item.validation}</span>
              <span role="cell" data-label="Supporting Evidence">{item.supportingCount}</span>
              <span role="cell" data-label="Contradicting Evidence">{item.contradictingCount}</span>
              <span role="cell" data-label="Open Question">{item.hasOpenQuestion ? "Yes" : "No"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Research Flow</span>
          <h2 id="flow-title">Event가 아니라 분석 진행 순서</h2>
          <p>Observation에서 Research Status까지 Evidence와 Interpretation의 변경 흐름만 표시합니다.</p>
        </div>
        <ol className={styles.flowList}>
          {researchFlow.map((item) => (
            <li key={`${item.step}-${item.time}`}>
              <span>{item.step}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.time} / Linked: {item.evidence} / Status: {item.status}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.relatedGrid}>
        <section className={styles.relatedSection} aria-labelledby="entity-title">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Related Entity</span>
            <h2 id="entity-title">Entity 비교</h2>
          </div>
          <div className={styles.relatedList}>
            {relatedEntities.map((entity) => (
              <article key={entity.symbol}>
                <span>{entity.type}</span>
                <h3>{entity.name}</h3>
                <p>{entity.exposure}</p>
                <small>Related Evidence: {entity.relatedEvidence}</small>
                <Link href={entity.href}>{entity.symbol} Entity Detail</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="theme-title">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Related Theme</span>
            <h2 id="theme-title">Theme candidate</h2>
          </div>
          <div className={styles.themeList}>
            {relatedThemes.map((theme) => (
              <button
                aria-pressed={activeTheme === theme.name}
                className={activeTheme === theme.name ? styles.selectedTheme : styles.themeButton}
                key={theme.name}
                onClick={() => setActiveTheme(theme.name)}
                type="button"
              >
                <strong>{theme.name}</strong>
                <span>{theme.evidenceCount} / {theme.entityCount}</span>
                <small>{theme.freshness} / {theme.status}</small>
              </button>
            ))}
          </div>
          <Link className={styles.discoveryLink} href={`/discover?theme=${encodeURIComponent(activeTheme)}`}>
            Discovery candidate: {activeTheme}
          </Link>
        </section>
      </div>

      <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Generated Mock / Interpretation Review</span>
          <h2 id="interpretation-title">AI Summary가 아닌 검토 대상 Interpretation</h2>
          <p>
            Linked Evidence: EV-117, EV-122. Confidence placeholder는 판단 보조일 뿐이며
            Source와 Evidence Boundary를 대체하지 않습니다.
          </p>
        </div>
        <div className={styles.interpretationBody}>
          <strong>Interpretation</strong>
          <p>
            현재 workspace는 정책 범위 확대 가능성과 시장 반응을 분리해서 읽어야 합니다.
            가격 반응은 context이며, policy scope와 company exposure는 별도 Evidence가 필요합니다.
          </p>
          <dl>
            <div>
              <dt>Confidence Placeholder</dt>
              <dd>Mock medium / requires review</dd>
            </div>
            <div>
              <dt>Boundary</dt>
              <dd>Does not decide investment action or confirm enforcement timing.</dd>
            </div>
            <div>
              <dt>Review Status</dt>
              <dd>Needs Review</dd>
            </div>
          </dl>
          <Link href="/research#comparison">Research Review</Link>
        </div>
      </section>

      <section className={styles.questionsSection} aria-labelledby="questions-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Open Questions</span>
          <h2 id="questions-title">Research 진행 상태를 막는 질문</h2>
        </div>
        <div className={styles.questionList}>
          {openQuestions.map((item) => (
            <article key={item.question}>
              <div>
                <span>{item.priority} Priority</span>
                <strong>{item.blocking}</strong>
              </div>
              <h3>{item.question}</h3>
              <dl>
                <div>
                  <dt>Missing Evidence</dt>
                  <dd>{item.missingEvidence}</dd>
                </div>
                <div>
                  <dt>Required Source</dt>
                  <dd>{item.requiredSource}</dd>
                </div>
                <div>
                  <dt>Current Status</dt>
                  <dd>{item.currentStatus}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.notesSection} aria-labelledby="notes-title">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Research Notes Placeholder</span>
          <h2 id="notes-title">자유 메모가 아닌 분석 구조</h2>
        </div>
        <div className={styles.notesGrid}>
          {notes.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.workspaceFooter}>
        <span>Workspace Footer / Mock Prototype</span>
        <Link href="/evidence/EV-117">Return to Evidence</Link>
        <Link href="/discover">Continue Discovery</Link>
        <Link href="/entity/005930">Current Entity</Link>
        <Link href="/monitoring">Open Monitoring</Link>
      </footer>
    </main>
  );
}
