# Yahoo Finance Strengths, Frictions and Open Questions

## 문서 목적

이 문서는 Yahoo Finance Phase 5.1~5.3 Observation을 기반으로 Structural Strength, User Friction, Context Loss, Access Restriction, Open Question을 정리한다.

이번 문서는 Candidate Principle을 작성하지 않는다. Principle ID를 발급하지 않고 Registry도 수정하지 않는다.

## 요약

| 구분 | 수 |
| --- | ---: |
| Structural Strength | 13 |
| Portal Strength | 3 |
| Search Strength | 2 |
| Quote Strength | 3 |
| Markets Strength | 2 |
| Screener Strength | 2 |
| Trust / Evidence Strength | 7 |
| Personal Continuity Pattern | 8 |
| Premium Strength | 5 |
| User Friction | 20 |
| Advertisement Friction | 3 |
| Premium Module Friction | 3 |
| Context Preservation Pattern | 18 |
| Context Loss 지점 | 10 |
| Product Responsibility Matrix 항목 | 32 |

## Structural Strength Inventory

### Finance Home as Portal Entry

Observation:
Finance Home은 Market Summary, Trending Tickers, News, Watchlist / Portfolio sidebar candidate, Premium entry를 포함하는 Surface로 기록됐다. Direct body 일부는 429로 제한되어 current hierarchy는 Partially Observed다.

Evidence Level:
Partial

Why It May Work:
일반 사용자가 symbol을 알지 않아도 Market, News, Trending, personal entry candidate로 시작할 수 있기 때문이다.

User Benefit:
Discoverability, Market Orientation, Learnability

Conditions Required:
Portal block hierarchy, logged-in personalization, advertisement placement가 명확해야 한다.

Potential Trade-off:
Portal content mixing, advertisement competition, primary research intent dilution, Mobile 위험이 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Multiple Discovery Entry Separation

Observation:
Yahoo Finance는 Search, Markets, Screeners, News, Home을 서로 다른 Discovery entry로 분리한다.

Evidence Level:
Observed / Partial

Why It May Work:
known symbol lookup, category comparison, predefined criteria, headline scan, portal entry가 서로 다른 user question을 담당하기 때문이다.

User Benefit:
Discoverability, Decision Speed, Learnability

Conditions Required:
각 entry의 responsibility와 return path가 명확해야 한다.

Potential Trade-off:
entry가 많아지면 novice user가 어떤 entry를 선택할지 판단해야 한다.

Candidate Principle Readiness:
Ready

### Search as Entity-directed Entry

Observation:
Yahoo Help는 Search가 company names, ticker symbols, ETFs, indices, commodities, mutual funds, cryptocurrency를 지원한다고 기록한다.

Evidence Level:
Official Documentation Only / Partial

Why It May Work:
하나의 low-density input이 wide Entity universe를 압축하기 때문이다.

User Benefit:
Decision Speed, Discoverability

Conditions Required:
Search Suggestion이 Entity Type, exchange, symbol disambiguation을 충분히 제공해야 한다.

Potential Trade-off:
Suggestion Dropdown은 Not Verified라 ambiguous query 비용을 판단할 수 없다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Quote as Stock / Symbol Entity Hub

Observation:
AAPL Quote는 Summary, Chart, News, Statistics, Financials, Holders, Analysis, Sustainability, Options, Historical Data, Profile, Conversation, Related tabs candidate를 ticker context에 묶는다.

Evidence Level:
Observed / Partial

Why It May Work:
Stock / Symbol 판단에 필요한 chart, table, company display, News, Premium analysis candidate를 같은 Quote context 안에 배치하기 때문이다.

User Benefit:
Context Preservation, Decision Speed, Evidence Traceability

Conditions Required:
Quote tab bodies, related symbol transition, Company Display boundary가 명확해야 한다.

Potential Trade-off:
tab proliferation, Premium Module competition, external article context loss가 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Quote Local Tabs as Progressive Disclosure

Observation:
Quote는 Summary와 다수 local tabs를 결합한다. Quote Help도 Summary, Chart, Statistics, Historical Data, Profile, Financials, Analysis, Options, Holders, Sustainability를 기록한다.

Evidence Level:
Official Documentation / Partial

Why It May Work:
Summary에서 first scan을 제공하고 detail content를 tabs로 분리해 Information Density를 제어하기 때문이다.

User Benefit:
Information Density Control, Context Preservation

Conditions Required:
tab state, current tab body, public / Premium boundary가 명확해야 한다.

