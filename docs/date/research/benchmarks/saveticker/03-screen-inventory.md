# SaveTicker Screen Inventory

## 문서 목적

이 문서는 Phase 7.1 범위에서 SaveTicker Screen Inventory를 기록한다.

Navigation 분석, User Journey, Entity Relationship, User State, Information Density, Trust / Evidence, Candidate Principle은 작성하지 않는다.

## Screen Inventory

| Screen ID | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-SC-001 | Home / News Redirect | Page | `https://www.saveticker.com/` | root access를 News Feed로 연결한다. | News | Market candidate | News Feed | open News Feed | top-level entry | Public Access | Observed | Official Product Observation | High | distinct landing body는 Not Verified |
| ST-SC-002 | News Feed | Feed | `/news` | 오늘 주요뉴스, News list, Source filter candidate를 제공한다. | News | News Source | News Feed, Headline List | open detail, search | 뉴스, 리포트, 커뮤니티, 캘린더, 내 정보, 알림 | Public Access | Observed | Official Product Observation | High | feed item full metadata and ranking are Not Verified |
| ST-SC-003 | News Feed Search Field | Search Result candidate | `/news` | keyword input을 제공한다. | Keyword | News | Search Field | submit query candidate | not analyzed | Public Access | Partially Observed | Official Product Observation | Medium | Suggestion, History, Result Grouping are Not Verified |
| ST-SC-004 | Today Top News | List | `/news` | top News block을 표시한다. | News | Category | Editorial Module candidate | open detail | not analyzed | Public Access | Partially Observed | Official Product Observation | Medium | Save Pick / Editorial Pick 여부 Not Verified |
| ST-SC-005 | News Detail - Reuters Example | Detail | `/news/158361` | Reuters content, AI summary, translation / original controls, Source label을 보여준다. | Article | News Source | Article, Summary, Comment Thread | read article, open original candidate | top-level entry | Public Access | Observed | Official Product Observation | High | external original transition behavior Not Verified |
| ST-SC-006 | News Detail - SAVE Example | Detail | `/news/48228` | SAVE-authored earnings detail, ticker tag, reaction counts, disclaimer를 보여준다. | News | Ticker, Company | Dense Summary, Ticker Tag, Reaction Count | read summary, react candidate | top-level entry | Public Access | Observed | Official Product Observation | High | ticker tag destination Not Verified |
| ST-SC-007 | AI Summary Block | Detail | News Detail | article compression block을 제공한다. | Article | News Source | Summary | scan summary | within detail | Public Access | Observed | Official Product Observation | High | summary generation method Not Verified |
| ST-SC-008 | Original / Translation Control | Detail | News Detail | translated article and original article control을 제공한다. | External Source | Article | Button / Link candidate | open original candidate | within detail | Public Access | Partially Observed | Official Product Observation | Medium | original URL and return behavior Not Verified |
| ST-SC-009 | Reaction Area | Detail | News Detail | reaction count 또는 positive / negative feedback를 표시한다. | Reaction | User | Reaction Count | react candidate | within detail | Public Access / Login Required candidate | Partially Observed | Official Product Observation | Medium | user participation requirement Not Verified |
| ST-SC-010 | Comment Area | Detail | News Detail | comment count and sort order candidate를 표시한다. | Comment | User | Comment Thread | read / write candidate | within detail | Public Access / Login Required candidate | Partially Observed | Official Product Observation | Medium | write permission and moderation Not Verified |
| ST-SC-011 | Reports | List | `/report` | Report Surface entry를 제공한다. | Research Report | Company / Ticker candidate | Report List candidate | open report candidate | top-level entry | Public Access candidate | Partially Observed | Official Product Observation | Low | body extraction was limited to top-level entry |
| ST-SC-012 | Report Detail | Detail | Reports candidate | individual report body 후보를 제공한다. | Research Report | Analyst / Company candidate | Report candidate | read / download candidate | Not Verified | Not Verified | Not Verified | Inference | Low | detail Surface existence Not Verified |
| ST-SC-013 | Calendar Month View | Calendar | `/calendar` | month grid, local time basis, date selection을 제공한다. | Calendar Event | Date | Calendar | select date | whole / weekly / monthly / custom labels | Public Access | Observed | Official Product Observation | High | actual event types Not Verified |
| ST-SC-014 | Calendar List / Selected Date | Calendar | `/calendar` | selected date and event list candidate를 제공한다. | Calendar Event | Economic Indicator candidate | Timeline candidate | open event candidate | today button, filters | Public Access | Partially Observed | Official Product Observation | Medium | event item body not observed |
| ST-SC-015 | Event Detail | Detail | Calendar candidate | event detail 후보를 제공한다. | Calendar Event | Ticker / Company candidate | Detail candidate | set reminder candidate | Not Verified | Not Verified | Not Verified | Inference | Low | Surface existence Not Verified |
| ST-SC-016 | Community Home | Surface | `/community` | user news board, free board, popular post entry를 제공한다. | Community Post | User | Community Thread candidate | open post candidate | top-level entry | Public Access | Partially Observed | Official Product Observation | Medium | post list item details Not Verified |
| ST-SC-017 | Community Search Field | Search Result candidate | `/community` | news tag, title, content search input을 제공한다. | Keyword | Community Post | Search Field | submit query candidate | within community | Public Access | Partially Observed | Official Product Observation | Medium | result grouping and history Not Verified |
| ST-SC-018 | Community Post Detail | Post | Community candidate | individual post and comments 후보를 제공한다. | Community Post | Comment, Reaction | Post, Comment Thread | comment / react candidate | Not Verified | Login Required candidate | Not Verified | Inference | Low | detail Surface and write permission Not Verified |
| ST-SC-019 | Ticker Tag Context | Detail | News Detail | `$AAPL` 같은 ticker tag를 News에 연결한다. | Ticker | News, Company | Ticker Tag | open ticker candidate | within detail | Public Access | Partially Observed | Official Product Observation | Medium | independent ticker page Not Verified |
| ST-SC-020 | Ticker Detail | Detail | ticker URL candidate | ticker-related News, Report, Calendar candidate를 제공한다. | Ticker | Company | Entity Detail candidate | follow / alert candidate | Not Verified | Not Verified | Not Verified | Inference | Low | Surface existence Not Verified |
| ST-SC-021 | Company Detail | Detail | company URL candidate | company-related context candidate를 제공한다. | Company | Ticker | Entity Detail candidate | follow / alert candidate | Not Verified | Not Verified | Not Verified | Inference | Low | Surface existence Not Verified |
| ST-SC-022 | Login | Page | `/login`, `/profile` redirect, `/notifications` redirect | email login, register entry, social sign-in copy를 제공한다. | User | Account | Login Page | login, register | no product top-level entry visible except browse link | Public Access | Observed | Official Product Observation | High | actual provider list and auth success state Not Verified |
| ST-SC-023 | Register Entry | Modal / Page candidate | Login | member registration entry를 제공한다. | User | Account | Button / Form candidate | register | within login | Public Access candidate | Partially Observed | Official Product Observation | Medium | registration form Not Verified |
| ST-SC-024 | Profile | Profile | `/profile` | personal profile 후보를 제공한다. | Profile | User | Profile candidate | manage profile candidate | top-level `내 정보` | Login Required | Login Required | Official Product Observation | High | logged-in body Not Verified |
| ST-SC-025 | Notifications | Notification Center | `/notifications` | notification center 후보를 제공한다. | Notification | Alert Rule | Notification Center candidate | view notifications candidate | top-level `알림` | Login Required | Login Required | Official Product Observation | High | notification list and rule UI Not Verified |
| ST-SC-026 | Alert Rule Settings | Settings | App / Notifications candidate | keyword, company, indicator, report schedule notification 후보를 제공한다. | Alert Rule | Keyword, Company, Calendar Event | Settings candidate | create alert candidate | Not Verified | App Only / Login Required | Official App Description Only | Official App Description | Medium | actual rule UI, frequency, quiet hours Not Verified |
| ST-SC-027 | Mobile App Store Listing | Landing | App Store / Google Play | mobile app value proposition and feature list를 제공한다. | User | Notification, Calendar Event | App Description | install app | app store links | Public Access | Observed | Official App Description | High | actual app screens Not Verified |
| ST-SC-028 | Privacy Policy | Page | privacy policy link | account, usage data, public interaction, push contact policy를 설명한다. | User | Account | Policy Document | read policy | policy sections | Public Access | Observed | Official Policy | High | Product UI mapping Not Verified |
| ST-SC-029 | Subscription / Pricing | Landing candidate | Not Verified | paid tier candidate를 제공한다. | Subscription | Account | Pricing candidate | subscribe candidate | Not Verified | Not Verified | Not Verified | Inference | Low | paid subscription not verified |
| ST-SC-030 | Advertisement / Sponsored Content Candidate | Surface candidate | Not Verified | commercial content 후보를 제공한다. | Advertisement | News candidate | Advertisement candidate | open sponsored content candidate | Not Verified | Not Verified | Not Verified | Inference | Low | ad presence not verified |

