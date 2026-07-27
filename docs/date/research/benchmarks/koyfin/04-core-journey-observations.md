# Koyfin Core Journey Observation 기록

## 문서 목적

이 문서는 Koyfin에서 12개 공통 Research Scenario를 수행 가능한 범위로 기록한다.

공식 Product page와 공식 Help Center에서 확인 가능한 경로만 사용한다. 실제 App 내부 클릭 수를 확인하지 못한 경우 임의 숫자를 만들지 않고 `Not Verified`로 기록한다.

## Scenario 요약

| 상태 | Scenario 수 |
| --- | ---: |
| 완료 가능 | 0 |
| 부분 완료 | 10 |
| 확인 불가 | 2 |

## Scenario Inventory

| Scenario ID | Scenario | 수행 가능 여부 | Observation Status | Entry Point | 주요 단계 | 최소 확인 가능한 Navigation 횟수 | Page Transition | Panel 또는 Tab Transition | Context Preservation | Evidence Traceability | Save / Persistence | Access Restriction | Friction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-001 | 오늘 Market 변화 파악 | 부분 완료 | Partially Observed | Market Dashboards / Mobile App | Market Dashboards → World Equity Indices 또는 Macro Dashboard → Economic Calendar | Not Verified | Feature page와 App Dashboard 사이 실제 transition은 Not Verified | Dashboard segment 또는 calendar filter는 Not Verified | curated Dashboard 안에서는 유지될 가능성이 있으나 직접 확인 필요 | Source와 Freshness detail은 Not Verified | Market Dashboard 저장 여부는 Not Verified | 로그인 필요 가능성 있음 | 실제 App의 first screen 확인 불가 | Medium | 로그인 후 Market Overview가 default entry인지 확인 필요. |
| S-002 | 특정 Stock 상승·하락 원인 확인 | 부분 완료 | Official Documentation Only | Command Bar 또는 Right Sidebar | ticker 입력 → Snapshot 또는 Graph → News 또는 Actuals and Consensus | Not Verified | Command Bar에서 function 이동은 문서로 확인 | Snapshot / Estimates / Graph function transition 문서 확인 | Security가 function으로 전달되는 구조는 문서상 확인 | News Source와 timestamp는 Not Verified, Actuals/Consensus는 analyst count와 reported/estimate label 확인 | Watchlist 또는 My Graphs 저장 가능성 있음 | Company Snapshot과 News plan 제한 있음 | News Detail과 price move cause 연결은 Not Verified | Medium | price move와 News/Event가 자동 연결되는지 확인 필요. |
| S-003 | 투자 대상 발견 | 부분 완료 | Official Documentation Only | My Screens / Stock Screener | My Screens → region 선택 → universe 정의 → filter → result table → Watchlist export | Not Verified | My Screens 내부 transition은 문서로 확인 | filter와 result table transition 문서 확인 | Saved Screen Configuration이 유지될 가능성 있음 | filter criteria와 data export 제한은 확인 | Saved Screen, Watchlist export 가능 | plan별 screen 수와 Screener 접근 제한 있음 | 실제 result row behavior 확인 불가 | High | Result Row가 Snapshot 또는 Graph로 직접 이동하는지 확인 필요. |
| S-004 | 특정 Company 분석 | 부분 완료 | Official Documentation Only | Command Bar / Company Snapshot | ticker → Snapshot → Financial Analysis → Actuals and Consensus → Graph / News | Not Verified | function 이동은 Command Bar 문서로 확인 | Snapshot, Estimates category, Financial Analysis sections는 문서로 확인 | Security 또는 Company context가 function 사이 유지될 가능성 있음 | Actuals/Consensus는 A/E label, analyst count, adjusted/GAAP label을 제공한다고 설명 | Watchlist, Dashboard, My Graphs 저장 가능성 있음 | Free/Plus/Premium data depth 차이 있음 | Company와 Security 구분 확인 불가 | Medium | Company Snapshot이 Company Entity hub인지 Security function인지 확인 필요. |
| S-005 | 동일 Industry Peer 비교 | 부분 완료 | Official Documentation Only | Screener / Watchlist / Financial Analysis | sector 또는 industry filter → result table → Watchlist 또는 table view → Graph 또는 Financial Analysis | Not Verified | My Screens와 Watchlist table 이동은 문서로 확인 | table columns, grouping, views transition 확인 | Watchlist Views와 Screen Views reuse 가능 | peer relation Source는 Not Verified | Watchlist, Screen, View 저장 가능 | Screener와 export 제한 있음 | peer comparison 전용 Surface는 확인 불가 | Medium | Peer table이 Company Surface에 기본 포함되는지 확인 필요. |
| S-006 | News와 Financial Evidence 검증 | 부분 완료 | Partially Observed | News / Company Snapshot / Actuals and Consensus | News → ticker-specific News 또는 portfolio-level News → Actuals and Consensus → Financial Analysis | Not Verified | News에서 Company 이동은 Not Verified | Actuals/Consensus tab과 table setting은 문서 확인 | News와 Financial Analysis 사이 Context 유지 Not Verified | Actuals/Consensus는 estimates/actual labels와 analyst count를 제공한다고 설명 | News 저장은 Not Verified, Dashboard News widget 가능 | Premium News 제한 있음 | News Source link와 원문 접근 확인 불가 | Medium | News Detail이 Source, Freshness, related Company를 어떻게 표시하는지 확인 필요. |
| S-007 | Macro Indicator와 Market 영향 연결 | 부분 완료 | Partially Observed | Market Dashboards / Economic Calendar | Market Dashboards → World Economic Calendar → country economic event → chart | Not Verified | Calendar와 Graph 연결은 공식 문서 설명 | event click 후 consensus/previous figures와 chart 접근 설명 | Macro Event에서 Chart로 Context 전달 가능성 있음 | consensus, previous figures는 문서로 확인 | Calendar Event download 가능, Dashboard 저장은 Not Verified | App 접근 필요 가능성 있음 | Macro에서 Company/Security 영향 연결은 Not Verified | Medium | Macro Indicator에서 affected Security로 이동 가능한지 확인 필요. |
| S-008 | Watchlist 저장 | 부분 완료 | Official Documentation Only | My Watchlists / My Screens / Right Sidebar | My Watchlists → Add Ticker 또는 My Screens result → Watchlist export | Not Verified | My Watchlists와 My Screens 내부 transition 문서 확인 | table view, right sidebar panel transition 확인 | Watchlist Membership과 Watchlist Views가 저장됨 | Watchlist item Source는 Not Verified | Watchlist 생성, import, view 저장 가능 | Free 2 watchlists, Plus unlimited | 실제 add/save interaction 미확인 | High | Watchlist Item의 default click target 확인 필요. |
| S-009 | Alert 생성 | 확인 불가 | Partially Observed | Mobile App | Mobile App page에서 create alerts 언급 | Not Verified | Not Verified | Not Verified | Alert Rule state는 Candidate로만 기록 | Alert condition Evidence는 Not Verified | Alert Rule Persistence Not Verified | login 또는 plan 제한 가능 | 독립 Alert Surface 확인 불가 | Low | Alert 생성 Screen과 condition builder 확인 필요. |
| S-010 | 다음 날 동일 분석 재개 | 부분 완료 | Official Documentation Only | My Dashboards / My Graphs / Watchlists / My Portfolios | saved Dashboard → saved Graph → Watchlist Views → Portfolio Views | Not Verified | saved Surface 재방문은 문서로 확인 | folder, view, dashboard widget transition 확인 | My Graphs는 full chart configuration을 저장한다고 설명, Dashboard/Watchlist/Portfolio도 저장 state를 가짐 | Freshness는 latest data update로 설명되지만 Source detail은 Not Verified | Dashboard Layout, My Graphs, Watchlist Views, Portfolio Holdings 저장 가능 | plan별 saved count 제한 있음 | 실제 다음 날 테스트 미수행 | Medium | cross-session state가 어느 단위까지 복원되는지 확인 필요. |
| S-011 | News 또는 Event에서 Company 이동 | 확인 불가 | Partially Observed | News / Economic Calendar | News 또는 Event → related ticker / chart / Company | Not Verified | Not Verified | Calendar event에서 chart 접근은 문서 확인 | Event에서 chart로 Context 전달 가능성은 있으나 Company 이동은 Not Verified | News Source와 Event Source는 Not Verified | Not Verified | Premium News 제한 있음 | related Company link 확인 불가 | Low | News Detail에서 Company, Industry, Event 전환 가능성 확인 필요. |
| S-012 | 하나의 Entity에서 관련 Entity 연속 탐색 | 부분 완료 | Official Documentation Only | Command Bar / Right Sidebar / Dashboard Groups | Security → Snapshot / Estimates / Graph 또는 Watchlist table → grouped widgets | Not Verified | function transition 문서 확인 | grouped widget state transition 문서 확인 | Dashboard Group은 linked widgets 사이 Security selection 공유 | function별 Source detail은 Not Verified | My Graphs, Dashboard, Watchlist로 저장 가능 | login 필요 | Entity 관계 이유가 표시되는지는 Not Verified | Medium | Security에서 peer, ETF exposure, Industry, Macro Event로 연속 이동되는지 확인 필요. |

