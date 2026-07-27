# 벤치마크 TradingView Core Journey Observations 기록 문서

## 목적

이 문서는 Phase 0의 12개 공통 Research Scenario를 TradingView에 적용한 결과를 기록한다. 단순 클릭 수로 우수성을 판단하지 않는다.

## 주요 Scenario 수행 요약

| Scenario ID | 수행 가능 여부 | Entry Point | Context Loss | Evidence Traceability | Save / Continuity | Confidence |
| ----------- | -------------- | ----------- | ------------ | --------------------- | ----------------- | ---------- |
| S-001 | 가능 | Home / Markets | Low | Medium | Partial | High |
| S-002 | 부분 가능 | News / Symbol / Chart | Medium | Medium | Partial | Medium |
| S-003 | 가능 | Markets / Screener | Low | Medium | Partial | High |
| S-004 | 가능 | Search / Symbol Page | Low | High | Partial | High |
| S-005 | 부분 가능 | Screener / Symbol Page | Medium | Medium | Partial | Medium |
| S-006 | 가능 | Symbol Documents / News | Low | High | Partial | High |
| S-007 | 부분 가능 | Economic Calendar / Symbol | Medium | Medium | Partial | Medium |
| S-008 | 로그인 필요 | Watchlist | Low | Medium | Yes after login | Medium |
| S-009 | 부분 가능 | Alerts | Low | Medium | Yes after login | Medium |
| S-010 | 부분 가능 | Watchlist / Layout | Medium | Medium | Yes after login | Medium |
| S-011 | 가능 | News | Medium | Medium | Partial | Medium |
| S-012 | 가능 | Symbol / Chart / Screener | Low | Medium | Partial | Medium |

## 기록 Scenario S-001 오늘 시장의 주요 변화 파악

### Observation

Home과 Markets는 주요 지수, Crypto, Futures, Economic Indicators, Market Movers, News를 공개 접근으로 제공한다.

### Interpretation

TradingView는 오늘의 Market 변화를 단일 Summary가 아니라 여러 Market Surface의 집합으로 보여주는 구조일 수 있다.

### User Impact

사용자는 전체 Market 흐름을 빠르게 파악할 수 있지만, 어떤 변화가 가장 중요한지는 사용자가 직접 판단해야 한다.

### DATE Implication

DATE에서 Market 변화 요약을 제공할 경우 Signal 우선순위와 Evidence Traceability를 함께 검증해야 한다.

### Evidence

Official Product Observation. Home, Markets, 확인일 2026-07-27.

## 기록 Scenario S-002 상승 또는 하락 원인 확인

### Observation

News는 Source, Timestamp, Symbol을 제공하며 Symbol Page는 News와 Documents 탭을 제공한다.

### Interpretation

가격 변화 원인은 News, Documents, Symbol 분석 Surface를 조합해 확인하는 흐름일 수 있다.

### User Impact

원인 확인은 가능하지만 가격 변화와 원인 사이의 인과 연결은 사용자가 해석해야 한다.

### DATE Implication

DATE는 Event, News, Metric 변화의 관계를 더 명시적으로 연결할 수 있는지 검토할 가치가 있다.

### Evidence

Official Product Observation. News, AAPL Symbol Page, 확인일 2026-07-27.

## 기록 Scenario S-003 투자 대상 발견

### Observation

Markets는 Market Movers와 Stock 섹션을 제공하고, Screener는 filter와 table 기반 Stock Discovery를 제공한다고 공식 문서에서 설명한다.

### Interpretation

TradingView의 투자 대상 발견은 Market-first Discovery와 Filter-first Discovery가 병렬로 존재하는 구조일 수 있다.

### User Impact

사용자는 넓은 Market 스캔 또는 조건 기반 탐색 중 하나를 선택할 수 있다.

### DATE Implication

DATE에서 Discovery Entry를 하나로 확정하기 전에 Market-first와 Filter-first Journey를 비교해야 한다.

### Evidence

Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

## 기록 Scenario S-004 특정 기업 또는 종목 분석

### Observation

Symbol Search는 Chart 실행과 Overview 진입을 제공한다. Symbol Page는 Financials, Documents, News, Community, Technicals, Forecasts 등 Local Navigation을 제공한다.

### Interpretation

TradingView는 Symbol을 중심으로 Fundamental, Evidence, Social, Technical 분석을 분기시키는 구조일 수 있다.

### User Impact

사용자는 동일 Symbol을 기준으로 여러 분석 관점을 이동할 수 있다.

### DATE Implication

DATE에서 Company와 Stock의 관계를 분리하거나 통합할지는 추가 Benchmark 비교가 필요하다.

### Evidence

Official Product Observation 및 Symbol Search Help Center, 확인일 2026-07-27.

## 기록 Scenario S-005 동일 Industry 경쟁사 비교

### Observation

Screener는 sector, market, filter, table 기반 비교를 제공한다고 공식 문서에서 설명한다. 이번 조사에서는 특정 Industry 경쟁사 비교 화면을 직접 수행하지 않았다.

### Interpretation

Industry 경쟁사 비교는 Screener filter와 Table View를 통해 부분적으로 가능할 수 있다.

### User Impact

비교 가능한 구조는 존재하지만 Industry relationship이 사용자를 자동으로 안내하는지는 미확인이다.

### DATE Implication

DATE에서 Industry 또는 Peer Comparison을 별도 Journey로 검증할 필요가 있다.

### Evidence