## Public Page Inventory

| Page | Screen ID | Status |
| --- | --- | --- |
| Home / News Redirect | ST-SC-001 | Observed |
| News Feed | ST-SC-002 | Observed |
| Reports | ST-SC-011 | Partially Observed |
| Community | ST-SC-016 | Partially Observed |
| Calendar | ST-SC-013 | Observed |
| Login | ST-SC-022 | Observed |

## News Feed Inventory

| Element | Screen ID | Status |
| --- | --- | --- |
| News Feed | ST-SC-002 | Observed |
| Search Field | ST-SC-003 | Partially Observed |
| Today Top News | ST-SC-004 | Partially Observed |
| Source / Latest Sort label | ST-SC-002 | Observed |

## News Detail Inventory

| Element | Screen ID | Status |
| --- | --- | --- |
| Reuters Detail | ST-SC-005 | Observed |
| SAVE Detail | ST-SC-006 | Observed |
| AI Summary | ST-SC-007 | Observed |
| Original / Translation Control | ST-SC-008 | Partially Observed |
| Reaction Area | ST-SC-009 | Partially Observed |
| Comment Area | ST-SC-010 | Partially Observed |

## Search Inventory

| Search Area | Screen ID | Status |
| --- | --- | --- |
| News Search | ST-SC-003 | Partially Observed |
| Community Search | ST-SC-017 | Partially Observed |
| Ticker Search | ST-SC-020 | Not Verified |
| Company Search | ST-SC-021 | Not Verified |
| Report Search | ST-SC-011 | Not Verified |
| Calendar Search | ST-SC-015 | Not Verified |
| Search Suggestion | ST-SC-003 | Not Verified |
| Search History | ST-SC-003 | Not Verified |

