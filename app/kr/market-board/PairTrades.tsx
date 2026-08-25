"use client";

import styles from "../../page.module.scss";
import type { PairCandidateDto, PairTradeDto } from "./types";

/**
 * 함께 움직인 테마와 그 안에서 오른 종목들.
 *
 * 이 패널은 "1등주보다 덜 오른 종목이 따라온다"고 말하고 있었습니다. 186,726쌍을
 * 396개 장에 걸쳐 재보니 그 문장은 성립하지 않습니다.
 *
 *   뒤처진 종목 하루 보유   +0.046%p   1등주 자신 +0.158%p보다도 못함
 *   leadGap 0~3 / 3~7 / 7~15 / 15+%p   -0.009 / +0.002 / +0.015 / -0.042%p
 *   leadGap 음수 (이미 앞섬)  +1.161%p  이 패널이 맨 뒤로 보내던 것
 *
 * 간격은 기회의 크기가 아니었고, 오히려 맨 뒤로 보내던 쪽이 유일하게 값이 있었습니다.
 *
 * 살아남은 것은 테마 자체입니다. 1등주가 달린 테마의 상승 멤버는 익일 갭이
 * +0.460%p로, 그날 오르기만 한 아무 종목(+0.073%p)의 여섯 배입니다. 그래서 이제
 * 이 패널이 말하는 것은 "따라올 종목"이 아니라 "오늘 함께 움직인 테마와 그 멤버"이고,
 * 순서는 1등주와의 거리가 아니라 각자가 얼마나 움직였는지를 따릅니다.
 *
 * 그리고 그 +0.460%p는 하룻밤짜리입니다. 다음 날 장중에 -0.271%p를 돌려주므로,
 * 하루를 들고 있으면 +0.046%p만 남습니다. 익일 시가 매도를 전제로 읽어야 합니다.
 *
 * 행이 테마 단위인 것은 그대로입니다. 1등주로 키를 잡으면 반도체처럼 두 종목이
 * 동시에 주도한 테마가 같은 멤버를 두 번 내놓습니다.
 */

function formatChangeRate(changeRate: number) {
  return `${changeRate > 0 ? "+" : ""}${changeRate.toFixed(2)}%`;
}

/**
 * 1등주와의 거리. 읽을 값이지 기회의 크기가 아닙니다 — 간격 구간별로 익일 갭이
 * 정렬되지 않았고, 앞선 쪽이 오히려 가장 좋았습니다.
 */
function gapLabel(leadGap: number) {
  if (leadGap <= 0) return `1등주보다 ${Math.abs(leadGap).toFixed(1)}%p 앞섬`;

  return `1등주보다 ${leadGap.toFixed(1)}%p 뒤`;
}

/**
 * 테마 자체가 움직였는가.
 *
 * 아래 목록은 오른 종목만 걸러 놓은 것이라, 그것만 보면 어떤 테마든 움직인 것처럼
 * 읽힙니다. 중앙값은 하락한 멤버까지 세므로 "한 종목만 갔다"를 드러냅니다 —
 * SI(시스템통합)에서 비트플래닛 혼자 +30%였던 날 중앙값은 +0.79%였습니다.
 *
 * 거르지는 않습니다. 270,638 종목-날 실측에서 거의 안 오른 멤버도 익일 시가 갭이
 * +0.210%p(대조군 +0.089%p)라 빼야 할 근거가 없습니다. 말해 줄 근거만 있습니다.
 */
function ThemeMoveNote({ breadth, move }: { breadth?: number | null; move?: number | null }) {
  if (move === null || move === undefined) return null;

  /*
   * 상승 red · 하락 blue · 보합 gray. 여기서 "보합"은 0이 아니라 **1% 미만**입니다 —
   * 이 값이 답하는 질문은 "테마가 움직였나"이고, +0.59%는 안 움직인 것입니다.
   * 그것까지 빨강으로 칠하면 카드가 또 오른 것처럼 읽힙니다.
   *
   * 마이너스는 회색이 아니라 파랑입니다. 2026-08-25 2차전지가 중앙값 -0.28%인데
   * 나노팀·이노메트리는 20%씩 갔습니다. 테마가 내렸다는 건 안 움직인 것과 다른
   * 사실이고, 그 차이가 이 값을 넣은 이유입니다.
   */
  const tone = move < 0 ? "down" : move < 1 ? "flat" : "up";

  return (
    <em className={styles.pairThemeMove} data-tone={tone}>
      테마 중앙값 {formatChangeRate(move)}
      {breadth ? ` · ${breadth}종목` : ""}
    </em>
  );
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
    <details className={styles.pairTrade} open>
      <summary>
        <strong>{pair.theme}</strong>
        <em>{gapLabel(pair.leadGap)}</em>
        <i />
        <span>{pair.leader.name}</span>
        <b>{formatChangeRate(pair.leader.changeRateValue)}</b>
      </summary>
      <div className={styles.pairTradeDetail}>
        <p>
          1등주 <b>{pair.leader.name}</b> 거래대금 {pair.leader.turnover} · 함께 오른 {pair.candidates.length}종목
          <ThemeMoveNote breadth={pair.themeBreadth} move={pair.themeMove} />
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
  emptyMessage = "",
  label,
  pairs
}: {
  // Optional because a panel that is only mounted when it has rows never shows
  // an empty state.
  emptyMessage?: string;
  label: string;
  pairs: PairTradeDto[];
}) {
  const members = pairs.reduce((total, pair) => total + pair.candidates.length, 0);

  return (
    <article className={styles.themeSection}>
      <span>{label}</span>
      <div>
        <h3>
          {pairs.length === 0
            ? "테마가 함께 움직인 흔적을 아직 찾지 못했습니다."
            : <>{pairs.length}개 테마가 함께 움직였고,<br />그 안에서 {members}종목이 같이 올랐습니다.</>}
        </h3>
        <strong>함께 움직인 테마 · 많이 오른 순</strong>
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
              1등주가 달린 테마의 상승 멤버입니다. 실측으로는 이 자리의 익일 시가 갭이
              시장 평균보다 <b>+0.46%p</b>였고, 그날 오르기만 한 종목(+0.07%p)의 여섯 배입니다.
              다만 <b>다음 날 장중에 −0.27%p를 되돌려</b> 하루를 들고 있으면 +0.05%p만 남으므로,
              익일 시가 매도를 전제로 읽어야 합니다. 186,726쌍·396개 장 기준이며,
              1등주와의 간격은 크기가 클수록 좋다는 관계가 나오지 않아 정렬에서 뺐습니다.
            </p>
          )}
      </div>
    </article>
  );
}
