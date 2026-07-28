# Pattern Consolidation

## 문서 목적

이 문서는 Pattern `PT-001 ~ PT-030`을 Macro Pattern과 Supporting Pattern으로 재구성한다.

Pattern classification은 다음 다섯 값을 사용한다.

| Classification | Definition |
| --- | --- |
| Core Pattern | 독립 Domain의 중심이 될 수 있는 Pattern |
| Supporting Pattern | Core Pattern을 보완하는 Pattern |
| Derived Pattern | 다른 Pattern에서 파생되는 조건부 Pattern |
| Legacy Pattern | 현재 DATE Principle pool에서 제외할 Pattern |
| Sub Pattern | 상위 Pattern에 흡수될 수 있는 Pattern |

## Consolidation Summary

| Classification | Count |
| --- | ---: |
| Core Pattern | 12 |
| Supporting Pattern | 10 |
| Derived Pattern | 4 |
| Legacy Pattern | 2 |
| Sub Pattern | 2 |
| Total | 30 |

## Pattern Consolidation Matrix

| Pattern ID | Pattern Name | Final Status | Consolidation Classification | Architecture Domain | Role | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | KEEP | Core Pattern | Entry Architecture | Macro Pattern | first entry responsibility를 직접 가진다. |
| PT-002 | Entity-directed Search | KEEP | Core Pattern | Search Architecture | Macro Pattern | Search-to-Entity route의 중심이다. |
| PT-003 | Display Unit as Navigation Unit | KEEP | Supporting Pattern | Entry Architecture | Supporting Pattern | Entry와 Discovery 사이 action unit을 보완한다. |
| PT-004 | Task-specific AI Tool Packaging | REJECT | Legacy Pattern | Interpretation Layer | Legacy Pattern | single benchmark lock-in으로 current DATE pool에서 제외한다. |
| PT-005 | Market-attached Participation | SCOPE LIMIT | Core Pattern | Community Architecture | Macro Pattern | Community boundary Domain의 중심이다. |
| PT-006 | Watchlist as Continuity Entry | SCOPE LIMIT | Core Pattern | Monitoring Architecture | Macro Pattern | Monitoring과 revisit entry의 중심이다. |
| PT-007 | Source / Freshness / Provider Signal | KEEP | Core Pattern | Evidence Architecture | Macro Pattern | Evidence trust calibration의 중심이다. |
| PT-008 | AI Source Identity Separation | UNKNOWN | Sub Pattern | Interpretation Layer | Sub Pattern | PT-030에 흡수될 수 있는 AI-specific sub-case다. |
| PT-009 | Surface Specialization vs Context Preservation | SCOPE LIMIT | Core Pattern | Context Preservation | Macro Pattern | Surface responsibility와 context loss를 다룬다. |
| PT-010 | Live Loading / Data Availability State | UNKNOWN | Derived Pattern | Monitoring Architecture | Derived Pattern | PT-007 Freshness Signal에서 파생되는 state vocabulary다. |
| PT-011 | Chart-centered Workspace | SCOPE LIMIT | Supporting Pattern | Workspace Architecture | Supporting Pattern | Workspace Domain에서 chart-heavy variant를 보완한다. |
| PT-012 | Entity Hub with Local Analysis Modes | KEEP | Core Pattern | Entity Architecture | Macro Pattern | Entity context owner의 중심이다. |
| PT-013 | Screener Table Discovery | KEEP | Core Pattern | Discovery Architecture | Macro Pattern | candidate narrowing과 comparison의 중심이다. |
| PT-014 | Split Personal State | SCOPE LIMIT | Core Pattern | Personal Continuity | Macro Pattern | saved state owner 분리의 중심이다. |
| PT-015 | Symbol-level Document Evidence | SCOPE LIMIT | Supporting Pattern | Research Architecture | Supporting Pattern | Document Evidence가 Research와 Entity를 보완한다. |
| PT-016 | Dashboard Research Composition | SCOPE LIMIT | Core Pattern | Workspace Architecture | Macro Pattern | reusable composition의 중심이다. |
| PT-017 | Command / Function Entry | SCOPE LIMIT | Supporting Pattern | Search Architecture | Supporting Pattern | expert entry variant로 Search Domain을 보완한다. |
| PT-018 | Table / Chart / Heatmap Role Separation | KEEP | Core Pattern | Discovery Architecture | Macro Pattern | information form role separation의 중심이다. |
| PT-019 | Reported / Estimate / Consensus Label | SCOPE LIMIT | Derived Pattern | Research Architecture | Derived Pattern | provider and methodology Pattern에서 파생된다. |
| PT-020 | Methodology Documentation Layer | KEEP | Core Pattern | Evidence Architecture | Macro Pattern | Evidence method support의 중심이다. |
| PT-021 | Linked Workspace Context | UNKNOWN | Sub Pattern | Workspace Architecture | Sub Pattern | PT-016과 PT-029가 요구하는 linked context sub-case다. |
| PT-022 | Filter / Result Co-location | KEEP | Core Pattern | Discovery Architecture | Macro Pattern | screener iteration loop의 중심이다. |
| PT-023 | Dense Entity Hub | KEEP | Supporting Pattern | Entity Architecture | Supporting Pattern | PT-012 Entity Hub의 dense variant다. |
| PT-024 | External Evidence Link with Context Loss | KEEP | Core Pattern | Evidence Architecture | Macro Pattern | Original Evidence access와 context loss의 중심이다. |
| PT-025 | Repeated Row / Table Grammar | KEEP | Supporting Pattern | Discovery Architecture | Supporting Pattern | dense scan grammar를 지원한다. |
| PT-026 | Portal Bridge from Passive to Active Research | SCOPE LIMIT | Supporting Pattern | Entry Architecture | Supporting Pattern | PT-001의 passive-to-active variant다. |
| PT-027 | Provider-labeled Research Module | SCOPE LIMIT | Supporting Pattern | Research Architecture | Supporting Pattern | provider identity로 Research trust를 보완한다. |
| PT-028 | Product Family Layer Boundary | REJECT | Legacy Pattern | Infrastructure | Legacy Pattern | Bloomberg-scale Product family에 locked되어 current DATE pool에서 제외한다. |
| PT-029 | Professional Workflow Density | SCOPE LIMIT | Derived Pattern | Workflow Architecture | Derived Pattern | PT-017 and PT-021 dependency가 필요한 professional derived Pattern이다. |
| PT-030 | Evidence-preserving Interpretation Layer | SCOPE LIMIT | Derived Pattern | Interpretation Layer | Derived Pattern | PT-007 and PT-024를 interpretation context에 적용한다. |

