import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson, fetchText } from "./http";
import { recordSecAccessions, recordSecDisclosureEvents } from "./sec-state";
import type { MarketBoardProviderPayload } from "./types";

type SecCompanyTicker = {
  cik_str: number;
  ticker: string;
  title: string;
};

type SecCurrentFiling = {
  accessionNumber: string;
  cik: string;
  companyName: string;
  filedAt: string;
  form: string;
  originalUrl: string;
  summary: string;
};

const watchedForms = new Set(["8-K", "13D", "13G", "SC 13D", "SC 13G", "S-1", "424B5", "PREM14A", "DEFM14A", "SC TO-T", "SC TO-I"]);

const material8KKeywords = [
  "acquisition",
  "agreement",
  "asset",
  "bankruptcy",
  "business combination",
  "change in control",
  "definitive merger agreement",
  "disposition",
  "entry into",
  "going private",
  "merger",
  "offering",
  "sale",
  "tender offer",
  "termination"
];

const eventRules = [
  { eventType: "인수합병 후보", score: 96, itemCodes: ["2.01"], keywords: ["merger", "business combination", "acquisition", "definitive merger agreement", "plan of merger", "tender offer", "going private"] },
  { eventType: "매각·자산처분 후보", score: 90, itemCodes: ["2.01", "2.05"], keywords: ["disposition", "asset sale", "sale of assets", "divestiture"] },
  { eventType: "증자·발행 후보", score: 84, itemCodes: ["3.02"], keywords: ["offering", "private placement", "registered direct", "securities purchase", "424b5"] },
  { eventType: "지배권 변경 후보", score: 82, itemCodes: ["5.01", "5.02"], keywords: ["change in control", "departure of directors", "appointment of officers"] },
  { eventType: "주요 계약 후보", score: 74, itemCodes: ["1.01", "1.02"], keywords: ["entry into", "material definitive agreement", "agreement"] },
  { eventType: "상장·재무 위험 후보", score: 68, itemCodes: ["1.03"], keywords: ["bankruptcy", "delisting", "non-compliance", "going concern"] }
];

function isMaterial8K(description: string) {
  const normalized = description.toLowerCase();

  return material8KKeywords.some((keyword) => normalized.includes(keyword));
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#39;/g, "'")
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

function firstXmlAttribute(xml: string, tag: string, attribute: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*\\s${attribute}="([^"]+)"`, "i"));

  return match?.[1] ? decodeXml(match[1]) : undefined;
}

function extract8KItemCodes(text: string) {
  const codes = new Set<string>();
  const matches = text.matchAll(/Item\s+([1-9]\.\d{2})/gi);

  for (const match of matches) {
    codes.add(match[1]);
  }

  return [...codes];
}

function classifySecEvent(form: string, description: string, documentText = "") {
  const itemCodes = extract8KItemCodes(documentText);
  const normalized = `${form} ${description} ${documentText.slice(0, 12_000)}`.toLowerCase();

  if (form.includes("13")) {
    return { eventType: "지분 변동", score: 72 };
  }

  if (form === "S-1" || form.startsWith("424B")) {
    return { eventType: "증권 발행", score: 76 };
  }

  if (form.includes("14A") || form.startsWith("SC TO")) {
    return { eventType: "인수합병 후보", score: 88 };
  }

  const keywordRule = eventRules.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
  const matchedRule = keywordRule ?? eventRules.find((rule) => rule.itemCodes.some((code) => itemCodes.includes(code)));

  if (matchedRule) {
    return {
      eventType: matchedRule.eventType,
      score: matchedRule.score
    };
  }

  return {
    eventType: form === "8-K" ? "8-K 원문 확인" : "SEC 원문 확인",
    score: form === "8-K" ? 48 : 44
  };
}

function secHeaders() {
  return {
    "User-Agent": "DATE Market Board contact@example.com",
    Accept: "application/json"
  };
}

async function loadCompanyTickerMap() {
  return readThroughCache("market-board:sec:company-tickers", marketBoardCacheTtl.calendar, async () =>
    fetchJson<Record<string, SecCompanyTicker>>("https://www.sec.gov/files/company_tickers.json", {
      headers: secHeaders(),
      timeoutMs: 2200
    })
  );
}

async function loadTickerByCik() {
  const tickerMap = await loadCompanyTickerMap();
  const byCik = new Map<string, SecCompanyTicker>();

  Object.values(tickerMap).forEach((company) => {
    byCik.set(String(company.cik_str).padStart(10, "0"), company);
  });

  return byCik;
}

function secCurrentFilingsUrl(type?: string) {
  const url = new URL("https://www.sec.gov/cgi-bin/browse-edgar");

  url.searchParams.set("action", "getcurrent");
  url.searchParams.set("count", "100");
  url.searchParams.set("output", "atom");
  if (type) url.searchParams.set("type", type);

  return url.toString();
}

