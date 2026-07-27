# Information Density Observation 문서

## Card 사용 방식

Observation:
Home uses compact news cards, shortcut cards, and market modules. Eidos AI uses tool cards. EidosMarket uses ranked prediction list items with percentage and vote count. Insight Feed uses persona filter chips/cards.

Interpretation:
Cards are used as navigation units more than deep analysis units. They summarize a path and invite transition into another surface.

User Impact:
Users can scan many options quickly, but cards alone may not provide enough evidence for investment decisions.

DATE Implication:
DATE should distinguish cards for navigation, evidence, and action. Reusing one card pattern across these purposes can reduce clarity.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, Eidos AI, EidosMarket, Insight Feed, accessed 2026-07-27.

## Table 사용 방식

Observation:
No fully populated data table was observed in the public extraction. Stocks page exposes ranking filters and loading state for real-time quotes.

Interpretation:
EidosLayer may rely on dynamic market tables, but this pass did not confirm table structure.

User Impact:
Ranking workflows cannot be evaluated for scan efficiency without loaded data.

DATE Implication:
Table evaluation should be deferred until loaded data can be captured.

Confidence:
Low.

Evidence:
Official Product Observation, Stocks loading state, accessed 2026-07-27.

## Chart 사용 방식

Observation:
Community states that users can enter stock discussion rooms from stock charts. No chart was directly observed in extracted public content.

Interpretation:
Charts may exist on stock detail pages, but this pass cannot assess chart density or chart-to-discussion context preservation.

User Impact:
Chart-driven workflows remain unverified.

DATE Implication:
Stock detail needs direct screen capture in later research.

Confidence:
Low.

Evidence:
Official Product Observation, Community note, accessed 2026-07-27.

## List 사용 방식

Observation:
Home latest news, Stocks ranking filters, Community stock board list, Insight persona/category filters, and EidosMarket popular predictions all use list or list-like structures.

Interpretation:
Lists are the dominant public surface pattern. They support rapid scanning and route selection.

User Impact:
Users can choose the next surface quickly, but comparison quality depends on whether list items include consistent metadata.

DATE Implication:
DATE should define list metadata by decision need: source/time for news, metric/direction for market ranking, probability/votes for predictions, entity type for search.

Confidence:
High.

Evidence:
Official Product Observation, public surfaces, accessed 2026-07-27.

## Information Group과 Scan Path

Observation:
Home groups information into search/header, market sentiment, market desk tabs, live indicators, market signal, latest breaking news, and shortcut routes. Stocks groups personal watchlist before public rankings. Eidos AI groups tools under live market analysis.

Interpretation:
The scan path starts with "now" and "where to go next" instead of comprehensive data review.

User Impact:
This lowers entry cost for public visitors but may limit expert analysis depth on the first screen.

DATE Implication:
DATE should test whether first-screen density should optimize for discovery, monitoring, or analysis continuation.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, Stocks, Eidos AI, accessed 2026-07-27.

## Progressive Disclosure 기록

Observation:
Home shortcuts, Eidos AI tool cards, Community stock links, and EidosMarket popular predictions all push users into more specific surfaces. Several deeper surfaces were not verified.

Interpretation:
Progressive disclosure appears route-based rather than in-place. No side panel/overlay was verified.

User Impact:
Route-based disclosure can be simple but risks context loss if previous filters or question state are not preserved.

DATE Implication:
Relevant to H-006. DATE should test whether in-place panels are preferable for evidence checking.

Confidence:
Low to Medium.

Evidence:
Official Product Observation and detail limitation, accessed 2026-07-27.

## Mobile / Responsive 기록

Observation:
Repeated bottom navigation appears in rendered text across pages, but mobile viewport behavior was not directly tested.

Interpretation:
The product may use bottom navigation for mobile or persistent access.

User Impact:
Could reduce navigation cost, but actual responsive usability is unverified.

DATE Implication:
Future benchmark passes need viewport-specific observation.

Confidence:
Low.

Evidence:
Official Product Observation, repeated bottom navigation, accessed 2026-07-27.

## 과밀도와 저밀도

Observation:
Home presents many route options but several live blocks show loading. Insight Feed has many persona filters but empty content for the observed topic. Stocks has market sections but quote data was loading.

Interpretation:
The main density issue is not visible over-complexity; it is uneven data availability. Some surfaces show structure before content.

User Impact:
Users can learn the intended structure but may not complete a decision journey when data does not load.

DATE Implication:
DATE should evaluate loading states as part of decision continuity, not as a cosmetic state.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, Stocks, Insight Feed, accessed 2026-07-27.
