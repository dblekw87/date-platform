# Entity와 관계 Observation 문서

## Observed Entity Candidate 기록

| Entity Candidate | Observation Status | Evidence | Notes |
|---|---|---|---|
| Market | Observed | Home market desk, market sentiment, market signal | Central public discovery object |
| Stock | Observed | Search placeholder, Stocks page, Community stock boards | Stock is a clear navigation object |
| Watchlist | Observed | Stocks empty state and star instruction | Persistence/login not verified |
| News | Observed | Home news cards and latest news sections | Detail page not verified |
| Source | Observed | News cards show publisher labels | Source trail depth not verified |
| Insight | Observed | Insight Feed | AI-curated content object |
| Persona | Observed | Insight persona filters | Editorial avatar, not real statement source |
| AI Tool | Observed | Eidos AI tool cards | Task-specific analysis tools |
| Discussion | Observed | Community / stock discussion rooms | Detail behavior not verified |
| Prediction Market | Observed | EidosMarket popular predictions | Relationship to investments not verified |
| Topic | Observed | Insight categories and prediction questions | Generic grouping object |
| Market Event | Partially Observed | Circuit Breaker AI waiting room | Event-specific page exists, but detail behavior is login-gated |
| Theme | Partially Observed | Home `테마 특집` and shortcut wording | Theme page not verified |
| Crypto | Partially Observed | Home coin shortcut, Eidos AI Pepe AI preparation | Detail not verified |
| Metric | Partially Observed | Fear/greed, USD/KRW, probabilities, votes | Methodology not verified |
| Company | Hypothesis | Stock names imply companies | Company/security separation not verified |
| Industry | Hypothesis | Theme/value-chain wording | Not directly observed |

## 관계 Observation

### Market에서 News로

Observation:
Home places market desk, market signal, and latest news in the same surface. News cards include source and relative time.

Interpretation:
News is used as evidence or explanation adjacent to market status.

User Impact:
The user can move from market awareness to headline evidence with low visible cost.

DATE Implication:
H-002 and H-009 should evaluate whether news is raw evidence, event proxy, or navigation object.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, accessed 2026-07-27.

### Stock에서 Watchlist로

Observation:
Stocks page tells users to press `★` in stock lists to add to watchlist.

Interpretation:
Stock entities can become personal navigation items.

User Impact:
Watchlist can convert discovery into repeat monitoring.

DATE Implication:
Relevant to H-007 and H-014.

Confidence:
Medium.

Evidence:
Official Product Observation, Stocks, accessed 2026-07-27.

### Stock에서 Discussion으로

Observation:
Community provides stock-specific discussion links and states stock charts also include a stock discussion room button.

Interpretation:
Discussion is treated as a contextual extension of Stock rather than a separate generic forum.

User Impact:
Users can move from analysis to sentiment/social context around the same stock.

DATE Implication:
DATE should test whether social content should be a panel, tab, or separate surface.

Confidence:
Medium.

Evidence:
Official Product Observation, Community, accessed 2026-07-27.

### AI Tool에서 Market Event로

Observation:
Eidos AI links to Circuit Breaker AI; the Circuit Breaker page describes live countdown, AI comments, and comment room for waiting during trade resumption.

Interpretation:
AI tools may be event-specific surfaces, not only generic analysis.

User Impact:
This can reduce context switching during time-sensitive market events.

DATE Implication:
Relevant to H-002, H-006, H-013.

Confidence:
Medium.

Evidence:
Official Product Observation, Eidos AI and Circuit Breaker AI, accessed 2026-07-27.

### Insight에서 Persona로

Observation:
Insight Feed filters insights by named business figures and discloses they are AI editorial avatars, not real statements.

Interpretation:
Persona is used as a framing device for analysis, not as a factual source.

User Impact:
The disclosure protects against misattribution but still requires careful evidence support.

DATE Implication:
DATE should separate author/source/persona/AI voice in any generated insight system.

Confidence:
High.

Evidence:
Official Product Observation, Insight Feed, accessed 2026-07-27.

## 검증되지 않은 관계

- News to Company
- News to Industry
- News to Event
- Theme to Stock
- Theme to Industry
- Macro Indicator to Stock
- Prediction Market to Stock
- Stock to Financial Metrics
- Company to Security
