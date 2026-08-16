"use client";

import styles from "../../page.module.scss";
import type { PremarketMoverDto, SurgeCandidateDto } from "./types";

/**
 * 급등 후보 — US stocks that have not moved yet.
 *
 * Every other list on this board is in the past tense: a leader led, a theme
 * rose, a headline broke. This one is the only forward-looking list, and that
 * makes it the only one that can be read as advice. So the probability is not
 * decoration — it is shown at the same size as the ticker, because a row saying
 * "18.7%" is a measurement and the same row without it is a tip.
 *
 * The figures are the previous session's close. Nothing here reacts to today's
 * tape; a candidate that has already run is by construction not in this list.
 */

function formatTurnover(value: number) {
  return `${Math.round(value * 100).toLocaleString("ko-KR")}%`;
}

/**
 * The board prints a $12 stock to the cent and a $0.12 stock to the thousandth,
 * because rounding a sub-dollar name to two places drops the digit its move is
 * happening in.
 *
 * Candidate rows receive this already formatted — the backend holds the rule.
 * The premarket high does not: it is live, so it arrives as a number and is
 * formatted here. Same rule, restated, or a $12 name reads $12.500 one line
 * above a candidate row reading $12.50.
 */
function formatPrice(value: number) {
  return value >= 10 ? `$${value.toFixed(2)}` : `$${value.toFixed(3).replace(/0$/, "")}`;
}

/**
 * Three bands, so the eye can sort the list without reading every number.
 * The break points are where the measured rates actually separate.
 */
function bandOf(probability: number) {
  if (probability >= 0.12) return "high";
  if (probability >= 0.04) return "mid";

  return "low";
}

function SurgeCandidateRow({ candidate }: { candidate: SurgeCandidateDto }) {
  return (
    <details className={styles.surgeCandidate}>
      <summary>
        <b data-band={bandOf(candidate.probability)}>{candidate.probabilityLabel}</b>
        <span>{candidate.symbol}</span>
        <mark data-stage={candidate.stage === "대기" ? "waiting" : "ran"}>{candidate.stage}</mark>
        {/* Only the form number here — the row is scanned, and the sentence
            explaining it is one click away in the detail. */}
        {candidate.catalyst ? <mark data-stage="catalyst">{candidate.catalyst.formType}</mark> : null}
        <i />
        <small>{candidate.price}</small>
        <em>{formatTurnover(candidate.turnoverValue)}</em>
      </summary>
      <div className={styles.surgeCandidateDetail}>
        <p>{candidate.name}</p>
        <ul>
          {candidate.evidence.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <small>{candidate.caution}</small>
      </div>
    </details>
  );
}

/**
 * The watchlist moving right now, shown above the list that named it.
 *
 * Reads as the payoff line for everything below it: these are candidates the
 * board already scored, caught in the session Seoul is awake for. The
 * probability travels with each row so it stays visible that the name was
 * flagged before it moved, not after.
 */
function PremarketStrip({ movers }: { movers: PremarketMoverDto[] }) {
  if (movers.length === 0) return null;

  return (
    <div className={styles.premarketStrip}>
      <strong>{movers[0].phaseLabel} 진행 중 · 감시 종목 {movers.length}개 움직임</strong>
      <ol>
        {movers.map((mover) => (
          <li key={mover.id}>
            <b>+{(mover.highRate * 100).toFixed(0)}%</b>
            <span>{mover.symbol}</span>
            {/* The backend falls back to the ticker when the name is gone —
                which happens when a mover has dropped off the candidate list
                since it was scored. Printing STKH twice says nothing. */}
            {mover.name === mover.symbol ? null : <em>{mover.name}</em>}
            <i />
            {/* Both, because they are usually not the same story. STKH touched
                +185% and was back to +21% by the time this rendered; the peak
                alone reads as a position anybody could still have. */}
            <small>
              고가 {formatPrice(mover.high)} · 현재 {mover.changeRate >= 0 ? "+" : ""}{(mover.changeRate * 100).toFixed(0)}%
            </small>
            {mover.probability === null
              ? null
              : <mark>후보 {(mover.probability * 100).toFixed(1)}%</mark>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SurgeCandidates({
  candidates,
  emptyMessage,
  label,
  movers
}: {
  candidates: SurgeCandidateDto[];
  emptyMessage: string;
  label: string;
  movers: PremarketMoverDto[];
}) {
  const asOf = candidates[0]?.asOf;
  const horizonDays = candidates[0]?.horizonDays ?? 5;
  const waiting = candidates.filter((candidate) => candidate.stage === "대기").length;
  const best = candidates[0]?.probabilityLabel ?? "";

  return (
    <article className={styles.themeSection}>
      <span>{label}</span>
      <div>
        <h3>
          {candidates.length === 0
            ? "급등 후보를 계산할 이력이 아직 없습니다."
            : <>{asOf} 종가 기준 {candidates.length}종목,<br />{waiting === candidates.length ? "모두 아직 오르지 않았습니다" : `${waiting}종목은 아직 오르지 않았습니다`}. 최고 확률 {best}.</>}
        </h3>
        <PremarketStrip movers={movers} />
        <strong>급등 후보 · 실측 확률순</strong>
        <ol>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <SurgeCandidateRow candidate={candidate} />
            </li>
          ))}
        </ol>
        {candidates.length === 0
          ? <p className={styles.emptyDisclosure}>{emptyMessage}</p>
          : (
            <p className={styles.surgeCandidateNote}>
              과거 2년의 같은 조건 종목이 {horizonDays}일 안에 하루 +50% 이상 오른 비율입니다.
              전체 시장 평균은 0.5%입니다. 오른다는 예측이 아니라 빈도입니다.{" "}
              <b>이미 급등</b>은 최근 일주일 안에 오른 종목으로, 확률은 더 높지만 이어지는 움직임입니다.
            </p>
          )}
      </div>
    </article>
  );
}
