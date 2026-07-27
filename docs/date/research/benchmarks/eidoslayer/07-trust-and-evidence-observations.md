# Trust와 Evidence Observation 문서

## Source 기록

Observation:
Home news cards display publisher names and relative timestamps, such as Yonhap, Dailyan, Edaily, The Fact, Seoul Economic Daily, MoneyToday, Korea Economic Daily, Maeil Business Newspaper.

Interpretation:
Publisher labels are treated as trust cues at headline level.

User Impact:
Users can quickly assess source and recency before opening details.

DATE Implication:
DATE should preserve source and timestamp as baseline evidence metadata.

Confidence:
High.

Evidence:
Official Product Observation, Home news area, accessed 2026-07-27.

## Timestamp와 Freshness

Observation:
Home displays relative news times such as 17 minutes, 18 minutes, 20 minutes, 24 minutes, and 33 minutes ago. Home and other pages show `LIVE`, `LIVE 연결 중`, or live loading states. Eidos AI describes update cadence for some AI tools, including five-second updates for circuit breaker AI.

Interpretation:
Freshness is part of the product promise. The product foregrounds live market context even when data is loading.

User Impact:
Users may trust that the product is timely, but loading states can reduce confidence if no fallback timestamp or stale-state label is shown.

DATE Implication:
DATE should distinguish live, loading, stale, delayed, and unavailable states explicitly.

Confidence:
High for visible labels, Medium for impact.

Evidence:
Official Product Observation, Home, Eidos AI, Circuit Breaker AI, accessed 2026-07-27.

## 원문 접근

Observation:
Home news cards link to detail routes, but original source URL or detail page evidence path was not verified.

Interpretation:
Headline source labels exist, but traceability to original article is not verified.

User Impact:
Users can see the publisher but may not be able to audit the full evidence chain from observed public data.

DATE Implication:
H-009 has partial support; H-005 remains insufficiently evidenced.

Confidence:
Low.

Evidence:
Official Product Observation and fetch limitation, Home news links, accessed 2026-07-27.

## AI Disclosure 기록

Observation:
Insight Feed explicitly states that profiles are not actual statements from real people and are EidosLayer AI editorial avatars. Eidos AI labels several analysis surfaces as AI and says detailed AI comments require login.

Interpretation:
The product marks generated interpretation and persona framing rather than presenting it as human source material.

User Impact:
This reduces misattribution risk but does not itself prove factual grounding.

DATE Implication:
DATE should separate AI-generated interpretation from source evidence and should record AI disclosure as a trust criterion.

Confidence:
High.

Evidence:
Official Product Observation, Insight Feed and Eidos AI, accessed 2026-07-27.

## 데이터와 의견 분리

Observation:
Home mixes market data/loading states with news cards. Insight Feed presents AI-curated perspectives. EidosMarket shows percentages and vote counts. There was no verified screen showing methodology for AI analysis, market sentiment, prediction percentages, or ranking metrics.

Interpretation:
The product uses multiple evidence types but public surfaces do not consistently expose methodology.

User Impact:
Users may understand what kind of signal they are seeing, but not always how it was derived.

DATE Implication:
DATE should define visual and structural separation for raw data, source news, AI interpretation, crowd signal, and user note.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, Feed, EidosMarket, accessed 2026-07-27.

## Traceability Gap 기록

- News detail and original article access: Not verified
- AI summary source links: Not verified
- Ranking methodology: Not verified
- Fear/greed methodology: Not verified
- Prediction market resolution rules: Not verified
- Filing/disclosure linkage: Not observed
- Related entity tags on news: Not observed

## Evidence 연결 가능성

Observation:
EidosLayer surfaces source/time news, AI tools for cause summaries, stock discussion, watchlist, and prediction signals. These are adjacent but not verified as a connected evidence graph.

Interpretation:
The product has ingredients for evidence connection but public surfaces do not confirm a durable evidence model.

User Impact:
Users can move between signals but may have to mentally connect source, interpretation, discussion, and decision.

DATE Implication:
Relevant to H-005. DATE should test whether connecting evidence across surfaces creates measurable revisit and decision benefits.

Confidence:
Low to Medium.

Evidence:
Official Product Observation across public surfaces, accessed 2026-07-27.
