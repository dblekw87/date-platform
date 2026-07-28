# Information Flow

## 문서 목적

이 문서는 Canonical Information의 input, processing, output, dependency를 정의한다.

Information Flow는 사용자 판단에 필요한 meaning transition이다. access-path, presentation, delivery contract를 정의하지 않는다.

## Flow Summary

| Metric | Count |
| --- | ---: |
| Information Flow | 14 |
| Information Dependency | 22 |
| Core Dependency Chain | 8 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Primary Information Dependency

```mermaid
flowchart LR
    Market["Market Information"] --> Security["Security Information"]
    Security --> Company["Company Information"]
    Company --> Evidence["Evidence Information"]
    Evidence --> Event["Event Information"]
    Event --> Timeline["Timeline Information"]
    Timeline --> Workspace["Workspace Information"]
    Workspace --> Portfolio["Portfolio Information"]
```

이 diagram은 Information dependency를 설명한다. access-path or presentation sequence를 의미하지 않는다.

## Information Flow Matrix

| Flow ID | Information Flow | Input | Processing | Output | Required Context | Consumer | Producer | Visibility | Freshness | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IF-001 | Market Flow | Market, Event cue | broad context framing | Market summary | Market | Entry, Discovery | Product context | Public | Near Real-time | AD-001 | DPP-001 | Medium | Market scope |
| IF-002 | Security Flow | query or candidate row | Entity resolution | Security context | Market, Security | Entity, Evidence | Search / Entity Architecture | Public / Authenticated | Near Real-time | AD-003, AD-004 | DPP-003, DPP-004 | High | ambiguity handling |
| IF-003 | Company Flow | Security or company reference | business identity mapping | Company context | Company | Research, Evidence | Entity Architecture | Public | Daily / Event Driven | AD-004 | DPP-004 | High | multi-security mapping |
| IF-004 | Evidence Flow | Entity, News, Report, Source cue | Source and Freshness boundary | Evidence context | Evidence, Source | Entity, Workflow, Research | Evidence Architecture | Public / Authenticated | Event Driven | AD-005 | DPP-005 | Medium | complete Traceability |
| IF-005 | Interpretation Flow | Evidence, article, translation candidate | boundary-labeled compression | interpretation context | Evidence, Source | Research, Evidence | Interpretation Layer | Public / Authenticated | On Demand | AD-006 | DPP-006 | Low | methodology and update time |
| IF-006 | Research Flow | Report, provider label | provider boundary grouping | Research context | Report, Source | Evidence, Entity | Research Architecture | Public / Authenticated | Daily / On Demand | AD-013 | DPP-011 | Medium | provider method |
| IF-007 | Calendar Flow | Event, date, macro cue | time context grouping | Calendar context | Event | Discovery, Monitoring | Calendar Architecture | Public / Authenticated | Event Driven | AD-014 | DPP-012 | Low | Event Source relation |
| IF-008 | Macro Flow | Macro Indicator, Economic Event | macro context alignment | Macro Information | Source, Macro Indicator | Market, Evidence | Research Architecture | Public | Daily / Event Driven | AD-013, AD-014 | DPP-005, DPP-012 | Medium | revision handling |
| IF-009 | Monitoring Flow | Security, Watchlist, Signal | observed state grouping | Monitoring context | User, Security | Personal Continuity, Notification | Monitoring Architecture | Authenticated / Private | Near Real-time / Event Driven | AD-008 | DPP-008 | Medium | research state |
| IF-010 | Notification Flow | Alert, Signal | trigger boundary framing | notification Information | Alert, Signal | User | Notification Architecture | Private / System | Event Driven | AD-015 | DPP-012 | Low | payload Source |
| IF-011 | Workspace Flow | Context, saved state, Entity | composition boundary framing | Workspace Information | User, Context | Workflow | Workspace Architecture | Workspace / Private | Manual / On Demand | AD-011 | DPP-010 | Low | Workspace truth boundary |
| IF-012 | Portfolio Flow | Portfolio, Position, Security | exposure context grouping | Portfolio Information | User, Position | Workflow, Evidence | Personal Continuity | Private | Manual / On Demand | AD-009 | DPP-008 | Medium | holdings Source |
| IF-013 | Strategy Flow | User rule candidate, Evidence | reasoning frame grouping | Strategy Information | User, Evidence | Workflow | Workflow Architecture | Private | Manual / On Demand | AD-007 | DPP-007 | Low | Strategy scope |
| IF-014 | Community Flow | User, News, Tag | opinion boundary separation | Community Information | User, News | Evidence, Entity | Community Architecture | Public / Authenticated | Event Driven | AD-012 | DPP-011 | Medium | moderation boundary |

