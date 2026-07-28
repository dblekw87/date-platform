# Finviz Information Density Observation 기록

## 문서 목적

이 문서는 Finviz가 Home, Screener, Maps, Groups, Stock Quote, News, Insider, Asset Class Surface에서 Information Density를 구성하는 방식을 기록한다.

이번 문서는 Phase 4.1과 Phase 4.2 Observation, Finviz 공식 Help / FAQ / Blog / Elite 안내만 사용한다. Candidate Principle, Registry 업데이트, DATE Architecture 제안은 수행하지 않는다.

## Information Density Observation 요약

| 분류 | Observation 수 |
| --- | ---: |
| Density Enabler | 5 |
| Density Control | 4 |
| Density Risk | 4 |
| Comparison Pattern | 4 |
| Scan Pattern | 4 |
| Drill-down Pattern | 4 |
| Simultaneous Disclosure | 4 |
| Advertisement Interference | 2 |
| Not Verified | 3 |

## Density Pattern Inventory

| Density ID | Pattern | 분류 | Surface | Observation Status | Observation | Interpretation | User Impact | Potential Trade-off | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-DEN-001 | Home Dense Market Summary | Simultaneous Disclosure / Scan Pattern | Home | Observed | Home은 Market breadth, Signal lists, Heatmap area, Headlines, Major News, Calendar, Insider, Futures / Forex summary를 같은 Screen에 배치한다. | Home은 단일 entry page가 아니라 여러 판단 단위를 동시에 노출하는 Dense Market Summary로 작동할 수 있다. | 사용자는 오늘의 broad movement, Stock Signal, News, Event, Insider activity를 한 번에 scan할 수 있다. | 신규 사용자는 어떤 block을 먼저 봐야 하는지 스스로 판단해야 한다. | Official Product Observation: https://finviz.com/. Access Date: 2026-07-28. | High |
| FNV-DEN-002 | Home Repeated List Grammar | Density Enabler / Scan Pattern | Home | Observed | Home의 Signal, News, Calendar, Insider, asset class summary는 compact table 또는 list pattern을 반복한다. | 반복 grammar는 많은 정보 group을 제공하면서도 읽는 방식을 학습시키는 장치일 수 있다. | 익숙한 사용자는 row와 timestamp, ticker, change value를 빠르게 비교할 수 있다. | list마다 Primary Entity가 달라 first scan 비용이 생긴다. | Official Product Observation: https://finviz.com/. Access Date: 2026-07-28. | High |
| FNV-DEN-003 | Screener Filter and Result Co-location | Density Enabler / Comparison Pattern | Screener | Observed | Screener는 filter category, Tickers input, result view tabs, result count, result table을 같은 Surface에 표시한다. | filter 조정과 result 확인을 분리하지 않아 반복 discovery cycle을 짧게 만드는 구조로 보인다. | 사용자는 criteria를 바꾸고 즉시 Stock set을 비교할 수 있다. | Descriptive, Fundamental, Technical filter 의미를 모르면 높은 density가 learning cost가 된다. | Official Product Observation: https://finviz.com/screener. Official Documentation: https://finviz.com/help/screener. Access Date: 2026-07-28. | High |
| FNV-DEN-004 | Screener Result View Switch | Density Control / Comparison Pattern | Screener | Observed | Overview, Valuation, Financial, Ownership, Performance, Technical, ETF, Charts, News, Snapshot, Maps view가 같은 result context를 다른 Information Form으로 바꾼다. | 하나의 Stock set을 table, chart, snapshot, heatmap으로 재표현해 overloading을 조절하는 장치일 수 있다. | 사용자는 비교 목적에 맞게 column-heavy table과 visual view를 전환할 수 있다. | view state가 Stock Quote 이동 뒤 유지되는지는 Not Verified다. | Official Product Observation: https://finviz.com/screener?ft=4&v=111. Access Date: 2026-07-28. | High |
| FNV-DEN-005 | Screener Saved State Conversion | Density Control / Access-dependent Pattern | Screener, Portfolio, Alert | Partially Observed / Login Required / Elite Feature | Screener는 My Presets, Save as Portfolio, Create Alert action을 표시한다. Help는 preset 저장을 설명하고 Elite는 presets 200, alerts, Portfolio limits를 표시한다. | 높은 criteria density를 반복 가능한 User State로 바꿀 가능성이 있다. | Public user는 discovery와 comparison은 가능하지만 persistence와 monitoring은 제한된다. | 실제 saved Screener, Portfolio state, Alert Rule 생성 방식은 Not Verified다. | Official Product Observation: https://finviz.com/screener. Official Documentation: https://finviz.com/help/screener. Official Pricing: https://finviz.com/elite. | Medium |
| FNV-DEN-006 | Heatmap Entity Compression | Density Enabler / Drill-down Pattern | Maps | Partially Observed / Official Blog | 공식 Map text와 Blog는 S&P 500, Dow Jones 30, Nasdaq 100, Russell 2000, All Stocks, Market Cap, World, ETFs, Crypto, Futures, Themes 같은 map options를 설명한다. Size는 market cap 또는 selected map의 size criterion을 표현하고 color는 performance 또는 map-specific activity를 표현한다. | Heatmap은 many Stock 또는 group relationship을 color, size, location으로 압축하는 structure다. | 사용자는 Sector / Industry / market-cap category 안에서 relative movement를 빠르게 볼 수 있다. | small cell readability와 color encoding 학습 비용이 있다. 현재 dynamic cell interaction은 Partial이다. | Official Product Observation / indexed text: https://finviz.com/map. Official Blog: https://finviz.com/blog/new-stock-market-maps-for-market-cap-52-week-highs-lows-themes-and-insider-trading/. | Medium |
| FNV-DEN-007 | Maps as Navigation Unit Candidate | Drill-down Pattern / Not Verified | Maps | Partially Observed | 공식 indexed text는 hover, zoom, pan, double-click detail, ticker search를 설명한다. | Heatmap cell은 Visualization뿐 아니라 Entity Navigation Unit으로 작동할 가능성이 있다. | 사용자는 broad scan에서 Stock Quote 또는 group context로 내려갈 수 있다. | 이번 조사에서 click / double-click을 직접 조작하지 않아 Navigation depth는 Not Verified다. | Official Product Observation / indexed text: https://finviz.com/map. Official Blog: https://finviz.com/blog/evolving-the-heatmap-dow-jones-nasdaq-100-russell-2000-and-more/. | Medium |
| FNV-DEN-008 | Groups Aggregate Comparison | Comparison Pattern / Density Control | Groups | Partially Observed | Groups는 Group, Order By, Overview, Valuation, Performance, Custom, Performance Chart, Spectrum, Charts, Maps tabs를 제공한다. | Groups는 Stock row 전 단계에서 Sector, Industry, Country, Capitalization 단위를 aggregate metric으로 비교하는 Surface로 보인다. | 사용자는 broad rotation과 group-level strength를 table, bar, chart, map으로 비교할 수 있다. | Sector to Industry to Stock drill-down은 Not Verified다. | Official Product Observation: https://finviz.com/groups. Official Documentation indexed text. Access Date: 2026-07-28. | Medium |
| FNV-DEN-009 | Stock Quote Dense Entity Hub | Simultaneous Disclosure / Density Enabler | Stock Quote | Observed | Stock Quote는 header summary, price / timestamp, tabs, Sector, Industry, Country, peers, ETF holders, metrics, ratings, News를 같은 Stock Context에 배치한다. | Stock Quote는 page transition을 줄이기 위해 많은 evidence candidate와 related Entity를 single dense page 안에 모으는 structure로 보인다. | 사용자는 Stock context를 유지하며 valuation, technical, ownership, ratings, News를 한 화면에서 scan할 수 있다. | Company와 Stock boundary가 한 header 안에서 혼재될 수 있고, ad / upsell이 상단 context와 경쟁한다. | Official Product Observation: https://finviz.com/stock?t=AAPL. Access Date: 2026-07-28. | High |
| FNV-DEN-010 | Stock Quote Tabs as Density Control | Density Control / Drill-down Pattern | Stock Quote | Observed | Overview, Compare, Short Interest, Financials, Options, Filings tab이 Stock Quote local navigation으로 표시된다. | Overview는 Simultaneous Disclosure이고 tabs는 Progressive Disclosure 역할을 함께 수행한다. | 사용자는 기본 scan 후 Financials, Options, Filings 같은 depth로 이동할 수 있다. | tab 이동 후 previous scroll, previous related Entity context 유지 여부는 Not Verified다. | Official Product Observation: https://finviz.com/stock?t=AAPL. Access Date: 2026-07-28. | High |
| FNV-DEN-011 | News Headline Source Stack | Scan Pattern / Evidence-adjacent Pattern | News | Observed | News는 category, News / Blogs split, View by Time / Source, timestamp, external Source label을 repeated headline list로 표시한다. | News List는 deep analysis보다 Source와 time 중심 scan에 최적화된 structure로 보인다. | 사용자는 headline을 열기 전 publisher와 recency를 보고 우선순위를 정할 수 있다. | original article로 이동하면 Finviz context가 손실된다. | Official Product Observation: https://finviz.com/news. Access Date: 2026-07-28. | High |
| FNV-DEN-012 | Insider Transaction Row Density | Comparison Pattern / Drill-down Pattern | Insider | Observed | Insider table은 Ticker, Owner, Relationship, Date, Transaction, Cost, Shares, Value, Shares Total, SEC Form 4를 row 단위로 표시한다. | Transaction-first row는 insider anomaly scan과 original SEC filing access를 동시에 지원한다. | 사용자는 row 하나에서 Stock, Person, Transaction, value, filing link를 비교할 수 있다. | Person context와 company context는 row 안에서 충분히 설명되지 않을 수 있다. | Official Product Observation: https://finviz.com/insidertrading. Access Date: 2026-07-28. | High |
| FNV-DEN-013 | Asset Class Compact Summary | Scan Pattern / Not Verified | Futures, Forex, Crypto | Partially Observed | Home은 Futures, Forex & Bonds, BTC/USD 같은 compact rows를 보여준다. Futures page는 delay disclosure를 표시한다. Forex와 Crypto detail body는 제한적으로 확인됐다. | Asset Class pages는 Stock 중심 density grammar를 일부 공유할 수 있지만 detail pattern은 확정할 수 없다. | 사용자는 Stock Surface 밖의 price context를 Home에서 함께 볼 수 있다. | Futures / Forex / Crypto detail drill-down, chart, table structure는 Not Verified다. | Official Product Observation: https://finviz.com/, https://finviz.com/futures, https://finviz.com/forex, https://finviz.com/crypto. | Low to Medium |
| FNV-DEN-014 | Public Advertisement and Elite No Ads | Advertisement Interference / Density Risk | Public Surface, Elite | Observed / Official Pricing | Public page에서 tracking iframe이 확인되고, Elite 안내는 No Ads를 feature로 표시한다. | 광고 제거는 단순 convenience가 아니라 high-density Surface에서 content competition을 낮추는 Density Control로 작동할 수 있다. | Public user는 content scan 중 ad / upsell과 product content가 경쟁할 수 있다. Elite user는 같은 Surface에서 clutter가 줄어들 가능성이 있다. | 실제 ad placement, layout shift, visual stability impact는 정량 검증하지 않았다. | Official Product Observation: public pages footer / iframe. Official Pricing: https://finviz.com/elite. | Medium |
| FNV-DEN-015 | Mobile Density Risk | Density Risk / Not Verified | Mobile Navigation | Not Verified | 이번 조사에서 mobile 또는 responsive Navigation을 직접 확인하지 않았다. 공식 Blog는 Maps responsive design improvement를 설명한다. | desktop dense tables와 heatmap pattern이 mobile에서 그대로 유지되는지 판단할 수 없다. | mobile user의 scan efficiency와 cognitive cost는 별도 검증이 필요하다. | desktop Observation을 mobile product pattern으로 확장하면 안 된다. | Official Blog: https://finviz.com/blog/evolving-the-heatmap-dow-jones-nasdaq-100-russell-2000-and-more/. | Low |

