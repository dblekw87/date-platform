"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./page.module.scss";

type Market = {
  code: string;
  name: string;
  region: "KR" | "US";
};

type Sector = {
  name: string;
};

type Industry = {
  name: string;
};

type Security = {
  symbol: string;
  exchange: string;
  market: Market;
  currency: "KRW" | "USD";
  marketStatus: string;
  priceSummary: {
    price: string;
    change: string;
    volume: string;
    marketCap: string;
    high: string;
    low: string;
  };
};

type Company = {
  name: string;
  sector: Sector;
  industry: Industry;
  summary: string;
};

type Evidence = {
  id: string;
  title: string;
  claim: string;
  source: string;
  freshness: string;
  boundary: string;
  relatedContext: string;
  openQuestion: string | null;
};

type TimelineEvent = {
  time: string;
  event: string;
  detail: string;
  evidenceId: string;
};

type EntityDetail = {
  security: Security;
  company: Company;
  currentContext: string;
  evidence: {
    lead: Evidence;
    supporting: Evidence[];
    related: Evidence[];
  };
  timeline: TimelineEvent[];
  interpretation: {
    label: string;
    generated: string;
    confidence: string;
    linkedEvidenceIds: string[];
    summary: string;
    sourcePlaceholder: string;
  };
  financial: {
    revenue: string;
    operatingIncome: string;
    eps: string;
    per: string;
    pbr: string;
  };
  monitoring: {
    status: "Active Placeholder" | "Inactive Placeholder";
    rule: string;
    owner: string;
  };
  discussion: {
    title: string;
    opinionBoundary: string;
    count: string;
  };
  relatedEntities: Array<{
    symbol: string;
    companyName: string;
    relation: string;
  }>;
};

const navigationItems = [
  { label: "Home", href: "/", enabled: true },
  { label: "Discover", href: "/discover", enabled: true },
  { label: "Research", href: "/research", enabled: true },
  { label: "Monitoring", href: "/monitoring", enabled: true },
  { label: "Journal", href: "/journal", enabled: true },
  { label: "Community", href: null, enabled: false },
  { label: "Search", href: null, enabled: false },
  { label: "Profile", href: null, enabled: false }
];

