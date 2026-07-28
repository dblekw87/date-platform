# Yahoo Finance Core Journey Observations

## 문서 목적

이 문서는 Phase 5.2 범위에서 Yahoo Finance의 12개 Research Scenario를 기록한다.

각 Scenario는 Entry, Transition, Context Preservation, Context Loss, Restriction, Confidence만 다룬다. Information Density, Trust / Evidence, Product Flow, Candidate Principle은 작성하지 않는다.

## 조사 기준

| 항목 | 내용 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Access | Public Access |
| Login | Not Logged In |
| Premium | No Yahoo Finance Premium subscription |
| Browser | Desktop web research via Codex web extraction / official URL review |
| Evidence Types | Official Product Observation, Official Documentation, Official Pricing, Inference, Not Verified |

## Scenario 요약

| 상태 | Scenario 수 |
| --- | ---: |
| 완료 가능 | 5 |
| 부분 완료 | 6 |
| 확인 불가 | 1 |

## Scenario Inventory

| Scenario ID | Scenario | 수행 가능 여부 | Observation Status | Entry | Transition | Context Preservation | Context Loss | Restriction | Evidence Type | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-001 | 오늘 Market 확인 | 부분 완료 | Partially Observed | Home / Markets | Home candidate → Market Summary / Trending Tickers / News 또는 Markets → asset class sections | Markets category context는 유지 candidate | Home current first viewport와 personalized area Not Verified | Public. personalization Login Required candidate. Premium promotion candidate. | Official Product Observation / Official Documentation | Medium | Home direct body 429로 current block order 확인 필요. |
| S-002 | Symbol 검색 | 완료 가능 | Official Documentation / Partially Observed | Search | Search query → company / ticker / ETF / index / commodity / mutual fund / crypto candidate → Quote | selected symbol context가 Quote URL로 전환된다. | Search Suggestion state와 query history Not Verified | Public | Official Documentation | High | Suggestion ordering과 keyboard interaction 확인 필요. |
| S-003 | Stock 분석 | 완료 가능 | Observed / Partially Observed | Quote AAPL | Quote Summary → Statistics / Financials / Holders / Analysis / Profile tabs candidate | ticker context는 Quote local tabs에서 유지 candidate | external company site, article, Premium page 이동 시 original Quote context loss candidate | Public. 일부 Premium Feature. | Official Product Observation | High | Quote tabs current direct body와 internal relation depth 확인 필요. |
| S-004 | Chart 분석 | 부분 완료 | Official Documentation / Partially Observed | Quote Chart | Quote → Chart / Advanced Chart → range / indicator / compare / settings | selected symbol context는 chart setting 안에서 유지 candidate | Drawing Tool, session persistence, full screen return state Not Verified | Public / Premium Feature 일부 | Official Documentation | High | Drawing Tool current availability와 Premium boundary 확인 필요. |
| S-005 | News 확인 | 부분 완료 | Partially Observed | News / Quote | News headline → article candidate 또는 Quote → related news candidate | category와 ticker relation 일부 유지 candidate | external article 이동 후 Yahoo Finance context return path Not Verified | Public / Premium Feature 일부 | Official Product Observation / Official Documentation | Medium | related symbols per article 확인 필요. |
| S-006 | Screener 발견 | 완료 가능 | Observed | Screeners Hub | Screeners → predefined screener → result table / heatmap view / Customize candidate → Quote candidate | predefined criteria와 result view context는 result page 안에서 유지 candidate | Quote 이동 후 screener criteria restore Not Verified | Public. custom save Login Required. 일부 Premium Feature. | Official Product Observation / Official Documentation | High | Save, Download, Customize gate 확인 필요. |
| S-007 | Markets 비교 | 완료 가능 | Observed | Markets | Markets → World / region / commodity / currency / crypto sections → asset class table | category context는 Markets Surface 안에서 유지된다. | asset detail transition Not Verified | Public | Official Product Observation | High | US subcategory와 asset detail body 확인 필요. |
| S-008 | Portfolio 확인 | 부분 완료 | Login Required | My Portfolio | My Portfolio landing → sign in → create / import / link broker / holdings candidate | account-based Portfolio state candidate | not logged in 상태에서 internal Portfolio context 확인 불가 | Login Required. Premium Portfolio Analytics is Premium Feature. | Official Product Observation / Official Documentation / Official Pricing | Medium | logged-in empty state, holdings, broker link current UI 확인 필요. |
| S-009 | Watchlist | 부분 완료 | Login Required / Partially Observed | My Watchlist / Home sidebar candidate | Watchlist entry → sign in / followed symbols candidate | account-based Watchlist state candidate | public view에서 membership state Not Verified | Login Required. custom Watchlists Premium plan copy candidate. | Official Documentation / Official Pricing | Medium | Watchlist와 Portfolio responsibility 차이 확인 필요. |
| S-010 | Premium 유도 | 완료 가능 | Observed | Premium / Upgrade | Premium entry → subscriptions → plan selection / compare | plan comparison context는 Premium pages 안에서 유지 | Product Surface로 return path Not Verified | Public pages, Premium Feature for entitlement | Official Pricing | High | Quote / Screeners / Portfolio 내부 gate UI 확인 필요. |
| S-011 | Quote → Related Entity | 부분 완료 | Partially Observed | Quote AAPL | Quote → Profile / Related / People Also Watch / Sector / Industry candidate | ticker context는 local tabs에서 유지 candidate | related symbol 이동 후 original ticker relation reason Not Verified | Public / Premium Feature 일부 | Official Product Observation | Medium | Sector, Industry, Related tab target 확인 필요. |
| S-012 | 재방문 | 확인 불가 | Not Verified / Login Required | Recent / Watchlist / Portfolio candidate | returning user → saved Portfolio / Watchlist / Recent / chart preference candidate | account or browser state candidate | actual revisit not performed | Login Required / Premium Feature / Not Verified | Not Verified | Low | Recent, chart preference persistence, saved state restore 확인 필요. |

