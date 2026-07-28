# Bloomberg Trust and Evidence Observations

## 문서 목적

이 문서는 Phase 6.1~6.2 Bloomberg Observation을 기반으로 Trust / Evidence 관련 Source, Provider, Freshness, Methodology, Entitlement 후보를 정리한다.

Bloomberg Terminal, Portfolio Analytics, Enterprise Data, API 관련 내용은 직접 사용하지 않았다. Official Product Description 또는 Official Documentation 기준으로만 기록한다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Environment | Desktop web extraction / official URL review |
| Bloomberg.com Public Access | Partially Observed |
| Bloomberg Account Login | Not Logged In |
| Digital Subscription | No Digital Subscription |
| Bloomberg Terminal Access | No Direct Terminal Session |
| Bloomberg Anywhere Access | No Bloomberg Anywhere session |
| Secondary Source | Not Used |

## Trust / Evidence Observation 요약

| Observation ID | Area | Trust / Evidence Signal | Evidence Type | Observation Status | Confidence |
| --- | --- | --- | --- | --- | --- |
| BBG-TRU-001 | Public Web | Bloomberg Original News Article Surface | Official Product Observation | Partially Observed | High |
| BBG-TRU-002 | Public Web | Subscription boundary for content depth | Official Pricing / Sales | Observed / Partially Observed | High |
| BBG-TRU-003 | Public Web | Markets table and Top Securities | Official Product Observation | Observed | High |
| BBG-TRU-004 | Public Web | Public Quote / Key Statistics candidate | Official Product Observation | Partially Observed | Medium |
| BBG-TRU-005 | Public Web | Search as Article / Topic / Company candidate | Official Product Observation / Inference | Partially Observed / Not Verified | Low |
| BBG-TRU-006 | Terminal | Terminal real-time Market Data responsibility | Official Product Description | Official Product Description | High |
| BBG-TRU-007 | Terminal | Terminal-integrated Bloomberg News | Official Product Description | Official Product Description | High |
| BBG-TRU-008 | Terminal | News Alerts and event monitoring candidate | Official Product Description | Official Product Description | Medium |
| BBG-TRU-009 | Terminal | Bloomberg Intelligence research provider | Official Product Description | Official Product Description | Medium |
| BBG-TRU-010 | Terminal | Portfolio & Risk Analytics methodology candidate | Official Product Description | Official Product Description | Medium |
| BBG-TRU-011 | Enterprise Data | Data License dataset delivery | Official Product Description | Official Product Description | High |
| BBG-TRU-012 | Enterprise Data | Server API and B-PIPE data access | Official Product Description | Official Product Description | Medium |
| BBG-TRU-013 | Integration | Excel Add-ins / API Components | Official Documentation | Official Documentation Only | Medium |
| BBG-TRU-014 | Access | Entitlement and institutional boundary | Official Product Description / Sales | Observed / Product Description | High |

Trust / Evidence Observation 수: 14

## Market Data

### BBG-TRU-003 — Public Markets Table Signal

Observation:
Bloomberg.com Markets, Stocks, Futures, Commodities, Currencies, Rates & Bonds는 table 또는 quote strip 형태의 Public Market data Surface로 기록되었다.

Evidence Type:
Official Product Observation

Trust Contribution:
Public user가 Bloomberg.com 안에서 asset class별 Market data를 확인할 수 있는 entry를 제공한다.

Traceability:
Public page-level Source는 Bloomberg.com이다. 개별 Metric의 provider, calculation, update cadence는 이번 Observation에서 확인하지 않았다.

Limitation:
row-to-Quote transition, detail page depth, current update timestamp는 Not Verified다.

DATE Implication:
Public Market table이 Source visibility 없이도 initial orientation에 충분한지 Cross Benchmark에서 비교할 필요가 있다.

Confidence:
High

### BBG-TRU-006 — Terminal Market Data Responsibility

Observation:
Bloomberg Terminal은 official Product Description에서 real-time Market data, historical data, analytics, trading, News, collaboration을 professional workflow로 제공하는 Product로 기록되었다.

Evidence Type:
Official Product Description

Trust Contribution:
Terminal은 professional user의 primary Market data environment로 설명된다.

Traceability:
Exchange entitlement, data provider display, item-level Source visibility는 직접 확인하지 않았다.

Limitation:
Terminal session이 없으므로 Freshness 표시, entitlement error, individual data Source UI는 Not Verified다.

DATE Implication:
Professional Product의 Trust는 Public Source label보다 entitlement, data contract, workflow integration에 의해 형성될 수 있는지 검증해야 한다.

Confidence:
High for Product responsibility, Low for actual UI evidence.

## News

### BBG-TRU-001 — Bloomberg Original News Article Surface

Observation:
Bloomberg.com Article은 Bloomberg Original News story Surface로 기록되었다. Article body depth와 paywall behavior는 article별로 다를 수 있다.

Evidence Type:
Official Product Observation

Trust Contribution:
Bloomberg 자체 Article Surface는 Public Web News와 Digital Subscription의 content Source 역할을 한다.

