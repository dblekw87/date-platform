# Koyfin Entity와 State Observation 기록

## 문서 목적

이 문서는 Koyfin에서 확인된 Entity Candidate와 User State Candidate를 분리해 기록한다.

이번 문서는 DATE Entity Architecture를 확정하지 않는다. Koyfin Product 문서에서 확인 가능한 분류와 관계만 기록한다.

## 분류 기준

| 분류 | 기준 |
| --- | --- |
| Product Entity | Koyfin Product에서 독립 분석 대상 또는 검색 대상으로 작동할 수 있는 단위 |
| User-owned Entity | 사용자가 만들거나 소유하는 지속적 Product 단위 |
| User State | 사용자의 설정, 구성, membership, filter, layout처럼 저장될 수 있는 상태 |
| Capability | 특정 Surface 안에서 수행되는 기능 |
| Surface | 사용자가 인식하는 주요 Product 접근 영역 |
| Tool | 특정 분석 작업을 수행하는 기능 중심 Surface |
| Contextual Panel | 현재 분석 또는 monitoring context를 보조하는 panel |

## Entity Candidate Inventory

| Candidate ID | Entity Candidate | 분류 | Observation Status | 확인된 역할 | Related Surface | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-ENT-001 | Company | Product Entity Candidate | Official Documentation Only | Snapshot, Financial Analysis, Actuals and Consensus의 분석 대상이다. | Company Snapshots, Financial Analysis | Official Documentation: Actuals and Consensus, Global Equities help. Access Date: 2026-07-27. | Medium | Company와 Security가 UI에서 분리 표기되는지 확인 필요. |
| KYF-ENT-002 | Security | Product Entity Candidate | Official Documentation Only | Command Bar, Watchlist, Screener, Graph, Portfolio holding의 핵심 입력이다. | Command Bar, Watchlist, Screener, Graph | Official Documentation: Command Bar & Search, My Screens, My Watchlists. Access Date: 2026-07-27. | High | Security type별 grouping UI 확인 필요. |
| KYF-ENT-003 | ETF | Product Entity Candidate | Official Documentation Only | Watchlist와 Screener, ETF Exposure에서 사용된다. | Watchlist, Screener, Company Snapshot | Official Documentation: My Dashboards, ETF Exposure snippets, Pricing. Access Date: 2026-07-27. | Medium | ETF가 Company Snapshot과 같은 route를 쓰는지 확인 필요. |
| KYF-ENT-004 | Index | Product Entity Candidate | Observed / Documentation Only | Market Dashboard와 Graph에서 Market reference로 사용된다. | Market Dashboards, Graph | Official Product Page: Market Dashboards. Official Documentation: Graph. Access Date: 2026-07-27. | Medium | Index detail Surface는 Not Verified. |
| KYF-ENT-005 | Market | Product Entity Candidate | Observed | broad market monitoring과 Market Dashboard의 Primary Entity다. | Market Dashboards, Mobile App | Official Product Page: Market Dashboards, Mobile App. Access Date: 2026-07-27. | High | Market Overview의 내부 Taxonomy 확인 필요. |
| KYF-ENT-006 | Country | Product Entity Candidate | Official Documentation Only | Screener universe와 Economic Calendar filter에 사용된다. | My Screens, Economic Calendar | Official Documentation: My Screens, Economic Calendar article. Access Date: 2026-07-27. | Medium | Country page 또는 country dashboard 존재는 Not Verified. |
| KYF-ENT-007 | Macro Indicator | Product Entity Candidate | Partially Observed | economic data와 Graph series에서 분석 대상이 될 수 있다. | Market Dashboards, Economic Calendar, Graph | Official Product Page: Market Dashboards. Official Documentation: Economic Calendar, Graph. Access Date: 2026-07-27. | Medium | Macro Indicator와 Security 영향 관계는 Not Verified. |
| KYF-ENT-008 | Economic Event | Product Entity Candidate | Partially Observed | Economic Calendar에서 country event, consensus, previous figures를 가진다. | Economic Calendar | Official Documentation: Economic Calendar article. Access Date: 2026-07-27. | Medium | Event detail route와 related Entity는 Not Verified. |
| KYF-ENT-009 | News | Product Entity Candidate | Partially Observed | Market, Watchlist, Portfolio, ticker-specific monitoring에 사용된다. | News, Mobile App, Right Sidebar, Dashboard widget | Official Product Page: Mobile App. Official Documentation: Right Sidebar, My Dashboards. Access Date: 2026-07-27. | Medium | News Source link와 related Entity 구조는 Not Verified. |
| KYF-ENT-010 | Chart | Tool / Saved Entity Candidate | Official Documentation Only | Graph Tool에서 series와 template를 구성하며 My Graphs에서는 저장 단위가 된다. | Graph, My Graphs, Dashboard widget | Official Documentation: Graph, My Graphs. Access Date: 2026-07-27. | Medium | Chart를 Entity로 볼지 User State로 볼지 추가 검증 필요. |
| KYF-ENT-011 | Dashboard | User-owned Entity Candidate / Workspace Surface | Official Documentation Only | 사용자가 widget, table, chart, News를 배치하고 저장한다. | My Dashboards | Official Documentation: My Dashboards, My Dashboard Groups. Access Date: 2026-07-27. | Medium | Dashboard가 Product Entity인지 saved Workspace인지 추가 검증 필요. |
| KYF-ENT-012 | Portfolio | User-owned Entity Candidate | Official Documentation Only | holdings, accounts, lots, P/L, exposure를 가진다. | My Portfolios | Official Documentation: My Portfolios. Access Date: 2026-07-27. | High | Portfolio에서 Security detail로 이동하는 실제 path 확인 필요. |
| KYF-ENT-013 | Watchlist | User-owned Entity Candidate | Official Documentation Only | securities membership, columns, grouping, summary rows를 가진다. | My Watchlists, My Dashboards, Right Sidebar | Official Documentation: My Watchlists, Watchlist Views. Access Date: 2026-07-27. | High | Watchlist Item의 default action 확인 필요. |
| KYF-ENT-014 | Screener Result | Product Entity Candidate / Output State | Official Documentation Only | filter 기준에 맞는 Security result table이다. | My Screens | Official Documentation: My Screens. Access Date: 2026-07-27. | Medium | result row가 독립 Entity인지 transient output인지 확인 필요. |
| KYF-ENT-015 | Saved Screen | User-owned Entity Candidate | Official Documentation Only | saved screener configuration과 dynamic result를 가진다. | My Screens | Official Documentation: My Screens. Access Date: 2026-07-27. | High | Saved Screen과 Watchlist Membership의 update behavior 차이 확인 필요. |
| KYF-ENT-016 | Subscription Plan | Product Entity Candidate | Observed | 기능 접근 범위와 saved item limit을 결정한다. | Pricing | Official Pricing: Pricing page. Access Date: 2026-07-27. | High | App 내부 gating UI 확인 필요. |

