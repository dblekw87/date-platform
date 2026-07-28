# Finviz Trust와 Evidence Observation 기록

## 문서 목적

이 문서는 Finviz의 Source, Timestamp, Freshness, External Evidence, Methodology, Public / Elite data 차이를 기록한다.

이번 문서는 공식 Product 화면과 공식 Help / FAQ / Blog / Elite 안내에서 확인 가능한 Trust Signal만 사용한다. 공식 Documentation을 실제 Product Interaction처럼 과장하지 않는다.

## Trust / Evidence Observation 요약

| 분류 | Observation 수 |
| --- | ---: |
| Strong Trust Signal | 4 |
| Supporting Trust Signal | 5 |
| Weak Trust Signal | 3 |
| Source Traceability | 3 |
| Filing Traceability | 2 |
| External Evidence Link | 3 |
| Methodology Gap | 4 |
| Freshness Gap | 3 |
| Access-dependent Trust | 5 |
| Not Verified | 4 |

## Trust Signal Inventory

| Trust ID | 항목 | 분류 | Evidence Type | Observation | Trust Contribution | Traceability | Limitation | DATE Implication | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-TR-001 | Quote Delay Disclosure | Strong Trust Signal / Freshness Signal | Official Product Observation / Official Documentation | Public footer와 FAQ는 NASDAQ, NYSE, AMEX stock quotes delayed 1 minute를 표시한다. FAQ는 Futures data delayed 20 minutes를 설명한다. | user가 price data Freshness를 오해하지 않도록 delay level을 공개한다. | market-level timing까지 가능하다. | 개별 Metric cell의 update timestamp는 Not Verified다. | DATE에서 Freshness는 Market, Asset Class, Metric별로 나눠 기록해야 한다. | High |
| FNV-TR-002 | Elite Real-time and Extended Hours | Access-dependent Trust | Official Documentation / Official Pricing | FAQ와 Elite는 Elite에서 real-time stock quotes, premarket 4:00 AM-9:30 AM, aftermarket 4:00 PM-8:00 PM, real-time Maps / intraday timeframes를 설명한다. | Public과 Elite의 timing 차이를 사전에 드러낸다. | plan-level / feature-level까지 가능하다. | 실제 Elite 화면에서 label이 어떻게 표시되는지는 Not Verified다. | Access-dependent Trust는 feature list와 in-product label을 분리해 검증해야 한다. | High |
| FNV-TR-003 | Screener Filter Definition | Strong Trust Signal / Methodology Signal | Official Documentation | Screener Help는 Exchange, Index, Sector, Industry, Market Cap, P/E, Forward P/E, PEG 등 filter definition과 formulas를 제공한다. | user는 Screener Metric 의미와 계산식을 확인할 수 있다. | documentation-level formula까지 가능하다. | result table cell에서 formula로 직접 이동하는 path는 Not Verified다. | Metric Methodology는 Help-only인지 item-level link인지 비교해야 한다. | High |
| FNV-TR-004 | Screener Update and Refresh | Supporting Trust Signal / Freshness Signal | Official Product Observation / Official Documentation | Screener result area는 Refresh 3min을 표시하고 FAQ는 fundamentals recalculated / updated every hour라고 설명한다. | result update expectation과 fundamental update cadence를 일부 제공한다. | Surface-level refresh와 data category level까지 가능하다. | filter별 update time, data vendor, stale-state label은 Not Verified다. | DATE에서 Surface refresh와 underlying data update를 구분해야 한다. | Medium |
| FNV-TR-005 | Sector / Industry Definition | Supporting Trust Signal | Official Documentation | Screener Help는 Company가 Sector로 나뉘고 같은 Sector 안에서 Industry로 further divided된다고 설명한다. | classification hierarchy 이해를 돕는다. | Documentation-level taxonomy definition까지 가능하다. | classification provider와 update timing은 Not Verified다. | Sector / Industry relation은 Entity model 확정 전 cross benchmark로 비교해야 한다. | High |
| FNV-TR-006 | Heatmap Size and Color Explanation | Supporting Trust Signal / Methodology Gap | Official Product Observation / Official Blog | official Map text는 size represents market cap을 설명한다. Blog는 Insider Transactions Map에서 blue/red color와 deeper color meaning, six-month measurement를 설명한다. | Heatmap visual encoding의 일부 rationale을 제공한다. | map-specific methodology 일부까지 가능하다. | 모든 Map type의 size / color methodology가 current UI에서 명시되는지는 Not Verified다. | Heatmap Methodology는 map type별로 개별 확인해야 한다. | Medium |
| FNV-TR-007 | Financial Metric Formula Coverage | Strong Trust Signal / Methodology Signal | Official Documentation | Screener Help는 valuation, profitability, liquidity, leverage 등 다수 Metric formulas와 sorting/export/appearance를 제공한다. | dense metric table을 해석할 수 있는 documentation backbone을 제공한다. | formula documentation까지 가능하다. | Stock Quote metric value에서 filing 또는 raw statement로 direct trace는 Not Verified다. | Financial Evidence는 formula, data source, filing trace를 분리해야 한다. | High |
| FNV-TR-008 | Stock Quote Timestamp and After-hours | Supporting Trust Signal | Official Product Observation / Official Documentation | Stock Quote header는 price timestamp와 Last Close / Aftermarket Close를 표시한다. FAQ는 Elite extended hours access를 설명한다. | quote 상태와 session context를 식별하게 한다. | Screen-level timestamp까지 가능하다. | premarket / aftermarket values의 item-level data provider는 Not Verified다. | DATE에서 trading session context를 separate Freshness field로 다뤄야 한다. | High |
| FNV-TR-009 | News Source and Timestamp | Strong Trust Signal / External Evidence Link | Official Product Observation | News page와 Stock Quote News list는 timestamp, Source label, external URL link를 표시한다. | headline을 열기 전 publisher와 recency를 판단할 수 있다. | external article URL까지 가능하다. | News 원문에서 Finviz Stock Context로 돌아오는 preserved path는 Not Verified다. | News Evidence는 original URL과 internal context recovery를 함께 검증해야 한다. | High |
| FNV-TR-010 | News Category and Media Source Customization | Access-dependent Trust / Weak Trust Signal | Official Product Observation / Official Pricing | News는 Market News, Market Pulse, Stocks News, ETF News, Crypto News, Time / Source view를 제공한다. Elite는 Customize Media Sources를 포함한다. | category와 Source view는 scan-level trust를 돕고 Elite는 media filtering control을 제공한다. | category/source level까지 가능하다. | Source ranking, editorial criteria, provider coverage는 Not Verified다. | News provider scope와 user preference를 Evidence metadata와 구분해야 한다. | Medium |
| FNV-TR-011 | Insider SEC Form 4 Link | Strong Trust Signal / Filing Traceability | Official Product Observation | Insider table row는 SEC Form 4 external link를 제공한다. | Insider Transaction에서 original regulatory filing으로 이동할 수 있다. | filing URL까지 가능하다. | SEC external 이동 후 Finviz context는 손실된다. | Filing Traceability는 strong signal이지만 context preservation은 별도 issue다. | High |
| FNV-TR-012 | Insider Transaction Fields | Supporting Trust Signal | Official Product Observation | Insider row는 Ticker, Owner, Relationship, Date, Transaction, Cost, Shares, Value, Shares Total, SEC Form 4를 포함한다. | Transaction meaning을 row 단위로 판단할 metadata를 제공한다. | transaction field level까지 가능하다. | Owner detail, transaction history, filing parsing은 Not Verified다. | Insider Person, Transaction, Stock, SEC Filing을 분리해 비교해야 한다. | High |
| FNV-TR-013 | Calendar Evidence | Weak Trust Signal / Not Verified | Official Product Observation | Home Calendar block과 Calendar URL을 확인했다. Economic release와 earnings release table 일부가 Home에 보인다. | Event timing context를 제공한다. | Event date/time level까지 일부 가능하다. | source, update time, Event detail, Stock link는 Not Verified다. | Calendar Evidence는 Event taxonomy와 related Stock link를 추가 확인해야 한다. | Medium |
| FNV-TR-014 | Portfolio and Saved Data Account Link | Access-dependent Trust | Official Documentation / Official Pricing | FAQ는 saved data가 account email에 linked되고 renewal 후 accessible하다고 설명한다. Elite는 Portfolio 100, Tickers per Portfolio 500을 표시한다. | saved state continuity의 account basis를 공개한다. | account / plan level까지 가능하다. | Portfolio 내부 fields와 persistence behavior는 Login Required다. | Portfolio, Saved Screener, Alert Rule을 separate User State로 검증해야 한다. | Medium |
| FNV-TR-015 | Export / API Access | Access-dependent Trust | Official Pricing | Elite는 Export to Excel / CSV, APIs access를 표시한다. | data audit 또는 external workflow 가능성이 plan에 따라 달라짐을 드러낸다. | plan-level feature까지 가능하다. | API field-level Source, export restriction, auth flow는 Not Verified다. | Evidence retention과 export entitlement를 separate 비교 field로 둬야 한다. | Medium |
| FNV-TR-016 | Advertisement Trust Risk | Advertisement Trust Risk / Access-dependent Trust | Official Product Observation / Official Pricing | Public page는 tracking iframe을 포함하고 Elite는 No Ads를 포함한다. | No Ads는 visual competition과 ad-origin confusion을 줄일 수 있다. | feature-level까지 가능하다. | actual ad content, placement, navigation confusion은 정량 확인하지 않았다. | Advertisement는 capability가 아니라 Trust / Density risk로 분리해야 한다. | Medium |

