# Yahoo Finance Information Density Observations

## 문서 목적

이 문서는 Phase 5.1과 Phase 5.2 Observation을 기반으로 Yahoo Finance의 Information Density Pattern을 기록한다.

이 문서는 Information Density, Density Control, Density Risk, Portal Pattern, Entity Hub Pattern만 다룬다. Trust / Evidence는 [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md), Product Flow Architecture는 [08-product-flow-architecture.md](08-product-flow-architecture.md)에 기록한다.

Candidate Principle과 Registry 수정은 수행하지 않는다.

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

## Information Density Observation Summary

| Classification | Observation 수 |
| --- | ---: |
| Density Enabler | 5 |
| Density Control | 5 |
| Density Risk | 4 |
| Portal Pattern | 2 |
| Entity Hub Pattern | 2 |
| Progressive Disclosure | 3 |
| Simultaneous Disclosure | 2 |
| Advertisement Interference | 2 |
| Not Verified | 2 |
| Total | 27 |

## Pattern Inventory

| Pattern ID | Pattern | Classification | Surface | Observation Status | User Impact | Potential Trade-off | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-DEN-001 | Home Portal Mix | Portal Pattern / Simultaneous Disclosure | Home | Partially Observed | Market, News, Trending Tickers, Watchlist candidate, Premium entry를 한 entry에서 접근하게 한다. | direct body 429로 current hierarchy가 불명확하고 personalized blocks는 Login Required candidate다. | Official Product root, About, Help overview | Medium |
| YF-DEN-002 | Markets Category Tables | Density Enabler / Comparison Pattern | Markets | Observed | World, region, commodity, currency, bond, stock sections를 category 비교로 구성한다. | asset detail transition은 Not Verified라 table 이후 분석 depth가 제한적으로만 확인됐다. | Markets Product page | High |
| YF-DEN-003 | Quote Summary as Entity Hub | Entity Hub Pattern / Simultaneous Disclosure | Quote | Observed / Partially Observed | price, chart thumbnail, Metrics, News, company profile candidate, tabs를 ticker context에 묶는다. | Stock와 Company Display boundary가 흐릴 수 있고 일부 tab body는 Not Verified다. | AAPL Quote indexed Product content | High |
| YF-DEN-004 | Quote Local Tabs | Density Control / Progressive Disclosure | Quote | Observed / Partially Observed | Statistics, Financials, Holders, Analysis, Options, Historical Data 등 detail sections를 ticker context 안에서 분리한다. | tab body current rendering은 일부 429 또는 Not Verified다. | Quote Product content, Yahoo Help Quote article | High |
| YF-DEN-005 | Chart Capability Cluster | Density Control / Progressive Disclosure | Chart | Official Documentation / Partially Observed | range, interval, indicator, compare, chart type, settings를 chart task 안에 묶는다. | Drawing Tool과 Premium boundary는 Not Verified다. | Yahoo Help chart articles | High |
| YF-DEN-006 | Search Compression | Density Enabler | Search | Official Documentation / Partially Observed | company name, ticker, ETF, index, commodity, mutual fund, crypto lookup을 하나의 entry로 압축한다. | Suggestion dropdown 정보량과 disambiguation UI는 Not Verified다. | Yahoo Help Search article | High |
| YF-DEN-007 | News Feed Cards | Scan Pattern | News | Partially Observed | headline, category, source-labeled article, video candidate로 headline scan을 지원한다. | related symbol 표시와 external article return path는 Not Verified다. | News Product snippets, Help overview | Medium |
| YF-DEN-008 | Screener Hub Cards | Density Control | Screeners | Observed | predefined screener cards가 novice discovery entry를 낮은 setup cost로 제공한다. | custom criteria로 전환하면 Login Required와 Premium boundary가 생긴다. | Screeners Product page, Help Screeners | High |
| YF-DEN-009 | Screener Result Table | Density Enabler / Comparison Pattern | Predefined Screener Result | Observed | predefined criteria, result table, heatmap view, Save, Download, Customize candidate를 한 Screen에 배치한다. | Save / Download gate와 Quote transition state는 Not Verified다. | predefined screener result Product page | High |
| YF-DEN-010 | Crypto Table / Heatmap Switch | Density Control / Comparison Pattern | All Cryptocurrencies | Observed | Crypto Asset set을 table과 heatmap view로 전환한다. | heatmap interaction depth와 cell click은 Not Verified다. | All Cryptocurrencies Product page | High |
| YF-DEN-011 | Portfolio Landing as Low-density Gate | Density Control | My Portfolio | Login Required | not logged-in user에게 Sign in CTA와 Portfolio promise를 먼저 제공한다. | actual holdings, allocation, news, broker-link UI는 Not Verified다. | Portfolio Product page, Help Portfolio | Medium |
| YF-DEN-012 | Premium Feature Lists | Density Enabler / Subscription Pattern | Premium | Observed | Fair Value, Research Reports, Premium Screeners, Premium Charts, Portfolio Analytics, Alerts, ad-free를 feature groups로 보여준다. | 실제 Product Surface 내부 gate와 feature depth는 Not Verified다. | Premium / plan pages | High |
| YF-DEN-013 | Premium Ad-free as Density Control | Density Control / Advertisement Interference | Premium / Public Surfaces | Official Pricing | ad-free를 content focus와 screen room benefit으로 제시한다. | 실제 광고 제거 후 layout 변화는 Not Verified다. | Yahoo Premium Help, plan pages | Medium |
| YF-DEN-014 | Advertisement in Public Content | Density Risk / Advertisement Interference | Markets / Home candidate | Partially Observed | public monetization condition이 content hierarchy와 경쟁할 수 있다. | 위치, 화면 점유, visual stability는 Not Verified다. | Markets Product content includes `ADVERTISEMENT`, Premium ad-free messaging | Medium |
| YF-DEN-015 | Quote Premium Modules | Density Risk / Premium Pattern | Quote | Partially Observed / Premium Feature | premium insight candidate가 Quote context 안에서 analysis expansion을 제공할 수 있다. | upsell module이 core content와 경쟁하는 정도는 Not Verified다. | Quote Product content and Premium pages | Medium |
| YF-DEN-016 | Financials and Historical Data Split | Progressive Disclosure | Quote | Partially Observed | Financials, Historical Data, Statistics를 separate tabs로 나눠 large data tables를 제어한다. | public vs Premium depth와 download gate는 Not Verified / Gold Feature다. | Quote Help, historical data Help | Medium |
| YF-DEN-017 | Portfolio Analytics Expansion | Premium Feature / Density Enabler | Portfolio | Official Documentation / Premium Feature | Performance, risk, allocation, heat map view, model portfolios가 Portfolio analysis density를 확장한다. | logged-in and subscribed interaction은 Not Verified다. | Premium Portfolio Analytics Help | Medium |
| YF-DEN-018 | Watchlist Preview Candidate | Portal Pattern / Personal Density | Home / Watchlist | Login Required / Partially Observed | Home or My Portfolio entry에서 personal symbol set을 재방문 entry로 만들 수 있다. | logged-in Home and Watchlist UI는 Not Verified다. | Yahoo Help Portfolio / Watchlist | Medium |
| YF-DEN-019 | Conversation as Supporting Content | Density Risk | Quote Conversation | Not Verified | Discussion candidate가 Quote context에 user sentiment를 추가할 수 있다. | body, moderation, sign-in requirement are Not Verified. | Quote Help mentions Conversations | Low |
| YF-DEN-020 | Sustainability as Specialized Tab | Progressive Disclosure | Quote Sustainability | Not Verified | ESG content를 separate local tab으로 분리하는 candidate다. | current body and access boundary are Not Verified. | Quote Help mentions Sustainability | Low |
| YF-DEN-021 | Multiple Discovery Surfaces | Discovery Pattern | Search / Markets / Screeners / News / Home | Observed / Partially Observed | explicit lookup, category comparison, criteria discovery, headline discovery, portal discovery를 분리한다. | 사용자는 목적에 맞는 entry를 알아야 하며 Home hierarchy는 Partial이다. | Phase 5.1-5.2 Yahoo docs | High |
| YF-DEN-022 | Source-labeled News Scan | Scan Pattern | News / Quote News | Partially Observed | publisher label과 headline을 함께 보여줘 scan 전에 Source를 확인하게 한다. | timestamp와 related symbol consistency는 Not Verified다. | News Product snippets, Help overview | Medium |
| YF-DEN-023 | Table-first Comparison | Comparison Pattern | Markets / Screeners / Currencies | Observed | rows와 columns를 통해 multiple assets를 빠르게 비교한다. | row-to-detail transition과 column customization은 Surface별로 Not Verified다. | Markets, Currencies, predefined screener pages | High |
| YF-DEN-024 | Heatmap as Optional View | Density Control | Crypto / Screener Result | Observed / Partially Observed | table보다 compressed visual comparison을 optional view로 제공한다. | heatmap methodology와 interaction은 Not Verified다. | Crypto all, predefined screener result pages | Medium |
| YF-DEN-025 | Mobile Density Risk | Density Risk | All Surfaces | Not Verified | desktop portal/tabs/table pattern이 mobile에서 어떻게 재구성되는지 확인되지 않았다. | mobile scan cost, ad placement, chart controls are Not Verified. | Not Verified | Low |
| YF-DEN-026 | Premium Research Expansion | Density Enabler / Premium Pattern | Premium / Quote Research | Official Pricing / Documentation | partner research reports, report types, date/frequency filters가 analysis content를 확장한다. | Premium gate and report body are Not Verified. | Research Reports Help | Medium |
| YF-DEN-027 | Data Download as Offline Density Control | Density Control / Premium Feature | Historical Data / Portfolio | Official Documentation / Premium Feature | CSV export로 large table을 offline analysis로 이전할 수 있다. | Historical download is Gold subscription; Portfolio export requires login. | Historical Data Help, Portfolio Download Help | Medium |

