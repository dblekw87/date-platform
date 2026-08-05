import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson, fetchText } from "./http";
import { dedupeNews, normalizeNewsFeed, type RawNewsFeed, type RawNewsItem } from "./news-normalizer";
import { recordNewsHeadlineEvents, recordNewsHeadlines } from "./news-state";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { CalendarEventDto, LeadingStockDto, NewsHeadlineDto } from "../types";

const requiredEnv = ["MARKET_BOARD_NEWS_FEED_URL", "NAVER_API_HUB_KEY", "NEWSAPI_KEY", "FINNHUB_API_KEY", "BENZINGA_API_KEY"];
const naverNewsQueries = ["국내 증시", "코스피 코스닥", "금리 환율", "반도체 2차전지", "바이오 제약", "조선 방산", "로봇 원전", "자동차 은행", "인수합병 공시"];
const koreanNewsQueries = ["국내 증시", "금리 환율", "반도체 2차전지", "바이오 제약", "조선 방산"];
const koreanRssQueries = ["국내 증시", "코스피 코스닥", "반도체 주식", "2차전지 주식", "바이오 제약 주식", "조선 방산 주식", "로봇 원전 주식", "수소 연료전지 주식", "재생에너지 태양광 풍력 주식", "국내 공시 인수합병"];
const globalNewsQueries = ["stock market", "earnings", "interest rates", "semiconductor stocks", "energy oil", "hydrogen fuel cell stocks", "renewable energy solar wind stocks", "banks", "biotech stocks", "small cap stocks", "merger acquisition"];

type LeaderNewsQuery = {
  query: string;
  region: "KR" | "US";
  language: "ko" | "en";
  label?: string;
};

type FinnhubEarningsCalendarResponse = {
  earningsCalendar?: Array<{
    date?: string;
    epsActual?: number | null;
    epsEstimate?: number | null;
    hour?: string;
    quarter?: number;
    revenueActual?: number | null;
    revenueEstimate?: number | null;
    symbol?: string;
    year?: number;
  }>;
};

function getNewsCredentials() {
  return {
    feedUrl: process.env.MARKET_BOARD_NEWS_FEED_URL,
    naverApiHubKeyId: process.env.NAVER_API_HUB_KEY_ID,
    naverApiHubKey: process.env.NAVER_API_HUB_KEY,
    naverSearchClientId: process.env.NAVER_SEARCH_CLIENT_ID ?? process.env.NAVER_CLIENT_ID,
    naverSearchClientSecret: process.env.NAVER_SEARCH_CLIENT_SECRET ?? process.env.NAVER_CLIENT_SECRET,
    newsApiKey: process.env.NEWSAPI_KEY,
    finnhubApiKey: process.env.FINNHUB_API_KEY,
    benzingaApiKey: process.env.BENZINGA_API_KEY,
    papagoClientId: process.env.NAVER_PAPAGO_CLIENT_ID,
    papagoClientSecret: process.env.NAVER_PAPAGO_CLIENT_SECRET
  };
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function firstXmlValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));

  return match?.[1] ? decodeXml(match[1]) : undefined;
}

function stripXmlTags(value?: string) {
  return value?.replace(/<[^>]+>/g, "").trim();
}

function isArticleLikeRssSource(source?: string, title?: string) {
  const text = `${source ?? ""} ${title ?? ""}`;

  return !/blog|블로그|cafe|카페|tistory|티스토리|brunch|브런치/i.test(text);
}

async function settleFeeds(loaders: Array<() => Promise<RawNewsFeed>>) {
  const results = await Promise.allSettled(loaders.map((loader) => loader()));

  return results.flatMap((result) => {
    if (result.status !== "fulfilled") return [];

    return normalizeNewsFeed(result.value);
  });
}

function buildQueryUrl(baseUrl: string, params: Record<string, string | number | undefined>) {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function todayDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul"
  }).format(new Date());
}

function addDays(dateText: string, days: number) {
  const date = new Date(`${dateText}T00:00:00+09:00`);

  date.setUTCDate(date.getUTCDate() + days);

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul"
  }).format(date);
}

