"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import type { tradeJournals } from "./trade-journals";

type TradeJournal = typeof tradeJournals[number];
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

type BackendTradeJournalPage = {
  items?: BackendTradeJournal[];
  nextCursor?: string | null;
};

const pageSize = 4;

function fromBackendJournal(journal: BackendTradeJournal): TradeJournal {
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

export function TradeJournalInfiniteList({ journals }: { journals: TradeJournal[] }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loadedJournals, setLoadedJournals] = useState<TradeJournal[]>(journals);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [usesBackend, setUsesBackend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const visibleJournals = usesBackend ? loadedJournals : loadedJournals.slice(0, visibleCount);
  const hasMore = usesBackend ? Boolean(nextCursor) : visibleCount < loadedJournals.length;

  const loadBackendPage = useCallback(async (cursor?: string | null, replace = false) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        limit: String(pageSize)
      });

      if (cursor) params.set("cursor", cursor);

      const response = await fetch(`/api/backend/trade-journals?${params.toString()}`, {
        cache: "no-store"
      });

      if (!response.ok) return;

      const data = await response.json() as BackendTradeJournalPage;
      const items = (data.items ?? []).map(fromBackendJournal);

      if (items.length === 0 && replace) {
        setUsesBackend(false);
        setLoadedJournals(journals);
        setNextCursor(null);
        return;
      }

      if (items.length > 0 || data.nextCursor) {
        setUsesBackend(true);
        setLoadedJournals((current) => replace ? items : [...current, ...items]);
        setNextCursor(data.nextCursor ?? null);
      }
    } catch {
      if (replace) {
        setUsesBackend(false);
        setLoadedJournals(journals);
        setNextCursor(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [journals]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadBackendPage(null, true);
    });
  }, [loadBackendPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (usesBackend) {
          if (!isLoading && nextCursor) void loadBackendPage(nextCursor);
          return;
        }

        setVisibleCount((current) => Math.min(current + pageSize, loadedJournals.length));
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadBackendPage, loadedJournals.length, nextCursor, usesBackend]);

  return (
    <section className={styles.list} aria-label="유저 매매 복기 목록">
      {visibleJournals.map((journal) => (
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
        {isLoading ? "불러오는 중" : hasMore ? "더 불러오는 중" : "마지막 복기입니다"}
      </div>
    </section>
  );
}
