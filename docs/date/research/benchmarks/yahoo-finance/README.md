# 문서 목적

이 디렉터리는 Yahoo Finance Benchmark Phase 5.1~5.5 결과를 기록한다.

현재 단계의 목적은 Yahoo Finance의 Access Boundary, Product Surface, Screen Inventory, Navigation, Core Journey, Entity / State Observation, Information Density, Trust / Evidence, Product Flow Architecture, Synthesis, Evidence Hardening, Candidate Principle Extraction, Hypothesis Evidence Log, Phase Summary를 공식 Product와 Yahoo Help / Premium 자료 기준으로 정리하는 것이다.

## 범위

이번 단계에서 다루는 범위는 다음과 같다.

- Yahoo Finance Public Access에서 확인 가능한 Home, Search, Quote, Chart, News, Markets, Screeners, Watchlists, Portfolio, Premium, Help Surface
- Login Required와 Premium Feature 구분
- Surface와 Capability 분리
- AAPL Quote 기준 Quote Surface 구성
- Desktop web 기준 Product Surface와 Screen Inventory
- Navigation, Core Journey, Entity / User State 후보
- Information Density, Trust / Evidence, Product Flow Architecture
- Structural Strength, Friction, Open Question, Evidence Hardening, Principle Extraction Readiness
- Candidate Principle Extraction, Hypothesis Evidence Log, Phase Summary

이번 단계에서 다루지 않는 범위는 다음과 같다.

- DATE Product Principle 확정
- Hypothesis 수정
- Final Quality Review
- Commit / Push

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 조사 환경, 접근 범위, 공식 Source, 확인 수준을 기록한다.
- [01-product-surface-map.md](01-product-surface-map.md): Product Surface Inventory, Surface Responsibility, Entry, Capability 분리를 기록한다.
- [02-screen-inventory.md](02-screen-inventory.md): Screen 단위 Inventory를 Phase 5.1 범위에 맞춰 기록한다.
- [03-navigation-map.md](03-navigation-map.md): Global Navigation, Search, Quote, Markets, Screeners, Portfolio, Premium 관계를 기록한다.
- [04-core-journey-observations.md](04-core-journey-observations.md): 12개 Core Journey Scenario를 기록한다.
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md): Entity Candidate와 User State Candidate를 구분해 기록한다.
- [06-information-density-observations.md](06-information-density-observations.md): Yahoo Finance의 Information Density Pattern을 기록한다.
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): Source, Freshness, Methodology, Premium-dependent Trust를 기록한다.
- [08-product-flow-architecture.md](08-product-flow-architecture.md): User Decision Flow, Discovery Flow, Evidence Flow, Personal Continuity Flow를 기록한다.
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Structural Strength, Friction, Open Question을 기록한다.
- [10-evidence-hardening-review.md](10-evidence-hardening-review.md): Evidence 상태와 다음 단계 진행 가능 여부를 검토한다.
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): Candidate Principle 추출 준비 상태를 기록한다.
- [12-hypothesis-evidence-log.md](12-hypothesis-evidence-log.md): Product Hypothesis 15개에 Yahoo Finance Evidence를 연결한다.
- [13-phase-5-summary.md](13-phase-5-summary.md): Phase 5 결과와 Final Quality Review 전 상태를 요약한다.
- [14-candidate-design-principles.md](14-candidate-design-principles.md): Yahoo Finance Candidate Principle과 Registry 연결을 기록한다.
- [15-final-quality-review.md](15-final-quality-review.md): 최종 품질 검토와 Commit Readiness를 기록한다.

## 작성 규칙

- 설명은 한국어로 작성한다.
- Framework 용어는 영어로 유지한다.
- Yahoo Finance 공식 Product 명칭은 원문을 유지한다.
- Observation과 Interpretation을 분리한다.
- 확인하지 못한 기능은 `Not Verified`, `Login Required`, `Premium Feature`로 기록한다.
- 공식 Help 또는 Premium 안내를 실제 Product Interaction처럼 쓰지 않는다.
- Research 완료 전 DATE Architecture를 확정하지 않는다.

## 관련 문서

- [DATE Product Research Plan](../../DATE_PRODUCT_RESEARCH_PLAN.md)
- [Benchmark Evaluation Framework](../../04-benchmark-evaluation-framework.md)
- [Screen Research Template](../../05-screen-research-template.md)
- [Benchmark Scope and Research Scenarios](../../06-benchmark-scope-and-scenarios.md)
- [Documentation Standard](../../../../standards/DOCUMENTATION_STANDARD.md)
- [Terminology](../../../../standards/TERMINOLOGY.md)
- [Naming Convention](../../../../standards/NAMING_CONVENTION.md)
- [Writing Guideline](../../../../standards/WRITING_GUIDELINE.md)

## 주의사항

이 README는 문서 사용법과 범위를 기록한다. 새로운 Product Decision이나 Candidate Principle을 추가하지 않는다.

## 현재 단계

Phase 5 — Yahoo Finance Benchmark Complete.

Final Quality Review: Passed with Minor Corrections

Candidate Principles: 12

Registry: P-001~P-027

Hypothesis Evidence Log: 작성 완료

## 다음 단계

다음 Benchmark는 별도 지시가 있을 때 Bloomberg Terminal UX Benchmark로 진행할 수 있다.
