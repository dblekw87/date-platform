# Bloomberg Strengths, Frictions and Open Questions

## 문서 목적

이 문서는 Phase 6.1~6.3 Bloomberg Observation을 기반으로 Structural Strength, User Friction, Access / Entitlement Friction, Workflow Trade-off, Context Loss, Open Question을 정리한다.

Candidate Principle은 작성하지 않는다. Bloomberg Terminal 직접 session이 없으므로 Terminal 관련 Strength는 Product Description 기반 후보로 제한한다.

## Structural Strength 요약

| Strength ID | Pattern Name | Category | Evidence Level | User Benefit | Candidate Principle Readiness |
| --- | --- | --- | --- | --- | --- |
| BBG-STR-001 | Product Family Boundary | Product Boundary Strength | Observed / Official Product Description | Market Orientation, Workflow Efficiency | Ready with Scope Limitation |
| BBG-STR-002 | Access Layer Separation | Product Boundary Strength | Observed / Official Pricing / Product Description | Trust Calibration | Ready with Scope Limitation |
| BBG-STR-003 | Public Web and Terminal Responsibility Split | Product Boundary Strength | Observed / Official Product Description | Decision Speed | Ready |
| BBG-STR-004 | Bloomberg.com Home Portal Entry | Public Web Strength | Partially Observed | Market Orientation, Discoverability | Benchmark-specific |
| BBG-STR-005 | Markets Table Comparison | Public Web Strength | Observed | Comparison Efficiency | Ready |
| BBG-STR-006 | Market Data Footer Entry Set | Public Web Strength | Observed / Partial | Discoverability | Ready with Scope Limitation |
| BBG-STR-007 | Article and Subscription Boundary | Public Web Strength | Partially Observed / Official Pricing | Trust Calibration | Ready with Scope Limitation |
| BBG-STR-008 | Terminal Workspace as Professional Environment | Terminal Strength Candidate | Official Product Description Only | Workflow Efficiency, Professional Scalability | Ready with Scope Limitation |
| BBG-STR-009 | Function-oriented Navigation Candidate | Terminal Strength Candidate | Official Product Description Only | Decision Speed, Expert Scalability | Needs Additional Evidence |
| BBG-STR-010 | Launchpad Monitor Composition Candidate | Workspace Strength Candidate | Official Product Description Only | Information Density Control | Needs Additional Evidence |
| BBG-STR-011 | Terminal News Monitoring Stack | Professional Workflow Strength | Official Product Description Only | Decision Speed, Market Orientation | Ready with Scope Limitation |
| BBG-STR-012 | Portfolio & Risk Analytics Responsibility | Professional Workflow Strength | Official Product Description Only | Risk Awareness | Ready with Scope Limitation |
| BBG-STR-013 | Data Integration Boundary | Trust / Evidence Strength | Official Product Description / Documentation | Data Portability | Benchmark-specific |
| BBG-STR-014 | Bloomberg Original News Source | Trust / Evidence Strength | Partially Observed | Evidence Traceability | Ready with Scope Limitation |
| BBG-STR-015 | Enterprise Entitlement Boundary | Trust / Evidence Strength | Official Product Description / Sales | Trust Calibration | Benchmark-specific |

Structural Strength 수: 15

## Product Boundary Strength

### BBG-STR-001 — Product Family Boundary

Observation:
Bloomberg Product Family는 Bloomberg Terminal, Bloomberg Professional Services, Bloomberg Anywhere, Bloomberg.com, Bloomberg Markets, Bloomberg News, Enterprise Data, Supporting Media, Separate Domain으로 분리되어 기록되었다.

Evidence Level:
Observed / Official Product Description

Why It May Work:
Product군을 delivery environment와 access level별로 나누면 Public awareness, professional workflow, enterprise data delivery를 혼합하지 않고 책임을 분리할 수 있다.

User Benefit:
Market Orientation, Workflow Efficiency

Conditions Required:
각 Product Layer의 entry, access boundary, entitlement label이 명확해야 한다.

Potential Trade-off:
Product Family가 넓어 entry 결정 비용이 커질 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-002 — Access Layer Separation

Observation:
Public Access, Digital Subscription, Institutional Contract, Login Required, Enterprise / Additional Product Required가 별도 access boundary로 기록되었다.

