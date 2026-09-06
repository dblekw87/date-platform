/**
 * 보드 안에서만 쓰는 이름들.
 *
 * types.ts는 백엔드와 나누는 계약(DTO)이고, 여기 있는 것은 그 DTO에서 잘라 쓰는
 * 별칭과 화면 상태의 종류입니다. 둘을 한 파일에 두면 백엔드가 보내는 모양과
 * 화면이 저 혼자 쓰는 이름이 섞입니다.
 */

import type { MarketBoardData } from "./types";

/**
 * "전체", "새 공시", "중소형주", and then one id per tag the day's filings
 * actually carry, written as `tag:증자·지분`.
 *
 * The chips used to be a fixed list matched with English regexes, which for
 * domestic filings meant 90% of a day matched nothing at all — pressing 소형주,
 * 매각 or 인수합병 opened an empty box. Building them from the payload means a
 * chip exists only when there is something behind it.
 */
export type DisclosureFilterId = string;

export type LeaderFilterId = "turnover" | "gainers" | "volume" | "etf" | "risk";

export type NewsFilterId = "all" | "us" | "kr" | "theme" | "macro";

export type LeadingStock = MarketBoardData["usLeadingStocks"][number];

export type MarketSnapshot = MarketBoardData["macroSnapshot"][number];

export type Headline = MarketBoardData["headlineFlow"][number];

export type Disclosure = MarketBoardData["usDisclosures"][number];

export type CalendarEvent = MarketBoardData["calendarItems"][number];

export type LeaderRankSet = { gainers: Map<string, number>; turnover: Map<string, number>; volume: Map<string, number> };
