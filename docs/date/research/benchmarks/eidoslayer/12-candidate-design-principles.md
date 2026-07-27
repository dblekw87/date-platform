# EidosLayer Candidate Product Principle 문서

Phase: 1.16 — Eidos Candidate Design Principles Extraction
Service: EidosLayer
Source Basis: 기존 Phase 1.1과 Phase 1.15 Observation만 사용
Source Observation Date: 2026-07-27

## 목적

이 문서는 기존 EidosLayer Observation 문서에서 반복적으로 나타난 Pattern을 바탕으로 **Candidate Product Principle**을 추출한다.

여기서 정리한 항목은 EidosLayer의 확정 Design Principle이 아니며 DATE의 Design Principle도 아니다. TradingView, Koyfin, Finviz, Yahoo Finance, Bloomberg Terminal에서 Cross Validation을 거친 뒤에만 DATE Research 판단에 활용할 수 있다.

## Source 문서

- [01-product-surface-map.md](01-product-surface-map.md)
- [02-navigation-map.md](02-navigation-map.md)
- [03-screen-inventory.md](03-screen-inventory.md)
- [04-core-journey-observations.md](04-core-journey-observations.md)
- [05-entity-and-relationship-observations.md](05-entity-and-relationship-observations.md)
- [06-information-density-observations.md](06-information-density-observations.md)
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md)
- [08-strengths-frictions-and-open-questions.md](08-strengths-frictions-and-open-questions.md)
- [09-phase-1-1-summary.md](09-phase-1-1-summary.md)
- [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md)
- [11-product-flow-architecture.md](11-product-flow-architecture.md)

## Candidate Principle 요약

| Principle ID | Candidate Principle | Confidence | Needs Cross Validation |
|---|---|---|---|
| P-001 | Home may operate as a Market Discovery Entry rather than a static landing page | High | YES |
| P-002 | Search may function as stock-first entity navigation rather than broad discovery | Medium | YES |
| P-003 | Cards and lists may act primarily as navigation units | Medium | YES |
| P-004 | AI may be packaged as task-specific market tools | Medium | YES |
| P-005 | Participation may be attached to market objects | Medium | YES |
| P-006 | Watchlist may teach personal continuity before proving research continuity | Medium | YES |
| P-007 | Freshness and source cues may be exposed before deep evidence | High | YES |
| P-008 | AI persona content may require explicit source-identity separation | High | YES |
| P-009 | Page-based specialization may trade clarity for context preservation risk | Low | YES |
| P-010 | Loading states may be part of live-market UX, not only system feedback | Medium | YES |

## P-001

### Observation

Home에는 market sentiment, `EIDOSLAYER MARKET DESK`, market tabs, live/loading market signals, market signal news, 최신 breaking news, shortcut routes가 함께 배치되어 있다. Screen Inventory는 Home을 `Market discovery and route hub`로 기록했다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Home Surface
- [03-screen-inventory.md](03-screen-inventory.md): Home
- [04-core-journey-observations.md](04-core-journey-observations.md): S-001
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Market Discovery Flow

### Interpretation

EidosLayer는 Home을 정적 landing page보다 현재 Market 변화를 이해하고 세부 Surface로 이동하는 orientation layer로 사용하는 것으로 해석된다.

### Candidate Principle

Home may operate as a Market Discovery Entry rather than a static landing page.

### User Benefit

사용자는 특정 ticker, Portfolio 상태, 저장된 Workspace를 먼저 알지 않아도 현재 Market context에서 탐색을 시작할 수 있다.

### Potential Trade-off

Live data, detail page, follow-up route가 충분히 동작하지 않으면 Home은 Decision support가 약한 route menu로 느껴질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

다른 Benchmark에서도 market-first orientation이 Discoverability 또는 Decision Speed를 높이는지 검토할 필요가 있다. 이것이 DATE가 market-discovery Home을 채택한다는 의미는 아니다.

### Confidence

High

## P-002

### Observation

Home Search는 `삼성`, `AAPL` 같은 Stock 예시를 사용한다. Community는 Stock을 검색해 Discussion room으로 들어갈 수 있다고 설명한다. Theme, News, person, Industry, Event에 대한 Search result grouping은 검증되지 않았다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Global Product Surface
- [02-navigation-map.md](02-navigation-map.md): Search Entry
- [03-screen-inventory.md](03-screen-inventory.md): Search Result
- [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md): H-001
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Stock / Entity Flow

### Interpretation

Search는 broad multi-entity discovery보다 known-stock entry를 더 명확하게 지원하는 것으로 해석된다.

### Candidate Principle

Search may function as stock-first entity navigation rather than broad discovery.

### User Benefit

명확한 Stock intent가 있는 사용자는 Stock 관련 Surface로 빠르게 이동할 수 있다.

### Potential Trade-off

Theme, macro, Event, Evidence에 대한 개방형 discovery는 Search보다 Navigation link에 의존할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 Search-first를 검토하려면 Stock-first Search와 broad entity Search의 차이를 다른 Benchmark에서 분리해 검증해야 한다.

