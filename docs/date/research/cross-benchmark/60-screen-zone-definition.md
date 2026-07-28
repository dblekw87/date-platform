# Screen Zone Definition

## 문서 목적

이 문서는 Screen Type을 구성하는 Zone의 역할을 정의한다.

Zone은 responsibility unit이다. spatial placement, arrangement, or build artifact를 정의하지 않는다.

## Screen Zone Summary

| Metric | Count |
| --- | ---: |
| Screen Zone | 11 |
| Zone Responsibility | 11 |
| Visual Alignment | 8 |
| Open Question | 11 |

## Zone Responsibility Matrix

| Zone | Purpose | Consumes | Produces | Required Context | Optional Context | Interaction | Visual Rule | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Header | current context identity | selected Information, owner | context title and boundary cue | Entity or Workspace | Source, User | Entity Focus, Workspace Restore | Information First | High | header density |
| Toolbar | action and criteria control | criteria, selected state | available action set | current Screen Type | saved criteria | Discovery Refinement, Search Resolution | Control -> Soft Neumorphism | Medium | control overload |
| Navigation | Information handoff direction | current context | next Information direction | current Information | preserved context | Entry Direction, Search Resolution | Navigation -> Glass | Medium | glass boundary |
| Summary | compressed context | primary Information | quick reading context | primary Entity or Information | Signal, News | Entry Direction, Interpretation Boundary | Data -> Flat | High | summary vs Evidence |
| Evidence | trust boundary | Evidence, Source, Freshness | Evidence context | Evidence, Source | Publisher, Timeline | Evidence Inspection | Evidence -> Layered | Medium | Traceability depth |
| Relationship | relation meaning | Entity pair, Relationship, Tag | relation context | Entity | Evidence, Source | Research Context, Community Boundary | Layer Shows Responsibility | Medium | relation confidence |
| Timeline | time context | Event, Timeline, Calendar Event | ordered context | Event or Evidence | Macro Indicator | Calendar Event | Motion Supports Understanding | Low | Event Source |
| Workspace | reusable context | Workspace, Context, Collection | restored context candidate | User, Context | Watchlist, Strategy | Workspace Restore | Workspace uses Glass Layer | Low | restore fidelity |
| AI | bounded interpretation | Evidence, Context, Research | assistive interpretation | Evidence | Source, Method | Interpretation Boundary | AI -> Floating Layer | Low | methodology |
| Action | next user action | current state, available actions | state transition candidate | current Screen Type | owner context | all primary interactions | Controls Feel Physical | Medium | action prioritization |
| Footer | policy and limitation support | System, Source, limitation | boundary support | product or Source context | Organization | System Boundary | Divider and Information color role | Low | policy depth |

## Zone Composition Rule

| Rule | Meaning |
| --- | --- |
| Zone must have a purpose. | every Zone exists for Information responsibility. |
| Zone must declare consumed Information. | hidden ownership is not allowed. |
| Zone must produce a context or action. | passive decoration is not a Zone. |
| Zone must preserve required context. | context loss must be explicit. |
| Zone must have visual responsibility. | style follows Information role. |

## Zone Guardrail

Zone is not placement.

Zone does not define arrangement, size, order, or production elements.
