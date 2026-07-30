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
} from "../_components/design-language";
import styles from "./page.module.scss";
import { getEvidenceMock } from "./evidence-mock-data";

type KoreanEvidencePageProps = {
  searchParams: Promise<{
    id?: string | string[];
  }>;
};

function badgeClass(state: string) {
  return state === "미확인" ? styles.unconfirmedBadge : styles.confidenceBadge;
}

function analysisHref(id?: string | string[]) {
  const value = Array.isArray(id) ? id[0] : id;
  return value === "ir-semiconductor-001" ? "/kr/analysis?id=hynix-hbm-001" : "/kr/analysis?id=samsung-semiconductor-001";
}

export default async function KoreanEvidencePage({ searchParams }: KoreanEvidencePageProps) {
  const { id } = await searchParams;
  const evidence = getEvidenceMock(id);
  const isUnknown = evidence.confidence === "미확인" && evidence.officialFacts.length === 0;
  const linkedAnalysisHref = analysisHref(id);

  return (
    <main className={styles.page}>
      <KRHero
        aside={
          <aside className={styles.sourcePanel} aria-label="출처와 공개 시각">
            <KRInformationBadge className={styles.infoBadge}>{evidence.type}</KRInformationBadge>
            <strong>{evidence.sourceName}</strong>
            <span>{evidence.publishedAt}</span>
            <small>{evidence.lastCheckedAt}</small>
            <Link href="#source-detail">원문 정보 보기</Link>
          </aside>
        }
        className={styles.hero}
        copyClassName={styles.heroCopy}
        description="원문에서 확인 가능한 사실과 아직 단정할 수 없는 내용을 분리해서 봅니다."
        eyebrow={`투자 근거 · ${evidence.id}`}
        id="evidence-title"
        title={evidence.title}
      >
        <div className={styles.heroMeta}>
          <KRConfidenceBadge className={badgeClass(evidence.confidence)}>{evidence.confidence}</KRConfidenceBadge>
          {evidence.relatedStocks.map((stock) => (
            <KRInformationBadge className={styles.infoBadge} key={stock}>{stock}</KRInformationBadge>
          ))}
          {evidence.relatedThemes.map((theme) => (
            <KRThemeChip className={styles.themeChip} key={theme} label={theme} />
          ))}
        </div>
        <KRCTAGroup
          actions={[
            { href: "#source-detail", label: "원문 확인하기", variant: "primary" },
            { href: linkedAnalysisHref, label: "내 분석에 담기" },
            { href: "#related-entities", label: "관련 종목 보기" }
          ]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
      </KRHero>

      <section className={styles.quickView} aria-labelledby="quick-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow="한눈에 보기"
          eyebrowClassName={styles.eyebrow}
          id="quick-title"
          title="요약은 판단이 아니라 원문 확인을 돕는 안내입니다."
          description="이 영역은 AI 결론이 아니며, 공식 사실과 미확인 내용을 함께 표시합니다."
        />
        <div className={styles.quickGrid}>
          <article>
            <h3>무엇이 공개됐는가</h3>
            <p>{evidence.quickView.disclosed}</p>
          </article>
          <article>
            <h3>왜 확인할 가치가 있는가</h3>
            <p>{evidence.quickView.whyCheck}</p>
          </article>
          <article>
            <h3>가장 중요한 공식 사실</h3>
            <p>{evidence.quickView.keyFact}</p>
          </article>
          <article>
            <h3>아직 확인되지 않은 핵심 내용</h3>
            <p>{evidence.quickView.unresolved}</p>
          </article>
        </div>
        <KRStatusBadge className={badgeClass(evidence.confidence)}>{evidence.quickView.currentState}</KRStatusBadge>
      </section>

      <section className={styles.factsSection} aria-labelledby="facts-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow="공식적으로 확인된 사실"
          eyebrowClassName={styles.eyebrow}
          id="facts-title"
          title="원문에서 직접 확인되는 내용만 표시합니다."
        />
        {evidence.officialFacts.length > 0 ? (
          <div className={styles.factList}>
            {evidence.officialFacts.map((fact) => (
              <article className={styles.factItem} key={`${fact.location}-${fact.fact}`}>
                <strong>{fact.fact}</strong>
                <dl>
                  <div>
                    <dt>원문 위치</dt>
                    <dd>{fact.location}</dd>
                  </div>
                  <div>
                    <dt>출처</dt>
                    <dd>{fact.source}</dd>
                  </div>
                  <div>
                    <dt>관련 대상</dt>
                    <dd>{fact.relatedEntity}</dd>
                  </div>
                </dl>
                <KRConfidenceBadge className={badgeClass(fact.confidence)}>{fact.confidence}</KRConfidenceBadge>
              </article>
            ))}
          </div>
        ) : (
          <KREmptyState
            className={styles.inlineEmpty}
            description="공식 출처가 확인되기 전까지 사실 항목을 만들지 않습니다."
            eyebrow="확인된 사실 없음"
            title="원문에서 확인 가능한 공식 사실이 없습니다."
            titleId="facts-empty"
          />
        )}
      </section>

      <section className={styles.cannotConfirm} aria-labelledby="cannot-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow="이 정보로 확인할 수 없는 것"
          eyebrowClassName={styles.eyebrow}
          id="cannot-title"
          title="단정할 수 없는 내용은 항상 별도로 보입니다."
        />
        <div className={styles.unconfirmedSummary}>
          <strong>{evidence.cannotConfirm.length}개 항목은 아직 단정할 수 없습니다.</strong>
          <span>{evidence.cannotConfirm[0]}</span>
        </div>
        <details>
          <summary>나머지 미확인 내용 보기</summary>
          <ul>
            {evidence.cannotConfirm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </section>

      <section className={styles.scopeSection} aria-labelledby="scope-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="해석 범위" eyebrowClassName={styles.eyebrow} id="scope-title" title="공식 사실과 가능한 해석을 분리합니다." />
        <div className={styles.scopeGrid}>
          <article>
            <h3>공식 사실</h3>
            <p>{evidence.interpretationScope.officialFact}</p>
          </article>
          <article>
            <h3>가능한 해석</h3>
            <p>{evidence.interpretationScope.possibleInterpretation}</p>
          </article>
          <article>
            <h3>다른 해석 가능성</h3>
            <p>{evidence.interpretationScope.alternativeInterpretation}</p>
          </article>
          <article>
            <h3>해석의 제한</h3>
            <p>{evidence.interpretationScope.limitation}</p>
          </article>
        </div>
      </section>

      <section className={styles.relatedSection} id="related-entities" aria-labelledby="related-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="관련 대상" eyebrowClassName={styles.eyebrow} id="related-title" title="추천이 아니라 왜 연결되는지 확인합니다." />
        {evidence.relatedEntities.length > 0 ? (
          <div className={styles.relatedRows}>
            {evidence.relatedEntities.map((entity) => (
              <KRRelatedEntityRow className={styles.relatedRow} key={`${entity.name}-${entity.type}`} {...entity} />
            ))}
          </div>
        ) : (
          <KREmptyState
            className={styles.inlineEmpty}
            description="공식 정보가 확인되면 관련 종목, 기업, ETF, 산업, 테마가 표시됩니다."
            eyebrow="관련 대상 없음"
            title="아직 연결된 관련 대상이 없습니다."
            titleId="related-empty"
          />
        )}
      </section>

      <section className={styles.marketReaction} aria-labelledby="reaction-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow="시장 반응"
          eyebrowClassName={styles.eyebrow}
          id="reaction-title"
          title="가격 변화는 원인 단정이 아니라 보조 정보입니다."
          description={evidence.marketReaction.caution}
        />
        <div className={styles.reactionGrid}>
          <article>
            <h3>공개 전</h3>
            <p>{evidence.marketReaction.before}</p>
          </article>
          <article>
            <h3>공개 후</h3>
            <p>{evidence.marketReaction.after}</p>
          </article>
          <article>
            <h3>거래량 변화</h3>
            <p>{evidence.marketReaction.volume}</p>
          </article>
          <article>
            <h3>관련 테마와 지수</h3>
            <p>{evidence.marketReaction.theme}</p>
            <small>{evidence.marketReaction.index}</small>
          </article>
        </div>
      </section>

      <section className={styles.timelineSection} aria-labelledby="timeline-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="공개 이후 흐름" eyebrowClassName={styles.eyebrow} id="timeline-title" title="공식 정보 공개부터 분석 업데이트까지 시간순으로 봅니다." />
        <ol>
          {evidence.timeline.map((item) => (
            <KRTimelineItem
              className={styles.timelineItem}
              confidence={<KRStatusBadge className={badgeClass(item.confidence)}>{item.confidence}</KRStatusBadge>}
              key={`${item.time}-${item.title}`}
              linked={item.linked}
              time={item.time}
              title={item.title}
            />
          ))}
        </ol>
      </section>

      <section className={styles.sourceDetail} id="source-detail" aria-labelledby="source-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="출처와 원문 정보" eyebrowClassName={styles.eyebrow} id="source-title" title="최신 문서와 확인 시점을 함께 봅니다." />
        <dl>
          <div>
            <dt>기관 또는 기업명</dt>
            <dd>{evidence.sourceName}</dd>
          </div>
          <div>
            <dt>문서 유형</dt>
            <dd>{evidence.sourceType}</dd>
          </div>
          <div>
            <dt>문서 제목</dt>
            <dd>{evidence.sourceTitle}</dd>
          </div>
          <div>
            <dt>공개 일시</dt>
            <dd>{evidence.publishedAt}</dd>
          </div>
          <div>
            <dt>문서 식별자</dt>
            <dd>{evidence.sourceIdentifier}</dd>
          </div>
          <div>
            <dt>원문 링크</dt>
            <dd>원문 링크 Placeholder</dd>
          </div>
          <div>
            <dt>마지막 확인 시각</dt>
            <dd>{evidence.lastCheckedAt}</dd>
          </div>
          <div>
            <dt>수정 또는 정정 여부</dt>
            <dd>{evidence.correctionState}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.nextChecks} aria-labelledby="next-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="다음 확인 항목" eyebrowClassName={styles.eyebrow} id="next-title" title="투자 행동이 아니라 확인 행동으로 이어집니다." />
        <ul>
          {evidence.nextChecks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.linkedEvidence} aria-labelledby="linked-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="연결된 다른 근거" eyebrowClassName={styles.eyebrow} id="linked-title" title="같은 판단을 뒷받침하거나 다른 해석이 필요한 근거입니다." />
        {evidence.linkedEvidence.length > 0 ? (
          <div className={styles.linkedGrid}>
            {evidence.linkedEvidence.map((item) => (
              <KREvidenceCard
                className={styles.linkedCard}
                confidence={<KRConfidenceBadge className={badgeClass(item.confidence)}>{item.confidence}</KRConfidenceBadge>}
                href={item.href}
                key={item.href}
                limitation={item.limitation}
                publishedAt={item.publishedAt}
                source={item.source}
                supports={item.supports}
                title={item.title}
              />
            ))}
          </div>
        ) : (
          <KREmptyState
            className={styles.inlineEmpty}
            description="공식 근거가 추가로 확인되면 이곳에서 함께 비교합니다."
            eyebrow="연결 근거 없음"
            title="아직 연결된 다른 근거가 없습니다."
            titleId="linked-empty"
          />
        )}
      </section>

      <section className={styles.analysisEntry} aria-labelledby="analysis-title">
        <div>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="분석으로 이어가기" eyebrowClassName={styles.eyebrow} id="analysis-title" title="근거를 내 분석에 담고 비교합니다." />
          <p>개인 판단 결과를 자동 생성하지 않고, 확인된 자료를 분석 공간으로 넘기는 행동만 제공합니다.</p>
        </div>
        <KRCTAGroup
          actions={[
            { href: linkedAnalysisHref, label: "이 근거를 내 분석에 담기", variant: "primary" },
            { href: "#related-entities", label: "관련 종목 비교하기" },
            { href: "#timeline-title", label: "관련 흐름 확인하기" },
            { href: "/kr/changes?view=latest", label: "정정 또는 추가 발표 보기" }
          ]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
      </section>

      {isUnknown ? (
        <KREmptyState
          className={styles.emptyState}
          description="입력한 근거 식별자에 연결된 공식 문서가 없습니다. 검색, 시장, 관련 종목에서 다시 확인할 수 있습니다."
          eyebrow="공식 정보 없음"
          title="확인 가능한 투자 근거가 없습니다."
          titleId="unknown-evidence"
          actions={
            <div className={styles.heroActions}>
              <Link href="/kr/search">검색으로 이동</Link>
              <Link href="/kr/market">시장으로 돌아가기</Link>
              <Link href="/kr/stock/005930">종목 예시 보기</Link>
            </div>
          }
        />
      ) : null}
    </main>
  );
}
