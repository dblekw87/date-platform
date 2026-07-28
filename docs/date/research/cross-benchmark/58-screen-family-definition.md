# Screen Family Definition

## 문서 목적

이 문서는 DATE Screen Family를 정의한다.

Screen Family는 Product work purpose와 Information responsibility 단위다. Screen arrangement나 build artifact를 정의하지 않는다.

## Screen Family Summary

| Metric | Count |
| --- | ---: |
| Screen Family | 18 |
| Core Screen | 6 |
| Supporting Screen | 4 |
| Workflow Screen | 3 |
| Personal Screen | 3 |
| System Screen | 2 |
| Architecture Alignment | 15 |
| Product Principle Alignment | 12 |
| Visual Alignment | 8 |
| Open Question | 18 |

## Screen Family Matrix

| Screen Family Name | Purpose | Primary User Goal | Primary Workspace | Primary Information | Supporting Information | Required Entity | Required Navigation | Required Interaction | Required Visual Rule | Architecture Alignment | Product Principle Alignment | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dashboard | overview and return context | next action 결정 | Dashboard Workspace | Market Information | Monitoring Information, Evidence Information | Market | Entry Navigation | Entry Direction Interaction | Information First, Navigation -> Glass | AD-001, AD-009 | DPP-001, DPP-008 | Medium | public/authenticated scope |
| Discovery | comparable candidate set | 후보를 줄이고 비교 | Dashboard Workspace | Security Information | Market Information, Sector, Theme | Security | Discovery Navigation | Discovery Refinement Interaction | Data -> Flat | AD-002 | DPP-002 | High | criteria persistence |
| Search | known intent resolution | target을 빠르게 해결 | Research Workspace | Security Information | Company Information, Research Information | Security | Search Navigation | Search Resolution Interaction | Control -> Soft Neumorphism | AD-003 | DPP-003 | Medium | ambiguity handling |
| Security | selected Security context | Security 중심 분석 | Research Workspace | Security Information | Company Information, Evidence Information | Security | Entity Navigation | Entity Focus Interaction | Chart -> Minimal, Data -> Flat | AD-004 | DPP-004 | High | Security vs Company |
| Company | business identity context | Company context 확인 | Research Workspace | Company Information | Security Information, Research Information | Company | Entity Navigation | Entity Focus Interaction | Information First | AD-004 | DPP-004 | High | multi-security mapping |
| Evidence | Source and boundary context | Evidence 검증 | Research Workspace | Evidence Information | Source, Publisher, Timeline | Evidence | Evidence Navigation | Evidence Inspection Interaction | Evidence -> Layered | AD-005 | DPP-005 | Medium | complete Traceability |
| Research | provider-labeled context | Report responsibility 확인 | Research Workspace | Research Information | Evidence Information, Company Information | Report | Research Navigation | Research Context Interaction | Evidence -> Layered | AD-013 | DPP-011 | Medium | provider method |
| Timeline | time ordering context | Event and Evidence time relation 확인 | Research Workspace | Calendar Information | Evidence Information, Macro Information | Event | Calendar Navigation, Evidence Navigation | Calendar Event Interaction | Evidence Timeline, Motion Supports Understanding | AD-014, AD-005 | DPP-012, DPP-005 | Low | Event Source relation |
| Workspace | reusable context composition | work context 복원 | Journal Workspace | Workspace Information | Context, Collection, Watchlist | Workspace | Workspace Navigation | Workspace Restore Interaction | Workspace uses Glass Layer | AD-011, AD-010 | DPP-010, DPP-009 | Low | restore fidelity |
| Portfolio | exposure context | Position and Evidence 연결 | Portfolio Workspace | Portfolio Information | Position, Security, Evidence | Portfolio | Portfolio Navigation | Portfolio Context Interaction | Data -> Flat | AD-009 | DPP-008 | Medium | holdings Source |
| Watchlist | monitored Entity set | 관심 Entity 재방문 | Monitor Workspace | Monitoring Information | Security Information, Signal | Watchlist | Monitoring Navigation | Monitoring Setup Interaction | Monitoring -> High Contrast | AD-008 | DPP-008 | Medium | research state boundary |
| Monitoring | trigger and observed state | Signal and Alert 확인 | Monitor Workspace | Monitoring Information | System Information, Evidence Information | Signal | Monitoring Navigation | Monitoring Setup Interaction | Monitoring -> High Contrast | AD-008, AD-015 | DPP-008, DPP-012 | Medium | trigger Source |
| Journal | user reasoning context | 판단 기록과 재방문 | Journal Workspace | Strategy Information | Evidence Information, Workspace Information | Strategy | Workspace Navigation, Personal Navigation | Workspace Restore Interaction | Evidence-first over decoration | AD-007, AD-010 | DPP-007, DPP-009 | Low | reasoning ownership |
| Calendar | time-based candidate context | Event timing 확인 | Monitor Workspace | Calendar Information | Macro Information, Evidence Information | Event | Calendar Navigation | Calendar Event Interaction | Motion Supports Understanding | AD-014 | DPP-012 | Low | Event Source |
| AI Assistant | assistive interpretation context | Explain, Compare, Summarize, Reason | Research Workspace | Evidence Information | Research Information, Context | Evidence | Evidence Navigation | Interpretation Boundary Interaction | AI -> Floating Layer | AD-006 | DPP-006 | Low | methodology boundary |
| Settings | preference and ownership configuration | user-owned settings 확인 | Dashboard Workspace | System Information | Personal Information | User | System Navigation | System Boundary Interaction | Controls Feel Physical | AD-009, AD-015 | DPP-008, DPP-012 | Low | configuration scope |
| Profile | user identity and continuity | personal ownership 확인 | Dashboard Workspace | Personal Information | System Information | User | Personal Navigation | System Boundary Interaction | Information First | AD-009 | DPP-008 | Medium | User vs Organization |
| System | access and delivery boundary | system limitation 확인 | Dashboard Workspace | System Information | Alert, Organization, User | Organization | System Navigation | System Boundary Interaction | Warning and Monitoring color role | AD-015 | DPP-012 | Low | permission model |

## Screen Family Guardrail

Screen Family is not a production page.

It defines responsibility, required Information, and alignment only.
