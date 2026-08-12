import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { requireCurrentUser } from "../../../auth/session";
import { TradeJournalForm } from "./TradeJournalForm";
import styles from "./page.module.scss";

export default async function NewTradeJournalPage() {
  const user = await requireCurrentUser("/journal/trades/new");

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="매매 복기 글쓰기 좌측 광고" rightLabel="매매 복기 글쓰기 우측 광고" />
      <SiteHeader active="trades" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />

      <section className={styles.hero}>
        <span>TRADE JOURNAL</span>
        <h1>매매 복기</h1>
        <p>매매 일자, 손익, 매수한 점, 매도한 점, 잘한 점, 못한 점을 기록합니다.</p>
      </section>

      <AdSlot label="매매 복기 글쓰기 상단 광고" />

      <TradeJournalForm />
    </main>
  );
}
