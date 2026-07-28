# Finviz Evidence Hardening Review 기록

## 문서 목적

이 문서는 Finviz Phase 4.1~4.3 문서의 Evidence 상태를 검토한다.

새로운 웹 조사는 수행하지 않는다. 기존 문서의 Observation Status, Confidence, Mermaid 관계, Documentation Only 의존도, Login Required / Elite Feature 구분을 점검하고 Candidate Principle Extraction 진행 가능 여부를 판단한다.

## 검토한 문서

- [README.md](README.md)
- [00-access-and-method.md](00-access-and-method.md)
- [01-product-surface-map.md](01-product-surface-map.md)
- [02-screen-inventory.md](02-screen-inventory.md)
- [03-navigation-map.md](03-navigation-map.md)
- [04-core-journey-observations.md](04-core-journey-observations.md)
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md)
- [06-information-density-observations.md](06-information-density-observations.md)
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md)
- [08-product-flow-architecture.md](08-product-flow-architecture.md)
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md)

## 기존 Evidence 상태 분포

기존 [08-product-flow-architecture.md](08-product-flow-architecture.md)의 Flow 수 요약은 유지한다.

| Status | Flow 수 |
| --- | ---: |
| Observed | 18 |
| Partial | 11 |
| Official Documentation Only | 5 |
| Login Required / Elite Feature | 8 |
| Inferred | 6 |
| Not Verified | 7 |

## 변경 Evidence 상태 분포

이번 hardening에서 Flow status를 변경하지 않았다.

| Status | 변경 후 Flow 수 |
| --- | ---: |
| Observed | 18 |
| Partial | 11 |
| Official Documentation Only | 5 |
| Login Required / Elite Feature | 8 |
| Inferred | 6 |
| Not Verified | 7 |

## 주요 Finding

| Finding ID | Finding | 조치 |
| --- | --- | --- |
| FNV-EH-001 | Maps와 Groups는 official Product / Blog / indexed text에 의존하며 dynamic interaction은 직접 확인하지 않았다. | `Partial` 유지. Principle Extraction에서 `Needs Additional Evidence`로 제한한다. |
| FNV-EH-002 | Heatmap Cell은 Navigation Unit 후보로 기록되어 있으나 확정 관계가 아니다. | `Candidate`, `Partial`, `Not Verified` 표현을 유지한다. |
| FNV-EH-003 | Portfolio, Saved Screener, Alert Rule은 Login Required 또는 Elite Feature다. | 실제 persistence처럼 표현하지 않는다. |
| FNV-EH-004 | Screener와 Stock Quote는 public Product Observation이 강하다. | Observed와 High Confidence 유지가 가능하다. |
| FNV-EH-005 | Advertisement Flow는 public tracking / upsell Observation과 Elite No Ads Interpretation으로 분리되어 있다. | 별도 Advertisement Assessment로 유지한다. |
| FNV-EH-006 | News와 SEC Form 4는 external trace가 강하지만 Context Preservation은 약하다. | Strength와 Friction 양쪽에 기록한다. |

## 하향 조정한 항목

하향 조정한 항목은 없다.

이유:

- Phase 4.1~4.3 문서는 이미 `Observed`, `Partial`, `Official Documentation Only`, `Login Required`, `Elite Feature`, `Inferred`, `Not Verified`를 분리하고 있다.
- Maps와 Groups는 `Observed`로 올리지 않고 `Partial` 또는 `Partially Observed`로 유지되어 있다.
- Heatmap Cell은 확정 Navigation Unit이 아니라 candidate로 표현되어 있다.
- Login Required / Elite Feature는 실제 사용 동작처럼 작성되지 않았다.

## 삭제한 관계

삭제한 관계는 없다.

이유:

- Mermaid 관계는 status label 또는 dashed edge로 확인 수준을 표시한다.
- 관계 삭제가 필요할 만큼 기존 Observation과 충돌하는 항목을 발견하지 않았다.
- `Inferred` 관계는 Product Architecture 확정으로 표현되지 않았다.

## Confidence 변경

Confidence 변경은 없다.

| 항목 | Confidence | 유지 이유 |
| --- | --- | --- |
| Home Dense Summary | High | public Home Product Observation으로 확인됐다. |
| Screener Filter / Result | High | public Screener와 Help가 모두 일관된다. |
| Stock Quote Dense Hub | High | public Stock Quote에서 직접 확인됐다. |
| News Source / Timestamp | High | public News와 Stock Quote News list에서 확인됐다. |
| Insider to SEC Form 4 | High | public Insider table에서 직접 확인됐다. |
| Maps / Heatmap | Medium | official Source는 있으나 dynamic interaction은 Not Verified다. |
| Groups | Medium | public controls는 확인됐지만 drill-down은 Not Verified다. |
| Portfolio / Saved State | Medium | account / pricing basis는 확인됐지만 internal state는 Login Required다. |
| Alert Rule | Medium | Elite feature로 확인됐지만 trigger builder는 Not Verified다. |
| Mobile | Low | 직접 확인하지 않았다. |

