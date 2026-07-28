# Interaction Domain Definition

## 문서 목적

이 문서는 Phase 13 범위에서 Navigation Domain을 Interaction System으로 변환한다.

Interaction은 user action에 대한 system response rule이다. presentation, implementation, persistence, delivery contract 설계는 작성하지 않는다. Registry는 수정하지 않는다.

## Interaction Domain Summary

| Metric | Count |
| --- | ---: |
| Interaction Domain | 13 |
| Interaction Category | 15 |
| Interaction Contract | 13 |
| Interaction Ownership | 3 |
| Interaction Classification | 6 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Interaction Domain Matrix

| Interaction Name | Purpose | Trigger | Actor | Target | Input | Output | System Response | Expected Feedback | Required Context | Optional Context | Precondition | Postcondition | State Transition | Error Handling | Recovery | Architecture Domain | Related Product Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Entry Direction Interaction | first direction을 결정하게 한다. | product entry or saved intent | User | Market Information | Market, saved intent candidate | direction context | system narrows available next actions by Market scope | Immediate, Passive | Market | Signal, News | Market context exists | next action set is available | Idle -> Focused | no clear direction | return to broad Market context | AD-001 | DPP-001 | Medium | public and authenticated entry split |
| Discovery Refinement Interaction | candidate set을 비교 가능하게 줄인다. | candidate criteria change | User | Security Information | Market, criteria | comparable candidate set | system updates candidate set and preserves criteria | Immediate, Persistent | Market, candidate set | Sector, Theme | candidate universe exists | criteria and result remain linked | Focused -> Comparing | criteria conflict | reset to previous criteria | AD-002 | DPP-002 | High | filter state retention |
| Search Resolution Interaction | known intent를 target Information으로 해결한다. | query or command input | User | Search Information | query, target hint | resolved Entity or task context | system resolves target type before handoff | Immediate, Warning when ambiguous | query | Exchange, Tag | query exists | target type is visible | Idle -> Focused | ambiguous target | show ambiguity and require resolution | AD-003 | DPP-003 | Medium | result grouping |
| Entity Focus Interaction | selected Entity context를 고정한다. | candidate selection | User | Security Information | selected Security | Entity context | system sets Entity as local context owner | Immediate, Persistent | Security | Company, Exchange | resolved Entity exists | local Information modes share Entity context | Browsing -> Focused | Entity type conflict | preserve target type and ask resolution | AD-004 | DPP-004 | High | Security and Company boundary |
| Evidence Inspection Interaction | Evidence boundary를 확인하게 한다. | Evidence cue selection | User | Evidence Information | Evidence, Source cue | trust-calibrated Evidence context | system exposes Source, Freshness, boundary status | Immediate, Persistent | Evidence, Source | Publisher, Timeline | Evidence cue exists | Evidence context is inspectable | Focused -> Comparing | Source unavailable | mark limitation and keep Entity context | AD-005 | DPP-005 | Medium | complete Traceability depth |
| Interpretation Boundary Interaction | Summary or Translation boundary를 유지한다. | interpretation content selection | User / System | Evidence Information | Evidence, interpretation candidate | boundary-labeled interpretation | system keeps Original Evidence relation visible | Immediate, Warning when boundary is weak | Evidence, Source | News, Report | Evidence exists | interpretation remains subordinate to Evidence | Focused -> Expanded | methodology unavailable | show methodology gap and keep Source cue | AD-006 | DPP-006 | Low | methodology and correction visibility |
| Research Context Interaction | provider-labeled content를 Evidence와 연결한다. | Report or provider cue selection | User | Research Information | Report, Source, provider label | Research context | system separates provider label, method cue, Evidence boundary | Deferred, Persistent | Report, Source | Publisher | Report cue exists | Research context does not replace Evidence | Focused -> Comparing | method unavailable | mark provider method gap | AD-013 | DPP-011 | Medium | provider method visibility |
| Monitoring Setup Interaction | observed state를 user-owned state로 만든다. | monitor action or Signal cue | User | Monitoring Information | User, Security, Signal | monitored state | system creates or updates observed state boundary | Immediate, Persistent | User, Security | Signal, Alert | authenticated user context candidate | monitored Entity is user-scoped | Focused -> Monitoring | missing user context | request ownership context | AD-008 | DPP-008 | Medium | Watchlist research state |
| Portfolio Context Interaction | exposure context를 Security와 연결한다. | exposure inspection | User | Portfolio Information | User, Position, Security | exposure context | system preserves Position and Security boundary | Deferred, Persistent | User, Position | Evidence | user-owned exposure exists | exposure context is linked to Security | Focused -> Comparing | holdings Source unavailable | mark Source limitation | AD-009 | DPP-008 | Medium | holdings Source |
| Workspace Restore Interaction | preserved context를 다시 사용할 수 있게 한다. | restore or saved setup action | User | Workspace Information | User, Context, Workspace | restored context candidate | system restores origin reference before next action | Deferred, Persistent | User, Context | Collection, Watchlist | saved context exists | origin and selected Entity are available | Returning -> Focused | restore incomplete | recover partial context and mark missing state | AD-011 | DPP-010 | Low | restore fidelity |
| Community Boundary Interaction | opinion을 Evidence와 분리한다. | opinion or reaction cue selection | User | Community Information | User, News, Tag | opinion boundary context | system labels participation as opinion context | Immediate, Passive | User, News | Tag, Publisher | opinion cue exists | opinion is not treated as Evidence | Browsing -> Comparing | moderation unknown | mark moderation gap | AD-012 | DPP-011 | Medium | moderation boundary |
| Calendar Event Interaction | Event timing을 Evidence context와 연결한다. | date or Event cue selection | User | Calendar Information | Event, date | time context | system preserves date and Event Source requirement | Immediate, Warning when Source is weak | Event, date | Macro Indicator | Event candidate exists | time context is linked to Evidence candidate | Browsing -> Focused | Event Source missing | mark Event Source limitation | AD-014 | DPP-012 | Low | Event Source relation |
| System Boundary Interaction | delivery or ownership boundary를 설명한다. | Alert, permission, delivery cue | User / System | System Information | User, Alert, Organization | boundary context | system identifies owner, trigger, and limitation | Critical or Blocking when needed | User, Alert | Organization | boundary cue exists | user understands system-owned limitation | Warning -> Completed | permission or payload unknown | block or mark unknown with next available action | AD-015 | DPP-012 | Low | payload and permission boundary |

## Interaction Category Definition

| Interaction Category | Definition |
| --- | --- |
| Navigation | Information handoff action |
| Selection | target Information을 고정하는 action |
| Filtering | candidate criteria를 적용하는 action |
| Sorting | candidate ordering 기준을 바꾸는 action |
| Searching | query intent를 해결하는 action |
| Comparison | 둘 이상의 Information을 같은 기준으로 보는 action |
| Evidence | Source and boundary를 확인하는 action |
| Relationship | Entity relation을 따라가는 action |
| Workspace | saved context를 복원하거나 조합하는 action |
| Monitoring | observed state를 만들거나 확인하는 action |
| Timeline | time context를 따라가는 action |
| AI Assistance | interpretation boundary를 가진 assistive action |
| Command | expert intent를 task context로 resolve하는 action |
| Context | origin and selected Information을 보존하는 action |
| State Transition | user or system state를 명확히 바꾸는 action |

## Domain Guardrail

Interaction Domain은 response contract다.

Interaction Domain은 presentation pattern, implementation detail, persistence shape를 결정하지 않는다.
