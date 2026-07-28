# Yahoo Finance Principle Extraction Readiness

## 문서 목적

이 문서는 Yahoo Finance에서 Candidate Principle Extraction으로 넘길 Pattern Candidate를 준비 상태별로 분류한다.

이 문서에서는 Candidate Principle ID를 발급하지 않는다. Candidate Principle Registry도 수정하지 않는다.

## Readiness 기준

| Readiness | 기준 |
| --- | --- |
| Ready | User Benefit과 Trade-off가 명확하고 다른 Benchmark에서 검증 가능한 Pattern이다. |
| Ready with Scope Limitation | Pattern은 강하지만 Surface 범위, Access Level, Evidence Level 제한을 붙여야 한다. |
| Needs Additional Evidence | 추가 Product Interaction 또는 item-level Evidence가 필요하다. |
| Benchmark-specific | Yahoo Finance 고유성이 강해 일반 Principle로 만들기 전 Cross Validation이 필요하다. |
| Reject | Feature existence가 약하거나 Product Principle로 일반화하기 어렵다. |

## Pattern Candidate Inventory

| Pattern ID | Pattern Candidate | Evidence Level | User Benefit | Potential Trade-off | Generalizability | Cross Validation 대상 | Principle Extraction Readiness | Scope Limitation | Reject 이유 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-PC-001 | Multiple Discovery Entry Separation | Observed / Partial | Discoverability, Decision Speed | entry selection cost | High | TradingView, Koyfin, Finviz | Ready | Search, Markets, Screeners, News responsibility 분리로 제한 | Not Applicable |
| YF-PC-002 | Search as Entity-directed Entry | Official Documentation / Partial | Decision Speed, Learnability | Search Suggestion Not Verified | High | TradingView, Koyfin, Finviz | Ready with Scope Limitation | supported Entity types only | Not Applicable |
| YF-PC-003 | Quote as Stock / Symbol Entity Hub | Observed / Partial | Context Preservation, Decision Speed | tab body partial, Premium competition | High | TradingView, Koyfin, Finviz | Ready with Scope Limitation | Quote structure and ticker context only | Not Applicable |
| YF-PC-004 | Quote Local Tabs as Progressive Disclosure | Official Documentation / Partial | Information Density Control | tab proliferation | High | TradingView, Finviz | Ready with Scope Limitation | tab entry and section responsibility only | Not Applicable |
| YF-PC-005 | Markets Table Comparison | Observed | Comparison Efficiency, Market Orientation | asset detail Not Verified | High | Koyfin, Finviz, TradingView | Ready | category table comparison | Not Applicable |
| YF-PC-006 | Screener Hub plus Predefined Result | Observed | Discoverability, Learnability | custom save gate | High | Finviz, TradingView, Koyfin | Ready | predefined discovery and result split | Not Applicable |
| YF-PC-007 | Table / Heatmap Optional View | Observed / Partial | Information Density Control | heatmap methodology Not Verified | Medium | Finviz Maps, Koyfin, TradingView | Ready with Scope Limitation | optional view switch only, no heatmap methodology claim | Not Applicable |
| YF-PC-008 | News Publisher Label at Headline Level | Partial | Evidence Traceability, Decision Speed | timestamp / related symbol Not Verified | High | Finviz, TradingView, EidosLayer | Ready with Scope Limitation | publisher label only | Not Applicable |
| YF-PC-009 | Exchange and Provider Documentation Layer | Official Documentation Only | Evidence Traceability, Trust | Help lookup cost | High | Koyfin, TradingView, Finviz | Ready | provider and delay documentation | Not Applicable |
| YF-PC-010 | Quote Provider Category Traceability | Official Documentation Only | Evidence Traceability | item-level Source gap | Medium | Koyfin, Bloomberg Terminal, Finviz | Ready with Scope Limitation | provider category, not item-level Source | Not Applicable |
| YF-PC-011 | Fair Value Methodology Layer | Official Documentation / Premium Feature | Evidence Traceability | Premium dependency | Medium | Koyfin, Bloomberg Terminal | Ready with Scope Limitation | Premium valuation methodology only | Not Applicable |
| YF-PC-012 | Premium Research Provider Aggregation | Official Documentation / Premium Feature | Expert Scalability | Provider fragmentation, Premium gate | Medium | Koyfin, Bloomberg Terminal | Benchmark-specific | provider aggregation pattern | Not Applicable |
| YF-PC-013 | Portfolio Methodology Documentation | Official Documentation / Premium Feature | Personal Continuity, Evidence Traceability | UI Not Verified | Medium | Koyfin, TradingView, Bloomberg Terminal | Needs Additional Evidence | no actual persistence claim | Not Applicable |
| YF-PC-014 | Watchlist as Personal Entry Candidate | Login Required / Documentation | Personal Continuity | UI and persistence Not Verified | High | TradingView, Koyfin, Finviz | Needs Additional Evidence | account state candidate only | Not Applicable |
| YF-PC-015 | Portfolio as Holdings / Transaction Candidate | Login Required / Documentation | Personal Continuity | internal responsibility Not Verified | High | Koyfin, Finviz, Bloomberg Terminal | Needs Additional Evidence | documentation-only boundary | Not Applicable |
| YF-PC-016 | Saved Screener as Reusable Criteria | Login Required / Documentation | Personal Continuity, Discoverability | persistence Not Verified | High | Finviz, TradingView, Koyfin | Needs Additional Evidence | save steps only | Not Applicable |
| YF-PC-017 | Premium Alerts as Monitoring State | Premium Feature | Personal Continuity | trigger builder Not Verified | Medium | TradingView, Koyfin, Finviz | Needs Additional Evidence | Premium feature existence only | Not Applicable |
| YF-PC-018 | Personalized Home Candidate | Login Required / Partial | Personal Continuity | logged-in Home Not Verified | Medium | Koyfin Dashboard, TradingView Watchlist | Needs Additional Evidence | candidate only | Not Applicable |
| YF-PC-019 | Chart Capability Cluster | Official Documentation / Partial | Expert Scalability | Drawing Tool and UI Not Verified | High | TradingView, Koyfin | Ready with Scope Limitation | documented chart controls | Not Applicable |
| YF-PC-020 | Premium Ad-free as Density Control | Official Documentation / Premium Feature | Information Density Control | layout effect Not Verified | Low | Finviz, ad-supported benchmarks | Benchmark-specific | subscription benefit only | Not Applicable |
| YF-PC-021 | Advertisement as Product Pattern | Partial / Official Pricing | Public access context | measured impact Not Verified | Low | Finviz | Reject | Do not generalize advertisement itself | Product Principle로 부적합 |
| YF-PC-022 | Finance Portal plus Research Tool Combination | Partial | Learnability, Discoverability | research focus dilution | Medium | Yahoo follow-up, general finance portals | Benchmark-specific | Yahoo Finance portal scope | Not Applicable |
| YF-PC-023 | External Article Link as Evidence Access | Partial | Evidence Traceability | return path Not Verified | Medium | Finviz, TradingView, EidosLayer | Ready with Scope Limitation | external article access only | Not Applicable |
| YF-PC-024 | Provider-labeled Premium Analysis as Trust Signal | Official Documentation / Premium Feature | Evidence Traceability | Premium dependency | Medium | Koyfin, Bloomberg Terminal | Ready with Scope Limitation | provider visibility only | Not Applicable |