### Confidence

Medium

## P-003

### Observation

Home shortcut cards, news cards, AI tool cards, prediction cards, ranking lists는 정보를 보여주는 동시에 다른 Surface나 detail로 이동하는 entry 역할을 한다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Home, Eidos AI, EidosMarket Surface
- [03-screen-inventory.md](03-screen-inventory.md): Home, Eidos AI, EidosMarket
- [06-information-density-observations.md](06-information-density-observations.md): Card 사용 방식, List 사용 방식

### Interpretation

Card와 List는 단순 display unit보다 Navigation unit으로 기능하는 것으로 해석된다.

### Candidate Principle

Cards and lists may act primarily as navigation units.

### User Benefit

사용자는 요약 정보를 스캔하면서 다음 탐색 대상을 빠르게 선택할 수 있다.

### Potential Trade-off

Card가 Evidence depth 없이 route 역할만 하면 사용자는 이동 전에 판단할 수 있는 정보가 부족할 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 Card를 사용할 경우 Card가 요약인지, 비교 단위인지, Entity transition인지, Action trigger인지 구분해야 한다.

### Confidence

Medium

## P-004

### Observation

Eidos AI는 live market dashboard, Korea market AI, Circuit Breaker AI, mover cause AI, US movers AI, crypto AI처럼 task-specific Tool로 구성되어 있다. 일부 Tool은 login과 live data가 필요하다고 표시된다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Eidos AI Surface
- [03-screen-inventory.md](03-screen-inventory.md): Eidos AI, Circuit Breaker AI Waiting Room
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): AI Disclosure
- [11-product-flow-architecture.md](11-product-flow-architecture.md): AI Tool Flow

### Interpretation

AI는 generic chat entry보다 Market task에 맞춘 Tool bundle로 제시되는 것으로 해석된다.

### Candidate Principle

AI may be packaged as task-specific market tools.

### User Benefit

사용자는 막연한 Prompt 작성보다 현재 Market 문제에 맞는 AI Tool을 선택할 수 있다.

### Potential Trade-off

Tool이 많아지면 선택 비용이 증가하고, AI output Source grounding이 약하면 Trust 문제가 커질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE에서 AI를 검토할 때 standalone Assistant, contextual Tool, Entity-attached AI 중 어떤 구조가 Evidence traceability와 맞는지 비교해야 한다.

### Confidence

Medium

## P-005

### Observation

Community는 Stock-specific Discussion entry를 제공하고, EidosMarket은 Prediction list와 vote/percentage Signal을 제공한다. Circuit Breaker AI는 event-specific comment room을 언급한다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Community Surface, EidosMarket Surface
- [03-screen-inventory.md](03-screen-inventory.md): Community, EidosMarket, Circuit Breaker AI Waiting Room
- [05-entity-and-relationship-observations.md](05-entity-and-relationship-observations.md): Stock to Discussion
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Participation Flow

### Interpretation

Participation은 독립 커뮤니티가 아니라 Market object 주변에 붙는 참여 맥락으로 배치되는 것으로 해석된다.

### Candidate Principle

Participation may be attached to market objects.

### User Benefit

사용자는 Stock, Prediction, Event 주변의 sentiment와 참여 흐름을 빠르게 확인할 수 있다.

### Potential Trade-off

Discussion과 Prediction이 Evidence처럼 보이면 사실 검증과 의견 신호가 혼동될 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE는 Participation Signal을 Evidence와 분리해 다룰 필요가 있는지 검토해야 한다.

### Confidence

Medium

## P-006

### Observation

Stocks Surface에는 `내 관심종목 실시간`, empty state, star-save instruction이 있다. 그러나 persistence, cross-session continuity, saved research state는 검증되지 않았다.

### Supporting Evidence

- [03-screen-inventory.md](03-screen-inventory.md): Stocks / Market
- [04-core-journey-observations.md](04-core-journey-observations.md): S-008, S-010
- [09-phase-1-1-summary.md](09-phase-1-1-summary.md): 완료하지 못한 Journey
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Personal Continuity Flow

### Interpretation

Watchlist는 Personal Continuity를 시작하는 entry로 보이지만 Research continuity까지 증명하지는 않는다.

### Candidate Principle

Watchlist may teach personal continuity before proving research continuity.

### User Benefit

사용자는 관심 Stock 저장이라는 익숙한 행동으로 반복 진입을 시작할 수 있다.

### Potential Trade-off

Watchlist가 가격 목록에 그치면 사용자는 이전 판단, Evidence, open question을 이어가기 어렵다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE는 Watchlist가 단순 monitoring인지, Evidence와 분석 상태를 재개하는 Workspace 역할인지 별도로 검증해야 한다.

### Confidence

Medium

## P-007

### Observation

Home news와 market signal 영역에는 Source label, timestamp, loading/live state가 관찰되었다. 그러나 원문 traceability와 Source detail은 검증되지 않았다.

### Supporting Evidence

- [03-screen-inventory.md](03-screen-inventory.md): Home
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): Source, Timestamp와 Freshness
- [10-hypothesis-evidence-log.md](10-hypothesis-evidence-log.md): H-009

