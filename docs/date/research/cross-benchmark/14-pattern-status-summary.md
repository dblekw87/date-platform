# Pattern Status Summary

## 문서 목적

이 문서는 Phase 8.2.4의 최종 Pattern status를 요약한다.

Status는 `KEEP`, `SCOPE LIMIT`, `REJECT`, `UNKNOWN`만 사용한다. 이 문서는 Registry를 수정하지 않는다.

## Status Summary

| Status | Count | Use in Next Phase |
| --- | ---: | --- |
| KEEP | 12 | DATE Product Principle draft의 primary candidate pool |
| SCOPE LIMIT | 13 | scope limitation이 있는 secondary candidate pool |
| REJECT | 2 | current DATE Product Principle pool에서 제외 |
| UNKNOWN | 3 | future validation 전까지 보류 |
| Total | 30 |  |

## Evidence Summary

| Evidence Quality | Count |
| --- | ---: |
| High | 11 |
| Medium | 13 |
| Low | 6 |
| Total | 30 |

## Generalizability Summary

| Generalizability | Count |
| --- | ---: |
| General | 4 |
| Finance | 17 |
| Professional | 5 |
| News | 2 |
| Platform-specific | 2 |
| Total | 30 |

## Dependency Summary

| Dependency Type | Count |
| --- | ---: |
| Required Dependency | 24 |
| Optional Dependency | 5 |
| Independent | 1 |
| Total | 30 |

## Layer Summary

| Metric | Count |
| --- | ---: |
| Primary Layer Assignment | 30 |
| Unique Primary Layer | 12 |
| Secondary Layer Assignment | 46 |
| Unique Secondary Layer | 15 |

## Final Pattern Table

