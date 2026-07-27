# Koyfin Information Density Observation 기록

## 문서 목적

이 문서는 Koyfin이 Dashboard, Table, Chart, Sidebar, Widget을 통해 Information Density를 구성하는 방식을 기록한다.

이번 문서는 공식 Product page와 공식 Help Center에서 확인 가능한 구조만 사용한다. 실제 App 내부 화면 조작이 필요한 정보량, 화면 배치, Viewport 변화는 `Not Verified`로 구분한다.

## Information Density Observation 요약

| 분류 | Observation 수 |
| --- | ---: |
| Density Enabler | 6 |
| Density Control | 5 |
| Density Risk | 4 |
| Comparison Pattern | 5 |
| Drill-down Pattern | 5 |
| Customization Dependency | 5 |
| Not Verified | 4 |

## Density Pattern Inventory

| Density ID | Pattern | 분류 | Surface | Observation Status | Observation | Interpretation | User Impact | Potential Trade-off | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-DEN-001 | Dashboard Widget Composition | Density Enabler | My Dashboards | Official Documentation Only | My Dashboards는 watchlist, chart, News widget을 포함할 수 있고 widget resize와 drag가 가능하다고 설명된다. | 하나의 Dashboard 안에서 monitoring, comparison, chart review, News scan을 결합하려는 구조일 수 있다. | 사용자는 여러 Surface로 이동하지 않고 같은 Screen 안에서 판단 단서를 비교할 수 있다. | 초기 설정 비용이 높고 widget 책임을 모르면 화면 이해 비용이 커질 수 있다. | Official Documentation: My Dashboards. Access Date: 2026-07-28. | Medium |
| KYF-DEN-002 | Dashboard Group Linking | Density Control | My Dashboard Groups | Official Documentation Only | Dashboard Groups는 7개 color group을 사용해 여러 widget의 Security selection을 연결한다고 설명된다. | 같은 Dashboard 안의 여러 정보 단위를 하나의 Entity Context로 묶어 과밀을 제어하는 방식일 수 있다. | 사용자는 한 Security 선택으로 Table, Chart, News를 함께 갱신할 수 있다. | group 설정과 widget별 selection method를 이해해야 한다. | Official Documentation: My Dashboard Groups. Access Date: 2026-07-28. | Medium |
| KYF-DEN-003 | Watchlist Table View | Comparison Pattern | My Watchlists | Official Documentation Only | Watchlist Views는 column, grouping, summary rows, sorting, currency 같은 table settings를 저장할 수 있다고 설명된다. | Watchlist는 단순 list가 아니라 비교 가능한 Table state로 사용될 수 있다. | 사용자는 동일 Security set을 여러 기준으로 스캔하고 재사용할 수 있다. | column 수가 늘어나면 신규 사용자의 Cognitive Load가 커질 수 있다. | Official Documentation: My Watchlists, Watchlist Views. Access Date: 2026-07-28. | High |
| KYF-DEN-004 | Screener Result Table | Comparison Pattern | My Screens | Official Documentation Only | My Screens는 region, universe, Sector, Industry, price, technicals, fundamentals criteria로 Screen을 만들고 result table에 Metric columns를 추가할 수 있다고 설명된다. | 투자 기준을 filter와 table column으로 나누어 많은 후보를 비교하는 구조일 수 있다. | 사용자는 discovery 단계에서 많은 Security를 같은 기준으로 비교할 수 있다. | filter와 column 설정이 복잡해질 수 있다. | Official Documentation: My Screens. Official Product Page: Stock Screener. Access Date: 2026-07-28. | High |
| KYF-DEN-005 | Financial Analysis Table and Chart Pair | Drill-down Pattern | Financial Analysis | Official Product Page | Financial Analysis는 financial statements, valuation metrics, quarterly/annual data, graphical view와 column view를 설명한다. | Company analysis에서 summary와 detail을 Table / Chart 형식으로 전환하는 구조일 수 있다. | 사용자는 Financial Metric을 history, statement, valuation 관점에서 비교할 수 있다. | Source와 Freshness가 같은 화면에 보이는지는 Not Verified다. | Official Product Page: Financial Analysis. Official Documentation: Actuals and Consensus. Access Date: 2026-07-28. | High |
| KYF-DEN-006 | Graph Multi-series Structure | Density Enabler | Advanced Graphing | Official Product Page | Advanced Graphing은 fundamentals, technicals, performance, valuation, consensus estimates, analyst ratings 등 100개 이상 series를 charting할 수 있다고 설명한다. | Chart는 여러 Metric과 asset series를 시간축에서 겹쳐 비교하는 high-density analysis Tool일 수 있다. | 사용자는 Table보다 변화 방향과 상대 비교를 빠르게 볼 수 있다. | 너무 많은 series는 chart readability를 낮출 수 있다. | Official Product Page: Advanced Graphing. Official Documentation: Historical Graph. Access Date: 2026-07-28. | High |
| KYF-DEN-007 | Graph Template and My Graphs | Customization Dependency | My Graphs | Official Documentation Only | My Graphs는 tickers, data series, time ranges, settings를 포함한 full chart configuration을 저장한다고 설명된다. | 복잡한 Chart Density는 Template와 saved graph로 재사용해야 효율이 높아지는 구조일 수 있다. | 사용자는 반복 chart setup 비용을 줄일 수 있다. | saved state가 늘어나면 관리 비용이 생길 수 있다. | Official Documentation: My Graphs, Historical Graph. Access Date: 2026-07-28. | Medium |
| KYF-DEN-008 | Right Sidebar Monitoring Stack | Density Enabler | Right Sidebar | Official Documentation Only | Right Sidebar는 Watchlists, movers, News를 포함하고 Security를 Snapshot, Estimates, Graph로 load한다고 설명된다. | main Surface를 유지하면서 monitoring list와 News를 보조하는 Contextual Panel일 수 있다. | 사용자는 Screen 전환 없이 관심 Security를 선택하고 분석 Tool로 보낼 수 있다. | Panel 정보와 main Surface 정보가 경쟁할 수 있다. | Official Documentation: Right Sidebar. Access Date: 2026-07-28. | Medium |
| KYF-DEN-009 | Left Sidebar Customization | Density Control | App Left Sidebar | Official Documentation Only | customizable left navigation은 Favorites, collapsible sections, reorder, My Koyfin, Market Overview 같은 section을 설명한다. | Navigation Density를 사용자별 빈도에 맞춰 줄이는 구조일 수 있다. | 숙련 사용자는 자주 쓰는 Surface 접근 비용을 낮출 수 있다. | 개인화 이전에는 Product 전체 구조를 이해해야 한다. | Official Documentation: Customizable Left Navigation release note. Access Date: 2026-07-28. | Medium |
| KYF-DEN-010 | Portfolio Exposure Breakdown | Comparison Pattern | My Portfolios | Official Documentation Only | Portfolio Exposure는 securities, Sector, Industry, asset class, country 같은 category로 Portfolio를 분해한다고 설명된다. | Portfolio Density는 holdings table을 category aggregation으로 제어하는 구조일 수 있다. | 사용자는 보유 Position을 단일 list가 아니라 exposure 관점으로 비교할 수 있다. | advanced analytics와 plan 제한이 있으면 일부 사용자는 같은 Density를 얻지 못할 수 있다. | Official Documentation: My Portfolios, Portfolio Exposure. Access Date: 2026-07-28. | High |
| KYF-DEN-011 | Market Dashboard Segmentation | Density Control | Market Dashboards | Official Product Page | Market Dashboards는 World Equity Indices, US Sectors, Countries, Factors, Global Yields, Currencies, Commodities 등 segment를 설명한다. | broad Market 정보량을 segment별 Dashboard로 나누는 구조일 수 있다. | 사용자는 Market 전체를 한꺼번에 보되 관심 asset class로 좁힐 수 있다. | 실제 Screen 안의 segment hierarchy와 scrolling cost는 Not Verified다. | Official Product Page: Market Dashboards. Access Date: 2026-07-28. | High |
| KYF-DEN-012 | Economic Calendar Figures | Drill-down Pattern | Economic Calendar | Official Documentation Only | Economic Calendar는 Event click 시 consensus, previous figures, chart 접근을 제공한다고 설명된다. | Calendar list에서 Event detail과 Chart로 내려가는 Progressive Disclosure일 수 있다. | 사용자는 Event list를 훑다가 필요한 경우 수치와 history를 볼 수 있다. | Event에서 affected Security로 이동되는지는 Not Verified다. | Official Documentation: Economic Calendar article. Access Date: 2026-07-28. | Medium |
| KYF-DEN-013 | Table / Chart Role Split | Density Control | Screener, Financial Analysis, Graph | Official Documentation Only | Screener와 Watchlist는 Table 중심이고 Graph는 time-series Chart 중심으로 설명된다. Financial Analysis는 table view와 graphical view를 함께 설명한다. | Koyfin은 cross-sectional comparison과 time-series comparison을 다른 UI 단위로 분리하는 것으로 볼 수 있다. | 사용자는 후보 비교와 trend 분석을 다른 방식으로 처리할 수 있다. | Tool 간 이동이 필요할 때 Context loss가 생길 수 있다. | Official Documentation: My Screens, Historical Graph. Official Product Page: Financial Analysis. Access Date: 2026-07-28. | Medium |
| KYF-DEN-014 | Custom Data and Formula Dependency | Customization Dependency | Premium / Advisor Features | Official Pricing | Pricing은 Premium에서 unlimited custom data, formulas, custom financial templates를 제공한다고 설명한다. | 높은 Information Density는 사용자가 원하는 Metric을 직접 정의할 때 더 강해질 수 있다. | 전문 사용자는 자체 analysis model에 맞게 Screen을 구성할 수 있다. | plan 제한과 설정 비용이 높아질 수 있다. | Official Pricing: Pricing page. Access Date: 2026-07-28. | High |
| KYF-DEN-015 | App Internal Viewport Behavior | Not Verified | Dashboard, Mobile App | Not Verified | 실제 App의 responsive Layout, widget stacking, mobile Dashboard behavior는 직접 확인하지 않았다. | viewport별 Density 변화는 공식 설명만으로 판단할 수 없다. | 모바일 사용자의 정보 접근 비용은 별도 확인이 필요하다. | 잘못 추정하면 desktop 중심 Observation을 mobile에 과도 적용할 수 있다. | Not Verified. Access Date: 2026-07-28. | Low |

