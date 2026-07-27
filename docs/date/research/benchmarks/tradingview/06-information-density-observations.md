# 벤치마크 TradingView Information Density Observations 기록 문서

## 목적

이 문서는 TradingView의 Information Density Pattern을 기록한다. UI 외형 평가가 아니라 정보 구조와 사용자의 판단 비용을 분석한다.

## 주요 Density Pattern 요약

| Pattern | 주요 Surface | Confidence |
| ------- | ------------ | ---------- |
| Market Summary Grid | Home, Markets | High |
| Table-first Comparison | US Stocks, Screener | High |
| Symbol Hub Tabs | Symbol Page | High |
| Chart-centered Panel System | Supercharts | Medium |
| News Source / Freshness List | News | High |
| Calendar Event Table | Economic Calendar | High |

## 기록 Pattern: Market Summary Grid

### Observation

Home과 Markets는 major indices, crypto, futures, economic indicators, market movers를 여러 섹션으로 배치한다.

### Interpretation

TradingView는 높은 정보량을 하나의 긴 설명보다 Market 범주별 Grid와 섹션으로 나눠 스캔 가능하게 만드는 것으로 보인다.

### User Impact

사용자는 세부 분석 전 Market 범주별 이상 움직임을 빠르게 찾을 수 있다.

### DATE Implication

DATE에서 Discovery 화면을 설계할 경우 정보량을 줄이기보다 Grouping과 우선순위 기준을 검증해야 한다.

### Confidence

High

### Evidence

Official Product Observation. Home, Markets, 확인일 2026-07-27.

## 기록 Pattern: Table-first Comparison

### Observation

US Stocks Screen은 Overview, Performance, Technicals, Valuation, Dividends, Profitability, Income statement, Balance sheet, Cash flow 탭으로 Table 관점을 전환한다. 공식 Help Center는 Screener가 filter와 table, fundamental metrics, technical indicators, financial statements를 제공한다고 설명한다.

### Interpretation

TradingView는 Stock 후보 비교에서 Card보다 Table을 우선 사용해 동일 Metric 기준 비교를 강화하는 것으로 보인다.

### User Impact

사용자는 많은 Stock을 한 화면에서 비교할 수 있지만, 초보자는 Metric 의미를 학습해야 한다.

### DATE Implication

DATE에서 Candidate Discovery가 Card 중심인지 Table 중심인지 사용자 Archetype별로 검증해야 한다.

### Confidence

High

### Evidence

Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

## 기록 Pattern: Symbol Hub Tabs

### Observation

Symbol Page는 Overview, Financials, Documents, News, Community, Technicals, Forecasts, Seasonals, Options, ETFs, Bonds 탭을 제공한다.

### Interpretation

하나의 Symbol 안에서 정보 밀도를 직접 나열하지 않고 분석 목적별 탭으로 Progressive Disclosure를 제공하는 구조일 수 있다.

### User Impact

사용자는 Symbol Context를 유지하면서 필요한 분석 모드만 선택할 수 있다.

### DATE Implication

DATE에서 Entity Hub를 사용할 경우 탭이 정보 은닉이 아니라 Decision Journey 분기를 지원하는지 검증해야 한다.

### Confidence

High

### Evidence

Official Product Observation. AAPL Symbol Page, 확인일 2026-07-27.

## 기록 Pattern: Chart-centered Panel System

### Observation

공식 Help Center는 Supercharts의 오른쪽 Toolbar가 Watchlist, Alerts, Screeners, Pine Editor, Calendars, News Flow를 제공한다고 설명한다.

### Interpretation

TradingView는 Chart Context를 유지한 상태에서 보조 정보와 Tool을 Panel로 제공해 화면 전환을 줄이는 구조일 수 있다.

### User Impact

전문 사용자는 높은 정보 밀도 안에서 분석 흐름을 끊지 않고 Tool을 전환할 수 있다.

### DATE Implication

DATE에서 Side Panel 또는 Overlay가 Context Preservation에 기여하는지 다른 Benchmark에서 비교해야 한다.

### Confidence

Medium

### Evidence

Official Documentation. Supercharts Help Center, 확인일 2026-07-27.

## 기록 Pattern: News Source / Freshness List

### Observation

News Screen은 News 항목마다 Source, Timestamp, 관련 Symbol 또는 Market Filter를 함께 노출한다.

### Interpretation

News 목록은 기사 제목뿐 아니라 판단에 필요한 Source와 Freshness Signal을 함께 표시해 Evidence 선별 비용을 줄이는 구조일 수 있다.

### User Impact

사용자는 최신성 및 출처 신뢰도를 빠르게 판단할 수 있다.

### DATE Implication

DATE에서 News를 Evidence로 사용할 경우 Source와 Freshness를 기본 Metadata로 유지해야 하는지 검증할 필요가 있다.

### Confidence

High

### Evidence

Official Product Observation. News, 확인일 2026-07-27.

## 기록 Pattern: Calendar Event Table

### Observation

Economic Calendar는 날짜, 국가, 중요도, category, forecast, actual 등 Event 판단에 필요한 구조를 제공한다.

### Interpretation

Calendar는 Event를 시간축과 영향 가능성 기준으로 정렬해 Macro 정보 밀도를 제어하는 구조일 수 있다.

### User Impact

사용자는 Event 중요도와 예상치 대비 실제치를 기준으로 Market 영향 가능성을 판단할 수 있다.

### DATE Implication

DATE에서 Event 중심 구조를 검토할 경우 Calendar와 Entity Impact 연결의 깊이를 별도 검증해야 한다.

### Confidence

High

### Evidence

Official Product Observation. Economic Calendar, 확인일 2026-07-27.
