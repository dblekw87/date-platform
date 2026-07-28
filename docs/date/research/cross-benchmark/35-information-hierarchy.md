# Information Hierarchy

## 문서 목적

이 문서는 DATE Information을 hierarchy 기준으로 정의한다.

Hierarchy는 사용자에게 전달되는 Information의 의미 계층이다. access-path와 presentation은 정의하지 않는다.

## Hierarchy Summary

| Metric | Count |
| --- | ---: |
| Information Hierarchy Level | 4 |
| Product Domain | 1 |
| Information Group | 14 |
| Information Object | 29 |
| Information Component Type | 12 |

## Hierarchy Level

| Level | Name | Definition | Example |
| --- | --- | --- | --- |
| Level 1 | Product Domain | DATE 전체 판단 context | DATE Investment Evidence Product |
| Level 2 | Information Group | Entity를 사용자 task 기준으로 묶은 Information | Evidence Information |
| Level 3 | Information Object | Canonical Entity에 대응되는 사용자 Information | Source Information |
| Level 4 | Information Component | Information Object를 구성하는 전달 단위 | Source label, Freshness cue |

## Information Hierarchy Matrix

| Level 2 Information Group | Level 3 Information Object | Level 4 Information Component | Information Layer | Required Context | Related Principle |
| --- | --- | --- | --- | --- | --- |
| Market Information | Market | Market frame, asset class cue, summary context | Overview | Market | DPP-001 |
| Market Information | Sector | sector label, membership cue | Relationship | Market | DPP-002 |
| Market Information | Theme | theme label, member relation cue | Relationship | Market | DPP-002 |
| Security Information | Security | identifier, selected context, local mode cue | Context | Market | DPP-004 |
| Security Information | Exchange | venue label, ambiguity cue | Context | Security | DPP-003 |
| Company Information | Company | business identity, profile cue, sector relation | Context | Security | DPP-004 |
| Evidence Information | Evidence | Source cue, Freshness cue, boundary label | Evidence | Entity | DPP-005 |
| Evidence Information | Source | origin label, provider type cue | Evidence | Evidence | DPP-005 |
| Evidence Information | Publisher | publisher label, responsibility cue | Evidence | Source | DPP-011 |
| Evidence Information | Timeline | ordered context, time relation | Timeline | Evidence | DPP-005 |
| Evidence Information | Relationship | relation type, confidence cue | Relationship | Entity | DPP-005 |
| Research Information | News | headline, article reference, timestamp cue | Summary | Publisher | DPP-006 |
| Research Information | Report | provider label, document reference, method cue | Evidence | Source | DPP-011 |
| Calendar Information | Event | event type, affected Entity cue | Timeline | Evidence | DPP-012 |
| Calendar Information | Calendar Event | date, time, schedule cue | Timeline | Event | DPP-012 |
| Macro Information | Economic Event | macro event name, release timing | Timeline | Market | DPP-012 |
| Macro Information | Macro Indicator | period, unit, revision cue | Evidence | Source | DPP-005 |
| Monitoring Information | Watchlist | monitored Entity set, owner cue | Monitoring | User | DPP-008 |
| Monitoring Information | Signal | change cue, related Evidence cue | Monitoring | Evidence | DPP-008 |
| System Information | Alert | trigger condition cue, target Entity | System | User | DPP-012 |
| System Information | Notification | delivery state, trigger reference | System | Alert | DPP-012 |
| Workspace Information | Workspace | composition context, referenced Entity | Personal | User | DPP-010 |
| Workspace Information | Context | origin reference, selected Entity, handoff cue | Context | Entity | DPP-009 |
| Portfolio Information | Portfolio | exposure group, owner relation | Personal | User | DPP-008 |
| Portfolio Information | Position | exposure target, Security relation | Personal | Portfolio | DPP-008 |
| Strategy Information | Strategy | user-defined reasoning frame | Personal | User | DPP-007 |
| Personal Information | User | ownership state, profile reference | Personal | None | DPP-008 |
| Personal Information | Organization | group ownership, permission context candidate | System | User | DPP-008 |
| Personal Information | Collection | saved grouping, purpose label | Personal | User | DPP-008 |
| Personal Information | Tag | lightweight classification marker | Relationship | Entity | DPP-002 |

## Component Type

| Component Type | Purpose |
| --- | --- |
| Identity Cue | Information Object의 식별 기준을 전달한다. |
| Source Cue | Source or Publisher boundary를 전달한다. |
| Freshness Cue | time and update context를 전달한다. |
| Boundary Label | Evidence, Interpretation, Opinion 경계를 표시한다. |
| Relation Cue | Entity 간 relation meaning을 전달한다. |
| Ownership Cue | User, Organization, Product ownership을 구분한다. |
| State Cue | Observed, Updated, Linked 같은 state를 전달한다. |
| Trigger Cue | Signal, Alert, Notification의 origin을 전달한다. |
| Time Cue | Event, Calendar, Timeline context를 전달한다. |
| Grouping Cue | Sector, Theme, Collection, Tag grouping을 전달한다. |
| Method Cue | method or methodology availability를 전달한다. |
| Access Cue | visibility and access boundary를 전달한다. |

## Hierarchy Guardrail

Hierarchy는 Information meaning order다.

Hierarchy는 access-path depth or presentation order를 결정하지 않는다.
