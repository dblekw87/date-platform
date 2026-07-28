# Finviz Entity와 State Observation 기록

## 문서 목적

이 문서는 Finviz에서 확인된 Entity Candidate와 User State Candidate를 분리해 기록한다.

이번 문서는 DATE Entity Architecture를 확정하지 않는다. Finviz Product 화면과 공식 Documentation에서 확인 가능한 분류와 관계만 기록한다.

## 분류 기준

| 분류 | 기준 |
| --- | --- |
| Product Entity | Finviz Product에서 독립 분석 대상, 분류 단위, 또는 link target으로 작동할 수 있는 단위 |
| User-owned Entity | 사용자가 계정 안에서 만들거나 저장할 수 있는 지속적 Product 단위 |
| User State | filter, view, membership, alert, layout, entitlement처럼 저장되거나 session / account에 연결될 수 있는 상태 |
| Surface | 사용자가 인식하는 주요 Product 접근 단위 |
| Tool | 특정 분석 작업을 수행하는 기능 중심 Surface |
| Capability | Surface 안에서 수행되는 특정 기능 |
| Contextual Content | 현재 Entity나 Surface를 보조하는 content block |
| External Evidence | Finviz 밖의 Source로 이동하는 Evidence |

## Entity Candidate Inventory

| Candidate ID | Entity Candidate | 분류 | Observation Status | 확인된 역할 | Related Surface | Evidence Type | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-ENT-001 | Market | Product Entity Candidate | Observed | Home, Maps, Groups, Calendar, asset class summary의 상위 context다. | Home, Maps, Groups | Official Product Observation | https://finviz.com/ | High | Market taxonomy의 exact hierarchy 확인 필요. |
| FNV-ENT-002 | Stock | Product Entity Candidate | Observed | Screener result row, Stock Quote, News, Insider, Maps candidate의 핵심 target이다. | Screener, Stock Quote, Insider, Home | Official Product Observation | Screener rows, AAPL Stock Quote, Insider table | High | Stock와 Security 용어가 Finviz UI에서 어떻게 구분되는지 확인 필요. |
| FNV-ENT-003 | Company | Product Entity Candidate | Observed | Stock Quote에서 company name과 external company website link로 표시된다. | Stock Quote | Official Product Observation | AAPL page company link | Medium | Company가 Finviz 내부 독립 Entity인지 Not Verified. |
| FNV-ENT-004 | Security | Product Entity Candidate | Inference | Stock, ETF, possibly futures / crypto를 포괄하는 분석 대상 후보로 보인다. | Screener, Stock Quote, Asset Class pages | Inference | 공식 UI는 Stock, ETF, Futures, Forex, Crypto를 분리 표기 | Low | Finviz 공식 용어로 Security가 Product Entity인지 확인 필요. |
| FNV-ENT-005 | Sector | Product Entity Candidate | Observed | Screener filter, Stock Quote classification, Groups comparison 단위다. | Screener, Stock Quote, Groups, Maps | Official Product Observation / Official Documentation | Screener filters, Help Screener, AAPL page | High | Sector page와 group drill-down 확인 필요. |
| FNV-ENT-006 | Industry | Product Entity Candidate | Observed | Sector보다 낮은 Stock classification이며 Screener filter와 Stock Quote classification에 표시된다. | Screener, Stock Quote, Groups | Official Product Observation / Official Documentation | Screener filters, Help Screener, AAPL page | High | Industry link target 확인 필요. |
| FNV-ENT-007 | Country | Product Entity Candidate | Observed | Screener filter, Stock Quote classification, Groups candidate 단위다. | Screener, Stock Quote, Groups | Official Product Observation / Official Documentation | Screener filters, AAPL page | High | Country group page drill-down 확인 필요. |
| FNV-ENT-008 | Exchange | Product Entity Candidate | Observed | Screener filter와 Stock Quote exchange label에 사용된다. | Screener, Stock Quote | Official Product Observation / Official Documentation | Screener Exchange filter, AAPL NASD label | High | Exchange detail Surface는 Not Verified. |
| FNV-ENT-009 | News | Product Entity Candidate / Contextual Content | Observed | News Surface item, Home Headlines, Stock Quote News list로 표시된다. | News, Home, Stock Quote | Official Product Observation | News page, AAPL News list | High | News item internal detail page는 Not Verified. |
| FNV-ENT-010 | Insider Transaction | Product Entity Candidate / External Evidence Bridge | Observed | Insider table의 row 단위이며 Stock, Insider Person, SEC Form 4를 연결한다. | Insider, Home | Official Product Observation | Insider table | High | transaction detail page 존재 확인 필요. |
| FNV-ENT-011 | Insider Person | Product Entity Candidate | Partially Observed | Insider table Owner column에 표시된다. | Insider | Official Product Observation | Insider Owner link | Medium | Owner Detail Surface와 person history 확인 필요. |
| FNV-ENT-012 | SEC Filing | External Evidence | Observed | Insider transaction row의 SEC Form 4 external Source다. | Insider, Stock Quote Filings candidate | Official Product Observation | SEC Form 4 link | High | Finviz 내부 filing tab과 SEC filing relation 확인 필요. |
| FNV-ENT-013 | Calendar Event | Product Entity Candidate | Partially Observed | Home economic releases와 earnings release table에 표시된다. | Home, Calendar, Stock Quote Earnings | Official Product Observation | Home Calendar tables, Calendar URL | Medium | Calendar detail Surface 확인 필요. |
| FNV-ENT-014 | Futures Contract | Product Entity Candidate | Partially Observed | Futures page heading과 Home Futures summary row에 표시된다. | Futures, Home | Official Product Observation | Futures page, Home Futures table | Medium | contract detail Surface 확인 필요. |
| FNV-ENT-015 | Currency Pair | Product Entity Candidate | Partially Observed | Forex page heading과 Home Forex & Bonds rows에 표시된다. | Forex, Home | Official Product Observation | Forex page, Home EUR/USD row | Low | pair detail Surface 확인 필요. |
| FNV-ENT-016 | Crypto Asset | Product Entity Candidate | Partially Observed | Crypto page heading, Crypto News category, Home BTC/USD row에 표시된다. | Crypto, News, Home, Maps candidate | Official Product Observation | Crypto page, News category, Home row | Low | Crypto asset detail Surface 확인 필요. |
| FNV-ENT-017 | Strategy | Tool Entity Candidate | Not Verified | Backtests가 존재한다면 strategy validation target일 수 있다. | Backtests | Inference | direct Backtests UI Not Verified, Elite-related indexed text only | Low | current Backtests access path 확인 필요. |
| FNV-ENT-018 | Portfolio | User-owned Entity Candidate | Login Required | account에 저장되는 Stock set 또는 holdings candidate다. | Portfolio, Screener, Elite | Official Product Observation / Official Pricing / Official Blog | Portfolio redirect, Elite limits, portfolio flag Blog | Medium | Watchlist인지 holdings management인지 direct UI 확인 필요. |
| FNV-ENT-019 | Subscription Plan | Product Entity Candidate | Observed | feature access, data freshness, saved count, no ads, export/API entitlement를 결정한다. | Elite / Pricing, Login | Official Pricing | https://finviz.com/elite | High | registered free limits 최신 UI 확인 필요. |
| FNV-ENT-020 | User Account | User-owned Entity Candidate | Observed | Login, Register, saved data, subscription state의 owner다. | Authentication, Portfolio, Elite | Official Product Observation / Official Documentation | Login/Register, FAQ | High | post-login landing 확인 필요. |

