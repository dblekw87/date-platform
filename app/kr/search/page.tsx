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
import {
  getSearchMock,
  type SearchAnalysisResult,
  type SearchCompanyResult,
  type SearchEvidenceResult,
  type SearchMockResult,
  type SearchRecentContext,
  type SearchStockResult,
  type SearchThemeResult
} from "./search-mock-data";
import styles from "./page.module.scss";

type KoreanSearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    state?: string | string[];
  }>;
};

function statusClass(status: string) {
  if (status.includes("미확인") || status.includes("단일")) return styles.unconfirmedBadge;
  if (status.includes("재검토") || status.includes("정정")) return styles.strongBadge;
  return styles.statusBadge;
}

function isStockResult(result: SearchMockResult["exactResult"]): result is SearchStockResult {
  return Boolean(result && "code" in result && "lastChecked" in result);
}

function isCompanyResult(result: SearchMockResult["exactResult"]): result is SearchCompanyResult {
  return Boolean(result && "representativeStock" in result);
}

function isThemeResult(result: SearchMockResult["exactResult"]): result is SearchThemeResult {
  return Boolean(result && "relatedCount" in result && "representativeStocks" in result);
}

function isEvidenceResult(result: SearchMockResult["exactResult"]): result is SearchEvidenceResult {
  return Boolean(result && "source" in result && "keyFact" in result);
}

function DensityDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={styles.densityDetails}>
      <summary>{title}</summary>
      {children}
    </details>
  );
}

function SearchHero({ search }: { search: SearchMockResult }) {
  return (
    <KRHero
      aside={
        <aside className={styles.summaryPanel} aria-label="검색 상태 요약">
          <KRStatusBadge className={search.isIdle ? styles.statusBadge : styles.strongBadge}>{search.isIdle ? "검색 전 상태" : "검색 결과 확인"}</KRStatusBadge>
          <strong>{search.query || "최근 맥락에서 다시 시작"}</strong>
          <span>{search.isIdle ? "최근 본 분석, 공식 근거, 관심 종목을 먼저 표시합니다." : "정확 일치와 공식 근거 연결을 먼저 확인합니다."}</span>
          <dl>
            <div>
              <dt>종목 결과</dt>
              <dd>{search.stocks.length}개</dd>
            </div>
            <div>
              <dt>공식 근거</dt>
              <dd>{search.evidence.length}개</dd>
            </div>
            <div>
              <dt>분석</dt>
              <dd>{search.analyses.length}개</dd>
            </div>
            <div>
              <dt>관심 연결</dt>
              <dd>Watchlist 이동</dd>
            </div>
          </dl>
        </aside>
      }
      className={styles.hero}
      copyClassName={styles.heroCopy}
      description={search.heroDescription}
      eyebrow="검색 · 발견과 다음 확인"
      id="search-title"
      title={search.heroTitle}
    >
      <form action="/kr/search" className={styles.searchForm}>
        <label className={styles.searchLabel} htmlFor="kr-search-input">
          통합 검색
        </label>
        <div className={styles.searchControl}>
          <input defaultValue={search.query} id="kr-search-input" name="q" placeholder="종목, 기업, 테마, 공식 정보를 검색하세요." type="search" />
          <button type="submit">검색</button>
          <Link href="/kr/search">취소</Link>
        </div>
      </form>
      <div className={styles.targetGuide} aria-label="검색 대상 안내">
        {["종목", "기업", "테마", "ETF", "공식 근거", "기존 분석", "관심 종목"].map((target) => (
          <KRInformationBadge className={styles.infoBadge} key={target}>
            {target}
          </KRInformationBadge>
        ))}
      </div>
      {search.safeStateLabel ? <p className={styles.notice}>{search.safeStateLabel}</p> : null}
      <KRCTAGroup
        actions={[
          { href: search.query ? `/kr/search?q=${encodeURIComponent(search.query)}` : "/kr/search?state=idle", label: search.query ? "현재 검색 다시 보기" : "최근 맥락 보기", variant: "primary" },
          { href: "/kr/market", label: "시장에서 찾기" },
          { href: "/kr/watchlist?view=default", label: "관심 목록 보기" }
        ]}
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </KRHero>
  );
}

