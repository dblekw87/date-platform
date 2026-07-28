# Yahoo Finance Product Surface Map

## 문서 목적

이 문서는 Phase 5.1 범위에서 Yahoo Finance의 Product Surface와 Capability를 분리해 기록한다.

Navigation 분석, User Journey, Entity 분석, Candidate Principle은 작성하지 않는다.

## Product Surface Inventory

| Surface ID | Official Name | URL | Access Level | Observation Status | Primary Entry | Secondary Entry | Surface Responsibility | Primary Entity | Information Form | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-SF-001 | Home | https://finance.yahoo.com/ | Public Access | Partially Observed | finance.yahoo.com root | About / Help references | Market Summary, Trending Tickers, News, Watchlist / Portfolio sidebar candidate, Premium entry를 노출하는 main entry Surface다. | Market | Summary, News List, Watchlist module, Advertisement | official Product root direct fetch 429. Help records Markets and portfolios sidebar on Home. About page references revised Home Page. | Medium | current Home block order, personalized block, advertisement placement direct body 확인 필요. |
| YF-SF-002 | Search | https://finance.yahoo.com/ | Public Access | Official Documentation / Partially Observed | global search input | Help Search article | ticker, company name, fund, index, commodity, mutual fund, cryptocurrency lookup을 제공한다. | Stock / Security candidate | Search Field, Suggestion candidate | Help `Find quotes...` records Company Names, Ticker symbols, ETFs, Indices, Commodities, Mutual Funds, Cryptocurrency. Product snippets show search input. | High | live suggestion grouping과 result category order는 Not Verified. |
| YF-SF-003 | Quote | https://finance.yahoo.com/quote/AAPL/ | Public Access / Premium Feature 일부 | Observed / Partially Observed | Search result, ticker URL | Screeners, trending lists | AAPL 같은 ticker의 price, summary, chart, news, statistics, financials, holders, analysis, sustainability, options, historical data, profile, conversation, related content를 묶는 Stock Surface다. | Stock | Detail Page, Chart, Metrics, News List, Tabs | official Product indexed AAPL content and regional mirrors. | High | current US body direct rendering은 429로 제한. |
| YF-SF-004 | Chart / Advanced Chart | https://finance.yahoo.com/quote/AAPL/chart/ | Public Access / Premium Feature 일부 | Official Documentation / Partially Observed | Quote chart | Help chart articles | price performance visualization, time range, chart type, indicators, comparisons, full screen settings를 제공한다. | Stock / Security candidate | Chart, Controls | Help records Advanced Chart, Indicators, Comparisons, Settings, chart type, extended hours. | High | drawing tools current availability와 Premium boundary는 Not Verified. |
| YF-SF-005 | News | https://finance.yahoo.com/news/ | Public Access / Premium Feature 일부 | Partially Observed | Global News entry | Home, Quote News | financial headlines, categories, source-labeled articles, videos, related symbols candidate를 제공한다. | News | News List, Article, Video | official Product snippets show News categories and Source labels. Help records financial news, commentary, analysis. | Medium | article-level related symbols current behavior는 Not Verified. |
| YF-SF-006 | Markets Overview | https://finance.yahoo.com/markets/ | Public Access | Observed | Global Markets entry | Home market strip | World Indices, Commodities, Currencies, Stocks sections를 table 중심으로 보여준다. | Market | Table, Summary | official Markets page. | High | US subpage exact taxonomy와 all tab behavior는 Not Verified. |
| YF-SF-007 | Crypto | https://finance.yahoo.com/markets/crypto/ | Public Access | Observed | Markets Crypto entry | Crypto navigation | crypto price summary, top stories, latest news, related symbols를 제공한다. | Crypto Asset | News List, Summary | official Crypto page. | High | crypto quote detail transition은 Not Verified. |
| YF-SF-008 | All Cryptocurrencies | https://finance.yahoo.com/markets/crypto/all/ | Public Access | Observed | Crypto page | Markets table view | crypto assets를 table과 heatmap view로 비교한다. | Crypto Asset | Table, Heatmap | official All Cryptocurrencies page. | High | heatmap interaction depth는 Not Verified. |
| YF-SF-009 | Currencies | https://finance.yahoo.com/markets/currencies/ | Public Access | Observed | Markets Currencies entry | Markets Overview | Currency Pair table을 제공한다. | Currency Pair | Table | official Currencies page. | High | currency pair detail page는 Not Verified. |
| YF-SF-010 | Screeners | https://finance.yahoo.com/screener/ | Public Access / Login Required 일부 / Premium Feature 일부 | Observed | Research tab / Screeners entry | global Screeners nav | premade screeners와 custom screener creation entry를 제공한다. | Stock / Fund / ETF candidate | Screener Hub, Cards, Table candidate | official Screeners page and Help Screeners article. | High | Create interaction and saved custom screener는 Login Required. |
| YF-SF-011 | Predefined Screener Result | https://finance.yahoo.com/screener/predefined/undervalued_growth_stocks/ | Public Access / Login Required 일부 | Observed | Screener card | Direct URL | predefined criteria 결과를 filters, table, table / heatmap view, Save, Download로 제공한다. | Stock | Table, Filter Summary, Heatmap View | official predefined screener page. | High | Save behavior는 Login Required 여부 확인 필요. |
| YF-SF-012 | Watchlists | https://finance.yahoo.com/portfolio/pf_follow/view | Login Required / Public indexed content | Partially Observed | My portfolio / Watchlists | Home sidebar candidate | curated watchlists와 user-created watchlists candidate를 제공한다. | Watchlist | List, Table candidate | official Product indexed content and Help `Getting started with Yahoo Finance`. | Medium | not logged in direct UI와 user watchlist management는 Not Verified. |
| YF-SF-013 | My Portfolio | https://finance.yahoo.com/portfolios | Login Required | Observed / Login Required | My Portfolio nav | Home sidebar candidate | portfolios, watchlists, holdings, brokerage link, manual portfolio creation을 account 기반으로 제공한다. | Portfolio | Marketing Page, Table candidate, Form candidate | official Portfolio Product page and Help Portfolio articles. | High | actual holdings table and logged-in empty state는 Not Verified. |
| YF-SF-014 | Premium / Subscriptions | https://finance.yahoo.com/subscriptions/ | Public Access | Observed | Upgrade to Premium | Premium links from product pages | Premium data, charts, research, portfolio, alerts, news, ad-free benefit을 정리한다. | Subscription Plan | Marketing Page, Feature List | official subscriptions page. | High | actual Premium gate UI inside each Surface는 Not Verified. |
| YF-SF-015 | Pricing / Plan Selection | https://finance.yahoo.com/about/plans/select-plan/researchReports/ | Public Access | Observed | Premium plan page | plan compare | Bronze, Silver, Gold plan과 Fair Value, Research Reports, advanced data, Premium Charts, Premium Screeners 등 Premium Feature scope를 보여준다. | Subscription Plan | Pricing Table, Plan Cards | official select-plan and compare pages. | High | current prices can change; 확인일 기준. |
| YF-SF-016 | Help | https://help.yahoo.com/kb/finance/ | Public Access | Observed | footer Help | Product help links | Product capability, access, portfolio, chart, search, screener usage를 documentation으로 제공한다. | Documentation | Help Article | Yahoo Help official pages. | High | Help article freshness와 current UI match는 item별 확인 필요. |