Evidence Level:
Observed / Official Pricing / Official Product Description

Why It May Work:
Access Level별 data depth와 workflow access를 분리하면 user가 Public Web과 professional product의 차이를 이해할 수 있다.

User Benefit:
Trust Calibration

Conditions Required:
restricted capability와 restricted data가 Product 안에서 명확히 표시되어야 한다.

Potential Trade-off:
Institutional entitlement와 exchange entitlement가 복잡하면 user-facing clarity가 낮아질 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-003 — Public Web and Terminal Responsibility Split

Observation:
Public Web은 News, Markets, Article, Subscription 중심이고 Terminal은 data, News, analytics, execution, collaboration, Portfolio / Risk 중심 professional environment로 기록되었다.

Evidence Level:
Observed / Official Product Description

Why It May Work:
Public user와 financial professional의 task가 다르기 때문에 Product responsibility를 분리하면 목적별 density와 access model을 다르게 설계할 수 있다.

User Benefit:
Decision Speed

Conditions Required:
두 Product Layer 사이의 expectation과 access route가 분명해야 한다.

Potential Trade-off:
Public Web에서 Terminal-level context로 이어지는 continuity는 확인되지 않았다.

Candidate Principle Readiness:
Ready

## Public Web Strength

### BBG-STR-004 — Bloomberg.com Home Portal Entry

Observation:
Home은 Top News, Latest, In Focus, Video, Market Data footer, category Navigation, Subscribe CTA를 함께 노출하는 Public Web entry로 기록되었다.

Evidence Level:
Partially Observed

Why It May Work:
Public user가 News, media, Market data, Subscription entry를 한 entry에서 선택할 수 있다.

User Benefit:
Market Orientation, Discoverability

Conditions Required:
Portal content와 research entry의 priority가 명확해야 한다.

Potential Trade-off:
Portal content mixing이 research focus를 약화할 수 있다.

Candidate Principle Readiness:
Benchmark-specific

### BBG-STR-005 — Markets Table Comparison

Observation:
Markets, Stocks, Futures, Commodities는 Public Product에서 Table, Quote Strip, News List, Market category entry를 제공하는 Surface로 기록되었다.

Evidence Level:
Observed

Why It May Work:
Asset class별 Table 반복은 public Market comparison 비용을 낮출 수 있다.

User Benefit:
Comparison Efficiency

Conditions Required:
row-to-detail transition과 update state가 명확해야 한다.

Potential Trade-off:
Quote detail이나 contract detail이 연결되지 않으면 scan 이후 validation이 끊길 수 있다.

Candidate Principle Readiness:
Ready

### BBG-STR-006 — Market Data Footer Entry Set

Observation:
Market Data footer는 Stocks, Commodities, Rates & Bonds, Currencies, Futures, Sectors, Economic Calendar entry를 제공한다. Sectors와 Economic Calendar body는 Not Verified다.

Evidence Level:
Observed / Partial

Why It May Work:
Home Portal에서 asset class Surface로 빠르게 진입하는 compressed entry set으로 작동할 수 있다.

User Benefit:
Discoverability

Conditions Required:
각 entry가 실제 Market data Surface로 이어져야 한다.

Potential Trade-off:
entry만 많고 body depth가 다르면 expectation mismatch가 생긴다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-007 — Article and Subscription Boundary

Observation:
Article Surface와 Subscription Landing은 기록되었고, article body depth와 paywall behavior는 article별로 달라질 수 있다.

Evidence Level:
Partially Observed / Official Pricing

Why It May Work:
Public Article과 subscription boundary는 content access depth를 분리한다.

User Benefit:
Trust Calibration

Conditions Required:
article access state와 subscriber-only boundary가 명확해야 한다.

Potential Trade-off:
Digital Subscription boundary가 Evidence 확인 depth를 제한할 수 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

## Terminal Strength Candidate

### BBG-STR-008 — Terminal Workspace as Professional Environment

Observation:
Terminal은 data, News, analytics, execution, collaboration, Workspace, Launchpad, Portfolio Analytics를 professional workflow environment로 묶는 Product로 기록되었다.

Evidence Level:
Official Product Description Only / Institutional Access Required

Why It May Work:
Professional user가 여러 task를 하나의 environment 안에서 처리할 수 있는 구조 후보가 된다.

