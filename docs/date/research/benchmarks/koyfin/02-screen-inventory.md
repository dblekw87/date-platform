# Koyfin Screen Inventory 기록

## 문서 목적

이 문서는 Koyfin Phase 3.1에서 확인한 Screen 후보를 `Screen Research Template` 기준으로 기록한다.

실제 App 내부 조작이 필요한 Screen은 `Official Documentation Only`, `Partially Observed`, `Login Required`, `Not Verified`로 구분한다.

## Screen 요약 정보

| 항목 | 수 |
| --- | ---: |
| 기록한 Screen | 18 |
| Public Access Screen | 7 |
| Login Required 또는 Partially Observed Screen | 8 |
| Official Documentation Only Screen | 6 |
| Paid Feature 영향을 받는 Screen | 6 |

## 기본 Screen 정보

| Screen ID | Screen Name | URL | Page 또는 Surface Type | Access Level | Primary User Question | Primary Entity | Supporting Entities | Observation Status | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-SC-001 | Marketing Landing | https://www.koyfin.com/ | Public Page | Public Access | Koyfin이 어떤 투자 Research Product인지 이해할 수 있는가. | Product Surface | Market, Portfolio, Report | Observed | High |
| KYF-SC-002 | Authentication Entry | https://app.koyfin.com/ | Entry Screen | Login Required | 계정 생성 또는 로그인으로 App에 진입할 수 있는가. | User Account | Subscription Plan | Partially Observed | Medium |
| KYF-SC-003 | Public Product Navigation | https://www.koyfin.com/ | Navigation Surface | Public Access | Product와 plan 정보를 어디서 탐색하는가. | Product Surface | Feature, Plan, User Segment | Observed | High |
| KYF-SC-004 | Command Bar & Search | https://www.koyfin.com/help/command-bar-search/ | Search / Navigation Tool | Login Required | ticker 또는 function으로 빠르게 이동할 수 있는가. | Security | Function, Chart, Field, Country | Official Documentation Only | Medium |
| KYF-SC-005 | Custom Dashboards / My Dashboards | https://www.koyfin.com/features/custom-dashboards/ | Dashboard / Workspace Surface | Login Required | 사용자 정의 Dashboard를 만들고 저장할 수 있는가. | Dashboard | Watchlist, Security, Chart, News, Widget | Partially Observed | High |
| KYF-SC-006 | My Dashboard Groups | https://www.koyfin.com/help/my-dashboards-groups/ | Dashboard Configuration | Login Required | 여러 widget의 Security Context를 연결할 수 있는가. | Widget Group | Security, Watchlist, Graph, News | Official Documentation Only | Medium |
| KYF-SC-007 | Market Dashboards / Macro Dashboards | https://www.koyfin.com/features/market-dashboards/ | Dashboard Surface | Public Access | Market와 Macro 상황을 curated Dashboard로 확인할 수 있는가. | Market | Index, Sector, Country, Yield, Currency, Commodity, Economic Event | Observed | High |
| KYF-SC-008 | Company Snapshots | https://www.koyfin.com/features/company-snapshots/ | Company Research Surface | Login Required / Paid Feature | Company 핵심 정보를 한 화면에서 파악할 수 있는가. | Company | Security, ETF Exposure, Estimate, News | Official Documentation Only | Medium |
| KYF-SC-009 | Financial Analysis | https://www.koyfin.com/features/financial-analysis/ | Company Analysis Surface | Login Required / Paid Feature | Company financials와 valuation을 분석할 수 있는가. | Company | Financial Statement, Metric, Estimate, Template | Partially Observed | High |
| KYF-SC-010 | Advanced Graphing / My Graphs | https://www.koyfin.com/features/advanced-graphing/ | Chart / Graph Tool | Login Required | Security와 Metric series를 chart로 분석하고 저장할 수 있는가. | Chart | Security, Metric, Template, Folder | Partially Observed | High |
| KYF-SC-011 | Stock Screener / My Screens | https://www.koyfin.com/features/stock-screener/ | Screener Tool | Login Required / Paid Feature | 조건에 맞는 Stock 또는 Security 후보를 찾을 수 있는가. | Security | Company, Region, Sector, Industry, Filter, Screen | Partially Observed | High |
| KYF-SC-012 | My Watchlists | https://www.koyfin.com/help/mydashboards-myd/amp/ | Watchlist Surface | Login Required / Paid Feature | Security 목록을 저장하고 재사용할 수 있는가. | Watchlist | Security, Table View, Field, Group | Official Documentation Only | Medium |
| KYF-SC-013 | My Portfolios | https://www.koyfin.com/help/my-portfolios/ | Portfolio Surface | Login Required / Paid Feature | holdings, accounts, P/L, exposure를 관리할 수 있는가. | Portfolio | Account, Holding, Lot, Currency, Exposure | Official Documentation Only | High |
| KYF-SC-014 | News | https://www.koyfin.com/mobile-app/ | News Surface | Public Access / Paid Feature | Market, ticker, Portfolio 관련 News를 확인할 수 있는가. | News | Ticker, Watchlist, Portfolio, Transcript, Press Release | Partially Observed | Medium |
| KYF-SC-015 | Economic Calendar / Event Surface | https://www.koyfin.com/features/market-dashboards/ | Calendar / Event Surface | Public Access | economic data release를 확인할 수 있는가. | Economic Event | Country, Indicator, Calendar, Market | Partially Observed | Medium |
| KYF-SC-016 | Mobile App | https://www.koyfin.com/mobile-app/ | Mobile Surface | Public Access / Login Required | mobile에서 Market, Portfolio, News, Watchlists를 확인할 수 있는가. | Product Surface | Market, Portfolio, News, Watchlist | Observed | High |
| KYF-SC-017 | Pricing / Feature Comparison | https://www.koyfin.com/pricing/ | Pricing Surface | Public Access | plan별 기능 제한을 이해할 수 있는가. | Subscription Plan | Feature, Watchlist, Screen, Dashboard, Portfolio | Observed | High |
| KYF-SC-018 | Right Sidebar | https://www.koyfin.com/help/right-sidebar/amp/ | Panel / Contextual Navigation | Login Required | Watchlist, Movers, News에서 Security를 선택하고 Screen으로 보낼 수 있는가. | Panel | Watchlist, Movers, News, Security | Official Documentation Only | Medium |

