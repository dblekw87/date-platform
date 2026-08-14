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

/**
 * Accepts the digits of a 24-hour time as they are typed, refusing any that
 * could not belong to a real time. There is no 25th hour, so the field never
 * holds one in the first place rather than failing at save.
 *
 * A leading digit above 2 is shorthand: typing 9 means 09, since no hour starts
 * with 3 or more.
 */
function acceptTimeDigits(raw: string) {
  let digits = "";

  for (const character of raw.replace(/\D/g, "")) {
    const next = digits + character;

    if (next.length === 1) {
      digits = Number(character) > 2 ? `0${character}` : character;
      continue;
    }

    // Hours run 00 to 24; minutes 00 to 59; and 24 only ever means 24:00.
    if (next.length === 2 && Number(next) > 24) continue;
    if (next.length === 3 && (Number(character) > 5 || (digits.startsWith("24") && character !== "0"))) continue;
    if (next.length === 4 && digits.startsWith("24") && character !== "0") continue;
    if (next.length > 4) break;

    digits = next;
  }

  return digits;
}

// A plain text field rather than type="time": the native picker forces a
// 오전/오후 control in Korean locales, and a trading log is quicker to fill in
// by typing 0915 straight through. The colon is inserted as the digits arrive.
function formatTimeInput(event: React.FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const digits = acceptTimeDigits(input.value);

  input.value = digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
}

function isCompleteTime(value: string) {
  return /^(([01]\d|2[0-3]):[0-5]\d|24:00)$/.test(value);
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

    // An incomplete entry such as 09:1 gets past the input mask.
    if (buyTime && !isCompleteTime(buyTime)) {
      alert("매수 시각을 24시간제 HH:MM으로 끝까지 입력하거나 비워주세요.");
      return;
    }

    if (sellTime && !isCompleteTime(sellTime)) {
      alert("매도 시각을 24시간제 HH:MM으로 끝까지 입력하거나 비워주세요.");
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

      // A rejected field is the author's problem to fix, not a server outage.
      if (response.status === 400) {
        const problem = await response.json() as { message?: string; details?: { field?: string } };

        alert(`입력을 확인해주세요.${problem.details?.field ? ` (${problem.details.field})` : ""}`);
        return;
      }

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
          <input
            name="buyTime"
            defaultValue={initialJournal?.buyTime}
            inputMode="numeric"
            maxLength={5}
            onInput={formatTimeInput}
          />
        </label>
        <label>
          매도 시각
          <input
            name="sellTime"
            defaultValue={initialJournal?.sellTime}
            inputMode="numeric"
            maxLength={5}
            onInput={formatTimeInput}
          />
        </label>
        <small>한 종목을 기록할 때만 채우세요. 여러 종목을 함께 적는 복기라면 비워둡니다. 24시간제이고, 숫자만 눌러도 콜론이 붙습니다.</small>
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
