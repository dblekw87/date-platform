# SaveTicker Trust and Evidence Observations

## 문서 목적

이 문서는 Phase 7.3 범위에서 SaveTicker의 Publisher / Source, Original Article, AI Summary, Translation, Freshness, Ticker / Company, Calendar, Reports, Community, Notification, Product Transparency Evidence를 기록한다.

AI Summary 정확도, Translation 품질, News Ranking Algorithm, Community 감성 분석은 수행하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access / Not Logged In |
| Subscription | Not Verified |
| Mobile App | Official App Description Only |
| Secondary Source | Not Used |

## Trust / Evidence Observation 요약

| Classification | Observation 수 |
| --- | ---: |
| Strong Trust Signal | 2 |
| Supporting Trust Signal | 4 |
| Weak Trust Signal | 2 |
| Source Traceability | 2 |
| Original Article Traceability | 1 |
| Entity Traceability | 1 |
| Methodology Gap | 3 |
| Freshness Gap | 2 |
| Translation Risk | 1 |
| AI Summary Risk | 1 |
| Community Trust Risk | 1 |
| Access-dependent Trust | 2 |
| Not Verified | 4 |

Trust / Evidence Observation 수: 10

## Evidence Pattern Inventory

| Evidence ID | Evidence Pattern | Classification | Surface | Observation Status | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| ST-TR-001 | Publisher / Source Evidence | Source Traceability / Supporting Trust Signal | News Detail | Observed / Partially Observed | Official Product Observation | High |
| ST-TR-002 | Original Article Traceability | Original Article Traceability / Context Loss Risk | News Detail | Partially Observed | Official Product Observation | Medium |
| ST-TR-003 | AI Summary Evidence | AI Summary Risk / Methodology Gap | News Detail | Observed / Method Not Verified | Official Product Observation | Medium |
| ST-TR-004 | Translation Evidence | Translation Risk / Source Traceability | News Detail | Partially Observed | Official Product Observation | Medium |
| ST-TR-005 | News Freshness | Freshness Gap / Supporting Trust Signal | News Feed / News Detail | Partially Observed | Official Product Observation / Official App Description | Medium |
| ST-TR-006 | Ticker / Company Evidence | Entity Traceability / Not Verified | News Detail | Partially Observed / Not Verified | Official Product Observation / Inference | Low |
| ST-TR-007 | Calendar Evidence | Access-dependent Trust / Not Verified | Calendar | Observed / Not Verified | Official Product Observation / Inference | Low |
| ST-TR-008 | Reports Evidence | Not Verified / Research candidate | Reports | Partially Observed / Not Verified | Official Product Observation / Inference | Low |
| ST-TR-009 | Community Evidence | Community Trust Risk | News Detail / Community | Partially Observed | Official Product Observation / Official Policy | Medium |
| ST-TR-010 | Notification / Product Transparency | Access-dependent Trust / Methodology Gap | Notifications / App / Policy | Login Required / Official App Description Only / Official Policy | Official Product Observation / Official App Description / Official Policy | Medium |

## ST-TR-001 Publisher / Source Evidence

Observation:
News Detail examples include publisher / Source label, category, timestamp candidate, and detail content. SAVE-authored detail and third-party detail are distinguishable at example level.

Evidence Type:
Official Product Observation

Trust Contribution:
Publisher and Source label can help users separate SaveTicker presentation from original content owner.

Traceability:
Publisher, Source, timestamp candidate are visible in detail examples. Full provider coverage and Source taxonomy are Not Verified.

Limitation:
Author, updated time, provider list, and all article format consistency are Not Verified.

DATE Implication:
Cross Benchmark에서 News Surface가 publisher, aggregator, summary owner를 분리 표시하는지 비교해야 한다.

Confidence:
High for label visibility, Medium for taxonomy.

## ST-TR-002 Original Article Traceability

Observation:
News Detail includes Translation / Original control and Source label. Original target URL and SaveTicker Return Path were not verified.

