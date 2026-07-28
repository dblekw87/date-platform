# SaveTicker Principle Extraction Readiness

## 문서 목적

이 문서는 SaveTicker Benchmark에서 Candidate Principle Extraction으로 넘길 Pattern Candidate를 준비 상태별로 분류한다.

이 문서에서는 Candidate Principle ID를 발급하지 않는다. Candidate Principle Registry도 수정하지 않는다.

## Readiness 기준

| Readiness | 기준 |
| --- | --- |
| Ready | User Benefit과 Potential Trade-off가 명확하고 Public Observation 기반이 충분하다. |
| Ready with Scope Limitation | Pattern은 유효하지만 AI Summary, Translation, Original Source, Access Level 등 명확한 제한이 필요하다. |
| Needs Additional Evidence | 추가 Product Interaction, login state, app state, item-level Evidence가 필요하다. |
| Benchmark-specific | SaveTicker 고유 조합이 강해 Cross Validation 전 일반화하기 어렵다. |
| Reject | Product Principle로 일반화하기 어렵거나 Evidence가 너무 약하다. |

## Pattern Candidate Inventory

| Pattern ID | Pattern Candidate | Evidence Level | User Benefit | Potential Trade-off | Generalizability | Cross Validation 대상 | Principle Extraction Readiness | Scope Limitation | Reject 이유 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-PC-001 | News Detail as Source-aware Consumption Context | Observed / Partial | Context Preservation, Source Traceability, Reading Cost Reduction | Community layer 혼합, Return Path gap | High | Yahoo Finance, Bloomberg, Finviz | Ready | Detail examples and visible context only | Not Applicable |
| ST-PC-002 | AI Summary as Compression Layer | Observed / Method Not Verified | Reading Cost Reduction, Information Density Control | Summary 의존, Methodology Gap | High | EidosLayer, Bloomberg, Yahoo Finance | Ready with Scope Limitation | AI Summary is not Original Evidence | Not Applicable |
| ST-PC-003 | Translation with Original Access Candidate | Partial | Reading Cost Reduction, Source Traceability | Translation Risk, Original comparison cost | Medium | Bloomberg, Yahoo Finance, EidosLayer | Ready with Scope Limitation | Translation is Convenience Layer only | Not Applicable |
| ST-PC-004 | News Feed Scan plus Curated Block | Observed / Partial | Decision Speed, Discoverability | Selection Methodology gap | High | Yahoo Finance, Finviz, Bloomberg | Ready with Scope Limitation | Today Top News selection rule Not Verified | Not Applicable |
| ST-PC-005 | Publisher / Source Label Separation | Observed / Partial | Trust Calibration, Source Traceability | Source taxonomy and provider coverage gap | High | Yahoo Finance, Finviz, Bloomberg | Ready with Scope Limitation | label visibility only, not full Original Traceability | Not Applicable |
| ST-PC-006 | Original Source Exit with Return Path Requirement | Partial / Return Not Verified | Evidence Traceability | Context Loss | High | Yahoo Finance, Finviz, EidosLayer | Ready with Scope Limitation | Original control observed, Return Path Not Verified | Not Applicable |
| ST-PC-007 | Community Response Beside Article | Partial | Discussion Awareness | Community Noise, Trust confusion | Medium | TradingView, Bloomberg, Yahoo Finance | Needs Additional Evidence | moderation and author identity Not Verified | Not Applicable |
| ST-PC-008 | Ticker Tag as Entity Connection Candidate | Partial / Not Verified | Entity Traceability candidate | destination ambiguity | High if verified | Yahoo Finance, Bloomberg, Finviz | Needs Additional Evidence | tag target Not Verified | Not Applicable |
| ST-PC-009 | Calendar as Time-based News Discovery Candidate | Observed / relation Not Verified | Timeline Awareness | Event Evidence gap | Medium | Bloomberg, Yahoo Finance, Koyfin | Needs Additional Evidence | Event Detail and relation Not Verified | Not Applicable |
| ST-PC-010 | Report Surface as Research Extension Candidate | Partial / Not Verified | deeper research candidate | Original Report Traceability gap | Medium | Bloomberg, Yahoo Finance, Koyfin | Needs Additional Evidence | Report Detail Not Verified | Not Applicable |
| ST-PC-011 | App Notification as Monitoring Candidate | Official App Description Only / Login Required | Monitoring Efficiency | App dependency, payload gap | High if verified | TradingView, Bloomberg, Yahoo Finance | Needs Additional Evidence | no actual App Interaction | Not Applicable |
| ST-PC-012 | Personal Continuity via Bookmark / Follow Candidate | Not Verified / Inferred | Personal Continuity candidate | persistence not verified | High if verified | TradingView, Yahoo Finance, Koyfin | Needs Additional Evidence | Bookmark / Follow not observed | Not Applicable |
| ST-PC-013 | News-first Intelligence Layer | Partial / Not Verified | News to action candidate | over-generalization risk | Medium | EidosLayer, Bloomberg, Yahoo Finance | Benchmark-specific | cross-surface links mostly Not Verified | Not Applicable |
| ST-PC-014 | AI Summary + Translation + Original Source Combination | Observed / Partial | Reading Cost Reduction, Source Traceability | Summary and Translation double risk | Medium | EidosLayer, Bloomberg | Benchmark-specific | SaveTicker detail examples only | Not Applicable |
| ST-PC-015 | Community and News Detail Juxtaposition | Partial | Discussion Awareness | Opinion / Evidence confusion | Medium | TradingView, Yahoo Finance | Benchmark-specific | Community participation Not Verified | Not Applicable |
| ST-PC-016 | Advertisement as Product Pattern | Not Verified | Not Applicable | Not Verified | Low | ad-supported benchmarks | Reject | Not Applicable | Advertisement not observed |
| ST-PC-017 | Subscription Boundary as Pattern | Not Verified | Not Applicable | Not Verified | Low | Yahoo Finance, Finviz | Reject | Not Applicable | Subscription not verified |

