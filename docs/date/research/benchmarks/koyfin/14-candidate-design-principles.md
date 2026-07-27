# Koyfin Candidate Design Principles 기록

## 문서 목적

이 문서는 Koyfin Phase 3.1~3.4 문서에서 이미 기록된 Observation과 Pattern Candidate만 사용해 Candidate Principle을 추출한다.

이 문서의 Principle은 Koyfin 확정 Product Principle이 아니며 DATE Product Principle도 아니다. 모든 항목은 Cross Validation이 필요하다.

## Source 문서

- [01-product-surface-map.md](01-product-surface-map.md)
- [02-screen-inventory.md](02-screen-inventory.md)
- [03-navigation-map.md](03-navigation-map.md)
- [04-core-journey-observations.md](04-core-journey-observations.md)
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md)
- [06-information-density-observations.md](06-information-density-observations.md)
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md)
- [08-product-flow-architecture.md](08-product-flow-architecture.md)
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md)
- [10-evidence-hardening-review.md](10-evidence-hardening-review.md)
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md)

## Candidate Principle 요약

| Principle ID | Candidate Principle | Cross Benchmark 분류 | Evidence Limitation | Confidence |
| --- | --- | --- | --- | --- |
| P-002 | Search may function as stock-first entity navigation rather than broad discovery | Shared / Variant Pattern | Official Documentation Only | Medium |
| P-006 | Watchlist may teach personal continuity before proving research continuity | Shared Pattern | Official Documentation Only | Medium |
| P-007 | Freshness and source cues may be exposed before deep evidence | Shared Pattern | Official Documentation Only / item-level Not Verified | High |
| P-009 | Page-based specialization may trade clarity for context preservation risk | Variant Pattern | Documentation Only 중심 | Medium |
| P-013 | Screener tables may serve as discovery and comparison surfaces before entity analysis | Shared Pattern | Official Documentation Only / Official Product Page | High |
| P-014 | Personal continuity may be split across Watchlist, Alert, Layout, and saved screen states | Shared Pattern | Official Documentation Only | Medium |
| P-016 | Dashboard may operate as a reusable research composition rather than only a reporting page | Benchmark-specific Pattern | Official Documentation Only | Medium |
| P-017 | Command interfaces may combine Entity Search with Function Navigation | Variant Pattern | Official Documentation Only | Medium |
| P-018 | Tables and charts may divide comparison work by cross-sectional and time-series questions | Benchmark-specific Pattern | Official Documentation Only / Official Product Page | High |
| P-019 | Financial evidence labels may separate reported values, estimates, and consensus before interpretation | Benchmark-specific Pattern | Official Documentation Only | High |
| P-020 | Methodology documentation may serve as a trust layer when item-level traceability is incomplete | Benchmark-specific Pattern | Official Documentation Only | Medium |
| P-021 | Linked dashboard widgets may preserve Entity context inside a configurable Workspace | Benchmark-specific Pattern | Official Documentation Only | Low |

## P-002

### Category

Discovery, Navigation, Entity, Interaction

### Observation

Command Bar는 `/` key 활성화, ticker-function 조합, function shortcut을 설명한다. ticker와 function을 조합해 Graph, Estimates, Holdings 같은 Surface로 이동할 수 있다고 기록되어 있다.

### Supporting Evidence

- [03-navigation-map.md](03-navigation-map.md): `KYF-NAV-005`
- [04-core-journey-observations.md](04-core-journey-observations.md): S-002, S-004, S-012
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Command Bar Navigation
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Koyfin의 Search는 broad discovery보다 Security와 Function을 결합하는 direct navigation 성격이 강할 수 있다. 이는 기존 P-002의 stock-first entity navigation과 유사하지만, Function Navigation을 함께 포함한다는 점에서 Variant 성격도 있다.

### Candidate Principle

Search may function as stock-first entity navigation rather than broad discovery.

### User Benefit

Decision Speed, Expert Scalability, Context Preservation

### Potential Trade-off

사용자는 function shortcut과 command syntax를 학습해야 한다. Search result grouping과 ranking은 확인되지 않아 신규 사용자의 Learnability 비용이 남는다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

로그인 후 실제 result grouping, ranking, Dashboard Context 유지 여부는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Search를 검토할 때 Entity lookup, broad discovery, command-driven Navigation을 분리해 비교할 필요가 있다.

### Confidence

Medium

## P-006

### Category

