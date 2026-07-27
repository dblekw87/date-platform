# 벤치마크 TradingView Product Surface Map 기록 문서

## 주요 Product Surface 요약

| Surface | URL | Access Status | User Purpose | Primary Entity | Notes |
|---|---|---|---|---|---|
| Home | https://www.tradingview.com/ | Public | Market summary, Community ideas, chart/product entry | Market, Symbol, Idea | Search and global nav visible |
| Markets | https://www.tradingview.com/markets/ | Public | Cross-asset Market discovery | Market, Index, Stock, Calendar Event | Indices, stocks, movers, calendars visible |
| Supercharts | https://www.tradingview.com/chart/ | Public shell, interaction-dependent | Chart-centered analysis Workspace | Symbol, Chart, Indicator | Help Center documents toolbars and right panels |
| Symbol Page | https://www.tradingview.com/symbols/NASDAQ-AAPL/ | Public | Entity overview and research hub | Stock, Company, Security | Overview, Financials, Documents, News, Community tabs |
| News | https://www.tradingview.com/news/ | Public | Real-time financial news flow | News, Source, Symbol | Source/time/category filters visible |
| Community Ideas | https://www.tradingview.com/ideas/ | Public | Social technical analysis and education | Idea, Symbol, User | Popular/editor picks and filters visible |
| Stock Screener | https://www.tradingview.com/screener/ | Public shell, documented interaction | Filtered asset discovery | Stock, Metric, Filter | Detailed workflow from official Help Center |
| Watchlist | Official Help Center | Login/interaction required | Personal monitoring and analysis continuity | Watchlist, Symbol | Available from any page/product per official docs |
| Alerts | Official Help Center | Login/interaction required | Monitoring conditions | Alert, Symbol, Watchlist, Indicator | Price, technical, watchlist alerts documented |
| Economic Calendar | https://www.tradingview.com/economic-calendar/ | Public | Macro Event discovery | Event, Economic Indicator, Region | Events, forecasts, filters documented |

## 기록 Surface: Home

Observation:
Home exposes top-level navigation `Products`, `Community`, `Markets`, `Brokers`, `More`, a global `Search`, a `Get started` entry, market summary blocks, community ideas, indicators/strategies, top stories, community trends, stocks ideas, highest volume stocks, most volatile stocks, stock gainers/losers, and calendar/event links.

Interpretation:
Home acts as a broad Market and Community discovery surface rather than a single portfolio Dashboard. It routes users into Markets, Ideas, News, Symbols, and Products.

User Impact:
Users can start from Market, Symbol, Idea, News, or product exploration without knowing one path first.

DATE Implication:
TradingView supports testing H-004/H-015 against a market/community discovery Home, but does not prove DATE should copy this entry model.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/, accessed 2026-07-27.

## 기록 Surface: Markets

Observation:
Markets page is labeled `Markets, everywhere` and exposes Indices, World indices, US stocks, Community trends, Highest volume stocks, Most volatile stocks, Stock gainers, Stock losers, Earnings Calendar, IPO Calendar, World stocks, and biggest companies.

Interpretation:
TradingView treats Markets as a cross-asset discovery hub with Market, Stock, Calendar Event, and Community Signal grouped on one surface.

User Impact:
Users can discover assets from Market category, volume, volatility, gain/loss, earnings, IPO, and company size.

DATE Implication:
Relevant to H-015 and H-010. DATE should compare whether discovery grouping by metric/category improves Decision Speed.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/markets/, accessed 2026-07-27.

## 기록 Surface: Supercharts

Observation:
Official Help Center states Supercharts are core to TradingView and support tracking price changes, comparing assets, applying tools, practice trading, and real broker trading. The top toolbar includes symbol search, intervals, chart types, indicators, layouts, settings, snapshot, trade, and publish. The right toolbar includes Watchlist/details/news, Alerts, object tree/data window, Screeners, Pine Editor, Calendars, and News Flow.

Interpretation:
Supercharts functions as a chart-centered Workspace where analysis, monitoring, news, alerts, screeners, and community publishing are attached to the current Symbol context.

User Impact:
Expert users can keep analysis context while switching between symbol, chart, news, watchlist, alert, and screener tools.

DATE Implication:
Strong comparison point for H-006, H-007, H-008, and H-012.

Confidence:
High for official documentation, Medium for direct public interaction.

Evidence:
Official Documentation, https://www.tradingview.com/support/solutions/43000746464-getting-started-with-supercharts/, accessed 2026-07-27.

## 기록 Surface: Symbol Page

Observation:
AAPL Symbol page exposes `Apple Inc`, ticker `AAPL`, exchange `Nasdaq Stock Market`, status `Market closed`, tabs for Overview, Financials, Documents, News, Community, Technicals, Forecasts, Seasonals, Options, ETFs, Bonds, and `Full chart`.

