# Yahoo Finance Access and Method

## 조사 환경

| Field | Value |
| --- | --- |
| Service | Yahoo Finance |
| Phase | 5.1~5.5 Access, Product Surface Mapping, Screen Inventory, Navigation, Core Journey, Entity / State, Information Density, Trust / Evidence, Product Flow Architecture, Synthesis, Evidence Hardening, Candidate Principle Extraction, Hypothesis Evidence Log, Phase Summary |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access Mode | Public Access |
| Login 여부 | Not Logged In |
| Premium 여부 | No Yahoo Finance Premium subscription |
| Device | Desktop web research |
| Desktop Browser | Codex web extraction / official URL review. Interactive browser viewport는 Not Verified |
| Viewport | Not Verified |
| User Location Assumption | United States |

## Source Priority

| Priority | Source Type | 사용 여부 | Notes |
| --- | --- | --- | --- |
| 1 | Yahoo Finance official Product | Used | `finance.yahoo.com` Product URL, indexed official Product content, regional quote mirrors |
| 2 | Yahoo Finance Help | Used | `help.yahoo.com` Finance Help and Finance for Web Help |
| 3 | Yahoo Finance Premium 안내 | Used | `finance.yahoo.com/subscriptions`, plan compare, select-plan pages |
| 4 | Yahoo Finance official Blog | Not Used | Phase 5.1에서 필요한 Surface 확인은 Help와 Product로 충분했다. |
| 5 | Secondary Source | Not Used | 공식 자료로 Surface와 Access Boundary를 확인했다. |

## 공식 Product Source

| Surface | Official URL | Observation Status | Notes |
| --- | --- | --- | --- |
| Home | https://finance.yahoo.com/ | Partially Observed | direct fetch는 429. Yahoo Finance official indexed Product content와 Help에서 Home sidebar, Market, Portfolio, Search를 확인했다. |
| About | https://finance.yahoo.com/about/ | Observed | Yahoo Finance Product positioning, Home Page enhancement, news, data, tools, Premium plan message 확인. |
| Search | https://finance.yahoo.com/ | Official Documentation / Partially Observed | Search input label은 Product snippets에서 확인. Search result behavior는 Help 기준. |
| Quote AAPL | https://finance.yahoo.com/quote/AAPL/ | Observed / Partially Observed | direct fetch는 429. official Product indexed content와 regional mirrors에서 Summary, tabs, News, Metrics 확인. |
| Markets | https://finance.yahoo.com/markets/ | Observed | Markets Overview, World Indices, Commodities, Currencies, Stocks section 확인. |
| Crypto | https://finance.yahoo.com/markets/crypto/ | Observed | Crypto news Surface와 related symbols 확인. |
| Crypto Table | https://finance.yahoo.com/markets/crypto/all/ | Observed | Crypto table and heatmap view 확인. |
| Currencies | https://finance.yahoo.com/markets/currencies/ | Observed | Currency pair table 확인. |
| News | https://finance.yahoo.com/news/ | Partially Observed | official Product snippets와 Help 기준. article category와 Source label은 Product snippets에서 확인. |
| Screeners | https://finance.yahoo.com/screener/ | Observed | Screeners hub, Popular, Create, Premium upsell entry 확인. |
| Research Hub Screeners | https://finance.yahoo.com/research-hub/screener/ | Observed | Screeners hub mirror 확인. |
| Predefined Screener Result | https://finance.yahoo.com/screener/predefined/undervalued_growth_stocks/ | Observed | filters, table, Save, Download, table / heatmap view 확인. |
| My Portfolio | https://finance.yahoo.com/portfolios | Observed / Login Required | public marketing page와 Sign in CTA 확인. |
| My Watchlist | https://finance.yahoo.com/portfolio/pf_follow/view | Partially Observed / Login Required | official indexed Product content에서 My watchlist entry 확인. |
| Premium / Subscriptions | https://finance.yahoo.com/subscriptions/ | Observed | Premium benefits, Research, Portfolio, Alerts, Charts, News, ad-free 확인. |
| Pricing / Plan Selection | https://finance.yahoo.com/about/plans/select-plan/researchReports/ | Observed | Bronze, Silver, Gold plan and Premium Feature scope 확인. |
| Plan Compare | https://finance.yahoo.com/about/plans/compare/ | Observed | AlphaSpace, Premium News, Premium Portfolios, Custom Watchlists 확인. |