Partial Observation. Official Documentation, Stock Screener, 확인일 2026-07-27.

## 기록 Scenario S-006 관련 News와 공시 검증

### Observation

News는 Source와 Timestamp를 제공하고, Symbol Page에는 Documents 탭이 있다. 공식 Blog는 Documents 탭이 earnings call transcripts, filings, investor presentations 등을 제공한다고 설명한다.

### Interpretation

TradingView는 News와 공식 Document를 Symbol Context에 함께 배치해 Evidence 확인을 지원할 수 있다.

### User Impact

사용자는 Market News와 기업 공식 자료를 같은 Symbol Context에서 확인할 수 있다.

### DATE Implication

DATE에서 Source와 Document를 Evidence Graph 후보로 연결할 수 있는지는 Cross Validation이 필요하다.

### Evidence

Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

## 기록 Scenario S-007 Macro Indicator와 Stock 영향 연결

### Observation

Economic Calendar는 Economic Event, forecast, actual, importance, country, category filter를 제공한다. Symbol 영향 연결은 이번 조사에서 직접 확인하지 않았다.

### Interpretation

Macro Event 탐색은 가능하지만 특정 Stock 영향 연결은 사용자의 해석에 의존할 수 있다.

### User Impact

Macro와 Stock 사이의 연결 비용이 남아 있을 수 있다.

### DATE Implication

DATE에서 Macro Event와 Entity impact를 연결하는 구조를 검증할 가치가 있다.

### Evidence

Partial Observation. Official Product Observation, Economic Calendar, 확인일 2026-07-27.

## 기록 Scenario S-008 Watchlist 또는 유사 기능에 저장

### Observation

공식 Help Center는 Watchlist가 여러 Product에서 접근 가능하고 Symbol 저장, custom list, related news, technical summary, notes, watchlist alert를 지원한다고 설명한다.

### Interpretation

Watchlist는 저장 기능을 넘어 개인 Navigation과 Monitoring의 기반일 수 있다.

### User Impact

로그인 후 사용자는 저장한 Symbol을 다시 열고 관련 정보를 이어볼 수 있다.

### DATE Implication

DATE에서 저장 기능이 Bookmark인지, Evidence Continuity인지, Monitoring Hub인지 구분해 검증해야 한다.

### Evidence

Official Documentation. Mastering TradingView watchlists, 확인일 2026-07-27.

## 기록 Scenario S-009 Alert 생성 가능성 확인

### Observation

공식 Help Center는 price alert, technical alert, watchlist alert를 지원한다고 설명한다. 실제 Alert 생성 화면은 로그인 이후 범위일 수 있다.

### Interpretation

TradingView는 분석 조건을 Monitoring State로 전환하는 Action Flow를 제공할 수 있다.

### User Impact

사용자는 재방문 없이 조건 변화 알림을 받을 수 있다.

### DATE Implication

DATE에서 Alert가 단순 가격 알림인지 Evidence 변화 알림인지 구분해 검증해야 한다.

### Evidence

Partial Observation. Official Documentation, Introduction to alerts 및 Watchlist alerts, 확인일 2026-07-27.

## 기록 Scenario S-010 다음 날 동일 분석 재개

### Observation

공식 Help Center는 Watchlist, Notes, Layout URL, saved screens를 설명한다. Watchlist와 Alerts는 Layout에 저장되지 않는다고 설명한다.

### Interpretation

TradingView의 분석 재개는 Layout, Watchlist, saved screens 등 여러 Persistence 단위로 분산될 수 있다.

### User Impact

전문 사용자는 목적별로 State를 저장할 수 있지만, 초보자는 저장 단위 차이를 학습해야 할 수 있다.

### DATE Implication

DATE에서 Continuity 단위를 Portfolio, Watchlist, Workspace, Evidence Graph 중 무엇으로 둘지 확정하지 않고 검증해야 한다.

### Evidence

Official Documentation. Layouts, Watchlists, Stock Screener, 확인일 2026-07-27.

## 기록 Scenario S-011 News에서 Company, Industry, Event로 전환

### Observation

News는 Market filter와 관련 Symbol을 노출한다. Industry 또는 Event로의 직접 전환은 이번 조사에서 확인하지 않았다.

### Interpretation

News에서 Symbol Transition은 가능하지만 Industry 또는 Event Transition은 제한적일 수 있다.

### User Impact

News를 투자 판단 Evidence로 확장하려면 사용자가 별도 Surface로 이동해야 할 수 있다.

### DATE Implication

DATE에서 News를 Company, Industry, Event와 명시적으로 연결할 수 있는지 검증해야 한다.

### Evidence

Partial Observation. Official Product Observation, News, 확인일 2026-07-27.

## 기록 Scenario S-012 하나의 Entity에서 관련 Entity 연속 탐색

### Observation

Symbol Page는 ETFs, Bonds, Options, News, Community, Documents 탭을 제공하고, Supercharts는 compare symbol과 related panel 접근을 제공한다고 공식 문서가 설명한다.

### Interpretation

Symbol은 관련 Security, Evidence, Community, Tool Surface로 연속 탐색되는 중심 Entity 역할을 할 수 있다.

### User Impact

사용자는 하나의 Symbol에서 다양한 관련 Entity로 확장할 수 있다.

### DATE Implication

DATE에서 Entity Transition을 어떤 관계 유형으로 모델링할지 추가 Benchmark 비교가 필요하다.

### Evidence

Official Product Observation 및 Official Documentation. 확인일 2026-07-27.
