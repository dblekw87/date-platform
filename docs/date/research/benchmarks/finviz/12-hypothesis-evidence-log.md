# Finviz Hypothesis Evidence Log

## Purpose

이 문서는 Finviz Phase 4.1~4.4 문서에서 확인된 Observation을 DATE Product Hypothesis Register의 H-001~H-015에 연결한다.

새로운 웹 조사, 새로운 Observation, Product Hypothesis Register 원본 수정은 수행하지 않았다.

## Source Documents

- [01-product-surface-map.md](./01-product-surface-map.md)
- [03-navigation-map.md](./03-navigation-map.md)
- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [06-information-density-observations.md](./06-information-density-observations.md)
- [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)
- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

## H-001

### Evidence Type

Variant

### Observation

Finviz는 Home의 Dense Market Summary, Screener, Maps, Groups, Stock Quote, 그리고 ticker Search를 함께 노출한다. Search는 존재하지만 Phase 4 문서에서는 Search 단독보다 Home / Screener / Stock Quote 조합이 더 강한 Entry Model로 기록되었다.

### Interpretation

DATE의 Search 중심 Entry Model 가설은 유지할 수 있으나, Finviz Evidence는 Search만으로 Entry를 설명하기보다 Summary, Discovery Surface, Entity Hub가 병렬로 작동하는 Variant Pattern을 제시한다.

### Evidence Level

Observed

### Confidence

Medium

### Source

- [01-product-surface-map.md](./01-product-surface-map.md)
- [03-navigation-map.md](./03-navigation-map.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)

### Recommended Status

Narrow Scope

### Reason

Search 중심 Hypothesis를 Entity lookup에는 유지하되, Market orientation과 Discovery entry는 별도 Entry Model로 분리 검토할 필요가 있다.

## H-002

### Evidence Type

Insufficient

### Observation

Finviz는 News, Calendar, Insider Transaction, Stock Quote 관련 Content를 제공하지만, Event 중심 Entity Model이 Stock보다 중심이라는 Observation은 Phase 4 문서에서 확인되지 않았다.

### Interpretation

Finviz Evidence는 Event 단위 연결 가능성을 보여주지만, Event가 Primary Entity로 작동한다는 결론에는 부족하다.

### Evidence Level

Partial

### Confidence

Low

### Source

- [02-screen-inventory.md](./02-screen-inventory.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md)

### Recommended Status

Needs More Evidence

### Reason

Calendar Event와 News Item의 Entity 역할은 추가 benchmark에서 확인해야 한다.

## H-003

### Evidence Type

Supporting

### Observation

Finviz Stock Quote는 ticker 중심 Stock Context를 유지하면서 Company 표시, Sector, Industry, Country, Exchange 링크를 함께 제공한다. Company가 내부 독립 Entity로 작동하는지는 확정하지 않았다.

### Interpretation

Stock과 Company를 구분해야 한다는 Hypothesis를 지지하지만, Finviz에서는 Stock Quote가 주된 Context이며 Company는 표시 또는 관련 Entity에 가깝다.

### Evidence Level

Observed

### Confidence

Medium

### Source

- [03-navigation-map.md](./03-navigation-map.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)

### Recommended Status

Narrow Scope

### Reason

Stock과 Company의 구분은 유지하되, Product Surface에서 둘이 항상 독립 Page로 분리되는 것은 아니다.

## H-004

### Evidence Type

Supporting

### Observation

Home은 Market Index, Heatmap, News, Signal List, Calendar, Insider, Futures / Forex Summary 등을 한 화면에 밀도 높게 배치하는 Dense Market Summary로 기록되었다.

### Interpretation

Home이 personal Dashboard보다 Market Discovery entry로 작동할 수 있다는 Hypothesis를 강화한다.

### Evidence Level

Observed

### Confidence

High

### Source

- [01-product-surface-map.md](./01-product-surface-map.md)
- [06-information-density-observations.md](./06-information-density-observations.md)
- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)

### Recommended Status

Strengthen

### Reason

Finviz Home은 account state 없이도 broad Market scan entry로 작동하는 Evidence를 제공한다.

## H-005

### Evidence Type

Variant

### Observation

Finviz는 News 원문, SEC Form 4, Screener formula documentation 등 External Evidence Link를 제공하지만, 사용자가 Evidence Graph를 저장하거나 재구성하는 상태는 확인되지 않았다.

