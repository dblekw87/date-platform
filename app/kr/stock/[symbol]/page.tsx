import Link from "next/link";
import {
  KRConfidenceBadge,
  KRCTAGroup,
  KREmptyState,
  KREvidenceCard,
  KRHero,
  KRInformationBadge,
  KRRelatedEntityRow,
  KRSectionHeader,
  KRStatusBadge,
  KRThemeChip,
  KRTimelineItem
} from "../../_components/design-language";
import styles from "./page.module.scss";
import { getStockMock } from "./stock-mock-data";

type KoreanStockPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

function badgeTone(status: string) {
  return status === "미확인" ? styles.unconfirmedBadge : styles.confidenceBadge;
}

function evidenceHref(symbol: string) {
  void symbol;
  return "/";
}

function analysisHref(symbol: string) {
  void symbol;
  return "/";
}

export default async function KoreanStockPage({ params }: KoreanStockPageProps) {
  const { symbol } = await params;
  const stock = getStockMock(symbol);
  const isUnknown = stock.confidence === "미확인";
  const leadEvidenceHref = evidenceHref(stock.symbol);
  const stockAnalysisHref = analysisHref(stock.symbol);

  return (
    <main className={styles.page}>
      <KRHero
        aside={
          <aside className={styles.quotePanel} aria-label="종목 가격 정보">
            <KRInformationBadge className={styles.infoBadge}>{stock.market}</KRInformationBadge>
            <strong>{stock.price}</strong>
            <span>{stock.change}</span>
            <small>{stock.sessionState} · {stock.updatedAt}</small>
            <Link href="/">시장 보드 보기</Link>
          </aside>
        }
        className={styles.hero}
        copyClassName={styles.heroCopy}
        description={stock.firstChange}
        eyebrow={`${stock.kind} · ${stock.market}`}
        id="stock-title"
        title={`${stock.name} ${stock.symbol}`}
      >
        <div className={styles.heroMeta}>
          <KRInformationBadge className={styles.infoBadge}>{stock.sector}</KRInformationBadge>
          {stock.themes.map((theme) => (
            <KRThemeChip className={styles.themeChip} key={theme} label={theme} selected={theme === stock.themes[0]} />
          ))}
          <KRConfidenceBadge className={badgeTone(stock.confidence)}>{stock.confidence}</KRConfidenceBadge>
        </div>
        <KRCTAGroup
          actions={[
            { href: leadEvidenceHref, label: "공식 근거 확인하기", variant: "primary" },
            { href: stockAnalysisHref, label: "내 분석에 담기" },
            { href: "#related-entities", label: "관련 기업 보기" }
          ]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
      </KRHero>

      <section className={styles.changeSection} aria-labelledby="change-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow={stock.causalLabel}
          eyebrowClassName={styles.eyebrow}
          id="change-title"
          title="지금 이 종목에서 달라진 점"
          description="공식적인 인과관계가 확인되지 않은 경우 움직인 이유로 단정하지 않습니다."
        />
        <div className={styles.changeGrid}>
          <article>
            <h3>변화 요약</h3>
            <p>{stock.changeSummary}</p>
          </article>
          <article>
            <h3>왜 중요할 수 있는가</h3>
            <p>{stock.whyItMayMatter}</p>
          </article>
          <article>
            <h3>현재 확인된 사실</h3>
            <ul>
              {stock.confirmedFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>아직 단정할 수 없는 내용</h3>
            <ul>
              {stock.notConfirmed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className={styles.marketTags}>
          {stock.relatedMarkets.map((market) => (
            <KRInformationBadge className={styles.infoBadge} key={market}>{market}</KRInformationBadge>
          ))}
        </div>
      </section>

      <section className={styles.evidenceSection} aria-labelledby="evidence-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="공식 투자 근거" eyebrowClassName={styles.eyebrow} id="evidence-title" title="뉴스가 아니라 출처와 확인 범위를 먼저 봅니다." />
        <div className={styles.evidenceLayout}>
          <KREvidenceCard
            className={styles.leadEvidence}
            confidence={<KRConfidenceBadge className={badgeTone(stock.leadEvidence.confidence)}>{stock.leadEvidence.confidence}</KRConfidenceBadge>}
            href={leadEvidenceHref}
            limitation={stock.leadEvidence.limitation}
            publishedAt={stock.leadEvidence.publishedAt}
            source={stock.leadEvidence.source}
            supports={stock.leadEvidence.supports}
            title={stock.leadEvidence.title}
          >
            <span>{stock.leadEvidence.relatedCompanies}</span>
            <small>{stock.leadEvidence.relatedMarket} · {stock.leadEvidence.relatedTheme}</small>
          </KREvidenceCard>
          <div className={styles.evidenceStack}>
            {[...stock.supportingEvidence, ...stock.alternativeEvidence].map((item) => (
              <KREvidenceCard
                className={styles.compactEvidence}
                confidence={<KRConfidenceBadge className={badgeTone(item.confidence)}>{item.confidence}</KRConfidenceBadge>}
                href={leadEvidenceHref}
                key={item.title}
                limitation={item.limitation}
                publishedAt={item.publishedAt}
                source={item.source}
                supports={item.supports}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.needConfirm} aria-labelledby="need-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="확인이 필요한 내용" eyebrowClassName={styles.eyebrow} id="need-title" title="미확인 항목은 접혀도 존재가 보여야 합니다." />
        <div className={styles.openQuestionSummary}>
          <strong>{stock.openQuestions.length}개 항목 확인 필요</strong>
          <span>{stock.openQuestions[0]?.title}</span>
        </div>
        <details>
          <summary>추가로 확인해야 하는 정보 보기</summary>
          <ul>
            {stock.openQuestions.map((question) => (
              <li key={question.title}>
                <strong>{question.title}</strong>
                <span>{question.needed}</span>
                <small>{question.recheck} · {question.limitation}</small>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className={styles.marketReaction} aria-labelledby="reaction-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="시장 반응" eyebrowClassName={styles.eyebrow} id="reaction-title" title="차트는 원인 증명이 아니라 보조 기준입니다." />
        <div className={styles.reactionGrid}>
          <div className={styles.chartFrame}>{stock.marketReaction.priceFlow}</div>
          <dl>
            <div>
              <dt>거래량 또는 시장 반응</dt>
              <dd>{stock.marketReaction.volume}</dd>
            </div>
            <div>
              <dt>관련 지수 변화</dt>
              <dd>{stock.marketReaction.index}</dd>
            </div>
            <div>
              <dt>관련 테마 변화</dt>
              <dd>{stock.marketReaction.theme}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.relatedSection} id="related-entities" aria-labelledby="related-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="관련 관계" eyebrowClassName={styles.eyebrow} id="related-title" title="왜 연결되는지 함께 봅니다." />
        {stock.relatedEntities.length > 0 ? (
          <div className={styles.relatedRows}>
            {stock.relatedEntities.map((entity) => (
              <KRRelatedEntityRow className={styles.relatedRow} href={entity.href} key={`${entity.name}-${entity.type}`} {...entity} />
            ))}
          </div>
        ) : (
          <KREmptyState
            className={styles.inlineEmpty}
            description="공식 정보가 확인되면 관련 기업, ETF, 테마가 이곳에 표시됩니다."
            eyebrow="관련 관계 없음"
            title="아직 연결된 관련 기업이 없습니다."
            titleId="related-empty"
          />
        )}
      </section>

      <section className={styles.timelineSection} aria-labelledby="timeline-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="변화 Timeline" eyebrowClassName={styles.eyebrow} id="timeline-title" title="시간순 변화와 연결 근거를 함께 확인합니다." />
        <ol>
          {stock.timeline.map((item) => (
            <KRTimelineItem
              className={styles.timelineItem}
              confidence={<KRStatusBadge className={badgeTone(item.confidence)}>{item.confidence}</KRStatusBadge>}
              key={`${item.time}-${item.title}`}
              linked={item.linked}
              time={item.time}
              title={item.title}
            />
          ))}
        </ol>
      </section>

      <section className={styles.analysisEntry} aria-labelledby="analysis-title">
        <div>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="분석으로 이어가기" eyebrowClassName={styles.eyebrow} id="analysis-title" title="자료를 내 분석에 담고 비교합니다." />
          <p>분석에 담기는 투자 결론 저장이 아니라 개인 분석 공간에 근거를 모아두는 행동입니다.</p>
        </div>
        <KRCTAGroup
          actions={[
            { href: stockAnalysisHref, label: "대표 근거를 내 분석에 담기", variant: "primary" },
            { href: "#related-entities", label: "관련 기업 비교하기" },
            { href: "/kr/theme", label: "관련 테마 확인하기" },
            { href: "/", label: "시장 보드 보기" }
          ]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
      </section>

      {isUnknown ? (
        <KREmptyState
          className={styles.emptyState}
          description="입력한 종목 코드에 대한 공식 정보가 없습니다. 검색 또는 시장 화면에서 다시 탐색할 수 있습니다."
          eyebrow="공식 정보 없음"
          title="확인되지 않은 종목입니다."
          titleId="unknown-title"
          actions={
            <div className={styles.heroActions}>
              <Link href="/">시장 보드로 이동</Link>
              <Link href="/kr/market">시장으로 돌아가기</Link>
            </div>
          }
        />
      ) : null}
    </main>
  );
}
