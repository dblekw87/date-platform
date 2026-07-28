# Bloomberg Entity and State Observations

## 문서 목적

이 문서는 Bloomberg Phase 6.2 범위에서 Entity Candidate, User State Candidate, Product Responsibility를 기록한다.

이번 단계에서는 Entity Relationship을 확정하지 않는다. Terminal 직접 session이 없으므로 Terminal User State는 Official Product Description 또는 Not Verified 후보로만 기록한다.

## Entity Candidate Inventory

| Entity ID | Entity Candidate | Product Layer | Primary Surface / Function | Observation Status | Evidence Type | Product Responsibility | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-ENT-001 | Security | Terminal / Public Web | Quote, Terminal Security Lookup candidate | Partially Observed / Official Product Description | Official Product Observation / Product Description | investable instrument context 후보 | Medium | Terminal Security identity model |
| BBG-ENT-002 | Stock | Public Web / Terminal | Stocks, Quote | Partially Observed | Official Product Observation | public equity quote and table entity | Medium | Stock vs Security field boundary |
| BBG-ENT-003 | Company | Public Web / Terminal | Company Profile, BI, company research | Partially Observed / Product Description | Official Product Observation / Product Description | business profile and research entity | Medium | Company and listed Security relation |
| BBG-ENT-004 | Bond | Public Web / Terminal | Rates & Bonds, fixed income workflow | Partially Observed / Product Description | Official Product Observation / Product Description | fixed income instrument candidate | Medium | exact bond detail Surface |
| BBG-ENT-005 | Yield | Public Web / Terminal | Rates & Bonds, curve analysis candidate | Partially Observed / Inference | Official Product Observation / Inference | rates comparison entity candidate | Low | yield as Security vs Metric |
| BBG-ENT-006 | Currency | Public Web | Currencies | Partially Observed | Official Product Observation | currency market entity candidate | Medium | pair-level detail |
| BBG-ENT-007 | Commodity | Public Web / Terminal | Commodities, charts | Observed | Official Product Observation | commodity market entity | High | spot vs futures distinction |
| BBG-ENT-008 | Crypto | Public Web | Markets Crypto section candidate | Partially Observed | Official Product Observation | crypto market entity candidate | Medium | crypto asset detail |
| BBG-ENT-009 | ETF | Public Web candidate | Market Data footer / ETFs | Not Verified | Inference | fund-like security candidate | Low | ETF Surface not opened |
| BBG-ENT-010 | Economic Indicator | Public Web / Terminal | Economic Calendar candidate, Bloomberg Economics | Not Verified / Product Description | Inference / Product Description | macro data entity candidate | Low | economic calendar actual Surface |
| BBG-ENT-011 | Country | Public Web / Terminal | Rates, economics, BNEF / BI candidate | Partially Observed | Official Product Observation / Product Description | geographic market context candidate | Medium | country page / macro relation |
| BBG-ENT-012 | Sector | Public Web candidate / Terminal | Sectors, BI | Not Verified / Product Description | Inference / Product Description | classification entity candidate | Low | Sector Surface body |
| BBG-ENT-013 | Industry | Terminal / BI | Bloomberg Intelligence | Official Product Description | Official Product Description | company grouping and research entity candidate | Medium | BI industry screen |
| BBG-ENT-014 | News | Public Web / Terminal | Home, Article, Terminal News | Observed / Product Description | Official Product Observation / Product Description | time-sensitive content entity candidate | High | Terminal News item structure |
| BBG-ENT-015 | Article | Public Web | Article page | Partially Observed | Official Product Observation | public content entity | High | article gate and related entities |
| BBG-ENT-016 | Analyst | Terminal / BI candidate | Analyst recommendations, Bloomberg Intelligence | Official Product Description | Official Product Description | research author / analyst entity candidate | Medium | individual Analyst profile |
| BBG-ENT-017 | Portfolio | Terminal | Portfolio & Risk Analytics | Official Product Description | Official Product Description | user / organization asset set candidate | High | actual portfolio object model |
| BBG-ENT-018 | Position | Terminal | PORT / PORT Enterprise | Official Product Description | Official Product Description | Portfolio component candidate | High | position import and ownership |
| BBG-ENT-019 | Watchlist | Professional App / Launchpad candidate | worksheets, watch lists | Official Product Description | Official Product Description | monitored Security set candidate | Medium | Terminal vs app watch list boundary |
| BBG-ENT-020 | Workspace | Terminal | Terminal Workspace, Launchpad | Official Product Description | Official Product Description | saved working environment candidate | Medium | persistence not verified |
| BBG-ENT-021 | Function | Terminal | Command Entry / Function | Official Product Description / Not Verified | Official Product Description | Terminal operation unit candidate | Medium | Function Code not recorded |
| BBG-ENT-022 | User | Public / Terminal | Subscription, Bloomberg Anywhere, IB | Observed / Product Description | Official Product Observation / Product Description | account and professional identity | High | entitlement model |
| BBG-ENT-023 | Organization | Public / Enterprise | Subscription Finder, Request Demo, Enterprise Data | Observed / Product Description | Official Pricing / Sales / Product Description | institutional access and entitlement owner | High | organization-level permission |