## Home Density

Observation:
Home은 Market Summary, Trending Tickers, News, Watchlist / Portfolio sidebar candidate, Advertisement, Premium entry를 포함하는 Surface로 기록됐다. Direct body 일부는 429로 제한되어 current block order와 first viewport hierarchy는 Partially Observed다.

Interpretation:
Home은 Finance Portal 성격과 Investment Summary 성격을 결합한다. Public Home은 broad discovery를 제공하고, logged-in Home은 Watchlist나 Portfolio를 통해 personal density를 만들 수 있을 것으로 보인다.

User Impact:
기존 사용자는 Home에서 broad Market과 personal entry를 함께 접근할 수 있다. 신규 사용자는 News, Market, Watchlist, Premium entry가 섞인 구조에서 primary question을 직접 선택해야 한다.

Potential Trade-off:
Portal content mix, advertisement, personalization boundary, mobile layout risk가 있다.

Evidence:
Official Product Observation, https://finance.yahoo.com/. Official Documentation, Yahoo Help overview and Market data/tools articles. 확인일 2026-07-28.

Confidence:
Medium

## Search Density

Observation:
Search는 company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency를 하나의 entry에서 찾는다고 Yahoo Help가 설명한다. Suggestion dropdown의 price, exchange, type display는 Not Verified다.

