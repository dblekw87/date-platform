# Navigation Domain Definition

## 문서 목적

이 문서는 Phase 12 범위에서 Canonical Information을 Navigation Structure로 변환한다.

Navigation은 Information 사이의 판단 이동 규칙이다. presentation, persistence, delivery contract 설계는 작성하지 않는다. Registry는 수정하지 않는다.

## Navigation Domain Summary

| Metric | Count |
| --- | ---: |
| Navigation Domain | 13 |
| Navigation Group | 9 |
| Navigation Node | 29 |
| Navigation Pattern | 9 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Navigation Domain Matrix

| Navigation Name | Purpose | Primary User Goal | Entry Point | Exit Point | Primary Information | Supporting Information | Required Entity | Required Context | Navigation Trigger | Navigation Result | Primary Action | Secondary Action | Navigation Boundary | Architecture Domain | Related Product Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Entry Navigation | first orientation에서 actionable direction을 만든다. | 시작 지점 결정 | Product entry context | Discovery, Search, Monitoring | Market Information | Evidence Information, Monitoring Information | Market | Market context | broad Market or saved intent | next Information direction | choose direction | inspect summary | Entry does not own deep Evidence validation | AD-001 | DPP-001 | Medium | public and authenticated entry split |
| Discovery Navigation | candidate set을 비교 가능한 Information으로 좁힌다. | 비교 후보 찾기 | Market Information | Entity Navigation | Security Information | Company Information, Sector, Theme | Security | Market, filter context candidate | broad candidate set | comparable candidate set | narrow candidates | compare criteria | Discovery does not make final judgment | AD-002 | DPP-002 | High | filter context retention |
| Search Navigation | known intent를 resolved Information으로 연결한다. | 알고 있는 target 해결 | query or command intent | Entity, Research, Workflow | Security Information | Company Information, Research Information | Security | query context | user typed target | resolved Entity or task context | resolve intent | disambiguate target | Search does not own Entity lifecycle | AD-003 | DPP-003 | Medium | result grouping and ambiguity |
| Entity Navigation | selected Entity 안에서 local analysis context를 유지한다. | 같은 Entity의 Information 비교 | Security Information | Evidence, Research, Monitoring | Security Information | Company Information, Evidence Information | Security | selected Entity context | resolved Security or candidate row | Entity context | focus Entity | switch local Information mode | Entity does not own Source truth | AD-004 | DPP-004 | High | Security and Company boundary |
| Evidence Navigation | 판단에 영향을 주는 Evidence boundary로 이동한다. | Source and Freshness 확인 | Entity or Research Information | Decision context, Monitoring | Evidence Information | Source, Publisher, Timeline | Evidence | Entity, Source | Evidence cue or relation cue | trust-calibrated Information | inspect Evidence | follow Original Evidence candidate | Evidence does not own opinion or final decision | AD-005 | DPP-005 | Medium | complete Traceability depth |
| Research Navigation | provider-labeled content로 Evidence를 보완한다. | Research responsibility 확인 | Evidence or Company Information | Evidence, Entity | Research Information | Report, Publisher, Source | Report | Source, provider label | report cue or provider cue | Research context | inspect Report | compare provider boundary | Research does not replace Evidence boundary | AD-013 | DPP-011 | Medium | provider method visibility |
| Monitoring Navigation | observed Entity와 trigger candidate를 연결한다. | 반복 Observation 설정 | Entity or Watchlist Information | Personal Continuity, Notification | Monitoring Information | Signal, Alert, Security | Watchlist | User, Security | watch action or Signal cue | observed state | monitor Entity | inspect trigger | Monitoring does not own delivery payload | AD-008 | DPP-008 | Medium | Watchlist research state |
| Portfolio Navigation | user exposure context로 판단을 연결한다. | holdings and exposure 확인 | Personal or Security Information | Evidence, Workflow | Portfolio Information | Position, Security, Evidence | Portfolio | User, Position | exposure need or revisit | exposure context | inspect exposure | relate Evidence | Portfolio does not redefine Security | AD-009 | DPP-008 | Medium | holdings Source |
| Workspace Navigation | reusable context로 task transition을 보존한다. | repeated research setup 재사용 | Context or Personal Information | Workflow, Entity | Workspace Information | Context, Collection, Watchlist | Workspace | User, Context | saved setup or task transition | reusable context | restore context candidate | compose Information set | Workspace does not own truth | AD-011 | DPP-010 | Low | linked context validation |
| Community Navigation | opinion boundary를 Evidence와 분리한다. | opinion and reaction 확인 | Entity or News Information | Evidence, Entity | Community Information | User, Tag, Publisher | User | News, Entity | opinion cue or participation cue | opinion context | inspect opinion | compare Evidence boundary | Community does not create Financial Evidence | AD-012 | DPP-011 | Medium | moderation boundary |
| Calendar Navigation | Event timing으로 Information을 찾는다. | time-based candidate 확인 | Market or Event Information | Evidence, Monitoring | Calendar Information | Event, Calendar Event, Macro Indicator | Event | date, Market | date or Event cue | time context | inspect time context | relate Event | Calendar Event is not verified Evidence | AD-014 | DPP-012 | Low | Event Source relation |
| Personal Navigation | saved intent와 ownership context로 돌아간다. | 재방문과 saved state 확인 | User Information | Monitoring, Workspace, Portfolio | Personal Information | Collection, Tag, Watchlist | User | user ownership | revisit or save intent | personal continuity context | revisit saved context | manage ownership boundary | Personal does not own Source truth | AD-009 | DPP-008 | Medium | User and Organization boundary |
| System Navigation | access, ownership, delivery boundary를 확인한다. | delivery and permission context 이해 | Alert or Organization Information | Notification, Personal | System Information | Alert, Organization, User | Organization | User, Alert | delivery or access cue | system boundary context | inspect boundary | identify owner | System does not define product judgment | AD-015 | DPP-012 | Low | payload and permission boundary |

## Navigation Node Coverage

Navigation Node는 Phase 11 Information Object 29개를 그대로 사용한다.

Market, Security, Company, Evidence, Source, Publisher, News, Report, Event, Calendar Event, Economic Event, Macro Indicator, Exchange, Sector, Theme, Timeline, Context, Relationship, Collection, Tag, Signal, Strategy, Portfolio, Position, Watchlist, Workspace, Alert, User, Organization.

## Domain Guardrail

Navigation Domain은 Information handoff rule이다.

Navigation Domain은 presentation grouping, behavior specification, persistence shape, delivery implementation을 결정하지 않는다.
