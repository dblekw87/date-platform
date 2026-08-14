import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { getCurrentUser } from "../../../auth/session";
import { fetchBackendJson } from "../../../_lib/backend";
import styles from "./page.module.scss";

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
  nickname?: string | null;
  is_owner: boolean;
};

function fromBackendJournal(item: BackendTradeJournal) {
  return {
    id: item.id,
    date: item.trade_date?.slice(0, 10) ?? "",
    title: item.title,
    visibility: item.visibility === "public" ? "공개" : "비공개",
    author: item.nickname || item.author_id,
    result: item.result,
    buy: item.buy_html,
    sell: item.sell_html,
    good: item.good_html,
    bad: item.bad_html,
    canEdit: item.is_owner
  };
}

export default async function TradeJournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  const item = await fetchBackendJson<BackendTradeJournal>(`/api/trade-journals/${id}`);

  if (!item) notFound();

  const journal = fromBackendJournal(item);
  const canEdit = journal.canEdit;

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="매매 복기 상세 좌측 광고" rightLabel="매매 복기 상세 우측 광고" />
      <SiteHeader active="trades" userLabel={user ? user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name : undefined} />

      <article className={styles.detail}>
        <div className={styles.detailActions}>
          <Link href="/journal/trades">매매 복기 목록</Link>
          {canEdit ? <Link href={`/journal/trades/${journal.id}/edit`}>수정</Link> : null}
        </div>
        <header>
          <span>{journal.visibility}</span>
          <h1>{journal.title}</h1>
          <p>{journal.author}</p>
          <time>{journal.date}</time>
          <strong data-loss={journal.result.startsWith("-") ? "true" : undefined}>{journal.result}</strong>
        </header>

        <section className={styles.contentGrid}>
          <article>
            <h2>매수한 점</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.buy }} />
          </article>
          <article>
            <h2>매도한 점</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.sell }} />
          </article>
          <article>
            <h2>잘한 점</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.good }} />
          </article>
          <article>
            <h2>못한 점</h2>
            <div dangerouslySetInnerHTML={{ __html: journal.bad }} />
          </article>
        </section>
      </article>

      <AdSlot label="매매 복기 상세 하단 광고" />
    </main>
  );
}
