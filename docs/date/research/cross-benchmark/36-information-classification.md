# Information Classification

## 문서 목적

이 문서는 Information Object 29개를 classification, ownership, freshness 기준으로 분류한다.

Classification은 product meaning 기준이다. 저장 구조나 화면 구조를 의미하지 않는다.

## Classification Summary

| Information Classification | Count |
| --- | ---: |
| Core Information | 5 |
| Supporting Information | 8 |
| Derived Information | 4 |
| Context Information | 5 |
| Relationship Information | 3 |
| System Information | 4 |
| Total | 29 |

## Information Object Classification Matrix

| Information Object | Classification | Primary Entity | Producer | Consumer | Viewer | Updater | Observer | Information Level | Visibility | Ownership | Update Frequency | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Market Information Object | Core Information | Market | Product context | Entry, Discovery | Public user | Product context | User | Object | Public | Product-owned | Near Real-time | AD-001 | DPP-001 | High | Market scope |
| Security Information Object | Core Information | Security | Entity Architecture | Evidence, Workflow | Public / authenticated user | Product context | User | Object | Public / Authenticated | Product-owned | Near Real-time | AD-004 | DPP-004 | High | Security identity |
| Company Information Object | Core Information | Company | Entity Architecture | Research, Evidence | Public user | Product context | User | Object | Public | Product-owned | Daily / Event Driven | AD-004 | DPP-004 | High | Company-Security mapping |
| Evidence Information Object | Core Information | Evidence | Evidence Architecture | Entity, Workflow | Public / authenticated user | Source context | User | Object | Public / Authenticated | Product-owned | Event Driven | AD-005 | DPP-005 | Medium | complete Traceability |
| User Information Object | Core Information | User | Personal Continuity | Monitoring, Workspace | Private user | User | Product context | Object | Private | User-owned | Manual / On Demand | AD-009 | DPP-008 | Medium | User and Organization boundary |
| Source Information Object | Supporting Information | Source | Evidence Architecture | Evidence, Research | Public user | Source context | User | Object | Public | Source-bound | Event Driven | AD-005 | DPP-005 | High | Source taxonomy |
| Publisher Information Object | Supporting Information | Publisher | Research Architecture | Evidence, Community | Public user | Publisher context | User | Object | Public | Publisher-labeled | Event Driven | AD-013 | DPP-011 | Medium | Publisher vs Source |
| News Information Object | Supporting Information | News | Publisher | Evidence, Community | Public user | Publisher context | User | Object | Public | Publisher-labeled | Event Driven | AD-006 | DPP-006 | Medium | Original Evidence path |
| Report Information Object | Supporting Information | Report | Research Architecture | Evidence | Public / authenticated user | Provider context | User | Object | Public / Authenticated | Provider-labeled | Daily / On Demand | AD-013 | DPP-011 | Medium | provider method visibility |
| Event Information Object | Supporting Information | Event | Calendar Architecture | Evidence, Monitoring | Public user | Source context | User | Object | Public | Product-owned with Source boundary | Event Driven | AD-014 | DPP-012 | Medium | Event Source relation |
| Calendar Event Information Object | Supporting Information | Calendar Event | Calendar Architecture | Notification | Public / authenticated user | Product context | User | Object | Public / Authenticated | Product-owned | Event Driven | AD-014 | DPP-012 | Low | schedule update |
| Economic Event Information Object | Supporting Information | Economic Event | Calendar Architecture | Research | Public user | Source context | User | Object | Public | Source-bound | Event Driven | AD-014 | DPP-012 | Medium | revision time |
| Macro Indicator Information Object | Supporting Information | Macro Indicator | Research Architecture | Evidence | Public user | Source context | User | Object | Public | Source-bound | Daily / Event Driven | AD-013 | DPP-005 | Medium | methodology |
| Exchange Information Object | Context Information | Exchange | Search Architecture | Entity | Public user | Product context | User | Object | Public | Product-owned | Daily / On Demand | AD-003 | DPP-003 | Medium | exchange ambiguity |
| Sector Information Object | Context Information | Sector | Discovery Architecture | Entity | Public user | taxonomy context | User | Object | Public | Product-owned with taxonomy boundary | Daily / On Demand | AD-002 | DPP-002 | Medium | taxonomy Source |
| Theme Information Object | Context Information | Theme | Discovery Architecture | Collection, Search | Public / authenticated user | Product or user context | User | Object | Public / Private | Mixed ownership | Manual / On Demand | AD-002 | DPP-002 | Medium | theme criteria |
| Timeline Information Object | Context Information | Timeline | Evidence Architecture | Context Preservation | Public / authenticated user | Evidence relation | User | Object | Public / Authenticated | Product-owned | Event Driven | AD-005 | DPP-005 | Medium | ordering basis |
| Context Information Object | Context Information | Context | Context Preservation | Workflow, Evidence | Authenticated user | transition handoff | User | Object | Workspace / Private | User-owned or Product-scoped | On Demand | AD-010 | DPP-009 | Medium | restoration scope |
| Relationship Information Object | Relationship Information | Relationship | Evidence Architecture | Entity Architecture | Public / authenticated user | Evidence relation | User | Object | Public / Authenticated | Product-owned with Source boundary | Event Driven | AD-005 | DPP-005 | Medium | relation confidence |
| Collection Information Object | Relationship Information | Collection | Personal Continuity | Discovery | Private user | User | User | Object | Private | User-owned | Manual / On Demand | AD-009 | DPP-008 | Medium | grouping purpose |
| Tag Information Object | Relationship Information | Tag | Discovery Architecture | Search, Collection | Public / private user | User or product context | User | Object | Public / Private | Mixed ownership | Manual / On Demand | AD-002 | DPP-002 | Low | tag ownership |
| Signal Information Object | Derived Information | Signal | Monitoring Architecture | Alert, Timeline | Authenticated user | Evidence or Event context | User | Object | Authenticated / Private | Product-derived | Near Real-time / Event Driven | AD-008 | DPP-008 | Medium | threshold and Source |
| Strategy Information Object | Derived Information | Strategy | Workflow Architecture | Personal Continuity | Private user | User | User | Object | Private | User-owned | Manual / On Demand | AD-007 | DPP-007 | Low | strategy scope |
| Portfolio Information Object | Derived Information | Portfolio | Personal Continuity | Workflow, Evidence | Private user | User | User | Object | Private | User-owned | Manual / On Demand | AD-009 | DPP-008 | Medium | holdings Source |
| Position Information Object | Derived Information | Position | Personal Continuity | Portfolio, Evidence | Private user | User | User | Object | Private | User-owned | Manual / On Demand | AD-009 | DPP-008 | Medium | exposure definition |
| Watchlist Information Object | System Information | Watchlist | Monitoring Architecture | Personal Continuity | Private user | User | User | Object | Private | User-owned | Manual / On Demand | AD-008 | DPP-008 | Medium | research state persistence |
| Workspace Information Object | System Information | Workspace | Workspace Architecture | Workflow | Private user | User | User | Object | Workspace / Private | User-owned | Manual / On Demand | AD-011 | DPP-010 | Low | linked context |
| Alert Information Object | System Information | Alert | Notification Architecture | User | Private user | User | User | Object | Private | User-owned | Event Driven / Manual | AD-015 | DPP-012 | Low | trigger Source |
| Organization Information Object | System Information | Organization | Personal Continuity | Workspace, Portfolio | System / organization user | Organization candidate | User | Object | System | Organization-owned | Manual / On Demand | AD-009 | DPP-008 | Low | permission model |

## Ownership Role Definition

| Ownership Role | Definition |
| --- | --- |
| Producer | Information을 생성하거나 최초 제공하는 owner |
| Consumer | Information을 다음 판단이나 Domain에서 사용하는 actor |
| Viewer | Information을 읽는 actor |
| Updater | Information state를 갱신하는 actor |
| Observer | Information 변화나 state를 보는 actor |

## Classification Guardrail

Classification은 Information responsibility를 구분하기 위한 것이다.

Classification은 implementation grouping, access-path grouping, presentation grouping을 의미하지 않는다.