## User State Candidate Inventory

| State ID | User State Candidate | 연결 Entity / Surface | Observation Status | 저장되는 내용 | Access Restriction | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-ST-001 | Dashboard Layout | Dashboard | Official Documentation Only | widget 배치, resize, dashboard 구성 | Login Required, plan별 custom dashboard limit | My Dashboards, Pricing. Access Date: 2026-07-27. | Medium | Layout autosave 방식 확인 필요. |
| KYF-ST-002 | Dashboard Group | Dashboard, Widget | Official Documentation Only | color group, Security Selection Method, linked widget state | Login Required | My Dashboard Groups. Access Date: 2026-07-27. | Medium | group state session persistence 확인 필요. |
| KYF-ST-003 | Watchlist Membership | Watchlist, Security | Official Documentation Only | 포함된 securities, ordering, import 상태 | Login Required, plan별 watchlist limit | My Watchlists, Pricing. Access Date: 2026-07-27. | High | item별 metadata 저장 여부 확인 필요. |
| KYF-ST-004 | Watchlist View | Watchlist, Dashboard, Screen | Official Documentation Only | columns, table settings, summary rows, currency, grouping, sorting | Login Required | Watchlist Views. Access Date: 2026-07-27. | High | auto-save와 manual-save default 확인 필요. |
| KYF-ST-005 | Portfolio Holding | Portfolio, Security | Official Documentation Only | quantity, cost, purchase date, account, lot, currency | Login Required, plan별 Portfolio limit | My Portfolios. Access Date: 2026-07-27. | High | broker integration 여부는 Not Verified. |
| KYF-ST-006 | Saved Screen Configuration | Saved Screen, Screener Result | Official Documentation Only | region, universe, filter criteria, columns | Login Required, plan별 screen limit | My Screens, Pricing. Access Date: 2026-07-27. | High | rescan과 dynamic update의 exact behavior 확인 필요. |
| KYF-ST-007 | Chart Configuration | Chart, My Graphs | Official Documentation Only | tickers, data series, time range, settings, annotations | Login Required, plan별 saved graph limit | My Graphs, Historical Graph. Access Date: 2026-07-27. | Medium | Template와 My Graphs의 state boundary 추가 확인 필요. |
| KYF-ST-008 | Recent Entity | Security, Chart, Search | Not Verified | 최근 본 ticker 또는 function history 가능성 | Not Verified | Not Verified. Access Date: 2026-07-27. | Low | Recent 또는 History 지원 여부 확인 필요. |
| KYF-ST-009 | Alert Rule | Security, Portfolio, Watchlist | Not Verified | alert condition과 notification state 가능성 | Login Required 또는 Paid Feature 가능 | Mobile App에서 create alerts 언급. Access Date: 2026-07-27. | Low | Alert Surface와 condition builder 확인 필요. |
| KYF-ST-010 | Subscription Entitlement | Subscription Plan | Observed | plan별 기능 접근 권한과 limits | plan dependent | Pricing. Access Date: 2026-07-27. | High | 실제 App gating message 확인 필요. |
| KYF-ST-011 | Left Navigation Layout | App Left Sidebar | Official Documentation Only | Favorites, section collapse, section order | Login Required | Customizable Left Navigation release note. Access Date: 2026-07-27. | Medium | 모든 사용자 plan에 적용되는지 확인 필요. |

