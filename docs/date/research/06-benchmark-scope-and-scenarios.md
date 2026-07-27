# Benchmark Scope and Research Scenarios 문서

이 문서는 각 Benchmark의 조사 범위와 공통 Research Scenario를 정의한다. 실제 조사에서 접근 제한, 로그인 요구, 유료 기능 제한은 사실처럼 추정하지 않고 별도 기록한다.

## 비교 가능한 기록 항목

각 서비스는 아래 필드를 같은 순서로 기록한다.

- Research Objective
- Public Access Scope
- Login-required Scope
- Paid Feature Limitation
- Core Screens
- Core Journeys
- Entity Types
- Navigation Patterns
- Search Patterns
- Workspace Patterns
- Evidence Patterns
- Known Research Limitations

접근 상태는 `Public`, `Login Required`, `Paid Required`, `Unavailable`, `Not Verified` 중 하나로 기록한다. 공개 자료로만 확인한 Bloomberg Terminal interaction처럼 직접 조작하지 못한 항목은 Interpretation과 Evidence에 명확히 표시한다.

## EidosLayer 조사 범위

- Research Objective: AI/knowledge-layer 기반 투자 리서치에서 entity, evidence, question flow가 어떻게 연결되는지 확인한다.
- Public Access Scope: 공식 웹사이트, 공개 데모, 공개 문서, 공개 화면.
- Login-required Scope: 로그인 후 가능한 workspace, saved research, personalization.
- Paid Feature Limitation: 유료 또는 초대 기반 기능은 확인 가능한 범위만 기록한다.
- Core Screens: Search, research workspace, entity view, evidence/source view, saved research.
- Core Journeys: Evidence-first, Entity-first, Market-first question flow.
- Entity Types: Company, Security, Topic, Event, Source, Evidence.
- Navigation Patterns: Search-led navigation, contextual transitions, workspace navigation.
- Search Patterns: natural language query, entity query, source-aware results.
- Workspace Patterns: saved question, saved evidence, research thread.
- Evidence Patterns: source trail, claim-to-source linkage, generated summary verification.
- Known Research Limitations: 접근 권한과 제품 성숙도에 따라 확인 가능한 화면이 제한될 수 있다.

## TradingView 조사 범위

- Research Objective: Chart 중심 전문 도구가 search, watchlist, panel, community, alert를 어떻게 결합하는지 분석한다.
- Public Access Scope: 공개 chart, market pages, symbols, ideas, screeners.
- Login-required Scope: saved layouts, watchlists, alerts, multi-chart configuration.
- Paid Feature Limitation: advanced indicators, multiple charts, real-time data 일부.
- Core Screens: Chart, Symbol page, Screener, Watchlist, News panel, Alert dialog.
- Core Journeys: Entity-first, Market-first, Portfolio-monitoring, Watchlist revisit.
- Entity Types: Security, Indicator, Exchange, Watchlist, Idea, Alert.
- Navigation Patterns: global search, symbol switching, side panels, chart workspace.
- Search Patterns: ticker/company/symbol search with asset type grouping.
- Workspace Patterns: chart layout, watchlist, drawing tools, saved indicators.
- Evidence Patterns: chart annotations, news panel, community ideas.
- Known Research Limitations: 실시간 데이터와 고급 레이아웃은 구독 등급에 따라 다를 수 있다.

## Koyfin 조사 범위

- Research Objective: Professional research terminal이 dashboard, graph, entity, macro, portfolio를 어떻게 통합하는지 확인한다.
- Public Access Scope: 공개 마케팅 자료, 공개 문서, 제한된 무료 기능.
- Login-required Scope: dashboards, watchlists, chart templates, model views.
- Paid Feature Limitation: advanced data, export, institutional datasets.
- Core Screens: Dashboard, Company overview, Graph, Markets, Macro, Watchlist, Screener.
- Core Journeys: Entity-first, Macro-first, Portfolio-monitoring, Comparison.
- Entity Types: Company, Security, Index, Fund, Macro Indicator, Sector, Watchlist.
- Navigation Patterns: dashboard/workspace 중심, search, left navigation, template reuse.
- Search Patterns: cross-asset entity search.
- Workspace Patterns: dashboards, saved charts, watchlists, templates.
- Evidence Patterns: data source visibility, chart/data table linkage.
- Known Research Limitations: 유료 데이터와 기관용 기능은 제한적으로만 관찰한다.

## Finviz 조사 범위