## Scenario별 기록

### S-001 오늘 Market 확인

Observation:
Home은 Market Summary, Trending Tickers, News, Watchlist area candidate, Personalized area candidate, Advertisement, Premium exposure를 포함하는 Surface로 Phase 5.1에서 기록했다. Direct body 일부는 429로 제한되었고, Markets Overview는 World Indices, region, commodity, currency, bond, stock sections를 제공한다.

Interpretation:
Yahoo Finance에서 오늘의 Market 확인은 Home과 Markets 두 Entry로 나뉜다. Home은 broad summary entry이고, Markets는 category comparison entry로 해석된다.

Restriction:
Personalized area와 Watchlist area는 Login Required 가능성이 있다. Premium exposure는 Public Surface에서 확인되는 subscription entry다.

Confidence:
Medium

Evidence:
Official Product Observation, https://finance.yahoo.com/, https://finance.yahoo.com/markets/. Official Documentation, Yahoo Help overview. 확인일 2026-07-28.

### S-002 Symbol 검색

Observation:
Yahoo Help는 Search가 company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency를 찾을 수 있다고 설명한다. Quote URL pattern은 selected symbol이 Quote Surface로 연결되는 구조를 보여준다.

Interpretation:
Search는 Yahoo Finance의 핵심 Entity Navigation으로 보인다. 회사명과 ticker 모두를 허용해 novice user와 experienced user의 entry mode를 모두 지원할 수 있다.

Restriction:
Search itself is Public Access. Suggestion dropdown behavior is Not Verified.

Confidence:
High

Evidence:
Official Documentation, Yahoo Help Search article. Official Product Observation, Quote URL pattern. 확인일 2026-07-28.

### S-003 Stock 분석

Observation:
AAPL Quote는 Summary, Chart, News, Statistics, Financials, Holders, Analysis, Sustainability, Options, Historical Data, Profile, Conversation, Related tabs candidate를 포함한다. Phase 5.1에서는 Summary, Statistics, Holders, Profile 일부가 Observed / Partially Observed로 기록됐다.

Interpretation:
Quote는 selected symbol의 detail Surface다. 여러 local tabs가 ticker context를 유지하며 서로 다른 analysis section으로 분기한다.

Restriction:
Analysis depth, historical download, Premium insights, Premium research는 Premium Feature 일부와 연결된다. 일부 tab body는 direct US rendering 429로 Partially Observed 또는 Not Verified다.

Confidence:
High

Evidence:
Official Product Observation, https://finance.yahoo.com/quote/AAPL/. 확인일 2026-07-28.

### S-004 Chart 분석

Observation:
Yahoo Help는 Advanced Chart에서 indicators, overlays, oscillators, compare multiple symbols, chart type, extended hours, y-axis scale, settings 변경을 설명한다.

Interpretation:
Chart는 Quote의 local analysis Surface 또는 capability cluster로 볼 수 있다. Compare와 Indicator는 Chart 내부 capability이며 독립 Surface로 과장하지 않는다.

Restriction:
Drawing Tool current availability and Premium boundary are Not Verified. Chart preference persistence is only documentation-based candidate.

Confidence:
High for documented capabilities, Medium for current interaction.

Evidence:
Official Documentation, Yahoo Help chart indicator, compare, chart type, display settings articles. 확인일 2026-07-28.

### S-005 News 확인

Observation:
News Surface는 financial headlines, categories, videos, Source-labeled articles를 제공하는 것으로 Phase 5.1에서 기록했다. Quote Summary도 related News candidate를 포함한다.

Interpretation:
News는 독립 Surface와 Quote supporting content 두 책임을 갖는 것으로 보인다. External article로 이동하면 Yahoo Finance context가 손실될 수 있다.

Restriction:
Related symbols per article and exact category-to-Quote transition are Not Verified.

Confidence:
Medium

