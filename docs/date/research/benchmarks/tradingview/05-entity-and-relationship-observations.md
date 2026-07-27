# 벤치마크 TradingView Entity 및 Relationship Observations 기록 문서

## 목적

이 문서는 TradingView에서 확인된 Entity 후보와 관계를 기록한다. DATE의 Entity Architecture를 확정하지 않는다.

## 주요 Entity 후보 요약

| Entity 후보 | Observation 상태 | 주요 Surface | Candidate Type | Confidence |
| ----------- | ---------------- | ------------ | -------------- | ---------- |
| Market | Observed | Home, Markets | Entity Candidate | High |
| Symbol | Observed | Search, Symbol Page, Supercharts | Entity Candidate | High |
| Stock | Observed | Markets, Screener, Symbol Page | Security Candidate | High |
| Company | Observed | Symbol Page, Documents | Entity Candidate | Medium |
| Exchange | Observed | Symbol Page | Entity Candidate | Medium |
| News | Observed | News, Symbol Page | Evidence Candidate | High |
| Source | Observed | News | Evidence Metadata Candidate | High |
| Idea | Observed | Community Ideas | Community Content Candidate | High |
| User | Observed | Community Ideas | Entity Candidate | Medium |
| Event | Observed | Economic Calendar | Economic Event Candidate | High |
| Metric | Observed | Screener, Financials | Evidence Candidate | High |
| Screener Result | Official Documentation | Screener | Result Candidate | Medium |
| Watchlist | Official Documentation | Watchlist | User State Candidate | Medium |
| Alert | Official Documentation | Alerts | User State Candidate | Medium |
| Chart | Official Documentation | Supercharts | Workspace Surface Candidate | Medium |
| Layout | Official Documentation | Supercharts | User State Candidate | Medium |
| Document | Observed / Official Documentation | Symbol Page | Evidence Surface Candidate | Medium |
| Option | Observed | Symbol Page | Security Candidate | Medium |
| ETF | Observed | Symbol Page | Security Candidate | Medium |
| Bond | Observed | Symbol Page | Security Candidate | Medium |
| Indicator | Official Documentation | Supercharts, Economic Calendar | Metric / Tool Candidate | Medium |
| Portfolio | Surface label observed in footer | Product Surface Candidate | Low |

## 기록 Entity: Market

### Observation

Home과 Markets는 지수, Crypto, Futures, Stocks, Economic Indicators, Market Movers를 Market Summary 또는 Market Surface로 제공한다.

### Interpretation

Market은 TradingView에서 Discovery를 시작하는 상위 Entity 후보로 볼 수 있다.

### User Impact

사용자는 개별 Symbol을 선택하기 전 Market 범주와 흐름을 먼저 탐색할 수 있다.

### Evidence

Official Product Observation. Home, Markets, 확인일 2026-07-27.

## 기록 Entity: Symbol / Stock / Company

### Observation

AAPL Symbol Page는 Apple Inc, AAPL, Nasdaq Stock Market을 함께 노출하고, Overview, Financials, Documents, News, Community, Technicals 등으로 분기한다.

### Interpretation

TradingView는 Symbol을 사용자 조작의 중심 식별자로 두고, Company 정보와 Stock 관련 분석을 같은 Hub에서 연결하는 구조일 수 있다.

### User Impact

사용자는 Ticker 기반으로 진입하되 Company Evidence와 Stock Market Data를 함께 탐색할 수 있다.

### DATE Implication

DATE에서 Company와 Security를 분리할지 여부는 TradingView만으로 확정할 수 없다.

### Evidence

Official Product Observation. AAPL Symbol Page, 확인일 2026-07-27.

## 기록 Entity: News / Source / Freshness

### Observation

News Screen은 News 항목에 Source, Timestamp, 관련 Symbol을 함께 표시한다.

### Interpretation

News는 독립 콘텐츠이면서 Symbol과 Market 판단을 연결하는 Evidence 후보로 작동할 수 있다.

### User Impact

사용자는 News의 출처와 최신성을 확인하고 Symbol Context로 이동할 수 있다.