## Dashboard Density 기록

Observation:
My Dashboards는 watchlist, chart, News widget을 포함할 수 있고 blank dashboard 또는 template로 시작할 수 있다고 설명된다. Widget은 resize와 drag가 가능하다고 설명된다. Dashboard Groups는 widget 간 Security selection을 공유한다.

Interpretation:
Dashboard는 개별 Screen을 단순히 모은 Page라기보다 reusable analysis unit을 배치하는 Workspace Surface일 수 있다. Density는 많은 정보를 한 번에 넣는 방식보다 widget 책임과 grouped selection으로 제어되는 것으로 볼 수 있다.

User Impact:
반복 분석 루틴을 가진 사용자는 Dashboard를 통해 Watchlist, Chart, News를 같은 Context 안에서 비교할 수 있다.

Potential Trade-off:
Dashboard setup과 grouping을 이해해야 하므로 Learnability 비용이 높을 수 있다.

Evidence:
Official Documentation: https://www.koyfin.com/help/mydashboards-myd/amp/, https://www.koyfin.com/help/my-dashboards-groups/. Access Date: 2026-07-28.

Confidence:
Medium

## Table Density 기록

Observation:
My Screens는 5,900개 이상 filter criteria와 result table을 설명한다. Watchlist Views는 columns, grouping, summary rows, sorting, currency settings를 설명한다. Portfolio는 holdings, lots, P/L, exposure exhibits를 설명한다.