Evidence:
Official Product Observation, https://finance.yahoo.com/news/. Official Documentation, Yahoo Help overview. 확인일 2026-07-28.

### S-006 Screener 발견

Observation:
Screeners Hub는 predefined screeners와 Create entry를 제공한다. Predefined screener result는 filter summary, table, heatmap view, Save, Download, Customize candidate actions를 제공한다.

Interpretation:
Screeners는 criteria-driven Discovery Surface다. Predefined result는 사용자가 직접 filter를 만들기 전에도 candidate set을 열 수 있는 entry다.

Restriction:
Custom screener save is Login Required. Premium Screeners and advanced data are Premium Feature. Save / Download exact gate is Not Verified.

Confidence:
High

Evidence:
Official Product Observation, https://finance.yahoo.com/screener/, https://finance.yahoo.com/screener/predefined/undervalued_growth_stocks/. Official Documentation, Yahoo Help Screeners article. 확인일 2026-07-28.

### S-007 Markets 비교

Observation:
Markets Overview shows multiple region and asset sections. Crypto and Currencies are observed sub-surfaces. All Cryptocurrencies includes table and heatmap view.

Interpretation:
Markets supports category-level comparison rather than single symbol analysis. Asset class detail transition remains outside verified scope.

Restriction:
Crypto asset detail and Currency Pair detail bodies are Not Verified.

Confidence:
High

Evidence:
Official Product Observation, Markets, Crypto, All Cryptocurrencies, Currencies pages. 확인일 2026-07-28.

### S-008 Portfolio 확인

Observation:
My Portfolio landing is public reachable but creation and management require sign in. Yahoo Help describes multiple portfolios, holdings, notes, import/export, brokerage link, and transactions. Premium pages describe Portfolio Analytics.

Interpretation:
Portfolio is a User-owned Entity candidate for personal continuity. It should not be treated as fully observed in Phase 5.2.

Restriction:
Login Required. Premium Portfolio Analytics is Premium Feature. Logged-in UI is Not Verified.

Confidence:
Medium

Evidence:
Official Product Observation, https://finance.yahoo.com/portfolios. Official Documentation, Yahoo Help Portfolio articles. Official Pricing, Premium pages. 확인일 2026-07-28.

### S-009 Watchlist

Observation:
Yahoo Help describes Watchlists as part of My Portfolio and personal tracking. Phase 5.1 records My Watchlist as Login Required / Public indexed content with logged-in UI Not Verified.

Interpretation:
Watchlist appears to be personal symbol tracking, but its exact boundary from Portfolio holdings is unresolved.

Restriction:
Login Required. Custom Watchlists are also referenced in plan comparison, but current product boundary is Not Verified.

Confidence:
Medium

Evidence:
Official Documentation, Yahoo Help Watchlist / Portfolio articles. Official Pricing, plan compare page. 확인일 2026-07-28.

### S-010 Premium 유도

Observation:
Premium pages are public and show Fair Value, Research Reports, Premium Screeners, Premium Charts, Portfolio Analytics, Premium Alerts, ad-free, AlphaSpace, plan selection, and plan comparison.

Interpretation:
Premium works as Subscription Navigation and capability boundary. It is not a Product Entity.

Restriction:
Actual in-product gate UI per Surface is Not Verified.

Confidence:
High

Evidence:
Official Pricing, https://finance.yahoo.com/subscriptions/, https://finance.yahoo.com/about/plans/compare/. 확인일 2026-07-28.

### S-011 Quote → Related Entity

Observation:
AAPL Quote Profile and Related candidate areas include company profile, sector, industry, website, and People Also Watch candidate. Dedicated Related body and Sector / Industry link behavior are Not Verified.

Interpretation:
Quote offers related Entity candidates, but Phase 5.2 cannot confirm a durable relation context after transition.

Restriction:
Related tab, peer transition, Sector / Industry target are Partially Observed or Not Verified.

Confidence:
Medium

Evidence:
Official Product Observation, AAPL indexed Product content and regional mirrors. 확인일 2026-07-28.

### S-012 재방문

Observation:
Yahoo Help and Premium pages describe account-based Portfolio, Watchlists, saved custom screeners candidate, portfolio analytics, alerts, and chart settings candidate. Actual revisit was not performed.

Interpretation:
Returning workflow depends on account state, browser state, or Premium entitlement. It remains unverified in Public not logged-in scope.

Restriction:
Login Required / Premium Feature / Not Verified.

Confidence:
Low

Evidence:
Official Documentation and Official Pricing only. 확인일 2026-07-28.

## 완료하지 못한 영역

- Search Suggestion dropdown and recent query state.
- Logged-in Portfolio, Watchlist, holdings, broker link, and import interaction.
- Premium feature gate UI inside Quote, Chart, Screeners, Portfolio.
- Screener result row to Quote transition and Back state.
- Quote Related, Sector, Industry transition.
- News article related symbols and return path.
- actual revisit, Recent, chart setting persistence.
