# Cross Benchmark Evidence Matrix

## 목적

이 디렉터리는 Phase 8.1 범위에서 EidosLayer, TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg, SaveTicker Benchmark를 Pattern 중심으로 다시 분류한다.

이번 단계는 서비스 분석을 DATE Product Rule 후보로 연결하기 전의 비교 준비 단계다. DATE Product Principle, DATE Information Architecture, DATE Navigation, DATE UX는 작성하지 않는다.

## Pattern 중심 접근

Pattern Inventory는 Benchmark 이름이나 Feature 이름이 아니라 여러 Product에서 반복되는 Product 구조 단위로 작성한다.

예:

- `TradingView Symbol Page`가 아니라 `Entity Hub with Local Analysis Modes`
- `SaveTicker AI Summary`가 아니라 `Evidence-preserving Interpretation Layer`
- `Bloomberg Terminal Function`이 아니라 `Command / Function Entry`

## Benchmark 범위

| Benchmark | Phase | Status |
| --- | --- | --- |
| EidosLayer | Phase 1 | Complete |
| TradingView | Phase 2 | Complete |
| Koyfin | Phase 3 | Complete |
| Finviz | Phase 4 | Complete |
| Yahoo Finance | Phase 5 | Complete |
| Bloomberg | Phase 6 | Complete |
| SaveTicker | Phase 7 | Complete |

## Pattern Inventory 정의

각 Pattern은 다음 기준으로 기록한다.

- Pattern Name
- Description
- Purpose
- User Problem
- User Benefit
- Supporting Benchmarks
- Variant Benchmarks
- Insufficient Benchmarks
- Potential Contradiction
- Related Principles
- Evidence Quality
- Generalizability
- Cross Validation Status
- Open Questions

## Layer 정의

| Layer | Definition |
| --- | --- |
| Entry | 사용자가 Product에 처음 진입해 방향을 잡는 구조 |
| Discovery | 비교 대상이나 분석 대상을 찾는 구조 |
| Entity | Stock, Symbol, Company, News, Event 같은 중심 Object를 유지하는 구조 |
| Evidence | Source, Freshness, Methodology, Original Article, Document를 다루는 구조 |
| Workflow | 분석 task 사이 전환과 실행 비용을 다루는 구조 |
| Monitoring | Watch, Alert, Notification, live state를 통한 지속 Observation 구조 |
| Personal Continuity | saved state, Watchlist, Portfolio, Workspace, revisit를 다루는 구조 |
| Workspace | 여러 Surface, Panel, Widget, Chart, Dashboard를 조합하는 구조 |
| Community | Discussion, Reaction, Idea, participation을 다루는 구조 |
| Research | Report, Document, Provider-labeled Research를 다루는 구조 |
| Calendar | Economic Calendar, Event date, timeline-based discovery 구조 |
| Notification | Alert delivery, Push, in-app notification 구조 |
| Settings | user preference, saved state setting, plan boundary 설정 구조 |
| Policy | privacy, pricing, methodology, entitlement 설명 구조 |
| Infrastructure | Data access boundary, Data License, Product Family, Enterprise entitlement 구조 |

## 문서 구성

