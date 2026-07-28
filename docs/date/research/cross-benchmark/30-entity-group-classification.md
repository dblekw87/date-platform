# Entity Group Classification

## 문서 목적

이 문서는 Canonical Entity를 group과 layer 기준으로 분류한다.

이 문서는 implementation grouping이 아니다. Product responsibility를 분리하기 위한 classification이다.

## Entity Group Summary

| Entity Group | Count |
| --- | ---: |
| Core Entity | 5 |
| Supporting Entity | 8 |
| Context Entity | 5 |
| Relationship Entity | 3 |
| Derived Entity | 4 |
| System Entity | 4 |
| Total | 29 |

## Entity Group Matrix

| Entity Group | Entities | Responsibility |
| --- | --- | --- |
| Core Entity | Security, Company, Evidence, Market, User | product 판단과 ownership의 중심이다. |
| Supporting Entity | Source, Publisher, News, Report, Event, Calendar Event, Economic Event, Macro Indicator | Core Entity의 Evidence, time, content context를 보완한다. |
| Context Entity | Exchange, Sector, Theme, Timeline, Context | Entity selection, grouping, transition continuity를 지원한다. |
| Relationship Entity | Relationship, Tag, Collection | Entity 간 relation과 grouping semantics를 제공한다. |
| Derived Entity | Signal, Strategy, Portfolio, Position | Evidence, user intent, ownership에서 파생되는 판단 context다. |
| System Entity | Watchlist, Workspace, Alert, Organization | user state, composition, trigger, group ownership boundary를 다룬다. |

## Entity Layer Summary

| Entity Layer | Count |
| --- | ---: |
| Core | 5 |
| Evidence | 7 |
| Workflow | 3 |
| Monitoring | 3 |
| Personal | 5 |
| Infrastructure | 2 |
| Context | 4 |
| Total | 29 |

## Entity Layer Matrix

| Entity | Entity Group | Entity Layer | Primary Domain | Secondary Domain | Related Principle |
| --- | --- | --- | --- | --- | --- |
| Security | Core Entity | Core | AD-004 | AD-003, AD-005 | DPP-004 |
| Company | Core Entity | Core | AD-004 | AD-002 | DPP-004 |
| Evidence | Core Entity | Evidence | AD-005 | AD-010 | DPP-005 |
| Market | Core Entity | Core | AD-001 | AD-002 | DPP-001 |
| User | Core Entity | Personal | AD-009 | AD-008 | DPP-008 |
| Source | Supporting Entity | Evidence | AD-005 | AD-013 | DPP-005 |
| Publisher | Supporting Entity | Evidence | AD-013 | AD-005 | DPP-011 |
| News | Supporting Entity | Evidence | AD-006 | AD-012 | DPP-006 |
| Report | Supporting Entity | Evidence | AD-013 | AD-005 | DPP-011 |
| Event | Supporting Entity | Context | AD-014 | AD-005 | DPP-012 |
| Calendar Event | Supporting Entity | Context | AD-014 | AD-015 | DPP-012 |
| Economic Event | Supporting Entity | Context | AD-014 | AD-013 | DPP-012 |
| Macro Indicator | Supporting Entity | Evidence | AD-013 | AD-005 | DPP-005 |
| Exchange | Context Entity | Infrastructure | AD-003 | AD-004 | DPP-003 |
| Sector | Context Entity | Core | AD-002 | AD-004 | DPP-002 |
| Theme | Context Entity | Context | AD-002 | AD-009 | DPP-002 |
| Timeline | Context Entity | Evidence | AD-005 | AD-010 | DPP-005 |
| Context | Context Entity | Context | AD-010 | AD-011 | DPP-009 |
| Relationship | Relationship Entity | Evidence | AD-005 | AD-010 | DPP-005 |
| Tag | Relationship Entity | Personal | AD-002 | AD-009 | DPP-002 |
| Collection | Relationship Entity | Personal | AD-009 | AD-002 | DPP-008 |
| Signal | Derived Entity | Monitoring | AD-008 | AD-015 | DPP-008 |
| Strategy | Derived Entity | Workflow | AD-007 | AD-009 | DPP-007 |
| Portfolio | Derived Entity | Personal | AD-009 | AD-007 | DPP-008 |
| Position | Derived Entity | Personal | AD-009 | AD-005 | DPP-008 |
| Watchlist | System Entity | Monitoring | AD-008 | AD-009 | DPP-008 |
| Workspace | System Entity | Workflow | AD-011 | AD-010 | DPP-010 |
| Alert | System Entity | Monitoring | AD-015 | AD-008 | DPP-012 |
| Organization | System Entity | Infrastructure | AD-009 | AD-011 | DPP-008 |

## Classification Guardrail

Entity Group does not define storage shape.

Group classification only indicates product responsibility and architecture alignment.
