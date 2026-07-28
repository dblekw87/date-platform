# Bloomberg Principle Extraction Readiness

## 문서 목적

이 문서는 Bloomberg Benchmark에서 Candidate Principle Extraction으로 넘길 Pattern Candidate를 준비 상태별로 분류한다.

이 문서에서는 Candidate Principle ID를 발급하지 않는다. Candidate Principle Registry도 수정하지 않는다.

## Readiness 기준

| Readiness | 기준 |
| --- | --- |
| Ready | User Benefit과 Trade-off가 명확하고 다른 Benchmark에서 검증 가능한 Pattern이다. |
| Ready with Scope Limitation | Pattern은 강하지만 Access Level, Product Layer, Evidence Level 제한을 붙여야 한다. |
| Needs Additional Evidence | Terminal direct interaction, state persistence, item-level Evidence가 더 필요하다. |
| Benchmark-specific | Bloomberg Terminal, institutional entitlement, enterprise integration 고유성이 강하다. |
| Reject | Product Principle로 일반화하기 어렵거나 Evidence가 너무 약하다. |

## Pattern Candidate Inventory

| Pattern ID | Pattern Candidate | Evidence Level | User Benefit | Potential Trade-off | Generalizability | Cross Validation 대상 | Principle Extraction Readiness | Scope Limitation | Reject 이유 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-PC-001 | Public Web and Terminal Responsibility Split | Observed / Official Product Description | Decision Speed, Workflow Efficiency | Public / Terminal 단절 | High | Yahoo Finance, Finviz, Koyfin | Ready | Product Layer responsibility separation | Not Applicable |
| BBG-PC-002 | Product Family Boundary by Access Layer | Observed / Official Product Description | Trust Calibration, Market Orientation | entry 결정 비용 | Medium | Yahoo Finance, Koyfin, Finviz | Ready with Scope Limitation | Bloomberg Product Family scope | Not Applicable |
| BBG-PC-003 | Markets Table Comparison | Observed | Comparison Efficiency | row-to-detail Not Verified | High | Yahoo Finance, Finviz, Koyfin, TradingView | Ready | Public Markets table only | Not Applicable |
| BBG-PC-004 | Market Data Footer as Asset Entry Set | Observed / Partial | Discoverability | body depth varies | Medium | Yahoo Finance, Finviz | Ready with Scope Limitation | footer entry only | Not Applicable |
| BBG-PC-005 | Home Portal plus Market Entry | Partially Observed | Market Orientation | Portal content mixing | Medium | Yahoo Finance | Benchmark-specific | Bloomberg.com Public Web only | Not Applicable |
| BBG-PC-006 | Terminal Workspace as Professional Environment | Official Product Description Only | Workflow Efficiency, Professional Scalability | No Direct Terminal Session | Medium | Koyfin, TradingView, SaveTicker | Ready with Scope Limitation | Product responsibility only, not actual interaction | Not Applicable |
| BBG-PC-007 | Function-oriented Navigation | Official Product Description / Not Verified | Decision Speed, Expert Scalability | Function learning cost | Medium | TradingView, Koyfin, SaveTicker | Needs Additional Evidence | no command parsing claim | Not Applicable |
| BBG-PC-008 | Command Entry as Professional Router | Official Product Description / Not Verified | Decision Speed | autocomplete and disambiguation Not Verified | Medium | Yahoo Search, TradingView command/search | Needs Additional Evidence | Command Entry existence only | Not Applicable |
| BBG-PC-009 | Security Context as Workflow Anchor | Inference / Not Verified | Context Preservation | linking Not Verified | High if verified | TradingView Symbol, Koyfin Security context, Finviz ticker | Needs Additional Evidence | cannot center Principle on this yet | Not Applicable |
| BBG-PC-010 | Launchpad Monitor Composition | Official Product Description Only | Information Density Control | save / restore Not Verified | Medium | Koyfin Dashboard, TradingView Watchlists | Needs Additional Evidence | monitor composition candidate only | Not Applicable |
| BBG-PC-011 | Workspace / Panel Composition | Official Product Description / Not Verified | Professional Scalability | setup cost, persistence uncertainty | Medium | Koyfin, TradingView, SaveTicker | Needs Additional Evidence | Panel / Linked Window not verified | Not Applicable |
| BBG-PC-012 | Terminal News Monitoring Stack | Official Product Description Only | Decision Speed, Market Orientation | item metadata and alert rule Not Verified | High | Finviz News, Yahoo News, TradingView News | Ready with Scope Limitation | News product responsibility only | Not Applicable |
| BBG-PC-013 | Portfolio & Risk Analytics Workflow | Official Product Description Only | Risk Awareness | calculation UI Not Verified | Medium | Koyfin Portfolio, Yahoo Portfolio, Finviz Portfolio | Ready with Scope Limitation | no actual Portfolio UI claim | Not Applicable |
| BBG-PC-014 | Professional Collaboration Layer | Official Product Description Only | Collaboration | context linking Not Verified | Medium | TradingView community, Koyfin sharing, SaveTicker | Needs Additional Evidence | IB / NOTE capability only | Not Applicable |
| BBG-PC-015 | Bloomberg Anywhere Continuity Candidate | Observed / Product Description / Login Required | Personal Continuity | post-login Not Verified | Medium | Yahoo App, TradingView mobile, Koyfin | Needs Additional Evidence | access and app responsibility only | Not Applicable |
| BBG-PC-016 | Data Integration as Professional Workflow Extension | Product Description / Documentation | Data Portability | field lineage Not Verified | Medium | Koyfin export, Yahoo CSV, TradingView export | Benchmark-specific | enterprise integration only | Not Applicable |
| BBG-PC-017 | Enterprise Entitlement as Trust Boundary | Product Description / Sales | Trust Calibration | entitlement complexity | Low to Medium | Yahoo Premium, Koyfin subscription, Finviz Elite | Benchmark-specific | institutional / enterprise model | Not Applicable |
| BBG-PC-018 | Bloomberg Original News as Embedded Source | Partial / Product Description | Evidence Traceability | Article return path Not Verified | Medium | Yahoo News, Finviz external News | Ready with Scope Limitation | Bloomberg-owned News only | Not Applicable |
| BBG-PC-019 | Bloomberg Intelligence Provider Layer | Product Description | Evidence Traceability | module UI / methodology Not Verified | Medium | Yahoo Provider visibility, Koyfin data provider | Ready with Scope Limitation | provider identity, not item-level trace | Not Applicable |
| BBG-PC-020 | API / Excel Field Lineage | Documentation / Product Description / Not Verified | Data Portability | Source lineage Not Verified | Medium | Koyfin export, Yahoo download | Needs Additional Evidence | no field-level claim | Not Applicable |
| BBG-PC-021 | Institutional Contract as Product Principle | Product Description | access planning | business policy overgeneralization | Low | subscription benchmarks | Reject | access policy only | Product Principle로 부적합 |
| BBG-PC-022 | Product Family Layering | Observed / Product Description | Trust Calibration, Workflow Efficiency | entry complexity | Low to Medium | Yahoo Finance, Koyfin | Benchmark-specific | Bloomberg ecosystem scope | Not Applicable |

