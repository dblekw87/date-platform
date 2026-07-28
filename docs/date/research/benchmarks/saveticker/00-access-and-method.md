# SaveTicker Access and Method

## 조사 환경

| 항목 | 값 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Device | Desktop |
| Browser | Web extraction / official URL review |
| Public Access | Partially Observed |
| Login | Not Logged In |
| Subscription | Not Verified |
| Mobile App 조사 | Official App Description Only |
| Push Notification 실제 사용 | Not Verified |
| Community Participation | Read-only Public Observation |
| Article Detail 접근 | Partially Observed |
| Search 실제 사용 | Search Field Observed, Search Result Grouping Not Verified |
| Secondary Source 사용 | Not Used |

## Official Source 범위

| Source | URL | 사용 범위 | Evidence Type |
| --- | --- | --- | --- |
| SaveTicker News | https://www.saveticker.com/news | News Feed, Search Field, top-level entry | Official Product Observation |
| SaveTicker Report | https://www.saveticker.com/report | Report Surface 존재 확인 | Official Product Observation |
| SaveTicker Community | https://www.saveticker.com/community | Community Surface, search field, board labels | Official Product Observation |
| SaveTicker Calendar | https://www.saveticker.com/calendar | Calendar Surface, date view, time 기준, view switch | Official Product Observation |
| SaveTicker Profile Gate | https://www.saveticker.com/profile | Login Required boundary | Official Product Observation |
| SaveTicker Notifications Gate | https://www.saveticker.com/notifications | Login Required boundary | Official Product Observation |
| SaveTicker News Detail - Reuters example | https://www.saveticker.com/news/158361 | News Detail, publisher, source, timestamp, AI summary, translation / original controls, comment area | Official Product Observation |
| SaveTicker News Detail - SAVE example | https://www.saveticker.com/news/48228 | SAVE-authored detail, ticker tag, reaction, comment, disclaimer | Official Product Observation |
| Apple App Store - SAVE | https://apps.apple.com/us/app/save-%ED%88%AC%EC%9E%90%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%86%8C%EC%8B%9D-%EC%9D%B4%EC%A0%9C-%ED%95%9C-%EA%B3%B3%EC%97%90%EC%84%9C/id6751139540 | Mobile App, feature description, version history, privacy summary | Official App Description |
| Google Play - SAVE | https://play.google.com/store/apps/details?id=com.savenews.app | Mobile App, feature description, downloads, data safety, support | Official App Description |
| SAVE Privacy Policy | https://www.termsfeed.com/live/6c379a19-b01f-418e-8c94-2c3184bf78cf | Account, Personal Data, push notification, public area interaction policy | Official Policy |

## Secondary Source 사용 여부

Secondary Source는 사용하지 않았다.

Search engine result snippets는 official SaveTicker URL 또는 official App Store / Google Play URL을 찾기 위한 discovery 용도로만 사용했다. 제3자 설명을 Product Observation처럼 사용하지 않았다.

## Access Boundary

| Area | Access Level | Observation Status | Limitation |
| --- | --- | --- | --- |
| News Feed | Public Access | Observed | Dynamic feed item 전체와 ranking logic은 Not Verified |
| News Detail | Public Access | Partially Observed | 일부 article 예시만 확인 |
| Reports | Public Access 후보 | Partially Observed | Report list / detail body는 text extraction에서 제한 |
| Calendar | Public Access | Observed | Event detail과 reminder behavior는 Not Verified |
| Community | Public Access / Login Required 일부 | Partially Observed | 읽기 Surface 일부만 확인. writing, editing, moderation은 Not Verified |
| Profile | Login Required | Observed | login 이후 profile state는 Not Verified |
| Notifications | Login Required | Observed | notification center body와 alert rule UI는 Not Verified |
| Mobile App | App Only | Official App Description Only | 실제 App Interaction은 확인하지 않았다 |
| Push Notification | App Only | Official App Description Only | actual push delivery and rule UI는 Not Verified |
| Subscription / Pricing | Not Verified | Not Verified | 공식 Product에서 paid tier를 확인하지 못했다 |

## Observation Status 정의

| Status | 정의 |
| --- | --- |
| Observed | 공식 Product 화면에서 직접 확인한 항목 |
| Partially Observed | Surface 또는 일부 구조는 확인했으나 body, interaction, state가 제한된 항목 |
| Official Documentation Only | 공식 Help / 안내에서만 확인한 항목 |
| Login Required | 로그인 전에는 접근할 수 없거나 redirect되는 항목 |
| Subscription Required | paid access가 필요한 항목. 이번 Phase 7.1에서는 공식 확인되지 않으면 사용하지 않는다 |
| App Only | mobile app에서만 확인 가능한 항목 |
| Inference | 공식 Evidence에서 제한적으로 도출한 후보 관계 |
| Not Verified | 이번 단계에서 확인하지 못한 항목 |

## Evidence Type 정의

| Evidence Type | 정의 |
| --- | --- |
| Official Product Observation | SaveTicker 공식 Product 화면에서 직접 확인한 page / surface 구조 |
| Official Documentation | SaveTicker 공식 Help / 안내에서 확인한 설명 |
| Official Policy | Terms / Privacy / Policy에서 확인한 접근, account, data handling 설명 |
| Official App Description | App Store / Google Play 공식 app listing의 기능 설명 |
| Official Social | SaveTicker 공식 Social 안내 |
| Secondary Source | 공식 자료로 확인할 수 없는 경우에만 사용하는 제3자 자료 |
| Inference | 공식 Evidence에서 도출한 제한적 Interpretation |

## 조사 제외 범위

- Navigation 분석
- User Journey 작성
- Scenario 수행
- Entity Relationship 확정
- User State 분석
- Information Density 분석
- Trust / Evidence 분석
- Source Traceability 평가
- Editorial Quality 평가
- News Ranking Algorithm 추론
- Product Flow Architecture
- Strength / Friction 종합
- Evidence Hardening
- Candidate Principle
- Registry 업데이트
- Commit / Push

## Confidence 기준

| Confidence | 기준 |
| --- | --- |
| High | 공식 Product 화면에서 Surface 존재와 Access Level을 직접 확인 |
| Medium | 공식 Product 또는 App Description은 있으나 detail interaction, logged-in state, app-only behavior가 제한됨 |
| Low | 공식 Evidence가 간접적이거나 Product responsibility가 후보 수준임 |

## Open Question

- Subscription 또는 paid feature가 존재하는가.
- Search Result Grouping이 News, Ticker, Company, Report, Community, Calendar로 나뉘는가.
- Alert Rule은 keyword, ticker, company, calendar schedule 단위로 설정되는가.
- Follow, Watch, Bookmark의 State Owner와 Persistence는 무엇인가.
- News Detail의 Original Source link가 항상 제공되는가.
- Save Pick 또는 Editorial Pick과 Popular Ranking은 별도 모듈인가.