## 주요 Journey별 기록

### Company Research Journey

Observation:
공식 Documentation은 Command Bar에서 ticker와 function을 조합해 Graph, Estimates, Holdings로 이동할 수 있다고 설명한다. Actuals and Consensus는 Analyst Estimates category 아래에 있으며 Actuals & Consensus, Price Target, Estimates Overview, Estimates Trends로 나뉜다고 설명한다. Financial Analysis Product page는 financial statements, valuation metrics, custom financial templates를 설명한다.

Interpretation:
Company Research Journey는 단일 Company page보다 Security function과 analysis surfaces가 연결된 구조일 수 있다. Command Bar는 entry를 줄이고, left-side menu 또는 function code가 분석 모드 전환을 담당하는 것으로 볼 수 있다.

User Impact:
숙련 사용자는 ticker와 function을 알면 빠르게 이동할 수 있다. 신규 사용자는 Snapshot, Estimates, Financial Analysis, Graph 사이의 차이를 익혀야 한다.

DATE Implication:
DATE에서 Company와 Security를 분리할지, 하나의 Entity hub에 여러 analysis mode를 둘지 추가 검증이 필요하다.

Confidence:
Medium

Evidence:
Official Documentation: https://www.koyfin.com/help/command-bar-search/, https://www.koyfin.com/help/actuals-consensus/. Official Product Page: https://www.koyfin.com/features/financial-analysis/. Access Date: 2026-07-27.

