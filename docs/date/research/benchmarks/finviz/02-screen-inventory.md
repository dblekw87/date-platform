# Finviz Screen Inventory 기록

## 문서 목적

이 문서는 Finviz Phase 4.1에서 확인한 Screen 후보를 `Screen Research Template` 기준으로 기록한다.

실제 로그인 또는 Finviz Elite 접근이 필요한 Screen은 `Login Required`, `Elite Feature`, `Official Documentation Only`, `Not Verified`로 구분한다.

## Screen 요약 정보

| 항목 | 수 |
| --- | ---: |
| 기록한 Screen | 17 |
| Public Access Screen | 11 |
| Login Required Screen | 3 |
| Elite Feature 영향을 받는 Screen | 7 |
| Partially Observed 또는 Not Verified Screen | 6 |

## 기본 Screen 정보

| Screen ID | Screen Name | URL | Page 또는 Surface Type | Access Level | Observation Status | Primary User Question | Primary Entity | Supporting Entities | Primary Action | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-SC-001 | Home | https://finviz.com/ | Market Summary / Entry Surface | Public Access | Observed | 오늘 Market에서 무엇이 중요한가. | Market | Stock, News, Event, Insider, Futures, Forex, Crypto | Market summary scan | High |
| FNV-SC-002 | Global Navigation | https://finviz.com/ | Navigation Surface | Public Access | Observed | 어떤 Product Surface로 이동할 수 있는가. | Product Surface | Tool, Asset Class, Account | Surface 선택 | High |
| FNV-SC-003 | Screener | https://finviz.com/screener | Screener Tool / Discovery Surface | Public Access / Elite Feature 일부 | Observed | 조건에 맞는 Stock 또는 ETF 후보를 찾을 수 있는가. | Stock | Company, Sector, Industry, Country, Filter, Signal | filter 적용, result row 선택 | High |
| FNV-SC-004 | Screener Result Views | https://finviz.com/screener?ft=4&v=111 | Result View Surface | Public Access / Elite Feature 일부 | Observed | 같은 filter 결과를 어떤 view로 비교할 수 있는가. | Stock | Metric, News, Chart, Snapshot, Map | view tab 전환 | High |
| FNV-SC-005 | Maps | https://finviz.com/map | Heatmap Surface | Public Access / Elite Feature 일부 | Partially Observed | Market structure와 Stock movement를 Heatmap으로 볼 수 있는가. | Stock | Sector, Industry, Index, Theme, ETF, Crypto, Futures | Heatmap scan, ticker search | Medium |
| FNV-SC-006 | Groups | https://finviz.com/groups | Group Comparison Surface | Public Access / Elite Feature 일부 | Partially Observed | Sector, Industry, Country, Capitalization group을 비교할 수 있는가. | Sector / Industry | Country, Market Cap group, Metric | group view 전환 | Medium |
| FNV-SC-007 | Stock Quote / AAPL | https://finviz.com/stock?t=AAPL | Stock Detail Page | Public Access / Elite Feature 일부 | Observed | AAPL의 가격, metrics, News, peer context를 한 화면에서 볼 수 있는가. | Stock | Company, Peer Stock, ETF, Sector, Industry, Analyst, News | detail scan, tab 전환 | High |
| FNV-SC-008 | News | https://finviz.com/news | News Surface | Public Access / Elite Feature 일부 | Observed | News를 시간, category, Source 기준으로 볼 수 있는가. | News | Source, Stock, Market Category | News item 선택 | High |
| FNV-SC-009 | Insider | https://finviz.com/insidertrading | Insider Transaction Surface | Public Access | Observed | insider activity를 transaction table로 조사할 수 있는가. | Insider Transaction | Stock, Owner, SEC Form 4 | table scan, SEC link 이동 | High |
| FNV-SC-010 | Portfolio Entry | https://finviz.com/portfolio | Personal Surface | Login Required / Elite Feature 일부 | Login Required | Portfolio를 만들고 저장할 수 있는가. | Portfolio | Stock, Flag, Note, Alert | register 또는 login | Medium |
| FNV-SC-011 | Futures | https://finviz.com/futures | Asset Class Surface | Public Access | Partially Observed | Futures prices를 볼 수 있는가. | Futures Contract | Commodity, Index Future | price scan | Medium |
| FNV-SC-012 | Forex | https://finviz.com/forex | Asset Class Surface | Public Access | Partially Observed | Forex prices를 볼 수 있는가. | Currency Pair | Bond Yield | price scan | Low |
| FNV-SC-013 | Crypto | https://finviz.com/crypto | Asset Class Surface | Public Access | Partially Observed | Crypto prices를 볼 수 있는가. | Crypto Asset | Currency Pair | price scan | Low |
| FNV-SC-014 | Calendar | https://finviz.com/calendar/economic | Calendar / Event Surface | Public Access | Partially Observed | economic release와 earnings timing을 볼 수 있는가. | Calendar Event | Economic Indicator, Stock | event scan | Medium |
| FNV-SC-015 | Elite / Pricing | https://finviz.com/elite | Pricing / Feature Comparison | Public Access | Observed | Public, Registered, Elite 기능 차이를 이해할 수 있는가. | Subscription Plan | Feature, Data, Portfolio, Alert, API | plan 비교, trial 시작 | High |
| FNV-SC-016 | Authentication | https://finviz.com/login | Auth Screen | Public Access | Observed | Login 또는 account creation을 수행할 수 있는가. | User Account | Subscription Plan | login, register | High |
| FNV-SC-017 | Backtests | https://finviz.com/backtests | Strategy Tool 후보 | Elite Feature | Not Verified | technical strategy를 backtest할 수 있는가. | Strategy | Technical Indicator, Stock, Benchmark | Not Verified | Low |

