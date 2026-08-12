import Link from "next/link";
import { AdSlot, SideAdRails } from "../../_components/AdSlot";
import { SiteHeader } from "../../_components/SiteHeader";
import { getCurrentUser } from "../../auth/session";
import { TradeJournalInfiniteList } from "./TradeJournalInfiniteList";
import { tradeJournals } from "./trade-journals";
import styles from "./page.module.scss";

export default async function TradeJournalPage() {
  const user = await getCurrentUser();

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="매매 복기 좌측 광고" rightLabel="매매 복기 우측 광고" />
      <SiteHeader active="trades" userLabel={user ? user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name : undefined} />

      <section className={styles.hero}>
        <div>
          <span>TRADE JOURNAL</span>
          <h1>유저들이 올린 매매 복기를 모아봅니다.</h1>
          <p>공개로 설정된 매매 복기만 이 페이지에 표시됩니다. 작성할 때 공개 여부를 선택할 수 있습니다.</p>
        </div>
        <Link href="/journal/trades/new">새 매매 복기 작성</Link>
      </section>

      <section className={styles.summaryGrid} aria-label="매매 복기 요약">
        <article>
          <span>공개 일지</span>
          <strong>24건</strong>
        </article>
        <article>
          <span>오늘 업로드</span>
          <strong>5건</strong>
        </article>
        <article>
          <span>많이 본 복기</span>
          <strong>단타 점검</strong>
        </article>
      </section>

      <AdSlot label="매매 복기 목록 상단 광고" />

      <TradeJournalInfiniteList journals={tradeJournals} />
    </main>
  );
}