## Surface / Entity / State / Capability 분류

| 항목 | 분류 | 이유 |
| --- | --- | --- |
| My Dashboards | Surface / User-owned Entity Candidate | 사용자가 생성하고 저장하는 Dashboard 단위가 존재한다. |
| Dashboard Layout | User State | Dashboard 안의 widget 구성과 배치 상태다. |
| Dashboard Group | User State | widget 간 Security selection을 공유하는 설정 상태다. |
| Command Bar & Search | Tool / Navigation | Security와 Function을 입력받아 Surface 전환을 수행한다. |
| Right Sidebar | Contextual Panel | Watchlist, movers, News를 열고 Security를 function으로 load한다. |
| My Screens | Tool / Surface | filter로 Security 후보를 찾는 Discovery Tool이다. |
| Saved Screen | User-owned Entity Candidate | filter configuration과 dynamic result를 저장한다. |
| Screener Result | Output State / Entity Candidate | filter 실행 결과이며 독립 저장 단위인지 불확실하다. |
| My Watchlists | Surface / User-owned Entity Candidate | Security membership과 table view를 보관한다. |
| My Portfolios | Surface / User-owned Entity Candidate | ownership data와 analysis views를 보관한다. |
| My Graphs | Surface / User-owned Entity Candidate | chart configuration 전체를 저장하고 재방문한다. |
| Graph Template | User State / Template | chart layout과 metrics를 재사용하지만 My Graphs처럼 특정 ticker state 전체를 저장하지 않는다. |
| Alert | Capability / User State Candidate | Mobile App에서 create alerts가 언급되지만 독립 Surface는 Not Verified다. |

## Company와 Security 구분

Observation:
공식 Documentation은 watchlists, screens, command bar, graphs에서 `securities`와 ticker를 주로 사용한다. Company Snapshots와 Financial Analysis는 company information, company financials, valuation metrics를 설명한다. Actuals and Consensus는 company financial results와 forward estimates를 함께 분석한다고 설명한다.

Interpretation:
Koyfin은 입력과 Navigation에서는 Security 또는 ticker를 사용하고, Research 내용에서는 Company financials와 estimates를 다루는 구조일 수 있다. Product 안에서 Company와 Security가 명확히 별도 Entity로 분리되는지는 확인되지 않았다.

Confidence:
Medium

Evidence:
Official Documentation: Command Bar & Search, My Screens, My Watchlists, Actuals and Consensus. Official Product Page: Financial Analysis. Access Date: 2026-07-27.

## Dashboard와 Workspace 관계

Observation:
My Dashboards는 watchlist, chart, News widget을 포함하는 customized dashboard를 만들 수 있다고 설명한다. blank dashboard 또는 template로 시작할 수 있고 widget은 resize와 drag가 가능하다. Dashboard Groups는 widget 간 Security selection을 공유한다.

Interpretation:
Dashboard는 saved Workspace Surface로 볼 수 있다. 다만 Koyfin이 공식적으로 Workspace라는 Product 명칭을 사용하는지는 확인하지 않았다.

Confidence:
Medium

Evidence:
Official Documentation: My Dashboards, My Dashboard Groups. Access Date: 2026-07-27.

## Watchlist와 Portfolio 관계

Observation:
Watchlist는 securities 목록과 columns, grouping, summary rows를 관리한다. Portfolio는 holdings, quantity, cost, purchase date, accounts, lots, P/L, exposure를 관리한다. My Portfolios 문서는 Watchlist에서 CSV를 download해 My Portfolio에 upload할 수 있다고 설명한다.

Interpretation:
Watchlist는 monitoring과 reusable Security set 중심이다. Portfolio는 ownership, accounting, exposure 중심이다. 두 Surface는 CSV를 통해 연결될 수 있지만 동일 책임은 아니다.

Confidence:
High

Evidence:
Official Documentation: My Watchlists, My Portfolios. Official Pricing. Access Date: 2026-07-27.

## Saved Screen과 Screener 관계

Observation:
My Screens는 region, universe, filter criteria를 설정해 Screen을 만들고, 결과는 table로 나타나며 Watchlist export 또는 CSV download가 가능하다고 설명한다. screens update dynamically when reloaded라고 설명한다.

