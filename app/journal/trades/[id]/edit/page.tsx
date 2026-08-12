import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { currentUserAuthorId, requireCurrentUser } from "../../../../auth/session";
import { tradeJournals } from "../../trade-journals";
import { TradeJournalEditor } from "../../new/TradeJournalEditor";
import styles from "../../new/page.module.scss";

export default async function EditTradeJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/journal/trades");
  const { id } = await params;
  const journal = tradeJournals.find((item) => item.id === id);

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

      <form className={styles.form}>
        <label>
          매매 일자
          <input defaultValue={journal.date} type="date" />
        </label>
        <label>
          손익
          <input defaultValue={journal.result} placeholder="예: +1.8% 또는 -0.6%" />
        </label>
        <label className={styles.full}>
          제목
          <input defaultValue={journal.title} placeholder="복기 제목을 입력하세요" />
        </label>
        <fieldset className={styles.full}>
          <legend>공개 설정</legend>
          <label>
            <input defaultChecked={journal.visibility === "공개"} name="visibility" type="radio" value="public" />
            공개
          </label>
          <label>
            <input defaultChecked={journal.visibility !== "공개"} name="visibility" type="radio" value="private" />
            비공개
          </label>
        </fieldset>
        <TradeJournalEditor initialValues={{
          buy: journal.buy,
          sell: journal.sell,
          good: journal.good,
          bad: journal.bad
        }} />
        <div className={styles.actions}>
          <Link href={`/journal/trades/${journal.id}`}>취소</Link>
          <button type="button">수정 저장</button>
        </div>
      </form>
    </main>
  );
}
