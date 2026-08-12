"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import type { tradeJournals } from "./trade-journals";

type TradeJournal = typeof tradeJournals[number];

const pageSize = 4;

export function TradeJournalInfiniteList({ journals }: { journals: TradeJournal[] }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visibleJournals = journals.slice(0, visibleCount);
  const hasMore = visibleCount < journals.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisibleCount((current) => Math.min(current + pageSize, journals.length));
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, journals.length]);

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
        {hasMore ? "더 불러오는 중" : "마지막 복기입니다"}
      </div>
    </section>
  );
}
