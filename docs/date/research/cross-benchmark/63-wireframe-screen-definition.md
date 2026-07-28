# Wireframe Screen Definition

## Purpose

이 문서는 Phase 15 Screen System을 Low Fidelity Wireframe Architecture로 변환한다. 산출물은 Gray Box 수준의 Screen contract이며, production artifact를 정의하지 않는다.

## Wireframe Summary

| Item | Count |
| --- | ---: |
| Workspace | 5 |
| Wireframe Screen | 18 |
| Screen Section | 54 |
| Screen Zone | 11 |
| Layout Pattern | 9 |
| Navigation Dependency | 10 |
| Interaction Dependency | 8 |

## Wireframe Rule

- Screen은 Workspace, Screen, Section, Zone의 responsibility만 가진다.
- Screen은 Primary Goal, Primary Information, Primary Action을 반드시 가진다.
- Screen은 Entry, Exit, Required Context를 반드시 가진다.
- Screen은 Navigation Dependency와 Interaction Dependency를 명시한다.
- Screen은 Gray Box role만 정의한다.

## Wireframe Screen Matrix

| Screen | Workspace | Section | Zone | Hierarchy | Primary Goal | Primary Information | Primary Action | Entry | Exit | Required Context | Navigation Dependency | Interaction Dependency | Layout Pattern | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dashboard | Dashboard Workspace | Overview / Monitoring Preview / Return Context | Header / Summary / Navigation / Action | Workspace > Dashboard > Overview | next action direction 결정 | Market Information | choose direction | Workspace Entry | Discovery or Monitoring | Market | Entry to Discovery | Entry Direction to Discovery Refinement | Overview Stack | Medium | public and authenticated scope |
| Discovery | Dashboard Workspace | Criteria / Candidate Set / Comparison Context | Toolbar / Summary / Relationship / Action | Workspace > Discovery > Compare | candidate narrowing | Security Information | refine criteria | Dashboard or Search | Security | Market, candidate criteria | Discovery to Entity | Discovery Refinement to Entity Focus | Filtered List | High | criteria persistence |
| Search | Research Workspace | Query / Result / Ambiguity | Toolbar / Summary / Action | Workspace > Search > Overview | known intent resolution | Security Information | resolve intent | Entry or Command | Security or Research | query | Search to Entity | Search Resolution to Entity Focus | Command Strip | Medium | result grouping |
| Security | Research Workspace | Entity Context / Local Information / Evidence Preview | Header / Summary / Evidence / Action | Workspace > Security > Detail | focus selected Security | Security Information | inspect Evidence | Discovery or Search | Evidence | Security | Entity to Evidence | Entity Focus to Evidence Inspection | Entity Detail | High | Security and Company boundary |
| Company | Research Workspace | Company Context / Related Security / Research Cue | Header / Summary / Relationship / Evidence | Workspace > Company > Detail | business identity context | Company Information | inspect related Evidence | Security or Search | Research | Company | Entity to Research | Entity Focus to Research Context | Entity Detail | High | multi-security mapping |
| Evidence | Research Workspace | Source Boundary / Evidence Body / Related Context | Header / Evidence / Relationship / Action | Workspace > Evidence > Detail | inspect Evidence boundary | Evidence Information | inspect Source | Security or Research | Decision Context | Evidence, Source | Evidence to Research | Evidence Inspection to Research Context | Evidence Stack | Medium | Traceability depth |
| Research | Research Workspace | Provider Context / Report Context / Method Cue | Header / Evidence / Relationship / Action | Workspace > Research > Detail | provider boundary check | Research Information | inspect Report | Evidence or Company | Evidence | Report, Source | Evidence to Research | Research Context to Evidence Inspection | Evidence Stack | Medium | method visibility |
| Timeline | Research Workspace | Time Rail / Event Detail / Evidence Link | Header / Timeline / Evidence / Action | Workspace > Timeline > Timeline | inspect time context | Calendar Information | inspect Event | Evidence or Calendar | Evidence | Event | Calendar to Evidence | Calendar Event to Evidence Inspection | Timeline Rail | Low | Event Source |
| Workspace | Journal Workspace | Context Restore / Saved Set / Next Action | Header / Workspace / Action | Workspace > Workspace > Workspace | restore reusable context | Workspace Information | restore | Personal or Journal | Entity or Evidence | User, Context | Workspace to Entity | Workspace Restore to Entity Focus | Workspace Canvas | Low | restore fidelity |
| Portfolio | Portfolio Workspace | Exposure / Position / Evidence Link | Header / Summary / Evidence / Action | Workspace > Portfolio > Detail | inspect exposure | Portfolio Information | inspect Position | Dashboard or Security | Evidence | User, Position | Portfolio to Evidence | Portfolio Context to Evidence Inspection | Split Context | Medium | holdings Source |
| Watchlist | Monitor Workspace | Monitored Set / Signal Preview / Return | Header / Summary / Monitoring / Action | Workspace > Watchlist > Monitoring | revisit monitored Entity | Monitoring Information | inspect Entity | Dashboard | Security or Monitoring | User, Security | Monitoring to Entity | Monitoring Setup to Entity Focus | Monitoring Board | Medium | research state boundary |
| Monitoring | Monitor Workspace | Trigger / Signal Context / System Boundary | Header / Monitoring / Timeline / Action | Workspace > Monitoring > Monitoring | inspect trigger | Monitoring Information | inspect Signal | Watchlist or Evidence | System | User, Signal | Monitoring to System | Monitoring Setup to System Boundary | Monitoring Board | Medium | trigger Source |
| Journal | Journal Workspace | Reasoning Context / Evidence Link / Return | Header / Workspace / Evidence / Action | Workspace > Journal > Workspace | preserve reasoning | Strategy Information | restore context | Workspace or Evidence | Workspace | User, Strategy | Workspace to Evidence | Workspace Restore to Evidence Inspection | Workspace Canvas | Low | reasoning ownership |
| Calendar | Monitor Workspace | Date Context / Event Context / Evidence Link | Header / Timeline / Evidence / Action | Workspace > Calendar > Timeline | inspect Event timing | Calendar Information | inspect Event | Dashboard or Timeline | Evidence | Event, date | Calendar to Evidence | Calendar Event to Evidence Inspection | Timeline Rail | Low | Event Source |
| AI Assistant | Research Workspace | Prompt Context / Evidence Reference / Output Boundary | Header / AI / Evidence / Action | Workspace > AI Assistant > Assistant | assist interpretation | Evidence Information | request assistive task | Evidence or Research | Evidence | Evidence, Source | Evidence to AI | Interpretation Boundary to Evidence Inspection | Workspace Canvas | Low | methodology boundary |
| Settings | Dashboard Workspace | Ownership Boundary / Preference Context / System State | Header / Toolbar / Summary / Action | Workspace > Settings > Configuration | inspect settings boundary | System Information | inspect boundary | Profile or System | Dashboard | User | Personal to System | System Boundary to Personal | Configuration Stack | Low | configuration scope |
| Profile | Dashboard Workspace | User Identity / Saved Intent / Organization Context | Header / Summary / Workspace / Action | Workspace > Profile > Configuration | inspect personal ownership | Personal Information | revisit saved context | Dashboard | Watchlist or Workspace | User | Personal to Workspace | System Boundary to Workspace Restore | Configuration Stack | Medium | User and Organization boundary |
| System | Dashboard Workspace | Access Boundary / Delivery Boundary / Limitation | Header / Summary / Action / Footer | Workspace > System > Configuration | inspect system boundary | System Information | identify owner | Alert or Profile | Personal | User, Alert | System to Personal | System Boundary to Personal | Configuration Stack | Low | permission model |

## Architecture Alignment

| Alignment | Count |
| --- | ---: |
| Architecture Domain | 15 |
| Product Principle | 12 |
| Navigation Domain | 13 |
| Interaction Domain | 13 |

## Guardrail

- This document does not define production layout values.
- This document does not define surface style decisions.
- This document does not define delivery implementation.
