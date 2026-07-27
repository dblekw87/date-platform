# Product Surface Map 문서

## Surface 요약

| Surface | URL | Access Status | User Purpose | Primary Entity | Notes |
|---|---|---|---|---|---|
| Home | https://eidoslayer.com/ | Public | 시장 심리, 뉴스, 바로가기에서 시작 | Market, News | Search input and market desk visible |
| Stocks / Market | https://eidoslayer.com/stocks | Public with login-aware blocks | 관심종목, 주요 종목, 실시간 순위 확인 | Stock, Watchlist, Ranking | Watchlist empty state visible |
| Eidos AI | https://eidoslayer.com/eidos-ai | Public with member-only tools | AI market radar and analysis tool entry | AI Tool, Market, Stock | Detailed live data gated by login |
| Insight Feed | https://eidoslayer.com/feed | Public | AI-curated insight browsing by persona/topic | Insight, Persona, Topic | AI editorial avatar disclosure visible |
| Community | https://eidoslayer.com/community | Public with dynamic loading | Stock discussion board entry | Stock, Discussion | Popular stock board links visible |
| EidosMarket | https://eidoslayer.com/predictions | Public with dynamic loading | Prediction market exploration | Prediction Market, Topic | Percentages and vote counts visible |
| Circuit Breaker AI | https://eidoslayer.com/stocks/circuit-breaker | Public shell, member-only content | Trading halt/reopen waiting room | Market Event, AI Comment, Discussion | Member-only center visible |
| News List | https://eidoslayer.com/news | Not Verified | News browsing | News | Link visible from Home; page fetch failed |
| Theme | https://eidoslayer.com/themes | Not Verified | Theme analysis | Theme | Link visible from Home; page fetch failed |
| Coin AI | https://eidoslayer.com/eidos-ai/pepe | Not Verified | Crypto AI analysis | Crypto, AI Tool | Link visible; page fetch failed |

## Global Product Surface 기록

Observation:
Home header exposes top-level links labeled `Stocks`, `홈`, `시장`, `Eidos AI`, `뉴스`, `인사이트`, `토론`, `Eidos Market`, and `데스크톱`. The same page includes a stock search input with placeholder `종목 검색 (예: 삼성, AAPL)`, typography controls, and a dark mode toggle.

Interpretation:
The product surface is organized around market discovery, stock lookup, AI analysis, news/insights, discussion, and prediction market participation. Search appears as a persistent investment-object entry rather than a general site search.

User Impact:
New users can start from market/news content or directly search a stock. The product offers several parallel entry points, but visible labels mix English and Korean and include both functional and content destinations.

DATE Implication:
DATE should test whether Search is a primary object entry or one of several discovery routes. Label consistency should be evaluated as part of Navigation Quality.

Confidence:
High for visible links and input; Medium for product intent.

Evidence:
Official Product Observation, Home header and search area, https://eidoslayer.com/, accessed 2026-07-27.

## Home Surface 기록

Observation:
Home is labeled `EidosLayer · 실시간 인사이트`. It contains `실시간 시장 심리`, a `공포·탐욕` button, `인기 급상승`, an `EIDOSLAYER MARKET DESK` section with date `7월 27일 (월) · 서울`, tabs/links for `전체 뉴스`, `국내·미국 시장`, `테마 특집`, `코인`, `종목 토론`, a live-data area, market signal news items with source/time, latest breaking news, and shortcut cards for market, theme analysis, analysis tools, and coin analysis.

Interpretation:
Home behaves less like a static marketing landing page and more like a market discovery desk. It uses news, live states, and shortcuts to move users from awareness to analysis surfaces.

User Impact:
The user can understand current market topics and choose a follow-up route without first selecting a portfolio. The current state depends heavily on live loading reliability.

DATE Implication:
Supports investigation of H-004 and H-015, but does not prove DATE Home should be market discovery.

Confidence:
High.

Evidence:
Official Product Observation, Home main content, https://eidoslayer.com/, accessed 2026-07-27.

## Stocks / Market Surface 기록

Observation:
Stocks page shows USD/KRW exchange rate, `내 관심종목 실시간`, an empty watchlist message, tabs/sections for `관심종목`, `내 종목`, `주요종목`, `대표 종목`, `실시간 순위`, `급등락`, a `주요 종목` section, and `실시간 순위` with filters `국내`, `해외`, `거래대금`, `거래량`, `급상승`, `급하락`, `관심`.

