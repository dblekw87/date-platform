# SaveTicker Strengths, Frictions and Open Questions

## 문서 목적

이 문서는 Phase 7.4 범위에서 SaveTicker의 Structural Strength, User Friction, Product Role Trade-off, Context Loss, Open Question을 정리한다.

새로운 Product 조사, Candidate Principle, Registry 수정은 수행하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access / Not Logged In |
| Mobile App | Official App Description Only |
| 기반 문서 | SaveTicker Phase 7.1 ~ 7.3 |

## Structural Strength 요약

| Strength Type | 수 |
| --- | ---: |
| Structural Strength | 8 |
| News Feed Strength | 2 |
| News Detail Strength | 2 |
| Compression Strength | 3 |
| Calendar Strength Candidate | 1 |
| Community Strength Candidate | 1 |
| Monitoring Strength Candidate | 1 |
| Trust / Evidence Strength | 4 |

## Structural Strength Inventory

| Strength ID | Pattern Name | Evidence Level | User Benefit | Candidate Principle Readiness |
| --- | --- | --- | --- | --- |
| ST-STR-001 | News Feed Scan Entry | Observed / Partial | Decision Speed, Reading Cost Reduction | Ready with Scope Limitation |
| ST-STR-002 | Today Top News and Feed Split | Partial | Decision Speed, Learnability | Ready with Scope Limitation |
| ST-STR-003 | Detail-internal Article Context | Observed / Partial | Context Preservation, Reading Cost Reduction | Ready |
| ST-STR-004 | AI Summary as Compression Layer | Observed / Method Not Verified | Reading Cost Reduction, Information Density Control | Ready with Scope Limitation |
| ST-STR-005 | Original / Translation Control | Partial | Source Traceability, Reading Cost Reduction | Ready with Scope Limitation |
| ST-STR-006 | Calendar Month View | Observed / Event Not Verified | Timeline Awareness | Needs Additional Evidence |
| ST-STR-007 | Community Response Layer | Partial | Discussion Awareness | Needs Additional Evidence |
| ST-STR-008 | App-based Monitoring Candidate | Official App Description Only / Login Required | Monitoring Efficiency | Needs Additional Evidence |

## ST-STR-001 News Feed Scan Entry

Observation:
News Feed는 Today Top News, News heading, Search Field, Source label, latest sort candidate를 제공한다.

Evidence Level:
Observed / Partial

Why It May Work:
News Feed는 첫 진입에서 headline scan과 detail 진입을 한 Surface 안에 배치한다. 사용자는 broad News scan에서 Article consumption으로 이동할 수 있다.

User Benefit:
Decision Speed, Reading Cost Reduction, Discoverability

Conditions Required:
Feed item metadata, Source, timestamp, sort state가 충분히 일관되어야 한다.

Potential Trade-off:
Selection Methodology 불명확, Source Coverage 미확인, Feed Position 복원 미확인

Candidate Principle Readiness:
Ready with Scope Limitation

## ST-STR-002 Today Top News and Feed Split

Observation:
News Feed는 Today Top News block과 전체 News list를 분리해 노출한다.

Evidence Level:
Partial

Why It May Work:
Top News는 scan 비용을 낮추고, 전체 list는 coverage 후보를 제공할 수 있다.

User Benefit:
Decision Speed, Learnability

Conditions Required:
Top News selection rule과 labeling이 명확해야 한다.

Potential Trade-off:
Selection Methodology 불명확, editorial / algorithmic curation 구분 미확인

Candidate Principle Readiness:
Ready with Scope Limitation

## ST-STR-003 Detail-internal Article Context

Observation:
News Detail examples는 headline, Publisher / Source, timestamp candidate, AI Summary, Translation / Original control, Reaction, Comment area를 같은 Article context 안에 둔다.

Evidence Level:
Observed / Partial

Why It May Work:
사용자는 detail Surface에서 summary, Source check, user response를 동시에 확인할 수 있다.

User Benefit:
Context Preservation, Source Traceability, Reading Cost Reduction

Conditions Required:
Community response와 Financial Evidence가 명확히 분리되어야 한다.

Potential Trade-off:
Community Noise, Detail 요소 혼합, Original Source Return Path 부재