Potential Trade-off:
tab 수가 많으면 Navigation cost와 section selection cost가 생긴다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Markets Table Comparison

Observation:
Markets Overview는 World Indices, Americas, Europe, Asia, Commodities, Currencies, Bonds, Stocks sections를 제공한다. Crypto와 Currencies sub-surfaces는 observed status다.

Evidence Level:
Observed

Why It May Work:
asset category와 region comparison을 Quote 이전 단계에서 table grammar로 제공하기 때문이다.

User Benefit:
Comparison Efficiency, Market Orientation

Conditions Required:
asset detail transition과 row-to-Quote relation이 확인되어야 한다.

Potential Trade-off:
asset detail body와 drill-down은 Not Verified다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Screener Hub and Result Split

Observation:
Screeners Hub는 predefined screener cards와 Create entry를 제공하고, predefined result는 filter summary, table, heatmap view, Save, Download, Customize candidate actions를 제공한다.

Evidence Level:
Observed

Why It May Work:
novice user는 predefined card로 시작하고, experienced user는 result table과 custom criteria로 확장할 수 있기 때문이다.

User Benefit:
Discoverability, Comparison Efficiency, Learnability

Conditions Required:
Save, Download, Customize gate와 row-to-Quote state가 명확해야 한다.

Potential Trade-off:
custom save는 Login Required이고 advanced data는 Premium Feature다.

Candidate Principle Readiness:
Ready

### News Publisher Label

Observation:
News Product snippets와 Quote content는 Source-labeled article을 포함한다.

Evidence Level:
Partial

Why It May Work:
headline scan 전 publisher를 볼 수 있어 Source-based triage가 가능하기 때문이다.

User Benefit:
Evidence Traceability, Decision Speed

Conditions Required:
timestamp, related symbol, original article return path가 함께 확인되어야 한다.

Potential Trade-off:
external article 이동 후 Yahoo Finance context loss가 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Exchange / Provider Documentation

Observation:
Yahoo Help는 exchange suffix, delay, data provider table과 company / fund data provider categories를 제공한다.

Evidence Level:
Official Documentation Only

Why It May Work:
Product-wide Help layer가 Freshness와 Source Visibility를 보완하기 때문이다.

User Benefit:
Evidence Traceability, Trust, Expert Scalability

Conditions Required:
Product UI에서 Help methodology로 가는 path가 discoverable해야 한다.

Potential Trade-off:
item-level Metric Source는 Not Verified라 Help lookup cost가 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Premium Provider Transparency

Observation:
Premium Help와 plan pages는 Morningstar, Argus, Vickers, S&P Global Market Intelligence, Trading Central, LSEG Data & Analytics 등 provider를 명시한다.

Evidence Level:
Official Documentation / Official Pricing

Why It May Work:
Premium Feature가 black-box가 아니라 named provider와 일부 methodology에 연결되기 때문이다.

User Benefit:
Evidence Traceability, Expert Scalability

Conditions Required:
report body와 Product gate가 실제 UI에서 provider와 연결되어야 한다.

Potential Trade-off:
Premium dependency와 provider fragmentation이 있다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Fair Value Methodology Layer

Observation:
Fair Value Help는 Trading Central partner, Peter Lynch style calculation, daily price update, weekly fundamental update를 기록한다.

Evidence Level:
Official Documentation Only / Premium Feature

Why It May Work:
Premium valuation module이 formula와 update cadence를 제공해 interpretation basis를 보여주기 때문이다.

User Benefit:
Evidence Traceability, Decision Support

Conditions Required:
Quote 안의 Fair Value module에서 methodology를 쉽게 확인할 수 있어야 한다.

Potential Trade-off:
Premium Feature라 public verification과 cross-user consistency가 제한된다.

Candidate Principle Readiness:
Ready with Scope Limitation

### Portfolio Methodology Documentation

Observation:
Premium Portfolio Analytics Help는 time weighted return assumptions, missing cost basis handling, performance, risk, allocation, heat map view, model portfolios를 기록한다.

Evidence Level:
Official Documentation Only / Premium Feature

Why It May Work:
personal data analytics에서 calculation assumptions를 노출해 Portfolio interpretation을 지원하기 때문이다.

User Benefit:
Personal Continuity, Evidence Traceability

Conditions Required:
logged-in Portfolio UI와 Premium analytics body가 확인되어야 한다.

Potential Trade-off:
Login Required와 Premium Feature에 강하게 의존한다.

Candidate Principle Readiness:
Needs Additional Evidence

### Premium Ad-free as Density Control

