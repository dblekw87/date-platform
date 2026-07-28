# SaveTicker Core Journey Observations

## 문서 목적

이 문서는 Phase 7.2 범위에서 SaveTicker의 News Consumption Journey, Calendar Journey, Community Journey, Search Journey 후보를 기록한다.

Information Density, Trust / Evidence, Product Flow, Candidate Principle은 작성하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access / Not Logged In |
| Subscription | Not Verified |
| Mobile App | Official App Description Only |
| Secondary Source | Not Used |

## Journey 요약

| 상태 | Journey 수 |
| --- | ---: |
| 완료 가능 | 4 |
| 부분 완료 | 5 |
| 확인 불가 | 3 |

## Journey Inventory

| Journey ID | Journey | 수행 가능 여부 | Observation Status | Entry | Transition | Context Preservation | Context Loss | Restriction | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-J-001 | Breaking News 확인 | 부분 완료 | Partially Observed | News Feed / App notification candidate | News Feed → News Detail candidate | News title, Source, timestamp candidate | push entry and alert source Not Verified | App Only for push | Official Product Observation / Official App Description | Medium | breaking label과 push delivery는 Not Verified |
| ST-J-002 | Today Top News 확인 | 부분 완료 | Partially Observed | News Feed | Today Top News → News Detail candidate | selected News context candidate | selection rule Not Verified | Public | Official Product Observation | Medium | editorial pick인지 ranking인지 Not Verified |
| ST-J-003 | News Feed 소비 | 완료 가능 | Observed | `/news` | News Feed scan → Search / Detail candidate | Feed entry context and sort label candidate | feed item ranking and return state Not Verified | Public | Official Product Observation | High | pagination / infinite scroll Not Verified |
| ST-J-004 | News Detail 읽기 | 완료 가능 | Observed / Partially Observed | News item / direct URL | Detail → AI Summary / Article / Reaction / Comment | Article context inside detail preserved | Original Source transition Not Verified | Public. comment write Login Required candidate | Official Product Observation | High | Original Source URL consistency |
| ST-J-005 | Original Source 확인 | 부분 완료 | Partially Observed | News Detail | Detail → Original control candidate | Source label and original time candidate remain visible before transition | external return path Not Verified | Public | Official Product Observation | Medium | 원문 control target behavior |
| ST-J-006 | AI Summary로 빠르게 파악 | 완료 가능 | Observed | News Detail | Detail → AI Summary block | same Article context inside detail | summary method Not Verified | Public | Official Product Observation | High | AI Summary generation rule |
| ST-J-007 | Reaction / Comment 확인 | 부분 완료 | Partially Observed | News Detail | Detail → Reaction / Comment area | Article context remains inside detail | write permission Not Verified | Public read / Login Required candidate for participation | Official Product Observation | Medium | reaction submission requires login? |
| ST-J-008 | Calendar에서 Event 확인 | 부분 완료 | Partially Observed | Calendar | Calendar month → selected date / event list candidate | selected date context candidate | Event Detail Not Verified | Public / reminder Login Required candidate | Official Product Observation | Medium | actual Event type and related News |
| ST-J-009 | Community Feed 확인 | 부분 완료 | Partially Observed | Community | Community → search / board labels / popular posts candidate | Community category candidate | Post Detail Not Verified | Public read / Login Required write candidate | Official Product Observation | Medium | post detail and write gate |
| ST-J-010 | Community Post 참여 | 확인 불가 | Not Verified | Community Post candidate | Post → Comment / Reaction candidate | Discussion context candidate | participation state Not Verified | Login Required candidate | Inference | Low | comment, edit, report behavior |
| ST-J-011 | Search로 News 찾기 | 확인 불가 | Partially Observed / Not Verified | News Search Field | query → Search Result candidate | query field candidate | Result Grouping Not Verified | Public | Official Product Observation | Low | News / Ticker / Company grouping |
| ST-J-012 | Bookmark / Follow / Alert로 저장 | 확인 불가 | Official App Description Only / Not Verified | News Detail / App / Notifications | content → saved state / alert rule candidate | account / app state candidate | persistence Not Verified | Login Required / App Only | Official App Description / Inference | Low | actual State Owner and restore |

