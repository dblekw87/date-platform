# 접근 범위와 조사 방법

## 접속 환경

- Service: TradingView
- Official service URL: https://www.tradingview.com/
- Access Date: 2026-07-27
- Timezone Context: Asia/Seoul
- Access Mode: Public, not logged in
- Device: Desktop research environment
- Viewport: Text extraction 중심, pixel viewport 직접 측정 없음
- Browser/Fetcher: Official product pages and official Help Center pages through web extraction

## 공개 접근 범위

Public으로 확인한 화면:

- Home: https://www.tradingview.com/
- Markets: https://www.tradingview.com/markets/
- US Stocks market movers: https://www.tradingview.com/markets/stocks-usa/market-movers-all-stocks/
- Symbol page: https://www.tradingview.com/symbols/NASDAQ-AAPL/
- News: https://www.tradingview.com/news/
- Community Ideas: https://www.tradingview.com/ideas/
- Screener shell: https://www.tradingview.com/screener/
- Economic Calendar: https://www.tradingview.com/economic-calendar/

## 공식 문서 접근 범위

공식 Help Center로 확인한 기능:

- Supercharts 구조와 right toolbar
- Symbol Search
- Watchlist
- Watchlist alerts
- Alerts
- Stock Screener
- Layout, chart, drawing, indicator interaction
- Financial data
- Economic Calendar

## 로그인 필요 범위

Observation:
Home, Markets, News, Ideas, Symbol page는 public으로 접근 가능했다. Help Center는 Watchlist 생성, saved layouts, alerts, notes, personalized screens, advanced watchlist view가 계정 기반 또는 interaction 기반임을 설명한다.

Interpretation:
TradingView는 public discovery와 public symbol research를 제공하면서, 반복 분석과 monitoring은 login 기반 Workspace/Watchlist/Layout/Alert로 확장하는 구조로 해석된다.

User Impact:
비로그인 사용자는 Market, Symbol, News, Ideas 구조를 이해할 수 있다. 다만 실제 saved layout, alert, watchlist persistence는 직접 검증하기 어렵다.

DATE Implication:
DATE Benchmark에서도 public research surface와 logged-in continuity surface를 분리해 평가해야 한다.

Confidence:
High for public pages and official documentation, Medium for continuity interpretation.

Evidence:
Official Product Observation and Official Documentation, accessed 2026-07-27.

## 유료 기능 제한

공식 Help Center는 일부 data, layout, alert, real-time 기능이 계정 또는 plan에 따라 달라질 수 있음을 시사한다. 이번 pass에서는 pricing tier별 차이를 검증하지 않았다.

## 조사 방법

- EidosLayer와 동일한 파일 구조를 사용했다.
- Phase 0의 `05-screen-research-template.md`와 `06-benchmark-scope-and-scenarios.md`를 적용했다.
- 공식 Product 화면에서 확인한 내용을 `Official Product Observation`으로 기록했다.
- Help Center로 보완한 내용은 `Official Documentation`으로 분리했다.
- 직접 조작하지 못한 기능은 `Not Verified`, `Login Required`, `Partial`로 표시했다.

## 주요 Evidence 수집 방식

Evidence Type은 다음 값을 사용한다.

- Official Product Observation: 공식 서비스 화면에서 확인
- Official Documentation: 공식 Help Center 또는 공식 Blog에서 확인
- Inference: Observation에서 도출한 해석

이번 문서 세트는 `Official Product Observation`, `Official Documentation`, `Inference`를 사용했다.

## 알려진 한계

- Supercharts의 실제 canvas와 right toolbar는 Help Center 중심으로 확인했다.
- Watchlist, Alert, Layout persistence는 직접 로그인 조작하지 않았다.
- Screener public URL은 shell만 추출되었고, 상세 workflow는 공식 Help Center로 보완했다.
- Mobile Navigation은 직접 테스트하지 않았다.
- Paid data, broker integration, real-time data entitlement는 검증하지 않았다.

## 주요 Observation Confidence 규칙

- High: 공식 Product 화면 또는 공식 Help Center에서 직접 확인했다.
- Medium: 공식 Evidence를 바탕으로 Product structure를 해석했다.
- Low: 접근 제한, 로그인 요구, 직접 조작 부재 때문에 부분 Observation만 가능했다.