## Macro Pattern Group

| Macro Group | Core Pattern | Supporting Pattern | Derived / Sub / Legacy Pattern |
| --- | --- | --- | --- |
| Entry Group | PT-001 | PT-003, PT-026 | None |
| Discovery Group | PT-013, PT-018, PT-022 | PT-025 | None |
| Search Group | PT-002 | PT-017 | None |
| Entity Group | PT-012 | PT-023 | None |
| Evidence Group | PT-007, PT-020, PT-024 | PT-027, PT-015 | PT-019 |
| Interpretation Group | None | None | PT-030, PT-008, PT-004 |
| Workflow Group | None | PT-017 | PT-029 |
| Monitoring Group | PT-006 | None | PT-010 |
| Personal Continuity Group | PT-014 | PT-016 | PT-021 |
| Context Preservation Group | PT-009 | PT-024 | PT-021 |
| Workspace Group | PT-016 | PT-011 | PT-021 |
| Community Group | PT-005 | PT-030 | None |
| Research Group | None | PT-015, PT-027, PT-020 | PT-019 |
| Calendar Group | None | PT-018, PT-026 | None |
| Notification Group | None | PT-006, PT-014 | PT-010 |

## Consolidation Decision

`Core Pattern`과 `Supporting Pattern`은 다음 단계에서 Domain-level Principle source pool로 검토할 수 있다.

`Derived Pattern`은 parent Domain이 먼저 정의될 때만 사용할 수 있다. `Legacy Pattern`과 `Sub Pattern`은 independent DATE Product Principle source로 사용하지 않는다.
