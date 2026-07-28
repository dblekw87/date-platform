# Yahoo Finance Evidence Hardening Review

## 문서 목적

이 문서는 Yahoo Finance Phase 5.1~5.3 문서의 Evidence 상태를 점검한다.

새로운 웹 조사는 수행하지 않는다. 기존 Observation Status, Confidence, Mermaid 관계, Official Documentation 의존도, Login Required / Premium Feature 구분을 검토하고 Candidate Principle Extraction 진행 가능 여부를 판단한다.

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

기존 [08-product-flow-architecture.md](08-product-flow-architecture.md)의 Flow 수 요약을 기준값으로 유지한다.

| Status | Flow 수 |
| --- | ---: |
| Observed | 14 |
| Partial | 13 |
| Official Documentation Only | 9 |
| Login / Premium Restricted | 12 |
| Inferred | 7 |
| Not Verified | 8 |

## 변경 Evidence 상태 분포

이번 hardening에서 Flow status를 변경하지 않았다.

| Status | 변경 후 Flow 수 |
| --- | ---: |
| Observed | 14 |
| Partial | 13 |
| Official Documentation Only | 9 |
| Login / Premium Restricted | 12 |
| Inferred | 7 |
| Not Verified | 8 |

## 주요 Finding

| Finding ID | Finding | 조치 |
| --- | --- | --- |
| YF-EH-001 | Official Documentation 기반 Chart, Portfolio, Premium 항목이 많다. | Product Interaction으로 과장하지 않고 Documentation Only 또는 Premium Feature로 유지한다. |
| YF-EH-002 | Search Suggestion은 accepted Entity types만 확인됐고 dropdown body는 Not Verified다. | Search Strength는 supported lookup으로 제한한다. |
| YF-EH-003 | Quote는 강한 Entity Hub 후보지만 일부 tab body가 Partially Observed 또는 Not Verified다. | Quote Pattern은 `Ready with Scope Limitation`으로 제한한다. |
| YF-EH-004 | Portfolio, Watchlist, Saved Screener, Alerts는 Personal Continuity candidate이지만 persistence는 실제 확인되지 않았다. | `Needs Additional Evidence`로 제한한다. |
| YF-EH-005 | Premium Provider Transparency는 강하지만 Premium Feature다. | public Evidence와 Premium-dependent Evidence를 분리한다. |
| YF-EH-006 | Advertisement와 Premium Module은 Observation과 Interpretation이 분리되어 있다. | ad placement impact는 Not Verified로 유지한다. |
| YF-EH-007 | Portal Flow는 Yahoo Finance 고유성이 강하다. | Benchmark-specific 또는 scope-limited pattern으로 분류한다. |

## 하향 조정한 항목

하향 조정한 항목은 없다.

이유:

- Phase 5.1~5.3 문서는 `Observed`, `Partial`, `Official Documentation Only`, `Login Required`, `Premium Feature`, `Inferred`, `Not Verified`를 이미 분리하고 있다.
- Search Suggestion, Drawing Tool, Recent, Mobile, logged-in Home은 확정 Observation으로 쓰이지 않았다.
- Portfolio / Watchlist는 User-owned Entity Candidate와 Login Required로 유지되어 있다.
- Premium Feature는 실제 사용 Observation처럼 작성되지 않았다.

## 삭제한 관계

삭제한 관계는 없다.

이유:

- Mermaid edge에는 status label이 표시되어 있다.
- `Not Verified`와 `Login Required` 관계가 Observed relation처럼 표현되지 않았다.
- Product Flow는 DATE Architecture 확정안으로 작성되지 않았다.

## Confidence 변경

Confidence 변경은 없다.

| 항목 | Confidence | 유지 이유 |
| --- | --- | --- |
| Markets Category Tables | High | official Product pages에서 observed다. |
| Screeners Hub / Predefined Result | High | official Product pages와 Help가 일관된다. |
| Quote Structure | High / Medium | Quote structure는 강하지만 일부 tab body는 제한된다. |
| Search Supported Target Types | High | Yahoo Help가 명확히 기록한다. |
| Search Suggestion | Low | dropdown body는 Not Verified다. |
| Portfolio / Watchlist | Medium | official Help는 있으나 logged-in UI는 Not Verified다. |
| Premium Provider Transparency | High | official Help / Pricing 기반이다. |
| Advertisement Impact | Medium | label과 ad-free는 확인됐지만 layout impact는 Not Verified다. |
| Mobile / Recent | Low | 직접 확인하지 않았다. |

## Login Required 항목

| 항목 | Status | Review 판단 |
| --- | --- | --- |
| My Portfolio | Login Required | internal holdings / transactions UI는 Not Verified다. |
| Watchlist | Login Required / Partial | personal symbol set persistence는 Not Verified다. |
| Custom Screener Save | Login Required / Documentation Only | Help step은 확인됐지만 current interaction은 Not Verified다. |
| Portfolio Holdings | Login Required / Documentation Only | calculation UI는 Not Verified다. |
| Brokerage Link | Login Required / Documentation Only | broker sync cadence는 Not Verified다. |
| Personalized Home | Login Required / Partial | logged-in Home body는 Not Verified다. |

## Premium Feature 항목

| 항목 | Status | Review 판단 |
| --- | --- | --- |
| Fair Value | Premium Feature / Documentation | methodology는 확인됐지만 in-product module은 Not Verified다. |
| Research Reports | Premium Feature / Documentation | provider와 frequency는 확인됐지만 report body는 Not Verified다. |
| Premium Charts | Premium Feature / Documentation | partner layers는 확인됐지만 current UI는 Not Verified다. |
| Premium Screeners | Premium Feature / Pricing | exact gate는 Not Verified다. |
| Portfolio Analytics | Premium Feature / Documentation | methodology는 확인됐지만 UI는 Not Verified다. |
| Premium Alerts | Premium Feature | trigger builder는 Not Verified다. |
| Ad-free | Premium Feature / Documentation | actual layout effect는 Not Verified다. |

