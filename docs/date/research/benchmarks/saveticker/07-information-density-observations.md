# SaveTicker Information Density Observations

## 문서 목적

이 문서는 Phase 7.3 범위에서 SaveTicker의 News Feed, News Detail, AI Summary, Translation, Reports, Calendar, Community, Search, Notification, Advertisement Density Pattern을 기록한다.

Trust / Evidence 평가는 [08-trust-and-evidence-observations.md](08-trust-and-evidence-observations.md)에 기록한다. Product Flow Architecture는 [09-product-flow-architecture.md](09-product-flow-architecture.md)에 기록한다.

Candidate Principle과 Registry 수정은 작성하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access / Not Logged In |
| Subscription | Not Verified |
| Mobile App | Official App Description Only |
| Secondary Source | Not Used |
| 기반 문서 | Phase 7.1 ~ 7.2 SaveTicker Observation |

## Information Density Observation 요약

| Classification | Observation 수 |
| --- | ---: |
| Density Enabler | 4 |
| Density Control | 4 |
| Density Risk | 5 |
| Scan Pattern | 2 |
| Compression Pattern | 2 |
| Timeline Pattern | 1 |
| Calendar Pattern | 1 |
| Community Density | 1 |
| Progressive Disclosure | 2 |
| Simultaneous Disclosure | 2 |
| Not Verified | 3 |

Information Density Observation 수: 10

## Density Pattern Inventory

| Pattern ID | Pattern | Classification | Surface | Observation Status | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| ST-DEN-001 | News Feed Density | Scan Pattern / Simultaneous Disclosure | News Feed | Observed / Partially Observed | Official Product Observation | High |
| ST-DEN-002 | News Detail Density | Progressive Disclosure / Simultaneous Disclosure | News Detail | Observed / Partially Observed | Official Product Observation | High |
| ST-DEN-003 | AI Summary Density | Compression Pattern / Density Control | News Detail | Observed | Official Product Observation | High |
| ST-DEN-004 | Translation Density | Density Control / Translation Risk | News Detail | Partially Observed | Official Product Observation | Medium |
| ST-DEN-005 | Reports Density | Not Verified / Research candidate | Reports | Partially Observed / Not Verified | Official Product Observation / Inference | Low |
| ST-DEN-006 | Calendar Density | Calendar Pattern / Timeline Pattern | Calendar | Observed / Partially Observed | Official Product Observation | Medium |
| ST-DEN-007 | Community Density | Community Density / Density Risk | Community | Partially Observed | Official Product Observation | Medium |
| ST-DEN-008 | Search Density | Density Control / Not Verified | News / Community Search | Partially Observed / Not Verified | Official Product Observation | Low |
| ST-DEN-009 | Notification Density | Monitoring candidate / App Dependency | Notifications / App | Login Required / Official App Description Only | Official Product Observation / Official App Description | Low |
| ST-DEN-010 | Advertisement Density | Not Verified | Product Content candidate | Not Verified | Inference | Low |

## ST-DEN-001 News Feed Density

Observation:
News Feed는 Today Top News, News heading, Search Field, Source label, latest sort candidate를 한 entry 안에 배치한다. Feed item 전체 metadata, pagination, infinite scroll, thumbnail, reaction count, comment count는 Phase 7.1~7.2에서 모두 확인하지 못했다.

Interpretation:
Feed는 빠른 scan을 위해 selected News block과 repeated News list를 함께 제공하는 구조로 보인다. Today Top News는 high-priority candidate이고, 전체 News list는 broader coverage candidate다.

User Impact:
Decision Speed와 Reading Cost를 낮출 수 있다. 다만 selection rule이 Not Verified이므로 Today Top News를 editorial priority로 확정할 수 없다.

Potential Trade-off:
Summary 의존, selection rule 불명확, Source coverage 미확인, feed return state 미확인.

Evidence:
`02-product-surface-map.md`, `03-screen-inventory.md`, `04-navigation-map.md`.

Confidence:
High for feed structure, Medium for priority Interpretation.

## ST-DEN-002 News Detail Density

Observation:
News Detail examples는 headline, publisher / Source label, timestamp, AI Summary, article body candidate, Translation / Original control, disclaimer, Reaction, Comment area를 같은 detail context 안에 배치한다.

Interpretation:
Detail은 Article consumption, Source check, compression, user response를 동시에 제공한다. News Feed보다 높은 context density를 제공하지만 Community 요소가 Article Evidence와 시각적으로 가까워질 수 있다.

User Impact:
Reading Cost를 줄이고 Original Source 확인 entry를 제공할 수 있다. Reaction과 Comment가 Editorial Importance처럼 보이면 Cognitive Load가 증가할 수 있다.

