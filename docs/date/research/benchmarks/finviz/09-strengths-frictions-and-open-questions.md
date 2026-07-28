# Finviz Strength, Friction, Open Question 기록

## 문서 목적

이 문서는 Finviz Phase 4.1~4.3에서 기록한 Observation을 기반으로 Structural Strength, User Friction, Context Loss, Access Restriction, Open Question을 정리한다.

이번 문서는 Candidate Principle을 작성하지 않는다. Principle ID를 발급하지 않고 Registry도 수정하지 않는다.

## Structural Strength 요약

| 구분 | 수 |
| --- | ---: |
| Structural Strength | 15 |
| User Friction | 16 |
| Advertisement Friction | 3 |
| Context Loss 지점 | 8 |
| Product Responsibility Matrix 항목 | 24 |

## Structural Strength Inventory

### Dense Market Summary

Observation:
Home은 Market breadth, Signal lists, Heatmap area, Headlines, Major News, Calendar, Insider, Futures / Forex summary를 같은 Screen에 배치한다.

Evidence Level:
Observed

Why It May Work:
사용자가 known ticker 없이도 오늘의 broad condition과 next Surface를 한 번에 scan할 수 있기 때문이다.

User Benefit:
Decision Speed, Discoverability, Expert Scalability

Conditions Required:
각 block의 책임, freshness label, ticker transition이 명확해야 한다.

Potential Trade-off:
인지 부하, first scan 우선순위 판단 비용, Advertisement Interference, Mobile 위험이 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Screener Filter / Result Co-location

Observation:
Screener는 filter category, Tickers input, result view tabs, result count, result table을 같은 Surface에 표시한다.

Evidence Level:
Observed

Why It May Work:
criteria 설정과 result comparison 사이의 왕복 비용을 줄이기 때문이다.

User Benefit:
Decision Speed, Comparison Efficiency, Discoverability

Conditions Required:
filter state, result row action, Back Navigation state가 명확해야 한다.

Potential Trade-off:
filter 이해 비용과 column 과다 문제가 발생할 수 있다.

Candidate Principle Readiness:
Ready

### Screener View Switching

Observation:
Screener는 Overview, Valuation, Financial, Ownership, Performance, Technical, ETF, Charts, News, Snapshot, Maps view를 제공한다.

Evidence Level:
Observed

Why It May Work:
같은 Stock set을 다른 Information Form으로 전환해 comparison 목적에 맞게 density를 조절할 수 있기 때문이다.

User Benefit:
Information Density Control, Comparison Efficiency, Expert Scalability

Conditions Required:
view state와 filter state가 함께 유지되어야 한다.

Potential Trade-off:
view가 많으면 novice user가 어떤 view를 써야 하는지 판단해야 한다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Table-first Comparison

Observation:
Home Signal lists, Screener results, Insider transactions, Groups view는 repeated table 또는 row-based grammar를 사용한다.

Evidence Level:
Observed / Partial

Why It May Work:
많은 Stock, Transaction, group unit을 같은 column grammar로 비교할 수 있기 때문이다.

User Benefit:
Comparison Efficiency, Decision Speed

Conditions Required:
column meaning과 sorting / filtering rule이 충분히 설명되어야 한다.

Potential Trade-off:
column 과다와 small text readability 문제가 있다.

Candidate Principle Readiness:
Ready

### Heatmap Compression

Observation:
Maps는 official text와 Blog 기준으로 Stock 또는 group-like unit을 size, color, location으로 압축한다.

Evidence Level:
Partial

Why It May Work:
Table column을 spatial encoding으로 바꾸어 broad Market structure를 빠르게 비교할 수 있기 때문이다.

User Benefit:
Discoverability, Decision Speed, Comparison Efficiency

Conditions Required:
cell meaning, size metric, color metric, hover / click behavior가 current UI에서 명확해야 한다.

Potential Trade-off:
small cell 가독성, color encoding 학습 비용, dynamic interaction Not Verified가 있다.

Candidate Principle Readiness:
Needs Additional Evidence

### Groups Aggregate Comparison

