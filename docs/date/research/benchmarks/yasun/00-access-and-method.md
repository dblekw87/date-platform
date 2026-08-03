# YASUN.GG Access and Method

## 조사 환경

| 항목 | 값 |
| --- | --- |
| 조사 날짜 | 2026-08-03 KST |
| Timezone | Asia/Seoul |
| Device | Web extraction |
| Browser | Not Verified |
| Public Access | Observed |
| Login | Not Logged In |
| Subscription | Not Verified |
| Mobile 조사 | Not Observed |
| Interaction 조사 | Text extraction only |
| Secondary Source 사용 | Not Used |

## Official Source 범위

| Source | URL | 사용 범위 | Evidence Type |
| --- | --- | --- | --- |
| YASUN.GG Home | https://yasun.gg/ | homepage, market summary, dominance, news entry, lounge entry, popular stock, hot theme, FX entry | Official Product Observation |
| YASUN.GG Chart | https://yasun.gg/chart | chart shell, symbol sidebar, personal average price cue | Official Product Observation |
| YASUN.GG News | https://yasun.gg/news | `/news` page, headline area, live news feed, symbol sidebar, footer disclaimer | Official Product Observation |
| YASUN.GG Macro | https://yasun.gg/macro | macro dashboard, category tabs, commodities, FX, rates, global index, crypto groups | Official Product Observation |
| YASUN.GG Heatmap | https://yasun.gg/heatmap | KOSPI / KOSDAQ heatmap, top 100 market cap, refresh cue | Official Product Observation |
| YASUN.GG Calendar | https://yasun.gg/calendar | economic calendar, month view, search, importance filter | Official Product Observation |
| YASUN.GG Fees | https://yasun.gg/fees | broker fee calculator, input controls, cost comparison table, FAQ | Official Product Observation |
| YASUN.GG TV Watchlist | https://yasun.gg/tv-watchlist | TradingView watchlist generator, asset selection, TXT output, usage guide | Official Product Observation |
| YASUN.GG Lounge | https://yasun.gg/lounge | community feed entry, empty state, new post cue | Official Product Observation |
| YASUN.GG Trade | https://yasun.gg/trade | simulated trading entry, nickname input, legal boundary | Official Product Observation |
| YASUN.GG Leaderboard | https://yasun.gg/trade/leaderboard | simulated trading leaderboard shell, PnL table cue, start CTA | Official Product Observation |
| YASUN.GG Chat Popup | https://yasun.gg/chat-popup | chat consent, channel tabs, long / short cue, legal boundary | Official Product Observation |
| YASUN.GG About | https://yasun.gg/about | product positioning, feature claims, operating principles | Official Product Observation |
| YASUN Office | https://office.yasun.gg/ | office-style workspace shell, app launcher, autosave / connected cue | Official Product Observation |
| YASUN.GG Stock Report Example | https://yasun.gg/stock/005930/report | quantitative report example, tabs, valuation / signal units | Search Result / Public Product Observation |

## Observation Status 정의

| Status | 정의 |
| --- | --- |
| Observed | 공식 Product 화면에서 직접 확인한 항목 |
| Partially Observed | Surface 또는 label은 확인했으나 detail interaction과 state가 제한된 항목 |
| UI Cue Observed | 기능 존재를 암시하는 UI text 또는 control은 확인했으나 실제 동작은 확인하지 않은 항목 |
| Login Required | 로그인 전에는 확인할 수 없는 항목 |
| Not Verified | 이번 단계에서 확인하지 못한 항목 |

## Evidence Type 정의

| Evidence Type | 정의 |
| --- | --- |
| Official Product Observation | YASUN.GG 공식 Product 화면에서 직접 확인한 page / surface 구조 |
| Point-in-time Dynamic Observation | 자동 갱신되는 live feed를 특정 시점에 확인한 기록 |
| UI Text Observation | 화면 label, button, input, footer disclaimer에서 확인한 기록 |
| Inference | 공식 Product 화면에서 도출한 제한적 Interpretation |

## Access Boundary

| Area | Access Level | Observation Status | Limitation |
| --- | --- | --- | --- |
| Home | Public Access | Observed | dynamic market data and cards may be loading-state dependent |
| Header / Login | Public Access | Observed | login 이후 state는 Not Verified |
| Search | Public Access | UI Cue Observed | search result grouping은 Not Verified |
| Symbol Sidebar | Public Access | Observed | price update cadence와 interaction은 Not Verified |
| Chart Shell | Public Access | Partially Observed | chart rendering and interaction are Not Verified |
| Today Headline | Public Access | Observed | curation logic은 Not Verified |
| Live News Feed | Public Access | Observed | ranking algorithm과 source quality는 Not Verified |
| Macro Dashboard | Public Access | Observed | live values may be loading-state dependent |
| Heatmap | Public Access | Observed | tile interaction and full data are Not Verified |
| Calendar | Public Access | Observed | event detail and reminder behavior are Not Verified |
| Stock Report | Public Access example | Partially Observed | generation method, freshness, source lineage are Not Verified |
| Utility Tools | Public Access | Observed | calculation correctness and update process are Not Verified |
| Community | Public Access | Partially Observed | writing, moderation, identity, persistence are Not Verified |
| Simulated Trading | Public Access | UI Cue Observed | actual order / settlement mechanics are Not Verified |
| Office Workspace | Public Access shell | Partially Observed | app detail and data integration behavior are Not Verified |
| Source Disclosure | Public Access | UI Cue Observed | source list를 펼친 detail은 Not Verified |
| Alert / Voice | Public Access | UI Cue Observed | actual alert delivery와 voice behavior는 Not Verified |
| MY / Average Price | Login or user input candidate | UI Cue Observed | persistence와 calculation behavior는 Not Verified |
| Footer Disclaimer | Public Access | Observed | policy detail은 Not Verified |

## 조사 제외 범위

- source detail expansion
- article detail page
- chart rendering validation
- macro data accuracy validation
- sector heatmap tile interaction
- community write / moderation workflow
- real-time chat persistence
- office app detail workflow
- login state
- notification delivery
- voice playback
- mobile responsive behavior
- feed ranking algorithm
- data licensing
- investment performance or accuracy
- quantitative report formula validation
- simulated trading settlement validation
- fee calculator legal / tax correctness validation

## Confidence 기준

| Confidence | 기준 |
| --- | --- |
| High | 공식 Product 화면에서 surface와 label을 직접 확인 |
| Medium | 화면에 UI cue는 있으나 interaction이나 state를 확인하지 못함 |
| Low | 화면 구조에서 제한적으로 추론한 product responsibility |

## Open Question

- `출처 n곳 펼치기`가 원문 link, publisher, timestamp, duplicate clustering을 어디까지 제공하는가.
- headline score로 보이는 숫자는 urgency, relevance, popularity, confidence 중 무엇을 의미하는가.
- 자동 큐레이션과 실시간 feed의 selection rule은 같은가.
- `MY`, 평단, 알림은 로그인 없이 local state로 동작하는가.
- mobile에서 symbol sidebar와 live feed가 어떤 hierarchy로 재배치되는가.
- YASUN.GG의 speed-first 구조가 DATE의 Evidence-first 구조와 충돌하지 않게 적용할 수 있는 범위는 어디까지인가.
- stock report의 정량 평가 source, formula, update cadence는 어디에 설명되는가.
- community, chat, simulated trading이 market information consumption을 과도하게 trading action으로 끌고 가지 않는가.
- office-style workspace가 실제 productivity tool인지 concept / entertainment surface인지 구분할 수 있는가.