Interpretation:
Saved Screen은 고정 Security list라기보다 filter configuration과 dynamic result를 가진 User-owned Entity Candidate일 수 있다. Watchlist는 선택된 securities membership을 저장하는 다른 User-owned Entity Candidate로 구분된다.

Confidence:
High

Evidence:
Official Documentation: My Screens. Access Date: 2026-07-27.

## Chart와 Dashboard 관계

Observation:
Historical Graph는 financial series, templates, table view, annotations를 제공한다. Graph templates는 MyDashboards의 historical graph component에서 사용할 수 있다. My Graphs는 saved chart가 tickers, data series, time ranges, settings를 유지하고 latest data로 update된다고 설명한다.

Interpretation:
Chart는 Tool이면서 saved state를 가질 수 있다. Dashboard widget의 Chart는 Workspace 안의 component이고, My Graphs는 별도의 saved Chart collection일 수 있다.

Confidence:
Medium

Evidence:
Official Documentation: Historical Graph, My Graphs. Access Date: 2026-07-27.

## Economic Event와 Macro Indicator 관계

Observation:
Economic Calendar 문서는 country economic events를 filter하고, event click 시 consensus와 previous figures를 보고 charts에 접근할 수 있다고 설명한다. Market Dashboards page는 economic data와 World Economic Calendar를 Macro Dashboard 범위에 포함한다.

Interpretation:
Economic Event는 Calendar 단위이고 Macro Indicator는 chart 또는 data series로 이어질 수 있다. Event에서 Security impact로 연결되는 관계는 확인되지 않았다.

Confidence:
Medium

Evidence:
Official Product Page: Market Dashboards. Official Documentation: Economic Calendar article. Access Date: 2026-07-27.

## Relationship Inventory

| Relationship ID | From | To | Relationship Type | Status | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| KYF-REL-001 | Command Bar | Security Function | Entity Transition | Official Documentation Only | Command Bar & Search | Medium |
| KYF-REL-002 | Right Sidebar | Snapshot / Estimates / Graph | Contextual Navigation | Official Documentation Only | Right Sidebar | Medium |
| KYF-REL-003 | My Dashboard Group | Widget | State Transition | Official Documentation Only | My Dashboard Groups | Medium |
| KYF-REL-004 | Watchlist | My Dashboards | State Reuse | Official Documentation Only | My Dashboards, My Watchlists | Medium |
| KYF-REL-005 | Watchlist Views | Screens | State Reuse | Official Documentation Only | Watchlist Views, My Screens | Medium |
| KYF-REL-006 | My Screens | Watchlist | Result Save / Export | Official Documentation Only | My Screens | High |
| KYF-REL-007 | Watchlist | My Portfolio | CSV Transfer | Official Documentation Only | My Portfolios | Medium |
| KYF-REL-008 | Graph Template | Dashboard Widget | Template Reuse | Official Documentation Only | Historical Graph | Medium |
| KYF-REL-009 | My Graphs | Graph Configuration | Saved State | Official Documentation Only | My Graphs | Medium |
| KYF-REL-010 | Economic Event | Chart | Entity Transition Candidate | Official Documentation Only | Economic Calendar article | Medium |
| KYF-REL-011 | Portfolio | Exposure | Analysis View | Official Documentation Only | My Portfolios | High |
| KYF-REL-012 | Subscription Plan | Feature Access | Entitlement | Observed | Pricing | High |

## Inferred Relationship

다음 관계는 공식 자료의 단서를 바탕으로 한 Inference다. Observation으로 사용하지 않는다.

- Security에서 Company Snapshot, Financial Analysis, Graph, News로 이동하는 구조는 강하게 시사되지만 실제 App Path는 Not Verified다.
- Dashboard가 Koyfin의 중심 Workspace인지, 여러 Surface 중 하나인지는 Not Verified다.
- Watchlist와 Right Sidebar가 항상 동일한 Watchlist state를 공유하는지는 Not Verified다.
- Portfolio holdings에서 Company Research로 직접 이동 가능한지는 Not Verified다.
- Economic Event에서 related Market 또는 Security로 직접 이동하는지는 Not Verified다.

## 남아 있는 Open Question

- Company와 Security의 식별자가 UI에서 어떻게 표시되는가.
- Dashboard, My Graphs, Watchlist, Saved Screen의 저장 경계가 실제로 어떻게 다르게 동작하는가.
- Recent Entity 또는 History가 존재하는가.
- Alert Rule이 독립 User State인지, Portfolio/Watchlist/News Capability인지 확인 필요.
- Macro Indicator가 Economic Event, Chart, Security와 어떤 관계를 갖는가.
- Subscription Entitlement가 App 내부에서 어떤 gating UI로 표시되는가.
