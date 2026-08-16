"use client";

import styles from "../../page.module.scss";
import type { PairCandidateDto, PairTradeDto } from "./types";

/**
 * 짝꿍매매 — the leader of a theme, and what is still behind it.
 *
 * Its own section rather than a line inside 주도주, because the two lists are
 * drawn from different universes. 주도주 ranks the turnover top of the market,
 * which is where the money went; a 짝꿍 is by definition smaller than the stock
 * it follows, so it is almost never in that ranking. 삼화콘덴서 has never once
 * appeared there and is still the name to watch when 삼성전기 runs.
 *
 * Rows are themes, not leaders. 반도체 with two of its names leading produced
 * the same followers twice when this was keyed on the leader.
 */

function formatChangeRate(changeRate: number) {
  return `${changeRate > 0 ? "+" : ""}${changeRate.toFixed(2)}%`;
}

/**
 * The gap is the whole reading. A wide positive gap is a theme whose leader has
 * moved and whose members have not; a negative one means the follower already
 * ran further, so the trade is being read after the fact rather than before it.
 */
function gapBand(leadGap: number) {
  if (leadGap >= 5) return "wide";
  if (leadGap > 0) return "narrow";

  return "late";
}

function gapLabel(leadGap: number) {
  if (leadGap <= 0) return `이미 ${Math.abs(leadGap).toFixed(1)}%p 앞섬`;

  return `${leadGap.toFixed(1)}%p 남음`;
}

function PairCandidateRow({ candidate }: { candidate: PairCandidateDto }) {
  return (
    <li>
      <b>{formatChangeRate(candidate.changeRateValue)}</b>
      <span>{candidate.name}</span>
      {/* Says this one is big enough to have led on its own today, which changes
          how it reads: it is following less than it is moving alongside. */}
      {candidate.inLeaderBoard ? <mark>주도주</mark> : null}
      <i />
      <small>{candidate.turnover}</small>
    </li>
  );
}

function PairTradeRow({ pair }: { pair: PairTradeDto }) {
  return (
    <details className={styles.pairTrade} open={pair.leadGap > 0}>
      <summary>
        <strong>{pair.theme}</strong>
        <em data-band={gapBand(pair.leadGap)}>{gapLabel(pair.leadGap)}</em>
        <i />
        <span>{pair.leader.name}</span>
        <b>{formatChangeRate(pair.leader.changeRateValue)}</b>
      </summary>
      <div className={styles.pairTradeDetail}>
        <p>
          1등주 <b>{pair.leader.name}</b> 거래대금 {pair.leader.turnover} · 아직 오르지 않은 순으로 {pair.candidates.length}종목
        </p>
        <ol>
          {pair.candidates.map((candidate) => (
            <PairCandidateRow candidate={candidate} key={candidate.symbol} />
          ))}
        </ol>
      </div>
    </details>
  );
}

export function PairTrades({
  emptyMessage,
  label,
  pairs
}: {
  emptyMessage: string;
  label: string;
  pairs: PairTradeDto[];
}) {
  const withRoom = pairs.filter((pair) => pair.leadGap > 0).length;

  return (
    <article className={styles.themeSection}>
      <span>{label}</span>
      <div>
        <h3>
          {pairs.length === 0
            ? "테마가 함께 움직인 흔적을 아직 찾지 못했습니다."
            : <>{pairs.length}개 테마가 함께 움직였고,<br />{withRoom}개는 아직 따라오지 않은 종목이 있습니다.</>}
        </h3>
        <strong>짝꿍 후보 · 1등주와의 간격순</strong>
        <ol>
          {pairs.map((pair) => (
            <li key={pair.id}>
              <PairTradeRow pair={pair} />
            </li>
          ))}
        </ol>
        {pairs.length === 0
          ? <p className={styles.emptyDisclosure}>{emptyMessage}</p>
          : (
            <p className={styles.surgeCandidateNote}>
              같은 테마에서 1등주보다 덜 오른 종목입니다. 오른다는 예측이 아니라 간격이며,
              테마가 함께 움직이는지는 거래대금 유지와 뉴스·공시로 따로 확인해야 합니다.
            </p>
          )}
      </div>
    </article>
  );
}