Candidate Principle Readiness:
Ready

## ST-STR-004 AI Summary as Compression Layer

Observation:
AI Summary는 News Detail 내부 compression layer로 확인됐다. Methodology와 generated content 책임은 Not Verified다.

Evidence Level:
Observed / Method Not Verified

Why It May Work:
긴 Article을 먼저 압축해 Reading Cost를 낮출 수 있다.

User Benefit:
Reading Cost Reduction, Information Density Control

Conditions Required:
AI Summary가 Original Article을 대체하지 않는다는 구분과 Original Source access가 유지되어야 한다.

Potential Trade-off:
Summary 의존, Methodology Gap, Source Context 손실

Candidate Principle Readiness:
Ready with Scope Limitation

## ST-STR-005 Original / Translation Control

Observation:
News Detail은 Translation / Original control과 Source label을 함께 제공한다.

Evidence Level:
Partial

Why It May Work:
Translation은 non-native language content 접근 비용을 낮추고, Original control은 Source check 후보를 제공한다.

User Benefit:
Reading Cost Reduction, Source Traceability

Conditions Required:
Translation responsibility, Original Text comparison, Return Path가 확인되어야 한다.

Potential Trade-off:
Translation 오류, Original Text와 비교 비용, External Return Path 부재

Candidate Principle Readiness:
Ready with Scope Limitation

## ST-STR-006 Calendar Month View

Observation:
Calendar는 Month View, selected date, local time basis, view label을 제공한다. Event Detail과 related News / Report는 Not Verified다.

Evidence Level:
Observed / Event Not Verified

Why It May Work:
News를 시간 기반 Event Discovery로 확장할 수 있는 후보 구조다.

User Benefit:
Timeline Awareness

Conditions Required:
Event Detail, Event Source, related News / Report가 연결되어야 한다.

Potential Trade-off:
Event Evidence 부족, Calendar Surface를 Event Traceability로 과장할 위험

Candidate Principle Readiness:
Needs Additional Evidence

## ST-STR-007 Community Response Layer

Observation:
News Detail에는 Reaction / Comment area가 있고 Community Surface는 board labels와 Search Field를 제공한다.

Evidence Level:
Partial

Why It May Work:
News 소비 후 사용자 반응을 확인하는 Discussion Awareness를 제공할 수 있다.

User Benefit:
Discussion Awareness

Conditions Required:
Community Opinion과 Financial Evidence가 분리되어야 하며 moderation이 확인되어야 한다.

Potential Trade-off:
Community Noise, Reaction과 Trust Signal 혼동

Candidate Principle Readiness:
Needs Additional Evidence

## ST-STR-008 App-based Monitoring Candidate

Observation:
Notifications는 Login Required이고 App Description은 keyword, company, economic indicator, report schedule notification 후보를 설명한다.

Evidence Level:
Official App Description Only / Login Required

Why It May Work:
News Consumption을 user-specific Monitoring으로 확장할 수 있다.

User Benefit:
Monitoring Efficiency

Conditions Required:
Alert Rule, payload, deep link, notification timestamp가 확인되어야 한다.

Potential Trade-off:
Login 의존, App 의존, Notification Overload, payload context 미확인

Candidate Principle Readiness:
Needs Additional Evidence

## User Friction Inventory

