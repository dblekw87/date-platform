# Investment Decision Journey Candidates 문서

이 문서는 초기 후보를 정의한다. 하나의 Journey를 최종안으로 선택하지 않는다.

## 차별화 규칙

- Market-first는 시장 변화에서 시작한다.
- Entity-first는 특정 투자 대상 검색에서 시작한다.
- Evidence-first는 뉴스, 공시, 리포트, 데이터 원문에서 시작한다.
- Portfolio-monitoring은 개인 보유/관심 목록에서 시작한다.
- Event-driven은 구조화된 사건 또는 일정에서 시작한다.

각 Journey는 진입점이 다르더라도 Exploration, Comparison, Evidence Validation 단계에서 서로 만날 수 있다. 이 겹침은 중복이 아니라 투자 분석의 연결성을 검증하기 위한 의도적 설계다.

## J-001 Market-first Journey 후보

- Entry Trigger: 장 시작 전후 또는 시장 급변
- User Question: 오늘 시장에서 무엇이 변했고 왜 중요한가?
- Discovery: 주요 지수, sector, movers, macro events를 확인한다.
- Exploration: 상승/하락 그룹과 원인 후보를 drill-down한다.
- Comparison: 같은 원인에 반응한 산업, 종목, 자산군을 비교한다.
- Evidence Validation: 뉴스, 공시, macro release, 가격/거래량 반응을 확인한다.
- Decision: 관심 대상 추가 검토, 관망, 제외 중 하나를 선택한다.
- Save: 시장 변화 요약, 관련 entity, 확인 근거를 저장한다.
- Monitoring: 관련 event, 가격 조건, 후속 뉴스 발생 여부를 추적한다.
- Revisit: 다음 날 같은 시장 변화가 지속/반전됐는지 확인한다.
- Frictions: 시장 정보가 랭킹과 뉴스로 분리되면 원인 파악이 느리다.
- Required Entities: Market, Index, Sector, Industry, Company, Security, Event, News, Macro Indicator
- Required Product Capabilities: Market discovery 후보, cause grouping 후보, entity transition, source/freshness display, watchlist/workspace save

## J-002 Entity-first Journey 후보

- Entry Trigger: 특정 회사, 종목, ETF, 산업을 검색한다.
- User Question: 이 대상은 지금 투자 검토할 만한가?
- Discovery: Search에서 primary entity를 선택한다.
- Exploration: overview, price, financials, news, events, peer context를 본다.
- Comparison: 동종 기업, 유사 ETF, 산업 평균, 과거 valuation을 비교한다.
- Evidence Validation: 주요 주장과 원천 데이터, 공시, 뉴스 출처를 확인한다.
- Decision: 투자 thesis 후보, 보류, 제외, monitoring으로 분류한다.
- Save: 해당 entity와 근거, 반증 질문, 비교 대상을 workspace에 저장한다.
- Monitoring: 실적, 가격, 관련 뉴스, sector 변화, thesis risk를 추적한다.
- Revisit: 저장된 entity에서 이전 판단과 변화된 근거를 비교한다.
- Frictions: entity page가 정보 나열식이면 투자 질문에 답하기 어렵다.
- Required Entities: Company, Security, ETF, Industry, Peer Group, News, Event, Financial Metric
- Required Product Capabilities: Search 후보, entity profile 후보, related entity graph 후보, comparison tools, evidence save, revisit history

## J-003 Evidence-first Journey 후보

- Entry Trigger: 뉴스, 공시, 리포트, SNS 링크, macro release를 발견한다.
- User Question: 이 근거는 어떤 투자 대상과 판단에 영향을 주는가?
- Discovery: 원문 또는 headline에서 핵심 주장과 관련 entity를 추출한다.
- Exploration: 관련 company, industry, event, macro indicator로 이동한다.
- Comparison: 같은 evidence에 영향을 받는 대상과 반대로 영향을 받는 대상을 비교한다.
- Evidence Validation: 출처, 발행 시점, 원문 맥락, 데이터 일치 여부를 확인한다.
- Decision: thesis 강화, thesis 약화, 신규 관심 대상, 무시 중 하나를 선택한다.
- Save: evidence와 연결된 entity, 해석, confidence, open question을 저장한다.
- Monitoring: 후속 기사, 공시, 가격 반응, 관련 지표 변화를 추적한다.
- Revisit: 저장 근거가 여전히 유효한지 확인한다.
- Frictions: 일반 bookmark는 evidence가 어떤 판단에 쓰였는지 보존하지 못한다.
- Required Entities: Evidence, Source, News, Filing, Event, Company, Security, Industry, Macro Indicator
- Required Product Capabilities: evidence capture 후보, source trail, relationship mapping 후보, annotation, confidence/status tracking

## J-004 Portfolio-monitoring Journey 후보

- Entry Trigger: 보유 자산 점검, 급변 알림, 리밸런싱 일정
- User Question: 내 보유/관심 대상에 영향을 주는 변화는 무엇인가?
- Discovery: portfolio/watchlist에서 변동 대상과 관련 events를 본다.
- Exploration: 각 holding의 변화 원인, sector 영향, 관련 news를 확인한다.
- Comparison: 보유 대상 간 영향도, 대체 투자 대상, benchmark 대비 성과를 비교한다.
- Evidence Validation: 변화 원인이 가격 noise인지 thesis change인지 검증한다.
- Decision: 유지, 추가 매수, 축소, thesis review로 분류한다.
- Save: decision note, changed evidence, monitoring condition을 기록한다.
- Monitoring: 설정한 조건과 후속 evidence를 추적한다.
- Revisit: 이전 decision note와 현재 상태를 비교한다.
- Frictions: portfolio 화면이 가격 목록에 그치면 판단 근거 변화가 보이지 않는다.
- Required Entities: Portfolio, Holding, Watchlist, Company, Security, Event, News, Macro Indicator, Decision Note
- Required Product Capabilities: personalized dashboard 후보, impact grouping 후보, alerting, decision log, workspace continuity

## J-005 Event-driven Journey 후보

- Entry Trigger: 실적 발표, M&A, 규제, 제품 출시, 금리 발표, 공급망 충격
- User Question: 이 이벤트는 어떤 자산과 산업에 어떤 방향으로 영향을 주는가?
- Discovery: Event entity 또는 event feed에서 시작한다.
- Exploration: event의 원인, affected entities, timeline, source를 본다.
- Comparison: 수혜/피해 후보, 과거 유사 이벤트, consensus 대비 차이를 비교한다.
- Evidence Validation: 원문, 공시, 지표 발표, 가격 반응을 대조한다.
- Decision: 관련 대상의 투자 매력도 변화 또는 watch 대상 여부를 판단한다.
- Save: event, affected entities, 가정, 반증 조건을 저장한다.
- Monitoring: 후속 event, guidance 변경, analyst revision, 가격 반응을 본다.
- Revisit: event impact가 예상대로 전개됐는지 검토한다.
- Frictions: 이벤트가 news headline로만 존재하면 지속 추적과 관계 탐색이 어렵다.
- Required Entities: Event, Timeline, Company, Security, Industry, Macro Indicator, News, Filing
- Required Product Capabilities: event page 후보, affected entity map 후보, timeline, related evidence panel 후보, monitoring rules