## Action과 Navigation

| Screen ID | Secondary Actions | Global Navigation Position | Local Navigation | Personalization |
| --- | --- | --- | --- | --- |
| FNV-SC-001 | Signal click, ticker click, News click, Calendar / Insider / Futures summary 이동 | Home | dense section links | Elite Home customization은 공식 Blog 기준, direct UI Not Verified |
| FNV-SC-002 | Login, Register, Pricing, Help 이동 | top navigation | Not Applicable | 없음 |
| FNV-SC-003 | Order by, Signal, Tickers input, Save as Portfolio, Create Alert, Refresh | Screener | filter category tabs | My Presets, saved filters는 Login / Elite limit 확인 필요 |
| FNV-SC-004 | Overview, Valuation, Financial, Ownership, Performance, Technical, ETF, Charts, News, Snapshot, Maps 전환 | Screener | result view tabs | Custom view / Stats View는 Elite Feature |
| FNV-SC-005 | Map filter, period, ticker search, hover, zoom, pan, double-click | Maps | Map / Bubbles, filter controls | Elite real-time / intraday maps, homepage maps layout customization |
| FNV-SC-006 | Group selector, Order By, Overview, Valuation, Performance, Custom, Performance Chart, Spectrum, Charts, Maps 전환 | Groups | group and view controls | Custom view / export는 Elite 영향을 받을 수 있음 |
| FNV-SC-007 | Compare, Short Interest, Financials, Options, Filings, peer link, ETF holder link, News link | Stock Quote via ticker links | Stock tabs | Chart template / technical studies는 Elite 영향을 받을 수 있음 |
| FNV-SC-008 | Market News, Market Pulse, Stocks News, ETF News, Crypto News, Blogs, Time / Source view | News | category and view links | Customize Media Sources는 Elite Feature |
| FNV-SC-009 | Latest, Top Insider Trading Recent Week, Top 10% Owner Trading Recent Week, Filter, SEC Form 4 link | Insider | insider category links | Alerts for insider activity는 Elite Feature |
| FNV-SC-010 | Portfolio creation, stock organization, flags, notes, sync with Screener | Portfolio | Not Verified | Portfolio Persistence, Color Flags, limits |
| FNV-SC-011 | Futures item selection은 Not Verified | Futures | Not Verified | Elite does not remove futures 20-minute delay per FAQ |
| FNV-SC-012 | pair selection은 Not Verified | Forex | Not Verified | Not Verified |
| FNV-SC-013 | crypto item selection은 Not Verified | Crypto | Not Verified | Not Verified |
| FNV-SC-014 | Calendar category and event detail Not Verified | Calendar | Not Verified | Not Verified |
| FNV-SC-015 | Start Free Trial, Sign up, Login, FAQ scan | Pricing | pricing sections | subscription plan |
| FNV-SC-016 | Google sign-in, email login, free account creation | Login / Register | form fields | account state |
| FNV-SC-017 | Not Verified | Not Verified | Not Verified | Elite Feature로 추정, direct UI Not Verified |

