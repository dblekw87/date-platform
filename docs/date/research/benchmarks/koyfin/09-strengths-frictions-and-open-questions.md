# Koyfin Strength와 Friction Synthesis 기록

## 문서 목적

이 문서는 Koyfin Phase 3.1~3.3에서 기록한 Observation을 기반으로 Structural Strength, User Friction, Context Loss, Access Restriction, Open Question을 정리한다.

이번 문서는 Candidate Principle을 작성하지 않는다. Registry도 수정하지 않는다.

## Structural Strength 요약

| 구분 | 수 |
| --- | ---: |
| Structural Strength | 14 |
| User Friction | 14 |
| Context Loss 지점 | 8 |
| Do Not Copy 항목 | 7 |

## Structural Strength 목록

### Dashboard Composition

Observation:
My Dashboards는 watchlist, chart, News widget을 포함할 수 있고 blank dashboard 또는 template로 시작할 수 있다고 기록되어 있다.

Evidence Level:
Official Documentation Only

Why It May Work:
사용자가 여러 정보 단위를 하나의 reusable Dashboard 안에서 조합할 수 있기 때문이다.

User Benefit:
Information Density Control, Personal Continuity, Comparison Efficiency

Conditions Required:
Widget 책임, refresh timing, Source 표시, layout persistence가 실제 App에서 명확해야 한다.

Potential Trade-off:
초기 설정 비용과 Dashboard 개념 학습 비용이 발생할 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Dashboard Groups와 linked Widget Security selection

Observation:
My Dashboard Groups는 color group으로 widget을 연결하고 Security selection을 공유한다고 기록되어 있다.

Evidence Level:
Official Documentation Only

Why It May Work:
여러 widget이 같은 Entity Context를 공유하면 Page 전환 없이 비교가 가능해질 수 있다.

User Benefit:
Context Preservation, Decision Speed, Information Density Control

Conditions Required:
Group state가 저장되고 widget별 예외가 사용자가 이해할 수 있어야 한다.

Potential Trade-off:
Widget group과 selection method 설정을 이해해야 한다.

Candidate Principle Readiness:
Needs Cross Benchmark Validation

### Command Bar Navigation

Observation:
Command Bar는 `/` key 활성화, ticker-function 조합, function shortcut을 설명한다.

Evidence Level:
Official Documentation Only

Why It May Work:
숙련 사용자는 Surface hierarchy를 거치지 않고 Security와 analysis mode로 이동할 수 있다.

User Benefit:
Decision Speed, Expert Scalability

Conditions Required:
Search result grouping, command discovery, previous Context 처리 방식이 명확해야 한다.

Potential Trade-off:
명령어 학습 비용이 생길 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Screener Table

Observation:
My Screens는 region, universe, Sector, Industry, price, technicals, fundamentals criteria와 result table을 설명한다.

Evidence Level:
Official Documentation Only

Why It May Work:
투자 기준을 filter와 column으로 표현해 많은 Security를 비교할 수 있다.

User Benefit:
Discoverability, Comparison Efficiency, Decision Speed

Conditions Required:
Result Row에서 Detail로 전환할 때 filter context가 보존되어야 한다.

Potential Trade-off:
filter와 column이 과도하면 Cognitive Load가 커질 수 있다.

Candidate Principle Readiness:
Ready for Principle Extraction

### Financial Analysis Table

Observation:
Financial Analysis는 financial statements, valuation metrics, quarterly/annual data, graphical view와 column view를 설명한다.

Evidence Level:
Official Product Page

Why It May Work:
Company analysis에서 summary, table, chart를 나누어 Financial Metric을 비교할 수 있다.

User Benefit:
Comparison Efficiency, Evidence Traceability, Information Density Control

Conditions Required:
Metric Source, Freshness, Methodology link가 App 내부에서 확인 가능해야 한다.

Potential Trade-off:
Financial model 문해력이 낮은 사용자는 이해 비용이 높을 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Advanced Graphing과 My Graphs

Observation:
Advanced Graphing은 100개 이상 series를 설명하고 My Graphs는 full chart configuration 저장을 설명한다.

Evidence Level:
Partial

Why It May Work:
time-series comparison과 saved configuration을 결합해 반복 분석 비용을 줄일 수 있다.

User Benefit:
Personal Continuity, Comparison Efficiency, Expert Scalability

Conditions Required:
series Source, Freshness, chart state boundary가 명확해야 한다.

