# Bloomberg Screen and Function Inventory

## Inventory 기준

이번 문서는 Screen 또는 Function Category 후보를 기록한다. Function Code 전체를 수집하지 않고, 공식 Source에서 확인 가능한 Product 책임만 기록한다.

## Public Page Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-001 | Bloomberg.com | Home | Page | bloomberg.com | global news, video, In Focus, Latest, Market Data footer entry | News | Market / Video | News List, Video, Dense Summary | open article / video / category | category nav | Public / Subscription CTA | Partially Observed | Official Product Observation | High | personalization and paywall state Not Verified |
| BBG-SFI-002 | Bloomberg.com | Markets | Page | /markets | market news and Top Securities | Market | Security / Article | Quote Strip, News List | open market section / article | Markets sublinks | Public | Observed | Official Product Observation | High | dynamic order varies |
| BBG-SFI-003 | Bloomberg.com | Stocks | Page | /markets/stocks | regional equity index table | Equity Index | Stock | Table | scan table / open quote candidate | Futures / Americas / EMEA / APAC | Public | Observed | Official Product Observation | High | row click behavior Not Verified |
| BBG-SFI-004 | Bloomberg.com | Futures | Page | /markets/stocks/futures | futures contracts table | Futures Contract | Equity Index | Table | scan contract | Stocks / Americas / EMEA | Public | Observed | Official Product Observation | High | contract detail Not Verified |
| BBG-SFI-005 | Bloomberg.com | Commodities | Page | /markets/commodities | commodity overview and contract tables | Commodity | Futures Contract | Table, Chart candidate | scan commodity | Energy / Metals / Agriculture | Public | Observed | Official Product Observation | High | chart compare interaction Not Verified |
| BBG-SFI-006 | Bloomberg.com | Currencies | Page | /markets/currencies | currency market overview | Currency Pair | Country | Table | scan FX table | Market Data footer | Public | Partially Observed | Official Product Observation | Medium | full content extraction limited |
| BBG-SFI-007 | Bloomberg.com | Rates & Bonds | Page | /markets/rates-bonds | rate and bond market overview | Bond / Yield / Interest Rate | Country | Table | scan rates | Market Data footer | Public | Partially Observed | Official Product Observation | Medium | detail depth Not Verified |
| BBG-SFI-008 | Bloomberg.com | Economic Calendar | Page candidate | footer Market Data link | economic Event calendar candidate | Economic Indicator | Country | Calendar | view events | Not Verified | Public candidate | Not Verified | Inference | Low | page not opened in this phase |
| BBG-SFI-009 | Bloomberg.com | Sectors | Page candidate | footer Market Data link | Sector market data candidate | Sector | Industry | Table candidate | compare sectors | Not Verified | Public candidate | Not Verified | Inference | Low | page not opened in this phase |

## Public Quote / Market Detail Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-010 | Bloomberg.com | AAPL Quote | Detail | /quote/AAPL:US | stock quote summary and key statistics | Stock / Security | Company | Quote, Chart, Key Statistics | view quote / follow candidate | Overview / Key Statistics candidate | Public | Partially Observed | Official Product Observation | Medium | direct access was bot-challenged; search snippet only |
| BBG-SFI-011 | Bloomberg.com | SPX Quote | Detail | /quote/SPX:IND | equity index quote summary | Equity Index | Market | Quote, Chart, Key Statistics | view index quote | Overview / Key Statistics | Public | Partially Observed | Official Product Observation | Medium | search snippet and previous crawl |
| BBG-SFI-012 | Bloomberg.com | Apple Company Profile | Detail | /profile/company/AAPL:US | company description and news | Company | Stock | Company Profile | read profile | Not Verified | Public | Partially Observed | Official Product Observation | Medium | full module inventory Not Verified |
| BBG-SFI-013 | Bloomberg.com | Government Bond / Yield Quote | Detail candidate | quote / market links | government bond or yield detail candidate | Government Bond / Yield | Country | Quote candidate | view quote | Not Verified | Public candidate | Not Verified | Inference | Low | exact URL not verified |
| BBG-SFI-014 | Bloomberg.com | Commodity Contract Quote | Detail candidate | commodity table row | commodity / futures detail candidate | Commodity / Futures Contract | Exchange | Quote candidate | view quote | Not Verified | Public candidate | Not Verified | Inference | Low | exact row navigation Not Verified |
| BBG-SFI-015 | Bloomberg.com | Currency Pair Quote | Detail candidate | currencies page | FX pair detail candidate | Currency Pair | Country | Quote candidate | view quote | Not Verified | Public candidate | Not Verified | Inference | Low | exact row navigation Not Verified |
| BBG-SFI-016 | Bloomberg.com | Crypto Asset Detail | Detail candidate | Markets / Crypto section | crypto market detail candidate | Crypto Asset | News | Quote / News candidate | view asset | Not Verified | Public candidate | Not Verified | Inference | Low | Bloomberg Markets crypto detail not confirmed |

