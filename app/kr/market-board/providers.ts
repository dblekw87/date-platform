import type { MarketBoardData } from "./types";

const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";
// Defaulted rather than required. The snapshot repository is public and its URL
// is fixed, so making production depend on an environment variable only creates
// a way for the deploy to be silently dataless. The variable still wins when set.
const snapshotUrl = process.env.DATE_BOARD_SNAPSHOT_URL
  ?? "https://raw.githubusercontent.com/dblekw87/date-board-snapshot/main/board.json";

// Rendered when the backend is unreachable. It carries the board's fixed
// structure only — tabs, ad slots, and a provider status explaining the gap —
// so the shell still renders instead of throwing.
function unavailableBoard(reason: string): MarketBoardData {
  const checkedAt = new Date().toISOString();

  return {
    tabs: [
      { id: "market", label: "시황", description: "미국 매크로와 국내 개장 기준점을 먼저 확인합니다." },
      { id: "news", label: "뉴스", description: "미국 뉴스, 국내 뉴스, 테마 흐름, 헤드라인 흐름을 확인합니다." },
      { id: "calendar", label: "일정", description: "공모주, 실적발표, FOMC, CPI처럼 날짜가 정해진 이벤트를 캘린더로 봅니다." },
      { id: "breaking", label: "속보·공시", description: "SEC, 인수합병, 매각, 금리, 정책 이벤트처럼 즉시 확인할 항목을 모읍니다." },
      { id: "flow", label: "수급·차트", description: "시황과 뉴스를 본 뒤 수급과 기술적 위치를 확인합니다." },
      { id: "trade", label: "매매참고", description: "주도주, 강세 테마, 짝꿍 후보, 급등 후보를 한 화면에서 봅니다." }
    ],
    disclosureTabs: [
      { id: "us", label: "미국 SEC", description: "SEC 공시, 인수합병, 지분 변동, 매각, 금리 이벤트를 미국장 기준으로 봅니다." },
      { id: "kr", label: "국내 DART", description: "DART 공시, 공급계약, 최대주주 변경, CB/BW, 유상증자, 테마주 재료를 국내장 기준으로 봅니다." }
    ],
    leaderTabs: [
      { id: "us", label: "미국 주도주" },
      { id: "kr", label: "국내 주도주" }
    ],
    adSlots: [
      { id: "top", label: "상단 광고 영역", reserved: true },
      { id: "middle", label: "중단 광고 영역", reserved: true },
      { id: "bottom", label: "하단 광고 영역", reserved: true }
    ],
    providerStatuses: [
      { id: "market", label: "시장 데이터", status: "error", message: reason, checkedAt }
    ],
    macroSnapshot: [],
    marketBrief: [],
    headlineFlow: [],
    calendarItems: [],
    usDisclosures: [],
    krDisclosures: [],
    flowItems: [],
    usLeadingStocks: [],
    krLeadingStocks: [],
    usDayLeaders: [],
    krDayLeaders: [],
    krPairTrades: [],
    usSurgeCandidates: [],
    usPremarketMovers: [],
    smallCapScanner: []
  };
}

/**
 * The backend owns every market data provider, so this is a read of its
 * normalized board rather than a second provider stack.
 *
 * The deployed site cannot reach the collector, which runs on a desktop behind a
 * home connection. Rather than host the database and the providers — past the
 * free tiers, and with the API keys on somebody else's server — the collector
 * publishes one rendered board to a public repository and this reads that when
 * the live backend does not answer.
 *
 * The snapshot is a fallback and never the first choice: locally the backend is
 * right there and answers with the current minute.
 */
async function readSnapshotBoard(): Promise<MarketBoardData | null> {
  if (!snapshotUrl) return null;

  try {
    // Revalidated rather than no-store: the publisher runs on a timer, so asking
    // GitHub on every render would spend requests to be told the same thing.
    const response = await fetch(snapshotUrl, { next: { revalidate: 120 } });

    if (!response.ok) return null;

    return await response.json() as MarketBoardData;
  } catch {
    return null;
  }
}

export async function getMarketBoardData(): Promise<MarketBoardData> {
  try {
    const response = await fetch(new URL("/api/market-board", backendUrl), {
      cache: "no-store"
    });

    if (response.ok) return await response.json() as MarketBoardData;

    return await readSnapshotBoard() ?? unavailableBoard(`백엔드 응답 ${response.status} · 데이터를 불러오지 못했습니다`);
  } catch (error) {
    const snapshot = await readSnapshotBoard();

    if (snapshot) return snapshot;

    const reason = error instanceof Error && error.message ? ` · ${error.message}` : "";

    return unavailableBoard(`백엔드에 연결하지 못했습니다${reason}`);
  }
}