Interpretation:
Search는 low-density input으로 wide Entity universe를 압축한다. Yahoo Finance는 별도 search result Surface보다 Quote direct transition을 중심으로 할 가능성이 있다.

User Impact:
symbol을 아는 사용자는 빠르게 Quote로 이동한다. Entity Type 구분 UI가 Not Verified라 ambiguous query의 비용은 판단하지 않는다.

Potential Trade-off:
Suggestion 정보량이 부족하면 Company, ETF, Crypto, Currency disambiguation이 어려울 수 있다.

Evidence:
Official Documentation, Yahoo Help Search article. 확인일 2026-07-28.

Confidence:
High for supported target types, Medium for dropdown behavior.

## Quote Density

Observation:
AAPL Quote는 Summary, Chart, News, Statistics, Financials, Holders, Analysis, Sustainability, Options, Historical Data, Profile, Conversation, Related tabs candidate를 포함한다. Summary는 price, chart, Metrics, News, Company Display candidate를 묶는다.

Interpretation:
Quote는 Stock / symbol 중심 Entity Hub로 해석된다. Yahoo Finance는 Single Page summary와 Local Tab Progressive Disclosure를 혼합해 core scan과 detail analysis를 분리한다.

User Impact:
사용자는 ticker context 안에서 chart, financial, holders, analysis, news로 이동할 수 있다. 일부 tabs는 body가 Not Verified라 public depth를 확정하지 않는다.

