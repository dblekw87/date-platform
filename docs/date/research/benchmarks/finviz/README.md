# 문서 목적

이 디렉터리는 Finviz Benchmark의 Phase 4.1부터 Phase 4.6까지의 결과를 기록한다.

이번 문서 묶음은 Finviz가 공개적으로 제공하는 Product Surface, Navigation, Core Journey, Entity / State 후보, Information Density, Trust / Evidence, Product Flow, Strength / Friction, Evidence Hardening, Principle Extraction Readiness, Candidate Principle Extraction, Hypothesis Evidence Log, Phase Summary, Final Quality Review, 접근 제한, 공식 Evidence 범위를 정리하기 위한 자료다. Finviz의 시각적 세련됨이나 오래된 UI 여부를 평가하지 않는다.

## 범위

이번 단계에서 다루는 범위는 다음과 같다.

- Finviz 공식 Product 화면과 공식 Help / Blog / Elite 안내에서 확인 가능한 Product Surface
- Home, Global Navigation, Screener, Maps, Groups, Stock Quote, News, Portfolio, Insider, Futures, Forex, Crypto, Backtests, Elite / Pricing, Authentication, Search의 접근 수준
- Public, Login Required, Elite Feature, Not Verified 구분
- Table, Heatmap, Chart, News List, Dense Summary, Form, Dashboard, Detail Page의 Surface별 책임
- Product Surface와 Capability의 구분
- Global Navigation, Screener Navigation, Maps / Heatmap Navigation, Groups Navigation, Stock Quote Local Navigation
- 12개 공통 Research Scenario의 수행 가능 범위
- Product Entity, User-owned Entity, User State, Surface, Tool, Capability, Contextual Content, External Evidence 구분
- Information Density, Density Control, Density Risk, Scan Pattern, Comparison Pattern, Drill-down Pattern
- Source, Timestamp, Freshness, External Evidence, Screener Metric Methodology, Heatmap Methodology
- User Decision Flow, Discovery Flow, Entity Flow, Information Flow, Evidence Flow, Action Flow, State Transition, Context Preservation Flow
- Structural Strength, User Friction, Context Loss, Advertisement Assessment
- Evidence Hardening과 Principle Extraction Readiness

이번 단계에서 다루지 않는 범위는 다음과 같다.

- DATE Product Principle 확정
- DATE Architecture, Navigation, Information Architecture, Entity Architecture 제안
- Final Quality Review
- SaveTicker 분석
- 새로운 웹 조사
- Product Hypothesis Register 원본 수정
- Commit / Push

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 조사 환경, 접근 범위, 공식 Source, 확인 수준, 조사 한계를 기록한다.
- [01-product-surface-map.md](01-product-surface-map.md): Finviz Product Surface별 책임, Access Level, Observation Status, Evidence를 기록한다.
- [02-screen-inventory.md](02-screen-inventory.md): Screen 단위 Inventory를 `Screen Research Template` 기준으로 기록한다.
- [03-navigation-map.md](03-navigation-map.md): Finviz Navigation Entry, Entity Transition, Context Preservation, Access Restriction을 기록한다.
- [04-core-journey-observations.md](04-core-journey-observations.md): 12개 공통 Research Scenario의 수행 가능 범위와 제한을 기록한다.
- [05-entity-and-state-observations.md](05-entity-and-state-observations.md): Entity Candidate와 User State Candidate를 분리해 기록한다.
- [06-information-density-observations.md](06-information-density-observations.md): Finviz의 high-density Surface, Pattern, Risk, Advertisement impact를 기록한다.
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): Source, Timestamp, Freshness, External Evidence, Methodology, Public / Elite data 차이를 기록한다.
- [08-product-flow-architecture.md](08-product-flow-architecture.md): Finviz Product Flow, Entity Flow, Evidence Flow, Context Preservation Flow를 기록한다.
- [09-strengths-frictions-and-open-questions.md](09-strengths-frictions-and-open-questions.md): Structural Strength, User Friction, Context Loss, Cross Benchmark 준비 분류를 기록한다.
- [10-evidence-hardening-review.md](10-evidence-hardening-review.md): Evidence 상태, Mermaid 관계, Confidence, Login / Elite 제한을 검토한다.
- [11-principle-extraction-readiness.md](11-principle-extraction-readiness.md): Pattern Candidate를 Principle Extraction Readiness별로 분류한다.
- [12-hypothesis-evidence-log.md](12-hypothesis-evidence-log.md): Product Hypothesis H-001~H-015에 Finviz Evidence를 연결한다.
- [13-phase-4-summary.md](13-phase-4-summary.md): Finviz Phase 4 전체 결과와 Final Quality Review 상태를 요약한다.
- [14-candidate-design-principles.md](14-candidate-design-principles.md): Finviz Candidate Principle과 Cross Benchmark 분류를 기록한다.
- [15-final-quality-review.md](15-final-quality-review.md): Finviz Phase 4 전체 문서와 Registry 반영 상태를 최종 검수한다.

