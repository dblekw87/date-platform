import Link from "next/link";
import type { ReactNode } from "react";
import {
  KRConfidenceBadge,
  KRCTAGroup,
  KREmptyState,
  KREntityChip,
  KREvidenceCard,
  KRHero,
  KRInformationBadge,
  KRRelatedEntityRow,
  KRSectionHeader,
  KRStatusBadge,
  KRThemeChip,
  KRTimelineItem
} from "../_components/design-language";
import type { AnalysisMock } from "./analysis-mock-data";
import { getAnalysisMock } from "./analysis-mock-data";
import styles from "./page.module.scss";

type KoreanAnalysisPageProps = {
  searchParams: Promise<{
    id?: string | string[];
  }>;
};

function badgeClass(state: string) {
  return state === "미확인" ? styles.unconfirmedBadge : styles.confidenceBadge;
}

function getPrimaryAnchor(analysis: AnalysisMock) {
  if (analysis.status === "새 근거 검토 필요") {
    return "#changes-title";
  }

  if (analysis.status === "추가 확인 필요") {
    return "#unknown-title";
  }

  if (analysis.status === "작성 중") {
    return "#question-title";
  }

  if (analysis.status === "판단 수정 필요") {
    return "#condition-title";
  }

  return "#question-title";
}

function getSectionOrder(analysis: AnalysisMock) {
  if (analysis.status === "새 근거 검토 필요") {
    return ["changes", "evidence", "question", "facts", "observation", "interpretation", "unknowns", "conditions", "alternatives", "hypotheses", "related", "next", "history", "actions"];
  }

  if (analysis.status === "추가 확인 필요") {
    return ["unknowns", "next", "question", "facts", "interpretation", "conditions", "evidence", "observation", "alternatives", "hypotheses", "related", "history", "actions"];
  }

  if (analysis.status === "작성 중") {
    return ["question", "interpretation", "hypotheses", "facts", "unknowns", "evidence", "observation", "alternatives", "conditions", "related", "next", "history", "actions"];
  }

  return ["question", "changes", "facts", "observation", "interpretation", "alternatives", "hypotheses", "unknowns", "conditions", "evidence", "related", "next", "history", "actions"];
}

function AnalysisHero({ analysis, isUnknown }: { analysis: AnalysisMock; isUnknown: boolean }) {
  const primaryHref = isUnknown ? "/kr/stock/005930" : getPrimaryAnchor(analysis);
  const primaryLabel = isUnknown ? "종목에서 분석 시작하기" : analysis.primaryAction;

  return (
    <KRHero
      aside={
        <aside className={styles.statePanel} aria-label="분석 상태">
          <KRStatusBadge className={styles.statusBadge}>{analysis.status}</KRStatusBadge>
          <strong>{analysis.target.name}</strong>
          <span>{analysis.target.code} · {analysis.target.market}</span>
          <small>{analysis.updatedAt}</small>
          <dl>
            <div>
              <dt>연결된 근거</dt>
              <dd>{analysis.summary.evidenceCount}</dd>
            </div>
            <div>
              <dt>관련 종목</dt>
              <dd>{analysis.summary.relatedCount}</dd>
            </div>
          </dl>
        </aside>
      }
      className={styles.hero}
      copyClassName={styles.heroCopy}
      description={analysis.currentQuestion.text}
      eyebrow={`분석 대상 · ${analysis.target.name}`}
      id="analysis-title"
      title={analysis.title}
    >
      <div className={styles.heroMeta}>
        <KRInformationBadge className={styles.infoBadge}>{analysis.target.market}</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>{analysis.target.code}</KRInformationBadge>
        {analysis.themes.map((theme) => (
          <KRThemeChip className={styles.themeChip} key={theme} label={theme} selected={theme === analysis.themes[0]} />
        ))}
      </div>
      <p className={styles.changeSummary}>{analysis.summary.newChange}</p>
      <KRCTAGroup
        actions={
          isUnknown
            ? [
                { href: primaryHref, label: primaryLabel, variant: "primary" },
                { href: "/kr/evidence?id=dart-samsung-001", label: "공식 근거에서 시작" },
                { href: "/kr/market", label: "시장으로 돌아가기" }
              ]
            : [
                { href: primaryHref, label: primaryLabel, variant: "primary" },
                { href: "#linked-evidence-title", label: "근거 추가하기" },
                { href: "#related-heading", label: "관련 종목 보기" }
              ]
        }
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </KRHero>
  );
}

function ChangesSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={`${styles.changeNotice} ${styles.prioritySection}`} aria-labelledby="changes-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="새로 달라진 내용" eyebrowClassName={styles.eyebrow} id="changes-title" title="시스템은 판단을 바꾸지 않고 다시 볼 이유만 알려줍니다." />
      {analysis.changes.length > 0 ? (
        <div className={styles.changeList}>
          {analysis.changes.map((change) => (
            <article className={styles.changeItem} key={`${change.type}-${change.time}`}>
              <KRInformationBadge className={styles.infoBadge}>{change.type}</KRInformationBadge>
              <h3>{change.reviewNeeded}</h3>
              <dl>
                <div>
                  <dt>변경 시각</dt>
                  <dd>{change.time}</dd>
                </div>
                <div>
                  <dt>변경 전</dt>
                  <dd>{change.before}</dd>
                </div>
                <div>
                  <dt>변경 후</dt>
                  <dd>{change.after}</dd>
                </div>
                <div>
                  <dt>연결된 근거</dt>
                  <dd>{change.evidence}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <KREmptyState className={styles.inlineEmpty} description="새 공식 정보가 확인되면 이 영역에서 다시 볼 이유를 알려줍니다." eyebrow="새 변화 없음" title="기존 분석 이후 새로 달라진 내용은 없습니다." titleId="changes-empty" />
      )}
    </section>
  );
}

function QuestionSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.questionSection} aria-labelledby="question-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="현재 질문" eyebrowClassName={styles.eyebrow} id="question-title" title="이 분석이 답하려는 질문입니다." />
      <div className={styles.questionBox}>
        <blockquote>{analysis.currentQuestion.text}</blockquote>
        <dl>
          <div>
            <dt>작성자</dt>
            <dd>{analysis.currentQuestion.author}</dd>
          </div>
          <div>
            <dt>마지막 수정</dt>
            <dd>{analysis.currentQuestion.editedAt}</dd>
          </div>
        </dl>
        <button type="button">질문 수정 Placeholder</button>
      </div>
    </section>
  );
}

function FactsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.factsSection} aria-labelledby="facts-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="공식적으로 확인된 사실" eyebrowClassName={styles.eyebrow} id="facts-title" title="사용자가 직접 편집하지 않는 읽기 전용 목록입니다." />
      {analysis.officialFacts.length > 0 ? (
        <div className={styles.factList}>
          {analysis.officialFacts.map((fact) => (
            <article className={styles.factItem} key={`${fact.fact}-${fact.source}`}>
              <strong>{fact.fact}</strong>
              <span>{fact.source} · {fact.publishedAt}</span>
              <small>{fact.related}</small>
              <KRConfidenceBadge className={badgeClass(fact.confidence)}>{fact.confidence}</KRConfidenceBadge>
              <Link href={fact.evidenceHref}>근거 상세 보기</Link>
            </article>
          ))}
        </div>
      ) : (
        <KREmptyState className={styles.inlineEmpty} description="공식 근거가 연결되기 전에는 사실 항목을 만들지 않습니다." eyebrow="공식 사실 없음" title="공식적으로 확인된 사실이 없습니다." titleId="facts-empty" />
      )}
    </section>
  );
}

function ObservationSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.observationSection} aria-labelledby="observation-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="관찰된 시장 변화" eyebrowClassName={styles.eyebrow} id="observation-title" title="시장 변화는 compact 지표로 분리해서 봅니다." description="관찰된 시장 변화는 공식 정보와 동시에 발생한 변화이며 직접적인 인과관계가 확인되지 않을 수 있습니다." />
      <div className={styles.observationGrid}>
        {analysis.marketObservations.length > 0 ? (
          analysis.marketObservations.map((item) => (
            <article key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.value}</p>
              <small>{item.observedAt}</small>
            </article>
          ))
        ) : (
          <article>
            <h3>관찰된 시장 변화 없음</h3>
            <p>공식 근거가 확인되면 가격, 거래량, 지수, 테마 반응을 분리해서 표시합니다.</p>
            <small>관찰 시각 없음</small>
          </article>
        )}
      </div>
    </section>
  );
}

function InterpretationSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="내 해석" eyebrowClassName={styles.eyebrow} id="interpretation-title" title="사용자가 직접 작성한 내용입니다." />
      <article className={styles.userBlock}>
        <p>{analysis.userInterpretation.text}</p>
        <dl>
          <div>
            <dt>해석 근거</dt>
            <dd>{analysis.userInterpretation.rationale}</dd>
          </div>
          <div>
            <dt>연결된 근거</dt>
            <dd>{analysis.userInterpretation.linkedEvidence}</dd>
          </div>
          <div>
            <dt>마지막 수정</dt>
            <dd>{analysis.userInterpretation.editedAt}</dd>
          </div>
        </dl>
        <button type="button">내 해석 수정 Placeholder</button>
      </article>
    </section>
  );
}

