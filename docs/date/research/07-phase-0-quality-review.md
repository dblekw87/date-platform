# Phase 0 Quality Review 문서

## 검토 기준

검토는 다음 기준으로 수행했다.

1. 기존 Invest Community의 구조를 전제한 문장이 없는가.
2. 가설이 확정된 결론처럼 작성되지 않았는가.
3. Observation, Interpretation, Hypothesis, Decision이 명확히 구분되는가.
4. 동일한 개념이 다른 용어로 반복 사용되지 않는가.
5. Product Hypothesis 15개가 서로 중복되지 않는가.
6. 각 Hypothesis에 검증 방법과 반증 조건이 있는가.
7. User Archetype 8개가 단순 투자 기간이 아니라 실제 행동 차이로 구분되는가.
8. Journey 후보 5개가 실제로 서로 다른 진입점과 판단 흐름을 가지는가.
9. Benchmark Evaluation 15개 항목 간 중복이 없는가.
10. Evaluation 항목이 실제 관찰 가능한 기준으로 작성되었는가.
11. Screen Research Template이 화면 외형이 아니라 UX 구조를 분석할 수 있게 되어 있는가.
12. Benchmark Scope 문서가 6개 서비스를 동일 기준으로 비교할 수 있게 되어 있는가.
13. 공개 접근, 로그인 필요, 유료 제한, 확인 불가 항목을 구분할 수 있는가.
14. 모든 문서가 DATE Product Research Plan과 충돌하지 않는가.
15. Phase 1에서 바로 사용할 수 있을 정도로 문서 간 연결이 명확한가.

## 발견한 문제

- H-004와 H-015는 모두 Discovery와 관련되어 후속 조사자가 중복으로 해석할 위험이 있었다.
- H-006과 H-014는 모두 continuity/context와 관련되어 한 세션 안의 맥락 유지와 다음 날 재개 가능성이 섞일 수 있었다.
- H-005와 H-009는 모두 evidence/trust와 관련되어 저장 구조와 화면 신뢰 신호의 차이를 명확히 해야 했다.
- 일부 Journey의 Required Product Capabilities가 확정 기능처럼 읽힐 수 있었다.
- Screen Research Template은 접근 상태와 접근 제한을 분리해 기록하는 필드가 부족했다.
- Benchmark Scope 문서의 Core Journeys 용어가 Journey 후보 문서의 명칭과 일부 다르게 쓰였다.
- Evaluation 항목은 전반적으로 관찰 가능했지만 Decision Speed와 Cognitive Load의 측정 차이를 더 명확히 할 필요가 있었다.

## 수정한 내용

- README에 `07-phase-0-quality-review.md`를 문서 맵에 추가하고 공통 용어를 정의했다.
- Research Brief에 Observation, Interpretation, Hypothesis, Decision 구분과 후속 단계 문서 연결을 추가했다.
- Product Hypothesis Register에 Non-overlap Rules를 추가했다.
- H-004, H-005, H-006, H-011, H-014, H-015의 표현을 확정 문장이 아니라 후보 가설로 더 명확히 조정했다.
- User Archetype 문서에 Behavioral Separation Rule을 추가했다.
- 단기 트레이더 항목은 DATE가 실행 중심 단기 매매까지 지원한다는 오해를 줄이도록 검증 문장을 조정했다.
- Journey 문서에 Differentiation Rules를 추가하고 Required Product Capabilities에 후보 표현을 추가했다.
- Benchmark Evaluation Framework에 Overlap Controls를 추가하고 관찰 방법을 보강했다.
- Screen Research Template에 Access Status, Access Limitation, Side Panel/Overlay, New Page vs In-place Disclosure, Observation vs Interpretation Boundary 필드를 추가했다.
- Benchmark Scope 문서에 Comparable Recording Fields와 접근 상태 분류를 추가하고 Core Journeys 용어를 Journey 후보와 맞췄다.

## 유지한 가설

15개 Product Hypothesis는 모두 유지했다. 검토 결과 현재 단계에서 삭제할 정도의 완전 중복은 없었다.

- H-001 Search 중심 진입 가능성
- H-002 Event 중심 Entity 가능성
- H-003 Company/Security 분리 가능성
- H-004 Home의 Market Discovery 역할 가능성
- H-005 Evidence Graph 저장 가능성
- H-006 같은 세션 내 Context Preservation 가능성
- H-007 Watchlist/Workspace/Dashboard의 Navigation 역할 가능성
- H-008 정보 밀도와 정보 형식 분리 가능성
- H-009 출처와 최신성 Trust Signal 필요성
- H-010 관련 Entity 비교 필요성
- H-011 Macro-to-Entity 연결 기회
- H-012 Learnability와 Expert Scalability 동시 요구
- H-013 근거 변화 중심 Alerting 가능성
- H-014 Cross-session Continuity 가능성
- H-015 원인 기반 Market Discovery grouping 가능성

## 삭제 또는 병합한 가설

삭제 또는 병합한 가설은 없다.

H-004/H-015, H-006/H-014, H-005/H-009는 가까운 주제를 다루지만 검증 단위가 다르므로 유지했다. 대신 Non-overlap Rules로 조사자가 구분할 수 있게 했다.

## 남아 있는 불확실성

- DATE의 최종 핵심 사용자는 아직 결정되지 않았다.
- Search-first, Entity-first, Evidence-first 중 어떤 흐름이 제품 중심이 될지는 검증되지 않았다.
- Event가 News보다 더 적합한 중심 Entity인지는 아직 확인되지 않았다.
- Company와 Security를 분리할 필요가 있는지 확인되지 않았다.
- Evidence Graph가 실제 사용자에게 Bookmark보다 더 나은 저장 방식인지 확인되지 않았다.
- Bloomberg Terminal과 EidosLayer는 접근 제한 때문에 Phase 1에서 관찰 신뢰도 관리가 중요하다.
- 단기 트레이더와 포트폴리오 관리자 요구가 DATE의 초기 범위에 포함되어야 하는지는 아직 불확실하다.

## Phase 1 진입 가능 여부

Phase 1 진입은 가능하다.

다만 Phase 1은 실제 Benchmark 전체 결론을 내리는 단계가 아니라, 동일한 템플릿과 공통 시나리오로 관찰을 수집하는 단계로 시작해야 한다.

## Phase 1 시작 전 주의사항

- 웹 리서치 또는 서비스 접속 시 접근 상태를 먼저 기록한다.
- 로그인 또는 유료 제한으로 확인하지 못한 기능은 `Not Verified` 또는 `Paid Required`로 남긴다.
- 공개 영상이나 문서로만 확인한 화면은 직접 조작 Observation과 분리한다.
- 경쟁 서비스의 기능 수를 비교하지 말고 설계 이유를 관찰한다.
- Phase 1 중에도 IA, Navigation, Entity Model, Screen System을 확정하지 않는다.
- 모든 화면 분석은 `05-screen-research-template.md`의 Observation Record 형식을 사용한다.
