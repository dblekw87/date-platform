# SaveTicker Product Surface Map

## 문서 목적

이 문서는 Phase 7.1 범위에서 SaveTicker Product Surface를 기록한다.

Navigation Flow, User Journey, Entity Relationship, User State, Candidate Principle은 작성하지 않는다.

## Product Surface Inventory

| Surface ID | Surface Name | Product Role | Primary Responsibility | Primary User | Primary Entity | Secondary Entity | Information Form | Primary Entry | Secondary Entry | Access Level | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-SF-001 | Home / News Redirect | Aggregation / Distribution | root access를 News Surface로 연결한다. | public visitor | News | Market candidate | News Feed | `https://www.saveticker.com/` | `/news` | Public Access | Observed | Official Product Observation | High | Home이 별도 landing인지 `/news` redirect인지 product intent 확인 필요 |
| ST-SF-002 | News Feed | Aggregation / Curation | 오늘 주요뉴스와 News list를 제공한다. | news reader | News | News Source | News Feed, Headline List, Search Field | `/news` | root redirect | Public Access | Observed | Official Product Observation | High | ranking rule, pagination, full feed item structure는 Not Verified |
| ST-SF-003 | Today Top News | Curation | selected News block을 News Feed 상단에 노출한다. | news scanner | News | Category | Editorial Module candidate | `/news` | News Detail | Public Access | Partially Observed | Official Product Observation | Medium | Save Pick / Editorial Pick과 동일한지 Not Verified |
| ST-SF-004 | News Detail | Aggregation / Curation / Intelligence | headline, Source, timestamp, AI summary, article body, original / translation control을 제공한다. | article reader | Article | News Source, Ticker | Article, Summary, Comment Thread | News item | direct URL | Public Access | Partially Observed | Official Product Observation | High | original source navigation consistency는 Not Verified |
| ST-SF-005 | SAVE-authored Detail | Financial Media / Intelligence | SAVE-authored market or earnings summary를 제공한다. | investor | News | Ticker, Company | Dense Summary, Ticker Tag, Reaction Count | News item | direct URL | Public Access | Observed | Official Product Observation | High | editorial production process는 Not Verified |
| ST-SF-006 | Search Field | Search / Discovery | query input을 제공한다. | user with keyword intent | Keyword | News, Ticker candidate | Search Field | News Feed, Community | input field | Public Access | Partially Observed | Official Product Observation | Medium | Search Result Surface, Suggestion, History는 Not Verified |
| ST-SF-007 | Search Result | Search / Discovery | query 결과 후보를 제공한다. | search user | News candidate | Ticker / Report / Community candidate | Search Result | Search Field | direct result URL candidate | Public Access | Not Verified | Inference | Low | grouping, ranking, result type은 Not Verified |
| ST-SF-008 | Reports | Research | report entry Surface를 제공한다. | report reader | Research Report | Company / Ticker candidate | Report List candidate | `/report` | top-level entry | Public Access candidate | Partially Observed | Official Product Observation | Low | report cards, source, download, subscription gate는 Not Verified |
| ST-SF-009 | Report Detail | Research | report body 또는 external report candidate를 제공한다. | report reader | Research Report | Analyst / Company candidate | Report candidate | Reports | direct URL candidate | Not Verified | Not Verified | Inference | Low | independent detail URL과 body depth는 Not Verified |
| ST-SF-010 | Calendar | Calendar / Monitoring | dated event view와 view switch를 제공한다. | event-aware investor | Calendar Event | Economic Indicator candidate | Calendar, Timeline candidate | `/calendar` | top-level entry | Public Access | Observed | Official Product Observation | High | actual event categories and detail are Not Verified |
| ST-SF-011 | Event Detail | Calendar / Monitoring | event detail candidate를 제공한다. | event-aware investor | Calendar Event | Ticker / Company candidate | Detail candidate | Calendar date item | direct URL candidate | Not Verified | Not Verified | Inference | Low | event detail, reminder, news relation은 Not Verified |
| ST-SF-012 | Community | Community | user news board, free board, popular post entry를 제공한다. | community reader | Community Post | User, Ticker tag candidate | Community Thread candidate, Search Field | `/community` | top-level entry | Public Access / Login Required 일부 | Partially Observed | Official Product Observation | Medium | write permission, author profile, moderation은 Not Verified |
| ST-SF-013 | Community Post | Community | individual post and comment candidate를 제공한다. | community participant | Community Post | Comment, Reaction | Post, Comment Thread | Community list | direct URL candidate | Login Required candidate | Not Verified | Inference | Low | public post detail and write state are Not Verified |
| ST-SF-014 | Ticker Tag Context | Intelligence / Discovery | News item에 ticker tag를 표시한다. | ticker-oriented reader | Ticker | Company, News | Ticker Tag | News Detail | Search candidate | Public Access | Partially Observed | Official Product Observation | Medium | independent ticker page and tag click behavior are Not Verified |
| ST-SF-015 | Ticker Detail | Entity / Intelligence | ticker-related News, Report, Calendar, Community 후보를 묶는다. | ticker researcher | Ticker | Company | Entity Detail candidate | Ticker tag, Search | direct URL candidate | Not Verified | Not Verified | Inference | Low | Surface existence is Not Verified |
| ST-SF-016 | Company Detail | Entity / Intelligence | company-related context 후보를 묶는다. | company researcher | Company | Ticker | Entity Detail candidate | Search, notification app description | direct URL candidate | Not Verified | Not Verified | Inference | Low | Surface existence is Not Verified |
| ST-SF-017 | Login | Personalization | account access와 register entry를 제공한다. | returning user | User | Account | Login Page | Profile, Notifications | `/login` | Public Access | Observed | Official Product Observation | High | social provider list and login success state are Not Verified |
| ST-SF-018 | Register | Personalization | account creation candidate를 제공한다. | new user | User | Account | Modal / Page candidate | Login | register button | Public Access candidate | Partially Observed | Official Product Observation | Medium | registration form details are Not Verified |
| ST-SF-019 | Profile | Personalization | account profile 후보를 제공한다. | logged-in user | Profile | User | Profile candidate | `/profile` | top-level `내 정보` | Login Required | Login Required | Official Product Observation | High | profile body and personalization state are Not Verified |
| ST-SF-020 | Notifications | Monitoring / Personalization | notification center 후보를 제공한다. | logged-in user | Notification | Alert Rule | Notification Center candidate | `/notifications` | top-level `알림` | Login Required | Login Required | Official Product Observation | High | alert rule UI and notification list are Not Verified |
| ST-SF-021 | Alert / Notification Rule | Monitoring | keyword, company, economic indicator, report schedule alert 후보를 제공한다. | monitoring user | Alert Rule | Keyword, Company, Calendar Event | Settings candidate | App, Notifications | Profile candidate | App Only / Login Required | Official App Description Only | Official App Description | Medium | actual rule builder, frequency, quiet hours are Not Verified |
| ST-SF-022 | Mobile App | Supporting App / Monitoring | app access, push, personalization 후보를 제공한다. | mobile user | User | Notification | App Surface | App Store / Google Play | app install | App Only | Official App Description Only | Official App Description | Medium | actual App Interaction은 Not Verified |
| ST-SF-023 | Privacy Policy | Policy | account, personal data, public interaction, push contact policy를 설명한다. | user | User | Account | Policy Document | App Store / Google Play privacy link | direct URL | Public Access | Observed | Official Policy | High | service-specific UI mapping은 Not Verified |
| ST-SF-024 | Subscription / Pricing | Subscription | paid tier 후보를 제공한다. | subscriber candidate | Subscription | Account | Pricing candidate | Product / App candidate | Not Verified | Not Verified | Not Verified | Inference | Low | paid plan and pricing are Not Verified |
| ST-SF-025 | Advertisement / Sponsored Content Candidate | Distribution | Product Content와 commercial content 후보를 구분한다. | public visitor | Advertisement | News candidate | Advertisement candidate | News / Detail candidate | Not Verified | Not Verified | Not Verified | Inference | Low | display ad, native ad, sponsored content are Not Verified |

