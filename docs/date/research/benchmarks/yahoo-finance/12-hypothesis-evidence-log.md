# Yahoo Finance Hypothesis Evidence Log

## 문서 목적

이 문서는 Yahoo Finance Phase 5.1~5.4 Observation을 기존 Product Hypothesis 15개에 연결한다.

Product Hypothesis Register 원본은 수정하지 않는다. 모든 Recommended Status는 제안이며 DATE 방향을 확정하지 않는다.

## 요약

| Evidence Type | 수 |
| --- | ---: |
| Supporting | 7 |
| Variant | 5 |
| Contradicting | 0 |
| Neutral | 0 |
| Insufficient | 3 |
| Total | 15 |

| Recommended Status | 수 |
| --- | ---: |
| Strengthen | 6 |
| Narrow Scope | 6 |
| Needs More Evidence | 3 |

## H-001

### Evidence Type

Supporting

### Observation

Yahoo Help는 Search가 company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency를 지원한다고 기록한다. Search Suggestion Dropdown body는 Not Verified다.

### Interpretation

Yahoo Finance는 Search를 broad discovery feed보다 known Entity 또는 symbol lookup entry로 둔다. 다만 suggestion disambiguation 품질은 확인되지 않았다.

### Evidence Level

Official Documentation Only / Partial

### Confidence

High

### Source

[09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), YF-PC-002, Official Documentation

### Recommended Status

Strengthen

### Reason

Search 중심 entry 가능성을 지지하지만 Search Suggestion은 Scope Limitation이 필요하다.

## H-002

### Evidence Type

Insufficient

### Observation

Yahoo Finance는 News headline, publisher label, external article candidate, Quote News candidate를 제공한다. News에서 structured Event Entity로 전환되는 구조는 확인되지 않았다.

### Interpretation

Yahoo Finance는 News를 Event보다 publisher article과 Quote supporting content로 다루는 경향을 보인다.

### Evidence Level

Partial / Not Verified

### Confidence

Low

### Source

[07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), YF-TR-017, YF-TR-018, Official Product Observation

### Recommended Status

Needs More Evidence

### Reason

News-to-Event 전환이 확인되지 않아 H-002를 지지하거나 반박하기 어렵다.

## H-003

### Evidence Type

Variant

### Observation

Quote는 Stock / Symbol을 primary anchor로 사용하고 Company Display는 Profile, company information, provider data candidate로 Quote 안에 포함된다. 독립 Company Surface는 확인되지 않았다.

### Interpretation

Yahoo Finance는 Company와 Security를 명시적으로 분리하기보다 Symbol 중심 Quote 안에서 Company Display를 supporting context로 둔다.

### Evidence Level

Observed / Partial

### Confidence

Medium

### Source

[05-entity-and-state-observations.md](./05-entity-and-state-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), Official Product Observation

### Recommended Status

Narrow Scope

### Reason

분리 필요성은 남지만 Yahoo Finance Evidence는 embedded Company Display variant를 보여준다.

## H-004

### Evidence Type

Supporting

### Observation

Finance Home은 Market Summary, News, Trending Tickers, Watchlist / Portfolio candidate, Premium entry를 포함하는 Portal Entry로 기록됐다. Direct body와 logged-in Home은 Partial / Not Verified다.

### Interpretation

Yahoo Finance Home은 개인 Dashboard보다 Market / News / Trending 중심의 broad entry로 작동할 수 있다.

### Evidence Level

Partial

### Confidence

Medium

### Source

[06-information-density-observations.md](./06-information-density-observations.md), YF-DEN-001, [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), YF-PC-022

### Recommended Status

Narrow Scope

### Reason

Market Discovery entry 가능성을 지지하지만 Portal content mixing과 logged-in Home 미확인이 있다.

## H-005

### Evidence Type

Insufficient

### Observation

