# SaveTicker Product Boundary

## 문서 목적

이 문서는 Phase 7.1 범위에서 SaveTicker의 Product Role 후보와 Access Boundary를 기록한다.

SaveTicker를 단일 News Publisher로 확정하지 않고 Aggregation, Curation, Intelligence, Community, Monitoring, Calendar, Research 역할 후보를 분리한다.

## Product Role 후보

| Role ID | Role | Supporting Surface | Primary User | Primary Responsibility | Evidence Type | Observation Status | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-ROLE-001 | News Aggregator | News Feed, News Detail | 미국 주식 투자자 | 여러 Source의 News를 한 Feed와 Detail로 모아 보여준다. | Official Product Observation | Observed | High | Source coverage와 provider list는 Not Verified |
| ST-ROLE-002 | News Curator | 오늘 주요뉴스, AI 요약, SAVE-authored detail | 빠르게 핵심 News를 확인하려는 투자자 | 중요 News를 선별하고 요약해 소비 비용을 낮춘다. | Official Product Observation / Official App Description | Partially Observed | Medium | Save Pick / Editorial Pick의 selection rule은 Not Verified |
| ST-ROLE-003 | News Intelligence Product | News, Report, Calendar, Notification, Ticker tag 후보 | News를 투자 판단 Context로 연결하려는 사용자 | News를 event, ticker, report, alert 후보와 연결한다. | Official Product Observation / Official App Description | Partially Observed | Medium | 연결 구조와 ranking logic은 Not Verified |
| ST-ROLE-004 | Financial Media Product | News Detail, SAVE market summary detail | 일반 투자자 | Market, earnings, macro summary를 media article 형태로 제공한다. | Official Product Observation | Observed | High | editorial production boundary는 Not Verified |
| ST-ROLE-005 | Market Information Portal | News Feed, Calendar, Search | 반복 방문 사용자 | News, report, calendar, community entry를 한 top-level Product에 배치한다. | Official Product Observation | Partially Observed | Medium | Home이 별도 Surface인지 `/news` redirect인지 확인 필요 |
| ST-ROLE-006 | Investment Community | Community, comments, reactions | News에 반응하거나 Discussion에 참여하는 사용자 | post, comment, reaction 후보를 제공한다. | Official Product Observation / Official Policy | Partially Observed | Medium | write permission과 moderation UI는 Login Required / Not Verified |
| ST-ROLE-007 | Alert / Monitoring Product | Notifications, App push description | 관심 News를 놓치지 않으려는 사용자 | keyword, company, economic indicator, report schedule notification 후보를 제공한다. | Official App Description / Official Product Observation | Login Required / App Only | Medium | actual alert rule UI는 Not Verified |
| ST-ROLE-008 | Calendar / Event Product | Calendar | event 기반 투자 일정을 확인하는 사용자 | economic indicator, Fed, investment schedule 후보를 calendar form으로 제공한다. | Official Product Observation / Official App Description | Observed / Official App Description Only | Medium | earnings, IPO, dividend, corporate action coverage는 Not Verified |
| ST-ROLE-009 | Research Report Aggregator | Reports | report 기반 정보를 찾는 사용자 | corporate report, report schedule, report summary 후보를 제공한다. | Official Product Observation / Official App Description | Partially Observed | Low | report list body, source, download, gate는 Not Verified |
| ST-ROLE-010 | Ticker / Company Discovery Product | Ticker tag, Search, Notification app description | ticker 중심 투자자 | News와 company / ticker 관심 대상을 연결하는 후보 역할을 가진다. | Official Product Observation / Official App Description | Partially Observed | Medium | independent Ticker / Company Detail Surface는 Not Verified |

## Core Scope

| Scope | Included Surface | Status |
| --- | --- | --- |
| News Feed | `/news`, 오늘 주요뉴스, News list | Observed |
| News Detail | Reuters example, SAVE-authored example | Partially Observed |
| Save Pick / Editorial Pick 후보 | 오늘 주요뉴스, app description의 curation claim | Partially Observed |
| Ticker / Company Linking 후보 | `$AAPL` tag, company-interest notification app description | Partially Observed |
| Search | News search field, Community search field | Partially Observed |
| Reports | `/report` | Partially Observed |
| Calendar | `/calendar` | Observed |
| Community | `/community`, comment / reaction examples | Partially Observed |
| Alert / Notification | `/notifications` login gate, app notification description | Login Required / App Only |
| Watch / Follow / Bookmark 후보 | app personalization description, policy account functionality | Inference |
| Login / Register | login screen | Observed |
| Profile / Personalization 후보 | `/profile` login gate, app personalization description | Login Required / Official App Description Only |
| External Article / Original Source | News Detail `원문` control and source label | Partially Observed |

## Supporting Scope