- [01-pattern-inventory.md](01-pattern-inventory.md): Pattern 중심 Inventory.
- [02-cross-benchmark-matrix.md](02-cross-benchmark-matrix.md): Benchmark별 Pattern coverage.
- [03-layer-classification.md](03-layer-classification.md): Product Layer별 Pattern mapping.
- [04-pattern-relationship-map.md](04-pattern-relationship-map.md): Pattern dependency와 Mermaid 관계도.
- [05-evidence-quality-matrix.md](05-evidence-quality-matrix.md): Evidence Quality와 gap.
- [06-generalizability-matrix.md](06-generalizability-matrix.md): Generalizability 분류.
- [07-open-question-matrix.md](07-open-question-matrix.md): Pattern별 Open Question.
- [08-shared-pattern-synthesis.md](08-shared-pattern-synthesis.md): Shared Pattern 중심 synthesis.
- [09-variant-pattern-synthesis.md](09-variant-pattern-synthesis.md): Variant Pattern 중심 Product Strategy synthesis.
- [10-benchmark-specific-pattern-analysis.md](10-benchmark-specific-pattern-analysis.md): Benchmark-specific Pattern exclusion and future validation analysis.
- [11-insufficient-pattern-analysis.md](11-insufficient-pattern-analysis.md): Insufficient Pattern Evidence gap and validation analysis.
- [12-pattern-readiness-review.md](12-pattern-readiness-review.md): Pattern 전체 readiness와 final status review.
- [13-pattern-conflict-matrix.md](13-pattern-conflict-matrix.md): Pattern conflict, duplication, nested relationship review.
- [14-pattern-status-summary.md](14-pattern-status-summary.md): Pattern final status summary.
- [15-architecture-domain-definition.md](15-architecture-domain-definition.md): Pattern을 Architecture Domain 후보로 통합.
- [16-pattern-consolidation.md](16-pattern-consolidation.md): Macro Pattern, Supporting Pattern, Derived Pattern consolidation.
- [17-domain-dependency-map.md](17-domain-dependency-map.md): Architecture Domain dependency와 Layer mapping.
- [18-domain-boundary-definition.md](18-domain-boundary-definition.md): Architecture Domain boundary와 ownership limitation.
- [19-date-product-architecture-specification.md](19-date-product-architecture-specification.md): DATE Product Architecture Specification.
- [20-domain-responsibility-specification.md](20-domain-responsibility-specification.md): Domain ownership and responsibility contract.
- [21-domain-interaction-contract.md](21-domain-interaction-contract.md): Domain interaction contract.
- [22-domain-state-boundary.md](22-domain-state-boundary.md): Domain state boundary.
- [23-domain-data-flow.md](23-domain-data-flow.md): Domain data flow contract.
- [24-domain-quality-review.md](24-domain-quality-review.md): Domain quality, risk, and future validation review.
- [25-date-product-principles.md](25-date-product-principles.md): DATE Product Principle constitution.
- [26-principle-relationship-map.md](26-principle-relationship-map.md): DATE Product Principle dependency map.
- [27-principle-priority-matrix.md](27-principle-priority-matrix.md): DATE Product Principle priority and validation matrix.
- [28-canonical-entity-architecture.md](28-canonical-entity-architecture.md): DATE Canonical Entity Architecture.
- [29-entity-relationship-definition.md](29-entity-relationship-definition.md): Canonical Entity relationship definitions.
- [30-entity-group-classification.md](30-entity-group-classification.md): Entity group and layer classification.
- [31-entity-state-model.md](31-entity-state-model.md): Product-level Entity state vocabulary.
- [32-entity-dependency-map.md](32-entity-dependency-map.md): Entity dependency and ownership map.
- [33-information-domain-definition.md](33-information-domain-definition.md): DATE Canonical Information Domain 정의.
- [34-information-group-definition.md](34-information-group-definition.md): Entity 기반 Information Group 정의.
- [35-information-hierarchy.md](35-information-hierarchy.md): Product Domain에서 Information Unit까지의 hierarchy.
- [36-information-classification.md](36-information-classification.md): Information Object classification and ownership.
- [37-information-flow.md](37-information-flow.md): Information input, processing, output, dependency.
- [38-information-visibility-model.md](38-information-visibility-model.md): Visibility and Freshness model.
- [39-navigation-domain-definition.md](39-navigation-domain-definition.md): DATE Canonical Navigation Domain 정의.
- [40-navigation-flow-definition.md](40-navigation-flow-definition.md): Information 기반 Navigation Flow 정의.
- [41-navigation-patterns.md](41-navigation-patterns.md): Navigation Pattern and hierarchy.
- [42-navigation-context-preservation.md](42-navigation-context-preservation.md): Navigation Context Preservation and Context Loss.
- [43-navigation-state-model.md](43-navigation-state-model.md): Navigation State and ownership model.
- [44-navigation-quality-review.md](44-navigation-quality-review.md): Navigation quality, risk, and readiness review.
- [45-interaction-domain-definition.md](45-interaction-domain-definition.md): DATE Canonical Interaction Domain 정의.
- [46-interaction-contract.md](46-interaction-contract.md): User Action에서 Available Next Action까지의 Interaction Contract.
- [47-interaction-state-machine.md](47-interaction-state-machine.md): Interaction State and transition model.
- [48-feedback-model.md](48-feedback-model.md): Feedback Model and response timing.
- [49-interaction-classification.md](49-interaction-classification.md): Interaction Category, ownership, classification.
- [50-interaction-quality-review.md](50-interaction-quality-review.md): Interaction quality, risk, and readiness review.
- [51-visual-philosophy.md](51-visual-philosophy.md): DATE Visual Language philosophy and personality.
- [52-color-philosophy.md](52-color-philosophy.md): Color role philosophy without fixed values.
- [53-elevation-and-layer-system.md](53-elevation-and-layer-system.md): Elevation, layer, soft neumorphism, glass rules.
- [54-motion-philosophy.md](54-motion-philosophy.md): Motion philosophy and motion rule.
- [55-component-style-rules.md](55-component-style-rules.md): Product element style responsibility rules.
- [56-accessibility-and-design-rules.md](56-accessibility-and-design-rules.md): Accessibility and Do Not Design rules.
- [57-workspace-definition.md](57-workspace-definition.md): DATE Workspace definition and ownership.
- [58-screen-family-definition.md](58-screen-family-definition.md): Screen Family responsibility definition.
- [59-screen-type-definition.md](59-screen-type-definition.md): Reusable Screen Type definition.
- [60-screen-zone-definition.md](60-screen-zone-definition.md): Screen Zone role and responsibility.
- [61-screen-flow-definition.md](61-screen-flow-definition.md): Workspace-based Screen Flow and dependency.
- [62-screen-quality-review.md](62-screen-quality-review.md): Screen System quality, risk, and readiness review.
- [63-wireframe-screen-definition.md](63-wireframe-screen-definition.md): Low Fidelity Wireframe Screen contract.
- [64-layout-patterns.md](64-layout-patterns.md): Gray Box Layout Pattern responsibility.
- [65-wireframe-hierarchy.md](65-wireframe-hierarchy.md): Workspace to Zone hierarchy.
- [66-screen-section-definition.md](66-screen-section-definition.md): Screen Section responsibility definition.
- [67-layout-grid-definition.md](67-layout-grid-definition.md): Abstract grid responsibility for Low Fidelity Wireframe.

## 현재 Phase

Phase 16 — DATE Low Fidelity Wireframe Architecture.

Registry는 수정하지 않는다. 신규 Candidate Principle은 만들지 않는다. Cross Validation Status는 모두 `Pending`이다.

## 다음 단계

다음 권장 단계는 Phase 17 Design System Readiness Review다. 이 문서에서는 fixed production values, delivery contract, persistence 설계를 작성하지 않는다.
