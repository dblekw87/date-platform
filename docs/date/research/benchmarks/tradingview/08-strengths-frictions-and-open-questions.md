# 벤치마크 TradingView Strengths, Frictions, Open Questions 기록 문서

## 목적

이 문서는 TradingView Benchmark에서 확인된 Effective Pattern, Structural Strength, User Friction, Open Question을 분리해 기록한다. DATE 설계 결론을 확정하지 않는다.

## 주요 Effective Patterns

### Chart Context를 중심으로 Tool을 연결한다

Observation: 공식 Help Center는 Supercharts 오른쪽 Toolbar에서 Watchlist, Alerts, Screeners, Pine Editor, Calendar, News Flow를 접근할 수 있다고 설명한다.

Interpretation: TradingView는 Chart를 분석의 중심 Context로 유지하면서 보조 Product Surface를 주변에 배치하는 구조일 수 있다.

User Impact: 사용자는 Chart를 떠나지 않고 Monitoring, Discovery, News 확인을 이어갈 수 있다.

DATE Implication: DATE에서 Side Panel 또는 Workspace 구조를 검토할 때 Context Preservation 기준으로 비교해야 한다.

Confidence: Medium

Evidence: Official Documentation. Supercharts Help Center, 확인일 2026-07-27.

### Symbol Page를 분석 Hub로 사용한다

Observation: Symbol Page는 Overview, Financials, Documents, News, Community, Technicals, Forecasts, Seasonals, Options, ETFs, Bonds 탭을 제공한다.

Interpretation: TradingView는 Symbol을 여러 분석 Surface의 공통 Anchor로 사용하는 구조일 수 있다.

User Impact: 사용자는 동일 Symbol 기준으로 Evidence와 분석 모드를 전환할 수 있다.

DATE Implication: DATE에서 Entity Hub를 검토할 수 있지만 Company와 Security 관계는 추가 검증이 필요하다.

Confidence: High

Evidence: Official Product Observation. AAPL Symbol Page, 확인일 2026-07-27.

### Table 기반 Discovery가 강하다

Observation: US Stocks Table과 공식 Screener 문서는 Metric, filter, table 기반 Stock Discovery를 제공한다.

Interpretation: TradingView는 많은 후보를 비교해야 하는 전문 사용자에게 Table-first 구조를 제공한다.

User Impact: 사용자는 후보군을 빠르게 좁힐 수 있지만 Metric 이해가 필요하다.

DATE Implication: DATE에서 투자 초보자와 전문 사용자 사이의 Information Density 차이를 검증해야 한다.

Confidence: High

Evidence: Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

## 주요 Structural Strengths

- Product Surface가 Home, Markets, Symbol Page, Supercharts, Screener, News, Calendar로 분리되어 있으나 Symbol과 Chart를 중심으로 연결된다.
- Watchlist, Alerts, Layout, Saved Screens가 Personal Continuity를 여러 State로 나눠 지원한다.
- News와 Economic Calendar는 Source, Timestamp, forecast, actual처럼 Trust 판단에 필요한 Metadata를 노출한다.
- Community Ideas는 Discussion보다 공개 분석 Thesis를 중심으로 구성된다.

## 주요 User Frictions

- 전문 사용자에게 강한 Metric, Chart, Screener 구조는 초보자에게 Learnability 비용을 만들 수 있다.
- Layout, Watchlist, Alerts가 서로 다른 Persistence 단위이므로 Personal Continuity 모델이 복잡할 수 있다.
- News와 Stock Price 변화 사이의 인과 관계는 자동 연결보다 사용자의 해석에 의존할 수 있다.
- Macro Event와 특정 Stock 영향 연결은 이번 조사에서 직접 확인하지 못했다.

## 주요 Context-loss Points

- Home 또는 Markets에서 Symbol Page로 이동한 뒤 Chart, Screener, Calendar를 오갈 때 동일 분석 의도가 자동으로 유지되는지는 미확인이다.
- News에서 Industry 또는 Event로 직접 전환하는 경로는 확인하지 못했다.
- Watchlist와 Layout이 분리되어 있어 저장된 분석 상태가 어디에 남는지 학습해야 할 수 있다.

## 주요 Trust Gaps

- 화면 내 Metric Source 표시 수준은 이번 공개 조사에서 충분히 확인하지 못했다.
- Community Ideas의 Opinion과 Evidence 경계는 사용자가 판단해야 할 수 있다.
- AI Disclosure Pattern은 확인하지 못했다.
- Document Source의 원문 접근 깊이는 일부 공식 설명으로만 확인했다.

## 주요 Accessibility Gaps

- Keyboard Support는 Symbol Search와 Supercharts Help Center 수준에서만 부분 확인했다.
- Screen Reader 구조, Mobile Navigation, Responsive Density는 직접 검증하지 않았다.
- Login 이후 Watchlist와 Alert 작성 흐름은 직접 수행하지 않았다.

## 검토 DATE Applicability

- Symbol 또는 Entity 중심 Hub는 DATE에서 검토할 가치가 있으나 Company와 Security 분리 여부는 확정할 수 없다.
- Watchlist가 Navigation과 Continuity를 동시에 수행하는 Pattern은 Cross Validation이 필요하다.
- Table-first Discovery는 전문 사용자에게 유효할 수 있으나 초보자 Journey와 Trade-off 검증이 필요하다.
- Source와 Freshness 노출은 Evidence 중심 Product에서 중요한 후보 Pattern이다.

## 주요 Conditions Required 검토

- 다른 Benchmark에서 Search가 Entity Transition으로 작동하는지 비교해야 한다.
- Watchlist, Portfolio, Workspace가 각각 어떤 Persistence 단위를 담당하는지 비교해야 한다.
- News, Document, Event, Metric이 실제 투자 Evidence로 연결되는 깊이를 비교해야 한다.
- Mobile과 Desktop의 Information Density 차이를 별도로 확인해야 한다.

## 주요 Do Not Copy 항목

- Chart 중심 구조를 DATE의 기본 구조로 확정하지 않는다.
- Symbol Page 탭 구조를 그대로 DATE Entity Hub로 복제하지 않는다.
- TradingView의 높은 Information Density를 사용자 검증 없이 적용하지 않는다.
- Watchlist, Alert, Layout의 분리 구조를 DATE의 Continuity 모델로 확정하지 않는다.

## 주요 Open Questions

- TradingView Search 결과는 Symbol 외 News, Idea, Script, User 등을 어떻게 그룹화하는가.
- Symbol Page의 Documents 탭은 어떤 Source와 원문 연결 깊이를 제공하는가.
- Watchlist에서 저장된 Symbol과 News, Notes, Alerts는 재방문 시 어떤 순서로 복구되는가.
- Alerts는 Evidence 변화 또는 News 발생을 Monitoring 조건으로 사용할 수 있는가.
- Macro Event와 Stock Impact가 명시적으로 연결되는 Surface가 존재하는가.