Interpretation:
Table은 Koyfin에서 cross-sectional comparison과 portfolio breakdown을 담당하는 핵심 UI 단위일 수 있다. Table Density는 column customization과 grouping으로 제어되는 것으로 보인다.

User Impact:
사용자는 많은 Security 또는 holding을 같은 기준으로 비교할 수 있다.

Potential Trade-off:
column과 filter 설정이 많아지면 초기 사용자의 선택 비용이 커질 수 있다.

Evidence:
Official Documentation: https://www.koyfin.com/help/my-screens/, https://www.koyfin.com/help/my-views/, https://www.koyfin.com/help/my-portfolios/. Access Date: 2026-07-28.

Confidence:
High

## Chart Density 기록

Observation:
Advanced Graphing은 fundamentals, technicals, performance, valuation, consensus estimates, analyst ratings series를 설명한다. My Graphs는 saved chart가 tickers, data series, time ranges, settings를 저장한다고 설명한다. Graph templates는 MyDashboards의 historical graph component에서 사용할 수 있다고 설명된다.

Interpretation:
Chart는 time-series comparison과 saved configuration을 담당하는 Tool일 수 있다. Chart Density는 series 선택과 template reuse에 의존하는 것으로 볼 수 있다.

User Impact:
사용자는 복잡한 Metric 조합을 반복 구성하지 않고 분석을 이어갈 수 있다.

