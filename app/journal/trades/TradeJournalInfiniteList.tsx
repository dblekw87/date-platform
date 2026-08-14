"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
};

type BackendTradeJournalPage = {
  items?: BackendTradeJournal[];
  nextCursor?: string | null;
};

type TradeJournalCard = {
  id: string;
  date: string;
  title: string;
  visibility: string;
  author: string;
  result: string;
  buy: string;
  sell: string;
  good: string;
  bad: string;
};

const pageSize = 8;

// Card previews show plain text, so the stored rich text is flattened here.
function toPreviewText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function fromBackendJournal(journal: BackendTradeJournal): TradeJournalCard {
  return {
    id: journal.id,
    date: journal.trade_date?.slice(0, 10) ?? "",
    title: journal.title,
    visibility: journal.visibility === "public" ? "공개" : "비공개",
    author: journal.nickname || journal.author_id,
    result: journal.result,
    buy: toPreviewText(journal.buy_html),
    sell: toPreviewText(journal.sell_html),
    good: toPreviewText(journal.good_html),
    bad: toPreviewText(journal.bad_html)
  };
}

export function TradeJournalInfiniteList() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [journals, setJournals] = useState<TradeJournalCard[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  const loadPage = useCallback(async (cursor?: string | null, replace = false) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({ limit: String(pageSize) });

      if (cursor) params.set("cursor", cursor);

      const response = await fetch(`/api/backend/trade-journals?${params.toString()}`, {
        cache: "no-store"
      });

      if (!response.ok) throw new Error(`backend ${response.status}`);

      const data = await response.json() as BackendTradeJournalPage;
      const items = (data.items ?? []).map(fromBackendJournal);

      setHasFailed(false);
      setJournals((current) => replace ? items : [...current, ...items]);
      setNextCursor(data.nextCursor ?? null);
    } catch {
      setHasFailed(true);
      if (replace) {
        setJournals([]);
        setNextCursor(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Deferred so the loading flag is not set during the effect itself.
    queueMicrotask(() => {
      void loadPage(null, true);
    });
  }, [loadPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !nextCursor) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !isLoading) {
        void loadPage(nextCursor);
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLoading, loadPage, nextCursor]);

  function statusMessage() {
    if (isLoading) return "불러오는 중";
    if (hasFailed) return "복기를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
    if (journals.length === 0) return "아직 공개된 복기가 없습니다. 첫 복기를 남겨보세요.";
    if (nextCursor) return "더 불러오는 중";

    return "마지막 복기입니다";
  }

  return (
    <section className={styles.list} aria-label="유저 매매 복기 목록">
      {journals.map((journal) => (
        <Link className={styles.cardLink} href={`/journal/trades/${journal.id}`} key={journal.id}>
          <header>
            <div>
              <time>{journal.date}</time>
              <h2>{journal.title}</h2>
              <p>{journal.author}</p>
            </div>
            <strong data-loss={journal.result.startsWith("-") ? "true" : undefined}>{journal.result}</strong>
          </header>
          <span className={styles.visibility}>{journal.visibility}</span>
          <dl>
            <div>
              <dt>매수한 점</dt>
              <dd>{journal.buy}</dd>
            </div>
            <div>
              <dt>매도한 점</dt>
              <dd>{journal.sell}</dd>
            </div>
            <div>
              <dt>잘한 점</dt>
              <dd>{journal.good}</dd>
            </div>
            <div>
              <dt>못한 점</dt>
              <dd>{journal.bad}</dd>
            </div>
          </dl>
        </Link>
      ))}
      <div className={styles.scrollSentinel} ref={sentinelRef} aria-live="polite">
        {statusMessage()}
      </div>
    </section>
  );
}
