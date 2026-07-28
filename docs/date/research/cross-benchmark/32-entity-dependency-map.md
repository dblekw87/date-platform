# Entity Dependency Map

## 문서 목적

이 문서는 Canonical Entity 간 dependency를 product architecture 관점에서 정리한다.

이 문서는 product-level dependency map이다. persistence, delivery contract, route, visual surface 설계는 작성하지 않는다.

## Primary Entity Dependency

```mermaid
flowchart LR
    Security["Security"] --> Company["Company"]
    Company --> Evidence["Evidence"]
    Evidence --> Event["Event"]
    Event --> Timeline["Timeline"]
    Timeline --> Monitoring["Watchlist / Alert"]
    Monitoring --> Workspace["Workspace"]
    Workspace --> Portfolio["Portfolio"]
```

위 Flow는 product dependency 후보이며 implementation order가 아니다.

## Dependency Summary

| Metric | Count |
| --- | ---: |
| Entity Dependency | 22 |
| Core Layer Dependency | 5 |
| Evidence Layer Dependency | 6 |
| Workflow Layer Dependency | 3 |
| Monitoring Layer Dependency | 3 |
| Personal Layer Dependency | 3 |
| Infrastructure Layer Dependency | 2 |

## Dependency Matrix

| Dependency ID | From Entity | To Entity | Dependency Type | Required / Optional | Layer | Purpose | Boundary | Related Domain | Related Principle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ED-001 | Security | Company | Reference | Required | Core | instrument and business context 연결 | Security is not Company | AD-004 | DPP-004 |
| ED-002 | Security | Exchange | Reference | Optional | Infrastructure | listing ambiguity reduction | Exchange is not Source | AD-003 | DPP-003 |
| ED-003 | Company | Sector | Aggregation | Optional | Core | peer grouping | Sector is not Theme | AD-002 | DPP-002 |
| ED-004 | Market | Security | Aggregation | Required | Core | Market orientation to Entity | Market is broad context | AD-001 | DPP-001 |
| ED-005 | Market | Theme | Aggregation | Optional | Core | cross-Entity topic context | Theme criteria open | AD-002 | DPP-002 |
| ED-006 | Security | Evidence | Dependency | Required | Evidence | trust context for Entity | Evidence owns Source boundary | AD-005 | DPP-005 |
| ED-007 | Evidence | Source | Dependency | Required | Evidence | origin cue | Source is not full Traceability | AD-005 | DPP-005 |
| ED-008 | Source | Publisher | Reference | Optional | Evidence | content responsibility | Publisher can differ from Source | AD-013 | DPP-011 |
| ED-009 | Evidence | News | Reference | Optional | Evidence | article context | News is not Report | AD-006 | DPP-006 |
| ED-010 | Evidence | Report | Reference | Optional | Evidence | research context | Report requires Source | AD-013 | DPP-011 |
| ED-011 | Evidence | Timeline | Composition | Required | Evidence | time ordering | Timeline is not calendar UI | AD-005 | DPP-005 |
| ED-012 | Event | Calendar Event | Composition | Optional | Context | date representation | Calendar Event is not Alert | AD-014 | DPP-012 |
| ED-013 | Economic Event | Macro Indicator | Dependency | Optional | Evidence | macro context | indicator is not Event | AD-014 | DPP-012 |
| ED-014 | Signal | Evidence | Dependency | Required | Monitoring | Signal trust anchor | Signal is not Evidence | AD-008 | DPP-008 |
| ED-015 | Watchlist | Security | Aggregation | Required | Monitoring | monitored Entity set | Watchlist is not Portfolio | AD-008 | DPP-008 |
| ED-016 | Alert | Signal | Dependency | Required | Monitoring | trigger relation | Alert is not Notification | AD-015 | DPP-012 |
| ED-017 | Notification | Alert | Dependency | Optional | Monitoring | delivery candidate | Notification does not own rule | AD-015 | DPP-012 |
| ED-018 | Portfolio | Position | Composition | Optional | Personal | exposure grouping | Portfolio is not Watchlist | AD-009 | DPP-008 |
| ED-019 | Position | Security | Reference | Required | Personal | exposure target | Position is not Security | AD-009 | DPP-008 |
| ED-020 | Workspace | Context | Composition | Optional | Workflow | reusable composition | Workspace does not own truth | AD-011 | DPP-010 |
| ED-021 | User | Watchlist | Composition | Required | Personal | ownership | User is not Organization | AD-009 | DPP-008 |
| ED-022 | Organization | User | Aggregation | Optional | Infrastructure | group ownership context | Organization is not User | AD-009 | DPP-008 |

## Ownership Matrix

| Entity | Owner | Consumer | Producer | Observer |
| --- | --- | --- | --- | --- |
| Security | Entity Architecture | Evidence, Workflow | Search, Discovery | User |
| Company | Entity Architecture | Discovery, Research | Entity Architecture | User |
| Evidence | Evidence Architecture | Entity, Workflow, Research | Source / content context | User |
| Source | Evidence Architecture | Research, Interpretation | Source context | User |
| Publisher | Research Architecture | Evidence | content context | User |
| News | Interpretation Layer | Evidence, Community | Publisher | User |
| Report | Research Architecture | Evidence | Publisher / provider | User |
| Event | Calendar Architecture | Evidence, Monitoring | Source / Evidence | User |
| Calendar Event | Calendar Architecture | Notification | Calendar context | User |
| Economic Event | Calendar Architecture | Research | Macro context | User |
| Macro Indicator | Research Architecture | Evidence | Source | User |
| Market | Entry Architecture | Discovery | Market context | User |
| Exchange | Search Architecture | Entity | listing context | User |
| Sector | Discovery Architecture | Entity | taxonomy candidate | User |
| Theme | Discovery Architecture | Collection, Search | user or product context candidate | User |
| Signal | Monitoring Architecture | Alert, Timeline | Evidence or Event | User |
| Timeline | Evidence Architecture | Context Preservation | Evidence / Event relation | User |
| Watchlist | Monitoring Architecture | Personal Continuity | User | User |
| Alert | Notification Architecture | User | Monitoring | User |
| Workspace | Workspace Architecture | Workflow | Personal Continuity | User |
| Portfolio | Personal Continuity | Workflow, Evidence | User | User |
| Position | Personal Continuity | Portfolio, Evidence | User | User |
| Strategy | Workflow Architecture | Personal Continuity | User | User |
| User | Personal Continuity | Monitoring, Workspace | identity context candidate | Organization candidate |
| Organization | Personal Continuity | Workspace, Portfolio | group context candidate | User |
| Context | Context Preservation | Workflow, Evidence | transition handoff | User |
| Relationship | Evidence Architecture | Entity Architecture | Evidence | User |
| Collection | Personal Continuity | Discovery | User | User |
| Tag | Discovery Architecture | Search, Collection | User or system candidate | User |

## Dependency Guardrail

Entity dependency is not storage dependency.

Dependency only means one Entity needs another Entity to carry product meaning in DATE's architecture.