## User State Candidate Inventory

| State ID | User State Candidate | 연결 Entity / Surface | Observation Status | 저장되거나 유지되는 내용 | Access Restriction | Evidence Type | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-ST-001 | Screener Filter | Screener, Stock | Observed | Descriptive, Fundamental, Technical, News, ETF criteria | Public. custom ranges / filters 일부 Elite | Official Product Observation / Official Documentation | Screener page, Help Screener | High | URL parameter와 session state boundary 확인 필요. |
| FNV-ST-002 | Screener View | Screener Result | Observed | Overview, Valuation, Financial, Ownership, Performance, Technical, ETF, Charts, News, Snapshot, Maps, Stats | Public / Elite 일부 | Official Product Observation | Screener view tabs | High | view state가 Back Navigation에서 유지되는지 확인 필요. |
| FNV-ST-003 | Saved Screener / My Presets | Screener, User Account | Login Required / Official Documentation Only | filter combination preset | Login Required, Elite presets 200 | Official Documentation / Official Pricing | Help Screener, Elite page | Medium | free registered preset limit 확인 필요. |
| FNV-ST-004 | Portfolio Membership | Portfolio, Stock | Login Required | saved Stock set 또는 holdings membership candidate | Login Required, Elite limits | Official Product Observation / Official Pricing | Portfolio redirect, Elite page | Medium | membership metadata와 holdings fields 확인 필요. |
| FNV-ST-005 | Alert Rule | Stock, Screener, Portfolio | Elite Feature | price, insider, ratings, news, SEC filings, Screener match trigger candidate | Elite Feature | Official Pricing | Elite page alerts section | Medium | condition builder와 trigger scope 확인 필요. |
| FNV-ST-006 | Recent Stock | Stock, User Account | Not Verified | recently viewed ticker candidate | Not Verified | Not Verified | Not Verified | Low | Recent / History 기능 존재 확인 필요. |
| FNV-ST-007 | Theme Preference | Theme, Screener, Maps | Partially Observed | Theme / Sub-theme filter selection candidate | Public / Elite custom candidate | Official Product Observation / Official Blog | Screener Theme filter, Maps Themes Blog | Low | preference 저장 여부 확인 필요. |
| FNV-ST-008 | Layout Preference | Home, Portfolio, Signals | Elite Feature | Homepage, Portfolio, Signals layout customization | Elite Feature | Official Pricing / Official Blog | Elite page, Home customization Blog | Medium | actual settings UI 확인 필요. |
| FNV-ST-009 | Elite Entitlement | Subscription Plan, User Account | Observed | real-time data, no ads, advanced filters, exports, alerts, limits | Elite Feature | Official Pricing | Elite page | High | in-product gate UI 확인 필요. |
| FNV-ST-010 | Advertisement State | Public Surface, Elite | Observed / Elite Feature | public ads / tracking and Elite no ads entitlement | Public shows ad/tracking, Elite removes ads | Official Product Observation / Official Pricing | footer iframe, Elite no ads | Medium | actual ad placement impact 정량 확인 필요. |
| FNV-ST-011 | Media Source Preference | News, User Account | Elite Feature | customized media sources candidate | Elite Feature | Official Pricing | Elite page Customize Media Sources | Medium | News UI settings 확인 필요. |
| FNV-ST-012 | Export / API Access State | User Account, Screener, Portfolio, Groups, Options, News | Elite Feature | data output entitlement | Elite Feature | Official Pricing | Elite page export/API | High | API auth flow는 이번 범위 밖. |

