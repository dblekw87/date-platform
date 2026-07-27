# DATE Research Brief 문서

## DATE의 목적

DATE는 투자자가 시장 변화, 기업/종목, 산업, 거시 지표, 뉴스, 공시, 이벤트, 개인 판단 근거를 서로 연결해 투자 판단의 맥락을 유지하도록 돕는 투자 근거 연결 플랫폼이다.

이 문장은 제품 방향을 설명하는 초기 정의이며 최종 포지셔닝은 아니다.

## 이번 Research의 목적

Phase 0의 목적은 실제 Benchmark 조사와 사용자 검증을 수행하기 전에 공통 조사 기준을 만드는 것이다. 이번 단계는 무엇을 관찰하고, 어떤 단위로 비교하며, 어떤 가설을 검증해야 하는지 정의한다.

Phase 0은 결론 도출 단계가 아니다. 핵심 사용자, 중심 Entity, Navigation, Screen System은 후속 Research 결과를 기반으로 결정한다.

## 연구 대상

- 투자자가 투자 아이디어를 발견하는 방식
- 투자자가 근거를 수집, 비교, 검증, 저장, 재방문하는 방식
- Search, Entity, Watchlist, Workspace, Dashboard가 분석 흐름에서 수행하는 역할
- Card, Table, Chart, Panel, Side Panel, Overlay가 정보를 분리하거나 연결하는 이유
- 높은 정보 밀도를 유지하면서도 인지 부담을 낮추는 구조
- 전문 투자 도구에서 학습 비용을 감수하게 만드는 효용
- EidosLayer, TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal의 UX 구조

## 연구하지 않는 대상

- 기존 Invest Community 구조의 재사용 가능성 평가
- 기능 목록 작성 또는 우선순위 결정
- 최종 IA, Navigation, Entity Model, Screen System 확정
- UI 시안, 디자인 토큰, 컴포넌트 설계
- API, 데이터베이스, 라우트, 프론트엔드 구현
- 경쟁 서비스의 화면 복제

## 초기 가설과 확정 사실의 구분

확정 사실:

- DATE는 신규 프로젝트다.
- Phase 0은 Research Foundation 단계다.
- Required Benchmark에는 EidosLayer, TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal이 포함된다.
- 이번 단계에서는 코드와 UI를 만들지 않는다.

초기 가설:

- DATE의 주요 진입점은 Search일 수 있다.
- 투자 판단의 핵심 단위는 News보다 Event일 수 있다.
- Company와 Security는 분리된 Entity일 수 있다.
- Home은 Dashboard가 아니라 Market Discovery 화면일 수 있다.
- 투자 근거는 Bookmark가 아니라 Evidence Graph 형태로 저장되어야 할 수 있다.

초기 가설은 검증 전까지 결정으로 취급하지 않는다.

## 기록 유형 구분

- Observation: 실제 Benchmark 화면, 공개 문서, 접근 제한, 사용자 발화에서 확인한 사실만 기록한다.
- Interpretation: Observation을 바탕으로 구조의 의도나 사용자 영향을 해석한 내용이다.
- Hypothesis: 아직 검증되지 않은 제품 방향 후보이며, 반증 조건을 가져야 한다.
- Decision: 충분한 근거가 모인 뒤 선택한 방향이다. Phase 0에서는 Decision을 생성하지 않는다.

## Research 단계별 진행 원칙

1. Phase 0: 조사 기준, 가설, 기록 템플릿, Benchmark 범위를 정의한다.
2. Phase 1: Benchmark 화면과 여정을 동일 기준으로 관찰한다.
3. Phase 2: 관찰 결과를 비교하고 패턴, 차이, 설계 의도를 도출한다.
4. Phase 3: DATE에 적용 가능한 Product, UX, IA, Entity, Navigation 후보를 만든다.
5. Phase 4: 사용자 검증 또는 시나리오 검증을 통해 후보를 좁힌다.
6. Phase 5: 검증된 근거를 기반으로 최종 IA, Navigation, Entity Model, Screen System을 제안한다.

후속 단계에서 사용하는 문서 연결:

- Phase 1 Benchmark 관찰은 `05-screen-research-template.md`와 `06-benchmark-scope-and-scenarios.md`를 사용한다.
- Phase 2 비교 분석은 `04-benchmark-evaluation-framework.md`의 Criterion을 기준으로 한다.
- Phase 3 후보 설계는 `01-product-hypothesis-register.md`, `02-user-archetype-hypotheses.md`, `03-investment-decision-journey-candidates.md`의 ID를 참조한다.
- Phase 4 이후 Decision은 관련 Observation과 Hypothesis ID를 함께 기록해야 한다.

## Research 완료 전 금지되는 의사결정

- DATE의 최종 핵심 사용자 확정
- Search-first, Entity-first, Evidence-first 등 단일 중심 구조 확정
- Home 화면 역할 확정
- 최종 Navigation 구조 확정
- 최종 Entity Model 확정
- 최종 Screen System 확정
- Watchlist, Workspace, Dashboard의 제품 내 역할 확정
- 특정 Benchmark의 구조를 DATE의 정답으로 채택

## 향후 단계와의 연결 관계

이 문서 세트는 Phase 1 이후 조사자가 동일한 질문과 기록 체계로 Benchmark를 분석하게 하는 기준이다. 후속 산출물은 이 단계의 Hypothesis ID, Archetype, Journey Candidate, Evaluation Criteria, Screen Template, Scenario ID를 참조해야 한다.
