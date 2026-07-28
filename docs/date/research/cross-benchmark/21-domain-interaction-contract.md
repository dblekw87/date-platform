# Domain Interaction Contract

## 문서 목적

이 문서는 Architecture Domain 간 interaction contract를 정의한다.

이 문서는 Navigation을 작성하지 않는다. Interaction은 Domain 간 handoff와 contract만 의미한다.

## Interaction Summary

| Metric | Count |
| --- | ---: |
| Interaction Contract | 15 |
| Hard Dependency | 16 |
| Soft Dependency | 15 |
| Optional Dependency | 15 |

## Interaction Contract Matrix

| Contract ID | From Domain | To Domain | Trigger | Input Contract | Output Contract | Interaction Boundary | Hard Dependency | Soft Dependency | Optional Dependency | Failure Case | Success Condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IC-001 | Entry Architecture | Discovery Architecture | user selects broad route | entry context, Market frame | candidate set request | Entry does not define filter detail | Entry -> Discovery | Entry -> Evidence | Entry -> Search | user sees route but no candidate path | user reaches comparison-ready discovery |
| IC-002 | Entry Architecture | Search Architecture | user enters known target | query or ticker intent | Search resolver request | Entry does not own disambiguation | Entry -> Search | Entry -> Discovery | Search -> Workflow | query entry has no target type cue | user reaches resolved Entity candidate |
| IC-003 | Discovery Architecture | Entity Architecture | user selects row or candidate | selected candidate, filter context | Entity context request | Discovery does not own Entity detail | Discovery -> Entity | Discovery -> Evidence | Discovery -> Calendar | filter context is lost | Entity opens with candidate context |
| IC-004 | Search Architecture | Entity Architecture | Search resolves target | resolved ticker, company, or security | Entity context | Search does not own Entity lifecycle | Search -> Entity | Search -> Workflow | Search -> Evidence | ambiguous target is hidden | user can choose correct Entity type |
| IC-005 | Entity Architecture | Evidence Architecture | user validates Entity claim | Entity context, local mode | Evidence context | Entity does not own Source method | Entity -> Evidence | Entity -> Research | Entity -> Community | Evidence appears without Source boundary | Evidence shows Source and Freshness cue |
| IC-006 | Evidence Architecture | Interpretation Layer | user reads compressed content | Original Evidence, Source cue | interpretation context | Interpretation does not replace Evidence | Evidence -> Interpretation | Evidence -> Research | Interpretation -> Community | Summary appears as Original Evidence | boundary between interpretation and source is visible |
| IC-007 | Evidence Architecture | Workflow Architecture | user moves from validation to task | Evidence context, Entity context | task context | Workflow does not own Source truth | Evidence -> Workflow | Evidence -> Monitoring | Workflow -> Workspace | task loses Evidence context | next task keeps reference to Evidence |
| IC-008 | Workflow Architecture | Monitoring Architecture | repeated task becomes watch intent | Entity, task outcome, watch intent | monitoring state candidate | Monitoring does not own task logic | Workflow -> Monitoring | Monitoring -> Personal Continuity | Monitoring -> Notification | watch trigger lacks context | monitored set keeps Entity reference |
| IC-009 | Monitoring Architecture | Personal Continuity | user saves or revisits monitored set | monitored state, user intent | saved state owner | Personal Continuity does not own live data | Monitoring -> Personal Continuity | Personal Continuity -> Settings | Personal Continuity -> Workspace | saved state type is ambiguous | saved state has owner and scope |
| IC-010 | Personal Continuity | Workspace Architecture | user composes reusable state | saved state, layout intent | workspace composition candidate | Workspace does not own all user state | Personal Continuity -> Workspace | Workspace -> Workflow | Workspace -> Context Preservation | layout saved without state owner | workspace states map to owner types |
| IC-011 | Entity Architecture | Context Preservation | user changes Surface around Entity | Entity context, origin Surface | transition context | Context Preservation does not define Entity | Entity -> Context Preservation | Context Preservation -> Evidence | Context Preservation -> Workspace | user cannot return to origin | transition carries origin reference |
| IC-012 | Context Preservation | Evidence Architecture | user leaves for Original Evidence | origin context, Source path | Evidence return candidate | external product behavior is not controlled | Context Preservation -> Evidence | Evidence -> Personal Continuity | Evidence -> Research | external path loses all origin context | original path records product origin |
| IC-013 | Evidence Architecture | Research Architecture | user opens report or provider content | Source, provider, document cue | research context | Research does not own raw data infrastructure | Evidence -> Research | Research -> Policy | Research -> Interpretation | provider label replaces item detail | provider context and method cue stay visible |
| IC-014 | Discovery Architecture | Calendar Architecture | user chooses time-based route | candidate set or Market context | date or event context | Calendar does not own full discovery | Discovery -> Calendar | Calendar -> Evidence | Calendar -> Notification | Event lacks Source relation | date context can route to candidate Evidence |
| IC-015 | Monitoring Architecture | Notification Architecture | monitoring state triggers delivery | monitored state, trigger reference | notification item candidate | Notification does not define trigger logic | Monitoring -> Notification | Notification -> Personal Continuity | Notification -> Settings | notification lacks Source or Entity | delivery item preserves trigger context |

## Interaction Boundary

Interaction Contract는 Domain 간 handoff만 정의한다.

Navigation path, screen placement, URL, component, visual hierarchy는 이 문서의 scope가 아니다.
