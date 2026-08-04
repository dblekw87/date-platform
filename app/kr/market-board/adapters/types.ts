import type { MarketBoardData, SourceProvider } from "../types";

export type ProviderId = Exclude<SourceProvider, "mock">;

export type MarketBoardProviderPayload = Partial<MarketBoardData>;

export type MarketBoardProviderAdapter = {
  id: ProviderId;
  label: string;
  requiredEnv: string[];
  timeoutMs: number;
  hasCredentials: () => boolean;
  load: () => Promise<MarketBoardProviderPayload>;
};

export function hasEveryEnv(keys: string[]) {
  return keys.length > 0 && keys.every((key) => Boolean(process.env[key]));
}

export function hasAnyEnv(keys: string[]) {
  return keys.length > 0 && keys.some((key) => Boolean(process.env[key]));
}

export function createMockFallbackAdapter(
  id: ProviderId,
  label: string,
  requiredEnv: string[],
  options?: { credentialStrategy?: "all" | "any"; publicWithoutCredentials?: boolean; timeoutMs?: number }
): MarketBoardProviderAdapter {
  const strategy = options?.credentialStrategy ?? "all";

  return {
    id,
    label,
    requiredEnv,
    timeoutMs: options?.timeoutMs ?? 1800,
    hasCredentials: () => {
      if (options?.publicWithoutCredentials) {
        return true;
      }

      return strategy === "any" ? hasAnyEnv(requiredEnv) : hasEveryEnv(requiredEnv);
    },
    async load() {
      return {};
    }
  };
}