## Article Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-017 | Bloomberg.com | News Article | Article | headline | Bloomberg Original News story | Article / News | Company / Market candidate | Article | read / save candidate | related articles candidate | Public / Subscription Required candidate | Partially Observed | Official Product Observation | High | paywall and related entity structure varies |
| BBG-SFI-018 | Bloomberg.com | Markets Article | Article | Markets page headline | market-moving story | News / Market | Security / Country candidate | Article | read article | category | Public / Subscription Required candidate | Partially Observed | Official Product Observation | High | article context return Not Verified |
| BBG-SFI-019 | Bloomberg.com | Video Story | Article / Video | Home / Video | video news | Video | News | Video | play video | video playlist candidate | Public / Subscription Candidate | Partially Observed | Official Product Observation | Medium | live / subscription gate Not Verified |

## Search Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-020 | Bloomberg.com | Search Entry | Tool | header Search | keyword search candidate | Keyword | Article / Topic / Company candidate | Search Result | submit search | results filter candidate | Public | Partially Observed | Official Product Observation | Medium | suggestion and entity grouping Not Verified |
| BBG-SFI-021 | Bloomberg.com | Search Result | Page | search query | result listing candidate | Article / Topic | Company / Security candidate | Search Result | open result | Not Verified | Public | Not Verified | Inference | Low | result page not inspected |
| BBG-SFI-022 | Bloomberg Terminal | Command Line | Tool / Function | Terminal | execute Function / Security lookup candidate | Function / Security | User | Command Line | run command | autocomplete / help candidate | Institutional Access Required | Official Documentation Only | Official Product Description | Medium | actual command parsing Not Verified |
| BBG-SFI-023 | Bloomberg Terminal | Function Help / Related Function Navigation | Tool candidate | Terminal HELP candidate | discover functions | Function | User | Search Result / Help | find function | Not Verified | Institutional Access Required | Not Verified | Inference | Low | Function code behavior not confirmed |

## Terminal Workspace Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-024 | Bloomberg Terminal | Terminal Workspace | Workspace | Terminal login | integrated professional workflow | Security / Market / Function | News / Portfolio / Message | Multi-panel Workspace | analyze / execute / communicate | command line, functions, panels | Institutional Access Required | Official Product Description | Official Product Description | High | no direct session |
| BBG-SFI-025 | Bloomberg Terminal | Launchpad | Workspace / Monitor | Terminal | customized multi-asset monitors, alerts, charts, news | Security / Market | News / Alert | Monitor, Chart, News Feed | monitor / configure | panels candidate | Institutional Access Required | Official Product Description | Official Product Description | High | layout persistence Not Verified |
| BBG-SFI-026 | Bloomberg Terminal | Bloomberg Keyboard / B-Unit | Tool | Terminal access | authentication and command hardware candidate | User | Organization | Hardware / Authentication | login / shortcut candidate | Not Verified | Institutional Access Required | Official Documentation Only | Official Documentation | Medium | keyboard interaction Not Verified |
| BBG-SFI-027 | Bloomberg Anywhere | Bloomberg Anywhere Login | Surface | bba.bloomberg.com | remote Terminal access | User | Terminal Subscription | Login Surface | log in | B-Unit | Login Required / Institutional Access Required | Observed | Official Product Observation | High | post-login Not Verified |
| BBG-SFI-028 | Bloomberg Professional App | Today / Mobile Market Monitor | Surface / Feed | mobile app | mobile news and market monitoring | News / Market / Security | Worksheet | Feed, Mobile Surface | monitor / read | app tabs candidate | Login Required / Institutional Access Required | Official Documentation Only | Official Product Description | High | actual app UI Not Verified |