Potential Trade-off:
series 과밀과 saved graph 관리 비용이 발생할 수 있다.

Candidate Principle Readiness:
Needs Cross Benchmark Validation

### Watchlist Views

Observation:
Watchlist Views는 columns, grouping, summary rows, sorting, currency settings를 저장할 수 있다고 기록되어 있다.

Evidence Level:
Official Documentation Only

Why It May Work:
Watchlist를 단순 저장 목록이 아니라 reusable comparison state로 바꿀 수 있다.

User Benefit:
Personal Continuity, Comparison Efficiency, Navigation

Conditions Required:
Watchlist Item의 default action과 table view reuse 범위가 명확해야 한다.

Potential Trade-off:
Watchlist와 Watchlist View의 책임 차이를 이해해야 한다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Portfolio Analytics

Observation:
My Portfolios는 holdings, accounts, lots, P/L, exposure, analysis views를 설명한다.

Evidence Level:
Official Documentation Only

Why It May Work:
ownership state를 분석 단위로 삼아 Portfolio risk와 exposure를 볼 수 있다.

User Benefit:
Personal Continuity, Evidence Traceability, Decision Speed

Conditions Required:
Portfolio에서 Company 또는 Security analysis로 전환되는 Flow가 검증되어야 한다.

Potential Trade-off:
입력 데이터 관리 비용과 plan 제한이 있다.

Candidate Principle Readiness:
Needs Additional Evidence

### Left Sidebar

Observation:
Customizable Left Navigation은 Favorites, collapsible sections, reorder를 설명한다.

Evidence Level:
Official Documentation Only

Why It May Work:
전문 Tool의 Navigation Density를 개인 사용 빈도에 맞출 수 있기 때문이다.

User Benefit:
Decision Speed, Learnability after setup, Personal Continuity

Conditions Required:
Default structure가 이해 가능하고 customization이 쉽게 복원되어야 한다.

Potential Trade-off:
customization 이전의 구조 이해 비용이 높을 수 있다.

Candidate Principle Readiness:
Needs Cross Benchmark Validation

### Right Sidebar

Observation:
Right Sidebar는 Watchlists, movers, News를 포함하고 Security를 Snapshot, Estimates, Graph로 load한다고 기록되어 있다.

Evidence Level:
Official Documentation Only

Why It May Work:
Main Surface를 유지하면서 monitoring과 Entity selection을 병렬로 둘 수 있다.

User Benefit:
Context Preservation, Decision Speed, Monitoring

Conditions Required:
Main Surface state와 Sidebar state가 충돌하지 않아야 한다.

Potential Trade-off:
정보 경쟁과 Focus 분산이 생길 수 있다.

Candidate Principle Readiness:
Needs Cross Benchmark Validation

### Data Dictionary

Observation:
Data Dictionary는 Metric definition과 formula를 제공한다고 기록되어 있다.

Evidence Level:
Official Documentation Only

Why It May Work:
사용자가 Metric 계산 기준을 확인할 수 있어 Trust가 강화될 수 있다.

User Benefit:
Evidence Traceability, Trust, Learnability

Conditions Required:
개별 Metric에서 Data Dictionary로 연결되는 path가 있어야 한다.

Potential Trade-off:
Methodology가 App 밖 Documentation에만 있으면 Flow가 끊길 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Actual / Estimate / Consensus 구분

Observation:
Actuals and Consensus는 `A`, `E`, average consensus, analyst count, median, high, low를 설명한다.

Evidence Level:
Official Documentation Only

Why It May Work:
Historical value와 forward view를 분리해 투자 판단 오류를 줄일 수 있다.

User Benefit:
Evidence Traceability, Trust, Decision Speed

Conditions Required:
Screen 안에서 label과 Source, revision timing이 명확해야 한다.

Potential Trade-off:
초보자는 A/E label과 consensus 개념을 배워야 한다.

Candidate Principle Readiness:
Ready for Principle Extraction

### Pricing Plan Transparency

Observation:
Pricing은 Free, Plus, Premium, Advisor plan별 data depth, saved item limit, News access, analytics 차이를 설명한다.

Evidence Level:
Observed

Why It May Work:
사용자가 Access Restriction과 data depth 차이를 사전에 알 수 있다.

User Benefit:
Trust, Access Planning

Conditions Required:
App 내부 gating UI도 public Pricing과 일관되어야 한다.

