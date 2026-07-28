# Finviz Principle Extraction Readiness 기록

## 문서 목적

이 문서는 Finviz에서 Candidate Principle Extraction으로 넘길 Pattern Candidate를 준비 상태별로 분류한다.

이 문서에서는 Candidate Principle ID를 발급하지 않는다. Candidate Principle Registry도 수정하지 않는다.

## Readiness 기준

| Readiness | 기준 |
| --- | --- |
| Ready | User Benefit과 Trade-off가 명확하고 다른 Benchmark에서 검증 가능한 Pattern이다. |
| Ready with Scope Limitation | Pattern은 강하지만 Surface 범위, Access Level, Evidence Level 제한을 붙여야 한다. |
| Needs Additional Evidence | 추가 Product Interaction 또는 item-level Evidence가 필요하다. |
| Benchmark-specific | Finviz 고유성이 강해 일반 Principle로 만들기 전 Cross Validation이 필요하다. |
| Reject | access policy, subscription policy, ad monetization처럼 Product Principle로 일반화하기 어렵다. |

## Pattern Candidate Inventory

| Pattern ID | Pattern Candidate | Evidence Level | User Benefit | Potential Trade-off | Generalizability | Cross Validation 대상 | Principle Extraction Readiness | Scope Limitation | Reject 이유 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-PC-001 | Dense Market Summary as broad scan entry | Observed | Decision Speed, Discoverability | novice cognitive load, ad competition | Medium | EidosLayer, TradingView, Koyfin | Ready with Scope Limitation | Home / Market entry Surface로 제한 | Not Applicable |
| FNV-PC-002 | Screener Filter and Result co-location | Observed | Decision Speed, Comparison Efficiency | filter learning cost | High | TradingView, Koyfin, Yahoo Finance | Ready | filter-result co-location으로 제한 | Not Applicable |
| FNV-PC-003 | Screener View switching for same result set | Observed | Information Density Control, Comparison Efficiency | view selection cost | High | TradingView, Koyfin | Ready with Scope Limitation | Screener result context로 제한 | Not Applicable |
| FNV-PC-004 | Table-first comparison grammar | Observed / Partial | Comparison Efficiency, Expert Scalability | column overload | High | TradingView, Koyfin | Ready | row / column comparison Surface로 제한 | Not Applicable |
| FNV-PC-005 | Heatmap as compressed Market structure | Partial / Official Blog | Discoverability, Decision Speed | color learning cost, small cell risk | Medium | EidosLayer, TradingView, Koyfin | Needs Additional Evidence | Heatmap compression only, Navigation claim 제외 | Not Applicable |
| FNV-PC-006 | Heatmap Cell as Navigation Unit candidate | Partial / Not Verified | Drill-down potential | interaction Not Verified | Medium | TradingView, Bloomberg Terminal, Finviz follow-up | Needs Additional Evidence | direct Navigation claim 금지 | Not Applicable |
| FNV-PC-007 | Groups as aggregate comparison layer | Partial | Comparison Efficiency | Stock drill-down unclear | Medium | Koyfin Market Dashboards, TradingView Markets | Needs Additional Evidence | group-level comparison으로 제한 | Not Applicable |
| FNV-PC-008 | Stock Quote as Dense Entity Hub | Observed | Context Preservation, Decision Speed | overload, Company / Stock boundary | High | TradingView Symbol Page, Koyfin Company Snapshot | Ready with Scope Limitation | public Stock Quote Overview로 제한 | Not Applicable |
| FNV-PC-009 | Stock Quote local tabs as density control | Observed | Information Density Control | tab body Not Verified | High | TradingView Symbol Page, Yahoo Finance | Ready with Scope Limitation | tab entry / local navigation으로 제한 | Not Applicable |
| FNV-PC-010 | News Source and Timestamp at list level | Observed | Evidence Traceability, Decision Speed | external context loss | High | EidosLayer, TradingView, Koyfin | Ready | Source / timestamp display로 제한 | Not Applicable |
| FNV-PC-011 | Insider Transaction to SEC Form 4 trace | Observed | Evidence Traceability | external context loss | Medium | Yahoo Finance, SEC-focused tools | Ready | Insider / filing relation으로 제한 | Not Applicable |
| FNV-PC-012 | Screener Metric formula layer | Official Documentation Only | Evidence Traceability, Expert Scalability | Documentation outside Flow | Medium | Koyfin Data Dictionary, TradingView Help | Ready with Scope Limitation | formula Documentation access로 제한 | Not Applicable |
| FNV-PC-013 | Global Navigation persistence across dense Surfaces | Observed | Context Preservation, Discoverability | breadcrumb / recent Not Verified | High | TradingView, EidosLayer, Koyfin | Ready with Scope Limitation | desktop public pages로 제한 | Not Applicable |
| FNV-PC-014 | Stock ticker Context as local anchor | Observed | Context Preservation | peer relation loss | High | TradingView Symbol Page, Koyfin Security context | Ready | Stock / Symbol context anchor로 제한 | Not Applicable |
| FNV-PC-015 | Public Product breadth before account gate | Observed / Partial | Discoverability | save / real-time limitations | Medium | EidosLayer, TradingView, Koyfin | Benchmark-specific | Finviz access model로 제한 | Not Applicable |
| FNV-PC-016 | Public / Elite transparency | Observed / Official Pricing | Access Planning, Trust | access policy generalization risk | Low | Koyfin Pricing, TradingView plans | Benchmark-specific | access documentation pattern | Not Applicable |
| FNV-PC-017 | Advertisement as Density Trade-off | Observed / Official Pricing | free access context | ad competition, measurement Not Verified | Low | ad-supported benchmarks | Benchmark-specific | Finviz public / Elite No Ads | Not Applicable |
| FNV-PC-018 | Portfolio as saved Stock set candidate | Login Required / Official Pricing | Personal Continuity | internal state Not Verified | Medium | Koyfin Portfolio, TradingView Watchlist | Needs Additional Evidence | no persistence claim | Not Applicable |
| FNV-PC-019 | Alert Rule as monitoring state candidate | Elite Feature | Personal Continuity, Monitoring | trigger builder Not Verified | Medium | TradingView Alerts, Koyfin alerts | Needs Additional Evidence | Elite feature only | Not Applicable |
| FNV-PC-020 | Asset Class compact Surface extension | Partial | Discoverability | detail Surface Not Verified | Low | TradingView Markets, Koyfin Market Dashboards | Needs Additional Evidence | Home summary / entry only | Not Applicable |
| FNV-PC-021 | Backtests as strategy validation Tool | Not Verified / Elite Feature | Strategy validation candidate | current Product body Not Verified | Low | TradingView Strategy Tester, Koyfin follow-up | Reject | Not enough Product Observation | Evidence insufficient |
| FNV-PC-022 | Pricing policy as Product Principle | Observed / Official Pricing | access planning | business policy overgeneralization | Low | Koyfin Pricing | Reject | access policy only | Product Principle로 부적합 |

