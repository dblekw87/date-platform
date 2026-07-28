# Information Group Definition

## 문서 목적

이 문서는 Canonical Entity 29개를 사용자 Information Group으로 재구성한다.

새 Entity는 만들지 않는다. Information Group은 Entity를 사용자 이해 단위로 묶은 것이다.

## Information Group Summary

| Metric | Count |
| --- | ---: |
| Information Group | 14 |
| Information Object | 29 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Information Group Matrix

| Information Name | Definition | Purpose | Primary Entity | Supporting Entity | Input | Output | Consumer | Producer | Information Level | Visibility | Ownership | Update Frequency | Required Context | Optional Context | Dependencies | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Market Information | broad Market orientation Information | first 판단 범위와 candidate universe 제공 | Market | Sector, Theme, Event | Market context, Event cue | Market summary context | Entry, Discovery | Market context | Level 2 Group | Public | Product-owned | Near Real-time | Market | Exchange | None | AD-001, AD-002 | DPP-001, DPP-002 | High | Market scope boundary |
| Security Information | identifiable financial instrument Information | selected target context 제공 | Security | Exchange, Company, Sector | resolved Security, Market | Security context, local analysis context | Entity, Evidence, Monitoring | Entity Architecture | Level 2 Group | Public / Authenticated | Product-owned with user context | Near Real-time | Security | Company, Exchange | Market Information | AD-003, AD-004 | DPP-003, DPP-004 | High | Security와 Company boundary |
| Company Information | business identity Information | Security를 business context로 보완 | Company | Sector, News, Report, Event | Company reference | company context | Research, Evidence, Discovery | Entity Architecture | Level 2 Group | Public | Product-owned | Daily / Event Driven | Company | Security | Security Information | AD-004 | DPP-004 | High | multi-security company handling |
| Evidence Information | judgment-supporting Information | Source and Freshness boundary 제공 | Evidence | Source, Publisher, Timeline | Entity context, Source cue | Evidence context | Entity, Workflow, Research | Evidence Architecture | Level 2 Group | Public / Authenticated | Product-owned | Event Driven | Evidence, Source | Publisher, Method | Security Information | AD-005 | DPP-005 | Medium | complete Traceability scope |
| Research Information | provider-labeled research Information | Report and provider boundary 제공 | Report | Publisher, Source, Macro Indicator | Report reference, provider label | research context | Evidence, Entity | Research Architecture | Level 2 Group | Public / Authenticated | Provider-labeled | Daily / On Demand | Report, Source | Publisher | Evidence Information | AD-013 | DPP-011 | Medium | provider method visibility |
| Calendar Information | time-based Event Information | Event를 time context로 재구성 | Event | Calendar Event, Economic Event, Macro Indicator | date, Event candidate | time context | Discovery, Monitoring | Calendar Architecture | Level 2 Group | Public / Authenticated | Product-owned | Event Driven | Event | Calendar Event | Market Information | AD-014 | DPP-012 | Low | Event relation and Source |
| Macro Information | macro context Information | Market and Economic Event context 제공 | Macro Indicator | Economic Event, Source | macro indicator cue | macro context | Market, Research, Evidence | Research Architecture | Level 2 Group | Public | Source-bound | Daily / Event Driven | Macro Indicator | Economic Event | Calendar Information | AD-013, AD-014 | DPP-005, DPP-012 | Medium | revision and methodology |
| Monitoring Information | observed set and trigger Information | 반복 Observation과 trigger 판단 제공 | Watchlist | Signal, Alert, Security | user watch action, Signal | monitoring context | Personal Continuity, Notification | Monitoring Architecture | Level 2 Group | Authenticated / Private | User-owned | Near Real-time / Event Driven | User, Security | Signal, Alert | Security Information | AD-008 | DPP-008 | Medium | Watchlist research state |
| Portfolio Information | user-owned exposure Information | holdings and exposure context 제공 | Portfolio | Position, Security, Evidence | user position context | exposure context | Workflow, Evidence | Personal Continuity | Level 2 Group | Private | User-owned | Manual / On Demand | User, Position | Evidence | Security Information | AD-009 | DPP-008 | Medium | Portfolio vs Watchlist |
| Workspace Information | reusable composition Information | repeated research context 보존 | Workspace | Context, Collection, Watchlist | saved state, Entity context | workspace context | Workflow, Personal Continuity | Workspace Architecture | Level 2 Group | Workspace / Private | User-owned | Manual / On Demand | User, Context | Collection | Context Information | AD-011 | DPP-010 | Low | Workspace truth boundary |
| Strategy Information | user-defined reasoning Information | repeated task frame 제공 | Strategy | Signal, Collection, Evidence | user rule candidate, Evidence | strategy context | Workflow, Personal Continuity | Workflow Architecture | Level 2 Group | Private | User-owned | Manual / On Demand | User | Evidence, Signal | Evidence Information | AD-007 | DPP-007 | Low | Strategy scope |
| Personal Information | user ownership and saved intent Information | continuity ownership 구분 | User | Organization, Collection, Tag | user action, save intent | owner context | Monitoring, Workspace | Personal Continuity | Level 2 Group | Private / System | User-owned | Manual / On Demand | User | Organization | None | AD-009 | DPP-008 | Medium | user vs organization state |
| Community Information | opinion boundary Information | opinion과 Evidence 혼동 방지 | User | News, Publisher, Tag | participation cue, News context | opinion boundary context | Evidence, Entity | Community Architecture | Level 2 Group | Public / Authenticated | User-contributed | Event Driven | User, News | Tag, Publisher | Evidence Information | AD-012 | DPP-011 | Medium | Community moderation boundary |
| System Information | access and delivery boundary Information | access, ownership, delivery state 구분 | Organization | Alert, User, Exchange | access context, delivery candidate | system boundary context | Notification, Personal Continuity | Notification / Infrastructure context | Level 2 Group | System | Product-owned | Event Driven / On Demand | User | Organization, Alert | Monitoring Information | AD-015 | DPP-012 | Low | entitlement and payload boundary |

## Group Guardrail

Information Group은 Entity를 사용자 meaning 단위로 재구성한다.

Information Group은 access-path나 presentation을 의미하지 않는다.
