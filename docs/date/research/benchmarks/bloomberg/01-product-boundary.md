# Bloomberg Product Boundary

## Boundary 기준

Bloomberg Benchmark는 Terminal과 Public Web을 하나의 Product처럼 다루지 않는다. Bloomberg Terminal / Professional Services는 institutional workflow Product이며, Bloomberg.com은 Public Web과 Digital Subscription 기반 media / market data Product다.

## Bloomberg Product Family

| Product ID | Product Name | Product Type | Primary User | Primary Responsibility | Access Level | Delivery Environment | DATE Benchmark Relevance | Observation Status | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-PF-001 | Bloomberg Terminal | Professional workflow platform | Financial professional | Real-time Market data, News, analytics, trading, collaboration | Institutional Access Required | Terminal desktop, hardware / software, Bloomberg Anywhere | Core | Official Product Description | Official Product Description | High |
| BBG-PF-002 | Bloomberg Professional Services | Product family / sales layer | Enterprise and professional clients | Terminal, Data, Trading, Risk, Compliance, Indices solution access | Institutional Contract Required | Web sales, Terminal, enterprise products | Core | Observed | Official Product Description | High |
| BBG-PF-003 | Bloomberg Anywhere | Remote Terminal access | Terminal subscriber | Terminal access away from desk | Login Required / Institutional Access Required | Web login, PC, mobile | Core | Observed | Official Product Observation | High |
| BBG-PF-004 | Bloomberg Professional App | Mobile Terminal companion | Terminal subscriber | mobile news, market data, worksheets, alerts, IB / MSG | Login Required / Institutional Access Required | iOS, iPadOS, Android, Apple Vision Pro | Core | Official Documentation Only | Official Product Description | High |
| BBG-PF-005 | Bloomberg.com | Public web / Digital Subscription media | Public reader, subscriber | Business News, Market summary, Article, video, subscription | Public / Subscription Required | Web | Core | Partially Observed | Official Product Observation | High |
| BBG-PF-006 | Bloomberg Markets | Public Market and News vertical | Public reader, investor | Market data tables, news, market sections | Public / Subscription Required for some content | Web | Core | Observed | Official Product Observation | High |
| BBG-PF-007 | Bloomberg News | News product | Public reader, subscriber, Terminal user | Bloomberg Original News and Terminal-integrated News | Public / Subscription / Terminal | Web, Terminal, app | Core | Partially Observed | Official Product Observation / Product Description | High |
| BBG-PF-008 | Bloomberg Data License | Enterprise data product | Data teams, enterprise clients | licensed enterprise datasets and delivery | Enterprise / Additional Product Required | API, SFTP, cloud, DATA <GO> | Supporting | Official Product Description | Official Product Description | High |
| BBG-PF-009 | B-PIPE / Market Data Feed | Enterprise data feed | Enterprise technology teams | real-time market data feed | Enterprise / Entitlement Required | Cloud, installed, API | Supporting | Official Product Description | Official Product Description | Medium |
| BBG-PF-010 | Bloomberg API / Server API | Data connectivity product | developers, quant teams | Terminal-aligned data access in client applications | Enterprise / Terminal-related entitlement | API / server | Supporting | Official Product Description | Official Product Description | High |
| BBG-PF-011 | Bloomberg Intelligence | Research product | professional investors | industry, company, macro, ESG research | Terminal / Additional Product Candidate | Terminal, reports | Supporting | Official Product Description | Official Product Description | Medium |
| BBG-PF-012 | BloombergNEF | Strategic research provider | energy, commodity, policy, finance professionals | energy transition, commodity, climate technology research | Subscription / Additional Product | Web, reports, Terminal integration candidate | Supporting | Official Product Description | Official Product Description | High |
| BBG-PF-013 | Bloomberg Television | Media product | public audience, subscribers | live video, business news video | Public / Subscription Candidate | Web, TV, app | Supporting | Partially Observed | Official Product Observation | Medium |
| BBG-PF-014 | Bloomberg Radio | Media product | public audience, subscribers | audio / radio business news | Public / Subscription Candidate | Web, radio, app | Supporting | Partially Observed | Official Product Observation | Medium |
| BBG-PF-015 | Bloomberg Law | Legal research platform | legal professionals | legal research, news, primary / secondary sources, practice tools | Separate subscription | Web app | Separate Domain | Official Product Description | Official Product Description | High |
| BBG-PF-016 | Bloomberg Tax | Tax news / research product | tax professionals | tax news, commentary, tax research | Separate subscription candidate | Web app / news | Separate Domain | Official Product Description | Official Product Description | Medium |
| BBG-PF-017 | Bloomberg Government | Government policy / procurement research | government affairs professionals | government news and analysis | Separate subscription candidate | Web app / news | Separate Domain | Official Product Description | Official Product Description | Medium |
| BBG-PF-018 | Bloomberg Media Advertising | Advertising business | advertisers | media advertising solutions | Separate sales | Web / media network | Excluded | Official Product Description | Official Product Description | Low |
| BBG-PF-019 | Bloomberg Events | Event media business | event audience, sponsors | conferences and event content | Public / ticket / sponsor candidate | Web / events | Excluded | Partially Observed | Official Product Observation | Low |

