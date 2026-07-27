# Koyfin Hypothesis Evidence Log 기록

## 문서 목적

이 문서는 Koyfin Phase 3 Observation이 Phase 0 Product Hypothesis에 미치는 영향을 기록한다. 원본 Product Hypothesis Register는 수정하지 않는다.

## Evidence Log 요약

| Evidence Type | 수 |
| --- | ---: |
| Supporting | 7 |
| Variant | 4 |
| Contradicting | 0 |
| Neutral | 2 |
| Insufficient | 2 |

## H-001

### Evidence Type

Supporting

### Observation

Command Bar는 Security와 Function을 조합해 Snapshot, Estimates, Graph 같은 Surface로 이동할 수 있다고 기록되어 있다.

### Interpretation

Koyfin은 Search를 broad discovery보다 direct Entity / Function Navigation으로 사용할 수 있다. 이는 Search-first Product를 확정하지는 않는다.

### Evidence Level

Official Documentation Only

### Confidence

Medium

### Source

[03-navigation-map.md](03-navigation-map.md) `KYF-NAV-005`, [04-core-journey-observations.md](04-core-journey-observations.md) S-002, S-004.

### Recommended Status

Strengthen

### Reason

Security-based direct entry Evidence가 추가되었지만 broad multi-entity Search는 Not Verified다.

## H-002

### Evidence Type

Insufficient

### Observation

Economic Calendar와 News Surface는 확인되었지만 News에서 Event를 구조화하거나 Event를 중심 Entity로 다루는 구조는 확인되지 않았다.

### Interpretation

Koyfin은 Macro Event와 News를 제공하지만 Event-centered Entity Architecture를 판단하기에는 부족하다.

### Evidence Level

Partial / Not Verified

### Confidence

Low

### Source

[01-product-surface-map.md](01-product-surface-map.md) `KYF-SF-014`, `KYF-SF-015`, [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md) `KYF-TR-012`, `KYF-TR-015`.

### Recommended Status

Keep Pending

### Reason

Event 존재와 Event 중심 Product Model은 별도 검증이 필요하다.

## H-003

### Evidence Type

Variant

### Observation

Command Bar, Watchlist, Screener, Graph는 Security 또는 ticker를 중심 입력으로 설명한다. Company Snapshots와 Financial Analysis는 Company information과 financials를 설명한다.

### Interpretation

Koyfin은 입력에서는 Security를, Research 내용에서는 Company를 사용하는 구조일 수 있다. Company와 Security의 분리 필요성을 직접 지지하거나 반박하지 않고 비교 사례를 제공한다.

### Evidence Level

Official Documentation Only

### Confidence

Medium

### Source

[05-entity-and-state-observations.md](05-entity-and-state-observations.md) Company와 Security 구분.

### Recommended Status

Narrow Scope

### Reason

Company와 Security 분리는 사용자 노출 label, URL, Search result grouping을 따로 확인해야 한다.

## H-004

### Evidence Type

Variant

### Observation

Koyfin public Home은 Marketing Landing이고, Market Dashboards는 별도 Product Surface로 설명된다. 로그인 후 default App entry는 Not Verified다.

### Interpretation

Koyfin은 public Home이 Market Discovery라기보다 Product positioning과 가입 entry 역할을 한다. 다만 App 내부 Home 또는 default Dashboard는 확인되지 않았다.

### Evidence Level

Observed / Not Verified

### Confidence

Medium

### Source

[01-product-surface-map.md](01-product-surface-map.md) `KYF-SF-001`, `KYF-SF-007`, [10-evidence-hardening-review.md](10-evidence-hardening-review.md) Not Verified 항목.

### Recommended Status

Narrow Scope

### Reason

Home Strategy Hypothesis는 public Home과 login App entry를 분리해 검증해야 한다.

## H-005

### Evidence Type

Variant

### Observation

Koyfin은 Watchlist, Saved Screen, My Graphs, Dashboard, Portfolio 같은 여러 saved state를 제공한다고 기록되어 있다. Evidence Graph 또는 관계 기반 Evidence 저장은 확인되지 않았다.

### Interpretation