## Journey별 기록

### ST-J-001 Breaking News 확인

Observation:
App Store와 Google Play description은 real-time breaking news와 personalized notifications를 설명한다. Public web에서는 News Feed와 News Detail이 확인됐다.

Interpretation:
Breaking News consumption은 app notification과 News Feed를 통해 시작될 수 있다. 실제 push delivery와 alert payload는 확인하지 못했으므로 App Description 수준으로 제한한다.

Restriction:
Push Notification은 App Only이며 actual delivery는 Not Verified다.

Confidence:
Medium

### ST-J-002 Today Top News 확인

Observation:
News Feed 상단에 Today Top News block이 있다.

Interpretation:
Today Top News는 News Curator 역할 후보로 볼 수 있다. 하지만 editorial pick, popularity ranking, recency rule 중 무엇인지 확인하지 못했다.

Restriction:
selection rule is Not Verified.

Confidence:
Medium

### ST-J-003 News Feed 소비

Observation:
News Feed는 search input, Today Top News, News heading, Source label, latest sort candidate를 표시한다.

Interpretation:
News Feed는 broad News scanning entry다. News와 Article을 분리하면 Feed는 News discovery Surface이고 Detail은 Article / Summary consumption Surface로 볼 수 있다.

Restriction:
pagination, infinite scroll, ranking logic은 Not Verified다.

Confidence:
High

### ST-J-004 News Detail 읽기

Observation:
Reuters example detail은 publisher, category, timestamp, Source, AI Summary, article body, translation / original control, disclaimer, comment area를 포함한다. SAVE-authored example detail은 ticker tag, reaction counts, comment count, disclaimer를 포함한다.

Interpretation:
News Detail은 Aggregation과 Curation이 만나는 지점이다. External Source label과 SaveTicker Summary / translation을 같은 Article context에 둔다.

Restriction:
Article examples는 일부만 확인했다. 모든 Detail이 같은 structure를 갖는지 Not Verified다.

Confidence:
High

### ST-J-005 Original Source 확인

Observation:
Reuters example detail에는 translation / original control과 Source label이 있다.

Interpretation:
Original Source로 이동할 수 있는 후보는 SaveTicker summary와 원문 확인 사이의 bridge로 보인다. 그러나 external transition 후 return path는 확인하지 않았다.

Restriction:
Original Source target URL and return behavior are Not Verified.

Confidence:
Medium

### ST-J-006 AI Summary로 빠르게 파악

Observation:
News Detail은 AI Summary block을 Article body 위에 배치한다.

Interpretation:
AI Summary는 Article consumption cost를 낮추는 Curation / Intelligence element일 수 있다. Summary quality 또는 method는 평가하지 않는다.

Restriction:
AI Summary generation method and coverage are Not Verified.

Confidence:
High

### ST-J-007 Reaction / Comment 확인

Observation:
News Detail에는 reaction count, positive / negative feedback, comment count, sort label candidate가 표시된다.

Interpretation:
Reaction과 Comment는 Community signal 후보이지만 Editorial Signal로 Interpretation하지 않는다. Article context 안에서 user response를 확인하는 layer로 제한한다.

Restriction:
reaction submit, comment write, moderation은 Login Required candidate 또는 Not Verified다.

Confidence:
Medium

### ST-J-008 Calendar에서 Event 확인

Observation:
Calendar는 month grid, local time 기준, selected date, Today button, all / weekly / monthly / custom labels를 제공한다.

Interpretation:
Calendar Journey는 News Consumption을 Event-based monitoring으로 확장할 수 있는 후보 경로다.

Restriction:
Event Detail, Related News, Related Company, Related Report are Not Verified.

Confidence:
Medium

### ST-J-009 Community Feed 확인

Observation:
Community Surface는 search input and user news / free board / popular post labels를 제공한다.

Interpretation:
Community는 Editorial Surface와 별도 책임이다. News reaction과 Community post를 같은 Evidence로 취급하지 않는다.

Restriction:
post item detail and write state are Not Verified.

Confidence:
Medium