Observation:
Premium Help는 select plans에서 third-party ads 제거를 기록하고, plan pages도 ad-free benefit을 표시한다.

Evidence Level:
Official Documentation / Premium Feature

Why It May Work:
Premium이 analysis expansion뿐 아니라 visual competition reduction으로 작동할 수 있기 때문이다.

User Benefit:
Information Density Control, Decision Speed

Conditions Required:
actual ad-free layout effect와 content hierarchy change가 확인되어야 한다.

Potential Trade-off:
Product Principle보다 subscription benefit 또는 business model constraint에 가깝다.

Candidate Principle Readiness:
Benchmark-specific

## User Friction Inventory

| Friction ID | Trigger | Affected User | Affected Surface | Observation Status | User Cost | Decision Impact | Workaround | Access Restriction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YF-FR-001 | Portal content mixing | novice / research user | Home | Partial | primary task 선택 비용 | Research 집중이 늦어질 수 있다. | Search 또는 Quote direct entry | Public / Login candidate | Medium | Home current hierarchy 확인 필요 |
| YF-FR-002 | Public Home hierarchy partial | all users | Home | Partial | first viewport priority 판단 불가 | Home strength 평가 제한 | Markets / Search direct entry | Public | Medium | direct body 429 보완 필요 |
| YF-FR-003 | Search Suggestion Not Verified | novice user | Search | Not Verified | Entity disambiguation 비용 판단 불가 | wrong Quote selection 가능성 | ticker direct input | Public | Low | Suggestion labels 확인 필요 |
| YF-FR-004 | Quote tab proliferation | novice / intermediate user | Quote | Observed / Partial | tab selection 비용 | needed detail을 찾는 속도 저하 | Summary first scan | Public / Premium 일부 | Medium | current tab order 확인 필요 |
| YF-FR-005 | Quote tab body partial | Stock researcher | Quote | Partial / Not Verified | content depth 판단 불가 | public research depth 평가 제한 | Help documentation | Public / Premium 일부 | Medium | tab body direct 확인 필요 |
| YF-FR-006 | Stock / Company Display boundary | Entity researcher | Quote | Partial | Stock와 Company context 구분 비용 | Entity relation 판단 제한 | Profile tab | Public | Medium | internal Company Surface 확인 필요 |
| YF-FR-007 | Premium Module competition | Public user | Quote / Screeners | Partial / Premium Feature | upsell과 content 구분 비용 | decision focus 분산 가능 | ignore / subscribe | Premium Feature | Medium | Product gate 위치 확인 필요 |
| YF-FR-008 | Advertisement competition | Public user | Home / Markets / News | Partial | scan interruption 가능성 | Market / News scan 속도 저하 가능 | ad-free Premium | Public / Premium | Medium | ad placement and visual stability 확인 필요 |
| YF-FR-009 | External article context loss | News user | News / Quote News | Partial | Yahoo context 복귀 비용 | Evidence validation 이후 Quote context 손실 | browser back | Public | Medium | return path 확인 필요 |
| YF-FR-010 | Related symbol origin loss | Stock researcher | Quote Related | Not Verified / Partial | previous relation reason 손실 가능 | peer/related comparison 약화 | browser back | Public | Low | Related body 확인 필요 |
| YF-FR-011 | Screener criteria loss | Screener user | Screener / Quote | Partial | Quote 이동 후 criteria recall 비용 | candidate comparison loop 약화 | browser back | Public / Login for save | Medium | Back state 확인 필요 |
| YF-FR-012 | Portfolio login barrier | returning user | Portfolio | Login Required | personal analysis 시작 제한 | Personal Continuity 제한 | sign in | Login Required | High | logged-in UI 확인 필요 |
| YF-FR-013 | Watchlist login barrier | monitoring user | Watchlist | Login Required | symbol set 저장 제한 | revisit entry 제한 | sign in | Login Required | High | Watchlist boundary 확인 필요 |
| YF-FR-014 | Saved Screener login barrier | discovery user | Screeners | Official Documentation / Login Required | reusable criteria 저장 제한 | repeated discovery cost 증가 | sign in | Login Required | Medium | persistence 확인 필요 |
| YF-FR-015 | Premium Analysis gate | research user | Quote / Premium | Premium Feature | advanced evidence 접근 제한 | analyst / valuation depth 제한 | subscribe | Premium Feature | High | in-product lock 확인 필요 |
| YF-FR-016 | Provider fragmentation | evidence user | Quote / Premium | Official Documentation | provider별 methodology 이해 비용 | Source interpretation 분산 | Help references | Public / Premium | Medium | provider per module 확인 필요 |
| YF-FR-017 | Quote Metric formula gap | evidence user | Quote | Methodology Gap | item-level formula 확인 비용 | Metric interpretation 제한 | Help / external analysis | Public / Premium 일부 | Medium | formula link 확인 필요 |
| YF-FR-018 | Filing-level Traceability gap | financial user | Financials | Not Verified | original filing 확인 비용 | financial validation 약화 | external filing search | Public / Premium 일부 | Medium | filing path 확인 필요 |
| YF-FR-019 | Chart control learning cost | chart user | Chart | Official Documentation / Partial | controls and indicator setup 학습 비용 | technical analysis setup 지연 | Help article | Public / Premium 일부 | Medium | current UI 확인 필요 |
| YF-FR-020 | Mobile and Recent unknown | mobile / returning user | all / Home | Not Verified | mobile density와 revisit 판단 불가 | continuity assessment 보류 | desktop only | Not Verified | Low | mobile and Recent 확인 필요 |