User Benefit:
Workflow Efficiency, Professional Scalability

Conditions Required:
Security Context, Function entry, Workspace composition이 실제로 잘 연결되어야 한다.

Potential Trade-off:
No Direct Terminal Session이므로 actual interaction efficiency는 확인되지 않았다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-009 — Function-oriented Navigation Candidate

Observation:
Command Entry와 Function은 Terminal operation unit 또는 Capability 후보로 기록되었다. Function Code, autocomplete, history, favorites는 Not Verified다.

Evidence Level:
Official Product Description Only / Not Verified

Why It May Work:
Function 단위 entry는 page Navigation보다 professional task 전환을 압축할 수 있다.

User Benefit:
Decision Speed, Expert Scalability

Conditions Required:
Function discovery와 command disambiguation이 실제로 learnable해야 한다.

Potential Trade-off:
Function Code 학습 비용과 entry barrier가 크다.

Candidate Principle Readiness:
Needs Additional Evidence

## Professional Workflow Strength

### BBG-STR-010 — Launchpad Monitor Composition Candidate

Observation:
Launchpad는 customized multi-asset monitors, alerts, charts, News를 제공하는 Workspace / Monitor 후보로 기록되었다.

Evidence Level:
Official Product Description Only

Why It May Work:
Monitor, Chart, Alert, News를 professional monitoring context로 묶을 수 있다.

User Benefit:
Information Density Control

Conditions Required:
layout save, restore, linking, Security Context sharing이 실제로 확인되어야 한다.

Potential Trade-off:
Workspace 설정 비용과 persistence uncertainty가 있다.

Candidate Principle Readiness:
Needs Additional Evidence

### BBG-STR-011 — Terminal News Monitoring Stack

Observation:
Terminal News는 Top News, First Word, Daybreak, Morning Report, News Trends, News Alerts로 기록되었다.

Evidence Level:
Official Product Description Only

Why It May Work:
News가 headline consumption을 넘어 briefing, trend, alert와 연결되면 professional monitoring density를 제공할 수 있다.

User Benefit:
Decision Speed, Market Orientation

Conditions Required:
timestamp, related Security, alert trigger가 actual UI에서 명확해야 한다.

Potential Trade-off:
alert builder와 exact screen transition은 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-012 — Portfolio & Risk Analytics Responsibility

Observation:
Portfolio & Risk Analytics는 positions, risk, performance, attribution, scenario analysis를 제공하는 Product responsibility로 기록되었다.

Evidence Level:
Official Product Description Only

Why It May Work:
Portfolio decision이 holding view를 넘어 risk, scenario, attribution으로 확장될 수 있다.

User Benefit:
Risk Awareness

Conditions Required:
calculation model, position Source, import state, entitlement boundary가 명확해야 한다.

Potential Trade-off:
actual Portfolio UI와 methodology는 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

## Trust / Evidence Strength

### BBG-STR-013 — Data Integration Boundary

Observation:
Data License, Server API, B-PIPE, Excel Add-ins / API Components는 enterprise data delivery와 integration 후보로 기록되었다.

Evidence Level:
Official Product Description / Official Documentation

Why It May Work:
Evidence와 Market data를 UI 밖의 spreadsheet, API, feed, enterprise delivery로 확장할 수 있다.

User Benefit:
Data Portability

Conditions Required:
field-level Source, timestamp, entitlement, refresh behavior가 유지되어야 한다.

Potential Trade-off:
Data Lineage와 entitlement complexity가 높아질 수 있다.

Candidate Principle Readiness:
Benchmark-specific

### BBG-STR-014 — Bloomberg Original News Source

Observation:
Bloomberg.com Article은 Bloomberg Original News story Surface로 기록되었다. Terminal News도 Bloomberg product responsibility에 포함된다.

Evidence Level:
Partially Observed / Official Product Description

Why It May Work:
News Source가 Product 자체와 결합되면 external routing 없이 content depth를 제공할 수 있다.

User Benefit:
Evidence Traceability

Conditions Required:
author, timestamp, related Security, Source metadata가 actual UI에서 명확해야 한다.

Potential Trade-off:
Article return path와 related Security links는 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

### BBG-STR-015 — Enterprise Entitlement Boundary

