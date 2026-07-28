# Layer Classification

## 문서 목적

이 문서는 Pattern을 Product Layer 기준으로 분류한다. 하나의 Pattern은 여러 Layer에 걸칠 수 있지만 Primary Layer를 먼저 기록한다.

## Layer별 Pattern Mapping

| Layer | Primary Patterns | Secondary Patterns | Key Responsibility |
| --- | --- | --- | --- |
| Entry | PT-001, PT-026 | PT-002, PT-003 | 첫 진입, passive discovery, active research entry 연결 |
| Discovery | PT-002, PT-013, PT-022 | PT-001, PT-025, PT-026 | Search, Screener, filter-result loop, entity candidate selection |
| Entity | PT-012, PT-023 | PT-002, PT-015, PT-024 | Stock, Symbol, Security context 유지 |
| Evidence | PT-007, PT-020, PT-024, PT-030 | PT-015, PT-019, PT-027 | Source, Freshness, methodology, original access, interpretation boundary |
| Workflow | PT-017, PT-029 | PT-009, PT-011, PT-016, PT-021 | task transition cost, command, professional workflow compression |
| Monitoring | PT-006, PT-010 | PT-014, PT-029 | Watchlist, live state, Alert candidate |
| Personal Continuity | PT-006, PT-014 | PT-016, PT-021, PT-024 | saved state, revisit, persistence boundary |
| Workspace | PT-011, PT-016, PT-021 | PT-014, PT-017, PT-029 | chart, dashboard, panel, linked context composition |
| Community | PT-005 | PT-015, PT-030 | Discussion, Reaction, Idea, participation boundary |
| Research | PT-015, PT-027 | PT-019, PT-020, PT-024 | Document, Report, provider-labeled analysis |
| Calendar | PT-018 | PT-026 | Event-based or time-based discovery support |
| Notification | PT-006, PT-014 | PT-010, PT-029 | Alert, Push, notification payload candidate |
| Settings | PT-014 | PT-016, PT-021 | saved screen, layout, preference, profile state |
| Policy | PT-020, PT-027 | PT-007, PT-028 | methodology, pricing, entitlement, provider boundary |
| Infrastructure | PT-028, PT-029 | PT-017, PT-027 | Product Family, Enterprise Data, API, professional delivery layer |

## Pattern별 Primary Layer

| Pattern ID | Pattern | Primary Layer | Secondary Layers |
| --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | Entry | Discovery, Evidence |
| PT-002 | Entity-directed Search | Discovery | Entry, Entity |
| PT-003 | Display Unit as Navigation Unit | Entry | Discovery |
| PT-004 | Task-specific AI Tool Packaging | Workflow | Entry, Evidence |
| PT-005 | Market-attached Participation | Community | Entity, Evidence |
| PT-006 | Watchlist as Continuity Entry | Monitoring | Personal Continuity |
| PT-007 | Source / Freshness / Provider Signal | Evidence | Policy |
| PT-008 | AI Source Identity Separation | Evidence | Policy |
| PT-009 | Surface Specialization vs Context Preservation | Workflow | Entity, Evidence |
| PT-010 | Live Loading / Data Availability State | Monitoring | Evidence |
| PT-011 | Chart-centered Workspace | Workspace | Workflow |
| PT-012 | Entity Hub with Local Analysis Modes | Entity | Evidence, Workflow |
| PT-013 | Screener Table Discovery | Discovery | Entity |
| PT-014 | Split Personal State | Personal Continuity | Settings, Monitoring |
| PT-015 | Symbol-level Document Evidence | Research | Evidence, Entity |
| PT-016 | Dashboard Research Composition | Workspace | Personal Continuity |
| PT-017 | Command / Function Entry | Workflow | Entry, Discovery |
| PT-018 | Table / Chart / Heatmap Role Separation | Discovery | Evidence, Calendar |
| PT-019 | Reported / Estimate / Consensus Label | Evidence | Research |
| PT-020 | Methodology Documentation Layer | Policy | Evidence |
| PT-021 | Linked Workspace Context | Workspace | Entity |
| PT-022 | Filter / Result Co-location | Discovery | Workflow |
| PT-023 | Dense Entity Hub | Entity | Evidence, Information Density |
| PT-024 | External Evidence Link with Context Loss | Evidence | Context Preservation |
| PT-025 | Repeated Row / Table Grammar | Discovery | Information Density |
| PT-026 | Portal Bridge from Passive to Active Research | Entry | Discovery, Workflow |
| PT-027 | Provider-labeled Research Module | Research | Evidence, Policy |
| PT-028 | Product Family Layer Boundary | Infrastructure | Policy, Entry |
| PT-029 | Professional Workflow Density | Workflow | Workspace, Infrastructure |
| PT-030 | Evidence-preserving Interpretation Layer | Evidence | Information Density, Research |

## Layer Dependency 후보

| Dependency | Related Patterns | Interpretation |
| --- | --- | --- |
| Entry → Discovery | PT-001, PT-002, PT-026 | 사용자는 broad entry에서 entity 또는 content discovery로 이동한다. |
| Discovery → Entity | PT-002, PT-013, PT-022, PT-025 | Search, screener, row grammar가 Entity context를 만든다. |
| Entity → Evidence | PT-012, PT-015, PT-019, PT-020, PT-024 | Entity context 안에서 Source, Document, Methodology를 확인한다. |
| Evidence → Workflow | PT-024, PT-029, PT-030 | Evidence validation 이후 chart, portfolio, export, monitoring으로 확장된다. |
| Workflow → Monitoring | PT-006, PT-010, PT-014, PT-029 | 반복 확인이 Watchlist, Alert, Notification state로 이어진다. |
| Monitoring → Personal Continuity | PT-006, PT-014, PT-016 | saved state가 revisit와 cross-session work를 만든다. |
| Workspace → Context Preservation | PT-011, PT-016, PT-021 | multi-panel 또는 dashboard composition은 context sharing rule을 필요로 한다. |
