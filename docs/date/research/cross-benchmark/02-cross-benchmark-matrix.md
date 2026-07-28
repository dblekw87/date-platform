# Cross Benchmark Matrix

## 문서 목적

이 문서는 Pattern별 Benchmark coverage를 `Observed`, `Variant`, `Partial`, `Not Present`, `Insufficient`로 분류한다.

## Status 정의

| Status | Definition |
| --- | --- |
| Observed | 해당 Benchmark에서 Pattern의 핵심 구조가 확인됨 |
| Variant | 같은 user problem을 다른 구조로 해결함 |
| Partial | 일부 Surface 또는 official description만 확인됨 |
| Not Present | 조사 범위에서 해당 Pattern이 나타나지 않음 |
| Insufficient | 존재 후보는 있으나 판단하기에 Evidence 부족 |

## Matrix

| Pattern ID | Pattern | EidosLayer | TradingView | Koyfin | Finviz | Yahoo | Bloomberg | SaveTicker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | Observed | Observed | Insufficient | Observed | Variant | Variant | Variant |
| PT-002 | Entity-directed Search | Observed | Variant | Variant | Partial | Observed | Variant | Insufficient |
| PT-003 | Display Unit as Navigation Unit | Observed | Observed | Insufficient | Observed | Partial | Partial | Partial |
| PT-004 | Task-specific AI Tool Packaging | Observed | Insufficient | Insufficient | Not Present | Not Present | Not Present | Variant |
| PT-005 | Market-attached Participation | Observed | Observed | Insufficient | Not Present | Partial | Partial | Insufficient |
| PT-006 | Watchlist as Continuity Entry | Partial | Observed | Observed | Partial | Partial | Partial | Insufficient |
| PT-007 | Source / Freshness / Provider Signal | Observed | Observed | Observed | Observed | Observed | Partial | Observed |
| PT-008 | AI Source Identity Separation | Observed | Insufficient | Insufficient | Not Present | Not Present | Partial | Variant |
| PT-009 | Surface Specialization vs Context Preservation | Partial | Variant | Variant | Observed | Partial | Variant | Partial |
| PT-010 | Live Loading / Data Availability State | Observed | Insufficient | Partial | Partial | Partial | Partial | Not Present |
| PT-011 | Chart-centered Workspace | Not Present | Observed | Variant | Partial | Partial | Variant | Not Present |
| PT-012 | Entity Hub with Local Analysis Modes | Insufficient | Observed | Partial | Observed | Observed | Variant | Insufficient |
| PT-013 | Screener Table Discovery | Not Present | Observed | Observed | Observed | Observed | Partial | Not Present |
| PT-014 | Split Personal State | Partial | Observed | Observed | Partial | Partial | Insufficient | Insufficient |
| PT-015 | Symbol-level Document Evidence | Not Present | Observed | Partial | Variant | Partial | Partial | Not Present |
| PT-016 | Dashboard Research Composition | Not Present | Variant | Observed | Variant | Partial | Variant | Not Present |
| PT-017 | Command / Function Entry | Not Present | Variant | Observed | Not Present | Not Present | Variant | Not Present |
| PT-018 | Table / Chart / Heatmap Role Separation | Partial | Variant | Observed | Observed | Observed | Partial | Partial |
| PT-019 | Reported / Estimate / Consensus Label | Not Present | Partial | Observed | Partial | Partial | Partial | Not Present |
| PT-020 | Methodology Documentation Layer | Insufficient | Partial | Observed | Observed | Observed | Partial | Insufficient |
| PT-021 | Linked Workspace Context | Not Present | Partial | Partial | Not Present | Not Present | Insufficient | Not Present |
| PT-022 | Filter / Result Co-location | Not Present | Variant | Variant | Observed | Variant | Partial | Insufficient |
| PT-023 | Dense Entity Hub | Not Present | Variant | Partial | Observed | Variant | Variant | Insufficient |
| PT-024 | External Evidence Link with Context Loss | Partial | Partial | Insufficient | Observed | Partial | Insufficient | Partial |
| PT-025 | Repeated Row / Table Grammar | Partial | Variant | Variant | Observed | Observed | Observed | Observed |
| PT-026 | Portal Bridge from Passive to Active Research | Observed | Partial | Insufficient | Partial | Observed | Variant | Variant |
| PT-027 | Provider-labeled Research Module | Not Present | Partial | Variant | Partial | Observed | Observed | Insufficient |
| PT-028 | Product Family Layer Boundary | Not Present | Partial | Variant | Variant | Variant | Observed | Partial |
| PT-029 | Professional Workflow Density | Not Present | Variant | Variant | Not Present | Partial | Observed | Insufficient |
| PT-030 | Evidence-preserving Interpretation Layer | Variant | Not Present | Insufficient | Not Present | Partial | Partial | Observed |

## Coverage 요약

| Status | Approximate Coverage Count |
| --- | ---: |
| Observed | 52 |
| Variant | 43 |
| Partial | 50 |
| Not Present | 39 |
| Insufficient | 26 |

이 count는 Pattern별 classification을 빠르게 비교하기 위한 working count다. Cross Validation 완료를 의미하지 않는다.