## Action과 Navigation

| Screen ID | Primary Action | Secondary Actions | Global Navigation Position | Local Navigation | Personalization |
| --- | --- | --- | --- | --- | --- |
| KYF-SC-001 | Sign Up 또는 Product 탐색 | Pricing, Feature, Data Coverage 이동 | Public Header | Feature sections | 없음 |
| KYF-SC-002 | Sign Up 또는 Log In | plan 선택 후 가입 | Public Header entry | Not Verified | 계정 기반 |
| KYF-SC-003 | Product section 이동 | Features, Data Coverage, Mobile App, Pricing 이동 | Public Header | dropdown 또는 link structure는 Not Verified | 없음 |
| KYF-SC-004 | ticker 또는 command 입력 | Advanced Search, asset type/country filter | App top command bar | Search result list | 최근 검색 또는 saved state는 Not Verified |
| KYF-SC-005 | Dashboard 생성과 저장 | widget 추가, table 구성, chart 공유 | App left sidebar로 설명됨 | widget layout | Dashboard, table, widget customization |
| KYF-SC-006 | group 지정 | single/multiple security, My Watchlists selection | My Dashboards 내부 | group color selection | widget linking |
| KYF-SC-007 | Market Dashboard 탐색 | segment별 market data 확인 | Feature page와 App Dashboard | segment dashboard | predefined dashboard 중심 |
| KYF-SC-008 | Company summary 확인 | ETF exposure, estimates, price targets, earnings history 확인 | Search 또는 Snapshot command로 추정 | Snapshot sections | Not Verified |
| KYF-SC-009 | financial metrics 확인 | statements, ratios, template 저장 | Company Research 또는 Feature entry | statement categories | custom financial template |
| KYF-SC-010 | graph 생성 | save, folder, export PNG, template 적용 | Command Bar, Feature entry, Dashboard widget | chart controls | My Graphs, chart templates |
| KYF-SC-011 | filter 적용 | screen 저장, watchlist 추가, CSV export | My Screens, right side nav로 설명됨 | filter and column controls | saved screen, table view |
| KYF-SC-012 | Watchlist 생성 또는 Security 선택 | table view, grouping, summary rows | My Watchlists, Right Sidebar, Dashboard widget | table columns | watchlist views |
| KYF-SC-013 | Portfolio 생성과 holding 입력 | account 추가, CSV upload, P/L 분석 | Help Functionality, Mobile App | tabs와 exhibits는 일부 확인 | portfolio views |
| KYF-SC-014 | News 읽기 | ticker-specific News, portfolio-level News 확인 | Home, Mobile, Dashboard widget, Right Sidebar | News categories는 Not Verified | watchlist/portfolio 기반 News |
| KYF-SC-015 | calendar 확인 | country economic data release 확인 | Market Dashboards | calendar filters는 Not Verified | Not Verified |
| KYF-SC-016 | mobile monitoring | portfolio drill-down, alerts, news 확인 | Mobile App | mobile navigation은 Not Verified | desktop sync |
| KYF-SC-017 | plan 비교 | signup 또는 upgrade 판단 | Public Header | pricing table | plan 선택 |
| KYF-SC-018 | ticker 선택 | Snapshot, Estimates, Graph로 load | App right sidebar | sidebar sections | watchlist display options |

