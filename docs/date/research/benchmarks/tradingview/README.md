# 문서 목적

이 README는 TradingView Phase 2 Research 문서 묶음의 범위와 사용법을 설명한다. 목적은 TradingView 기능을 나열하거나 DATE 구조를 확정하는 것이 아니라, EidosLayer와 동일한 Research Framework로 비교 가능한 Benchmark Evidence를 관리하는 것이다.

## 범위

이 문서 묶음은 TradingView의 공개 접근 가능한 Product Surface, Navigation, Screen, User Journey, Entity Candidate, Information Density, Trust/Evidence Pattern, Product Flow Architecture, Candidate Principle, Quality Review를 포함한다.

Access date는 2026-07-27이다. Access mode는 public, not logged in이다. 공식 Product 화면을 우선 Evidence로 사용했고, 로그인 또는 interaction이 필요한 Watchlist, Alert, Layout, Screener 상세는 공식 Help Center 문서로 보완했다.

Quality Review 상태는 `Ready for Commit`이다. 이 판단은 문서 품질 기준이며 DATE Product Principle 확정이 아니다.

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 접근 환경, 방법, 제한사항
- [01-product-surface-map.md](01-product-surface-map.md): 공개 Product Surface Map
- [02-navigation-map.md](02-navigation-map.md): Navigation, Search, Entity Transition Observation
- [03-screen-inventory.md](03-screen-inventory.md): Screen 유형별 Inventory
- [04-core-journey-observations.md](04-core-journey-observations.md): 12개 공통 Research Scenario 수행 기록
- [05-entity-and-relationship-observations.md](05-entity-and-relationship-observations.md): Entity Candidate와 관계 Observation
- [06-information-density-observations.md](06-information-density-observations.md): Card, List, Table, Panel, Information Density Observation
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): Source, Freshness, Documents, News, Evidence Observation
- [08-strengths-frictions-and-open-questions.md](08-strengths-frictions-and-open-questions.md): Strength, Friction, Open Question 기록
- [09-phase-2-summary.md](09-phase-2-summary.md): Phase 2 요약
- [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md): 기존 DATE Hypothesis에 대한 Evidence Log
- [11-product-flow-architecture.md](11-product-flow-architecture.md): TradingView Product Flow Architecture 정리
- [12-candidate-design-principles.md](12-candidate-design-principles.md): TradingView Observation 기반 Candidate Principle Cross Validation
- [13-phase-2-quality-review.md](13-phase-2-quality-review.md): Phase 2 TradingView Quality Review 기록

## 단계 Phase 2 역할

- Surface 문서: TradingView의 공개 Product Surface와 접근 제한을 EidosLayer와 같은 기준으로 기록한다.
- Flow 문서: User Decision Flow, Navigation Flow, Entity Flow, Information Flow, Evidence Flow, Action Flow, State Transition, Context Preservation Flow를 구분한다.
- Principle 문서: TradingView Observation에서 나온 Candidate Principle과 기존 EidosLayer Principle의 Cross Validation 상태를 기록한다.
- Review 문서: Observation 품질, Registry 분류, Pattern 비교 상태, Commit 준비 여부를 검토한다.

## 작성 규칙

- 설명 문장은 한국어로 작성한다.
- Framework 용어는 영어로 유지한다.
- Observation과 Interpretation을 분리한다.
- Product Flow는 `Observed Flow`, `Partial Flow`, `Inferred Flow`, `Not Verified Flow`로 구분한다.
- Candidate Principle은 DATE의 Product Principle로 확정하지 않는다.
- EidosLayer와 동일한 12개 Scenario 구조를 사용한다.

## 관련 문서

- [DATE_PRODUCT_RESEARCH_PLAN.md](../../DATE_PRODUCT_RESEARCH_PLAN.md)
- [05-screen-research-template.md](../../05-screen-research-template.md)
- [06-benchmark-scope-and-scenarios.md](../../06-benchmark-scope-and-scenarios.md)
- [eidoslayer/README.md](../eidoslayer/README.md)
- [candidate-principle-registry.md](../../principles/candidate-principle-registry.md)
- [DOCUMENTATION_STANDARD.md](../../../../standards/DOCUMENTATION_STANDARD.md)
- [TERMINOLOGY.md](../../../../standards/TERMINOLOGY.md)

## 주의사항

이 README는 TradingView Research 문서의 범위와 사용법만 설명한다. 새로운 DATE Architecture Decision을 추가하지 않는다.

남아 있는 미확인 영역은 로그인 후 saved layout persistence, 실제 alert dialog 조작, Watchlist advanced view 직접 조작, chart panel pixel layout, mobile interaction, paid data tier 차이다.

Registry는 [candidate-principle-registry.md](../../principles/candidate-principle-registry.md)를 사용한다. TradingView 전용 Registry를 새로 만들지 않는다.
