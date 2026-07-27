# Screen Inventory 문서

## Screen 수

Recorded screens: 10

1. Home
2. Stocks / Market
3. Eidos AI
4. Insight Feed
5. Community
6. EidosMarket
7. Circuit Breaker AI Waiting Room
8. News List / Detail
9. Theme List / Detail
10. Search Result

## Home Screen 기록

- URL: https://eidoslayer.com/
- Access Status: Public
- Page Purpose: Market discovery and route hub
- Primary User Question: What is happening in the market now, and where should I go next?
- Primary Entity: Market
- Supporting Entities: News, Stock, Theme, Coin, Discussion
- Primary Action: Search stock or choose a market/news shortcut
- Secondary Actions: Open market, AI, news, insight, discussion, prediction market
- Information Hierarchy: Search/header, market sentiment, market desk, market signal, latest breaking news, shortcuts
- Density Strategy: Multiple small modules with live/loading states
- Navigation Role: Global hub and discovery surface
- Trust Signals: News source labels and relative timestamps visible on Home news items
- Access Restriction: Public with dynamic data loading
- Open Question: Does Home personalize after login?

Observation:
Home combines search, market sentiment, date/location, live market desk, news cards with source/time, and shortcuts.

Interpretation:
Home is closer to a market discovery feed than a pure landing page.

User Impact:
Users can start from a known stock or from current market events.

DATE Implication:
Relevant to H-001, H-004, H-015.

Confidence:
High.

Evidence:
Official Product Observation, Home, accessed 2026-07-27.

## Stocks / Market Screen 기록

- URL: https://eidoslayer.com/stocks
- Access Status: Public with login-aware blocks
- Page Purpose: Stock monitoring and ranking
- Primary User Question: Which stocks are important now, and what is in my watchlist?
- Primary Entity: Stock
- Supporting Entities: Watchlist, Ranking, News, FX
- Primary Action: Inspect stock rankings or add stocks with star
- Secondary Actions: Switch ranking filters, view latest news
- Information Hierarchy: Account state, USD/KRW, watchlist, tabs, major stocks, real-time ranking, latest news
- Density Strategy: Sectioned ranking/filter layout
- Navigation Role: Market and personal monitoring route
- Trust Signals: Live labels and exchange rate placeholder; source details not visible for stock data in extraction
- Access Restriction: Public; watchlist personalization likely login-dependent
- Open Question: Does stock detail expose company/security separation?

Observation:
Stocks page shows watchlist empty state before major stocks and real-time ranking.

Interpretation:
Personal monitoring is treated as a first-class market surface.

User Impact:
Non-logged-in users see the intended behavior but cannot verify persistence.

DATE Implication:
Relevant to H-007 and H-014.

Confidence:
High.

Evidence:
Official Product Observation, Stocks, accessed 2026-07-27.

## Eidos AI Screen 기록

- URL: https://eidoslayer.com/eidos-ai
- Access Status: Public with member-only tools
- Page Purpose: Market AI tool directory
- Primary User Question: Which AI tool helps interpret the current market condition?
- Primary Entity: AI Tool
- Supporting Entities: Market, Stock, Circuit Breaker, Crypto
- Primary Action: Open an AI analysis tool
- Secondary Actions: Read latest news
- Information Hierarchy: Page positioning, live market analysis tool cards, login note, latest news
- Density Strategy: Tool cards by task/market
- Navigation Role: AI analysis tool hub
- Trust Signals: AI role descriptions; detailed evidence not visible
- Access Restriction: Login required for live data and detailed AI comments
- Open Question: Are AI summaries source-linked?

Observation:
Eidos AI presents task-specific AI cards and states member-only tools require login for live data and detailed AI comments.

Interpretation:
AI is framed as an analysis layer for market situations rather than a generic assistant.

User Impact:
Users can select AI by market problem, but core output quality is not publicly verifiable.

DATE Implication:
Relevant to H-002, H-009, H-011, H-013.

Confidence:
High for visible access and tool taxonomy.

Evidence:
Official Product Observation, Eidos AI, accessed 2026-07-27.

## Insight Feed Screen 기록

