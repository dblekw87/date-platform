# Information Domain Definition

## 문서 목적

이 문서는 Phase 11 범위에서 Canonical Entity를 사용자에게 전달되는 Canonical Information으로 변환한다.

이 문서는 access-path, presentation, persistence, delivery contract 설계를 작성하지 않는다. Registry는 수정하지 않는다.

## Information Domain Summary

| Metric | Count |
| --- | ---: |
| Information Domain | 15 |
| Information Group | 14 |
| Information Object | 29 |
| Information Layer | 9 |
| Hierarchy Level | 4 |
| Architecture Domain Alignment | 15 |
| Product Principle Alignment | 12 |

## Information Domain Matrix

| Information Domain | Definition | Purpose | Primary Information Group | Supporting Information Group | Primary Layer | Secondary Layer | Required Context | Optional Context | Architecture Domain | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Entry Information | first product orientation에 필요한 top-level Information | 사용자가 어디서 시작할지 판단하게 한다. | Market Information | Monitoring Information, Evidence Information | Overview | Summary | Market | News, Signal | AD-001 | DPP-001 | Medium | public entry와 authenticated entry의 Information 차이 |
| Discovery Information | candidate set을 비교 가능하게 만드는 Information | 넓은 후보를 비교 가능한 단위로 줄인다. | Security Information | Company Information, Market Information | Summary | Relationship | Market, Security | Sector, Theme | AD-002 | DPP-002 | High | filter context가 Information으로 얼마나 유지되는가 |
| Search Information | known intent를 resolved Information으로 바꾸는 Information | target ambiguity를 줄인다. | Security Information | Company Information, Research Information | Context | Summary | query, Entity candidate | Exchange, Tag | AD-003 | DPP-003 | Medium | Search result grouping 기준 |
| Entity Information | selected Entity의 local analysis context | Entity 중심 판단 단위를 유지한다. | Security Information | Company Information, Evidence Information | Context | Evidence | Security | Company, Exchange | AD-004 | DPP-004 | High | Security와 Company boundary |
| Evidence Information | 판단에 영향을 주는 Source, Freshness, boundary Information | 사용자가 trust를 조정하게 한다. | Evidence Information | Research Information, Macro Information | Evidence | Timeline | Evidence, Source | Publisher, Event | AD-005 | DPP-005 | Medium | complete Traceability 범위 |
| Interpretation Information | Summary, Translation 같은 interpretation boundary Information | reading cost를 줄이되 Evidence와 분리한다. | Evidence Information | Research Information | Summary | Evidence | Evidence, Source | News, Report | AD-006 | DPP-006 | Low | methodology and correction visibility |
| Workflow Information | task transition에 필요한 carried context | task 전환 시 Entity와 Evidence를 유지한다. | Strategy Information | Workspace Information, Evidence Information | Context | Monitoring | Entity, Evidence | Strategy, Workspace | AD-007 | DPP-007 | Medium | transition context granularity |
| Monitoring Information | observed Entity와 trigger candidate Information | 반복 Observation과 revisit를 지원한다. | Monitoring Information | Security Information, Evidence Information | Monitoring | Personal | Watchlist, Security | Signal, Alert | AD-008 | DPP-008 | Medium | Watchlist와 research state boundary |
| Personal Continuity Information | saved intent와 private state Information | 재방문과 user-owned continuity를 유지한다. | Personal Information | Portfolio Information, Workspace Information | Personal | System | User | Watchlist, Collection | AD-009 | DPP-008 | Medium | persistence owner boundary |
| Context Preservation Information | transition origin과 handoff Information | context loss를 줄인다. | Workspace Information | Evidence Information, Security Information | Context | Relationship | Context, Entity | Timeline, Source | AD-010 | DPP-009 | Medium | return anchor scope |
| Workspace Information | reusable composition context Information | 반복 setup 비용을 줄인다. | Workspace Information | Strategy Information, Personal Information | Personal | Context | User, Context | Collection, Watchlist | AD-011 | DPP-010 | Low | Workspace가 owns하지 않는 Information 경계 |
| Community Information | opinion and participation boundary Information | opinion과 Evidence를 분리한다. | Community Information | Evidence Information, Security Information | Relationship | Context | User, News | Tag, Publisher | AD-012 | DPP-011 | Medium | opinion moderation and Evidence boundary |
| Research Information | provider-labeled content and method boundary Information | Research content의 responsibility를 구분한다. | Research Information | Evidence Information, Company Information | Evidence | Summary | Report, Source | Publisher, Macro Indicator | AD-013 | DPP-011 | Medium | provider identity와 item-level Evidence 차이 |
| Calendar Information | time-based Event context Information | Event timing과 related context를 제공한다. | Calendar Information | Macro Information, Evidence Information | Timeline | Context | Event | Calendar Event, Economic Event | AD-014 | DPP-012 | Low | Event Source relation |
| Notification Information | delivery boundary and trigger Information | Monitoring trigger가 왜 전달됐는지 보여준다. | System Information | Monitoring Information, Personal Information | System | Monitoring | Alert | Signal, User | AD-015 | DPP-012 | Low | payload and trigger Source |

## Information Layer Definition

| Information Layer | Definition |
| --- | --- |
| Overview | product-level orientation을 제공하는 Information |
| Summary | 빠른 판단 전 context를 압축하는 Information |
| Evidence | Source, Freshness, method, Original Evidence boundary를 가진 Information |
| Relationship | Entity 사이 relation meaning을 전달하는 Information |
| Timeline | time order, Event order, update order를 전달하는 Information |
| Context | selected Entity, origin, handoff state를 전달하는 Information |
| Monitoring | observed state와 trigger candidate를 전달하는 Information |
| Personal | user-owned saved intent를 전달하는 Information |
| System | access, ownership, delivery boundary를 전달하는 Information |

## Domain Guardrail

Information Domain은 사용자에게 전달될 meaning boundary다.

Information Domain은 access-path, presentation, persistence structure를 결정하지 않는다.