function AlternativesContent({ analysis }: { analysis: AnalysisMock }) {
  if (analysis.alternatives.length === 0) {
    return <KREmptyState className={styles.inlineEmpty} description="다른 해석 가능성이 생기면 이곳에 기록합니다." eyebrow="대안 해석 없음" title="아직 기록된 다른 해석은 없습니다." titleId="alternative-empty" />;
  }

  return (
    <div className={styles.compareList}>
      {analysis.alternatives.map((item) => (
        <article key={item.interpretation}>
          <h3>{item.interpretation}</h3>
          <p>{item.reason}</p>
          <dl>
            <div>
              <dt>필요한 추가 근거</dt>
              <dd>{item.neededEvidence}</dd>
            </div>
          </dl>
          <KRConfidenceBadge className={badgeClass(item.state)}>{item.state}</KRConfidenceBadge>
        </article>
      ))}
    </div>
  );
}

function AlternativesSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.alternativeSection} aria-labelledby="alternative-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="다른 해석 가능성" eyebrowClassName={styles.eyebrow} id="alternative-title" title="편향을 줄이기 위해 다른 설명도 남깁니다." />
      <div className={styles.desktopOnly}>
        <AlternativesContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.alternatives[0]?.interpretation ?? "다른 해석 가능성 보기"}</summary>
        <AlternativesContent analysis={analysis} />
      </details>
    </section>
  );
}

function HypothesesContent({ analysis }: { analysis: AnalysisMock }) {
  if (analysis.hypotheses.length === 0) {
    return <KREmptyState className={styles.inlineEmpty} description="가설은 공식 확인 전 임시 판단입니다. 사실처럼 표시하지 않습니다." eyebrow="가설 없음" title="아직 기록된 현재 가설이 없습니다." titleId="hypothesis-empty" />;
  }

  return (
    <div className={styles.hypothesisRows}>
      {analysis.hypotheses.map((item) => (
        <article key={item.text}>
          <KRStatusBadge className={styles.statusBadge}>{item.state}</KRStatusBadge>
          <h3>{item.text}</h3>
          <span>{item.requiredCondition}</span>
          <small>{item.linkedEvidence} · {item.decision}</small>
        </article>
      ))}
    </div>
  );
}

function HypothesesSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.hypothesisSection} aria-labelledby="hypothesis-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="현재 가설" eyebrowClassName={styles.eyebrow} id="hypothesis-title" title="공식 사실이 아닌 임시 판단으로 관리합니다." />
      <div className={styles.desktopOnly}>
        <HypothesesContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.hypotheses[0]?.text ?? "현재 가설 보기"}</summary>
        <HypothesesContent analysis={analysis} />
      </details>
    </section>
  );
}

function UnknownsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.unknownSection} aria-labelledby="unknown-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="아직 확인되지 않은 내용" eyebrowClassName={styles.eyebrow} id="unknown-title" title="미확인 내용은 기본 노출합니다." />
      <div className={styles.attentionList}>
        {analysis.unknowns.length > 0 ? (
          analysis.unknowns.map((item) => (
            <article key={item.item}>
              <strong>{item.item}</strong>
              <p>{item.whyImportant}</p>
              <dl>
                <div>
                  <dt>필요한 정보</dt>
                  <dd>{item.neededInfo}</dd>
                </div>
                <div>
                  <dt>다시 확인할 조건</dt>
                  <dd>{item.recheckCondition}</dd>
                </div>
                <div>
                  <dt>연결된 근거 또는 대상</dt>
                  <dd>{item.linked}</dd>
                </div>
              </dl>
            </article>
          ))
        ) : (
          <article>
            <strong>미확인 항목 없음</strong>
            <p>공식 근거가 연결되면 아직 확인되지 않은 내용이 이곳에 표시됩니다.</p>
          </article>
        )}
      </div>
    </section>
  );
}

function ConditionsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.conditionSection} aria-labelledby="condition-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="판단 변경 조건" eyebrowClassName={styles.eyebrow} id="condition-title" title="다시 검토해야 하는 조건을 checklist로 봅니다." />
      <div className={styles.conditionChecklist}>
        {analysis.reviewConditions.length > 0 ? (
          analysis.reviewConditions.map((item) => (
            <article key={item.condition}>
              <span aria-hidden="true">□</span>
              <div>
                <h3>{item.condition}</h3>
                <p>{item.type} · {item.state} · {item.met}</p>
                <small>{item.evidence} · {item.checkedAt}</small>
              </div>
            </article>
          ))
        ) : (
          <article>
            <span aria-hidden="true">□</span>
            <div>
              <h3>아직 판단 변경 조건이 없습니다.</h3>
              <p>어떤 정보가 나오면 판단을 다시 볼지 정해두면 좋습니다.</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function EvidenceSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.evidenceSection} aria-labelledby="linked-evidence-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="연결된 공식 근거" eyebrowClassName={styles.eyebrow} id="linked-evidence-title" title="근거가 어떤 분석 영역과 연결되는지 함께 봅니다." />
      <div className={styles.evidenceGrid}>
        {analysis.evidence.length > 0 ? (
          analysis.evidence.map((item) => (
            <KREvidenceCard
              className={styles.evidenceCard}
              confidence={<KRConfidenceBadge className={badgeClass(item.confidence)}>{item.confidence}</KRConfidenceBadge>}
              href={item.href}
              key={item.href}
              limitation={item.limitation}
              publishedAt={item.publishedAt}
              source={item.source}
              supports={item.supports}
              title={item.title}
            >
              <KRInformationBadge className={styles.infoBadge}>{item.type}</KRInformationBadge>
              <small>연결된 영역: {item.linkedSection}</small>
            </KREvidenceCard>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="공식 근거를 추가하면 공식 사실, 내 해석, 미확인 내용, 판단 변경 조건에 연결됩니다." eyebrow="연결 근거 없음" title="아직 연결된 공식 근거가 없습니다." titleId="evidence-empty" />
        )}
      </div>
    </section>
  );
}

function RelatedContent({ analysis }: { analysis: AnalysisMock }) {
  return (
    <>
      <div className={styles.targetChips}>
        <KREntityChip className={styles.entityChip} code={analysis.target.code} href={`/kr/stock/${analysis.target.code}`} label={analysis.target.name} relation="대표 종목" />
        {analysis.themes.map((theme) => (
          <KRThemeChip className={styles.themeChip} key={theme} label={theme} />
        ))}
      </div>
      <div className={styles.relatedRows}>
        {analysis.related.length > 0 ? (
          analysis.related.map((item) => <KRRelatedEntityRow className={styles.relatedRow} key={`${item.name}-${item.type}`} {...item} />)
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="분석 대상이 정해지면 관련 종목, 기업, 테마, 시장이 표시됩니다." eyebrow="관련 대상 없음" title="아직 연결된 관련 대상이 없습니다." titleId="related-empty" />
        )}
      </div>
    </>
  );
}

function RelatedSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.relatedSection} id="related-title" aria-labelledby="related-heading">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="관련 대상" eyebrowClassName={styles.eyebrow} id="related-heading" title="추천이 아니라 왜 연결되는지 확인합니다." />
      <div className={styles.desktopOnly}>
        <RelatedContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.related[0]?.name ?? "관련 대상 보기"}</summary>
        <RelatedContent analysis={analysis} />
      </details>
    </section>
  );
}

function NextSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.nextSection} aria-labelledby="next-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="다음 확인 항목" eyebrowClassName={styles.eyebrow} id="next-title" title="투자 행동이 아니라 확인 행동을 관리합니다." />
      <div className={styles.nextList}>
        {analysis.nextChecks.length > 0 ? (
          analysis.nextChecks.map((item) => (
            <article key={item.item}>
              <h3>{item.item}</h3>
              <p>{item.reason}</p>
              <dl>
                <div>
                  <dt>다음 확인 시점</dt>
                  <dd>{item.due}</dd>
                </div>
                <div>
                  <dt>연결된 근거</dt>
                  <dd>{item.evidence}</dd>
                </div>
                <div>
                  <dt>완료 여부</dt>
                  <dd>{item.done}</dd>
                </div>
              </dl>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="다음에 확인할 공식 출처나 시점을 정하면 이곳에 표시됩니다." eyebrow="다음 확인 없음" title="아직 다음 확인 항목이 없습니다." titleId="next-empty" />
        )}
      </div>
    </section>
  );
}