- URL: https://eidoslayer.com/feed
- Access Status: Public
- Page Purpose: AI-curated market and stock insight feed
- Primary User Question: What perspective or analysis should I read?
- Primary Entity: Insight
- Supporting Entities: Persona, Topic, News
- Primary Action: Choose persona or category
- Secondary Actions: Switch article/news
- Information Hierarchy: Positioning, content type tabs, persona filters, topic filters, empty state, AI disclosure, latest news
- Density Strategy: Filter-heavy, content-light in observed state
- Navigation Role: Editorial discovery surface
- Trust Signals: Explicit AI editorial avatar disclosure
- Access Restriction: Public; content was empty for selected topic
- Open Question: Are individual insights source-linked?

Observation:
The page discloses that profiles are not real person statements but AI-organized editorial avatars.

Interpretation:
The product anticipates trust risk around AI/persona content and labels the boundary.

User Impact:
Users receive a trust warning, but may still need source links to validate claims.

DATE Implication:
Relevant to H-009 and H-012.

Confidence:
High.

Evidence:
Official Product Observation, Insight Feed, accessed 2026-07-27.

## Community Screen 기록

- URL: https://eidoslayer.com/community
- Access Status: Public with dynamic loading
- Page Purpose: Stock discussion entry
- Primary User Question: Where can I discuss or read discussion for a stock?
- Primary Entity: Stock
- Supporting Entities: Discussion, User, News
- Primary Action: Search or select a stock discussion board
- Secondary Actions: View recent posts, open latest news
- Information Hierarchy: Search promise, stock board links, recent posts, chart-to-board note, latest news
- Density Strategy: Stock link list plus dynamic recent posts
- Navigation Role: Social context extension of stock entity
- Trust Signals: Not visible for discussion content in extraction
- Access Restriction: Public shell; post content loading not verified
- Open Question: Is posting login-gated?

Observation:
Community links are stock-specific and include a note that users can enter discussion from stock charts.

Interpretation:
Discussion is entity-attached rather than forum-first.

User Impact:
Users can use stock identity as the route into social content.

DATE Implication:
Relevant to H-010 and H-006.

Confidence:
High for stock-oriented community entry.

Evidence:
Official Product Observation, Community, accessed 2026-07-27.

## EidosMarket Screen 기록

- URL: https://eidoslayer.com/predictions
- Access Status: Public with dynamic loading
- Page Purpose: Prediction market discovery
- Primary User Question: What issues are people predicting, and what probabilities are visible?
- Primary Entity: Prediction Market
- Supporting Entities: Topic, Ranking, Vote
- Primary Action: Browse popular predictions
- Secondary Actions: Open ranking or all exploration
- Information Hierarchy: Product description, ranking, loading market list, popular predictions
- Density Strategy: List of ranked questions with probability and vote count
- Navigation Role: Separate engagement/prediction surface
- Trust Signals: Vote counts and percentages visible; market resolution rules not verified
- Access Restriction: Public shell; detail fetch failed
- Open Question: Are prediction markets linked back to stocks or macro indicators?

Observation:
Popular predictions show question, percentage, and vote count.

Interpretation:
Probability is used as a compact information object.

User Impact:
Users can scan crowd expectation, but investment evidence linkage is unclear.

DATE Implication:
Relevant to H-011 only if prediction markets connect to macro/stock entities.

Confidence:
High for list structure, Low for detail behavior.

Evidence:
Official Product Observation, EidosMarket, accessed 2026-07-27.

## Circuit Breaker AI Waiting Room Screen 기록

- URL: https://eidoslayer.com/stocks/circuit-breaker
- Access Status: Public shell, Login Required for core content
- Page Purpose: Waiting room for halted/reopening stocks
- Primary User Question: What is happening while trading is halted, and when does it resume?
- Primary Entity: Market Event
- Supporting Entities: AI Comment, Discussion, Stock
- Primary Action: View live countdown/AI/comment room after login
- Secondary Actions: Return to stocks, take investment tendency test
- Information Hierarchy: Back link, screen description, refresh/counter labels, member-only center, test prompt
- Density Strategy: Event-specific page with gated core module
- Navigation Role: Event-driven specialist tool
- Trust Signals: Update cadence labels `5초 감지`, `1초 카운트다운`
- Access Restriction: Member-only core module
- Open Question: Are AI comments source-linked to halt notices/news?

