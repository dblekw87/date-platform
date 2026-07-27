# 벤치마크 TradingView Screen Inventory 기록 문서

## 목적

이 문서는 `05-screen-research-template.md` 기준을 사용해 TradingView에서 확인한 Screen 후보를 기록한다.

## 요약

| Screen | URL | Access | Primary Entity | Confidence |
| ------ | --- | ------ | -------------- | ---------- |
| Home | `https://www.tradingview.com/` | Public | Market | High |
| Markets | `https://www.tradingview.com/markets/` | Public | Market | High |
| US Stocks Screener Table | `https://www.tradingview.com/markets/stocks-usa/market-movers-all-stocks/` | Public | Stock | High |
| Symbol Page | `https://www.tradingview.com/symbols/NASDAQ-AAPL/` | Public | Symbol | High |
| News | `https://www.tradingview.com/news/` | Public | News | High |
| Community Ideas | `https://www.tradingview.com/ideas/` | Public | Idea | High |
| Supercharts | `https://www.tradingview.com/chart/` | Public / Login-dependent for saved state | Symbol | Medium |
| Stock Screener | `https://www.tradingview.com/screener/` | Public / Login-dependent for saved screens | Stock | Medium |
| Economic Calendar | `https://www.tradingview.com/economic-calendar/` | Public | Event | High |
| Watchlist / Alerts | Help Center evidence | Login-dependent | Watchlist / Alert | Medium |

## 기록 Screen: Home

### Observation

Home은 Header, Search, 주요 Market Summary, Community Ideas, News, Market Mover 성격의 섹션을 함께 제공한다.

### Interpretation

Home은 정적 마케팅 Landing보다 Discovery Entry에 가까운 역할을 수행할 수 있다.

### User Impact

사용자는 첫 화면에서 Market 상태, Community Signal, News를 동시에 스캔할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/`, 확인일 2026-07-27.

## 기록 Screen: Markets

### Observation

Markets Screen은 indices, stocks, futures, bonds, world stocks, earnings calendar, IPO calendar 등 Market 단위 섹션을 제공한다.

### Interpretation

Market을 Asset Class와 Calendar Event의 상위 Surface로 구성해 투자 대상 Discovery를 넓게 시작하게 하는 구조일 수 있다.

### User Impact

사용자는 개별 Symbol 전 단계에서 Market 전반의 방향과 범주를 스캔할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/markets/`, 확인일 2026-07-27.

## 기록 Screen: US Stocks Screener Table

### Observation

US Stocks Screen은 All US stocks 제목과 함께 Overview, Performance, Technicals, Valuation, Dividends, Profitability, Income statement, Balance sheet, Cash flow 등의 Table View 탭을 제공한다.

### Interpretation

TradingView는 Stock Discovery를 카드가 아니라 비교 가능한 Table Surface로 제공해 Metric 기반 탐색을 지원하는 것으로 보인다.

### User Impact

사용자는 동일 Universe 안에서 Stock을 여러 관점으로 비교할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/markets/stocks-usa/market-movers-all-stocks/`, 확인일 2026-07-27.

## 기록 Screen: Symbol Page

### Observation

AAPL Symbol Page는 Overview, Financials, Documents, News, Community, Technicals, Forecasts, Seasonals, Options, ETFs, Bonds 탭과 Full chart 이동을 제공한다.

### Interpretation

Symbol Page는 Symbol 분석의 Hub이며, Chart와 전문 분석 Surface로 분기하는 구조일 수 있다.

### User Impact

사용자는 동일 Symbol 기준으로 Evidence, Market Data, Community, Technicals를 순차적으로 확인할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/symbols/NASDAQ-AAPL/`, 확인일 2026-07-27.

## 기록 Screen: News

### Observation

News Screen은 Top stories, Market 필터, Source, Timestamp, 관련 Symbol을 노출한다.

### Interpretation

News는 콘텐츠 소비보다 Market 영향과 Symbol Transition을 지원하는 Evidence Surface로 작동할 수 있다.

### User Impact

사용자는 News의 최신성, 출처, 관련 Market 범주를 빠르게 판단할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/news/`, 확인일 2026-07-27.

## 기록 Screen: Community Ideas

### Observation

Community Ideas Screen은 Popular, Editors' picks, All ideas, Videos only, Most recent, Most popular 필터와 작성자 중심 분석 콘텐츠를 제공한다.

### Interpretation

Community Surface는 토론 Thread보다 공개 분석 Thesis와 Trading Idea의 유통에 초점을 둘 수 있다.

### User Impact

사용자는 다른 사용자의 분석 관점과 Technical Signal을 탐색할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/ideas/`, 확인일 2026-07-27.

## 기록 Screen: Supercharts

### Observation

공식 Help Center는 Supercharts가 Symbol, interval, chart type, indicator, compare, publish, Watchlist, Alerts, Screeners, Pine Editor, Calendar, News Flow를 연결한다고 설명한다.

### Interpretation

Supercharts는 단일 Chart Screen이 아니라 분석 Workspace 성격의 Product Surface일 수 있다.

### User Impact

사용자는 가격 분석, 비교, Tool 실행, Monitoring 설정을 Chart Context 안에서 이어갈 수 있다.

### Evidence

Official Documentation. TradingView Help Center, Getting started in Supercharts, 확인일 2026-07-27.

## 기록 Screen: Stock Screener

### Observation

공식 Help Center는 Stock Screener가 fundamental metrics, technical indicators, financial statements 기반 filter와 table을 제공하며 standalone 또는 Supercharts에서 접근할 수 있다고 설명한다.

### Interpretation

Screener는 Discovery와 Comparison을 동시에 수행하는 Table-first Product Surface일 수 있다.

### User Impact

사용자는 조건 기반 후보 탐색과 Metric 비교를 한 화면에서 수행할 수 있다.

### Evidence

Official Documentation. TradingView Help Center, Stock Screener, 확인일 2026-07-27.

## 기록 Screen: Economic Calendar

### Observation

Economic Calendar는 Economic, Earnings, Revenue, Dividends, IPO 탭과 국가, 중요도, Category, 날짜 필터를 제공한다.

### Interpretation

Calendar는 Event를 시간축과 Market 영향 기준으로 구조화하는 Surface일 수 있다.

### User Impact

사용자는 Macro Event와 특정 Market 영향 가능성을 일정 단위로 탐색할 수 있다.

### Evidence

Official Product Observation. `https://www.tradingview.com/economic-calendar/`, 확인일 2026-07-27.

## 기록 Screen: Watchlist / Alerts

### Observation

공식 Help Center는 Watchlist가 여러 Product에서 접근 가능하며 관련 News, fundamental data, technical summary, Notes, Watchlist Alert를 제공한다고 설명한다. Alerts는 price, technical, watchlist 조건을 지원한다고 설명한다.

### Interpretation

Watchlist와 Alerts는 Navigation과 Monitoring을 결합한 Personal Continuity Surface일 수 있다.

### User Impact

사용자는 저장한 Symbol을 다시 열고 조건 변화에 따라 분석을 재개할 수 있다.

### Evidence

Official Documentation. TradingView Help Center, Mastering TradingView watchlists 및 Introduction to alerts, 확인일 2026-07-27.