## Advertisement / Premium Assessment

| 항목 | Observation | Evidence Level | User Benefit | User Cost | Product Benefit | Trust Impact | Density Impact | Context Impact | Candidate Principle Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Advertisement Interference | `ADVERTISEMENT` label과 ad-free Premium benefit이 기록됐다. | Partial / Official Pricing | Public access 비용을 낮출 수 있다. | content scan과 visual hierarchy 경쟁 가능 | monetization | ad label은 구분에 도움 | visual competition 가능 | flow interruption 가능 | Needs Additional Evidence |
| Premium Module Interference | Premium Feature가 Quote, Screeners, Portfolio, Chart와 연결된다. | Partial / Premium Feature | advanced analysis entry 제공 | subscription landing 이동과 context loss 가능 | conversion | gate transparency 가능 | content expansion과 competition 동시 발생 | Quote context에서 이탈 가능 | Ready with Scope Limitation |
| Subscription Navigation | Premium landing, plan selection, compare pages가 observed다. | Observed / Official Pricing | boundary planning 가능 | product action 중단 가능 | paid plan conversion | provider and plan visibility | ad-free as Density Control | entitlement context로 전환 | Benchmark-specific |

## Personal Continuity Assessment

| Item | Product Responsibility | State Owner | Login Required | Premium Feature | Persistence 범위 | 실제 UI 확인 여부 | Documentation Evidence | Context Restoration 가능성 | Context Loss Risk | Principle Extraction Readiness | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Watchlist | followed symbol set candidate | User Account | Yes | plan copy 일부 | account candidate | Not Verified | Yahoo Help | Medium | Medium | Needs Additional Evidence | Portfolio와 boundary |
| Portfolio | holdings / transaction candidate | User Account | Yes | analytics 일부 | account | Not Verified | Yahoo Help | Medium | Medium | Needs Additional Evidence | internal primary unit |
| Saved Screener | saved criteria | User Account | Yes | limits / advanced 일부 | account candidate | Not Verified | Yahoo Help | Medium | Medium | Needs Additional Evidence | dynamic vs static |
| Alerts | monitoring trigger | User Account | Yes | Yes | account candidate | Not Verified | Premium Help | Medium | High | Needs Additional Evidence | trigger target |
| Chart Preference | chart settings candidate | browser / account unknown | Not Verified | 일부 Premium | Not Verified | Not Verified | Chart Help | Low | Medium | Needs Additional Evidence | storage owner |
| Recent | recent symbol candidate | unknown | Not Verified | Not Verified | Not Verified | Not Verified | None | Low | High | Reject | feature existence |
| Personalized Home | personal portal candidate | User Account | Yes | Maybe | account candidate | Not Verified | Help overview | Medium | Medium | Needs Additional Evidence | logged-in Home |
| Brokerage Link | external data connection | User Account / Broker | Yes | Not clear | account / broker | Not Verified | Portfolio Help | Medium | Medium | Needs Additional Evidence | sync cadence |

## Context Preservation Assessment