## Core Benchmark Scope

| Product | Scope Role | Reason |
| --- | --- | --- |
| Bloomberg Terminal | Core | Professional investor workflow, command-driven interaction, multi-asset data, analytics, News, Portfolio / Risk, collaboration을 대표한다. |
| Bloomberg Professional Services | Core | Terminal, Data, Trading, Risk, Compliance, Indices를 묶는 institutional sales / product boundary를 제공한다. |
| Bloomberg Anywhere | Core | Terminal context를 remote / mobile로 확장하는 access layer다. |
| Bloomberg Professional App | Core | Terminal subscriber의 mobile monitoring, worksheets, alerts, IB / MSG continuity 후보를 제공한다. |
| Bloomberg.com | Core | Public Web Market, News, Search, Subscription 경험을 제공한다. |
| Bloomberg Markets | Core | Public Market data table과 market news를 제공한다. |
| Bloomberg News | Core | Public Web과 Terminal News가 책임을 다르게 갖는 핵심 content product다. |

## Supporting Scope

| Product | Supporting Role | Limitation |
| --- | --- | --- |
| Bloomberg Intelligence | Terminal research content와 industry / company / region Insight 후보를 이해하는 보조 범위 | 실제 Terminal research screen은 Not Verified |
| BloombergNEF | energy transition과 commodity / climate research의 separate research product 이해 | subscriber-only research access는 Not Verified |
| Data License | Enterprise data delivery와 DATA <GO> boundary 이해 | End-user Surface보다 enterprise data product에 가깝다 |
| B-PIPE / Bloomberg API / Server API | data integration과 entitlement boundary 이해 | DATE Phase 6.1에서는 API behavior를 분석하지 않는다 |
| Bloomberg Television / Radio | Public Web media와 News delivery 보조 이해 | 투자 research workflow 분석 대상은 아님 |

## Excluded or Separate Domain

| Product | 처리 | Reason |
| --- | --- | --- |
| Bloomberg Law | Separate Domain | legal research / software product로 투자 Benchmark Core와 다르다 |
| Bloomberg Tax | Separate Domain | tax professional content product다 |
| Bloomberg Government | Separate Domain | government affairs and policy intelligence product다 |
| Bloomberg Philanthropies | Excluded | philanthropy / organization activity다 |
| Bloomberg Media Advertising | Excluded | media monetization / advertising sales product다 |
| Bloomberg Events | Excluded | event business이며 Product Surface Mapping만 간접 참고한다 |

## Public Web vs Digital Subscription

| Layer | Product Responsibility | Access Boundary | Observation Status |
| --- | --- | --- | --- |
| Public Web | Bloomberg.com Home, Markets, limited article / video access, market tables, subscription CTA | Public / dynamic gate candidate | Partially Observed |
| Digital Subscription | unlimited Bloomberg.com and app access, subscriber-only content and newsletters, live TV / radio, narrated articles | Subscription Required | Official Pricing / Sales |
| Corporate / Student Subscription | organization or school based access | Account / Subscription Required | Official Pricing / Sales |

## Terminal vs Bloomberg Anywhere

| Product | Responsibility | Access Boundary | Observation Status |
| --- | --- | --- | --- |
| Bloomberg Terminal | primary professional workflow, data, analytics, execution, collaboration, workspace | Institutional Access Required | Official Product Description |
| Bloomberg Anywhere | remote access to Terminal subscription | B-Unit / login required | Observed on Bloomberg Anywhere page |
| Bloomberg Professional App | mobile delivery of Terminal functions, worksheets, alerts, IB / MSG | Terminal account required | Official Product Description |

