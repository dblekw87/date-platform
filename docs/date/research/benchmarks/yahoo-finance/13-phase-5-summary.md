# Yahoo Finance Phase 5 Summary

## 문서 목적

이 문서는 Yahoo Finance Phase 5.1~5.5 결과를 요약한다.

이 문서는 DATE Product Principle이나 DATE Architecture를 확정하지 않는다. Final Quality Review 전 상태를 기록한다.

## 조사 범위

- Public Access 기준 Yahoo Finance Home, Search, Quote, Chart, News, Markets, Screeners, Portfolio, Watchlist, Premium Surface
- Phase 5.1 Product Surface Mapping과 Screen Inventory
- Phase 5.2 Navigation, Core Journey, Entity / User State Observation
- Phase 5.3 Information Density, Trust / Evidence, Product Flow Architecture
- Phase 5.4 Synthesis and Evidence Hardening
- Phase 5.5 Candidate Principle Extraction, Hypothesis Evidence Log, Phase Summary

## 접근 제한

| Access Boundary | 상태 |
| --- | --- |
| Public Access | Home, Markets, Screeners, Quote structure, News snippets, Premium pages |
| Login Required | Portfolio, Watchlist, Saved Screener, logged-in Home candidate |
| Premium Feature | Fair Value, Research Reports, Premium Charts, Premium Screeners, Portfolio Analytics, Alerts, ad-free |
| Not Verified | Search Suggestion, Portfolio internals, Watchlist internals, Recent, Mobile, External Article Return Path, 일부 Quote Tab Body |

## Product Surface 요약

Yahoo Finance는 Finance Home, Search, Quote, Markets, News, Screeners, Portfolio / Watchlist, Premium을 주요 Surface로 제공한다. Surface와 Capability는 분리해서 기록했다. Chart compare, indicator, Save, Download, Alerts, ad-free, Premium Analysis는 Capability 또는 Premium Feature로 분류했다.

## Navigation 요약

Global Navigation은 Finance Home, Markets, News, Screeners, My Portfolio, Premium, Search entry를 연결한다. Search는 Quote로 이어지는 Entity-directed entry로 기록했다. Quote local tabs는 Symbol context 안에서 Chart, Statistics, Financials, Analysis, Options, Historical Data, Profile 등으로 확장된다.

## User Journey 요약

12개 Scenario 중 public completion이 가능한 경로는 Search, Quote, Markets, News, Screeners 중심이다. Portfolio, Watchlist, Alerts, Revisit는 Login Required, Premium Feature, 또는 Not Verified 상태가 많다.

| Scenario Status | 수 |
| --- | ---: |
| 완료 가능 | 5 |
| 부분 완료 | 6 |
| 확인 불가 | 1 |

## Entity / User State 요약

Stock / Symbol이 가장 강한 Product Entity candidate다. Company Display는 Quote 안의 supporting context로 기록하고 독립 Company Entity로 확정하지 않았다. Watchlist, Portfolio, Saved Screener, Alerts, Chart Preference, Personalized Home은 User State 또는 User-owned Entity candidate로 유지한다.

| Inventory | 수 |
| --- | ---: |
| Entity Candidate | 14 |
| User State Candidate | 10 |
| Product Responsibility Matrix | 32 |

## Information Density 요약

Yahoo Finance는 Portal Entry, Quote Summary, Local Tabs, Markets Table, Screener Result Table, News Headline List, Premium Modules로 Information Density를 조절한다. Home은 Simultaneous Disclosure, Quote tabs와 Chart controls는 Progressive Disclosure에 가깝다.

## Portal Pattern 요약

Finance Home은 Passive Discovery와 Active Research entry를 연결하는 Portal Pattern으로 기록했다. 다만 direct body와 logged-in Home hierarchy는 Partially Observed 또는 Not Verified다.

## Trust / Evidence 요약

Yahoo Help는 exchange delay, provider categories, market data disclaimers, Fair Value methodology, Premium research provider, Portfolio calculation assumptions를 제공한다. Provider Visibility는 강하지만 item-level formula, filing-level Traceability, external return path는 gap으로 남는다.

## Product Flow 요약

대표 Flow는 Home / Markets / Search / Screeners / News에서 Quote로 이동한 뒤 Chart, Statistics, Financials, Analysis, News, Watchlist / Portfolio, Premium으로 확장되는 구조다. Public Flow와 Login / Premium Flow를 분리했다.

## Personal Continuity 요약