Observation:
Terminal, Bloomberg Anywhere, Professional App, Data License, Server API, B-PIPE는 Institutional Access Required, Login Required, Enterprise / Additional Product Required로 구분된다.

Evidence Level:
Official Product Description / Sales

Why It May Work:
Professional data access와 enterprise workflow를 Product Layer별로 통제할 수 있다.

User Benefit:
Trust Calibration

Conditions Required:
entitlement state와 unavailable data reason이 user-facing UI에서 명확해야 한다.

Potential Trade-off:
Exchange entitlement와 organization permission이 복잡해질 수 있다.

Candidate Principle Readiness:
Benchmark-specific

## User Friction

| Friction ID | Trigger | Affected User | Affected Product Layer | Affected Surface / Function | Observation Status | User Cost | Decision Impact | Workflow Impact | Workaround | Access Restriction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-FRC-001 | Terminal 접근 불가 | researcher | Terminal | all Terminal functions | Institutional Access Required | actual behavior 검증 불가 | High | High | official description만 사용 | Institutional | High | Terminal session 필요 |
| BBG-FRC-002 | Command Entry 모델 | novice professional | Terminal | Command Entry | Not Verified | 학습 비용 | Medium | High | education / help 필요 | Institutional | Medium | autocomplete 존재 여부 |
| BBG-FRC-003 | Function discovery | new professional user | Terminal | Function | Not Verified | Function 찾기 비용 | Medium | High | Function Help candidate | Institutional | Low | related function Navigation |
| BBG-FRC-004 | Workspace 설정 | professional user | Terminal | Workspace / Launchpad | Product Description / Not Verified | 설정 비용 | Medium | Medium | templates candidate | Institutional | Medium | save / restore mechanics |
| BBG-FRC-005 | Security Context Linking 미확인 | professional user | Terminal | Linked Window | Not Verified | context loss risk | High | High | manual re-entry candidate | Institutional | Low | linked window behavior |
| BBG-FRC-006 | Public / Terminal 단절 | public to professional user | Public Web / Terminal | Quote / Terminal | Inference | context transfer 불명확 | Medium | Medium | Request Demo / Terminal access | Institutional | Medium | public ticker to Terminal context |
| BBG-FRC-007 | Public Search Result Grouping 미확인 | public user | Public Web | Search | Not Verified | result interpretation 비용 | Medium | Low | direct URL / category nav | Public | Low | result taxonomy |
| BBG-FRC-008 | Markets row origin | public investor | Public Web | Markets / Quote | Not Verified | origin context loss | Medium | Low | browser back candidate | Public | Medium | row-to-Quote behavior |
| BBG-FRC-009 | Article return path | public reader | Public Web | Article | Not Verified | previous context loss | Medium | Low | browser back candidate | Public / Subscription | Medium | related Security links |
| BBG-FRC-010 | Quote full body 제한 | public investor | Public Web | Quote | Partially Observed | detail 확인 제한 | High | Medium | alternate ticker / retry | Public / bot challenge | Medium | full module inventory |
| BBG-FRC-011 | Digital Subscription boundary | public reader | Digital Subscription | Article | Observed / Partial | content depth 제한 | Medium | Low | subscribe | Subscription | High | subscriber UI |
| BBG-FRC-012 | Institutional Contract boundary | professional candidate | Terminal | Terminal | Product Description | access barrier | High | High | Request Demo | Institutional | High | trial / sales route |
| BBG-FRC-013 | Exchange Entitlement complexity | professional user | Terminal / Enterprise | Market data | Not Verified | data availability 해석 비용 | High | High | admin / support | Exchange Entitlement | Low | entitlement label |
| BBG-FRC-014 | Enterprise Product 조합 복잡성 | organization | Enterprise Data | Data License / API / B-PIPE | Product Description | product selection 비용 | Medium | Medium | sales consultation | Enterprise | Medium | product overlap |
| BBG-FRC-015 | Portfolio import 미확인 | PM / risk user | Terminal | Portfolio & Risk Analytics | Not Verified | data setup 비용 | High | High | manual / enterprise import candidate | Institutional | Medium | import source |
| BBG-FRC-016 | Portfolio calculation UI 미확인 | PM / risk user | Terminal | Portfolio Analytics | Not Verified | methodology trust 비용 | High | High | documentation candidate | Institutional | Medium | model assumptions |
| BBG-FRC-017 | Collaboration Context Linking 미확인 | professional user | Terminal | IB / MSG / NOTE | Not Verified | shared context loss | Medium | Medium | manual link candidate | Institutional | Medium | structured data link |
| BBG-FRC-018 | Excel / API Field Lineage 미확인 | developer / analyst | Enterprise Data | Excel / API | Not Verified | Source 검증 비용 | High | Medium | field documentation candidate | Enterprise | Medium | field-level lineage |
| BBG-FRC-019 | Anywhere continuity 미확인 | Terminal subscriber | Bloomberg Anywhere | Anywhere / App | Login Required / Not Verified | resume uncertainty | Medium | Medium | direct Terminal session | Login / Institutional | Low | post-login state |
| BBG-FRC-020 | Product Family breadth | broad user | all layers | Product family | Observed / Product Description | entry 결정 비용 | Medium | Medium | Product Boundary documentation | varies | Medium | best entry per user |
| BBG-FRC-021 | Portal content mixing | public reader | Public Web | Home | Partially Observed | priority 판단 비용 | Medium | Low | Markets direct entry | Public | Medium | Home order |
| BBG-FRC-022 | Professional Workflow description-only | researcher | Terminal | Workflows | Product Description | validation gap | High | High | Terminal session / demo | Institutional | High | actual continuous workflow |
| BBG-FRC-023 | Workspace State vs Surface ambiguity | researcher | Terminal | Workspace / Launchpad | Product Description / Not Verified | responsibility 분류 비용 | Medium | Medium | future validation | Institutional | Medium | user-owned Entity 여부 |