## Elite / Login Restricted 항목

| 항목 | Status | Review 판단 |
| --- | --- | --- |
| Portfolio | Login Required / Elite Feature 일부 | actual Portfolio body는 확인되지 않았다. |
| Saved Screener / My Presets | Login Required / Documentation Only | preset existence는 official Help / Pricing 기반이다. |
| Alert Rule | Elite Feature | trigger UI는 Not Verified다. |
| Layout Preference | Elite Feature | actual settings UI는 Not Verified다. |
| Media Source Preference | Elite Feature | News settings UI는 Not Verified다. |
| Export / API | Elite Feature | capability는 Pricing 기반이고 workflow는 Not Verified다. |
| No Ads | Elite Feature | Pricing 기반이며 actual layout impact는 Not Verified다. |

## Partial 항목

- Maps / Heatmap dynamic interaction
- Groups to Stock drill-down
- Futures / Forex / Crypto detail Surface
- Calendar detail Surface
- News to internal Stock context
- Stock Quote Filings body
- Screener Back Navigation state
- Advertisement actual placement impact

## Inferred 항목

다음 항목은 Principle Extraction에서 Observation처럼 사용하지 않는다.

- Stock Quote가 Company와 Security를 내부적으로 분리하는지 여부
- Portfolio가 Watchlist인지 holdings Surface인지 여부
- Saved Screener가 dynamic result를 저장하는지 여부
- Recent Stock 또는 History 존재 여부
- Heatmap Cell이 current UI에서 direct Stock Quote transition을 수행하는지 여부
- Advertisement가 실제 Navigation 오인을 만드는지 여부

## Not Verified 항목

- Maps cell click, hover, double-click current behavior
- Groups Sector to Industry to Stock drill-down
- Portfolio internal table, item action, persistence
- Alert condition builder와 trigger Source
- Mobile / responsive Navigation
- Recent Stock / History
- Backtests current Product body
- Asset Class detail pages
- Calendar Event Source와 Stock link

## Mermaid 관계 검토

| 문서 | 검토 결과 |
| --- | --- |
| 01-product-surface-map.md | dotted edge가 Documentation, Blog, Login / Elite 관계를 구분한다. |
| 03-navigation-map.md | Partial, Official Blog, Login Required, Elite Feature, Not Verified 관계가 label로 표시되어 있다. |
| 08-product-flow-architecture.md | Flow edge에 Observed, Partial, Login Required, Elite Feature, Inferred, Not Verified label이 있다. |

수정이 필요한 Mermaid 관계는 발견하지 않았다.

## Advertisement Flow 검토

Observation:
Public Surface에서 ad / tracking element와 Stock Quote upsell candidate가 확인됐다. Elite는 No Ads를 표시한다.

Interpretation:
Advertisement는 content competition과 subscription navigation을 동시에 만들 수 있다. No Ads는 Density Control로 해석될 수 있다.

Review 판단:
현재 문서들은 Observation과 Interpretation을 분리하고 있다. actual layout shift, click confusion, visual hierarchy impact는 Not Verified로 유지한다.

Confidence:
Medium

## Evidence 품질 판단

| 영역 | 판단 | 이유 |
| --- | --- | --- |
| Product Surface | 충분 | public Product page와 Pricing / Help로 Surface responsibility를 분리했다. |
| Navigation | 제한적 충분 | public top Navigation과 Stock Quote local tabs는 강하나 Maps / Groups dynamic path는 Partial이다. |
| Core Journey | 제한적 충분 | 12개 Scenario는 completion, partial, unavailable을 분리했다. |
| Entity / State | 제한적 충분 | Entity와 User State를 Candidate로 유지했다. |
| Information Density | 충분 | Home, Screener, Stock Quote, News, Insider는 public Observation이 강하다. Maps / Groups는 Partial로 제한했다. |
| Trust / Evidence | 제한적 충분 | News / SEC trace는 강하고 Metric formula는 Documentation 기반이다. item-level Source는 gap으로 남겼다. |
| Product Flow | 제한적 충분 | Flow status 분포가 명확하며 Login / Elite / Inferred 관계가 분리되어 있다. |
| Advertisement | 제한적 | No Ads와 ad element는 확인했으나 UX impact는 정량 확인하지 않았다. |

## 다음 단계 진행 가능 여부

Ready for Principle Extraction

조건:

- Candidate Principle은 Finviz에서 확인된 확정 Product Principle이 아니라 `Candidate`로만 작성한다.
- Maps, Groups, Portfolio, Alert, Mobile, Recent / History는 Principle Extraction에서 `Needs Additional Evidence`로 제한한다.
- Heatmap Cell은 direct Navigation Unit으로 확정하지 않는다.
- Advertisement 관련 Pattern은 Product Principle보다 Trade-off 또는 benchmark-specific pattern으로 다룬다.
- Registry는 Candidate Principle 작성 단계에서만 수정한다.