## Surface / Tool / Entity / State / Capability 분류

| 항목 | 분류 | 이유 |
| --- | --- | --- |
| Home | Surface | Market, Stock Signal, News, Calendar, Insider, asset class summary를 한 Screen에 배치한다. |
| Global Navigation | Navigation / Surface-level structure | Product Surface와 account / subscription entry를 연결한다. |
| Screener | Tool / Discovery Surface | filter와 result table / views를 결합한다. |
| Screener Filter | User State / Capability | criteria selection이며 saved preset의 기반이 된다. |
| Screener View | User State / Presentation State | 같은 result set을 다른 Information Form으로 보여준다. |
| Saved Screener / My Presets | User-owned Entity Candidate | filter configuration을 account에 저장하는 candidate다. |
| Maps / Heatmap | Surface / Visualization / Navigation Candidate | Heatmap cell이 Stock 또는 group Navigation unit일 가능성이 있다. |
| Heatmap Cell | Entity Representation Candidate | Stock, Sector, Industry, ETF, Crypto, Futures, Theme 중 어떤 Entity를 표현하는지 map filter에 따라 달라질 수 있다. |
| Groups | Surface / Comparison Tool | Sector, Industry, Country, Capitalization group aggregate를 비교한다. |
| Stock Quote | Entity Hub Candidate | Stock Context 안에서 tabs, peers, ETF holders, News, metrics를 제공한다. |
| News | Surface / Contextual Content / External Evidence bridge | 독립 News Surface와 Stock Quote content block을 겸한다. |
| Insider | Surface / External Evidence bridge | Insider Transaction에서 Stock과 SEC Filing으로 이동한다. |
| Portfolio | User-owned Entity Candidate | account 기반 saved Stock set 또는 holdings Surface candidate다. |
| Alert Rule | User State Candidate / Capability | Elite alerts가 monitoring state로 작동할 수 있다. |
| Elite Entitlement | User State / Subscription State | data freshness, saved count, ads, exports, alerts를 제어한다. |
| Backtests | Tool Candidate | direct UI Not Verified라 확정하지 않는다. |