| Friction ID | Trigger | Affected User | Affected Surface | Observation Status | User Cost | Decision Impact | Reading Impact | Monitoring Impact | Workaround | Access Restriction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-FR-001 | Today Top News selection | News scanner | News Feed | Not Verified | priority 판단 비용 | 중요도 판단 보류 | Low | None | 전체 Feed 확인 | Public | Medium | selection rule |
| ST-FR-002 | AI Summary method | Article reader | News Detail | Not Verified | summary trust calibration 비용 | Summary 의존 위험 | Medium | None | Original control 확인 | Public | Medium | method disclosure |
| ST-FR-003 | AI error correction | Article reader | News Detail | Not Verified | 오류 인지 비용 | 판단 왜곡 위험 | Medium | None | Original Article 확인 | Public | Low | correction policy |
| ST-FR-004 | Translation method | Article reader | News Detail | Not Verified | Translation trust 비용 | nuance loss | Medium | None | Original Text 확인 | Public | Medium | translation owner |
| ST-FR-005 | Original comparison | Article reader | News Detail | Partial / Not Verified | 비교 비용 | Source check 지연 | Medium | None | external original candidate | Public | Medium | side-by-side support |
| ST-FR-006 | Original Source Return Path | Evidence checker | External Source | Not Verified | context 복귀 비용 | revalidation 지연 | High | None | browser Back candidate | External transition | Medium | return path |
| ST-FR-007 | Feed Position restore | News scanner | News Feed | Not Verified | scan 재개 비용 | Low | Medium | None | browser Back candidate | Public | Low | feed state |
| ST-FR-008 | Ticker Tag destination | Ticker-oriented user | News Detail | Not Verified | next action ambiguity | Entity follow-up 지연 | Low | None | Search candidate | Public | Medium | tag target |
| ST-FR-009 | Company / Ticker Surface | Ticker researcher | Entity candidate | Not Verified | relation 확인 불가 | High | Low | None | external research | Not Verified | Low | independent Surface |
| ST-FR-010 | Search Result Grouping | Search user | Search | Not Verified | result 판단 비용 | Medium | Low | None | manual scanning | Public | Low | result groups |
| ST-FR-011 | Search Suggestion | Search user | Search | Not Verified | disambiguation 비용 | Medium | Low | None | full query | Public | Low | suggestion behavior |
| ST-FR-012 | Report Detail | Report reader | Reports | Not Verified | deeper research 불가 | Medium | Medium | None | Not Verified | Not Verified | Low | detail body |
| ST-FR-013 | Original Report Traceability | Evidence checker | Reports | Not Verified | Source check 불가 | High | Medium | None | external search | Not Verified | Low | original document |
| ST-FR-014 | Calendar Event Detail | event-aware user | Calendar | Not Verified | Event 이해 비용 | Medium | Low | Medium | date scan only | Public | Low | event detail |
| ST-FR-015 | Calendar relation | event-aware user | Calendar | Not Verified | News / Report 연결 불가 | Medium | Low | Medium | manual search | Public | Low | related content |
| ST-FR-016 | Community Post Detail | community reader | Community | Not Verified | Discussion context 부족 | Low | Medium | None | Not Verified | Login candidate | Low | post detail |
| ST-FR-017 | Community participation | community participant | Community | Not Verified | 참여 가능성 불명확 | Low | Low | None | Login candidate | Login Required candidate | Low | write gate |
| ST-FR-018 | Community moderation | community reader | Community | Not Verified | trust calibration 비용 | Medium | Medium | None | ignore reactions | Not Verified | Low | moderation |
| ST-FR-019 | Reaction boundary | article reader | News Detail | Partial | importance 혼동 비용 | Medium | Medium | None | Source 먼저 확인 | Public / Login candidate | Medium | reaction semantics |
| ST-FR-020 | Alert Rule | monitoring user | Notifications / App | Not Verified | monitoring setup 불가 | Medium | Low | High | app install candidate | Login / App | Low | rule builder |
| ST-FR-021 | Notification Payload | monitoring user | App | Not Verified | trigger 이해 비용 | Medium | Low | High | open app candidate | App Only | Low | payload context |
| ST-FR-022 | Bookmark Persistence | returning user | News Detail | Not Verified | revisit 불가 | Medium | Medium | None | browser bookmark | Login candidate | Low | saved state |
| ST-FR-023 | Follow Persistence | monitoring user | App / Profile | Not Verified | monitored targets 불명확 | Medium | Low | Medium | notification claim | Login / App candidate | Low | follow list |
| ST-FR-024 | Reading History | returning user | Profile candidate | Not Verified | 재방문 비용 | Medium | Medium | None | browser history | Login candidate | Low | reading history |
| ST-FR-025 | Subscription Boundary | subscriber candidate | Product | Not Verified | feature expectation 불명확 | Low | Low | Low | Not Verified | Not Verified | Low | paid tier |
| ST-FR-026 | Advertisement Boundary | public visitor | Product Content | Not Verified | content 구분 비용 후보 | Low | Low | None | Not Verified | Not Verified | Low | sponsored content |
| ST-FR-027 | Mobile / App dependency | monitoring user | App | Official App Description Only | app install 의존 | Medium | Low | High | public web only | App Only | Medium | app behavior |
| ST-FR-028 | News Intelligence role overstatement | researcher | Cross-surface candidate | Inferred / Not Verified | 구조 오판 위험 | High | Medium | Medium | scope limitation | mixed | Medium | verified relation |