### Interpretation

Evidence 연결 자체는 지지하지만, saved research structure까지 확장하는 Hypothesis는 Finviz에서는 확인되지 않았다.

### Evidence Level

Partial

### Confidence

Medium

### Source

- [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)

### Recommended Status

Narrow Scope

### Reason

Traceability와 saved Evidence structure를 분리해 검증해야 한다.

## H-006

### Evidence Type

Supporting

### Observation

Global Navigation은 주요 Surface에서 유지되고, Stock Quote는 ticker Context 안에서 Summary, Chart, News, Insider, Ownership, Options를 결합한다. External News와 SEC Form 4 이동 후에는 Finviz Context Loss가 기록되었다.

### Interpretation

Context Preservation은 Product 내부에서는 강하게 작동하지만, External Evidence 이동에서는 별도 복귀 설계가 필요하다는 Hypothesis를 지지한다.

### Evidence Level

Observed

### Confidence

High

### Source

- [03-navigation-map.md](./03-navigation-map.md)
- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)

### Recommended Status

Strengthen

### Reason

Finviz는 preserved Context와 lost Context가 동시에 존재하는 비교 가능한 Evidence를 제공한다.

## H-007

### Evidence Type

Insufficient

### Observation

Portfolio, Saved Screener, Alert는 Login Required 또는 Elite Feature로 기록되었다. 실제 persistence, saved state 복원, next-session continuity는 Not Verified로 남아 있다.

### Interpretation

User-owned Entity가 Navigation으로 작동할 가능성은 있으나, Finviz Public Observation만으로는 충분하지 않다.

### Evidence Level

Login Required / Elite Feature

### Confidence

Low

### Source

- [03-navigation-map.md](./03-navigation-map.md)
- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)

### Recommended Status

Needs More Evidence

### Reason

Portfolio와 Alert의 실제 state behavior는 account access 또는 Elite access 없이는 확인할 수 없다.

## H-008

### Evidence Type

Supporting

### Observation

Finviz는 Table, Heatmap, Chart, News List, Dense Summary를 서로 다른 역할로 사용한다. Screener와 Insider는 Table 중심 비교, Maps는 Heatmap compression, Stock Quote는 Dense Entity Hub, News는 list scan pattern으로 기록되었다.

### Interpretation

High Information Density가 무조건 과밀이 아니라, 반복 가능한 Information Form과 role separation이 있을 때 expert scan을 지원할 수 있다는 Hypothesis를 강화한다.

### Evidence Level

Observed

### Confidence

High

### Source

- [06-information-density-observations.md](./06-information-density-observations.md)
- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

### Recommended Status

Strengthen

### Reason

Finviz는 Dense UI의 benefit과 cost를 동시에 보여주는 benchmark Evidence다.

## H-009

### Evidence Type

Supporting

### Observation

News List에는 Source와 Timestamp가 표시되고, Insider Transaction은 SEC Form 4로 연결된다. Screener Metric formula는 Official Documentation으로 확인되었다. Public delay와 Elite real-time 차이도 Pricing / Product 설명에서 기록되었다.

### Interpretation

Trust를 높이려면 Source, Timestamp, Freshness, Methodology, External Evidence Link를 분리해 노출해야 한다는 Hypothesis를 지지한다.

### Evidence Level

Observed / Official Documentation

### Confidence

High

### Source