Evidence Type:
Official Product Observation

Trust Contribution:
Original Article access candidate can support verification beyond SaveTicker Summary / Translation.

Traceability:
Article detail에서 Original control까지는 Partially Observed다. External Article body and return path are Not Verified.

Limitation:
Original Source 이동 후 SaveTicker context가 보존되는지 확인하지 못했다.

DATE Implication:
External Source로 나가는 Evidence Flow에서 return path와 origin context를 함께 검증해야 한다.

Confidence:
Medium

## ST-TR-003 AI Summary Evidence

Observation:
AI Summary block is visible inside News Detail. Summary method, generated content responsibility, update time, error correction, and methodology are Not Verified.

Evidence Type:
Official Product Observation

Trust Contribution:
AI Summary can reduce reading cost, but it should be treated as compression layer, not original Evidence.

Traceability:
Summary is inside Article detail with Source context nearby. Summary-to-sentence or Summary-to-original passage mapping is Not Verified.

Limitation:
Methodology Gap, generated content owner not verified, accuracy not evaluated.

DATE Implication:
AI-generated compression should preserve link to Original Article and disclose method / limitation in future validation.

Confidence:
Medium

## ST-TR-004 Translation Evidence

Observation:
Translation / Original control is visible in News Detail examples. Original Text comparison, translation owner, translation methodology, and translation error policy are Not Verified.

Evidence Type:
Official Product Observation

Trust Contribution:
Translation can broaden access to external News, but it does not replace Original Article Traceability.

Traceability:
Source label remains visible before external transition. Original / translation relation is Partially Observed.

Limitation:
Translation Methodology Gap and Original Text comparison are Not Verified.

DATE Implication:
Translated News should keep Source, original timestamp, and original-language access visible.

Confidence:
Medium

## ST-TR-005 News Freshness

Observation:
News Detail examples include timestamp candidate. News Feed includes latest sort candidate. App Description claims real-time breaking news and personalized notifications.

Evidence Type:
Official Product Observation / Official App Description

Trust Contribution:
Timestamp, latest sort, and push claim can signal Freshness.

Traceability:
Detail-level timestamp candidate is visible. Actual update frequency, delay, and push arrival speed are Not Verified.

Limitation:
Real-time claim not measured. Timezone behavior is only partly recorded; Calendar mentions local time basis.

DATE Implication:
Freshness should distinguish displayed timestamp, sort mode, delivery speed, and user notification timing.

Confidence:
Medium

## ST-TR-006 Ticker / Company Evidence

Observation:
SAVE-authored detail includes `$AAPL` ticker tag. App Description references companies of interest notification. Independent Ticker / Company Surface and tag destination are Not Verified.

Evidence Type:
Official Product Observation / Official App Description / Inference

Trust Contribution:
Ticker tag can help connect News to investment Entity candidate.

Traceability:
Ticker label is Partially Observed. Company / Ticker detail, related News, price, chart, and relation reason are Not Verified.

Limitation:
Ticker Tag may be label, filter, or Navigation; current role is not verified.

DATE Implication:
Entity tag should make destination and relation type explicit before treating it as Entity Traceability.

Confidence:
Low

## ST-TR-007 Calendar Evidence

Observation:
Calendar shows Month View, selected date, local time basis, view labels. Event Detail, Event Source, Event Type, Related Company, Related Ticker, News / Report relation are Not Verified.

Evidence Type:
Official Product Observation / Inference

Trust Contribution:
Calendar provides time-based orientation but not yet verified Event Evidence Traceability.

Traceability:
Date context is visible. Event-level Source and relation context are Not Verified.

Limitation:
Public Calendar existence does not imply event source traceability.

DATE Implication:
Event calendar should separate date display from Event Evidence, Source, and related Entity relation.

Confidence:
Low

## ST-TR-008 Reports Evidence

Observation:
Reports Surface exists as top-level entry. Report Source, Author, Date, Original Document, External Link, Summary, Download, Provider, Access Restriction, Report Detail are Not Verified.

