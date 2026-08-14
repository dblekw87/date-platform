import { createHmac } from "node:crypto";
import { currentUserAuthorId, getCurrentUser, type CurrentUser } from "../auth/session";

const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";
const tokenAudience = "date-platform-backend";
const tokenIssuer = "date-platform-frontend";
const tokenTtlSeconds = 120;

function base64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

/**
 * Issues a short-lived HS256 token so the backend can verify who the caller is
 * instead of trusting forwarded identity headers. Returns null when
 * INTERNAL_JWT_SECRET is unset, which keeps local development working against a
 * backend that is also running without the secret.
 */
function signInternalToken(user: CurrentUser) {
  const secret = process.env.INTERNAL_JWT_SECRET;

  if (!secret) return null;

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    aud: tokenAudience,
    email: user.email,
    exp: issuedAt + tokenTtlSeconds,
    iat: issuedAt,
    iss: tokenIssuer,
    name: user.name,
    provider: user.provider,
    sub: user.providerUserId ?? currentUserAuthorId(user)
  }));
  const signature = createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export async function getBackendIdentityHeaders() {
  const user = await getCurrentUser();
  const headers = new Headers();

  if (!user) return headers;

  const token = signInternalToken(user);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);

    return headers;
  }

  // Development fallback for a backend that also runs without INTERNAL_JWT_SECRET.
  headers.set("X-Date-User-Provider", user.provider);
  headers.set("X-Date-User-Id", user.providerUserId ?? currentUserAuthorId(user));
  headers.set("X-Date-User-Name", encodeURIComponent(user.name));
  if (user.email) headers.set("X-Date-User-Email", user.email);

  return headers;
}

export async function fetchBackendJson<T>(path: string): Promise<T | null> {
  try {
    const headers = await getBackendIdentityHeaders();
    const response = await fetch(new URL(path, backendUrl), {
      headers,
      cache: "no-store"
    });

    if (!response.ok) return null;

    return await response.json() as T;
  } catch {
    return null;
  }
}
