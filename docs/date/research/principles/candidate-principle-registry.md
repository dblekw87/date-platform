# Candidate Principle Registry 문서

이 Registry는 Benchmark Observation에서 추출한 Candidate Product Principle을 추적한다. Registry 항목은 DATE의 Design Decision이 아니다.

`Cross Validation Status`는 추가 Benchmark 비교가 끝나기 전까지 `Pending`으로 유지한다. `Supporting Benchmarks`는 supporting Observation이 존재하는 Benchmark만 기록한다. 이는 해당 Principle이 확정되었다는 의미가 아니다.

| Principle ID | Candidate Principle | Category | Source Benchmarks | Supporting Benchmarks | Contradicting Benchmarks | Confidence | Cross Validation Status | Evidence References | Notes |
| ------------ | ------------------- | -------- | ----------------- | --------------------- | ------------------------ | ---------- | ----------------------- | ------------------- | ----- |
| P-001 | Home may operate as a Market Discovery Entry rather than a static landing page | Entry Model | EidosLayer | EidosLayer | Not Evaluated | High | Pending | [P-001](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-001) | Portfolio-first, Search-first, Workspace-first 진입 모델과 비교 검증이 필요하다. |
| P-002 | Search may function as stock-first entity navigation rather than broad discovery | Search / Entity Navigation | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-002](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-002) | 광범위한 multi-entity Search는 검증되지 않았다. |
| P-003 | Cards and lists may act primarily as navigation units | Screen System Candidate | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-003](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-003) | Card 내부 Evidence 깊이는 검증되지 않았다. |
| P-004 | AI may be packaged as task-specific market tools | AI Interaction | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-004](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-004) | AI Source grounding은 검증되지 않았다. |
| P-005 | Participation may be attached to market objects | Participation / Community | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-005](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-005) | Sentiment와 Evidence의 경계 검증이 필요하다. |
| P-006 | Watchlist may teach personal continuity before proving research continuity | Personal Continuity | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-006](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-006) | Persistence와 Research state continuity는 검증되지 않았다. |
| P-007 | Freshness and source cues may be exposed before deep evidence | Trust / Evidence | EidosLayer | EidosLayer | Not Evaluated | High | Pending | [P-007](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-007) | 원문 Source traceability는 검증되지 않았다. |
| P-008 | AI persona content may require explicit source-identity separation | Trust / AI Disclosure | EidosLayer | EidosLayer | Not Evaluated | High | Pending | [P-008](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-008) | Disclosure만으로 claim provenance가 검증되지는 않는다. |
| P-009 | Page-based specialization may trade clarity for context preservation risk | Context Preservation | EidosLayer | EidosLayer | Not Evaluated | Low | Pending | [P-009](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-009) | Side panel, overlay, retained workspace는 검증되지 않았다. |
| P-010 | Loading states may be part of live-market UX, not only system feedback | State / Freshness | EidosLayer | EidosLayer | Not Evaluated | Medium | Pending | [P-010](../benchmarks/eidoslayer/12-candidate-design-principles.md#p-010) | stale, delayed, unavailable State Pattern과 비교가 필요하다. |