### ST-J-010 Community Post 참여

Observation:
Public Product에서 post detail, write, edit, delete, report behavior는 확인하지 못했다.

Interpretation:
Community participation은 User State와 Login Required에 의존할 가능성이 있으나 Phase 7.2에서는 Journey로 확정하지 않는다.

Restriction:
Login Required candidate / Not Verified.

Confidence:
Low

### ST-J-011 Search로 News 찾기

Observation:
News Search Field와 Community Search Field는 확인했다.

Interpretation:
Search는 keyword entry 후보이지만 News, Company, Ticker, Report, Calendar result grouping은 확인되지 않았다.

Restriction:
Search Result is Not Verified.

Confidence:
Low

### ST-J-012 Bookmark / Follow / Alert로 저장

Observation:
App Description은 personalized notifications for keywords, companies of interest, economic indicators, report schedules를 설명한다. Product wording for Bookmark / Follow / saved News was not directly verified.

Interpretation:
SaveTicker의 Personal Continuity는 Notification / Alert Rule 중심일 수 있다. Bookmark / Follow / Saved News는 Phase 7.2에서 Not Verified로 유지한다.

Restriction:
Login Required / App Only / Not Verified.

Confidence:
Low

## Context Preservation Pattern

| Pattern ID | Pattern | Observation Status | Preserved Context | Restriction | Confidence |
| --- | --- | --- | --- | --- | --- |
| ST-J-CTX-001 | Detail-internal Article Context | Observed | headline, Source, timestamp, AI Summary, reaction / comment area | article examples only | High |
| ST-J-CTX-002 | Ticker Tag Context | Partially Observed | ticker tag remains visible inside SAVE detail | target Not Verified | Medium |
| ST-J-CTX-003 | Calendar Date Context | Partially Observed | selected date and view controls | event detail Not Verified | Medium |
| ST-J-CTX-004 | Community Category Context | Partially Observed | board labels and popular post candidate | post detail Not Verified | Low |
| ST-J-CTX-005 | Alert Context | Official App Description Only | keyword, company, economic indicator, report schedule candidate | actual rule UI Not Verified | Low |

## Context Loss

| Loss ID | Context Loss | Observation Status | Restriction | Open Question |
| --- | --- | --- | --- | --- |
| ST-J-LOSS-001 | Original Source 이동 후 SaveTicker return state | Not Verified | external transition | return path가 제공되는가 |
| ST-J-LOSS-002 | News Feed sort / scroll state after detail open | Not Verified | dynamic UI | detail에서 돌아오면 Feed state가 보존되는가 |
| ST-J-LOSS-003 | Ticker Tag target and original News relation | Not Verified | tag click behavior | Ticker Context가 News origin을 보존하는가 |
| ST-J-LOSS-004 | Calendar Event to Related News relation | Not Verified | event detail not observed | event에서 News로 연결되는가 |
| ST-J-LOSS-005 | Community Post to News / Ticker relation | Not Verified | post detail not observed | tag relation이 존재하는가 |
| ST-J-LOSS-006 | Notification to source News relation | Login Required / App Only | not logged in and app not used | notification payload가 source context를 담는가 |

## Access Restriction

| Area | Restriction | Impact |
| --- | --- | --- |
| Profile | Login Required | personal state and personalization journey Not Verified |
| Notifications | Login Required | notification list and alert rule journey Not Verified |
| Push Notification | App Only | breaking news delivery journey Not Verified |
| Comment / Reaction participation | Login Required candidate | read and write responsibility boundary Not Verified |
| Bookmark / Follow / Saved News | Not Verified / Login Required candidate | Personal Continuity not confirmed |

## Open Question

- News Detail examples 외 다른 Detail structure가 같은가.
- Today Top News는 curation, popularity, recency 중 어떤 rule인가.
- Original Source link target and return path는 어떻게 작동하는가.
- Ticker / Company Search Result가 독립 Surface로 연결되는가.
- Calendar Event가 News / Report와 연결되는가.
- Community Post에 Ticker / Company tag가 있는가.
- Alert Rule 생성과 Notification payload가 어떤 Entity를 포함하는가.