## Stock와 Company 관계

Observation:
Stock Quote URL은 ticker parameter를 사용한다. AAPL page는 ticker `AAPL`, company name `Apple Inc`, external company website link, price, exchange, Sector, Industry, peer tickers, ETF holders를 같은 header area에 표시한다.

Interpretation:
Finviz public Stock Quote는 Stock ticker 중심 Entity Hub로 보인다. Company는 Stock context 안에서 표시되지만 Finviz 내부 독립 Company Surface인지 확인되지 않았다.

Confidence:
High for Stock, Medium for Company

Evidence:
Official Product Observation, https://finviz.com/stock?t=AAPL, 확인일 2026-07-28.

## Sector / Industry / Stock 관계

Observation:
Screener Help는 Companies are divided into sectors and industries라고 설명한다. Screener filter와 Stock Quote는 Sector와 Industry를 표시한다. Groups는 Sector, Industry, Country, Capitalization group comparison을 제공한다.

Interpretation:
Sector와 Industry는 Stock classification과 group-level comparison을 동시에 담당한다. Sector to Industry to Stock drill-down은 직접 확인되지 않았다.

Confidence:
Medium

Evidence:
Official Product Observation, Screener, Stock Quote, Groups. Official Documentation, https://finviz.com/help/screener. 확인일 2026-07-28.

## News / Insider / SEC Filing 관계

Observation:
News page와 Stock Quote News list는 timestamp와 Source label을 표시하고 external Source로 이동한다. Insider table은 Insider Transaction row 안에서 Stock ticker, Owner, Relationship, transaction fields, SEC Form 4 external link를 표시한다.

Interpretation:
News는 external Source routing 중심이고, Insider는 Transaction row 안에서 Stock과 SEC Filing을 병렬로 연결한다. SEC Filing은 External Evidence로 분류된다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/news, https://finviz.com/insidertrading, https://finviz.com/stock?t=AAPL. 확인일 2026-07-28.

## Screener Result와 Saved State 관계

Observation:
Screener는 result table, result view tabs, `My Presets`, `Save as Portfolio`, `Create Alert`를 표시한다. Help는 filter combinations can be saved as a preset이라고 설명한다. Elite page는 Screener presets 200, custom filters, Stats View, item per page limits를 표시한다.

Interpretation:
Screener Result는 transient output에 가깝고, Saved Screener / My Presets는 filter configuration User-owned Entity Candidate다. Save as Portfolio는 result 또는 selected Stock set을 Portfolio state로 전환하는 후보지만 실제 생성 방식은 Not Verified다.

Confidence:
Medium

Evidence:
Official Product Observation, https://finviz.com/screener. Official Documentation, https://finviz.com/help/screener. Official Pricing, https://finviz.com/elite. 확인일 2026-07-28.

## Portfolio와 Saved Screener 관계

Observation:
Screener에는 `Save as Portfolio` action이 표시된다. Portfolio URL은 not logged in 상태에서 Create a Free Account로 redirect된다. Elite page는 Portfolio count와 ticker limit을 표시한다.

Interpretation:
Saved Screener는 dynamic criteria state일 가능성이 있고, Portfolio는 Stock membership 또는 holdings state일 가능성이 있다. 둘의 정확한 update behavior는 Login Required라 확인되지 않았다.

Confidence:
Medium

Evidence:
Official Product Observation, https://finviz.com/screener, https://finviz.com/portfolio. Official Pricing, https://finviz.com/elite. 확인일 2026-07-28.

## Heatmap Cell의 Entity 역할

Observation:
official indexed Map text는 S&P 500 stocks categorized by sectors and industries라고 설명하고 size represents market cap이라고 설명한다. 공식 Blog는 Market Cap Map, Themes Map, Insider Transactions Map, Groups Heatmap을 설명한다.

Interpretation:
Heatmap Cell의 Entity 역할은 selected map filter에 따라 Stock, group, ETF, Crypto, Futures, Theme representation으로 달라질 수 있다. 이번 조사에서는 public dynamic cell interaction을 직접 확인하지 못했으므로 `Entity Representation Candidate`로 유지한다.

Confidence:
Medium

Evidence:
Official Product Observation / indexed text, https://finviz.com/map. Official Blog, Maps update posts. 확인일 2026-07-28.