Potential Trade-off:
series가 많아질수록 chart readability와 Source Traceability가 떨어질 수 있다.

Evidence:
Official Product Page: https://www.koyfin.com/features/advanced-graphing/. Official Documentation: https://www.koyfin.com/help/charts-and-graphs/, https://www.koyfin.com/help/release-notes/my-graphs/. Access Date: 2026-07-28.

Confidence:
High

## Sidebar Density 기록

Observation:
Left Sidebar는 customizable navigation과 Favorites를 설명한다. Right Sidebar는 Watchlists, movers, News를 포함하고 Security를 Snapshot, Estimates, Graph로 load한다고 설명한다.

Interpretation:
Left Sidebar는 Global / Tool / Workspace Navigation Density를 줄이고, Right Sidebar는 main Surface 옆에서 monitoring density를 제공하는 역할일 수 있다.

User Impact:
사용자는 자주 쓰는 Surface와 관심 Security를 빠르게 호출할 수 있다.

Potential Trade-off:
Right Sidebar와 main Surface가 동시에 많은 정보를 제공하면 Focus가 분산될 수 있다.

Evidence:
Official Documentation: https://www.koyfin.com/help/release-notes/customizable-left-navigation/, https://www.koyfin.com/help/right-sidebar/amp/. Access Date: 2026-07-28.

Confidence:
Medium

## Card와 Widget 책임 기록

| UI Unit | 책임 | Observation Status | Evidence | Confidence |
| --- | --- | --- | --- | --- |
| Card | public Product page의 summary와 feature routing에 사용되는 것으로 보인다. | Partially Observed | Official Product pages. Access Date: 2026-07-28. | Medium |
| Widget | Dashboard 안에서 Watchlist, Chart, News 같은 reusable analysis unit으로 설명된다. | Official Documentation Only | My Dashboards. Access Date: 2026-07-28. | Medium |
| Table | Screener, Watchlist, Financial Analysis, Portfolio에서 comparison과 sorting을 담당한다. | Official Documentation Only | My Screens, Watchlist Views, My Portfolios. Access Date: 2026-07-28. | High |
| Chart | time-series comparison과 Graph template reuse를 담당한다. | Official Product Page / Official Documentation | Advanced Graphing, Historical Graph. Access Date: 2026-07-28. | High |
| Sidebar | Navigation, monitoring, contextual load를 담당한다. | Official Documentation Only | Right Sidebar, Customizable Left Navigation. Access Date: 2026-07-28. | Medium |

## 남아 있는 Open Question

- 실제 Dashboard 하나에 표시되는 Widget 수와 visual hierarchy 확인 필요.
- Widget 간 refresh timing과 Source 표시 확인 필요.
- Table row click이 Entity Navigation인지 action menu인지 확인 필요.
- Dashboard Density가 Free plan의 2 custom dashboards 제한에서 어떻게 달라지는지 확인 필요.
- Mobile App에서 Dashboard Density가 유지되는지 확인 필요.
