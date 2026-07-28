# Yahoo Finance Entity and State Observations

## 문서 목적

이 문서는 Phase 5.2 범위에서 Yahoo Finance의 Entity Candidate와 User State Candidate를 구분해 기록한다.

이 문서는 DATE Entity Architecture를 확정하지 않는다. Product Entity, User-owned Entity, User State, Surface, Tool, Capability, Contextual Content, External Evidence를 구분하기 위한 Observation만 정리한다.

## 분류 기준

| Classification | 기준 |
| --- | --- |
| Product Entity | Yahoo Finance Product 안에서 독립 분석 대상, classification 대상, 또는 URL target 후보로 작동하는 단위 |
| User-owned Entity | signed-in user가 생성하거나 저장할 수 있는 지속적 단위 |
| User State | query, filter, membership, entitlement, preference처럼 user 또는 session에 연결될 수 있는 상태 |
| Surface | 사용자가 인식하는 주요 Product 접근 단위 |
| Tool | 특정 work를 수행하는 기능 중심 Surface |
| Capability | Surface 안에서 수행되는 개별 action 또는 mode |
| Contextual Content | 현재 Surface 또는 Entity를 보조하는 content block |
| External Evidence | Yahoo Finance 밖의 original article, publisher page, broker connection, 또는 Help / Pricing reference |

## Entity Candidate Inventory

| Candidate ID | Entity Candidate | Classification | Observation Status | 확인된 역할 | Related Surface | Evidence Type | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-ENT-001 | Market | Product Entity Candidate | Observed / Partially Observed | Home, Markets, Trending Tickers, News, asset class sections의 상위 context다. | Home, Markets, News | Official Product Observation | https://finance.yahoo.com/, https://finance.yahoo.com/markets/ | High | Home current personalized blocks는 Not Verified. |
| YF-ENT-002 | Stock | Product Entity Candidate | Observed / Partially Observed | Quote, Screeners result, Watchlist, Portfolio, News relation candidate의 primary target이다. | Quote, Screeners, Portfolio, Watchlist, News | Official Product Observation | AAPL Quote, predefined screener result | High | result row to Quote transition direct click은 Not Verified. |
| YF-ENT-003 | Company | Product Entity Candidate | Partially Observed | Quote Profile에서 company profile, website, sector, industry display로 나타난다. | Quote Profile | Official Product Observation | AAPL indexed Product content | Medium | internal Company detail Surface는 Not Verified. |
| YF-ENT-004 | Security | Product Entity Candidate | Inference | Stock, ETF, mutual fund, index, commodity, crypto 등 Search-supported target을 포괄하는 후보다. | Search, Quote, Screeners | Official Documentation / Inference | Yahoo Help Search article | Low | Yahoo Finance 공식 UI에서 Security 용어가 Product Entity인지 Not Verified. |
| YF-ENT-005 | News | Product Entity Candidate / Contextual Content | Partially Observed | News Surface article card, Quote related news, Home news block candidate로 나타난다. | Home, News, Quote | Official Product Observation / Official Documentation | News Product URL, Help overview | Medium | related symbols per article Not Verified. |
| YF-ENT-006 | Chart | Tool / Contextual Surface Candidate | Official Documentation / Partially Observed | selected symbol price performance, indicator, compare, settings를 제공한다. | Quote Chart, Advanced Chart | Official Documentation | Yahoo Help chart articles | High | Drawing Tool current UI Not Verified. |
| YF-ENT-007 | Portfolio | User-owned Entity Candidate | Login Required | signed-in account의 holdings, transaction, note, broker link, manual portfolio candidate다. | My Portfolio | Official Documentation / Official Product Observation | Portfolio landing and Help Portfolio articles | Medium | logged-in Portfolio 내부 table과 calculation fields Not Verified. |
| YF-ENT-008 | Watchlist | User-owned Entity Candidate | Login Required / Partially Observed | followed symbols 또는 custom list candidate다. | My Portfolio, My Watchlist, Home candidate | Official Documentation | Yahoo Help Watchlist / Portfolio articles | Medium | Watchlist와 Portfolio holdings boundary Not Verified. |
| YF-ENT-009 | Subscription Plan | Product Entity Candidate / Subscription Boundary | Observed | Premium entitlement, plan selection, feature group, ad-free benefit을 결정한다. | Premium, Pricing, Plan Compare | Official Pricing | Subscriptions, select-plan, compare pages | High | plan matrix may change after access date. |
| YF-ENT-010 | Crypto Asset | Product Entity Candidate | Observed | Crypto summary, All Cryptocurrencies table and heatmap view의 row/cell candidate다. | Crypto, All Cryptocurrencies | Official Product Observation | Crypto pages | High | crypto asset detail Surface Not Verified. |
| YF-ENT-011 | Currency Pair | Product Entity Candidate | Observed | Currencies table의 primary row unit이다. | Currencies | Official Product Observation | Currencies page | High | pair detail body Not Verified. |
| YF-ENT-012 | ETF | Product Entity Candidate | Official Documentation / Partially Observed | Search-supported target이며 Screeners / Quote candidate로 작동한다. | Search, Quote, Screeners | Official Documentation | Yahoo Help Search article | Medium | ETF Quote detail current body Not Verified. |
| YF-ENT-013 | Index | Product Entity Candidate | Official Documentation / Partially Observed | Search-supported target이며 Markets sections에 나타난다. | Search, Markets | Official Documentation / Official Product Observation | Yahoo Help Search, Markets page | Medium | index detail body Not Verified. |
| YF-ENT-014 | Screener Result | Output Entity Candidate / Contextual Content | Observed | predefined criteria에서 생성된 stock candidate set과 table rows를 제공한다. | Screeners | Official Product Observation | predefined screener result page | High | static output인지 saved dynamic state인지 구분 필요. |