## 공식 Documentation Source

| Topic | Official Help URL | Observation Status | Notes |
| --- | --- | --- | --- |
| Yahoo Finance overview | https://help.yahoo.com/kb/SLN3642.html | Official Documentation | Search, charts, screeners, markets, financial news, My Portfolio, Watchlists 정의 확인. |
| Market data and tools | https://help.yahoo.com/kb/finance/market-data-research-tools-yahoo-finance-sln24381.html | Official Documentation | Markets sidebar, Search, portfolios, currency converter, calendars, charts, screeners, market lists 확인. |
| Search | https://help.yahoo.com/kb/finance-for-web/learn-find-symbol-sln2340.html | Official Documentation | Company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency search 확인. |
| Chart indicators | https://help.yahoo.com/kb/account/add-technical-indicators-yahoo-finance-chart-sln8326.html | Official Documentation | Advanced Chart, Indicators, overlays, oscillators 확인. |
| Chart compare | https://help.yahoo.com/kb/compare-multiple-symbols-chart-sln24677.html | Official Documentation | comparison icon, multiple ticker symbols 확인. |
| Chart settings | https://help.yahoo.com/kb/finance-for-web/interactive-chart-types-ticker-symbols-sln26335.html | Official Documentation | chart type selection 확인. |
| Chart display settings | https://help.yahoo.com/kb/finance/customize-chart-settings-yahoo-finance-web-sln26786.html | Official Documentation | extended hours, background strips, y-axis scale 확인. |
| Screeners | https://help.yahoo.com/kb/create-premade-yahoo-finance-screeners-sln28083.html | Official Documentation | premade and custom screener creation, sign in and save 확인. |
| My Portfolio overview | https://help.yahoo.com/kb/SLN7034.html | Official Documentation | Watchlists, multiple portfolios, holdings, notes, import / export, brokerage link 확인. |
| Portfolio creation | https://help.yahoo.com/kb/finance/create-edit-delete-portfolio-sln4249.html | Official Documentation | sign in, link brokerage, import CSV, create manually, add symbols 확인. |
| Portfolio data download | https://help.yahoo.com/kb/account/download-portfolio-data-yahoo-finance-sln15034.html | Official Documentation | signed-in Portfolio CSV export / import 확인. |
| Portfolio streaming quotes | https://help.yahoo.com/kb/SLN28344.html | Official Documentation | Portfolio streaming quote setting 확인. |
| Historical data download | https://help.yahoo.com/kb/finance/certain-amounts-sln2311.html | Official Documentation | historical price, dividend, split data와 Gold download boundary 확인. |
| Exchanges and data providers | https://help.yahoo.com/kb/finance/article-exchanges-data-delays-sln2310.html | Official Documentation | market delay, provider, data category Source 확인. |
| Real-time data for web | https://help.yahoo.com/kb/check-real-time-data-yahoo-finance-web-sln2321.html | Official Documentation | Quote Summary real-time cue 확인. |
| Quote page research | https://help.yahoo.com/kb/finance-for-web/research-stocks-mutual-funds-etfs-yahoo-finance-quote-pages-sln28277.html | Official Documentation | Quote sections and responsibilities 확인. |
| Premium start | https://help.yahoo.com/kb/finance-for-web/started-yahoo-finance-premium-sln29117.html | Official Documentation | premium news, advanced data, tools, charts, screeners, valuation, portfolio analysis, research reports 확인. |
| Premium portfolio analytics | https://help.yahoo.com/kb/finance-for-web/optimize-risk-return-premium-portfolio-analytics-sln29277.html | Official Documentation | performance, risk, allocation, heat map view, model portfolios 확인. |
| Premium research reports | https://help.yahoo.com/kb/yahoo-finance-plus/make-informed-investment-decisions-in-depth-research-reports-sln29178.html | Official Documentation | Morningstar, Argus, Vickers reports and report frequency 확인. |
| Fair Value | https://help.yahoo.com/kb/yahoo-finance-plus/understand-companys-fair-sln29279.html | Official Documentation | Trading Central partner, formula, daily price / weekly fundamental update 확인. |
| Premium advanced charts | https://help.yahoo.com/kb/yahoo-finance-plus/advanced-charts-sln29177.html | Official Documentation | Trading Central technical patterns and LSEG corporate events 확인. |

## Public 접근 범위