User Friction 수: 28

## Risk 요약

| Risk Type | 수 | 대표 항목 |
| --- | ---: | --- |
| AI Summary Risk | 3 | method, error correction, Source Context loss |
| Translation Risk | 3 | method, comparison cost, responsibility gap |
| Community Trust Risk | 2 | Reaction boundary, moderation gap |
| Product Role Trade-off | 7 | Aggregation, Curation, Intelligence, Community, Monitoring, Calendar, Research |

## Product Role Assessment

| Role | Supporting Surface | Supporting Flow | Evidence Level | User Benefit | Potential Trade-off | Access Dependency | Confidence | Principle Extraction Readiness | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Aggregation | News Feed, News Detail | Aggregation Flow | Observed / Inferred | Source scan | Source Coverage / ranking unknown | Public | Medium | Ready with Scope Limitation | provider coverage |
| Curation | Today Top News, AI Summary | Curation Flow | Observed / Partial | Reading Cost Reduction | Selection Methodology / summary method gap | Public | Medium | Ready with Scope Limitation | selection rule |
| Intelligence | AI Summary, Ticker Tag, Calendar, Notification | News Intelligence Flow | Partial / Not Verified | News to action candidate | relation overstatement | Public / App | Low | Needs Additional Evidence | verified relation |
| Community | Community, Reaction, Comment | Community Flow | Partial / Not Verified | Discussion Awareness | Community Noise | Login candidate | Low to Medium | Needs Additional Evidence | moderation |
| Monitoring | Notifications, Push | Monitoring Flow | Official App Description Only / Login Required | Monitoring Efficiency | App dependency, payload gap | Login / App | Low | Needs Additional Evidence | payload |
| Calendar | Calendar | Calendar Flow | Observed entry / Not Verified relation | Timeline Awareness | Event Detail gap | Public | Low to Medium | Needs Additional Evidence | Event Evidence |
| Research | Reports | Report candidate | Partial / Not Verified | deeper research candidate | Original Report Traceability gap | Not Verified | Low | Needs Additional Evidence | Report Detail |

## AI Summary Assessment

| Assessment Item | Result |
| --- | --- |
| Role | Compression Layer / Interpretation Layer candidate |
| Evidence 여부 | Original Evidence가 아니다 |
| Label Visibility | Observed |
| Placement | News Detail 내부 |
| Original Source Access | Partial |
| Methodology Visibility | Not Verified |
| Error Correction | Not Verified |
| Update Time | Not Verified |
| Decision Risk | Summary 의존과 Methodology Gap |
| Principle Extraction Readiness | Ready with Scope Limitation |

## Translation Assessment

| Assessment Item | Result |
| --- | --- |
| Role | Convenience Layer |
| Original Text | Original control candidate |
| Translation Methodology | Not Verified |
| Source 유지 | Detail context에서 Partial |
| Publisher 유지 | Partial |
| Error 안내 | Not Verified |
| Evidence Risk | Translation을 Original Evidence로 오해할 위험 |
| Principle Extraction Readiness | Ready with Scope Limitation |

## Trust / Evidence Assessment