## Terminal Function Category Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-029 | Bloomberg Terminal | Security Lookup | Function Category | Command Line candidate | find and open Security | Security | Company / Exchange | Search Result / Detail | lookup | related function candidate | Institutional Access Required | Official Documentation Only | Official Product Description | Medium | no official function code recorded |
| BBG-SFI-030 | Bloomberg Terminal | Description / Company Overview | Function Category | Security context | describe Security / Company | Security / Company | Industry / Country | Dense Summary / Detail | inspect overview | related securities candidate | Institutional Access Required | Official Product Description | Official Product Description | Medium | exact screen Not Verified |
| BBG-SFI-031 | Bloomberg Terminal | Market Data | Function Category | Terminal | real-time and historical data | Security / Market | Exchange | Table, Quote, Chart | monitor data | functions candidate | Institutional Access Required | Official Product Description | Official Product Description | High | exchange entitlement UI Not Verified |
| BBG-SFI-032 | Bloomberg Terminal | Analytics | Function Category | Terminal | analyze securities, markets, risk | Security / Portfolio / Market | Metric | Table, Chart, Model | analyze | functions candidate | Institutional Access Required | Official Product Description | Official Product Description | High | calculation screens Not Verified |
| BBG-SFI-033 | Bloomberg Terminal | Trading / Execution | Function Category | Terminal / trading products | order and execution workflows | Order / Security | Broker / Market | Order Management, Execution | trade | order management | Institutional Access Required | Official Product Description | Official Product Description | Medium | DATE Phase 6.1 does not analyze trading flow |

## News Function Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-034 | Bloomberg Terminal | Top News | Feed / Function Category | Terminal News | day’s biggest global headlines | News | Market / Company | News Feed, Digest | scan news | topics candidate | Institutional Access Required | Official Product Description | Official Product Description | High | exact function code Not Verified |
| BBG-SFI-035 | Bloomberg Terminal | First Word | Feed / Function Category | Terminal News | breaking news bullet digests | News / Event | Market | News Feed | scan breaking updates | alerts candidate | Institutional Access Required | Official Product Description | Official Product Description | High | exact screen Not Verified |
| BBG-SFI-036 | Bloomberg Terminal | Daybreak / Morning Report | Report / Function Category | Terminal News | curated briefing and security-list report | News / Security List | Market / Event | Report / Digest | read briefing | personalization candidate | Institutional Access Required | Official Product Description | Official Product Description | High | personalization behavior Not Verified |
| BBG-SFI-037 | Bloomberg Terminal | News Trends | Monitor / Function Category | Terminal News | analyze companies and topics receiving attention | Company / Topic | News / Social Source | Monitor, Table, Sentiment candidate | scan trends | drill-down candidate | Institutional Access Required | Official Product Description | Official Product Description | High | exact metrics Not Verified |
| BBG-SFI-038 | Bloomberg Terminal | News Alerts | Alert | Terminal News / App | receive relevant breaking news | News / Event | Security | Alert | create / receive alert | notification candidate | Institutional Access Required | Official Product Description | Official Product Description | High | alert rule builder Not Verified |