User Friction 수: 23

## Access / Entitlement Friction

| Access ID | Access Boundary | Product Layer | Restricted Capability | User Impact | Trust Impact | Workflow Impact | Density Impact | Transparency | Evidence Level | Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-ACC-001 | Public Access | Public Web | 일부 Article / Quote depth candidate | 낮음 | Medium | Low | Medium | Medium | Observed / Partial | Ready with Scope Limitation |
| BBG-ACC-002 | Digital Subscription | Bloomberg.com | subscriber-only content | Medium | Medium | Low | Medium | High | Official Pricing | Ready with Scope Limitation |
| BBG-ACC-003 | Login Required | Bloomberg Anywhere / App | remote access / app session | Medium | Medium | Medium | Medium | High | Observed / Product Description | Needs Additional Evidence |
| BBG-ACC-004 | Institutional Contract | Terminal | professional workflow | High | High | High | High | High | Official Product Description | Benchmark-specific |
| BBG-ACC-005 | Exchange Entitlement | Terminal / Enterprise | real-time or exchange data candidate | High | High | High | High | Not Verified | Inference | Needs Additional Evidence |
| BBG-ACC-006 | Additional Product | BI / BNEF / Data License | research / dataset | Medium | Medium | Medium | Medium | Medium | Product Description | Benchmark-specific |
| BBG-ACC-007 | Enterprise Entitlement | API / B-PIPE / Data License | feed / API / data delivery | High | High | High | Medium | Medium | Product Description | Benchmark-specific |

Access / Entitlement Friction 수: 7

## Workflow Trade-off

| Trade-off ID | Workflow Pattern | Benefit | Cost | Evidence Level | Readiness |
| --- | --- | --- | --- | --- | --- |
| BBG-WTO-001 | Security Workflow Density | fast professional chaining candidate | Security Context actual linking Not Verified | Product Description / Not Verified | Needs Additional Evidence |
| BBG-WTO-002 | Market Workflow Density | monitor-to-analysis candidate | movers and row transitions Not Verified | Product Description / Inference | Needs Additional Evidence |
| BBG-WTO-003 | News Workflow Density | briefing / alert / trend stack | timestamp and alert rule Not Verified | Product Description | Ready with Scope Limitation |
| BBG-WTO-004 | Portfolio Workflow Density | risk, scenario, attribution depth | calculation UI Not Verified | Product Description | Ready with Scope Limitation |
| BBG-WTO-005 | Collaboration Workflow Density | shared professional context candidate | structured linking Not Verified | Product Description | Needs Additional Evidence |
| BBG-WTO-006 | Data Workflow Density | Excel / API / feed extension | field lineage Not Verified | Product Description / Documentation | Benchmark-specific |