Evidence Type:
Official Product Observation / Inference

Trust Contribution:
Reports could support deeper research, but Phase 7.3 cannot verify source depth.

Traceability:
Surface existence only. Original Report Traceability is Not Verified.

Limitation:
Report Surface should not be treated as Original Report Evidence.

DATE Implication:
Report Surface and report traceability must be separately validated.

Confidence:
Low

## ST-TR-009 Community Evidence

Observation:
News Detail includes Reaction and Comment area. Community Surface includes board labels and Search Field. Public Interaction is referenced in policy-level context, but post detail, author profile, moderation, report function are Not Verified.

Evidence Type:
Official Product Observation / Official Policy

Trust Contribution:
Community response can show user attention but not article reliability.

Traceability:
Reaction and Comment count are visible in examples. Author identity, profile, and moderation are Not Verified.

Limitation:
Reaction count must not be interpreted as Editorial Importance or Financial Evidence.

DATE Implication:
Community response and Evidence quality should be visually and semantically separated.

Confidence:
Medium

## ST-TR-010 Notification / Product Transparency

Observation:
Notifications route is Login Required. App Description claims personalized notifications for keywords, companies of interest, economic indicators, and report schedules. Privacy Policy records account, personal data, push contact, and public interaction policy-level information.

Evidence Type:
Official Product Observation / Official App Description / Official Policy

Trust Contribution:
Policy and app description clarify that Monitoring and personalization may exist, but actual trigger behavior is not verified.

Traceability:
Notification trigger source, related Entity, timestamp, original News link, payload, and deep link are Not Verified.

Limitation:
Official App Description is not actual App Interaction. Alert Rule UI remains Not Verified.

DATE Implication:
Monitoring systems should expose trigger source, payload context, and link back to original News.

Confidence:
Medium

## Source Visibility

| Signal | Status | Notes |
| --- | --- | --- |
| Publisher / Source label | Observed / Partially Observed | Detail examples 기준 |
| Original control | Partially Observed | target and return path Not Verified |
| SaveTicker-authored detail | Observed | production boundary Not Verified |
| Third-party detail | Observed / Partially Observed | provider coverage Not Verified |

## Methodology Gap

| Gap | Status | Impact |
| --- | --- | --- |
| AI Summary method | Not Verified | Summary trust calibration 제한 |
| Translation method | Not Verified | Original Text comparison 필요 |
| Ranking / Today Top News selection | Not Verified | Curation 책임 확정 불가 |
| Alert trigger logic | Not Verified | Monitoring trust 제한 |

## Freshness Gap

| Gap | Status | Impact |
| --- | --- | --- |
| real-time claim measurement | Not Verified | breaking News speed 평가 불가 |
| latest sort behavior | Partially Observed | exact ordering rule 미확인 |
| Calendar local time relation | Partially Observed | timezone and Event source relation 미확인 |
| push notification timing | Official App Description Only | delivery Freshness 미검증 |

## Product Transparency

Observation:
Privacy Policy and app listings provide policy / app-level transparency. Product-level AI usage, Translation responsibility, Community moderation, Subscription, Advertisement are not fully verified.

Interpretation:
SaveTicker exposes some transparency signals through Source labels, Original controls, app description, and policy documents. However, Methodology and role boundaries remain open.

Confidence:
Medium

## Open Question

- Publisher, Source, Original Source, SaveTicker author role are consistently separated across all articles?
- AI Summary method and generated content owner are disclosed?
- Translation is machine-generated, human-edited, or publisher-provided?
- Original Source transition keeps Source, timestamp, and SaveTicker origin context?
- Ticker Tag destination and relation type are explicit?
- Calendar Event has Source and related News / Report?
- Report Detail exposes original document or only summary?
- Community moderation and author identity are visible?
- Notification payload includes trigger, Source, timestamp, and original News link?
- Subscription and Advertisement transparency exist?