## Chart Function Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-039 | Bloomberg Terminal | Bloomberg Charts | Tool / Function Category | Terminal chart tools | visualize and compare instruments | Security / Market | Benchmark | Chart | plot / compare / annotate | templates / shortcuts candidate | Institutional Access Required | Official Product Description | Official Product Description | High | exact chart UI Not Verified |
| BBG-SFI-040 | Bloomberg Terminal | Comparison Chart | Tool candidate | chart tools | compare multiple instruments | Security | Benchmark | Chart | compare | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | specific function code Not Verified |
| BBG-SFI-041 | Bloomberg Terminal | MAPS <GO> | Function candidate | charts page mentions MAPS <GO> | geographic context visualization | Country / Market / Facility candidate | Dataset | Map / Chart | visualize map | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | function behavior Not Verified |

## Market Discovery Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-042 | Bloomberg Terminal | Market Monitor | Monitor candidate | Terminal / Launchpad | monitor multi-asset securities | Market / Security | Watchlist | Monitor, Table | scan | panel candidate | Institutional Access Required | Official Product Description | Official Product Description | Medium | actual monitor layout Not Verified |
| BBG-SFI-043 | Bloomberg Terminal | Top Movers | Function Category candidate | Terminal | discover moving securities | Security | Market | Table | compare movers | Not Verified | Institutional Access Required | Not Verified | Inference | Low | not confirmed by official source in this phase |
| BBG-SFI-044 | Bloomberg Terminal | Equity Screening | Function Category candidate | Terminal research / analytics | filter equity universe | Stock / Company | Metric | Table / Filter | screen | Not Verified | Institutional Access Required | Not Verified | Inference | Low | official function not verified |
| BBG-SFI-045 | Bloomberg Terminal | Economic Calendar | Function Category candidate | Terminal | macro event tracking | Economic Indicator / Event | Country | Calendar | scan events | Not Verified | Institutional Access Required | Not Verified | Inference | Low | exact function not verified |

## Company Research Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-046 | Bloomberg Terminal | Bloomberg Intelligence | Research / Report | Terminal research | industry, company, region research | Company / Industry | Region / Analyst | Report, Interactive Data | read / analyze | BI product modules | Institutional Access Required / Additional Product candidate | Official Product Description | Official Product Description | High | exact Terminal module Not Verified |
| BBG-SFI-047 | Bloomberg Terminal | Company Financial Analysis | Function Category candidate | Terminal research | company financial data and analysis | Company / Security | Metric | Table, Chart | analyze | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | screen detail Not Verified |
| BBG-SFI-048 | Bloomberg Terminal | Estimates / Analyst Recommendations | Function Category candidate | Terminal / mobile app description | analyst recommendations and estimates | Company / Security | Analyst Estimate | Table / Research | compare estimates | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | exact Source / screen Not Verified |
| BBG-SFI-049 | Bloomberg Terminal | Document Search | Research Tool candidate | Professional App description | search company documents | Company Document | Company / Filing candidate | Search Result | search documents | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | document corpus and interaction Not Verified |

## Fixed Income Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-050 | Bloomberg Terminal | Fixed Income Trading / Analysis | Function Category | Trading product | fixed income pricing, liquidity, trading, processing | Bond / Fixed Income Security | Dealer / Order | Table, Analytics, Order | analyze / trade | asset class tools | Institutional Access Required | Official Product Description | Official Product Description | Medium | analysis vs execution screens not separated |
| BBG-SFI-051 | Bloomberg Terminal | Yield / Curve Analysis | Function Category candidate | Charts / analytics | yield curve analysis | Yield / Interest Rate | Government Bond | Chart / Curve | analyze curve | Not Verified | Institutional Access Required | Not Verified | Inference | Low | exact function not verified |

## Macro / Economic Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-052 | Bloomberg Terminal | Bloomberg Economics | Research / Tool | Terminal research | economic insights and interactive tools | Economic Indicator / Country | Market | Report / Data Tool | analyze macro | research modules | Institutional Access Required | Official Product Description | Official Product Description | Medium | exact screen Not Verified |
| BBG-SFI-053 | Bloomberg.com | Economics | Page / News vertical | top navigation | economics news | News / Economic Event | Country | News List / Article | read | category | Public / Subscription Candidate | Partially Observed | Official Product Observation | Medium | no detailed inventory |

