# Benchmark Evaluation Framework 문서

점수는 보조 도구일 뿐 자동 결론 기준이 아니다. 각 항목은 Observation, Interpretation, User Impact, DATE Implication, Confidence, Evidence와 함께 기록한다.

## 중복 방지 기준

- Decision Speed는 task completion의 속도와 단계 수를 본다. Cognitive Load는 화면 이해와 선택 비용을 본다.
- Context Preservation은 같은 세션 안의 상태 유지다. Personal Continuity는 시간 경과 후 이전 분석 재개다. Workspace Reusability는 저장된 구성의 반복 사용 가능성이다.
- Evidence Traceability는 근거의 연결과 추적 가능성이다. Trust는 출처, 시점, 데이터 지연, 방법론 같은 신뢰 신호다.
- Discoverability는 새 투자 대상 발견이다. Search Quality는 명시적 query의 결과 품질이다. Entity Transition Quality는 선택한 entity 이후의 관계 이동 품질이다.

| Criterion | Definition | Why It Matters | Observation Method | Measurement Guide | Good Pattern | Failure Pattern | Evidence Capture Method |
|---|---|---|---|---|---|---|---|
| Decision Speed | 사용자가 투자 질문에 대한 다음 행동을 정하는 속도 | 투자 도구는 빠른 판단과 보류 판단을 모두 지원해야 한다. | 동일 시나리오 task time, click 수, screen transition 수 기록 | Low/Medium/High friction | 핵심 정보와 다음 drill-down이 즉시 보인다. | 관련 정보가 여러 화면에 흩어진다. | 화면 캡처, 경로 기록 |
| Context Preservation | 탐색 중 원래 분석 맥락이 유지되는 정도 | 투자 분석은 비교와 재방문이 반복된다. | 이동 후 이전 entity, filters, query, chart state 유지 확인 | 맥락 손실 횟수 | side panel, tabs, persistent watchlist가 상태를 유지한다. | back navigation 후 상태가 초기화된다. | screen recording, state notes |
| Evidence Traceability | 판단 근거의 출처와 연결 관계를 추적할 수 있는 정도 | 신뢰와 재검증 비용에 직접 영향을 준다. | source, timestamp, related links 확인 | Source visible / hidden / missing | 원문, 발행 시각, 관련 entity가 함께 제공된다. | 요약만 있고 원천 확인이 어렵다. | URL, source label, timestamp capture |
| Discoverability | 사용자가 투자 대상을 발견할 수 있는 정도 | DATE가 discovery platform인지 판단하는 기준이다. | home, screener, movers, search suggestions 확인 | Discovery path count and clarity | 변화 원인, sector, event 기반 탐색을 제공한다. | 단순 랭킹만 제공한다. | scenario notes |
| Information Efficiency | 화면의 정보량 대비 이해 효율 | 높은 밀도는 구조가 명확할 때만 장점이다. | hierarchy, grouping, scan path 기록 | 필요한 정보까지 scroll/click 수 | table/chart/panel 역할이 분명하다. | 카드가 반복되지만 비교가 어렵다. | annotated screenshot |
| Learnability | 신규 사용자가 구조를 익히는 난이도 | 초기 사용자 확장성에 중요하다. | labels, defaults, progressive disclosure 확인 | 첫 task 완료 가능성 | 기본 경로가 명확하고 고급 기능은 확장된다. | 전문 용어와 조작이 설명 없이 노출된다. | first-use walkthrough |
| Expert Scalability | 숙련 사용자의 복잡한 workflow 수용력 | 전문 도구는 학습 비용을 효용으로 보상한다. | keyboard, multi-panel, saved layouts, advanced search 확인 | 전문가 workflow support | 복수 entity와 자료를 동시에 유지한다. | 단일 화면 단위 작업만 가능하다. | feature behavior notes |
| Relationship Clarity | entity 간 관계가 명확히 표현되는 정도 | 투자 판단은 관계 탐색에서 깊어진다. | related entity, peer, event linkage 확인 | 관계 방향/근거 표시 수준 | 관계 유형과 근거가 함께 보인다. | 관련 항목이 나열만 된다. | relationship map notes |
| Personal Continuity | 개인의 이전 분석을 이어갈 수 있는 정도 | 장기 판단과 monitoring에 필요하다. | watchlist, saved screen, notes, recent history 확인 | 재개 가능성 | 저장된 분석 상태로 돌아갈 수 있다. | 저장은 되지만 맥락이 사라진다. | revisit scenario capture |
| Trust | 정보의 신뢰 신호가 충분한 정도 | 투자 정보는 오류 비용이 크다. | source, delay, revision, methodology 표시 확인 | 신뢰 신호 completeness | 데이터 출처와 freshness가 명확하다. | 값은 보이지만 출처/시점이 불명확하다. | source and freshness capture |
| Search Quality | 검색이 entity와 의도를 잘 해석하는 정도 | Search-first 가능성을 검증한다. | ticker, company, theme, event, macro query 테스트 | result relevance, grouping, speed | entity type별 결과가 구분되고 전환이 빠르다. | keyword match만 제공한다. | query/result capture |
| Entity Transition Quality | 한 entity에서 관련 entity로 이동하는 품질 | 분석 흐름은 entity 간 전환으로 구성된다. | company-news-industry-event 전환 확인 | 전환 step 수와 맥락 유지 | 전환 이유와 이전 맥락이 보존된다. | 링크 이동 후 관계 이유가 사라진다. | path map |
| Navigation Depth | global/local/personal navigation 깊이 | 깊이는 전문성의 비용이자 도구성의 기반이다. | nav tiers, breadcrumbs, tabs, workspace 확인 | depth vs clarity | navigation tier가 역할별로 분리된다. | 메뉴 깊이가 기능 목록처럼 쌓인다. | nav inventory |
| Cognitive Load | 화면 이해와 선택에 드는 정신적 비용 | 과밀 화면은 판단 지연을 만들 수 있다. | visual hierarchy, competing actions, terminology, first scan ambiguity 확인 | confusion points | primary question과 secondary tools가 분리된다. | 모든 요소가 같은 중요도로 보인다. | annotated screenshot |
| Workspace Reusability | 분석 구성을 반복 사용할 수 있는 정도 | 투자자는 반복 루틴과 비교 구조를 재사용한다. | saved layout, dashboards, watchlists, filters 확인 | reuse support level | layout, filters, entity sets를 저장/재개한다. | 매번 새로 구성해야 한다. | saved-state scenario |