## User State Candidate Inventory

| State ID | User State Candidate | Related Entity / Surface | Observation Status | 저장되거나 유지되는 내용 | Access Restriction | Evidence Type | Evidence | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-ST-001 | Search Query | Search, Quote | Partially Observed | typed symbol / company query and selected suggestion candidate | Public | Official Documentation / Inference | Yahoo Help Search article | Medium | query history와 recent search persistence Not Verified. |
| YF-ST-002 | Recent | Home, Search, Quote | Not Verified | recently viewed symbol candidate | Not Verified | Not Verified | Not Verified | Low | Recent / History feature 존재 확인 필요. |
| YF-ST-003 | Watchlist Membership | Watchlist, Stock | Login Required | followed symbols 또는 custom list membership candidate | Login Required / Premium plan copy 일부 | Official Documentation / Official Pricing | Yahoo Help Watchlist, plan compare | Medium | custom Watchlist limit and free boundary Not Verified. |
| YF-ST-004 | Portfolio Holdings | Portfolio, Stock | Login Required | holdings, transactions, notes, imported positions, linked broker candidate | Login Required | Official Documentation | Yahoo Help Portfolio articles | Medium | logged-in holdings table and broker sync behavior Not Verified. |
| YF-ST-005 | Saved Screener | Screeners, User Account | Login Required | custom screener criteria saved to account candidate | Login Required / Premium Feature 일부 | Official Documentation | Yahoo Help Screeners article | Medium | free vs Premium saved screener limits Not Verified. |
| YF-ST-006 | Premium Entitlement | Subscription Plan, User Account | Observed | Fair Value, Research Reports, Premium Screeners, Premium Charts, Portfolio Analytics, Alerts, ad-free access | Premium Feature | Official Pricing | Premium and plan compare pages | High | in-product gate UI Not Verified. |
| YF-ST-007 | Logged In State | User Account, Portfolio, Watchlist | Login Required | access to personal Portfolio, Watchlist, saved items candidate | Login Required | Official Product Observation / Official Documentation | Portfolio landing, Help articles | High | post-login landing and account menu Not Verified. |
| YF-ST-008 | Chart Preference | Chart, Quote | Official Documentation | chart type, display settings, extended hours, y-axis scale candidate | Public / browser state candidate | Official Documentation | Yahoo Help chart settings articles | Medium | persistence across session or account Not Verified. |
| YF-ST-009 | Screener Filter State | Screeners | Observed / Partially Observed | predefined criteria, custom criteria, result view candidate | Public for predefined, Login Required for save | Official Product Observation / Official Documentation | Screeners pages and Help article | High | browser Back state after Quote transition Not Verified. |
| YF-ST-010 | Ad-free State | Premium, Public Surfaces | Premium Feature | ad-free entitlement candidate | Premium Feature | Official Pricing | Premium subscriptions and compare pages | High | actual ad removal interaction Not Verified. |

## Responsibility Matrix

