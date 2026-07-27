# Koyfin Principle Extraction Readiness 기록

## 문서 목적

이 문서는 Koyfin에서 Candidate Principle Extraction으로 넘길 Pattern Candidate를 준비 상태별로 분류한다.

이 문서에서는 Candidate Principle ID를 발급하지 않는다. Candidate Principle Registry도 수정하지 않는다.

## Readiness 기준

| Readiness | 기준 |
| --- | --- |
| Ready | User Benefit과 Trade-off가 명확하고 다른 Benchmark에서 검증 가능한 Pattern이다. |
| Ready with Scope Limitation | Pattern은 강하지만 Evidence가 Documentation Only이거나 적용 Surface 범위를 제한해야 한다. |
| Needs Additional Evidence | 추가 App Interaction 또는 item-level Evidence가 필요하다. |
| Benchmark-specific | Koyfin 고유성이 강해 일반 Principle로 만들기 전 Cross Validation이 필요하다. |
| Reject | 기능 제한, plan transparency, access disclosure처럼 Product Principle로 일반화하기 어렵다. |

## Pattern Candidate 목록

| Pattern ID | Pattern Candidate | Evidence 수준 | User Benefit | Trade-off | Generalizability | Cross Validation 대상 | Principle Extraction Readiness | Scope Limitation | Reject 이유 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-PC-001 | Dashboard as reusable analysis composition | Official Documentation Only | Personal Continuity, Information Density Control | setup 비용 | Medium | TradingView, Bloomberg Terminal, Koyfin follow-up | Ready with Scope Limitation | Dashboard / Widget 기반 Surface로 제한 | Not Applicable |
| KYF-PC-002 | Linked Widget selection as Context Preservation | Official Documentation Only | Context Preservation, Decision Speed | group 설정 학습 비용 | Medium | Bloomberg Terminal, Koyfin follow-up | Benchmark-specific | Koyfin Dashboard Groups 범위로 제한 | Not Applicable |
| KYF-PC-003 | Command Bar as function-level Navigation | Official Documentation Only | Decision Speed, Expert Scalability | command 학습 비용 | High | Bloomberg Terminal, TradingView, Koyfin follow-up | Ready with Scope Limitation | ticker + function command로 제한 | Not Applicable |
| KYF-PC-004 | Screener Table as discovery and comparison surface | Official Documentation Only / Official Product Page | Discoverability, Comparison Efficiency | filter 과밀 | High | TradingView, Finviz, Yahoo Finance | Ready | Table-first discovery로 제한 | Not Applicable |
| KYF-PC-005 | Watchlist View as reusable comparison state | Official Documentation Only | Personal Continuity, Comparison Efficiency | Watchlist와 View 개념 분리 비용 | High | TradingView, Yahoo Finance, Koyfin follow-up | Ready with Scope Limitation | saved table view 범위로 제한 | Not Applicable |
| KYF-PC-006 | My Graphs as saved Chart configuration | Official Documentation Only | Personal Continuity, Expert Scalability | saved state 관리 비용 | High | TradingView, Bloomberg Terminal | Ready with Scope Limitation | chart configuration persistence로 제한 | Not Applicable |
| KYF-PC-007 | Table and Chart role separation | Official Documentation Only / Official Product Page | Information Density Control, Comparison Efficiency | Tool 간 Context loss | High | TradingView, Finviz, Koyfin follow-up | Ready | cross-sectional Table과 time-series Chart 구분 | Not Applicable |
| KYF-PC-008 | Actual / Estimate / Consensus labeling | Official Documentation Only | Evidence Traceability, Trust | label 학습 비용 | High | TradingView, Yahoo Finance, Koyfin follow-up | Ready | financial evidence labeling으로 제한 | Not Applicable |
| KYF-PC-009 | Data Dictionary as Methodology layer | Official Documentation Only | Evidence Traceability, Trust | App 밖 Documentation 의존 | Medium | Bloomberg Terminal, Yahoo Finance, Koyfin follow-up | Ready with Scope Limitation | Methodology access Pattern으로 제한 | Not Applicable |
| KYF-PC-010 | Portfolio as ownership analysis surface | Official Documentation Only | Personal Continuity, Decision Speed | data 입력과 plan 제한 | Medium | Yahoo Finance, Bloomberg Terminal, Koyfin follow-up | Needs Additional Evidence | Portfolio-to-Company Flow 확인 전 보류 | Not Applicable |
| KYF-PC-011 | Left Sidebar personalization for expert Navigation | Official Documentation Only | Decision Speed, Personal Continuity | customization 비용 | Medium | Bloomberg Terminal, TradingView | Needs Additional Evidence | App 내부 default와 persistence 확인 필요 | Not Applicable |
| KYF-PC-012 | Right Sidebar as contextual monitoring panel | Official Documentation Only | Context Preservation, Monitoring | information competition | High | TradingView, Bloomberg Terminal | Ready with Scope Limitation | Panel + load target 구조로 제한 | Not Applicable |
| KYF-PC-013 | Market Dashboard segmentation | Official Product Page | Discoverability, Information Density Control | Signal 우선순위 판단 비용 | Medium | EidosLayer, TradingView, Finviz | Needs Additional Evidence | 실제 Market Dashboard hierarchy 확인 필요 | Not Applicable |
| KYF-PC-014 | Pricing transparency as access disclosure | Observed | Trust, Access Planning | plan gating | Low | All benchmarks | Reject | Product Principle보다 access documentation Pattern | access policy 일반화 위험 |
| KYF-PC-015 | News as Dashboard / Portfolio context | Partial | Evidence Traceability 가능성 | News Detail Not Verified | Medium | EidosLayer, TradingView, Yahoo Finance | Needs Additional Evidence | News Detail Source와 related Entity 확인 필요 | Not Applicable |
| KYF-PC-016 | Macro Event to Chart drill-down | Official Documentation Only | Macro comparison | Security impact Not Verified | Medium | TradingView, Bloomberg Terminal, Yahoo Finance | Needs Additional Evidence | Macro Event → Chart까지만 제한 | Not Applicable |
| KYF-PC-017 | Dashboard Groups as Koyfin-specific coordination model | Official Documentation Only | Context Preservation | 학습 비용, Evidence 제한 | Low | Bloomberg Terminal, Koyfin follow-up | Benchmark-specific | Koyfin-specific로 유지 | Not Applicable |
| KYF-PC-018 | Plan-dependent saved state limits | Observed | Access Planning | Core Flow 중단 가능성 | Low | All benchmarks | Reject | saved state limit disclosure | access 정책이며 Product Principle로 부적합 |