## Surface별 Density 기록

### Home Density

Observation:
Home은 Market breadth, Signal lists, Heatmap area, Headlines, Major News, Calendar, Insider, Futures / Forex summary를 동시에 배치한다.

Interpretation:
Home은 Progressive Disclosure보다 Simultaneous Disclosure를 강하게 사용한다. 여러 정보 group을 숨기지 않고 한 Screen에 배치한 뒤, 반복 table / list grammar로 scan cost를 낮추는 structure로 보인다.

User Impact:
Decision Speed는 높아질 수 있다. Comparison Efficiency는 Signal list와 table block에서 높고, first-time cognitive load는 높다.

Potential Trade-off:
Entry Point가 명확한 단일 action보다 broad scan에 가깝기 때문에 novice user는 priority를 스스로 만들어야 한다. Advertisement와 Elite upsell은 visible density와 경쟁할 수 있다.

Evidence:
Official Product Observation, https://finviz.com/, 확인일 2026-07-28.

Confidence:
High

### Screener Density

Observation:
Screener는 Descriptive, Fundamental, Technical, News, ETF, All filter category와 result view tabs, result table, Save as Portfolio, Create Alert, Refresh 3min을 같은 Surface에 표시한다.

Interpretation:
Screener는 filter density를 result table과 붙여 decision loop를 짧게 만든다. Result view switch는 같은 result set의 density를 table, chart, snapshot, map 형태로 제어한다.