Potential Trade-off:
Community Noise, Summary 의존, Original Source return state 미확인, all article format coverage 미확인.

Evidence:
`03-screen-inventory.md`, `05-core-journey-observations.md`.

Confidence:
High

## ST-DEN-003 AI Summary Density

Observation:
AI Summary block은 News Detail 안에서 Article body보다 먼저 소비 가능한 compression layer로 기록됐다. Summary method, generation source, update rule은 확인하지 못했다.

Interpretation:
AI Summary는 긴 Article 소비 비용을 줄이는 Density Control이다. Original Article을 대체하는 Evidence가 아니라 Article 접근 전 compression layer로 제한해야 한다.

User Impact:
Reading Cost와 first scan cost를 낮출 수 있다. Summary만 읽고 판단할 경우 Source Context 손실과 Methodology Gap이 발생한다.

Potential Trade-off:
Summary 의존, methodology 미확인, generated content 책임 미확인, Original Text와 비교 비용.

Evidence:
`03-screen-inventory.md`, `05-core-journey-observations.md`.

Confidence:
High for placement, Low for method.

## ST-DEN-004 Translation Density

Observation:
News Detail에 Translation / Original control과 Source label이 함께 기록됐다. 원문 URL, return path, 원문과 번역문 비교 방식은 Not Verified다.

Interpretation:
Translation은 Evidence가 아니라 Convenience Layer로 보는 것이 적절하다. 사용자가 Original Text를 확인할 수 있으면 reading access를 넓히지만, Translation 자체의 책임과 오류 안내가 보이지 않으면 risk가 남는다.

User Impact:
비영어 기사 consumption cost를 낮출 수 있다. 반면 Original Text와 Translation 사이의 nuance loss를 사용자가 인지하기 어렵다.

Potential Trade-off:
Translation Risk, Source Context 손실, return path 미확인.

Evidence:
`03-screen-inventory.md`, `05-core-journey-observations.md`.

Confidence:
Medium

## ST-DEN-005 Reports Density

Observation:
Reports top-level entry는 확인됐지만 Report List body, Source, date, title, detail entry, download, external link, access gate는 충분히 확인하지 못했다.

Interpretation:
Reports는 News보다 Research 단위의 content를 제공하는 후보 Surface다. 그러나 Phase 7.3에서는 Report Surface 존재와 Research role 후보를 넘어서 Density Pattern을 확정하지 않는다.

User Impact:
Report가 구조화된 list와 Source를 제공하면 News consumption 이후 deeper research로 이어질 수 있다. 현재는 확인 제한으로 user benefit을 낮게 기록한다.

Potential Trade-off:
Report Detail 부재, Original Report Traceability 미확인, Login / Subscription boundary 미확인.

Evidence:
`01-product-boundary.md`, `02-product-surface-map.md`, `03-screen-inventory.md`.

Confidence:
Low

## ST-DEN-006 Calendar Density

Observation:
Calendar는 month grid, selected date, local time basis, today button, all / weekly / monthly / custom labels를 제공한다. Event Detail, related News, related Company, related Report는 Not Verified다.

Interpretation:
Calendar는 News Feed와 다른 time-based discovery Pattern이다. Month View는 여러 Event 후보를 date cell 단위로 비교할 수 있게 하지만, Event Detail 부재는 context depth를 제한한다.

User Impact:
투자 일정을 날짜 기준으로 scan할 수 있다. Event type과 related content가 없으면 Decision Speed보다 orientation 중심 benefit에 머문다.

Potential Trade-off:
Event Evidence 부족, date context after transition 미확인, reminder / alert relation 미확인.

Evidence:
`03-screen-inventory.md`, `04-navigation-map.md`, `05-core-journey-observations.md`.

Confidence:
Medium

## ST-DEN-007 Community Density

Observation:
Community는 user news / free board / popular post labels와 Search Field를 제공한다. Post Detail, author, timestamp, ticker tag, moderation, write state는 Not Verified다.

Interpretation:
Community는 News Surface와 분리된 Discussion density를 제공한다. Reaction과 Comment는 user response 후보이며 Financial Evidence나 Editorial Importance가 아니다.

User Impact:
사용자 반응을 확인할 수 있지만 Opinion과 Evidence의 경계가 불명확하면 Cognitive Load와 Trust Risk가 증가한다.

Potential Trade-off:
Community Noise, moderation 미확인, Post Detail 부재, Login 의존.

Evidence:
`02-product-surface-map.md`, `03-screen-inventory.md`, `06-entity-and-state-observations.md`.

Confidence:
Medium

## ST-DEN-008 Search Density

