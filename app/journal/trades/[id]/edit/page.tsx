import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { requireCurrentUser } from "../../../../auth/session";
import { fetchBackendJson } from "../../../../_lib/backend";
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
  is_owner: boolean;
};

function fromBackendJournal(item: BackendTradeJournal) {
  return {
    id: item.id,
    date: item.trade_date?.slice(0, 10) ?? "",
    symbol: "",
    name: "",
    title: item.title,
    visibility: item.visibility === "public" ? "공개" : "비공개",
    author: item.author_id,
    result: item.result,
    buy: item.buy_html,
    sell: item.sell_html,
    good: item.good_html,
    bad: item.bad_html
  };
}

export default async function EditTradeJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/journal/trades");
  const { id } = await params;
  const item = await fetchBackendJson<BackendTradeJournal>(`/api/trade-journals/${id}`);

  // is_owner is computed from the viewer's row, so the frontend does not rebuild an author id.
  if (!item?.is_owner) notFound();

  const journal = fromBackendJournal(item);

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