Entity Candidate 수: 23

## User State Candidate Inventory

| State ID | User State Candidate | Owner | Product Layer | Persistence Scope | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-STATE-001 | Workspace | Terminal User | Terminal | saved working environment candidate | Official Product Description / Not Verified | Official Product Description | Medium | save / restore mechanics |
| BBG-STATE-002 | Launchpad | Terminal User | Terminal | monitor / chart / news layout candidate | Official Product Description / Not Verified | Official Product Description | Medium | layout persistence |
| BBG-STATE-003 | Panel Link | Terminal User | Terminal | linked windows candidate | Not Verified | Inference | Low | link and color grouping |
| BBG-STATE-004 | Security Context | Terminal Session | Terminal | cross-function selected Security candidate | Not Verified | Inference | Low | context sharing behavior |
| BBG-STATE-005 | Recent | User | Terminal / Public Web candidate | recently used functions or securities candidate | Not Verified | Inference | Low | recent existence |
| BBG-STATE-006 | Favorites | User | Terminal / IB candidate | favorite functions / chats candidate | Official Product Description / Not Verified | Official Product Description | Medium | favorite functions not verified |
| BBG-STATE-007 | Alert | User | Terminal / Professional App | News / market / custom alert candidate | Official Product Description | Official Product Description | Medium | rule builder and trigger |
| BBG-STATE-008 | Watchlist | User | Terminal / Professional App | monitored Security set candidate | Official Product Description | Official Product Description | Medium | Terminal-created watch list persistence |
| BBG-STATE-009 | Portfolio | User / Organization | Terminal | positions, risk, performance state candidate | Official Product Description | Official Product Description | High | account vs organization ownership |
| BBG-STATE-010 | Anywhere Session | User | Bloomberg Anywhere | remote Terminal session candidate | Login Required / Not Verified | Official Product Observation | Low | post-login continuity |

User State Candidate 수: 10

## Product Responsibility Matrix

| Product Element | Surface | Workspace | Function | Capability | User-owned Entity | User State | Enterprise Capability | Primary Responsibility | Observation Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bloomberg.com Home | Yes | No | No | category entry candidate | No | account state candidate | No | Public News and Market entry | Partially Observed |
| Markets | Yes | No | No | category transition | No | No | No | Market category comparison entry | Observed |
| Quote | Yes | No | No | follow / watch candidate | No | account state candidate | No | Security detail candidate | Partially Observed |
| Article | Yes | No | No | save / subscribe candidate | No | subscriber state candidate | No | News content Surface | Partially Observed |
| Search | Tool / Surface candidate | No | No | Search | No | query state candidate | No | Public query entry | Partially Observed |
| Subscription | Yes | No | No | Subscribe | Subscription candidate | entitlement state | No | Digital access conversion | Observed |
| Bloomberg Terminal | Yes | Yes | Yes | Command, analytics, collaboration | No | session / workspace state | Yes | professional workflow environment | Product Description |
| Command Entry | No | No | Function candidate | Command Execution | No | recent / history candidate | No | Function / Security access candidate | Product Description |
| Function | No | No | Yes | execute analysis / monitor | No | favorite / recent candidate | No | Terminal operation unit | Product Description |
| Launchpad | Yes | Yes | Function candidate | monitor / alert / chart composition | No | layout state candidate | No | customized Workspace / Monitor | Product Description |
| Panel / Window | No | Workspace component | No | arrange / link candidate | No | panel state candidate | No | workspace component candidate | Not Verified |
| Linked Window | No | Workspace component | No | share Security Context candidate | No | linked context candidate | No | context-sharing candidate | Not Verified |
| Terminal News | Yes | No | Function Category | alert / personalization candidate | No | topic / alert state candidate | No | professional News Monitoring | Product Description |
| Charts | Yes | No | Function Category | compare / annotate / export | No | chart state candidate | No | visual analysis | Product Description |
| Portfolio & Risk Analytics | Yes | Dashboard candidate | Function Category | risk / attribution / scenario | Portfolio | portfolio state | Enterprise candidate | Portfolio and risk workflow | Product Description |
| Instant Bloomberg | Yes / Panel candidate | No | Function | message / share / search | Message Thread candidate | chat state | compliance capture candidate | collaboration | Product Description |
| NOTE | Tool candidate | No | Function candidate | save / publish / tag | Research Note candidate | note state | research management candidate | research sharing | Product Description |
| Bloomberg Anywhere | Yes | remote Workspace access candidate | Terminal access candidate | remote login | No | Anywhere Session | No | remote Terminal access | Observed / Login Required |
| Bloomberg Professional App | Yes | worksheet access candidate | mobile function subset | alert / messaging / monitoring | Watchlist candidate | notification / worksheet state | No | mobile Terminal companion | Product Description |
| Data License | No | No | No | dataset acquisition | Dataset candidate | entitlement state | Yes | enterprise data delivery | Product Description |
| Server API | No | No | No | API Query | No | entitlement state | Yes | application data access | Product Description |
| B-PIPE | No | No | No | real-time feed | No | entitlement state | Yes | market data feed | Product Description |

