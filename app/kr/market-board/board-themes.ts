/**
 * 주도주를 테마로 묶기.
 *
 * 여기서 하는 판정은 전부 **보수적**입니다. 이름으로 테마를 추측하는 자동 판정은
 * 다섯 번 시도해 다섯 번 멀쩡한 카드를 부쉈습니다([[theme-card-attribution]]).
 * 그래서 확실한 것만 묶고 나머지는 묶지 않은 채 둡니다.
 */

import type { LeadingStock } from "./board-types";

/**
 * The theme a row belongs to.
 *
 * `reason` is the backend's sentence and the theme is its first clause, which
 * makes this parse the whole page's single point of failure: a row assembled
 * without one took the board down with "Cannot read properties of undefined
 * (reading 'split')". The DTO says the field is required and the backend is
 * plain JavaScript, so nothing checks that promise at the boundary. Prefer the
 * typed field, read the sentence only as a fallback, and never assume either.
 */
export function leaderTheme(stock: LeadingStock) {
  if (stock.theme && stock.theme !== "미분류") return stock.theme;

  const [theme] = (stock.reason ?? "").split(" · ");

  if (
    !theme ||
    theme === "개별 이슈" ||
    theme === "미분류" ||
    /KIS|토스증권|거래대금|거래량|상승률|순위|표시순위/i.test(theme)
  ) return inferThemeFromLeader(stock);

  return theme;
}

export function isEtfLeader(stock: LeadingStock) {
  return leaderTheme(stock) === "ETF" ||
    /(^|\s)(KODEX|TIGER|ACE|RISE|SOL|PLUS|HANARO|KOSEF|KBSTAR|ARIRANG|TIMEFOLIO|히어로즈|마이티|HK)|ETF|ETN|인버스|레버리지|채권|회사채|국고채|액티브|Nifty|TOP10/i.test(`${stock.name ?? ""} ${stock.reason ?? ""}`);
}

export function inferThemeFromLeader(stock: LeadingStock) {
  const text = `${stock.symbol} ${stock.name} ${stock.reason} ${stock.marketLabel}`;

  if (/매드업|MADUP/i.test(text)) return "AI 광고";
  if (/유니켐|UNICHEM|011330/i.test(text)) return "비건가죽";
  if (/SURG|SurgePays/i.test(text)) return "핀테크 결제";
  if (/PAVS|Paranovus/i.test(text)) return "AI 게임";
  if (/AZI|Autozi/i.test(text)) return "자동차 애프터마켓";
  if (/반도체|HBM|DRAM|NAND|chip|semiconductor/i.test(text)) return "반도체";
  if (/AI|인공지능|소프트웨어|마케팅|광고|플랫폼|software|marketing|advertising|platform/i.test(text)) return "AI 서비스";
  if (/게임|엔터|game|entertainment/i.test(text)) return "AI 게임";
  if (/결제|핀테크|통신|MVNO|wireless|payment|fintech|telecom/i.test(text)) return "핀테크 결제";
  if (/자동차|전장|시트|가죽|피혁|내장재|auto|vehicle|leather|car owner/i.test(text)) return "자동차 애프터마켓";
  if (/바이오|제약|신약|임상|bio|biotech|pharma/i.test(text)) return "바이오";
  if (/전력|변압기|원전|에너지|power|utility|energy|nuclear/i.test(text)) return "전력망";
  if (/저유동|low.?float|급등|상승률|거래량|중소형|소형|small.?cap/i.test(text)) return stock.market === "US" ? "소형주 급등" : "거래대금 급증";

  return stock.market === "US" ? "소형주 급등" : "거래대금 급증";
}

// Labels that describe how a stock surfaced rather than what it belongs to.
// Grouping under one of these invents a theme — "거래대금 급증" is not a sector,
// and a row of unrelated names beneath it reads as a finding when it is not.
export const nonThemeLabels = new Set(["ETF", "미분류", "개별 이슈", "거래대금 급증", "소형주 급등"]);

export function isThemeLeaderCandidate(stock: LeadingStock) {
  return !isEtfLeader(stock) && !nonThemeLabels.has(leaderTheme(stock));
}

/**
 * Groups the leaders by theme and ranks the groups by how hard they moved.
 *
 * Every member counts the same, matching the backend's theme brief. Weighting
 * by turnover handed the score to whichever member traded most, so 반도체 was
 * ranked on 삼성전자 alone and a theme of mid caps up 20% placed below a mega
 * cap up 2%. Turnover concentration is what the 주도주 list above measures; this
 * one is about which stocks moved as a group.
 */
export function rankedThemeGroups(stocks: LeadingStock[]) {
  const byTheme = new Map<string, LeadingStock[]>();

  stocks.filter(isThemeLeaderCandidate).forEach((stock) => {
    const theme = leaderTheme(stock);

    byTheme.set(theme, [...(byTheme.get(theme) ?? []), stock]);
  });

  return [...byTheme.entries()]
    .map(([theme, members]) => {
      const totalChange = members.reduce((total, stock) => total + (stock.changeRateValue ?? 0), 0);

      return {
        theme,
        // Ordered by how far each has moved, so the one leading the theme reads
        // as 1등주 and the names still trailing it come after — the comparison
        // this list exists to make.
        members: [...members].sort((left, right) =>
          (right.changeRateValue ?? 0) - (left.changeRateValue ?? 0)
          || (right.turnoverValue ?? 0) - (left.turnoverValue ?? 0)),
        changeRate: members.length > 0 ? totalChange / members.length : 0
      };
    })
    // A single name is a 주도주, which has its own list above, so a one-stock
    // group here would promise a 2등주 that does not exist.
    .filter((group) => group.members.length >= 2 && group.changeRate > 0)
    .sort((left, right) => right.changeRate - left.changeRate)
    .slice(0, 3);
}

/**
 * The two sessions a domestic stock traded in today, each with its hours named.
 *
 * The live rate follows whichever book is open, which is why the board read
 * 쿠콘 at +23.17% while 토스, quoting the 19:59 book, read +19.03%. Rather than
 * choosing, the row shows the regular close and the evening close side by side;
 * the gap between them is the part worth reading, because a name that gave back
 * its limit after hours does not open like one that held it.
 *
 * Returns null when there is no second figure to show — a US row, or a domestic
 * one before the evening has traded — and the row falls back to one number.
 */
export function sessionRatePair(stock: LeadingStock) {
  const rates = stock.sessionChangeRates;

  if (rates?.regular === undefined || rates.after === undefined) return null;

  return [
    { hours: "09:00–15:30", label: "정규장", value: rates.regular },
    { hours: "15:40–20:00", label: "애프터", value: rates.after }
  ];
}

export function leaderChangeRate(stock: LeadingStock) {
  const match = `${stock.burst} ${stock.intraday}`.match(/[+-]\d+(?:\.\d+)?%/);

  return match?.[0] ?? "확인";
}

/**
 * Marks a stock doing an outsized share of its day's turnover in the last few
 * minutes — the burst that a cumulative figure hides. A fifth of the day inside
 * a ten-minute window is well above an even pace and worth looking at now.
 */
export function isSurging(stock: LeadingStock) {
  return (stock.recentTurnoverShare ?? 0) >= 0.2 && Boolean(stock.recentTurnover);
}

export function themeRankLabel(groups: { theme: string }[], index: number) {
  return groups[index]?.theme ?? "확인 대기";
}