User Impact:
전문 user는 많은 Stock을 같은 criteria로 빠르게 비교할 수 있다. novice user는 filter definition과 Metric formula를 Help에서 확인해야 한다.

Potential Trade-off:
Saved Screener와 Alert가 없으면 high-density query를 반복 재사용하기 어렵다. 이 persistence는 Login Required 또는 Elite Feature와 연결된다.

Evidence:
Official Product Observation, https://finviz.com/screener. Official Documentation, https://finviz.com/help/screener. 확인일 2026-07-28.

Confidence:
High

### Maps / Heatmap Density

Observation:
Maps는 Stock 또는 group-like entity를 cell로 압축하고, official text / Blog는 map filter, size, color, hover, ticker search, zoom / pan, double-click detail을 설명한다.

Interpretation:
Heatmap은 Visualization이면서 Navigation Unit 후보이다. Cell size와 color는 table column을 공간 / 색상으로 전환하는 compression pattern이다.

User Impact:
사용자는 Market structure를 한 화면에서 비교할 수 있다. 작은 cell과 color scale은 learning cost와 readability risk를 만든다.

Potential Trade-off:
Dynamic interaction을 직접 확인하지 못했으므로 drill-down 효율은 Partial이다. Methodology 설명이 UI에서 충분히 보이는지도 Not Verified다.

