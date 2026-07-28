# Domain State Boundary

## 문서 목적

이 문서는 각 Architecture Domain이 관리해야 하는 State, 읽기만 하는 State, 절대 관리하지 않는 State를 구분한다.

State boundary는 implementation model이 아니다. Phase 8.4의 architecture-level contract다.

## State Boundary Summary

| Metric | Count |
| --- | ---: |
| State Boundary | 15 |
| Managed State 정의 | 15 |
| Read-only State 정의 | 15 |
| Never Managed State 정의 | 15 |

## State Boundary Matrix

| Domain | Managed State | Read-only State | Never Managed State | State Boundary | Failure Case | Success Condition |
| --- | --- | --- | --- | --- | --- | --- |
| Entry Architecture | entry context, selected initial route | Market summary, Source cue | saved state, full Entity context | Entry state ends after route handoff. | Entry tries to persist user workflow. | Entry hands off clear route context. |
| Discovery Architecture | filter state candidate, sort state candidate, candidate set | Entry context, Entity summary | Evidence method, personal profile | Discovery state is temporary until Entity selection. | filter state is lost before candidate selection. | candidate set carries filter context. |
| Search Architecture | query state, disambiguation state candidate | Entry context, Entity taxonomy | saved command history until validated | Search state resolves or fails; it does not persist workflow. | ambiguous result is treated as final. | target type remains visible. |
| Entity Architecture | selected Entity context, local mode state | Source cue, Watchlist status | user profile, provider method | Entity owns object context, not user state. | Stock / Company / Security boundary blurs. | local mode shares stable Entity context. |
| Evidence Architecture | Evidence context, Source / Freshness boundary, method reference | Entity context, Research context | chart state, community opinion | Evidence state tracks origin and method. | Source cue is mistaken for full lineage. | Evidence boundary is visible at handoff. |
| Interpretation Layer | interpretation display state, original / summary / translation boundary | Original Evidence, Source cue | Source truth, accuracy scoring | Interpretation state is dependent on Evidence state. | Summary becomes independent Evidence. | Original Evidence remains reachable. |
| Workflow Architecture | task handoff state, workflow context candidate | Entity context, Evidence context | Workspace persistence, entitlement policy | Workflow state is transitional. | workflow hides Source context. | task chain keeps Entity and Evidence context. |
| Monitoring Architecture | monitored Entity set, watch trigger candidate | Entity context, live / delayed cue | notification payload, full saved profile | Monitoring state observes; it does not own delivery. | Watchlist absorbs all saved states. | monitored state has owner and scope. |
| Personal Continuity | saved state owner, revisit state, profile state candidate | monitored state, Entity reference | Entity definition, Evidence method | Personal state is user intent state. | saved state owner is unclear. | restore scope is explicit. |
| Context Preservation | origin context, return anchor candidate, transition token | Entity context, Source path | external site state | transition state is boundary state. | external transition loses origin. | return candidate keeps origin reference. |
| Workspace Architecture | layout state candidate, composition state, widget state candidate | saved state, Entity reference | command history, Source method | Workspace state composes other states. | Workspace owns unrelated user data. | composition state maps to owner state. |
| Community Architecture | participation context, reaction state candidate | Entity context, Evidence boundary | Financial Evidence, Source truth | Community state is opinion state. | reaction becomes trust signal. | opinion boundary is explicit. |
| Research Architecture | report context, provider boundary, document reference state | Evidence context, Entity context | raw Market data infrastructure | Research state is content and provider state. | provider label replaces item-level method. | report keeps provider and method cue. |
| Calendar Architecture | date context, event candidate state | Discovery context, Evidence cue | alert engine, full Event Source until validated | Calendar state is time context. | Event relation is inferred as Evidence. | Event route keeps date and Source unknown state. |
| Notification Architecture | notification item candidate, trigger reference candidate | monitored state, user preference | Alert rule engine, push payload detail | Notification state is delivery state. | notification hides trigger origin. | item keeps trigger and Entity reference. |

## State Boundary Guardrail

State ownership must not be inferred from UI proximity.

For example, if Watchlist appears near Entity content, Monitoring Architecture owns monitored set while Entity Architecture owns selected Entity context. If a summary appears near Source, Interpretation Layer owns compression state while Evidence Architecture owns Original Evidence boundary.
