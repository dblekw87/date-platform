# Yahoo Finance Trust and Evidence Observations

## 문서 목적

이 문서는 Phase 5.3 범위에서 Yahoo Finance의 Source Visibility, Freshness, Methodology, External Source Traceability, Premium-dependent Trust를 기록한다.

Official Documentation을 Product Interaction Observation처럼 작성하지 않는다. Login Required 또는 Premium Feature는 실제 사용 Observation과 분리한다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access |
| Login | Not Logged In |
| Premium | No Yahoo Finance Premium subscription |
| Browser | Desktop web research via Codex web extraction / official URL review |
| Evidence Types | Official Product Observation, Official Documentation, Official Pricing, Inference, Not Verified |

## Trust / Evidence Observation Summary

| Classification | Observation 수 |
| --- | ---: |
| Strong Trust Signal | 4 |
| Supporting Trust Signal | 5 |
| Weak Trust Signal | 2 |
| Source Traceability | 5 |
| Methodology Traceability | 4 |
| External Evidence Link | 2 |
| Freshness Gap | 3 |
| Methodology Gap | 4 |
| Premium-dependent Trust | 5 |
| Advertisement Trust Risk | 1 |
| Not Verified | 3 |
| Total | 38 |

## Trust / Evidence Inventory

| Evidence ID | Area | Classification | Observation Status | Observation | Trust Contribution | Traceability | Limitation | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-TR-001 | Market Data Source | Strong Trust Signal / Source Traceability | Official Documentation | Yahoo Help lists exchanges, delays, and data providers by market. | data delay와 provider를 product-wide reference로 확인할 수 있다. | exchange, suffix, delay, provider table | item-level quote 화면에서 provider visibility는 별도 확인 필요 | Official Documentation | High |
| YF-TR-002 | Real-time Quote Cue | Supporting Trust Signal | Official Documentation | Yahoo Help says web quote summary shows trading information below quote price and red/green flash for real-time price changes. | user can identify real-time vs delayed status on Quote. | date, time, volume, price change cue | AAPL current quote screen direct body is Partially Observed | Official Documentation | High |
| YF-TR-003 | US Exchange Delay / Provider | Source Traceability | Official Documentation | Yahoo Help market coverage table lists US exchange delays and ICE Data Services providers for many markets. | Market and Quote Freshness can be checked by market. | market-level table | current symbol-specific delay must be checked per quote | Official Documentation | High |
| YF-TR-004 | Crypto and Currency Freshness | Supporting Trust Signal | Official Documentation | Help records cryptocurrencies and currency rates as real-time with data providers. | non-stock asset Freshness can be differentiated. | provider and delay table | Product page item-level cue Not Verified | Official Documentation | High |
| YF-TR-005 | Company and Fund Providers | Source Traceability | Official Documentation | Help lists providers for financial statements, valuation ratios, holders, profile, estimates, analyst recommendations, corporate events. | Yahoo separates Provider by data category. | provider list by category | Metric-level provider on each Quote field Not Verified | Official Documentation | High |
| YF-TR-006 | Quote Page Sections | Supporting Trust Signal | Official Documentation | Quote Help describes Summary, Chart, Statistics, Historical Data, Profile, Financials, Analysis, Options, Holders, Sustainability. | section responsibility is documented. | section-level documentation | current AAPL body for several tabs Not Verified | Official Documentation | High |
| YF-TR-007 | Quote Metric Definition | Methodology Gap | Partially Observed / Official Documentation | Statistics and valuation fields are displayed or documented, but field-level formula access was not verified. | some Metric categories are understandable by section. | category-level only | item-level formula and Source link not verified | Official Documentation / Official Product Observation | Medium |
| YF-TR-008 | Historical Data | Supporting Trust Signal / Premium-dependent Trust | Official Documentation / Premium Feature | Historical price, dividend, split data can be viewed; CSV download requires Gold subscription. | time period, show, frequency, refresh, download boundary are documented. | historical data table and CSV export | source provider and licensing restrictions vary; download not available for all instruments | Official Documentation | High |
| YF-TR-009 | Financial Statements | Source Traceability / Methodology Gap | Official Documentation | Quote Help says Financials include annual and quarterly income statements, balance sheets, and cash flow data. Provider Help says financial statements and valuation ratios are provided by Morningstar. | Financial data provider is documented. | provider-level Source | filing-level traceability from Metric to original filing Not Verified | Official Documentation | High |
| YF-TR-010 | Analyst / Estimates Data | Source Traceability | Official Documentation | Provider Help lists global company profile, EPS and revenue estimates, analyst recommendations and price target data from S&P Global Market Intelligence. | Analyst data provider is explicit. | provider-level Source | item-level update time and methodology Not Verified | Official Documentation | High |
| YF-TR-011 | Fair Value Methodology | Methodology Traceability / Premium-dependent Trust | Official Documentation / Premium Feature | Fair Value Help explains partner Trading Central and Peter Lynch-style formula assumptions. | premium valuation methodology is partially transparent. | formula, update cadence, limits, partner | actual Quote Fair Value module interaction Not Verified | Official Documentation | High |
| YF-TR-012 | Fair Value Freshness | Supporting Trust Signal | Official Documentation / Premium Feature | Fair Value Help says price data is updated daily and fundamental data weekly. | valuation Freshness is documented. | update cadence | applies to Premium Valuation feature, not all Quote Metrics | Official Documentation | High |
| YF-TR-013 | Research Reports | Source Traceability / Premium-dependent Trust | Official Documentation / Premium Feature | Research Reports Help lists Morningstar, Argus, Vickers and report types with frequencies. | partner and report frequency are visible. | provider and report-type frequency | report body and filter UI are Premium Feature / Not Verified | Official Documentation | High |
| YF-TR-014 | Premium Partner Set | Source Traceability / Premium-dependent Trust | Official Documentation / Official Pricing | upgraded plan Help lists partners including Argus Research, LSEG Data & Analytics, TREA, Greenwich.HR, Trading Central, Nasdaq. | Premium analysis is connected to named partners. | partner list | exact partner per module may require product access | Official Documentation | High |
| YF-TR-015 | Advanced Chart Methodology | Methodology Traceability / Premium-dependent Trust | Official Documentation / Premium Feature | Advanced charts Help says Trading Central pattern recognition and LSEG corporate events feed technical and event indicators. | chart event layers have named methodology partners. | partner and indicator categories | current chart UI and event marker body Not Verified | Official Documentation | Medium |
| YF-TR-016 | Public Chart Controls | Supporting Trust Signal | Official Documentation | Chart Help documents indicators, overlays, oscillators, compare, chart type, extended hours, y-axis scale. | user can understand available chart controls through Help. | control-level documentation | calculation formulas for every indicator are not fully traced | Official Documentation | Medium |
| YF-TR-017 | News Source Label | Supporting Trust Signal | Partially Observed | News Product snippets and Quote content include source-labeled articles. | publisher label supports headline trust scan. | publisher label | timestamp and related symbol consistency Not Verified | Official Product Observation | Medium |
| YF-TR-018 | News External Article | External Evidence Link | Partially Observed | News headline opens article candidate outside or inside Yahoo article context. | original publisher access can support verification. | external article candidate | exact external URL behavior and return path Not Verified | Official Product Observation / Inference | Medium |
| YF-TR-019 | Screener Filter Definition | Methodology Traceability | Official Documentation | Help defines screeners as filters for finding investments by criteria and says users can select key statistics, financial highlights, valuation measure filters. | screener purpose and filter classes are documented. | filter class documentation | individual filter formula and update cadence Not Verified | Official Documentation | Medium |
| YF-TR-020 | Saved Screener | Premium-dependent Trust / Login Required | Official Documentation | Help says creating and saving custom screeners requires sign in. | saved criteria state has official account boundary. | account action steps | persistence and free vs Premium limit Not Verified | Official Documentation | Medium |
| YF-TR-021 | Portfolio Holdings Source | Methodology Gap / Login Required | Official Documentation | Help records holdings, trade date, cost basis, transaction values, broker link, import/export. | user-entered or linked Source types are documented. | manual entry, CSV, broker link | actual calculations and reconciliation UI Not Verified | Official Documentation | Medium |
| YF-TR-022 | Portfolio Performance Method | Methodology Traceability / Premium-dependent Trust | Official Documentation / Premium Feature | Premium Portfolio Analytics Help explains time weighted return assumptions and missing cost basis handling. | performance methodology is documented. | methodology statement | actual analytics UI requires Portfolio and Premium scope | Official Documentation | High |
| YF-TR-023 | Portfolio Export | Supporting Trust Signal / Login Required | Official Documentation | Help says users can export basic list fields like symbols, prices, dates as CSV after sign in. | user can audit or backup list data. | CSV export | calculation fields and analytics export Not Verified | Official Documentation | Medium |
| YF-TR-024 | Streaming Quotes in Portfolio | Freshness Signal / Login Required | Official Documentation | Help says Yahoo Finance streams real-time quote data by default in Portfolios and lets users turn streaming off. | Portfolio Freshness state can be controlled. | setting state | actual UI not verified and market availability varies | Official Documentation | Medium |
| YF-TR-025 | Premium Ad-free Transparency | Advertisement Trust Risk / Premium-dependent Trust | Official Documentation / Official Pricing | upgraded plan Help says select plans remove third-party ads when signed in. | ad-free boundary is explicit. | plan and sign-in requirement | actual visual change Not Verified | Official Documentation | High |
| YF-TR-026 | Premium Gate Labels | Supporting Trust Signal | Official Documentation | upgraded plan Help says upgraded features are labeled with an open lock. | user can distinguish gated capabilities. | gate label | product-specific placement Not Verified | Official Documentation | Medium |
| YF-TR-027 | Conversation Evidence | Weak Trust Signal | Official Documentation / Not Verified | Quote Help mentions Conversations, but current AAPL Conversation body was Not Verified. | community content may provide sentiment context. | none verified | moderation, identity, Source quality Not Verified | Official Documentation | Low |
| YF-TR-028 | Sustainability Evidence | Weak Trust Signal / Source Traceability | Official Documentation / Partially Observed | Quote Help mentions ESG rating; provider Help lists governance scores by Institutional Shareholder Services. | ESG and governance provider candidate is documented. | provider-level only | current Sustainability body and Metric source Not Verified | Official Documentation | Medium |
| YF-TR-029 | Options Evidence | Methodology Gap | Official Documentation / Partially Observed | Quote Help says Options show Calls & Puts statistics; OPRA delay appears in market coverage table. | options delay can be referenced at market level. | OPRA delay table | current option chain body and item-level source Not Verified | Official Documentation | Medium |
| YF-TR-030 | Home Personalized Evidence | Not Verified | Not Verified / Login Required | logged-in Home personalization was not observed. | none | none | logged-in user state required | Not Verified | Low |
| YF-TR-031 | Search Suggestion Evidence | Not Verified | Not Verified | Suggestion dropdown content was not observed. | none | none | dropdown interaction not verified | Not Verified | Low |
| YF-TR-032 | Heatmap Methodology | Methodology Gap | Partially Observed | Crypto and screener heatmap view was observed, but color, size, and update methodology were not verified. | visual comparison exists. | none verified | methodology Not Verified | Official Product Observation | Low |
| YF-TR-033 | Advertisement Placement | Advertisement Trust Risk | Partially Observed | `ADVERTISEMENT` appears in official Product content; ad-free is Premium benefit. | users can identify sponsored block candidate. | label-level | position and impact Not Verified | Official Product Observation / Official Pricing | Medium |
| YF-TR-034 | Broker Link | External Evidence Link / Login Required | Official Documentation | Portfolio Help describes linking brokerage accounts. | external account connection can feed Portfolio data. | broker link step | broker list, sync cadence, reconciliation Not Verified | Official Documentation | Medium |
| YF-TR-035 | Download Boundary | Premium-dependent Trust | Official Documentation / Premium Feature | Historical CSV download requires Gold; Portfolio CSV export requires login. | data export boundary is explicit. | Help steps | exact in-product button state Not Verified | Official Documentation | High |
| YF-TR-036 | Market Data Use Disclaimer | Strong Trust Signal | Official Documentation | Yahoo Help states data is informational and not intended for trading or investing purposes. | trust boundary and usage limitation are explicit. | product-wide disclaimer | users may miss disclaimer in Product UI | Official Documentation | High |
| YF-TR-037 | Provider Granularity | Strong Trust Signal / Methodology Gap | Official Documentation | provider categories are explicit, but Metric-level provider per field is not verified. | category-level trust improves transparency. | category-level provider | item-level traceability gap remains | Official Documentation | High |
| YF-TR-038 | Public vs Premium Evidence Boundary | Strong Trust Signal / Premium-dependent Trust | Official Pricing / Documentation | Premium plan pages compare advanced data, research, charts, screeners, portfolio analytics, alerts, ad-free. | paid boundary is visible before subscription. | plan comparison | exact Surface-level lock behavior Not Verified | Official Pricing | High |

