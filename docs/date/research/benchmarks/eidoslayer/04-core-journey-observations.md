# Core Journey Observations 문서

Access Date: 2026-07-27
Access Mode: Public, not logged in

## Scenario 표

| Scenario ID | 수행 가능 여부 | Entry Point | 최소 클릭 수 | 페이지 전환 수 | 사용자 선택 수 | Context Loss | 복귀 비용 | 저장 가능 여부 | 근거 확인 가능 여부 | 막힌 지점 | 접근 제한 | 신뢰도 |
|---|---|---|---:|---:|---:|---|---|---|---|---|---|---|
| S-001 | Partially Possible | Home | 0 | 0 | 2+ | Low | Low | Not Verified | Partial | Live data loading | Dynamic data | Medium |
| S-002 | Partially Possible | Home or Stocks | 1 | 1 | 3+ | Medium | Medium | Not Verified | Partial | Cause detail not verified | Dynamic/news detail | Low |
| S-003 | Possible | Home or Stocks | 1 | 1 | 2+ | Medium | Medium | Watchlist hinted | Partial | Ranking data loading | Dynamic data | Medium |
| S-004 | Partially Possible | Search input or Community stock link | 1+ | 1+ | 1+ | Not Verified | Not Verified | Watchlist hinted | Not Verified | Stock detail not opened | Interaction/detail route | Low |
| S-005 | Not Verified | Theme or Stocks | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Peer comparison not observed | Fetch/cache limitation | Low |
| S-006 | Partially Possible | Home news cards | 1 | 1 | 1+ | Medium | Medium | Not Verified | Partial | News detail not opened | Fetch/cache limitation | Low |
| S-007 | Partially Possible | Eidos AI or EidosMarket | 1 | 1 | 2+ | Medium | Medium | Not Verified | Partial | Macro-to-stock relation not verified | Login/detail limitation | Low |
| S-008 | Partially Possible | Stocks | 1+ | 1 | 1+ | Low | Low | Hinted by star | Not applicable | Login persistence not verified | Login likely required | Medium |
| S-009 | Not Verified | Home/Login implied | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Alert UI not observed | Login likely required | Low |
| S-010 | Not Verified | Stocks/Login implied | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Cross-session state not observed | Login required | Low |
| S-011 | Partially Possible | Home news cards | 1+ | 1+ | 2+ | Medium | Medium | Not Verified | Partial | Related entity links not verified | News detail limitation | Low |
| S-012 | Partially Possible | Community or Stocks | 1+ | 1+ | 2+ | Medium | Medium | Not Verified | Partial | Detail routes not verified | Detail limitation | Low |

## S-001 — 오늘 시장의 주요 변화 파악

Observation:
Home displays market sentiment, `EIDOSLAYER MARKET DESK`, date/location, market tabs, live connection/loading states, market signal news, latest breaking news, and shortcuts to market/theme/tools/coin surfaces.

Interpretation:
Home is designed to answer "what is happening now?" before forcing users into a specific stock or portfolio.

User Impact:
The user can begin with current market context immediately, but live-loading states can weaken the decision path if data is unavailable.

DATE Implication:
Supports H-004/H-015 as research-relevant, not as final DATE direction.

Confidence:
Medium.

Evidence:
Official Product Observation, https://eidoslayer.com/, accessed 2026-07-27.

## S-002 — 상승 또는 하락 원인 확인

Observation:
Home shows market signal news and latest headlines with source/time. Eidos AI includes `이벤트 승냥AI` described as summarizing why movers rise using news, good news, and order flow. Stocks includes real-time ranking filters for movers.

Interpretation:
EidosLayer appears to route cause investigation through news and task-specific AI rather than only through price lists.

User Impact:
Users can see a path toward cause analysis, but public access did not verify the actual cause explanation output.

DATE Implication:
Relevant to H-002, H-013, H-015. Cause grouping must be tested against actual evidence linkage.

Confidence:
Low to Medium.

Evidence:
Official Product Observation, Home, Stocks, Eidos AI, accessed 2026-07-27.

## S-003 — 투자 대상 발견

Observation:
Home has shortcuts and news; Stocks has major stocks and ranking sections; EidosMarket has popular predictions with percentage/vote counts; Insight Feed has persona/category filters.

Interpretation:
Discovery is distributed across market desk, rankings, editorial insights, and prediction market rather than centralized in one screener.

User Impact:
Multiple discovery routes increase entry options but may make it unclear which path is primary.

DATE Implication:
DATE should compare distributed discovery against a more explicit discovery system.

Confidence:
Medium.

Evidence:
Official Product Observation, Home, Stocks, Feed, EidosMarket, accessed 2026-07-27.

## S-004 — 특정 기업 또는 종목 분석

Observation:
Home provides a stock search input. Community provides stock board links and says stock charts can lead to stock discussion rooms. Stocks references star actions in stock lists.

Interpretation:
Known stock entry exists, but the public extraction did not verify a stock detail page with chart, financials, or news.

