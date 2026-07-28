# Information Visibility Model

## 문서 목적

이 문서는 Canonical Information의 Visibility와 Freshness model을 정의한다.

Visibility는 사용자가 Information에 접근할 수 있는 boundary다. Freshness는 Information 갱신 기대 수준이다.

## Visibility Summary

| Metric | Count |
| --- | ---: |
| Visibility Model | 5 |
| Freshness Model | 6 |
| Information Group | 14 |
| Information Object | 29 |

## Visibility Model

| Visibility | Definition | Typical Information | Ownership Boundary | Open Question |
| --- | --- | --- | --- | --- |
| Public | login 없이 볼 수 있는 Information | Market, Security, Company, Evidence cue, News, Calendar candidate | Product-owned or Source-bound | Public Evidence depth |
| Authenticated | login 후 user context와 함께 볼 수 있는 Information | Watchlist, Alert candidate, saved context | User-owned or Product-scoped | authentication state boundary |
| Workspace | reusable context 안에서만 의미가 있는 Information | Workspace, Context, linked Collection | User-owned | Workspace restore scope |
| Private | user ownership이 강한 Information | Portfolio, Position, Strategy, User saved state | User-owned | privacy and sharing boundary |
| System | access, delivery, ownership boundary Information | Organization, Notification, access cue | Product-owned or Organization-owned | permission model |

## Freshness Model

| Freshness | Definition | Typical Information | Risk |
| --- | --- | --- | --- |
| Real-time | immediate update expectation | live Signal candidate | Source and delivery validation 필요 |
| Near Real-time | short-delay update expectation | Market, Security, Monitoring cue | delay labeling 필요 |
| Daily | daily or periodic update expectation | Company, Sector, Report candidate | stale context 표시 필요 |
| Event Driven | Event or Source update에 따라 갱신 | Evidence, News, Calendar Event, Alert | trigger Source 필요 |
| On Demand | user request or context opening 시 갱신 | Research, Workspace, Context | user가 stale state를 오인할 수 있음 |
| Manual | user action으로 갱신 | Portfolio, Position, Strategy, Collection | user ownership boundary 필요 |

## Group Visibility Matrix

| Information Group | Default Visibility | Secondary Visibility | Freshness | Owner | Consumer | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Market Information | Public | Authenticated | Near Real-time | Product-owned | Entry, Discovery | AD-001 | DPP-001 | Medium | delay and Source cue |
| Security Information | Public | Authenticated | Near Real-time | Product-owned | Entity, Evidence | AD-004 | DPP-004 | High | exchange ambiguity |
| Company Information | Public | Authenticated | Daily / Event Driven | Product-owned | Research, Evidence | AD-004 | DPP-004 | High | company identifier |
| Evidence Information | Public | Authenticated | Event Driven | Product-owned with Source boundary | Entity, Workflow | AD-005 | DPP-005 | Medium | Traceability depth |
| Research Information | Public | Authenticated | Daily / On Demand | Provider-labeled | Evidence | AD-013 | DPP-011 | Medium | provider method visibility |
| Calendar Information | Public | Authenticated | Event Driven | Product-owned with Source boundary | Discovery, Monitoring | AD-014 | DPP-012 | Low | Event relation |
| Macro Information | Public | Authenticated | Daily / Event Driven | Source-bound | Market, Evidence | AD-013 | DPP-005 | Medium | revision handling |
| Monitoring Information | Authenticated | Private | Near Real-time / Event Driven | User-owned | Personal Continuity | AD-008 | DPP-008 | Medium | Watchlist state owner |
| Portfolio Information | Private | Workspace | Manual / On Demand | User-owned | Workflow, Evidence | AD-009 | DPP-008 | Medium | holdings Source |
| Workspace Information | Workspace | Private | Manual / On Demand | User-owned | Workflow | AD-011 | DPP-010 | Low | Workspace restore |
| Strategy Information | Private | Workspace | Manual / On Demand | User-owned | Workflow | AD-007 | DPP-007 | Low | Strategy scope |
| Personal Information | Private | System | Manual / On Demand | User-owned | Monitoring, Workspace | AD-009 | DPP-008 | Medium | User and Organization boundary |
| Community Information | Public | Authenticated | Event Driven | User-contributed | Evidence, Entity | AD-012 | DPP-011 | Medium | moderation boundary |
| System Information | System | Private | Event Driven / On Demand | Product-owned or Organization-owned | Notification, Personal Continuity | AD-015 | DPP-012 | Low | payload and permission boundary |

## Information Visibility Guardrail

Visibility is not entitlement implementation.

Freshness is not a data feed specification. It only defines the user-facing expectation that later Architecture must preserve.
