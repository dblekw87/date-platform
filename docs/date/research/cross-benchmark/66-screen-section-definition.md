# Screen Section Definition

## Purpose

이 문서는 각 Screen Family의 Section responsibility를 정의한다. Section은 Screen 안에서 Information 목적과 action readiness를 분리하는 Gray Box unit이다.

## Section Summary

| Item | Count |
| --- | ---: |
| Screen Family | 18 |
| Section per Screen | 3 |
| Screen Section | 54 |
| Screen Zone | 11 |

## Section Matrix

| Screen | Section 1 | Section 2 | Section 3 | Required Zone | Primary Information | Primary Action | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dashboard | Overview | Monitoring Preview | Return Context | Header / Summary / Navigation / Action | Market Information | choose direction | Medium |
| Discovery | Criteria | Candidate Set | Comparison Context | Toolbar / Summary / Relationship / Action | Security Information | refine criteria | High |
| Search | Query | Result | Ambiguity | Toolbar / Summary / Action | Security Information | resolve intent | Medium |
| Security | Entity Context | Local Information | Evidence Preview | Header / Summary / Evidence / Action | Security Information | inspect Evidence | High |
| Company | Company Context | Related Security | Research Cue | Header / Summary / Relationship / Evidence | Company Information | inspect related Evidence | High |
| Evidence | Source Boundary | Evidence Body | Related Context | Header / Evidence / Relationship / Action | Evidence Information | inspect Source | Medium |
| Research | Provider Context | Report Context | Method Cue | Header / Evidence / Relationship / Action | Research Information | inspect Report | Medium |
| Timeline | Time Rail | Event Detail | Evidence Link | Header / Timeline / Evidence / Action | Calendar Information | inspect Event | Low |
| Workspace | Context Restore | Saved Set | Next Action | Header / Workspace / Action | Workspace Information | restore | Low |
| Portfolio | Exposure | Position | Evidence Link | Header / Summary / Evidence / Action | Portfolio Information | inspect Position | Medium |
| Watchlist | Monitored Set | Signal Preview | Return | Header / Summary / Monitoring / Action | Monitoring Information | inspect Entity | Medium |
| Monitoring | Trigger | Signal Context | System Boundary | Header / Monitoring / Timeline / Action | Monitoring Information | inspect Signal | Medium |
| Journal | Reasoning Context | Evidence Link | Return | Header / Workspace / Evidence / Action | Strategy Information | restore context | Low |
| Calendar | Date Context | Event Context | Evidence Link | Header / Timeline / Evidence / Action | Calendar Information | inspect Event | Low |
| AI Assistant | Prompt Context | Evidence Reference | Output Boundary | Header / AI / Evidence / Action | Evidence Information | request assistive task | Low |
| Settings | Ownership Boundary | Preference Context | System State | Header / Toolbar / Summary / Action | System Information | inspect boundary | Low |
| Profile | User Identity | Saved Intent | Organization Context | Header / Summary / Workspace / Action | Personal Information | revisit saved context | Medium |
| System | Access Boundary | Delivery Boundary | Limitation | Header / Summary / Action / Footer | System Information | identify owner | Low |

## Section Responsibility

| Responsibility | Section Role | Required Context | Output |
| --- | --- | --- | --- |
| Orientation | establish current object and owner | Workspace, primary Information | current Screen intent |
| Inspection | expose primary Information and boundary | Entity, Evidence, Source, Event, User | inspectable context |
| Action Readiness | make next action explicit | Navigation state, Interaction state | available next action |

## Section Guardrail

- Section cannot own Entity lifecycle.
- Section cannot own persistence.
- Section cannot define final delivery artifact.
