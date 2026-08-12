import { NextResponse } from "next/server";
import { getBackendIdentityHeaders } from "../../../_lib/backend";

const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";

async function proxyRequest(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const sourceUrl = new URL(request.url);
  const targetUrl = new URL(`/api/${path.join("/")}${sourceUrl.search}`, backendUrl);
  const method = request.method;
  const body = method === "GET" || method === "HEAD" ? undefined : await request.text();
  const headers = await getBackendIdentityHeaders();

  headers.set("Content-Type", request.headers.get("Content-Type") ?? "application/json");

  const response = await fetch(targetUrl, {
    method,
    body,
    headers,
    cache: "no-store"
  });
  const text = await response.text();

  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json; charset=utf-8"
    }
  });
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, context);
}

export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, context);
}
