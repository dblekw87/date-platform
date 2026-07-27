# Phase 1.1 요약 문서

## Scope 요약

- Service: EidosLayer
- Access Date: 2026-07-27
- Access Mode: Public, not logged in
- Product Surface Count: 10 recorded surfaces
- Screen Count: 10 recorded screen types
- Research Scenarios Attempted: 12
- Completed Scenarios: 1 fully possible, 8 partially possible, 3 not verified

## 확인한 제품 표면 수

10 product surfaces were recorded:

1. Home
2. Stocks / Market
3. Eidos AI
4. Insight Feed
5. Community
6. EidosMarket
7. Circuit Breaker AI Waiting Room
8. News List / Detail
9. Theme List / Detail
10. Search Result

## 완료하지 못한 Journey

- S-005 동일 산업 경쟁사 비교
- S-009 알림 생성 가능성 확인
- S-010 다음 날 동일 분석 재개

Several other scenarios were only partially possible because detail routes, login-gated tools, or dynamic data were unavailable in public observation.

## 주요 Navigation Pattern

- Global navigation mixes market, AI, news/insight, discussion, and prediction destinations.
- Bottom navigation repeats core destinations on subpages.
- Home acts as a route hub with search, market desk, news, and shortcuts.
- Stocks combines personal watchlist entry and public ranking filters.
- Community is stock-oriented and links discussion to stock context.
- No verified side panel or overlay navigation was observed.

## 주요 Entity 후보

Observed:

- Market
- Stock
- Watchlist
- News
- Source
- Insight
- Persona
- AI Tool
- Discussion
- Prediction Market
- Topic

Partially observed or hypothesized:

- Market Event
- Theme
- Crypto
- Metric
- Company
- Industry

## 주요 Information Density Pattern

- Public surfaces prefer compact route cards, lists, filters, and loading-aware modules.
- Home optimizes for market orientation and route selection rather than dense terminal-style analysis.
- Stocks appears designed for ranking and monitoring but live quote data was not loaded in the extraction.
- Insight Feed is filter-heavy and content-light in the observed state.
- EidosMarket uses probability and vote count as compact scan metadata.

## 주요 Trust Pattern

- News cards expose publisher and relative timestamp.
- AI persona content includes explicit disclosure that it is not real-person speech.
- Live/freshness labels are frequent.
- Methodology and source traceability are not consistently visible in public surfaces.
- AI detailed comments, live data, and member-only tools require login.

## 가장 강한 설계 결정

EidosLayer appears to combine market discovery, stock-first navigation, and task-specific AI tools around "what is happening now?" rather than around a traditional portfolio-first dashboard.

This is an interpretation, not a DATE recommendation.

## 가장 큰 구조적 약점

Public observation shows many intended routes but several key decision-support details are unavailable, loading, login-gated, or not verified. This makes it hard for a non-logged-in user to complete evidence validation and continuity scenarios.

## DATE 가설에 영향을 준 관찰

- H-001: Stock search is visible, but broad entity search is not verified.
- H-002: Event/cause AI surfaces exist, but News-to-Event entity structure is not verified.
- H-004: Home supports market discovery interpretation.
- H-005: Evidence Graph remains insufficiently supported.
- H-006: Context preservation is insufficiently evidenced.
- H-007: Watchlist as personal navigation is suggested by page placement and empty state.
- H-009: Source/time and AI disclosure provide partial support.
- H-011: Macro surfaces exist but macro-to-stock relation is not verified.
- H-013: Event/circuit breaker AI hints at event monitoring, but alerts are not observed.
- H-014: Cross-session continuity is not verified.
- H-015: Market discovery grouping is visible, but cause grouping is only partially evidenced.

## 기존 Hypothesis의 상태 변경 제안

No original Phase 0 hypothesis was modified. Recommended evidence status is recorded separately in [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md).

## 다음 Benchmark 조사 시 보완할 기준

- Capture whether Search supports multiple entity types.
- Record whether News Detail exposes original source URL, related entities, and timestamps.
- Separate Watchlist as monitoring, navigation, and continuity.
- Measure whether context is preserved across route transitions.
- Record loaded vs loading vs stale states.
- Capture whether AI output provides source citations.
- Test mobile navigation with explicit viewport evidence.
