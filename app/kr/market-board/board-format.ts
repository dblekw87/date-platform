/**
 * 값을 사람이 읽는 글자로.
 *
 * 날짜·시각·부호·색조처럼 어느 화면에서나 같은 방식으로 보여야 하는 것들입니다.
 * 판단이 들어가지 않습니다 -- 무엇을 보여줄지는 부르는 쪽이 정하고 여기서는
 * 모양만 만듭니다.
 */

import type { MarketBoardData } from "./types";

/**
 * 등급이 같은 행을 한 덩어리로 묶습니다.
 *
 * 성적은 종목이 아니라 등급에 붙는 값이라, 행마다 적으면 같은 문장이 후보 수만큼
 * 반복됩니다 -- 화면에 뜬 세 종목이 모두 소형이면 똑같은 줄이 세 번 나오고,
 * 정작 종목마다 다른 숫자가 그 사이에 파묻힙니다. 등급을 머리에 한 번 적고 그
 * 아래에 종목을 답니다.
 *
 * 순서는 먼저 나온 등급이 먼저입니다. 목록은 이미 좋은 순으로 정렬돼 있으므로
 * 등급으로 다시 정렬하면 그 순서를 뒤엎게 됩니다.
 */
export function groupByTier<T extends { tier: string }>(rows: T[]) {
  const groups: { rows: T[]; tier: string }[] = [];

  rows.forEach((row) => {
    const last = groups[groups.length - 1];

    if (last && last.tier === row.tier) last.rows.push(row);
    else groups.push({ rows: [row], tier: row.tier });
  });

  return groups;
}

export const trendIconByTone = {
  up: "/market-board/trend-up.svg",
  down: "/market-board/trend-down.svg",
  flat: "/market-board/trend-flat.svg"
} satisfies Record<MarketBoardData["macroSnapshot"][number]["tone"], string>;

export const rankIcons = ["/market-board/rank-a.svg", "/market-board/rank-b.svg", "/market-board/rank-c.svg"];

export function todaySeoulDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul"
  }).format(new Date());
}

/**
 * 이 값이 오늘 것인가, 며칠 전 것인가.
 *
 * 선물과 BTC는 밤에도 거래돼서 시황 카드 대부분은 실시간입니다. 그런데 10Y 금리는
 * 미국 정규장에만 갱신되므로, 주말이 끼면 이틀 묵은 값이 방금 값과 **똑같이 생긴
 * 카드**로 나란히 섭니다. 시각이 적혀 있긴 하지만 읽어야만 알 수 있습니다.
 *
 * 기준은 서울 날짜입니다 -- 보는 사람이 한국에 있고, "어제 값이냐"는 물음도 서울
 * 날짜로 하는 물음입니다.
 */
export function readingAgeDays(timestamp?: string) {
  if (!timestamp) return 0;

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return 0;

  const day = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit", month: "2-digit", timeZone: "Asia/Seoul", year: "numeric"
  }).format(date);
  const gap = Math.round(
    (Date.parse(`${todaySeoulDate()}T00:00:00Z`) - Date.parse(`${day}T00:00:00Z`)) / 86_400_000
  );

  return gap > 0 ? gap : 0;
}

export function readingAgeLabel(days: number) {
  if (days <= 0) return null;

  return days === 1 ? "어제 값" : `${days}일 전 값`;
}

export function formatDateTimeMinute(value?: string) {
  if (!value) return "확인 대기";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.length >= 16 ? value.slice(0, 16).replace("T", " ") : value;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul"
  }).format(date);
}

export function formatDateOnly(value?: string) {
  const formatted = formatDateTimeMinute(value);

  return formatted === "확인 대기" ? todaySeoulDate() : formatted.slice(0, 10);
}

export function formatTimeOnly(value?: string) {
  const formatted = formatDateTimeMinute(value);

  return formatted === "확인 대기" ? "--:--" : formatted.slice(11, 16);
}

export function displaySource(source?: string) {
  if (!source) return "출처 확인";
  if (source === "mock") return "참고값";
  if (source === "kis") return "시장 데이터";
  if (source === "market") return "시장 데이터";

  return source;
}

export function displayProviderMessage(message: string) {
  return message.replace(/mock/gi, "비활성");
}

export function signedPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function changeTone(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("+")) return "up";
  if (trimmed.startsWith("-")) return "down";

  return "flat";
}

export function metricChangeTone(value: string, fallback?: "up" | "down" | "flat") {
  const percentMatch = value.match(/[+-]\d+(?:\.\d+)?%/);

  if (percentMatch) return changeTone(percentMatch[0]);
  if (fallback) return fallback;

  return "flat";
}

/**
 * 시가총액을 읽히는 단위로. 거래정지는 규모와 같이 봐야 뜻이 생깁니다 — 한화가
 * 멈춘 것과 코스닥 소형주가 멈춘 것은 같은 사건이 아닙니다.
 */
export function formatKrwSize(value: number | null) {
  if (value === null || !Number.isFinite(value) || value <= 0) return "확인 중";

  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}조`;

  return `${Math.round(value / 100_000_000).toLocaleString("ko-KR")}억`;
}

export function normalizeForMatch(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}