## Information Hierarchy와 UI 단위

| Screen ID | Information Hierarchy | Table / Heatmap / Chart / News List 사용 | Information Density | Source / Freshness | Empty State | Loading State | Error State | Advertisement Impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-SC-001 | Market breadth, Signal list, Heatmap, Headlines, Major News, Calendar, Insider, Futures / Forex summary 순서 | Table, Heatmap, News List, Dense Summary | High. 여러 정보 그룹을 동시 노출한다. | footer에 NASDAQ / NYSE / AMEX quote 1분 delay 표시 | Not Verified | Not Verified | Not Verified | public page에는 광고 / tracking iframe이 확인됨. 영향은 Not Verified |
| FNV-SC-002 | Product Surface links, account links, Help / Pricing links | Navigation | Medium. 많은 top-level item을 한 줄에 노출한다. | Not Applicable | Not Applicable | Not Verified | Not Verified | Not Verified |
| FNV-SC-003 | preset / order / ticker input, filter categories, filter controls, result views, result count, table 순서 | Form, Table, Chart, Snapshot, Heatmap | High. filter와 result가 같은 화면에 있다. | refresh 3min 표시, footer quote delay 표시 | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-004 | result count, compare / portfolio / alert action, view tabs, table rows, pagination | Table, Chart, News List, Snapshot, Heatmap | High. row와 column이 dense comparison을 만든다. | refresh 3min 표시 | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-005 | map filter, Heatmap body, legend, ticker search로 설명됨 | Heatmap | High로 추정. color와 size가 동시에 의미를 가진다. | public quotes delayed, Elite real-time maps | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-006 | group selector, view tabs, group table 또는 chart | Table, Chart, Heatmap | Medium to High. group-level aggregate metrics를 비교한다. | quote delay footer | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-007 | ticker header, price / timestamp, tabs, classifications, peers, ETF holders, metrics, ratings, News | Dense Summary, Table, Chart, News List | Very High. Stock Context 안에 수십 개 Metric을 노출한다. | price timestamp, quote delay footer, News timestamp / Source | Not Verified | Not Verified | Not Verified | Elite upsell banner가 상단에 표시됨 |
| FNV-SC-008 | category links, News / Blogs, Time / Source view, timestamped list | News List | High. timestamp와 headline이 반복된다. | timestamp and external Source domain | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-009 | category links, filter, transaction table | Table | High. transaction fields가 열로 구성된다. | SEC Form 4 timestamp / external SEC Source | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-010 | register redirect, Portfolio body Not Verified | Form, Table은 Not Verified | Not Verified | Not Verified | account creation prompt | Not Verified | Not Verified | Not Verified |
| FNV-SC-011 | page heading and body Not Verified, Home summary는 table | Table / Chart Not Verified | Low confidence | Futures quotes delayed 20 minutes | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-012 | page heading and body Not Verified, Home summary는 table | Table / Chart Not Verified | Low confidence | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-013 | page heading and body Not Verified | Table / Chart / Heatmap Not Verified | Low confidence | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-014 | Home calendar table, Calendar body Not Verified | Calendar, Table | Medium confidence | event date / time in Home | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-015 | value proposition, feature sections, feature comparison table, FAQ, pricing | Pricing Table, Marketing sections | Medium. feature grouping 중심이다. | trial renewal and price terms 표시 | Not Applicable | Not Verified | Not Verified | No Ads as Elite Feature |
| FNV-SC-016 | authentication title, Google entry, email entry, account switch link | Form | Low. focused form screen이다. | Not Applicable | Not Verified | Not Verified | Not Verified | Not Verified |
| FNV-SC-017 | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | direct URL body 확인 실패 | Not Verified |