Interpretation:
The Symbol page is an Entity hub. It separates price/chart, fundamentals, official Documents, News, Community, technical analysis, forecasts, derivative/related exposure, and fixed income links around one security/company context.

User Impact:
Entity-first users can remain within one Symbol context while moving across different analysis modes.

DATE Implication:
Relevant to H-003, H-010, and H-005. DATE should examine how Company/Security/Document/News relationships are separated.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/symbols/NASDAQ-AAPL/, accessed 2026-07-27.

## 기록 Surface: News

Observation:
News page is labeled `News` and says it provides global real-time updates. It exposes Top stories with timestamps/source labels and Market news filters such as All, Stocks, ETFs, Crypto, Forex, Indices, Futures, Government bonds, Corporate bonds, and more.

Interpretation:
News is structured as a real-time Evidence flow with asset-class filters and Source/time cues.

User Impact:
Users can scan Freshness and Source before opening an item, but relation to Symbol/Entity depends on story links.

DATE Implication:
Relevant to H-002, H-005, and H-009.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/news/, accessed 2026-07-27.

## 기록 Surface: Community Ideas

Observation:
Ideas page is labeled `Community ideas` and exposes `Popular`, `Editors' picks`, `All ideas`, `Videos only`, `Most recent`, and `Most popular`. Idea entries include author, symbol references, direction labels such as Long/Short, and long-form analysis text.

Interpretation:
Community is not a generic forum-first surface. It is centered on tradable Symbol context, chart analysis, and authored thesis.

User Impact:
Users can discover analysis through community content, but must distinguish opinion from supported Evidence.

DATE Implication:
Relevant to H-010, H-012, and P-005 Cross Validation.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/ideas/, accessed 2026-07-27.

## 기록 Surface: Stock Screener

Observation:
Official Help Center describes Stock Screener as a financial analysis tool for stocks using ratios, timeframes, indicators, filters, column sets, financial statements, market data, technicals, dividends, valuation, growth, margins, and ratios. It can be used standalone or together with Supercharts.

Interpretation:
Screener is a table/filter-based discovery Surface that can feed chart analysis and Watchlist workflows.

User Impact:
Users can discover candidates by metrics and then transition into Symbol or chart context.

DATE Implication:
Relevant to H-008, H-010, H-015.

Confidence:
High for official documentation, Low for direct public screener interaction in this pass.

Evidence:
Official Documentation, https://www.tradingview.com/support/solutions/43000718866-tradingview-stock-screener-trade-smarter-not-harder/, accessed 2026-07-27.

## 기록 Surface: Watchlist

Observation:
Official Help Center states Watchlists allow tracking assets in one place, are available from any page and product, support add/remove symbols, custom sections, metric sorting, related news, fundamental data, technical summary, notes, advanced view tabs, earnings, dividends, news, grouping by sector/exchange/symbol type, and watchlist alerts.

Interpretation:
Watchlist acts as personal Navigation, monitoring, analysis summary, and continuity layer rather than simple saved ticker list.

User Impact:
Users can repeatedly return to a personalized Entity set and inspect related News, fundamentals, technicals, notes, and alerts.

DATE Implication:
Strong evidence for H-007 and H-014 as Research questions, not final DATE decisions.

Confidence:
High for official documentation, Medium for public direct observation.

Evidence:
Official Documentation, https://www.tradingview.com/support/solutions/43000745825-mastering-the-tradingview-watchlists/, accessed 2026-07-27.

## 기록 Surface: Alerts

Observation:
Official Help Center states alerts can notify price changes and technical conditions based on data series, indicators, chart patterns, strategies, drawing tools, and Watchlist conditions.

Interpretation:
Alerts are attached to Symbol, Watchlist, chart analysis, and technical objects, making monitoring part of analytical context.

User Impact:
Users can convert analysis conditions into monitoring without manually revisiting every Symbol.

DATE Implication:
Relevant to H-013 and H-014.

Confidence:
High for official documentation.

Evidence:
Official Documentation, https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/, accessed 2026-07-27.

## 기록 Surface: Economic Calendar

Observation:
Economic Calendar page exposes calendar categories `Economic`, `Earnings`, `Revenue`, `Dividends`, `IPO`. The page explains events can affect assets, regions, and global markets, and events are chronological and linked with economic indicators like interest rates or GDP. Filters include period, country, timezone, importance, and category.

Interpretation:
Macro Event is treated as an Event/Indicator surface connected to assets and markets.

User Impact:
Users can start from macro timing and evaluate potential Market/Asset impact.

DATE Implication:
Relevant to H-011 and Event-driven Journey.

Confidence:
High.

Evidence:
Official Product Observation, https://www.tradingview.com/economic-calendar/, accessed 2026-07-27.
