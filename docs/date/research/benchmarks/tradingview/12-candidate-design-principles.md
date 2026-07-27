# 벤치마크 TradingView Candidate Design Principles 기록 문서

## 목적

이 문서는 TradingView Observation에서 도출한 Candidate Principle을 기록한다. 어떤 Principle도 TradingView의 확정된 Product Principle 또는 DATE의 Design Principle로 확정하지 않는다.

## 주요 Principle 요약

| Principle ID | Candidate Principle | Evidence Type | Confidence |
| ------------ | ------------------- | ------------- | ---------- |
| P-001 | Home may operate as a Market Discovery Entry rather than a static landing page | Supporting | High |
| P-002 | Search may function as stock-first entity navigation rather than broad discovery | Variant / Insufficient | Medium |
| P-003 | Cards and lists may act primarily as navigation units | Supporting | Medium |
| P-004 | AI may be packaged as task-specific market tools | Insufficient | Low |
| P-005 | Participation may be attached to market objects | Supporting | Medium |
| P-006 | Watchlist may teach personal continuity before proving research continuity | Supporting / Refining | Medium |
| P-007 | Freshness and source cues may be exposed before deep evidence | Supporting | High |
| P-008 | AI persona content may require explicit source-identity separation | Insufficient | Low |
| P-009 | Page-based specialization may trade clarity for context preservation risk | Variant / Refining | Medium |
| P-010 | Loading states may be part of live-market UX, not only system feedback | Insufficient | Low |
| P-011 | Chart may operate as the primary workspace context, not only a visualization component | Benchmark-specific | Medium |
| P-012 | Symbol pages may use tabs to separate analysis modes inside one entity context | Benchmark-specific | High |
| P-013 | Screener tables may serve as discovery and comparison surfaces before entity analysis | Benchmark-specific | High |
| P-014 | Personal continuity may be split across Watchlist, Alert, Layout, and saved screen states | Benchmark-specific | Medium |
| P-015 | Documents may act as a symbol-level evidence surface distinct from News and Community | Benchmark-specific | Medium |

## 기록 Principle P-001

### Observation

Home은 Market Summary, Community Ideas, News, Market Movers 성격의 섹션을 제공한다.

### Supporting Evidence

Official Product Observation. Home, 확인일 2026-07-27.

### Interpretation

TradingView Home은 정적 Landing보다 Market Discovery Entry 역할을 수행할 수 있다.

### Candidate Principle

Home may operate as a Market Discovery Entry rather than a static landing page.

### User Benefit

사용자는 첫 진입에서 Market 변화, News, Community Signal을 동시에 스캔할 수 있다.

### Potential Trade-off

첫 화면의 정보량이 많아 초보자에게 우선순위 판단 비용이 커질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Home을 Discovery Entry로 검토할 수 있으나 Dashboard 또는 Workspace-first 모델과 비교해야 한다.

### Confidence

High

## 기록 Principle P-002

### Observation

Symbol Search는 Chart 실행과 Symbol Overview 진입을 제공한다고 공식 Help Center에서 설명한다.

### Supporting Evidence

Official Documentation. Symbol Search, 확인일 2026-07-27.

### Interpretation

TradingView Search는 EidosLayer에서 관찰된 stock-first Navigation과 다른 범위의 Symbol Context Selection에 가까울 수 있다.

### Candidate Principle

Search may function as stock-first entity navigation rather than broad discovery.

### User Benefit

사용자는 Search에서 Symbol을 선택한 뒤 Chart 또는 Overview로 빠르게 전환할 수 있다.

### Potential Trade-off

Stock-first로 제한하면 News, Idea, Event, User 등 multi-entity Discovery가 약해질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE Search는 stock-first인지 multi-entity인지 확정하지 않고, TradingView의 Symbol Context Selection을 Variant Pattern으로 비교해야 한다.

### Confidence

Medium

## 기록 Principle P-003

### Observation

Home, Markets, News, Community Ideas, US Stocks Table 항목은 관련 Symbol, News, Idea, Market Surface로 이어지는 탐색 단위로 작동한다.