Watchlist, Portfolio, Saved Screener, Alerts, Chart Preference, Personalized Home은 Personal Continuity candidate로 기록됐지만 actual persistence와 Evidence relationship 저장은 Not Verified다.

### Interpretation

Yahoo Finance는 saved state 후보를 제공하지만 Evidence Graph 형태의 relation storage는 확인되지 않았다.

### Evidence Level

Login Required / Premium Feature / Not Verified

### Confidence

Low

### Source

[09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md), Personal Continuity Assessment

### Recommended Status

Needs More Evidence

### Reason

저장 기능은 있으나 Evidence relation 구조가 확인되지 않았다.

## H-006

### Evidence Type

Variant

### Observation

Quote Symbol과 Quote Local Tabs는 ticker context 안에서 유지되는 candidate다. External Article, Premium Landing, Related Symbol origin, Screener Back State에서는 Context Loss 또는 Not Verified가 기록됐다.

### Interpretation

Yahoo Finance는 entity-local context는 유지하지만 external validation과 cross-surface return path는 약하게 확인됐다.

### Evidence Level

Observed / Partial / Not Verified

### Confidence

Medium

### Source

[08-product-flow-architecture.md](./08-product-flow-architecture.md), Context Preservation Assessment

### Recommended Status

Narrow Scope

### Reason

Context Preservation은 Surface 내부와 external transition을 분리해 평가해야 한다.

## H-007

### Evidence Type

Supporting

### Observation

Watchlist, Portfolio, Saved Screener, Alerts, Personalized Home은 User State 또는 User-owned Entity candidate로 기록됐다. 대부분 Login Required 또는 Premium Feature다.

### Interpretation

Personal surfaces can become repeat-entry Navigation, but Yahoo Finance evidence is access-dependent.

### Evidence Level

Login Required / Premium Feature / Official Documentation Only

### Confidence

Medium

### Source

[05-entity-and-state-observations.md](./05-entity-and-state-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)

### Recommended Status

Narrow Scope

### Reason

Watchlist / Portfolio Navigation 가능성은 지지하지만 실제 logged-in interaction은 확인되지 않았다.

## H-008

### Evidence Type

Supporting

### Observation

Yahoo Finance는 Markets table, Screener result table, Quote tabs, Chart controls, Premium modules를 서로 다른 Information Form과 Density Control로 분리한다.

### Interpretation

Information Density는 단순 정보량이 아니라 table, tab, chart control, premium gate의 역할 분리로 조절된다.

### Evidence Level

Observed / Partial / Official Documentation Only

### Confidence

High

### Source

[06-information-density-observations.md](./06-information-density-observations.md), YF-DEN-002, YF-DEN-004, YF-DEN-009, YF-DEN-023

### Recommended Status

Strengthen

### Reason

Table, Chart, Tab 역할 분리가 반복적으로 확인됐다.

## H-009

### Evidence Type

Supporting

### Observation

Yahoo Help는 exchange delay, provider categories, real-time cue, Fair Value cadence, Premium research providers를 기록한다. News에는 publisher label이 있다.

### Interpretation

Source와 Freshness cue는 Product UI와 Help / Premium methodology layer에 분산되어 신뢰 판단을 보조한다.

### Evidence Level

Official Documentation Only / Partial / Premium Feature

### Confidence

High

### Source

[07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md), YF-TR-001~YF-TR-014

### Recommended Status

Strengthen

### Reason

Source / Freshness 표시 중요성을 강하게 지지한다. 단 item-level Traceability는 별도 Scope Limitation이 필요하다.

## H-010

### Evidence Type

Supporting

### Observation

Markets는 category table comparison을 제공하고 Screeners result는 predefined candidate set table과 heatmap view를 제공한다. Quote related transition은 Not Verified다.

### Interpretation

Yahoo Finance는 단일 Quote 분석 전후로 Market category와 Screener table comparison을 제공한다.

### Evidence Level

Observed / Partial

### Confidence