## Portfolio / Risk Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-054 | Bloomberg Terminal | Portfolio & Risk Analytics | Dashboard / Tool | PORT product | positions, risk, performance, attribution, scenario analysis | Portfolio | Position / Risk Factor | Dashboard, Table, Chart, Report | analyze portfolio | PORT modules | Institutional Access Required | Official Product Description | Official Product Description | High | actual Portfolio UI Not Verified |
| BBG-SFI-055 | Bloomberg Terminal | PORT Enterprise | Enterprise Capability | Portfolio Analytics | firm-wide portfolio / risk analytics | Portfolio / Organization | Position | Dashboard / Report | scale analytics | imports / scheduling candidate | Institutional Access Required / Enterprise | Official Product Description | Official Product Description | High | enterprise workflow Not Verified |
| BBG-SFI-056 | Bloomberg Professional App | Worksheets | Mobile Surface / Workspace candidate | mobile app | access Terminal-created worksheets and watch lists | Worksheet / Watchlist | Security | Mobile Table / News / Chart | monitor | app tabs candidate | Login Required / Institutional Access Required | Official Product Description | Official Product Description | High | actual persistence Not Verified |

## Communication Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-057 | Bloomberg Terminal | Instant Bloomberg | Message Thread / Function | IB | chat with Bloomberg network | User / Message | Security / Research | Message Thread | message / share | chat rooms, folders, tabs | Institutional Access Required | Official Product Description | Official Product Description | High | actual chat UI Not Verified |
| BBG-SFI-058 | Bloomberg Terminal | MSG | Message Tool candidate | Professional App description | messaging | User / Message | Security | Message Thread | send message | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | MSG screen not separately inspected |
| BBG-SFI-059 | Bloomberg Terminal | NOTE | Tool candidate | Collaboration tools page | save / publish / tag research notes | Research Note | User / Security | Note | save / publish | Not Verified | Institutional Access Required | Official Product Description | Official Product Description | Medium | actual NOTE function Not Verified |

## Data / Integration Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-060 | Bloomberg Data License | Data License | Integration / Data Product | Data License page | enterprise dataset delivery | Dataset / Security | Data Field | Data Catalog, API Result, File | acquire / schedule data | DATA <GO>, Data.Bloomberg.com | Enterprise / Additional Product Required | Official Product Description | Official Product Description | High | no client portal access |
| BBG-SFI-061 | Bloomberg Data License | DATA <GO> | Surface candidate / Data Portal | Data License page | browse, test, customize datasets | Dataset | Security / Legal Entity | Data Catalog | browse / test | data portal | Enterprise / Additional Product Required | Official Product Description | Official Product Description | Medium | no client access |
| BBG-SFI-062 | Bloomberg Data Connectivity | Server API | Integration | SAPI page | consume real-time, historical, reference data and calculation engine | Security / Data Field | Application | API Result | query | API library | Enterprise / Terminal entitlement | Official Product Description | Official Product Description | High | API usage not tested |
| BBG-SFI-063 | Bloomberg Data Connectivity | B-PIPE / Cloud Access | Integration / Feed | Cloud Access page | real-time market data feed | Security / Exchange | Application | Data Feed | consume feed | entitlement controls | Enterprise / Entitlement Required | Official Product Description | Official Product Description | Medium | B-PIPE page not separately opened; cloud access page used |
| BBG-SFI-064 | Bloomberg Support | Excel Add-ins / API Components | Integration candidate | Customer Support | software updates and integration components | User / Application | Data | Spreadsheet Integration / API | download / install | support | Institutional Access Required candidate | Official Documentation | Official Documentation | Medium | actual Excel Add-in workflow Not Verified |

## Subscription / Access Inventory