| Product Element | Primary Responsibility | Secondary Responsibility | Classification | Access Level | Observation Status |
| --- | --- | --- | --- | --- | --- |
| Home | Market entry | News, Watchlist candidate, Premium exposure | Surface | Public / Login candidate / Premium candidate | Partially Observed |
| Search | Entity lookup | disambiguation candidate | Capability / Navigation Entry | Public | Official Documentation / Partially Observed |
| Quote | selected symbol detail | local tabs, related content, Premium insight candidate | Surface / Entity Hub Candidate | Public / Premium 일부 | Observed / Partially Observed |
| Quote Local Tabs | section transition | ticker context preservation candidate | Contextual Navigation | Public / Premium 일부 | Observed / Partially Observed |
| Chart | price visualization | compare, indicator, settings | Tool / Capability Cluster | Public / Premium 일부 | Official Documentation / Partially Observed |
| News | headline consumption | Quote supporting content, external article routing | Surface / Contextual Content | Public / Premium 일부 | Partially Observed |
| Markets | asset and region category comparison | category entry to Crypto / Currencies | Surface | Public | Observed |
| Crypto | crypto category view | crypto news and all crypto table entry | Surface | Public | Observed |
| Currencies | Currency Pair table | pair detail candidate | Surface | Public | Observed |
| Screeners | criteria-driven Discovery | predefined and custom screener entry | Tool / Surface | Public / Login / Premium 일부 | Observed |
| Predefined Screener Result | candidate set output | table / heatmap view and save candidate | Contextual Content / Output Entity Candidate | Public / Login / Premium 일부 | Observed |
| Custom Screener | user-defined criteria | saved screener candidate | Tool / User State Candidate | Login Required / Premium 일부 | Official Documentation |
| Portfolio | personal holdings candidate | broker link, notes, transactions | User-owned Entity Candidate | Login Required | Official Documentation / Login Required |
| Watchlist | followed symbols candidate | Home personalization candidate | User-owned Entity Candidate | Login Required | Official Documentation / Partially Observed |
| Premium | entitlement boundary | subscription navigation | Subscription Boundary | Public entry / Premium Feature entitlement | Observed |
| Fair Value | premium analysis | Quote decision support candidate | Capability | Premium Feature | Official Pricing |
| Research Reports | premium analysis | external / premium research candidate | Capability | Premium Feature | Official Pricing |
| Premium Alerts | monitoring | Premium personal continuity candidate | Capability / User State Candidate | Premium Feature | Official Pricing |
| Advertisement | monetization condition | Premium ad-free contrast | Product Condition | Public / Premium ad-free | Official Product Observation / Official Pricing |
| Help | official documentation | access and capability reference | External Evidence / Support Surface | Public | Observed |

## Stock와 Company 관계

Observation:
Quote URL and Product content are ticker-centered. AAPL Quote displays company profile and website candidate within the selected symbol context.

Interpretation:
Yahoo Finance Quote appears to use Stock / symbol as the primary Product target, while Company information is displayed inside Quote. Company as an independent internal Product Entity is Not Verified.

Confidence:
High for Stock, Medium for Company.

Evidence:
Official Product Observation, AAPL Quote indexed content and Profile candidate. 확인일 2026-07-28.

## Portfolio와 Watchlist 관계

Observation:
Yahoo Help describes My Portfolio, Watchlists, portfolio creation, holdings, transactions, notes, import/export, and brokerage link. Phase 5.1 did not verify logged-in Portfolio or Watchlist UI.

Interpretation:
Portfolio is likely broader than Watchlist because it can include holdings and transactions. Watchlist appears to be a symbol-following state. This remains a candidate classification.

Confidence:
Medium

Evidence:
Official Documentation, Yahoo Help Portfolio / Watchlist articles. 확인일 2026-07-28.

## Screeners와 Saved State 관계

Observation:
Screeners Hub and predefined screener results are observed. Yahoo Help describes creating screeners and saving them after sign in.

Interpretation:
Screener Result is an output of criteria. Saved Screener is account-linked criteria state candidate. The two should not be treated as the same Product element.

Confidence:
Medium

Evidence:
Official Product Observation, Screeners pages. Official Documentation, Yahoo Help Screeners article. 확인일 2026-07-28.

## Premium과 Capability 관계

Observation:
Premium official pages list Fair Value, Research Reports, Premium Screeners, Premium Charts, Portfolio Analytics, Premium Alerts, ad-free, and AlphaSpace.