Koyfin은 Evidence Graph보다 purpose-specific saved state 모델에 가깝게 보인다.

### Evidence Level

Official Documentation Only

### Confidence

Medium

### Source

[05-entity-and-state-observations.md](05-entity-and-state-observations.md) User State Candidate Inventory, [08-product-flow-architecture.md](08-product-flow-architecture.md) Action Flow.

### Recommended Status

Split Hypothesis

### Reason

Evidence 저장과 Research state 저장은 다른 Product 문제일 수 있다.

## H-006

### Evidence Type

Supporting

### Observation

Dashboard Groups, Right Sidebar, Command Bar, Watchlist Views, My Graphs는 Context Preservation 또는 saved state 가능성을 제공한다고 기록되어 있다.

### Interpretation

Koyfin은 Page 이동을 없애기보다 saved state와 contextual navigation으로 Context Preservation을 보조할 수 있다.

### Evidence Level

Official Documentation Only / Inferred

### Confidence

Medium

### Source

[08-product-flow-architecture.md](08-product-flow-architecture.md) Context Preservation Assessment, [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md) Context Preservation Assessment.

### Recommended Status

Strengthen

### Reason

Context Preservation 후보 Pattern이 다수 확인되었으나 실제 App Interaction은 확인되지 않았다.

## H-007

### Evidence Type

Supporting

### Observation

Watchlist, Dashboard, Saved Screen, My Graphs, Portfolio가 User-owned Entity 또는 User State Candidate로 기록되어 있다.

### Interpretation

Koyfin은 Watchlist, Dashboard, Portfolio가 Navigation과 Personal Continuity 역할을 수행할 가능성을 보여준다.

### Evidence Level

Official Documentation Only

### Confidence

High

### Source

[05-entity-and-state-observations.md](05-entity-and-state-observations.md), [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md).

### Recommended Status

Strengthen

### Reason

저장 Surface가 반복 Navigation entry로 쓰일 가능성이 여러 문서에서 반복된다.

## H-008

### Evidence Type

Supporting

### Observation

Screener, Watchlist, Financial Analysis, Portfolio는 Table 중심 comparison을 설명하고, Graph는 time-series Chart 중심 analysis를 설명한다. Dashboard는 Widget composition을 설명한다.

### Interpretation

Koyfin은 Table, Chart, Widget, Sidebar의 책임 분리를 통해 높은 Information Density를 제어할 수 있다.

### Evidence Level

Official Documentation Only / Official Product Page

### Confidence

High

### Source

[06-information-density-observations.md](06-information-density-observations.md), [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md) `KYF-PC-007`.

### Recommended Status

Strengthen

### Reason

Information Density를 구조적 역할 분리로 다루는 Evidence가 강하다.

## H-009

### Evidence Type

Supporting

### Observation

Data Overview, Data Questions, Data Dictionary, Pricing은 provider, live/delayed/EOD data, formula, data depth를 설명한다.

### Interpretation

Koyfin은 Source와 Freshness를 Trust UX의 일부로 다루지만 item-level traceability는 확인되지 않았다.

### Evidence Level

Official Documentation / Official Pricing

### Confidence

High

### Source

[07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md) `KYF-TR-001`, `KYF-TR-002`, `KYF-TR-005`, `KYF-TR-010`.

### Recommended Status

Strengthen

### Reason

Trust Signal의 category-level Evidence는 강하지만 화면 내부 Source path는 추가 검증이 필요하다.

## H-010

### Evidence Type

Supporting

### Observation

My Screens는 Sector, Industry, fundamentals criteria와 result table을 제공하고, Financial Analysis는 table/chart view를 설명하며 Portfolio Exposure는 Sector, Industry, asset class, country breakdown을 설명한다.

### Interpretation

Koyfin은 related Entity comparison을 Screener, Watchlist, Financial Analysis, Portfolio에서 여러 방식으로 지원할 수 있다.

### Evidence Level

Official Documentation Only / Official Product Page

### Confidence

High

### Source

[04-core-journey-observations.md](04-core-journey-observations.md) S-005, [06-information-density-observations.md](06-information-density-observations.md) `KYF-DEN-004`, `KYF-DEN-010`.

