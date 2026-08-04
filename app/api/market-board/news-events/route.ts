import { NextResponse } from "next/server";
import { readNewsHeadlineEvents } from "../../../kr/market-board/adapters/news-state";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const events = await readNewsHeadlineEvents();

  return NextResponse.json({ events }, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
