# Bloomberg Information Density Observations

## 문서 목적

이 문서는 Phase 6.1~6.2 Bloomberg Observation을 기반으로 Public Web과 Bloomberg Terminal / Professional Workflow의 Information Density 후보를 분리해 기록한다.

Bloomberg Terminal은 직접 사용하지 않았다. Terminal 관련 Pattern은 실제 Interaction Observation이 아니라 Official Product Description 또는 Official Documentation 기준으로만 기록한다.

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

## Information Density Pattern 요약

| Pattern ID | Layer | Pattern | Classification | Observation Status | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| BBG-DEN-001 | Public Web | Home Portal Density | Information Density / Density Enabler | Partially Observed | Official Product Observation | High |
| BBG-DEN-002 | Public Web | Market Data Footer Entry Density | Density Enabler | Observed / Partially Observed | Official Product Observation | High |
| BBG-DEN-003 | Public Web | Markets Table Density | Information Density / Scan Pattern | Observed | Official Product Observation | High |
| BBG-DEN-004 | Public Web | Asset Class Table Repetition | Density Control | Observed / Partially Observed | Official Product Observation | Medium |
| BBG-DEN-005 | Public Web | Quote Detail Density | Information Density | Partially Observed | Official Product Observation | Medium |
| BBG-DEN-006 | Public Web | Article / Subscription Density Boundary | Density Risk | Partially Observed | Official Product Observation / Official Pricing | Medium |
| BBG-DEN-007 | Terminal | Terminal Workspace Density | Workspace Density / Professional Density | Official Product Description | Official Product Description | High |
| BBG-DEN-008 | Terminal | Launchpad Monitor Density | Workspace Density / Density Control | Official Product Description | Official Product Description | Medium |
| BBG-DEN-009 | Terminal | Function Density | Workflow Density / Professional Density | Official Product Description | Official Product Description | Medium |
| BBG-DEN-010 | Terminal | Security Context Density Candidate | Professional Density | Not Verified | Inference | Low |
| BBG-DEN-011 | Terminal | Terminal News Feed Density | Workflow Density / News Density | Official Product Description | Official Product Description | High |
| BBG-DEN-012 | Terminal | Portfolio & Risk Analytics Density | Workflow Density / Professional Density | Official Product Description | Official Product Description | High |
| BBG-DEN-013 | Bloomberg Anywhere | Remote Workspace Continuity Density | Density Control | Observed / Official Product Description | Official Product Observation / Product Description | Medium |
| BBG-DEN-014 | Enterprise Data | Data / API Density | Professional Density | Official Product Description | Official Product Description | Medium |

Information Density Observation 수: 14

## Public Home Density

### BBG-DEN-001 — Home Portal Density

Observation:
Bloomberg.com Home은 Top News, Latest, In Focus, Video, Market Data footer, category Navigation, Subscribe CTA를 함께 노출하는 Public Web entry로 기록되었다.

Interpretation:
Home은 단일 research task보다 News consumption, Market awareness, media access, subscription entry를 한 Surface에 묶는 Portal Pattern으로 해석된다.

User Impact:
초기 entry에서 여러 목적을 빠르게 선택할 수 있다. 반면 professional research intent가 명확한 user에게는 content priority 판단 비용이 생길 수 있다.

Trade-off:
Portal content, Video, Subscription CTA가 같은 Surface에 배치되므로 research-only Workflow Density와는 다른 cognitive load가 발생할 수 있다.

Evidence:
`BBG-SUR-001`, `BBG-SFI-001`, `BBG-NAV-001`.

Confidence:
High

### BBG-DEN-002 — Market Data Footer Entry Density

Observation:
Bloomberg.com footer Market Data에는 Stocks, Commodities, Rates & Bonds, Currencies, Futures, Sectors, Economic Calendar entry가 기록되었다. Sectors와 Economic Calendar body는 Not Verified다.

Interpretation:
Public Home은 Article 중심 Portal이면서 Market Surface로 이동하는 compressed entry set을 제공하는 것으로 해석된다.

User Impact:
user는 Public Home에서 asset class Surface로 이동할 수 있다. 다만 footer entry는 detailed Market comparison 자체가 아니라 Surface entry에 가깝다.

Trade-off:
entry가 많아 보이지만 각 destination의 depth는 서로 다르며 일부는 Not Verified다.

Evidence:
`BBG-NAV-003`, `BBG-SFI-008`, `BBG-SFI-009`.

Confidence:
High

## Markets Density

