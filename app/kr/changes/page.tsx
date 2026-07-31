import Link from "next/link";
import type { ReactNode } from "react";
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
  KRTimelineItem
} from "../_components/design-language";
import { getChangesMock, type ChangeItem } from "./changes-mock-data";
import styles from "./page.module.scss";

type KoreanChangesPageProps = {
  searchParams: Promise<{
    view?: string | string[];
  }>;
};

function badgeClass(state: string) {
  return state === "미확인" || state === "미확인 유지" || state === "시장 관찰만 확인됨" ? styles.unconfirmedBadge : styles.confidenceBadge;
}

function priorityClass(priority: string) {
  if (priority === "Priority 1") return styles.priorityOne;
  if (priority === "Priority 2") return styles.priorityTwo;
  return styles.priorityDefault;
}

function DensityDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={styles.densityDetails}>
      <summary>{title}</summary>
      {children}
    </details>
  );
}

function ChangesHero({ changes }: { changes: ReturnType<typeof getChangesMock> }) {
  const primaryHref = changes.isEmpty ? "/kr/market" : changes.view === "analysis" ? "#analysis-impact-title" : "#top-change-title";

  return (
    <KRHero
      aside={
        <aside className={styles.summaryPanel} aria-label="변화 요약">
          <KRStatusBadge className={styles.statusBadge}>{changes.changeCount}</KRStatusBadge>
          <strong>{changes.primaryChange}</strong>
          <dl>
            <div>
            <dt>분석 영향</dt>
              <dd>{changes.analysisImpactCount}</dd>
            </div>
            <div>
              <dt>정정된 정보</dt>
              <dd>{changes.correctedCount}</dd>
            </div>
            <div>
              <dt>아직 미확인</dt>
              <dd>{changes.unresolvedCount}</dd>
            </div>
          </dl>
        </aside>
      }
      className={styles.hero}
      copyClassName={styles.heroCopy}
      description={changes.description}
      eyebrow={`변화 · ${changes.lastCheckedAt}`}
      id="changes-title"
      title={changes.title}
    >
      <div className={styles.heroMeta}>
        <KRInformationBadge className={styles.infoBadge}>{changes.changeCount}</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>{changes.analysisImpactCount}</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>{changes.correctedCount}</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>{changes.unresolvedCount}</KRInformationBadge>
      </div>
      <KRCTAGroup
        actions={[
          { href: primaryHref, label: changes.primaryAction, variant: "primary" },
          { href: "/kr/watchlist?view=review", label: "관심 대상 다시 보기" }
        ]}
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </KRHero>
  );
}

