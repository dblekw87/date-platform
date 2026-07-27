# DATE Product Hypothesis Register 문서

Status 값은 `Proposed`, `Needs Evidence`, `Partially Supported`, `Rejected`, `Decision Candidate` 중 하나를 사용한다. Phase 0의 모든 가설은 기본적으로 `Proposed` 또는 `Needs Evidence` 상태다.

## 중복 방지 규칙

- H-004는 Home의 역할 가설이고, H-015는 Discovery 정보 grouping 방식 가설이다.
- H-006은 한 세션 안에서 화면 이동 중 맥락이 유지되는지에 대한 가설이고, H-014는 날짜가 바뀐 뒤 이전 분석을 재개할 수 있는지에 대한 가설이다.
- H-005는 저장되는 근거의 구조 가설이고, H-009는 화면에 표시되는 출처/최신성 신뢰 신호 가설이다.
- H-001은 진입 방식 가설이고, H-010/H-011은 진입 이후 비교와 관계 확장 가설이다.

| Hypothesis ID | Category | Hypothesis | Why It Matters | Supporting Assumption | Evidence Needed | Validation Method | Disconfirming Evidence | Status | Decision Impact |
|---|---|---|---|---|---|---|---|---|---|
| H-001 | Entry Model | DATE의 중심 진입점은 Search일 수 있다. | 투자자는 특정 종목, 뉴스, 지표, 이벤트에서 빠르게 분석을 시작해야 한다. | 투자 질문은 명시적 검색어로 표현되는 경우가 많다. | Benchmark의 Search 위치, 사용 빈도, 검색 결과 구조 | Benchmark task walkthrough, screen audit | 사용자가 대부분 Home feed나 Portfolio에서만 시작한다. | Proposed | Global Navigation, Home, Entity Transition |
| H-002 | Entity Model | News보다 Event가 중심 Entity일 수 있다. | News는 원문이고 Event는 투자 판단에 필요한 구조화된 변화 단위일 수 있다. | 사용자는 기사보다 원인, 영향, 관련 종목을 추적한다. | News-to-event 전환 사례, 이벤트 저장/모니터링 요구 | Benchmark analysis, user interview | 사용자가 기사 원문 단위로만 판단과 저장을 수행한다. | Proposed | Entity Architecture, Evidence Model |
| H-003 | Entity Model | Company와 Security는 분리되어야 할 수 있다. | 한 회사가 여러 상장 수단, ADR, ETF 노출, 파생 노출을 가질 수 있다. | 투자자는 사업체 분석과 거래 대상 분석을 오간다. | Company page와 ticker page의 정보 차이 | Entity audit across services | 사용자에게 회사와 종목 구분이 혼란만 만든다. | Proposed | URL model, Search result grouping |
| H-004 | Home Strategy | DATE의 Home 역할은 개인 Dashboard보다 Market Discovery에 가까울 수 있다. | 초기 진입에서 사용자는 보유 현황보다 오늘의 변화와 기회를 찾을 수 있다. | DATE가 의사결정 전 발견을 강화해야 한다. | Home screen roles in benchmark tools | Screen research, scenario testing | 사용자가 대부분 개인 포트폴리오 상태 확인으로 시작한다. | Proposed | Home Purpose, Navigation 후보 |
| H-005 | Evidence Model | 투자 근거는 단순 Bookmark가 아니라 관계를 가진 Evidence Graph 형태로 저장되어야 할 수 있다. | 판단 근거는 뉴스, 이벤트, 지표, 종목, 비교 대상 사이의 관계로 의미가 생긴다. | 투자자는 저장한 근거를 나중에 재검토해야 한다. | 저장 기능의 재방문 방식, 사용자 기록 요구 | Benchmark audit, user interview, later concept validation | 사용자가 저장을 단순 읽기 목록으로만 사용한다. | Proposed | Save, Workspace, Data Model 후보 |
| H-006 | Context Preservation | DATE는 동일 분석 세션 안에서 페이지 이동보다 분석 컨텍스트 유지를 우선해야 할 수 있다. | 투자 분석은 중단 없는 비교와 drill-down이 필요하다. | 새 페이지 이동은 이전 맥락 상실을 만든다. | Side panel, overlay, tab, split view 사용 사례 | Benchmark screen path mapping | 사용자가 명확한 페이지 전환을 더 신뢰하고 선호한다. | Proposed | Navigation, Panel System 후보 |
| H-007 | Workspace Role | Watchlist, Workspace, Dashboard는 콘텐츠가 아니라 Navigation 역할도 수행할 수 있다. | 사용자는 저장된 대상 목록을 통해 반복 분석을 시작한다. | 개인화된 목록은 진입점이자 필터가 된다. | Benchmark의 watchlist placement와 interaction | Benchmark walkthrough | Watchlist가 단순 가격 모니터링에만 사용된다. | Proposed | Personal Navigation |
| H-008 | Information Density | 높은 정보 밀도는 Table, Chart, Panel의 역할 분리가 명확할 때 수용될 수 있다. | 전문 사용자는 많은 정보를 빠르게 스캔해야 한다. | 복잡성은 정보량보다 구조 불명확성에서 발생한다. | 정보 밀도와 hierarchy 사례 | Screen research template coding | 낮은 밀도 화면이 의사결정 속도와 신뢰를 더 높인다. | Proposed | Screen System 후보 |
| H-009 | Trust | DATE는 데이터 출처와 최신성 표시를 핵심 UX 요소로 다뤄야 할 수 있다. | 투자 판단은 신뢰와 시점에 민감하다. | 출처 불명확 정보는 재검증 비용을 높인다. | Benchmark의 source/freshness 표시 방식 | Screen audit | 사용자가 출처보다 요약과 속도를 우선한다. | Proposed | Trust Signal, Evidence Traceability |
| H-010 | Comparison | 투자자는 단일 Entity 분석보다 관련 Entity 비교를 더 자주 필요로 할 수 있다. | 의사결정은 상대 매력도 판단을 요구한다. | 산업, 경쟁사, 대체 투자 대상이 함께 검토된다. | Compare flow, peer table, relative chart 사례 | Scenario testing | 사용자가 개별 종목 분석 후 별도 비교를 거의 하지 않는다. | Proposed | Comparison Surface, Entity Links |
| H-011 | Macro Linkage | 거시 지표와 종목 영향 연결은 DATE의 중요한 기회 영역일 수 있다. | 투자자는 금리, 환율, 원자재, 고용 지표가 특정 자산에 미치는 영향을 해석해야 한다. | 거시 데이터는 종목 판단과 분리되어 제공되는 경우가 많다. | Macro-to-entity transition 사례 | Benchmark audit, expert interview | 사용자가 거시 정보와 종목 분석을 별도 도구에서 분리해서 유지하길 원한다. | Proposed | Entity Relationship, Journey 후보 |
| H-012 | Learnability | DATE는 초보자용 단순화와 전문가용 확장성을 동시에 가질 필요가 있을 수 있다. | 투자 도구는 학습 단계별 요구가 다르다. | 같은 구조가 progressive disclosure로 확장될 수 있다. | Beginner/expert workflow gap | User archetype validation | 한쪽 사용자군에 맞추는 것이 제품 가치가 더 높다. | Proposed | Product Strategy |
| H-013 | Alerting | 알림은 가격 조건보다 근거 변화 조건 중심이어야 할 수 있다. | 투자 근거가 바뀌었을 때 재판단이 필요하다. | 이벤트, 공시, 지표 변화가 매매 판단을 촉발한다. | Alert types in benchmark tools | Benchmark audit | 사용자가 가격 알림 외 조건을 설정하지 않는다. | Proposed | Monitoring Capability |
| H-014 | Revisit | DATE는 다음 날 같은 분석을 이어가는 cross-session continuity를 지원해야 할 수 있다. | 투자 판단은 하루 안에 끝나지 않는 경우가 많다. | 사용자는 이전 조사 맥락과 열린 질문을 복원해야 한다. | Saved workspace/session 사례 | Scenario testing | 사용자가 매번 새로 시작하는 것을 선호한다. | Proposed | Workspace, History, Save 후보 |
| H-015 | Discovery | Market Discovery 정보는 단순 랭킹보다 원인 기반 grouping이 더 유용할 수 있다. | 단순 상승률은 왜 움직였는지를 설명하지 않는다. | 투자자는 가격 변화와 촉발 요인을 연결해 본다. | Movers 화면의 원인 설명 방식 | Benchmark audit | 사용자가 원인보다 가격/거래량 랭킹을 우선 탐색한다. | Proposed | Discovery Screen 후보 |