## Information Hierarchy와 UI 단위

| Screen ID | Information Hierarchy | Card / Table / Chart / Widget 사용 | Source / Freshness | Empty State | Loading State | Error State |
| --- | --- | --- | --- | --- | --- | --- |
| KYF-SC-001 | Product value, audience, capabilities, data coverage, plan entry 순서 | Marketing sections, feature blocks | live market data와 combined news 언급, source detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-002 | Authentication action이 우선 | Login form UI는 Not Verified | Not Applicable | Not Verified | Not Verified | Not Verified |
| KYF-SC-003 | Public Product category 중심 | Navigation link | Not Applicable | Not Verified | Not Verified | Not Verified |
| KYF-SC-004 | command input, ticker/function result, filter 순서로 설명됨 | Search result list | Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-005 | Dashboard, widget, table/chart/news 구성으로 설명됨 | Widget, Table, Chart, News widget | data source detail은 Not Verified | blank dashboard가 언급됨 | Not Verified | Not Verified |
| KYF-SC-006 | group color, selection method, linked widget 순서 | Widget group | Not Applicable | Not Verified | Not Verified | Not Verified |
| KYF-SC-007 | broad market segment와 Macro dashboard 중심 | Dashboard, table, chart로 추정되나 실제 widget 구조는 Not Verified | economic data release 언급, Freshness detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-008 | overview, description, ETF exposure, estimates, price target, earnings history | Snapshot sections, chart/news widget은 공식 문서 설명 | News와 estimates source detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-009 | metrics overview, statements, ratios, template 순서 | Table, Chart, Template | estimates, annual/quarterly data, adjusted/GAAP label은 공식 문서에서 일부 확인 | Not Verified | Not Verified | Not Verified |
| KYF-SC-010 | graph, series, templates, export/share 순서 | Chart, Scatter Chart, Template | series source detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-011 | universe, filter, result table, export/save 순서 | Table, Filter, Template | 5,900+ criteria와 securities coverage 공식 설명 | Not Verified | Not Verified | Not Verified |
| KYF-SC-012 | Security list, field columns, grouping, summary rows | Table, Watchlist widget | field source detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-013 | holdings, account, lots, P/L, exposure, views 순서 | Table, exhibits, views | FX impact와 P/L calculation은 공식 설명, methodology detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-014 | trending/latest/ticker-specific 또는 portfolio-level News로 설명됨 | News list/widget | live news feed, premium news, press releases, transcripts 언급 | Not Verified | Not Verified | Not Verified |
| KYF-SC-015 | country economic data releases 중심 | Calendar, Dashboard | Freshness와 source detail은 Not Verified | Not Verified | Not Verified | Not Verified |
| KYF-SC-016 | Market overview, My Portfolio, News, Watchlists 순서 | Mobile list, portfolio views, News list | synced desktop data와 portfolio-level News 언급 | Not Verified | Not Verified | Not Verified |
| KYF-SC-017 | plan tier, feature limit, price, signup 순서 | Pricing table | plan feature source는 공식 Pricing page | Not Applicable | Not Verified | Not Verified |
| KYF-SC-018 | watchlists, movers, News, ticker load target 순서 | Sidebar Panel, list | News source detail은 Not Verified | Not Verified | Not Verified | Not Verified |

