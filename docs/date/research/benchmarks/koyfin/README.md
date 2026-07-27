# 문서 목적

이 디렉터리는 Koyfin Benchmark Research 결과를 기록한다.

현재 포함 범위는 Phase 3.1 Product Surface Mapping, Phase 3.2 Navigation / Journey / Entity / State Observation, Phase 3.3 Information Density / Trust and Evidence / Product Flow Architecture, Phase 3.4 Synthesis and Evidence Hardening, Phase 3.5 Candidate Principle Extraction / Hypothesis Evidence Log / Summary, Phase 3.6 Final Quality Review다. DATE 구조 제안은 범위가 아니다.

## 범위

이번 단계에서 다루는 범위는 다음과 같다.

- Koyfin 공식 Product 페이지와 공식 Help Center에서 확인 가능한 Product Surface
- 각 Surface의 User Goal, Primary Entity, Supporting Entities, Access Level, Observation Status
- Marketing Landing, Authentication Entry, Dashboard, Market Dashboard, Macro Dashboard, Company Research, Screener, Chart, Watchlist, Portfolio, News, Calendar, Mobile App, Pricing 관련 Surface
- 공개 접근, Login Required, Paid Feature, Not Verified 범위 구분
- Public Navigation, App Left Sidebar, Right Sidebar, Command Bar & Search, Dashboard Navigation 책임
- 12개 공통 Research Scenario의 Koyfin 수행 가능 여부
- Product Entity, User-owned Entity, User State, Capability, Surface, Tool, Contextual Panel 구분

이번 단계에서 다루지 않는 범위는 다음과 같다.

- DATE Information Architecture, Entity Architecture, Navigation Architecture 제안

## 문서 구성

| 문서 | 역할 |
| --- | --- |
| [00-access-and-method.md](00-access-and-method.md) | 접근 환경, 공식 Evidence 범위, 접근 제한, Confidence 기준 |
| [01-product-surface-map.md](01-product-surface-map.md) | Koyfin Product Surface 목록과 Surface별 책임 |
| [02-screen-inventory.md](02-screen-inventory.md) | Screen 단위 Inventory와 Access Level 기록 |
| [03-navigation-map.md](03-navigation-map.md) | Navigation Entry와 관계 상태 기록 |
| [04-core-journey-observations.md](04-core-journey-observations.md) | 12개 공통 Research Scenario 수행 가능성 기록 |
| [05-entity-and-state-observations.md](05-entity-and-state-observations.md) | Entity Candidate와 User State Candidate 구분 |
| [06-information-density-observations.md](06-information-density-observations.md) | Dashboard, Table, Chart, Sidebar, Widget의 Information Density 책임 |
| [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md) | Source, Freshness, Financial Evidence, Methodology, Pricing transparency 기록 |
| [08-product-flow-architecture.md](08-product-flow-architecture.md) | User Decision Flow, Navigation Flow, Entity Flow, Evidence Flow, State Transition 기록 |
| [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md) | Structural Strength, User Friction, Context Loss, Open Question 정리 |
| [10-evidence-hardening-review.md](10-evidence-hardening-review.md) | Evidence 상태, Documentation Only 의존, Mermaid 관계, 진행 가능 여부 검토 |
| [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md) | Candidate Principle 추출 전 Pattern Readiness 분류 |
| [12-hypothesis-evidence-log.md](12-hypothesis-evidence-log.md) | Koyfin Evidence와 Phase 0 Product Hypothesis 연결 |
| [13-phase-3-summary.md](13-phase-3-summary.md) | Koyfin Phase 3 범위, Pattern, Hypothesis 영향, Quality Review 전 상태 요약 |
| [14-candidate-design-principles.md](14-candidate-design-principles.md) | Koyfin Candidate Principle 추출과 Cross Benchmark 분류 |
| [15-phase-3-quality-review.md](15-phase-3-quality-review.md) | Koyfin Package 최종 정합성, Evidence 수준, Registry, Commit 준비 판단 검토 |

## 작성 규칙

일반 설명은 한국어로 작성한다.

Framework 용어는 영어를 유지한다. Observation, Interpretation, Evidence, Confidence, Product Surface, Entity, Navigation, Dashboard, Workspace, Screen, Flow, Trade-off, Implication은 번역하지 않는다.

Koyfin 공식 Product 명칭은 원문을 우선한다. 공식 화면 또는 공식 Documentation에서 확인하지 못한 항목은 `Not Verified`, `Official Documentation Only`, `Inference`로 낮춘다.

## 관련 문서

- [DATE Product Research Plan](../../DATE_PRODUCT_RESEARCH_PLAN.md)
- [Benchmark Evaluation Framework](../../04-benchmark-evaluation-framework.md)
- [Screen Research Template](../../05-screen-research-template.md)
- [Benchmark Scope and Research Scenarios](../../06-benchmark-scope-and-scenarios.md)
- [Documentation Standard](../../../../standards/DOCUMENTATION_STANDARD.md)
- [Terminology](../../../../standards/TERMINOLOGY.md)

## 주의사항

이번 문서는 Surface Mapping 자료다. Koyfin의 Product Surface를 DATE가 채택한다는 의미가 아니다.

로그인 후 실제 App 내부 화면은 직접 조작하지 않았다. Help Center에서 확인한 내부 Product 설명은 `Official Documentation Only` 또는 `Partially Observed`로 표시한다.

## 현재 진행 상태

Phase 3.1은 Product Surface Mapping을 완료한 상태로 기록한다.

Phase 3.2는 Navigation, Journey, Entity / State Observation을 완료한 상태로 기록한다.

Phase 3.3은 Information Density, Trust and Evidence, Product Flow Architecture를 완료한 상태로 기록한다.

Phase 3.4는 Strength / Friction Synthesis와 Evidence Hardening을 완료한 상태로 기록한다.

Phase 3.5는 Candidate Principle 12개를 기록했고, Candidate Principle Registry를 업데이트했으며, Product Hypothesis Evidence Log를 작성한 상태로 기록한다.

Phase 3.6은 Final Quality Review를 완료했고 `Ready for Commit`으로 판단한 상태로 기록한다.

다음 단계에서는 별도 지시가 있을 때 Koyfin Benchmark Package Commit을 진행할 수 있다.

## 남아 있는 제한사항

- Koyfin App 내부 Interaction은 직접 조작하지 않았다.
- Candidate Principle 중 Documentation Only 기반 항목은 Scope Limitation을 유지해야 한다.
- Registry의 모든 `Cross Validation Status`는 `Pending`이다.
- DATE Product Principle은 확정하지 않았다.

## Commit 준비 판단

Ready for Commit
