# Pattern Conflict Matrix

## 문서 목적

이 문서는 Phase 8.2.4 범위에서 Pattern 간 conflict와 duplication risk를 검토한다.

Conflict는 두 Pattern이 같은 Product Rule을 반대 방향으로 요구할 때만 기록한다. 단순 UI 차이는 conflict가 아니다.

## Conflict Summary

| Metric | Count |
| --- | ---: |
| Direct Conflict | 0 |
| Duplicate Pattern | 0 |
| Overlapping Pattern | 9 |
| Nested Pattern | 8 |
| Supporting Pattern | 7 |
| Independent Pattern | 6 |

## Conflict Matrix

| Pattern ID | Pattern Name | Conflicts With | Reason | Resolution |
| --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | No Conflict | PT-026 is a variant bridge, not a contradiction. | Keep PT-001 as parent Entry Pattern. |
| PT-002 | Entity-directed Search | No Conflict | PT-017 changes entry philosophy for expert workflow. | Keep PT-002 as Search parent; scope PT-017. |
| PT-003 | Display Unit as Navigation Unit | No Conflict | PT-025 repeats the unit grammar at scale. | Keep PT-003; treat PT-025 as density support. |
| PT-004 | Task-specific AI Tool Packaging | No Conflict | AI Tool packaging lacks cross-benchmark support. | Reject for DATE, no conflict. |
| PT-005 | Market-attached Participation | No Conflict | Community and Evidence boundary can coexist. | Scope limit with trust boundary. |
| PT-006 | Watchlist as Continuity Entry | No Conflict | PT-014 is broader personal state model. | Keep as scoped monitoring entry. |
| PT-007 | Source / Freshness / Provider Signal | No Conflict | PT-020 and PT-027 support deeper trust layer. | Keep as Evidence parent. |
| PT-008 | AI Source Identity Separation | No Conflict | PT-030 overlaps but broader interpretation layer may absorb it. | Unknown until AI-specific validation. |
| PT-009 | Surface Specialization vs Context Preservation | No Conflict | PT-024 is external transition sub-case. | Scope limit with return path question. |
| PT-010 | Live Loading / Data Availability State | No Conflict | PT-007 covers Freshness broadly. | Unknown as state vocabulary sub-case. |
| PT-011 | Chart-centered Workspace | No Conflict | Chart-first and Entity-first are strategy variants. | Scope limit for chart-heavy Product only. |
| PT-012 | Entity Hub with Local Analysis Modes | No Conflict | PT-023 is dense implementation variant. | Keep PT-012 as parent Entity Pattern. |
| PT-013 | Screener Table Discovery | No Conflict | PT-022 is filter-loop variant. | Keep PT-013 as parent Discovery Pattern. |
| PT-014 | Split Personal State | No Conflict | PT-006, PT-016, PT-021 depend on state ownership. | Scope limit until persistence is validated. |
| PT-015 | Symbol-level Document Evidence | No Conflict | PT-020 supports methodology and document layer. | Scope limit until claim relation is validated. |
| PT-016 | Dashboard Research Composition | No Conflict | PT-021 may enable linked context if validated. | Scope limit for professional composition. |
| PT-017 | Command / Function Entry | No Conflict | PT-002 broad Search remains valid for non-expert user. | Scope limit for professional user. |
| PT-018 | Table / Chart / Heatmap Role Separation | No Conflict | PT-011 chart-first is a strategy variant. | Keep as information form role Pattern. |
| PT-019 | Reported / Estimate / Consensus Label | No Conflict | PT-027 provider label supports estimates. | Scope limit until methodology is validated. |
| PT-020 | Methodology Documentation Layer | No Conflict | PT-007 is shallow trust cue; PT-020 is deeper support. | Keep as methodology support Pattern. |
| PT-021 | Linked Workspace Context | No Conflict | PT-016 and PT-029 may need it but Evidence is weak. | Unknown until direct workspace validation. |
| PT-022 | Filter / Result Co-location | No Conflict | PT-013 parent Pattern remains broader. | Keep as high-evidence discovery strategy. |
| PT-023 | Dense Entity Hub | No Conflict | PT-012 parent Pattern remains broader. | Keep as high-evidence Entity strategy. |
| PT-024 | External Evidence Link with Context Loss | No Conflict | PT-009 parent context Pattern remains broader. | Keep as Evidence boundary Pattern. |
| PT-025 | Repeated Row / Table Grammar | No Conflict | PT-003 parent Pattern covers action unit. | Keep as repeated grammar Pattern. |
| PT-026 | Portal Bridge from Passive to Active Research | No Conflict | PT-001 parent Entry Pattern remains broader. | Scope limit with hierarchy risk. |
| PT-027 | Provider-labeled Research Module | No Conflict | PT-020 methodology support is broader. | Scope limit with item-level Traceability gap. |
| PT-028 | Product Family Layer Boundary | No Conflict | PT-009 covers narrower Surface boundary. | Reject for DATE now due platform scale. |
| PT-029 | Professional Workflow Density | No Conflict | PT-017 and PT-021 are dependencies, not duplicates. | Scope limit for professional workflow. |
| PT-030 | Evidence-preserving Interpretation Layer | No Conflict | PT-008 is AI-specific sub-case. | Scope limit due methodology gap. |

