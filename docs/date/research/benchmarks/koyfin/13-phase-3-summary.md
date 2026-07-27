# Koyfin Phase 3 Summary 기록

## 조사 범위

Phase 3은 Koyfin의 Product Surface, Navigation, User Journey, Entity / User State, Information Density, Trust / Evidence, Product Flow, Synthesis, Candidate Principle을 공식 Source 기반으로 정리했다.

새로운 DATE Architecture를 제안하지 않았고, Koyfin 구조를 DATE에 채택한다고 확정하지 않았다.

## 접근 제한

- 로그인 후 App 내부 Interaction은 직접 조작하지 않았다.
- 많은 App 내부 구조는 Official Documentation Only로 남아 있다.
- 일부 Surface는 Paid Feature 또는 plan limit 영향을 받는다.
- Mobile Navigation, Alert full flow, News Detail, item-level Source는 Not Verified다.

## Product Surface 요약

기록한 Product Surface는 18개다.

주요 Surface는 Marketing Landing, Authentication Entry, Public Product Navigation, Command Bar & Search, Custom Dashboards / My Dashboards, My Dashboard Groups, Market Dashboards / Macro Dashboards, Company Snapshots, Financial Analysis, Advanced Graphing / My Graphs, Stock Screener / My Screens, My Watchlists, My Portfolios, News, Economic Calendar, Mobile App, Pricing, Right Sidebar다.

## Navigation 요약

Navigation Entry는 Public Header, Sign Up / Log In, App Left Sidebar, Customizable Left Navigation, Command Bar & Search, Right Sidebar, My Dashboards, My Dashboard Groups, My Screens, My Watchlists, My Portfolios, My Graphs, Mobile App Navigation으로 기록했다.

Command Bar는 Security와 Function을 결합하는 direct Navigation 후보로 기록했다. Left Sidebar는 App 내부 Global / Tool / Workspace Navigation 후보이며, Right Sidebar는 Contextual Panel과 Monitoring Navigation 후보로 기록했다.

## User Journey 요약

12개 공통 Scenario 중 완료 가능으로 확정한 Scenario는 없다.

부분 완료는 10개, 확인 불가는 2개다. S-009 Alert 생성과 S-011 News 또는 Event에서 Company 이동은 확인 불가로 남았다.

## Entity / User State 요약

Entity Candidate는 16개, User State Candidate는 11개로 기록했다.

Company와 Security는 분리 가능성이 있으나 App 내부 label과 URL structure는 Not Verified다. Watchlist와 Portfolio는 서로 다른 책임으로 기록했다. Watchlist는 monitoring과 reusable Security set, Portfolio는 ownership과 exposure analysis 중심이다.

## Information Density 요약

Koyfin은 Dashboard, Table, Chart, Sidebar, Widget을 통해 Information Density를 구성할 수 있다.

Table은 Screener, Watchlist, Financial Analysis, Portfolio에서 cross-sectional comparison을 담당할 수 있다. Chart는 time-series comparison과 saved configuration에 강하다. Dashboard는 Widget composition을 통해 여러 information unit을 조합할 수 있다.

## Trust / Evidence 요약

확인한 Trust Signal은 provider disclosure, live/delayed/EOD data distinction, Actual / Estimate / Consensus label, adjusted/GAAP label, Data Dictionary formula, Pricing data transparency다.

item-level Source, News original URL, Chart series timestamp, Portfolio performance formula, Macro Event Source는 Not Verified다.

## Product Flow 요약

Flow 상태 분포는 다음과 같다.

| Status | Flow 수 |
| --- | ---: |
| Observed | 2 |
| Partial | 8 |
| Official Documentation Only | 24 |
| Inferred | 9 |
| Not Verified | 8 |

주요 Flow는 User Decision Flow, Navigation Flow, Entity Flow, Information Flow, Evidence Flow, Action Flow, State Transition, Context Preservation Flow로 분리했다.

## 주요 Structural Strength

- Dashboard composition
- Dashboard Groups와 linked Widget Security selection
- Command Bar Navigation
- Screener Table
- Financial Analysis Table
- Advanced Graphing과 My Graphs
- Watchlist Views
- Portfolio Analytics
- Left Sidebar
- Right Sidebar
- Data Dictionary
- Actual / Estimate / Consensus 구분
- Pricing Plan Transparency
- Market Dashboard Segmentation

