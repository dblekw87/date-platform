# Finviz Candidate Design Principles

## Purpose

이 문서는 Finviz Phase 4.1~4.4 Observation에서 Candidate Principle을 추출한다.

이 문서의 Candidate Principle은 DATE Product Principle이 아니며, 모든 항목은 Cross Validation이 필요하다. Phase 4.5에서는 새로운 웹 조사와 새로운 Observation을 수행하지 않았다.

## Source Documents

- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- [12-hypothesis-evidence-log.md](./12-hypothesis-evidence-log.md)

## Summary

| Principle ID | Registry Action | Confidence | Cross Benchmark Classification |
| --- | --- | --- | --- |
| P-001 | Existing Principle Evidence Added | High | Shared Pattern |
| P-003 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-006 | Existing Principle Evidence Added | Medium | Insufficient Evidence |
| P-007 | Existing Principle Evidence Added | High | Shared Pattern |
| P-009 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-012 | Existing Principle Evidence Added | High | Shared Pattern |
| P-013 | Existing Principle Evidence Added | High | Shared Pattern |
| P-014 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-018 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-020 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-022 | New Candidate Principle | High | Shared Pattern |
| P-023 | New Candidate Principle | High | Variant Pattern |
| P-024 | New Candidate Principle | High | Variant Pattern |
| P-025 | New Candidate Principle | High | Shared Pattern |

## P-001

### Category

Market Orientation, Discovery, Navigation

### Observation

Finviz Home은 Market Index, News, Heatmap, Signal List, Calendar, Insider, Futures / Forex Summary를 동시에 배치하는 Dense Market Summary로 기록되었다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: FNV-PC-001
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Home이 단순 link hub보다 Market orientation entry로 작동하면 사용자는 개별 Stock 검색 전 broad condition을 빠르게 scan할 수 있다.

### Candidate Principle

Home Surface는 account state 없이도 Market condition을 빠르게 scan할 수 있는 broad Discovery entry로 작동할 수 있다.

### User Benefit

Decision Speed, Discoverability, Market Orientation

### Potential Trade-off

novice cognitive load, advertisement competition, Mobile risk, priority ambiguity

### Evidence Limitation

Observed

### Scope Limitation

Desktop Public Surface 기준이며 Mobile Navigation은 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView Home, Koyfin dashboard entry

### DATE Implication

DATE가 Search 중심 entry와 Market orientation entry를 분리해야 하는지 비교 검증할 필요가 있다.

### Confidence

High

## P-003

### Category

Navigation, Discovery, Interaction

### Observation

Finviz Screener result row, News item, Insider Transaction row는 Content display와 Navigation entry를 동시에 수행한다. 일부 Maps cell interaction은 Partial 또는 Not Verified로 유지되었다.

### Supporting Evidence