Interpretation:
The screen combines personal monitoring and public market ranking. Watchlist is placed before broad rankings, implying a future personalized entry path even for a public visitor.

User Impact:
Users can interpret the page as both a market overview and a personal monitoring surface, but not-logged-in users hit empty/pending states.

DATE Implication:
Relevant to H-007, H-014, and H-015. It suggests Watchlist can act as a navigation surface, but login behavior must be verified.

Confidence:
High for visible structure, Medium for role interpretation.

Evidence:
Official Product Observation, https://eidoslayer.com/stocks, accessed 2026-07-27.

## Eidos AI Surface 기록

Observation:
Eidos AI page describes `국내장 · 미국장 AI 레이더` and states that Korea market AI briefs domestic market conditions, while US radar watches movers and circuit breakers. Tool cards include live market dashboard, Korea market analysis AI, circuit breaker AI, event AI that summarizes why movers rise using news/good news/order flow, US movers AI desk, and a prepared Pepe AI for crypto/on-chain/social signals. It says member-only tools require login for live data and detailed AI comments.

Interpretation:
AI is positioned as a market interpretation layer, not only as a chat input. The cards map market situations to task-specific AI tools.

User Impact:
Users can choose an AI surface by market problem rather than by generic prompt. However, core value is gated or not verifiable without login.

DATE Implication:
DATE should evaluate whether AI belongs as a contextual analysis layer attached to market/entity/event surfaces rather than as a standalone feature.

Confidence:
High for visible tool list; Medium for AI role interpretation.

Evidence:
Official Product Observation, https://eidoslayer.com/eidos-ai, accessed 2026-07-27.

## Insight Feed Surface 기록

Observation:
Insight Feed is labeled `EIDOS INSIGHTS` and says it contains market and stock insights curated by AI from global entrepreneur perspectives. It has article/news tabs, persona filters such as Jensen Huang, Elon Musk, Tim Cook, Nadella, Sundar Pichai, Zuckerberg, Lisa Su, Jeff Bezos, Lee Jae-yong, Michael Saylor, Jamie Dimon, Warren Buffett, category filters `전체`, `시황`, `종목분석`, `매크로`, `ETF`, `투자전략`, an empty-topic state, and a disclosure that profiles are not real statements but EidosLayer AI editorial avatars.

Interpretation:
This surface uses persona framing to convert market content into opinionated analysis perspectives. The disclosure is an explicit trust boundary between real person statements and AI-edited interpretation.

User Impact:
The persona filters may make insight browsing engaging, but they can also blur authority unless the AI-avatar disclosure remains prominent.

DATE Implication:
Relevant to H-009 and H-012. DATE should distinguish source, author, AI-generated interpretation, and evidence provenance.

Confidence:
High.

Evidence:
Official Product Observation, https://eidoslayer.com/feed, accessed 2026-07-27.

## Community Surface 기록

Observation:
Community page headline is `커뮤니티`. It states `종목 검색해서 바로 종토방 입장`, shows stock discussion board links for Samsung Electronics, SK Hynix, LG Energy Solution, Hanwha Ocean, Hanwha Aerospace, NAVER, Apple, Nvidia, Tesla, and Palantir, shows `최근 글` loading, and says users can also enter stock discussion rooms from stock charts.

Interpretation:
Community is organized by stock entity rather than by broad forum category. Search and chart-to-discussion entry make discussion a contextual extension of stock analysis.

User Impact:
Users can move from a stock or chart into social context, but recent post content was not available in this public extraction.

DATE Implication:
DATE should test whether discussion is a separate destination or a contextual panel/relationship attached to Entity pages.

Confidence:
High for entry structure; Low for detail behavior.

Evidence:
Official Product Observation, https://eidoslayer.com/community, accessed 2026-07-27.

## EidosMarket Surface 기록

Observation:
EidosMarket says users can predict issues across politics, sports, economy, and crypto and check real-time probabilities. It exposes ranking, popular predictions, percentages, and vote counts.

Interpretation:
This surface extends beyond equity analysis into prediction markets. It uses probability and participation metrics as information objects.

User Impact:
The prediction market can create engagement and collective expectation signals, but it is structurally separate from investment evidence unless linked back to market entities.

DATE Implication:
Prediction-style probability may be useful as a research signal only if source, crowd composition, and relation to investment entity are clear.

Confidence:
High for visible prediction list; Medium for investment relevance.

Evidence:
Official Product Observation, https://eidoslayer.com/predictions, accessed 2026-07-27.
