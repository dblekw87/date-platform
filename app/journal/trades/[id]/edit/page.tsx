import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { currentUserAuthorId, requireCurrentUser } from "../../../../auth/session";
import { fetchBackendJson } from "../../../../_lib/backend";
import { tradeJournals } from "../../trade-journals";
import { TradeJournalForm } from "../../new/TradeJournalForm";
import styles from "../../new/page.module.scss";

type BackendTradeJournal = {
  id: string;
  trade_date: string;
  title: string;
  result: string;
  visibility: "public" | "private";
  buy_html: string;
  sell_html: string;
  good_html: string;
  bad_html: string;
  author_id: string;
};

function fromBackendJournal(journal: BackendTradeJournal) {
  return {
    id: journal.id,
    date: journal.trade_date,
    symbol: "",
    name: "",
    title: journal.title,
    visibility: journal.visibility === "public" ? "공개" : "비공개",
    author: journal.author_id,
    result: journal.result,
    buy: journal.buy_html,
    sell: journal.sell_html,
    good: journal.good_html,
    bad: journal.bad_html
  };
}

export default async function EditTradeJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/journal/trades");
  const { id } = await params;
  const journal = tradeJournals.find((item) => item.id === id) ?? (
    await fetchBackendJson<BackendTradeJournal>(`/api/trade-journals/${id}`).then((item) => item ? fromBackendJournal(item) : null)
  );

  if (!journal || currentUserAuthorId(user) !== journal.author) notFound();

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="매매 복기 수정 좌측 광고" rightLabel="매매 복기 수정 우측 광고" />
      <SiteHeader active="trades" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />

      <section className={styles.hero}>
        <span>TRADE JOURNAL</span>
        <h1>매매 복기 수정</h1>
        <p>매매 일자, 손익, 매수한 점, 매도한 점, 잘한 점, 못한 점을 수정합니다.</p>
      </section>

      <AdSlot label="매매 복기 수정 상단 광고" />

      <TradeJournalForm initialJournal={journal} />
    </main>
  );
}