Observation:
Groups는 Sector, Industry, Country, Capitalization group을 table, chart, spectrum, maps view로 비교한다.

Evidence Level:
Partial

Why It May Work:
Stock selection 전에 aggregate unit으로 broad rotation을 볼 수 있기 때문이다.

User Benefit:
Comparison Efficiency, Discoverability

Conditions Required:
group에서 Stock list 또는 Stock Quote로 내려가는 path가 검증되어야 한다.

Potential Trade-off:
Drill-down 불명확성과 group context loss가 있다.

Candidate Principle Readiness:
Needs Additional Evidence

### Stock Quote Dense Entity Hub

Observation:
Stock Quote는 ticker header, price timestamp, Sector, Industry, Country, peers, ETF holders, metrics, ratings, News, local tabs를 같은 Stock Context에 배치한다.

Evidence Level:
Observed

Why It May Work:
Stock 판단에 필요한 multiple Evidence candidate와 related Entity를 page transition 없이 볼 수 있기 때문이다.

User Benefit:
Decision Speed, Context Preservation, Expert Scalability

Conditions Required:
Metric grouping과 tab depth, related link relation reason이 이해 가능해야 한다.

Potential Trade-off:
Stock Quote 과밀, Company / Stock boundary 혼재, Advertisement Interference가 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Stock Quote Local Tabs

Observation:
Stock Quote는 Overview, Compare, Short Interest, Financials, Options, Filings tab을 제공한다.

Evidence Level:
Observed

Why It May Work:
Dense Overview와 deeper mode를 분리해 Simultaneous Disclosure와 Progressive Disclosure를 함께 제공하기 때문이다.

User Benefit:
Information Density Control, Context Preservation

Conditions Required:
tab state와 ticker context가 명확하게 유지되어야 한다.

Potential Trade-off:
tab body와 previous scroll state는 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

### News Source / Timestamp 표시

Observation:
News page와 Stock Quote News list는 Source label, timestamp, headline, external link를 표시한다.

Evidence Level:
Observed

Why It May Work:
user가 headline을 열기 전 Source와 Freshness를 기준으로 우선순위를 정할 수 있기 때문이다.

User Benefit:
Evidence Traceability, Decision Speed

Conditions Required:
external Source access와 internal context recovery path가 분리되어야 한다.

Potential Trade-off:
external Source 이동 후 Finviz context loss가 있다.

Candidate Principle Readiness:
Ready

### Insider Transaction to SEC Form 4

Observation:
Insider table row는 Ticker, Owner, Relationship, Date, Transaction, Cost, Shares, Value, SEC Form 4 link를 포함한다.

Evidence Level:
Observed

Why It May Work:
Transaction scan과 original regulatory filing access가 같은 row에 있기 때문이다.

User Benefit:
Evidence Traceability, Comparison Efficiency

Conditions Required:
SEC external 이동 전 transaction context가 충분히 보존되어야 한다.

Potential Trade-off:
SEC 이동 후 Finviz context loss와 Person context 부족이 있다.

Candidate Principle Readiness:
Ready

### Screener Metric Formula Documentation

Observation:
Screener Help는 filter definition과 multiple Metric formula를 제공한다.

Evidence Level:
Official Documentation Only

Why It May Work:
high-density Metric table의 meaning을 user가 공식 Documentation에서 확인할 수 있기 때문이다.

User Benefit:
Evidence Traceability, Expert Scalability

Conditions Required:
Product Surface에서 Help formula로 이어지는 discoverable path가 필요하다.

Potential Trade-off:
item-level direct trace가 Not Verified이고 Documentation 밖 이동 비용이 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Global Navigation Persistence

Observation:
Home, Screener, News, Insider, Stock Quote에서 top Global Navigation이 유지된다.

Evidence Level:
Observed

Why It May Work:
Dense Surface 사이를 이동할 때 Product-level orientation을 잃지 않게 하기 때문이다.

User Benefit:
Context Preservation, Discoverability

Conditions Required:
Mobile Navigation에서도 같은 orientation이 유지되어야 한다.