- [07-trust-and-evidence-observations.md](./07-trust-and-evidence-observations.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

### Recommended Status

Strengthen

### Reason

Finviz는 visible Source cue와 methodology documentation의 분리 필요성을 보여준다.

## H-010

### Evidence Type

Supporting

### Observation

Stock Quote는 Sector, Industry, Country, Exchange, peer 또는 related Stock 접근을 제공한다. Groups는 Aggregate Comparison Surface로 기록되었지만 일부 drill-down은 Partial 상태다.

### Interpretation

Related Entity comparison이 Stock research의 일부라는 Hypothesis를 지지한다. 다만 Groups drill-down은 Scope Limitation이 필요하다.

### Evidence Level

Observed / Partial

### Confidence

Medium

### Source

- [03-navigation-map.md](./03-navigation-map.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)

### Recommended Status

Strengthen

### Reason

Stock Quote 내부 related Entity link는 확인되었고, aggregate layer는 추가 검증 대상으로 남는다.

## H-011

### Evidence Type

Insufficient

### Observation

Finviz는 Futures, Forex, Crypto, Calendar를 제공하지만, Macro Entity에서 개별 Stock 판단까지 이어지는 confirmed Product Flow는 Phase 4 문서에서 확인되지 않았다.

### Interpretation

Macro-to-Stock linkage 가능성은 있으나, Finviz Evidence만으로 Hypothesis를 강화하기 어렵다.

### Evidence Level

Partial

### Confidence

Low

### Source

- [01-product-surface-map.md](./01-product-surface-map.md)
- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [08-product-flow-architecture.md](./08-product-flow-architecture.md)

### Recommended Status

Needs More Evidence

### Reason

Asset Class Surface와 Stock Quote 사이의 direct transition이 제한적으로만 확인되었다.

## H-012

### Evidence Type

Supporting

### Observation

Finviz의 Dense Home, Screener filter set, compact table, small Heatmap cell은 expert scan에는 빠른 비교를 제공하지만 novice user에게는 learning cost와 readability risk를 만든다고 기록되었다.

### Interpretation

같은 Surface가 novice와 expert에게 다른 cost-benefit을 만든다는 Hypothesis를 강화한다.

### Evidence Level

Observed

### Confidence

High

### Source

- [06-information-density-observations.md](./06-information-density-observations.md)
- [09-strengths-frictions-and-open-questions.md](./09-strengths-frictions-and-open-questions.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

### Recommended Status

Strengthen

### Reason

Finviz는 expert scalability와 novice cost를 같은 Pattern에서 동시에 보여준다.

## H-013

### Evidence Type

Variant

### Observation

Alert Rule은 Elite Feature로 기록되었고, evidence-change 기반 trigger인지 price-only trigger인지 Phase 4 문서에서 확인되지 않았다.

### Interpretation

Alert가 personal monitoring state가 될 수 있다는 점은 유지되지만, DATE Hypothesis의 evidence-change alert로 연결하기에는 부족하다.

### Evidence Level

Elite Feature / Not Verified

### Confidence

Low

### Source

- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

### Recommended Status

Narrow Scope

### Reason

Alert availability와 alert semantics를 분리해야 한다.

## H-014

### Evidence Type

Insufficient

### Observation

Portfolio, Saved Screener, Alert는 account 또는 Elite에 연결되지만, next-day revisit와 previous research context restoration은 Not Verified로 기록되었다.

### Interpretation

Cross-session continuity의 후보는 있으나, Finviz Public Surface만으로는 Hypothesis를 검증할 수 없다.

### Evidence Level

Login Required / Elite Feature / Not Verified

### Confidence

Low

### Source

- [04-core-journey-observations.md](./04-core-journey-observations.md)
- [05-entity-and-state-observations.md](./05-entity-and-state-observations.md)
- [10-evidence-hardening-review.md](./10-evidence-hardening-review.md)

### Recommended Status

Needs More Evidence

### Reason

Persistence range와 revisit behavior는 실제 account state 확인이 필요하다.

## H-015

### Evidence Type

Variant

### Observation

Finviz는 Signal List, Movers, Screener, Maps, Groups 등 ranking, filtering, visual compression, aggregate comparison 중심 Discovery를 제공한다. 원인 기반 grouping이 중심이라는 Observation은 확인되지 않았다.

### Interpretation

Cause-based grouping Hypothesis는 유지할 수 있으나, Finviz는 fast scan과 ranking-based discovery가 여전히 유효할 수 있음을 보여주는 Variant Pattern이다.

### Evidence Level

Observed / Partial

### Confidence

Medium

### Source

- [01-product-surface-map.md](./01-product-surface-map.md)
- [06-information-density-observations.md](./06-information-density-observations.md)
- [11-principle-extraction-readiness.md](./11-principle-extraction-readiness.md)

### Recommended Status

Narrow Scope

### Reason

Market Discovery grouping은 cause-based grouping과 scan-first ranking을 분리해 검증해야 한다.

## Summary

| Evidence Type | Count |
| --- | ---: |
| Supporting | 7 |
| Variant | 4 |
| Contradicting | 0 |
| Neutral | 0 |
| Insufficient | 4 |

| Recommended Status | Count |
| --- | ---: |
| Strengthen | 6 |
| Narrow Scope | 5 |
| Needs More Evidence | 4 |
| Keep Pending | 0 |
| Weaken | 0 |
| Split Hypothesis | 0 |
