import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { requireCurrentUser } from "../../../auth/session";
import { TradeJournalEditor } from "./TradeJournalEditor";
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

      <form className={styles.form}>
        <label>
          매매 일자
          <input type="date" />
        </label>
        <label>
          손익
          <input placeholder="예: +1.8% 또는 -0.6%" />
        </label>
        <label className={styles.full}>
          제목
          <input placeholder="복기 제목을 입력하세요" />
        </label>
        <fieldset className={styles.full}>
          <legend>공개 설정</legend>
          <label>
            <input defaultChecked name="visibility" type="radio" value="public" />
            공개
          </label>
          <label>
            <input name="visibility" type="radio" value="private" />
            비공개
          </label>
        </fieldset>
        <TradeJournalEditor />
        <div className={styles.actions}>
          <button type="button">임시 저장</button>
          <button type="button">매매 복기 저장</button>
        </div>
      </form>
    </main>
  );
}