### Supporting Evidence

Official Product Observation. Home, Markets, News, Ideas, US Stocks, 확인일 2026-07-27.

### Interpretation

TradingView의 Card, List, Table row는 단순 요약이 아니라 다음 분석 Context로 이동시키는 Navigation Unit일 수 있다.

### Candidate Principle

Cards and lists may act primarily as navigation units.

### User Benefit

사용자는 정보 스캔과 이동을 같은 단위에서 수행할 수 있다.

### Potential Trade-off

항목 내부 Evidence가 얕으면 사용자가 자주 이동해야 할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Card, List, Table의 역할을 표시 Component와 Navigation Unit 중 무엇으로 둘지 검증해야 한다.

### Confidence

Medium

## 기록 Principle P-004

### Observation

이번 조사 범위에서 TradingView의 task-specific AI Tool Surface는 확인하지 않았다.

### Supporting Evidence

Not Verified. 공식 Product Observation 및 읽은 공식 문서 범위에서 확인하지 못함.

### Interpretation

이 Candidate Principle은 TradingView에서 Supporting Evidence를 얻지 못했다.

### Candidate Principle

AI may be packaged as task-specific market tools.

### User Benefit

검증되지 않았다.

### Potential Trade-off

AI Surface가 없거나 낮게 노출되는 Product에서는 이 Principle을 일반화할 수 없다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 AI Tool 배치는 EidosLayer만으로 판단할 수 없으며 추가 Benchmark가 필요하다.

### Confidence

Low

## 기록 Principle P-005

### Observation

Community Ideas는 작성자 분석 콘텐츠와 필터를 제공하고, Symbol Page에는 Community 탭이 있다.

### Supporting Evidence

Official Product Observation. Community Ideas, AAPL Symbol Page, 확인일 2026-07-27.

### Interpretation

TradingView는 Participation을 일반 게시판보다 Symbol 또는 Market 분석에 붙은 Idea Surface로 구성할 수 있다.

### Candidate Principle

Participation may be attached to market objects.

### User Benefit

사용자는 특정 Market Object와 관련된 다른 사용자의 분석 관점을 탐색할 수 있다.

### Potential Trade-off

Community Signal이 Evidence와 혼동될 수 있으며 품질 편차가 존재할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Discussion 또는 Insight를 Entity에 연결할 경우 Source Type과 Evidence 경계를 검증해야 한다.

### Confidence

Medium

## 기록 Principle P-006

### Observation

공식 Help Center는 Watchlist가 여러 Product에서 접근 가능하며 related news, fundamental data, technical summary, Notes, Watchlist Alert를 제공한다고 설명한다.

### Supporting Evidence

Official Documentation. Watchlists, Alerts, 확인일 2026-07-27.

### Interpretation

TradingView Watchlist는 EidosLayer보다 Personal Continuity와 Monitoring 역할이 더 명시적으로 드러난다.

### Candidate Principle

Watchlist may teach personal continuity before proving research continuity.

### User Benefit

사용자는 관심 Symbol을 저장하고 관련 정보와 Alert를 통해 분석을 이어갈 수 있다.

### Potential Trade-off

Watchlist, Layout, Alert, saved screens가 분리되어 Continuity 모델이 복잡해질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Watchlist가 Bookmark인지 Navigation인지 Monitoring인지 구분해 검증해야 한다.

### Confidence

Medium

## 기록 Principle P-007

### Observation

News는 Source와 Timestamp를 노출하고 Economic Calendar는 forecast와 actual을 제공한다.

### Supporting Evidence

Official Product Observation. News, Economic Calendar, 확인일 2026-07-27.

### Interpretation

TradingView는 깊은 Evidence 확인 전에 Freshness와 Source Signal을 목록 단계에서 제공할 수 있다.

### Candidate Principle

Freshness and source cues may be exposed before deep evidence.

### User Benefit

사용자는 정보의 최신성과 출처를 먼저 판단해 탐색 우선순위를 정할 수 있다.

### Potential Trade-off

