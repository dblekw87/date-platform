import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { currentUserAuthorId, getCurrentUser } from "../../../auth/session";
import { tradeJournals } from "../trade-journals";
import styles from "./page.module.scss";

export default async function TradeJournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  const journal = tradeJournals.find((item) => item.id === id);

  if (!journal) notFound();

  const canEdit = user ? currentUserAuthorId(user) === journal.author : false;

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
            <p>{journal.buy}</p>
          </article>
          <article>
            <h2>매도한 점</h2>
            <p>{journal.sell}</p>
          </article>
          <article>
            <h2>잘한 점</h2>
            <p>{journal.good}</p>
          </article>
          <article>
            <h2>못한 점</h2>
            <p>{journal.bad}</p>
          </article>
        </section>
      </article>

      <AdSlot label="매매 복기 상세 하단 광고" />
    </main>
  );
}
