# User Archetype Hypotheses 문서

이 문서는 DATE의 최종 핵심 사용자를 확정하지 않는다. 각 유형은 검증 전 후보이며, 후속 Research에서 유지, 통합, 제외될 수 있다.

## 행동 구분 규칙

Archetype은 투자 기간만으로 구분하지 않는다. 각 후보는 진입 Trigger, 반복 Task, 신뢰 요구, 시간 민감도, 개인화 요구, 현재 도구 조합의 차이로 검증한다. 후속 Research에서 행동 차이가 작게 관찰되면 통합하거나 제외한다.

| Archetype | Primary Goal | Trigger | High-frequency Tasks | Information Needed | Current Tool Stack | Main Friction | Trust Requirement | Time Sensitivity | Personalization Need | DATE Opportunity | Validation Needed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 투자 초보자 | 투자 판단의 기본 근거를 이해하고 실수를 줄인다. | 관심 종목, 뉴스, 지인 추천, 급등락 | 용어 확인, 기업 개요 파악, 뉴스 읽기, 위험 요인 확인 | 쉬운 설명, 가격 변화 이유, 기본 재무, 관련 뉴스 | 포털 금융, 증권 앱, 유튜브, 커뮤니티 | 정보 과부하와 신뢰 판단 어려움 | 출처, 쉬운 근거 설명, 과장 방지 | Medium | High | 복잡한 자료를 투자 질문 단위로 연결해 학습 비용을 낮춘다. | 초보자가 Search/Entity 구조를 이해하는지 검증 |
| 장기 투자자 | 사업과 장기 실적의 질을 판단한다. | 실적 발표, 산업 변화, 장기 포트폴리오 점검 | 기업 분석, 재무 추세 확인, 경쟁사 비교, 리스크 저장 | 사업 부문, 재무, 밸류에이션, 산업 구조, 경영진 이벤트 | Yahoo Finance, Koyfin, 리서치 리포트, 증권 앱 | 자료가 흩어져 있고 과거 판단 근거를 재방문하기 어렵다. | 원천 데이터, 장기 시계열, 근거 이력 | Low to Medium | High | 장기 논리와 반증 신호를 함께 저장하고 모니터링한다. | Evidence 저장 방식과 재방문 요구 검증 |
| 스윙 트레이더 | 수일~수주 단위 가격 움직임과 촉매를 이용한다. | 차트 패턴, 뉴스, 수급, 이벤트 | 차트 확인, catalyst 확인, 유사 종목 비교, 알림 설정 | 기술적 지표, 뉴스, 일정, 거래량, sector momentum | TradingView, Finviz, 증권 HTS/MTS | 차트와 뉴스/이벤트 맥락이 분리되어 있다. | 실시간성, 이벤트 출처, 가격 데이터 정확성 | High | Medium | 차트 기반 판단과 근거 이벤트를 같은 분석 맥락에 둔다. | 패널/오버레이 기반 분석 흐름 검증 |
| 단기 트레이더 | 빠른 의사결정과 실행 전 위험 확인을 한다. | 급등락, 거래량 폭증, 뉴스 속보 | 스크리닝, 차트 확인, 뉴스 원인 확인, watchlist 순환 | 실시간 가격, 호가/거래량, headline, catalyst, 변동성 | TradingView, Bloomberg Terminal, HTS | 속도와 신뢰가 충돌하고 화면 전환 비용이 크다. | 낮은 지연, 명확한 source, keyboard support | Very High | Medium | 빠른 entity transition과 context retention을 제공한다. | DATE가 실행 중심 단기 매매가 아니라 분석 보조까지 지원해야 하는지 검증 |
| 산업·테마 중심 투자자 | 특정 산업/테마의 구조 변화와 수혜 대상을 찾는다. | 정책, 기술 변화, 공급망 이슈, 테마 뉴스 | 테마 탐색, 관련 기업 mapping, peer 비교, 이벤트 추적 | 산업 chain, 관련 기업, revenue exposure, 뉴스, 정책 | Finviz, Koyfin, 리포트, 뉴스레터 | 테마와 실제 기업 노출이 느슨하게 연결된다. | 관계 근거, exposure 출처, 업데이트 시점 | Medium | High | Theme, Industry, Company, Event를 연결해 탐색한다. | Entity 관계 모델 후보 검증 |
| 거시경제 중심 투자자 | 거시 변화가 자산과 종목에 미치는 영향을 판단한다. | 금리, 환율, CPI, 고용, 원자재 변화 | 지표 확인, 자산군 반응 비교, 관련 산업/종목 연결 | macro calendar, chart, correlation, sector sensitivity | Koyfin, Bloomberg Terminal, FRED, 뉴스 | 거시 지표와 개별 투자 대상 연결이 수작업이다. | 데이터 출처, 시계열 정확성, 발표 시각 | High around releases | Medium | Macro Event에서 Asset, Industry, Company로 전환한다. | Macro-first journey 수요 검증 |
| 리서치 중심 투자자 | 투자 논리를 구성하고 검증 가능한 근거를 축적한다. | 논문/리포트/뉴스 발견, thesis update | 자료 수집, 반증 확인, 메모, 비교, 저장 | 원문, 요약, 관련 entity, 과거 thesis, source trail | Koyfin, Notion, Pocket, 브라우저 탭, 리포트 | 근거는 많지만 연결과 재검토가 어렵다. | traceability, quote/source, versioning | Medium | Very High | Evidence Graph와 workspace continuity가 핵심 가치가 될 수 있다. | Evidence-first workflow 검증 |
| 포트폴리오 관리자 | 보유 자산의 위험, 기회, 근거 변화를 관리한다. | 장 시작/종료, 뉴스, 리밸런싱, 고객 보고 | 포트폴리오 모니터링, 영향 분석, 비교, 보고 근거 정리 | holdings, exposure, risk, events, peer performance | Bloomberg Terminal, Koyfin, Excel, PMS | 보유 종목 변화 원인과 영향 정리가 번거롭다. | 데이터 정확성, 감사 가능성, 업데이트 이력 | High | Very High | Portfolio에서 근거 변화와 관련 entity로 이동한다. | 개인 투자자용 DATE와 professional workflow 경계 검증 |