## Information Dependency Matrix

| Dependency ID | From Information | To Information | Dependency Type | Required / Optional | Purpose | Boundary |
| --- | --- | --- | --- | --- | --- | --- |
| IDP-001 | Market Information | Security Information | Dependency | Required | candidate universe 제공 | Market is not Security |
| IDP-002 | Security Information | Company Information | Reference | Optional | business context 제공 | Security is not Company |
| IDP-003 | Security Information | Evidence Information | Dependency | Required | 판단 context 제공 | Evidence owns Source boundary |
| IDP-004 | Evidence Information | Source Information | Dependency | Required | origin cue 제공 | Source is not complete Traceability |
| IDP-005 | Source Information | Publisher Information | Reference | Optional | content responsibility 구분 | Publisher may differ from Source |
| IDP-006 | Evidence Information | News Information | Reference | Optional | article context 제공 | News is not Report |
| IDP-007 | Evidence Information | Report Information | Reference | Optional | provider research context 제공 | Report requires Source |
| IDP-008 | Evidence Information | Timeline Information | Composition | Required | Evidence ordering 제공 | Timeline is not date product |
| IDP-009 | Evidence Information | Relationship Information | Reference | Optional | relation meaning 제공 | relation needs Source if trust-bearing |
| IDP-010 | Event Information | Calendar Information | Composition | Optional | date context 제공 | Calendar Event is not Alert |
| IDP-011 | Macro Information | Calendar Information | Reference | Optional | macro timing context 제공 | Macro Indicator is not Event |
| IDP-012 | Monitoring Information | Security Information | Aggregation | Required | observed Entity set 제공 | Watchlist is not Portfolio |
| IDP-013 | Monitoring Information | Signal Information | Dependency | Optional | trigger candidate 제공 | Signal needs Evidence |
| IDP-014 | Notification Information | Monitoring Information | Dependency | Required | delivery trigger context 제공 | Notification does not own rule |
| IDP-015 | Personal Information | Watchlist Information | Composition | Required | user-owned monitoring state 제공 | Watchlist is not all Personal Continuity |
| IDP-016 | Personal Information | Collection Information | Aggregation | Optional | saved grouping 제공 | Collection is not Watchlist |
| IDP-017 | Workspace Information | Context Information | Composition | Optional | reusable handoff context 제공 | Workspace does not own truth |
| IDP-018 | Portfolio Information | Position Information | Composition | Optional | exposure grouping 제공 | Position is not Security |
| IDP-019 | Position Information | Security Information | Reference | Required | exposure target 제공 | Position does not define Security |
| IDP-020 | Strategy Information | Evidence Information | Dependency | Optional | reasoning support 제공 | Strategy is not recommendation |
| IDP-021 | Community Information | Evidence Information | Dependency | Required | opinion boundary 제공 | Reaction is not Evidence |
| IDP-022 | System Information | User Information | Aggregation | Optional | ownership boundary 제공 | Organization is not User |

## Flow Guardrail

Information Flow는 meaning dependency다.

Information Flow does not define access-path order, presentation order, or behavior design.