User Impact:
Users can likely start entity-first, but analysis depth cannot be evaluated from public observation.

DATE Implication:
H-001/H-003 remain insufficiently evidenced by EidosLayer public surface.

Confidence:
Low.

Evidence:
Official Product Observation, Home, Community, Stocks, accessed 2026-07-27.

## S-005 — 동일 산업 경쟁사 비교

Observation:
No verified peer comparison, industry comparison, or competitor comparison screen was observed. Home links to theme analysis and value chain wording, but Theme page was not verified.

Interpretation:
EidosLayer may support theme/value-chain exploration, but peer comparison is not verified.

User Impact:
Users cannot rely on observed public surfaces for direct competitor comparison.

DATE Implication:
No strong evidence for H-010 from EidosLayer in this pass.

Confidence:
Low.

Evidence:
Official Product Observation and fetch limitation, Home theme link, accessed 2026-07-27.

## S-006 — 관련 뉴스와 공시 검증

Observation:
Home news cards include sources such as Yonhap, Dailyan, Edaily and relative timestamps. News detail pages were linked but not opened successfully. No filing/disclosure surface was observed.

Interpretation:
Source/time cues exist at headline level, but deeper evidence traceability is unverified.

User Impact:
Users can judge recency and publisher quickly, but cannot verify original evidence path from this pass.

DATE Implication:
Relevant to H-009; insufficient for H-005.

Confidence:
Low to Medium.

Evidence:
Official Product Observation, Home news cards, accessed 2026-07-27.

## S-007 — 거시 지표와 종목 영향 연결

Observation:
Eidos AI references live dashboard covering Nasdaq, S&P500, KOSPI, exchange rate, and Bitcoin. EidosMarket includes an economic prediction about the Fed's July decision. No direct macro-to-stock impact mapping was observed.

Interpretation:
Macro objects appear in market/AI/prediction contexts, but relationship mapping to stocks is not visible in public extraction.

User Impact:
Users may see macro context but still need manual interpretation for stock impact.

DATE Implication:
H-011 remains an open opportunity rather than supported conclusion.

Confidence:
Low.

Evidence:
Official Product Observation, Eidos AI and EidosMarket, accessed 2026-07-27.

## S-008 — Watchlist 또는 유사 기능에 저장

Observation:
Stocks page has `내 관심종목 실시간`, an empty state, and instruction to press `★` in stock lists to add items.

Interpretation:
Watchlist is a first-class personal monitoring concept.

User Impact:
The user can infer how to save stocks, but persistence/login behavior was not verified.

DATE Implication:
Supports further testing of H-007 and H-014.

Confidence:
Medium.

Evidence:
Official Product Observation, Stocks, accessed 2026-07-27.

## S-009 — 알림 생성 가능성 확인

Observation:
No notification or alert creation UI was observed in public pages. A search snippet for the official Home mentioned `Notifications`, but this was not visible in the current product extraction.

Interpretation:
Alerting may exist behind login or in a prior/current variant not visible in this pass.

User Impact:
Public users cannot discover alert capabilities from observed screens.

DATE Implication:
H-013 receives insufficient evidence from this pass.

Confidence:
Low.

Evidence:
Official Product Observation, public pages, accessed 2026-07-27.

## S-010 — 다음 날 동일 분석 재개

Observation:
No recent history, saved workspace, or cross-session analysis state was observed publicly. Watchlist empty state suggests one possible continuity mechanism.

Interpretation:
Personal continuity likely requires login and was not verifiable.

User Impact:
Non-logged-in users cannot assess whether analysis can resume next day.

DATE Implication:
H-014 remains insufficiently evidenced.

Confidence:
Low.

Evidence:
Official Product Observation, Stocks and public pages, accessed 2026-07-27.

## S-011 — News에서 Company, Industry, Event로 전환

Observation:
Home news cards link to news detail routes, but detail pages were not verified. No observed news card showed explicit related Company, Industry, or Event tags in the extracted text.

Interpretation:
News-to-entity transition may exist in detail pages, but is not verified.

User Impact:
Headline-level browsing does not guarantee evidence-to-entity navigation.

DATE Implication:
No strong support for H-002 or H-005 from EidosLayer public news observation.

Confidence:
Low.

Evidence:
Official Product Observation, Home news links, accessed 2026-07-27.

## S-012 — 하나의 Entity에서 관련 Entity 연속 탐색

Observation:
Community stock links and stock-chart-to-discussion note suggest stock-to-discussion transition. Home shortcuts suggest market-to-theme/coin/stocks transitions. No continuous related entity chain was verified.

Interpretation:
The product provides surface-to-surface transitions, but relationship graph behavior is not observable.

User Impact:
Users can jump between major contexts, but may not understand why entities are related.

DATE Implication:
Entity Transition Quality should remain a central metric in future benchmarks.

Confidence:
Low to Medium.

Evidence:
Official Product Observation, Home and Community, accessed 2026-07-27.