## Duplication Matrix

| Pattern ID | Duplicate With | Relationship Type | Reason | Resolution |
| --- | --- | --- | --- | --- |
| PT-001 | PT-026 | Nested Pattern | passive-to-active bridge is one Portal Entry strategy. | PT-001 parent, PT-026 scoped variant. |
| PT-002 | PT-017 | Overlapping | both reduce entry cost, but user type differs. | PT-002 broad, PT-017 professional. |
| PT-003 | PT-025 | Supporting Pattern | repeated row grammar scales display unit action. | Keep both. |
| PT-004 | PT-008, PT-030 | Overlapping | AI Tool packaging touches interpretation boundary but is narrower. | Reject PT-004 now. |
| PT-005 | PT-030 | Supporting Pattern | participation needs opinion / Evidence separation. | Keep PT-005 scoped. |
| PT-006 | PT-014 | Nested Pattern | Watchlist is one saved state type. | PT-014 parent, PT-006 monitoring entry. |
| PT-007 | PT-020, PT-027 | Supporting Pattern | Source Signal can be extended by methodology and provider label. | Keep all with layer separation. |
| PT-008 | PT-030 | Nested Pattern | AI identity separation may be one interpretation layer sub-case. | PT-008 Unknown, PT-030 scoped. |
| PT-009 | PT-024 | Nested Pattern | external context loss is one specialization boundary. | PT-009 parent, PT-024 keep. |
| PT-010 | PT-007 | Supporting Pattern | live / delayed state is Freshness sub-case. | PT-010 Unknown until state validation. |
| PT-011 | PT-018 | Supporting Pattern | chart-centered workspace depends on chart role clarity. | PT-011 scoped. |
| PT-012 | PT-023 | Nested Pattern | dense hub is one Entity Hub strategy. | PT-012 parent, PT-023 keep as high-evidence variant. |
| PT-013 | PT-022 | Nested Pattern | filter-result co-location is screener iteration strategy. | PT-013 parent, PT-022 keep. |
| PT-014 | PT-016, PT-021 | Supporting Pattern | dashboard and linked context need state ownership. | PT-014 scoped parent. |
| PT-015 | PT-020 | Supporting Pattern | document Evidence and methodology support validation. | PT-015 scoped. |
| PT-016 | PT-021 | Supporting Pattern | linked context may enable dashboard composition. | PT-016 scoped, PT-021 unknown. |
| PT-017 | PT-029 | Supporting Pattern | command entry can support professional density. | Both scoped. |
| PT-018 | PT-025 | Supporting Pattern | row grammar makes form role comparison learnable. | Keep both. |
| PT-019 | PT-027 | Supporting Pattern | estimate labels require provider identity. | PT-019 scoped. |
| PT-020 | PT-027 | Overlapping | both address research trust, but depth differs. | PT-020 general, PT-027 research-specific. |
| PT-021 | PT-029 | Supporting Pattern | linked context could reduce professional task transition cost. | PT-021 Unknown. |
| PT-022 | PT-013 | Nested Pattern | filter loop is one screener strategy. | Keep both with dependency. |
| PT-023 | PT-012 | Nested Pattern | dense hub is one Entity Hub strategy. | Keep both with dependency. |
| PT-024 | PT-009 | Nested Pattern | external Evidence transition is context preservation sub-case. | Keep both. |
| PT-025 | PT-003 | Supporting Pattern | repeated grammar scales display unit pattern. | Keep both. |
| PT-026 | PT-001 | Nested Pattern | portal bridge is a Portal Entry strategy. | Scope limit. |
| PT-027 | PT-020 | Overlapping | provider label and methodology layer both calibrate trust. | Scope limit PT-027. |
| PT-028 | PT-009 | Overlapping | product layer boundary is larger Surface boundary. | Reject PT-028 for current DATE. |
| PT-029 | PT-017, PT-021 | Supporting Pattern | professional density depends on expert entry and linking. | Scope limit. |
| PT-030 | PT-008, PT-024 | Overlapping | interpretation boundary overlaps AI identity and external Evidence path. | Scope limit PT-030. |

## Resolution Summary

| Item | Decision |
| --- | --- |
| Direct Conflict | No direct conflict found. |
| Duplicate Pattern | No exact duplicate found. |
| Overlap Handling | Use parent / variant / supporting relationship. |
| Registry Update | Not Modified |
| Cross Validation Status | Pending |

## Phase Boundary

이 문서는 conflict와 duplication review만 다룬다. DATE Product Principle은 작성하지 않는다.