const entities: Record<string, EntityDetail> = {
  "005930": {
    security: {
      symbol: "005930",
      exchange: "KRX",
      market: { code: "KR", name: "Korea Equity Market", region: "KR" },
      currency: "KRW",
      marketStatus: "Mock Prototype regular session",
      priceSummary: {
        price: "Mock Prototype KRW xx,xxx",
        change: "Mock Prototype -0.00%",
        volume: "Mock Prototype x,xxx,xxx shares",
        marketCap: "Mock Prototype KRW xxxT",
        high: "Mock Prototype KRW xx,xxx",
        low: "Mock Prototype KRW xx,xxx"
      }
    },
    company: {
      name: "Samsung Electronics",
      sector: { name: "Technology Hardware" },
      industry: { name: "Semiconductors and Consumer Devices" },
      summary:
        "Prototype company context입니다. Security 식별자와 분리된 Company 설명이며 실제 최신 사업 지표를 사용하지 않습니다."
    },
    currentContext: "Current Market Context: Mock 환율 민감도와 반도체 수요 근거를 함께 확인하는 상태입니다.",
    evidence: {
      lead: {
        id: "EV-KR-01",
        title: "환율 변화와 반도체 수요 해석이 같은 방향으로 연결되는지 확인해야 하는 근거",
        claim: "오늘의 핵심 변화는 가격보다 Source가 분리된 수요와 환율 Evidence를 함께 검토하는 것입니다.",
        source: "Mock Source: Prototype research note KR-A",
        freshness: "Freshness: Mock updated time placeholder",
        boundary: "Boundary: Interpretation candidate, not source truth",
        relatedContext: "Related Context: USD/KRW / Semiconductor demand / KRX",
        openQuestion: "수요 근거가 동일 Industry 내 다른 Security에서도 반복되는가?"
      },
      supporting: [
        {
          id: "EV-KR-02",
          title: "국내 시장 폭이 대형 기술주에 집중되는지 확인",
          claim: "시장 방향보다 내부 확산 여부가 Entity 판단에 더 직접적인 단서일 수 있습니다.",
          source: "Mock Source: Prototype market breadth memo",
          freshness: "Freshness: Mock morning placeholder",
          boundary: "Boundary: Source cue incomplete",
          relatedContext: "Related Context: KOSPI / Technology Hardware",
          openQuestion: "있음"
        },
        {
          id: "EV-KR-03",
          title: "단기 가격 변화보다 Evidence freshness가 우선인 상태",
          claim: "가격 요약은 보조 정보이며 오늘 판단은 Evidence freshness 확인이 우선입니다.",
          source: "Mock Source: Prototype evidence desk",
          freshness: "Freshness: Mock intraday placeholder",
          boundary: "Boundary: Prototype only",
          relatedContext: "Related Context: Monitoring rule / Timeline event",
          openQuestion: "없음"
        }
      ],
      related: [
        {
          id: "EV-KR-04",
          title: "동일 Sector 내 Related Entity 비교 후보",
          claim: "동일 Sector 비교는 Source가 확인된 뒤 Research에서 이어집니다.",
          source: "Mock Source: Prototype related entity note",
          freshness: "Freshness: Mock time",
          boundary: "Boundary: Related context only",
          relatedContext: "Related Context: AAPL / Technology",
          openQuestion: "비교 기준이 충분한가?"
        }
      ]
    },
    timeline: [
      { time: "09:10", event: "Market context opened", detail: "KRW 기준 Mock 시장 상태가 설정됨", evidenceId: "EV-KR-01" },
      { time: "10:25", event: "Lead Evidence linked", detail: "환율과 수요 근거 연결 후보 표시", evidenceId: "EV-KR-01" },
      { time: "11:40", event: "Supporting Evidence added", detail: "시장 폭 근거가 Supporting으로 분리됨", evidenceId: "EV-KR-02" }
    ],
    interpretation: {
      label: "AI-assisted Interpretation",
      generated: "Generated Mock Placeholder",
      confidence: "Confidence Placeholder: Review required",
      linkedEvidenceIds: ["EV-KR-01", "EV-KR-02"],
      summary: "Evidence를 대체하지 않는 해석 Preview입니다. 원본 Source와 Freshness 확인 전 판단으로 사용하지 않습니다.",
      sourcePlaceholder: "Original Source entry placeholder"
    },
    financial: {
      revenue: "Mock Prototype KRW xxxT",
      operatingIncome: "Mock Prototype KRW xxT",
      eps: "Mock Prototype KRW x,xxx",
      per: "Mock Prototype xx.x",
      pbr: "Mock Prototype x.x"
    },
    monitoring: {
      status: "Active Placeholder",
      rule: "환율 민감도 Evidence가 2회 이상 갱신될 때",
      owner: "User-owned monitoring placeholder"
    },
    discussion: {
      title: "환율 민감도에 대한 의견 Preview",
      opinionBoundary: "Opinion boundary: Evidence와 분리된 커뮤니티 의견입니다.",
      count: "Mock 12 opinions"
    },
    relatedEntities: [
      { symbol: "AAPL", companyName: "Apple", relation: "Same broad technology theme" },
      { symbol: "005930", companyName: "Samsung Electronics", relation: "Current entity route check" }
    ]
  },
  AAPL: {
    security: {
      symbol: "AAPL",
      exchange: "NASDAQ",
      market: { code: "US", name: "United States Equity Market", region: "US" },
      currency: "USD",
      marketStatus: "Mock Prototype delayed session",
      priceSummary: {
        price: "Mock Prototype USD xxx.xx",
        change: "Mock Prototype +0.00%",
        volume: "Mock Prototype xx,xxx,xxx shares",
        marketCap: "Mock Prototype USD x.xxxT",
        high: "Mock Prototype USD xxx.xx",
        low: "Mock Prototype USD xxx.xx"
      }
    },
    company: {
      name: "Apple",
      sector: { name: "Consumer Technology" },
      industry: { name: "Personal Devices and Services" },
      summary:
        "짧은 Company Name 검증용 Prototype입니다. Company Identity는 Security 가격 요약과 독립된 책임으로 유지합니다."
    },
    currentContext: "Current Market Context: Mock 미국 성장주 흐름과 서비스 매출 Evidence를 분리해 확인하는 상태입니다.",
    evidence: {
      lead: {
        id: "EV-US-01",
        title: "서비스 매출 해석과 성장주 민감도 변화가 같은 방향인지 확인",
        claim: "오늘의 핵심 변화는 가격 움직임보다 Evidence source의 경계와 반복 여부입니다.",
        source: "Mock Source: Prototype research note US-A",
        freshness: "Freshness: Mock delayed placeholder",
        boundary: "Boundary: Generated preview, not original evidence",
        relatedContext: "Related Context: NASDAQ / Services revenue / Growth factor",
        openQuestion: null
      },
      supporting: [
        {
          id: "EV-US-02",
          title: "NASDAQ 흐름과 개별 Entity Evidence의 연결성 확인",
          claim: "대표 시장 흐름이 개별 Company context를 충분히 설명하는지 확인합니다.",
          source: "Mock Source: Prototype index memo",
          freshness: "Freshness: Mock afternoon placeholder",
          boundary: "Boundary: Context cue only",
          relatedContext: "Related Context: NASDAQ / Market breadth",
          openQuestion: null
        }
      ],
      related: [
        {
          id: "EV-US-03",
          title: "국내 대형 기술주와 비교 가능한 Related Evidence",
          claim: "같은 broad theme이더라도 Market과 currency context는 분리됩니다.",
          source: "Mock Source: Prototype cross-market note",
          freshness: "Freshness: Mock time",
          boundary: "Boundary: Related comparison only",
          relatedContext: "Related Context: 005930 / USD/KRW",
          openQuestion: null
        },
        {
          id: "EV-US-04",
          title: "Monitoring 비활성 상태에서 재진입 기준 확인",
          claim: "사용자 소유 Monitoring이 없을 때는 관찰 설정 Placeholder만 제공합니다.",
          source: "Mock Source: Prototype monitoring note",
          freshness: "Freshness: Mock time",
          boundary: "Boundary: Monitoring setup cue",
          relatedContext: "Related Context: Monitoring",
          openQuestion: null
        }
      ]
    },
    timeline: [
      { time: "09:30 ET", event: "US market context opened", detail: "USD 기준 Mock 지연 상태 표시", evidenceId: "EV-US-01" },
      { time: "10:05 ET", event: "Evidence freshness checked", detail: "서비스 매출 근거 Freshness placeholder 확인", evidenceId: "EV-US-01" },
      { time: "11:15 ET", event: "Related Evidence queued", detail: "Cross-market 비교 후보 연결", evidenceId: "EV-US-03" },
      { time: "12:20 ET", event: "Monitoring setup cue", detail: "비활성 Monitoring placeholder 표시", evidenceId: "EV-US-04" }
    ],
    interpretation: {
      label: "Interpretation Preview",
      generated: "Generated Mock Placeholder",
      confidence: "Confidence Placeholder: Needs evidence review",
      linkedEvidenceIds: ["EV-US-01", "EV-US-02"],
      summary: "AI 보조 해석은 Evidence 다음에만 표시되며 Source 확인을 대신하지 않습니다.",
      sourcePlaceholder: "Original Source entry placeholder"
    },
    financial: {
      revenue: "Mock Prototype USD xxxB",
      operatingIncome: "Mock Prototype USD xxB",
      eps: "Mock Prototype USD x.xx",
      per: "Mock Prototype xx.x",
      pbr: "Mock Prototype xx.x"
    },
    monitoring: {
      status: "Inactive Placeholder",
      rule: "서비스 매출 Evidence가 새 Source와 연결될 때",
      owner: "Monitoring setup placeholder"
    },
    discussion: {
      title: "서비스 매출 해석에 대한 의견 Preview",
      opinionBoundary: "Opinion boundary: Research 또는 Evidence Source가 아닙니다.",
      count: "Mock 7 opinions"
    },
    relatedEntities: [
      { symbol: "005930", companyName: "Samsung Electronics", relation: "Cross-market technology comparison" },
      { symbol: "AAPL", companyName: "Apple", relation: "Current entity route check" }
    ]
  }
};