Potential Trade-off:
핵심 analysis Flow가 plan 제한에 막힐 수 있다.

Candidate Principle Readiness:
Not Suitable as General Principle

### Market Dashboard Segmentation

Observation:
Market Dashboards는 World Equity Indices, US Sectors, Countries, Factors, Global Yields, Currencies, Commodities를 설명한다.

Evidence Level:
Official Product Page

Why It May Work:
broad Market 정보를 segment별로 나누어 high-level scan을 가능하게 할 수 있다.

User Benefit:
Discoverability, Information Density Control, Decision Speed

Conditions Required:
App 내부 segment hierarchy와 Drill-down path가 확인되어야 한다.

Potential Trade-off:
Segment가 많으면 현재 중요한 Market Signal을 사용자가 직접 판단해야 한다.

Candidate Principle Readiness:
Needs Cross Benchmark Validation

## User Friction Inventory

| Friction ID | Trigger | Affected User | Affected Surface | Observation Status | User Cost | Decision Impact | Workaround | Access Restriction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-FR-001 | 로그인 전 App Flow 미확인 | 모든 신규 사용자 | App 전체 | Not Verified | 실제 사용 경로를 예측하기 어렵다. | end-to-end 판단 검증이 제한된다. | 공식 Documentation으로 분리 기록 | Login Required | High | default App entry 확인 필요 |
| KYF-FR-002 | Dashboard 초기 설정 | 신규 사용자 | My Dashboards | Official Documentation Only | setup과 widget 선택 비용 | 첫 분석 시작이 늦어질 수 있다. | template 사용 가능성 | Login Required / plan limit | Medium | template 기본값 확인 필요 |
| KYF-FR-003 | Dashboard / Widget 학습 비용 | 신규 사용자 | Dashboard Groups | Official Documentation Only | group, selection method 이해 비용 | Context Preservation 기능을 못 쓸 수 있다. | onboarding 또는 defaults 필요 | Login Required | Medium | group state UI 확인 필요 |
| KYF-FR-004 | Screener filter와 column 과다 | 초보자, 장기 투자자 | My Screens | Official Documentation Only | 선택 기준 설정 비용 | discovery가 지연될 수 있다. | pre-built templates | Login Required / Paid Feature | High | filter preset 품질 확인 필요 |
| KYF-FR-005 | Chart series 과밀 | 모든 사용자 | Graph / My Graphs | Partial | chart readability 저하 | 잘못된 비교 가능성 | template와 saved graph | Login Required | Medium | series별 Source 표시 확인 필요 |
| KYF-FR-006 | Sidebar 정보 경쟁 | 전문가, monitoring 사용자 | Left / Right Sidebar | Official Documentation Only | focus 분산 | main Surface 판단 지연 | collapsible sections | Login Required | Medium | main Surface와 Sidebar 충돌 확인 필요 |
| KYF-FR-007 | Command Bar 학습 비용 | 신규 사용자 | Command Bar | Official Documentation Only | function shortcut 암기 비용 | 빠른 이동 이점을 얻기 어렵다. | Advanced Search와 menu fallback | Login Required | Medium | command discovery UI 확인 필요 |
| KYF-FR-008 | Company와 Security 구분 불명확 | Research 사용자 | Snapshot, Financial Analysis, Search | Official Documentation Only | Entity boundary 이해 비용 | 잘못된 Entity 모델링 위험 | Candidate로 유지 | Login Required | Medium | UI label 확인 필요 |
| KYF-FR-009 | News에서 Company 전환 미확인 | Evidence 중심 사용자 | News | Not Verified | News validation 비용 | News 기반 판단이 약해진다. | ticker-specific News 추정 금지 | Paid Feature 가능 | Low | News Detail link 확인 필요 |
| KYF-FR-010 | Macro에서 Security 영향 연결 미확인 | Macro 중심 사용자 | Economic Calendar, Market Dashboards | Partial | Macro Signal 적용 비용 | Market-to-Security 판단이 끊길 수 있다. | Chart 접근만 기록 | Login Required 가능 | Medium | affected Security path 확인 필요 |
| KYF-FR-011 | Portfolio에서 Company Detail 이동 미확인 | Portfolio Owner | My Portfolios | Official Documentation Only | holding analysis 전환 비용 | ownership에서 research로 연결이 약해질 수 있다. | Security holding Candidate로 기록 | Login Required / Paid Feature | Medium | holding row action 확인 필요 |
| KYF-FR-012 | Source와 formula item-level Traceability 부족 | Research 사용자 | Financial Analysis, Table, Graph | Partial | 값 재검증 비용 | Trust 판단이 지연된다. | Data Dictionary와 Data Overview 참조 | Login Required 가능 | Medium | cell-to-methodology path 확인 필요 |
| KYF-FR-013 | Pricing Plan 제약 | Free / Plus 사용자 | Dashboard, Watchlist, Screen, Portfolio | Observed | 저장 수와 data depth 제한 | 일부 Journey completion 제한 | plan table 확인 | Paid Feature | High | App gating UI 확인 필요 |
| KYF-FR-014 | Context Persistence 동작 미확인 | Returning User | Dashboard, My Graphs, Watchlist, Portfolio | Official Documentation Only | 재방문 가능성 검증 제한 | Personal Continuity 판단 보류 | saved state Candidate로 유지 | Login Required | Medium | cross-session test 필요 |

