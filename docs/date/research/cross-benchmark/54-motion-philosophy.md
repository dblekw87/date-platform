# Motion Philosophy

## 문서 목적

이 문서는 DATE Visual Language 1.0의 motion philosophy와 motion rule을 정의한다.

Motion은 decoration이 아니라 understanding support다. 이 문서는 build-ready animation artifacts를 작성하지 않는다.

## Motion Summary

| Metric | Count |
| --- | ---: |
| Motion Type | 8 |
| Motion Rule | 5 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |
| Open Question | 8 |

## Motion Philosophy

Motion is not decoration.

Motion must explain state, relationship, update, or context handoff.

## Motion Type Matrix

| Motion Type | Purpose | Used For | Must Communicate | Must Not Communicate | Related Principle |
| --- | --- | --- | --- | --- | --- |
| Hover | affordance discovery | controls, selectable Information | possible action | decoration | DPP-003 |
| Focus | attention and target state | Search, Entity, Evidence | current target | final decision | DPP-003, DPP-004 |
| Expand | progressive disclosure | Evidence detail, interpretation, Research | additional context | new Evidence truth | DPP-005, DPP-006 |
| Collapse | context compression | Summary, Evidence detail | preserved relation | content disappearance without context | DPP-006, DPP-009 |
| Evidence Reveal | trust boundary disclosure | Source, Freshness, method | Evidence responsibility | hidden ranking | DPP-005 |
| Workspace Transition | context restore or composition | Workspace, Journal, Monitor | origin and destination context | magical state change | DPP-009, DPP-010 |
| AI Explain | assistive interpretation | summarize, compare, reason | AI is bounded support | decision ownership | DPP-006 |
| Monitoring Update | observed state change | Watchlist, Alert, Signal | change and trigger | panic or advice | DPP-008, DPP-012 |

## Motion Rule

| Motion Rule | Meaning |
| --- | --- |
| Fast | response should not slow decision speed. |
| Predictable | same action should produce expected motion meaning. |
| Purposeful | motion must explain state, relation, or update. |
| Interruptible | user must not be trapped by motion. |
| Accessible | reduced motion preference must preserve meaning. |

## Motion Severity

| Severity | Role | Example |
| --- | --- | --- |
| Passive | subtle affordance or context | Hover, Focus |
| Informational | new context appears | Expand, Collapse |
| Evidence-bearing | trust boundary appears | Evidence Reveal |
| State-changing | saved or monitored state changes | Workspace Transition, Monitoring Update |
| Critical | user needs caution | warning or missing Source state |

## Do Not Motion

| Do Not | Reason |
| --- | --- |
| Do not animate decoration only. | It adds cognitive load without product meaning. |
| Do not hide Evidence during transition. | Evidence boundary must remain visible. |
| Do not use motion to imply certainty. | motion must not replace Source or Confidence. |
| Do not make Monitoring updates feel like advice. | monitoring is state, not decision. |
| Do not let AI motion dominate the task. | AI is assistive and bounded. |

## Open Questions

| Open Question ID | Question |
| --- | --- |
| MQ-001 | reduced motion mode에서 Evidence Reveal meaning을 어떻게 유지할 것인가 |
| MQ-002 | Monitoring Update의 urgency threshold는 무엇인가 |
| MQ-003 | Workspace Transition이 restore fidelity를 어떻게 보여줄 것인가 |
| MQ-004 | AI Explain이 decision authority처럼 보이지 않는 기준은 무엇인가 |
| MQ-005 | Expand and Collapse에서 Source context가 어떻게 유지되는가 |
| MQ-006 | Focus motion과 keyboard focus가 같은 meaning을 가지는가 |
| MQ-007 | Hover 없는 환경에서 affordance를 어떻게 전달할 것인가 |
| MQ-008 | critical motion은 언제 blocking으로 바뀌는가 |

## Phase Boundary

This document defines motion role only.

It does not define fixed timing values or animation assets.