## Evidence와 Open Question

| Screen ID | Evidence | Open Question |
| --- | --- | --- |
| KYF-SC-001 | Official Product Observation: https://www.koyfin.com/. Access Date: 2026-07-27. | 로그인 후 기본 Home과 동일한지 확인 필요. |
| KYF-SC-002 | Official Product Observation: Home header Sign Up For Free, Log In. Access Date: 2026-07-27. | authentication 이후 default Surface 확인 필요. |
| KYF-SC-003 | Official Product Observation: Home public header. Access Date: 2026-07-27. | App 내부 Global Navigation 구조 확인 필요. |
| KYF-SC-004 | Official Documentation: https://www.koyfin.com/help/command-bar-search/. Access Date: 2026-07-27. | 실제 Search result grouping과 ranking 확인 필요. |
| KYF-SC-005 | Official Product Observation: custom dashboards page. Official Documentation: My Dashboards help. Access Date: 2026-07-27. | Dashboard Persistence와 permission limit 확인 필요. |
| KYF-SC-006 | Official Documentation: https://www.koyfin.com/help/my-dashboards-groups/. Access Date: 2026-07-27. | group state가 saved dashboard 전체에 유지되는지 확인 필요. |
| KYF-SC-007 | Official Product Observation: https://www.koyfin.com/features/market-dashboards/. Access Date: 2026-07-27. | Market Dashboard 내부 Local Navigation 확인 필요. |
| KYF-SC-008 | Official Product / Documentation snippets: Company Snapshots, Global Equities help, Pricing. Access Date: 2026-07-27. | Company와 Security ID가 UI에서 분리되는지 확인 필요. |
| KYF-SC-009 | Official Product Observation: https://www.koyfin.com/features/financial-analysis/. Official Documentation: Actuals and Consensus. Access Date: 2026-07-27. | estimates methodology와 source visibility 확인 필요. |
| KYF-SC-010 | Official Product Observation: https://www.koyfin.com/features/advanced-graphing/. Access Date: 2026-07-27. | chart template와 Dashboard widget의 Context 공유 확인 필요. |
| KYF-SC-011 | Official Product Observation: https://www.koyfin.com/features/stock-screener/. Official Documentation: My Screens. Access Date: 2026-07-27. | result에서 Company Snapshot 또는 Graph로 이동하는 실제 Flow 확인 필요. |
| KYF-SC-012 | Official Documentation: My Dashboards help, Right Sidebar help, Pricing. Access Date: 2026-07-27. | 독립 Watchlist Screen과 Sidebar 책임 차이 확인 필요. |
| KYF-SC-013 | Official Documentation: https://www.koyfin.com/help/my-portfolios/. Access Date: 2026-07-27. | Portfolio가 Watchlist와 어떻게 연결되는지 확인 필요. |
| KYF-SC-014 | Official Product Observation: Home, Mobile App, Pricing. Access Date: 2026-07-27. | News Detail, Source link, Freshness 표시 확인 필요. |
| KYF-SC-015 | Official Product Observation: Market Dashboards page. Access Date: 2026-07-27. | Event에서 Company 또는 Security 영향으로 전환되는지 확인 필요. |
| KYF-SC-016 | Official Product Observation: https://www.koyfin.com/mobile-app/. Access Date: 2026-07-27. | 실제 Mobile Navigation과 offline state 확인 필요. |
| KYF-SC-017 | Official Product Observation: https://www.koyfin.com/pricing/. Access Date: 2026-07-27. | plan별 실제 App gating UI 확인 필요. |
| KYF-SC-018 | Official Documentation: Right Sidebar help. Access Date: 2026-07-27. | Panel state와 ticker load target의 실제 Interaction 확인 필요. |

## Screen Inventory 제한사항

- 실제 App 내부 Screen을 로그인 상태에서 조작하지 않았다.
- Empty State, Loading State, Error State는 대부분 Not Verified다.
- 일부 App 내부 Screen은 Help Center 설명에 의존한다.
- Company Snapshot과 Right Sidebar는 공식 문서와 공식 Product snippet 기준이므로 Confidence를 Medium으로 유지한다.
- 이번 문서는 Screen 존재와 책임을 기록하며, Navigation Flow 또는 Product Flow를 확정하지 않는다.