Personal Continuity, Navigation, Workspace

### Observation

My Watchlists는 securities 목록을 만들고 browsing하는 기능이며 columns, grouping, summary rows를 선택할 수 있다고 기록되어 있다. Watchlists는 My Watchlists, My Dashboards, Right Sidebar에서 접근 가능하고 Watchlist Views는 Dashboard와 Screens에서 재사용될 수 있다고 기록되어 있다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): `KYF-SF-012`
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md): `KYF-ENT-013`, `KYF-ST-003`, `KYF-ST-004`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Watchlist Views
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Koyfin에서 Watchlist는 단순 저장 목록보다 reusable monitoring state에 가까울 수 있다. 다만 Research continuity 전체를 증명하지는 않는다.

### Candidate Principle

Watchlist may teach personal continuity before proving research continuity.

### User Benefit

Personal Continuity, Comparison Efficiency, Decision Speed

### Potential Trade-off

Watchlist Membership, Watchlist View, Dashboard widget의 책임 차이를 사용자가 이해해야 한다. 실제 item action과 cross-session restore는 확인되지 않았다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

Watchlist Item의 default action, App 내부 persistence, plan별 실제 제한 UI는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 Watchlist를 저장 목록, monitoring entry, reusable comparison state 중 어디에 둘지 사용자 Journey별로 검증할 가치가 있다.

### Confidence

Medium

## P-007

### Category

Trust / Evidence, Freshness

### Observation

Data Overview는 data provider를 설명하고, Data Questions는 live, delayed, EOD data 차이를 설명한다. Pricing은 plan별 data depth와 News access 차이를 설명한다.

### Supporting Evidence

- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): `KYF-TR-001`, `KYF-TR-002`, `KYF-TR-010`
- [10-evidence-hardening-review.md](10-evidence-hardening-review.md): Documentation Only 항목
- Source 유형: Official Documentation, Official Pricing
- Evidence Level: Official Documentation Only / Observed

### Interpretation

Koyfin은 deep Evidence를 보기 전에 provider category, data timing, plan-level data depth를 노출해 초기 Trust Signal을 제공할 수 있다.

### Candidate Principle

Freshness and source cues may be exposed before deep evidence.

### User Benefit

Evidence Traceability, Trust, Decision Speed

### Potential Trade-off

category-level Source는 item-level Source를 대체하지 못한다. 실제 Table cell, News item, Chart series의 Source와 timestamp는 Not Verified다.

### Evidence Limitation

Official Documentation Only / item-level Not Verified

### Scope Limitation

App 내부 개별 값의 Source label, timestamp, original URL은 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 Source visibility와 Evidence traceability를 같은 것으로 취급하지 않고 category-level, item-level, methodology-level로 나누어 검증할 필요가 있다.

### Confidence

High

## P-009

### Category

Context Preservation, Navigation, Workspace

### Observation

Koyfin은 My Dashboards, My Screens, My Graphs, Company Snapshots, Financial Analysis, My Watchlists, My Portfolios를 분리된 Surface로 설명한다. Command Bar, Right Sidebar, Dashboard Groups, saved state는 Surface 간 Context loss를 줄일 수 있는 구조로 기록되어 있다.

### Supporting Evidence

- [03-navigation-map.md](03-navigation-map.md): Navigation 관계 요약
- [08-product-flow-architecture.md](08-product-flow-architecture.md): Product Flow 통합 Diagram, Context Loss 지점
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Context Preservation Assessment
- Source 유형: Official Product Page, Official Documentation
- Evidence Level: Partial / Official Documentation Only / Inferred

### Interpretation

Koyfin은 specialized Surface를 나누되 Command Bar, Sidebar, saved state로 Context Preservation risk를 완화할 수 있다. 실제 App Flow가 확인되지 않았으므로 직접적인 완화 효과는 확정할 수 없다.

### Candidate Principle

Page-based specialization may trade clarity for context preservation risk.

### User Benefit

Context Preservation, Decision Speed, Personal Continuity

### Potential Trade-off

Surface가 많아질수록 현재 분석 위치와 저장 state의 책임을 이해해야 한다. 일부 Flow는 Documentation Only 또는 Inferred에 의존한다.

### Evidence Limitation

Partial / Official Documentation Only / Inferred

### Scope Limitation

실제 Back Navigation, App 내부 active context, cross-surface state 유지 여부는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Page, Panel, Workspace의 역할을 정하기 전에 specialized Surface와 Context Preservation의 Trade-off를 비교해야 한다.