function dayLabel(dateText: string) {
  const date = new Date(`${dateText}T00:00:00+09:00`);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
    timeZone: "Asia/Seoul"
  }).format(date).replace(".", "");
}

async function loadFinnhubEarningsCalendar(credentials: ReturnType<typeof getNewsCredentials>): Promise<CalendarEventDto[]> {
  if (!credentials.finnhubApiKey) return [];

  const from = todayDate();
  const to = addDays(from, 21);
  const response = await fetchJson<FinnhubEarningsCalendarResponse>(buildQueryUrl("https://finnhub.io/api/v1/calendar/earnings", {
    from,
    to,
    token: credentials.finnhubApiKey
  }), { timeoutMs: 2200 });

  return (response.earningsCalendar ?? [])
    .flatMap((item): CalendarEventDto[] => {
      if (!item.date || !item.symbol) return [];

      return [{
        id: `finnhub-earnings-${item.symbol}-${item.date}`,
        date: item.date,
        day: dayLabel(item.date),
        type: "실적",
        title: `${item.symbol} 실적 발표`,
        market: "미국",
        check: "미국 현지일과 한국 확인 시간을 분리해 EPS·매출 컨센서스와 시간외 반응 확인",
        detail: [
          item.year && item.quarter ? `${item.year} Q${item.quarter}` : null,
          item.hour ? `발표 ${item.hour}` : null,
          typeof item.epsEstimate === "number" ? `EPS 예상 ${item.epsEstimate}` : null,
          typeof item.revenueEstimate === "number" ? `매출 예상 ${Math.round(item.revenueEstimate).toLocaleString("ko-KR")}` : null
        ].filter(Boolean).join(" · ") || "발표 후 지수선물, 업종 ETF, 관련 주도주 반응을 확인합니다.",
        source: "Finnhub",
        originalUrl: `https://www.nasdaq.com/market-activity/stocks/${item.symbol.toLowerCase()}/earnings`
      }];
    })
    .slice(0, 40);
}

function loadNaverNewsFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.naverApiHubKeyId || !credentials.naverApiHubKey) return [];

    const url = buildQueryUrl("https://naverapihub.apigw.ntruss.com/search/v1/news", {
      query,
      display: 10,
      start: 1,
      sort: "date",
      format: "json"
    });
    const response = await fetchJson<{ items?: Array<RawNewsItem & { description?: string }> }>(url, {
      timeoutMs: 1800,
      headers: {
        "X-NCP-APIGW-API-KEY-ID": credentials.naverApiHubKeyId,
        "X-NCP-APIGW-API-KEY": credentials.naverApiHubKey
      }
    });

    return {
      items: (response.items ?? []).map((item) => ({
        ...item,
        source: item.source ?? "NAVER",
        provider: "NAVER",
        region: "KR",
        category: query,
        originalUrl: item.originallink || item.link,
        text: item.title || item.description
      }))
    };
  };
}

function loadNaverDevelopersNewsFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.naverSearchClientId || !credentials.naverSearchClientSecret) return [];

    const url = buildQueryUrl("https://openapi.naver.com/v1/search/news.json", {
      query,
      display: 10,
      start: 1,
      sort: "date"
    });
    const response = await fetchJson<{ items?: Array<RawNewsItem & { description?: string }> }>(url, {
      timeoutMs: 2500,
      headers: {
        "X-Naver-Client-Id": credentials.naverSearchClientId,
        "X-Naver-Client-Secret": credentials.naverSearchClientSecret
      }
    });

    return {
      items: (response.items ?? []).map((item) => ({
        ...item,
        source: item.source ?? "NAVER",
        provider: "NAVER",
        region: "KR",
        category: query,
        originalUrl: item.originallink || item.link,
        text: item.title || item.description
      }))
    };
  };
}