## Report Inventory

| Report Area | Screen ID | Status |
| --- | --- | --- |
| Reports | ST-SC-011 | Partially Observed |
| Report Detail | ST-SC-012 | Not Verified |
| Download | ST-SC-012 | Not Verified |
| Subscription Gate | ST-SC-029 | Not Verified |

## Calendar Inventory

| Calendar Area | Screen ID | Status |
| --- | --- | --- |
| Month View | ST-SC-013 | Observed |
| Selected Date | ST-SC-014 | Partially Observed |
| Event Detail | ST-SC-015 | Not Verified |
| Reminder / Alert | ST-SC-026 | Official App Description Only / Not Verified |

## Community Inventory

| Community Area | Screen ID | Status |
| --- | --- | --- |
| Community Home | ST-SC-016 | Partially Observed |
| Community Search | ST-SC-017 | Partially Observed |
| Community Post Detail | ST-SC-018 | Not Verified |
| Write / Edit / Delete | ST-SC-018 | Not Verified |
| Moderation / Report | ST-SC-018 | Not Verified |

## Ticker / Company Inventory

| Area | Screen ID | Status |
| --- | --- | --- |
| Ticker Tag Context | ST-SC-019 | Partially Observed |
| Ticker Detail | ST-SC-020 | Not Verified |
| Company Detail | ST-SC-021 | Not Verified |
| Follow / Alert | ST-SC-026 | Official App Description Only / Not Verified |

## Login / Profile Inventory

