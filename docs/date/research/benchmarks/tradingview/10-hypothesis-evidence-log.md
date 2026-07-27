# 벤치마크 TradingView Hypothesis Evidence Log 문서

## 목적

이 문서는 TradingView Benchmark Observation이 Phase 0 Product Hypothesis에 미치는 영향을 기록한다. 원본 Hypothesis Register를 수정하지 않는다.

## 주요 Evidence Log 기록

### H-001

Hypothesis ID: H-001

Evidence Type: Supporting

Observation: Symbol Search는 Chart 실행과 Symbol Overview 진입을 제공한다고 공식 Help Center에서 설명한다.

Interpretation: Search는 단순 검색 결과 목록이 아니라 Entity Context 선택을 포함하는 Transition일 수 있다.

Confidence: Medium

Source: Official Documentation. Symbol Search, 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: TradingView는 Search as Entity Transition 근거를 제공하지만 Search-first Product 여부는 확정할 수 없다.

### H-003

Hypothesis ID: H-003

Evidence Type: Neutral

Observation: AAPL Symbol Page는 Company 이름, ticker, exchange, Financials, Documents, News, Community, Technicals를 하나의 Symbol Hub에서 제공한다.

Interpretation: TradingView는 사용자 표면에서 Company와 Stock을 Symbol 중심으로 묶어 제공할 수 있다.

Confidence: Medium

Source: Official Product Observation. AAPL Symbol Page, 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: Company와 Security 분리 필요성을 지지하거나 반박하기보다 Symbol 중심 통합 표면이라는 비교 사례를 제공한다.

### H-004

Hypothesis ID: H-004

Evidence Type: Supporting

Observation: Home은 Market Summary, Community Ideas, News, Market Movers 성격의 섹션을 제공한다.

Interpretation: Home은 정적 Landing보다 Market Discovery Entry 역할을 수행할 수 있다.

Confidence: High

Source: Official Product Observation. Home, 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: EidosLayer와 TradingView 모두 Home이 Discovery Entry 역할을 수행할 가능성을 보여준다.

### H-005

Hypothesis ID: H-005

Evidence Type: Supporting

Observation: News는 Source와 Timestamp를 제공하고 Symbol Page는 Documents 탭을 제공한다. Economic Calendar는 forecast와 actual을 제공한다.

Interpretation: TradingView는 투자 판단 Evidence 후보를 News, Document, Event, Metric 형태로 분리해 제공한다.

Confidence: Medium

Source: Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: Evidence Graph는 확정할 수 없지만 Evidence Type 연결 후보는 관찰되었다.

### H-009

Hypothesis ID: H-009

Evidence Type: Supporting

Observation: Watchlist는 여러 Product에서 접근 가능하고 related news, fundamental data, technical summary, notes, watchlist alerts를 제공한다고 공식 문서에서 설명한다.

Interpretation: Watchlist는 저장 목록을 넘어 Navigation과 Monitoring의 역할을 수행할 수 있다.

Confidence: Medium

Source: Official Documentation. Watchlists, 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: Watchlist as Navigation / Continuity 가설을 EidosLayer에 이어 추가로 지지한다.

### H-010

Hypothesis ID: H-010

Evidence Type: Supporting

Observation: Supercharts 오른쪽 Toolbar는 Watchlist, Alerts, Screeners, Calendar, News Flow 접근을 제공한다고 공식 문서에서 설명한다.

Interpretation: 보조 정보는 새 페이지보다 Chart Context 주변 Panel로 제공될 수 있다.

Confidence: Medium

Source: Official Documentation. Supercharts, 확인일 2026-07-27.

Recommended Status: Continue Testing

Reason: Context Preservation을 위한 Panel Pattern의 비교 근거를 제공한다.