Workflow Trade-off 수: 6

## Data Integration Trade-off

| Trade-off ID | Integration | Benefit | Cost | Evidence Level | Readiness |
| --- | --- | --- | --- | --- | --- |
| BBG-DTO-001 | Excel Add-ins | spreadsheet workflow | refresh and Source lineage Not Verified | Official Documentation | Needs Additional Evidence |
| BBG-DTO-002 | Server API | application data access | API schema and entitlement not tested | Product Description | Benchmark-specific |
| BBG-DTO-003 | B-PIPE | real-time feed candidate | exchange / enterprise controls complex | Product Description | Benchmark-specific |
| BBG-DTO-004 | Data License | dataset delivery | catalog and delivery schedule Not Verified | Product Description | Benchmark-specific |

Data Integration Trade-off 수: 4

## Context Loss

| Loss ID | Context Loss Point | Status | Affected Flow | Principle Impact |
| --- | --- | --- | --- | --- |
| BBG-CL-001 | Public Article return path | Not Verified | Public Flow | External / internal content relation needs validation |
| BBG-CL-002 | Public Search query after result | Not Verified | Public Flow | Search as entry cannot be generalized yet |
| BBG-CL-003 | Markets row to Quote origin | Not Verified | Public Flow | Table-to-detail continuity needs validation |
| BBG-CL-004 | Public Quote full ticker context | Partially Observed | Public Flow | Quote hub claim must be limited |
| BBG-CL-005 | Terminal Security Context across functions | Not Verified | Professional Workflow | Security Context principle needs more Evidence |
| BBG-CL-006 | Command Entry parsing and disambiguation | Not Verified | Professional Workflow | Function Navigation needs validation |
| BBG-CL-007 | Launchpad Workspace restore | Not Verified | Workspace Flow | Workspace continuity not ready |
| BBG-CL-008 | Panel / Linked Window relation | Not Verified | Workspace Flow | multi-panel claim must be limited |
| BBG-CL-009 | Anywhere session continuity | Not Verified | Anywhere Flow | remote continuity not ready |
| BBG-CL-010 | Worksheet restore | Not Verified | Anywhere Flow | mobile continuity needs validation |
| BBG-CL-011 | Portfolio import source | Not Verified | Portfolio Flow | Portfolio state ownership unclear |
| BBG-CL-012 | Portfolio calculation methodology UI | Not Verified | Portfolio Flow | risk Evidence traceability needs validation |
| BBG-CL-013 | IB / NOTE structured link | Not Verified | Collaboration Flow | collaboration context not ready |
| BBG-CL-014 | Excel / API field lineage | Not Verified | Data Flow | data portability claim must be limited |

Context Loss 지점 수: 14

## Product Responsibility Matrix