| Area | Screen ID | Status |
| --- | --- | --- |
| Login | ST-SC-022 | Observed |
| Register Entry | ST-SC-023 | Partially Observed |
| Profile | ST-SC-024 | Login Required |
| Personalization | ST-SC-024 | Official App Description Only / Login Required |

## Alert / Notification Inventory

| Area | Screen ID | Status |
| --- | --- | --- |
| Notifications | ST-SC-025 | Login Required |
| Alert Rule Settings | ST-SC-026 | Official App Description Only |
| Push Notification | ST-SC-026 | Official App Description Only |
| Notification Delivery | ST-SC-026 | Not Verified |

## Subscription Inventory

| Area | Screen ID | Status |
| --- | --- | --- |
| Subscription / Pricing | ST-SC-029 | Not Verified |
| Paid Feature | ST-SC-029 | Not Verified |
| Ad-free | ST-SC-029 | Not Verified |

## Policy Inventory

| Area | Screen ID | Status |
| --- | --- | --- |
| Privacy Policy | ST-SC-028 | Observed |
| Terms | ST-SC-028 | Not Verified |
| Data Deletion | ST-SC-028 | Official Policy |
| Public Interaction | ST-SC-028 | Official Policy |

## Primary Entity 후보

| Entity Candidate | Status | Related Screen |
| --- | --- | --- |
| Market | Inference | ST-SC-006, ST-SC-013 |
| Stock | Partially Observed | ST-SC-006 |
| Security | Inference | ST-SC-019 |
| Company | Partially Observed | ST-SC-006, ST-SC-021 |
| Ticker | Partially Observed | ST-SC-006, ST-SC-019 |
| News | Observed | ST-SC-002 |
| Article | Observed | ST-SC-005 |
| News Source | Observed | ST-SC-005 |
| Publisher | Observed | ST-SC-005 |
| Category | Observed | ST-SC-005 |
| Topic | Inference | ST-SC-003 |
| Keyword | Official App Description Only | ST-SC-026 |
| Research Report | Partially Observed | ST-SC-011 |
| Analyst | Not Verified | ST-SC-012 |
| Calendar Event | Partially Observed | ST-SC-013 |
| Economic Indicator | Official App Description Only | ST-SC-026 |
| Earnings Event | Partially Observed | ST-SC-006 |
| Corporate Action | Not Verified | ST-SC-015 |
| Community Post | Partially Observed | ST-SC-016 |
| Comment | Partially Observed | ST-SC-010 |
| Reaction | Partially Observed | ST-SC-009 |
| User | Official Policy / Login Required | ST-SC-022 |
| Profile | Login Required | ST-SC-024 |
| Follow | Not Verified | ST-SC-026 |
| Bookmark | Not Verified | ST-SC-026 |
| Alert Rule | Official App Description Only | ST-SC-026 |
| Notification | Login Required | ST-SC-025 |
| Subscription | Not Verified | ST-SC-029 |
| Advertisement | Not Verified | ST-SC-030 |
| External Source | Partially Observed | ST-SC-008 |

## Information Form 후보

| Information Form | Status | Related Screen |
| --- | --- | --- |
| News Feed | Observed | ST-SC-002 |
| Headline List | Observed | ST-SC-002 |
| Card | Partially Observed | ST-SC-004 |
| Dense List | Partially Observed | ST-SC-002 |
| Article | Observed | ST-SC-005 |
| Summary | Observed | ST-SC-007 |
| Ticker Tag | Partially Observed | ST-SC-006 |
| Category Tag | Observed | ST-SC-005 |
| Timeline | Inference | ST-SC-014 |
| Calendar | Observed | ST-SC-013 |
| Report List | Partially Observed | ST-SC-011 |
| Search Result | Not Verified | ST-SC-003 |
| Community Thread | Partially Observed | ST-SC-016 |
| Comment Thread | Partially Observed | ST-SC-010 |
| Reaction Count | Observed | ST-SC-009 |
| Notification | Login Required | ST-SC-025 |
| Profile | Login Required | ST-SC-024 |
| Filter | Partially Observed | ST-SC-002, ST-SC-013 |
| Modal | Not Verified | ST-SC-023 |
| Advertisement | Not Verified | ST-SC-030 |
| External Link | Partially Observed | ST-SC-008 |