### Market / Macro Journey

Observation:
공식 Market Dashboards page는 IPOs, global yields, economic data, currencies, commodities, corporate credit, World Economic Calendar를 포함하는 ready dashboard를 설명한다. Calendar 관련 공식 문서는 economic calendar에서 country economic events를 filter하고 event click 시 consensus, previous figures, chart 접근이 가능하다고 설명한다.

Interpretation:
Market / Macro Journey는 curated Dashboard와 Calendar Event를 통해 broad monitoring에서 specific Macro Indicator 또는 Chart로 내려가는 구조일 수 있다.

User Impact:
사용자는 Macro Dashboard를 통해 여러 asset class와 country event를 한 곳에서 볼 수 있다. 다만 Company 또는 Security 영향으로 직접 이어지는지는 확인되지 않았다.

DATE Implication:
DATE에서 Macro Event와 Security 영향 연결은 다른 Benchmark와 실제 사용자 Journey에서 별도 검증할 필요가 있다.

Confidence:
Medium

Evidence:
Official Product Page: https://www.koyfin.com/features/market-dashboards/. Official Documentation: https://www.koyfin.com/help/building-lightning-quick-earnings-and-economic-calendars-with-koyfin/. Access Date: 2026-07-27.

### Screener Discovery Journey

Observation:
공식 My Screens 문서는 screener를 right side navigation 또는 `/mys` command로 찾을 수 있고, left sidebar의 My Screens에서 새 screen을 만들 수 있다고 설명한다. 사용자는 region, universe, sector, industry, price, technicals, fundamental criteria를 설정하고 result table을 Watchlist로 export하거나 CSV로 download할 수 있다.