async function loadCurrentSecFeed(type?: string) {
  const xml = await fetchText(secCurrentFilingsUrl(type), {
    headers: {
      "User-Agent": process.env.SEC_USER_AGENT ?? "DATE Market Board admin@date-platform.local",
      Accept: "application/atom+xml"
    },
    timeoutMs: 4000
  });

  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].flatMap((match): SecCurrentFiling[] => {
    const entryXml = match[1];
    const title = firstXmlValue(entryXml, "title") ?? "";
    const summary = stripHtml(firstXmlValue(entryXml, "summary") ?? "");
    const form = firstXmlAttribute(entryXml, "category", "term") ?? title.split(" - ")[0]?.trim();
    const cik = title.match(/\((\d{10})\)/)?.[1];
    const companyName = title.match(/^[^-]+-\s+(.+?)\s+\(\d{10}\)/)?.[1]?.trim();
    const accessionNumber = summary.match(/AccNo:\s*([0-9-]+)/i)?.[1] ?? firstXmlValue(entryXml, "id")?.match(/accession-number=([0-9-]+)/)?.[1];
    const originalUrl = firstXmlAttribute(entryXml, "link", "href");
    const filedAt = firstXmlValue(entryXml, "updated") ?? new Date().toISOString();

    if (!form || !cik || !companyName || !accessionNumber || !originalUrl) return [];

    return [{
      accessionNumber,
      cik,
      companyName,
      filedAt,
      form,
      originalUrl,
      summary
    }];
  });
}

async function loadCurrentSecFilings() {
  const feedTypes = [undefined, "8-K", "SC 13D", "SC 13G", "S-1", "424B5", "PREM14A", "DEFM14A", "SC TO-T", "SC TO-I"];
  const results = await Promise.allSettled(feedTypes.map((type) => loadCurrentSecFeed(type)));
  const byAccession = new Map<string, SecCurrentFiling>();

  results.forEach((result) => {
    if (result.status !== "fulfilled") return;

    result.value.forEach((item) => {
      if (watchedForms.has(item.form) && !byAccession.has(item.accessionNumber)) {
        byAccession.set(item.accessionNumber, item);
      }
    });
  });

  return [...byAccession.values()];
}

async function normalizeSecCurrentFilings(filings: SecCurrentFiling[]): Promise<MarketBoardProviderPayload> {
  const tickerByCik = await loadTickerByCik();
  const newAccessions = await recordSecAccessions("current-feed", filings.map((item) => item.accessionNumber));
  const rankedDisclosures = filings
    .map((filing) => {
      const tickerInfo = tickerByCik.get(filing.cik);
      const symbol = tickerInfo?.ticker;
      const companyName = tickerInfo?.title ?? filing.companyName;
      const event = classifySecEvent(filing.form, filing.summary);
      const materialTag = filing.form === "8-K" && (isMaterial8K(filing.summary) || event.score >= 68) ? event.eventType : "SEC 원문";
      const isNew = newAccessions.has(filing.accessionNumber);
      const priorityScore = event.score + (isNew ? 30 : 0) + (symbol ? 8 : 0);

      return {
        id: `sec-${filing.cik}-${filing.accessionNumber}`,
        cik: filing.cik,
        market: "US" as const,
        source: "SEC" as const,
        urgency: filing.form.includes("13") ? "지분" : filing.form === "8-K" ? "공시" : "증권",
        companyName,
        symbol,
        issuerType: "unknown" as const,
        eventType: event.eventType,
        accessionNumber: filing.accessionNumber,
        isNew,
        formType: filing.form,
        title: `${symbol ? `${symbol} · ` : ""}${companyName} · ${event.eventType}`,
        filedAt: filing.filedAt,
        originalUrl: filing.originalUrl,
        tags: ["SEC 전체", ...(isNew ? ["새 공시"] : []), materialTag, "조건 확인"],
        action: `${companyName} · 원문 Item 확인`,
        priorityScore
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore || b.filedAt.localeCompare(a.filedAt))
    .slice(0, 30);
  const usDisclosures = rankedDisclosures.map((disclosure) => ({
    id: disclosure.id,
    market: disclosure.market,
    source: disclosure.source,
    urgency: disclosure.urgency,
    companyName: disclosure.companyName,
    symbol: disclosure.symbol ?? disclosure.cik,
    issuerType: disclosure.issuerType,
    eventType: disclosure.eventType,
    accessionNumber: disclosure.accessionNumber,
    isNew: disclosure.isNew,
    formType: disclosure.formType,
    title: disclosure.title,
    filedAt: disclosure.filedAt,
    originalUrl: disclosure.originalUrl,
    tags: disclosure.tags,
    action: disclosure.action
  }));
  await recordSecDisclosureEvents(rankedDisclosures.filter((disclosure) => disclosure.isNew).map((disclosure) => ({
    id: disclosure.id,
    cik: disclosure.cik,
    accessionNumber: disclosure.accessionNumber,
    symbol: disclosure.symbol ?? disclosure.cik,
    companyName: disclosure.companyName,
    issuerType: disclosure.issuerType,
    eventType: disclosure.eventType,
    formType: disclosure.formType,
    filedAt: disclosure.filedAt,
    originalUrl: disclosure.originalUrl,
    detectedAt: new Date().toISOString()
  })));

  return usDisclosures.length > 0 ? { usDisclosures } : {};
}

async function loadSecSubmissions(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:sec:submissions:v5", marketBoardCacheTtl.disclosure, async () => {
    const filings = await loadCurrentSecFilings();

    return await normalizeSecCurrentFilings(filings);
  });
}

export const secMarketBoardAdapter = {
  id: "sec" as const,
  label: "SEC EDGAR",
  requiredEnv: [],
  timeoutMs: 5000,
  hasCredentials: () => true,
  load: loadSecSubmissions
};
