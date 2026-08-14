"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TradeJournalEditor } from "./TradeJournalEditor";
import styles from "./page.module.scss";

type TradeJournalFormProps = {
  initialJournal?: {
    id: string;
    date: string;
    buyTime?: string;
    sellTime?: string;
    title: string;
    result: string;
    visibility: string;
    buy: string;
    sell: string;
    good: string;
    bad: string;
  };
};

function editorHtml(sectionId: string) {
  return document.querySelector<HTMLElement>(`[data-section-id="${sectionId}"]`)?.innerHTML.trim() ?? "";
}

export function TradeJournalForm({ initialJournal }: TradeJournalFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function saveJournal(formData: FormData) {
    const tradeDate = String(formData.get("tradeDate") ?? "").trim();
    const buyTime = String(formData.get("buyTime") ?? "").trim();
    const sellTime = String(formData.get("sellTime") ?? "").trim();
    const result = String(formData.get("result") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const visibility = String(formData.get("visibility") ?? "public");
    const buyHtml = editorHtml("buy");
    const sellHtml = editorHtml("sell");
    const goodHtml = editorHtml("good");
    const badHtml = editorHtml("bad");

    if (!tradeDate || !result || !title || !buyHtml || !sellHtml || !goodHtml || !badHtml) {
      alert("매매 일자, 손익, 제목, 복기 내용을 모두 입력해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(initialJournal ? `/api/backend/trade-journals/${initialJournal.id}` : "/api/backend/trade-journals", {
        method: initialJournal ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tradeDate,
          buyTime,
          sellTime,
          result,
          title,
          visibility,
          buyHtml,
          sellHtml,
          goodHtml,
          badHtml
        })
      });

      if (!response.ok) {
        throw new Error("save failed");
      }

      const saved = await response.json() as { id: string };

      router.push(`/journal/trades/${saved.id}`);
      router.refresh();
    } catch {
      alert("백엔드 저장에 실패했습니다. 백엔드 서버와 DB 연결을 확인해주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className={styles.form} action={saveJournal}>
      <label>
        매매 일자
        <input name="tradeDate" defaultValue={initialJournal?.date} type="date" />
      </label>
      <label>
        손익
        <input name="result" defaultValue={initialJournal?.result} placeholder="예: +1.8% 또는 -0.6%" />
      </label>
      <div className={styles.timeStack}>
        <label>
          매수 시각
          <input name="buyTime" defaultValue={initialJournal?.buyTime} type="time" />
        </label>
        <label>
          매도 시각
          <input name="sellTime" defaultValue={initialJournal?.sellTime} type="time" />
        </label>
        <small>기억나는 대로 적어두면 그 시각의 시황·뉴스와 함께 복기할 수 있습니다. 비워두어도 저장됩니다.</small>
      </div>
      <label className={styles.full}>
        제목
        <input name="title" defaultValue={initialJournal?.title} placeholder="복기 제목을 입력하세요" />
      </label>
      <fieldset className={styles.full}>
        <legend>공개 설정</legend>
        <label>
          <input defaultChecked={(initialJournal?.visibility ?? "공개") === "공개"} name="visibility" type="radio" value="public" />
          공개
        </label>
        <label>
          <input defaultChecked={initialJournal?.visibility === "비공개"} name="visibility" type="radio" value="private" />
          비공개
        </label>
      </fieldset>
      <TradeJournalEditor initialValues={initialJournal ? {
        buy: initialJournal.buy,
        sell: initialJournal.sell,
        good: initialJournal.good,
        bad: initialJournal.bad
      } : {}} />
      <div className={styles.actions}>
        <Link href={initialJournal ? `/journal/trades/${initialJournal.id}` : "/journal/trades"}>취소</Link>
        <button type="submit" disabled={isSaving}>{isSaving ? "저장 중" : initialJournal ? "수정 저장" : "매매 복기 저장"}</button>
      </div>
    </form>
  );
}