function BeforeAfter({ change }: { change: ChangeItem }) {
  return (
    <div className={styles.beforeAfter} aria-label={`${change.title} 이전과 현재 비교`}>
      <article>
        <h4>이전에 알고 있던 내용</h4>
        <dl>
          <div>
            <dt>이전에 알고 있던 내용</dt>
            <dd>{change.before.known}</dd>
          </div>
          <div>
            <dt>이전 확인 상태</dt>
            <dd>{change.before.state}</dd>
          </div>
          <div>
            <dt>이전 투자 근거</dt>
            <dd>{change.before.evidence}</dd>
          </div>
          <div>
            <dt>마지막 검토</dt>
            <dd>{change.before.reviewedAt}</dd>
          </div>
        </dl>
      </article>
      <article>
        <h4>새로 확인된 내용</h4>
        <dl>
          <div>
            <dt>새로 확인된 내용</dt>
            <dd>{change.after.confirmed}</dd>
          </div>
          <div>
            <dt>현재 확인 상태</dt>
            <dd>{change.after.state}</dd>
          </div>
          <div>
            <dt>새 투자 근거</dt>
            <dd>{change.after.evidence}</dd>
          </div>
          <div>
            <dt>변경 시각</dt>
            <dd>{change.after.changedAt}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}

function ChangeCard({ change, compact = false }: { change: ChangeItem; compact?: boolean }) {
  return (
    <article className={`${styles.changeCard} ${compact ? styles.compactChange : ""}`}>
      <div className={styles.changeHeader}>
        <KRInformationBadge className={`${styles.infoBadge} ${priorityClass(change.priority)}`}>{change.priority.replace("Priority", "우선순위")}</KRInformationBadge>
        <KRStatusBadge className={badgeClass(change.status)}>{change.status}</KRStatusBadge>
      </div>
      <h3>{change.title}</h3>
      <p>{change.whatChanged}</p>
      <dl className={styles.changeMeta}>
        <div>
          <dt>변화 유형</dt>
          <dd>{change.type}</dd>
        </div>
        <div>
          <dt>관련 종목</dt>
          <dd>{change.relatedEntity}</dd>
        </div>
        <div>
          <dt>관련 분석</dt>
          <dd>{change.relatedAnalysis}</dd>
        </div>
        <div>
          <dt>검토 상태</dt>
          <dd>{change.readState}</dd>
        </div>
      </dl>
      {!compact ? <BeforeAfter change={change} /> : null}
      <div className={styles.reviewReason}>
        <strong>왜 다시 확인해야 하는가</strong>
        <p>{change.whyReview}</p>
        <small>아직 남은 미확인 내용: {change.remainingUnknown}</small>
      </div>
      <KRCTAGroup
        actions={[
          { href: change.analysisHref, label: change.primaryAction, variant: "primary" },
          { href: change.evidenceHref, label: "새 근거 보기" }
        ]}
        className={styles.cardActions}
        primaryClassName={styles.primaryAction}
      />
    </article>
  );
}

function EmptyChanges({ changes }: { changes: ReturnType<typeof getChangesMock> }) {
  return (
    <KREmptyState
      className={styles.emptyFirst}
      description="마지막 확인 이후 중요한 공식 변화가 없습니다. 변화가 없어도 기존 분석이나 관심 종목을 다시 확인할 수 있습니다."
      eyebrow="새 변화 없음"
      title={changes.title}
      titleId="changes-empty"
      actions={
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} href="/kr/analysis?id=samsung-semiconductor-001">
            기존 분석 다시 보기
          </Link>
          <Link href="/kr/watchlist">관심 종목 확인하기</Link>
          <Link href="/kr/market">시장으로 이동하기</Link>
        </div>
      }
    />
  );
}