| Area | Status | Notes |
| --- | --- | --- |
| Home | Partially Observed | 429 제한으로 direct body는 제한. Product snippets와 Help 기준으로 기록. |
| Search | Partially Observed / Official Documentation | Search input과 accepted Entity types 확인. live suggestion behavior는 Not Verified. |
| Quote Summary | Observed / Partially Observed | AAPL official Product indexed content와 regional mirrors 기준. |
| Quote tabs | Observed / Partially Observed | Summary, Chart, News, Statistics, Financials, Holders, Analysis, Sustainability, Options, Historical Data, Profile, Conversation, Related 후보 확인. |
| Markets | Observed | Markets Overview, World Indices, Commodities, Currencies. |
| Crypto | Observed | Crypto news and table. |
| News | Partially Observed | source-labeled news content 확인. article interaction은 Phase 5.1 범위 밖. |
| Screeners hub | Observed | Popular screeners, Create, Premium / table context. |
| Predefined screener result | Observed | filters, table, Save, Download, table / heatmap view. |
| Premium plan pages | Observed | plan benefits and feature boundaries. |
| Portfolio marketing page | Observed | Sign in CTA and Product promise. |

## Login Required 범위

| Area | Status | Notes |
| --- | --- | --- |
| My Portfolio 생성 | Login Required | Help는 desktop에서 sign in 후 My Portfolio, Start Creating을 기록한다. |
| Watchlist management | Login Required / Official Documentation | My Portfolio toolkit에서 watchlists와 lists 관리가 기록된다. |
| Custom Screener 저장 | Login Required / Official Documentation | Help는 sign in, Create, Save 단계로 기록한다. |
| Portfolio holdings / transactions | Login Required / Official Documentation | holdings, lots, cash, brokerage link는 account 필요. |
| Personalized Home / Portfolio sidebar | Login Required / Partially Observed | Help가 Home page sidebar와 portfolio lists를 기록한다. actual logged-in Home은 Not Verified. |

## Premium Feature 범위

| Area | Status | Notes |
| --- | --- | --- |
| Fair Value | Premium Feature | Premium plan pages and Quote Product content에서 확인. |
| Research Reports | Premium Feature | Premium Research / Argus / Morningstar reports 확인. |
| Premium Screeners | Premium Feature | premium filters, screeners download, smart money, analyst ratings 확인. |
| Premium Charts | Premium Feature | technical charting, corporate events, premium charts 확인. |
| Portfolio Analytics | Premium Feature | risk analysis, valuation, diversification, model portfolios 확인. |
| Premium Alerts | Premium Feature | mobile app alerts, analyst ratings, research, technical alerts 확인. |
| Ad-free | Premium Feature | plans page에서 ad-free 확인. |
| AlphaSpace | Premium Feature | plan compare에서 customizable dashboards, widgets, alerts 확인. |

## 조사 제외 범위

- Candidate Principle
- Registry 수정
- Product Hypothesis 수정
- 로그인 후 실제 Portfolio 조작
- Premium 구독 후 feature 조작
- Mobile app 실제 조작

## 확인 수준

| Status | Definition |
| --- | --- |
| Observed | 공식 Product URL 또는 공식 Product indexed content에서 Surface, field, CTA, table, tab을 확인했다. |
| Partially Observed | 공식 Product URL과 일부 content는 확인했지만 direct rendering, dynamic interaction, 또는 current body는 제한적으로 확인했다. |
| Official Documentation Only | Yahoo Help 또는 Premium 안내에서만 확인했다. |
| Login Required | sign in 이후 조작이 필요하다. |
| Premium Feature | Yahoo Finance Premium plan 또는 subscription 안내에서 feature로 확인했다. |
| Not Verified | 공식 자료만으로 Surface body, interaction, persistence, 또는 exact access를 확인하지 못했다. |

## Known Limitations

- `finance.yahoo.com` 일부 direct URL은 429 Too Many Requests로 fetch되지 않았다.
- Home direct body와 AAPL US Quote direct body는 일부 official indexed Product content와 regional mirror를 함께 사용했다.
- Search suggestion dropdown, Portfolio 내부, Premium feature internal UI, mobile app, logged-in personalization은 실제 조작하지 않았다.
- Advertisement placement는 Product snippets와 official page에서 `ADVERTISEMENT`, Premium ad-free messaging을 기준으로 기록했다.