const normalizeSymbol = (symbol: string | string[] | undefined) => {
  const rawSymbol = Array.isArray(symbol) ? symbol[0] : symbol;
  return rawSymbol?.trim().toUpperCase() ?? "";
};

export default function EntityDetailPage() {
  const params = useParams<{ symbol: string }>();
  const symbol = normalizeSymbol(params.symbol);
  const entity = entities[symbol];
  const allEvidence = useMemo(
    () => (entity ? [entity.evidence.lead, ...entity.evidence.supporting, ...entity.evidence.related] : []),
    [entity]
  );
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  if (!entity) {
    return (
      <main className={styles.entityShell}>
        <GlobalHeader />
        <section className={styles.unknownState} aria-labelledby="unknown-title">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/discover">Discovery</Link></li>
              <li><Link aria-current="page" href={`/entity/${symbol || "unknown-symbol"}`}>Entity</Link></li>
            </ol>
          </nav>
          <span className={styles.kicker}>Entity Unknown · Wireframe State</span>
          <h1 id="unknown-title">확인되지 않은 Entity입니다.</h1>
          <p>
            <strong>{symbol || "unknown-symbol"}</strong> Route는 열렸지만 Prototype Mock Entity에는 등록되어 있지 않습니다.
            실제 API 실패가 아니라 Wireframe용 미확인 상태입니다.
          </p>
          <div className={styles.unknownActions}>
            <Link href="/">Home으로 돌아가기</Link>
            <Link href="/discover">Discovery로 돌아가기</Link>
            <Link href="/entity/005930">005930 보기</Link>
            <Link href="/entity/AAPL">AAPL 보기</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.entityShell}>
      <GlobalHeader />

      <div className={styles.entityFrame}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/discover">Discovery</Link></li>
            <li><Link aria-current="page" href={`/entity/${entity.security.symbol}`}>Entity</Link></li>
          </ol>
        </nav>

        <aside className={styles.backContext} aria-label="Back Context">
          <span>Back Context</span>
          <strong>From Discovery candidate set</strong>
          <small>Selected Entity: {entity.company.name} / Lead Evidence: {entity.evidence.lead.id}</small>
        </aside>

        <section className={styles.entityHero} aria-labelledby="entity-title">
          <div className={styles.identityColumn}>
            <span className={styles.kicker}>Security Identity · Prototype</span>
            <h1 id="entity-title">{entity.security.symbol}</h1>
            <dl className={styles.identityGrid}>
              <div>
                <dt>Exchange</dt>
                <dd>{entity.security.exchange}</dd>
              </div>
              <div>
                <dt>Market</dt>
                <dd>{entity.security.market.name}</dd>
              </div>
              <div>
                <dt>Currency</dt>
                <dd>{entity.security.currency}</dd>
              </div>
              <div>
                <dt>Market Status</dt>
                <dd>{entity.security.marketStatus}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.companyColumn}>
            <span className={styles.kicker}>Company Identity</span>
            <h2>{entity.company.name}</h2>
            <dl className={styles.companyMeta}>
              <div>
                <dt>Sector</dt>
                <dd>{entity.company.sector.name}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{entity.company.industry.name}</dd>
              </div>
            </dl>
            <p>{entity.company.summary}</p>
          </div>

          <div className={styles.actionColumn} aria-label="Entity actions">
            <span className={styles.kicker}>Primary / Secondary Action</span>
            <Link className={styles.primaryAction} href={`/evidence/${entity.evidence.lead.id}`}>Inspect Evidence</Link>
            <button type="button">Monitoring Placeholder</button>
            <button type="button">Monitoring Placeholder</button>
            <button type="button">Share Placeholder</button>
            <Link href="/">Global Search Entry</Link>
          </div>
        </section>

        <section className={styles.marketContext} aria-labelledby="market-context-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Current Market Context</span>
            <h2 id="market-context-title">현재 시장 맥락</h2>
            <p>{entity.currentContext}</p>
          </div>
          <div className={styles.marketSummary} aria-label="Market Summary Mock">
            {Object.entries(entity.security.priceSummary).map(([key, value]) => (
              <article key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
                <small>Mock / Prototype</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidenceSection} aria-labelledby="evidence-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Evidence</span>
            <h2 id="evidence-title">오늘 판단 전에 먼저 읽을 근거</h2>
            <p>Evidence는 Source, Freshness, Boundary, Related Context, Open Question을 보존합니다.</p>
          </div>
          <div className={styles.evidenceLayout}>
            <button className={styles.leadEvidence} onClick={() => setSelectedEvidence(entity.evidence.lead)} type="button">
              <span>Lead Evidence · {entity.evidence.lead.id}</span>
              <strong>{entity.evidence.lead.title}</strong>
              <p>{entity.evidence.lead.claim}</p>
              <small>{entity.evidence.lead.source}</small>
              <small>{entity.evidence.lead.freshness}</small>
              <em>{entity.evidence.lead.boundary}</em>
            </button>
            <div className={styles.supportingEvidence}>
              <h3>Supporting Evidence</h3>
              {entity.evidence.supporting.map((item) => (
                <button className={styles.evidenceRow} key={item.id} onClick={() => setSelectedEvidence(item)} type="button">
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <p>{item.claim}</p>
                  <small>{item.source}</small>
                </button>
              ))}
              <h3>Related Evidence</h3>
              {entity.evidence.related.map((item) => (
                <button className={styles.evidenceRow} key={item.id} onClick={() => setSelectedEvidence(item)} type="button">
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <p>{item.relatedContext}</p>
                  <small>{item.boundary}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.timelineSection} aria-labelledby="timeline-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Timeline</span>
            <h2 id="timeline-title">Event 시간 흐름</h2>
            <p>Timeline은 Event 발생 시점과 Evidence 연결만 다루며 Evidence 판단 책임과 분리됩니다.</p>
          </div>
          <ol className={styles.timelineFeed}>
            {entity.timeline.map((item) => (
              <li key={`${item.time}-${item.event}`}>
                <time>{item.time}</time>
                <div>
                  <strong>{item.event}</strong>
                  <p>{item.detail}</p>
                  <button
                    onClick={() => setSelectedEvidence(allEvidence.find((evidence) => evidence.id === item.evidenceId) ?? null)}
                    type="button"
                  >
                    Linked Evidence {item.evidenceId}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
          <div>
            <span className={styles.kicker}>{entity.interpretation.label}</span>
            <h2 id="interpretation-title">Interpretation Preview</h2>
            <p>{entity.interpretation.summary}</p>
          </div>
          <dl>
            <div>
              <dt>Generated</dt>
              <dd>{entity.interpretation.generated}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{entity.interpretation.confidence}</dd>
            </div>
            <div>
              <dt>Linked Evidence</dt>
              <dd>{entity.interpretation.linkedEvidenceIds.join(" / ")}</dd>
            </div>
            <div>
              <dt>Original Source</dt>
              <dd>{entity.interpretation.sourcePlaceholder}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.financialSection} aria-labelledby="financial-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Financial Context · Mock</span>
            <h2 id="financial-title">재무 맥락</h2>
          </div>
          <div className={styles.financialGrid}>
            {Object.entries(entity.financial).map(([key, value]) => (
              <article key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
                <small>Mock / Prototype</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.lowerPreviewGrid}>
          <article className={styles.monitoringPreview}>
            <span className={styles.kicker}>Monitoring</span>
            <h2>Monitoring Rule Preview</h2>
            <strong>{entity.monitoring.status}</strong>
            <p>{entity.monitoring.rule}</p>
            <small>{entity.monitoring.owner}</small>
          </article>

          <article className={styles.discussionPreview}>
            <span className={styles.kicker}>Discussion Preview</span>
            <h2>{entity.discussion.title}</h2>
            <p>{entity.discussion.opinionBoundary}</p>
            <small>{entity.discussion.count}</small>
          </article>
        </section>

        <section className={styles.relatedSection} aria-labelledby="related-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Related Entity</span>
            <h2 id="related-title">같은 Sector 또는 Theme 후보</h2>
          </div>
          <div className={styles.relatedStrip}>
            {entity.relatedEntities.map((item) => (
              <Link href={`/entity/${item.symbol}`} key={`${item.symbol}-${item.relation}`}>
                <span>{item.symbol}</span>
                <strong>{item.companyName}</strong>
                <small>{item.relation}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>DATE Entity Detail Wireframe</span>
        <nav aria-label="Footer Navigation">
          <Link href="/discover">Back to Discovery</Link>
          <Link href={`/evidence/${entity.evidence.lead.id}`}>Inspect Evidence</Link>
          <Link href="/research">Research</Link>
          <Link href="/monitoring">Monitoring</Link>
        </nav>
      </footer>

      {selectedEvidence ? <EvidenceDrawer evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} /> : null}
    </main>
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

function EvidenceDrawer({ evidence, onClose }: { evidence: Evidence; onClose: () => void }) {
  return (
    <div className={styles.drawerOverlay} onClick={onClose} role="presentation">
      <aside
        aria-labelledby="drawer-title"
        aria-modal="true"
        className={styles.evidenceDrawer}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className={styles.drawerHeader}>
          <span>{evidence.id}</span>
          <button onClick={onClose} type="button">
            닫기
          </button>
        </div>
        <h2 id="drawer-title">{evidence.title}</h2>
        <p>{evidence.claim}</p>
        <dl>
          <div>
            <dt>Source</dt>
            <dd>{evidence.source}</dd>
          </div>
          <div>
            <dt>Freshness</dt>
            <dd>{evidence.freshness}</dd>
          </div>
          <div>
            <dt>Boundary</dt>
            <dd>{evidence.boundary}</dd>
          </div>
          <div>
            <dt>Related Context</dt>
            <dd>{evidence.relatedContext}</dd>
          </div>
          <div>
            <dt>Open Question</dt>
            <dd>{evidence.openQuestion ?? "없음"}</dd>
          </div>
        </dl>
        <Link href={`/evidence/${evidence.id}`}>Evidence Detail 보기</Link>
        <Link href="/research">Research에서 Evidence 검토</Link>
      </aside>
    </div>
  );
}