| Product Element | Product Layer | Surface | Workspace | Function | Tool | Entity | User-owned Entity | User State | External Evidence | Integration | Capability | Primary Responsibility | Secondary Responsibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bloomberg.com Home | Public Web | Yes | No | No | No | News / Market | No | account candidate | No | No | category entry | Public News and Market entry | Subscription CTA |
| Markets | Public Web | Yes | No | No | No | Market | No | category candidate | No | No | table scan | Market comparison | News entry |
| Market Data | Public Web | Yes | No | No | No | Market / Security | No | No | No | No | asset class entry | Market data access | footer entry |
| Quote | Public Web | Yes | No | No | No | Security | No | ticker candidate | No | No | follow candidate | Security detail candidate | Company Profile candidate |
| Article | Public Web / Digital Subscription | Yes | No | No | No | Article / News | No | subscriber candidate | Bloomberg content | No | read / subscribe | News content | subscription conversion |
| Public Search | Public Web | Tool candidate | No | No | Yes | Keyword / Article candidate | No | query candidate | No | No | Search | query entry | result grouping candidate |
| Subscription | Digital Subscription | Yes | No | No | Form | Subscription | Subscription candidate | entitlement | No | No | Subscribe | Digital access | account state |
| Terminal | Terminal | Yes | Yes | Yes | Yes | Security / Market | No | session / Workspace | No | Yes | command / analytics | professional workflow | collaboration / data |
| Command Entry | Terminal | No | No | Function candidate | Yes | Function / Security | No | recent candidate | No | No | Command Execution | Function / Security access | help candidate |
| Function | Terminal | No | No | Yes | No | Function | No | favorite candidate | No | No | execute | professional task unit | related function candidate |
| Security Lookup | Terminal | No | No | Function Category | Tool | Security | No | Security Context candidate | No | No | lookup | open Security | Company relation candidate |
| Company Research | Terminal | Surface candidate | No | Function Category | Tool | Company / Industry | No | research context candidate | Research report candidate | No | analyze | company / industry research | analyst estimate candidate |
| Chart | Terminal | Yes | No | Function Category | Tool | Security / Market | No | chart state candidate | No | export candidate | compare / annotate | visual analysis | collaboration candidate |
| Terminal News | Terminal | Yes | No | Function Category | Feed | News | No | topic / alert candidate | Bloomberg content | No | monitor | professional News | alert |
| First Word | Terminal | Feed | No | Function Category | Feed | News / Event | No | topic candidate | Bloomberg content | No | scan | breaking digest | alert candidate |
| Daybreak | Terminal | Report | No | Function Category | Report | News / Security list | No | personalization candidate | Bloomberg content | No | read | briefing | security list candidate |
| Alert | Terminal / App | No | No | Function candidate | Tool | News / Security | No | Alert Rule candidate | No | No | notify | monitoring | personal continuity |
| Launchpad | Terminal | Yes | Yes | Function candidate | Tool | Security / Market | No | layout candidate | No | No | compose | monitoring Workspace | alerts / charts |
| Workspace | Terminal | Yes | Yes | No | No | Workspace candidate | candidate | Workspace state | No | No | arrange | professional environment | Context candidate |
| Panel | Terminal | No | Workspace component | No | Tool candidate | Security candidate | No | panel state | No | No | arrange | component candidate | linking candidate |
| Linked Window | Terminal | No | Workspace component | No | Tool candidate | Security candidate | No | linked context | No | No | link | Security Context candidate | Not Verified |
| Worksheet | Bloomberg Anywhere / App | Surface candidate | Workspace candidate | No | Tool candidate | Watchlist / Security | candidate | worksheet state | No | No | monitor | mobile continuity candidate | watch list candidate |
| Portfolio & Risk Analytics | Terminal | Yes | Dashboard candidate | Function Category | Tool | Portfolio | Portfolio | portfolio state | report candidate | No | risk / attribution | Portfolio workflow | enterprise scale |
| Position | Terminal | No | No | No | No | Position | Position candidate | position state | No | No | analyze | Portfolio component | risk input |
| Risk | Terminal | Dashboard candidate | No | Function Category | Tool | Risk Factor | No | model state candidate | model candidate | No | scenario | risk analysis | attribution |
| Instant Bloomberg | Terminal | Panel candidate | No | Function | Tool | Message / User | Message Thread candidate | chat state | shared content candidate | Yes | Message | collaboration | structured data link candidate |
| MSG | Terminal / App | Panel candidate | No | Function candidate | Tool | Message / User | Message Thread candidate | chat state | No | Yes | Message | messaging | app continuity |
| NOTE | Terminal | Tool candidate | No | Function candidate | Tool | Research Note | Research Note candidate | note state | research content | Yes | save / publish | research sharing | tagging candidate |
| Bloomberg Anywhere | Bloomberg Anywhere | Yes | remote Workspace access candidate | Terminal access candidate | No | User | No | Anywhere Session | No | Yes | remote login | Terminal access | continuity candidate |
| Professional App | Bloomberg Anywhere | Yes | worksheet access candidate | mobile function subset | Tool | Security / Message | Watchlist candidate | notification state | No | Yes | alert / messaging | mobile Terminal companion | Today / Data |
| Excel Add-in | Integration | No | No | No | Tool | Data Field | No | spreadsheet state | field candidate | Yes | export / refresh | spreadsheet workflow | API component |
| Data License | Enterprise Data | No | No | No | Data product | Dataset / Security | Dataset candidate | entitlement | dataset candidate | Yes | acquire | enterprise data delivery | DATA candidate |
| B-PIPE | Enterprise Data | No | No | No | Feed | Security / Exchange | No | entitlement | data feed | Yes | consume feed | real-time market data feed | cloud access |
| Server API | Enterprise Data | No | No | No | API | Security / Data Field | No | entitlement | API result | Yes | query | application data access | calculation engine candidate |
| Bloomberg Intelligence | Supporting / Terminal | Research Surface candidate | No | Function candidate | Research product | Company / Industry | No | research context | research report | No | analyze | provider research | analyst estimate candidate |
| BloombergNEF | Supporting | Research Surface candidate | No | No | Research product | Energy / Commodity / Policy candidate | No | subscription state | report | No | read | strategic research | supporting scope |