## Market / Quote Source 기록

Observation:
FAQ는 Finviz가 NASDAQ, NYSE, AMEX를 cover한다고 설명하고 public stock quote delay 1 minute, Futures delay 20 minutes, Elite real-time stock quote를 설명한다. Stock Quote header는 timestamp와 Last Close / Aftermarket Close를 표시한다.

Evidence Type:
Official Product Observation / Official Documentation

Trust Contribution:
user가 price data timing과 exchange coverage를 이해할 수 있다.

Traceability:
market-level timing과 Screen-level timestamp까지 가능하다. item-level provider는 Not Verified다.

Limitation:
Data Provider name과 Metric별 raw Source는 이번 조사 범위에서 확인되지 않았다.

DATE Implication:
Freshness는 quote label, session state, plan entitlement, underlying update cadence로 분리해야 한다.

Confidence:
High

## Screener Evidence 기록

Observation:
Screener Help는 filter definition과 formulas를 광범위하게 제공한다. Screener page는 Refresh 3min, filter category, result view, Save as Portfolio, Create Alert를 표시한다.

Evidence Type:
Official Product Observation / Official Documentation

Trust Contribution:
filter와 Metric 의미를 Help에서 확인할 수 있어 high-density table의 해석을 보조한다.

Traceability:
documentation-level formula까지 가능하다.

