# Yahoo Finance Screen Inventory

## 문서 목적

이 문서는 Phase 5.1 범위에서 Yahoo Finance의 Screen 단위 Inventory를 기록한다.

Navigation 분석, User Journey, Entity 분석, Candidate Principle은 작성하지 않는다.

## Screen Inventory

| Screen ID | Name | URL | Entry | Purpose | Primary Entity | Information Type | CTA | Access Level | Observation Status | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-SC-001 | Home | https://finance.yahoo.com/ | root URL | Market Summary, Trending Tickers, News, Watchlist / Portfolio sidebar candidate, Premium entry를 제공한다. | Market | Market strip, News List, Watchlist module candidate, Advertisement | Search, Sign in, Upgrade to Premium candidate | Public Access | Partially Observed | direct fetch 429. Help and About official pages confirm Home sidebar and revised Home Page. | Medium | current first viewport, personalized area, ad placement direct body 확인 필요. |
| YF-SC-002 | Search Field | https://finance.yahoo.com/ | global header search | quote, company, fund, index, commodity, mutual fund, cryptocurrency lookup을 수행한다. | Stock / Security candidate | Search field, Suggestion candidate | Enter query, select result | Public Access | Official Documentation / Partially Observed | Help Search article, Product snippets show search input. | High | suggestion ordering, category labels, keyboard behavior Not Verified. |
| YF-SC-003 | AAPL Quote Summary | https://finance.yahoo.com/quote/AAPL/ | Search, ticker URL | AAPL price, Summary metrics, News, Company overview, performance, Premium insights candidate를 제공한다. | Stock | Price Quote, Metrics, News, Company Profile Summary, Tabs | Follow, Add holdings, Advanced Chart, View More candidate | Public Access / Premium Feature 일부 | Observed / Partially Observed | official AAPL indexed Product content and regional mirrors. | High | current US direct body 429. exact tab order may vary. |
| YF-SC-004 | Quote Chart | https://finance.yahoo.com/quote/AAPL/chart/ | Quote chart / Advanced Chart | ticker price performance를 chart로 확인한다. | Stock | Chart, Range selector, Settings | Advanced Chart, Indicators, Compare | Public Access / Premium Feature 일부 | Official Documentation / Partially Observed | Help Chart Indicators, Compare, Settings articles. | High | Drawing Tool current availability Not Verified. |
| YF-SC-005 | Quote Statistics | https://finance.yahoo.com/quote/AAPL/key-statistics/ | Quote tab | valuation, financial highlights, profitability, balance sheet, cash flow metrics를 제공한다. | Stock | Metrics Table | View More, tab switch | Public Access / Premium Feature 일부 | Observed / Partially Observed | official AAPL indexed content includes Statistics and Financial Highlights. | High | current tab body direct US rendering 429. |
| YF-SC-006 | Quote Financials | https://finance.yahoo.com/quote/AAPL/financials/ | Quote tab | financial statements and historical financial data candidate를 제공한다. | Stock | Financial Table | Download / export candidate | Public Access / Premium Feature 일부 | Partially Observed | Premium pages mention historical financials and exportable data; Quote tabs known from Product content. | Medium | public vs Premium financial depth Not Verified. |
| YF-SC-007 | Quote Holders | https://finance.yahoo.com/quote/AAPL/holders/ | Quote tab | major holders와 institutional holders를 제공한다. | Stock | Holder Table | tab switch | Public Access | Observed / Partially Observed | official regional holders page. | High | current US holder tab direct body Not Verified. |
| YF-SC-008 | Quote Analysis | https://finance.yahoo.com/quote/AAPL/analysis/ | Quote tab | analyst and earnings analysis candidate를 제공한다. | Stock | Analyst Table, Estimate Table candidate | Premium research candidate | Public Access / Premium Feature 일부 | Partially Observed | Premium pages mention analyst ratings, research reports, stock picks. | Medium | current public analysis body Not Verified. |
| YF-SC-009 | Quote Sustainability | https://finance.yahoo.com/quote/AAPL/sustainability/ | Quote tab | ESG / sustainability candidate를 제공한다. | Company / Stock candidate | Score / Profile candidate | tab switch | Public Access / Premium Feature 일부 | Not Verified | tab target requested; official body not verified in Phase 5.1. | Low | current Surface existence and content need direct check. |
| YF-SC-010 | Quote Options | https://finance.yahoo.com/quote/AAPL/options/ | Quote tab | options chain candidate를 제공한다. | Option / Stock candidate | Options Table | expiration selection candidate | Public Access / Premium Feature 일부 | Partially Observed | Premium compare page mentions options flow and analysis; Quote tab requested. | Medium | current options chain body and Premium boundary Not Verified. |
| YF-SC-011 | Quote Historical Data | https://finance.yahoo.com/quote/AAPL/history/ | Quote tab | historical price data candidate를 제공한다. | Stock | Historical Table | Download candidate | Public Access / Premium Feature 일부 | Partially Observed | Premium pages mention over 40 years historical market data download. | Medium | public download boundary Not Verified. |
| YF-SC-012 | Quote Profile | https://finance.yahoo.com/quote/AAPL/profile/ | Quote tab | company profile, sector, industry, employee, website candidate를 제공한다. | Company / Stock candidate | Profile Text, Company Facts | website link | Public Access | Observed / Partially Observed | official AAPL indexed content includes company overview, website, sector, industry. | High | internal Company Surface Not Verified. |
| YF-SC-013 | Quote Conversation | https://finance.yahoo.com/quote/AAPL/community/ | Quote tab | community conversation candidate를 제공한다. | Stock | Discussion candidate | sign in / post candidate | Public Access / Login Required candidate | Not Verified | requested tab; current body not verified. | Low | access and moderation state Not Verified. |
| YF-SC-014 | Quote Related | https://finance.yahoo.com/quote/AAPL/related/ | Quote tab | related symbols or people also watch candidate를 제공한다. | Stock | Related List | open related ticker | Public Access | Partially Observed | AAPL indexed content includes People Also Watch. | Medium | dedicated related tab URL body Not Verified. |
| YF-SC-015 | News | https://finance.yahoo.com/news/ | global News | financial headlines, categories, videos, Source-labeled articles를 제공한다. | News | News List, Article Card, Video | open article, category selection | Public Access / Premium Feature 일부 | Partially Observed | official Product snippets and Help overview. | Medium | related symbols per article Not Verified. |
| YF-SC-016 | Markets Overview | https://finance.yahoo.com/markets/ | Markets entry | World Indices, Americas, Europe, Asia, Commodities, Currencies, Bonds, Stocks sections를 제공한다. | Market | Tables, Market strip | open symbol / subcategory | Public Access | Observed | official Markets page. | High | Stocks section data retrieval error appeared in indexed content. |
| YF-SC-017 | Crypto Top Stories | https://finance.yahoo.com/markets/crypto/ | Markets Crypto | crypto asset prices and crypto news를 제공한다. | Crypto Asset | Summary, News List | open article / symbol | Public Access | Observed | official Crypto page. | High | crypto detail transition Not Verified. |
| YF-SC-018 | All Cryptocurrencies | https://finance.yahoo.com/markets/crypto/all/ | Crypto subpage | crypto assets를 table and heatmap view로 비교한다. | Crypto Asset | Table, Heatmap | switch table / heatmap | Public Access | Observed | official All Cryptocurrencies page. | High | Heatmap interaction Not Verified. |
| YF-SC-019 | Currencies | https://finance.yahoo.com/markets/currencies/ | Markets Currencies | Currency Pair table을 제공한다. | Currency Pair | Table | open pair candidate | Public Access | Observed | official Currencies page. | High | pair detail body Not Verified. |
| YF-SC-020 | Screeners Hub | https://finance.yahoo.com/screener/ | Screeners entry | predefined screeners와 Create entry를 제공한다. | Stock / Fund / ETF candidate | Screener Cards, Product Copy | Create, View More, open screener | Public Access / Login Required 일부 / Premium Feature 일부 | Observed | official Screeners page and Help. | High | Create without sign in behavior Not Verified. |
| YF-SC-021 | Predefined Screener Result | https://finance.yahoo.com/screener/predefined/undervalued_growth_stocks/ | Screener card | predefined filter criteria 결과를 table로 제공한다. | Stock | Filter Summary, Table, Heatmap View | Save, Download, Customize | Public Access / Login Required 일부 / Premium Feature 일부 | Observed | official predefined screener page. | High | Save and Download exact gate Not Verified. |
| YF-SC-022 | My Portfolio Landing | https://finance.yahoo.com/portfolios | My Portfolio entry | sign in 후 Portfolio, holdings, brokerage link, manual portfolio creation을 시작하게 한다. | Portfolio | Marketing Page, Images, CTA | Sign in, Start Creating after login | Login Required | Observed / Login Required | official Portfolio Product page and Help. | High | logged-in empty state Not Verified. |
| YF-SC-023 | My Watchlist | https://finance.yahoo.com/portfolio/pf_follow/view | My portfolio / Watchlists | followed symbols와 watchlist management candidate를 제공한다. | Watchlist | List / Table candidate | add tickers candidate | Login Required / Public indexed content | Partially Observed | official indexed Product content and Help. | Medium | current not-logged body and logged-in Watchlist UI Not Verified. |
| YF-SC-024 | Premium Benefits | https://finance.yahoo.com/subscriptions/ | Upgrade to Premium | Premium data, charts, research, portfolio, alerts, news, ad-free benefits를 제공한다. | Subscription Plan | Feature List, Marketing Page | open feature, select plan | Public Access | Observed | official subscriptions page. | High | product-specific gate UI Not Verified. |
| YF-SC-025 | Pricing / Plan Selection | https://finance.yahoo.com/about/plans/select-plan/researchReports/ | Premium Benefits | Bronze, Silver, Gold plans and Premium Feature groups를 제공한다. | Subscription Plan | Pricing Cards, Plan Copy | Select plan, Continue | Public Access | Observed | official select-plan page. | High | pricing may change after access date. |
| YF-SC-026 | Plan Compare | https://finance.yahoo.com/about/plans/compare/ | Premium pricing | AlphaSpace, Premium News, Premium Portfolios, Custom Watchlists and feature availability를 비교한다. | Subscription Plan | Comparison Table | plan selection | Public Access | Observed | official plan compare page. | High | exact plan matrix cells may change. |
| YF-SC-027 | Help | https://help.yahoo.com/kb/finance/ | Help / footer | Product capability와 access instructions를 article로 제공한다. | Documentation | Help Article | search Help, open article | Public Access | Observed | Yahoo Help official pages. | High | Help-to-current UI mismatch 가능성은 item별 확인 필요. |

