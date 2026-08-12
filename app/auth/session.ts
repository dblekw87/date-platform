import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type CurrentUser = {
  name: string;
  provider: "mock" | "google" | "naver" | "kakao";
};

const supportedProviders = new Set<CurrentUser["provider"]>(["mock", "google", "naver", "kakao"]);

function shouldUseMockSession() {
  return process.env.NODE_ENV === "development" || process.env.DATE_MOCK_AUTH === "true";
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("date_session")?.value;
  const mockSignedOut = cookieStore.get("date_mock_signed_out")?.value === "true";

  if (session) {
    const provider = supportedProviders.has(session as CurrentUser["provider"]) ? session as CurrentUser["provider"] : "mock";

    return {
      name: provider === "mock" ? "Mock Trader" : "DATE 회원",
      provider
    };
  }

  if (shouldUseMockSession() && !mockSignedOut) {
    return {
      name: "Mock Trader",
      provider: "mock"
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
  return user.provider === "mock" ? "date_user" : user.name;
}
