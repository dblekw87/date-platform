# Accessibility And Design Rules

## 문서 목적

이 문서는 DATE Visual Language 1.0의 accessibility rule과 global Do Not Design rule을 정의한다.

이 문서는 validation checklist가 아니라 future Design System의 기준 rule이다.

## Accessibility Summary

| Metric | Count |
| --- | ---: |
| Accessibility Rule | 6 |
| Do Not Rule | 8 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |
| Open Question | 10 |

## Accessibility Rule Matrix

| Accessibility Rule | Requirement | Related Visual Area | Related Principle | Open Question |
| --- | --- | --- | --- | --- |
| Contrast | Evidence, Monitoring, warning, data must remain readable. | Color, Chart, Monitoring | DPP-005, DPP-012 | contrast validation target |
| Keyboard | every primary action must remain reachable without pointer dependency. | Control, Search, Workspace | DPP-003, DPP-009 | focus order later validation |
| Reduced Motion | motion meaning must survive when motion is reduced. | Motion, Evidence Reveal | DPP-006, DPP-009 | non-motion replacement cue |
| Focus | current target must be explicit. | Search, Entity, Evidence | DPP-003, DPP-004 | focus and selected state boundary |
| Touch Area | controls must support repeated work without precision burden. | Soft Control, Monitoring | DPP-008 | target size later validation |
| Color Blind | color must not be the only state carrier. | Positive, Negative, Warning, Evidence | DPP-005, DPP-012 | secondary cue system |

## Do Not Use

| Do Not Rule | Reason | Related Principle |
| --- | --- | --- |
| Do not use strong neumorphism. | strong depth reduces professional clarity. | DPP-002 |
| Do not use neumorphism on Data Card. | data must stay flat and readable. | DPP-002, DPP-004 |
| Do not use neumorphism on Chart. | chart must stay neutral. | DPP-004 |
| Do not use excessive Glass. | glass can weaken data clarity. | DPP-009 |
| Do not use excessive blur. | blur harms readability and Evidence Traceability. | DPP-005 |
| Do not use decoration-only animation. | motion must support understanding. | DPP-007 |
| Do not overuse gradient. | gradient can imply unverified hierarchy. | DPP-005 |
| Do not overuse glow. | glow can create false urgency or importance. | DPP-008, DPP-012 |

## Architecture Alignment

| Architecture Area | Visual Requirement |
| --- | --- |
| Entry Architecture | actionable direction must be visible without decorative dominance |
| Discovery Architecture | comparison grammar must remain readable |
| Search Architecture | intent and ambiguity must be clear |
| Entity Architecture | selected Entity must stay explicit |
| Evidence Architecture | Source, Freshness, and boundary must remain visible |
| Interpretation Layer | AI and summary must stay subordinate to Evidence |
| Workflow Architecture | task handoff must preserve context |
| Monitoring Architecture | observed state must be high contrast and scoped |
| Personal Continuity | saved state must show owner and scope |
| Context Preservation | origin and return context must be visible |
| Workspace Architecture | glass layer must not own truth |
| Community Architecture | opinion boundary must stay separate |
| Research Architecture | provider and method boundary must stay visible |
| Calendar Architecture | Event timing must not imply verified Evidence alone |
| Notification Architecture | trigger and owner must remain visible |

## Open Questions

| Open Question ID | Question |
| --- | --- |
| AQ-001 | Evidence color and warning color should be visually adjacent or separate? |
| AQ-002 | high contrast Monitoring can remain calm under frequent updates? |
| AQ-003 | reduced motion replacement for Workspace Transition? |
| AQ-004 | AI Floating Layer focus handling rule? |
| AQ-005 | keyboard-first Evidence inspection path? |
| AQ-006 | color-blind secondary cue set? |
| AQ-007 | dense table readability threshold? |
| AQ-008 | glass readability boundary over varied backgrounds? |
| AQ-009 | touch target needs for expert desktop workflow? |
| AQ-010 | typography role validation for financial data? |

## Phase Boundary

This document defines accessibility and design rules only.

It does not define fixed production values or assets.
