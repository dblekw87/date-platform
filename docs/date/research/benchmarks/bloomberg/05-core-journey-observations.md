# Bloomberg Core Journey Observations

## 문서 목적

이 문서는 Phase 6.2 범위에서 Bloomberg Public Journey, Professional Workflow 후보, Terminal Journey 후보를 기록한다.

Terminal Journey는 실제 클릭 Flow가 아니다. Bloomberg Terminal 직접 session이 없으므로 Official Product Description과 Official Documentation 기준의 workflow 후보로만 작성한다.

## Journey Status 요약

| Status | 수 |
| --- | ---: |
| 완료 가능 | 4 |
| 부분 완료 | 14 |
| 확인 불가 | 8 |
| Total | 26 |

## Public Journey

| Journey ID | Journey | Entry | Transition | Context Preservation | Context Loss | Restriction | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-PJ-001 | Home에서 Market과 News 확인 | Bloomberg.com Home | Home → headlines / video / Market Data footer | page-level category context candidate | personalized / logged-in state Not Verified | Public / Subscription CTA | 부분 완료 | Official Product Observation | High | Home block order and paywall state |
| BBG-PJ-002 | Markets에서 asset class 확인 | Markets | Markets → Top Securities / Stocks / Commodities / Currencies / Rates & Bonds | Market category context 유지 candidate | row detail transition Not Verified | Public | 완료 가능 | Official Product Observation | High | Market row to Quote behavior |
| BBG-PJ-003 | Public Quote 확인 | Quote URL / Market row candidate | Quote → Overview / Key Statistics candidate | ticker context candidate | AAPL direct body bot challenge | Public / bot challenge candidate | 부분 완료 | Official Product Observation | Medium | full Quote module inventory |
| BBG-PJ-004 | News Article 읽기 | Headline | Home / Markets → Article | article category candidate | return path and related Entity context Not Verified | Public / Subscription Required candidate | 부분 완료 | Official Product Observation | High | paywall and related security links |
| BBG-PJ-005 | Public Search 사용 | header Search | Search entry → Search result candidate | query context Not Verified | result grouping Not Verified | Public | 확인 불가 | Official Product Observation / Inference | Low | Search result Surface 확인 필요 |
| BBG-PJ-006 | Digital Subscription 진입 | Subscribe CTA | Subscribe → plan / Subscription Finder | subscription plan context 유지 | post-subscription entitlement Not Verified | Subscription Required | 완료 가능 | Official Pricing / Sales | High | subscriber UI and account state |

## Professional Workflow 후보

| Workflow ID | Workflow | Entry | Transition | Context Preservation | Context Loss | Restriction | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-PW-001 | Security 검색 | Command Entry / Security Lookup candidate | Terminal → Command Entry → Security detail candidate | Security Context candidate | command parsing Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | Function and Security disambiguation |
| BBG-PW-002 | Company Research | Research / Bloomberg Intelligence | Terminal → Research → BI / company / industry research candidate | Company / Industry context candidate | exact screen transition Not Verified | Institutional Access Required / Additional Product candidate | 부분 완료 | Official Product Description | Medium | BI module entry and Source scope |
| BBG-PW-003 | Market Monitor | Launchpad / Market Data | Terminal → Launchpad → multi-asset monitor candidate | security monitor list candidate | layout persistence Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | monitor configuration and restore |
| BBG-PW-004 | News Monitoring | Terminal News | Terminal → Top News / First Word / Daybreak / News Trends / Alerts | topic / security list context candidate | exact alert rule Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | High | News function entry and alert builder |
| BBG-PW-005 | Portfolio Monitoring | Portfolio & Risk Analytics | Terminal → PORT → positions / risk / performance / scenario candidate | Portfolio / Position context candidate | import state Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | High | holdings import and calculation UI |
| BBG-PW-006 | Risk | PORT / Risk products | Portfolio → risk model / scenario / attribution candidate | Portfolio context candidate | exact model workflow Not Verified | Institutional Access Required / Enterprise candidate | 부분 완료 | Official Product Description | Medium | scenario setup behavior |
| BBG-PW-007 | Macro | Bloomberg Economics / Economic Calendar candidate | Terminal → economics research / macro data candidate | Country / Economic Indicator context candidate | exact function not verified | Institutional Access Required | 부분 완료 | Official Product Description / Inference | Medium | economic calendar function |
| BBG-PW-008 | Fixed Income | Trading / Fixed Income analysis candidate | Terminal → fixed income security / curve / liquidity candidate | Bond / Yield context candidate | exact screen not verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | bond search and curve workflow |
| BBG-PW-009 | Messaging | Instant Bloomberg / MSG | Terminal → IB / MSG → chats / tabs / folders | Message Thread and contact context candidate | downstream workflow detail Not Verified | Institutional Access Required | 완료 가능 | Official Product Description | High | in-Terminal placement |
| BBG-PW-010 | Excel / API Integration | Support / Data Connectivity | Terminal / Support → Excel Add-in / API / Server API | application / data field context candidate | actual export / sync Not Verified | Institutional / Enterprise entitlement | 부분 완료 | Official Documentation / Product Description | Medium | Excel Add-in workflow |

## Terminal Journey

