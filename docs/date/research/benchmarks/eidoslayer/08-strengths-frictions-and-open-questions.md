# Strength, Friction, Open Question 문서

## 효과적인 Pattern

### Home으로서의 Market Desk

Observation:
Home foregrounds market sentiment, live market desk, market signal news, latest breaking news, and shortcuts.

Interpretation:
The first screen is designed for market orientation and route selection.

User Impact:
Users can start without knowing a ticker.

DATE Applicability:
DATE can use this as a comparison pattern for H-004/H-015.

Conditions Required:
Market data freshness, source visibility, and clear grouping must be reliable.

Do Not Copy:
Do not copy market-desk layout without validating whether DATE users start from market discovery.

Open Question:
Does personalized Home change after login?

## 구조적 강점

- Search input is immediately visible on Home.
- Watchlist empty state teaches the save mechanism.
- Community is stock-entity oriented rather than generic forum-first.
- Eidos AI tools are task-specific and market-specific.
- Insight Feed includes explicit AI editorial avatar disclosure.
- Home news cards include publisher and relative time.
- EidosMarket compresses crowd expectation into probability and vote count.

## 사용자 Friction

- Several dynamic regions show loading states, including market data and news on subpages.
- News detail, theme detail, prediction detail, and stock/community detail routes were not verified.
- Search result grouping was not observed.
- Some labels overlap conceptually, such as Stocks, 시장, 주요종목.
- AI tool value is difficult to assess publicly because live data and detailed AI comments are login-gated.
- Persona-based insight can create trust ambiguity unless evidence links are strong.

## Context 손실 지점

Observation:
Observed transitions appear mostly page-based. No side panel or overlay was verified. Circuit Breaker AI includes an explicit back link to stocks.

Interpretation:
Page-based disclosure may simplify routing but can lose analytical context.

User Impact:
Users may need to reconstruct prior filters or question context after opening details.

DATE Applicability:
Relevant to H-006; DATE should compare page transitions and in-place evidence panels in later phases.

Confidence:
Low to Medium.

Evidence:
Official Product Observation, public pages, accessed 2026-07-27.

## Trust Gap 기록

- AI summaries are labeled, but source-linking for AI output is not verified.
- News cards expose source/time, but original article traceability is not verified.
- Fear/greed and ranking methodology are not visible in text extraction.
- Prediction market percentages and vote counts are visible, but resolution rules are not verified.
- Filing/disclosure verification was not observed.

## 접근성 Gap

- Text size controls and dark mode are visible.
- Keyboard support was not verified.
- Mobile navigation behavior was not directly tested.
- Loading/error state semantics were visible but not assessed for screen-reader quality.

## DATE 적용 가능성

EidosLayer is most useful for DATE Research as a benchmark for:

- public market discovery surfaces
- stock-first search and discussion entry
- AI as task-specific analysis layer
- explicit AI persona disclosure
- watchlist as intended personal navigation
- loading-state impact on research journeys

## 필요한 조건

Before converting EidosLayer observations into DATE direction, later research must verify:

- logged-in watchlist persistence
- stock detail page structure
- news detail evidence path
- theme/value-chain relationship model
- AI output source traceability
- search result grouping
- mobile navigation behavior

## 복제하지 말 것

- Do not copy AI persona insight framing without strong AI/source disclosure.
- Do not copy multiple discovery surfaces without clarifying which user question each surface answers.
- Do not treat loading-state structures as proof of working decision support.
- Do not assume stock search equals broad entity search.
- Do not assume Watchlist supports cross-session research continuity without observing logged-in behavior.

## Open Question 목록

1. Does EidosLayer search return grouped results by Stock, News, Theme, Insight, and Community?
2. Does a stock detail page distinguish Company, Security, Chart, News, and Discussion?
3. Are Eidos AI summaries linked to source news or market data?
4. Can users save insights, news, or AI outputs, or only stocks?
5. Does Watchlist become a navigation hub after login?
6. Does Theme analysis show industry/value-chain relationships?
7. Are prediction market topics connected to market entities or kept separate?
8. Are alerts or notifications configurable by price, event, news, or AI signal?
9. Does mobile navigation expose the same hierarchy as desktop?
10. Can users resume an analysis session the next day?
