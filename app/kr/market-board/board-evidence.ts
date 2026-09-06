/**
 * 이 종목이 왜 올랐는지 뒷받침할 것 찾기.
 *
 * 기사와 공시를 종목에 붙이는 자리입니다. 붙이는 규칙이 느슨하면 근거가 아니라
 * 소음이 붙습니다 -- 두 세 글자짜리 미국 티커를 그냥 부분 문자열로 찾았더니
 * "Tempus" 안의 MP, "communication" 안의 MU가 걸려 MP Materials 행마다 엉뚱한
 * 기사가 달렸습니다(18건 전부). 지금은 라틴 문자 별칭에 낱말 경계를 요구합니다.
 */

import type { Disclosure, Headline, LeaderFilterId, LeaderRankSet, LeadingStock } from "./board-types";
import { leaderChangeRate, leaderTheme } from "./board-themes";
import { leaderVolumeOnly } from "./board-filters";
import { normalizeForMatch } from "./board-format";

export const issuerSizeLabels: Record<string, string> = {
  "large-cap": "대형주",
  "mid-cap": "중형주",
  "small-cap": "소형주",
  unknown: "규모 미상"
};

// A US ticker is two or three letters, and looking for it as a bare substring
// finds it inside ordinary words: "MP" sits in "Tempus" and "employment", "MU"
// in "communication", "TEM" in "system". That is how every MP Materials row
// ended up captioned with a Tempus AI headline - 18 matches, none of them about
// the company. Latin aliases now need a word boundary on both sides, which also
// means they have to be tested against the text as written rather than the
// space-stripped form. Korean has no word boundaries to find, so Korean aliases
// keep the old match.
export function aliasMatchesText(alias: string, raw: string, matchCase = false) {
  if (/[가-힣]/.test(alias)) return normalizeForMatch(raw).includes(normalizeForMatch(alias));

  const haystack = matchCase ? raw : raw.toLowerCase();
  const needle = matchCase ? alias : alias.toLowerCase();
  const isWordCharacter = (character: string) => /[a-z0-9]/i.test(character);

  for (let at = haystack.indexOf(needle); at !== -1; at = haystack.indexOf(needle, at + 1)) {
    const before = at === 0 ? "" : haystack[at - 1];
    const after = haystack[at + needle.length] ?? "";

    if (!isWordCharacter(before) && !isWordCharacter(after)) return true;
  }

  return false;
}

export function stockNameAliases(stock: LeadingStock) {
  const aliases = new Set([
    stock.name,
    // The comma belongs to the suffix: "Moderna, Inc." was leaving "Moderna,"
    // behind, which matches no headline, because headlines write "Moderna and".
    stock.name.replace(/[,\s]+(inc\.?|corporation|corp\.?|ltd\.?|plc|co\.?)$/i, "").replace(/[,\s]+$/, ""),
    stock.symbol
  ]);

  if (stock.name.includes("SK하이닉스")) aliases.add("하이닉스");
  if (stock.name.includes("삼성전자")) aliases.add("삼전");
  if (stock.symbol === "AMD") aliases.add("Advanced Micro Devices");
  if (stock.symbol === "INTC") aliases.add("Intel");
  if (stock.symbol === "MU") aliases.add("Micron Technology");
  if (stock.symbol === "NVDA") aliases.add("Nvidia");
  if (stock.symbol === "SNDK") aliases.add("Sandisk");

  return [...aliases].map((alias) => alias.trim()).filter(Boolean);
}

export function headlineMatchesLeader(item: Headline, stock: LeadingStock) {
  if (item.region !== stock.market) return false;
  if (item.relatedSymbols?.includes(stock.symbol)) return true;

  const text = `${item.source} ${item.label} ${item.text} ${item.originalText ?? ""}`;

  return stockNameAliases(stock).some((alias) => {
    if (/^\d+$/.test(alias) && alias.length < 5) return false;

    // The ticker itself is matched case-sensitively: lowercased, "MRNA" is the
    // ordinary word "mRNA" and "MP" is inside "employment". The same guard
    // exists in the backend's tagger, which is where the Moderna row was
    // actually getting a Tempus AI headline from; this is the fallback path for
    // headlines the backend did not tag. Company names stay case-insensitive,
    // since headlines are inconsistent about those.
    return aliasMatchesText(alias, text, alias === stock.symbol);
  });
}

export function isLikelyIndividualCompanyHeadline(item: Headline, stock: LeadingStock) {
  if (headlineMatchesLeader(item, stock)) return false;

  const text = `${item.source} ${item.label} ${item.text} ${item.originalText ?? ""}`;
  const broadMarketSignal = /업종|섹터|테마|시장|증시|코스피|코스닥|나스닥|수급|정책|정부|규제|금리|환율|지수|전망|투자심리|랠리|강세|약세|호황|불황|industry|sector|market|policy|regulation|outlook/i.test(text);
  const individualSignal = /주가|주식|자사주|회장|대표|임원|계약|공급|임상|승인|실적|매출|영업이익|인수|합병|급락|급등|베팅|지분|CB|BW|유증|stock|shares|ceo|chairman|contract|trial|approval|earnings|revenue/i.test(text);

  return individualSignal && !broadMarketSignal;
}