## Relationship Inventory

| Relationship ID | From | To | Relationship Type | Status | Evidence Type | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FNV-REL-001 | Global Navigation | Product Surface | Surface Navigation | Observed | Official Product Observation | public pages top Navigation | High |
| FNV-REL-002 | Screener Filter | Screener Result | State to Output | Observed | Official Product Observation | Screener filters and result table | High |
| FNV-REL-003 | Screener Result Row | Stock Quote | Entity Transition | Observed | Official Product Observation | Screener row links | High |
| FNV-REL-004 | Screener Result View | Screener Result | Presentation State | Observed | Official Product Observation | result view tabs | High |
| FNV-REL-005 | Saved Screener | Screener Filter | Saved State | Official Documentation Only | Official Documentation | Help Screener presets | Medium |
| FNV-REL-006 | Screener Result | Portfolio | Save / State Transition Candidate | Partially Observed | Official Product Observation | Save as Portfolio action | Medium |
| FNV-REL-007 | Screener / Portfolio | Alert Rule | Monitoring State Candidate | Elite Feature | Official Pricing | Elite alerts | Medium |
| FNV-REL-008 | Stock Quote | Peer Stock | Related Entity Transition | Observed | Official Product Observation | AAPL peers | High |
| FNV-REL-009 | Stock Quote | ETF holder | Related Entity Transition | Observed | Official Product Observation | AAPL Held by links | High |
| FNV-REL-010 | Stock Quote | News | Contextual Content | Observed | Official Product Observation | AAPL News list | High |
| FNV-REL-011 | News | External Source | External Evidence Transition | Observed | Official Product Observation | News page headlines | High |
| FNV-REL-012 | Insider Transaction | Stock Quote | Entity Transition | Observed | Official Product Observation | Insider ticker links | High |
| FNV-REL-013 | Insider Transaction | SEC Filing | External Evidence Transition | Observed | Official Product Observation | SEC Form 4 links | High |
| FNV-REL-014 | Stock | Sector / Industry | Classification | Observed | Official Product Observation / Documentation | AAPL classification, Help Screener | High |
| FNV-REL-015 | Sector / Industry | Groups | Aggregate Comparison | Partially Observed | Official Product Observation / Documentation indexed text | Groups page and Knowledge Base indexed text | Medium |
| FNV-REL-016 | Heatmap Cell | Stock / Group | Entity Representation Candidate | Partially Observed | Official Product Observation / Blog | Map indexed text and official Blog | Medium |
| FNV-REL-017 | Subscription Plan | Elite Entitlement | Entitlement | Observed | Official Pricing | Elite page | High |
| FNV-REL-018 | User Account | Saved Data | Persistence Candidate | Official Documentation Only | Official Documentation | FAQ saved data linked to account | Medium |

## Inferred Relationship

다음 관계는 공식 Source의 clue를 바탕으로 한 Inference다. Observation으로 사용하지 않는다.

- Stock Quote가 Company와 Security를 내부적으로 분리하는지는 Not Verified다.
- Portfolio가 Watchlist인지 holdings management Surface인지는 Not Verified다.
- Saved Screener가 dynamic result를 저장하는지, static result를 저장하는지는 Not Verified다.
- Maps에서 Heatmap Cell이 현재 UI에서 Stock Quote로 직접 이동하는지는 Not Verified다.
- Groups에서 Sector to Industry to Stock drill-down이 가능한지는 Not Verified다.
- Recent Stock 또는 History가 account state로 존재하는지는 Not Verified다.
- Theme Preference가 saved user preference인지 단순 filter state인지는 Not Verified다.

## 남아 있는 Open Question

- Company와 Security가 Finviz internal model에서 분리되는가.
- Portfolio Item은 Stock Quote로 이동하는가.
- Portfolio는 Watchlist, holdings, note-taking 중 어떤 책임을 갖는가.
- Saved Screener와 Portfolio가 어떤 update behavior 차이를 갖는가.
- Alert Rule은 Screener, Portfolio, Stock Quote 중 어디에 attach되는가.
- Heatmap Cell의 Entity type은 map filter별로 어떻게 달라지는가.
- News에서 Stock, Sector, Industry로 internal transition이 가능한가.
- Insider Person Detail이 존재하는가.
- Asset Class Entity가 Stock Quote와 동일한 detail pattern을 사용하는가.