function loadGoogleNewsRssFeed(query: string, options?: { region?: "KR" | "US"; language?: "ko" | "en"; label?: string }) {
  return async (): Promise<RawNewsFeed> => {
    const region = options?.region ?? "KR";
    const language = options?.language ?? "ko";
    const url = buildQueryUrl("https://news.google.com/rss/search", {
      q: `${query} when:2d`,
      hl: language,
      gl: region,
      ceid: `${region}:${language}`
    });
    const xml = await fetchText(url, { timeoutMs: 3500 });
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
      .slice(0, 12)
      .map((match) => {
        const itemXml = match[1];
        const source = firstXmlValue(itemXml, "source");
        const title = stripXmlTags(firstXmlValue(itemXml, "title"));

        return {
          title,
          source: source || "Google News",
          provider: "Google News",
          region,
          category: query,
          label: options?.label,
          pubDate: firstXmlValue(itemXml, "pubDate"),
          originalUrl: firstXmlValue(itemXml, "link")
        } satisfies RawNewsItem;
      })
      .filter((item) => isArticleLikeRssSource(item.source, item.title));

    return { items };
  };
}

function loadNewsApiFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>, options: { language: "en" | "ko"; region: "US" | "KR" }) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.newsApiKey) return [];

    const response = await fetchJson<RawNewsFeed>(buildQueryUrl("https://newsapi.org/v2/everything", {
      q: query,
      language: options.language,
      sortBy: "publishedAt",
      pageSize: 12,
      apiKey: credentials.newsApiKey
    }), { timeoutMs: 1800 });

    return Array.isArray(response) ? response.map((item) => ({ ...item, region: options.region })) : {
      ...response,
      articles: response.articles?.map((item) => ({ ...item, provider: "NewsAPI", region: options.region, category: query }))
    };
  };
}

function loadFinnhubFeed(category: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.finnhubApiKey) return [];

    const response = await fetchJson<RawNewsItem[]>(buildQueryUrl("https://finnhub.io/api/v1/news", {
      category,
      token: credentials.finnhubApiKey
    }), { timeoutMs: 1800 });

    return response.map((item) => ({ ...item, provider: "Finnhub", region: "US", category }));
  };
}

function loadBenzingaFeed(credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.benzingaApiKey) return [];

    const response = await fetchJson<Array<RawNewsItem & { author?: string; created?: string; updated?: string }>>(
      buildQueryUrl("https://api.benzinga.com/api/v2/news", {
        pageSize: 40,
        displayOutput: "headline"
      }),
      {
        timeoutMs: 1800,
        headers: {
          Authorization: `token ${credentials.benzingaApiKey}`,
          Accept: "application/json"
        }
      }
    );

    return response.map((item) => ({
      ...item,
      provider: "Benzinga",
      region: "US",
      source: item.source ?? item.author ?? "Benzinga",
      publishedAt: item.publishedAt ?? item.created ?? item.updated,
      originalUrl: item.originalUrl ?? item.url
    }));
  };
}

function shouldTranslateHeadline(item: { region: string; text: string }) {
  return item.region === "US" && !/[가-힣]/.test(item.text);
}

function isMarketRelevantHeadline(item: { label: string; region: string; source: string; text: string }) {
  const signalLabels = new Set(["매크로", "실적", "2차전지", "반도체", "AI 인프라", "AI·방산", "바이오", "항공우주", "조선·방산", "로봇·원전", "MLCC·전자부품", "광통신·네트워크", "수소·연료전지", "재생에너지", "자동차", "금융", "에너지", "암호화폐", "M&A", "정책"]);
  const text = `${signalLabels.has(item.label) ? item.label : ""} ${item.text}`;

  return /주식|증시|시장|코스피|코스닥|환율|금리|국채|선물|외국인|기관|거래량|거래대금|반도체|2차전지|배터리|바이오|제약|항공우주|우주|위성|로켓|조선|방산|로봇|원전|mlcc|콘덴서|커패시터|광통신|광모듈|광부품|네트워크|자동차|은행|금융|증권|에너지|유가|가상자산|비트코인|전력|수소|연료전지|신재생|재생에너지|태양광|풍력|AI|데이터센터|인수|합병|매각|공시|실적|가이던스|정책|규제|stock|stocks|market|shares|nasdaq|nyse|dow|s&p|russell|futures|etf|fed|fomc|cpi|ppi|yield|treasury|rate|rates|inflation|dollar|currency|oil|crude|fuel|gold|energy|renewable|hydrogen|fuel cell|solar|wind|earnings|guidance|merger|acquisition|m&a|sale|sec|fda|semiconductor|chip|chips|battery|biotech|pharma|aerospace|space|satellite|rocket|launch|capacitor|optical|photonics|coherent|networking|bank|banks|brokerage|defense|shipbuilding|robot|nuclear|crypto|bitcoin|ai|data center|tariff|regulation/i.test(text);
}