Potential Trade-off:
Breadcrumb나 Recent context는 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Stock Ticker Context 유지

Observation:
Stock Quote는 ticker, company display, price timestamp, local tabs, peers, News를 같은 Stock Context에 배치한다.

Evidence Level:
Observed

Why It May Work:
user가 analysis mode를 바꿔도 현재 Stock anchor를 유지할 수 있기 때문이다.

User Benefit:
Context Preservation, Decision Speed

Conditions Required:
peer transition과 external transition에서 previous Stock relation reason을 보완해야 한다.

Potential Trade-off:
related Stock으로 이동하면 original relation reason이 손실될 수 있다.

Candidate Principle Readiness:
Ready

### Public Product Breadth

Observation:
Home, Screener, News, Insider, Stock Quote, Groups, Maps, Futures, Forex, Crypto, Calendar, Elite page는 public mode에서 접근 또는 entry가 확인됐다.

Evidence Level:
Observed / Partial

Why It May Work:
user가 account 없이 broad evaluation을 시작할 수 있기 때문이다.

User Benefit:
Discoverability, Decision Speed

Conditions Required:
Public과 Login Required / Elite Feature boundary가 명확해야 한다.

Potential Trade-off:
save, Alert, real-time, no ads 같은 continuity와 Trust 기능은 제한된다.

Candidate Principle Readiness:
Benchmark-specific

### Public / Elite Feature Transparency

Observation:
Elite page와 FAQ는 real-time quotes, No Ads, Advanced Screener, alerts, Export / API, Portfolio limits, Screener presets, layout customization을 표시한다.

Evidence Level:
Observed / Official Pricing

Why It May Work:
Access Restriction과 data timing 차이를 user가 사전에 이해할 수 있기 때문이다.

User Benefit:
Evidence Traceability, Personal Continuity, Access Planning

Conditions Required:
in-product gate message가 Pricing과 일치해야 한다.

Potential Trade-off:
Product Principle보다 access policy에 가까워 일반화 위험이 있다.

Candidate Principle Readiness:
Benchmark-specific

## User Friction Inventory

