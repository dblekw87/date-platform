# DATE Product Architecture Specification

## 문서 목적

이 문서는 Phase 8.4 범위에서 Architecture Domain 후보를 Product Architecture Specification으로 변환한다.

이 문서는 향후 Entity Architecture, Information Architecture, Navigation, Interaction, Design System, Wireframe, implementation 단계의 기준이 될 수 있는 architecture-level contract를 제공한다. 그러나 이 문서는 해당 산출물을 작성하지 않는다.

## Scope

| Item | Count |
| --- | ---: |
| Architecture Domain | 15 |
| Specification 작성 | 15 |
| Related Pattern 범위 | PT-001 ~ PT-030 |
| Related Principle 범위 | P-001 ~ P-030 |

## Architecture Specification Matrix

| Domain ID | Architecture Name | Purpose | Problem | Primary Responsibility | Secondary Responsibility | Primary Owner | Primary User | Primary Layer | Secondary Layer | Input | Output | Required Components | Optional Components | Required Entity | Optional Entity | Required Dependency | Optional Dependency | Related Patterns | Related Principles | Evidence Quality | Current Confidence | Readiness | Open Questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AD-001 | Entry Architecture | first entry에서 next task direction 제공 | user가 시작 지점을 정하기 어렵다 | route exposure, Market orientation | shallow Evidence cue | Entry Domain | Retail Investor, Research User | Entry | Discovery, Evidence | public Home, Market summary, route card | selected route, initial context | entry surface, route group, display unit | Source / Freshness cue | Market | News, Stock | None | AD-003 | PT-001, PT-003, PT-026 | P-001, P-026, P-003 | Mixed | Medium | Ready with Scope Limitation | public entry와 logged-in entry responsibility 차이 |
| AD-002 | Discovery Architecture | comparison-ready candidate set 생성 | user가 많은 candidate를 줄여야 한다 | candidate narrowing, filter-result loop | repeated row grammar | Discovery Domain | Retail Investor, Research User | Discovery | Entity, Workflow | filter, table, broad candidate set | ranked or filtered candidate set | screener, table, filter control | heatmap, saved filter | Stock, Company | Sector, Industry | AD-001 | AD-003 | PT-013, PT-022, PT-025, PT-018 | P-013, P-022, P-025, P-018 | High | High | Ready | filter context와 row context 유지 |
| AD-003 | Search Architecture | known intent를 Entity 또는 task로 연결 | target은 알지만 Surface는 모른다 | Entity resolver, Search entry | command variant | Search Domain | Retail Investor, Professional User | Discovery | Entry, Entity, Workflow | query, ticker, company name, command text | resolved Entity or task route | Search input, result grouping | command entry, autocomplete | Stock, Company | Security, Function | AD-001 | AD-007 | PT-002, PT-017 | P-002, P-017 | Mixed | Medium | Ready with Scope Limitation | autocomplete와 disambiguation |
| AD-004 | Entity Architecture | local analysis mode owner 제공 | 같은 Entity Evidence가 흩어진다 | Entity context, local mode grouping | dense hub variant | Entity Domain | Research User | Entity | Evidence, Workflow | resolved Entity, candidate row | Entity context, local mode context | Entity header, mode tabs, summary region | dense hub, document link | Stock, Company | Security, ETF, News | AD-003 | AD-005 | PT-012, PT-023, PT-015 | P-012, P-023, P-015 | High | High | Ready | Stock, Company, Security boundary |
| AD-005 | Evidence Architecture | trust calibration과 Evidence Traceability 제공 | origin, timing, method가 불명확하면 판단 강도가 약해진다 | Evidence boundary, Source / Freshness Signal | methodology, provider label, external path | Evidence Domain | Research User | Evidence | Policy, Research | Entity context, News, Report, Metric | Evidence context, Source cue, Original Evidence path | Source label, timestamp, provider cue, method reference | external document link, provider module | Evidence, Source | Document, Report, News | AD-004 | AD-006 | PT-007, PT-020, PT-024, PT-027 | P-007, P-020, P-024, P-027 | Mixed | Medium | Ready with Scope Limitation | Source Visibility와 complete Traceability 분리 |
| AD-006 | Interpretation Layer | reading cost와 trust boundary 동시 관리 | summary나 translation이 Original Evidence처럼 보일 수 있다 | interpretation boundary | generated content label candidate | Interpretation Domain | News Consumer, Research User | Evidence | Research, Policy | Original Evidence, article body, translation candidate | interpretation view, boundary label | summary block, translation state, original link | AI disclosure, correction cue | Article | News, Source | AD-005 | AD-013 | PT-030, PT-008, PT-004 | P-030, P-008, P-007 | Mixed | Low | Needs Additional Evidence | methodology, update time, correction policy |
| AD-007 | Workflow Architecture | task transition cost 감소 | user가 여러 task를 반복 전환한다 | task chain, transition contract | professional workflow density | Workflow Domain | Professional User, Research User | Workflow | Workspace, Infrastructure | Entity context, Evidence context, task intent | next task context, workflow state candidate | task route, workflow handoff rule | command entry, workspace link | Entity, Evidence | Function, Workspace | AD-004, AD-005 | AD-011 | PT-029, PT-017, PT-009, PT-022 | P-029, P-017, P-009, P-022 | Mixed | Medium | Ready with Scope Limitation | actual transition cost와 context propagation |
| AD-008 | Monitoring Architecture | 반복 Observation과 revisit trigger 제공 | 관심 Entity를 계속 확인해야 한다 | monitored set, watch trigger | live / delayed state candidate | Monitoring Domain | Retail Investor, Active Investor | Monitoring | Evidence, Personal Continuity | Entity, Watchlist action, live state cue | monitoring entry, observed state candidate | Watchlist entry, monitored entity set | alert rule candidate, live state label | Stock | Metric, Event | AD-004 | AD-015 | PT-006, PT-010, PT-014 | P-006, P-010, P-014 | Mixed | Medium | Ready with Scope Limitation | Watchlist가 research state도 보존하는가 |
| AD-009 | Personal Continuity | session 간 user intent 유지 | saved state owner가 불명확해질 수 있다 | saved state ownership | profile and settings boundary | Personal Continuity Domain | Returning User | Personal Continuity | Settings, Monitoring, Workspace | user action, save intent, monitored set | saved state, revisit entry | state type, owner rule, persistence label | profile, layout state | User | Watchlist, Workspace | AD-008 | AD-011 | PT-014, PT-006, PT-016 | P-014, P-006, P-016 | Mixed | Medium | Ready with Scope Limitation | state owner와 persistence scope |
| AD-010 | Context Preservation | transition context loss 관리 | Surface 전환 시 previous context를 잃는다 | return context, transition handoff | external path warning candidate | Context Domain | Research User | Workflow | Entity, Evidence, Workspace | Entity context, query, Source path | preserved context, return anchor candidate | context token, origin reference | saved return state | Entity | Source, Query | AD-004 | AD-009 | PT-009, PT-024, PT-021 | P-009, P-024, P-021 | Mixed | Medium | Ready with Scope Limitation | return anchor와 state restoration |
| AD-011 | Workspace Architecture | reusable research composition 제공 | chart, table, News setup을 반복해야 한다 | composition, layout state candidate | linked context candidate | Workspace Domain | Professional User | Workspace | Workflow, Personal Continuity | saved state, Entity context, widget intent | workspace composition candidate | layout container, widget contract | linked context, chart layout | Workspace | Chart, Dashboard | AD-009 | AD-007 | PT-016, PT-011, PT-021 | P-016, P-011, P-021 | Mixed | Low | Needs Additional Evidence | Dashboard와 Workspace boundary |
| AD-012 | Community Architecture | opinion layer와 Evidence layer boundary 분리 | reaction이 Financial Evidence처럼 보일 수 있다 | participation boundary | discussion awareness | Community Domain | Community Participant, Research User | Community | Entity, Evidence | Entity context, post, reaction | discussion context, opinion boundary | reaction unit, comment unit, author cue | moderation cue, report action | User | Comment, Reaction | AD-004, AD-005 | AD-006 | PT-005, PT-030, PT-007 | P-005, P-030, P-007 | Medium | Medium | Ready with Scope Limitation | Community Opinion과 Financial Evidence boundary |
| AD-013 | Research Architecture | provider and report context 제공 | report Source와 method가 섞일 수 있다 | provider-labeled research | document and estimate boundary | Research Domain | Research User, Analyst | Research | Evidence, Policy | Report, Document, provider label | research context, provider boundary | provider label, document reference | estimate label, method link | Report | Document, Analyst | AD-005 | AD-006 | PT-027, PT-015, PT-019, PT-020 | P-027, P-015, P-019, P-020 | Medium | Medium | Ready with Scope Limitation | provider identity와 item-level Traceability |
| AD-014 | Calendar Architecture | time-based discovery 후보 제공 | Event timing과 Evidence relation이 분리될 수 있다 | date context | event relation candidate | Calendar Domain | Research User | Calendar | Discovery, Evidence | date, event candidate, Market context | time context, event entry candidate | date grid, event label | reminder candidate, related news | Event | Company, Ticker | AD-002 | AD-005 | PT-018, PT-026, PT-013 | P-018, P-026, P-013 | Medium | Low | Needs Additional Evidence | Event relation과 Evidence Source |
| AD-015 | Notification Architecture | Monitoring trigger 전달 boundary 제공 | Monitoring은 delivery rule 없이는 약하다 | notification delivery boundary | alert payload candidate | Notification Domain | Returning User | Notification | Monitoring, Settings | monitored state, alert candidate | notification item candidate | delivery state, trigger reference | push, in-app center | Notification | Alert Rule | AD-008 | AD-009 | PT-006, PT-010, PT-014, PT-029 | P-006, P-010, P-014, P-029 | Mixed | Low | Ready with Scope Limitation | Alert payload와 trigger Source |

## Architecture Readiness Summary

| Readiness | Count |
| --- | ---: |
| Ready | 4 |
| Ready with Scope Limitation | 8 |
| Needs Additional Evidence | 3 |
| Blocked | 0 |

## Phase Boundary

이 문서는 architecture specification만 작성한다.

DATE Product Principle, Entity Model, Information Architecture, Navigation, Wireframe, UI, implementation은 작성하지 않는다.
