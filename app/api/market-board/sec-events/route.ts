import { NextResponse } from "next/server";
import { readSecDisclosureEvents } from "../../../kr/market-board/adapters/sec-state";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const events = await readSecDisclosureEvents();

  return NextResponse.json({ events }, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