## Context Preservation Assessment

| 항목 | 저장되는 Context | Context Owner | Persistence 범위 | Entity Context 유지 | Layout State 유지 | Filter State 유지 | 재방문 가능 | Login Required | Paid Feature | Evidence Level | Not Verified 항목 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dashboard | widget composition | User | saved Dashboard | Partial | Yes | Partial | Yes | Yes | plan limit | Official Documentation Only | refresh, Source, default state |
| Dashboard Group | linked Security selection | User | Dashboard 내부로 보임 | Yes | Partial | Not Applicable | Partial | Yes | Not Verified | Official Documentation Only | session persistence |
| linked Widget selection | selected Security | User / Dashboard | group 내부 | Yes | No | No | Partial | Yes | Not Verified | Official Documentation Only | widget exceptions |
| My Graphs | tickers, series, time range, settings | User | saved graph | Yes | Chart state | Not Applicable | Yes | Yes | plan limit 가능 | Official Documentation Only | series Freshness |
| Saved Screen | universe, filters, columns | User | saved screen | result dependent | No | Yes | Yes | Yes | plan limit | Official Documentation Only | result row Context |
| Watchlist View | columns, grouping, sorting | User | view template | Security set | No | Partial | Yes | Yes | plan limit | Official Documentation Only | default action |
| Portfolio | holdings, lots, accounts, exposure | User | Portfolio state | holding Security | No | analysis view partial | Yes | Yes | advanced analytics | Official Documentation Only | Company transition |
| Command Bar | ticker + function input | User action | transient | Yes | No | No | Not Verified | Yes | Not Verified | Official Documentation Only | previous Context |
| Left Sidebar | Favorites, order, collapse | User | saved nav layout | No | nav layout | No | Yes | Yes | Not Verified | Official Documentation Only | default sections |
| Right Sidebar | Watchlists, movers, News selection | User / Panel | Not Verified | Partial | panel state unknown | No | Not Verified | Yes | Not Verified | Official Documentation Only | main state conflict |
| Recent Entity | recent ticker/function | User | Not Verified | Not Verified | No | No | Not Verified | Not Verified | Not Verified | Not Verified | existence |
| Alert | alert condition | User | Not Verified | Candidate | No | condition state | Not Verified | Yes | possible | Not Verified | full flow |
| Chart Configuration | series, template, annotation | User | saved graph/template | Yes | chart layout | Not Applicable | Yes | Yes | possible | Official Documentation Only | graph/widget boundary |

## Product Responsibility Matrix