Limitation:
result value에서 formula 또는 filing으로 direct drill-down하는 path는 Not Verified다.

DATE Implication:
Screener Metric Traceability는 definition link, data Source, value-to-filing trace를 별도 단계로 검증해야 한다.

Confidence:
High

## Heatmap Methodology 기록

Observation:
official Map text는 S&P 500 stocks categorized by sectors and industries와 size represents market cap을 설명한다. Blog는 Market Capitalization Heatmap, Themes Map, Insider Transactions Map, responsive Maps, free Heat Maps, Elite real-time / intraday maps를 설명한다.

Evidence Type:
Official Product Observation / Official Blog

Trust Contribution:
Heatmap size, color, grouping의 일부 meaning을 확인할 수 있다.

Traceability:
map-level methodology 일부까지 가능하다.

Limitation:
current UI에서 모든 map filter의 methodology를 user가 즉시 확인할 수 있는지는 Not Verified다.

DATE Implication:
Heatmap은 Chart로 뭉뚱그리지 않고, visual encoding과 Navigation unit을 따로 확인해야 한다.

Confidence:
Medium

## Financial Evidence 기록

Observation:
Stock Quote Overview는 dense metric table을 표시하고 Screener Help는 many financial formulas를 제공한다. Stock Quote tabs는 Financials, Options, Filings를 포함한다.