## Terminal vs Enterprise Data

| Product | User-facing Role | Enterprise Role | Boundary |
| --- | --- | --- | --- |
| Bloomberg Terminal | analyst / trader / PM workflow Surface | source environment for data and functions | Institutional Terminal subscription |
| Data License | Not primary end-user research Surface | enterprise data acquisition and distribution | Additional Product / enterprise contract |
| B-PIPE | Not end-user Surface | real-time market data feed | exchange / enterprise entitlement |
| Server API | developer / application integration | Terminal-aligned data access in applications | entitlement and approved usage |

## Product Responsibility Matrix

| Product Element | Surface | Workspace | Function | Tool | Capability | Integration | User State | Enterprise Capability |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bloomberg Terminal | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Command Line | No | No | Yes | Tool candidate | Command Execution | No | Recent / History candidate | No |
| Function Code | No | No | Yes | No | Navigation / Execution | No | Favorite / recent candidate | No |
| Launchpad | Yes | Workspace | Function candidate | Tool candidate | monitor / alert / chart composition | No | layout state candidate | No |
| Bloomberg Anywhere | Surface | Workspace access candidate | Terminal function access candidate | No | remote access | Yes | login state | No |
| Bloomberg Professional App | Surface | worksheets candidate | mobile function subset | Tool | alert / messaging / monitoring | Yes | notification / worksheet state | No |
| Bloomberg.com Markets | Surface | No | No | No | filter / sort candidate | No | account state candidate | No |
| Bloomberg.com Quote | Surface | No | No | No | follow / watchlist candidate | No | account state candidate | No |
| Data License | No | No | No | Data portal candidate | dataset acquisition | Yes | entitlement state | Yes |
| B-PIPE | No | No | No | No | real-time feed | Yes | entitlement state | Yes |
| Instant Bloomberg | Surface / Panel candidate | No | Function | Tool | Message / chat / share | Yes | chat state | compliance capture candidate |

## Access Boundary Matrix

| Access Level | 포함 항목 | Boundary |
| --- | --- | --- |
| Public | Bloomberg.com Home, Markets, limited Articles, public Market Data, subscription pages | region, bot protection, paywall, dynamic rendering 가능 |
| Account Required | Bloomberg.com saved / follow / subscriber account functions candidate | Not Verified |
| Digital Subscription Required | unlimited content, subscriber-only newsletters, app access, live TV / radio / narrated articles | actual subscriber UI Not Verified |
| Institutional Contract Required | Terminal, Bloomberg Anywhere, Professional App account, most Terminal Functions | No Direct Terminal Session |
| Exchange Entitlement Required | real-time exchange data and certain datasets candidate | Not Verified |
| Additional Product Required | BloombergNEF, Data License, B-PIPE, Bloomberg Intelligence advanced access candidate | Official Product Description only |

## DATE Benchmark Relevance

Observation:
Bloomberg는 Public Web Media / Market Surface와 Terminal Professional Workflow가 동시에 존재하지만, user, access, delivery environment, data depth가 다르다.

Interpretation:
DATE Benchmark에서 Bloomberg는 "한 Product 안의 많은 기능"이 아니라 "Public Market awareness와 institutional workflow의 분리"를 비교하는 대상일 수 있다.

Evidence:
Bloomberg Professional Services, Bloomberg Terminal, Bloomberg Markets, Bloomberg Subscription, Bloomberg Anywhere 공식 URL.

Confidence:
High

## Open Question

| Question | Current Status | Future Validation Target |
| --- | --- | --- |
| Terminal Command Line autocomplete가 Function과 Security를 어떻게 구분하는가 | Not Verified | Terminal session or official demonstration |
| Launchpad layout save와 security context linking이 실제로 어떻게 작동하는가 | Not Verified | Terminal session |
| Bloomberg.com Quote page가 Stock, Company, Security를 어떤 tab / module로 나누는가 | Partially Observed | Public page direct access |
| Digital Subscription 후 article / app / personalization boundary가 어떻게 바뀌는가 | Not Verified | Subscriber session |
| Exchange Entitlement가 Terminal Surface에서 어떻게 표시되는가 | Not Verified | Terminal session |