## 주요 User Friction

- 로그인 전 App Flow 미확인
- Dashboard 초기 설정 비용
- Dashboard / Widget customization 학습 비용
- Screener filter와 column 과다
- Chart series 과밀
- Sidebar 정보 경쟁
- Command Bar 학습 비용
- Company와 Security 구분 불명확
- News에서 Company 전환 미확인
- Macro에서 Security 영향 연결 미확인
- Portfolio에서 Company Detail 이동 미확인
- Source와 formula item-level Traceability 부족
- Pricing Plan 제약
- Context Persistence 동작 미확인

## Context Preservation

Context Preservation 후보는 Dashboard Groups, Watchlist Views, Saved Screen Configuration, My Graphs, Portfolio Holding, Right Sidebar, Command Bar에서 확인했다.

대부분 Official Documentation Only다. 실제 App 내부 Context 유지 동작은 다음 단계 이후에도 직접 검증이 필요하다.

## Context Loss

- Screener Result에서 Company Snapshot 또는 Graph로 이동할 때 filter context 유지 여부는 Not Verified다.
- News Detail에서 related Company, Security, Event 연결은 Not Verified다.
- Command Bar 이동 후 이전 Dashboard Context 유지 여부는 Not Verified다.
- Right Sidebar Security load가 main Surface state를 유지하는지는 Not Verified다.
- My Graphs와 Dashboard graph widget의 state boundary는 Not Verified다.
- Portfolio holdings에서 Company Research로 전환되는 path는 Not Verified다.

## Candidate Principle 요약

총 12개 Candidate Principle을 기록했다.

기존 Registry Principle에 Koyfin Evidence를 연결한 항목은 P-002, P-006, P-007, P-009, P-013, P-014다.

신규 발급한 Principle은 P-016~P-021이다.

## Cross Benchmark 분류

### Shared Pattern

- Watchlist 기반 Personal Continuity
- Source / Freshness cue
- Screener Table 기반 discovery와 comparison
- 분리된 saved state를 통한 Personal Continuity

### Variant Pattern

- Command Bar는 Search와 Function Navigation을 결합한다.
- Dashboard composition은 TradingView의 Chart-centered Workspace와 다른 Workspace 후보를 제시한다.
- Data Dictionary는 Symbol-level Documents와 다른 Methodology trust layer다.

### Benchmark-specific Pattern

- Dashboard Groups
- linked Widget Security selection
- Actual / Estimate / Consensus label
- Table / Chart role separation

### Potential Contradiction

- Koyfin public Home은 Market Discovery Entry보다 Marketing Landing에 가깝다. 다만 login default App entry가 Not Verified라 P-001 반박으로 보지 않는다.
- Koyfin은 Dashboard 중심 Workspace 후보를 보여주지만 Chart-centered Workspace를 직접 반박하지 않는다.

### Insufficient Evidence

- AI Tool Surface
- Participation / Discussion
- AI Persona Disclosure
- Loading State as live-market UX
- Symbol Hub Tabs
- Symbol-level Documents Surface

## Product Hypothesis 영향

Koyfin Evidence는 H-001, H-006, H-007, H-008, H-009, H-010, H-014를 강화할 수 있다.

H-003, H-004, H-005, H-011, H-015는 scope를 좁혀 재검토해야 한다.

H-002, H-013은 Evidence가 부족하다.

## 남아 있는 Open Question

- 로그인 후 default App Surface는 무엇인가.
- Command Bar result grouping은 Entity Type별로 구분되는가.
- Dashboard Group state는 session 간 유지되는가.
- Watchlist Item default action은 무엇인가.
- Screener Result row에서 Company 또는 Graph로 이동할 때 filter context가 유지되는가.
- News Detail은 Source, Freshness, related Entity를 표시하는가.
- Macro Event에서 affected Security로 이동 가능한가.
- Portfolio holding에서 Company Research로 이동 가능한가.
- Alert condition builder가 존재하는가.

## Evidence 품질

Evidence 품질은 Principle Extraction에는 충분하지만 Final Quality Review 전에 Documentation Only 의존을 다시 점검해야 한다.

## Quality Review 전 상태

Ready for Final Quality Review
