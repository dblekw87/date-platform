import { NextResponse } from "next/server";

const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(new URL("/api/market-board/sec-events", backendUrl), {
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`backend ${response.status}`);

    return NextResponse.json(await response.json(), {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({ events: [] }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  }
}