## Market Data Source

Observation:
Yahoo Help provides an exchange and data provider reference with market suffix, delay, and provider. It also states that Yahoo Finance information is informational and not intended for trading or investing purposes.

Evidence Type:
Official Documentation

Trust Contribution:
Market-level Source and delay visibility support Quote Freshness assessment.

Traceability:
exchange, suffix, delay, provider table. Item-level quote provider display is Not Verified.

Limitation:
A user may need to consult Help rather than seeing every provider next to every Metric.

DATE Implication:
Cross Benchmark에서 Product UI 안의 item-level Source와 separate Help methodology의 차이를 검토해야 한다.

Confidence:
High

## Quote Evidence

Observation:
Quote Help documents Summary, Chart, Conversations, Statistics, Historical Data, Profile, Financials, Analysis, Options, Holders, Sustainability. Provider Help links major Quote data categories to Morningstar, S&P Global Market Intelligence, Vickers-stock.com, Institutional Shareholder Services, LSEG Data & Analytics, ICE Data Services.

Evidence Type:
Official Documentation / Official Product Observation

Trust Contribution:
Quote section responsibility and provider categories are visible.

Traceability:
section-level and provider-category-level. Metric-level formula and original filing link are Not Verified.

Limitation:
several AAPL tab bodies are Partially Observed or Not Verified due direct rendering limits.

