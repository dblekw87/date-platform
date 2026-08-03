# YASUN.GG Product Surface Map

## 문서 목적

이 문서는 YASUN.GG 전체 public site에서 확인한 Product Surface와 Product Role 후보를 기록한다.

YASUN.GG를 DATE의 구조 기준으로 사용하지 않는다. DATE Prototype A High-Fidelity에서 한국 투자자용 market context, monitoring density, tool entry, risk boundary를 참고하기 위한 보조 map이다.

## Product Positioning

Observation:
YASUN.GG는 homepage title에서 야간선물, 한국 주식, 글로벌 실시간 Trading Terminal을 표방한다. About page는 한국 트레이더를 위한 실시간 분석 / 커뮤니티 플랫폼으로 설명하며, KOSPI / KOSDAQ 전 종목 정량 리포트, 추세 / 모멘텀 평가, 글로벌 시세, 뉴스 통합, 예측 / 테스트매매를 핵심 기능으로 제시한다.

Interpretation:
YASUN.GG는 단일 chart site나 news site라기보다 chart, market monitoring, news, quantitative report, community, simulation, utility를 하나의 terminal shell에 묶는 speed-first trading companion으로 해석된다.

DATE Relevance:
DATE는 trading companion이 아니라 Evidence-first decision support product다. 따라서 YASUN.GG의 terminal density와 한국 market convention은 참고하되, community / leverage simulation / PnL emphasis는 직접 반영하지 않는다.

Confidence:
High

## Surface Inventory

| Surface ID | Surface | URL | Primary Role | Observed Structure | DATE Relevance | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| YS-SUR-001 | Home | `/` | Terminal Entry | 지금 시장, 시장 도미넌스, 실시간 속보, 라운지, 인기 종목, 핫 테마, 환율 | DATE Home의 first fold에서 `오늘 먼저 확인할 변화`와 market context를 압축하는 방식 참고 | High |
| YS-SUR-002 | Chart | `/chart`, symbol routes | Chart / Symbol Hub | 심볼 사이드바, interval controls, chart / chat / news / analysis tabs | Entity context 안에서 chart, news, analysis tab을 반복 노출하는 navigation pattern 참고 | Medium |
| YS-SUR-003 | News | `/news` | Live Newsroom | 오늘의 헤드라인, 실시간 속보, source count, symbol / theme tags, auto refresh | Monitoring / Evidence entry의 freshness, source disclosure, tag compression 참고 | High |
| YS-SUR-004 | Macro | `/macro` | Macro Dashboard | 시세, 센티먼트, 경제지표, 참고 tab과 energy / metals / FX / rates / index / crypto groups | DATE Market에서 macro context group을 compact하게 보여주는 방식 참고 | High |
| YS-SUR-005 | Heatmap | `/heatmap` | Market Breadth Visual | KOSPI / KOSDAQ toggle, top 100 market cap, -5% to +5%, refresh cue | market breadth를 빠르게 스캔하는 visual reference. DATE에서는 price-only dominance 주의 | High |
| YS-SUR-006 | Calendar | `/calendar` | Event Calendar | monthly calendar, KST, search, domestic / overseas, importance filter | `다음 확인 항목`과 event schedule을 연결하는 reference | High |
| YS-SUR-007 | Stock Report | `/stock/005930/report` example | Quantitative Report | summary status, RS, Minervini, leader history, valuation, market signal, news tabs | Research summary와 quantitative signal을 분리하는 pattern 참고. recommendation-like wording은 주의 | Medium |
| YS-SUR-008 | Fees | `/fees` | Utility Calculator | broker selection, amount / return input, cost comparison, FAQ | investment tool이 복잡한 calculation을 compact input + table로 제공하는 pattern 참고 | High |
| YS-SUR-009 | TV Watchlist | `/tv-watchlist` | External Tool Bridge | asset selection, KOSPI / KOSDAQ / coin, output format, preview, copy / download | external workflow export pattern 참고. DATE에는 actual persistence와 export scope 분리 필요 | High |
| YS-SUR-010 | Lounge | `/lounge` | Community Feed | new post cue, empty state | community entry는 확인되지만 DATE Prototype A에는 직접 반영하지 않음 | Medium |
| YS-SUR-011 | Chat | `/chat-popup` | Real-time Community | nickname, channel tabs, consent, chat rules, long / short cue | high-risk trading action cue로 DATE에는 이식 금지. legal boundary wording 참고 가능 | Medium |
| YS-SUR-012 | Simulated Trade | `/trade`, `/trade/leaderboard` | Engagement / Learning Simulation | nickname input, 1,000,000pt seed, leverage, leaderboard, legal notice | DATE에는 직접 반영하지 않음. simulation과 information product boundary 분리 참고 | Medium |
| YS-SUR-013 | About | `/about` | Product Policy / Positioning | feature claims, operating principles, non-recommendation, Korean color convention, privacy minimization | product trust statement와 operating principle disclosure 참고 | High |
| YS-SUR-014 | Changelog | `/changelog` | Product Transparency | update history shell | DATE release / data update transparency 참고 가능 | Medium |
| YS-SUR-015 | Office | `office.yasun.gg` | Workspace Concept | Excel, Outlook, VS Code, Slack, Teams, AI, Notion, Jira app launcher | workspace metaphor reference. DATE에는 playful shell보다 research continuity만 추출 | Medium |