Interpretation:
Premium is a Subscription Boundary and entitlement state. It is not a standalone research Entity. Premium changes capability access and personal continuity scope.

Confidence:
High

Evidence:
Official Pricing, subscriptions and plan compare pages. 확인일 2026-07-28.

## External Evidence 후보

| External Evidence ID | External Evidence | Related Surface | Status | Note |
| --- | --- | --- | --- | --- |
| YF-EXT-001 | publisher article | News, Quote News | Partially Observed | headline opens external article candidate; return path Not Verified. |
| YF-EXT-002 | company website | Quote Profile | Partially Observed | company website candidate appears in profile content. |
| YF-EXT-003 | broker connection | Portfolio | Login Required / Official Documentation | brokerage link is described in Help, actual connection not verified. |
| YF-EXT-004 | Yahoo Help | Help | Observed | Product capability reference, not Product interaction. |
| YF-EXT-005 | Premium plan pages | Premium | Observed | official access boundary reference, not entitlement usage observation. |

## Relationship Inventory

| Relationship ID | From | To | Relationship Type | Status | Evidence Type | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| YF-REL-001 | Search | Quote | Entity Navigation | Official Documentation / Partially Observed | Official Documentation | High |
| YF-REL-002 | Quote | Quote Local Tabs | Contextual Navigation | Observed / Partially Observed | Official Product Observation | High |
| YF-REL-003 | Quote | Chart | Tool transition | Official Documentation / Partially Observed | Official Documentation | High |
| YF-REL-004 | Quote | News | Contextual Content | Partially Observed | Official Product Observation | Medium |
| YF-REL-005 | Quote | Company Display | Profile context | Partially Observed | Official Product Observation | Medium |
| YF-REL-006 | Markets | Crypto | Market category transition | Observed | Official Product Observation | High |
| YF-REL-007 | Markets | Currencies | Market category transition | Observed | Official Product Observation | High |
| YF-REL-008 | Screeners | Predefined Screener Result | Discovery output | Observed | Official Product Observation | High |
| YF-REL-009 | Predefined Screener Result | Quote | Entity transition candidate | Partially Observed | Official Product Observation | Medium |
| YF-REL-010 | Custom Screener | Saved Screener | saved criteria candidate | Login Required / Official Documentation | Official Documentation | Medium |
| YF-REL-011 | Portfolio | Portfolio Holdings | User-owned state candidate | Login Required / Official Documentation | Official Documentation | Medium |
| YF-REL-012 | Watchlist | Watchlist Membership | User-owned state candidate | Login Required / Official Documentation | Official Documentation | Medium |
| YF-REL-013 | Subscription Plan | Premium Entitlement | entitlement | Observed | Official Pricing | High |
| YF-REL-014 | Premium Entitlement | Ad-free State | subscription benefit | Premium Feature | Official Pricing | High |
| YF-REL-015 | Premium Entitlement | Premium Alerts | monitoring capability | Premium Feature | Official Pricing | High |

## Inferred Relationship

다음 관계는 Inference 또는 Candidate 수준으로만 유지한다.

- Company가 internal Company Surface를 갖는지는 Not Verified다.
- Security가 Yahoo Finance 공식 Product Entity인지 Not Verified다.
- Portfolio와 Watchlist가 logged-in UI에서 어떻게 분리되는지는 Not Verified다.
- Screener Result row에서 Quote로 이동한 후 Screener criteria가 유지되는지는 Not Verified다.
- Recent 또는 History가 User State로 존재하는지는 Not Verified다.
- Chart Preference가 account에 저장되는지 browser state인지 Not Verified다.
- Premium Alerts가 Quote, Portfolio, Watchlist 중 어디에 attach되는지는 Not Verified다.

## 남아 있는 Open Question

- Search Suggestion에서 Stock, ETF, Crypto, Currency가 어떻게 분류되는가.
- Company Display가 internal Company Entity인지, Quote content block인지 확인 필요.
- Portfolio 내부 primary unit은 holdings, position, list, transaction 중 무엇인가.
- Watchlist와 Portfolio의 boundary는 무엇인가.
- Saved Screener는 dynamic criteria state인지 static result set인지 확인 필요.
- Premium Alerts의 target Entity와 trigger condition 확인 필요.
- Chart Preference는 user account, browser storage, session 중 어디에 저장되는가.
- Recent / History 존재 여부 확인 필요.
- Crypto Asset과 Currency Pair detail Surface 확인 필요.
