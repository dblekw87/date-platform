# Principle Priority Matrix

## 문서 목적

이 문서는 Phase 9 DATE Product Principle의 priority, confidence, risk, and validation sequence를 정리한다.

Registry는 수정하지 않는다. Cross Validation Status는 여전히 `Pending`이다.

## Priority Summary

| Priority | Count |
| --- | ---: |
| Critical | 5 |
| High | 5 |
| Medium | 2 |
| Low | 0 |
| Total | 12 |

## Confidence Summary

| Confidence | Count |
| --- | ---: |
| High | 5 |
| Medium | 7 |
| Low | 0 |
| Total | 12 |

## Priority Matrix

| Principle ID | Principle Name | Priority | Confidence | Required Domain | Evidence Quality | Trade-off | Do Not Rule Count | Future Validation |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- |
| DPP-001 | Entry Must Produce Actionable Direction | Critical | Medium | AD-001 | Mixed | route density may overload Entry | 3 | public vs logged-in entry |
| DPP-002 | Discovery Must Produce Comparable Candidate Sets | Critical | High | AD-002 | High | filter power may burden novice user | 3 | saved filter and row context |
| DPP-003 | Search Must Resolve Intent Before Routing | High | Medium | AD-003 | Mixed | disambiguation can slow expert users | 3 | autocomplete and grouping |
| DPP-004 | Entity Context Must Own Local Analysis Modes | Critical | High | AD-004 | High | dense Entity Hub may overload user | 3 | Stock / Company / Security boundary |
| DPP-005 | Evidence Must Preserve Source, Freshness, And Boundary | Critical | Medium | AD-005 | Mixed | full Traceability can add complexity | 3 | item-level Source and method access |
| DPP-006 | Interpretation Must Never Replace Evidence | Critical | Medium | AD-006 | Mixed | boundary labels can slow reading | 3 | methodology and correction policy |
| DPP-007 | Workflow Must Carry Entity And Evidence Context | High | Medium | AD-007 | Mixed | context contracts increase coupling | 3 | actual transition cost |
| DPP-008 | Monitoring Must Be User-owned And State-aware | High | Medium | AD-008, AD-009 | Mixed | state scope increases setup cost | 3 | research state persistence |
| DPP-009 | Context Preservation Must Be Explicit At Boundaries | High | Medium | AD-010 | Mixed | visible context markers add complexity | 3 | return anchor and restoration |
| DPP-010 | Workspace Must Compose States Without Owning Truth | Medium | Medium | AD-011 | Mixed | composition creates restore complexity | 3 | linked context validation |
| DPP-011 | Opinion And Research Must Keep Evidence Boundaries | High | Medium | AD-012, AD-013 | Medium | boundary separation can fragment content | 3 | provider method and moderation |
| DPP-012 | Time And Delivery Must Depend On Evidence Context | Medium | Medium | AD-014, AD-015 | Medium | trigger detail can make signals heavier | 3 | Event relation and alert payload |

## Priority Rationale

| Priority | Criteria |
| --- | --- |
| Critical | Without this Principle, DATE cannot preserve judgment context or trust boundary. |
| High | Strong architecture value, but scope limitation or interaction validation remains. |
| Medium | Useful architecture rule, but current Evidence or Domain readiness is weaker. |
| Low | Not used in Phase 9 because rejected or unknown Pattern sources were not promoted. |

## Validation Sequence

| Sequence | Principle | Why First / Later |
| --- | --- | --- |
| V-001 | DPP-005 | Evidence boundary is the core trust contract. |
| V-002 | DPP-004 | Entity context is required before Evidence can attach correctly. |
| V-003 | DPP-002 | Discovery output should feed Entity context. |
| V-004 | DPP-003 | Search intent resolution should align with Entity context. |
| V-005 | DPP-006 | Interpretation layer depends on Evidence boundary. |
| V-006 | DPP-009 | Context Preservation depends on Entity and Evidence. |
| V-007 | DPP-007 | Workflow contract depends on Entity and Evidence handoff. |
| V-008 | DPP-008 | Monitoring depends on Entity and saved state owner. |
| V-009 | DPP-001 | Entry should be tested after downstream routes are defined. |
| V-010 | DPP-011 | Community and Research boundaries depend on Evidence. |
| V-011 | DPP-010 | Workspace depends on saved state and workflow contracts. |
| V-012 | DPP-012 | Calendar and Notification depend on Monitoring and Evidence context. |

## Architecture Alignment Count

| Item | Count |
| --- | ---: |
| Architecture Domain Covered | 15 |
| Principle Relationship | 18 |
| Dependency | 18 |
| Trade-off | 12 |
| Do Not Rule | 36 |

## Phase Boundary

This document does not update Registry and does not create new Candidate Principle IDs.

It does not define Entity Model, Information Architecture, Navigation, Wireframe, UI, or implementation.
