# Entity Relationship Definition

## 문서 목적

이 문서는 Canonical Entity 사이의 product relationship을 정의한다.

이 문서는 product-level relationship vocabulary다. persistence, delivery contract, route, visual surface 설계는 작성하지 않는다.

## Relationship Type

| Relationship Type | Definition |
| --- | --- |
| One-to-One | 하나의 source Entity가 하나의 target Entity에 직접 연결되는 관계 |
| One-to-Many | 하나의 source Entity가 여러 target Entity를 가질 수 있는 관계 |
| Many-to-Many | 양쪽 Entity가 서로 여러 relation을 가질 수 있는 관계 |
| Composition | parent Entity 없이 child Entity 의미가 약한 관계 |
| Aggregation | parent Entity가 member Entity를 묶지만 member가 독립성을 유지하는 관계 |
| Reference | source Entity가 target Entity를 참조하는 관계 |
| Dependency | source Entity가 target Entity 없이는 product meaning이 약한 관계 |

## Relationship Summary

| Metric | Count |
| --- | ---: |
| Relationship | 24 |
| Composition | 5 |
| Aggregation | 5 |
| Reference | 8 |
| Dependency | 6 |

## Relationship Matrix

| Relationship ID | Source Entity | Target Entity | Cardinality | Relationship Type | Purpose | Owner | Consumer | Producer | Observer | Boundary | Related Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REL-E-001 | Security | Company | Many-to-Many | Reference | instrument와 business identity 연결 | Entity Architecture | Evidence, Research | Search | User | Security is not Company | AD-004 | DPP-004 | High | multi-listing boundary |
| REL-E-002 | Security | Exchange | Many-to-One | Reference | listing ambiguity reduction | Entity Architecture | Search | Entity Architecture | User | Exchange is not Source | AD-003 | DPP-003 | Medium | exchange code visibility |
| REL-E-003 | Company | Sector | Many-to-One | Aggregation | peer comparison grouping | Discovery Architecture | Entity | Taxonomy candidate | User | Sector is not Theme | AD-002 | DPP-002 | Medium | taxonomy Source |
| REL-E-004 | Market | Sector | One-to-Many | Aggregation | broad Market orientation | Entry Architecture | Discovery | Market context | User | Market is not Exchange | AD-001 | DPP-001 | High | Market scope |
| REL-E-005 | Market | Theme | One-to-Many | Aggregation | topic-level grouping | Discovery Architecture | Entry | Theme context | User | Theme is not Sector | AD-002 | DPP-002 | Medium | theme criteria |
| REL-E-006 | Entity Context | Evidence | One-to-Many | Dependency | Entity 판단에 Evidence 연결 | Evidence Architecture | Workflow, Research | Entity Architecture | User | Evidence owns Source boundary | AD-005 | DPP-005 | High | item-level Traceability |
| REL-E-007 | Evidence | Source | Many-to-One | Dependency | origin and trust boundary | Evidence Architecture | Research, Interpretation | Source | User | Source is not complete Traceability | AD-005 | DPP-005 | High | Source vs provider |
| REL-E-008 | Source | Publisher | Many-to-One | Reference | content responsibility 표시 | Research Architecture | Evidence | Publisher | User | Publisher may not be data Source | AD-013 | DPP-011 | Medium | publisher identity |
| REL-E-009 | Evidence | News | Many-to-One | Reference | News as supporting content | Evidence Architecture | Entity, Workflow | News | User | News is not all Evidence | AD-005 | DPP-005 | Medium | original article path |
| REL-E-010 | Evidence | Report | Many-to-One | Reference | provider research support | Research Architecture | Evidence | Report | User | report needs Source | AD-013 | DPP-011 | Medium | provider method |
| REL-E-011 | Evidence | Event | Many-to-Many | Reference | Event-based context | Evidence Architecture | Calendar | Event | User | Event requires Source relation | AD-014 | DPP-012 | Medium | event validation |
| REL-E-012 | Event | Calendar Event | One-to-One | Composition | date-based representation | Calendar Architecture | Notification | Calendar | User | Calendar Event is not Alert | AD-014 | DPP-012 | Medium | schedule update |
| REL-E-013 | Economic Event | Macro Indicator | Many-to-One | Dependency | macro measurement context | Research Architecture | Evidence | Macro context | User | indicator is not Event | AD-014 | DPP-012 | Medium | revision handling |
| REL-E-014 | Evidence | Timeline | One-to-Many | Composition | Evidence ordering | Evidence Architecture | Context Preservation | Timeline | User | Timeline is not calendar UI | AD-005 | DPP-005 | Medium | ordering basis |
| REL-E-015 | Signal | Evidence | Many-to-One | Dependency | Signal should be source-linked | Monitoring Architecture | Alert | Evidence | User | Signal is not Evidence | AD-008 | DPP-008 | Medium | threshold basis |
| REL-E-016 | Watchlist | Security | Many-to-Many | Aggregation | monitored Entity set | Monitoring Architecture | Personal Continuity | User | User | Watchlist is not Portfolio | AD-008 | DPP-008 | Medium | research state |
| REL-E-017 | Alert | Signal | Many-to-One | Dependency | trigger relation | Notification Architecture | User | Monitoring | User | Alert is not Notification | AD-015 | DPP-012 | Low | payload Source |
| REL-E-018 | Notification | Alert | Many-to-One | Dependency | delivery candidate | Notification Architecture | User | Alert | User | Notification does not own rule | AD-015 | DPP-012 | Low | delivery behavior |
| REL-E-019 | Portfolio | Position | One-to-Many | Composition | holding group | Personal Continuity | Workflow | User | User | Portfolio is not Watchlist | AD-009 | DPP-008 | Medium | holdings Source |
| REL-E-020 | Position | Security | Many-to-One | Reference | exposure target | Personal Continuity | Evidence | Security | User | Position is not Security | AD-009 | DPP-008 | Medium | exposure definition |
| REL-E-021 | Workspace | Context | One-to-Many | Composition | reusable state composition | Workspace Architecture | Workflow | Personal Continuity | User | Workspace does not own truth | AD-011 | DPP-010 | Low | linked context |
| REL-E-022 | User | Watchlist | One-to-Many | Composition | user-owned monitoring | Personal Continuity | Monitoring | User | User | User is not Organization | AD-009 | DPP-008 | Medium | ownership scope |
| REL-E-023 | User | Collection | One-to-Many | Aggregation | saved grouping | Personal Continuity | Discovery | User | User | Collection is not Watchlist | AD-009 | DPP-008 | Medium | collection purpose |
| REL-E-024 | Relationship | Entity | Many-to-Many | Reference | explicit graph relation | Evidence Architecture | Entity, Context | Evidence | User | relation needs Source if trust-bearing | AD-005 | DPP-005 | Medium | relation confidence |

## Relationship Guardrail

Relationship meaning must be explicit.

A visual proximity between two Entities does not create a relationship. Evidence-bearing relationship needs Source or confidence boundary before it influences user judgment.
