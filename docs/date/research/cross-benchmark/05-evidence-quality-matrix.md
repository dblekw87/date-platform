# Evidence Quality Matrix

## 문서 목적

이 문서는 Pattern별 Evidence Strength, Confidence, Evidence Gap을 정리한다.

## Evidence Quality 분포

| Evidence Quality | Count |
| --- | ---: |
| High | 11 |
| Medium | 13 |
| Low | 6 |
| Total | 30 |

## Matrix

| Pattern ID | Pattern | Evidence Strength | Confidence | Primary Evidence | Evidence Gap |
| --- | --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | High | High | Public Home / Portal Observation across multiple benchmarks | logged-in entry and professional entry differ |
| PT-002 | Entity-directed Search | High | High | Search and Command documentation / observation | result grouping and autocomplete incomplete |
| PT-003 | Display Unit as Navigation Unit | Medium | Medium | Card, row, list transitions | click target and return behavior vary |
| PT-004 | Task-specific AI Tool Packaging | Low | Low | EidosLayer only | cross-benchmark support insufficient |
| PT-005 | Market-attached Participation | Medium | Medium | EidosLayer, TradingView, SaveTicker candidates | moderation, author identity, Evidence boundary |
| PT-006 | Watchlist as Continuity Entry | Medium | Medium | Watchlist docs and public candidates | persistence and research continuity not verified |
| PT-007 | Source / Freshness / Provider Signal | High | High | repeated Source, timestamp, delay, provider cues | item-level Source often missing |
| PT-008 | AI Source Identity Separation | Low | Low | EidosLayer AI disclosure, SaveTicker variant | few products expose comparable AI layer |
| PT-009 | Surface Specialization vs Context Preservation | Medium | Medium | multiple Flow and context loss records | return state often unknown |
| PT-010 | Live Loading / Data Availability State | Low | Low | EidosLayer loading, documentation variants | live/stale state not systematically tested |
| PT-011 | Chart-centered Workspace | Medium | Medium | TradingView Supercharts, Koyfin / Bloomberg variants | workspace persistence and state boundary |
| PT-012 | Entity Hub with Local Analysis Modes | High | High | TradingView, Finviz, Yahoo Finance | Company vs Security boundary still open |
| PT-013 | Screener Table Discovery | High | High | TradingView, Koyfin, Finviz, Yahoo Finance | saved filter and row return state |
| PT-014 | Split Personal State | Medium | Medium | TradingView and Koyfin documentation | persistence, access boundary, restore behavior |
| PT-015 | Symbol-level Document Evidence | Medium | Medium | TradingView Documents, Koyfin candidates | claim-to-document relation not verified |
| PT-016 | Dashboard Research Composition | Medium | Medium | Koyfin documentation, Bloomberg / TradingView variants | actual default dashboard and persistence |
| PT-017 | Command / Function Entry | Medium | Medium | Koyfin documentation, Bloomberg Product Description | command execution, autocomplete, recent |
| PT-018 | Table / Chart / Heatmap Role Separation | High | High | Koyfin, Finviz, Yahoo Finance, Bloomberg | heatmap methodology and chart source |
| PT-019 | Reported / Estimate / Consensus Label | Medium | Medium | Koyfin documentation | estimate provider and revision timestamp |
| PT-020 | Methodology Documentation Layer | High | High | Koyfin, Finviz, Yahoo Finance documentation | inline discoverability |
| PT-021 | Linked Workspace Context | Low | Low | Koyfin documentation and Bloomberg candidate | actual linking and persistence not verified |
| PT-022 | Filter / Result Co-location | High | High | Finviz public observation, screener variants | complex filter learning cost |
| PT-023 | Dense Entity Hub | High | High | Finviz Stock Quote, Yahoo / TradingView variants | overload and mobile adaptation |
| PT-024 | External Evidence Link with Context Loss | High | High | Finviz, Yahoo, SaveTicker external evidence candidates | return path and evidence saving |
| PT-025 | Repeated Row / Table Grammar | High | High | Finviz, Yahoo, Bloomberg, SaveTicker | novice and mobile readability |
| PT-026 | Portal Bridge from Passive to Active Research | Medium | Medium | Yahoo, Bloomberg, SaveTicker variants | content hierarchy and logged-in personalization |
| PT-027 | Provider-labeled Research Module | Medium | Medium | Yahoo Premium, Bloomberg research products | item-level Traceability |
| PT-028 | Product Family Layer Boundary | Medium | Medium | Bloomberg Product Boundary | context transfer not verified |
| PT-029 | Professional Workflow Density | Medium | Medium | Bloomberg Product Description | no direct Terminal workflow validation |
| PT-030 | Evidence-preserving Interpretation Layer | Medium | Medium | SaveTicker AI Summary / Translation controls | methodology, correction, update time |

## High Evidence Pattern

High Evidence는 multi-benchmark public observation 또는 official documentation이 반복된 Pattern이다. High Evidence도 Cross Validation 완료를 의미하지 않는다.

## Medium Evidence Pattern

Medium Evidence는 supporting benchmark가 있거나 official documentation이 강하지만, interaction, persistence, context transfer가 제한된 Pattern이다.

## Low Evidence Pattern

Low Evidence는 단일 Benchmark 중심이거나 access-limited / documentation-only 의존이 강한 Pattern이다. 신규 DATE Product Rule 후보로 직접 승격하지 않는다.