| Scope | Evidence Type | Status | Notes |
| --- | --- | --- | --- |
| Mobile App | Official App Description | App Only | iOS and Android listing 확인 |
| Push Notification | Official App Description | App Only | 실제 push delivery는 Not Verified |
| Official App Store / Google Play 설명 | Official App Description | Observed | feature responsibility 확인 |
| Terms / Privacy / Policy | Official Policy | Observed | account, push, public area interaction 설명 |
| Subscription / Pricing 후보 | Official Product Observation | Not Verified | paid tier 확인 못함 |
| Email / Newsletter 후보 | Official Policy | Not Verified | policy contact 목적은 있으나 Product newsletter는 Not Verified |

## Excluded Scope

| Scope | Treatment | Reason |
| --- | --- | --- |
| Brokerage | Excluded | Product에서 actual trading 확인 없음 |
| Actual Trading | Excluded | 투자 권유 목적이 아닌 정보 제공 disclaimer 확인 |
| Paid Research Provider 상세 | Excluded | Phase 7.1 범위 밖 |
| Third-party News Provider 전체 비교 | Excluded | 향후 News Provider Research 대상 |
| News Licensing | Excluded | 공식 Product에서 licensing detail 확인 없음 |
| API | Excluded | 공식 Product에서 API Surface 확인 없음 |
| Data Feed | Excluded | 공식 Product에서 Data Feed 확인 없음 |
| Creator Economy | Excluded | Community와 creator monetization은 구분 |
| Advertising Sales | Excluded | ad sales product 확인 없음 |
| Corporate Partnership | Excluded | 공식 Product에서 확인 없음 |

## Product Responsibility Matrix

| Product Element | Product Role | Surface | Entity Candidate | Capability Candidate | Primary Responsibility | Secondary Responsibility | Observation Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| News Feed | Aggregation / Curation | News Surface | News | Search, Filter candidate | headline and latest News entry | Source and category scan | Observed |
| Today Top News | Curation | Editorial Surface | News | Open detail | selected News exposure | editorial priority candidate | Partially Observed |
| News Detail | Aggregation / Curation | News Detail Surface | Article / News Source | original, translation, comment | article and summary consumption | reaction and discussion | Partially Observed |
| AI Summary | Intelligence | News Detail Surface | Article | summarize | article compression | source check prompt | Observed |
| Reports | Research | Report Surface | Research Report | Search / Filter candidate | report entry | ticker / event research candidate | Partially Observed |
| Calendar | Calendar | Calendar Surface | Calendar Event | view switch, reminder candidate | dated event view | user local time alignment | Observed |
| Community | Community | Community Surface | Community Post | post, comment, react candidate | user discussion entry | popular / latest candidate | Partially Observed |
| Login | Personalization | Login Surface | User | login, register | account access | social login candidate | Observed |
| Profile | Personalization | Personal Surface | Profile | manage profile candidate | user account state | follow / bookmark candidate | Login Required |
| Notifications | Monitoring | Alert Surface | Notification / Alert Rule | alert candidate | user notification state | push / app notification candidate | Login Required |
| Mobile App | Monitoring / Personalization | Supporting App Surface | User | push, personalize | app access | notification delivery | Official App Description Only |
| Privacy Policy | Policy | Policy Surface | User / Account | account management | data and account policy | public area interaction notice | Official Documentation Only |

## Access Boundary Matrix

| Product Area | Public Access | Login Required | Subscription Required | App Only | Not Verified |
| --- | --- | --- | --- | --- | --- |
| News Feed | Yes | No | Not Verified | No | ranking logic |
| News Detail | Yes | comment write candidate | Not Verified | No | original link consistency |
| Reports | Partial | Not Verified | Not Verified | No | report detail / download |
| Calendar | Yes | reminder candidate | Not Verified | No | event detail / alert |
| Community | read candidate | write / profile candidate | Not Verified | No | moderation |
| Profile | No | Yes | Not Verified | No | logged-in body |
| Notifications | No | Yes | Not Verified | App push candidate | alert rule UI |
| Mobile App | No | account candidate | Not Verified | Yes | actual app interaction |
| Push Notification | No | likely account required | Not Verified | Yes | delivery behavior |

## DATE Benchmark Relevance

Observation:
SaveTicker의 Public Product는 News Feed, Reports, Community, Calendar, Profile, Notifications를 top-level entry로 노출한다. News Detail에는 Source, timestamp, AI summary, original / translation control, disclaimer, reaction / comment area가 함께 표시된다.

Interpretation:
SaveTicker는 News를 단순 article list로 두지 않고 Ticker tag, Calendar, Report, Community, Notification 후보와 연결하려는 Product Boundary를 가진다. 단, Phase 7.1에서는 연결의 실제 Navigation, User Journey, Personal Continuity를 분석하지 않는다.

Evidence:
Official Product Observation and Official App Description.

Confidence:
Medium

## Open Question

- SaveTicker가 자체 Original Content와 third-party translated / summarized content를 내부적으로 어떻게 구분하는가.
- Today Top News가 editorial curation인지, recency / popularity ranking인지, manual pick인지 Not Verified다.
- Reports는 independent Research Surface인지 News category인지 Not Verified다.
- Calendar event type coverage와 alert relation은 Not Verified다.
- Community popular posts가 News importance와 연결되는지는 Not Verified다.
- Ticker / Company independent Surface가 존재하는지 Not Verified다.
