# Bloomberg Hypothesis Evidence Log

## 문서 목적

이 문서는 Bloomberg Phase 6.1~6.4 Observation을 기존 Product Hypothesis 15개에 연결한다.

Product Hypothesis Register 원본은 수정하지 않는다. Bloomberg Terminal은 직접 사용하지 않았으므로 Terminal 관련 Evidence는 Official Product Description 또는 Not Verified 제한을 유지한다.

## Evidence 분포

| Evidence Type | 수 |
| --- | ---: |
| Supporting | 5 |
| Variant | 5 |
| Contradicting | 0 |
| Neutral | 0 |
| Insufficient | 5 |

## Recommended Status 분포

| Recommended Status | 수 |
| --- | ---: |
| Strengthen | 4 |
| Narrow Scope | 7 |
| Needs More Evidence | 4 |

## H-001

## Evidence Type

Variant

## Observation

Bloomberg Public Web은 Search entry를 제공하지만 Search Result Grouping은 Not Verified다. Terminal은 Command Entry와 Function / Security 후보를 제공하지만 actual command parsing, autocomplete, recent, favorites는 Not Verified다.

## Interpretation

Bloomberg는 Search 중심 entry보다 Public Search와 Terminal Command Entry를 분리한 Variant를 보여준다.

## Evidence Level

Partial / Official Product Description Only / Not Verified

## Confidence

Medium

## Source

`04-navigation-map.md`, `05-core-journey-observations.md`, `12-principle-extraction-readiness.md`.

## Recommended Status

Narrow Scope

## Reason

Search가 중심 entry일 수 있다는 Hypothesis는 Public Search뿐 아니라 expert Command Entry와 Function routing을 별도 case로 나눠야 한다.

## H-002

## Evidence Type

Insufficient

## Observation

Bloomberg News, Article, First Word, Daybreak, News Alerts, Economic Event 후보가 기록되었지만 News-to-Event 구조화 관계는 확인하지 않았다.

## Interpretation

Bloomberg는 News와 professional monitoring stack을 보여주지만 Event가 중심 Entity인지 판단하기에는 Evidence가 부족하다.

## Evidence Level

Partially Observed / Official Product Description Only / Not Verified

## Confidence

Low

## Source

`03-screen-and-function-inventory.md`, `06-entity-and-state-observations.md`, `08-trust-and-evidence-observations.md`.

## Recommended Status

Needs More Evidence

## Reason

News, Article, Alert, Event 후보는 분리되었지만 Event Entity 중심 구조는 확인되지 않았다.

## H-003

## Evidence Type

Supporting

## Observation

Security, Stock, Company는 별도 Entity Candidate로 기록되었다. Public Quote와 Company Profile candidate, Terminal Security Lookup, Company Research, Bloomberg Intelligence가 각각 다른 responsibility를 가진다.

## Interpretation

Bloomberg는 Security와 Company를 구분해야 할 가능성을 강화한다. 다만 actual Terminal identifier model은 Not Verified다.

## Evidence Level

Partial / Official Product Description Only

## Confidence

Medium

## Source

`03-screen-and-function-inventory.md`, `06-entity-and-state-observations.md`, `09-product-flow-architecture.md`.

## Recommended Status

Strengthen

## Reason

Security와 Company의 Surface / Function responsibility가 분리되어 기록되었다.

## H-004

## Evidence Type

Variant

## Observation

Bloomberg.com Home은 News, Video, Market Data footer, category Navigation, Subscription CTA를 결합하는 Public Web Portal Entry다. Terminal professional Workflow는 Home과 별도 Product Layer다.

## Interpretation

Home이 Market Discovery만 담당한다기보다 Public awareness와 media / subscription entry를 함께 담당하는 Variant다.

## Evidence Level

Partially Observed

## Confidence

Medium

## Source

`02-product-surface-map.md`, `07-information-density-observations.md`, `10-strengths-frictions-and-open-questions.md`.

## Recommended Status

Narrow Scope

## Reason

Home 역할은 Public Web과 Terminal Product Layer를 분리해 평가해야 한다.

## H-005

## Evidence Type

Variant

## Observation