## Surface별 Observation 기록

### FNV-SC-003 Screener

Observation:
Screener는 filter category와 result view tab을 같은 Screen에 표시한다. Result table row는 ticker, company, Sector, Industry, Country, Market Cap, P/E, Price, Change, Volume을 포함한다.

Interpretation:
Screener는 조건 입력과 결과 비교를 분리하지 않고 한 화면에 배치해 반복 filter 조정을 빠르게 만들 수 있다.

User Impact:
사용자는 filter를 바꾼 뒤 즉시 table 결과를 보고 Stock Detail로 이동할 수 있다.

DATE Implication:
DATE에서 discovery filter와 result comparison을 같은 Screen에 둘지 검증할 질문으로 남긴다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/screener, https://finviz.com/screener?ft=4&v=111, Official Documentation, https://finviz.com/help/screener, 확인일 2026-07-28.

### FNV-SC-005 Maps

Observation:
Maps는 공식 indexed text에서 Map / Bubbles view, S&P 500, Dow Jones 30, Nasdaq 100, Russell 2000, All Stocks, Market Cap, World, ETFs, Crypto, Futures, Themes filter, 1-Day Performance, Show Industry, Quick search ticker, zoom / pan, double-click detail, hover competitor view를 제공하는 것으로 표시된다.

Interpretation:
Maps는 Heatmap을 Market overview와 Stock discovery의 연결 Surface로 사용하는 구조일 수 있다.

User Impact:
사용자는 Market 구조를 색상과 크기로 빠르게 스캔할 수 있지만, 동적 interaction을 익혀야 Navigation 효용이 커진다.

DATE Implication:
Heatmap은 단순 Chart가 아니라 Discovery / Navigation Surface 후보로 별도 검증해야 한다.

Confidence:
Medium

Evidence:
Official Product Observation / indexed text, https://finviz.com/map, Official Product Blog, https://finviz.com/blog/evolving-the-heatmap-dow-jones-nasdaq-100-russell-2000-and-more/, 확인일 2026-07-28.

### FNV-SC-007 Stock Quote / AAPL

Observation:
AAPL Stock Quote는 Overview, Compare, Short Interest, Financials, Options, Filings tab을 제공한다. 같은 header 영역에서 Sector, Industry, Country, Peers, Held by ETF를 확인할 수 있다. 화면에는 valuation, financial, ownership, technical, performance, analyst ratings, News가 함께 표시된다.

Interpretation:
Stock Quote는 Stock Context를 유지하는 정보 허브로 해석된다.

User Impact:
사용자는 Stock Detail 안에서 peer, ETF holder, News, rating change로 전환할 수 있다.

DATE Implication:
DATE에서 Stock Context 안에 어떤 related Entity를 유지할지 별도 검증해야 한다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/stock?t=AAPL, 확인일 2026-07-28.

### FNV-SC-009 Insider

Observation:
Insider Screen은 Ticker, Owner, Relationship, Date, Transaction, Cost, #Shares, Value, #Shares Total, SEC Form 4 열을 가진 transaction table을 제공한다.

Interpretation:
Insider는 Person-first가 아니라 Transaction-first table discovery Surface로 해석된다.

User Impact:
사용자는 transaction value, relationship, SEC filing timestamp를 기준으로 Stock 또는 original filing으로 이동할 수 있다.

DATE Implication:
DATE에서 insider data를 Evidence로 다룰 경우 original filing traceability를 함께 검토해야 한다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/insidertrading, 확인일 2026-07-28.

## Evidence와 Open Question