Evidence:
Official Product Observation / indexed text, https://finviz.com/map. Official Blog, Maps update posts. 확인일 2026-07-28.

Confidence:
Medium

### Groups Density

Observation:
Groups는 Sector, Industry, Country, Capitalization group comparison을 table, chart, spectrum, maps view로 전환하는 controls를 제공한다.

Interpretation:
Groups는 Maps보다 quantitative comparison에 가깝고, Screener보다 aggregate Market structure 이해에 가까운 중간 Surface로 보인다.

User Impact:
사용자는 Stock list로 내려가기 전에 group performance, valuation, technical view를 비교할 수 있다.

Potential Trade-off:
Sector to Industry to Stock drill-down이 직접 확인되지 않아 group insight를 Stock action으로 전환하는 비용이 남는다.

Evidence:
Official Product Observation, https://finviz.com/groups. 확인일 2026-07-28.

Confidence:
Medium

### Stock Quote Density

Observation:
Stock Quote는 price, chart, metric table, analyst ratings, News, peers, ETF holders, Sector, Industry, tabs를 같은 ticker context에 배치한다.

Interpretation:
Stock Quote는 Dense Single Page와 tab-based Hub를 혼합한다. Overview는 simultaneous scan을 제공하고 tabs는 deeper content를 분리한다.

