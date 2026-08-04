import { Suspense } from "react";
import { MarketBoard } from "./kr/market-board/MarketBoard";
import { MarketBoardSkeleton } from "./kr/market-board/MarketBoardSkeleton";
import { getMarketBoardData } from "./kr/market-board/providers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function MarketBoardContainer() {
  const board = await getMarketBoardData();

  return <MarketBoard board={board} />;
}

export default function Home() {
  return (
    <Suspense fallback={<MarketBoardSkeleton />}>
      <MarketBoardContainer />
    </Suspense>
  );
}
