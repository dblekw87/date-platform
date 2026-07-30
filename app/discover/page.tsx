"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import styles from "./page.module.scss";

type DiscoveryItem = {
  id: string;
  type: string;
  observation: string;
  whyItMatters: string;
  leadEvidence: string;
  sourceCue: string;
  freshnessCue: string;
  boundaryCue: string;
  relatedThemes: string[];
  relatedEntities: Array<{ label: string; type: "Security" | "Company"; href: string; reason: string }>;
  openQuestion: string;
  status: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
};

type ThemeItem = {
  name: string;
  discoveryCount: string;
  evidenceCount: string;
  primaryEntity: string;
  freshness: string;
  relatedDiscoveryIds: string[];
};

type EntityItem = {
  name: string;
  symbol: string;
  type: "Security" | "Company";
  reason: string;
  evidenceCount: string;
  exposure: string;
  href: string;
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

const discoveryItems: DiscoveryItem[] = [
  {
    id: "DISC-001",
    type: "Policy Change",
    observation: "미국 반도체 수출 규제 범위 확대 가능성이 제기되었습니다.",
    whyItMatters:
      "관련 기업의 공급망, 매출 노출, ETF 구성에 영향을 줄 수 있으나 현재 정책 범위와 시행 시점은 추가 확인이 필요합니다.",
    leadEvidence: "EV-117",
    sourceCue: "Mock Source: 복수 정책/시장 메모 cue",
    freshnessCue: "Freshness: Mock current with method gap",
    boundaryCue: "Boundary: 정책 가능성 cue이며 확정 규제 또는 기업 실적 영향이 아닙니다.",
    relatedThemes: ["Semiconductor", "Export Regulation"],
    relatedEntities: [
      { label: "Samsung Electronics", type: "Security", href: "/entity/005930", reason: "HBM 공급망과 규제 노출 후보" },
      { label: "Apple", type: "Security", href: "/entity/AAPL", reason: "AI device supply chain 비교 후보" }
    ],
    openQuestion: "정책 범위와 시행 시점이 확인되었는가?",
    status: "Needs Review · Open Question"
  ,
    supportingEvidence: ["EV-117"],
    contradictingEvidence: []
  },
  {
    id: "DISC-002",
    type: "Technology / Capital Expenditure",
    observation: "AI 데이터센터 투자 증가가 반도체와 전력 인프라 Theme를 함께 끌어올리는지 확인해야 합니다.",
    whyItMatters:
      "AI 인프라 투자는 GPU, 메모리, 전력, 냉각, ETF 구성까지 연결되지만 실제 수요 지속성은 Source와 Freshness 검증이 필요합니다.",
    leadEvidence: "EV-104",
    sourceCue: "Mock Source: 데이터센터 투자 발표 cue 2개",
    freshnessCue: "Freshness: Mock fresh",
    boundaryCue: "Boundary: 투자 계획 cue이며 확정 매출이나 장기 수익성 판단이 아닙니다.",
    relatedThemes: ["AI Infrastructure", "Energy"],
    relatedEntities: [
      { label: "Apple", type: "Security", href: "/entity/AAPL", reason: "AI device 및 서비스 인프라 연결 후보" }
    ],
    openQuestion: "추가 capex가 실제 공급 계약으로 연결되는가?",
    status: "Fresh · Supporting Evidence 2"
  ,
    supportingEvidence: ["EV-104", "EV-117"],
    contradictingEvidence: []
  },
  {
    id: "DISC-003",
    type: "Macro / Market Reaction",
    observation: "금리 인하 기대와 장기채 반응이 같은 방향으로 움직이지 않는 구간이 관찰됩니다.",
    whyItMatters:
      "Macro reaction이 엇갈리면 성장주, 환율, 장기 duration asset의 해석이 흔들릴 수 있어 가격 반응보다 Evidence boundary 확인이 우선입니다.",
    leadEvidence: "EV-122",
    sourceCue: "Mock Source: 시장 폭과 채권 반응 memo",
    freshnessCue: "Freshness: Stale Risk present",
    boundaryCue: "Boundary: 시장 반응 context이며 원인 관계 확정이 아닙니다.",
    relatedThemes: ["Macro", "Market Structure"],
    relatedEntities: [
      { label: "Samsung Electronics", type: "Security", href: "/entity/005930", reason: "환율 민감도 비교 후보" },
      { label: "Apple", type: "Security", href: "/entity/AAPL", reason: "성장주 duration 비교 후보" }
    ],
    openQuestion: "장기채 반응이 정책 기대와 다른 이유가 Source로 확인되었는가?",
    status: "Stale Risk · Contradicting Evidence"
  ,
    supportingEvidence: ["EV-117"],
    contradictingEvidence: ["EV-122"]
  }
];

const themes: ThemeItem[] = [
  { name: "Semiconductor", discoveryCount: "2 Discoveries", evidenceCount: "3 Evidence", primaryEntity: "Samsung Electronics", freshness: "Mock current", relatedDiscoveryIds: ["DISC-001", "DISC-002"] },
  { name: "AI Infrastructure", discoveryCount: "1 Discovery", evidenceCount: "2 Evidence", primaryEntity: "Apple", freshness: "Mock fresh", relatedDiscoveryIds: ["DISC-002"] },
  { name: "Export Regulation", discoveryCount: "1 Discovery", evidenceCount: "1 Evidence", primaryEntity: "Samsung Electronics", freshness: "Needs review", relatedDiscoveryIds: ["DISC-001"] },
  { name: "Macro", discoveryCount: "1 Discovery", evidenceCount: "2 Evidence", primaryEntity: "USD/KRW context", freshness: "Stale risk", relatedDiscoveryIds: ["DISC-003"] }
];

const categoryItems = ["Sector", "Industry", "Country", "Asset", "ETF", "Macro"];

const relatedEntities: EntityItem[] = [
  {
    name: "Samsung Electronics",
    symbol: "005930",
    type: "Security",
    reason: "수출 규제 및 HBM 공급망과 연결",
    evidenceCount: "Related Evidence 3",
    exposure: "Exposure Placeholder: memory / supply chain",
    href: "/entity/005930"
  },
  {
    name: "Apple",
    symbol: "AAPL",
    type: "Security",
    reason: "AI device supply chain과 연결",
    evidenceCount: "Related Evidence 2",
    exposure: "Exposure Placeholder: device / services / AI",
    href: "/entity/AAPL"
  }
];

const marketContext = [
  { label: "Index Context", value: "Mock S&P 500 +0.00%", detail: "Market reaction, not Evidence" },
  { label: "Market Movers", value: "Mock 상승/하락/거래량", detail: "원인 관계를 단정하지 않는 보조 context" },
  { label: "Volatility", value: "Mock volatility watch", detail: "Discovery claim의 증거가 아님" },
  { label: "Market Map", value: "Wireframe placeholder", detail: "Heatmap 구현 없음" }
];

const latestSignals = [
  { type: "Policy Signal", trigger: "규제 범위 확대 cue", evidence: "EV-117", entity: "005930", freshness: "Mock current" },
  { type: "Technology Signal", trigger: "AI infrastructure capex cue", evidence: "EV-104", entity: "AAPL", freshness: "Mock fresh" },
  { type: "Macro Signal", trigger: "장기채 반응 불일치 cue", evidence: "EV-122", entity: "Market Context", freshness: "Stale risk" }
];

const resolverExamples = [
  { query: "AI", targets: "Theme: Artificial Intelligence / Evidence: AI capex expansion / Company: NVIDIA placeholder / ETF: Semiconductor ETF / Event: AI infrastructure investment" },
  { query: "005930", targets: "Security: Samsung Electronics / Company: Samsung Electronics Co., Ltd. / Related Evidence / Related Theme" },
  { query: "EV-104", targets: "Evidence Detail: Monitoring-linked Evidence" }
];

const normalizeQuery = (query: string) => query.trim().toUpperCase();

export default function DiscoverPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [resolverState, setResolverState] = useState("Resolver 상태: 입력 전");
  const [selectedTheme, setSelectedTheme] = useState(themes[0].name);
  const [selectedCategory, setSelectedCategory] = useState(categoryItems[0]);

  const selectedThemeData = themes.find((theme) => theme.name === selectedTheme) ?? themes[0];
  const themeDiscoveries = useMemo(
    () => discoveryItems.filter((item) => selectedThemeData.relatedDiscoveryIds.includes(item.id)),
    [selectedThemeData]
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = normalizeQuery(searchQuery);

    if (!query) {
      setResolverState("Resolver 상태: 빈 입력은 route를 만들지 않습니다.");
      return;
    }

    if (query === "005930") {
      router.push("/entity/005930");
      return;
    }

    if (query === "AAPL") {
      router.push("/entity/AAPL");
      return;
    }

    if (["EV-104", "EV-117", "EV-122"].includes(query)) {
      router.push(`/evidence/${query}`);
      return;
    }

    setResolverState(`Resolver 미확인 상태: "${searchQuery.trim()}"은 현재 Mock route에 연결되지 않았습니다.`);
  };

  return (
    <main className={styles.discoveryShell}>
      <GlobalHeader />

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link aria-current="page" href="/discover">
              Discovery
            </Link>
          </li>
        </ol>
      </nav>

      <div className={styles.discoveryFrame}>
        <section className={styles.hero} aria-labelledby="discovery-title">
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Today · Discovery Wireframe</span>
            <h1 id="discovery-title">오늘 확인할 변화</h1>
            <p className={styles.activeDiscovery}>미국 반도체 규제 범위가 확대될 가능성이 제기되었습니다.</p>
            <div className={styles.heroMetrics} aria-label="오늘 Discovery 상태">
              <span>확인할 변화 3개</span>
              <span>검토 Evidence 5개</span>
              <span>Active Discovery DISC-001</span>
            </div>
            <div className={styles.whyBlock}>
              <strong>Why This Matters</strong>
              <p>
                관련 기업의 공급망, 매출 노출, ETF 구성에 영향을 줄 수 있으나 현재 정책 범위와 시행 시점은 추가 확인이 필요합니다.
              </p>
            </div>
            <div className={styles.heroActions}>
              <Link href="/evidence/EV-117">Evidence 확인</Link>
              <Link href="#related-entities">관련 Entity 탐색</Link>
            </div>
          </div>

          <ResolverSearch
            resolverState={resolverState}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearch}
          />
        </section>

        <section className={styles.resolverSection} aria-labelledby="resolver-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Search / Entity Resolver</span>
            <h2 id="resolver-title">입력값이 어떤 대상과 연결되는지 먼저 확인</h2>
          </div>
          <div className={styles.resolverExamples}>
            {resolverExamples.map((item) => (
              <article key={item.query}>
                <span>{item.query}</span>
                <p>{item.targets}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.discoverySection} aria-labelledby="todays-discovery-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Today Discovery</span>
            <h2 id="todays-discovery-title">오늘 확인할 가치가 있는 변화</h2>
            <p>각 Discovery Item은 같은 정보 문법으로 비교되며, 시장 등락이 아니라 Evidence 기반 변화에서 시작합니다.</p>
          </div>
          <div className={styles.discoveryList}>
            {discoveryItems.map((item) => (
              <DiscoveryCard item={item} key={item.id} />
            ))}
          </div>
        </section>

        <section className={styles.leadEvidenceSection} aria-labelledby="lead-evidence-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Lead Evidence</span>
            <h2 id="lead-evidence-title">대표 Evidence 먼저 확인</h2>
          </div>
          <article className={styles.leadEvidence}>
            <span>EV-117 · Validation Status: In Review</span>
            <strong>정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거</strong>
            <p>Claim / Finding: 환율 민감도와 성장주 반응이 같은 시간대에 관찰되어 Entity 검토의 관련 맥락으로 사용할 수 있습니다.</p>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>Mock Source: Research memo / Market commentary</dd>
              </div>
              <div>
                <dt>Freshness</dt>
                <dd>Mock current with method gap</dd>
              </div>
              <div>
                <dt>Boundary Summary</dt>
                <dd>개별 기업 방향성 또는 투자 판단을 확정하지 않습니다.</dd>
              </div>
              <div>
                <dt>Related Entity</dt>
                <dd>Samsung Electronics / Apple</dd>
              </div>
            </dl>
            <Link href="/evidence/EV-117">Lead Evidence Detail 보기</Link>
          </article>
        </section>

        <section className={styles.feedSection} aria-labelledby="feed-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Discovery Feed</span>
            <h2 id="feed-title">반복 가능한 Evidence 탐색 문법</h2>
          </div>
          <div className={styles.feedList}>
            {discoveryItems.map((item) => (
              <article className={styles.feedRow} key={`feed-${item.id}`}>
                <span>{item.type}</span>
                <strong>{item.observation}</strong>
                <small>Evidence Type: {item.type} / Source Count: {item.sourceCue} / Freshness: {item.freshnessCue}</small>
                <small>Related Entity: {item.relatedEntities.map((entity) => entity.label).join(" / ")}</small>
                <small>Related Theme: {item.relatedThemes.join(" / ")}</small>
                <em>{item.status} · Open Question: {item.openQuestion}</em>
                <Link href={`/evidence/${item.leadEvidence}`}>Related Evidence 보기</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.themeSection} aria-labelledby="theme-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Related Themes</span>
            <h2 id="theme-title">Evidence에서 파생된 Theme</h2>
            <p>Theme은 시작점이 아니라 Discovery에서 파생되는 비교 후보 집합입니다.</p>
          </div>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
              <button
                aria-pressed={selectedTheme === theme.name}
                className={selectedTheme === theme.name ? styles.selectedTheme : styles.themeCard}
                key={theme.name}
                onClick={() => setSelectedTheme(theme.name)}
                type="button"
              >
                <span>{theme.name}</span>
                <strong>{theme.discoveryCount}</strong>
                <small>{theme.evidenceCount}</small>
                <small>주요 Entity: {theme.primaryEntity}</small>
                <em>{theme.freshness}</em>
              </button>
            ))}
          </div>
          <div className={styles.candidateSet} aria-live="polite">
            <strong>{selectedTheme} candidate set</strong>
            {themeDiscoveries.map((item) => (
              <Link href={`/evidence/${item.leadEvidence}`} key={`theme-${item.id}`}>
                {item.id} · {item.observation}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.entitySection} id="related-entities" aria-labelledby="entity-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Related Entities</span>
            <h2 id="entity-title">추천이 아니라 Evidence 연결 대상</h2>
          </div>
          <div className={styles.entityGrid}>
            {relatedEntities.map((entity) => (
              <article key={entity.symbol}>
                <span>{entity.type} · {entity.symbol}</span>
                <strong>{entity.name}</strong>
                <p>{entity.reason}</p>
                <small>{entity.evidenceCount}</small>
                <small>{entity.exposure}</small>
                <Link href={entity.href}>Entity Detail 보기</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.categorySection} aria-labelledby="category-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Category Navigation</span>
            <h2 id="category-title">Discovery refinement 상태</h2>
          </div>
          <div className={styles.categoryControls}>
            {categoryItems.map((category) => (
              <button
                aria-pressed={selectedCategory === category}
                className={selectedCategory === category ? styles.selectedCategory : styles.categoryButton}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <p className={styles.refinementState}>Selected refinement: {selectedCategory} · Mock candidate criteria preserved</p>
        </section>

        <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>AI-assisted Interpretation</span>
            <h2 id="interpretation-title">Interpretation Preview</h2>
            <p>
              Generated Mock Label. Linked Evidence: EV-117 / EV-122. 이 해석은 Discovery의 결론이 아니라 Research에서 검토할 보조 경로입니다.
            </p>
          </div>
          <dl>
            <div>
              <dt>Boundary</dt>
              <dd>Interpretation은 Evidence와 Source cue를 대체하지 않습니다.</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>Confidence Placeholder: Needs Review</dd>
            </div>
            <div>
              <dt>Next</dt>
              <dd><Link href="/research">Research Entry</Link></dd>
            </div>
          </dl>
        </section>

        <section className={styles.marketContextSection} aria-labelledby="market-context-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Market Context / Market Reaction</span>
            <h2 id="market-context-title">시장 반응은 보조 Context</h2>
            <p>가격 변화만으로 Discovery의 원인 관계를 단정하지 않습니다.</p>
          </div>
          <div className={styles.marketGrid}>
            {marketContext.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.signalSection} aria-labelledby="signal-title">
          <div className={styles.sectionLead}>
            <span className={styles.kicker}>Latest Signals</span>
            <h2 id="signal-title">Monitoring과 분리된 Signal Preview</h2>
          </div>
          <div className={styles.signalList}>
            {latestSignals.map((signal) => (
              <article key={`${signal.type}-${signal.evidence}`}>
                <span>{signal.type}</span>
                <strong>{signal.trigger}</strong>
                <small>Linked Evidence: {signal.evidence}</small>
                <small>Related Entity: {signal.entity}</small>
                <em>{signal.freshness} · Monitoring 미연결 상태</em>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>DATE Discovery Wireframe</span>
        <nav aria-label="Footer Navigation">
          <Link href="/">Home</Link>
          <Link href="/entity/005930">Entity</Link>
          <Link href="/evidence/EV-117">View Evidence</Link>
          <Link href="/research">Research</Link>
          <Link href="/monitoring">Monitoring</Link>
        </nav>
      </footer>
    </main>
  );
}

function DiscoveryCard({ item }: { item: DiscoveryItem }) {
  return (
    <article className={styles.discoveryCard}>
      <div className={styles.cardHeader}>
        <span>{item.id} · {item.type}</span>
        <strong>{item.status}</strong>
      </div>
      <h3>{item.observation}</h3>
      <dl>
        <div>
          <dt>Why It Matters</dt>
          <dd>{item.whyItMatters}</dd>
        </div>
        <div>
          <dt>Lead Evidence</dt>
          <dd>{item.leadEvidence}</dd>
        </div>
        <div>
          <dt>Source Cue</dt>
          <dd>{item.sourceCue}</dd>
        </div>
        <div>
          <dt>Freshness Cue</dt>
          <dd>{item.freshnessCue}</dd>
        </div>
        <div>
          <dt>Boundary Cue</dt>
          <dd>{item.boundaryCue}</dd>
        </div>
        <div>
          <dt>Related Theme</dt>
          <dd>{item.relatedThemes.join(" / ")}</dd>
        </div>
        <div>
          <dt>Related Entity</dt>
          <dd>{item.relatedEntities.map((entity) => entity.label).join(" / ")}</dd>
        </div>
        <div>
          <dt>Open Question</dt>
          <dd>{item.openQuestion}</dd>
        </div>
      </dl>
      <div className={styles.cardActions}>
        <Link href={`/evidence/${item.leadEvidence}`}>Evidence Detail</Link>
        <Link href={item.relatedEntities[0].href}>Related Entity</Link>
        <button type="button">Related Theme</button>
        <button type="button">More Context</button>
      </div>
    </article>
  );
}

function ResolverSearch({
  searchQuery,
  setSearchQuery,
  resolverState,
  onSubmit
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  resolverState: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className={styles.resolverSearch} onSubmit={onSubmit} role="search" aria-label="Discovery Entity Resolver">
      <label htmlFor="discovery-search">Security, Company, ETF, Theme, Sector, Industry, Evidence, Event, News / Source Resolver</label>
      <div>
        <input
          id="discovery-search"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="예: AI, 005930, AAPL, EV-104"
          type="search"
          value={searchQuery}
        />
        <button disabled={searchQuery.trim().length === 0} type="submit">Resolver 확인</button>
      </div>
      <small>{resolverState}</small>
    </form>
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
            <Link
              aria-current={item.href === "/discover" ? "page" : undefined}
              className={item.href === "/discover" ? styles.activeNavLink : styles.navLink}
              href={item.href}
              key={item.label}
            >
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