function HistoryContent({ analysis }: { analysis: AnalysisMock }) {
  return (
    <ol>
      {analysis.history.length > 0 ? (
        analysis.history.map((item) => (
          <KRTimelineItem
            className={styles.timelineItem}
            confidence={<KRStatusBadge className={badgeClass(item.confidence)}>{item.confidence}</KRStatusBadge>}
            key={`${item.time}-${item.title}`}
            linked={`${item.before} → ${item.after} · ${item.reason}`}
            time={item.time}
            title={item.title}
          />
        ))
      ) : (
        <li className={styles.timelineItem}>
          <time>기록 없음</time>
          <strong>아직 변경 이력이 없습니다.</strong>
          <span>분석이 수정되면 변경 항목 중심으로 표시됩니다.</span>
          <KRStatusBadge className={styles.statusBadge}>작성 중</KRStatusBadge>
        </li>
      )}
    </ol>
  );
}

function HistorySection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.historySection} aria-labelledby="history-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="변경 이력" eyebrowClassName={styles.eyebrow} id="history-title" title="전체 문서가 아니라 변경 항목 중심으로 남깁니다." />
      <div className={styles.desktopOnly}>
        <HistoryContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.history[0]?.title ?? "변경 이력 보기"}</summary>
        <HistoryContent analysis={analysis} />
      </details>
    </section>
  );
}

function ActionsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.actionSection} aria-labelledby="action-title">
      <div>
        <KRSectionHeader className={styles.sectionHeader} eyebrow="분석으로 이어가기" eyebrowClassName={styles.eyebrow} id="action-title" title="판단을 대신하지 않고 다음 확인 행동만 제공합니다." />
        <p>기록으로 남기기는 현재 분석을 기록 화면의 Snapshot으로 보존하는 행동입니다. 이번 단계에서는 실제 저장을 구현하지 않습니다.</p>
      </div>
      <div className={styles.actionGroups}>
        <KRCTAGroup
          actions={[
            { href: getPrimaryAnchor(analysis), label: analysis.primaryAction, variant: "primary" },
            { href: "#interpretation-title", label: "내 해석 수정하기", variant: "primary" }
          ]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
        <nav className={styles.secondaryLinks} aria-label="보조 분석 행동">
          <Link href="#condition-title">판단 변경 조건 추가하기</Link>
          <Link href="#next-title">다음 확인 시점 설정하기</Link>
          <Link href="/kr/journal">기록으로 남기기</Link>
        </nav>
      </div>
    </section>
  );
}

function renderSection(key: string, analysis: AnalysisMock): ReactNode {
  const sections: Record<string, ReactNode> = {
    changes: <ChangesSection analysis={analysis} />,
    question: <QuestionSection analysis={analysis} />,
    facts: <FactsSection analysis={analysis} />,
    observation: <ObservationSection analysis={analysis} />,
    interpretation: <InterpretationSection analysis={analysis} />,
    alternatives: <AlternativesSection analysis={analysis} />,
    hypotheses: <HypothesesSection analysis={analysis} />,
    unknowns: <UnknownsSection analysis={analysis} />,
    conditions: <ConditionsSection analysis={analysis} />,
    evidence: <EvidenceSection analysis={analysis} />,
    related: <RelatedSection analysis={analysis} />,
    next: <NextSection analysis={analysis} />,
    history: <HistorySection analysis={analysis} />,
    actions: <ActionsSection analysis={analysis} />
  };

  return <div key={key}>{sections[key]}</div>;
}

export default async function KoreanAnalysisPage({ searchParams }: KoreanAnalysisPageProps) {
  const { id } = await searchParams;
  const analysis = getAnalysisMock(id);
  const isUnknown = analysis.id !== "samsung-semiconductor-001" && analysis.id !== "hynix-hbm-001";

  if (isUnknown) {
    return (
      <main className={styles.page}>
        <AnalysisHero analysis={analysis} isUnknown />
        <KREmptyState
          className={styles.emptyFirst}
          description="입력한 분석 식별자에 연결된 내용이 없습니다. 시장, 종목, 공식 근거에서 다시 분석을 시작할 수 있습니다."
          eyebrow="분석 확인 불가"
          title="해당 분석을 확인할 수 없습니다."
          titleId="unknown-analysis"
          actions={
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/kr/stock/005930">종목에서 분석 시작하기</Link>
              <Link href="/kr/evidence?id=dart-samsung-001">공식 근거에서 시작</Link>
              <Link href="/kr/market">시장으로 돌아가기</Link>
            </div>
          }
        />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <AnalysisHero analysis={analysis} isUnknown={false} />
      {getSectionOrder(analysis).map((section) => renderSection(section, analysis))}
    </main>
  );
}