function RecentContextSection({ items }: { items: SearchRecentContext[] }) {
  return (
    <section className={styles.section} aria-labelledby="recent-context-title">
      <KRSectionHeader
        className={styles.sectionHeader}
        eyebrow="검색 전 상태"
        eyebrowClassName={styles.eyebrow}
        id="recent-context-title"
        title="인기 검색어보다 최근 맥락을 먼저 보여줍니다."
        description="검색은 결과를 많이 나열하는 화면이 아니라 사용자가 보던 종목, 공식 근거, 분석으로 빠르게 돌아가는 진입점입니다."
      />
      <div className={styles.contextRows}>
        {items.map((item) => (
          <Link className={styles.contextRow} href={item.href} key={item.id}>
            <span>{item.kind}</span>
            <strong>{item.title}</strong>
            <small>{item.meta}</small>
            <em>{item.action}</em>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AutocompleteSection({ search }: { search: SearchMockResult }) {
  if (search.isIdle || search.isEmpty || search.query !== "삼성") return null;

  return (
    <section className={styles.section} aria-labelledby="autocomplete-title">
      <KRSectionHeader
        className={styles.sectionHeader}
        eyebrow="입력 중 후보"
        eyebrowClassName={styles.eyebrow}
        id="autocomplete-title"
        title="종목, 기업, 테마, 공식 근거를 구분해서 제안합니다."
        description="첫 후보 선택, Enter 이동, Esc 취소는 후속 Interaction에서 확정할 동작으로 표시만 합니다."
      />
      <div className={styles.autocompleteGrid}>
        <SuggestionGroup title="종목" items={search.autocomplete.stocks.map((item) => `${item.name} ${item.code} · ${item.market} · ${item.watchState} · ${item.analysisState}`)} />
        <SuggestionGroup title="기업" items={search.autocomplete.companies.map((item) => `${item.name} · 대표 종목 ${item.representativeStock} · ${item.industry}`)} />
        <SuggestionGroup title="테마" items={search.autocomplete.themes.map((item) => `${item.name} · 관련 종목 ${item.relatedCount}개 · ${item.analysisState}`)} />
        <SuggestionGroup title="공식 근거" items={search.autocomplete.evidence.map((item) => `${item.title} · ${item.type} · ${item.source} · ${item.confidence}`)} />
      </div>
    </section>
  );
}

function SuggestionGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <article className={styles.suggestionGroup}>
      <h3>{title}</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li className={index === 0 ? styles.selectedSuggestion : undefined} key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>일치 후보 없음</p>
      )}
    </article>
  );
}

function ExactResultSection({ search }: { search: SearchMockResult }) {
  const result = search.exactResult;
  if (!result) return null;

  return (
    <section className={styles.section} aria-labelledby="exact-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="가장 정확한 결과" eyebrowClassName={styles.eyebrow} id="exact-title" title={`${search.exactResultKind} 일치 결과를 먼저 확인합니다.`} />
      <article className={styles.exactCard}>
        {isStockResult(result) ? <StockResultContent item={result} featured /> : null}
        {isCompanyResult(result) ? <CompanyResultContent item={result} featured /> : null}
        {isThemeResult(result) ? <ThemeResultContent item={result} featured /> : null}
        {isEvidenceResult(result) ? <EvidenceResultContent item={result} featured /> : null}
      </article>
    </section>
  );
}

function StockResultsSection({ items, showEmpty }: { items: SearchStockResult[]; showEmpty: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="stock-results-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="종목 결과" eyebrowClassName={styles.eyebrow} id="stock-results-title" title="가격보다 공식 정보와 다음 행동을 먼저 보여줍니다." />
      {items.length > 0 ? (
        <div className={styles.resultRows}>
          {items.map((item) => (
            <article className={styles.resultRow} key={item.id}>
              <StockResultContent item={item} />
            </article>
          ))}
        </div>
      ) : showEmpty ? (
        <InlineEmpty title="종목 결과 없음" description="일치하는 종목 결과가 없습니다. 종목 코드 또는 기업명으로 다시 검색할 수 있습니다." />
      ) : null}
    </section>
  );
}

function StockResultContent({ item, featured }: { item: SearchStockResult; featured?: boolean }) {
  return (
    <>
      <div className={styles.resultTitle}>
        <KREntityChip className={styles.entityChip} code={item.code} href={item.href} label={item.name} relation={item.market} />
        <KRStatusBadge className={statusClass(item.watchState)}>{item.watchState}</KRStatusBadge>
      </div>
      <div className={styles.resultCopy}>
        <h3>{featured ? `${item.name} · 대표 종목 결과` : item.name}</h3>
        <p>
          {item.company} · {item.industry}
        </p>
        <small>{item.priceNote}</small>
      </div>
      <dl className={styles.resultMeta}>
        <div>
          <dt>가장 최근 공식 정보</dt>
          <dd>{item.recentEvidence}</dd>
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
          <dt>분석 상태</dt>
          <dd>{item.analysisState}</dd>
        </div>
        <div>
          <dt>마지막 확인</dt>
          <dd>{item.lastChecked}</dd>
        </div>
        <div>
          <dt>다음 행동</dt>
          <dd>{item.nextAction}</dd>
        </div>
      </dl>
      <KRCTAGroup
        actions={[
          { href: item.href, label: "종목 보기", variant: "primary" },
          { href: "/kr/watchlist?view=default#add-flow-title", label: item.watchState === "관심 종목" ? "추적 설정하기" : "관심 종목에 추가하기" },
          { href: item.analysisHref ?? item.href, label: item.analysisHref ? "분석 보기" : "종목에서 분석 시작" }
        ]}
        className={styles.cardActions}
        primaryClassName={styles.primaryAction}
      />
    </>
  );
}

function CompanyResultsSection({ items, showEmpty }: { items: SearchCompanyResult[]; showEmpty: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="company-results-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="기업 결과" eyebrowClassName={styles.eyebrow} id="company-results-title" title="기업과 종목을 구분해서 보여줍니다." description="기업은 법인과 사업 단위, 종목은 거래되는 증권입니다." />
      {items.length > 0 ? (
        <div className={styles.resultRows}>
          {items.map((item) => (
            <article className={styles.resultRow} key={item.id}>
              <CompanyResultContent item={item} />
            </article>
          ))}
        </div>
      ) : showEmpty ? (
        <InlineEmpty title="기업 결과 없음" description="일치하는 기업 결과가 없습니다. 대표 종목명이나 영문 티커로 다시 검색할 수 있습니다." />
      ) : null}
    </section>
  );
}

function CompanyResultContent({ item, featured }: { item: SearchCompanyResult; featured?: boolean }) {
  return (
    <>
      <div className={styles.resultTitle}>
        <KRInformationBadge className={styles.infoBadge}>기업</KRInformationBadge>
        <strong>{item.name}</strong>
      </div>
      <div className={styles.resultCopy}>
        <h3>{featured ? `${item.name} · 기업 일치` : item.name}</h3>
        <p>
          대표 종목 {item.representativeStock} · 연결 종목 {item.linkedSecurityCount}개 · {item.markets}
        </p>
      </div>
      <dl className={styles.resultMeta}>
        <div>
          <dt>주요 사업</dt>
          <dd>{item.business}</dd>
        </div>
        <div>
          <dt>관련 산업</dt>
          <dd>{item.industry}</dd>
        </div>
        <div>
          <dt>최근 공식 정보</dt>
          <dd>{item.recentEvidence}</dd>
        </div>
        <div>
          <dt>연결된 분석</dt>
          <dd>{item.analysis}</dd>
        </div>
      </dl>
      <KRCTAGroup actions={[{ href: item.href, label: "대표 종목 보기", variant: "primary" }, { href: "/kr/market", label: "시장에서 보기" }]} className={styles.cardActions} primaryClassName={styles.primaryAction} />
    </>
  );
}

function ThemeResultsSection({ items, showEmpty }: { items: SearchThemeResult[]; showEmpty: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="theme-results-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="테마 결과" eyebrowClassName={styles.eyebrow} id="theme-results-title" title="테마는 관련 공식 정보와 종목 묶음으로만 다룹니다." />
      {items.length > 0 ? (
        <div className={styles.resultRows}>
          {items.map((item) => (
            <article className={styles.resultRow} key={item.id}>
              <ThemeResultContent item={item} />
            </article>
          ))}
        </div>
      ) : showEmpty ? (
        <InlineEmpty title="테마 결과 없음" description="일치하는 테마 결과가 없습니다. 시장 화면에서 관련 종목을 찾아볼 수 있습니다." />
      ) : null}
    </section>
  );
}

function ThemeResultContent({ item, featured }: { item: SearchThemeResult; featured?: boolean }) {
  return (
    <>
      <div className={styles.resultTitle}>
        <KRThemeChip className={styles.themeChip} label={item.name} selected={featured} />
        <KRStatusBadge className={statusClass(item.analysisState)}>{item.analysisState}</KRStatusBadge>
      </div>
      <div className={styles.resultCopy}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <dl className={styles.resultMeta}>
        <div>
          <dt>관련 종목</dt>
          <dd>
            {item.relatedCount}개 · {item.representativeStocks.join(", ")}
          </dd>
        </div>
        <div>
          <dt>최근 공식 정보</dt>
          <dd>{item.recentEvidence}</dd>
        </div>
        <div>
          <dt>아직 확인되지 않은 내용</dt>
          <dd>{item.uncheckedPoint}</dd>
        </div>
        <div>
          <dt>시장 맥락</dt>
          <dd>{item.marketContext}</dd>
        </div>
      </dl>
      <KRCTAGroup actions={[{ href: item.href, label: item.href.includes("changes") ? "달라진 내용 보기" : "시장 종목 보기", variant: "primary" }, { href: "/kr/watchlist?view=default", label: "관심 목록에서 보기" }]} className={styles.cardActions} primaryClassName={styles.primaryAction} />
    </>
  );
}

function EvidenceResultsSection({ items, showEmpty }: { items: SearchEvidenceResult[]; showEmpty: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="evidence-results-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="공식 근거 결과" eyebrowClassName={styles.eyebrow} id="evidence-results-title" title="뉴스 제목이 아니라 공식 출처와 확인 가능한 사실을 봅니다." />
      {items.length > 0 ? (
        <div className={styles.resultRows}>
          {items.map((item) => (
            <article className={styles.resultRow} key={item.id}>
              <EvidenceResultContent item={item} />
            </article>
          ))}
        </div>
      ) : showEmpty ? (
        <InlineEmpty title="공식 근거 결과 없음" description="일치하는 공식 근거가 없습니다. 종목 상세 또는 시장 변화 화면에서 다시 확인할 수 있습니다." />
      ) : null}
    </section>
  );
}

function EvidenceResultContent({ item, featured }: { item: SearchEvidenceResult; featured?: boolean }) {
  return (
    <>
      <div className={styles.resultTitle}>
        <KRInformationBadge className={styles.infoBadge}>{item.type}</KRInformationBadge>
        <KRConfidenceBadge className={statusClass(item.confidence)}>{item.confidence}</KRConfidenceBadge>
        <KRStatusBadge className={statusClass(item.correction)}>{item.correction}</KRStatusBadge>
      </div>
      <div className={styles.resultCopy}>
        <h3>{featured ? `${item.title} · 공식 근거 일치` : item.title}</h3>
        <p>{item.keyFact}</p>
      </div>
      <dl className={styles.resultMeta}>
        <div>
          <dt>공식 출처</dt>
          <dd>{item.source}</dd>
        </div>
        <div>
          <dt>공개 시각</dt>
          <dd>{item.publishedAt}</dd>
        </div>
        <div>
          <dt>관련 종목</dt>
          <dd>{item.relatedStocks.join(", ")}</dd>
        </div>
        <div>
          <dt>관련 기업</dt>
          <dd>{item.relatedCompanies.join(", ")}</dd>
        </div>
      </dl>
      <KRCTAGroup actions={[{ href: item.href, label: "공식 근거 확인하기", variant: "primary" }, { href: "/kr/analysis?id=samsung-semiconductor-001", label: "관련 분석 보기" }]} className={styles.cardActions} primaryClassName={styles.primaryAction} />
    </>
  );
}

function AnalysisResultsSection({ items, showEmpty }: { items: SearchAnalysisResult[]; showEmpty: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="analysis-results-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="분석 결과" eyebrowClassName={styles.eyebrow} id="analysis-results-title" title="기존 분석을 찾고 이어서 볼 위치로 이동합니다." />
      {items.length > 0 ? (
        <div className={styles.analysisRows}>
          {items.map((item) => (
            <article className={styles.analysisRow} key={item.id}>
              <KRStatusBadge className={statusClass(item.status)}>{item.status}</KRStatusBadge>
              <div>
                <h3>{item.title}</h3>
                <p>{item.currentQuestion}</p>
              </div>
              <dl className={styles.resultMeta}>
                <div>
                  <dt>대표 종목</dt>
                  <dd>{item.stock}</dd>
                </div>
                <div>
                  <dt>마지막 수정</dt>
                  <dd>{item.updatedAt}</dd>
                </div>
                <div>
                  <dt>새 공식 근거</dt>
                  <dd>{item.newEvidence}</dd>
                </div>
                <div>
                  <dt>재검토 필요</dt>
                  <dd>{item.reviewRequired}</dd>
                </div>
              </dl>
              <KRCTAGroup actions={[{ href: item.href, label: "분석 이어서 보기", variant: "primary" }, { href: "/kr/changes?view=analysis", label: "달라진 내용 보기" }]} className={styles.cardActions} primaryClassName={styles.primaryAction} />
            </article>
          ))}
        </div>
      ) : showEmpty ? (
        <InlineEmpty title="분석 결과 없음" description="일치하는 기존 분석이 없습니다. 새 분석 생성은 이 화면에서 처리하지 않습니다." />
      ) : null}
    </section>
  );
}

function EmptyResultsSection({ search }: { search: SearchMockResult }) {
  if (!search.isEmpty) return null;

  return (
    <section className={styles.section} aria-labelledby="empty-results-title">
      <KREmptyState
        actions={
          <div className={styles.emptyActions}>
            <Link className={styles.primaryAction} href="/kr/search">
              검색어 다시 확인하기
            </Link>
            <Link href="/kr/search?q=005930">종목 코드로 검색하기</Link>
            <Link href="/kr/market">시장에서 종목 찾기</Link>
            <Link href="/kr/evidence?id=dart-samsung-001">공식 근거에서 확인하기</Link>
          </div>
        }
        className={styles.emptyState}
        description={
          <>
            {search.emptyMessages.overall} {search.emptyMessages.code} {search.emptyMessages.typo}
          </>
        }
        eyebrow="결과 없음"
        title="검색 결과를 찾지 못했습니다."
        titleId="empty-results-title"
      />
    </section>
  );
}

function RecentSearchSection({ search }: { search: SearchMockResult }) {
  return (
    <section className={styles.section} aria-labelledby="recent-search-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="최근 검색 관리" eyebrowClassName={styles.eyebrow} id="recent-search-title" title="최근 검색어는 정적 Mock으로만 표시합니다." description="개별 삭제와 전체 지우기는 실제 저장 없이 화면 상태 후보로만 표현합니다." />
      <div className={styles.recentTerms}>
        {search.recentTerms.map((item) => (
          <article key={item.term}>
            <strong>{item.term}</strong>
            <span>{item.searchedAt}</span>
            <Link href={item.href}>다시 검색</Link>
            <button type="button">삭제</button>
          </article>
        ))}
      </div>
      <button className={styles.clearButton} type="button">
        최근 검색 전체 지우기
      </button>
    </section>
  );
}

function NextActionSection() {
  return (
    <section className={styles.section} aria-labelledby="next-action-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="다음 행동" eyebrowClassName={styles.eyebrow} id="next-action-title" title="Search는 상세 확인 화면으로 연결하고 정보를 반복하지 않습니다." />
      <div className={styles.nextActions}>
        <Link href="/kr/stock/005930">종목 상세로 이동</Link>
        <Link href="/kr/evidence?id=dart-samsung-001">공식 근거 확인</Link>
        <Link href="/kr/analysis?id=samsung-semiconductor-001">기존 분석 보기</Link>
        <Link href="/kr/watchlist?view=default">관심 목록으로 이동</Link>
        <Link href="/kr/watchlist?view=review">확인 필요 관심 대상</Link>
        <Link href="/kr/market">시장 맥락 보기</Link>
        <Link href="/kr/changes?view=latest">변화 비교 보기</Link>
      </div>
    </section>
  );
}

function InlineEmpty({ title, description }: { title: string; description: string }) {
  return <KREmptyState className={styles.inlineEmpty} description={description} eyebrow="부분 결과 없음" title={title} titleId={`${title.replaceAll(" ", "-")}-title`} />;
}

export default async function KoreanSearchPage({ searchParams }: KoreanSearchPageProps) {
  const { q, state } = await searchParams;
  const search = getSearchMock(q, state);
  const showSectionEmpty = !search.isIdle && !search.isEmpty;
  const stockResults =
    isStockResult(search.exactResult) ? search.stocks.filter((item) => item.id !== search.exactResult?.id) : search.stocks;

  return (
    <main className={styles.page}>
      <SearchHero search={search} />
      {search.isIdle ? <RecentContextSection items={search.recentContext} /> : null}
      <AutocompleteSection search={search} />
      <ExactResultSection search={search} />
      <StockResultsSection items={stockResults} showEmpty={showSectionEmpty} />
      {!search.isIdle && !search.isEmpty ? (
        <DensityDetails title="기업·테마 결과 보기">
          <CompanyResultsSection items={search.companies} showEmpty={showSectionEmpty} />
          <ThemeResultsSection items={search.themes} showEmpty={showSectionEmpty} />
        </DensityDetails>
      ) : null}
      {!search.isIdle && !search.isEmpty ? (
        <DensityDetails title="공식 근거와 분석 결과 보기">
          <EvidenceResultsSection items={search.evidence} showEmpty={showSectionEmpty} />
          <AnalysisResultsSection items={search.analyses} showEmpty={showSectionEmpty} />
        </DensityDetails>
      ) : null}
      <EmptyResultsSection search={search} />
      {search.isIdle ? <RecentSearchSection search={search} /> : null}
      {search.isIdle || search.isEmpty ? <NextActionSection /> : null}
    </main>
  );
}
