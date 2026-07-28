# Navigation Patterns

## 문서 목적

이 문서는 DATE Canonical Navigation Pattern을 정의한다.

Pattern은 visual element가 아니라 Information 이동 규칙이다.

## Pattern Summary

| Metric | Count |
| --- | ---: |
| Navigation Pattern | 9 |
| Navigation Group | 9 |
| Navigation Hierarchy Level | 4 |
| Navigation Node | 29 |

## Navigation Pattern Matrix

| Pattern | Definition | Primary Information | Required Context | Primary Action | Secondary Action | Owner | Consumer | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global Navigation | product-level direction selection rule | Market Information | Market | choose direction | inspect summary | Entry Navigation | Discovery, Search | AD-001 | DPP-001 | Medium | public vs authenticated direction |
| Local Navigation | selected Entity 안의 local Information movement | Security Information | selected Entity | focus local Information | compare local mode | Entity Navigation | Evidence, Research | AD-004 | DPP-004 | High | Stock / Company / Security boundary |
| Context Navigation | origin context를 유지하는 movement | Context Information | origin reference | preserve context | return to origin | Context Preservation | Workflow, Workspace | AD-010 | DPP-009 | Medium | restoration scope |
| Relationship Navigation | Entity relation을 따라 이동하는 rule | Relationship Information | Entity pair | inspect relation | compare related Entity | Evidence Navigation | Entity, Discovery | AD-005 | DPP-005 | Medium | relation confidence |
| Evidence Navigation | Source and Freshness boundary movement | Evidence Information | Evidence, Source | inspect Evidence | follow Original Evidence candidate | Evidence Architecture | Research, Entity | AD-005 | DPP-005 | Medium | complete Traceability |
| Workspace Navigation | reusable context movement | Workspace Information | User, Context | restore context candidate | compose saved context | Workspace Architecture | Workflow | AD-011 | DPP-010 | Low | Workspace boundary |
| Monitoring Navigation | observed state movement | Monitoring Information | User, Security | monitor Entity | inspect trigger | Monitoring Architecture | Personal, Notification | AD-008 | DPP-008 | Medium | Watchlist state |
| History Navigation | revisit origin and prior context movement | Personal Information | User, Context | revisit saved context | inspect prior context | Personal Continuity | Workspace, Monitoring | AD-009 | DPP-008 | Medium | history ownership |
| Search Navigation | known intent resolution movement | Search Information | query | resolve intent | disambiguate | Search Architecture | Entity, Workflow | AD-003 | DPP-003 | Medium | result grouping |

## Navigation Hierarchy

| Level | Name | Definition | Example |
| --- | --- | --- | --- |
| Level 1 | Global Domain | broad Product direction | Entry, Discovery, Search |
| Level 2 | Navigation Group | related Information movement set | Evidence Navigation |
| Level 3 | Navigation Node | Information Object that can be entered or handed off | Security Information Object |
| Level 4 | Navigation Action | Information movement intent | inspect Evidence |

## Navigation Group Matrix

| Navigation Group | Navigation Pattern | Navigation Node | Primary Action | Boundary |
| --- | --- | --- | --- | --- |
| Entry Group | Global Navigation | Market, Signal, News | choose direction | not deep validation |
| Discovery Group | Global Navigation, Relationship Navigation | Market, Sector, Theme, Security | narrow candidates | not final judgment |
| Search Group | Search Navigation | Security, Company, Report | resolve intent | not full workflow execution |
| Entity Group | Local Navigation | Security, Company, Exchange | focus Entity | not Source truth |
| Evidence Group | Evidence Navigation, Relationship Navigation | Evidence, Source, Publisher, Timeline | inspect Evidence | not opinion |
| Workflow Group | Context Navigation | Strategy, Context, Workspace | carry context | not persistence owner |
| Monitoring Group | Monitoring Navigation | Watchlist, Signal, Alert | monitor Entity | not delivery payload |
| Personal Group | History Navigation | User, Portfolio, Collection | revisit context | not Source truth |
| Community Group | Relationship Navigation | User, Tag, News | inspect opinion boundary | not Evidence creation |

## Pattern Guardrail

Navigation Pattern is not a visual pattern.

It defines how Information should hand off meaning and context.