Product Responsibility Matrix 항목 수: 36

## Cross Benchmark Note

### Shared Pattern

- Entity / Security Context Hub
- Multi-surface Research
- News와 Market Data 연결
- Source / Freshness Signal
- Watch / Alert
- Chart와 Data Table 역할 분리

### Variant Pattern

- Function-oriented Navigation vs Page Navigation
- Workspace-centered Workflow vs Quote-centered Research
- Command Entry vs Search Entry
- Professional Workflow Density vs Public Information Density
- Embedded News vs External Article Routing
- Enterprise Data Integration vs CSV Export
- Institutional Entitlement vs Premium Subscription

### Benchmark-specific Pattern

- Bloomberg Terminal Function Model
- Security Context-linked Workspace candidate
- Instant Bloomberg Collaboration
- Bloomberg Anywhere Continuity Candidate
- Market Data to Excel / API / B-PIPE Integration
- Product Family Layering
- Enterprise Entitlement Model

### Potential Contradiction

직접 반대 Evidence는 없다. UI 차이는 Variant Pattern으로만 기록한다.

### Insufficient Evidence

- Command Autocomplete
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

## Do Not Copy

- Terminal Function model을 DATE의 Navigation 방식으로 확정하지 않는다.
- Security Context-linked Workspace를 실제 확인 없이 Product Principle로 일반화하지 않는다.
- Enterprise entitlement model을 일반 consumer product access model로 복제하지 않는다.
- Bloomberg Original News와 Bloomberg Terminal data depth를 DATE의 기본 Source model로 확정하지 않는다.
- Workspace Density를 단순히 많은 panel을 배치하는 UI로 축소하지 않는다.

## Open Question

| Question | Affected Document | Current Status | Future Validation Target | Principle Impact |
| --- | --- | --- | --- | --- |
| Terminal Command Autocomplete가 Security와 Function을 어떻게 구분하는가 | 04, 05, 09 | Not Verified | Terminal session | Function Navigation readiness |
| Recent / Favorites가 Function, Security, IB에서 존재하는가 | 04, 06 | Not Verified | Terminal session | Personal continuity |
| Function 실행 방식이 Workflow를 어떻게 압축하는가 | 05, 09 | Not Verified | Terminal session / official demo | Workflow Density |
| Security Context Linking이 실제로 유지되는가 | 06, 09 | Not Verified | Terminal session | Context Preservation |
| Launchpad Save / Restore가 어떤 단위로 작동하는가 | 05, 06, 09 | Not Verified | Terminal session | Workspace principle readiness |
| Bloomberg Anywhere가 Workspace를 복원하는가 | 05, 09 | Not Verified | Bloomberg Anywhere session | remote continuity |
| Public Search Result Grouping이 Article / Topic / Company / Security를 나누는가 | 04, 05 | Not Verified | Public Product follow-up | Search pattern |
| Quote Full Body가 어떤 module priority를 갖는가 | 02, 03, 07 | Partially Observed | Public Quote access | Quote hub scope |
| Markets Row Origin Context가 Quote에서 유지되는가 | 05, 09 | Not Verified | Public Product follow-up | table-to-detail continuity |
| Article Return Path가 related Security와 연결되는가 | 05, 09 | Not Verified | Public Article follow-up | News Evidence Flow |
| Portfolio Import / Calculation UI가 어떤 Source를 갖는가 | 05, 08 | Not Verified | Terminal session | risk Evidence |
| Instant Bloomberg Context Linking이 Security / Research와 연결되는가 | 05, 09 | Not Verified | Terminal session | collaboration context |
| Excel / API Source Lineage가 field-level로 유지되는가 | 08, 09 | Not Verified | API / Excel access | data portability |
| Exchange Entitlement Behavior가 UI에 어떻게 표시되는가 | 08, 09 | Not Verified | Terminal session | trust and access |
