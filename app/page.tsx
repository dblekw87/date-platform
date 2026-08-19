import { Suspense } from "react";
import { MarketBoard } from "./kr/market-board/MarketBoard";
import { MarketBoardSkeleton } from "./kr/market-board/MarketBoardSkeleton";
import { getCurrentUser } from "./auth/session";
import { getMarketBoardData } from "./kr/market-board/providers";
import type { MarketBoardTabId } from "./kr/market-board/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const tabIds = new Set<MarketBoardTabId>(["market", "news", "calendar", "breaking", "flow", "trade"]);

function parseInitialTab(value?: string | string[]) {
  const tab = Array.isArray(value) ? value[0] : value;

  return tab && tabIds.has(tab as MarketBoardTabId) ? tab as MarketBoardTabId : "market";
}

async function MarketBoardContainer({ initialTab }: { initialTab: MarketBoardTabId }) {
  const [board, user] = await Promise.all([
    getMarketBoardData(),
    getCurrentUser()
  ]);
  const userLabel = user ? user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name : undefined;

  return <MarketBoard board={board} initialTab={initialTab} userLabel={userLabel} />;
}

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialTab = parseInitialTab(params?.tab);

  return (
    <Suspense fallback={<MarketBoardSkeleton />}>
      <MarketBoardContainer initialTab={initialTab} />
    </Suspense>
  );
}