### Recommended Status

Strengthen

### Reason

단일 Entity 분석보다 comparison structure가 반복적으로 나타난다.

## H-011

### Evidence Type

Variant

### Observation

Market Dashboards와 Economic Calendar는 Macro Indicator와 Event를 Chart로 연결할 수 있다고 기록되어 있다. Macro에서 Security 영향으로 직접 이동하는 구조는 Not Verified다.

### Interpretation

Koyfin은 Macro-to-Chart linkage는 제공할 수 있지만 Macro-to-Security impact linkage는 아직 확인되지 않았다.

### Evidence Level

Partial / Official Documentation Only / Not Verified

### Confidence

Medium

### Source

[04-core-journey-observations.md](04-core-journey-observations.md) S-007, [05-entity-and-state-observations.md](05-entity-and-state-observations.md) Economic Event와 Macro Indicator 관계.

### Recommended Status

Narrow Scope

### Reason

Macro linkage Hypothesis는 Macro-to-Chart와 Macro-to-Security를 분리해야 한다.

## H-012

### Evidence Type

Neutral

### Observation

Koyfin은 Command Bar, dense Table, custom Dashboard, Graph, Portfolio analytics를 설명한다. 초보자용 onboarding이나 simplified mode는 이번 범위에서 확인되지 않았다.

### Interpretation

Expert Scalability Evidence는 있으나 beginner learnability를 동시에 지원하는지는 판단하기 어렵다.

### Evidence Level

Official Documentation Only / Not Verified

### Confidence

Medium

### Source

[09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md) User Friction Inventory.

### Recommended Status

Keep Pending

### Reason

전문 사용자 Pattern과 초보자 Learnability를 별도 검증해야 한다.

## H-013

### Evidence Type

Insufficient

### Observation

Mobile App page에서 alerts가 언급되지만 Alert Surface, condition builder, Evidence-based alert는 Not Verified다.

### Interpretation

가격 조건 중심인지 Evidence 변화 조건 중심인지 판단할 수 없다.

### Evidence Level

Not Verified

### Confidence

Low

### Source

[04-core-journey-observations.md](04-core-journey-observations.md) S-009, [05-entity-and-state-observations.md](05-entity-and-state-observations.md) `KYF-ST-009`.

### Recommended Status

Keep Pending

### Reason

Alert 기능 존재 단서만으로 alerting Hypothesis를 평가할 수 없다.

## H-014

### Evidence Type

Supporting

### Observation

My Dashboards, My Graphs, Watchlist Views, Saved Screens, Portfolio Holdings는 saved state 또는 User-owned Entity Candidate로 기록되어 있다.

### Interpretation

Koyfin은 cross-session continuity를 여러 saved state로 지원할 가능성이 있다. 실제 다음 날 재개 테스트는 수행하지 않았다.

### Evidence Level

Official Documentation Only

### Confidence

Medium

### Source

[04-core-journey-observations.md](04-core-journey-observations.md) S-010, [08-product-flow-architecture.md](08-product-flow-architecture.md) State Transition.

### Recommended Status

Strengthen

### Reason

재방문 가능성을 가진 saved state가 반복적으로 확인되지만 실제 restore behavior는 추가 검증이 필요하다.

## H-015

### Evidence Type

Neutral

### Observation

Market Dashboards는 World Equity Indices, US Sectors, Countries, Factors, Global Yields, Currencies, Commodities를 segment별로 설명한다. 상승 또는 하락 원인 기반 grouping은 확인되지 않았다.

### Interpretation

Koyfin은 Market Discovery를 원인보다 asset class와 segment 중심으로 grouping할 수 있다.

### Evidence Level

Official Product Page

### Confidence

Medium

### Source

[01-product-surface-map.md](01-product-surface-map.md) `KYF-SF-007`, [06-information-density-observations.md](06-information-density-observations.md) `KYF-DEN-011`.

### Recommended Status

Narrow Scope

### Reason

Market Discovery grouping은 원인 기반 grouping과 segment 기반 grouping을 분리해 비교해야 한다.