## Partial 항목

- Home current hierarchy and personalized blocks
- Search to Quote Product interaction
- Quote tab bodies
- News related symbol and external article return path
- Screener result to Quote transition
- Screener Save / Download / Customize gate
- Premium modules in Product Surfaces
- Advertisement placement and visual effect

## Official Documentation Only 항목

- Search supported Entity types
- Chart indicator / compare / settings details
- Custom Screener save steps
- Portfolio creation / import / export / holdings steps
- Exchange delay and provider table
- Fair Value methodology
- Research report provider and frequency
- Premium Portfolio Analytics methodology

## Inferred 항목

다음 항목은 Principle Extraction에서 Observation처럼 사용하지 않는다.

- Yahoo Finance as Finance Portal plus Investment Research Product
- Security as umbrella Entity
- Company Display as independent Company Entity
- Watchlist and Portfolio boundary
- Recent or History state
- Search Suggestion disambiguation quality
- ad-free as actual layout change

## Not Verified 항목

- Search Suggestion dropdown
- Logged-in Home
- Portfolio internals
- Watchlist internals
- Saved Screener persistence
- Premium gate actual UI
- Alerts trigger builder
- Recent / History
- Mobile
- External Article return path
- Chart Preference persistence
- Related Symbol origin preservation

## Mermaid 관계 검토

| 문서 | 검토 결과 |
| --- | --- |
| 03-navigation-map.md | Navigation 관계는 `Observed`, `Partially Observed`, `Official Documentation`, `Login Required`, `Official Pricing` label로 구분된다. |
| 08-product-flow-architecture.md | Flow edge에 `Observed`, `Partial`, `Official Documentation`, `Login Required`, `Premium Feature`, `Not Verified` label이 있다. |

수정이 필요한 Mermaid 관계는 발견하지 않았다.

## Portal Flow 검토

Observation:
Finance Home은 Market Summary, News / Trending, personalized content candidate, Search, Markets, Screeners entry와 연결된다.

Interpretation:
Portal Flow는 broad entry cost를 낮출 수 있지만 Research Tool focus를 흐릴 수 있다.

Review 판단:
Portal Flow는 Yahoo Finance의 중요한 structural pattern이지만 Home body와 logged-in Home은 Partial / Not Verified다. Principle Extraction에서는 scope limitation이 필요하다.

Confidence:
Medium

## Advertisement / Premium Flow 검토

Observation:
Public Surface는 advertisement label candidate와 Premium Module candidate를 포함한다. Premium pages는 ad-free, advanced analysis, research, charts, screeners, Portfolio Analytics, Alerts를 기록한다.

Interpretation:
Advertisement는 monetization condition이고, Premium은 subscription navigation과 capability boundary다. Premium ad-free는 Density Control 후보일 수 있다.

Review 판단:
Advertisement 자체를 Product Principle로 만들지 않는다. Premium Module은 public content와 경쟁할 수 있으나 actual placement impact는 Not Verified다.

Confidence:
Medium

## Personal Continuity 검토

Observation:
Watchlist, Portfolio, Saved Screener, Alerts, Chart Preference, Personalized Home, Brokerage Link가 Personal Continuity candidate로 기록됐다.

Interpretation:
Yahoo Finance의 continuity는 Login Required와 Premium Feature에 강하게 연결된다.

Review 판단:
Personal Continuity는 Principle Extraction에서 `Needs Additional Evidence`가 많다. 실제 persistence로 확정하지 않는다.

Confidence:
Medium

## Evidence 품질 판단

| 영역 | 판단 | 이유 |
| --- | --- | --- |
| Product Surface | 충분 | official Product, Help, Premium page로 Surface responsibility가 분리됐다. |
| Navigation | 제한적 충분 | public entries는 확인됐지만 Search Suggestion과 logged-in state가 제한된다. |
| Core Journey | 제한적 충분 | 12개 Scenario가 completion / partial / unavailable로 분리됐다. |
| Entity / State | 제한적 충분 | Entity와 User State를 Candidate로 유지했다. |
| Information Density | 충분 | Quote, Markets, Screeners, Premium, Advertisement pattern이 분리됐다. |
| Trust / Evidence | 제한적 충분 | provider and methodology Help가 강하지만 item-level Source는 gap이다. |
| Product Flow | 제한적 충분 | Flow status distribution이 명확하고 restricted relations are separated. |
| Personal Continuity | 제한적 | Login Required / Premium Feature가 많아 next step에서 scope limitation 필요. |
| Advertisement / Premium | 제한적 충분 | ad-free and plan boundary는 clear, actual placement impact는 Not Verified다. |

## 다음 단계 진행 가능 여부

Ready for Principle Extraction

조건:

- Candidate Principle은 Yahoo Finance에서 확인된 확정 Product Principle이 아니라 `Candidate`로만 작성한다.
- Search Suggestion, logged-in Home, Portfolio / Watchlist internals, Alerts, Recent, Mobile은 `Needs Additional Evidence`로 제한한다.
- Portal Pattern은 Yahoo Finance 고유성이 강하므로 scope limitation 또는 Benchmark-specific으로 검토한다.
- Premium-dependent Evidence는 public Evidence와 분리한다.
- Advertisement 자체를 Product Principle로 만들지 않는다.