## Surface Responsibility Summary

| Responsibility | Surface |
| --- | --- |
| Market Summary | Home, Markets Overview, Crypto, Currencies |
| Entity Lookup | Search |
| Stock Detail | Quote |
| Price Visualization | Chart / Advanced Chart |
| News Consumption | News, Quote News |
| Discovery | Screeners, Predefined Screener Result, Trending Tickers |
| Personal Tracking | Watchlists, My Portfolio |
| Subscription Boundary | Premium / Subscriptions, Pricing / Plan Selection |
| Documentation | Help |

## Capability 분리

| Capability | Related Surface | Access Level | Observation Status | Notes |
| --- | --- | --- | --- | --- |
| Search suggestion | Search | Public Access | Not Verified | accepted Entity types는 Help에서 확인. live dropdown은 확인하지 못했다. |
| Follow | Quote, Trending, Screener | Login Required candidate | Partially Observed | Quote regional mirror와 screener table에서 Follow / Add context 확인. |
| Add holdings | Quote, My Portfolio | Login Required | Official Documentation / Partially Observed | Quote regional mirror shows Add holdings. Help records holdings and transactions. |
| Compare | Chart | Public Access | Official Documentation | Help records comparison icon and adding multiple symbols. |
| Indicator | Chart | Public Access | Official Documentation | Help records Indicators, overlays, oscillators. |
| Chart type change | Chart | Public Access | Official Documentation | Help records Settings and chart type. |
| Extended hours setting | Chart | Public Access | Official Documentation | Help records extended hours checkbox. |
| Drawing Tool | Chart | Not Verified | Not Verified | user request target, but official confirmation not found in Phase 5.1 Source set. |
| Full Screen / Advanced Chart | Quote, Chart | Public Access | Official Documentation / Partially Observed | Help records Advanced Chart and full screen chart view. |
| Save custom screener | Screeners | Login Required | Official Documentation | Help requires sign in and Save. |
| Create custom screener | Screeners | Login Required | Official Documentation | Help records sign in, Research tab, Screeners, Create. |
| Download screener result | Predefined Screener Result | Public Access / Premium Feature candidate | Observed / Premium Feature | result page shows Download. subscriptions page records Screeners Download as Premium benefit. exact gate Not Verified. |
| Table / Heatmap view switch | Predefined Screener Result, Crypto Table | Public Access | Observed | official Product pages show table and heatmap view. |
| Portfolio create | My Portfolio | Login Required | Official Documentation | sign in and Start Creating required. |
| Import CSV | My Portfolio | Login Required | Official Documentation | Help records Import CSV. |
| Link brokerage | My Portfolio | Login Required | Official Documentation | Help records brokerage linking. |
| Premium Analysis | Premium, Quote | Premium Feature | Observed / Official Documentation | Fair Value, Research Reports, analyst data, Morningstar / Argus references. |
| Premium Alerts | Premium | Premium Feature | Observed | subscriptions page records Analyst Ratings, Research, Technical Alerts. |
| Ad-free | Premium | Premium Feature | Observed | plan pages record ad-free. |

