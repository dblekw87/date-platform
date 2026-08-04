import { NextResponse } from "next/server";
import { getMarketBoardData } from "../../kr/market-board/providers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const board = await getMarketBoardData();

  return NextResponse.json(board, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