| Product Element | Primary Responsibility | Secondary Responsibility | Surface | Tool | Entity | User-owned Entity | User State | Contextual Panel | Capability |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dashboard | Workspace Surface | saved composition | Yes | No | Candidate | Yes | Yes | No | Yes |
| Dashboard Group | User State | Context Preservation | No | No | No | No | Yes | No | Yes |
| Widget | Analysis Unit | Dashboard component | Yes | Partial | No | No | Partial | No | Yes |
| Command Bar | Navigation Tool | Search / command entry | No | Yes | No | No | transient | No | Yes |
| Company Snapshot | Company Research Surface | summary hub | Yes | No | Company Candidate | No | No | No | No |
| Security | Product Entity Candidate | input context | No | No | Yes | No | No | No | No |
| Screener | Discovery Tool | Table Surface | Yes | Yes | No | No | configuration | No | Yes |
| Saved Screen | saved discovery state | dynamic result state | Yes | Partial | Candidate | Yes | Yes | No | No |
| Chart | Analysis Tool | saved Chart Candidate | Yes | Yes | Candidate | Partial | Yes | No | Yes |
| My Graphs | Saved Chart Surface | Personal Continuity | Yes | Partial | Candidate | Yes | Yes | No | No |
| Watchlist | Monitoring Surface | reusable Security set | Yes | No | Candidate | Yes | Yes | Partial | No |
| Watchlist View | Table State | reusable comparison view | No | No | No | No | Yes | No | Yes |
| Portfolio | Ownership Analysis Surface | Personal Continuity | Yes | No | Candidate | Yes | Yes | No | No |
| Holding | Portfolio State | Security position | No | No | Candidate | No | Yes | No | No |
| Right Sidebar | Contextual Panel | monitoring Navigation | Partial | No | No | No | Partial | Yes | Yes |
| News | Evidence Surface Candidate | monitoring content | Yes | No | Candidate | No | No | Partial | No |
| Economic Event | Macro Event Candidate | calendar item | Yes | No | Candidate | No | No | No | No |
| Macro Indicator | Product Entity Candidate | chart series | Yes | Partial | Candidate | No | No | No | No |

## Cross Benchmark 준비 분류

### Shared Pattern

- Watchlist는 EidosLayer와 TradingView에서도 Personal Continuity 또는 Navigation 후보로 기록되었다.
- Screener 또는 Table-first discovery는 TradingView에서도 강하게 기록되었다.
- Source와 Freshness는 EidosLayer와 TradingView에서도 Trust 판단의 초기 Signal로 기록되었다.

### Variant Pattern

- Koyfin의 Dashboard composition은 TradingView의 Chart-centered Workspace와 다른 Workspace 구성 방식이다.
- Koyfin의 Command Bar는 TradingView Symbol Search보다 function shortcut 성격이 강할 수 있다.
- Koyfin의 Data Dictionary는 TradingView Documents 탭과 다른 Methodology 접근 방식이다.

### Benchmark-specific Pattern

- Dashboard Groups와 linked Widget Security selection은 현재 Koyfin에서만 명확히 기록되었다.
- Watchlist Views가 Dashboard와 Screens에서 재사용되는 구조는 현재 Koyfin 고유 Pattern으로 남긴다.
- Portfolio exposure analytics와 Watchlist CSV transfer는 현재 Koyfin 문서에서만 확인되었다.

### Potential Contradiction

- Koyfin은 Home보다 Dashboard / App Surface 중심일 수 있으나 로그인 후 default entry가 Not Verified라 직접 반박으로 보지 않는다.
- Koyfin은 Company보다 Security / ticker entry를 강하게 쓰는 것으로 보이나 Company와 Security 분리 여부가 Not Verified다.

### Insufficient Evidence

- News Detail에서 Company, Industry, Event 전환.
- Macro Event에서 Security 영향 연결.
- Recent Entity 또는 History.
- Alert full flow.
- App 내부 item-level Source와 Freshness 표시.

## Do Not Copy

- Documentation Only 기반 Flow를 실제 Product Observation처럼 일반화하지 않는다.
- Dashboard, Widget, Group 개념을 충분한 onboarding 없이 복제하지 않는다.
- Command shortcut 중심 UX를 초보자 기본 entry로 두지 않는다.
- Screener filter 과밀을 그대로 가져오지 않는다.
- Chart series 과밀을 Trust Signal 없이 제공하지 않는다.
- Pricing 제한을 Core Research Flow 중간에 숨기지 않는다.
- Source와 Methodology가 App 외부 Documentation에만 있는 구조를 그대로 따르지 않는다.

## Open Question

- 로그인 후 default App Surface가 무엇인가.
- Dashboard Group state가 session 간 유지되는가.
- Watchlist Item의 default action은 Snapshot, Graph, table row menu 중 무엇인가.
- Screener Result에서 Company Snapshot 또는 Graph로 이동할 때 filter state가 유지되는가.
- Company와 Security label이 UI에서 어떻게 구분되는가.
- News Detail은 Source, Freshness, related Entity를 보여주는가.
- Macro Event에서 affected Security로 이동 가능한가.
- Portfolio holding에서 Company Research로 전환 가능한가.