### BBG-DEN-003 — Markets Table Density

Observation:
Markets, Stocks, Futures, Commodities는 Public Product에서 table, quote strip, News List, Market category entry를 제공하는 Surface로 기록되었다.

Interpretation:
Markets는 Bloomberg.com Home보다 Market-oriented comparison에 가까운 Surface로 해석된다. 반복 table format은 asset class별 scan을 지원할 수 있다.

User Impact:
Public user는 Equity Index, Futures Contract, Commodity, Currency Pair, Bond / Yield / Interest Rate 후보를 page 단위로 비교할 수 있다.

Trade-off:
row-to-Quote transition, contract detail, full pair detail은 Not Verified이므로 table density가 detail Workflow로 이어지는 수준은 확정할 수 없다.

Evidence:
`BBG-SUR-002`~`BBG-SUR-007`, `BBG-SFI-002`~`BBG-SFI-007`, `BBG-PJ-002`.

Confidence:
High

### BBG-DEN-004 — Asset Class Table Repetition

Observation:
Stocks, Futures, Commodities, Currencies, Rates & Bonds는 서로 다른 Entity Type을 Table 또는 Table candidate로 기록한다.

Interpretation:
Bloomberg.com Public Web은 asset class마다 개별 Surface를 제공하면서도 table 중심 pattern을 반복하는 방식으로 Information Density를 조절할 수 있다.

User Impact:
반복 구조는 학습 후 scan 비용을 낮출 수 있다. 그러나 각 asset class의 detail depth가 다르면 사용자가 같은 기대를 적용하기 어렵다.

Trade-off:
Currencies와 Rates & Bonds는 Partially Observed이며, detail Surface depth는 Not Verified다.

Evidence:
`BBG-SFI-003`~`BBG-SFI-007`.

Confidence:
Medium

## Quote Density

### BBG-DEN-005 — Quote Detail Density

Observation:
Public Quote는 Security / Stock / Equity Index detail 후보로 기록되며 Quote Summary, Chart, Key Statistics, Company Profile candidate가 기록되었다. AAPL direct body는 bot challenge로 제한되었다.

Interpretation:
Quote는 Public Web에서 Security / Stock context를 묶는 detail Surface 후보지만, Terminal Security function과 같은 depth로 일반화할 수 없다.

User Impact:
Public user는 ticker context를 기준으로 basic detail에 접근할 수 있을 가능성이 있다. 그러나 full module inventory가 제한되어 professional analysis density는 확인되지 않았다.

Trade-off:
Quote body가 Partially Observed라서 Statistics, Company, Chart, News 구성의 실제 priority는 확정할 수 없다.

Evidence:
`BBG-SUR-008`, `BBG-SFI-010`~`BBG-SFI-012`, `BBG-PJ-003`.

Confidence:
Medium

## Article / Subscription Density

### BBG-DEN-006 — Article / Subscription Density Boundary

Observation:
Article은 Public Web / Digital Subscription candidate Surface로 기록되며, Subscribe CTA와 Subscription Landing은 Observed 상태다. article body depth와 paywall behavior는 article별로 달라질 수 있다.

Interpretation:
Bloomberg.com의 content density는 Public article access와 Digital Subscription boundary에 의해 달라질 수 있다.

User Impact:
Public user는 headline과 일부 Article 접근으로 News context를 얻을 수 있지만, subscriber-only content가 있으면 Evidence 확인 depth가 제한될 수 있다.

Trade-off:
Subscription CTA는 access route이면서 content scan의 density boundary로 작동할 수 있다.

Evidence:
`BBG-SUR-010`, `BBG-SUR-012`, `BBG-PJ-004`, `BBG-PJ-006`.

Confidence:
Medium

## Terminal Workspace Density

### BBG-DEN-007 — Terminal Workspace Density

Observation:
Bloomberg Terminal은 official Product Description에서 data, News, analytics, execution, collaboration, Workspace, Launchpad, Portfolio Analytics를 professional workflow environment로 묶는다.

Interpretation:
Terminal Information Density는 page density보다 Workspace Density와 Workflow Density에 가깝다. 여러 professional tools가 같은 environment에서 호출될 수 있다는 Product Description에 기반한다.

User Impact:
financial professional은 Security, Market, News, Portfolio, Message context를 같은 environment 안에서 다룰 수 있을 가능성이 있다.

Trade-off:
직접 Terminal session이 없으므로 multi-window behavior, layout persistence, command parsing은 Not Verified다.