| Signal | Source Visibility | Publisher Visibility | Freshness Visibility | Methodology Visibility | Original Source Access | Entity Traceability | Context Preservation | Access Restriction | Confidence | Principle Extraction Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Publisher Label | Partial | Observed | Partial | Not Applicable | Partial | Not Applicable | page context | Public | High | Ready with Scope Limitation |
| Source Label | Observed / Partial | Partial | Partial | Not Applicable | Partial | Not Applicable | page context | Public | High | Ready with Scope Limitation |
| AI Summary Label | Observed | nearby Source candidate | Not Verified | Not Verified | Partial | Not Applicable | page context | Public | Medium | Ready with Scope Limitation |
| Translation Control | Partial | nearby publisher candidate | Partial | Not Verified | Partial | Not Applicable | page context | Public | Medium | Ready with Scope Limitation |
| Ticker Tag | Partial | Not Applicable | Not Applicable | Not Applicable | Not Applicable | Not Verified | page context | Public | Low | Needs Additional Evidence |
| Calendar Event | Not Verified | Not Verified | Partial date only | Not Verified | Not Verified | Not Verified | date context candidate | Public | Low | Needs Additional Evidence |
| Report | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Surface only | Not Verified | Low | Needs Additional Evidence |
| Notification | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | payload Not Verified | Login / App | Low | Needs Additional Evidence |

## Information Density Assessment

| Pattern | Evidence Level | User Benefit | Potential Trade-off | Reading Cost | Decision Risk | Mobile / App Dependency | Cross Benchmark Comparison | Principle Extraction Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| News Feed Density | Observed / Partial | scan speed | selection rule gap | Low | Medium | No | Yahoo News, Finviz News | Ready with Scope Limitation |
| News Detail Density | Observed / Partial | context in one detail | mixed community layer | Medium | Medium | No | Yahoo Quote News, Bloomberg Article | Ready |
| Compression Pattern | Observed / Partial | Reading Cost Reduction | Summary / Translation risk | Low | Medium | No | EidosLayer generated summary, Yahoo article summary candidate | Ready with Scope Limitation |
| Timeline Pattern | Partial / App Description | Timeline Awareness | Freshness Gap | Low | Medium | App for notification | Bloomberg News alerts, Yahoo Markets | Needs Additional Evidence |
| Density Risk | Partial / Not Verified | Not Applicable | over-compression, noise, ambiguity | Medium | High | App candidate | all benchmarks | Needs Additional Evidence |

## Context Preservation Assessment

| Context | Context Owner | Persistence Scope | Page Transition 후 유지 여부 | External Transition 후 유지 여부 | Login Required 여부 | App Only 여부 | Evidence Level | Context Loss Risk | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| News Feed Position | Browser / Surface | session candidate | Not Verified | Not Applicable | No | No | Not Verified | High | return state |
| Today Top News Origin | News Feed | session candidate | Partial | Not Applicable | No | No | Partial | Medium | origin marker |
| Search Query | Search Field | session candidate | Not Verified | Not Applicable | No | No | Partial | Medium | query persistence |
| Search Scope | News / Community | Surface candidate | Not Verified | Not Applicable | No | No | Partial | Medium | scope label |
| News Category | News Feed | session candidate | Partial | Not Applicable | No | No | Partial | Medium | category state |
| News Detail | Article | page | Observed | Not Verified | No | No | Observed | Medium | external transition |
| Publisher | Article | page | Observed | Not Verified | No | No | Observed | Medium | Source taxonomy |
| Source | Article | page | Partial | Not Verified | No | No | Partial | Medium | Source relation |
| Ticker Tag | Article | page candidate | Partial | Not Verified | No | No | Partial | High | destination |
| Original / Translation State | Article | page candidate | Partial | Not Verified | No | No | Partial | Medium | toggle state |
| Original Source | External Article | external | Not Verified | Not Verified | No | No | Partial | High | return path |
| Calendar Date | Calendar | session candidate | Partial | Not Applicable | No | No | Partial | Medium | Event transition |
| Calendar Event | Event | Not Verified | Not Verified | Not Applicable | candidate | No | Not Verified | High | Event Detail |
| Community Category | Community | session candidate | Partial | Not Applicable | No | No | Partial | Medium | Post Detail |
| Community Post | Post | Not Verified | Not Verified | Not Applicable | candidate | No | Not Verified | High | post relation |
| Notification | User | account / app | Not Verified | Not Verified | Yes | App candidate | Login / App Description | High | payload |
| Alert Rule | User | account / app | Not Verified | Not Verified | Yes | Yes | App Description Only | High | rule structure |
| Bookmark | User | account candidate | Not Verified | Not Verified | candidate | candidate | Not Verified | High | existence |
| Follow | User | account / app candidate | Not Verified | Not Verified | candidate | candidate | App Description / Not Verified | High | target type |
| Reading History | User | account / browser candidate | Not Verified | Not Verified | candidate | candidate | Not Verified | High | existence |
| Profile | User | account | Not Verified | Not Applicable | Yes | No | Login Required | High | profile body |