### Confidence

Medium

## P-013

### Category

Discovery, Comparison, Information Density

### Observation

My Screens는 region, universe, Sector, Industry, price, technicals, fundamentals criteria로 Screen을 만들고 result table에 Metric columns를 추가할 수 있다고 기록되어 있다. Result는 Watchlist export 또는 CSV download로 이어질 수 있다고 기록되어 있다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): `KYF-SF-011`
- [04-core-journey-observations.md](04-core-journey-observations.md): S-003
- [06-information-density-observations.md](06-information-density-observations.md): `KYF-DEN-004`
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-004`
- Source 유형: Official Product Page, Official Documentation
- Evidence Level: Official Documentation Only / Official Product Page

### Interpretation

Koyfin의 discovery는 narrative feed보다 filter와 result table을 통해 많은 Security를 같은 기준으로 비교하는 구조일 수 있다.

### Candidate Principle

Screener tables may serve as discovery and comparison surfaces before entity analysis.

### User Benefit

Discoverability, Comparison Efficiency, Decision Speed

### Potential Trade-off

filter와 column 수가 많으면 Cognitive Load와 setup 비용이 증가할 수 있다. Result Row의 default Entity Navigation은 Not Verified다.

### Evidence Limitation

Official Documentation Only / Official Product Page

### Scope Limitation

실제 result row action, filter state preservation, paid gating UI는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 discovery를 Table-first로 둘지 Feed, Search, Market grouping과 조합할지는 User Archetype별로 검증할 필요가 있다.

### Confidence

High

## P-014

### Category

Personal Continuity, State, Workspace

### Observation

Koyfin은 Dashboard Layout, Watchlist Membership, Watchlist View, Saved Screen Configuration, Chart Configuration, Portfolio Holding, Left Navigation Layout 같은 User State Candidate를 분리해 기록할 수 있다.

### Supporting Evidence

- [05-entity-and-state-observations.md](05-entity-and-state-observations.md): User State Candidate Inventory
- [08-product-flow-architecture.md](08-product-flow-architecture.md): Action Flow, State Transition
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Context Preservation Assessment
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-005`, `KYF-PC-006`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Koyfin의 Personal Continuity는 하나의 Workspace에만 묶이기보다 목적별 saved state로 나뉠 수 있다.

### Candidate Principle

Personal continuity may be split across Watchlist, Alert, Layout, and saved screen states.

### User Benefit

Personal Continuity, Expert Scalability, Comparison Efficiency

### Potential Trade-off

사용자는 어떤 Context가 Dashboard, Watchlist, Saved Screen, My Graphs, Portfolio 중 어디에 저장되는지 학습해야 한다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

cross-session restore, default state, paid plan별 saved limit의 실제 App behavior는 확인하지 않았다. Alert는 Not Verified라 Supporting Evidence에서 제외한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 저장 구조를 설계하기 전 Watchlist, Portfolio, Workspace, Evidence Graph가 각각 어떤 User State를 책임지는지 검증해야 한다.

### Confidence

Medium

## P-016

### Category

Workspace, Information Density, Personal Continuity

### Observation

My Dashboards는 watchlist, chart, News widget을 포함할 수 있고 blank dashboard 또는 template로 시작할 수 있다고 기록되어 있다. Widget은 resize와 drag가 가능하다고 기록되어 있다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): `KYF-SF-005`
- [06-information-density-observations.md](06-information-density-observations.md): `KYF-DEN-001`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Dashboard Composition
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-001`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Dashboard는 보고용 Page보다 반복 Research 구성을 저장하는 reusable composition일 수 있다.

### Candidate Principle

Dashboard may operate as a reusable research composition rather than only a reporting page.

### User Benefit

Personal Continuity, Information Density Control, Comparison Efficiency

### Potential Trade-off

초기 setup 비용이 있고 Widget 책임과 Layout persistence를 이해해야 한다. plan별 Dashboard 제한도 사용 가능성을 바꿀 수 있다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

로그인 후 default Dashboard, 실제 Widget 수, refresh timing, Source 표시, persistence 동작은 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Dashboard를 Home, reporting page, saved Workspace 중 무엇으로 볼지는 다른 Benchmark와 사용자 Journey에서 검토해야 한다.

### Confidence

Medium

## P-017

### Category

Navigation, Interaction, Entity

### Observation

Command Bar는 ticker-function 조합과 function shortcut을 제공한다고 기록되어 있다. `AAPL G`, `AAPL EST`, `SPY HDS` 같은 방식으로 Security와 목적 Surface를 함께 지정할 수 있다고 기록되어 있다.

### Supporting Evidence

- [03-navigation-map.md](03-navigation-map.md): Command Bar & Search 기록
- [04-core-journey-observations.md](04-core-journey-observations.md): Company Research Journey
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Command Bar Navigation
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-003`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Command interface는 Entity 선택과 Function Navigation을 한 번에 처리해 professional navigation depth를 줄일 수 있다.

