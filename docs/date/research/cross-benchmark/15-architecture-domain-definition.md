# Architecture Domain Definition

## 문서 목적

이 문서는 Phase 8.3.1 범위에서 Pattern `PT-001 ~ PT-030`을 Architecture Domain 후보로 통합한다.

DATE Product Principle은 작성하지 않는다. Entity Model, Information Architecture, Navigation, UX도 작성하지 않는다. Registry는 수정하지 않는다.

## Domain Summary

| Metric | Count |
| --- | ---: |
| Consolidation 대상 Pattern | 30 |
| Architecture Domain | 15 |
| High Evidence Domain | 4 |
| Medium Evidence Domain | 3 |
| Mixed Evidence Domain | 8 |
| Ready Domain | 4 |
| Ready with Scope Limitation Domain | 8 |
| Needs Additional Evidence Domain | 3 |
| Blocked Domain | 0 |

## Architecture Domain Matrix

| Domain ID | Architecture Domain Name | Definition | Purpose | User Problem | User Benefit | Macro Pattern | Supporting Pattern | Related Pattern | Primary Layer | Secondary Layer | Required Dependency | Optional Dependency | Evidence Quality | Generalizability | Current Confidence | Architecture Readiness | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AD-001 | Entry Architecture | Product first entry가 broad Market context와 active route를 연결하는 Domain이다. | 첫 진입에서 next task direction 제공 | 사용자는 어디서 시작할지 결정해야 한다. | Market Orientation, Entry Cost Reduction | PT-001 | PT-003, PT-026 | PT-007 | Entry | Discovery, Evidence | None | PT-002 | Mixed | Finance | Medium | Ready with Scope Limitation | logged-in entry와 public entry responsibility 차이 |
| AD-002 | Discovery Architecture | candidate Entity나 content를 찾고 줄이는 Domain이다. | comparison-ready candidate set 생성 | 사용자는 많은 candidate를 기준에 맞게 줄여야 한다. | Discoverability, Comparison Efficiency | PT-013 | PT-022, PT-025 | PT-018 | Discovery | Entity, Workflow | AD-001 | AD-003 | High | Finance | High | Ready | filter context와 result row context 유지 |
| AD-003 | Search Architecture | known Entity나 task를 Search 또는 command route로 해결하는 Domain이다. | known intent를 빠르게 Entity 또는 task로 연결 | 사용자는 target은 알지만 Surface는 모를 수 있다. | Decision Speed, Learnability | PT-002 | PT-017 | PT-012 | Discovery | Entry, Entity, Workflow | AD-001 | AD-007 | Mixed | Finance | Medium | Ready with Scope Limitation | autocomplete와 disambiguation 표시 방식 |
| AD-004 | Entity Architecture | Stock, Symbol, Company, Security 같은 Entity context를 유지하는 Domain이다. | local analysis mode의 owner를 제공 | 사용자는 같은 Entity에 대한 Evidence를 흩어져 확인한다. | Context Preservation, Information Density Control | PT-012 | PT-023 | PT-015 | Entity | Evidence, Workflow | AD-003 | AD-005 | High | Finance | High | Ready | Stock, Company, Security boundary |
| AD-005 | Evidence Architecture | Source, Freshness, methodology, Original Evidence, provider cue를 다루는 Domain이다. | trust calibration과 Evidence Traceability 제공 | 사용자는 data와 content의 origin, timing, method를 알아야 한다. | Trust Calibration, Evidence Traceability | PT-007 | PT-020, PT-024, PT-027 | PT-015, PT-019, PT-030 | Evidence | Policy, Research | AD-004 | AD-006 | Mixed | General | Medium | Ready with Scope Limitation | Source Visibility와 complete Traceability 분리 |
| AD-006 | Interpretation Layer | Summary, Translation, generated interpretation을 Original Evidence와 분리하는 Domain이다. | reading cost와 trust boundary 동시 관리 | 사용자는 interpretation layer를 Original Evidence로 오인할 수 있다. | Reading Cost Reduction, Trust Calibration | PT-030 | PT-008 | PT-004 | Evidence | Information Density, Research, Policy | AD-005 | AD-013 | Mixed | News | Low | Needs Additional Evidence | methodology, update time, correction policy |
| AD-007 | Workflow Architecture | task transition cost와 professional workflow compression을 다루는 Domain이다. | 반복 task 간 transition cost 감소 | 사용자는 여러 task를 반복 전환해야 한다. | Workflow Efficiency, Professional Scalability | PT-029 | PT-017, PT-009, PT-022 | PT-021 | Workflow | Workspace, Infrastructure | AD-004, AD-005 | AD-011 | Mixed | Professional | Medium | Ready with Scope Limitation | actual interaction speed와 context propagation |
| AD-008 | Monitoring Architecture | Watchlist, live state, Alert candidate를 통한 지속 Observation Domain이다. | 반복 Observation과 revisit trigger 제공 | 사용자는 관심 Entity를 계속 확인해야 한다. | Monitoring, Personal Continuity | PT-006 | PT-010 | PT-014 | Monitoring | Evidence, Personal Continuity | AD-004 | AD-015 | Mixed | Finance | Medium | Ready with Scope Limitation | Watchlist가 research state도 보존하는가 |
| AD-009 | Personal Continuity | saved state, Watchlist, Profile, layout, revisit owner를 다루는 Domain이다. | session 간 user intent 유지 | 저장된 intent가 모두 섞이면 owner가 불명확해진다. | Personal Continuity, Expert Scalability | PT-014 | PT-006, PT-016 | PT-021 | Personal Continuity | Settings, Monitoring, Workspace | AD-008 | AD-011 | Mixed | General | Medium | Ready with Scope Limitation | state owner와 persistence scope |
| AD-010 | Context Preservation | Surface 전환과 external transition에서 context loss를 관리하는 Domain이다. | Entity, Query, Source, return context 보존 | Surface가 분리되면 이전 context를 잃을 수 있다. | Context Preservation, Clarity | PT-009 | PT-024 | PT-021, PT-011 | Workflow | Entity, Evidence, Workspace | AD-004 | AD-009 | Mixed | General | Medium | Ready with Scope Limitation | return anchor와 state restoration |
| AD-011 | Workspace Architecture | Dashboard, chart layout, linked context 같은 composition Domain이다. | reusable research composition 제공 | 사용자는 chart, table, news setup을 반복해야 한다. | Workflow Efficiency, Personal Continuity | PT-016 | PT-011, PT-021 | PT-014, PT-029 | Workspace | Workflow, Personal Continuity | AD-009 | AD-007 | Mixed | Professional | Low | Needs Additional Evidence | Dashboard와 Workspace boundary |
| AD-012 | Community Architecture | Discussion, Reaction, Idea, participation boundary를 다루는 Domain이다. | user opinion을 Market context와 분리해 배치 | opinion과 Financial Evidence가 혼동될 수 있다. | Discussion Awareness | PT-005 | PT-030 | PT-007 | Community | Entity, Evidence | AD-004, AD-005 | AD-006 | Medium | Finance | Medium | Ready with Scope Limitation | Community Opinion과 Financial Evidence boundary |
| AD-013 | Research Architecture | Document, provider-labeled Research, estimate label을 다루는 Domain이다. | research content의 Source와 method boundary 제공 | 사용자는 report Source와 methodology를 구분해야 한다. | Evidence Traceability, Trust Calibration | PT-027 | PT-015, PT-019, PT-020 | PT-007 | Research | Evidence, Policy | AD-005 | AD-006 | Medium | Finance | Medium | Ready with Scope Limitation | provider identity와 item-level Traceability 차이 |
| AD-014 | Calendar Architecture | time-based or Event-based discovery를 지원하는 Domain 후보이다. | time basis로 candidate context를 제공 | 사용자는 News와 Event timing을 함께 봐야 할 수 있다. | Timeline Awareness | PT-018 | PT-026 | PT-013 | Calendar | Discovery, Evidence | AD-002 | AD-005 | Medium | Finance | Low | Needs Additional Evidence | Event relation과 Evidence source |
| AD-015 | Notification Architecture | Alert delivery, push, in-app notification 후보를 다루는 Domain이다. | Monitoring trigger를 user에게 전달 | 지속 Observation은 delivery rule 없이는 약하다. | Monitoring, Personal Continuity | PT-006 | PT-010, PT-014 | PT-029 | Notification | Monitoring, Settings | AD-008 | AD-009 | Mixed | Finance | Low | Ready with Scope Limitation | Alert payload와 trigger Source |

