import { marketBoardProviderAdapters } from "./adapters";
import { mockMarketBoardData } from "./mock-data";
import type { MarketBoardData, ProviderStatusDto } from "./types";

const timeoutSymbol = Symbol("market-board-provider-timeout");

function missingCredentialMessage(requiredEnv: string[]) {
  return requiredEnv.length > 0 ? `${requiredEnv.join(", ")} 없음 · mock fallback` : "공개 adapter · mock fallback";
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | typeof timeoutSymbol> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<typeof timeoutSymbol>((resolve) => {
    timeoutId = setTimeout(() => resolve(timeoutSymbol), timeoutMs);
  });

  const result = await Promise.race([promise, timeout]);

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  return result;
}

function mergeMarketBoardData(base: MarketBoardData, payload: Partial<MarketBoardData>): MarketBoardData {
  return {
    ...base,
    ...payload,
    tabs: payload.tabs ?? base.tabs,
    disclosureTabs: payload.disclosureTabs ?? base.disclosureTabs,
    leaderTabs: payload.leaderTabs ?? base.leaderTabs,
    adSlots: payload.adSlots ?? base.adSlots,
    providerStatuses: payload.providerStatuses ?? base.providerStatuses,
    macroSnapshot: payload.macroSnapshot ?? base.macroSnapshot,
    marketBrief: payload.marketBrief ?? base.marketBrief,
    headlineFlow: payload.headlineFlow ?? base.headlineFlow,
    calendarItems: payload.calendarItems ?? base.calendarItems,
    usDisclosures: payload.usDisclosures ?? base.usDisclosures,
    krDisclosures: payload.krDisclosures ?? base.krDisclosures,
    flowItems: payload.flowItems ?? base.flowItems,
    usLeadingStocks: payload.usLeadingStocks ?? base.usLeadingStocks,
    krLeadingStocks: payload.krLeadingStocks ?? base.krLeadingStocks,
    smallCapScanner: payload.smallCapScanner ?? base.smallCapScanner
  };
}

export async function getMarketBoardData(): Promise<MarketBoardData> {
  const checkedAt = new Date().toISOString();
  const providerResults = await Promise.all(
    marketBoardProviderAdapters.map(async (adapter) => {
      if (!adapter.hasCredentials()) {
        return {
          payload: {},
          status: {
            id: adapter.id,
            label: adapter.label,
            status: "mock",
            message: missingCredentialMessage(adapter.requiredEnv),
            checkedAt
          } satisfies ProviderStatusDto
        };
      }

      try {
        const payload = await withTimeout(adapter.load(), adapter.timeoutMs);

        if (payload === timeoutSymbol) {
          return {
            payload: {},
            status: {
              id: adapter.id,
              label: adapter.label,
              status: "error",
              message: `${adapter.timeoutMs}ms 초과 · mock fallback`,
              checkedAt
            } satisfies ProviderStatusDto
          };
        }

        return {
          payload,
          status: {
            id: adapter.id,
            label: adapter.label,
            status: "ready",
            message: "adapter 활성화 · mock fallback 유지",
            checkedAt
          } satisfies ProviderStatusDto
        };
      } catch (error) {
        const reason = error instanceof Error && error.message ? ` · ${error.message}` : "";

        return {
          payload: {},
          status: {
            id: adapter.id,
            label: adapter.label,
            status: "error",
            message: `adapter 오류${reason} · mock fallback`,
            checkedAt
          } satisfies ProviderStatusDto
        };
      }
    })
  );
  const providerPayloads = providerResults.map((result) => result.payload);

  return providerPayloads.reduce<MarketBoardData>(mergeMarketBoardData, {
    ...mockMarketBoardData,
    providerStatuses: providerResults.map((result) => result.status)
  });
}
