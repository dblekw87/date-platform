# Generalizability Matrix

## 문서 목적

이 문서는 Pattern이 어느 범위까지 일반화 가능한지 분류한다. 이는 DATE Product Principle 확정이 아니다.

## Generalizability 분포

| Generalizability | Count |
| --- | ---: |
| General | 4 |
| Finance | 17 |
| Professional | 5 |
| News | 2 |
| Platform-specific | 2 |
| Total | 30 |

## Matrix

| Pattern ID | Pattern | General | Finance | Professional | News | Platform-specific | Primary Classification | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | No | Yes | No | No | No | Finance | Market orientation이 핵심이다. |
| PT-002 | Entity-directed Search | Yes | Yes | No | No | No | Finance | Entity routing은 일반화 가능하지만 ticker / Symbol context가 강하다. |
| PT-003 | Display Unit as Navigation Unit | Yes | Yes | No | No | No | General | Card / row as Navigation unit은 domain-independent다. |
| PT-004 | Task-specific AI Tool Packaging | No | Yes | No | No | Yes | Platform-specific | EidosLayer 중심 Evidence다. |
| PT-005 | Market-attached Participation | No | Yes | No | No | No | Finance | Market object 중심 Discussion이다. |
| PT-006 | Watchlist as Continuity Entry | No | Yes | No | No | No | Finance | Watchlist / monitoring context가 finance-specific이다. |
| PT-007 | Source / Freshness / Provider Signal | Yes | Yes | No | Yes | No | General | Source와 Freshness는 여러 information product에 적용 가능하다. |
| PT-008 | AI Source Identity Separation | Yes | No | No | Yes | Yes | Platform-specific | AI persona / generated content가 있는 product에 제한된다. |
| PT-009 | Surface Specialization vs Context Preservation | Yes | Yes | No | No | No | General | specialized Surface와 context loss는 범용 문제다. |
| PT-010 | Live Loading / Data Availability State | No | Yes | No | No | No | Finance | live / delayed Market data context가 강하다. |
| PT-011 | Chart-centered Workspace | No | Yes | Yes | No | No | Professional | chart-heavy analyst workflow에 적합하다. |
| PT-012 | Entity Hub with Local Analysis Modes | No | Yes | No | No | No | Finance | Stock / Symbol / Security context 중심이다. |
| PT-013 | Screener Table Discovery | No | Yes | No | No | No | Finance | investable universe filtering 구조다. |
| PT-014 | Split Personal State | Yes | Yes | No | No | No | General | saved state owner 분리는 범용이다. |
| PT-015 | Symbol-level Document Evidence | No | Yes | No | No | No | Finance | filings / transcripts 같은 finance Evidence가 중심이다. |
| PT-016 | Dashboard Research Composition | No | Yes | Yes | No | No | Professional | configurable research dashboard에 적합하다. |
| PT-017 | Command / Function Entry | No | Yes | Yes | No | No | Professional | expert navigation과 command literacy가 필요하다. |
| PT-018 | Table / Chart / Heatmap Role Separation | No | Yes | No | No | No | Finance | comparison form 분리가 finance analysis에 강하다. |
| PT-019 | Reported / Estimate / Consensus Label | No | Yes | Yes | No | No | Finance | analyst estimate와 financial reporting context다. |
| PT-020 | Methodology Documentation Layer | Yes | Yes | No | No | No | General | methodology explanation은 domain-independent trust layer다. |
| PT-021 | Linked Workspace Context | No | Yes | Yes | No | No | Professional | multi-panel professional workspace에 제한된다. |
| PT-022 | Filter / Result Co-location | Yes | Yes | No | No | No | Finance | 범용 filter loop지만 Screener context가 강하다. |
| PT-023 | Dense Entity Hub | No | Yes | Yes | No | No | Finance | Stock / Symbol hub에 최적화되어 있다. |
| PT-024 | External Evidence Link with Context Loss | Yes | Yes | No | Yes | No | General | external source validation은 여러 content product에 적용 가능하다. |
| PT-025 | Repeated Row / Table Grammar | No | Yes | No | No | No | Finance | Market scan과 table comparison에 강하다. |
| PT-026 | Portal Bridge from Passive to Active Research | No | Yes | No | Yes | No | Finance | Market / News portal에서 research entry로 전환한다. |
| PT-027 | Provider-labeled Research Module | No | Yes | Yes | No | No | Finance | premium / professional research provider context다. |
| PT-028 | Product Family Layer Boundary | No | No | Yes | No | Yes | Platform-specific | multi-product family와 enterprise layer에 제한된다. |
| PT-029 | Professional Workflow Density | No | Yes | Yes | No | No | Professional | professional task transition cost가 핵심이다. |
| PT-030 | Evidence-preserving Interpretation Layer | Yes | Yes | No | Yes | No | News | summary / translation / interpretation이 있는 content product에 적용 가능하다. |

## Generalization 제한

- `General`로 분류된 Pattern도 DATE 적용을 확정하지 않는다.
- `Finance` Pattern은 Stock / Market / Security context를 전제로 한다.
- `Professional` Pattern은 expert workflow와 setup cost를 함께 평가해야 한다.
- `News` Pattern은 Original Article, Source, interpretation layer boundary가 필요하다.
- `Platform-specific` Pattern은 추가 Benchmark 없이는 DATE Product Rule로 승격하지 않는다.