DATE Implication:
DATE에서 Quote Metric과 Provider Source를 same Surface 안에 둘지, Help-style methodology로 분리할지 비교할 질문이다.

Confidence:
High for documented section responsibility, Medium for item-level traceability.

## Financial Evidence

Observation:
Quote Help says Financials include annual and quarterly income statements, balance sheets, and cash flow data. Provider Help says financial statements, valuation ratios, market cap and shares outstanding are provided by Morningstar.

Evidence Type:
Official Documentation

Trust Contribution:
Financial category Source is documented.

Traceability:
provider-level Source is visible. Filing-level Source and original statement path are Not Verified.

Limitation:
Financial tab public depth and download behavior are Partially Observed.

DATE Implication:
Cross Benchmark에서 financial statement Source와 original filing linkage를 별도 비교해야 한다.

Confidence:
High for provider-level Source, Medium for Traceability depth.

## Analyst / Premium Evidence

Observation:
Provider Help lists EPS and revenue estimates, analyst recommendations, and price target data from S&P Global Market Intelligence. Premium Research Reports Help lists Morningstar, Argus, Vickers and report types. Fair Value Help explains Trading Central and a Peter Lynch-style formula with daily price and weekly fundamental updates.

Evidence Type:
Official Documentation / Official Pricing

Trust Contribution:
Analyst, research, and Premium valuation evidence have named partners and some methodology.