## Surface Responsibility Summary

| Responsibility | Surface |
| --- | --- |
| News Aggregation | Home / News Redirect, News Feed, News Detail |
| News Curation | Today Top News, AI Summary, SAVE-authored Detail |
| Intelligence 후보 | News Detail, Ticker Tag Context, Calendar, Reports, Notifications |
| Community | Community, Community Post |
| Monitoring | Notifications, Alert / Notification Rule, Mobile App |
| Calendar | Calendar, Event Detail |
| Research | Reports, Report Detail |
| Personalization | Login, Register, Profile, Notifications, Mobile App |
| Policy | Privacy Policy |
| Subscription 후보 | Subscription / Pricing |

## Capability 분리

| Capability | Related Surface | Access Level | Observation Status | Notes |
| --- | --- | --- | --- |
| Search | News Feed, Community | Public Access | Partially Observed | input field 확인. result grouping은 Not Verified |
| Filter | News Feed, Reports, Calendar candidate | Public Access candidate | Partially Observed | News Feed `전체·최신순`, Calendar `전체 주별 월별 사용자 지정` 확인 |
| Sort | News Feed, Community candidate | Public Access candidate | Partially Observed | News Feed latest sort label 확인. Community popular label 확인 |
| Follow | Ticker / Company / Author candidate | Login Required candidate | Official App Description Only / Inference | app personalization 설명 기반 후보 |
| Watch | Ticker / Company candidate | Login Required candidate | Not Verified | Product wording directly verified 안 됨 |
| Bookmark | News / Report candidate | Login Required candidate | Not Verified | Product wording directly verified 안 됨 |
| React | News Detail, Community | Public Access / Login Required candidate | Partially Observed | reaction counts and positive / negative feedback observed |
| Comment | News Detail, Community | Login Required candidate | Partially Observed | comment area observed. write permission Not Verified |
| Share | News Detail candidate | Public Access candidate | Not Verified | share control not verified in extraction |
| Alert | Notifications, Mobile App | Login Required / App Only | Official App Description Only | keyword, companies of interest, economic indicators, report schedules described in app listing |
| Remind | Calendar | Login Required / App Only candidate | Not Verified | reminder not verified |
| Subscribe | Subscription / Pricing | Not Verified | Not Verified | paid subscription not verified |
| Login | Login | Public Access | Observed | email login, register entry, social sign-in copy observed |
| Register | Login | Public Access candidate | Partially Observed | button observed, form Not Verified |
| Personalize | Mobile App, Profile | Login Required / App Only | Official App Description Only | actual settings Not Verified |
| Open Original Source | News Detail | Public Access | Partially Observed | `원문` control observed |
| Download | Reports candidate | Not Verified | Not Verified | report download not verified |
| Save | News / Report candidate | Login Required candidate | Not Verified | not verified |

