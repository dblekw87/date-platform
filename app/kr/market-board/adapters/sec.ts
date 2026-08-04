import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson, fetchText } from "./http";
import { recordSecAccessions, recordSecDisclosureEvents } from "./sec-state";
import type { MarketBoardProviderPayload } from "./types";

type SecSubmissionResponse = {
  cik: string;
  name: string;
  tickers?: string[];
  filings?: {
    recent?: {
      accessionNumber?: string[];
      filingDate?: string[];
      reportDate?: string[];
      form?: string[];
      primaryDocument?: string[];
      primaryDocDescription?: string[];
    };
  };
};

type SecCompanyTicker = {
  cik_str: number;
  ticker: string;
  title: string;
};

type TrackedSecCompany = {
  cik: string;
  symbol: string;
  issuerType: "large-cap" | "small-cap";
};

const defaultLargeCapTickers = ["AAPL", "MSFT", "NVDA", "TSLA"];
const defaultSmallCapTickers = ["SOUN", "BBAI", "LUNR", "RGTI", "ACHR", "IONQ", "JOBY"];

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

function secArchivesUrl(cik: string, accessionNumber: string, primaryDocument?: string) {
  const compactCik = String(Number(cik));
  const compactAccession = accessionNumber.replaceAll("-", "");

  return `https://www.sec.gov/Archives/edgar/data/${compactCik}/${compactAccession}/${primaryDocument ?? ""}`;
}

function readTickerList(envKey: string, fallback: string[]) {
  const value = process.env[envKey];

  if (!value) {
    return fallback;
  }

  const tickers = value
    .split(",")
    .map((ticker) => ticker.trim().toUpperCase())
    .filter(Boolean);

  return tickers.length > 0 ? tickers : fallback;
}

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

async function resolveTrackedCompanies(): Promise<TrackedSecCompany[]> {
  const tickerMap = await loadCompanyTickerMap();
  const companies = Object.values(tickerMap);
  const targetTickers = new Map<string, TrackedSecCompany["issuerType"]>();
  const largeCapTickers = readTickerList("SEC_LARGE_CAP_TICKERS", defaultLargeCapTickers);
  const smallCapTickers = readTickerList("SEC_SMALL_CAP_TICKERS", defaultSmallCapTickers);

  largeCapTickers.forEach((ticker) => targetTickers.set(ticker, "large-cap"));
  smallCapTickers.forEach((ticker) => targetTickers.set(ticker, "small-cap"));

  return companies
    .filter((company) => targetTickers.has(company.ticker))
    .map((company) => ({
      cik: String(company.cik_str).padStart(10, "0"),
      symbol: company.ticker,
      issuerType: targetTickers.get(company.ticker) ?? "small-cap"
    }));
}

async function loadDocumentText(url: string) {
  try {
    const html = await fetchText(url, {
      headers: {
        "User-Agent": "DATE Market Board contact@example.com",
        Accept: "text/html"
      },
      timeoutMs: 1800
    });

    return stripHtml(html);
  } catch {
    return "";
  }
}

async function normalizeSecSubmissions(responses: Array<{ company: TrackedSecCompany; response: SecSubmissionResponse }>): Promise<MarketBoardProviderPayload> {
  const disclosureGroups = await Promise.all(responses.map(async ({ company, response }) => {
    const recent = response.filings?.recent;
    const forms = recent?.form ?? [];

    const rawItems = forms
      .map((form, index) => {
        const accessionNumber = recent?.accessionNumber?.[index];

        if (!accessionNumber || !watchedForms.has(form)) {
          return null;
        }

        const primaryDocument = recent?.primaryDocument?.[index];
        const filedAt = recent?.filingDate?.[index] ?? new Date().toISOString();
        const description = recent?.primaryDocDescription?.[index] ?? form;
        const originalUrl = secArchivesUrl(response.cik, accessionNumber, primaryDocument);

        return {
          accessionNumber,
          description,
          filedAt,
          form,
          originalUrl
        };
      })
      .filter((item) => item !== null)
      .slice(0, company.issuerType === "small-cap" ? 4 : 2);
    const newAccessions = await recordSecAccessions(response.cik, rawItems.map((item) => item.accessionNumber));

    const items = await Promise.all(rawItems.map(async (rawItem) => {
        const documentText = rawItem.form === "8-K" ? await loadDocumentText(rawItem.originalUrl) : "";
        const issuerTag = company.issuerType === "small-cap" ? "소형주 감시" : "대형주 기준";
        const event = classifySecEvent(rawItem.form, rawItem.description, documentText);
        const materialTag = rawItem.form === "8-K" && (isMaterial8K(rawItem.description) || event.score >= 68) ? event.eventType : "SEC 원문";
        const isNew = newAccessions.has(rawItem.accessionNumber);
        const priorityScore = event.score + (company.issuerType === "small-cap" ? 18 : 0);

        return {
          id: `sec-${response.cik}-${rawItem.accessionNumber}`,
          cik: response.cik,
          market: "US" as const,
          source: "SEC" as const,
          urgency: rawItem.form.includes("13") ? "지분" : rawItem.form === "8-K" ? "공시" : "증권",
          companyName: response.name,
          symbol: company.symbol,
          issuerType: company.issuerType,
          eventType: event.eventType,
          accessionNumber: rawItem.accessionNumber,
          isNew,
          formType: rawItem.form,
          title: `${company.symbol} · ${event.eventType}`,
          filedAt: rawItem.filedAt,
          originalUrl: rawItem.originalUrl,
          tags: [issuerTag, ...(isNew ? ["새 공시"] : []), materialTag, "조건 확인"],
          action: `${response.name} · 원문 Item 확인`,
          priorityScore: priorityScore + (isNew ? 30 : 0)
        };
      }));

    return {
      issuerType: company.issuerType,
      items: items.slice(0, company.issuerType === "small-cap" ? 2 : 1)
    };
  }));

  const smallCapItems = disclosureGroups
    .filter((group) => group.issuerType === "small-cap")
    .flatMap((group) => group.items);
  const largeCapItems = disclosureGroups
    .filter((group) => group.issuerType === "large-cap")
    .flatMap((group) => group.items);
  const rankedDisclosures = [...smallCapItems.slice(0, 6), ...largeCapItems.slice(0, 4)]
    .sort((a, b) => b.priorityScore - a.priorityScore || b.filedAt.localeCompare(a.filedAt))
    .slice(0, 6);
  const usDisclosures = rankedDisclosures.map((disclosure) => ({
    id: disclosure.id,
    market: disclosure.market,
    source: disclosure.source,
    urgency: disclosure.urgency,
    companyName: disclosure.companyName,
    symbol: disclosure.symbol,
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
    symbol: disclosure.symbol,
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
  return readThroughCache("market-board:sec:submissions:v4", marketBoardCacheTtl.disclosure, async () => {
    const trackedCompanies = await resolveTrackedCompanies();
    const responses = await Promise.all(
      trackedCompanies.map((company) =>
        fetchJson<SecSubmissionResponse>(`https://data.sec.gov/submissions/CIK${company.cik}.json`, {
          headers: secHeaders(),
          timeoutMs: 2200
        }).then((response) => ({ company, response }))
      )
    );

    return await normalizeSecSubmissions(responses);
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
