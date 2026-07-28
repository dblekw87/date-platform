# SaveTicker Candidate Principles

## 문서 목적

이 문서는 SaveTicker Phase 7.1~7.4 Observation에서 Candidate Principle을 추출하고 기존 Candidate Principle Registry와 연결한다.

이 문서의 Candidate Principle은 DATE Product Principle이 아니다. 모든 항목은 Cross Validation 전까지 `Pending`으로 유지한다.

## Extraction Method

Phase 7.5에서는 [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)의 `Ready`와 `Ready with Scope Limitation` Pattern만 검토했다.

`Needs Additional Evidence`, `Benchmark-specific`, `Reject` Pattern은 신규 Principle Evidence로 사용하지 않았다.

## Extraction 대상

| Pattern ID | Pattern | Readiness | Extraction Result |
| --- | --- | --- | --- |
| ST-PC-001 | News Detail as Source-aware Consumption Context | Ready | Existing Principle Mapping |
| ST-PC-002 | AI Summary as Compression Layer | Ready with Scope Limitation | New Principle P-030 |
| ST-PC-003 | Translation with Original Access Candidate | Ready with Scope Limitation | New Principle P-030 |
| ST-PC-004 | News Feed Scan plus Curated Block | Ready with Scope Limitation | Existing Principle Mapping |
| ST-PC-005 | Publisher / Source Label Separation | Ready with Scope Limitation | Existing Principle Mapping |
| ST-PC-006 | Original Source Exit with Return Path Requirement | Ready with Scope Limitation | Existing Principle Mapping |

## Existing Principle Mapping

| Pattern | Readiness | Existing Principle | Evidence Classification | New Principle Required | Reason | Scope Limitation | Cross Validation Target |
| --- | --- | --- | --- | --- | --- | --- | --- |
| News Detail as Source-aware Consumption Context | Ready | P-024 | Supporting | No | Original Source access와 Product Context Loss 문제가 동일하다. | Return Path Not Verified | Yahoo Finance, Finviz, Bloomberg |
| News Feed Scan plus Curated Block | Ready with Scope Limitation | P-025, P-026 | Supporting / Variant | No | repeated list grammar와 Portal / discovery entry 문제로 설명 가능하다. | Selection Methodology Not Verified | Yahoo Finance, Bloomberg, Finviz |
| Publisher / Source Label Separation | Ready with Scope Limitation | P-007 | Supporting | No | Source / Freshness cue와 동일한 trust calibration 문제다. | label visibility only | Yahoo Finance, Bloomberg, Finviz |
| Original Source Exit with Return Path Requirement | Ready with Scope Limitation | P-024 | Supporting | No | external Evidence link와 context loss 문제가 동일하다. | Original Source Return Path Not Verified | Yahoo Finance, Finviz, EidosLayer |
| Community Response Beside Article | Needs Additional Evidence | P-005 | Insufficient | No | Discussion candidate는 있지만 participation, moderation, author identity가 부족하다. | Community Opinion is not Financial Evidence | TradingView, Bloomberg |
| Personal Continuity via Bookmark / Follow Candidate | Needs Additional Evidence | P-014 | Insufficient | No | Bookmark / Follow persistence가 확인되지 않았다. | Login / App state Not Verified | TradingView, Koyfin, Yahoo Finance |

## New Principle Candidates

## P-030

### Name

Interpretation layers may reduce reading cost only when original evidence boundaries remain visible

### Status

Candidate

### Cross Validation Status

Pending

### Definition

Summary, translation, and similar interpretation layers can reduce reading cost, but they should remain visibly separate from original evidence, Source, Publisher, timestamp, and original access.

### Problem

사용자는 긴 Article과 외국어 News를 빠르게 이해해야 하지만, summary 또는 translation만으로 판단하면 Source Context와 original meaning을 잃을 수 있다.

### Rule

Product는 compression 또는 translation layer를 제공할 때 원문, Publisher, Source, timestamp, methodology gap, original access를 함께 표시해야 할 수 있다.

### Why It Works

Reading Cost Reduction과 Information Density Control을 제공하면서도 사용자가 interpretation layer와 Original Evidence를 구분하도록 돕는다.

### Scope

News Detail, Article, Research Summary, translated content, AI-generated summary, cross-language Market content에 적용 가능한 Candidate Rule이다.

### Scope Limitation