Source와 Timestamp만으로 claim provenance 또는 인과 관계가 검증되지는 않는다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Evidence 목록은 Source와 Freshness를 기본 Metadata로 노출할지 검토할 가치가 있다.

### Confidence

High

## 기록 Principle P-008

### Observation

이번 조사 범위에서 AI persona content 또는 AI 생성 정보 Source-identity 분리는 확인하지 않았다.

### Supporting Evidence

Not Verified. 공식 Product Observation 및 읽은 공식 문서 범위에서 확인하지 못함.

### Interpretation

TradingView는 이 Candidate Principle에 대해 충분한 Supporting Evidence를 제공하지 않는다.

### Candidate Principle

AI persona content may require explicit source-identity separation.

### User Benefit

검증되지 않았다.

### Potential Trade-off

EidosLayer의 AI Persona Pattern을 다른 Product에 일반화하면 과도한 해석이 될 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 AI Evidence Disclosure는 별도 AI Benchmark 또는 AI Surface 관찰 후 판단해야 한다.

### Confidence

Low

## 기록 Principle P-009

### Observation

Supercharts 오른쪽 Toolbar는 Chart Context 안에서 Watchlist, Alerts, Screeners, Calendars, News Flow 접근을 제공한다고 공식 Help Center에서 설명한다.

### Supporting Evidence

Official Documentation. Supercharts, 확인일 2026-07-27.

### Interpretation

TradingView는 page-based specialization의 Context Preservation risk를 Contextual Panel로 완화하는 Variant Pattern을 보여줄 수 있다.

### Candidate Principle

Page-based specialization may trade clarity for context preservation risk.

### User Benefit

사용자는 Chart 분석 Context를 유지하면서 여러 Tool로 확장할 수 있다.

### Potential Trade-off

Panel과 Toolbar가 많아질수록 Learnability와 화면 복잡도가 높아질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Page와 Panel의 역할 분리는 Context Preservation 기준으로 비교해야 한다.

### Confidence

Medium

## 기록 Principle P-010

### Observation

이번 조사 범위에서 TradingView의 Loading State 또는 stale State Pattern은 충분히 확인하지 않았다.

### Supporting Evidence

Not Verified. 공식 Product Observation 및 읽은 공식 문서 범위에서 확인하지 못함.

### Interpretation

Live-market UX에서 Loading State가 별도 Product Principle인지 TradingView로는 판단할 수 없다.

### Candidate Principle

Loading states may be part of live-market UX, not only system feedback.

### User Benefit

검증되지 않았다.

### Potential Trade-off

Loading State를 Product Principle로 일반화하면 실제 Evidence 없이 State Pattern을 과대평가할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Loading, delayed, stale State를 다루려면 실시간 데이터 Surface 관찰이 더 필요하다.

### Confidence

Low

## 기록 Principle P-011

### Observation

공식 Help Center는 Supercharts가 Symbol, interval, chart type, indicator, compare, publish, Watchlist, Alerts, Screeners, Pine Editor, Calendar, News Flow를 연결한다고 설명한다.

### Supporting Evidence

Official Documentation. Supercharts Help Center, 확인일 2026-07-27.

### Interpretation

TradingView에서 Chart는 시각화 Component보다 분석 Workspace Context에 가까울 수 있다.

### Candidate Principle

Chart may operate as the primary workspace context, not only a visualization component.

### User Benefit

사용자는 가격 분석, 비교, Tool 실행, Monitoring을 하나의 Chart Context 안에서 이어갈 수 있다.

### Potential Trade-off

Chart 중심 구조는 비차트 기반 Research 사용자에게 Learnability 비용을 만들 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Chart를 중심 Workspace로 볼지, Evidence 확인 중 하나의 View로 볼지 추가 Benchmark 비교가 필요하다.

### Confidence

Medium

## 기록 Principle P-012

### Observation

AAPL Symbol Page는 Overview, Financials, Documents, News, Community, Technicals, Forecasts, Seasonals, Options, ETFs, Bonds 탭을 제공한다.

### Supporting Evidence