## Readiness 분포

| Readiness | 수 |
| --- | ---: |
| Ready | 4 |
| Ready with Scope Limitation | 10 |
| Needs Additional Evidence | 6 |
| Benchmark-specific | 3 |
| Reject | 1 |

## Ready 후보

- YF-PC-001: Multiple Discovery Entry Separation
- YF-PC-005: Markets Table Comparison
- YF-PC-006: Screener Hub plus Predefined Result
- YF-PC-009: Exchange and Provider Documentation Layer

## Ready with Scope Limitation 후보

- YF-PC-002: Search as Entity-directed Entry
- YF-PC-003: Quote as Stock / Symbol Entity Hub
- YF-PC-004: Quote Local Tabs as Progressive Disclosure
- YF-PC-007: Table / Heatmap Optional View
- YF-PC-008: News Publisher Label at Headline Level
- YF-PC-010: Quote Provider Category Traceability
- YF-PC-011: Fair Value Methodology Layer
- YF-PC-019: Chart Capability Cluster
- YF-PC-023: External Article Link as Evidence Access
- YF-PC-024: Provider-labeled Premium Analysis as Trust Signal

## Needs Additional Evidence 후보

- YF-PC-013: Portfolio Methodology Documentation
- YF-PC-014: Watchlist as Personal Entry Candidate
- YF-PC-015: Portfolio as Holdings / Transaction Candidate
- YF-PC-016: Saved Screener as Reusable Criteria
- YF-PC-017: Premium Alerts as Monitoring State
- YF-PC-018: Personalized Home Candidate

주의:

Personal Continuity 관련 후보는 실제 UI와 persistence 확인 전까지 Principle Extraction 중심 Evidence로 쓰지 않는다.

## Benchmark-specific 후보

- YF-PC-012: Premium Research Provider Aggregation
- YF-PC-020: Premium Ad-free as Density Control
- YF-PC-022: Finance Portal plus Research Tool Combination

## Reject 후보

- YF-PC-021: Advertisement as Product Pattern

Reject 이유:

Advertisement 자체는 Product Principle로 일반화하기 어렵다. Advertisement impact, Premium ad-free, Density Control은 Trade-off 또는 Benchmark-specific Pattern으로만 다룬다.

## Cross Validation 준비

| 비교 대상 | Yahoo Finance에서 넘길 Pattern |
| --- | --- |
| EidosLayer | Source / Evidence layer, external article access, portal entry vs evidence-first entry |
| TradingView | Search as entity entry, Quote / Symbol hub, chart controls, Watchlist and alerts |
| Koyfin | Provider visibility, Portfolio methodology, Market table comparison, dashboard vs portal |
| Finviz | Table comparison, Screener result, Quote hub, News Source label, ad-free / advertisement Trade-off |
| Bloomberg Terminal | provider-labeled analysis, premium research, Portfolio analytics, command/search entity entry |
| SaveTicker | personal continuity, Watchlist / Portfolio boundary, quote context preservation |

## 다음 단계에서 추출할 후보

다음 후보는 Candidate Principle 작성 단계에서 우선 검토할 수 있다.

- Multiple Discovery Entry Separation
- Search as Entity-directed Entry
- Quote as Stock / Symbol Entity Hub
- Quote Local Tabs as Progressive Disclosure
- Markets Table Comparison
- Screener Hub plus Predefined Result
- News Publisher Label at Headline Level
- Exchange and Provider Documentation Layer
- External Article Link as Evidence Access
- Provider-labeled Premium Analysis as Trust Signal

주의:

위 항목은 Candidate Principle이 아니다. Principle ID도 발급하지 않았다. 다음 단계에서 기존 P-001~P-025와 중복 여부를 먼저 확인해야 한다.