## Surface 간 관계

Phase 5.1에서는 관계를 Product Flow로 분석하지 않는다. 아래 내용은 Surface existence와 entry visibility 수준만 기록한다.

| From Surface | To Surface | Relationship Status | Evidence |
| --- | --- | --- | --- |
| Home | Search | Partially Observed | Product snippets show search input. |
| Home | Markets | Official Documentation / Partially Observed | Help records Home sidebar and market lists. |
| Home | My Portfolio | Official Documentation / Login Required | Help records portfolios sidebar and My Portfolio. |
| Search | Quote | Official Documentation | Help records searching ticker or business name to get quote. |
| Quote | Chart | Official Documentation / Partially Observed | Help records Advanced Chart from Quote. |
| Quote | News | Observed / Partially Observed | AAPL Product content includes Recent News. |
| Markets | Crypto / Currencies | Observed | Markets pages and subpages. |
| Screeners | Predefined Screener Result | Observed | Screeners card to predefined result URL. |
| Screeners | Custom Screener | Login Required / Official Documentation | Help records sign in and Create / Save. |
| Quote / Screeners | Premium | Observed / Premium Feature | Premium plan pages and quote premium content. |

## Open Question

- Home current block order와 personalized section은 direct body 429로 확인하지 못했다.
- Search suggestion UI와 Entity grouping은 Not Verified다.
- Portfolio 내부 table, empty state, brokerage connection UI는 Login Required다.
- Premium gate가 각 Quote tab, Chart, Screener에서 어떤 방식으로 보이는지는 Not Verified다.
- Drawing Tool 공식 current web UI Evidence는 Phase 5.1 Source set에서 확인하지 못했다.
- News article에서 related symbols가 어떤 UI unit으로 표시되는지는 Not Verified다.