Evidence:
`BBG-SUR-015`, `BBG-SFI-024`, `BBG-NAV-015`, `BBG-NAV-026`.

Confidence:
High for Product responsibility, Low to Medium for actual interaction.

### BBG-DEN-008 — Launchpad Monitor Density

Observation:
Launchpad는 customized multi-asset monitors, alerts, charts, News를 제공하는 Workspace / Monitor 후보로 기록되었다.

Interpretation:
Launchpad는 Terminal Workspace 안에서 user가 monitoring density를 구성하는 Density Control 후보로 해석된다.

User Impact:
professional user는 여러 Security와 News / Alert를 한 Workspace context에서 볼 수 있을 가능성이 있다.

Trade-off:
layout save, panel link, Security Context sharing은 Not Verified다.

Evidence:
`BBG-SUR-016`, `BBG-SFI-025`, `BBG-NAV-018`, `BBG-NAV-027`, `J-003`.

Confidence:
Medium

### BBG-DEN-009 — Function Density

Observation:
Command Entry와 Function은 Terminal operation unit 또는 Capability 후보로 기록되며, Security, Chart, News, Portfolio, Research tools candidate에 연결된다.

Interpretation:
Function Density는 많은 menu를 한 화면에 나열하는 방식이 아니라 Command Entry와 Function 단위로 professional task를 압축하는 구조일 수 있다.

User Impact:
숙련 user는 Function 단위로 Workflow를 빠르게 전환할 수 있을 가능성이 있다.

Trade-off:
Function Code, autocomplete, history, favorite function은 확인하지 않았으므로 actual efficiency는 Not Verified다.

Evidence:
`BBG-SFI-022`, `BBG-SFI-029`, `BBG-NAV-016`, `BBG-NAV-017`.

Confidence:
Medium

### BBG-DEN-010 — Security Context Density Candidate

Observation:
Security Context sharing은 Phase 6.2에서 cross-function candidate로만 기록되었다. Linked Window와 Panel Link는 Not Verified다.

Interpretation:
Security Context가 실제로 panels와 functions 사이에서 공유된다면, 같은 Security를 중심으로 Chart, News, Analytics를 동시에 읽는 Professional Density를 만들 수 있다.

User Impact:
Context Preservation 비용을 낮출 가능성이 있지만 실제 확인 전에는 candidate로 유지해야 한다.

Trade-off:
Security Context behavior를 확인하지 못했으므로 core strength로 일반화할 수 없다.

Evidence:
`BBG-CTX-004`, `BBG-STATE-004`, `BBG-NAV-028`, `BBG-NAV-029`.

Confidence:
Low

## News Density

### BBG-DEN-011 — Terminal News Feed Density

Observation:
Terminal News는 Top News, First Word, Daybreak, Morning Report, News Trends, News Alerts를 official Product Description에서 제공하는 것으로 기록되었다. Public Web News는 Home, category pages, Article Surface로 분리된다.

Interpretation:
Terminal News는 Article consumption보다 professional monitoring과 alert Workflow에 가까운 News Density를 제공하는 것으로 해석된다.

User Impact:
professional user는 headline, briefing, trend, alert를 workflow context에 묶을 수 있을 가능성이 있다.

Trade-off:
exact Terminal screen transition과 alert builder는 Not Verified다.

Evidence:
`BBG-SUR-017`, `BBG-SFI-034`~`BBG-SFI-038`, `BBG-NAV-019`, `J-004`.

Confidence:
High for Product responsibility, Medium for Workflow detail.

## Portfolio Density

### BBG-DEN-012 — Portfolio & Risk Analytics Density

Observation:
Portfolio & Risk Analytics는 positions, risk, performance, attribution, scenario analysis를 제공하는 Dashboard / Tool 후보로 기록되었다.

Interpretation:
Portfolio Density는 단일 holding table보다 Portfolio, Position, Risk Factor, Performance, Scenario를 함께 다루는 professional workflow density로 해석된다.

User Impact:
Portfolio user는 monitoring과 risk decision을 같은 product family에서 수행할 수 있을 가능성이 있다.

Trade-off:
actual Portfolio UI, holdings import, calculation UI, entitlement boundary는 Not Verified다.

Evidence:
`BBG-SUR-020`, `BBG-SFI-054`, `BBG-SFI-055`, `BBG-PW-005`, `J-006`.

Confidence:
High for responsibility, Medium for actual behavior.

## Bloomberg Anywhere Density

