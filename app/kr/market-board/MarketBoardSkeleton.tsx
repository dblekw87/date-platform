import styles from "../../page.module.scss";

const skeletonCards = Array.from({ length: 12 }, (_, index) => `market-card-${index}`);
const skeletonProviders = ["provider-toss", "provider-kis", "provider-krx", "provider-dart", "provider-sec", "provider-news"];
const skeletonTabs = ["tab-market", "tab-news", "tab-calendar", "tab-breaking", "tab-flow"];
const skeletonBriefs = ["brief-us", "brief-kr"];

function SkeletonLine({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`${styles.skeletonLine} ${className ?? ""}`} />;
}

export function MarketBoardSkeleton() {
  return (
    <main className={`${styles.page} ${styles.skeletonPage}`} aria-busy="true" aria-label="시장 확인 보드 로딩 중">
      <header className={styles.siteHeader}>
        <strong>DATE</strong>
        <span>시장 확인 보드 · Loading</span>
      </header>

      <section className={styles.providerStrip} aria-label="데이터 연결 상태 확인 중">
        <strong>데이터 연결 상태</strong>
        <div>
          {skeletonProviders.map((provider) => (
            <SkeletonLine className={styles.skeletonProvider} key={provider} />
          ))}
        </div>
      </section>

      <section className={styles.summary} aria-labelledby="kr-home-loading-title">
        <div>
          <SkeletonLine className={styles.skeletonEyebrow} />
          <h1 id="kr-home-loading-title">
            <SkeletonLine className={styles.skeletonTitle} />
            <SkeletonLine className={styles.skeletonTitleShort} />
          </h1>
          <SkeletonLine className={styles.skeletonCopy} />
        </div>
        <aside className={styles.statusBox} aria-label="확인 순서 로딩 중">
          <SkeletonLine className={styles.skeletonStatusTitle} />
          <ol className={styles.skeletonSteps}>
            {skeletonTabs.map((tab) => (
              <li key={tab}>
                <SkeletonLine />
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <aside className={styles.adSlot} aria-label="상단 광고 영역 로딩 중">
        <SkeletonLine className={styles.skeletonAd} />
      </aside>

      <nav className={styles.tabs} aria-label="홈 탭 로딩 중">
        {skeletonTabs.map((tab) => (
          <SkeletonLine className={styles.skeletonTab} key={tab} />
        ))}
      </nav>

      <div className={styles.tabDescription}>
        <SkeletonLine className={styles.skeletonDescription} />
      </div>

      <section className={styles.tabPanel} aria-labelledby="market-panel-loading-title">
        <div className={styles.sectionHeader}>
          <SkeletonLine className={styles.skeletonEyebrow} />
          <h2 id="market-panel-loading-title">
            <SkeletonLine className={styles.skeletonSectionTitle} />
          </h2>
        </div>
        <div className={styles.macroGrid}>
          {skeletonCards.map((card) => (
            <article key={card}>
              <SkeletonLine className={styles.skeletonCardLabel} />
              <SkeletonLine className={styles.skeletonMetric} />
              <SkeletonLine />
              <SkeletonLine className={styles.skeletonMeta} />
            </article>
          ))}
        </div>
        <div className={`${styles.briefGrid} ${styles.marketBriefGrid}`}>
          {skeletonBriefs.map((brief) => (
            <article key={brief}>
              <SkeletonLine className={styles.skeletonBadge} />
              <SkeletonLine className={styles.skeletonBriefTitle} />
              <SkeletonLine />
              <SkeletonLine className={styles.skeletonCopyShort} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