High

### Source

[06-information-density-observations.md](./06-information-density-observations.md), YF-DEN-002, YF-DEN-009, YF-DEN-023

### Recommended Status

Strengthen

### Reason

비교 Surface가 반복 확인됐다. Related Entity comparison은 추가 확인이 필요하다.

## H-011

### Evidence Type

Variant

### Observation

Markets는 commodities, currencies, crypto, indices 등 asset category comparison을 제공한다. Macro-to-stock impact relation은 확인되지 않았다.

### Interpretation

Yahoo Finance는 macro category access를 제공하지만 특정 Stock 영향 연결보다는 category summary와 table comparison에 가깝다.

### Evidence Level

Observed / Not Verified

### Confidence

Medium

### Source

[01-product-surface-map.md](./01-product-surface-map.md), [08-product-flow-architecture.md](./08-product-flow-architecture.md)

### Recommended Status

Narrow Scope

### Reason

Macro Surface 존재는 지지하지만 macro-to-entity causality는 확인되지 않았다.

## H-012

### Evidence Type

Supporting

### Observation

Predefined Screener Cards, Quote Summary, Markets tables는 낮은 setup cost를 제공하고 Chart controls, Premium research, Portfolio Analytics는 expert expansion candidate로 기록됐다.

### Interpretation

Yahoo Finance는 novice entry와 expert expansion을 같은 Product 안에서 분리된 module로 제공할 수 있다.

### Evidence Level

Observed / Official Documentation Only / Premium Feature

### Confidence

High

### Source

[06-information-density-observations.md](./06-information-density-observations.md), [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)

### Recommended Status

Strengthen

### Reason

초보자 entry와 expert expansion이 여러 Surface에서 확인됐다.

## H-013

### Evidence Type

Insufficient

### Observation

Premium Alerts는 documented Premium Feature다. Alert trigger builder, price vs Evidence-change condition, actual workflow는 Not Verified다.

### Interpretation

Yahoo Finance Evidence는 alert feature existence만 제공하고 Evidence change 중심 alert 가능성은 확인하지 못했다.

### Evidence Level

Premium Feature / Not Verified

### Confidence

Low

### Source

[08-product-flow-architecture.md](./08-product-flow-architecture.md), YF-PC-004 Personal Continuity Flow

### Recommended Status

Needs More Evidence

### Reason

Alert type과 trigger semantics가 확인되지 않았다.

## H-014

### Evidence Type

Variant

### Observation

Watchlist, Portfolio, Saved Screener, Personalized Home은 revisit candidate지만 actual next-day restore, Recent / History, Chart Preference Persistence는 Not Verified다.

### Interpretation

Yahoo Finance는 cross-session continuity를 account state로 해결할 가능성이 있지만 실제 restoration depth는 확인되지 않았다.

### Evidence Level

Login Required / Premium Feature / Not Verified

### Confidence

Medium

### Source

[08-product-flow-architecture.md](./08-product-flow-architecture.md), Personal Continuity Flow and Context Preservation Assessment

### Recommended Status

Narrow Scope

### Reason

Revisit는 account state 후보로 좁혀야 하며 session restoration은 추가 Evidence가 필요하다.

## H-015

### Evidence Type

Variant

### Observation

Yahoo Finance는 Trending, Markets category, Screeners predefined criteria, News headline을 제공하지만 cause-based grouping은 확인되지 않았다.

### Interpretation

Yahoo Finance Discovery는 원인 기반 grouping보다 portal, ranking, category, criteria grouping에 가깝다.

### Evidence Level

Observed / Partial / Not Verified

### Confidence

Medium

### Source

[06-information-density-observations.md](./06-information-density-observations.md), YF-DEN-001, YF-DEN-021, YF-DEN-023

### Recommended Status

Narrow Scope

### Reason

Discovery grouping은 지지하지만 cause-based grouping은 확인되지 않았다.