Potential Trade-off:
Stock와 Company Display boundary, Premium module 경쟁, external article context loss, tab depth가 cognitive load를 만들 수 있다.

Evidence:
Official Product Observation, AAPL Quote indexed Product content. Official Documentation, Quote Help article. 확인일 2026-07-28.

Confidence:
High for Quote structure, Medium for some tab bodies.

## Chart Density

Observation:
Yahoo Help는 Advanced Chart에서 period / range, intervals, indicators, overlays, oscillators, compare, chart type, extended hours, y-axis scale, settings를 설명한다. Premium Help는 advanced charting, technical patterns, corporate event indicators를 Premium Feature로 설명한다.

Interpretation:
Chart는 visual analysis density를 controls로 관리한다. Public chart는 core visualization과 compare / indicator를 제공하고, Premium Chart는 technical event recognition과 chart pattern content를 확장한다.

User Impact:
기본 사용자는 Quote에서 chart로 이동해 price context를 유지할 수 있다. technical user는 Premium Feature를 통해 event and pattern layers를 추가할 수 있다.

Potential Trade-off:
Drawing Tool, event marker availability, full screen return state, chart preference persistence는 Not Verified다.

Evidence:
Official Documentation, Yahoo Help chart articles and Premium advanced charts article. 확인일 2026-07-28.

Confidence:
High for documented chart capabilities, Medium for current Product interaction.

## Markets Density

Observation:
Markets Overview는 World Indices, Americas, Europe, Asia, Commodities, Currencies, Bonds, Stocks sections를 제공한다. Crypto와 Currencies sub-surfaces는 table 중심으로 기록됐고, All Cryptocurrencies는 table and heatmap view를 제공한다.

Interpretation:
Markets는 Home보다 category comparison에 가까운 Surface다. Home이 portal entry라면 Markets는 structured Market comparison Surface로 해석된다.

User Impact:
사용자는 Market category를 한 곳에서 비교할 수 있다. Quote drill-down과 asset detail은 일부 Not Verified다.

Potential Trade-off:
US subcategory body, asset detail transition, heatmap interaction이 확인되지 않았다.

Evidence:
Official Product Observation, Markets, Crypto, All Cryptocurrencies, Currencies pages. 확인일 2026-07-28.

Confidence:
High

## News Density

Observation:
News Surface는 headline, category, Source-labeled article, video candidate를 제공한다. Quote Summary도 related News candidate를 포함한다.

Interpretation:
News는 scan-first feed에 가깝다. Quote News는 ticker context 안의 supporting content이고, 독립 News는 broader finance portal content로 해석된다.

User Impact:
사용자는 headline과 Source label을 보고 article을 선택할 수 있다. external article 이동 전 related symbol context가 충분한지는 Not Verified다.

Potential Trade-off:
External article 이동 후 Yahoo Finance context loss, ads, source mix가 cognitive load를 만들 수 있다.

Evidence:
Official Product Observation, News Product snippets. Official Documentation, Yahoo Help overview. 확인일 2026-07-28.

Confidence:
Medium