| Screen / Function ID | Product | Name | Type | Entry | Purpose | Primary Entity | Secondary Entity | Information Type | Main Action | Local Navigation | Access Level | Observation Status | Evidence Type | Confidence | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BBG-SFI-065 | Bloomberg.com | Subscribe | Page / Form | Subscribe CTA | Digital and All Access subscription purchase | Subscription | User | Pricing, Form | subscribe | plan options | Public / Subscription Required | Observed | Official Pricing / Sales | High | current regional pricing may vary |
| BBG-SFI-066 | Bloomberg.com | Subscription Finder | Tool / Form | subscription-finder | organization or school access check | Organization | User | Form | enter organization | step flow | Public / Account candidate | Observed | Official Pricing / Sales | High | post-submit Not Verified |
| BBG-SFI-067 | Bloomberg Professional Services | Request a Demo | Form | request-demo | Professional / Terminal sales contact | Organization / User | Product | Form | request demo | product selection | Public / Sales | Observed | Official Pricing / Sales | High | pricing not directly listed |
| BBG-SFI-068 | Bloomberg Anywhere | B-Unit Login | Login Surface | bba.bloomberg.com | authenticate Terminal subscriber | User | Terminal Subscription | Login / Authentication | log in | B-Unit | Login Required / Institutional Access Required | Observed | Official Product Observation | High | login not performed |

## Primary Entity 후보

| Entity Candidate | 확인 수준 |
| --- | --- |
| Market | Observed |
| Security | Partially Observed / Official Product Description |
| Stock | Partially Observed |
| Company | Partially Observed |
| Equity Index | Observed |
| Bond | Partially Observed |
| Government Bond | Partially Observed |
| Yield | Partially Observed |
| Interest Rate | Partially Observed |
| Commodity | Observed |
| Futures Contract | Observed |
| Currency Pair | Partially Observed |
| Crypto Asset | Partially Observed |
| ETF | Public Surface candidate |
| Fund | Search / data candidate |
| Sector | Public Surface candidate |
| Industry | Official Product Description |
| Country | Partially Observed |
| Economic Indicator | Surface candidate |
| News | Observed |
| Article | Observed |
| Analyst Estimate | Official Product Description |
| Research Report | Official Product Description |
| Filing | Not Verified |
| Portfolio | Official Product Description |
| Position | Official Product Description |
| Watchlist | Official Product Description |
| Alert | Official Product Description |
| User | Observed in access / subscription surfaces |
| Organization | Observed in subscription finder / request demo |
| Subscription | Observed |
| Data Provider | Official Product Description |
| Exchange | Official Product Description |
| Function | Official Product Description / Not Verified |
| Workspace | Official Product Description |

Primary Entity 후보 수: 33

## Information Form 후보

| Information Form | 확인 수준 |
| --- | --- |
| Command Line | Official Product Description / Not Verified |
| Table | Observed |
| Chart | Official Product Description / Public candidate |
| Multi-panel Workspace | Official Product Description |
| News Feed | Observed / Official Product Description |
| Article | Observed |
| Dense Summary | Partially Observed |
| Quote Strip | Observed |
| Monitor | Official Product Description |
| Dashboard | Official Product Description |
| Heatmap | Not Verified |
| Calendar | Not Verified / Surface candidate |
| Matrix | Not Verified |
| Message Thread | Official Product Description |
| Search Result | Partially Observed / Not Verified |
| Alert | Official Product Description |
| Report | Official Product Description |
| Spreadsheet Integration | Official Documentation |
| API Result | Official Product Description |
| Video | Observed |
| Audio | Partially Observed |

Information Form 수: 21

## Phase 6.1 제한

- Navigation 분석은 수행하지 않았다.
- User Journey는 수행하지 않았다.
- Entity Relationship은 확정하지 않았다.
- Trust / Evidence 평가는 수행하지 않았다.
- Candidate Principle은 작성하지 않았다.
- Candidate Principle Registry는 수정하지 않았다.
