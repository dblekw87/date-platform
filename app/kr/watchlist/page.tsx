import Link from "next/link";
import type { ReactNode } from "react";
import {
  KRCTAGroup,
  KRConfidenceBadge,
  KREmptyState,
  KREntityChip,
  KRHero,
  KRInformationBadge,
  KRSectionHeader,
  KRStatusBadge,
  KRThemeChip
} from "../_components/design-language";
import { getWatchlistMock, type NextCheck, type PausedTracking, type WatchAnalysis, type WatchEvidence, type WatchListGroup, type WatchlistItem } from "./watchlist-mock-data";
import styles from "./page.module.scss";

type KoreanWatchlistPageProps = {
  searchParams: Promise<{
    view?: string | string[];
  }>;
};

function statusClass(status: string) {
  if (status === "미확인 내용 유지" || status === "조건 없음" || status === "미확인 유지") return styles.unconfirmedBadge;
  if (status.includes("정정") || status.includes("조건") || status.includes("재검토")) return styles.strongBadge;
  return styles.statusBadge;
}

function priorityClass(priority: WatchlistItem["priority"]) {
  if (priority === 1) return styles.priorityOne;
  if (priority === 2) return styles.priorityTwo;
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

function WatchlistHero({ watchlist }: { watchlist: ReturnType<typeof getWatchlistMock> }) {
  const primaryHref = watchlist.isEmpty ? "/kr/search" : watchlist.leadItem?.changesHref ?? "/kr/changes?view=latest";

  return (
    <KRHero
      aside={
        <aside className={styles.summaryPanel} aria-label="관심 목록 요약">
          <KRStatusBadge className={styles.strongBadge}>{watchlist.reviewNeededCount}개 확인 필요</KRStatusBadge>
          <strong>{watchlist.leadItem?.name ?? "관심 종목 없음"}</strong>
          <span>{watchlist.leadItem?.keyChange ?? "관심 종목을 추가하면 먼저 확인할 대상이 표시됩니다."}</span>
          <dl>
            <div>
              <dt>전체 관심 대상</dt>
              <dd>{watchlist.totalCount}개</dd>
            </div>
            <div>
              <dt>새 공식 정보</dt>
              <dd>{watchlist.officialInfoCount}개 대상</dd>
            </div>
            <div>
              <dt>Analysis 재검토</dt>
              <dd>{watchlist.analysisReviewCount}개</dd>
            </div>
            <div>
              <dt>다음 확인 도래</dt>
              <dd>{watchlist.dueCount}개</dd>
            </div>
          </dl>
        </aside>
      }
      className={styles.hero}
      copyClassName={styles.heroCopy}
      description={watchlist.description}
      eyebrow={`관심 종목 · ${watchlist.lastCheckedAt}`}
      id="watchlist-title"
      title={watchlist.title}
    >
      <div className={styles.heroMeta}>
        <KRInformationBadge className={styles.infoBadge}>전체 {watchlist.totalCount}개</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>확인 필요 {watchlist.reviewNeededCount}개</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>새 공식 정보 {watchlist.officialInfoCount}개</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>Analysis 재검토 {watchlist.analysisReviewCount}개</KRInformationBadge>
      </div>
      {watchlist.isUnknownView ? <p className={styles.viewNotice}>알 수 없는 view 값은 오류로 중단하지 않고 기본 Watchlist로 표시합니다. 요청 값: {watchlist.requestedView}</p> : null}
      <KRCTAGroup
        actions={[
          { href: primaryHref, label: watchlist.primaryAction, variant: "primary" },
          { href: "/kr/search", label: "검색해서 관심 대상 추가" },
          { href: "/kr/changes?view=latest", label: "달라진 내용 보기" },
        ]}
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </KRHero>
  );
}

function LeadItem({ item }: { item: WatchlistItem }) {
  return (
    <section className={styles.leadSection} aria-labelledby="lead-title">
      <KRSectionHeader
        className={styles.sectionHeader}
        eyebrow="가장 먼저 확인할 관심 대상"
        eyebrowClassName={styles.eyebrow}
        id="lead-title"
        title="등락률이 아니라 정정 정보와 판단 조건을 먼저 봅니다."
        description="Priority 1 대상만 대표로 보여주고 상세 비교는 Changes로 이동합니다."
      />
      <article className={`${styles.leadCard} ${priorityClass(item.priority)}`}>
        <div className={styles.itemTitle}>
          <KREntityChip className={styles.entityChip} code={item.code} href={item.stockHref} label={item.name} relation={item.market} />
          <KRStatusBadge className={statusClass(item.status)}>{item.status}</KRStatusBadge>
        </div>
        <h3>{item.keyChange}</h3>
        <p>{item.whyNow}</p>
        <dl className={styles.detailGrid}>
          <div>
            <dt>관심 이유</dt>
            <dd>{item.trackingReason}</dd>
          </div>
          <div>
            <dt>새 공식 정보</dt>
            <dd>{item.officialInfoCount}개</dd>
          </div>
          <div>
            <dt>Analysis 상태</dt>
            <dd>{item.analysisStatus}</dd>
          </div>
          <div>
            <dt>판단 변경 조건</dt>
            <dd>{item.conditionState}</dd>
          </div>
          <div>
            <dt>마지막 확인</dt>
            <dd>{item.lastCheckedAt}</dd>
          </div>
          <div>
            <dt>다음 확인</dt>
            <dd>{item.nextCheckAt}</dd>
          </div>
        </dl>
        <div className={styles.supportingMeta}>
          <KRInformationBadge className={styles.infoBadge}>변화 {item.changeCount}개</KRInformationBadge>
          <KRInformationBadge className={styles.infoBadge}>미확인 {item.unknownCount}개</KRInformationBadge>
          <KRInformationBadge className={styles.infoBadge}>{item.correctionState}</KRInformationBadge>
          <KRInformationBadge className={styles.infoBadge}>{item.price} · {item.move}</KRInformationBadge>
        </div>
        <KRCTAGroup
          actions={[
            { href: item.changesHref, label: item.primaryAction, variant: "primary" },
            { href: item.analysisHref, label: "분석 다시 보기" },
            { href: item.evidenceHref, label: "새 근거 보기" }
          ]}
          className={styles.cardActions}
          primaryClassName={styles.primaryAction}
        />
      </article>
    </section>
  );
}

function WatchItemRow({ item }: { item: WatchlistItem }) {
  return (
    <article className={styles.itemRow}>
      <div className={styles.rowMain}>
        <KREntityChip className={styles.entityChip} code={item.code} href={item.stockHref} label={item.name} relation={item.market} />
        <p>{item.whyNow}</p>
        <small>
          {item.company} · {item.etf} · 가격 보조 정보 {item.price} {item.move}
        </small>
      </div>
      <dl className={styles.rowMetrics}>
        <div>
          <dt>관심 이유</dt>
          <dd>{item.trackingReason}</dd>
        </div>
        <div>
          <dt>상태</dt>
          <dd>
            <KRStatusBadge className={statusClass(item.status)}>{item.status}</KRStatusBadge>
          </dd>
        </div>
        <div>
          <dt>새 공식 정보</dt>
          <dd>{item.officialInfoCount}개</dd>
        </div>
        <div>
          <dt>미확인</dt>
          <dd>{item.unknownCount}개</dd>
        </div>
        <div>
          <dt>Analysis</dt>
          <dd>{item.analysisCount}개</dd>
        </div>
        <div>
          <dt>판단 조건</dt>
          <dd>{item.conditionState}</dd>
        </div>
        <div>
          <dt>마지막 확인</dt>
          <dd>{item.lastCheckedAt}</dd>
        </div>
        <div>
          <dt>다음 확인</dt>
          <dd>{item.nextCheckAt}</dd>
        </div>
      </dl>
      <div className={styles.rowAction}>
        <strong>{item.keyChange}</strong>
        <Link className={styles.primaryAction} href={item.changesHref}>
          {item.primaryAction}
        </Link>
      </div>
    </article>
  );
}

function ReviewSection({ items }: { items: WatchlistItem[] }) {
  return (
    <section className={styles.reviewSection} aria-labelledby="review-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="확인이 필요한 대상" eyebrowClassName={styles.eyebrow} id="review-title" title="왜 지금 확인해야 하는지 함께 표시합니다." />
      <div className={styles.itemList}>
        {items.length > 0 ? (
          items.map((item) => <WatchItemRow item={item} key={item.id} />)
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="현재 확인이 필요한 관심 대상이 없습니다." eyebrow="확인 필요 없음" title="모든 항목 확인 완료" titleId="review-empty" />
        )}
      </div>
    </section>
  );
}

function EvidenceSection({ evidence }: { evidence: WatchEvidence[] }) {
  return (
    <section className={styles.evidenceSection} aria-labelledby="official-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="새 공식 정보 있음" eyebrowClassName={styles.eyebrow} id="official-title" title="관심 종목에 연결된 Evidence 상태만 압축해서 봅니다." />
      <div className={styles.evidenceRows}>
        {evidence.length > 0 ? (
          evidence.map((item) => (
            <article key={item.id}>
              <div>
                <strong>{item.stockName}</strong>
                <span>
                  {item.stockCode} · {item.type}
                </span>
              </div>
              <p>{item.title}</p>
              <dl>
                <div>
                  <dt>공식 출처</dt>
                  <dd>{item.source}</dd>
                </div>
                <div>
                  <dt>공개 시각</dt>
                  <dd>{item.publishedAt}</dd>
                </div>
                <div>
                  <dt>확인 상태</dt>
                  <dd>
                    <KRConfidenceBadge className={statusClass(item.confidence)}>{item.confidence}</KRConfidenceBadge>
                  </dd>
                </div>
                <div>
                  <dt>정정 여부</dt>
                  <dd>{item.correction}</dd>
                </div>
                <div>
                  <dt>Analysis 영향</dt>
                  <dd>{item.analysisImpact}</dd>
                </div>
              </dl>
              <Link href={item.href}>새 근거 확인하기</Link>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="새롭게 확인된 공식 정보가 없습니다. 시장 관찰은 공식 정보와 구분해서 표시합니다." eyebrow="Evidence 없음" title="새 공식 정보가 없습니다." titleId="official-empty" />
        )}
      </div>
    </section>
  );
}

function AnalysisSection({ analyses }: { analyses: WatchAnalysis[] }) {
  return (
    <section className={styles.analysisSection} aria-labelledby="analysis-review-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="Analysis 재검토 필요" eyebrowClassName={styles.eyebrow} id="analysis-review-title" title="사용자 판단은 자동 변경하지 않고 다시 볼 영역만 알려줍니다." />
      <div className={styles.analysisRows}>
        {analyses.length > 0 ? (
          analyses.map((item) => (
            <article key={item.id}>
              <KRStatusBadge className={statusClass(item.status)}>{item.status}</KRStatusBadge>
              <h3>{item.title}</h3>
              <p>{item.reviewReason}</p>
              <dl className={styles.detailGrid}>
                <div>
                  <dt>종목</dt>
                  <dd>{item.stockName}</dd>
                </div>
                <div>
                  <dt>마지막 수정</dt>
                  <dd>{item.updatedAt}</dd>
                </div>
                <div>
                  <dt>새 Evidence</dt>
                  <dd>{item.newEvidenceCount}개</dd>
                </div>
                <div>
                  <dt>영향받는 Section</dt>
                  <dd>{item.affectedSection}</dd>
                </div>
                <div>
                  <dt>판단 변경 조건</dt>
                  <dd>{item.conditionState}</dd>
                </div>
              </dl>
              <KRCTAGroup
                actions={[
                  { href: item.analysisHref, label: "분석 다시 확인하기", variant: "primary" },
                  { href: item.changesHref, label: "달라진 내용 보기" },
                  { href: item.evidenceHref, label: "새 근거 보기" }
                ]}
                className={styles.cardActions}
                primaryClassName={styles.primaryAction}
              />
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="연결된 Analysis가 없으면 종목 또는 Evidence에서 사용자가 직접 분석을 시작할 수 있습니다." eyebrow="Analysis 없음" title="재검토할 Analysis가 없습니다." titleId="analysis-empty" />
        )}
      </div>
    </section>
  );
}

function NextCheckSection({ nextChecks }: { nextChecks: NextCheck[] }) {
  return (
    <section className={styles.nextSection} aria-labelledby="next-check-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="다음 확인 시점" eyebrowClassName={styles.eyebrow} id="next-check-title" title="실제 알림이 아니라 날짜와 상태 Placeholder만 표시합니다." />
      <div className={styles.nextRows}>
        {nextChecks.length > 0 ? (
          nextChecks.map((item) => (
            <article key={item.id}>
              <h3>{item.stockName}</h3>
              <p>{item.reason}</p>
              <dl>
                <div>
                  <dt>다음 확인 일시</dt>
                  <dd>{item.dueAt}</dd>
                </div>
                <div>
                  <dt>관련 Evidence</dt>
                  <dd>{item.evidence}</dd>
                </div>
                <div>
                  <dt>관련 Analysis</dt>
                  <dd>{item.analysis}</dd>
                </div>
                <div>
                  <dt>현재 상태</dt>
                  <dd>{item.state}</dd>
                </div>
                <div>
                  <dt>완료 여부</dt>
                  <dd>{item.doneState}</dd>
                </div>
              </dl>
              <Link href={item.href}>확인 항목 보기</Link>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="다음 확인 시점을 설정하면 날짜와 확인 이유가 이곳에 표시됩니다." eyebrow="다음 확인 없음" title="예정된 다음 확인 항목이 없습니다." titleId="next-empty" />
        )}
      </div>
    </section>
  );
}

function StableSection({ items }: { items: WatchlistItem[] }) {
  return (
    <section className={styles.stableSection} aria-labelledby="stable-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="현재 변화 없음" eyebrowClassName={styles.eyebrow} id="stable-title" title="변화가 없다는 이유로 숨기지 않습니다." />
      <div className={styles.stableRows}>
        {items.length > 0 ? (
          items.map((item) => (
            <article key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.code} · {item.trackingReason}
                </span>
              </div>
              <p>마지막 확인 이후 중요한 공식 변화가 없습니다.</p>
              <dl>
                <div>
                  <dt>마지막 확인</dt>
                  <dd>{item.lastCheckedAt}</dd>
                </div>
                <div>
                  <dt>마지막 공식 정보</dt>
                  <dd>{item.lastOfficialAt}</dd>
                </div>
                <div>
                  <dt>다음 확인</dt>
                  <dd>{item.nextCheckAt}</dd>
                </div>
                <div>
                  <dt>추적 유지 이유</dt>
                  <dd>{item.nextCheckReason}</dd>
                </div>
              </dl>
              <Link href={item.stockHref}>종목 보기</Link>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="현재 변화가 없는 항목도 다음 확인 시점까지 유지합니다." eyebrow="현재 변화 없음 항목 없음" title="유지 중인 조용한 항목이 없습니다." titleId="stable-empty" />
        )}
      </div>
    </section>
  );
}

function ListGroupsSection({ groups }: { groups: WatchListGroup[] }) {
  return (
    <section className={styles.listsSection} aria-labelledby="custom-lists-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="사용자 지정 목록" eyebrowClassName={styles.eyebrow} id="custom-lists-title" title="짧은 목록만 두고 폴더 시스템으로 만들지 않습니다." />
      <div className={styles.listGroups}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <article id={group.id} key={group.id}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <dl>
                <div>
                  <dt>항목 수</dt>
                  <dd>{group.itemCount}개</dd>
                </div>
                <div>
                  <dt>확인 필요</dt>
                  <dd>{group.reviewNeededCount}개</dd>
                </div>
                <div>
                  <dt>새 공식 정보</dt>
                  <dd>{group.officialInfoCount}개</dd>
                </div>
                <div>
                  <dt>가장 중요한 대상</dt>
                  <dd>{group.leadTarget}</dd>
                </div>
              </dl>
              <Link href={group.href}>목록 열기</Link>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="자주 함께 보는 종목만 짧은 목록으로 묶을 수 있습니다." eyebrow="사용자 목록 없음" title="아직 만든 목록이 없습니다." titleId="lists-empty" />
        )}
      </div>
    </section>
  );
}

function PausedSection({ items }: { items: PausedTracking[] }) {
  return (
    <section className={styles.pausedSection} aria-labelledby="paused-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="추적 보류 / 종료" eyebrowClassName={styles.eyebrow} id="paused-title" title="현재 Watchlist 처리와 과거 기록 보존을 구분합니다." />
      <div className={styles.pausedRows}>
        {items.length > 0 ? (
          items.map((item) => (
            <article key={item.id}>
              <KRStatusBadge className={statusClass(item.state)}>{item.state}</KRStatusBadge>
              <h3>
                {item.name} <span>{item.code}</span>
              </h3>
              <p>{item.reason}</p>
              <dl>
                <div>
                  <dt>처리 시각</dt>
                  <dd>{item.handledAt}</dd>
                </div>
                <div>
                  <dt>연결된 Analysis</dt>
                  <dd>{item.linkedAnalysis}</dd>
                </div>
              </dl>
              <Link href={item.href}>다시 추적하기</Link>
            </article>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="보류 또는 종료한 항목은 과거 Analysis와 Changes를 유지한 채 이곳에 표시됩니다." eyebrow="보류 없음" title="보류 또는 종료한 추적 항목이 없습니다." titleId="paused-empty" />
        )}
      </div>
    </section>
  );
}

function AddFlowSection({ watchlist }: { watchlist: ReturnType<typeof getWatchlistMock> }) {
  return (
    <section className={styles.addFlowSection} aria-labelledby="add-flow-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="관심 추가 흐름" eyebrowClassName={styles.eyebrow} id="add-flow-title" title="Stock Detail에서 시작하는 단일 단계 Placeholder입니다." description="실제 저장 없이 관심 이유, 다음 확인 시점, 연결할 Analysis 선택지만 보여줍니다." />
      <div className={styles.addFlowGrid}>
        <article>
          <strong>1. 관심 종목 추가</strong>
          <span>{watchlist.addFlow.target}</span>
        </article>
        <article>
          <strong>2. 관심 이유 선택 또는 입력</strong>
          <div className={styles.reasonChips}>
            {watchlist.addFlow.reasons.map((reason) => (
              <KRThemeChip className={styles.themeChip} key={reason} label={reason} selected={reason === "공식 공시 대기"} />
            ))}
          </div>
        </article>
        <article>
          <strong>3. 다음 확인 시점 선택</strong>
          <ul>
            {watchlist.addFlow.nextCheckOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </article>
        <article>
          <strong>4. 연결할 Analysis 선택은 선택 사항</strong>
          <ul>
            {watchlist.addFlow.analysisOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </article>
      </div>
      <p className={styles.viewNotice}>이번 Low-Fi에서는 복잡한 Wizard, 서버 저장, 실제 알림을 구현하지 않습니다.</p>
    </section>
  );
}

function EmptyStatesSection({ watchlist }: { watchlist: ReturnType<typeof getWatchlistMock> }) {
  return (
    <section className={styles.emptySection} aria-labelledby="empty-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="Empty State" eyebrowClassName={styles.eyebrow} id="empty-title" title="비어 있어도 첫 추적 행동으로 이어집니다." />
      <div className={styles.emptyGrid}>
        {watchlist.emptyStates.map((item) => (
          <KREmptyState
            actions={
              <div className={styles.emptyActions}>
                {item.actions.map((action, index) => (
                  <Link className={index === 0 ? styles.primaryAction : undefined} href={action.href} key={`${item.id}-${action.href}`}>
                    {action.label}
                  </Link>
                ))}
              </div>
            }
            className={styles.inlineEmpty}
            description={item.description}
            eyebrow={item.eyebrow}
            key={item.id}
            title={item.title}
            titleId={`${item.id}-title`}
          />
        ))}
      </div>
    </section>
  );
}

export default async function KoreanWatchlistPage({ searchParams }: KoreanWatchlistPageProps) {
  const { view } = await searchParams;
  const watchlist = getWatchlistMock(view);

  return (
    <main className={styles.page}>
      <WatchlistHero watchlist={watchlist} />

      {watchlist.leadItem ? <LeadItem item={watchlist.leadItem} /> : null}

      {watchlist.isEmpty ? (
        <KREmptyState
          actions={
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/kr/search">
                종목 검색하기
              </Link>
              <Link href="/kr/market">시장에서 종목 찾기</Link>
              <Link href="/kr/stock/005930">최근 본 종목 확인하기</Link>
            </div>
          }
          className={styles.emptyFirst}
          description="종목을 추가하면 관심 이유, 새 공식 정보, Analysis 상태, 다음 확인 시점이 함께 표시됩니다."
          eyebrow="관심 종목 없음"
          title="아직 추적 중인 종목이 없습니다."
          titleId="watchlist-empty-first"
        />
      ) : null}

      {!watchlist.isEmpty ? (
        <DensityDetails title="확인이 필요한 대상과 새 공식 정보 보기">
          <ReviewSection items={watchlist.reviewItems} />
          <EvidenceSection evidence={watchlist.officialEvidence} />
        </DensityDetails>
      ) : null}
      {!watchlist.isEmpty ? (
        <DensityDetails title="Analysis 재검토와 다음 확인 시점 보기">
          <AnalysisSection analyses={watchlist.analysisReviews} />
          <NextCheckSection nextChecks={watchlist.nextChecks} />
        </DensityDetails>
      ) : null}
      {!watchlist.isEmpty ? (
        <DensityDetails title="현재 변화 없음과 사용자 목록 보기">
          <StableSection items={watchlist.stableItems} />
          <ListGroupsSection groups={watchlist.listGroups} />
        </DensityDetails>
      ) : null}
      {!watchlist.isEmpty ? (
        <DensityDetails title="추적 보류와 관심 추가 흐름 보기">
          <PausedSection items={watchlist.pausedItems} />
          <AddFlowSection watchlist={watchlist} />
        </DensityDetails>
      ) : (
        <AddFlowSection watchlist={watchlist} />
      )}

      <DensityDetails title="비어 있는 상태 예시 보기">
        <EmptyStatesSection watchlist={watchlist} />
      </DensityDetails>
    </main>
  );
}
