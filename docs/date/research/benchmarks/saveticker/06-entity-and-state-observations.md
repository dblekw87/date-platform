# SaveTicker Entity and State Observations

## 문서 목적

이 문서는 Phase 7.2 범위에서 SaveTicker의 Entity Candidate와 User State Candidate를 기록한다.

Entity Relationship, User State Persistence, Information Density, Trust / Evidence, Candidate Principle은 확정하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access / Not Logged In |
| Subscription | Not Verified |
| Mobile App | Official App Description Only |
| Secondary Source | Not Used |

## Entity Candidate Inventory

| Entity ID | Entity Candidate | Primary Surface | Observation Status | Evidence Type | Product Responsibility | User-owned Entity 여부 | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-ENT-001 | News | News Feed, News Detail | Observed | Official Product Observation | Feed item and consumption object | No | High | feed ranking and item schema |
| ST-ENT-002 | Article | News Detail | Observed / Partially Observed | Official Product Observation | article body and summary consumption object | No | High | all article formats share same structure? |
| ST-ENT-003 | Publisher | News Detail | Observed | Official Product Observation | content publisher label | No | High | publisher coverage list |
| ST-ENT-004 | Company | News Detail, Alert candidate | Partially Observed / Official App Description Only | Official Product Observation / Official App Description | company-related News and notification candidate | No | Medium | independent Company Surface |
| ST-ENT-005 | Ticker | News Detail, Search candidate | Partially Observed | Official Product Observation | ticker tag and investment context candidate | No | Medium | ticker click target |
| ST-ENT-006 | Calendar Event | Calendar | Partially Observed | Official Product Observation / Official App Description | dated investment schedule candidate | No | Medium | event type and detail body |
| ST-ENT-007 | Report | Reports | Partially Observed | Official Product Observation / Official App Description | Research / report content candidate | No | Low | report source and detail |
| ST-ENT-008 | User | Login, Policy | Observed / Official Policy | Official Product Observation / Official Policy | account identity candidate | Yes candidate | Medium | social login provider and user profile body |
| ST-ENT-009 | Comment | News Detail, Community candidate | Partially Observed | Official Product Observation | user response object candidate | Yes candidate | Medium | write permission and moderation |
| ST-ENT-010 | Reaction | News Detail | Partially Observed | Official Product Observation | user feedback object candidate | Yes candidate | Medium | reaction ownership and editability |
| ST-ENT-011 | Alert | Notifications, App | Official App Description Only / Login Required | Official App Description | monitoring trigger candidate | Yes candidate | Medium | actual alert rule UI |
| ST-ENT-012 | Notification | Notifications, App | Login Required / Official App Description Only | Official Product Observation / Official App Description | user delivery object candidate | Yes candidate | Medium | payload and source context |
| ST-ENT-013 | Bookmark | News / Report candidate | Not Verified | Inference | saved content candidate | Yes candidate | Low | product wording directly verified 안 됨 |
| ST-ENT-014 | Follow | Company / Ticker / Keyword candidate | Official App Description Only / Not Verified | Official App Description / Inference | monitored interest candidate | Yes candidate | Low | Follow list and persistence |

Entity Candidate 수: 14

## User State Candidate Inventory

| State ID | User State Candidate | Owner | Related Entity | Persistence Scope | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-STATE-001 | Notification | User | Notification, News | account / app candidate | Login Required / Official App Description Only | Official Product Observation / Official App Description | Medium | notification list and payload |
| ST-STATE-002 | Bookmark | User | News, Report | account candidate | Not Verified | Inference | Low | saved News exists? |
| ST-STATE-003 | Follow | User | Ticker, Company, Keyword | account / app candidate | Official App Description Only / Not Verified | Official App Description / Inference | Low | Follow UI and target types |
| ST-STATE-004 | Recent | User / Browser candidate | News, Search Query | browser / account candidate | Not Verified | Inference | Low | recent reading or search exists? |
| ST-STATE-005 | Reading History | User | Article, News | account candidate | Not Verified | Inference | Low | reading history exists? |
| ST-STATE-006 | Alert Rule | User | Alert, Keyword, Company, Calendar Event | account / app candidate | Official App Description Only | Official App Description | Medium | rule builder, frequency, quiet hours |
| ST-STATE-007 | Saved News | User | News, Article | account candidate | Not Verified | Inference | Low | Save / Bookmark wording and restore |

User State Candidate 수: 7

## Product Responsibility Matrix