SaveTicker에서는 AI Summary placement와 Translation / Original control이 확인됐지만 AI Summary Methodology, Translation Methodology, Original Source Return Path, error correction, update time은 Not Verified다.

### Supporting Benchmark

SaveTicker

### Supporting Evidence

- Source 문서: [07-information-density-observations.md](./07-information-density-observations.md), [08-trust-and-evidence-observations.md](./08-trust-and-evidence-observations.md), [10-strengths-frictions-and-open-questions.md](./10-strengths-frictions-and-open-questions.md), [11-evidence-hardening-review.md](./11-evidence-hardening-review.md), [12-principle-extraction-readiness.md](./12-principle-extraction-readiness.md)
- Pattern ID: ST-PC-002, ST-PC-003, ST-STR-004, ST-STR-005
- Evidence Type: Official Product Observation
- Evidence Level: Observed / Partial / Method Not Verified

### Related Existing Principles

P-007, P-008, P-020, P-024, P-025

### Potential Trade-off

Summary 의존, Translation 오류, Methodology Gap, Source Context Loss, Original comparison cost, External Return Path 부재

### Cross Validation Target

EidosLayer, Yahoo Finance, Bloomberg, SaveTicker 후속 login / app validation

### Needs Cross Validation

YES

### DATE Implication

DATE에서 Summary, Translation, generated content를 제공할 경우 Original Evidence와 interpretation layer의 boundary를 어떤 UI contract로 분리할지 검증해야 한다.

### Confidence

Medium

## Rejected Principle Candidates

| Pattern | Reason |
| --- | --- |
| Advertisement as Product Pattern | Advertisement는 Not Verified이며 Product Principle로 일반화하지 않는다. |
| Subscription Boundary as Pattern | Subscription은 Not Verified이며 Access Boundary로도 확인되지 않았다. |

## Needs Additional Evidence Candidates

| Pattern | Reason |
| --- | --- |
| Community Response Beside Article | Community participation, moderation, author identity, post detail이 Not Verified다. |
| Ticker Tag as Entity Connection Candidate | Ticker Destination과 independent Company / Ticker Surface가 Not Verified다. |
| Calendar as Time-based News Discovery Candidate | Calendar Event Detail과 related News / Report relation이 Not Verified다. |
| Report Surface as Research Extension Candidate | Report Detail과 Original Report Traceability가 Not Verified다. |
| App Notification as Monitoring Candidate | Alert Rule과 Notification Payload가 Not Verified이고 App Description 의존이 크다. |
| Personal Continuity via Bookmark / Follow Candidate | Bookmark / Follow / Reading History persistence가 Not Verified다. |

## Benchmark-specific Candidates

| Pattern | Reason |
| --- | --- |
| News-first Intelligence Layer | Cross-surface relation이 대부분 Not Verified다. |
| AI Summary + Translation + Original Source Combination | SaveTicker detail examples에 강하게 종속된다. |
| Community and News Detail Juxtaposition | Community Participation과 Moderation이 Not Verified다. |

## Registry Update Summary

| Registry Area | Result |
| --- | --- |
| 기존 Principle Evidence 연결 | 6 |
| 신규 Principle | 1 |
| 신규 Principle ID | P-030 |
| Supporting Evidence 연결 | 4 |
| Variant Evidence 연결 | 1 |
| Contradicting Evidence 연결 | 0 |
| Insufficient Evidence 연결 | 2 |
| Cross Validation Status | Pending 유지 |

## Cross Benchmark Validation Target

- EidosLayer: AI-generated or assisted interpretation layer와 Source separation 비교
- Yahoo Finance: publisher label, external article, summary candidate, Premium provider boundary 비교
- Bloomberg: Original News, professional research summary, provider / Source separation 비교
- Finviz: external article link와 context loss 비교
- TradingView: Community / Discussion과 Evidence boundary 비교
- Koyfin: methodology layer와 item-level Traceability gap 비교

## Scope Limitation

- AI Summary는 Original Evidence가 아니다.
- Translation은 Original Text가 아니라 Convenience Layer다.
- Community Reaction은 Trust Signal이 아니다.
- Ticker Tag는 verified Entity Navigation이 아니다.
- Calendar Surface는 Event Traceability를 증명하지 않는다.
- Notification은 actual Alert Rule Observation이 아니다.
- Intelligence 역할은 `Needs Additional Evidence`로 유지한다.