Bloomberg에는 Article, Terminal News, Bloomberg Intelligence, Portfolio & Risk Analytics, Data License, Server API, Excel Add-ins 같은 Evidence / data candidates가 있다. 그러나 saved Evidence Graph나 relationship persistence는 확인되지 않았다.

## Interpretation

Evidence가 UI, research, Portfolio, Data Integration으로 확장되는 Variant를 제공하지만 Evidence Graph 저장 구조는 부족하다.

## Evidence Level

Partial / Official Product Description Only / Not Verified

## Confidence

Medium

## Source

`08-trust-and-evidence-observations.md`, `09-product-flow-architecture.md`, `10-strengths-frictions-and-open-questions.md`.

## Recommended Status

Narrow Scope

## Reason

Evidence는 Product Layer별로 분산되지만 saved relationship model은 확인되지 않았다.

## H-006

## Evidence Type

Variant

## Observation

Workspace, Launchpad, Panel, Linked Window, Security Context, Worksheet는 Context Preservation 후보로 기록되었다. 그러나 Security Context Linking, Workspace Persistence, Launchpad Save / Restore는 Not Verified다.

## Interpretation

Bloomberg는 page movement보다 Workspace / Function / Security Context 후보를 통해 context preservation 문제를 다루는 Variant를 제공한다.

## Evidence Level

Official Product Description Only / Inference / Not Verified

## Confidence

Medium

## Source

`06-entity-and-state-observations.md`, `09-product-flow-architecture.md`, `11-evidence-hardening-review.md`.

## Recommended Status

Narrow Scope

## Reason

Context Preservation은 핵심 질문이지만 actual linking evidence가 부족해 scope를 제한해야 한다.

## H-007

## Evidence Type

Supporting

## Observation

Watchlist, Worksheet, Workspace, Portfolio, Alert, Anywhere Session은 User State Candidate로 기록되었다.

## Interpretation

Personal entry와 workflow state가 Navigation 역할을 할 가능성을 지지하지만 persistence는 확인되지 않았다.

## Evidence Level

Official Product Description Only / Login Required / Not Verified

## Confidence

Medium

## Source

`06-entity-and-state-observations.md`, `10-strengths-frictions-and-open-questions.md`, `12-principle-extraction-readiness.md`.

## Recommended Status

Narrow Scope

## Reason

Workspace와 Watchlist / Portfolio 후보가 있지만 User-owned state인지 actual Navigation인지 추가 검증이 필요하다.

## H-008

## Evidence Type

Supporting

## Observation

Bloomberg는 Public Markets Table, Terminal Workspace, Launchpad Monitor, Terminal News, Portfolio & Risk Analytics, Data / API Density를 Information Density와 Workflow Density로 분리해 기록했다.

## Interpretation

높은 density는 정보량뿐 아니라 Table, Chart, Workspace, Function, Integration의 responsibility 분리와 연결된다.

## Evidence Level

Observed / Official Product Description Only

## Confidence

Medium

## Source

`07-information-density-observations.md`, `10-strengths-frictions-and-open-questions.md`, `12-principle-extraction-readiness.md`.

## Recommended Status

Strengthen

## Reason

Information Density와 Workflow Density 구분이 Hypothesis를 강화한다.

## H-009

## Evidence Type

Supporting

## Observation

Bloomberg Original News, Public Markets tables, Terminal real-time Market Data responsibility, Bloomberg Intelligence, Data License, Server API, B-PIPE, Entitlement boundary가 Trust / Evidence signals로 기록되었다.

## Interpretation

Bloomberg는 Source / Provider / Freshness / Entitlement를 별도 trust dimension으로 다뤄야 함을 지지한다.

## Evidence Level

Partial / Official Product Description Only / Enterprise Entitlement

## Confidence

Medium

## Source

`08-trust-and-evidence-observations.md`, `11-evidence-hardening-review.md`.

## Recommended Status

Strengthen

## Reason

Source와 Freshness뿐 아니라 entitlement와 provider boundary가 trust UX에 포함되어야 한다.

## H-010

## Evidence Type

Supporting

## Observation

Markets Table, asset class pages, Terminal Market Monitor candidate, Charts, Portfolio & Risk Analytics는 comparison과 analysis Surface / Function 후보로 기록되었다.

## Interpretation

Bloomberg는 single Entity analysis보다 Market, Security, Portfolio, Position, Risk Factor 비교가 중요할 수 있음을 지지한다.