### Candidate Principle

Command interfaces may combine Entity Search with Function Navigation.

### User Benefit

Decision Speed, Expert Scalability

### Potential Trade-off

사용자는 command syntax를 익혀야 하고, command discovery UI가 약하면 초보자에게 불리할 수 있다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

실제 command ranking, result grouping, 최근 command, Mobile 지원, 기존 Dashboard Context 유지 여부는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Search를 command interface로 확장할지는 전문 사용자 Workflow와 초보자 Learnability 사이의 Trade-off를 검증한 뒤 판단해야 한다.

### Confidence

Medium

## P-018

### Category

Information Density, Comparison

### Observation

Screener와 Watchlist는 Table 중심이고 Graph는 time-series Chart 중심으로 설명된다. Financial Analysis는 table view와 graphical view를 함께 설명한다.

### Supporting Evidence

- [06-information-density-observations.md](06-information-density-observations.md): `KYF-DEN-004`, `KYF-DEN-005`, `KYF-DEN-006`, `KYF-DEN-013`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Financial Analysis Table, Advanced Graphing, Screener Table
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-007`
- Source 유형: Official Documentation, Official Product Page
- Evidence Level: Official Documentation Only / Official Product Page

### Interpretation

Koyfin은 cross-sectional comparison은 Table로, time-series comparison은 Chart로 나누어 Information Density를 제어할 수 있다.

### Candidate Principle

Tables and charts may divide comparison work by cross-sectional and time-series questions.

### User Benefit

Information Density Control, Comparison Efficiency, Decision Speed

### Potential Trade-off

Tool 간 이동이 필요할 때 Context loss가 생길 수 있고, Table과 Chart 사이의 같은 Entity Context 유지 여부는 확인되지 않았다.

### Evidence Limitation

Official Documentation Only / Official Product Page

### Scope Limitation

실제 App 내부 Table row action, Chart series Source, Table-to-Chart context preservation은 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Table, Chart, Widget의 책임을 기능 목록이 아니라 사용자 질문 유형별로 나눌 수 있는지 검토할 필요가 있다.

### Confidence

High

## P-019

### Category

Trust / Evidence, Comparison

### Observation

Actuals and Consensus는 reported periods를 `A`, estimate periods를 `E`로 표시하고 average consensus, analyst count, median, high, low를 설명한다고 기록되어 있다.

### Supporting Evidence

- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): `KYF-TR-003`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Actual / Estimate / Consensus 구분
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-008`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

reported value, estimate, consensus를 Interpretation 전에 분리하면 사용자는 현재 값과 미래 기대를 혼동할 가능성을 줄일 수 있다.

### Candidate Principle

Financial evidence labels may separate reported values, estimates, and consensus before interpretation.

### User Benefit

Evidence Traceability, Trust, Decision Speed

### Potential Trade-off

초보자는 `A`, `E`, consensus, analyst count의 의미를 배워야 한다. revision timing과 provider는 확인되지 않았다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

실제 Screen label visibility, estimate Source, revision timestamp, restated data는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 Financial Evidence를 표시할 때 reported, estimate, consensus, revised data의 구분이 사용자 판단 오류를 줄이는지 검증해야 한다.

### Confidence

High

## P-020

### Category

Trust / Evidence, Learnability

### Observation

Koyfin Data Dictionary는 Metric definition과 formula를 제공한다고 기록되어 있다. 개별 Metric에서 Data Dictionary로 직접 이동하는 path는 Not Verified다.

### Supporting Evidence

- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): `KYF-TR-005`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Data Dictionary
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-009`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Methodology documentation은 item-level traceability가 부족할 때도 Metric 신뢰를 보조하는 trust layer로 작동할 수 있다.

### Candidate Principle

Methodology documentation may serve as a trust layer when item-level traceability is incomplete.

### User Benefit

Evidence Traceability, Trust, Learnability

### Potential Trade-off

Methodology가 App 밖 Documentation에만 있으면 Research Flow가 끊길 수 있다. 사용자가 Metric별 formula를 직접 찾아야 할 수 있다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

App 내부 direct link, Metric cell-to-formula path, formula Freshness는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Finviz
- Yahoo Finance
- Bloomberg Terminal
- TradingView 재검토

### DATE Implication

DATE에서 Evidence Traceability를 검토할 때 Source link와 Methodology link를 분리해 확인할 필요가 있다.

### Confidence

Medium

## P-021

### Category

Context Preservation, Workspace, Interaction

### Observation

My Dashboard Groups는 color group으로 여러 widget을 연결하고 Security selection을 공유한다고 기록되어 있다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): `KYF-SF-006`
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md): `KYF-ST-002`, `KYF-REL-003`
- [06-information-density-observations.md](06-information-density-observations.md): `KYF-DEN-002`
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Dashboard Groups와 linked Widget Security selection
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): `KYF-PC-002`, `KYF-PC-017`
- Source 유형: Official Documentation
- Evidence Level: Official Documentation Only

### Interpretation

Dashboard 내부 Widget이 같은 Entity Context를 공유하면 사용자는 Page 이동 없이 여러 관점의 정보를 함께 갱신할 수 있다.

### Candidate Principle

Linked dashboard widgets may preserve Entity context inside a configurable Workspace.

### User Benefit

Context Preservation, Decision Speed, Information Density Control

### Potential Trade-off

group 설정과 widget별 selection method를 이해해야 한다. group state persistence와 widget exceptions는 확인되지 않았다.

### Evidence Limitation

Official Documentation Only

### Scope Limitation

Koyfin Dashboard Groups 범위로 제한한다. 로그인 후 실제 session persistence, Mobile behavior, cross-Dashboard context sharing은 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- Bloomberg Terminal
- Finviz
- Yahoo Finance
- TradingView 재검토

### DATE Implication

DATE에서 linked Widget 구조는 전문 사용자 Workflow에서만 유효할 수 있으므로 setup 비용과 Context Preservation 이점을 함께 검증해야 한다.

### Confidence

Low

## Cross Benchmark 분류

### Shared Pattern

- P-006: Watchlist가 Personal Continuity와 monitoring entry로 작동할 수 있다.
- P-007: Source와 Freshness cue가 deep Evidence 전에 노출될 수 있다.
- P-013: Screener Table이 discovery와 comparison Surface로 작동할 수 있다.
- P-014: Personal Continuity가 여러 saved state로 분리될 수 있다.

### Variant Pattern

- P-002와 P-017: Koyfin은 Search보다 Command Bar를 통해 Security와 Function을 결합한다.
- P-009: Koyfin은 specialized Surface를 Dashboard, Sidebar, saved state로 보완하는 구조를 제시한다.
- P-020: Koyfin은 Symbol-level Documents보다 Data Dictionary를 Methodology trust layer로 제공한다.

### Benchmark-specific Pattern

- P-016: Dashboard reusable research composition.
- P-018: Table과 Chart의 질문 유형별 역할 분리.
- P-019: Actual / Estimate / Consensus label.
- P-021: linked dashboard widgets.

### Potential Contradiction

- P-001: Koyfin은 Market Discovery Home을 직접 반박하지 않지만, public Home과 login default App entry가 달라질 수 있다.
- P-011: Koyfin은 Chart보다 Dashboard 중심 Workspace일 수 있으나 primary App context가 Not Verified다.

### Insufficient Evidence

- P-004, P-005, P-008, P-010, P-012, P-015에 대해서는 Koyfin Phase 3 범위에서 supporting evidence가 부족하다.

## DATE Research 영향

- Dashboard와 saved state의 책임은 DATE의 Workspace 후보를 검토할 때 중요한 비교 축이 될 수 있다.
- Command Bar Pattern은 Search-first 여부와 별개로 전문 사용자 Navigation 전략에서 검토할 가치가 있다.
- Table / Chart 역할 분리는 Information Density 검토에서 반복 확인해야 한다.
- Trust / Evidence는 Source, Freshness, Financial Label, Methodology를 분리해 확인해야 한다.

이 문서는 DATE가 위 구조를 채택한다는 의미가 아니다.
