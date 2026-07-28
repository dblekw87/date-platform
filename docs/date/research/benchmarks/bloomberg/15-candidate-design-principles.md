# Bloomberg Candidate Design Principles

## Purpose

이 문서는 Bloomberg Phase 6.1~6.4 Observation에서 Candidate Principle을 추출한다.

이 문서의 Candidate Principle은 DATE Product Principle이 아니며, 모든 항목은 Cross Validation이 필요하다. Phase 6.5에서는 새로운 웹 조사와 새로운 Observation을 수행하지 않았다.

## Source Documents

- [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- [11-evidence-hardening-review.md](./11-evidence-hardening-review.md)
- [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)
- [13-hypothesis-evidence-log.md](./13-hypothesis-evidence-log.md)

## Summary

| Principle ID | Registry Action | Confidence | Cross Benchmark Classification |
| --- | --- | --- | --- |
| P-001 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-007 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-009 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-014 | Existing Principle Evidence Added | Low | Insufficient Evidence |
| P-017 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-018 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-021 | Existing Principle Evidence Added | Low | Insufficient Evidence |
| P-025 | Existing Principle Evidence Added | High | Shared Pattern |
| P-026 | Existing Principle Evidence Added | Medium | Variant Pattern |
| P-027 | Existing Principle Evidence Added | Medium | Shared Pattern |
| P-028 | New Candidate Principle | Medium | Benchmark-specific |
| P-029 | New Candidate Principle | Medium | Variant Pattern |

## P-001

### Category

Portal, Market Orientation, Product Boundary

### Observation

Bloomberg.com Home은 News, Video, Market Data footer, category Navigation, Subscription CTA를 포함하는 Public Web Portal Entry로 기록되었다. Bloomberg Terminal은 별도 professional workflow Product Layer다.

### Supporting Evidence

- Source 문서: [07-information-density-observations.md](./07-information-density-observations.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- Pattern ID: BBG-DEN-001, BBG-STR-004
- Evidence Type: Official Product Observation
- Evidence Level: Partial
- Access Limitation: Public Web only, Terminal separate

### Interpretation

Bloomberg Public Home은 static landing page보다 public Market awareness와 media / subscription entry를 결합한 Portal Entry로 해석된다.

### Candidate Principle

Home Surface는 Market awareness와 research entry를 연결할 수 있지만, professional workflow가 별도 Product Layer에 있을 경우 Home 역할을 Public Entry로 제한해야 할 수 있다.

### User Benefit

Market Orientation, Discoverability

### Potential Trade-off

Portal content mixing, Public / Professional Product 단절, Subscription boundary, research priority ambiguity

### Evidence Limitation

Partial

### Scope Limitation

Desktop Public Web 기준이다. Terminal Home 또는 logged-in professional state는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Yahoo Finance, Finviz

### DATE Implication

DATE에서 Public awareness entry와 professional workflow entry를 같은 Home에 둘지 분리할지 검증해야 한다.

### Confidence

Medium

## P-007

### Category

Trust / Evidence, Provider Transparency, Entitlement

### Observation

Bloomberg Original News, Public Markets, Terminal real-time Market Data responsibility, Bloomberg Intelligence, Data License, Server API, B-PIPE, Entitlement boundary가 Trust / Evidence Signal로 기록되었다.

### Supporting Evidence

- Source 문서: [08-trust-and-evidence-observations.md](./08-trust-and-evidence-observations.md), [11-evidence-hardening-review.md](./11-evidence-hardening-review.md)
- Pattern ID: BBG-TRU-001, BBG-TRU-006, BBG-TRU-009, BBG-TRU-011, BBG-TRU-014
- Evidence Type: Official Product Observation / Official Product Description
- Evidence Level: Partial / Official Product Description Only / Enterprise Entitlement
- Access Limitation: No Direct Terminal Session

### Interpretation

Bloomberg는 Source, Provider, Freshness, Entitlement가 서로 다른 trust dimension임을 보여준다.

### Candidate Principle

Market-facing Product는 Source, Provider, Freshness, Entitlement boundary를 분리해 사용자가 Evidence quality를 판단하도록 도울 수 있다.

### User Benefit

Evidence Traceability, Trust Calibration

### Potential Trade-off

Entitlement complexity, item-level Source gap, Terminal timestamp Not Verified, provider identity가 methodology를 대체할 위험

### Evidence Limitation

Partial / Official Product Description Only / Enterprise Entitlement / Not Verified

### Scope Limitation

Terminal data timestamp, exchange entitlement UI, item-level Source는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Finviz, Yahoo Finance

### DATE Implication

DATE는 Source, Provider, Freshness, Entitlement를 하나의 label로 합치지 않고 분리해 검증해야 한다.

### Confidence

Medium

## P-009

### Category

Context Preservation, Product Boundary, Navigation

### Observation

Bloomberg는 Public Flow, Professional Workflow, Workspace Flow, Collaboration Flow, Anywhere Flow, Data Flow를 Product Layer별로 분리한다. Public / Terminal / Anywhere / Enterprise Data 간 Context Transfer는 대부분 Not Verified다.

### Supporting Evidence

- Source 문서: [09-product-flow-architecture.md](./09-product-flow-architecture.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- Pattern ID: Product Flow, BBG-CL-001~BBG-CL-014
- Evidence Type: Official Product Observation / Official Product Description
- Evidence Level: Partial / Official Product Description Only / Not Verified
- Access Limitation: No Direct Terminal Session, Enterprise Entitlement

### Interpretation

Product Layer separation은 clarity를 높일 수 있지만, Layer 간 Context Preservation risk를 만든다.

### Candidate Principle

Specialized Product Layer를 분리할 때는 각 Layer의 responsibility와 context-transfer boundary를 함께 정의해야 할 수 있다.

### User Benefit

Context Preservation, Workflow Efficiency, Trust Calibration

### Potential Trade-off

Public / Professional Product 단절, Workspace Persistence 미확인, Anywhere Continuity 미확인, Excel / API Field Lineage 부족

### Evidence Limitation

Partial / Official Product Description Only / Not Verified

### Scope Limitation

Cross-product context transfer는 확인되지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Yahoo Finance, Finviz

### DATE Implication

DATE에서 Surface나 client layer를 분리할 경우 Entity Context와 Evidence Context를 어떻게 transfer할지 검증해야 한다.

### Confidence

Medium

## P-014

### Category

Personal Continuity, Workspace, User State

### Observation

Workspace, Launchpad, Worksheet, Watchlist, Alert, Portfolio, IB chat state, Anywhere Session은 User State Candidate로 기록되었다. Persistence와 post-login continuity는 Not Verified다.

### Supporting Evidence

- Source 문서: [06-entity-and-state-observations.md](./06-entity-and-state-observations.md), [11-evidence-hardening-review.md](./11-evidence-hardening-review.md)
- Pattern ID: BBG-STATE-001~BBG-STATE-010
- Evidence Type: Official Product Description / Inference
- Evidence Level: Official Product Description Only / Login Required / Not Verified
- Access Limitation: Institutional Access Required, No Direct Terminal Session

### Interpretation

Bloomberg는 personal continuity 후보를 여러 professional state로 나누지만 actual persistence가 확인되지 않아 supporting evidence보다 Insufficient Evidence에 가깝다.

### Candidate Principle

Personal continuity는 Workspace, Watchlist, Alert, Portfolio, Session state로 분리될 수 있지만, actual persistence와 ownership을 함께 검증해야 한다.

### User Benefit

Personal Continuity, Context Preservation

### Potential Trade-off

Workspace Persistence 미확인, Launchpad Save / Restore 미확인, Anywhere Continuity 미확인, Institutional Access 의존

### Evidence Limitation

Official Product Description Only / Login Required / Not Verified

### Scope Limitation

Personal continuity는 Insufficient Evidence로 Registry에 연결한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Yahoo Finance, Finviz

### DATE Implication

DATE는 Workspace state, Entity Context, Layout, Alert, Portfolio ownership을 별도 state로 검증해야 한다.

### Confidence

Low

## P-017

### Category

Navigation, Interaction, Professional Workflow

### Observation

Command Entry와 Function은 Terminal operation unit 또는 Capability 후보로 기록되었다. Function execution, command parsing, autocomplete, recent, favorites는 Not Verified다.

### Supporting Evidence

- Source 문서: [04-navigation-map.md](./04-navigation-map.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md), [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)
- Pattern ID: BBG-NAV-016, BBG-NAV-017, BBG-PC-007, BBG-PC-008
- Evidence Type: Official Product Description
- Evidence Level: Official Product Description Only / Not Verified
- Access Limitation: No Direct Terminal Session

### Interpretation

Bloomberg는 Search와 다른 expert-oriented Command / Function Entry variant를 제공한다.

### Candidate Principle

전문 사용자를 위한 Product는 반복 task entry를 Search뿐 아니라 Function-oriented Entry로 제공할 수 있지만, discovery, disambiguation, learning cost를 함께 검증해야 한다.

### User Benefit

Decision Speed, Professional Scalability

### Potential Trade-off

높은 학습 비용, Function 발견 어려움, command parsing 미확인, autocomplete 미확인

### Evidence Limitation

Official Product Description Only / Not Verified

### Scope Limitation

Function Code interaction을 확인하지 않았다. Command Entry가 실제 Navigation cost를 줄인다고 확정하지 않는다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin

### DATE Implication

DATE에서 Page Navigation과 Function-oriented Entry를 어떤 비율로 제공할지 검증해야 한다.

### Confidence

Medium

## P-018

### Category

Information Density, Comparison

### Observation

Public Markets는 Table 중심 comparison Surface로 기록되었고, Terminal Charts는 separate professional chart responsibility로 기록되었다.

### Supporting Evidence

- Source 문서: [03-screen-and-function-inventory.md](./03-screen-and-function-inventory.md), [07-information-density-observations.md](./07-information-density-observations.md)
- Pattern ID: BBG-DEN-003, BBG-DEN-004, BBG-SFI-039, BBG-SFI-040
- Evidence Type: Official Product Observation / Official Product Description
- Evidence Level: Observed / Official Product Description Only
- Access Limitation: Terminal chart interaction Not Verified

### Interpretation

Bloomberg는 table comparison과 chart analysis를 Product responsibility로 분리한다.

### Candidate Principle

Table과 Chart는 같은 data display가 아니라 cross-sectional comparison과 time-series analysis를 나누는 Information Form으로 작동할 수 있다.

### User Benefit

Comparison Efficiency, Information Density Control

### Potential Trade-off

row-to-detail Not Verified, Terminal chart interaction Not Verified, calculation methodology Not Verified

### Evidence Limitation

Observed / Official Product Description Only / Not Verified

### Scope Limitation

Public Markets table과 Terminal Charts responsibility 기준이다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Finviz, Yahoo Finance

### DATE Implication

DATE는 Table과 Chart의 responsibility를 user question 기준으로 나눌 수 있는지 검증해야 한다.

### Confidence

Medium

## P-021

### Category

Workspace, Context Preservation, Interaction

### Observation

Workspace, Launchpad, Panel, Linked Window, Security Context는 후보로 기록되었다. Panel linking, Security Context sharing, Workspace save / restore, Launchpad persistence는 Not Verified다.

### Supporting Evidence

- Source 문서: [06-entity-and-state-observations.md](./06-entity-and-state-observations.md), [09-product-flow-architecture.md](./09-product-flow-architecture.md), [11-evidence-hardening-review.md](./11-evidence-hardening-review.md)
- Pattern ID: BBG-STATE-001~BBG-STATE-004, Workspace Flow
- Evidence Type: Official Product Description / Inference
- Evidence Level: Official Product Description Only / Inference / Not Verified
- Access Limitation: No Direct Terminal Session

### Interpretation

Bloomberg는 linked Workspace principle을 검토할 중요한 후보를 제공하지만 actual linking evidence가 부족하다.

### Candidate Principle

Configurable Workspace에서 Panel과 Widget이 Entity Context를 공유하려면 linking rule과 persistence boundary가 명확해야 할 수 있다.

### User Benefit

Context Preservation, Information Density Control

### Potential Trade-off

Context Linking 불확실성, Workspace 설정 비용, Persistence 불확실성, 다중 Panel 인지 부하

### Evidence Limitation

Official Product Description Only / Not Verified

### Scope Limitation

Bloomberg evidence는 Insufficient Evidence로만 Registry에 연결한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, Koyfin, TradingView

### DATE Implication

DATE에서 Workspace가 Layout과 Entity Context를 각각 어떻게 소유할지 정의해야 한다.

### Confidence

Low

## P-025

### Category

Information Density, Comparison, Learnability

### Observation

Public Markets, Stocks, Futures, Commodities, Currencies, Rates & Bonds는 repeated asset class table 또는 table candidate로 기록되었다.

### Supporting Evidence

- Source 문서: [07-information-density-observations.md](./07-information-density-observations.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- Pattern ID: BBG-DEN-003, BBG-DEN-004, BBG-STR-005
- Evidence Type: Official Product Observation
- Evidence Level: Observed / Partial
- Access Limitation: Public Web, Terminal table grammar Not Verified

### Interpretation

반복 asset class table은 public user가 같은 scan grammar를 여러 Market category에 적용하도록 도울 수 있다.

### Candidate Principle

Repeated row and table grammar는 high-density Market data를 learnable comparison pattern으로 전환할 수 있다.

### User Benefit

Comparison Efficiency, Learnability, Market Orientation

### Potential Trade-off

row-to-detail Not Verified, Quote Full Body 제한, Mobile readability 미확인

### Evidence Limitation

Observed / Partial

### Scope Limitation

Desktop Public Web 기준이다. Terminal repeated table workflow는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Finviz, Yahoo Finance

### DATE Implication

DATE는 repeated table grammar가 Market scan과 expert workflow에 어떤 learning benefit을 주는지 검증해야 한다.

### Confidence

High

## P-026

### Category

Portal, Discovery, Product Boundary

### Observation

Bloomberg.com Public Home은 News, Video, Market Data footer, category Navigation, Subscription CTA를 결합한다. Terminal professional workflow는 별도 Product Layer다.

### Supporting Evidence

- Source 문서: [07-information-density-observations.md](./07-information-density-observations.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- Pattern ID: BBG-DEN-001, BBG-STR-004
- Evidence Type: Official Product Observation
- Evidence Level: Partial
- Access Limitation: Public Web only

### Interpretation

Bloomberg의 Portal Entry는 passive Market awareness와 public content access를 연결하지만 professional workflow를 직접 포함하지 않는다.

### Candidate Principle

Portal Entry는 passive Market awareness와 active research entry를 연결할 수 있지만, professional workflow가 별도 Layer일 경우 content hierarchy와 responsibility boundary가 명확해야 한다.

### User Benefit

Discoverability, Market Orientation

### Potential Trade-off

Portal content mixing, Public / Terminal 단절, Subscription CTA competition

### Evidence Limitation

Partial

### Scope Limitation

Bloomberg.com Public Web 기준이며 Terminal workflow는 별도다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, Yahoo Finance, TradingView, Koyfin

### DATE Implication

DATE에서 Portal Entry가 필요하다면 Public content와 professional workflow responsibility를 분리해 검증해야 한다.

### Confidence

Medium

## P-027

### Category

Provider Transparency, Trust / Evidence

### Observation

Bloomberg Intelligence, BloombergNEF, Data License, B-PIPE, Server API는 provider / research / data product candidates로 기록되었다. Provider identity does not prove item-level Source or methodology Traceability.

### Supporting Evidence

- Source 문서: [08-trust-and-evidence-observations.md](./08-trust-and-evidence-observations.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md)
- Pattern ID: BBG-TRU-009, BBG-TRU-011, BBG-TRU-012, BBG-PC-019
- Evidence Type: Official Product Description
- Evidence Level: Official Product Description Only / Enterprise Entitlement
- Access Limitation: No Direct Terminal Session, Enterprise access not tested

### Interpretation

Provider / product identity는 trust calibration을 돕지만, methodology와 item-level Source를 대체하지 않는다.

### Candidate Principle

Aggregated research와 enterprise data modules는 provider identity와 methodology boundary를 분리해 표시할 때 trust calibration을 도울 수 있다.

### User Benefit

Evidence Traceability, Trust Calibration

### Potential Trade-off

Data Lineage 부족, methodology Not Verified, Enterprise Entitlement 의존, provider/product boundary confusion

### Evidence Limitation

Official Product Description Only / Enterprise Entitlement / Not Verified

### Scope Limitation

Provider identity만 확인했으며 item-level Traceability는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, Koyfin, Yahoo Finance, Finviz

### DATE Implication

DATE에서 third-party provider나 research module을 사용할 경우 provider identity와 Source Traceability를 분리해 검증해야 한다.

### Confidence

Medium

## P-028

### Category

Product Boundary, Navigation, Entitlement

### Observation

Bloomberg는 Public Web, Digital Subscription, Terminal, Bloomberg Anywhere, Professional App, Enterprise Data, Bloomberg Intelligence, BloombergNEF, Supporting Media를 분리한다. Context transfer between layers is mostly Not Verified.

### Supporting Evidence

- Source 문서: [01-product-boundary.md](./01-product-boundary.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md), [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)
- Pattern ID: BBG-STR-001, BBG-STR-002, BBG-PC-001, BBG-PC-002, BBG-PC-022
- Evidence Type: Official Product Observation / Official Product Description / Official Pricing
- Evidence Level: Observed / Official Product Description Only / Enterprise Entitlement
- Access Limitation: No Direct Terminal Session

### Interpretation

Product Family가 여러 delivery layer와 access layer를 가질수록 각 layer의 primary responsibility와 context-transfer boundary가 중요해진다.

### Candidate Principle

Product Family가 여러 Delivery Layer로 구성될 경우 각 Layer의 Primary Responsibility와 Context Transfer Boundary를 명확히 해야 할 수 있다.

### User Benefit

Trust Calibration, Workflow Efficiency, Market Orientation

### Potential Trade-off

entry 결정 비용, Entitlement 복잡성, Public / Professional Product 단절, Context Transfer 미확인

### Evidence Limitation

Observed / Official Product Description Only / Enterprise Entitlement / Not Verified

### Scope Limitation

Bloomberg Product Family scope다. Product Layer 간 actual context transfer는 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Yahoo Finance

### DATE Implication

DATE가 multi-client 또는 multiple delivery layer로 확장될 경우 각 layer의 responsibility와 context transfer contract를 검증해야 한다.

### Confidence

Medium

## P-029

### Category

Workflow Density, Professional Workflow, Information Density

### Observation

Professional Workflow 후보는 Security Lookup, Analysis, Chart, News, Portfolio, Alert, Messaging, Excel / API로 기록되었다. 실제 연속 Interaction, Function execution, Security Context Linking, Workspace Persistence는 Not Verified다.

### Supporting Evidence

- Source 문서: [07-information-density-observations.md](./07-information-density-observations.md), [09-product-flow-architecture.md](./09-product-flow-architecture.md), [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)
- Pattern ID: BBG-DEN-007, BBG-DEN-009, Professional Workflow, BBG-PC-006
- Evidence Type: Official Product Description
- Evidence Level: Official Product Description Only / Institutional Access Required / Not Verified
- Access Limitation: No Direct Terminal Session

### Interpretation

Professional Product의 density는 한 화면에 보이는 정보량뿐 아니라 related task 사이의 transition cost로 평가할 수 있다.

### Candidate Principle

Professional Workflow Density는 하나의 Surface에 있는 information quantity뿐 아니라 연속 task 사이의 transition cost로 평가해야 할 수 있다.

### User Benefit

Workflow Efficiency, Professional Scalability, Information Density Control

### Potential Trade-off

높은 학습 비용, Function 발견 어려움, Context Linking 불확실성, Workspace Persistence 미확인, Institutional Access 의존

### Evidence Limitation

Official Product Description Only / Institutional Access Required / Not Verified

### Scope Limitation

Product responsibility 기준이다. actual workflow speed, command efficiency, context propagation은 확인하지 않았다.

### Needs Cross Validation

YES

### Candidate Validation Targets

SaveTicker, TradingView, Koyfin, Finviz, Yahoo Finance

### DATE Implication

DATE의 전문 Workflow 효율을 Information Density가 아닌 transition cost 기준으로 측정할 수 있는지 검토해야 한다.

### Confidence

Medium

## Cross Benchmark Classification

### Shared Pattern

- P-007 Source / Freshness / Entitlement Signal
- P-018 Table / Chart role separation
- P-025 Repeated row and table grammar
- P-027 Provider identity as Trust calibration

### Variant Pattern

- P-001 Bloomberg Public Portal vs professional workflow split
- P-009 Product Layer specialization and Context Transfer risk
- P-017 Command Entry vs Search Entry
- P-026 Public Portal Entry vs professional workflow layer
- P-029 Workflow Density vs Information Density

### Benchmark-specific Pattern

- P-028 Product Family Layering
- Terminal Function Model
- Enterprise Entitlement Model
- Data License / API / B-PIPE Integration
- Instant Bloomberg Collaboration

### Potential Contradiction

직접 반대 Evidence는 생성하지 않았다.

### Insufficient Evidence

- P-014 Personal Continuity persistence
- P-021 Workspace Context Linking
- Terminal Command Autocomplete
- Recent / Favorites
- Function Execution Detail
- Security Context Linking
- Workspace Save / Restore
- Launchpad Persistence
- Bloomberg Anywhere Continuity
- Portfolio Calculation UI
- Collaboration Context Linking
- API / Excel Field Lineage
- Public Search Result Grouping
- Quote Full Body
- Article Return Path
- Exchange Entitlement Behavior

## DATE Research 영향

Bloomberg는 Product Boundary, Professional Workflow Density, Source / Provider / Entitlement separation, Table / Chart responsibility, Product Family Layering을 강화한다. 동시에 No Direct Terminal Session, Workspace Persistence 미확인, Security Context Linking 미확인, Excel / API Field Lineage 미확인이 강한 Scope Limitation으로 남는다.