## Common Shell Pattern

Observation:
여러 page에서 공통으로 `YASUN.GG BETA`, login, symbol / index search, symbol sidebar, chart / symbol label, `지금 / MY / 전체 / 종목`, `내 평단`, session countdown, footer disclaimer가 반복된다.

Interpretation:
YASUN.GG는 page별 content보다 symbol and market context rail을 먼저 고정해 사용자가 어디에 있어도 market state로 돌아올 수 있게 만든다.

DATE Implication:
DATE Prototype A는 route를 바꾸지 않되, Home / Market / Monitoring / Entity / Evidence 사이에서 `현재 확인 중인 entity`, `관련 market context`, `다음 확인 조건`을 잃지 않게 하는 persistent context pattern을 검토할 수 있다.

Confidence:
High

## Product Role 후보

| Role ID | Role | Supporting Surface | Primary Responsibility | DATE Treatment |
| --- | --- | --- | --- | --- |
| YS-ROLE-001 | Trading Terminal | Home, Chart, Macro, Heatmap, Symbol routes | market state를 빠르게 스캔하게 한다. | density와 context rail만 참고 |
| YS-ROLE-002 | Live News Aggregator | News, Home news block | 실시간 news와 source cluster를 보여준다. | Evidence entry 참고. source quality 분리 필요 |
| YS-ROLE-003 | Quantitative Signal Product | Stock Report, About claims | valuation, RS, trend, momentum signal을 제공한다. | Research input 참고. recommendation-like status 주의 |
| YS-ROLE-004 | Macro / Event Monitor | Macro, Calendar | macro, FX, commodity, event schedule을 market context로 묶는다. | Market / Monitoring 참고 |
| YS-ROLE-005 | Trading Utility Product | Fees, TV Watchlist | 계산기와 external workflow export를 제공한다. | Tool density 참고. DATE core flow와 분리 |
| YS-ROLE-006 | Community Product | Lounge, Chat | trader discussion and real-time opinion sharing을 제공한다. | DATE Prototype A에는 직접 반영하지 않음 |
| YS-ROLE-007 | Simulation / Gamification Product | Trade, Leaderboard | learning simulation and competition loop를 제공한다. | DATE에는 이식 금지 |
| YS-ROLE-008 | Workspace Concept Product | Office subdomain | market data를 familiar productivity app metaphor로 배치한다. | workspace continuity reference로만 사용 |

## DATE에 참고할 수 있는 요소

- 한국 투자자가 익숙한 종목 / 지수 / 선물 / FX / 원자재 / 코인 context를 한 shell에 둔다.
- page마다 동일한 search와 symbol rail을 유지해 context loss를 줄인다.
- live data가 비어 있거나 지연될 수 있음을 footer와 page-level disclaimer로 반복한다.
- macro dashboard는 category tab과 asset group을 compact하게 묶는다.
- calendar는 domestic / overseas와 importance filter를 제공한다.
- utility page는 input, preset button, result summary, table, FAQ를 한 흐름으로 둔다.
- watchlist generator는 external product workflow를 단계별 사용법으로 연결한다.

## DATE에 직접 반영하지 않을 요소

| Element | Reason |
| --- | --- |
| leverage simulation and leaderboard | DATE가 trading action / competition product처럼 보일 수 있다. |
| long / short chat cue | 사용자를 즉시 방향성 bet로 유도할 수 있다. |
| PnL, average price, return cue 중심 personalization | DATE의 Evidence-first responsibility와 충돌한다. |
| score / rating without methodology visible in same context | 신뢰도나 투자 판단처럼 오해될 수 있다. |
| playful office parody shell | Prototype A High-Fidelity의 calm evidence product tone과 맞지 않을 수 있다. |

## Open Questions

- `/chart/{symbol}`의 analysis tab은 어떤 source와 formula로 report를 생성하는가.
- stock report의 `평범`, `다른 종목 검토 권장` 같은 문구는 투자 추천 오해를 어떻게 방지하는가.
- calendar event detail은 news, symbol, alert와 연결되는가.
- watchlist / MY / average price는 login persistence인가 local state인가.
- mobile에서 common shell이 content보다 과도하게 화면을 점유하지 않는가.