- Research Objective: 높은 정보 밀도와 screener/table 중심 discovery가 왜 빠른 판단을 돕는지 분석한다.
- Public Access Scope: 시장 맵, screener, quote pages, news headlines, groups.
- Login-required Scope: portfolios, saved screeners, alerts.
- Paid Feature Limitation: real-time quotes, advanced charts, export, backtests.
- Core Screens: Home, Screener, Groups, Maps, Quote, News.
- Core Journeys: Market-first, Entity-first, Portfolio-monitoring, Comparison.
- Entity Types: Security, Sector, Industry, Screener Filter, News.
- Navigation Patterns: dense top navigation, tabular drill-down, filter navigation.
- Search Patterns: ticker/company quick lookup.
- Workspace Patterns: saved screener, portfolio, watchlist.
- Evidence Patterns: news headlines, insider/financial data, analyst data.
- Known Research Limitations: 일부 freshness와 real-time 기능은 paid tier에서만 확인 가능하다.

## Yahoo Finance 조사 범위

- Research Objective: 대중형 금융 서비스가 search, quote page, news, portfolio를 낮은 학습 비용으로 연결하는 방식을 분석한다.
- Public Access Scope: quote pages, news, charts, financials, screeners 일부.
- Login-required Scope: portfolio, watchlist, personalization.
- Paid Feature Limitation: premium research, fair value, advanced insights.
- Core Screens: Home, Quote Summary, Chart, Financials, News, Watchlist, Screener.
- Core Journeys: Entity-first, Evidence-first, Portfolio-monitoring.
- Entity Types: Company, Security, News, Watchlist, Portfolio, Analyst Rating.
- Navigation Patterns: global search, quote tabs, personalized watchlist.
- Search Patterns: ticker/company/news query.
- Workspace Patterns: watchlist and portfolio as personal entry points.
- Evidence Patterns: source-labeled news, financial tables, analyst data.
- Known Research Limitations: premium insight and personalized portfolio require account or subscription.

## Bloomberg Terminal — UX 관점

- Research Objective: 고학습비용 전문 인터페이스가 왜 expert scalability, command search, context density에서 지속 사용되는지 분석한다.
- Public Access Scope: 공개 영상, 공식 교육 자료, 공개 screenshots, 사용자 교육 문서.
- Login-required Scope: 실제 terminal functions, personalized launchpad, messaging, data access.
- Paid Feature Limitation: 대부분의 실제 기능은 terminal access가 필요하다.
- Core Screens: Launchpad, command/function screen, security analysis, news, chart, monitor.
- Core Journeys: Entity-first, Macro-first, Portfolio-monitoring, Monitoring.
- Entity Types: Security, Company, News, Function, Macro Indicator, Portfolio, Message.
- Navigation Patterns: command line, function codes, multi-window workspace, monitor panels.
- Search Patterns: command/function lookup, ticker/entity lookup.
- Workspace Patterns: launchpad, saved monitors, multi-panel workflow.
- Evidence Patterns: source-tagged news, data provenance, time-sensitive feeds.
- Known Research Limitations: 직접 terminal 접근 없이 공개 자료만 볼 경우 실제 interaction은 추정으로 분리한다.

## 공통 Research Scenario

| Scenario ID | Scenario | Primary Question | Evidence to Capture |
|---|---|---|---|
| S-001 | 오늘 시장의 주요 변화 파악 | 사용자는 오늘 무엇이 중요한지 얼마나 빨리 알 수 있는가? | entry screen, market summary, grouping logic |
| S-002 | 상승 또는 하락 원인 확인 | 가격 변화의 원인을 화면 구조가 설명하는가? | movers path, news/event linkage |
| S-003 | 투자 대상 발견 | 사용자가 새로운 후보를 어떤 기준으로 찾는가? | screener, discovery, ranking, filter |
| S-004 | 특정 기업 또는 종목 분석 | entity page가 투자 질문에 답하는가? | quote/company page hierarchy |
| S-005 | 동일 산업 경쟁사 비교 | peer comparison이 자연스럽게 이어지는가? | peer table, comparison chart, industry link |
| S-006 | 관련 뉴스와 공시 검증 | 출처와 freshness를 확인할 수 있는가? | source label, timestamp, original link |
| S-007 | 거시 지표와 종목 영향 연결 | macro 변화에서 affected entities로 이동할 수 있는가? | macro page, related asset paths |
| S-008 | Watchlist 또는 유사 기능에 저장 | 개인 목록이 저장 기능을 넘어 navigation이 되는가? | add/save flow, watchlist placement |
| S-009 | 알림 생성 가능성 확인 | 어떤 조건을 monitoring할 수 있는가? | alert types, condition builder |
| S-010 | 다음 날 동일 분석 재개 | 이전 context를 얼마나 복원할 수 있는가? | saved workspace, history, dashboard state |
| S-011 | 하나의 News에서 Company, Industry, Event로 전환 | evidence에서 관련 entity로 이동할 수 있는가? | news links, side panel, related entities |
| S-012 | 하나의 Entity에서 관련 Entity를 연속 탐색 | 분석 흐름이 끊기지 않고 확장되는가? | entity graph, related links, context preservation |

## Scenario 기록 형식

```text
Observation:

Interpretation:

User Impact:

DATE Implication:

Confidence:

Evidence:
```