### Interpretation

EidosLayer는 deep Evidence보다 먼저 Source visibility와 Freshness cue를 노출해 최소 Trust Signal을 제공하는 것으로 해석된다.

### Candidate Principle

Freshness and source cues may be exposed before deep evidence.

### User Benefit

사용자는 정보의 최신성과 출처 수준을 빠르게 판단할 수 있다.

### Potential Trade-off

Source label과 timestamp만으로는 원문 검증, 방법론 확인, 상충 Evidence 처리가 충분하지 않을 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE는 Source visibility와 Evidence traceability를 같은 것으로 취급하지 말고 단계별로 구분해야 한다.

### Confidence

High

## P-008

### Observation

Insight Feed는 AI editorial avatar 또는 persona framing을 명시하고, 실제 인물의 발언이 아니라는 disclosure를 제공한다.

### Supporting Evidence

- [01-product-surface-map.md](01-product-surface-map.md): Insight Feed Surface
- [03-screen-inventory.md](03-screen-inventory.md): Insight Feed
- [07-trust-and-evidence-observations.md](07-trust-and-evidence-observations.md): AI Disclosure
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Insight / Content Flow

### Interpretation

AI persona content는 이해와 engagement를 높일 수 있지만, Source identity와 author identity를 명확히 분리해야 하는 구조로 해석된다.

### Candidate Principle

AI persona content may require explicit source-identity separation.

### User Benefit

사용자는 persona가 해석 framing인지 실제 Source인지 구분할 수 있다.

### Potential Trade-off

Disclosure가 있어도 사용자가 persona를 권위 있는 Source로 오해할 가능성은 남는다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE가 AI-generated Insight를 검토한다면 Source, author, persona, model output을 명확히 분리해야 한다.

### Confidence

High

## P-009

### Observation

관찰된 Flow는 대부분 page-based Navigation과 global/bottom Navigation에 의존한다. Side panel, overlay, split view, retained workspace는 검증되지 않았다.

### Supporting Evidence

- [02-navigation-map.md](02-navigation-map.md): Back Navigation과 Context Preservation
- [04-core-journey-observations.md](04-core-journey-observations.md): Context Loss 기록
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Context Preservation 평가

### Interpretation

Page-based specialization은 각 Surface의 역할을 명확히 만들 수 있지만, Evidence 검증이나 비교 과정에서 Context Preservation 위험을 만들 수 있다.

### Candidate Principle

Page-based specialization may trade clarity for context preservation risk.

### User Benefit

사용자는 각 Surface의 목적을 분리해 이해할 수 있다.

### Potential Trade-off

News, Stock, AI, Discussion 사이를 오갈 때 이전 분석 맥락을 잃을 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE는 page-based clarity와 Context Preservation 사이의 Trade-off를 다른 Benchmark에서 비교해야 한다.

### Confidence

Low

## P-010

### Observation

Home과 Stocks에는 `LIVE 연결 중`, `시세 불러오는 중`, dynamic loading state가 관찰되었다.

### Supporting Evidence

- [00-access-and-method.md](00-access-and-method.md): 알려진 한계
- [03-screen-inventory.md](03-screen-inventory.md): Home, Stocks / Market
- [06-information-density-observations.md](06-information-density-observations.md): Progressive Disclosure
- [11-product-flow-architecture.md](11-product-flow-architecture.md): Flow Role Matrix

### Interpretation

Live Market 환경에서는 Loading State가 단순 system feedback이 아니라 데이터 Freshness와 접근 가능성의 일부로 작동할 수 있다.

### Candidate Principle

Loading states may be part of live-market UX, not only system feedback.

### User Benefit

사용자는 데이터가 비어 있는지, 지연 중인지, live 연결 중인지 구분할 수 있다.

### Potential Trade-off

Loading State가 오래 지속되면 정보 부재와 시스템 문제의 차이가 불명확해질 수 있다.

### Needs Cross Validation

YES

### Candidate Validation Targets

- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal

### DATE Implication

DATE는 live data, delayed data, unavailable data, empty state를 명확히 구분하는 State vocabulary를 검토해야 한다.

### Confidence

Medium

## Cross Validation 참고사항

- 모든 Candidate Principle은 `Needs Cross Validation: YES` 상태다.
- EidosLayer만으로 어떤 Principle도 DATE의 Product Principle로 확정하지 않는다.
- 다음 Benchmark에서는 각 Candidate가 supporting, contradicting, neutral, insufficient 중 어디에 해당하는지 기록한다.

## DATE Research에 영향이 큰 Candidate

다음 Candidate는 DATE Research에서 영향이 클 수 있으나, 아직 확정하지 않는다.

- P-001: Home과 Market Discovery 관계
- P-002: Search와 Entity Navigation 관계
- P-004: AI Tool의 Product 배치 방식
- P-006: Watchlist와 Personal Continuity 관계
- P-007: Source/Freshness cue와 Evidence traceability 구분
- P-009: Page-based Flow와 Context Preservation Trade-off