Official Product Observation. AAPL Symbol Page, 확인일 2026-07-27.

### Interpretation

TradingView는 동일 Symbol Context 안에서 분석 모드를 탭으로 분리해 Information Density를 제어할 수 있다.

### Candidate Principle

Symbol pages may use tabs to separate analysis modes inside one entity context.

### User Benefit

사용자는 Symbol Context를 유지하면서 Fundamental, Evidence, Community, Technical 분석을 전환할 수 있다.

### Potential Trade-off

탭이 많아지면 사용자는 어떤 분석 모드가 현재 판단에 필요한지 직접 선택해야 한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Entity Hub를 검토할 경우 탭 구조가 Decision Journey를 돕는지 비교해야 한다.

### Confidence

High

## 기록 Principle P-013

### Observation

US Stocks Screen은 Overview, Performance, Technicals, Valuation, Dividends, Profitability, Income statement, Balance sheet, Cash flow 탭을 제공한다. 공식 Help Center는 Screener가 filter와 table 기반 Stock Discovery를 제공한다고 설명한다.

### Supporting Evidence

Official Product Observation 및 Official Documentation. US Stocks Screen, Stock Screener Help Center, 확인일 2026-07-27.

### Interpretation

TradingView는 투자 대상 발견을 Narrative보다 Metric filter와 Table Comparison으로 먼저 구성할 수 있다.

### Candidate Principle

Screener tables may serve as discovery and comparison surfaces before entity analysis.

### User Benefit

사용자는 많은 Stock 후보를 같은 Metric 기준으로 비교하고 후보군을 줄일 수 있다.

### Potential Trade-off

Metric 이해도가 낮은 사용자는 Table-first Discovery에서 판단 비용이 커질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Discovery가 Card, Feed, Search, Screener 중 무엇으로 시작되어야 하는지 User Archetype별 검증이 필요하다.

### Confidence

High

## 기록 Principle P-014

### Observation

공식 Help Center는 Watchlist, Alerts, Layout, saved screens를 서로 다른 저장 또는 Monitoring 단위로 설명한다. Watchlist와 Alerts는 Layout에 저장되지 않는다고 설명한다.

### Supporting Evidence

Official Documentation. Watchlists, Alerts, Layouts, Stock Screener, 확인일 2026-07-27.

### Interpretation

TradingView의 Personal Continuity는 하나의 Workspace가 아니라 목적별 User State로 분리될 수 있다.

### Candidate Principle

Personal continuity may be split across Watchlist, Alert, Layout, and saved screen states.

### User Benefit

전문 사용자는 관심 목록, Alert 조건, Chart Layout, Screener 조건을 목적별로 관리할 수 있다.

### Potential Trade-off

저장 단위가 나뉘면 사용자는 어떤 State가 어디에 저장되는지 학습해야 한다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Watchlist, Portfolio, Workspace, Evidence Graph의 책임을 구분할 때 비교 기준으로 사용할 수 있다.

### Confidence

Medium

## 기록 Principle P-015

### Observation

AAPL Symbol Page에는 Documents 탭이 있고, 공식 Blog는 Documents 탭이 earnings call transcripts, annual/quarterly filings, investor presentations 등을 제공한다고 설명한다.

### Supporting Evidence

Official Product Observation 및 Official Documentation. AAPL Symbol Page, TradingView 공식 Blog, 확인일 2026-07-27.

### Interpretation

TradingView는 News, Community, Financials와 별도로 공식 Company Document를 Symbol Context 안의 Evidence Surface로 분리할 수 있다.

### Candidate Principle

Documents may act as a symbol-level evidence surface distinct from News and Community.

### User Benefit

사용자는 Symbol 관련 주장이나 News를 공식 Document로 검증할 가능성이 있다.

### Potential Trade-off

Document가 별도 탭으로 분리되면 사용자가 News와 Document의 관계를 직접 연결해야 할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal

### DATE Implication

DATE에서 Evidence Graph를 검토할 경우 Document, News, Community, Metric의 역할 분리가 필요할 수 있다.

### Confidence

Medium