Observation:
The page says live countdown, AI comments, and comment room are shown together, but core content is member-only.

Interpretation:
It attempts to combine event monitoring, interpretation, and social context in one event surface.

User Impact:
This could preserve context during time-sensitive market events, but public users cannot verify the working flow.

DATE Implication:
Relevant to H-002, H-006, H-013.

Confidence:
Medium.

Evidence:
Official Product Observation, Circuit Breaker AI Waiting Room, accessed 2026-07-27.

## News List / Detail Screen 기록

- URL: https://eidoslayer.com/news and news detail links
- Access Status: Not Verified
- Page Purpose: News browsing and original evidence access
- Primary User Question: What happened, and what source confirms it?
- Primary Entity: News
- Supporting Entities: Source, Company, Market
- Primary Action: Not verified
- Secondary Actions: Not verified
- Information Hierarchy: Not verified
- Density Strategy: Home shows latest and market signal news cards
- Navigation Role: Evidence/content destination
- Trust Signals: Source and relative time visible on Home news cards
- Access Restriction: Fetch/cache limitation
- Open Question: Does news detail show original URL, related entities, and source trail?

Observation:
Home exposes news cards and news detail links, but news list/detail pages were not opened successfully.

Interpretation:
News appears important as a discovery/evidence surface, but detail structure is unknown.

User Impact:
Users can see headlines and source/time on Home; validation depth is unknown.

DATE Implication:
Relevant to H-002, H-005, H-009.

Confidence:
Low for detail, High for Home news cards.

Evidence:
Official Product Observation and fetch limitation, Home news links, accessed 2026-07-27.

## Theme List / Detail Screen 기록

- URL: https://eidoslayer.com/themes
- Access Status: Not Verified
- Page Purpose: Theme analysis
- Primary User Question: Which theme matters and which entities are related?
- Primary Entity: Theme
- Supporting Entities: Industry, Stock, News
- Primary Action: Not verified
- Secondary Actions: Not verified
- Information Hierarchy: Not verified
- Density Strategy: Not verified
- Navigation Role: Discovery shortcut from Home
- Trust Signals: Not verified
- Access Restriction: Fetch/cache limitation
- Open Question: Does Theme connect industry, value chain, and stocks?

Observation:
Home links to `테마 특집` and shortcut text `테마 분석 산업 흐름과 밸류체인`, but the Theme page was not opened successfully.

Interpretation:
The label suggests theme is intended as an industry/value-chain discovery surface.

User Impact:
Theme could support industry-oriented investors if entity relationships are explicit, but this remains unverified.

DATE Implication:
Relevant to H-010 and industry/theme archetype validation.

Confidence:
Low.

Evidence:
Official Product Observation and fetch limitation, Home theme links, accessed 2026-07-27.

## Search Result Screen 기록

- URL: Not directly identified
- Access Status: Not Verified
- Page Purpose: Stock lookup or entity search
- Primary User Question: Can I find an investment object quickly?
- Primary Entity: Stock, unknown for other types
- Supporting Entities: Not verified
- Primary Action: Enter stock query
- Secondary Actions: Not verified
- Information Hierarchy: Input visible; result grouping not verified
- Density Strategy: Not verified
- Navigation Role: Entry point
- Trust Signals: Not applicable
- Access Restriction: Interaction not tested
- Open Question: Are search results grouped by Stock, Company, Theme, News, User, and Market?

Observation:
Home includes stock search input with examples `삼성`, `AAPL`. Community mentions stock search to enter discussion rooms.

Interpretation:
Search is observed as stock-oriented entry, not verified as broad entity discovery.

User Impact:
Known-ticker or known-company tasks may be faster than open-ended discovery.

DATE Implication:
Relevant to H-001 and H-003, but evidence is insufficient for broad Search-first claims.

Confidence:
Medium.

Evidence:
Official Product Observation, Home and Community, accessed 2026-07-27.