export default async function KoreanChangesPage({ searchParams }: KoreanChangesPageProps) {
  const { view } = await searchParams;
  const changes = getChangesMock(view);
  const topChange = changes.changes[0];

  return (
    <main className={styles.page}>
      <ChangesHero changes={changes} />

      {changes.isEmpty ? <EmptyChanges changes={changes} /> : null}

      {!changes.isEmpty && topChange ? (
        <section className={styles.topChange} aria-labelledby="top-change-title">
          <KRSectionHeader
            className={styles.sectionHeader}
            eyebrow="가장 먼저 확인할 변화"
            eyebrowClassName={styles.eyebrow}
            id="top-change-title"
            title="등락률이 아니라 기존 판단 영향도를 먼저 봅니다."
            description="우선순위 1 변화는 기존 공식 사실, 판단 변경 조건, 미확인 내용 해소와 연결됩니다."
          />
          <ChangeCard change={topChange} />
        </section>
      ) : null}

      {!changes.isEmpty ? (
        <DensityDetails title="마지막 확인 이후 전체 변화 보기">
        <section className={styles.changedSince} aria-labelledby="since-title">
          <KRSectionHeader
            className={styles.sectionHeader}
            eyebrow="마지막 확인 이후 달라진 내용"
            eyebrowClassName={styles.eyebrow}
            id="since-title"
            title={changes.lastCheckedAt}
            description="최신순 알림이 아니라 이전 상태와 현재 상태를 비교합니다."
          />
          <div className={styles.changeList}>
            {changes.changes.map((change) => (
              <ChangeCard change={change} compact key={change.id} />
            ))}
          </div>
        </section>
        </DensityDetails>
      ) : null}

      <section className={styles.analysisImpact} aria-labelledby="analysis-impact-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          eyebrow="분석 영향 있음"
          eyebrowClassName={styles.eyebrow}
          id="analysis-impact-title"
          title="사용자 판단을 자동으로 바꾸지 않고 다시 볼 영역만 알려줍니다."
        />
        {changes.analysisImpacts.length > 0 ? (
          <div className={styles.impactRows}>
            {changes.analysisImpacts.map((change) => (
              <article key={change.id}>
                <strong>{change.relatedAnalysis}</strong>
                <span>{change.relatedEntity}</span>
                <small>{change.affectedSection}</small>
                <p>{change.whyReview}</p>
                <dl>
                  <div>
                    <dt>새 투자 근거</dt>
                    <dd>{change.evidenceTitle}</dd>
                  </div>
                  <div>
                    <dt>기존 판단 변경 조건</dt>
                    <dd>{change.reviewCondition}</dd>
                  </div>
                  <div>
                    <dt>마지막 분석 수정</dt>
                    <dd>{change.lastAnalysisUpdate}</dd>
                  </div>
                </dl>
                <div className={styles.rowActions}>
                  <Link className={styles.primaryAction} href={change.analysisHref}>
                    분석 다시 확인하기
                  </Link>
                  <Link href={change.evidenceHref}>새 근거 보기</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="분석이 연결되면 영향받는 영역과 재검토 이유가 표시됩니다." eyebrow="분석 영향 없음" title="연결된 분석 영향 변화가 없습니다." titleId="analysis-impact-empty" />
        )}
      </section>

      <DensityDetails title="새 공식 정보와 정정 정보 보기">
      <section className={styles.officialEvidence} aria-labelledby="official-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="새 공식 정보" eyebrowClassName={styles.eyebrow} id="official-title" title="뉴스 카드가 아니라 출처와 확인 범위를 먼저 봅니다." />
        {changes.officialEvidence.length > 0 ? (
          <div className={styles.evidenceGrid}>
            {changes.officialEvidence.map((change) => (
              <KREvidenceCard
                className={styles.evidenceCard}
                confidence={<KRConfidenceBadge className={badgeClass(change.confidence)}>{change.confidence}</KRConfidenceBadge>}
                href={change.evidenceHref}
                key={change.id}
                limitation={change.remainingUnknown}
                publishedAt={change.publishedAt}
                source={change.source}
                supports={change.after.confirmed}
                title={change.evidenceTitle}
              >
                <KRInformationBadge className={styles.infoBadge}>{change.evidenceType}</KRInformationBadge>
                <small>
                  관련 분석: {change.relatedAnalysis} · {change.correctionState}
                </small>
              </KREvidenceCard>
            ))}
          </div>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="공식 근거가 확인되면 출처, 공개 시각, 확인 상태를 함께 표시합니다." eyebrow="공식 정보 없음" title="현재 공식적으로 확인된 새 정보가 없습니다." titleId="official-empty" />
        )}
      </section>

      <section className={styles.corrections} aria-labelledby="correction-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="정정 또는 상태 변경" eyebrowClassName={styles.eyebrow} id="correction-title" title="정정된 최신 정보가 우선입니다." />
        {changes.corrections.length > 0 ? (
          <div className={styles.correctionList}>
            {changes.corrections.map((change) => (
              <article key={change.id}>
                <KRStatusBadge className={styles.statusBadge}>{change.status}</KRStatusBadge>
                <h3>{change.title}</h3>
                <BeforeAfter change={change} />
                <dl className={styles.changeMeta}>
                  <div>
                    <dt>정정 시각</dt>
                    <dd>{change.after.changedAt}</dd>
                  </div>
                  <div>
                    <dt>정정 출처</dt>
                    <dd>{change.source}</dd>
                  </div>
                  <div>
                    <dt>영향받는 분석</dt>
                    <dd>{change.relatedAnalysis}</dd>
                  </div>
                  <div>
                    <dt>반영 필요 여부</dt>
                    <dd>{change.readState}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="정정 공시나 수정 발표가 있으면 이 영역에서 우선 표시합니다." eyebrow="정정 없음" title="현재 정정 또는 상태 변경 정보가 없습니다." titleId="correction-empty" />
        )}
      </section>
      </DensityDetails>

      <DensityDetails title="관심 종목 변화와 미확인 내용 보기">
      <section className={styles.watchlistSection} aria-labelledby="watchlist-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="관심 종목 변화" eyebrowClassName={styles.eyebrow} id="watchlist-title" title="관심 종목 목록이 아니라 새 공식 변화만 요약합니다." />
        {changes.watchlist.length > 0 ? (
          <div className={styles.watchRows}>
            {changes.watchlist.map((item) => (
              <KRRelatedEntityRow className={styles.relatedRow} evidenceCount={item.officialCount} href={item.href} key={item.code} name={item.name} reason={`${item.keyChange} · ${item.checkedAt}`} type={`${item.code} · ${item.hasAnalysis} · ${item.confidence}`} />
            ))}
          </div>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="관심 종목이 없으면 내 기준의 변화가 제한적으로 표시됩니다." eyebrow="관심 종목 없음" title="관심 종목 변화가 없습니다." titleId="watchlist-empty" />
        )}
      </section>

      <section className={styles.unresolvedSection} aria-labelledby="unresolved-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="아직 미확인인 내용" eyebrowClassName={styles.eyebrow} id="unresolved-title" title={`${changes.unresolved.length}개 항목은 아직 단정할 수 없습니다.`} />
        {changes.unresolved.length > 0 ? (
          <details open>
            <summary>미확인 항목과 다음 확인 조건 보기</summary>
            <div className={styles.unresolvedList}>
              {changes.unresolved.map((change) => (
                <article key={change.id}>
                  <strong>{change.remainingUnknown}</strong>
                  <p>{change.whyReview}</p>
                  <dl>
                    <div>
                      <dt>관련 종목</dt>
                      <dd>{change.relatedEntity}</dd>
                    </div>
                    <div>
                    <dt>관련 투자 근거</dt>
                      <dd>{change.evidenceTitle}</dd>
                    </div>
                    <div>
                      <dt>다음 확인 조건</dt>
                      <dd>{change.reviewCondition}</dd>
                    </div>
                    <div>
                      <dt>분석 영향</dt>
                      <dd>{change.affectedSection}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </details>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="아직 단정할 수 없는 내용이 있으면 개수와 다음 확인 조건을 항상 표시합니다." eyebrow="미확인 없음" title="현재 유지 중인 미확인 항목이 없습니다." titleId="unresolved-empty" />
        )}
      </section>
      </DensityDetails>

      <DensityDetails title="반영 완료와 다음 확인 항목 보기">
      <section className={styles.appliedSection} aria-labelledby="applied-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="반영 완료한 변화" eyebrowClassName={styles.eyebrow} id="applied-title" title="읽음과 분석 반영은 다르게 처리합니다." />
        {changes.applied.length > 0 ? (
          <ol>
            {changes.applied.map((item) => (
              <KRTimelineItem className={styles.timelineItem} confidence={<KRStatusBadge className={styles.statusBadge}>{item.state}</KRStatusBadge>} key={`${item.appliedAt}-${item.analysis}`} linked={`${item.section} · ${item.history}`} time={item.appliedAt} title={item.analysis} />
            ))}
          </ol>
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="확인한 변화가 분석에 반영되면 변경 이력과 함께 남깁니다." eyebrow="반영 완료 없음" title="아직 반영 완료한 변화가 없습니다." titleId="applied-empty" />
        )}
      </section>

      <section className={styles.nextSection} aria-labelledby="next-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="다음 확인 항목" eyebrowClassName={styles.eyebrow} id="next-title" title="투자 행동이 아니라 검토 행동으로 이어집니다." />
        <div className={styles.nextList}>
          {changes.nextChecks.map((item) => (
            <article key={item.item}>
              <h3>{item.item}</h3>
              <p>{item.reason}</p>
              <span>{item.due}</span>
              <Link href={item.href}>확인하러 가기</Link>
            </article>
          ))}
        </div>
      </section>
      </DensityDetails>
    </main>
  );
}