## Surface / Workspace / Function / Capability 구분

Observation:
Bloomberg.com Home, Markets, Quote, Article, Subscription은 Public Web Surface다. Bloomberg Terminal은 Surface, Workspace, Function, Tool, Capability를 모두 포함하는 professional environment로 설명된다. Command Entry와 Function은 Surface가 아니라 Terminal operation unit 또는 Capability 후보로 기록한다.

Interpretation:
Bloomberg는 Public Web에서는 page / category 중심이고, Terminal에서는 command-driven Function과 Workspace composition이 함께 존재하는 구조로 해석된다. 그러나 실제 Function invocation은 확인하지 않았다.

Confidence:
High for boundary separation, Low to Medium for Terminal internal behavior.

Evidence:
Bloomberg.com Public pages, Bloomberg Terminal Product Page, Bloomberg Professional App, News, Charts, Portfolio Analytics, Collaboration Tools.

## Entity와 User State 구분

| 구분 | Candidate | Note |
| --- | --- | --- |
| Product Entity | Security, Stock, Company, Bond, Yield, Currency, Commodity, Crypto, ETF, Economic Indicator, Country, Sector, Industry, News, Article, Analyst | 투자 및 content 대상 후보 |
| User-owned Entity | Portfolio, Position, Watchlist, Workspace candidate, Message Thread candidate, Research Note candidate | ownership과 persistence는 access-dependent |
| User State | Workspace, Launchpad, Panel Link, Security Context, Recent, Favorites, Alert, Watchlist, Portfolio, Anywhere Session | 실제 persistence는 대부분 Not Verified |
| Surface | Bloomberg.com Home, Markets, Quote, Article, Terminal Workspace, Launchpad, Terminal News, Portfolio & Risk Analytics, Bloomberg Anywhere | user-visible Product area |
| Function | Command Entry, Function, Terminal News functions, Charts, Portfolio Analytics, Instant Bloomberg, NOTE | Terminal operation candidate |
| Capability | Search, Command Execution, Alert, Message, Compare, Export, API Query, Subscribe | Surface와 분리 |
| Enterprise Capability | Data License, Server API, B-PIPE, Enterprise entitlement, organization permission | end-user Surface와 분리 |

## 주요 Open Question

- Security, Stock, Company가 Terminal에서 어떤 identifier와 display hierarchy를 갖는가.
- Public Quote가 Company Profile과 Security Quote를 어떻게 나누는가.
- Workspace가 User-owned Entity인지 User State인지 실제 Product에서 어떻게 모델링되는가.
- Launchpad panel link와 Security Context sharing이 존재하는가.
- Watchlist와 Worksheet가 Terminal과 Professional App 사이에서 같은 object인지 확인 필요.
- Portfolio ownership이 User 단위인지 Organization 단위인지 확인 필요.
- Alert Rule의 trigger, condition, persistence가 어떻게 저장되는가.
- Recent와 Favorites가 Function, Security, IB chat에서 각각 존재하는가.
- Enterprise entitlement가 user-facing Surface에 어떻게 표시되는가.