## Readiness 분포

| Readiness | 수 |
| --- | ---: |
| Ready | 1 |
| Ready with Scope Limitation | 5 |
| Needs Additional Evidence | 6 |
| Benchmark-specific | 3 |
| Reject | 2 |

## Ready 후보

- ST-PC-001: News Detail as Source-aware Consumption Context

## Ready with Scope Limitation 후보

- ST-PC-002: AI Summary as Compression Layer
- ST-PC-003: Translation with Original Access Candidate
- ST-PC-004: News Feed Scan plus Curated Block
- ST-PC-005: Publisher / Source Label Separation
- ST-PC-006: Original Source Exit with Return Path Requirement

## Needs Additional Evidence 후보

- ST-PC-007: Community Response Beside Article
- ST-PC-008: Ticker Tag as Entity Connection Candidate
- ST-PC-009: Calendar as Time-based News Discovery Candidate
- ST-PC-010: Report Surface as Research Extension Candidate
- ST-PC-011: App Notification as Monitoring Candidate
- ST-PC-012: Personal Continuity via Bookmark / Follow Candidate

## Benchmark-specific 후보

- ST-PC-013: News-first Intelligence Layer
- ST-PC-014: AI Summary + Translation + Original Source Combination
- ST-PC-015: Community and News Detail Juxtaposition

## Reject 후보

- ST-PC-016: Advertisement as Product Pattern
- ST-PC-017: Subscription Boundary as Pattern

Reject 이유:
Advertisement와 Subscription은 Phase 7.1~7.3에서 Not Verified다. Product Principle로 일반화하지 않는다.

## Cross Benchmark 준비 분류

| Classification | Pattern |
| --- | --- |
| Shared Pattern | News Feed Scan, Source / Timestamp Signal, External Original Source, Entity Tag, Personal Continuity, Alert / Monitoring, Calendar-based Discovery |
| Variant Pattern | AI Summary vs Raw Headline Feed, Today Top News vs Market Summary, News-first Entry vs Quote / Screener / Workspace Entry, External Original Source vs Embedded Evidence, Community Reaction vs Professional Collaboration, Calendar Surface vs Economic Calendar Tool, App Push vs Terminal Alert |
| Benchmark-specific Pattern | AI Summary + Translation + Original Source 조합, News-first Intelligence Layer 후보, Today Top News Curation, Community와 News Detail 병치, Public Calendar + Notification 후보 |
| Potential Contradiction | 직접 반대 Evidence 없음 |
| Insufficient Evidence | Ranking Methodology, Selection Methodology, Search Result Grouping, Ticker Destination, Calendar Relation, Report Detail, Original Report Traceability, Community Moderation, Alert Rule, Notification Payload, Bookmark / Follow Persistence, Reading History, Subscription, Advertisement |

## 다음 단계에서 추출 가능한 후보

다음 후보는 Phase 7.5에서 기존 `P-001 ~ P-029`와 중복 여부를 먼저 비교한 뒤 Candidate Principle으로 검토할 수 있다.

- News Detail as Source-aware Consumption Context
- AI Summary as Compression Layer
- Translation with Original Access Candidate
- News Feed Scan plus Curated Block
- Publisher / Source Label Separation
- Original Source Exit with Return Path Requirement

## Scope Limitation

- AI Summary는 Original Evidence가 아니다.
- Translation은 Original Text가 아니라 Convenience Layer다.
- Original Source Return Path는 Not Verified다.
- Today Top News selection rule은 Not Verified다.
- Publisher / Source label은 visible signal이며 full Source coverage가 아니다.
- Ticker Tag destination은 Not Verified다.
- Calendar Event, Report Detail, Community Post, Notification payload는 Principle Extraction 중심 Evidence로 사용하지 않는다.

## Final Readiness 판단

Principle Extraction 진행 가능 여부:
가능.

조건:
Phase 7.5에서는 Ready와 Ready with Scope Limitation 후보만 우선 추출한다. Needs Additional Evidence, Benchmark-specific, Reject 후보는 Supporting / Insufficient Evidence로만 다룬다.