Traceability:
Article page가 Bloomberg-owned content Surface라는 점은 확인했지만, related Company / Security links와 return path는 Not Verified다.

Limitation:
author, timestamp, full body, subscription gate detail은 이번 단계에서 상세 분석하지 않았다.

DATE Implication:
News가 자체 Source일 때 external Evidence Link보다 in-product content depth가 더 중요한지 비교할 필요가 있다.

Confidence:
High for Surface, Medium for content structure.

### BBG-TRU-007 — Terminal-integrated News

Observation:
Terminal News는 Top News, First Word, Daybreak, Morning Report, News Trends, News Alerts를 official Product Description에서 설명한다.

Evidence Type:
Official Product Description

Trust Contribution:
Professional Workflow에서 News가 separate Article consumption이 아니라 monitoring, briefing, alert와 연결될 수 있음을 보여준다.

Traceability:
Terminal News item의 timestamp, related Security, Source field, alert trigger는 Not Verified다.

Limitation:
Terminal 내부 screen transition과 item-level metadata는 직접 확인하지 않았다.

DATE Implication:
News Evidence가 user workflow에 embedded될 때 Source와 timestamp가 어떤 level로 표시되어야 하는지 후속 Benchmark에서 확인해야 한다.

Confidence:
High for Product responsibility, Medium for metadata detail.

### BBG-TRU-008 — News Alerts Candidate

Observation:
News Alerts는 Terminal News와 Professional App의 alert 후보로 기록되었다.

Evidence Type:
Official Product Description

Trust Contribution:
Freshness-sensitive Event를 user에게 전달하는 monitoring mechanism 후보로 작동할 수 있다.

Traceability:
Alert rule builder, trigger condition, delivery timestamp, dismissal state는 Not Verified다.

Limitation:
Alert behavior는 actual Terminal / App session이 필요하다.

DATE Implication:
Alert가 Evidence delivery인지 Personal Continuity state인지 분리 검증해야 한다.

Confidence:
Medium

## Provider

### BBG-TRU-009 — Bloomberg Intelligence Research Provider

Observation:
Bloomberg Intelligence는 industry, company, region research와 analyst recommendations / estimates 후보를 제공하는 research product로 기록되었다.

Evidence Type:
Official Product Description

Trust Contribution:
Research module이 provider identity를 가질 수 있음을 보여준다.

Traceability:
individual Analyst profile, report methodology, module UI, original data links는 Not Verified다.

Limitation:
Additional Product 여부와 Terminal module structure는 직접 확인하지 않았다.

DATE Implication:
Provider identity와 methodology visibility를 분리해 Cross Benchmark에서 비교해야 한다.

Confidence:
Medium

## Timestamp와 Freshness

### BBG-TRU-002 — Subscription Boundary for Content Freshness / Depth

Observation:
Digital Subscription은 Bloomberg.com and app access, subscriber-only content, newsletters, live TV / radio, narrated articles 후보와 연결된다.

Evidence Type:
Official Pricing / Sales

Trust Contribution:
Content access depth와 delivery channel이 subscription state에 따라 달라질 수 있음을 명시한다.

Traceability:
Subscriber-only Article의 timestamp, archive access, personalization behavior는 Not Verified다.

Limitation:
No Digital Subscription 상태이므로 subscriber UI를 확인하지 않았다.

DATE Implication:
Access boundary가 Evidence depth와 Freshness access를 동시에 바꾸는지 검증해야 한다.

Confidence:
High for boundary, Low for subscriber behavior.

## Professional Analytics

### BBG-TRU-010 — Portfolio & Risk Analytics Methodology Candidate

Observation:
Portfolio & Risk Analytics는 positions, risk, performance, attribution, scenario analysis, PORT Enterprise 후보로 기록되었다.

Evidence Type:
Official Product Description

Trust Contribution:
Portfolio decision의 Evidence가 individual Security data뿐 아니라 risk model, scenario, attribution 같은 analytics layer로 확장될 수 있다.

Traceability:
calculation methodology, model assumptions, position Source, holdings import, report audit trail은 Not Verified다.

Limitation:
actual Portfolio UI와 data import는 직접 확인하지 않았다.

DATE Implication:
Portfolio Evidence는 Metric display뿐 아니라 model assumption과 data lineage를 함께 검증해야 한다.

Confidence:
Medium

## Data License / API / Excel

### BBG-TRU-011 — Data License Dataset Delivery

Observation:
Data License는 enterprise dataset discovery, acquisition, delivery Product로 기록되며 DATA <GO> / Data.Bloomberg.com 후보와 연결된다.

Evidence Type:
Official Product Description

Trust Contribution:
Bloomberg ecosystem에서 Evidence Source가 UI 화면을 넘어 enterprise data delivery로 확장될 수 있음을 보여준다.

Traceability:
dataset catalog fields, delivery schedule, legal entity mapping, client portal behavior는 Not Verified다.

Limitation:
client access 없이 Product Description으로만 기록했다.

DATE Implication:
Evidence Traceability가 end-user UI와 enterprise data lineage에서 다르게 설계되는지 확인해야 한다.