Observation:
News Search Field와 Community Search Field는 확인했다. Search Result, Result Grouping, Suggestion, History, Ticker / Company Result는 Not Verified다.

Interpretation:
Search는 현재까지 Global Entity Router가 아니라 content query entry 후보로 제한된다. Result Grouping이 확인되기 전까지 News / Company / Ticker discovery 품질을 판단하지 않는다.

User Impact:
keyword 기반 narrowing은 가능할 수 있으나, 투자 Entity 전환 효율은 확인되지 않았다.

Potential Trade-off:
Result type 불명확, Search Scope 미확인, query state persistence 미확인.

Evidence:
`03-screen-inventory.md`, `04-navigation-map.md`, `05-core-journey-observations.md`.

Confidence:
Low

## ST-DEN-009 Notification Density

Observation:
Notifications route는 Login Required다. App Description은 keyword, company, economic indicator, report schedule notification 후보를 설명한다. Notification item, timestamp, payload, deep link, Alert Rule UI는 확인하지 못했다.

Interpretation:
Notification은 News consumption을 Monitoring으로 확장하는 candidate density layer다. 하지만 actual App Interaction이 없으므로 payload density와 context restoration은 Not Verified로 둔다.

User Impact:
Monitoring cost를 낮출 가능성이 있다. Login / App dependency가 크고, payload가 Source와 Entity를 포함하는지 확인되지 않았다.

Potential Trade-off:
App dependency, Login dependency, alert fatigue, payload context 미확인.

Evidence:
`00-access-and-method.md`, `02-product-surface-map.md`, `05-core-journey-observations.md`.

Confidence:
Low

## ST-DEN-010 Advertisement Density

Observation:
Display Ad, Native Ad, Sponsored Content, Partner Content, ad-free 여부는 Phase 7.1~7.2에서 확인되지 않았다.

Interpretation:
Advertisement Density는 이번 단계에서 Not Verified로 유지한다. Product Content와 Sponsored Content 구분 가능성은 후속 검증이 필요하다.

User Impact:
Not Verified.

Potential Trade-off:
Product Content 혼동 가능성은 candidate risk지만 Observation으로 확정하지 않는다.

Evidence:
`02-product-surface-map.md`, `03-screen-inventory.md`.

Confidence:
Low

## Density Enabler

| Enabler | Related Pattern | Status | Notes |
| --- | --- | --- | --- |
| Today Top News | ST-DEN-001 | Partially Observed | priority block candidate |
| Source / timestamp inside detail | ST-DEN-002 | Observed / Partially Observed | detail-level context |
| AI Summary | ST-DEN-003 | Observed | compression layer |
| Calendar Month View | ST-DEN-006 | Observed | time-based scan |

## Density Control

| Control | Related Pattern | Status | Notes |
| --- | --- | --- | --- |
| AI Summary | ST-DEN-003 | Observed | Article compression |
| Translation / Original control | ST-DEN-004 | Partially Observed | language layer toggle candidate |
| Search Field | ST-DEN-008 | Partially Observed | content narrowing candidate |
| Calendar view labels | ST-DEN-006 | Partially Observed | date scope control candidate |

## Density Risk

| Risk | Related Pattern | Status | Notes |
| --- | --- | --- | --- |
| Summary 의존 | ST-DEN-003 | Observed / Method Not Verified | Summary is not Original Evidence |
| Translation Risk | ST-DEN-004 | Partially Observed | Original Text comparison Not Verified |
| Community Noise | ST-DEN-007 | Partially Observed | Reaction is not Editorial Importance |
| Search Result ambiguity | ST-DEN-008 | Not Verified | Result Grouping Not Verified |
| App dependency | ST-DEN-009 | Official App Description Only | payload not observed |

## Mobile / App Dependency

Observation:
Mobile App과 Push Notification은 Official App Description Only다. 실제 App screen과 push payload는 확인하지 않았다.

Interpretation:
Monitoring과 Personal Continuity 후보는 App Dependency가 강하다. Public web Observation만으로 personal density를 확정하지 않는다.

Confidence:
Medium for dependency, Low for behavior.

## Open Question

- Today Top News와 전체 News Feed의 selection rule은 무엇인가.
- AI Summary method와 generated content 책임은 어떻게 표시되는가.
- Translation / Original control은 원문과 번역문 비교를 지원하는가.
- Search Result가 type별로 grouping되는가.
- Calendar Event Detail이 Event Context를 충분히 제공하는가.
- Community Post Detail은 Financial Evidence와 Opinion을 어떻게 구분하는가.
- Notification payload가 Source, Ticker, timestamp를 포함하는가.
- Sponsored Content 또는 Advertisement가 Product Content와 분리되는가.