Traceability:
partner, report type, frequency, formula, update cadence. report body and product gate are Not Verified.

Limitation:
Premium subscription is required for many features.

DATE Implication:
Premium-dependent Evidence should be separated from public Evidence in Cross Benchmark.

Confidence:
High

## News Evidence

Observation:
News Product content and Quote content include source-labeled articles. Help overview identifies financial news and commentary as part of Yahoo Finance.

Evidence Type:
Official Product Observation / Official Documentation

Trust Contribution:
publisher label supports headline scan and original article selection.

Traceability:
publisher label and article link candidate. Related symbol and return path are Not Verified.

Limitation:
external article context may not preserve Quote context.

DATE Implication:
News Evidence must be evaluated with both Source label and Context Preservation.

Confidence:
Medium

## Chart Evidence

Observation:
Chart Help documents indicators, overlays, oscillators, compare, chart types, extended hours, y-axis scale. Premium advanced charts Help identifies Trading Central for pattern recognition and LSEG Data & Analytics for corporate events.

Evidence Type:
Official Documentation

Trust Contribution:
Chart controls and Premium methodology partners are documented.

Traceability:
control-level and partner-level. indicator formula details are partially documented at category level.

Limitation:
Drawing Tool current UI and Premium chart event UI are Not Verified.

DATE Implication:
Chart Evidence should distinguish raw price chart, calculated indicator, and partner event layer.

