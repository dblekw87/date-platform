# 벤치마크 TradingView Phase 2 Quality Review 문서

## 검토 범위

다음 TradingView Benchmark 문서를 검토했다.

- [README.md](README.md)
- [00-access-and-method.md](00-access-and-method.md)
- [01-product-surface-map.md](01-product-surface-map.md)
- [02-navigation-map.md](02-navigation-map.md)
- [03-screen-inventory.md](03-screen-inventory.md)
- [04-core-journey-observations.md](04-core-journey-observations.md)
- [05-entity-and-relationship-observations.md](05-entity-and-relationship-observations.md)
- [06-information-density-observations.md](06-information-density-observations.md)
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md)
- [08-strengths-frictions-and-open-questions.md](08-strengths-frictions-and-open-questions.md)
- [09-phase-2-summary.md](09-phase-2-summary.md)
- [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md)
- [11-product-flow-architecture.md](11-product-flow-architecture.md)
- [12-candidate-design-principles.md](12-candidate-design-principles.md)
- [candidate-principle-registry.md](../../principles/candidate-principle-registry.md)

비교 기준으로 EidosLayer 문서 묶음을 읽었다. EidosLayer 문서는 수정하지 않았다.

## 주요 Findings

| Finding | 조치 |
| ------- | ---- |
| S-005가 특정 Industry 경쟁사 비교를 직접 수행하지 않았음에도 `가능`으로 기록되어 있었다. | `부분 가능`으로 하향 조정했다. |
| Watchlist, Alert, Layout이 Entity처럼 읽힐 수 있었다. | `User State Candidate`로 낮추고 Candidate Type 컬럼을 추가했다. |
| P-002와 P-009가 직접 Contradicting으로 읽힐 수 있었다. | 직접 반박이 아니라 Variant Pattern 또는 Insufficient Evidence로 재분류했다. |
| TradingView 고유 Pattern 5개가 기존 Principle에 과도하게 병합되어 있었다. | P-011~P-015로 분리했다. |
| Registry에 `Insufficient Benchmarks` 컬럼이 없었다. | 컬럼을 추가하고 모든 Principle에 분류를 기록했다. |

## 수정 내용

- README에 Phase 2 Surface, Flow, Principle, Review 역할과 Registry 연결을 추가했다.
- `04-core-journey-observations.md`에서 S-005 수행 가능 여부를 `부분 가능`으로 낮췄다.
- `05-entity-and-relationship-observations.md`에 Candidate Type 컬럼을 추가했다.
- Watchlist, Alert, Layout을 `User State Candidate`로 정리했다.
- Chart를 `Workspace Surface Candidate`로 정리했다.
- Document를 `Evidence Surface Candidate`로 정리했다.
- `09-phase-2-summary.md`의 Candidate Principle 수를 15개로 갱신했다.
- `12-candidate-design-principles.md`에 P-011~P-015를 추가했다.
- Registry에 `Insufficient Benchmarks` 컬럼을 추가했다.
- P-002와 P-009를 직접 Contradicting이 아니라 Variant Pattern으로 정리했다.

## 검토 Observation Review

| 항목 | 수 |
| ---- | -- |
| 총 Observation 수 | 63 |
| 유지 | 62 |
| 하향 조정 | 1 |
| 삭제 | 0 |
| 최종 Observation 수 | 68 |

최종 Observation 수가 증가한 이유는 P-011~P-015 Candidate Principle에 기존 TradingView Observation을 재사용해 Principle 단위 Observation 필드를 추가했기 때문이다. 새로운 웹 조사나 새로운 Benchmark Observation은 추가하지 않았다.

## 검토 Candidate Principle Review

| 항목 | 수 |
| ---- | -- |
| 기존 수 | 10 |
| 유지 | 10 |
| 수정 | 2 |
| 추가 | 5 |
| 병합 | 0 |
| 삭제 | 0 |
| 최종 수 | 15 |

추가한 Principle은 다음과 같다.

- P-011: Chart may operate as the primary workspace context, not only a visualization component
- P-012: Symbol pages may use tabs to separate analysis modes inside one entity context
- P-013: Screener tables may serve as discovery and comparison surfaces before entity analysis
- P-014: Personal continuity may be split across Watchlist, Alert, Layout, and saved screen states
- P-015: Documents may act as a symbol-level evidence surface distinct from News and Community

## 변경 Confidence

