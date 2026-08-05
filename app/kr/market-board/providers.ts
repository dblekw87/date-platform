import { marketBoardProviderAdapters } from "./adapters";
import { attachLeaderNewsTags, loadLeaderNewsHeadlines } from "./adapters/news";
import { mockMarketBoardData } from "./mock-data";
import type { LeadingStockDto, MarketBoardData, MarketBriefDto, MarketSnapshotDto, NewsHeadlineDto, ProviderStatusDto, SourceProvider } from "./types";

const timeoutSymbol = Symbol("market-board-provider-timeout");

const focusEarningsCalendarItems: MarketBoardData["calendarItems"] = [
  {
    id: "focus-earnings-amd-2026-08-04",
    date: "2026-08-04",
    day: "화",
    type: "실적",
    title: "AMD 실적 발표",
    market: "미국",
    check: "미국 8월 4일 장마감 후 발표 · 한국은 8월 5일 새벽 확인",
    detail: "AMD IR 기준 fiscal Q2 2026 실적 발표입니다. 발표 후 시간외 반응, 반도체 ETF, 관련 AI 인프라 종목 반응을 함께 확인합니다.",
    source: "AMD IR",
    originalUrl: "https://ir.amd.com/news-events/press-releases/detail/1289/amd-to-report-fiscal-second-quarter-2026-financial-results",
    publishedAt: "2026-08-05T05:15:00+09:00"
  },
  {
    id: "focus-earnings-sndk-2026-08-06-kst",
    date: "2026-08-06",
    day: "목",
    type: "실적",
    title: "SanDisk 실적 발표",
    market: "미국",
    check: "미국 8월 5일 13:30 PT 컨퍼런스콜 · 한국은 8월 6일 05:30 확인",
    detail: "Sandisk IR 기준 fiscal Q4/FY 2026 실적 발표입니다. NAND/스토리지 가격, Western Digital 동반 반응, 반도체 수급을 함께 확인합니다.",
    source: "Sandisk IR",
    originalUrl: "https://www.sandisk.com/company/newsroom/press-releases/2026/2026-07-09-sandisk-report-fiscal-fourth-quarter-fiscal-year-2026-results-august-5",
    publishedAt: "2026-08-06T05:30:00+09:00"
  }
];

function missingCredentialMessage(requiredEnv: string[]) {
  return requiredEnv.length > 0 ? `${requiredEnv.join(", ")} 없음 · provider 비활성` : "공개 adapter 대기";
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
  const mergeById = <T extends { id: string }>(baseItems: T[], payloadItems?: T[]) => {
    if (!payloadItems) return baseItems;

    const byId = new Map(baseItems.map((item) => [item.id, item]));

    payloadItems.forEach((item) => byId.set(item.id, item));

    return [...byId.values()];
  };
  const mergeMacroSnapshot = (baseItems: MarketSnapshotDto[], payloadItems?: MarketSnapshotDto[]) => {
    const providerPriority: Record<SourceProvider, number> = {
      kis: 60,
      toss: 50,
      market: 40,
      krx: 30,
      dart: 20,
      sec: 20,
      news: 20,
      mock: 0
    };
    const byKey = new Map<string, MarketSnapshotDto>();

    mergeById(baseItems, payloadItems).forEach((item) => {
      const key = `${item.market}:${item.instrumentType}:${item.symbol.toUpperCase()}`;
      const current = byKey.get(key);

      if (!current || providerPriority[item.source] >= providerPriority[current.source]) {
        byKey.set(key, item);
      }
    });

    return [...byKey.values()];
  };

  return {
    ...base,
    ...payload,
    tabs: payload.tabs ?? base.tabs,
    disclosureTabs: payload.disclosureTabs ?? base.disclosureTabs,
    leaderTabs: payload.leaderTabs ?? base.leaderTabs,
    adSlots: payload.adSlots ?? base.adSlots,
    providerStatuses: payload.providerStatuses ?? base.providerStatuses,
    macroSnapshot: mergeMacroSnapshot(base.macroSnapshot, payload.macroSnapshot),
    marketBrief: mergeById(base.marketBrief, payload.marketBrief),
    headlineFlow: payload.headlineFlow ?? base.headlineFlow,
    calendarItems: mergeById(base.calendarItems, payload.calendarItems)
      .sort((left, right) => left.date.localeCompare(right.date) || left.type.localeCompare(right.type) || left.title.localeCompare(right.title)),
    usDisclosures: payload.usDisclosures ?? base.usDisclosures,
    krDisclosures: payload.krDisclosures ?? base.krDisclosures,
    flowItems: payload.flowItems ?? base.flowItems,
    usLeadingStocks: payload.usLeadingStocks ?? base.usLeadingStocks,
    krLeadingStocks: payload.krLeadingStocks ?? base.krLeadingStocks,
    smallCapScanner: payload.smallCapScanner ?? base.smallCapScanner
  };
}

function withoutMockContent(data: MarketBoardData): MarketBoardData {
  return {
    ...data,
    macroSnapshot: [],
    marketBrief: [],
    headlineFlow: [],
    calendarItems: focusEarningsCalendarItems,
    usDisclosures: [],
    krDisclosures: [],
    flowItems: [],
    usLeadingStocks: [],
    krLeadingStocks: [],
    smallCapScanner: []
  };
}