| Journey ID | Journey | Entry | Transition | Context Preservation | Context Loss | Restriction | Observation Status | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| J-001 | Security Lookup | Command Entry candidate | Terminal → Security Lookup candidate | Security Context candidate | autocomplete and recent Not Verified | Institutional Access Required | 확인 불가 | Official Product Description / Inference | Low | direct Terminal session 필요 |
| J-002 | Company Research | Research / BI | Terminal → Bloomberg Intelligence / company research candidate | Company and Industry context candidate | exact tab / panel Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | BI screen and related Company transition |
| J-003 | Market Monitoring | Launchpad / Market Data | Terminal → Launchpad monitor candidate | monitor Security list candidate | Workspace persistence Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | Launchpad save and linked panels |
| J-004 | News Monitoring | Terminal News | Terminal → Top News / First Word / News Trends / Alerts | Topic / Security list context candidate | exact alert state Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | High | function-level News Navigation |
| J-005 | Macro Analysis | Bloomberg Economics / macro tools candidate | Terminal → macro research / data candidate | Country / Economic Indicator candidate | exact function Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | Economic Calendar and central bank tools |
| J-006 | Portfolio Monitoring | Portfolio & Risk Analytics | Terminal → PORT / PORT Enterprise candidate | Portfolio and Position context candidate | actual import and holdings state Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | High | Portfolio data Source and workflow |
| J-007 | Alert | News / Launchpad / Professional App | Terminal / App → custom alerts candidate | News / Security / event trigger candidate | rule builder Not Verified | Institutional Access Required | 부분 완료 | Official Product Description | Medium | alert rule behavior |
| J-008 | Excel Integration | Support / API components | Terminal / support → Excel Add-ins candidate | spreadsheet data context candidate | sync / refresh behavior Not Verified | Institutional Access Required | 확인 불가 | Official Documentation | Low | Excel Add-in actual workflow |
| J-009 | Workspace Restore | Launchpad / Workspace | Terminal → saved workspace candidate | Workspace layout candidate | persistence Not Verified | Institutional Access Required | 확인 불가 | Official Product Description / Inference | Low | save / restore mechanics |
| J-010 | Anywhere Session | Bloomberg Anywhere / Professional App | Bloomberg Anywhere login → Terminal session candidate | account / worksheet / IB context candidate | post-login session Not Verified | Login Required / Institutional Access Required | 확인 불가 | Official Product Observation / Product Description | Low | B-Unit login and session continuity |

## Context Preservation Pattern

| Context ID | Context | Owner | Persistence Scope | Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-CTX-001 | Public Market category | Bloomberg.com | page session candidate | Partially Observed | Official Product Observation | Medium | row detail context Not Verified |
| BBG-CTX-002 | Public Quote ticker | Bloomberg.com | Quote page candidate | Partially Observed | Official Product Observation | Medium | AAPL direct body limited |
| BBG-CTX-003 | Article category | Bloomberg.com | Article page candidate | Partially Observed | Official Product Observation | Medium | return path Not Verified |
| BBG-CTX-004 | Security Context | Terminal | cross-function candidate | Not Verified | Inference | Low | no Terminal session |
| BBG-CTX-005 | Launchpad Workspace | Terminal user | saved layout candidate | Official Product Description / Not Verified | Official Product Description | Medium | persistence not verified |
| BBG-CTX-006 | Worksheet | Terminal user | Professional App access candidate | Official Product Description | Official Product Description | Medium | actual restore not verified |
| BBG-CTX-007 | IB chat state | Terminal user / organization | persistent chats candidate | Official Product Description | Official Product Description | Medium | actual chat UI not verified |
| BBG-CTX-008 | Portfolio / Position | Terminal user / organization | PORT / enterprise state candidate | Official Product Description | Official Product Description | Medium | import and entitlement not verified |

## Context Loss

| Loss ID | Context Loss Candidate | Status | Affected Journey | Reason |
| --- | --- | --- | --- | --- |
| BBG-LOSS-001 | Public Article에서 Market / Quote context return path | Not Verified | BBG-PJ-004 | related Entity and back behavior not verified |
| BBG-LOSS-002 | Public Search query after opening result | Not Verified | BBG-PJ-005 | Search result behavior not verified |
| BBG-LOSS-003 | Markets table row to Quote origin | Not Verified | BBG-PJ-002 / BBG-PJ-003 | row click behavior not verified |
| BBG-LOSS-004 | Terminal Security Context across functions | Not Verified | J-001~J-006 | no Terminal session |
| BBG-LOSS-005 | Launchpad Workspace restore | Not Verified | J-009 | persistence not verified |
| BBG-LOSS-006 | Anywhere session continuity | Not Verified | J-010 | post-login not verified |

## Access Restriction

| Restriction | Affected Journey | Status |
| --- | --- | --- |
| Digital Subscription Required | BBG-PJ-004, BBG-PJ-006 | article depth and subscriber-only content candidate |
| Institutional Access Required | BBG-PW-001~BBG-PW-010, J-001~J-010 | Terminal and Professional Workflow |
| Login Required | J-010, Bloomberg Anywhere, Professional App | B-Unit / account required |
| Enterprise Entitlement | BBG-PW-010, Data / API workflows | API, B-PIPE, Data License, exchange data candidate |

## 남아 있는 Open Question

- Terminal Security Lookup의 actual entry와 Function Code usage.
- Command Entry autocomplete, recent, favorites.
- Launchpad Workspace save / restore / link mechanics.
- Bloomberg.com Search result grouping.
- Public Quote full module inventory.
- Article paywall와 related Security links.
- Professional App worksheet restore.
- IB structured data link behavior.
- Excel Add-in refresh and export behavior.