## Evidence Level

Observed / Official Product Description Only

## Confidence

Medium

## Source

`03-screen-and-function-inventory.md`, `07-information-density-observations.md`, `09-product-flow-architecture.md`.

## Recommended Status

Strengthen

## Reason

Public Market tables와 professional Portfolio / Risk workflow가 comparison need를 강화한다.

## H-011

## Evidence Type

Variant

## Observation

Macro / Economics, Bloomberg Economics, Rates & Bonds, Country, Economic Indicator candidate가 기록되었다. 그러나 Macro-to-Security transition은 Not Verified다.

## Interpretation

Bloomberg는 macro data와 professional research product가 중요함을 보여주지만, direct macro-to-stock linkage는 확인되지 않았다.

## Evidence Level

Partial / Official Product Description Only / Not Verified

## Confidence

Medium

## Source

`03-screen-and-function-inventory.md`, `05-core-journey-observations.md`, `06-entity-and-state-observations.md`.

## Recommended Status

Narrow Scope

## Reason

Macro capability는 보이지만 DATE의 Entity Relationship Hypothesis로 강화하려면 transition evidence가 필요하다.

## H-012

## Evidence Type

Variant

## Observation

Public Web은 broad reader / public investor 대상이고 Terminal은 financial professional 대상이다. Command Entry, Function, Workspace, Portfolio Analytics는 professional density와 high learning cost를 함께 가진다.

## Interpretation

Bloomberg는 beginner / expert duality를 하나의 simplified UI 안에서 해결하기보다 Product Layer를 분리하는 Variant를 보여준다.

## Evidence Level

Observed / Official Product Description Only

## Confidence

Medium

## Source

`01-product-boundary.md`, `10-strengths-frictions-and-open-questions.md`, `12-principle-extraction-readiness.md`.

## Recommended Status

Narrow Scope

## Reason

초보자와 전문가 동시 지원은 Product Layer 분리라는 방식도 고려해야 한다.

## H-013

## Evidence Type

Insufficient

## Observation

News Alerts, Alert candidate, Professional App Alerts가 기록되었지만 alert rule builder, trigger condition, dismissal state는 Not Verified다.

## Interpretation

Alert가 중요한 professional monitoring capability임은 보이지만 Evidence change 중심인지 price / news 중심인지는 확인되지 않았다.

## Evidence Level

Official Product Description Only / Not Verified

## Confidence

Low

## Source

`03-screen-and-function-inventory.md`, `05-core-journey-observations.md`, `08-trust-and-evidence-observations.md`.

## Recommended Status

Needs More Evidence

## Reason

Alert type과 trigger model을 확인하지 못했다.

## H-014

## Evidence Type

Insufficient

## Observation

Workspace, Launchpad, Worksheet, Bloomberg Anywhere, Professional App, Watchlist, Portfolio, Alert는 continuity candidates로 기록되었지만 actual persistence와 revisit behavior는 Not Verified다.

## Interpretation

Bloomberg는 cross-session continuity 후보가 많지만 direct session 없이는 다음 날 분석 재개를 확인할 수 없다.

## Evidence Level

Official Product Description Only / Login Required / Not Verified

## Confidence

Low

## Source

`05-core-journey-observations.md`, `06-entity-and-state-observations.md`, `09-product-flow-architecture.md`.

## Recommended Status

Needs More Evidence

## Reason

Workspace restore와 Anywhere continuity가 핵심 미확인 영역이다.

## H-015

## Evidence Type

Insufficient

## Observation

Markets Table, News, Terminal News Trends, News Alerts, Bloomberg Economics candidate가 기록되었지만 cause-based grouping은 확인하지 않았다.

## Interpretation

Bloomberg는 Market data와 News monitoring을 제공하지만 원인 기반 grouping이 ranking보다 유용하다는 Hypothesis를 직접 지지하지 않는다.

## Evidence Level

Observed / Official Product Description Only / Not Verified

## Confidence

Low

## Source

`03-screen-and-function-inventory.md`, `07-information-density-observations.md`, `09-product-flow-architecture.md`.

## Recommended Status

Needs More Evidence

## Reason

Market Discovery grouping의 cause-based 구조는 추가 검증이 필요하다.
