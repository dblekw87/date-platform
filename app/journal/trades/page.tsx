import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot, SideAdRails } from "../../_components/AdSlot";
import { SiteHeader } from "../../_components/SiteHeader";
import { getCurrentUser } from "../../auth/session";
import { TradeJournalInfiniteList } from "./TradeJournalInfiniteList";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "매매 복기"
};

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

      <AdSlot label="매매 복기 목록 상단 광고" />

      <TradeJournalInfiniteList />
    </main>
  );
}
