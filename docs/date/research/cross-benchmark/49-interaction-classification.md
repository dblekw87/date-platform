# Interaction Classification

## 문서 목적

이 문서는 Interaction Category, Ownership, Classification을 정리한다.

Classification은 product response responsibility 기준이다.

## Classification Summary

| Metric | Count |
| --- | ---: |
| Interaction Category | 15 |
| Interaction Ownership | 3 |
| Interaction Classification | 6 |
| Interaction Contract | 13 |

## Interaction Ownership

| Ownership | Definition | Example Interaction |
| --- | --- | --- |
| User Driven | user action이 response를 시작한다. | Search Resolution, Evidence Inspection |
| System Driven | system state나 limitation이 response를 시작한다. | System Boundary, Warning |
| Hybrid | user action과 system condition이 함께 response를 결정한다. | Monitoring Setup, Interpretation Boundary |

## Interaction Classification Matrix

| Classification | Definition | Interactions | Primary Risk | Related Principle |
| --- | --- | --- | --- | --- |
| Primary Interaction | core judgment movement를 만드는 Interaction | Entry Direction, Discovery Refinement, Entity Focus, Evidence Inspection | context loss | DPP-001, DPP-002, DPP-004, DPP-005 |
| Supporting Interaction | core movement를 보완하는 Interaction | Research Context, Portfolio Context, Calendar Event | overstatement | DPP-011, DPP-012 |
| Context Interaction | origin and selected Information을 보존하는 Interaction | Workspace Restore, Entity Focus, Evidence Inspection | restore gap | DPP-009, DPP-010 |
| Relationship Interaction | Entity or Evidence relation을 따라가는 Interaction | Research Context, Community Boundary, Calendar Event | relation confidence gap | DPP-005, DPP-011 |
| Monitoring Interaction | observed state and trigger를 만드는 Interaction | Monitoring Setup, System Boundary | trigger Source gap | DPP-008, DPP-012 |
| AI Interaction | interpretation layer를 다루는 Interaction | Interpretation Boundary | interpretation as Evidence risk | DPP-006 |

## Category Coverage Matrix

| Interaction Category | Primary Interaction | Ownership | Classification | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- |
| Navigation | Entry Direction | User Driven | Primary Interaction | Medium | first direction quality |
| Selection | Entity Focus | User Driven | Primary Interaction | High | Entity ambiguity |
| Filtering | Discovery Refinement | User Driven | Primary Interaction | High | criteria persistence |
| Sorting | Discovery Refinement | User Driven | Supporting Interaction | Medium | order basis visibility |
| Searching | Search Resolution | User Driven | Primary Interaction | Medium | result grouping |
| Comparison | Evidence Inspection | User Driven | Primary Interaction | Medium | comparison basis |
| Evidence | Evidence Inspection | User Driven | Primary Interaction | Medium | Traceability depth |
| Relationship | Research Context | User Driven | Relationship Interaction | Medium | relation confidence |
| Workspace | Workspace Restore | Hybrid | Context Interaction | Low | restore fidelity |
| Monitoring | Monitoring Setup | Hybrid | Monitoring Interaction | Medium | Watchlist state |
| Timeline | Calendar Event | User Driven | Supporting Interaction | Low | Event Source |
| AI Assistance | Interpretation Boundary | Hybrid | AI Interaction | Low | methodology |
| Command | Search Resolution | User Driven | Primary Interaction | Medium | command scope |
| Context | Workspace Restore | Hybrid | Context Interaction | Low | origin restoration |
| State Transition | System Boundary | System Driven | Monitoring Interaction | Low | permission model |

## Classification Guardrail

Interaction Classification does not create new Product Domain.

It only assigns response responsibility to existing Navigation and Architecture Domains.