### BBG-DEN-013 — Remote Workspace Continuity Density

Observation:
Bloomberg Anywhere는 remote Terminal access login Surface로 Observed이며, Professional App은 Today, Data, Worksheets, IB, Alerts를 mobile Terminal companion entry로 official Product Description에서 기록한다.

Interpretation:
Anywhere와 Professional App은 Workspace Density를 device boundary 밖으로 연장하는 Continuity 후보로 해석된다.

User Impact:
Terminal subscriber는 desk 밖에서 monitoring, worksheets, alerts, IB / MSG context에 접근할 수 있을 가능성이 있다.

Trade-off:
post-login session, actual worksheet restore, mobile UI는 Not Verified다.

Evidence:
`BBG-SUR-022`, `BBG-SUR-023`, `BBG-SFI-027`, `BBG-SFI-028`, `BBG-SFI-056`, `J-010`.

Confidence:
Medium

## Data / API Density

### BBG-DEN-014 — Data / API Density

Observation:
Data License, Server API, B-PIPE / Cloud Access, Excel Add-ins / API Components는 enterprise data delivery, API Result, Spreadsheet Integration 후보로 기록되었다.

Interpretation:
Bloomberg professional ecosystem의 Information Density는 UI뿐 아니라 Excel, API, feed, data delivery로 확장되는 data workflow density를 포함한다.

User Impact:
enterprise user는 Terminal data를 organization application, spreadsheet, feed로 연결할 수 있을 가능성이 있다.

Trade-off:
API usage, refresh behavior, entitlement controls, client portal interaction은 테스트하지 않았다.

Evidence:
`BBG-SUR-024`~`BBG-SUR-026`, `BBG-SFI-060`~`BBG-SFI-064`, `BBG-PW-010`, `J-008`.

Confidence:
Medium

## Density Enabler

| Enabler | Layer | Evidence | Confidence |
| --- | --- | --- | --- |
| Market Data footer | Public Web | `BBG-NAV-003` | High |
| Repeated asset class tables | Public Web | `BBG-SFI-003`~`BBG-SFI-007` | Medium |
| Terminal Workspace | Terminal | `BBG-SFI-024` | High |
| Launchpad Monitor | Terminal | `BBG-SFI-025` | Medium |
| Terminal News feeds and alerts | Terminal | `BBG-SFI-034`~`BBG-SFI-038` | High |
| Portfolio & Risk Analytics | Terminal | `BBG-SFI-054`~`BBG-SFI-055` | High |
| Excel / API integration | Enterprise | `BBG-SFI-060`~`BBG-SFI-064` | Medium |

## Density Control

| Control | Layer | Status | Limitation |
| --- | --- | --- | --- |
| Public category Navigation | Public Web | Partially Observed | logged-in personalization Not Verified |
| Asset class pages | Public Web | Observed / Partially Observed | row detail transition Not Verified |
| Command Entry / Function | Terminal | Official Product Description | Function execution Not Verified |
| Launchpad | Terminal | Official Product Description | layout persistence Not Verified |
| Bloomberg Anywhere / App | Bloomberg Anywhere | Observed / Product Description | post-login continuity Not Verified |

## Density Risk

| Risk | Layer | Status | Reason |
| --- | --- | --- | --- |
| Portal content mixing | Public Web | Partially Observed | News, Video, Market Data, Subscription CTA가 같은 entry에 존재 |
| Subscription boundary | Public Web | Partially Observed | Article depth와 subscriber-only content가 달라질 수 있음 |
| Quote body limitation | Public Web | Partially Observed | AAPL direct body bot challenge |
| Terminal learning cost | Terminal | Inference | Command Entry / Function model은 actual use 없이 efficiency를 확정할 수 없음 |
| Workspace persistence uncertainty | Terminal | Not Verified | Launchpad save / restore not verified |
| Enterprise entitlement complexity | Enterprise Data | Official Product Description / Not Verified | API, exchange, organization permission boundary |

## Open Questions

- Terminal Workspace가 실제로 multi-panel density를 어떻게 구성하는가.
- Launchpad layout save와 Security Context sharing이 존재하는가.
- Function Density가 command efficiency로 이어지는 actual behavior는 무엇인가.
- Public Quote가 Chart, Statistics, Company Profile, News를 어떤 priority로 배치하는가.
- Bloomberg Anywhere가 Workspace state를 어느 수준까지 복원하는가.
- Portfolio & Risk Analytics의 actual Dashboard와 report density는 어떤 구조인가.
