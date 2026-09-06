/**
 * 칩을 눌렀을 때 무엇이 남는가.
 *
 * 목록을 거르고 세는 일만 합니다. 칩 자체는 그날 데이터가 실제로 들고 있는 것에서
 * 만들어집니다 -- 고정 목록으로 두었을 때 누르면 빈 상자가 열리던 자리입니다.
 */

import type { Disclosure, DisclosureFilterId, Headline, LeaderFilterId, LeadingStock, NewsFilterId } from "./board-types";
import type { MarketBoardData } from "./types";
import { isEtfLeader } from "./board-themes";

export function buildDisclosureFilters(items: Disclosure[]) {
  const byTag = new Map<string, number>();

  items.forEach((item) => {
    (item.tags ?? []).forEach((tag) => byTag.set(tag, (byTag.get(tag) ?? 0) + 1));
  });

  const smallCaps = items.filter((item) => item.issuerType === "small-cap" || item.issuerType === "mid-cap").length;
  const fresh = items.filter((item) => item.isNew).length;

  return [
    { count: items.length, id: "all", label: "전체" },
    ...(fresh > 0 ? [{ count: fresh, id: "new", label: "새 공시" }] : []),
    ...(smallCaps > 0 ? [{ count: smallCaps, id: "small-cap", label: "중소형주" }] : []),
    ...[...byTag]
      .sort((left, right) => right[1] - left[1])
      .map(([tag, count]) => ({ count, id: `tag:${tag}`, label: tag }))
  ];
}

export const leaderFilters: Array<{ id: LeaderFilterId; label: string }> = [
  { id: "turnover", label: "거래대금" },
  { id: "gainers", label: "상승률" },
  { id: "volume", label: "거래량" },
  { id: "etf", label: "ETF" },
  { id: "risk", label: "주의" }
];

export const newsFilters: Array<{ id: NewsFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "us", label: "미국 뉴스" },
  { id: "kr", label: "국내 뉴스" },
  { id: "theme", label: "테마" },
  { id: "macro", label: "매크로" }
];

export function matchesDisclosureFilter(item: Disclosure, filterId: DisclosureFilterId) {
  if (filterId === "new") return Boolean(item.isNew);
  if (filterId === "small-cap") return item.issuerType === "small-cap" || item.issuerType === "mid-cap";
  if (filterId.startsWith("tag:")) return (item.tags ?? []).includes(filterId.slice(4));

  return true;
}

export function matchesLeaderFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks?: Map<string, number>) {
  const labelText = `${stock.burst} ${stock.turnover} ${stock.intraday} ${stock.reason} ${stock.caution}`;
  const etf = isEtfLeader(stock);

  if (filterId === "gainers" || filterId === "turnover" || filterId === "volume") {
    const rank = ranks?.get(stock.id) ?? null;

    return rank !== null && rank <= 30;
  }
  if (filterId === "etf") return etf;
  // The exchange's own designation first. The text match stays for the US side
  // and for warnings the board writes itself, but a 관리종목 is a fact about the
  // listing rather than a phrase that happened to appear in a label.
  if (filterId === "risk") {
    return (stock.cautionLabels?.length ?? 0) > 0
      || /거래정지|정리매매|관리종목|투자경고|투자위험|단기과열|상장폐지|상장상태|VI 발동|변동성완화/i.test(labelText);
  }

  return true;
}

export function matchesNewsFilter(item: Headline, filterId: NewsFilterId) {
  const labelText = `${item.source} ${item.label} ${item.text}`;

  if (filterId === "us") return item.region === "US";
  if (filterId === "kr") return item.region === "KR";
  if (filterId === "theme") return /테마|전력|바이오|정책|AI/i.test(labelText);
  if (filterId === "macro") return /매크로|금리|CPI|환율|달러|선물/i.test(labelText);

  return true;
}

export function newsFilterCount(items: MarketBoardData["headlineFlow"], filterId: NewsFilterId) {
  return items.filter((item) => matchesNewsFilter(item, filterId)).length;
}

export function relatedHeadlineTags(item: Headline) {
  return [
    ...(item.relatedSymbols ?? []).map((symbol) => `종목 ${symbol}`),
    ...(item.relatedThemes ?? []).map((theme) => `테마 ${theme}`)
  ];
}

export function leaderVolumeOnly(stock: LeadingStock) {
  return (stock.burst ?? "")
    .replace(/상한가 도달\s*·\s*/g, "")
    .replace(/\s*·\s*[+-]\d+(?:\.\d+)?%/g, "")
    .replace(/\s*[+-]\d+(?:\.\d+)?%/g, "")
    .trim();
}

/**
 * The figure each filter ranks on, taken from the data rather than the prose.
 *
 * This read the rank out of the reason sentence with a regular expression, and
 * on 2026-08-19 every filter returned zero of thirty in both markets. Domestic
 * rows say "거래대금 순위 #8" and the pattern wanted "거래대금 #8" — one space —
 * while the US rows carry no rank sentence at all, so nothing could ever match.
 * A wording change on the server silently emptied the board, which is what
 * parsing a sentence for a number buys.
 *
 * Every one of these is already a number on the DTO.
 */
export function leaderMetric(stock: LeadingStock, filterId: Extract<LeaderFilterId, "turnover" | "gainers" | "volume">) {
  if (filterId === "gainers") return stock.changeRateValue ?? null;
  if (filterId === "volume") return stock.volumeRatioValue ?? stock.volumeValue ?? null;

  return stock.turnoverValue ?? null;
}

/** Positions within the list being shown, best first, one-indexed. */
export function leaderRanks(stocks: LeadingStock[], filterId: Extract<LeaderFilterId, "turnover" | "gainers" | "volume">) {
  const ordered = stocks
    .filter((stock) => leaderMetric(stock, filterId) !== null)
    .sort((left, right) => (leaderMetric(right, filterId) ?? 0) - (leaderMetric(left, filterId) ?? 0));

  return new Map(ordered.map((stock, index) => [stock.id, index + 1]));
}

export function sortLeadingStocks(stocks: MarketBoardData["usLeadingStocks"], filterId: LeaderFilterId) {
  if (filterId !== "turnover" && filterId !== "gainers" && filterId !== "volume" && filterId !== "etf") return stocks;

  // US ETFs carry no turnover outside the regular session — Yahoo reports zero
  // volume on pre and post bars — so ranking them by it would leave the tab in
  // whatever order the fetch happened to return.
  const rankFilter = filterId === "etf"
    ? (stocks.some((stock) => Number(stock.turnoverValue) > 0) ? "turnover" : "gainers")
    : filterId;
  const ranks = leaderRanks(stocks, rankFilter);

  return [...stocks].sort((left, right) => (ranks.get(left.id) ?? 999) - (ranks.get(right.id) ?? 999));
}
