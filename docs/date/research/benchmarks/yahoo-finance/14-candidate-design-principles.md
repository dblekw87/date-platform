# Yahoo Finance Candidate Design Principles

## Purpose

이 문서는 Yahoo Finance Phase 5.1~5.4 Observation에서 Candidate Principle을 추출한다.

이 문서의 Candidate Principle은 DATE Product Principle이 아니며, 모든 항목은 Cross Validation이 필요하다. Phase 5.5에서는 새로운 웹 조사와 새로운 Observation을 수행하지 않았다.

## Source Documents

- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- [12-hypothesis-evidence-log.md](./12-hypothesis-evidence-log.md)

## Summary

| Principle ID | Registry Action | Confidence | Cross Benchmark Classification |
| --- | --- | --- | --- |
| P-001 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-002 | Existing Principle Evidence Added | High | Shared Pattern |
| P-007 | Existing Principle Evidence Added | High | Shared Pattern |
| P-012 | Existing Principle Evidence Added | High | Shared Pattern |
| P-013 | Existing Principle Evidence Added | High | Shared Pattern |
| P-014 | Existing Principle Evidence Added | Medium | Insufficient Evidence |
| P-018 | Existing Principle Evidence Added | High | Shared Pattern |
| P-020 | Existing Principle Evidence Added | High | Shared Pattern |
| P-024 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-025 | Existing Principle Evidence Added | High | Shared Pattern |
| P-026 | New Candidate Principle | Medium | Benchmark-specific |
| P-027 | New Candidate Principle | Medium | Variant Pattern |

## P-001

### Category

Portal, Discovery, Market Orientation

### Observation

Finance Home은 Market Summary, News, Trending Tickers, Watchlist / Portfolio candidate, Premium entry를 포함하는 Portal Entry로 기록됐다. Direct body와 logged-in Home은 Partial / Not Verified다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: YF-DEN-001, YF-PC-022
- 공식 Source 유형: Official Product Observation / Official Documentation
- Evidence Level: Partial

### Interpretation

Yahoo Finance Home은 static landing page보다 passive discovery와 active research entry를 섞은 broad entry로 해석된다.

### Candidate Principle

Home Surface는 Market condition과 research entry를 함께 노출해 사용자가 passive discovery에서 active research로 전환하도록 도울 수 있다.

### User Benefit

Discoverability, Market Orientation, Entry Cost Reduction

### Potential Trade-off

Portal Content 혼합, 광고 경쟁, 정보 우선순위 불명확, Mobile 위험

### Evidence Limitation

Partial / Not Verified

### Scope Limitation

Yahoo Finance Home direct body와 logged-in Home은 Not Verified다. Portal Pattern은 Yahoo Finance scope로 제한한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, TradingView, Koyfin, Finviz

### DATE Implication

DATE에서 Home이 passive discovery와 active research entry를 함께 담당할 가치가 있는지 검증해야 한다.

### Confidence

Medium

## P-002

### Category

Search, Entity, Navigation

### Observation

Yahoo Help는 Search가 company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency를 지원한다고 기록한다. Search Suggestion Dropdown body는 Not Verified다.

### Supporting Evidence