function mergeNewsHeadlines(baseItems: NewsHeadlineDto[], payloadItems: NewsHeadlineDto[]) {
  const byId = new Map(baseItems.map((item) => [item.id, item]));

  payloadItems.forEach((item) => byId.set(item.id, item));

  return [...byId.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function parseTurnoverValue(value: string) {
  const normalized = value.replace(/,/g, "");
  const number = Number(normalized.match(/\d+(?:\.\d+)?/)?.[0] ?? 0);

  if (!Number.isFinite(number)) return 0;
  if (/\$/.test(value)) {
    if (/B/i.test(value)) return number * 1_000_000_000;
    if (/M/i.test(value)) return number * 1_000_000;

    return number;
  }
  if (/조/.test(value)) return number * 1_000_000_000_000;
  if (/억/.test(value)) return number * 100_000_000;

  return number;
}

function leaderTheme(leader: LeadingStockDto) {
  const [theme] = leader.reason.split(" · ");

  return theme && theme !== "ETF" ? theme : "";
}

function buildThemeLeadershipBrief(id: string, region: string, leaders: LeadingStockDto[], currency: "KRW" | "USD"): MarketBriefDto | null {
  const byTheme = new Map<string, { turnover: number; leaders: string[] }>();

  leaders.forEach((leader) => {
    const theme = leaderTheme(leader);

    if (!theme || theme === "개별 이슈" || theme === "미분류") return;

    const current = byTheme.get(theme) ?? { turnover: 0, leaders: [] };

    current.turnover += parseTurnoverValue(leader.turnover);
    if (current.leaders.length < 3) current.leaders.push(leader.name);
    byTheme.set(theme, current);
  });

  const themes = [...byTheme.entries()]
    .map(([theme, score]) => ({ theme, ...score }))
    .filter((score) => score.turnover > 0)
    .sort((left, right) => right.turnover - left.turnover)
    .slice(0, 3);

  if (themes.length === 0) return null;

  const formatAmount = (value: number) => {
    if (currency === "USD") {
      if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
      if (value >= 1_000_000) return `$${Math.round(value / 1_000_000).toLocaleString("ko-KR")}M`;

      return `$${Math.round(value).toLocaleString("ko-KR")}`;
    }

    const eok = value / 100_000_000;

    if (eok >= 10_000) return `${(eok / 10_000).toFixed(1)}조`;
    if (eok >= 100) return `${Math.round(eok).toLocaleString("ko-KR")}억`;

    return `${eok.toFixed(1)}억`;
  };

  return {
    id,
    region,
    title: `금일 강세 테마는 ${themes.map((theme, index) => `${index + 1}위 ${theme.theme}`).join(", ")}입니다.`,
    points: themes.map((theme) => `${theme.theme}: ${formatAmount(theme.turnover)} · ${theme.leaders.join(", ")}`),
    source: "toss",
    timestamp: new Date().toISOString()
  };
}

function attachDerivedThemeBriefs(data: MarketBoardData): MarketBoardData {
  const derived = [
    buildThemeLeadershipBrief("derived-kr-theme-leadership", "시황 · 국내 강세 테마", data.krLeadingStocks, "KRW"),
    buildThemeLeadershipBrief("derived-us-theme-leadership", "시황 · 미국 강세 테마", data.usLeadingStocks, "USD")
  ].filter((brief): brief is MarketBriefDto => Boolean(brief));

  if (derived.length === 0) return data;

  const byId = new Map(data.marketBrief.map((brief) => [brief.id, brief]));

  derived.forEach((brief) => byId.set(brief.id, brief));

  return {
    ...data,
    marketBrief: [...byId.values()]
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
              message: `${adapter.timeoutMs}ms 초과 · 해당 데이터 제외`,
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
            message: "adapter 활성화 · live 데이터 수신",
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
            message: `adapter 오류${reason} · 해당 데이터 제외`,
            checkedAt
          } satisfies ProviderStatusDto
        };
      }
    })
  );
  const providerPayloads = providerResults.map((result) => result.payload);
  const baseData: MarketBoardData = {
    ...withoutMockContent(mockMarketBoardData),
    providerStatuses: providerResults.map((result) => result.status)
  };

  const mergedData = attachDerivedThemeBriefs(providerPayloads.reduce<MarketBoardData>(mergeMarketBoardData, baseData));
  const leaders = [...mergedData.krLeadingStocks, ...mergedData.usLeadingStocks];

  if (leaders.length === 0) return mergedData;

  const taggedHeadlines = attachLeaderNewsTags(mergedData.headlineFlow, leaders);
  const leaderNewsResult = await withTimeout(loadLeaderNewsHeadlines(leaders), 4500);
  const leaderHeadlines = leaderNewsResult === timeoutSymbol ? [] : leaderNewsResult;

  return {
    ...mergedData,
    headlineFlow: mergeNewsHeadlines(taggedHeadlines, leaderHeadlines)
  };
}