| Pattern ID | Pattern Name | Current Classification | Final Classification | Evidence | Generalization | Primary Layer | Secondary Layer | Status | Related Principle | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | Shared Pattern | Shared Pattern | High | Finance | Entry | Discovery, Evidence | KEEP | P-001, P-026 | logged-in Home과 professional entry responsibility |
| PT-002 | Entity-directed Search | Shared Pattern | Shared Pattern | High | Finance | Discovery | Entry, Entity | KEEP | P-002, P-017 | result grouping and disambiguation |
| PT-003 | Display Unit as Navigation Unit | Shared Pattern | Shared Pattern | Medium | General | Entry | Discovery | KEEP | P-003, P-025 | row default action and target type |
| PT-004 | Task-specific AI Tool Packaging | Insufficient Pattern | Insufficient Pattern | Low | Platform-specific | Workflow | Entry, Evidence | REJECT | P-004 | AI Tool Source grounding |
| PT-005 | Market-attached Participation | Shared Pattern | Shared Pattern | Medium | Finance | Community | Entity, Evidence | SCOPE LIMIT | P-005 | Opinion / Evidence boundary |
| PT-006 | Watchlist as Continuity Entry | Shared Pattern | Shared Pattern | Medium | Finance | Monitoring | Personal Continuity | SCOPE LIMIT | P-006, P-014 | Watchlist research state |
| PT-007 | Source / Freshness / Provider Signal | Shared Pattern | Shared Pattern | High | Finance | Evidence | Policy | KEEP | P-007, P-020, P-027 | Source Visibility vs complete Traceability |
| PT-008 | AI Source Identity Separation | Insufficient Pattern | Insufficient Pattern | Low | Platform-specific | Evidence | Policy | UNKNOWN | P-008, P-030 | AI disclosure and Original Evidence boundary |
| PT-009 | Surface Specialization vs Context Preservation | Shared Pattern | Shared Pattern | Medium | General | Workflow | Entity, Evidence | SCOPE LIMIT | P-009, P-024, P-028 | return anchor and state restoration |
| PT-010 | Live Loading / Data Availability State | Insufficient Pattern | Insufficient Pattern | Low | Finance | Monitoring | Evidence | UNKNOWN | P-010, P-007 | live / delayed / stale vocabulary |
| PT-011 | Chart-centered Workspace | Benchmark-specific Pattern | Benchmark-specific Pattern | Medium | Professional | Workspace | Workflow | SCOPE LIMIT | P-011, P-018 | chart as Workspace or View |
| PT-012 | Entity Hub with Local Analysis Modes | Shared Pattern | Shared Pattern | High | Finance | Entity | Evidence, Workflow | KEEP | P-012, P-023 | Stock / Company / Security boundary |
| PT-013 | Screener Table Discovery | Shared Pattern | Shared Pattern | High | Finance | Discovery | Entity | KEEP | P-013, P-022 | filter context and row context |
| PT-014 | Split Personal State | Shared Pattern | Shared Pattern | Medium | General | Personal Continuity | Settings, Monitoring | SCOPE LIMIT | P-014, P-006 | state owner and persistence scope |
| PT-015 | Symbol-level Document Evidence | Benchmark-specific Pattern | Benchmark-specific Pattern | Medium | Finance | Research | Evidence, Entity | SCOPE LIMIT | P-015, P-020 | Document and News relation |
| PT-016 | Dashboard Research Composition | Benchmark-specific Pattern | Benchmark-specific Pattern | Medium | Professional | Workspace | Personal Continuity | SCOPE LIMIT | P-016, P-021 | Dashboard and Workspace boundary |
| PT-017 | Command / Function Entry | Variant Pattern | Variant Pattern | Medium | Professional | Workflow | Entry, Discovery | SCOPE LIMIT | P-017, P-002 | autocomplete, history, discoverability |
| PT-018 | Table / Chart / Heatmap Role Separation | Shared Pattern | Shared Pattern | High | Finance | Discovery | Evidence, Calendar | KEEP | P-018, P-025 | methodology and Source visibility |
| PT-019 | Reported / Estimate / Consensus Label | Benchmark-specific Pattern | Benchmark-specific Pattern | Medium | Finance | Evidence | Research | SCOPE LIMIT | P-019 | estimate Source and revision timestamp |
| PT-020 | Methodology Documentation Layer | Shared Pattern | Shared Pattern | High | General | Policy | Evidence | KEEP | P-020, P-027 | inline method access |
| PT-021 | Linked Workspace Context | Insufficient Pattern | Insufficient Pattern | Low | Professional | Workspace | Entity | UNKNOWN | P-021 | linking rule and persistence |
| PT-022 | Filter / Result Co-location | Variant Pattern | Variant Pattern | High | Finance | Discovery | Workflow | KEEP | P-022, P-013 | novice cost and expert efficiency |
| PT-023 | Dense Entity Hub | Variant Pattern | Variant Pattern | High | Finance | Entity | Evidence, Information Density | KEEP | P-023, P-012 | overload control and mobile adaptation |
| PT-024 | External Evidence Link with Context Loss | Shared Pattern | Shared Pattern | High | General | Evidence | Context Preservation | KEEP | P-024, P-009 | return path and evidence saving |
| PT-025 | Repeated Row / Table Grammar | Shared Pattern | Shared Pattern | High | Finance | Discovery | Information Density | KEEP | P-025, P-003 | novice onboarding and mobile readability |
| PT-026 | Portal Bridge from Passive to Active Research | Variant Pattern | Variant Pattern | Medium | Finance | Entry | Discovery, Workflow | SCOPE LIMIT | P-026, P-001 | portal hierarchy and research focus |
| PT-027 | Provider-labeled Research Module | Variant Pattern | Variant Pattern | Medium | Finance | Research | Evidence, Policy | SCOPE LIMIT | P-027, P-020 | provider identity vs item-level Traceability |
| PT-028 | Product Family Layer Boundary | Benchmark-specific Pattern | Benchmark-specific Pattern | Medium | Platform-specific | Infrastructure | Policy, Entry | REJECT | P-028, P-009 | cross-layer context transfer |
| PT-029 | Professional Workflow Density | Variant Pattern | Variant Pattern | Medium | Professional | Workflow | Workspace, Infrastructure | SCOPE LIMIT | P-029, P-017, P-021 | actual transition cost and context propagation |
| PT-030 | Evidence-preserving Interpretation Layer | Variant Pattern | Variant Pattern | Medium | News | Evidence | Information Density, Research | SCOPE LIMIT | P-030, P-007, P-024 | methodology, update time, correction policy |

## DATE Principle Readiness

| Item | Result |
| --- | --- |
| Readiness | Ready with Scope Limitation |
| Primary Pool | KEEP Pattern 12개 |
| Secondary Pool | SCOPE LIMIT Pattern 13개 |
| Exclusion Pool | REJECT Pattern 2개 |
| Future Validation Pool | UNKNOWN Pattern 3개 |
| Registry Update | Not Modified |
| Cross Validation Status | Pending |

## Next Phase Guardrail

DATE Product Principle draft 단계에서는 `KEEP` Pattern을 primary pool로 사용한다.

`SCOPE LIMIT` Pattern은 scope limitation을 명시할 때만 사용할 수 있다. `REJECT`와 `UNKNOWN` Pattern은 future validation 없이는 DATE Product Principle로 사용하지 않는다.
