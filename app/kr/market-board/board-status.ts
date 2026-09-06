/**
 * provider가 답하지 않을 때 화면에 무엇을 적을 것인가.
 *
 * 빈 칸과 "못 받았습니다"는 다릅니다. 사용자가 볼 때 둘을 구별할 수 있어야
 * 데이터가 없는 날과 수집이 죽은 날을 가릅니다.
 */

import type { MarketBoardData } from "./types";

export function providerStatusFor(board: MarketBoardData, providerId: MarketBoardData["providerStatuses"][number]["id"]) {
  return board.providerStatuses.find((provider) => provider.id === providerId);
}

export function themeUnavailableMessage(board: MarketBoardData, region: "KR" | "US") {
  const provider = region === "US" ? providerStatusFor(board, "toss") : providerStatusFor(board, "kis");

  if (provider?.status === "error") {
    return `${provider.label} 오류로 강세 테마 데이터를 표시하지 못했습니다.`;
  }

  if (provider?.status === "mock") {
    return `${provider.label} 환경변수가 없어 강세 테마 provider가 비활성 상태입니다.`;
  }

  return "강세 테마 후보가 아직 수신되지 않았습니다.";
}

export function leaderUnavailableMessage(board: MarketBoardData, region: "KR" | "US") {
  const provider = region === "US" ? providerStatusFor(board, "market") : providerStatusFor(board, "kis");

  if (provider?.status === "error") {
    return `${provider.label} 오류로 주도주를 집계하지 못했습니다.`;
  }

  if (provider?.status === "mock") {
    return `${provider.label} 환경변수가 없어 주도주 provider가 비활성 상태입니다.`;
  }

  return "거래대금이 한쪽으로 쏠린 종목이 아직 없습니다.";
}
