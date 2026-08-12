import type { CurrentUser } from "./session";

export type OAuthProvider = Exclude<CurrentUser["provider"], "mock">;

type OAuthConfig = {
  authorizationUrl: string;
  clientId?: string;
  clientSecret?: string;
  clientSecretRequired?: boolean;
  getProfile: (accessToken: string) => Promise<CurrentUser>;
  scope: string;
  tokenUrl: string;
};

const providerLabels: Record<OAuthProvider, string> = {
  google: "Google",
  kakao: "Kakao",
  naver: "Naver"
};

export const oauthProviders = new Set<OAuthProvider>(["google", "naver", "kakao"]);

function requiredString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`OAuth request failed: ${response.status} ${JSON.stringify(data)}`);
  }

  return data as T;
}

export function getOAuthConfig(provider: OAuthProvider): OAuthConfig {
  if (provider === "google") {
    return {
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      clientId: requiredString(process.env.GOOGLE_OAUTH_CLIENT_ID),
      clientSecret: requiredString(process.env.GOOGLE_OAUTH_CLIENT_SECRET),
      clientSecretRequired: true,
      scope: "openid email profile",
      tokenUrl: "https://oauth2.googleapis.com/token",
      async getProfile(accessToken) {
        const profile = await fetchJson<{
          email?: string;
          name?: string;
          picture?: string;
          sub: string;
        }>("https://openidconnect.googleapis.com/v1/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        return {
          email: profile.email,
          name: profile.name || profile.email || "Google 회원",
          provider: "google",
          providerUserId: profile.sub
        };
      }
    };
  }

  if (provider === "naver") {
    return {
      authorizationUrl: "https://nid.naver.com/oauth2.0/authorize",
      clientId: requiredString(process.env.NAVER_OAUTH_CLIENT_ID),
      clientSecret: requiredString(process.env.NAVER_OAUTH_CLIENT_SECRET),
      clientSecretRequired: true,
      scope: "name email profile_image",
      tokenUrl: "https://nid.naver.com/oauth2.0/token",
      async getProfile(accessToken) {
        const profile = await fetchJson<{
          response?: {
            email?: string;
            id: string;
            name?: string;
            nickname?: string;
          };
        }>("https://openapi.naver.com/v1/nid/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const user = profile.response;

        if (!user?.id) throw new Error("Naver profile id is missing");

        return {
          email: user.email,
          name: user.nickname || user.name || user.email || "Naver 회원",
          provider: "naver",
          providerUserId: user.id
        };
      }
    };
  }

  return {
    authorizationUrl: "https://kauth.kakao.com/oauth/authorize",
    clientId: requiredString(process.env.KAKAO_OAUTH_CLIENT_ID ?? process.env.KAKAO_REST_API_KEY),
    clientSecret: requiredString(process.env.KAKAO_OAUTH_CLIENT_SECRET),
    scope: "profile_nickname profile_image account_email",
    tokenUrl: "https://kauth.kakao.com/oauth/token",
    async getProfile(accessToken) {
      const profile = await fetchJson<{
        id: number;
        kakao_account?: {
          email?: string;
          profile?: {
            nickname?: string;
          };
        };
      }>("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return {
        email: profile.kakao_account?.email,
        name: profile.kakao_account?.profile?.nickname || profile.kakao_account?.email || "Kakao 회원",
        provider: "kakao",
        providerUserId: String(profile.id)
      };
    }
  };
}

export function providerLabel(provider: OAuthProvider) {
  return providerLabels[provider];
}

export function safeNextPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}