## Readiness 분포

| Readiness | 수 |
| --- | ---: |
| Ready | 2 |
| Ready with Scope Limitation | 7 |
| Needs Additional Evidence | 8 |
| Benchmark-specific | 4 |
| Reject | 1 |

## Ready 후보

- BBG-PC-001: Public Web and Terminal Responsibility Split
- BBG-PC-003: Markets Table Comparison

## Ready with Scope Limitation 후보

- BBG-PC-002: Product Family Boundary by Access Layer
- BBG-PC-004: Market Data Footer as Asset Entry Set
- BBG-PC-006: Terminal Workspace as Professional Environment
- BBG-PC-012: Terminal News Monitoring Stack
- BBG-PC-013: Portfolio & Risk Analytics Workflow
- BBG-PC-018: Bloomberg Original News as Embedded Source
- BBG-PC-019: Bloomberg Intelligence Provider Layer

## Needs Additional Evidence 후보

- BBG-PC-007: Function-oriented Navigation
- BBG-PC-008: Command Entry as Professional Router
- BBG-PC-009: Security Context as Workflow Anchor
- BBG-PC-010: Launchpad Monitor Composition
- BBG-PC-011: Workspace / Panel Composition
- BBG-PC-014: Professional Collaboration Layer
- BBG-PC-015: Bloomberg Anywhere Continuity Candidate
- BBG-PC-020: API / Excel Field Lineage

## Benchmark-specific 후보

- BBG-PC-005: Home Portal plus Market Entry
- BBG-PC-016: Data Integration as Professional Workflow Extension
- BBG-PC-017: Enterprise Entitlement as Trust Boundary
- BBG-PC-022: Product Family Layering

## Reject 후보

- BBG-PC-021: Institutional Contract as Product Principle

Reject 이유:

Institutional Contract 자체는 Product Principle보다 access / business policy에 가깝다. Access boundary impact는 Trade-off 또는 Scope Limitation으로 다룬다.

## Cross Benchmark 준비

| 비교 대상 | Bloomberg에서 넘길 Pattern |
| --- | --- |
| EidosLayer | News / Market relationship, Source / Evidence layer, workspace-like context |
| TradingView | Symbol context, chart workflow, alerts, command / search entry, collaboration comparison |
| Koyfin | Workspace / dashboard composition, Portfolio Analytics, provider / data documentation |
| Finviz | table comparison, dense professional scan, News Source, external / embedded Evidence 차이 |
| Yahoo Finance | Public portal vs research workflow, provider layer, subscription / entitlement boundary |
| SaveTicker | Workspace persistence, Security Context, Watchlist / Portfolio, data portability |

## 다음 단계에서 추출 가능한 후보

다음 후보는 Candidate Principle 작성 단계에서 우선 검토할 수 있다.

- Public Web and Terminal Responsibility Split
- Markets Table Comparison
- Product Family Boundary by Access Layer
- Terminal Workspace as Professional Environment
- Terminal News Monitoring Stack
- Portfolio & Risk Analytics Workflow
- Bloomberg Original News as Embedded Source
- Bloomberg Intelligence Provider Layer

주의:

위 항목은 Candidate Principle이 아니다. Principle ID도 발급하지 않았다. 다음 단계에서는 기존 `P-001 ~ P-027`과 중복 여부를 먼저 확인해야 한다.