| Friction ID | Trigger | Affected User | Affected Surface | Observation Status | User Cost | Decision Impact | Workaround | Access Restriction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-FR-001 | Dense Home first scan | novice user | Home | Observed | block priority 판단 비용 | 첫 판단이 지연될 수 있다. | repeated list grammar 학습 | Public | High | 로그인 후 customized Home이 비용을 줄이는가. |
| FNV-FR-002 | Screener filter breadth | novice / intermediate user | Screener | Observed | filter meaning 학습 비용 | discovery criteria 설정이 늦어진다. | Screener Help formula 참조 | Public / Elite 일부 | High | preset onboarding이 있는가. |
| FNV-FR-003 | Screener column density | novice user | Screener Result | Observed | column scan 부담 | 잘못된 Metric 비교 가능성 | view switch 사용 | Public / Elite 일부 | Medium | column customization access level은 무엇인가. |
| FNV-FR-004 | Maps small cell | all users | Maps | Partial | small cell readability 비용 | visual discovery 정확도 저하 | zoom / hover candidate | Public / Elite 일부 | Medium | current hover / zoom behavior 확인 필요. |
| FNV-FR-005 | Heatmap color encoding | novice user | Maps | Partial / Official Blog | color meaning 학습 비용 | wrong interpretation 가능성 | methodology 확인 | Public / Elite 일부 | Medium | current UI legend quality 확인 필요. |
| FNV-FR-006 | Groups drill-down unclear | discovery user | Groups | Partial | group에서 Stock으로 내려가는 비용 | Sector / Industry Signal을 action으로 바꾸기 어렵다. | Screener Industry filter 사용 | Public / Elite 일부 | Medium | Groups to Stock path 확인 필요. |
| FNV-FR-007 | Stock Quote overload | novice / general user | Stock Quote | Observed | Metric priority 판단 비용 | analysis focus 분산 | local tabs 사용 | Public / Elite 일부 | High | default Metric grouping 이해성 확인 필요. |
| FNV-FR-008 | Advertisement content competition | Public user | Home, Stock Quote | Observed / Official Pricing | scan interruption 가능성 | decision speed 저하 가능성 | Elite No Ads | Public / Elite no ads | Medium | actual placement impact 정량 확인 필요. |
| FNV-FR-009 | Elite upsell near context | Public user | Stock Quote, Elite path | Observed / Official Pricing | content와 subscription prompt 경쟁 | Stock context focus 저하 가능성 | ignore / subscribe | Public / Elite | Medium | upsell placement variants 확인 필요. |
| FNV-FR-010 | External News context loss | evidence user | News, Stock Quote | Observed | Finviz로 돌아오는 비용 | News validation 후 Stock context 복구 비용 | browser back | Public | High | related Stock return path 확인 필요. |
| FNV-FR-011 | SEC Form 4 context loss | evidence user | Insider | Observed | SEC 이동 후 transaction row context 손실 | filing validation 후 comparison 중단 | browser back | Public | High | in-product filing summary depth 확인 필요. |
| FNV-FR-012 | Peer relation reason loss | Stock researcher | Stock Quote | Observed / Inferred | original Stock relation reason 손실 | peer comparison continuity 저하 | previous page back | Public | Medium | peer relation metadata 확인 필요. |
| FNV-FR-013 | Screener filter context loss | Screener user | Screener, Stock Quote | Partial | Stock Quote 이동 후 criteria recall 비용 | candidate comparison loop가 끊길 수 있다. | Back Navigation | Public | Medium | Back state 유지 확인 필요. |
| FNV-FR-014 | Portfolio / Saved State gate | returning user | Portfolio, Screener | Login Required | save / revisit 불가 | Personal Continuity 제한 | account creation | Login Required / Elite 일부 | High | Portfolio responsibility 확인 필요. |
| FNV-FR-015 | Alert Rule gate | monitoring user | Screener, Stock Quote candidate | Elite Feature | monitoring setup 불가 | recurring validation 제한 | Elite subscription | Elite Feature | High | trigger builder 확인 필요. |
| FNV-FR-016 | Mobile density unknown | mobile user | all dense Surface | Not Verified | mobile cost 판단 불가 | mobile Journey comparison 보류 | desktop-only conclusion 제한 | Not Verified | Low | responsive Navigation과 table stacking 확인 필요. |

## Advertisement Assessment

| 항목 | Observation | User Benefit | User Cost | Product Benefit | Trust Impact | Density Impact | Candidate Principle Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Advertisement Interference | Public page에서 tracking iframe과 ad / upsell candidate가 확인됐다. | Public access 비용을 낮출 수 있다. | content scan과 visual priority 경쟁 가능성 | free access monetization | ad-origin confusion risk는 Not Verified | Dense UI의 cognitive cost를 키울 수 있다. | Needs Additional Evidence |
| Subscription Navigation | Elite는 No Ads, real-time data, alerts, export/API, Advanced Screener를 표시한다. | access boundary 이해 가능 | subscription prompt가 Flow 중간에 노출될 수 있다. | Elite conversion | feature transparency는 Trust에 기여 | No Ads는 Density Control 후보 | Benchmark-specific |
| Product Trade-off | Public breadth와 Elite feature gating이 공존한다. | account 없이 시작 가능 | persistence와 real-time은 제한됨 | free/paid segmentation | Freshness와 Trust 차이가 plan-dependent | Public density는 ad와 함께 유지됨 | Benchmark-specific |

## Context Preservation Assessment