| Screen ID | Evidence | Open Question |
| --- | --- | --- |
| FNV-SC-001 | Official Product Observation: https://finviz.com/. Access Date: 2026-07-28. | 로그인 후 Home 차이와 Elite customization 실제 UI 확인 필요. |
| FNV-SC-002 | Official Product Observation: 모든 확인된 Finviz public page top navigation. Access Date: 2026-07-28. | Mobile Navigation 확인 필요. |
| FNV-SC-003 | Official Product Observation: https://finviz.com/screener. Official Documentation: https://finviz.com/help/screener. Access Date: 2026-07-28. | My Presets access level 확인 필요. |
| FNV-SC-004 | Official Product Observation: https://finviz.com/screener?ft=4&v=111. Access Date: 2026-07-28. | Custom view와 Stats View의 실제 Elite gate 확인 필요. |
| FNV-SC-005 | Official Product Observation / indexed text: https://finviz.com/map. Official Blog: Maps updates. Access Date: 2026-07-28. | Heatmap cell to Stock Detail interaction 직접 확인 필요. |
| FNV-SC-006 | Official Product Observation: https://finviz.com/groups. Official Knowledge Base indexed text: Group Views & Performance. Access Date: 2026-07-28. | Sector to Industry to Company drill-down 확인 필요. |
| FNV-SC-007 | Official Product Observation: https://finviz.com/stock?t=AAPL. Access Date: 2026-07-28. | Options, Filings, Financials tab detail 확인 필요. |
| FNV-SC-008 | Official Product Observation: https://finviz.com/news. Access Date: 2026-07-28. | News detail에서 Stock Context 복귀 path 확인 필요. |
| FNV-SC-009 | Official Product Observation: https://finviz.com/insidertrading. Access Date: 2026-07-28. | Owner detail page와 filtering behavior 확인 필요. |
| FNV-SC-010 | Official Product Observation: https://finviz.com/portfolio redirect. Elite page and official Blog. Access Date: 2026-07-28. | Portfolio가 Watchlist인지 holdings management인지 확인 필요. |
| FNV-SC-011 | Official Product Observation: https://finviz.com/futures and Home Futures table. FAQ delay disclosure. Access Date: 2026-07-28. | Futures detail page 확인 필요. |
| FNV-SC-012 | Official Product Observation: https://finviz.com/forex and Home Forex & Bonds table. Access Date: 2026-07-28. | Forex body와 drill-down 확인 필요. |
| FNV-SC-013 | Official Product Observation: https://finviz.com/crypto and News Crypto category. Access Date: 2026-07-28. | Crypto body와 detail 확인 필요. |
| FNV-SC-014 | Official Product Observation: Home Calendar tables and https://finviz.com/calendar/economic. Access Date: 2026-07-28. | Calendar 내부 filters와 Event detail 확인 필요. |
| FNV-SC-015 | Official Product Observation: https://finviz.com/elite. FAQ: https://finviz.com/help/faq. Access Date: 2026-07-28. | current free registered limits 확인 필요. |
| FNV-SC-016 | Official Product Observation: https://finviz.com/login and https://finviz.com/register. Access Date: 2026-07-28. | post-login landing 확인 필요. |
| FNV-SC-017 | Direct URL https://finviz.com/backtests body Not Verified. Official Elite-related indexed page mentions backtesting. Access Date: 2026-07-28. | 현재 Backtests Surface 접근 경로와 Elite gate 확인 필요. |

## Screen Inventory 제한사항

- 이번 문서는 Product Surface Mapping 단계의 Screen Inventory다.
- Navigation Flow나 Core Journey를 작성하지 않는다.
- 로그인 후 Screen은 직접 조작하지 않았다.
- Finviz Elite 기능은 실제 유료 계정으로 검증하지 않았다.
- Maps, Futures, Forex, Crypto, Calendar의 동적 body는 제한적으로만 확인했다.
- Empty State, Loading State, Error State는 대부분 Not Verified다.
- 기존 benchmark 문서와 Candidate Principle Registry는 수정하지 않는다.