User Impact:
Page Transition이 줄고 Stock context가 유지된다. External News, SEC Filing, peer transition에서는 previous context가 손실될 수 있다.

Potential Trade-off:
Metric priority가 매우 많아 user가 자신의 판단 framework를 가져와야 한다. Advertisement 또는 upsell은 top context와 경쟁할 수 있다.

Evidence:
Official Product Observation, https://finviz.com/stock?t=AAPL. 확인일 2026-07-28.

Confidence:
High

### News Density

Observation:
News는 category, Time / Source view, timestamp, Source label, headline list를 반복한다. Stock Quote 내부에도 Stock-specific News list가 있다.

Interpretation:
News는 scan-first Surface이며 analysis body는 external Source에 위임하는 structure로 보인다.

User Impact:
사용자는 여러 publisher headline을 한 화면에서 비교할 수 있다. external transition 후 Finviz context는 손실된다.

Potential Trade-off:
News와 Stock price move의 causal connection은 자동으로 설명되지 않는다.

Evidence:
Official Product Observation, https://finviz.com/news, https://finviz.com/stock?t=AAPL. 확인일 2026-07-28.

Confidence:
High

### Insider Density

Observation:
Insider는 transaction table row 안에 Person, Stock, relationship, transaction type, value, date, SEC Form 4를 함께 배치한다.

Interpretation:
Insider는 evidence row density가 높은 Surface다. Transaction-first structure는 unusual activity scan에 적합하다.

User Impact:
사용자는 row 단위로 Stock Quote와 SEC Filing을 열 수 있다.

Potential Trade-off:
Person history, company context, transaction rationale는 row만으로 충분하지 않을 수 있다.

Evidence:
Official Product Observation, https://finviz.com/insidertrading. 확인일 2026-07-28.

Confidence:
High

### Advertisement Density

Observation:
Public Surface에서 tracking iframe이 확인됐고 Elite는 No Ads를 표시한다. Stock Quote에는 Elite upsell이 top area에서 확인된다.

Interpretation:
Advertisement는 Public Surface에서 product content와 visual competition을 만들 수 있다. No Ads는 high-density UI의 density control feature일 수 있다.

User Impact:
Public user는 scan sequence가 ad 또는 upsell에 의해 끊길 수 있다. Elite user는 content-only density를 얻을 가능성이 있다.

Potential Trade-off:
ad placement와 layout shift는 이번 조사에서 정량화하지 않았다.

Evidence:
Official Product Observation, public Finviz pages. Official Pricing, https://finviz.com/elite. 확인일 2026-07-28.

Confidence:
Medium

## Open Question

- Maps cell click, hover, double-click의 현재 public interaction을 직접 확인해야 한다.
- Screener view state와 filter state가 Stock Quote 이동 후 Back Navigation에서 유지되는지 확인해야 한다.
- Groups에서 group comparison이 Stock list 또는 Stock Quote로 직접 내려가는지 확인해야 한다.
- Stock Quote의 Options, Filings, Financials tab body density는 별도 확인이 필요하다.
- public ad placement와 Elite No Ads의 실제 layout 차이는 정량 확인이 필요하다.
- mobile viewport에서 dense table, Heatmap, Stock Quote가 어떻게 재구성되는지 확인해야 한다.
