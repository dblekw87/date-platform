# Open Question Matrix

## 문서 목적

이 문서는 Pattern별 남은 Open Question, 필요한 Benchmark, Priority를 기록한다.

## Priority 기준

| Priority | Definition |
| --- | --- |
| High | DATE Product Rule 후보 판단 전에 반드시 확인 필요 |
| Medium | Synthesis 단계에서 scope limitation으로 유지 가능 |
| Low | Benchmark-specific 또는 access-limited 후속 검증 대상 |

## Matrix

| Pattern ID | Pattern | Unknown | Needed Benchmark | Priority |
| --- | --- | --- | --- | --- |
| PT-001 | Market / Portal Entry | logged-in Home과 professional entry의 responsibility 차이 | Koyfin, Bloomberg, Yahoo Finance | Medium |
| PT-002 | Entity-directed Search | result grouping, autocomplete, entity type disambiguation | Koyfin, Bloomberg, SaveTicker | High |
| PT-003 | Display Unit as Navigation Unit | row default action, external vs internal target 표시 | Finviz, Yahoo Finance, SaveTicker | Medium |
| PT-004 | Task-specific AI Tool Packaging | AI Tool의 Source grounding과 task completion | EidosLayer follow-up, AI benchmark | High |
| PT-005 | Market-attached Participation | moderation, author identity, Opinion / Evidence boundary | TradingView, SaveTicker | High |
| PT-006 | Watchlist as Continuity Entry | Watchlist가 research state를 저장하는가 | TradingView, Koyfin, Yahoo Finance | High |
| PT-007 | Source / Freshness / Provider Signal | item-level Source와 provider category의 차이 | Koyfin, Yahoo Finance, Bloomberg | High |
| PT-008 | AI Source Identity Separation | persona, model output, Source identity separation | EidosLayer, SaveTicker, future AI surfaces | High |
| PT-009 | Surface Specialization vs Context Preservation | internal return path와 state restoration | Finviz, Yahoo Finance, SaveTicker | High |
| PT-010 | Live Loading / Data Availability State | live, delayed, stale, loading vocabulary | EidosLayer, Yahoo Finance, Koyfin | Medium |
| PT-011 | Chart-centered Workspace | Chart가 primary Workspace인지 supporting View인지 | TradingView, Koyfin, Bloomberg | Medium |
| PT-012 | Entity Hub with Local Analysis Modes | Stock, Company, Security boundary | TradingView, Yahoo Finance, Bloomberg | High |
| PT-013 | Screener Table Discovery | filter persistence와 row-to-entity context | Finviz, Koyfin, Yahoo Finance | High |
| PT-014 | Split Personal State | state owner, persistence scope, restore behavior | TradingView, Koyfin, Yahoo Finance, Bloomberg | High |
| PT-015 | Symbol-level Document Evidence | News claim과 Document relation | TradingView, Koyfin, Bloomberg | Medium |
| PT-016 | Dashboard Research Composition | Dashboard vs Workspace vs Home boundary | Koyfin, Bloomberg, TradingView | Medium |
| PT-017 | Command / Function Entry | autocomplete, recent, function discoverability | Koyfin, Bloomberg | High |
| PT-018 | Table / Chart / Heatmap Role Separation | view switching cost와 methodology visibility | Finviz, Yahoo Finance, Bloomberg | Medium |
| PT-019 | Reported / Estimate / Consensus Label | estimate Source, revision timestamp, consensus method | Koyfin, Yahoo Finance, Bloomberg | High |
| PT-020 | Methodology Documentation Layer | inline methodology access vs Help lookup | Koyfin, Finviz, Yahoo Finance | Medium |
| PT-021 | Linked Workspace Context | linking rule, exception, persistence | Koyfin, Bloomberg | High |
| PT-022 | Filter / Result Co-location | novice cost and expert efficiency trade-off | Finviz, Yahoo Finance, Koyfin | Medium |
| PT-023 | Dense Entity Hub | overload control, mobile adaptation, ad competition | Finviz, Yahoo Finance | Medium |
| PT-024 | External Evidence Link with Context Loss | return path, saved evidence, source citation persistence | Finviz, Yahoo Finance, SaveTicker | High |
| PT-025 | Repeated Row / Table Grammar | novice onboarding and mobile readability | Finviz, Yahoo Finance, Bloomberg, SaveTicker | Medium |
| PT-026 | Portal Bridge from Passive to Active Research | content hierarchy and research focus | Yahoo Finance, Bloomberg, SaveTicker | Medium |
| PT-027 | Provider-labeled Research Module | provider identity vs item-level Traceability | Yahoo Finance, Bloomberg, Koyfin | High |
| PT-028 | Product Family Layer Boundary | context transfer contract across Product Layer | Bloomberg, Yahoo Finance, SaveTicker | Medium |
| PT-029 | Professional Workflow Density | actual transition cost and context propagation | Bloomberg, Koyfin, TradingView | High |
| PT-030 | Evidence-preserving Interpretation Layer | methodology, update time, correction policy | SaveTicker, EidosLayer, Yahoo Finance | High |

## Open Question Count

| Priority | Count |
| --- | ---: |
| High | 17 |
| Medium | 13 |
| Low | 0 |
| Total | 30 |

## Synthesis 전 유지할 제한

- Cross Validation Status는 모두 `Pending`이다.
- Insufficient Pattern은 DATE Product Rule 후보로 승격하지 않는다.
- Benchmark-specific Pattern은 다른 Benchmark 또는 user research 없이 일반화하지 않는다.
- Potential Contradiction은 직접 반대 Evidence가 있을 때만 기록한다.