export function headlineMatchesTheme(item: Headline, stock: LeadingStock) {
  const theme = leaderTheme(stock);

  if (item.region !== stock.market && item.region !== "GLOBAL") return false;
  if (!theme || theme === "개별 이슈" || theme === "ETF") return false;
  if (isLikelyIndividualCompanyHeadline(item, stock)) return false;
  if (item.relatedThemes?.includes(theme)) return true;

  return `${item.label} ${item.text}`.includes(theme);
}

export function headlineCauseLabel(item: Headline) {
  const text = `${item.label} ${item.text} ${item.originalText ?? ""}`;

  if (/실적|가이던스|컨센서스|earnings|guidance|revenue|results|quarter|q[1-4]|eps|sales|forecast/i.test(text)) return "실적";
  if (/공시|sec|8-k|10-q|10-k|s-1|424b|13d|13g|filing|disclosure/i.test(text)) return "공시";
  if (/인수|합병|m&a|merger|acquisition|tender/i.test(text)) return "M&A";

  return "뉴스";
}

export function headlineCauseScore(item: Headline, stock: LeadingStock) {
  const label = headlineCauseLabel(item);
  const directScore = headlineMatchesLeader(item, stock) ? 100 : 0;
  const causeScore = label === "실적" ? 30 : label === "공시" ? 20 : label === "M&A" ? 18 : 0;

  return directScore + causeScore;
}

export function relatedLeaderNews(stock: LeadingStock, headlines: Headline[]) {
  return headlines
    .filter((item) => headlineMatchesLeader(item, stock))
    .sort((left, right) => {
      const scoreDiff = headlineCauseScore(right, stock) - headlineCauseScore(left, stock);

      return scoreDiff || right.publishedAt.localeCompare(left.publishedAt);
    });
}

export function relatedThemeNews(stock: LeadingStock, headlines: Headline[]) {
  return headlines.filter((item) => headlineMatchesTheme(item, stock));
}

export function relatedDisclosures(stock: LeadingStock, disclosures: Disclosure[]) {
  const aliases = stockNameAliases(stock);

  return disclosures.filter((item) => {
    const text = `${item.symbol ?? ""} ${item.companyName ?? ""} ${item.title} ${item.tags.join(" ")} ${item.eventType ?? ""}`;

    return item.symbol === stock.symbol || aliases.some((alias) => alias && aliasMatchesText(alias, text));
  });
}

export function leaderRankSummary(stock: LeadingStock, ranks: LeaderRankSet) {
  return [
    ranks.turnover.get(stock.id) ? `거래대금 #${ranks.turnover.get(stock.id)}` : null,
    ranks.gainers.get(stock.id) ? `상승률 #${ranks.gainers.get(stock.id)}` : null,
    ranks.volume.get(stock.id) ? `거래량 #${ranks.volume.get(stock.id)}` : null
  ].filter(Boolean).join(" · ");
}

export function leaderRankSummaryForFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks: LeaderRankSet) {
  if (filterId === "turnover") return ranks.turnover.get(stock.id) ? `거래대금 #${ranks.turnover.get(stock.id)}` : "거래대금 순위";
  if (filterId === "gainers") return ranks.gainers.get(stock.id) ? `상승률 #${ranks.gainers.get(stock.id)}` : "상승률 순위";
  if (filterId === "volume") return ranks.volume.get(stock.id) ? `거래량 #${ranks.volume.get(stock.id)}` : "거래량 순위";
  if (filterId === "etf") return ranks.turnover.get(stock.id) ? `ETF 거래대금 #${ranks.turnover.get(stock.id)}` : "ETF";

  return leaderRankSummary(stock, ranks) || "주의";
}

export function leaderSignalForFilter(stock: LeadingStock, filterId: LeaderFilterId) {
  const region = stock.market === "US" ? "미국" : "국내";

  if (filterId === "turnover") return `${region} 거래대금 주도`;
  if (filterId === "gainers") return `${region} 상승률 주도`;
  if (filterId === "volume") return `${region} 거래량 주도`;
  if (filterId === "etf") return `${region} ETF`;
  if (filterId === "risk") return `${region} 주의`;

  return stock.marketLabel;
}

export function leaderReasonForFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks: LeaderRankSet) {
  const theme = leaderTheme(stock);
  const rank = leaderRankSummaryForFilter(stock, filterId, ranks);

  if (filterId === "turnover" || filterId === "etf") {
    return `${theme} · 토스증권 ${rank} · 거래대금 ${stock.turnover}`;
  }
  if (filterId === "gainers") {
    return `${theme} · 토스증권 ${rank} · 상승률 ${leaderChangeRate(stock)}`;
  }
  if (filterId === "volume") {
    return `${theme} · 토스증권 ${rank} · 거래량 ${leaderVolumeOnly(stock)}`;
  }
  if (filterId === "risk") {
    return `${rank} · ${stock.caution}`;
  }

  return stock.reason;
}
