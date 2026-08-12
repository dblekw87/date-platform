import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type CurrentUser = {
  email?: string;
  name: string;
  provider: "mock" | "google" | "naver" | "kakao";
  providerUserId?: string;
};

const supportedProviders = new Set<CurrentUser["provider"]>(["mock", "google", "naver", "kakao"]);
const sessionCookieName = "date_session";

function sessionSecret() {
  return process.env.AUTH_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "date-dev-session-secret";
}

function base64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function signPayload(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function parseSignedSession(value: string): CurrentUser | null {
  if (!value.startsWith("v1.")) return null;

  const [, payload, signature] = value.split(".");

  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<CurrentUser>;

    if (!supportedProviders.has(user.provider as CurrentUser["provider"]) || !user.name) return null;

    return {
      email: user.email,
      name: user.name,
      provider: user.provider as CurrentUser["provider"],
      providerUserId: user.providerUserId
    };
  } catch {
    return null;
  }
}

export function createSessionValue(user: CurrentUser) {
  const payload = base64Url(JSON.stringify(user));

  return `v1.${payload}.${signPayload(payload)}`;
}

function shouldUseMockSession() {
  return process.env.NODE_ENV === "development" || process.env.DATE_MOCK_AUTH === "true";
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(sessionCookieName)?.value;
  const mockSignedOut = cookieStore.get("date_mock_signed_out")?.value === "true";

  if (session) {
    const signedSession = parseSignedSession(session);

    if (signedSession) return signedSession;

    const provider = supportedProviders.has(session as CurrentUser["provider"]) ? session as CurrentUser["provider"] : "mock";

    return {
      name: provider === "mock" ? "Mock Trader" : "DATE 회원",
      provider,
      providerUserId: provider === "mock" ? "mock-trader" : provider
    };
  }

  if (shouldUseMockSession() && !mockSignedOut) {
    return {
      name: "Mock Trader",
      provider: "mock",
      providerUserId: "mock-trader"
    };
  }

  return null;
}

export async function requireCurrentUser(nextPath: string): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}

export function currentUserAuthorId(user: CurrentUser) {
  if (user.provider === "mock") return "date_user";

  return user.providerUserId ?? user.name;
}
