# Screen Flow Definition

## 문서 목적

이 문서는 Workspace 기반 Screen Flow와 Screen Dependency를 정의한다.

Screen Flow는 work purpose와 Information handoff 기준이다. production arrangement or access-path를 정의하지 않는다.

## Screen Flow Summary

| Metric | Count |
| --- | ---: |
| Screen Flow | 7 |
| Screen Dependency | 5 |
| Screen Ownership | 4 |
| Architecture Alignment | 15 |
| Product Principle Alignment | 12 |
| Visual Alignment | 8 |
| Open Question | 7 |

## Primary Screen Flow

```mermaid
flowchart LR
    WorkspaceEntry["Workspace Entry"] --> Overview["Overview"]
    Overview --> EntityDetail["Entity Detail"]
    EntityDetail --> Evidence["Evidence"]
    Evidence --> Decision["Decision Context"]
    Decision --> Monitoring["Monitoring"]
    Monitoring --> Return["Return"]
```

This diagram defines work-purpose handoff only.

It does not define arrangement, access-path, or build artifact.

## Screen Flow Matrix

| Flow Step | Purpose | Input | Output | Required Screen Family | Required Screen Type | Required Context | Preserved Context | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Workspace Entry | work purpose 선택 | User, Market, saved intent | Workspace context | Dashboard, Workspace | Overview | User or Market | work purpose | DPP-001, DPP-010 | Medium | authenticated entry |
| Overview | broad context and next action | Market, Monitoring, Personal | next target context | Dashboard, Watchlist | Overview, Monitoring | Market | selected direction | DPP-001, DPP-008 | Medium | overview density |
| Entity Detail | selected Entity focus | Security, Company | Entity context | Security, Company | Detail | selected Entity | Entity identity | DPP-004 | High | Security vs Company |
| Evidence | trust boundary inspection | Evidence, Source | trust-calibrated context | Evidence, Research | Detail, Relationship | Evidence, Source | Source and Freshness | DPP-005, DPP-011 | Medium | Traceability depth |
| Decision Context | user reasoning context | Evidence, Strategy | decision-ready context candidate | Journal, AI Assistant | Workspace, Assistant | Evidence, Context | reasoning context | DPP-006, DPP-007 | Low | AI and Journal boundary |
| Monitoring | observed state | Security, Signal, Watchlist | monitored context | Monitoring, Watchlist | Monitoring | User, Security | trigger Source | DPP-008, DPP-012 | Medium | Alert payload |
| Return | revisit or restore | Context, Workspace, Personal | restored context candidate | Workspace, Dashboard, Profile | Workspace, Overview | Context | origin reference | DPP-009, DPP-010 | Low | restore fidelity |

## Screen Dependency

| Dependency Level | Name | Definition |
| --- | --- | --- |
| Level 1 | Workspace | work purpose owner |
| Level 2 | Screen Family | Information responsibility group |
| Level 3 | Screen Type | reusable structure role |
| Level 4 | Zone | responsibility unit |
| Level 5 | Implementation Unit Undefined | later production unit, not defined here |

## Screen Ownership

| Ownership Role | Definition |
| --- | --- |
| Owner | Screen responsibility owner |
| Consumer | next Domain or Screen Family using output |
| Producer | Information or Interaction producing Screen context |
| Observer | user or system reading state |

## Flow Guardrail

Screen Flow is not production access-path design.

It defines work-purpose sequence and context preservation responsibility only.
