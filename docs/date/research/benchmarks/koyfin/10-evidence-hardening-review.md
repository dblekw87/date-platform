# Koyfin Evidence Hardening Review 기록

## 문서 목적

이 문서는 Koyfin Phase 3.1~3.3 문서의 Evidence 상태를 검토한다.

새로운 Source를 추가하지 않는다. 기존 문서의 Observation 상태, Confidence, Mermaid 관계, Documentation Only 의존도를 점검하고 Candidate Principle Extraction 진행 가능 여부를 판단한다.

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

## Evidence 상태 분포

기존 [08-product-flow-architecture.md](08-product-flow-architecture.md)의 Flow 수 요약은 유지한다.

| Status | Flow 수 |
| --- | ---: |
| Observed | 2 |
| Partial | 8 |
| Official Documentation Only | 24 |
| Inferred | 9 |
| Not Verified | 8 |

## 주요 Finding

| Finding ID | Finding | 조치 |
| --- | --- | --- |
| KYF-EH-001 | 대부분의 App 내부 Flow가 Official Documentation Only에 의존한다. | Candidate Principle Extraction 시 Scope Limitation을 요구한다. |
| KYF-EH-002 | Public Product Page와 Help Center 설명이 일부 Pattern에서 함께 사용된다. | `Partial`과 `Official Documentation Only`를 분리 유지한다. |
| KYF-EH-003 | Mermaid Diagram은 Inferred 관계를 dashed edge로 표시한다. | 관계 삭제나 변경 없이 유지한다. |
| KYF-EH-004 | Login Required 기능은 실제 수행처럼 표현되지 않았다. | 유지한다. |
| KYF-EH-005 | Paid Feature는 plan 제한과 실제 동작 확인을 구분한다. | 유지한다. |
| KYF-EH-006 | Confidence `High`는 일부 Official Documentation Only 항목에도 존재한다. | 공식 문서가 직접 책임과 동작을 설명하는 경우 유지한다. |

## 하향 조정한 항목

하향 조정한 항목은 없다.

이유:

- Phase 3.1~3.3 문서는 이미 `Official Documentation Only`, `Inference`, `Not Verified`를 분리하고 있다.
- Product Page 기반 항목은 실제 App Interaction으로 표현하지 않았다.
- Login Required 또는 Paid Feature는 별도 Access Restriction으로 표시되어 있다.

## 유지한 항목

| 항목 | 유지 이유 |
| --- | --- |
| Flow 상태 분포 | 08 문서와 충돌하지 않는다. |
| Command Bar Confidence Medium | 공식 Documentation은 명확하지만 실제 App Interaction은 Not Verified다. |
| Screener Table Confidence High | 공식 Product Page와 공식 Documentation이 모두 일관되게 설명한다. |
| Watchlist View Confidence High | 공식 Documentation이 저장 state와 reuse를 직접 설명한다. |
| Pricing Transparency Confidence High | 공식 Pricing에서 직접 확인된 public Product Observation이다. |
| Data Dictionary Confidence High | 공식 Documentation에서 Metric formula를 직접 설명한다. |

## 제거한 관계

제거한 관계는 없다.

이유:

- `Inferred` 관계는 Mermaid에서 dashed edge 또는 label로 구분되어 있다.
- 관계를 삭제할 만큼 기존 문서와 충돌하는 항목은 발견하지 않았다.

## Confidence 변경

Confidence 변경은 없다.

현재 Confidence 유지 기준은 다음과 같다.

| Confidence | 유지 기준 |
| --- | --- |
| High | 공식 Product Page, Pricing, Help Center가 Surface 또는 capability를 직접 설명한다. |
| Medium | 공식 Documentation은 있으나 App 내부 Interaction과 Context Preservation은 직접 확인하지 않았다. |
| Low | 존재 또는 동작이 일부 단서에만 의존하거나 Not Verified가 많다. |

## Documentation Only 항목

Candidate Principle Extraction에서 특히 주의해야 하는 Documentation Only 항목은 다음과 같다.

- Command Bar & Search
- App Left Sidebar
- Right Sidebar
- My Dashboards 내부 widget 구성
- My Dashboard Groups
- My Screens 내부 result row behavior
- My Watchlists와 Watchlist Views
- My Portfolios 내부 transition
- My Graphs 저장 state
- Actuals and Consensus label
- Data Dictionary formula link

## Inferred 항목

다음 항목은 Candidate Principle Extraction에서 일반화하지 않는다.

- Dashboard가 Koyfin의 중심 Workspace인지 여부
- Security에서 Company Snapshot, Financial Analysis, Graph, News로 이어지는 full Entity Flow
- Screener Result에서 Company detail로 이어지는 Row action
- Portfolio holding에서 Company Research로 이어지는 path
- Dashboard saved state가 Returning User entry로 복원되는 방식
- Macro Event에서 Security impact로 연결되는 방식

## Not Verified 항목

- App 내부 default entry
- actual click count
- Back Navigation cost
- News Detail Source, Freshness, related Entity
- App 내부 item-level Source label
- Chart series provider와 timestamp
- Recent Entity 또는 History
- Alert condition builder
- Mobile responsive Navigation

## Mermaid 관계 검토

| 문서 | 검토 결과 |
| --- | --- |
| 01-product-surface-map.md | Help Center 관계는 dotted edge로 표시되어 있다. |
| 03-navigation-map.md | App 내부 관계는 Documentation Only 또는 Login Required로 표시되어 있다. |
| 08-product-flow-architecture.md | Inferred 관계는 dashed edge로 표시되어 있고 label이 있다. |

수정이 필요한 Mermaid 관계는 발견하지 않았다.

## Evidence 품질 판단

| 영역 | 판단 | 이유 |
| --- | --- | --- |
| Product Surface | 충분 | public Product Page와 Pricing, Help Center로 Surface 책임을 분리했다. |
| Navigation | 제한적 충분 | App 내부 Navigation은 Documentation Only이나 관계 상태가 분리되어 있다. |
| Journey | 제한적 | 모든 Scenario는 부분 가능 또는 확인 불가로 남아 있다. |
| Entity / State | 제한적 충분 | Candidate로 유지하고 확정하지 않는다. |
| Information Density | 제한적 충분 | Table, Chart, Dashboard 책임은 공식 자료가 있으나 실제 visual hierarchy는 Not Verified다. |
| Trust / Evidence | 제한적 충분 | category-level Source와 Methodology는 확인했으나 item-level Traceability는 Not Verified다. |
| Product Flow | 제한적 | Flow 대부분이 Documentation Only 또는 Inferred다. |

## 다음 단계 진행 가능 여부

Ready for Principle Extraction

조건:

- Candidate Principle은 `Koyfin에서 확인된 확정 Product Principle`이 아니라 `Candidate`로만 작성한다.
- Documentation Only 기반 Pattern은 `Ready with Scope Limitation` 또는 `Needs Additional Evidence`로 작성한다.
- Registry는 Candidate Principle 작성 단계에서만 수정한다.
- News, Macro, Portfolio, Alert, Recent 관련 Pattern은 충분한 Evidence가 없으므로 Principle로 일반화하지 않는다.