## Screeners Density

Observation:
Screeners Hub는 predefined screener cards와 Create entry를 제공한다. Predefined result는 filter summary, table, heatmap view, Save, Download, Customize candidate actions를 제공한다.

Interpretation:
Hub는 low-density entry이고 result page는 table-first comparison Surface다. Predefined cards는 novice user에게 filter setup cost를 낮춰줄 수 있다.

User Impact:
사용자는 premade criteria로 빠르게 candidate set을 확인한다. custom criteria, save, Premium Screeners는 access boundary를 만든다.

Potential Trade-off:
filter definition, row-to-Quote state, Save / Download gate are Not Verified.

Evidence:
Official Product Observation, Screeners and predefined screener result pages. Official Documentation, Yahoo Help Screeners article. 확인일 2026-07-28.

Confidence:
High

## Portfolio / Watchlist Density

Observation:
Portfolio landing is Login Required for actual creation and management. Yahoo Help describes multiple portfolios, Watchlists, holdings, transactions, notes, import/export, brokerage link. Premium Help describes Portfolio Analytics with performance, risk, allocation, heat map view, model portfolios.

Interpretation:
Portfolio and Watchlist are personal density surfaces. Watchlist likely supports monitoring by symbol set, while Portfolio likely supports holdings and performance analysis. Actual UI remains Not Verified.

User Impact:
Logged-in users may convert repeated lookup into personal continuity. Public users cannot verify internal density.

Potential Trade-off:
Login Required, Premium analytics, broker-link complexity, calculation methodology constraints.

Evidence:
Official Documentation, Yahoo Help Portfolio / Watchlist / Premium Portfolio Analytics articles. 확인일 2026-07-28.

Confidence:
Medium

## Premium Density

Observation:
Premium pages describe Fair Value, Research Reports, Premium Screeners, Premium Charts, Portfolio Analytics, Alerts, ad-free, AlphaSpace, downloadable data, and smart screeners.

Interpretation:
Premium expands analysis density and also controls density through ad-free. It is both Information Expansion and Density Control.

User Impact:
Premium users may gain more analyst, chart, screener, and portfolio content. Public users see Premium as upsell and boundary.

Potential Trade-off:
Premium dependency may hide methodology or context behind subscription gates. Product-surface-specific gate UI is Not Verified.

Evidence:
Official Pricing and Premium Help pages. 확인일 2026-07-28.

Confidence:
High for official Premium scope, Medium for actual in-product presentation.

## Advertisement Density

Observation:
Phase 5.1 recorded `ADVERTISEMENT` in official Markets Product content and Premium ad-free as official plan benefit. Premium Help states select plans remove third-party ads after sign-in.

Interpretation:
Advertisement is a Public Surface condition and Premium ad-free can function as Density Control. This does not mean advertising is only a friction; it also acts as monetization and subscription contrast.

User Impact:
Ads may compete with News, Markets, and Quote content hierarchy. Ad-free may reduce visual competition for Premium users.

Potential Trade-off:
ad position, screen share, visual stability, and navigation confusion are Not Verified.

Evidence:
Official Product Observation, Markets Product content. Official Pricing / Documentation, Premium pages and upgraded plan Help. 확인일 2026-07-28.

Confidence:
Medium

## Open Question

- Home first viewport block order와 logged-in Home density 확인 필요.
- Search Suggestion에서 price, exchange, Entity Type이 표시되는지 확인 필요.
- Quote tab body별 public / Premium depth 확인 필요.
- Drawing Tool과 advanced chart controls의 current UI 확인 필요.
- News related symbol context와 external return path 확인 필요.
- Screener Save / Download / Customize gate 확인 필요.
- Portfolio internal table, allocation, news, brokerage link UI 확인 필요.
- Watchlist와 Portfolio density 책임 차이 확인 필요.
- Premium module이 Public Quote와 Screeners 내부에서 어떤 위치에 나타나는지 확인 필요.
- mobile density와 advertisement placement 확인 필요.
