"use client";

import styles from "../../page.module.scss";
import type { DayLeaderDto } from "./types";

/**
 * 주도주 — the day's concentration, shown apart from 강세 테마.
 *
 * The two answer different questions and a trader acts on them differently. A
 * theme says a group is moving, so the 2등주 behind the leader is the trade. A
 * leader says money went to one name, and it may have gone there for a reason
 * nothing else shares — a buyback, an earnings beat — in which case there is no
 * 짝꿍 to buy. Each row states which case it is rather than leaving the reader
 * to assume a follower exists.
 */

function toneOf(changeRate: number) {
  if (changeRate > 0) return "up";
  if (changeRate < 0) return "down";

  return "flat";
}

function formatChangeRate(changeRate: number) {
  return `${changeRate > 0 ? "+" : ""}${changeRate.toFixed(2)}%`;
}

function DayLeaderRow({ leader }: { leader: DayLeaderDto }) {
  return (
    <details className={styles.dayLeader}>
      <summary>
        <em>{leader.rank}</em>
        <span>{leader.name}</span>
        <i />
        <small>{leader.theme}</small>
        <b data-tone={toneOf(leader.changeRateValue)}>{formatChangeRate(leader.changeRateValue)}</b>
      </summary>
      <div className={styles.dayLeaderDetail}>
        <p>
          <mark data-pairing={leader.pairTrade === "테마 주도" ? "theme" : "solo"}>{leader.pairTrade}</mark>
          <mark data-kind="true">{leader.kind}</mark>
          {leader.pairTrade === "테마 주도" ? <span>같은 테마 동반 {leader.peerCount}종목</span> : <span>같은 테마에서 함께 오른 종목 없음</span>}
        </p>
        <ul>
          {leader.evidence.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <small>{leader.caution}</small>
      </div>
    </details>
  );
}

export function DayLeaders({
  emptyMessage,
  label,
  leaders
}: {
  emptyMessage: string;
  label: string;
  leaders: DayLeaderDto[];
}) {
  const themeLed = leaders.filter((leader) => leader.pairTrade === "테마 주도").length;

  return (
    <article className={styles.themeSection}>
      <span>{label}</span>
      <div>
        <h3>
          {leaders.length === 0
            ? "오늘 거래대금이 쏠린 종목을 아직 찾지 못했습니다."
            : <>거래대금이 쏠린 {leaders.length}종목 중<br />{themeLed}종목은 테마가 함께 움직였습니다.</>}
        </h3>
        <strong>주도주 · 거래대금 쏠림순</strong>
        <ol>
          {leaders.map((leader) => (
            <li key={leader.id}>
              <DayLeaderRow leader={leader} />
            </li>
          ))}
        </ol>
        {leaders.length === 0 ? <p className={styles.emptyDisclosure}>{emptyMessage}</p> : null}
      </div>
    </article>
  );
}