Context Preservation Pattern 수: 21

## Context Loss 지점

| Loss ID | Context Loss Point | Evidence Level | Notes |
| --- | --- | --- | --- |
| ST-SYN-LOSS-001 | News Detail → Original Source → SaveTicker Return | Not Verified | Return Path not observed |
| ST-SYN-LOSS-002 | News Feed → Detail → Feed state | Not Verified | position / sort restore not observed |
| ST-SYN-LOSS-003 | Ticker Tag → Ticker / Company Context | Not Verified | tag destination not observed |
| ST-SYN-LOSS-004 | Calendar Date → Event Detail | Not Verified | Event Detail not observed |
| ST-SYN-LOSS-005 | Community → Post Detail | Not Verified | post detail and relation not observed |
| ST-SYN-LOSS-006 | Notification → News Detail | Login Required / App Only | payload and deep link not observed |
| ST-SYN-LOSS-007 | Bookmark / Follow → Revisit | Not Verified | persistence not observed |

Context Loss 지점 수: 7

## Product Responsibility Matrix

| Product Element | Surface | Tool | Entity | User-owned Entity | User State | Contextual Content | External Evidence | Capability | Primary Responsibility | Secondary Responsibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| News Feed | Yes | No | News | No | feed state candidate | Yes | No | Search / Filter candidate | News scan | Curation entry |
| Today Top News | Yes | No | News | No | No | Yes | No | open detail | selected News exposure | compression entry candidate |
| News Detail | Yes | No | Article | No | reaction / comment candidate | Yes | Partial | original, translation, react, comment | Article consumption | Source check |
| AI Summary | No | Yes | Article | No | No | Yes | No | summarize | compression | interpretation layer candidate |
| Original Text | No | No | Article | No | No | Yes | Yes | read original candidate | source verification | Translation comparison |
| Translation | No | Yes | Article | No | state candidate | Yes | No | language access | convenience layer | reading cost reduction |
| Publisher | No | No | Publisher | No | No | Yes | Yes | label | content owner signal | Source separation |
| Source | No | No | Source | No | No | Yes | Yes | label / link candidate | Source visibility | Original access candidate |
| Original Source | No | No | External Source | No | No | No | Yes | open original | Original Article Traceability candidate | external transition |
| Ticker Tag | No | contextual element | Ticker | No | Follow candidate | Yes | No | open ticker candidate | Entity relation candidate | News context extension |
| Search | Surface candidate | Yes | Keyword | No | query state candidate | No | No | query | content narrowing | discovery candidate |
| Search Result | Surface candidate | No | News / Ticker candidate | No | query state candidate | Yes | No | open result | result display candidate | grouping Not Verified |
| Reports | Yes | No | Report | No | saved report candidate | Yes | Not Verified | search / filter candidate | Research entry | company / ticker support candidate |
| Report Detail | Candidate | No | Report | No | No | Yes | Not Verified | download / original candidate | report consumption candidate | Original Report Traceability candidate |
| Calendar | Yes | No | Calendar Event candidate | No | date state candidate | Yes | Not Verified | date select | Timeline Awareness | Event discovery candidate |
| Calendar Date | No | No | Date / Event candidate | No | selected date candidate | Yes | No | select date | date context | Event grouping |
| Calendar Event | Candidate | No | Calendar Event | No | reminder candidate | Yes | Not Verified | open event | Event detail candidate | related News candidate |
| Community | Yes | No | Community Post candidate | User candidate | category state candidate | Yes | No | search / open post | Discussion entry | community scan |
| Community Post | Candidate | No | Community Post | User candidate | comment state candidate | Yes | No | comment / react | Discussion object candidate | related News candidate |
| Comment | No | Tool candidate | Comment | User candidate | comment state | Yes | No | write / read candidate | user response | Discussion context |
| Reaction | No | Tool candidate | Reaction | User candidate | reaction state | Yes | No | react candidate | user response signal | not Trust Signal |
| Notifications | Yes | No | Notification | User candidate | notification state | Yes | No | view notification | Monitoring entry | Personal Continuity candidate |
| Push Notification | App Surface | Tool candidate | Notification | User candidate | app notification state | Yes | No | push | monitoring delivery candidate | App dependency |
| Alert Rule | No | Tool candidate | Alert | User candidate | alert rule | Yes | No | create alert candidate | trigger candidate | notification condition |
| Bookmark | No | Tool candidate | Bookmark | User candidate | saved state | Yes | No | save candidate | revisit candidate | Not Verified |
| Follow | No | Tool candidate | Follow | User candidate | follow state | Yes | No | follow candidate | monitoring target candidate | App Description only |
| Saved News | Candidate | No | News | User candidate | saved news state | Yes | No | revisit candidate | Personal Continuity candidate | Not Verified |
| Reading History | Candidate | No | Article | User candidate | reading state | Yes | No | revisit candidate | Personal Continuity candidate | Not Verified |
| Profile | Yes | No | User / Profile | User candidate | profile state | No | No | manage profile candidate | personal account | Login Required |
| Privacy Policy | Yes | No | User / Account | User candidate | data state candidate | No | No | policy read | Product Transparency | data policy |
| Official App Description | Supporting App | No | User / Notification | User candidate | app state candidate | Yes | No | install / learn | App responsibility | Monitoring claim |
| Advertisement | Candidate | No | Advertisement | No | No | content candidate | No | open ad candidate | commercial content candidate | Not Verified |