- Source 문서: [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: YF-PC-002
- 공식 Source 유형: Official Documentation
- Evidence Level: Official Documentation Only / Partial

### Interpretation

Search는 wide Entity universe를 하나의 low-density entry로 압축할 수 있다.

### Candidate Principle

Search는 broad feed가 아니라 Stock, Company Display, ETF, Crypto Asset 같은 Entity candidate로 빠르게 이동하는 global entity router로 작동할 수 있다.

### User Benefit

Decision Speed, Discoverability, Learnability

### Potential Trade-off

Search Suggestion 미확인, ambiguous query 비용, Entity Type 구분 부족 가능성

### Evidence Limitation

Official Documentation Only / Partial

### Scope Limitation

지원 Entity type은 documentation 기준이며 Suggestion UI는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, TradingView, Koyfin, Finviz

### DATE Implication

DATE에서 Search가 discovery feed가 아니라 Entity routing 역할을 우선해야 하는지 검증해야 한다.

### Confidence

High

## P-007

### Category

Trust / Evidence, Provider Transparency

### Observation

Yahoo Help는 exchange delay, provider categories, real-time cue, market data disclaimer를 기록한다. News에는 publisher label이 있고 Premium pages는 provider와 plan boundary를 기록한다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: YF-TR-001, YF-TR-005, YF-TR-017, YF-TR-038
- 공식 Source 유형: Official Documentation / Official Pricing / Official Product Observation
- Evidence Level: Official Documentation Only / Partial / Premium Feature

### Interpretation

Source, Freshness, provider, access boundary가 분리되면 사용자는 Evidence quality를 더 명확히 판단할 수 있다.

### Candidate Principle

Market-facing Surface는 Source, Freshness, provider, access boundary를 분리해서 Evidence quality 판단을 도울 수 있다.

### User Benefit

Evidence Traceability, Trust Calibration, Decision Speed

### Potential Trade-off

Help lookup cost, item-level Source gap, Premium dependency, Provider Fragmentation

### Evidence Limitation

Official Documentation Only / Partial / Premium Feature

### Scope Limitation

Provider category visibility는 item-level formula나 filing-level Traceability를 대체하지 않는다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Koyfin, Finviz, TradingView

### DATE Implication

DATE는 Source, Freshness, provider identity, methodology를 같은 Trust Signal로 뭉치지 않고 분리해 검증해야 한다.

### Confidence

High

## P-012

### Category

Entity, Context Preservation, Information Density

### Observation

Quote는 Summary, Chart, News, Statistics, Financials, Holders, Analysis, Sustainability, Options, Historical Data, Profile, Conversation, Related tabs candidate를 ticker context에 묶는다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: YF-DEN-003, YF-DEN-004, YF-PC-003, YF-PC-004
- 공식 Source 유형: Official Product Observation / Official Documentation
- Evidence Level: Observed / Partial

### Interpretation

Quote local tabs는 Symbol context를 유지하면서 detail analysis를 확장하는 Progressive Disclosure로 작동할 수 있다.

### Candidate Principle

Symbol page는 local tabs를 사용해 하나의 Entity context 안에서 여러 analysis mode를 분리할 수 있다.

### User Benefit

Context Preservation, Information Density Control, Decision Speed

### Potential Trade-off

Tab 증가, 일부 Quote Tab Body 미확인, Premium Module 간섭, Stock / Company Display boundary

### Evidence Limitation

Observed / Partial / Not Verified

### Scope Limitation

Quote structure는 확인됐지만 일부 tab body, Related transition, Mobile behavior는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, TradingView, Finviz, Koyfin

### DATE Implication

DATE는 Stock Context와 Company Display를 하나의 Entity Hub에 묶을지 별도 Surface로 나눌지 검증해야 한다.

### Confidence

High

## P-013

### Category

Discovery, Comparison, Information Density

### Observation

Screeners Hub는 predefined screener cards와 Create entry를 제공하고 predefined result는 filter summary, table, heatmap view, Save, Download, Customize candidate actions를 제공한다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: YF-DEN-008, YF-DEN-009, YF-PC-006
- 공식 Source 유형: Official Product Observation / Official Documentation
- Evidence Level: Observed

### Interpretation

Predefined cards는 setup cost를 낮추고 result table은 comparison을 담당한다.

### Candidate Principle

Screener Surface는 predefined entry와 result table을 분리해 low-setup discovery와 comparison workflow를 연결할 수 있다.

### User Benefit

Discoverability, Comparison Efficiency, Learnability

### Potential Trade-off

Custom Save Login Required, Premium Screener boundary, filter formula gap, Screener Back State 미확인

### Evidence Limitation

Observed / Login Required / Premium Feature

### Scope Limitation

Public predefined result 기준이며 custom save persistence와 Premium Screeners는 제한된다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, TradingView, Koyfin, Finviz

### DATE Implication

DATE는 초보자 discovery entry와 expert filter workflow를 같은 Screener Surface 안에서 분리할지 검증해야 한다.

### Confidence

High

## P-014

### Category

Personal Continuity, User State, Subscription

### Observation

Watchlist, Portfolio, Saved Screener, Alerts, Personalized Home은 Personal Continuity candidate로 기록됐지만 실제 UI와 persistence는 Login Required, Premium Feature, 또는 Not Verified다.

### Supporting Evidence

- Source 문서: [08-product-flow-architecture.md](./08-product-flow-architecture.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: Personal Continuity Assessment, YF-PC-013~YF-PC-018
- 공식 Source 유형: Official Documentation / Official Pricing
- Evidence Level: Login Required / Premium Feature / Not Verified

### Interpretation

Yahoo Finance는 personal continuity 후보를 여러 account state로 나누지만 public interaction만으로 persistence를 확정할 수 없다.

### Candidate Principle

Personal continuity는 Watchlist, Portfolio, Saved Screener, Alert, Personalized Home 같은 state로 분리될 수 있지만 actual persistence와 access boundary를 함께 검증해야 한다.

### User Benefit

Personal Continuity, Context Preservation

### Potential Trade-off

로그인 의존성, Premium Feature 의존성, persistence uncertainty, Revisit State 미확인

### Evidence Limitation

Login Required / Premium Feature / Not Verified

### Scope Limitation

Personal Continuity는 supporting evidence가 아니라 Insufficient Evidence 중심으로 Registry에 반영한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, TradingView, Koyfin, Finviz

### DATE Implication

DATE는 personal state의 owner, persistence, revisit restoration을 분리해 검증해야 한다.

### Confidence

Medium

## P-018

### Category

Comparison, Information Density

### Observation

Markets, Currencies, Crypto, Screener Result는 table-first comparison을 제공하고 Chart는 time-series analysis controls를 제공한다. Crypto and Screener Result는 heatmap optional view도 제공한다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: YF-DEN-002, YF-DEN-010, YF-DEN-023, YF-DEN-024
- 공식 Source 유형: Official Product Observation / Official Documentation
- Evidence Level: Observed / Partial

### Interpretation

Table, Chart, Heatmap은 같은 visualization이 아니라 comparison question과 time-series question을 나눌 수 있다.

### Candidate Principle

Table, Chart, Heatmap은 서로 다른 comparison question과 analysis mode를 담당하는 Information Form으로 분리될 수 있다.

### User Benefit

Comparison Efficiency, Information Density Control, Market Orientation

### Potential Trade-off

Heatmap methodology gap, row-to-detail Not Verified, chart control learning cost

### Evidence Limitation

Observed / Partial / Not Verified

### Scope Limitation

Heatmap interaction과 methodology는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Koyfin, Finviz, TradingView

### DATE Implication

DATE는 Table, Chart, Heatmap을 화면 장식이 아니라 user question별 Information Form으로 검증해야 한다.

### Confidence

High

## P-020

### Category

Trust / Evidence, Provider Transparency

### Observation

Yahoo Help는 exchange delay, provider category, Fair Value methodology, Portfolio TWR assumptions, Research Report provider와 frequency를 문서화한다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- Pattern ID: YF-TR-001, YF-TR-011, YF-TR-013, YF-TR-022, YF-TR-037
- 공식 Source 유형: Official Documentation
- Evidence Level: Official Documentation Only / Premium Feature

### Interpretation

Methodology documentation은 Product UI에서 item-level Traceability가 부족할 때 Trust layer를 보완할 수 있다.

### Candidate Principle

Methodology documentation은 financial Product에서 Metric meaning, provider category, calculation boundary를 보완하는 Trust layer로 작동할 수 있다.

### User Benefit

Evidence Traceability, Trust Calibration, Learnability

### Potential Trade-off

Documentation discoverability, item-level Source gap, Provider Fragmentation, Premium dependency

### Evidence Limitation

Official Documentation Only / Premium Feature

### Scope Limitation

Documentation 기준이며 Product UI의 inline methodology link는 Not Verified다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Koyfin, Finviz, TradingView

### DATE Implication

DATE는 inline Metric explanation과 Help-style methodology layer의 역할을 비교해야 한다.

### Confidence

High

## P-024

### Category

Trust / Evidence, Context Preservation

### Observation

News headline은 publisher 또는 article Source candidate로 이어진다. External Article Return Path는 Not Verified다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md)
- Pattern ID: YF-TR-017, YF-TR-018, Context Preservation Assessment
- 공식 Source 유형: Official Product Observation / Inference
- Evidence Level: Partial / Not Verified

### Interpretation

Original article access는 Evidence Traceability를 강화할 수 있지만 Yahoo Finance context를 잃을 수 있다.

### Candidate Principle

External Evidence Link는 Source Traceability를 제공할 수 있지만 Product Context Loss를 줄이는 return path나 context anchor가 함께 필요할 수 있다.

### User Benefit

Evidence Traceability, Trust Calibration

### Potential Trade-off

External Context Loss, return path Not Verified, related symbol context 미확인

### Evidence Limitation

Partial / Not Verified

### Scope Limitation

Yahoo Finance에서는 external return support가 확인되지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Finviz, TradingView, EidosLayer

### DATE Implication

DATE는 original article access와 analysis context restoration을 함께 검증해야 한다.

### Confidence

Medium

## P-025

### Category

Information Density, Comparison, Learnability

### Observation

Yahoo Finance는 Markets table, Screeners result table, Currencies table, Crypto table, News headline list처럼 반복 가능한 row 또는 list grammar를 사용한다.

### Supporting Evidence

- Source 문서: [06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- Pattern ID: YF-DEN-002, YF-DEN-007, YF-DEN-009, YF-DEN-023
- 공식 Source 유형: Official Product Observation
- Evidence Level: Observed / Partial

### Interpretation

반복 구조는 사용자가 한 번 익힌 scan grammar를 Market, Screener, News에서 재사용하게 만들 수 있다.

### Candidate Principle

Repeated row and table grammar는 Information Density를 learnable pattern으로 전환해 scan과 comparison을 지원할 수 있다.

### User Benefit

Comparison Efficiency, Learnability, Decision Speed

### Potential Trade-off

Portal Content 혼합, column overload, Mobile 위험, advertisement competition

### Evidence Limitation

Observed / Partial / Not Verified

### Scope Limitation

Desktop Public Surface 기준이며 novice performance와 Mobile readability는 직접 측정하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Finviz, Koyfin, TradingView

### DATE Implication

DATE는 repeated table grammar가 expert scan에는 유효하지만 novice onboarding에는 별도 Density Control이 필요한지 검증해야 한다.

### Confidence

High

## P-026

### Category

Portal, Discovery, Navigation

### Observation

Yahoo Finance는 Finance Home에서 Market Summary, News, Trending, Personalized Content candidate, Search, Markets, Screeners, Premium entry를 연결한다. Home direct body와 logged-in Home은 Partial / Not Verified다.

### Supporting Evidence

- Source 문서: [08-product-flow-architecture.md](./08-product-flow-architecture.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: Portal Flow, YF-PC-022
- 공식 Source 유형: Official Product Observation / Official Documentation
- Evidence Level: Partial

### Interpretation

Portal Entry는 passive discovery, personal entry candidate, active research tools를 한 출발점에서 연결할 수 있다.

### Candidate Principle

Investment product의 Portal Entry는 passive Market discovery와 active research entry를 연결할 수 있지만, primary research task와 content hierarchy를 분리해야 할 수 있다.

### User Benefit

Discoverability, Learnability, Entry Cost Reduction, Market Orientation

### Potential Trade-off

Portal Content 혼합, Research 집중 저하, 광고 경쟁, personalized Home 미확인, Mobile 위험

### Evidence Limitation

Partial / Login Required / Not Verified

### Scope Limitation

Yahoo Finance Portal Pattern 기준이다. 모든 투자 Product가 Portal Home을 가져야 한다는 의미가 아니다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Koyfin, Finviz, TradingView

### DATE Implication

DATE에서 passive discovery entry와 active research entry를 같은 Home에 둘지 분리할지 검증해야 한다.

### Confidence

Medium

## P-027

### Category

Provider Transparency, Trust / Evidence, Subscription

### Observation

Premium Help와 plan pages는 Morningstar, Argus, Vickers, S&P Global Market Intelligence, Trading Central, LSEG Data & Analytics 등 provider를 명시한다. Report body와 in-product gate는 Not Verified다.

### Supporting Evidence

- Source 문서: [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)
- Pattern ID: YF-TR-013, YF-TR-014, YF-PC-012, YF-PC-024
- 공식 Source 유형: Official Documentation / Official Pricing
- Evidence Level: Official Documentation Only / Premium Feature

### Interpretation

Aggregated research와 Premium Evidence는 provider identity를 유지할 때 trust calibration에 도움을 줄 수 있다.

### Candidate Principle

Aggregated research modules may strengthen trust when provider identity and methodology boundary remain visible, but provider visibility does not replace item-level Traceability.

### User Benefit

Evidence Traceability, Trust Calibration, Expert Scalability

### Potential Trade-off

Provider Fragmentation, Premium dependency, Source는 보이지만 원문 추적은 부족할 수 있음, report body 미확인

### Evidence Limitation

Official Documentation Only / Premium Feature / Not Verified

### Scope Limitation

Premium provider visibility 기준이며 public Evidence Traceability나 filing-level Traceability로 일반화하지 않는다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Bloomberg, SaveTicker, Koyfin, Finviz

### DATE Implication

DATE에서 external provider analysis를 사용할 경우 provider identity, methodology, item-level Traceability를 어떻게 분리할지 검증해야 한다.

### Confidence

Medium

## Cross Benchmark Classification

### Shared Pattern

- P-002 Search-driven Entity Discovery
- P-007 Source / Freshness Cue
- P-012 Local Tab Progressive Disclosure inside Symbol Context
- P-013 Screener / Table Discovery
- P-018 Table / Chart / Heatmap role separation
- P-020 Methodology Layer
- P-025 Repeated row and table grammar

### Variant Pattern

- P-001 Portal Entry as Market Discovery variant
- P-024 External Article Link vs embedded Evidence
- P-027 Provider-labeled Research vs filing-centered Traceability

### Benchmark-specific Pattern

- P-026 Finance Portal + Research Tool combination
- Premium ad-free as Density Control is kept as Benchmark-specific note, not new Candidate Principle.

### Potential Contradiction

직접 반대 Evidence는 생성하지 않았다.

### Insufficient Evidence

- Search Suggestion
- Logged-in Home
- Portfolio internals
- Watchlist internals
- Saved Screener Persistence
- Alert Behavior
- Recent / Revisit
- Mobile
- External Article Return Path
- Chart Preference Persistence
- 일부 Quote Tab Body

## DATE Research 영향

Yahoo Finance는 Search routing, Symbol Context Hub, local tabs, table comparison, methodology documentation, provider visibility를 지지한다. 동시에 Portal Content mixing, Premium dependency, provider fragmentation, Context Loss, Personal Continuity Not Verified가 Trade-off로 남는다.

다음 단계에서는 Final Quality Review에서 Registry alignment, duplicate Principle 여부, Evidence Level, Scope Limitation을 재검토해야 한다.