| Context | Preserved Context | Context Owner | Persistence Scope | Page Transition 후 유지 여부 | External Transition 후 유지 여부 | Login Required | Premium Feature | Evidence Level | Context Loss Risk | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global Navigation | Surface access | Product | session | Partial | Not Applicable | No | No | Partial | Low | current global nav body |
| Search Query | typed query | User / session | transient | Partial | No | No | No | Documentation / Partial | Medium | query history |
| Quote Symbol | ticker context | URL / Product | URL | Partial / Observed | No | No | 일부 | Observed / Partial | Low in Quote | external article |
| Quote Local Tab | selected section | URL candidate | page / URL | Partial | No | No | 일부 | Partial | Medium | tab persistence |
| Chart Preference | settings | browser / account unknown | Not Verified | Not Verified | No | Not Verified | 일부 | Documentation | Medium | storage owner |
| Screener Criteria | filter criteria | User / URL candidate | transient / account if saved | Partial | No | save requires login | 일부 | Observed / Documentation | Medium | Back state |
| Screener Result | candidate set | Product / criteria | page | Partial | No | No | 일부 | Observed | Medium | result restore |
| Related Symbol Origin | origin relation | Product candidate | Not Verified | Not Verified | Not Applicable | No | No | Not Verified | High | relation reason |
| External Article | publisher context | External | external page | No | external only | No | No | Partial | High | return path |
| Watchlist | symbol membership | User Account | account | Not Verified | Not Verified | Yes | 일부 | Documentation | Medium | logged-in UI |
| Portfolio | holdings / transactions | User Account | account | Not Verified | Not Verified | Yes | analytics 일부 | Documentation | Medium | internal UI |
| Saved Screener | saved criteria | User Account | account | Not Verified | Not Verified | Yes | 일부 | Documentation | Medium | persistence |
| Alerts | trigger | User Account | account | Not Verified | Not Verified | Yes | Yes | Premium Feature | High | trigger builder |
| Premium Module | gate / entitlement | Product / User Account | session / account | Partial | No | sign-in for entitlement | Yes | Pricing / Documentation | Medium | gate UI |
| Recent | recent symbol | unknown | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | Not Verified | High | existence |
| Logged-in Home | personal content | User Account | account | Not Verified | Not Verified | Yes | Maybe | Documentation / Partial | Medium | block order |
| Personalized Home | Watchlist / Portfolio modules | User Account | account | Not Verified | Not Verified | Yes | Maybe | Documentation / Partial | Medium | current UI |
| Revisit State | prior context | User / account | Not Verified | Not Verified | Not Verified | likely | maybe | Not Verified | High | next-day test |

## Product Responsibility Matrix

| Product Element | Surface | Tool | Entity | User-owned Entity | User State | Contextual Content | External Evidence | Capability | Primary Responsibility | Secondary Responsibility |
| --------------- | ------- | ---- | ------ | ----------------- | ---------- | ------------------ | ----------------- | ---------- | ---------------------- | ------------------------ |
| Finance Home | Yes | No | No | No | No | Yes | No | No | Portal Entry | Market / News / Personal candidate |
| Search | No | Yes | No | No | Partial | No | No | Yes | Entity lookup | disambiguation candidate |
| Search Suggestion | No | No | No | No | Partial | Yes | No | Yes | result preview candidate | Entity Type candidate |
| Markets | Yes | No | Market candidate | No | No | Yes | No | No | category comparison | asset entry |
| Quote | Yes | No | Stock anchor | No | Partial | Yes | No | Yes | symbol detail | Entity Hub candidate |
| Quote Summary | No | No | Stock context | No | No | Yes | No | No | first scan | price / Metric / News |
| Chart | Yes | Yes | No | No | Partial | Yes | No | Yes | price visualization | compare / indicator |
| Financials | No | No | No | No | No | Yes | No | No | statement table candidate | financial Evidence |
| Statistics | No | No | No | No | No | Yes | No | No | Metric scan | valuation / highlights |
| Analysis | No | No | No | No | No | Yes | No | No | estimates / analyst candidate | Premium bridge |
| News | Yes | No | News candidate | No | No | Yes | External article | No | headline scan | Quote support |
| Conversation | No | No | Discussion candidate | No | No | Yes | No | Partial | community content candidate | sentiment candidate |
| Sustainability | No | No | Company Display candidate | No | No | Yes | No | No | ESG candidate | provider candidate |
| Screeners | Yes | Yes | No | No | Partial | No | No | Yes | criteria discovery | custom save candidate |
| Predefined Screener | Yes | Yes | No | No | No | Yes | No | Yes | low-setup discovery | novice entry |
| Custom Screener | Yes | Yes | No | No | Yes | No | No | Yes | user criteria | saved state |
| Screener Result | No | No | Output candidate | No | Partial | Yes | No | Yes | comparison output | Quote transition candidate |
| Watchlist | Yes | No | No | Yes | Yes | Yes | No | Yes | symbol monitoring candidate | Home personalization candidate |
| Portfolio | Yes | No | No | Yes | Yes | Yes | broker link candidate | Yes | holdings candidate | analytics candidate |
| Holdings | No | No | No | Yes | Yes | Yes | broker / CSV candidate | No | position data candidate | performance input |
| Transactions | No | No | No | Yes | Yes | Yes | broker / CSV candidate | No | cost basis input | calculation input |
| Saved Screener | No | No | No | Yes | Yes | No | No | Yes | saved criteria | repeat discovery |
| Alerts | No | No | No | No | Yes | No | No | Yes | monitoring | Premium continuity |
| Premium | Yes | No | Subscription Plan | No | Yes | No | No | Yes | entitlement boundary | subscription navigation |
| Fair Value | No | No | No | No | No | Yes | provider methodology | Yes | valuation analysis | Premium module |
| Research Report | No | No | No | No | No | Yes | provider report | Yes | third-party research | Premium content |
| Advertisement | No | No | No | No | Partial | Yes | No | No | monetization | density competition |
| External Article | No | No | News source | No | No | No | Yes | No | original article | context loss point |
| Stock / Symbol | No | No | Yes | No | No | No | No | No | primary Quote anchor | Watchlist / Portfolio unit |
| Company Display | No | No | Candidate | No | No | Yes | company site candidate | No | profile context | Stock support |
| Crypto Asset | Yes | No | Yes | No | No | Yes | No | No | asset comparison | Quote candidate |
| Currency Pair | Yes | No | Yes | No | No | Yes | No | No | pair comparison | detail candidate |