## Domain Pattern Tree

| Domain ID | Pattern Tree |
| --- | --- |
| AD-001 | Entry Architecture -> PT-001 Market / Portal Entry -> PT-003 Display Unit -> PT-026 Portal Bridge |
| AD-002 | Discovery Architecture -> PT-013 Screener Table Discovery -> PT-022 Filter / Result Co-location -> PT-025 Repeated Row / Table Grammar |
| AD-003 | Search Architecture -> PT-002 Entity-directed Search -> PT-017 Command / Function Entry |
| AD-004 | Entity Architecture -> PT-012 Entity Hub -> PT-023 Dense Entity Hub -> PT-015 Symbol-level Document Evidence |
| AD-005 | Evidence Architecture -> PT-007 Source / Freshness / Provider Signal -> PT-020 Methodology -> PT-024 External Evidence -> PT-027 Provider Label |
| AD-006 | Interpretation Layer -> PT-030 Evidence-preserving Interpretation -> PT-008 AI Source Identity -> PT-004 AI Tool Packaging |
| AD-007 | Workflow Architecture -> PT-029 Professional Workflow Density -> PT-017 Command Entry -> PT-009 Surface Specialization |
| AD-008 | Monitoring Architecture -> PT-006 Watchlist -> PT-010 Live Loading State -> PT-014 Split Personal State |
| AD-009 | Personal Continuity -> PT-014 Split Personal State -> PT-006 Watchlist -> PT-016 Dashboard Composition |
| AD-010 | Context Preservation -> PT-009 Surface Specialization -> PT-024 External Evidence Link -> PT-021 Linked Workspace Context |
| AD-011 | Workspace Architecture -> PT-016 Dashboard Research Composition -> PT-011 Chart-centered Workspace -> PT-021 Linked Workspace Context |
| AD-012 | Community Architecture -> PT-005 Market-attached Participation -> PT-030 Interpretation Boundary |
| AD-013 | Research Architecture -> PT-027 Provider-labeled Research -> PT-015 Document Evidence -> PT-019 Estimate Label -> PT-020 Methodology |
| AD-014 | Calendar Architecture -> PT-018 View Role Separation -> PT-026 Portal Bridge |
| AD-015 | Notification Architecture -> PT-006 Watchlist -> PT-010 Data Availability State -> PT-014 Split Personal State |

## Phase Boundary

Architecture Domain은 DATE Architecture 확정안이 아니다.

이 문서는 Pattern을 Domain 후보로 묶을 뿐이다. DATE Product Principle, Entity Model, Information Architecture, Navigation, UX는 작성하지 않는다.