async function translateHeadline(text: string, credentials: ReturnType<typeof getNewsCredentials>) {
  if (!credentials.papagoClientId || !credentials.papagoClientSecret) return undefined;

  const response = await fetchJson<{ message?: { result?: { translatedText?: string } } }>("https://openapi.naver.com/v1/papago/n2mt", {
    method: "POST",
    timeoutMs: 2500,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Naver-Client-Id": credentials.papagoClientId,
      "X-Naver-Client-Secret": credentials.papagoClientSecret
    },
    body: new URLSearchParams({
      source: "en",
      target: "ko",
      text
    })
  });

  return response.message?.result?.translatedText;
}

async function translateUsHeadlines<T extends Array<{ region: string; text: string; originalText?: string }>>(items: T, credentials: ReturnType<typeof getNewsCredentials>) {
  if (!credentials.papagoClientId || !credentials.papagoClientSecret) return items;

  const translated = await Promise.allSettled(items.map(async (item) => {
    if (!shouldTranslateHeadline(item)) return item;

    const translatedText = await translateHeadline(item.text, credentials);

    return translatedText ? { ...item, originalText: item.text, text: translatedText } : item;
  }));

  return translated.map((result, index) => result.status === "fulfilled" ? result.value : items[index]) as T;
}

function balanceHeadlinesByRegion<T extends Array<{ region: string; publishedAt: string }>>(items: T) {
  const sorted = [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const krHeadlines = sorted.filter((item) => item.region === "KR").slice(0, 30);
  const usHeadlines = sorted.filter((item) => item.region === "US").slice(0, 40);
  const globalHeadlines = sorted.filter((item) => item.region === "GLOBAL").slice(0, 10);

  return [...krHeadlines, ...usHeadlines, ...globalHeadlines]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)) as T;
}