Confidence:
Medium to High

## Screener Evidence

Observation:
Yahoo Help defines screeners as filters for finding investments by criteria and says users can create screeners for stocks, mutual funds, and ETFs with key statistics, financial highlights, valuation measure filters. Saving requires sign in.

Evidence Type:
Official Documentation / Official Product Observation

Trust Contribution:
filter purpose and saved-state boundary are documented.

Traceability:
filter-category level. individual filter formula and update cadence are Not Verified.

Limitation:
Premium Screener filters and Download gate require further access validation.

DATE Implication:
Screener Metric Traceability should be reviewed separately from screener usability.

Confidence:
Medium

## Portfolio Evidence

Observation:
Portfolio Help describes holdings, transactions, trade dates, cost basis, manual entry, CSV import/export, brokerage link. Premium Portfolio Analytics Help describes performance, risk, allocation, heat map view, model portfolios, and time weighted return assumptions.

Evidence Type:
Official Documentation / Official Pricing

Trust Contribution:
Portfolio Source and calculation assumptions are partly documented.

Traceability:
manual, CSV, broker link, methodology statements. Actual UI and calculations are Not Verified.

Limitation:
Login Required and Premium Feature boundary prevents direct observation.

DATE Implication:
Portfolio Evidence needs distinction between user-entered data, broker-synced data, calculated analytics, and Premium insights.

Confidence:
Medium

## Advertisement / Premium Transparency

Observation:
Premium plan pages and upgraded plan Help distinguish Premium benefits including ad-free. Help says upgraded features are labeled with an open lock, and select plans remove third-party ads after sign-in.

Evidence Type:
Official Pricing / Official Documentation

Trust Contribution:
subscription boundary is visible and labeled.

Traceability:
plan-level. product-surface-specific lock placement is Not Verified.

Limitation:
actual ad-free layout effect is Not Verified.

DATE Implication:
Cross Benchmark should separate advertisement as monetization condition from Premium as capability and density control.

Confidence:
High for official boundary, Medium for Product UI behavior.

## Open Question

- Quote Summary에서 exchange, real-time/delayed status, date/time, provider가 current UI에 어떻게 표시되는가.
- Quote Metric별 formula와 Source가 item-level로 접근 가능한가.
- Financial tab에서 original filing 또는 report Source로 이동 가능한가.
- Analyst Rating, Price Target, Estimate 각각의 provider label이 item-level로 표시되는가.
- Fair Value module의 in-product methodology link와 lock state 확인 필요.
- News article에서 related symbol과 original article URL이 어떻게 표시되는가.
- Chart indicator formula와 event marker Source가 Product UI 안에 표시되는가.
- Screener filter formula와 update cadence 확인 필요.
- Portfolio performance calculation UI, cost basis handling, broker sync cadence 확인 필요.
- Premium gate label이 Quote, Chart, Screener, Portfolio에서 일관적인지 확인 필요.