Interpretation:
Screener는 Table-first Discovery Tool이며 Saved Screen Configuration과 Watchlist Membership을 연결하는 구조일 수 있다.

User Impact:
사용자는 투자 기준을 filter로 표현하고 결과를 개인 monitoring 목록으로 전환할 수 있다. 일부 data export는 vendor restriction이 있어 Evidence 재사용에 제한이 생길 수 있다.

DATE Implication:
DATE에서 discovery 결과가 단순 table인지, 저장 가능한 Research state인지 구분해 검토할 필요가 있다.

Confidence:
High

Evidence:
Official Documentation: https://www.koyfin.com/help/my-screens/. Official Product Page: https://www.koyfin.com/features/stock-screener/. Access Date: 2026-07-27.

### Portfolio Journey

Observation:
공식 My Portfolios 문서는 portfolio currency, holdings, aggregate 또는 lot-level positions, accounts, CSV upload, P/L, exposure, analysis views를 설명한다. Exposure page는 securities, sectors, industries, asset classes, countries 같은 category로 portfolio를 분해한다고 설명한다.

Interpretation:
Portfolio는 단순 저장 목록보다 holdings와 exposure를 분석하는 User-owned Entity Surface일 수 있다. Watchlist와 달리 quantity, cost, purchase date, currency가 포함되어 ownership state가 강하다.

User Impact:
사용자는 Portfolio를 통해 보유 상태를 기준으로 analysis를 수행할 수 있다. 하지만 Portfolio 생성과 full functionality는 login과 plan 제한을 받는다.

DATE Implication:
DATE에서 Watchlist와 Portfolio는 같은 저장 기능으로 묶기보다 monitoring list와 ownership analysis로 분리 검토할 필요가 있다.

Confidence:
High

Evidence:
Official Documentation: https://www.koyfin.com/help/my-portfolios/. Access Date: 2026-07-27.

### Watchlist와 Personal Continuity

Observation:
공식 My Watchlists 문서는 Watchlist가 securities를 만들고 browsing하는 기능이며 columns, grouping, summary rows를 선택할 수 있다고 설명한다. Watchlists는 My Watchlists, My Dashboards, right-hand sidebar에서 접근 가능하다고 설명한다. Watchlist Views는 column/table settings를 만들고 Dashboard와 Screens에서 재사용할 수 있다고 설명한다.

Interpretation:
Watchlist는 단순 저장 목록이 아니라 Dashboard, Screener, Right Sidebar 사이에서 재사용되는 personal monitoring state일 수 있다.

User Impact:
사용자는 같은 Security set을 여러 Surface에서 재사용할 수 있다. 반대로 Watchlist, Watchlist Views, Dashboard widget의 책임 차이를 이해해야 한다.

DATE Implication:
DATE에서 Watchlist는 저장 목록, monitoring entry, Navigation entry, reusable state 중 어떤 책임을 가져야 하는지 검증해야 한다.

Confidence:
Medium

Evidence:
Official Documentation: https://www.koyfin.com/help/mywatchlists/, https://www.koyfin.com/help/my-views/. Access Date: 2026-07-27.

## 완료하지 못한 Scenario

- S-009 Alert 생성은 Mobile App page에서 언급만 확인했다. 독립 Alert Surface와 condition builder는 Not Verified다.
- S-011 News 또는 Event에서 Company 이동은 News Detail과 Event Detail을 직접 확인하지 못했다.
- 모든 Scenario의 실제 click count와 Back Navigation cost는 로그인 후 App 조작이 필요해 Not Verified다.
