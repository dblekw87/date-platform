# Navigation Context Preservation

## 문서 목적

이 문서는 Navigation 중 보존해야 하는 Context와 잃을 수 있는 Context를 정의한다.

Context Preservation은 Information handoff contract다. visual behavior를 정의하지 않는다.

## Context Summary

| Metric | Count |
| --- | ---: |
| Context Preservation Pattern | 13 |
| Context Loss Pattern | 10 |
| Navigation Domain | 13 |

## Context Preservation Matrix

| Navigation | Required Context | Optional Context | Preserved Context | Lost Context | Context Owner | Consumer | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Entry Navigation | Market | saved intent | Market scope, selected direction | broad origin | Entry Architecture | Discovery, Search | Medium | authenticated entry split |
| Discovery Navigation | Market, candidate set | filter candidate | candidate criteria, comparison basis | filter context | Discovery Architecture | Entity | High | saved filter context |
| Search Navigation | query | recent intent candidate | query, target type, ambiguity | original query intent | Search Architecture | Entity | Medium | result grouping |
| Entity Navigation | selected Entity | Company, Exchange | Entity identity, local context | Entity type boundary | Entity Architecture | Evidence | High | Security and Company boundary |
| Evidence Navigation | Evidence, Source | Publisher, Timeline | Source cue, Freshness cue, Evidence boundary | complete Traceability | Evidence Architecture | Research | Medium | item-level Source |
| Research Navigation | Report, Source | Publisher | provider cue, method availability | provider method detail | Research Architecture | Evidence | Medium | methodology access |
| Monitoring Navigation | User, Security | Signal | monitored Entity, trigger candidate | Signal threshold | Monitoring Architecture | Personal | Medium | Watchlist research state |
| Portfolio Navigation | User, Position | Evidence | exposure context, Security reference | holdings Source | Personal Continuity | Workflow | Medium | exposure definition |
| Workspace Navigation | User, Context | Collection | origin reference, selected Entity | restore fidelity | Workspace Architecture | Workflow | Low | linked context |
| Community Navigation | User, News | Tag | opinion boundary, author cue | moderation state | Community Architecture | Evidence | Medium | moderation boundary |
| Calendar Navigation | Event, date | Macro Indicator | date context, Event label | Event Source relation | Calendar Architecture | Evidence | Low | Event Source |
| Personal Navigation | User | Collection, Watchlist | owner, saved intent | persistence scope | Personal Continuity | Monitoring | Medium | owner boundary |
| System Navigation | User, Alert | Organization | delivery boundary, owner cue | payload detail | Notification Architecture | Personal | Low | permission model |

## Context Loss Pattern Matrix

| Context Loss Pattern | Trigger | Affected Navigation | User Cost | Mitigation | Confidence |
| --- | --- | --- | --- | --- | --- |
| Market Origin Loss | Entry to Discovery without scope | Entry, Discovery | 시작 기준 재구성 필요 | preserve Market scope | Medium |
| Filter Criteria Loss | candidate set handoff | Discovery, Entity | 비교 기준 상실 | preserve criteria summary | High |
| Query Intent Loss | Search handoff | Search, Entity | wrong target risk | preserve query and target type | Medium |
| Entity Boundary Loss | local Information movement | Entity, Evidence | Security / Company 혼동 | preserve Entity type | High |
| Source Boundary Loss | Evidence inspection | Evidence, Research | trust calibration 약화 | preserve Source and Freshness | Medium |
| Provider Method Loss | Report transition | Research, Evidence | method uncertainty | preserve method availability | Medium |
| Trigger Source Loss | Signal to Monitoring | Monitoring, Notification | alert reason 불명확 | preserve trigger and Evidence cue | Medium |
| Workspace Restore Loss | Workspace return | Workspace, Entity | repeated setup cost | preserve origin Context | Low |
| Opinion Boundary Loss | Community to Evidence | Community, Evidence | opinion as Evidence risk | preserve opinion label | Medium |
| Event Source Loss | Calendar to Evidence | Calendar, Evidence | timing without Source | preserve Event Source cue | Low |

## Context Guardrail

Context Preservation must be explicit at Navigation boundaries.

Preserved Context is not the same as saved state.
