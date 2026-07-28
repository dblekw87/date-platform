# Screen Type Definition

## 문서 목적

이 문서는 Screen Family에서 재사용 가능한 Screen Type을 정의한다.

Screen Type은 structure role이다. production arrangement를 정의하지 않는다.

## Screen Type Summary

| Metric | Count |
| --- | ---: |
| Screen Type | 9 |
| Screen Family Coverage | 18 |
| Screen Zone | 11 |
| Open Question | 9 |

## Screen Type Matrix

| Screen Type | Purpose | Primary Information | Required Zone | Optional Zone | Primary Action | Exit Condition | Visual Alignment | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Overview | broad context and next action | Market, Monitoring, Personal | Header, Summary, Action | Navigation, Evidence | choose direction | user focuses a target | Information First | Medium | overview density |
| Detail | selected Entity or Evidence focus | Security, Company, Evidence | Header, Summary, Evidence, Action | Relationship, Timeline, AI | inspect focused context | user moves to Evidence or Monitoring | Evidence -> Layered | High | detail depth |
| Compare | candidate or Evidence comparison | Security, Evidence, Portfolio | Toolbar, Summary, Relationship | Timeline, Action | compare candidates | user selects or exits comparison | Data -> Flat | High | comparison basis |
| Relationship | connected Entity and Evidence relation | Relationship, Tag, Collection | Header, Relationship, Evidence | Timeline, AI | inspect relation | user follows relation or returns | Layer Shows Responsibility | Medium | relation confidence |
| Timeline | time-ordered context | Event, Timeline, Calendar Event | Header, Timeline, Evidence | Action, Monitoring | inspect time context | user selects Event or Evidence | Evidence Timeline | Low | Event Source |
| Workspace | reusable work context | Workspace, Context, Collection | Header, Workspace, Action | AI, Evidence | restore or compose context | user resumes task | Navigation -> Glass | Low | restore fidelity |
| Monitoring | observed state context | Watchlist, Signal, Alert | Header, Summary, Monitoring, Action | Timeline, System | inspect trigger | user returns or acts on trigger | Monitoring -> High Contrast | Medium | trigger Source |
| Assistant | bounded interpretation support | Evidence, Research, Context | Header, AI, Evidence | Action, Timeline | ask assistive task | user accepts context or returns | AI -> Floating Layer | Low | methodology |
| Configuration | ownership and boundary setting | User, Organization, System | Header, Toolbar, Summary, Action | Footer | inspect or change ownership boundary candidate | user understands boundary | Controls Feel Physical | Low | settings scope |

## Screen Type Usage Matrix

| Screen Family | Primary Screen Type | Secondary Screen Type |
| --- | --- | --- |
| Dashboard | Overview | Monitoring |
| Discovery | Compare | Overview |
| Search | Overview | Detail |
| Security | Detail | Compare |
| Company | Detail | Relationship |
| Evidence | Detail | Relationship |
| Research | Detail | Compare |
| Timeline | Timeline | Detail |
| Workspace | Workspace | Overview |
| Portfolio | Detail | Compare |
| Watchlist | Monitoring | Overview |
| Monitoring | Monitoring | Timeline |
| Journal | Workspace | Detail |
| Calendar | Timeline | Overview |
| AI Assistant | Assistant | Detail |
| Settings | Configuration | System boundary candidate |
| Profile | Configuration | Overview |
| System | Configuration | Detail |

## Type Guardrail

Screen Type is reusable structure role.

It does not define production arrangement, access-path, or build artifact.
