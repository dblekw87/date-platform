# SaveTicker Benchmark

## 조사 목적

이 디렉터리는 SaveTicker를 News Intelligence Product Benchmark로 조사한 결과를 기록한다.

SaveTicker는 단순 News Publisher로 확정하지 않는다. Phase 7.1에서는 News Feed, News Detail, Reports, Community, Calendar, Login / Profile, Alert / Notification 후보를 기준으로 SaveTicker가 Aggregation, Curation, Intelligence, Community, Monitoring, Calendar, Research 역할을 어떻게 분리하는지 확인한다.

## SaveTicker Benchmark가 필요한 이유

DATE는 투자 Evidence 연결 플랫폼이다. SaveTicker는 News, Ticker, Company, Calendar, Community, Alert 후보를 한 Product 안에 배치하므로 News Consumption이 투자 판단 Workflow로 확장될 수 있는지 비교하기에 적합하다.

이번 Benchmark의 핵심 질문은 다음이다.

- News가 어떤 Surface에서 선별되고 노출되는가.
- SaveTicker 내부 Summary / Curation과 Original Source가 어떻게 구분되는가.
- News, Report, Calendar, Community가 같은 Entity Context로 이어질 수 있는가.
- Alert / Notification, Follow, Bookmark 후보가 Personal Continuity를 만들 수 있는가.
- Publisher, Aggregator, Community, Alert 역할이 Product Boundary 안에서 분리되는가.

## News Intelligence Benchmark 정의

이 Benchmark에서 News Intelligence Product는 외부 News를 단순 표시하는 Product가 아니라, News를 Ticker / Company / Calendar / Report / Community / Notification 후보와 연결해 투자 판단에 가까운 Context를 제공하는 Product 후보로 정의한다.

Phase 7.1에서는 이 정의를 확정하지 않는다. 확인 가능한 Product Surface와 Screen Inventory만 기록한다.

## Core Scope

- News Feed
- News Detail
- Save Pick / Editorial Pick 후보
- Ticker / Company Linking 후보
- Search
- Reports
- Calendar
- Community
- Alert / Notification
- Watch / Follow / Bookmark 후보
- Login / Register
- Profile / Personalization 후보
- External Article / Original Source

## Supporting Scope

- Mobile App
- Push Notification
- Official App Description
- Official App Store / Google Play 설명
- Terms / Privacy / Policy
- Subscription / Pricing 후보
- Email / Newsletter 후보

## Excluded Scope

- Brokerage
- Actual Trading
- Paid Research Provider 상세
- Third-party News Provider 전체 비교
- News Licensing
- API
- Data Feed
- Creator Economy
- Advertising Sales
- Corporate Partnership

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 조사 환경, Access Boundary, Evidence Type, Observation Status 기준을 기록한다.
- [01-product-boundary.md](01-product-boundary.md): SaveTicker Product Role 후보, Scope, Responsibility, Access Boundary를 기록한다.
- [02-product-surface-map.md](02-product-surface-map.md): News, Report, Calendar, Community, Personal, Alert, App Surface 후보를 기록한다.
- [03-screen-inventory.md](03-screen-inventory.md): Phase 7.1 범위의 Screen Inventory를 기록한다.
- [04-navigation-map.md](04-navigation-map.md): Phase 7.2 범위의 Public / Context / Personal Navigation 후보를 기록한다.
- [05-core-journey-observations.md](05-core-journey-observations.md): Phase 7.2 범위의 News Consumption Journey와 관련 Journey 후보를 기록한다.
- [06-entity-and-state-observations.md](06-entity-and-state-observations.md): Phase 7.2 범위의 Entity Candidate와 User State Candidate를 기록한다.
- [07-information-density-observations.md](07-information-density-observations.md): Phase 7.3 범위의 Information Density Pattern을 기록한다.
- [08-trust-and-evidence-observations.md](08-trust-and-evidence-observations.md): Phase 7.3 범위의 Trust / Evidence Pattern을 기록한다.
- [09-product-flow-architecture.md](09-product-flow-architecture.md): Phase 7.3 범위의 Product Flow Architecture 후보를 기록한다.
- [10-strengths-frictions-and-open-questions.md](10-strengths-frictions-and-open-questions.md): Phase 7.4 범위의 Structural Strength, User Friction, Product Role Trade-off를 기록한다.
- [11-evidence-hardening-review.md](11-evidence-hardening-review.md): Phase 7.4 범위의 Evidence 상태와 다음 단계 진행 가능 여부를 점검한다.
- [12-principle-extraction-readiness.md](12-principle-extraction-readiness.md): Phase 7.4 범위의 Pattern Candidate별 Principle Extraction Readiness를 기록한다.
- [13-product-hypothesis-evidence-log.md](13-product-hypothesis-evidence-log.md): Phase 7.5 범위의 Product Hypothesis Evidence 연결을 기록한다.
- [14-phase-7-summary.md](14-phase-7-summary.md): Phase 7 전체 Summary와 Final Quality Review 결과를 기록한다.
- [15-candidate-principles.md](15-candidate-principles.md): Phase 7.5 범위의 Candidate Principle Extraction 결과와 Registry Update Summary를 기록한다.
- [16-final-quality-review.md](16-final-quality-review.md): Phase 7.6 범위의 최종 품질 검수와 Commit Readiness를 기록한다.

## 작성 규칙

- 설명은 한국어로 작성한다.
- Framework 용어는 English로 유지한다.
- SaveTicker 공식 Product 명칭은 원문을 유지한다.
- Observation, Interpretation, Evidence, Confidence를 분리한다.
- Public Product Observation, Official Documentation, Official Policy, Official App Description을 구분한다.
- Login Required와 Subscription Required를 구분한다.
- 확인하지 못한 기능은 `Not Verified`로 기록한다.
- News Ranking Algorithm은 추론하지 않는다.
- DATE 방향을 확정하지 않는다.

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

## Access Limitation

- Login: Not Logged In
- Subscription: Not Verified
- Mobile App: Official App Description Only
- Push Notification: Official App Description Only
- Community Participation: Read-only Public Observation
- Article Detail: Partially Observed
- Search: Public Search Field Observed, result grouping Not Verified

## 현재 Phase

Phase 7 — SaveTicker Benchmark Complete.

Candidate Principle 수: 7개.

신규 Candidate Principle: P-030.

Registry 상태: P-001 ~ P-030. SaveTicker Evidence 반영 완료.

Hypothesis Evidence Log 상태: 작성 완료.

Product Hypothesis Evidence: 15개.

SaveTicker Positioning: News Intelligence Product Candidate.

Final Quality Review: Passed with Minor Corrections.

Commit Readiness: Ready to Commit.

## 다음 단계

다음 권장 단계는 Cross Benchmark Synthesis다. 이 문서에서는 Cross Benchmark Synthesis를 시작하지 않는다.