| Principle ID | 변경 | 이유 |
| ------------ | ---- | ---- |
| P-002 | Medium 유지 | TradingView는 stock-first Search를 직접 반박하지 않고 Symbol Context Selection이라는 Variant Pattern을 제공한다. |
| P-004 | Low 유지 | TradingView에서 AI Tool Surface가 확인되지 않았다. |
| P-008 | Low 유지 | AI Persona 또는 AI Disclosure Pattern을 확인하지 못했다. |
| P-009 | Medium 유지 | TradingView는 page-based risk를 직접 반박하기보다 Contextual Panel을 통한 보완형 Pattern을 제공한다. |
| P-010 | Low 유지 | Loading, stale, delayed State Pattern은 충분히 확인하지 못했다. |
| P-011 | Medium | Supercharts Help Center Evidence가 있으나 직접 interaction은 제한적이다. |
| P-012 | High | Symbol Page 탭은 공식 Product 화면에서 직접 확인했다. |
| P-013 | High | US Stocks Table과 공식 Screener 문서가 함께 존재한다. |
| P-014 | Medium | Watchlist, Alert, Layout 설명은 공식 문서 기반이며 로그인 이후 persistence는 직접 확인하지 않았다. |
| P-015 | Medium | Documents 탭은 확인했지만 원문 접근 깊이는 공식 문서 보완 수준이다. |

## 변경 Registry

- `Insufficient Benchmarks` 컬럼을 추가했다.
- Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal은 아직 조사하지 않았으므로 Notes에서 `Not Evaluated`로만 표시했다.
- P-002의 TradingView 분류를 `Contradicting Benchmarks`에서 `Insufficient Benchmarks`로 이동했다.
- P-009의 TradingView 분류를 `Contradicting Benchmarks`에서 Notes의 Variant Pattern으로 이동했다.
- P-011~P-015를 TradingView source Candidate Principle로 추가했다.
- 모든 `Cross Validation Status`는 `Pending`으로 유지했다.
- 확정 완료로 읽히는 표현은 사용하지 않았다.

## 비교 EidosLayer 분류

### Shared Pattern

- P-001: Home may operate as a Market Discovery Entry rather than a static landing page
- P-003: Cards and lists may act primarily as navigation units
- P-005: Participation may be attached to market objects
- P-006: Watchlist may teach personal continuity before proving research continuity
- P-007: Freshness and source cues may be exposed before deep evidence

### Variant Pattern

- P-002: TradingView는 stock-first Search보다 Symbol Context Selection에 가깝다.
- P-009: TradingView는 page-based specialization risk를 Contextual Panel로 보완한다.

### Contradicting Pattern

이번 Review 후 직접 Contradicting Pattern으로 남긴 항목은 없다.

### Benchmark-specific Pattern

- P-011: Chart-centered Workspace
- P-012: Symbol Hub Tabs
- P-013: Table-first Screener Discovery
- P-014: State Continuity Separation
- P-015: Documents as Symbol Evidence Surface

### Insufficient Evidence

- P-004: TradingView AI Tool Surface
- P-008: TradingView AI Persona / AI Disclosure
- P-010: TradingView Loading, stale, delayed State Pattern
- Mobile Navigation
- Login 이후 Watchlist, Alert, Layout persistence
- Search Result grouping
- Macro Event to Symbol impact

## 남아 있는 제한사항

- Login 이후 Watchlist, Alert, saved screen 작성 Flow는 직접 수행하지 않았다.
- Mobile Navigation은 직접 확인하지 않았다.
- Paid 기능 제한은 상세 검증하지 않았다.
- Search Result grouping은 직접 확인하지 않았다.
- Macro Event에서 특정 Symbol impact로 전환되는 Flow는 확인하지 못했다.
- AI 관련 Product Surface는 확인하지 못했다.
- Documents 탭의 원문 Source traceability 깊이는 충분히 검증하지 못했다.

## 판단 Commit 준비

Ready for Commit

이유:

- TradingView 문서 묶음은 EidosLayer와 동일한 구조를 유지한다.
- Observation과 Interpretation은 분리되어 있다.
- Product Surface 수와 Screen 수는 10개로 일치한다.
- Scenario 수는 12개로 일치한다.
- Candidate Principle과 Registry는 Cross Validation 전제의 Pending 상태를 유지한다.
- DATE Architecture, Entity Architecture, Information Architecture, Navigation을 확정하지 않았다.