## 작성 규칙

- 설명은 한국어로 작성한다.
- Framework 용어는 영어로 유지한다.
- Finviz 공식 Product 명칭은 원문을 유지한다.
- Observation과 Interpretation을 분리한다.
- 확인하지 못한 기능은 `Not Verified`로 기록한다.
- Finviz Elite 기능과 Public 기능을 구분한다.
- Research 완료 전 DATE Architecture를 확정하지 않는다.

## 관련 문서

- [DATE Product Research Plan](../../DATE_PRODUCT_RESEARCH_PLAN.md)
- [Research Brief](../../00-research-brief.md)
- [Benchmark Evaluation Framework](../../04-benchmark-evaluation-framework.md)
- [Screen Research Template](../../05-screen-research-template.md)
- [Benchmark Scope and Research Scenarios](../../06-benchmark-scope-and-scenarios.md)
- [Candidate Principle Registry](../../principles/candidate-principle-registry.md)
- [Documentation Standard](../../../../standards/DOCUMENTATION_STANDARD.md)
- [Terminology](../../../../standards/TERMINOLOGY.md)
- [Naming Convention](../../../../standards/NAMING_CONVENTION.md)
- [Writing Guideline](../../../../standards/WRITING_GUIDELINE.md)

## 주의사항

이 README는 문서 사용법과 범위를 설명한다. 새로운 Product Decision을 추가하지 않는다.

로그인 후 Portfolio, saved Screener, alert, layout customization은 직접 조작하지 않았다. 공식 안내에서 확인한 기능은 `Login Required`, `Elite Feature`, `Official Documentation Only`로 구분한다.

## 현재 진행 상태

Phase 4.1 Finviz Product Surface Mapping 문서 생성 상태다.

Phase 4.2 Finviz Navigation, Core Journey, Entity / State Observation 문서 생성 상태다.

Phase 4.3 Finviz Information Density, Trust / Evidence, Product Flow Architecture 문서 생성 상태다.

Phase 4.4 Finviz Synthesis and Evidence Hardening 문서 생성 상태다.

Phase 4.5 Finviz Candidate Principle Extraction, Hypothesis Evidence Log and Summary 문서 생성 상태다.

Phase 4.6 Finviz Final Quality Review and Commit Readiness 문서 생성 상태다.

Phase 4 — Finviz Benchmark Complete.

Final Quality Review: Passed with Minor Corrections.

Finviz Candidate Principle은 14개를 기록했다. 이 중 기존 Registry Principle 연결은 10개, 신규 Candidate Principle은 P-022~P-025 4개다.

Candidate Principle Registry는 Finviz Evidence 연결과 신규 Candidate Principle 추가를 위해 수정했다. Registry 범위는 P-001 ~ P-025다. Product Hypothesis Register 원본은 수정하지 않았다.

Hypothesis Evidence Log는 H-001 ~ H-015 전체를 포함한다.

남아 있는 제한사항은 Portfolio, Saved Screener, Alert Rule, Mobile, Recent / History, Maps dynamic interaction, Groups drill-down, Calendar detail, Asset Class detail, External Source Return Path다.

## 다음 단계

다음 Benchmark는 별도 지시가 있을 때 진행한다.

Final Quality Review 통과 후 Phase 4 산출물은 commit할 수 있다. Push는 수행하지 않는다.