### Evidence

Official Product Observation. News, 확인일 2026-07-27.

## 기록 Entity: Idea / User

### Observation

Community Ideas는 작성자와 분석 콘텐츠를 중심으로 Popular, Editors' picks, Most recent, Most popular 등의 필터를 제공한다.

### Interpretation

Idea는 Discussion Thread보다 분석 주장 또는 Trading Thesis에 가까운 Entity 후보일 수 있다.

### User Impact

사용자는 다른 사용자의 해석을 Market 또는 Symbol 판단의 보조 Signal로 볼 수 있다.

### Evidence

Official Product Observation. Community Ideas, 확인일 2026-07-27.

## 기록 Entity: Event / Indicator

### Observation

Economic Calendar는 Economic, Earnings, Revenue, Dividends, IPO 탭과 actual, forecast, country, importance, category filter를 제공한다.

### Interpretation

Event는 시간축 기반 Entity이며 Indicator와 Market impact 판단을 연결할 수 있다.

### User Impact

사용자는 일정 기반 Event를 보고 Macro 환경 변화를 추적할 수 있다.

### Evidence

Official Product Observation. Economic Calendar, 확인일 2026-07-27.

## 기록 State Candidate: Watchlist / Alert / Layout

### Observation

공식 Help Center는 Watchlist가 여러 Product에서 접근 가능하고, Watchlist Alert, Notes, 관련 News, technical summary를 지원한다고 설명한다. Layout은 chart, settings, drawings, indicators를 저장하며 Watchlist와 Alerts는 Layout에 저장되지 않는다고 설명한다.

### Interpretation

TradingView는 개인 Continuity를 단일 Workspace가 아니라 Watchlist, Alert, Layout 등 목적별 User State로 분리할 수 있다.

### User Impact

전문 사용자는 분석 State와 Monitoring State를 분리 관리할 수 있지만, 저장 단위 차이를 이해해야 한다.

### Evidence

Official Documentation. Watchlists, Alerts, Layouts, 확인일 2026-07-27.

## 주요 Relationship 후보

| Relationship | Observation 상태 | 설명 | Confidence |
| ------------ | ---------------- | ---- | ---------- |
| Market -> Symbol | Observed | Market Surface와 Screener에서 Symbol로 이동 가능 | High |
| Search -> Symbol | Official Documentation | Symbol Search가 Chart 또는 Overview 진입 제공 | Medium |
| Symbol -> Chart | Observed | Symbol Page에서 Full chart 제공 | High |
| Symbol -> Documents | Observed | Symbol Page Local Navigation에 Documents 제공 | High |
| Symbol -> News | Observed | Symbol Page Local Navigation에 News 제공 | High |
| Symbol -> Community | Observed | Symbol Page Local Navigation에 Community 제공 | High |
| Chart -> Watchlist | Official Documentation | Supercharts 오른쪽 Toolbar에서 Watchlist 접근 | Medium |
| Chart -> Alert | Official Documentation | Chart 또는 Watchlist 기반 Alert 설정 | Medium |
| Screener -> Symbol | Official Documentation | Screener Table에서 Stock 후보 탐색 | Medium |
| News -> Symbol | Observed | News 항목이 관련 Symbol을 표시 | Medium |
| Event -> Market | Observed | Economic Calendar가 Market 영향 가능 Event를 제공 | Medium |

## 미확인 관계

| Relationship | 상태 | 이유 |
| ------------ | ---- | ---- |
| News -> Industry | Not Verified | News에서 Industry 직접 전환을 확인하지 못했다. |
| Event -> Stock Impact | Partial Observation | Economic Event는 확인했지만 Stock 영향 연결은 직접 확인하지 못했다. |
| Watchlist -> Evidence Graph | Not Verified | Watchlist가 Evidence Graph처럼 작동하는지는 확인하지 못했다. |
| Portfolio -> Symbol | Not Verified | Portfolio Surface는 footer에서 확인했지만 상세 Product Observation은 수행하지 않았다. |