function limitDominantLabels<T extends Array<{ label: string; region: string; publishedAt: string }>>(items: T) {
  const sorted = [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const counts = new Map<string, number>();

  return sorted.filter((item) => {
    const key = `${item.region}:${item.label}`;
    const nextCount = (counts.get(key) ?? 0) + 1;
    const limit = item.label === "헤드라인" || item.label === "general" ? 8 : 12;

    if (nextCount > limit) return false;

    counts.set(key, nextCount);
    return true;
  }) as T;
}

function leaderTheme(leader: LeadingStockDto) {
  const [theme] = leader.reason.split(" · ");

  return theme && theme !== "개별 이슈" && theme !== "ETF" ? theme : undefined;
}

function leaderSearchName(leader: LeadingStockDto) {
  return leader.name
    .replace(/\s+(Inc\.?|Corporation|Corp\.?|Ltd\.?|PLC|Co\.?)$/i, "")
    .trim();
}

const usCompanySearchNames: Record<string, string> = {
  AMD: "Advanced Micro Devices",
  INTC: "Intel",
  MU: "Micron Technology",
  NVDA: "Nvidia",
  SNDK: "Sandisk",
  SPCX: "SPACEX"
};

const themeSearchTerms: Record<string, { ko: string; en: string }> = {
  "반도체": { ko: "반도체 주식", en: "semiconductor stocks" },
  "AI·소프트웨어": { ko: "AI 소프트웨어 주식", en: "AI software stocks" },
  "AI·방산": { ko: "AI 방산 주식", en: "AI defense stocks" },
  "전력·에너지": { ko: "전력 에너지 주식", en: "power energy stocks" },
  "수소·연료전지": { ko: "수소 연료전지 주식", en: "hydrogen fuel cell stocks" },
  "재생에너지": { ko: "재생에너지 태양광 풍력 주식", en: "renewable energy solar wind stocks" },
  "바이오": { ko: "바이오 제약 주식", en: "biotech stocks" },
  "2차전지": { ko: "2차전지 배터리 주식", en: "battery stocks" },
  "항공우주": { ko: "항공우주 위성 주식", en: "aerospace space satellite stocks" },
  "조선·방산": { ko: "조선 방산 주식", en: "defense aerospace stocks" },
  "MLCC·전자부품": { ko: "MLCC 전자부품 주식", en: "MLCC electronic components stocks" },
  "광통신·네트워크": { ko: "광통신 네트워크 장비 주식", en: "optical networking photonics stocks" },
  "전자부품·전장": { ko: "전자부품 전장 카메라모듈 주식", en: "electronics components auto parts stocks" },
  "전자부품·통신장비": { ko: "전자부품 통신장비 주식", en: "electronics communications equipment stocks" }
};

function leaderCompanySearchName(leader: LeadingStockDto) {
  return usCompanySearchNames[leader.symbol.toUpperCase()] ?? leaderSearchName(leader);
}

function uniqueByValue<T>(items: T[], keyOf: (item: T) => string) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = keyOf(item);

    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function textIncludesSymbol(text: string, symbol: string) {
  if (/^\d+$/.test(symbol)) return text.includes(symbol);

  return new RegExp(`(^|[^A-Za-z0-9])${symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z0-9]|$)`, "i").test(text);
}

export function attachLeaderNewsTags(headlines: NewsHeadlineDto[], leaders: LeadingStockDto[]) {
  const leaderCandidates = leaders
    .map((leader) => ({
      name: leaderSearchName(leader),
      companyName: leaderCompanySearchName(leader),
      symbol: leader.symbol,
      market: leader.market,
      theme: leaderTheme(leader)
    }))
    .filter((leader) => leader.name || leader.symbol);

  return headlines.map((headline) => {
    const text = `${headline.source} ${headline.label} ${headline.text} ${headline.originalText ?? ""}`;
    const relatedSymbols = uniqueByValue(
      leaderCandidates
        .filter((leader) =>
          headline.region === leader.market &&
          ((leader.name && text.toLowerCase().includes(leader.name.toLowerCase())) ||
            (leader.companyName && text.toLowerCase().includes(leader.companyName.toLowerCase())) ||
            textIncludesSymbol(text, leader.symbol))
        )
        .map((leader) => leader.symbol),
      (symbol) => symbol
    ).slice(0, 4);
    const relatedThemes = uniqueByValue(
      leaderCandidates
        .filter((leader) => leader.theme && text.includes(leader.theme))
        .map((leader) => leader.theme as string),
      (theme) => theme
    ).slice(0, 4);

    if (relatedSymbols.length === 0 && relatedThemes.length === 0) return headline;

    return {
      ...headline,
      ...(relatedSymbols.length > 0 ? { relatedSymbols } : {}),
      ...(relatedThemes.length > 0 ? { relatedThemes } : {})
    };
  });
}

export async function loadLeaderNewsHeadlines(leaders: LeadingStockDto[]) {
  const leaderQueries = uniqueByValue(
    leaders
      .slice(0, 18)
      .flatMap<LeaderNewsQuery>((leader) => {
        if (leader.market === "KR") {
          return [{ query: `${leaderSearchName(leader)} 주식`, region: leader.market, language: "ko", label: "종목 뉴스" }] satisfies LeaderNewsQuery[];
        }

        const companyName = leaderCompanySearchName(leader);

        return [
          { query: `${leader.symbol} stock news`, region: leader.market, language: "en" as const, label: "종목 뉴스" },
          { query: `${companyName} earnings guidance revenue`, region: leader.market, language: "en" as const, label: "종목 뉴스" }
        ] satisfies LeaderNewsQuery[];
      }),
    (item) => `${item.region}:${item.query}`
  ).slice(0, 16);
  const themeQueries = uniqueByValue(
    leaders
      .flatMap<LeaderNewsQuery>((leader) => {
        const theme = leaderTheme(leader);
        const terms = theme ? themeSearchTerms[theme] : undefined;

        if (!theme) return [];

        return [{
          query: leader.market === "KR" ? terms?.ko ?? `${theme} 주식` : terms?.en ?? `${theme} stocks`,
          region: leader.market,
          language: leader.market === "KR" ? "ko" as const : "en" as const,
          label: `${theme} 테마`
        }] satisfies LeaderNewsQuery[];
      }),
    (item) => `${item.region}:${item.query}`
  ).slice(0, 4);
  const loaders = [...leaderQueries, ...themeQueries].map((item) =>
    loadGoogleNewsRssFeed(item.query, { region: item.region, language: item.language, label: item.label })
  );
  const headlines = dedupeNews((await settleFeeds(loaders)).filter(isMarketRelevantHeadline)).slice(0, 30);
  const taggedHeadlines = attachLeaderNewsTags(headlines, leaders);
  const newHeadlineIds = await recordNewsHeadlines(taggedHeadlines.map((item) => item.id));

  return taggedHeadlines.map((item) => ({
    ...item,
    isNew: newHeadlineIds.has(item.id)
  }));
}

async function loadNewsHeadlines(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:news:headlines:v3", marketBoardCacheTtl.news, async () => {
    const credentials = getNewsCredentials();

    if (
      !credentials.feedUrl &&
      !credentials.naverApiHubKey &&
      !credentials.naverSearchClientSecret &&
      !credentials.newsApiKey &&
      !credentials.finnhubApiKey &&
      !credentials.benzingaApiKey
    ) {
      return {};
    }

    const loaders: Array<() => Promise<RawNewsFeed>> = [];

    if (credentials.feedUrl) {
      loaders.push(() => fetchJson<RawNewsFeed>(credentials.feedUrl as string, { timeoutMs: 1800 }));
    }

    naverNewsQueries.forEach((query) => loaders.push(loadNaverNewsFeed(query, credentials)));
    naverNewsQueries.forEach((query) => loaders.push(loadNaverDevelopersNewsFeed(query, credentials)));
    koreanNewsQueries.forEach((query) => loaders.push(loadNewsApiFeed(query, credentials, { language: "ko", region: "KR" })));
    koreanRssQueries.forEach((query) => loaders.push(loadGoogleNewsRssFeed(query)));
    globalNewsQueries.forEach((query) => loaders.push(loadNewsApiFeed(query, credentials, { language: "en", region: "US" })));
    loaders.push(loadFinnhubFeed("general", credentials));
    loaders.push(loadFinnhubFeed("forex", credentials));
    loaders.push(loadBenzingaFeed(credentials));

    const rawHeadlines = await settleFeeds(loaders);
    const marketHeadlines = rawHeadlines.filter(isMarketRelevantHeadline);
    const headlineFlow = await translateUsHeadlines(balanceHeadlinesByRegion(limitDominantLabels(dedupeNews(marketHeadlines))), credentials);
    const newHeadlineIds = await recordNewsHeadlines(headlineFlow.map((item) => item.id));
    const detectedAt = new Date().toISOString();
    const headlineFlowWithState = headlineFlow.map((item) => ({
      ...item,
      isNew: newHeadlineIds.has(item.id)
    }));

    await recordNewsHeadlineEvents(headlineFlowWithState.filter((item) => item.isNew).map((item) => ({
      id: item.id,
      source: item.source,
      label: item.label,
      text: item.text,
      publishedAt: item.publishedAt,
      originalUrl: item.originalUrl,
      detectedAt
    })));

    const calendarItems = await loadFinnhubEarningsCalendar(credentials).catch(() => []);

    return {
      ...(headlineFlowWithState.length > 0 ? { headlineFlow: headlineFlowWithState } : {}),
      ...(calendarItems.length > 0 ? { calendarItems } : {})
    };
  });
}

export const newsMarketBoardAdapter = createMockFallbackAdapter(
  "news",
  "뉴스 공급자",
  requiredEnv,
  { credentialStrategy: "any", timeoutMs: 6500 }
);

newsMarketBoardAdapter.load = loadNewsHeadlines;
