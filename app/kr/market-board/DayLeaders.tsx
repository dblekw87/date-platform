"use client";

import styles from "../../page.module.scss";
import type { DayLeaderDto, DayLeaderReasonDto } from "./types";

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

/**
 * One reason, with the path that makes it this stock's.
 *
 * The path label is doing the work the old 고유/공유 badge could not. "보유 지분"
 * and "전방 수요" both mean somebody else's event moved this stock, and they
 * mean it for completely different reasons — one is a balance sheet, the other
 * is a customer. A reader who knows which can check the right thing.
 *
 * Only reasons read off a document link out. A regime reason has no original to
 * open, so it stays a plain block rather than a link that goes nowhere.
 */
function ReasonBlock({ reason }: { reason: DayLeaderReasonDto }) {
  const body = (
    <>
      <p>
        <mark>{reason.path}</mark>
        <b className={styles.dayLeaderReasonTitle}>{reason.title}</b>
        <i className={styles.dayLeaderReasonScore}>근거 {reason.confidence}</i>
      </p>
      <span className={styles.dayLeaderReasonBar}>
        <i className={styles.dayLeaderReasonBarFill} style={{ width: `${Math.min(reason.confidence, 100)}%` }} />
      </span>
      <ul>
        {reason.evidence.filter(Boolean).map((line) => <li key={line}>{line}</li>)}
      </ul>
    </>
  );

  if (!reason.originalUrl) {
    return <div className={styles.dayLeaderReason} data-kind={reason.kind === "공유" ? "shared" : "own"}>{body}</div>;
  }

  return (
    <a
      className={styles.dayLeaderReason}
      data-kind={reason.kind === "공유" ? "shared" : "own"}
      href={reason.originalUrl}
      rel="noreferrer"
      target="_blank"
    >
      {body}
    </a>
  );
}

/**
 * The reasons behind one leader, or an honest blank.
 *
 * The older single catalyst still renders as a fallback: a board restored from
 * a snapshot written before reasons existed carries one and nothing else.
 */
function DayLeaderReasons({ leader }: { leader: DayLeaderDto }) {
  if (leader.reasons && leader.reasons.length > 0) {
    return (
      <div className={styles.dayLeaderReasons}>
        {leader.reasons.map((reason) => <ReasonBlock key={reason.id} reason={reason} />)}
      </div>
    );
  }

  if (leader.catalyst) {
    return (
      <a
        className={styles.dayLeaderCatalyst}
        data-kind={leader.catalyst.kind === "공유" ? "shared" : "own"}
        href={leader.catalyst.originalUrl}
        rel="noreferrer"
        target="_blank"
      >
        <mark>{leader.catalyst.kind === "공유" ? "업종 공유 재료" : "종목 고유 재료"}</mark>
        <b>{leader.catalyst.label}</b>
        <span>{leader.catalyst.headline}</span>
      </a>
    );
  }

  return <p className={styles.dayLeaderNoCatalyst}>오른 이유를 설명하는 근거를 찾지 못했습니다.</p>;
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
        <DayLeaderReasons leader={leader} />
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