| Context | 저장되는 Context | Context Owner | Persistence 범위 | Page Transition 후 유지 여부 | External 이동 후 유지 여부 | Login Required | Elite Feature | Evidence Level | Context Loss Risk | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global Navigation | Product Surface access | Product | session frame | Observed | Not Applicable | No | No | Observed | Low | Mobile 유지 여부 |
| Screener Filter | criteria selection | User action | transient / URL candidate | Partial | Not Applicable | No | 일부 Elite | Observed / Partial | Medium | Back state 유지 여부 |
| Screener Result View | selected result view | User action | transient | Observed within Screener | Not Applicable | No | 일부 Elite | Observed | Medium | Stock Quote 이동 후 view 유지 여부 |
| Stock ticker Context | ticker, header, tabs | Product / URL | URL / page | Observed | No | No | 일부 Elite | Observed | Low within page | peer 이동 후 previous relation |
| Stock Quote Local Tab | analysis mode | User action | page / URL candidate | Partial | No | No | 일부 Elite | Observed entry | Medium | tab state persistence |
| News Source 이동 | original article | External Source | external page | No | No | No | No | Observed | High | Finviz return path |
| SEC Form 4 이동 | original filing | External Source | external page | No | No | No | No | Observed | High | filing summary in Finviz |
| Peer 이동 | related Stock | Product / URL | URL | current Stock changes | Not Applicable | No | No | Observed | Medium | relation reason 표시 |
| Portfolio | saved Stock set candidate | User Account | account | Not Verified | Not Verified | Yes | 일부 | Login Required | Medium | Watchlist vs holdings |
| Saved Screener | saved filter config | User Account | account | Not Verified | Not Verified | Yes | limits Elite | Documentation Only | Medium | free registered limits |
| Alert Rule | monitoring trigger | User Account | account | Not Verified | Not Verified | Yes | Yes | Elite Feature | High | trigger Source |
| Recent / History | recent ticker candidate | User / session | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | High | existence |
| Advertisement / Elite Conversion | subscription prompt state | Product / Account | session / account after subscription | Partial | Not Applicable | No | Yes | Observed / Pricing | Medium | post-conversion layout |

## Product Responsibility Matrix

| Product Element | Primary Responsibility | Secondary Responsibility | Surface | Tool | Entity | User-owned Entity | User State | Contextual Content | External Evidence | Capability |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Market Summary | multi-surface entry | Yes | No | No | No | No | Yes | No | No |
| Screener | Discovery Tool | comparison Surface | Yes | Yes | No | No | Partial | No | No | Yes |
| Screener Filter | criteria state | filter capability | No | No | No | No | Yes | No | No | Yes |
| Screener Result View | presentation state | comparison control | No | No | No | No | Yes | No | No | Yes |
| Maps | visual discovery Surface | Market compression | Yes | Yes | No | No | Partial | No | No | Yes |
| Heatmap Cell | Entity representation candidate | Navigation candidate | No | No | Candidate | No | No | No | No | Capability candidate |
| Groups | aggregate comparison Surface | Market structure view | Yes | Yes | No | No | Partial | No | No | Yes |
| Stock Quote | Stock hub | dense detail page | Yes | No | Stock anchor | No | Partial | Yes | No | Yes |
| Stock | Product Entity | ticker context | No | No | Yes | No | No | No | No | No |
| Company Display | display context | external company link | No | No | Candidate | No | No | Yes | External website candidate | No |
| Sector | classification Entity | group comparison axis | No | No | Yes | No | No | Yes | No | No |
| Industry | classification Entity | group comparison axis | No | No | Yes | No | No | Yes | No | No |
| News | Evidence Surface | Stock supporting content | Yes | No | Candidate | No | No | Yes | External Source link | No |
| Insider Transaction | Evidence row | Stock / filing bridge | Yes | No | Yes | No | No | No | SEC link | No |
| SEC Form 4 | External Evidence | filing validation | No | No | Yes | No | No | No | Yes | No |
| Portfolio | User-owned Entity candidate | saved Stock set / holdings candidate | Yes | No | Candidate | Yes | Yes | No | No | Yes |
| Saved Screener | saved filter config | reusable discovery state | No | No | No | Yes | Yes | No | No | Yes |
| Alert Rule | monitoring state | notification trigger | No | No | No | No | Yes | No | No | Yes |
| Advertisement | monetization unit | visual competition | No | No | No | No | Partial | Yes | No | No |
| Elite | Subscription Surface | entitlement state | Yes | No | Subscription Plan | No | Yes | No | No | Yes |
| Futures | Asset Class Surface | compact price context | Yes | Partial | Futures Contract | No | No | Yes | No | No |
| Forex | Asset Class Surface | compact price context | Yes | Partial | Currency Pair | No | No | Yes | No | No |
| Crypto | Asset Class Surface | compact price context | Yes | Partial | Crypto Asset | No | No | Yes | No | No |
| Calendar | Event Surface | timing context | Yes | Partial | Calendar Event | No | No | Yes | No | No |