- Source 문서: [03-navigation-map.md](./03-navigation-map.md), [04-core-journey-observations.md](./04-core-journey-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: FNV-PC-004, FNV-PC-010, FNV-PC-011
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed / Partial

### Interpretation

Row 또는 item이 display와 movement를 겸하면 별도 command 없이 scan에서 detail validation으로 이동할 수 있다.

### Candidate Principle

반복 가능한 Content unit은 사용자가 scan 중 발견한 대상을 즉시 열 수 있는 Navigation unit으로도 작동할 수 있다.

### User Benefit

Decision Speed, Discoverability, Context Preservation

### Potential Trade-off

click target ambiguity, external Context Loss, touch environment risk

### Evidence Limitation

Observed / Partial

### Scope Limitation

Screener, News, Insider는 Observed이나 Maps cell navigation은 Partial 또는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, EidosLayer, TradingView

### DATE Implication

DATE에서 table row, event row, evidence row가 동시에 Navigation 역할을 할 수 있는지 검증해야 한다.

### Confidence

Medium

## P-006

### Category

Personal Continuity, User State, Navigation

### Observation

Finviz는 Portfolio, Saved Screener, Alert를 User State 후보로 제공하지만 Portfolio는 Login Required, Alert는 Elite Feature이며 persistence와 next-session restoration은 Not Verified다.

### Supporting Evidence

- Source 문서: [04-core-journey-observations.md](./04-core-journey-observations.md), [05-entity-and-state-observations.md](./05-entity-and-state-observations.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: FNV-PC-018, FNV-PC-019
- 공식 Source 유형: Official Product Observation / Official Pricing
- Evidence Level: Login Required / Elite Feature / Not Verified

### Interpretation

Personal continuity의 Product boundary는 Public discovery와 account 또는 subscription 기능 사이에서 형성될 수 있다.

### Candidate Principle

Personal continuity는 Public Discovery Surface 이후 Portfolio, Saved Screener, Alert 같은 User State로 확장될 수 있지만, access boundary가 실제 continuity를 제한할 수 있다.

### User Benefit

Personal Continuity, Context Preservation

### Potential Trade-off

Login dependency, Elite dependency, persistence uncertainty, revisit cost

### Evidence Limitation

Login Required / Elite Feature / Not Verified

### Scope Limitation

Portfolio persistence, Saved Screener behavior, Alert rule behavior는 확인되지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, Koyfin workspace

### DATE Implication

DATE는 saved state 후보를 access boundary와 분리해 검증해야 한다.

### Confidence

Medium

## P-007

### Category

Trust / Evidence, Market Orientation

### Observation

Finviz News는 Source와 Timestamp를 표시하고, Insider Transaction은 SEC Form 4로 연결된다. Public delay와 Elite real-time 차이는 Pricing / Product boundary로 기록되었다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: FNV-PC-010, FNV-PC-011, FNV-PC-016
- 공식 Source 유형: Official Product Observation / Official Pricing
- Evidence Level: Observed / Official Pricing

### Interpretation

Source, Timestamp, Freshness, access boundary가 분리되어 보이면 사용자는 data quality와 trust level을 빠르게 판단할 수 있다.

### Candidate Principle

Market-facing Surface는 Source, Timestamp, Freshness, access boundary를 명시해 사용자가 Evidence quality를 판단하도록 도울 수 있다.

### User Benefit

Evidence Traceability, Decision Speed, Trust / Evidence

### Potential Trade-off

item-level Source gap, external Context Loss, Elite freshness dependency

### Evidence Limitation

Observed / Official Pricing

### Scope Limitation

Stock Quote metric item-level Source는 Partial이며, real-time behavior는 Elite Feature로만 기록되었다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView

### DATE Implication

DATE는 Source cue와 Freshness cue를 Content type별로 분리해 검증해야 한다.

### Confidence

High

## P-009

### Category

Navigation, Context Preservation, Trust / Evidence

### Observation

Finviz Product 내부에서는 Global Navigation과 Stock ticker Context가 유지되지만, External News와 SEC Form 4 이동 후 Finviz Context Loss가 발생한다.

### Supporting Evidence

- Source 문서: [03-navigation-map.md](./03-navigation-map.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: FNV-PC-013, FNV-PC-014
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Specialized Surface는 clarity를 높일 수 있지만, external validation 단계에서는 Product Context가 끊길 수 있다.

### Candidate Principle

Specialized Surface와 External Evidence Link를 제공할 때는 internal Context Preservation과 external Context Loss를 함께 설계 대상으로 다뤄야 한다.

### User Benefit

Context Preservation, Evidence Traceability

### Potential Trade-off

External Context Loss, backtracking cost, peer transition relation loss

### Evidence Limitation

Observed

### Scope Limitation

External Source 이후 return support는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, EidosLayer

### DATE Implication

DATE는 Evidence Link 제공과 user context restoration을 별도 검증 질문으로 유지해야 한다.

### Confidence

Medium

## P-012

### Category

Entity, Navigation, Context Preservation

### Observation

Finviz Stock Quote는 ticker Context 안에서 Summary, Chart, Financial, Technical, Ownership, News, Insider, Options를 함께 제공하고 local tabs를 density control로 사용한다.

### Supporting Evidence

- Source 문서: [02-screen-inventory.md](./02-screen-inventory.md), [03-navigation-map.md](./03-navigation-map.md), [06-information-density-observations.md](./06-information-density-observations.md)
- Pattern ID: FNV-PC-008, FNV-PC-009, FNV-PC-014
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

하나의 Stock Context 안에서 analysis modes를 나누면 Page transition을 줄이고 entity-centered research를 유지할 수 있다.

### Candidate Principle

Entity page는 local tabs와 dense sections를 사용해 하나의 Stock 또는 Symbol Context 안에서 여러 analysis mode를 유지할 수 있다.

### User Benefit

Context Preservation, Decision Speed, Information Density Control

### Potential Trade-off

information overload, local priority ambiguity, advertisement interference

### Evidence Limitation

Observed

### Scope Limitation

Desktop Public Stock Quote 기준이며 Mobile behavior는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView Symbol page

### DATE Implication

DATE는 Stock Context와 Company Context를 어떻게 묶거나 분리할지 추가 검증해야 한다.

### Confidence

High

## P-013

### Category

Discovery, Comparison, Information Density

### Observation

Finviz Screener는 Descriptive / Fundamental / Technical filter와 result table을 같은 Surface에 배치하고, row 단위 Stock Quote transition을 제공한다.

### Supporting Evidence

- Source 문서: [01-product-surface-map.md](./01-product-surface-map.md), [03-navigation-map.md](./03-navigation-map.md), [06-information-density-observations.md](./06-information-density-observations.md)
- Pattern ID: FNV-PC-002, FNV-PC-004
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Filter와 result가 함께 있으면 사용자는 조건 수정과 comparison을 반복하며 discovery loop를 짧게 유지할 수 있다.

### Candidate Principle

Screener table은 filter-based Discovery와 cross-sectional comparison을 하나의 working surface에서 연결할 수 있다.

### User Benefit

Comparison Efficiency, Discoverability, Decision Speed

### Potential Trade-off

filter learning cost, column overload, novice cognitive load

### Evidence Limitation

Observed

### Scope Limitation

Saved Screener와 Alert connection은 Login Required 또는 Elite Feature이며 동작은 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView Screener

### DATE Implication

DATE는 filter result co-location이 discovery efficiency를 높이는지 task-based로 검증해야 한다.

### Confidence

High

## P-014

### Category

Personal Continuity, User State, Subscription

### Observation

Finviz는 Saved Screener, Portfolio, Alert를 personal continuity 후보로 노출하지만 saved state 일부는 Login Required 또는 Elite Feature에 묶인다.

### Supporting Evidence

- Source 문서: [04-core-journey-observations.md](./04-core-journey-observations.md), [05-entity-and-state-observations.md](./05-entity-and-state-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: FNV-PC-018, FNV-PC-019
- 공식 Source 유형: Official Product Observation / Official Pricing
- Evidence Level: Login Required / Elite Feature

### Interpretation

Personal continuity는 여러 saved state로 분리될 수 있지만, access restriction이 Product continuity를 약화할 수 있다.

### Candidate Principle

Watchlist, saved screen, layout, alert, portfolio state는 같은 continuity 문제를 서로 다른 access boundary와 interaction model로 나누어 해결할 수 있다.

### User Benefit

Personal Continuity, Context Preservation

### Potential Trade-off

access dependency, feature fragmentation, Not Verified persistence

### Evidence Limitation

Login Required / Elite Feature / Not Verified

### Scope Limitation

Finviz Public Surface에서는 personal state restoration을 확인하지 못했다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, Koyfin

### DATE Implication

DATE는 saved state를 하나로 묶을지, user intent별로 나눌지 검증해야 한다.

### Confidence

Medium

## P-018

### Category

Comparison, Information Density

### Observation

Finviz는 Screener와 Insider에서 Table을 comparison surface로, Maps에서 Heatmap을 compressed Market structure로, Stock Quote에서 Chart를 Stock context의 time-series aid로 사용한다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: FNV-PC-003, FNV-PC-004, FNV-PC-005
- 공식 Source 유형: Official Product Observation / Official Blog
- Evidence Level: Observed / Partial

### Interpretation

Information Form이 사용자 질문별로 분리되면 comparison과 time-series review를 혼동하지 않고 수행할 수 있다.

### Candidate Principle

Table, Chart, Heatmap은 같은 data display가 아니라 서로 다른 comparison question과 scan question을 담당할 수 있다.

### User Benefit

Comparison Efficiency, Information Density Control, Discoverability

### Potential Trade-off

view switching cost, Heatmap methodology gap, small cell readability

### Evidence Limitation

Observed / Partial

### Scope Limitation

Maps dynamic interaction과 Heatmap cell navigation은 Needs Additional Evidence다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView, Koyfin

### DATE Implication

DATE는 Table, Chart, Heatmap의 responsibility를 task별로 분리해 검증해야 한다.

### Confidence

Medium

## P-020

### Category

Trust / Evidence

### Observation

Finviz Screener Metric formula는 Help / official documentation으로 확인되었다. Heatmap methodology와 Stock Quote item-level metric source는 Partial로 남았다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: FNV-PC-012
- 공식 Source 유형: Official Documentation
- Evidence Level: Official Documentation Only / Partial

### Interpretation

Metric formula 또는 methodology documentation은 화면 자체가 모든 계산을 설명하지 못할 때 Trust layer로 작동할 수 있다.

### Candidate Principle

Methodology documentation은 dense financial UI에서 Metric meaning과 calculation boundary를 보완하는 Trust layer로 작동할 수 있다.

### User Benefit

Evidence Traceability, Learnability, Trust / Evidence

### Potential Trade-off

documentation discoverability, product interaction과 documentation의 분리, item-level trace gap

### Evidence Limitation

Official Documentation Only / Partial

### Scope Limitation

Screener formula는 documentation 기준이며, Stock Quote metric source와 Heatmap methodology는 부분 확인 상태다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, Koyfin methodology documentation

### DATE Implication

DATE는 Metric explanation을 inline으로 둘지, documentation layer로 둘지 비교해야 한다.

### Confidence

Medium

## P-022

### Category

Discovery, Comparison, Information Density

### Observation

Finviz Screener는 filter controls와 result table을 같은 Page에 배치한다. Descriptive / Fundamental / Technical filter grouping과 result view가 같은 workflow 안에서 반복된다.

### Supporting Evidence

- Source 문서: [03-navigation-map.md](./03-navigation-map.md), [06-information-density-observations.md](./06-information-density-observations.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: FNV-PC-002
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Filter condition과 result feedback이 가까우면 사용자는 discovery hypothesis를 빠르게 수정하고 Stock comparison으로 전환할 수 있다.

### Candidate Principle

Filter와 result를 co-locate하면 Discovery Surface가 query construction과 comparison feedback을 한 loop로 묶을 수 있다.

### User Benefit

Decision Speed, Comparison Efficiency, Discoverability

### Potential Trade-off

filter overload, column overload, novice learning cost, screen density risk

### Evidence Limitation

Observed

### Scope Limitation

Desktop Public Screener 기준이며 Saved Screener persistence와 Alert connection은 확인되지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView Screener, Koyfin Screener

### DATE Implication

DATE는 filter setup과 result comparison을 분리할지 co-locate할지 task time과 error rate로 비교해야 한다.

### Confidence

High

## P-023

### Category

Entity, Information Density, Context Preservation

### Observation

Finviz Stock Quote는 Header Summary, Price, Chart, Fundamental Metrics, Technical Metrics, Ownership, Insider, News, Options, related links를 하나의 Stock Context 안에 밀도 높게 배치한다.

### Supporting Evidence

- Source 문서: [02-screen-inventory.md](./02-screen-inventory.md), [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: FNV-PC-008, FNV-PC-009, FNV-PC-014
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Dense Entity Hub는 여러 Page transition을 줄이고 사용자가 Stock 판단에 필요한 adjacent evidence를 한 Context 안에서 비교하게 할 수 있다.

### Candidate Principle

Dense Entity Hub는 하나의 Stock 또는 Symbol Context 안에 summary, metrics, chart, news, ownership, transaction evidence를 함께 배치해 research transition cost를 줄일 수 있다.

### User Benefit

Decision Speed, Context Preservation, Evidence Traceability, Expert Scalability

### Potential Trade-off

information overload, local priority ambiguity, advertisement interference, Mobile expansion risk

### Evidence Limitation

Observed

### Scope Limitation

Desktop Public Stock Quote 기준이며 Mobile, full tab behavior, external return flow는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView Symbol page, Koyfin financial analysis page

### DATE Implication

DATE는 Stock Context 안에서 어떤 evidence를 동시에 노출하고 어떤 evidence를 분리할지 검증해야 한다.

### Confidence

High

## P-024

### Category

Trust / Evidence, Context Preservation, Navigation

### Observation

Finviz News item은 original article로 이동하고 Insider Transaction은 SEC Form 4로 연결된다. External destination 이동 후 Finviz Context Loss가 기록되었다.

### Supporting Evidence

- Source 문서: [04-core-journey-observations.md](./04-core-journey-observations.md), [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md)
- Pattern ID: FNV-PC-010, FNV-PC-011
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Original source access는 Trust를 강화하지만, external 이동이 user context를 끊을 수 있으므로 traceability와 context restoration을 함께 평가해야 한다.

### Candidate Principle

External Evidence Link는 Traceability를 강화할 수 있지만, Product Context Loss를 줄이는 return path 또는 context anchor가 함께 필요할 수 있다.

### User Benefit

Evidence Traceability, Trust / Evidence

### Potential Trade-off

External Context Loss, return cost, task interruption, publisher UX variance

### Evidence Limitation

Observed

### Scope Limitation

External source 이후 return support와 saved evidence behavior는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, EidosLayer Evidence pages

### DATE Implication

DATE는 original source traceability와 user context restoration을 동시에 검증해야 한다.

### Confidence

High

## P-025

### Category

Information Density, Comparison, Learnability

### Observation

Finviz는 Screener, Insider, Home list, Stock Quote sections에서 반복적인 table 또는 row grammar를 사용한다. 이 pattern은 expert scan에는 효율을 주지만 novice cost와 readability risk를 만든다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: FNV-PC-004
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed

### Interpretation

Repeated structure는 사용자가 한 번 학습한 scan pattern을 여러 Surface에 재사용하게 만들 수 있다.

### Candidate Principle

Repeated row and table grammar는 High Information Density를 learnable pattern으로 전환해 expert scan과 cross-surface comparison을 지원할 수 있다.

### User Benefit

Comparison Efficiency, Expert Scalability, Learnability, Decision Speed

### Potential Trade-off

novice cognitive load, small font readability, column overload, Mobile risk

### Evidence Limitation

Observed

### Scope Limitation

Desktop Public Surface 기준이며 novice performance와 Mobile readability는 직접 측정하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Yahoo Finance, Bloomberg Terminal, SaveTicker, TradingView, Koyfin

### DATE Implication

DATE는 repeated row grammar가 expert workflow에는 유효하지만 novice onboarding에는 별도 control이 필요한지 검증해야 한다.

### Confidence

High

## Cross Benchmark Classification

### Shared Pattern

- P-001 Home or Summary Surface as Market orientation entry
- P-007 Source / Freshness Trust Signal
- P-012 Stock / Symbol Context Hub
- P-013 Screener / Table-first Discovery
- P-018 Table / Chart role separation
- P-020 Methodology documentation as Trust layer
- P-022 Filter / result co-location candidate
- P-025 Repeated table grammar

### Variant Pattern

- P-014 Personal continuity split across access boundary
- P-023 Dense Single Page as Entity Hub vs dashboard composition
- P-024 External Evidence Link vs embedded Evidence Surface

### Benchmark-specific Pattern

- Advertisement as Density Trade-off
- Insider Transaction to SEC Form 4 trace
- Public / Elite transparency as Product boundary

### Potential Contradiction

직접 반대 Evidence는 생성하지 않았다. Cause-based Discovery와 Finviz scan-first ranking은 Variant로 유지한다.

### Insufficient Evidence

- Maps dynamic Navigation
- Groups drill-down
- Portfolio persistence
- Alert rule behavior
- Mobile
- Recent / History
- Asset Class detail
- Backtests interaction

## DATE Research 영향

Finviz는 Dense Surface, Table-first comparison, external traceability, Stock Context preservation을 강하게 보여준다. 동시에 advertising, novice cost, external Context Loss, Login / Elite restriction이 Trade-off로 남는다.

다음 단계에서는 이 Candidate Principle을 Final Quality Review에서 consistency, duplication, Evidence Level, Registry alignment 기준으로 재검토해야 한다.