## Cross Benchmark Note

### Shared Pattern

- Symbol / Stock Context Hub
- Search-driven Entity Discovery
- Table-based Market Comparison
- Source / Freshness Cue
- Local Tab Progressive Disclosure
- Personal Continuity as account state candidate
- Methodology Layer outside main Product Surface

### Variant Pattern

- Portal Entry vs Workspace Entry
- Search-centered Discovery vs Screener-centered Discovery
- Quote Entity Hub vs Dense Single Page
- External Article Link vs embedded Evidence
- Provider-labeled Research vs filing-centered Traceability
- Public / Premium Entitlement Boundary

### Benchmark-specific Pattern

- Finance Portal + Research Tool combination
- Premium Research Provider Aggregation
- Public Quote + Premium Module mix
- Personalized Home Candidate
- Brokerage-linked Portfolio Candidate

### Potential Contradiction

직접 반대 Evidence는 없다. Portal Entry와 Workspace Entry, external article routing과 embedded Evidence는 Variant Pattern으로 유지한다.

### Insufficient Evidence

- Search Suggestion
- Logged-in Home
- Portfolio Internals
- Watchlist Internals
- Saved Screener Persistence
- Alerts
- Recent
- Mobile
- External Article Return Path
- Quote 일부 Tab Body
- Chart Preference Persistence

## Do Not Copy

- Finance Home의 Portal mix를 DATE Home 방향으로 확정하지 않는다.
- Search Suggestion을 확인한 Interaction처럼 쓰지 않는다.
- Quote tabs를 모두 검증된 depth로 보지 않는다.
- Company Display를 독립 Company Entity Surface로 확정하지 않는다.
- Portfolio와 Watchlist를 같은 Product responsibility로 합치지 않는다.
- Premium Provider Transparency를 public Evidence Traceability로 과장하지 않는다.
- ad-free를 단순 UI preference로만 보지 않는다.
- Personal Continuity 가능성을 실제 persistence Observation처럼 쓰지 않는다.

## Open Question

- Search Suggestion은 Entity Type, exchange, price를 표시하는가.
- Logged-in Home은 Watchlist / Portfolio를 어떤 hierarchy로 보여주는가.
- Quote tabs 중 Financials, Analysis, Sustainability, Conversation, Related body는 current UI에서 어떤 content를 제공하는가.
- Premium gate는 Quote, Chart, Screeners, Portfolio에서 어떤 UI로 나타나는가.
- Portfolio internal primary unit은 holdings, transaction, list, broker link 중 무엇인가.
- Watchlist와 Portfolio responsibility는 logged-in UI에서 어떻게 분리되는가.
- Recent 또는 History가 존재하는가.
- external article 이후 Yahoo Finance context로 돌아오는 Product path가 있는가.
- Chart Preference는 browser state인지 account state인지 확인 필요.
- mobile에서 Portal / Quote / table density가 어떻게 재구성되는가.