## Surface 관계 후보

Phase 7.1에서는 Navigation Flow를 분석하지 않는다. 아래 항목은 Surface existence와 entry visibility 수준의 관계 후보만 기록한다.

| From Surface | To Surface | Relationship Status | Evidence Type | Notes |
| --- | --- | --- | --- | --- |
| Home / News Redirect | News Feed | Observed | Official Product Observation | root URL redirects to `/news` |
| News Feed | News Detail | Partially Observed | Official Product Observation | indexed detail examples 확인 |
| News Detail | Original Source | Partially Observed | Official Product Observation | Reuters example has `원문` control and Source label |
| News Detail | Comment Area | Partially Observed | Official Product Observation | comment count and order control observed |
| News Detail | Ticker Tag Context | Partially Observed | Official Product Observation | `$AAPL` tag observed in SAVE-authored detail |
| Calendar | Event Detail | Not Verified | Inference | event list / detail not confirmed |
| Community | Community Post | Not Verified | Inference | post detail not confirmed |
| Profile | Login | Observed | Official Product Observation | `/profile` redirects to login |
| Notifications | Login | Observed | Official Product Observation | `/notifications` redirects to login |
| Mobile App | Push Notification | Official App Description Only | Official App Description | actual app push not verified |

## Open Question

- Search Result는 별도 Surface인가, Feed filter인가.
- Reports body가 public list로 제공되는가, login gate 또는 app-only Surface인가.
- Calendar event가 News / Report와 연결되는가.
- Community user reaction이 News ranking과 연결되는가.
- Ticker tag click 시 Ticker Detail로 이동하는가.
- Subscription / Paid Feature가 존재하는가.
- Advertisement 또는 sponsored content가 Product Content와 어떻게 구분되는가.