## Information Form Inventory

| Information Form | Screens |
| --- | --- |
| Market Summary | Home, Markets Overview |
| Search Field | Search Field |
| Detail Page | AAPL Quote Summary |
| Chart | Quote Chart |
| Metrics Table | Quote Summary, Quote Statistics |
| Financial Table | Quote Financials |
| Holder Table | Quote Holders |
| News List | News, Quote Summary, Crypto Top Stories |
| Screener Cards | Screeners Hub |
| Filter Summary | Predefined Screener Result |
| Table | Markets Overview, All Cryptocurrencies, Currencies, Predefined Screener Result |
| Heatmap | All Cryptocurrencies, Predefined Screener Result |
| Marketing Page | My Portfolio Landing, Premium Benefits |
| Pricing Cards | Pricing / Plan Selection |
| Help Article | Help |

## Access Level Summary

| Access Level | Screens |
| --- | --- |
| Public Access | Home, Search Field, Quote Summary, Chart, News, Markets, Crypto, Currencies, Screeners, Premium, Help |
| Login Required | My Portfolio Landing, My Watchlist, custom screener save, portfolio create, holdings management |
| Premium Feature | Fair Value, Research Reports, Premium Charts, Premium Screeners, Premium Portfolio Analytics, Premium Alerts, ad-free |
| Not Verified | Drawing Tool, Quote Sustainability body, Quote Conversation body, Search Suggestion grouping, logged-in Home personalization |

## Advertisement Observation

Observation:
Markets official Product content includes `ADVERTISEMENT`. Premium pages include ad-free as a plan benefit.

Interpretation:
Advertisement appears as a Public Surface condition and Premium ad-free appears as a subscription benefit. Phase 5.1 does not evaluate impact.

Confidence:
Medium

Evidence:
Official Markets page indexed content, official subscriptions and plan pages. 확인일 2026-07-28.
