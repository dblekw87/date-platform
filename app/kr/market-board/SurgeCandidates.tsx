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
/**
 * 실측으로 갈린 두 조건을 한 칸에.
 *
 * 2024-08~2026-08 1,503건. 정규장 첫 봉 시가에 사서 30분 뒤 종가, 전부 중앙값입니다.
 *
 *   프리 50~100%  +21.2%     프리 150~300%  −3.1%
 *   프리 100~150% +12.7%     프리 300%↑     −5.7%
 *
 * 많이 오를수록 나빠집니다 — 프리마켓에서 다 가버려 정규장에 남은 것이 없습니다.
 * 그래서 50~150%를 "남아 있는 구간"으로 봅니다.
 *
 * 첫 5분봉이 그 다음을 가릅니다. 프리 150~300%에서 양봉이면 30분 종가 +3.7%에
 * 승률 56%, 음봉이면 −9.8%에 33%였습니다.
 *
 * 아직 모르는 것(개장 전·봉 형성 중)과 아닌 것(음봉)을 다른 말로 적습니다. 같이
 * 비워 두면 읽는 쪽이 둘을 구분할 수 없습니다.
 */
function OpenSignal({ mover }: { mover: PremarketMoverDto }) {
  const pre = mover.preGain === null ? null : mover.preGain * 100;
  const inBand = pre !== null && pre >= 50 && pre <= 150;
  const label = {
    before: "개장 전",
    forming: "첫 봉 형성 중",
    green: "첫 5분 양봉",
    red: "첫 5분 음봉",
    unknown: ""
  }[mover.openBarState];

  if (pre === null && !label) return null;

  return (
    <span className={styles.openSignal} data-hit={inBand && mover.openBarState === "green" ? "true" : undefined}>
      {pre === null ? null : <b data-band={inBand ? "true" : undefined}>프리 {pre >= 0 ? "+" : ""}{pre.toFixed(0)}%</b>}
      {label ? <i data-bar={mover.openBarState}>{label}</i> : null}
    </span>
  );
}

function PremarketStrip({ movers }: { movers: PremarketMoverDto[] }) {
  if (movers.length === 0) return null;

  return (
    <div className={styles.premarketStrip}>
      <strong>
        {movers[0].phaseLabel} 진행 중 · 감시 종목 {movers.length}개 움직임
        {(() => {
          const hits = movers.filter((mover) =>
            mover.preGain !== null && mover.preGain * 100 >= 50 && mover.preGain * 100 <= 150
            && mover.openBarState === "green").length;

          return hits === 0 ? null : <mark className={styles.openSignalCount}>조건 {hits}건</mark>;
        })()}
      </strong>
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
            <OpenSignal mover={mover} />
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