## Readiness 분포

| Readiness | 수 |
| --- | ---: |
| Ready | 3 |
| Ready with Scope Limitation | 6 |
| Needs Additional Evidence | 5 |
| Benchmark-specific | 2 |
| Reject | 2 |

## Ready 후보

- KYF-PC-004: Screener Table as discovery and comparison surface
- KYF-PC-007: Table and Chart role separation
- KYF-PC-008: Actual / Estimate / Consensus labeling

## Ready with Scope Limitation 후보

- KYF-PC-001: Dashboard as reusable analysis composition
- KYF-PC-003: Command Bar as function-level Navigation
- KYF-PC-005: Watchlist View as reusable comparison state
- KYF-PC-006: My Graphs as saved Chart configuration
- KYF-PC-009: Data Dictionary as Methodology layer
- KYF-PC-012: Right Sidebar as contextual monitoring panel

## Needs Additional Evidence 후보

- KYF-PC-010: Portfolio as ownership analysis surface
- KYF-PC-011: Left Sidebar personalization for expert Navigation
- KYF-PC-013: Market Dashboard segmentation
- KYF-PC-015: News as Dashboard / Portfolio context
- KYF-PC-016: Macro Event to Chart drill-down

## Benchmark-specific 후보

- KYF-PC-002: Linked Widget selection as Context Preservation
- KYF-PC-017: Dashboard Groups as Koyfin-specific coordination model

## Reject 후보

- KYF-PC-014: Pricing transparency as access disclosure
- KYF-PC-018: Plan-dependent saved state limits

Reject 이유:

두 항목은 Product Principle보다 access documentation 또는 business policy에 가깝다. Candidate Principle로 추출하면 Product structure와 plan policy를 혼동할 위험이 있다.

## Cross Validation 준비

| 비교 대상 | Koyfin에서 넘길 Pattern |
| --- | --- |
| TradingView | Screener Table, Chart configuration, Right Sidebar / Panel, Watchlist state |
| EidosLayer | Market Discovery, Watchlist continuity, Source / Freshness Signal |
| Finviz | Table-first discovery, Market segmentation, Screener filter density |
| Yahoo Finance | Watchlist, Portfolio, News traceability, Company analysis tabs |
| Bloomberg Terminal | Command Navigation, Workspace reuse, multi-panel Context Preservation |

## 다음 단계에서 Candidate Principle로 추출할 후보

다음 후보는 Candidate Principle 작성 단계에서 우선 검토할 수 있다.

- Screener Table as discovery and comparison surface
- Table and Chart role separation
- Actual / Estimate / Consensus labeling
- Command Bar as function-level Navigation
- Watchlist View as reusable comparison state
- My Graphs as saved Chart configuration
- Right Sidebar as contextual monitoring panel

주의:

위 목록은 Candidate Principle이 아니다. Principle ID도 발급하지 않았다. 다음 단계에서 Observation, Supporting Evidence, Interpretation, Candidate Principle, User Benefit, Potential Trade-off를 다시 분리해야 한다.
