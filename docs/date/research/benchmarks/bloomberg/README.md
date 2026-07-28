# 문서 목적

이 디렉터리는 Bloomberg Benchmark Phase 6.1~6.5 결과를 기록한다.

Bloomberg는 Bloomberg Terminal, Bloomberg Professional Services, Bloomberg.com, Bloomberg Markets, Bloomberg News, Bloomberg Anywhere, Enterprise Data, Media Product, Separate Domain Product가 함께 존재한다. 이번 Benchmark는 이 Product군을 하나의 Product처럼 합치지 않고, DATE Research에서 비교 가능한 Product Boundary와 Access Boundary를 먼저 구분한다.

## 범위

이번 단계의 Core Scope는 다음이다.

- Bloomberg Terminal / Bloomberg Professional Services의 공개 공식 Product Description, 공식 Documentation, 공식 Sales 자료 기준 Surface와 Function Category 후보
- Bloomberg Anywhere와 Bloomberg Professional App의 접근 책임
- Bloomberg.com Public Web, Bloomberg Markets, Bloomberg News, Article, Search, Subscription Surface 후보
- Terminal과 Public Web의 책임 구분
- Product Surface와 Capability 분리
- Screen / Function Inventory 작성

Supporting Scope는 다음이다.

- Bloomberg Intelligence
- BloombergNEF
- Bloomberg Data License
- B-PIPE / Bloomberg API / Server API
- Bloomberg Television
- Bloomberg Radio

Excluded or Separate Domain은 다음이다.

- Bloomberg Law
- Bloomberg Tax
- Bloomberg Government
- Bloomberg Philanthropies
- Bloomberg Media Advertising
- Bloomberg Events

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 조사 환경, Terminal 접근 제한, Evidence Type, Observation Status 기준을 기록한다.
- [01-product-boundary.md](01-product-boundary.md): Bloomberg Product Family, Core / Supporting / Separate Scope, Access Boundary를 기록한다.
- [02-product-surface-map.md](02-product-surface-map.md): Public Web, Terminal, Bloomberg Anywhere, Data / Integration, Subscription Surface 후보를 기록한다.
- [03-screen-and-function-inventory.md](03-screen-and-function-inventory.md): Public Page와 Terminal Function Category 후보를 Screen / Function Inventory로 기록한다.
- [04-navigation-map.md](04-navigation-map.md): Public Navigation, Terminal Navigation, Workspace Navigation, Search, Security Entry, News, Subscription Navigation을 기록한다.
- [05-core-journey-observations.md](05-core-journey-observations.md): Public Journey, Professional Workflow, Terminal Journey 후보를 기록한다.
- [06-entity-and-state-observations.md](06-entity-and-state-observations.md): Entity Candidate, User State Candidate, Surface / Workspace / Function / Capability 책임을 구분한다.
- [07-information-density-observations.md](07-information-density-observations.md): Public Web과 Terminal / Professional Workflow의 Information Density 후보를 분리해 기록한다.
- [08-trust-and-evidence-observations.md](08-trust-and-evidence-observations.md): Source, Provider, Freshness, Methodology, Entitlement 후보를 기록한다.
- [09-product-flow-architecture.md](09-product-flow-architecture.md): Public Flow, Professional Workflow, Workspace Flow, Collaboration Flow, Anywhere Flow, Data Flow 후보를 기록한다.
- [10-strengths-frictions-and-open-questions.md](10-strengths-frictions-and-open-questions.md): Structural Strength, User Friction, Access / Entitlement Friction, Context Loss, Open Question을 기록한다.
- [11-evidence-hardening-review.md](11-evidence-hardening-review.md): Evidence 상태, Terminal 제한, Workspace / Collaboration / Data Flow 제한을 점검한다.
- [12-principle-extraction-readiness.md](12-principle-extraction-readiness.md): Pattern Candidate의 Principle Extraction Readiness를 분류한다.
- [13-hypothesis-evidence-log.md](13-hypothesis-evidence-log.md): Bloomberg Evidence를 Product Hypothesis 15개에 연결한다.
- [14-phase-6-summary.md](14-phase-6-summary.md): Phase 6 조사 범위, 주요 결과, Candidate Principle, Open Question을 요약한다.
- [15-candidate-design-principles.md](15-candidate-design-principles.md): Bloomberg Candidate Principle과 Registry 연결 결과를 기록한다.
- [16-final-quality-review.md](16-final-quality-review.md): Bloomberg Benchmark 최종 품질 검수와 Commit Readiness를 기록한다.

## 작성 규칙

- 설명은 한국어로 작성한다.
- Framework 용어는 English로 유지한다.
- Bloomberg 공식 Product, Function, 화면 명칭은 원문을 유지한다.
- Observation과 Interpretation을 분리한다.
- Public Product Observation, Official Documentation, Official Demonstration을 구분한다.
- Bloomberg Terminal 직접 접근이 없는 항목은 실제 Interaction Observation처럼 작성하지 않는다.
- Function Code는 공식 Source로 확인한 경우에만 기록한다.
- Research 완료 전 DATE Architecture를 확정하지 않는다.

## 관련 문서

- [DATE Product Research Plan](../../DATE_PRODUCT_RESEARCH_PLAN.md)
- [Benchmark Evaluation Framework](../../04-benchmark-evaluation-framework.md)
- [Screen Research Template](../../05-screen-research-template.md)
- [Benchmark Scope and Research Scenarios](../../06-benchmark-scope-and-scenarios.md)
- [Candidate Principle Registry](../../principles/candidate-principle-registry.md)
- [Documentation Standard](../../../../standards/DOCUMENTATION_STANDARD.md)
- [Terminology](../../../../standards/TERMINOLOGY.md)
- [Naming Convention](../../../../standards/NAMING_CONVENTION.md)
- [Writing Guideline](../../../../standards/WRITING_GUIDELINE.md)

## 주의사항

이 README는 문서 사용법과 범위를 기록한다. 새로운 Product Decision이나 Candidate Principle을 추가하지 않는다.

## 현재 단계

Phase 6 — Bloomberg Benchmark Complete.

Final Quality Review: Passed with Minor Corrections.

Commit Readiness: Ready to Commit.

Candidate Principles:

- Existing Principle Evidence Added: 10
- New Candidate Principle: 2
- New ID Range: `P-028 ~ P-029`
- Registry Range: `P-001 ~ P-029`
- Registry: Bloomberg Evidence 반영 완료

Hypothesis Evidence Log:

- Product Hypothesis Evidence: 15
- Product Hypothesis Register 원본은 수정하지 않는다.

Bloomberg Terminal:

- Institutional Access Required
- No Direct Terminal Session
- Official Documentation and Official Product Description Only

## 다음 단계

다음 단계는 별도 지시가 있을 때 SaveTicker Benchmark 또는 Cross Benchmark Synthesis로 진행한다.