## Cross Benchmark 준비 분류

### Shared Pattern

- Screener / Table-first Discovery: TradingView, Koyfin, Finviz에서 비교 가능하다.
- Source / Freshness Trust Signal: EidosLayer, TradingView, Koyfin, Finviz에서 모두 비교 가능하다.
- Stock / Symbol Context Hub: TradingView Symbol Page와 Finviz Stock Quote가 비교 대상이다.
- Watchlist 또는 Saved State continuity: EidosLayer, TradingView, Koyfin, Finviz에서 접근 제한과 함께 비교 가능하다.

### Variant Pattern

- Dense Single Page vs Dashboard composition: Finviz Stock Quote와 Koyfin My Dashboards가 다른 density control 방식을 보인다.
- Screener-centered Discovery vs Chart-centered Workspace: Finviz / Koyfin Screener와 TradingView Supercharts가 다르다.
- Heatmap visual discovery vs Home feed discovery: Finviz Maps와 EidosLayer Home / Feed가 다르다.
- External Evidence link vs embedded Evidence Surface: Finviz News / SEC external link와 TradingView Symbol documents가 비교 대상이다.

### Benchmark-specific Pattern

- Advertisement as Density Trade-off: Finviz에서 명확히 분리 기록됐다.
- Insider Transaction to SEC Form 4: Finviz에서 강하게 확인됐다.
- Simultaneous Disclosure 중심 Home: Finviz Home의 특징으로 기록한다.
- Public Dense Screener UX: Finviz에서 public access로 강하게 확인됐다.

### Potential Contradiction

- Finviz는 Dense Single Page를 강하게 쓰지만 Koyfin은 Dashboard composition과 saved layout을 강조한다. 두 구조가 같은 user benefit을 다른 방식으로 지원하는지 추가 Cross Validation이 필요하다.
- Finviz는 external Source routing이 강하지만 TradingView는 Symbol Context 안의 Documents tab을 제공한다. Evidence access와 Context Preservation 사이의 Trade-off를 비교해야 한다.

### Insufficient Evidence

- Maps dynamic Navigation
- Portfolio Persistence
- Alert Rule
- Mobile
- Recent / History
- Asset Class Detail
- Calendar detail and Source

## Do Not Copy

- Finviz의 dense Home을 DATE default로 확정하지 않는다.
- Heatmap Cell을 direct Navigation Unit으로 확정하지 않는다.
- Screener filter / column density를 novice Journey에 그대로 적용하지 않는다.
- Advertisement와 Elite upsell을 Product content처럼 취급하지 않는다.
- External Source link만으로 Evidence context가 보존된다고 보지 않는다.
- Portfolio, Saved Screener, Alert Rule을 실제 persistence가 확인된 Flow처럼 쓰지 않는다.
- Stock Quote의 Company display를 독립 Company Entity Surface로 확정하지 않는다.

## Open Question

- Maps cell click, hover, double-click이 current public UI에서 어떤 behavior를 만드는가.
- Groups에서 Sector to Industry to Stock drill-down이 가능한가.
- Screener filter state와 result view state는 Back Navigation에서 유지되는가.
- Stock Quote Filings tab은 SEC Filing과 어떤 depth로 연결되는가.
- Portfolio는 Watchlist인지 holdings Surface인지 확인해야 한다.
- Saved Screener와 Portfolio는 dynamic update behavior가 어떻게 다른가.
- Alert Rule은 어떤 Entity 또는 Surface에 attach되는가.
- Recent Stock 또는 History가 존재하는가.
- Mobile에서 dense table과 Heatmap이 어떻게 재구성되는가.