Confidence:
High for Product responsibility, Medium for detail.

### BBG-TRU-012 — Server API and B-PIPE Data Access

Observation:
Server API와 B-PIPE / Cloud Access는 real-time, historical, reference data, calculation engine, market data feed 후보로 기록되었다.

Evidence Type:
Official Product Description

Trust Contribution:
Professional Workflow의 Trust는 API / feed entitlement와 application integration까지 확장될 수 있다.

Traceability:
field-level Source, entitlement error, refresh behavior, API response schema는 Not Verified다.

Limitation:
API usage는 테스트하지 않았다.

DATE Implication:
DATE에서 API-driven Evidence를 다룰 때 user-facing Source와 machine-facing Source를 분리해 검증해야 한다.

Confidence:
Medium

### BBG-TRU-013 — Excel Add-ins / API Components

Observation:
Bloomberg Support의 Excel Add-ins / API Components는 Spreadsheet Integration / API 후보로 기록되었다.

Evidence Type:
Official Documentation

Trust Contribution:
Professional user가 data를 spreadsheet workflow로 이동시킬 수 있는 integration boundary를 보여준다.

Traceability:
download entitlement, refresh timestamp, formula syntax, data lineage는 Not Verified다.

Limitation:
Excel Add-in workflow는 직접 수행하지 않았다.

DATE Implication:
Export / spreadsheet integration이 Evidence preservation인지 context loss인지 별도 검증해야 한다.

Confidence:
Medium

## Enterprise / Entitlement

### BBG-TRU-014 — Entitlement and Institutional Boundary

Observation:
Terminal, Bloomberg Anywhere, Professional App, Data License, Server API, B-PIPE는 Institutional Access Required, Login Required, Enterprise / Additional Product Required로 구분된다.

Evidence Type:
Official Product Observation / Official Product Description / Official Pricing / Sales

Trust Contribution:
Access boundary가 data depth, real-time access, professional analytics, mobile continuity, enterprise integration을 제어한다.

Traceability:
organization-level permission, exchange entitlement, user-facing entitlement display는 Not Verified다.

Limitation:
No Institutional Contract 상태이므로 entitlement behavior를 확인하지 않았다.

DATE Implication:
Professional product에서 Trust / Evidence는 Source label뿐 아니라 entitlement visibility가 사용자 판단에 영향을 줄 수 있다.

Confidence:
High for boundary, Low for actual entitlement UI.

## Source Signal

| Signal | Layer | Status | Limitation |
| --- | --- | --- | --- |
| Bloomberg.com Article | Public Web | Partially Observed | full Article metadata not reviewed |
| Bloomberg Markets tables | Public Web | Observed | provider / update cadence not reviewed |
| Bloomberg Terminal Product responsibility | Terminal | Official Product Description | direct session unavailable |
| Bloomberg Intelligence | Terminal / Supporting | Official Product Description | module UI not verified |
| Data License / API | Enterprise Data | Official Product Description | actual data delivery not tested |

## Freshness Signal

| Signal | Status | Limitation |
| --- | --- | --- |
| Terminal real-time Market data responsibility | Official Product Description | actual timestamp and delay display Not Verified |
| Terminal News Alerts | Official Product Description | alert trigger and delivery time Not Verified |
| Public Article timestamp | Not Verified | detailed Article inventory not performed |
| Public Markets update time | Not Verified | time-sensitive table values not analyzed |
| API / feed refresh | Not Verified | integration not tested |

## Provider Signal

| Provider / Product | Status | Note |
| --- | --- | --- |
| Bloomberg News | Observed / Product Description | Bloomberg-owned content product |
| Bloomberg Intelligence | Official Product Description | research provider / product candidate |
| BloombergNEF | Official Product Description | Supporting Scope, not detailed |
| Data License | Official Product Description | enterprise data delivery |
| B-PIPE / Server API | Official Product Description | enterprise data connectivity |

## Methodology Signal

| Methodology Area | Status | Limitation |
| --- | --- | --- |
| Portfolio risk / performance / scenario | Official Product Description | calculation methodology Not Verified |
| Analytics / calculation engine | Official Product Description | formula and model details Not Verified |
| Public Quote statistics | Partially Observed | field definition Not Verified |
| Chart / comparison | Official Product Description | chart calculation and corporate action handling Not Verified |
| Data License dataset structure | Official Product Description | field lineage and schedule Not Verified |

## Open Questions

- Public Markets table의 provider, timestamp, delay가 page에서 어떻게 표시되는가.
- Public Article의 author, timestamp, related Security, subscription gate가 어떤 구조인가.
- Public Quote의 Statistics field definition과 Source가 어디에서 확인되는가.
- Terminal Market data의 exchange entitlement와 Freshness가 UI에 어떻게 표시되는가.
- Terminal News item이 Source, timestamp, related Security를 어떻게 표시하는가.
- Portfolio & Risk Analytics의 model assumption과 report Source가 어떻게 표시되는가.
- Excel Add-in과 API response에서 field-level Source가 유지되는가.
- Enterprise entitlement가 user-facing error 또는 access label로 표시되는가.