Evidence Type:
Official Product Observation / Official Documentation

Trust Contribution:
Metric definition은 Help에서 보완 가능하고, Filings tab은 official document path 후보를 제공한다.

Traceability:
formula documentation까지 가능하다. filing-level trace는 Stock Quote Filings body를 직접 확인하지 않아 Partial이다.

Limitation:
Reported / Estimated, Historical / Forward, ownership / ETF holder Source, Options Source는 item-level로 확인하지 못했다.

DATE Implication:
Financial Evidence는 Metric formula와 official filing trace를 같은 것으로 취급하면 안 된다.

Confidence:
Medium

## News Evidence 기록

Observation:
News page와 Stock Quote News list는 Source label, timestamp, headline, external link를 표시한다.

Evidence Type:
Official Product Observation

Trust Contribution:
original article traceability가 headline list에서 시작된다.

Traceability:
external article URL까지 가능하다.

Limitation:
external Source로 이동하면 Finviz Stock Context가 보존되지 않는다. Related ticker linkage는 일부만 확인됐다.

DATE Implication:
News Evidence는 external Source traceability와 context recovery cost를 함께 기록해야 한다.

Confidence:
High

## Insider / SEC Filing Evidence 기록

Observation:
Insider row는 Stock ticker와 SEC Form 4 link를 함께 제공한다. Transaction fields는 date, type, cost, shares, value를 포함한다.

Evidence Type:
Official Product Observation

Trust Contribution:
Insider activity를 Finviz table로 scan한 뒤 original SEC filing으로 검증할 수 있다.

Traceability:
SEC Form 4 external filing까지 가능하다.

Limitation:
Owner detail과 filing parsing, transaction rationale는 Not Verified다.

DATE Implication:
Insider Transaction, Insider Person, SEC Filing, Stock Quote 관계는 separate Entity / Evidence relation으로 유지해야 한다.

Confidence:
High

## Elite Transparency 기록

Observation:
Elite page와 FAQ는 real-time data, No Ads, Advanced Screener, alerts, Export / API, Screener presets 200, Portfolio limits, layout customization, Customize Media Sources, statements 8 years를 표시한다.

Evidence Type:
Official Pricing / Official Documentation

Trust Contribution:
Public과 Elite의 data timing, saved state, customization, export access 차이를 user가 사전에 알 수 있다.

Traceability:
plan-level feature comparison까지 가능하다.

Limitation:
actual product gate message와 free registered limits는 Not Verified다.

DATE Implication:
Public / Elite Transparency는 user trust와 personal continuity에 동시에 영향을 주므로 separate field로 비교해야 한다.

Confidence:
High

## Evidence Gap Inventory

- Stock Quote metric value에서 original filing 또는 raw statement로 direct trace되는지는 Not Verified다.
- Data Provider name은 FAQ와 Product Observation 범위에서 확인하지 못했다.
- Heatmap filter별 color / size methodology가 current UI에서 일관되게 표시되는지는 Not Verified다.
- News에서 Sector 또는 Industry로 internal transition되는지는 Not Verified다.
- Calendar Event source, update time, related Stock link는 Not Verified다.
- Portfolio, Saved Screener, Alert Rule의 actual persistence와 audit trail은 Login Required 또는 Elite Feature다.
- Advertisement placement와 content-origin confusion impact는 정량 확인하지 않았다.