## Readiness 분포

| Readiness | 수 |
| --- | ---: |
| Ready | 5 |
| Ready with Scope Limitation | 6 |
| Needs Additional Evidence | 6 |
| Benchmark-specific | 3 |
| Reject | 2 |

## Ready 후보

- FNV-PC-002: Screener Filter and Result co-location
- FNV-PC-004: Table-first comparison grammar
- FNV-PC-010: News Source and Timestamp at list level
- FNV-PC-011: Insider Transaction to SEC Form 4 trace
- FNV-PC-014: Stock ticker Context as local anchor

## Ready with Scope Limitation 후보

- FNV-PC-001: Dense Market Summary as broad scan entry
- FNV-PC-003: Screener View switching for same result set
- FNV-PC-008: Stock Quote as Dense Entity Hub
- FNV-PC-009: Stock Quote local tabs as density control
- FNV-PC-012: Screener Metric formula layer
- FNV-PC-013: Global Navigation persistence across dense Surfaces

## Needs Additional Evidence 후보

- FNV-PC-005: Heatmap as compressed Market structure
- FNV-PC-006: Heatmap Cell as Navigation Unit candidate
- FNV-PC-007: Groups as aggregate comparison layer
- FNV-PC-018: Portfolio as saved Stock set candidate
- FNV-PC-019: Alert Rule as monitoring state candidate
- FNV-PC-020: Asset Class compact Surface extension

## Benchmark-specific 후보

- FNV-PC-015: Public Product breadth before account gate
- FNV-PC-016: Public / Elite transparency
- FNV-PC-017: Advertisement as Density Trade-off

## Reject 후보

- FNV-PC-021: Backtests as strategy validation Tool
- FNV-PC-022: Pricing policy as Product Principle

Reject 이유:

Backtests는 current Product body가 Not Verified다. Pricing policy는 Product Principle보다 access documentation 또는 business policy에 가깝다.

## Cross Validation 준비

| 비교 대상 | Finviz에서 넘길 Pattern |
| --- | --- |
| EidosLayer | Dense Market Summary, public entry breadth, Source / Freshness Signal, Watchlist / saved state limitation |
| TradingView | Stock / Symbol hub, Screener / table discovery, News Source / timestamp, Alert candidate, local tabs |
| Koyfin | Table-first discovery, Methodology layer, Dashboard vs Dense Single Page, Portfolio / saved state limitation |
| Yahoo Finance | Stock Quote hub, Portfolio / Watchlist, News traceability, financial tab structure |
| Bloomberg Terminal | Heatmap / map compression, command / expert density, multi-surface Context Preservation |

## 다음 단계에서 추출할 후보

다음 후보는 Candidate Principle 작성 단계에서 우선 검토할 수 있다.

- Screener Filter and Result co-location
- Table-first comparison grammar
- News Source and Timestamp at list level
- Insider Transaction to SEC Form 4 trace
- Stock ticker Context as local anchor
- Stock Quote as Dense Entity Hub
- Screener View switching for same result set
- Screener Metric formula layer
- Dense Market Summary as broad scan entry

주의:

위 항목은 Candidate Principle이 아니다. Principle ID도 발급하지 않았다. 다음 단계에서 Observation, Supporting Evidence, Interpretation, Candidate Principle, User Benefit, Potential Trade-off를 다시 분리해야 한다.