Watchlist, Portfolio, Saved Screener, Alerts, Personalized Home은 Personal Continuity candidate지만 실제 persistence와 revisit restoration은 Not Verified다. Candidate Principle Evidence로 사용할 때 Scope Limitation이 필요하다.

## Premium / Advertisement 영향

Premium은 advanced data, research, charts, screeners, Portfolio Analytics, Alerts, ad-free를 제공한다. Premium은 Information Expansion과 Density Control 모두로 작동할 수 있지만 실제 gate UI와 layout effect는 Not Verified다. Advertisement 자체는 Product Principle로 만들지 않았다.

## 주요 Structural Strength

- Multiple Discovery Entry Separation
- Search as Entity-directed Entry
- Quote as Stock / Symbol Entity Hub
- Quote Local Tabs as Progressive Disclosure
- Markets Table Comparison
- Screener Hub and Result Split
- Exchange / Provider Documentation
- Premium Provider Transparency

## 주요 User Friction

- Portal Content와 Research Task 혼합
- Search Suggestion Not Verified
- Quote tab proliferation
- Premium Module competition
- External Article Context Loss
- Screener criteria loss
- Portfolio / Watchlist login barrier
- Provider fragmentation
- item-level formula gap
- Mobile and Recent unknown

## Context Preservation

Quote Symbol과 Quote Local Tab은 entity-local context preservation 후보로 기록됐다. Search Query, Screener Criteria, Screener Result, Chart Preference는 Partial 또는 Documentation Only다. Watchlist, Portfolio, Saved Screener, Alerts는 account 또는 Premium boundary에 묶인다.

## Context Loss

External Article, Premium Landing, Related Symbol Origin, Screener to Quote Back State, Recent / Revisit State, Mobile Flow가 주요 Context Loss 또는 Not Verified 지점이다.

## Candidate Principle 요약

| 구분 | 수 |
| --- | ---: |
| 기존 Principle에 Yahoo Finance Evidence 추가 | 10 |
| 신규 Candidate Principle | 2 |
| Yahoo Finance Candidate Principle 총수 | 12 |
| 신규 ID 범위 | P-026~P-027 |

## Cross Benchmark 분류

### Shared Pattern

- Symbol / Stock Context Hub
- Search-driven Entity Discovery
- Table-based Market Comparison
- Source / Freshness Cue
- Local Tab Progressive Disclosure
- Methodology Layer

### Variant Pattern

- Portal Entry vs Workspace Entry
- Search-centered Discovery vs Screener-centered Discovery
- Quote Entity Hub vs Finviz Dense Single Page
- External Article Link vs Embedded Evidence
- Provider-labeled Research vs Filing-centered Traceability
- Public / Premium Entitlement Boundary

### Benchmark-specific Pattern

- Finance Portal + Research Tool combination
- Premium Research Provider Aggregation
- Public Quote + Premium Module mix

### Potential Contradiction

직접 반대 Evidence는 생성하지 않았다.

### Insufficient Evidence

- Search Suggestion
- Logged-in Home
- Portfolio internals
- Watchlist internals
- Saved Screener Persistence
- Alerts
- Recent / Revisit
- Mobile
- External Article Return Path
- Chart Preference Persistence
- 일부 Quote Tab Body

## Product Hypothesis 영향

| Evidence Type | 수 |
| --- | ---: |
| Supporting | 7 |
| Variant | 5 |
| Contradicting | 0 |
| Neutral | 0 |
| Insufficient | 3 |

| Recommended Status | 수 |
| --- | ---: |
| Strengthen | 6 |
| Narrow Scope | 6 |
| Needs More Evidence | 3 |

## 남아 있는 Open Question

- Search Suggestion은 Entity Type, exchange, price를 표시하는가.
- Logged-in Home은 Watchlist / Portfolio를 어떤 hierarchy로 보여주는가.
- Portfolio와 Watchlist 내부 책임은 어떻게 분리되는가.
- Saved Screener persistence와 Screener Back State는 유지되는가.
- Alert Rule behavior는 무엇인가.
- Recent / History가 존재하는가.
- External Article 이후 Yahoo Finance context로 돌아오는 Product path가 있는가.
- Chart Preference는 browser state인지 account state인지 확인 필요.
- Mobile에서 Portal / Quote / table density가 어떻게 재구성되는가.

## Evidence 품질

Phase 5 Complete

이 판단은 Candidate Principle이 아니라 문서 품질과 Evidence 연결 상태에 대한 판단이다.

## Final Quality Review 전 상태

Final Quality Review Passed

## Commit Readiness

Ready to Commit