| Product Element | Surface | Tool | Entity | User-owned Entity | User State | Capability | Primary Responsibility | Secondary Responsibility | Observation Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| News Feed | Yes | No | News | No | feed sort candidate | Search / Filter candidate | News discovery | Curation entry | Observed |
| Today Top News | Yes | No | News | No | No | open detail | selected News exposure | editorial candidate | Partially Observed |
| News Detail | Yes | No | Article | No | reaction / comment candidate | original, translation, react, comment | article consumption | Source check and Discussion candidate | Observed / Partially Observed |
| AI Summary | No | Tool candidate | Article | No | No | summarize | article compression | curation / intelligence candidate | Observed |
| Original Source Control | No | Tool candidate | External Source | No | No | open original | Source check candidate | context exit candidate | Partially Observed |
| Ticker Tag | No | Contextual element | Ticker | No | Follow candidate | open ticker candidate | connect News to Ticker | Company context candidate | Partially Observed |
| Reports | Yes | No | Report | No | saved report candidate | search / filter candidate | Research entry | company / ticker support candidate | Partially Observed |
| Calendar | Yes | No | Calendar Event | No | reminder candidate | date select / view switch | Event monitoring | News / Report relation candidate | Observed / Partially Observed |
| Community | Yes | No | Community Post | User candidate | comment / reaction state candidate | search, comment, react candidate | Discussion entry | popular / latest candidate | Partially Observed |
| Search Field | Tool candidate | Yes | Keyword | No | query state candidate | Search | keyword entry | News / Community discovery | Partially Observed |
| Login | Yes | No | User | User candidate | account state | login / register | account access | personalization gate | Observed |
| Profile | Yes | No | Profile | User candidate | profile state | manage profile candidate | personal area candidate | Follow / Bookmark candidate | Login Required |
| Notifications | Yes | No | Notification | User candidate | notification state | view notification | Monitoring entry | Alert Rule candidate | Login Required |
| Alert Rule | No | Tool candidate | Alert | User candidate | alert rule | create alert candidate | monitoring condition candidate | push delivery candidate | Official App Description Only |
| Mobile App | Supporting App Surface | Tool candidate | User | User candidate | app notification state | push, personalize | mobile access | Personal Continuity candidate | Official App Description Only |
| Privacy Policy | Policy Surface | No | User / Account | User candidate | data state candidate | manage data candidate | account and data policy | public interaction notice | Official Policy |

## News와 Article 구분

Observation:
News Feed는 News 단위의 scan entry다. News Detail은 headline, Source, timestamp, AI Summary, body, reaction, comment area가 결합된 Article consumption Surface다.

Interpretation:
SaveTicker에서 News는 feed-level item이고 Article은 detail-level content object로 분리해 기록하는 것이 적절하다. 단, Product 내부 data model은 확인하지 않았다.

Confidence:
High

## Aggregation과 Curation 구분

Observation:
Reuters detail은 external Source label과 AI Summary를 포함한다. SAVE-authored detail은 ticker tag, reaction, disclaimer를 포함한다. News Feed는 Today Top News block과 News list를 함께 보여준다.

Interpretation:
Aggregation은 여러 Source의 News를 모아 보여주는 책임이고, Curation은 Today Top News, AI Summary, SAVE-authored summary처럼 소비 비용을 줄이는 책임 후보로 구분한다.

Confidence:
Medium

## Community와 Editorial 구분

Observation:
Community는 top-level Surface로 분리되어 있고 user news / free board / popular post labels를 포함한다. News Detail의 reaction and comment area는 Article body 아래에 있다.

Interpretation:
Community와 Editorial priority를 혼용하지 않는다. Reaction과 Comment는 user response 후보이며, editorial importance 또는 Evidence quality로 Interpretation하지 않는다.

Confidence:
Medium

## Public와 Login 구분

| Area | Public Access | Login Required | App Only | Not Verified |
| --- | --- | --- | --- | --- |
| News Feed | Observed | No | No | ranking logic |
| News Detail | Observed / Partially Observed | participation candidate | No | original return path |
| Calendar | Observed | reminder candidate | No | Event Detail |
| Community | Partially Observed | write candidate | No | post detail |
| Profile | No | Yes | No | logged-in body |
| Notifications | No | Yes | push candidate | alert rule UI |
| Alert Rule | No | Login candidate | Yes | delivery behavior |
| Bookmark / Follow | Not Verified | candidate | app candidate | state owner |

## Entity Relationship 후보

Phase 7.2에서는 Entity Relationship을 확정하지 않는다. 아래 내용은 후보 관계만 기록한다.

| From Entity | To Entity | Status | Evidence Type | Limitation |
| --- | --- | --- | --- | --- |
| News | Article | Observed / Partially Observed | Official Product Observation | all News item transition not verified |
| Article | Publisher | Observed | Official Product Observation | publisher coverage unknown |
| Article | Ticker | Partially Observed | Official Product Observation | tag target Not Verified |
| Article | Comment | Partially Observed | Official Product Observation | write permission Not Verified |
| Article | Reaction | Partially Observed | Official Product Observation | ownership Not Verified |
| Calendar Event | News | Not Verified | Inference | no related module observed |
| Report | Company | Not Verified | Inference | report body not observed |
| Alert | Notification | Official App Description Only | Official App Description | actual delivery Not Verified |
| Follow | Company / Ticker | Official App Description Only / Not Verified | Official App Description / Inference | actual Follow UI Not Verified |
| Bookmark | News / Article | Not Verified | Inference | product wording not directly verified |

## Open Question

- SaveTicker 내부에서 News와 Article을 별도 Entity로 모델링하는가.
- Ticker Tag는 filtered feed, independent Ticker Detail, external quote 중 어디로 연결되는가.
- Company 관심 알림은 Company Entity를 갖는가, keyword / ticker rule인가.
- Calendar Event가 News 또는 Report와 연결되는가.
- Report는 News category인가, independent Research Entity인가.
- Comment와 Reaction은 public user response인가, logged-in User State인가.
- Bookmark / Follow / Saved News가 실제 Product에 존재하는가.
- Alert Rule이 Notification payload에 Source News와 Entity Context를 포함하는가.