Product Responsibility Matrix 항목 수: 32

## Cross Benchmark Note

| Classification | 수 | Pattern |
| --- | ---: | --- |
| Shared Pattern | 7 | News Feed Scan, Source / Timestamp Signal, External Original Source, Entity Tag, Personal Continuity, Alert / Monitoring, Calendar-based Discovery |
| Variant Pattern | 7 | AI Summary vs Raw Headline Feed, Today Top News vs Market Summary, News-first Entry vs Quote / Screener / Workspace Entry, External Original Source vs Embedded Evidence, Community Reaction vs Professional Collaboration, Calendar Surface vs Economic Calendar Tool, App Push vs Terminal Alert |
| Benchmark-specific Pattern | 5 | AI Summary + Translation + Original Source, News-first Intelligence Layer candidate, Today Top News Curation, Community와 News Detail 병치, Public Calendar + Notification candidate |
| Potential Contradiction | 0 | 직접 반대 Evidence 없음 |
| Insufficient Evidence | 14 | Ranking Methodology, Selection Methodology, Search Result Grouping, Ticker Destination, Calendar Relation, Report Detail, Original Report Traceability, Community Moderation, Alert Rule, Notification Payload, Bookmark / Follow Persistence, Reading History, Subscription, Advertisement |

## Do Not Copy

- AI Summary를 Original Evidence처럼 취급하지 않는다.
- Translation을 Original Text와 동일한 Evidence로 취급하지 않는다.
- Today Top News selection rule 없이 curation success를 확정하지 않는다.
- Ticker Tag만 보고 Entity Navigation을 확정하지 않는다.
- Calendar Surface 존재만으로 Event Evidence Traceability를 확정하지 않는다.
- Community Reaction을 Trust Signal 또는 Editorial Importance로 취급하지 않는다.
- Official App Description만으로 Notification payload와 Personal Continuity를 확정하지 않는다.

## Open Question

- AI Summary Methodology와 error correction은 어떻게 표시되는가.
- Translation Responsibility와 Original Text comparison은 제공되는가.
- Original Source Return Path는 있는가.
- Today Top News selection rule은 무엇인가.
- Ticker Tag destination과 relation type은 무엇인가.
- Calendar Event Detail은 Source와 related News / Report를 갖는가.
- Report Detail은 Original Report Traceability를 제공하는가.
- Community Moderation과 author identity는 확인 가능한가.
- Alert Rule과 Notification Payload는 Source, timestamp, related Entity를 포함하는가.
- Bookmark / Follow / Saved News / Reading History persistence는 존재하는가.
