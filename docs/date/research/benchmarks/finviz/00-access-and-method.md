# Finviz 접근 환경과 조사 방법

## 문서 목적

이 문서는 Phase 4.1 Finviz Product Surface Mapping, Phase 4.2 Finviz Navigation / Core Journey / Entity State Observation, Phase 4.3 Information Density / Trust Evidence / Product Flow Architecture, Phase 4.4 Synthesis and Evidence Hardening의 접근 범위와 Evidence 기준을 정의한다.

이번 단계는 Surface Mapping, Navigation, Core Journey, Entity / State Observation, Information Density, Trust Evidence, Product Flow Architecture, Synthesis, Evidence Hardening, Principle Extraction Readiness만 수행한다. Candidate Principle, Registry 업데이트, DATE Architecture 제안은 수행하지 않는다.

## 조사 날짜

2026-07-28 KST

## 조사 환경

| 항목 | 내용 |
| --- | --- |
| Service | Finviz |
| Access Mode | Public Access |
| Login Status | Not Logged In |
| Subscription Status | No Finviz Elite subscription |
| Browser | OpenAI web extraction을 통한 공식 public page 확인 |
| Viewport | Desktop text extraction 기준 |
| Mobile Verification | 직접 확인하지 않음 |
| Region | Korea에서 원격 web extraction |

## 공식 Product Observation 범위

| Source Type | URL | 확인 범위 |
| --- | --- | --- |
| Official Product Observation | https://finviz.com/ | Home, Global Navigation, Market breadth, Signal lists, Heatmap area, Headlines, Major News, Calendar, Insider, Futures / Forex 요약, delay disclosure |
| Official Product Observation | https://finviz.com/screener | Screener filters, result views, result table, refresh, Save as Portfolio, Create Alert |
| Official Product Observation | https://finviz.com/map | Maps URL, Global Navigation, delay disclosure |
| Official Product Observation | https://finviz.com/groups | Groups controls, view tabs, Global Navigation |
| Official Product Observation | https://finviz.com/news | News categories, News / Blogs split, Time / Source view, timestamp and external Source links |
| Official Product Observation | https://finviz.com/insidertrading | Insider transaction table, SEC Form 4 external links, filters |
| Official Product Observation | https://finviz.com/futures | Futures URL, Global Navigation, delay disclosure |
| Official Product Observation | https://finviz.com/forex | Forex URL, Global Navigation |
| Official Product Observation | https://finviz.com/crypto | Crypto URL, Global Navigation |
| Official Product Observation | https://finviz.com/stock?t=AAPL | Stock Quote / Detail, tabs, peers, ETF holders, metrics, analyst ratings, News |
| Official Product Observation | https://finviz.com/portfolio | Portfolio redirect to account creation |
| Official Product Observation | https://finviz.com/login | Authentication Login |
| Official Product Observation | https://finviz.com/register | Authentication Register |
| Official Product Observation | https://finviz.com/elite | Elite feature scope, pricing, real-time data, alerts, export, API, portfolios, screener limits |
| Official Product Observation | https://finviz.com/calendar/economic | Calendar URL, Global Navigation, dynamic rendering limitation |

## 공식 Documentation 범위

| Source Type | URL | 확인 범위 |
| --- | --- | --- |
| Official Documentation | https://finviz.com/help/screener | Screener definition, filters, metric definitions, signals, appearances |
| Official Documentation | https://finviz.com/help/faq | subscription, data delay, market coverage, real-time / delayed data, extended hours |
| Official Documentation | https://finviz.com/knowledge-base/market-data-research | Help Center category list for Stock Research, Insider Trading, Maps & Groups, Calendars, Futures, Forex & Crypto, API |
| Official Product Blog | https://finviz.com/blog/new-stock-market-maps-for-market-cap-52-week-highs-lows-themes-and-insider-trading/ | Maps, Themes Map, Insider Transactions Map, Groups Heatmap updates |
| Official Product Blog | https://finviz.com/blog/evolving-the-heatmap-dow-jones-nasdaq-100-russell-2000-and-more/ | Maps expansion, responsive design, free Heat Maps, Elite real-time / intraday maps |
| Official Product Blog | https://finviz.com/blog/new-finviz-homepage-features-for-elite-members/ | Elite homepage customization, filters, auto-refresh, after-hours pricing, Maps layout |
| Official Product Blog | https://finviz.com/blog/flag-filter-and-sync-stocks-across-portfolios-and-screens/ | Color Flags across Portfolios and Screener |

## Phase 4.2 추가 조사 범위

| 범위 | 확인 수준 |
| --- | --- |
| Global Navigation | `Observed` |
| Screener Navigation | `Observed` |
| Screener Result Row to Stock Quote | `Observed` |
| Screener Save as Portfolio / Create Alert | `Partially Observed` / `Elite Feature` |
| Maps / Heatmap Navigation | `Partially Observed` / `Official Blog` |
| Groups Navigation | `Partially Observed` |
| Stock Quote Local Navigation | `Observed` |
| News to External Source | `Observed` |
| News to Stock Quote | `Partially Observed` |
| Insider to Stock Quote / SEC Form 4 | `Observed` |
| Portfolio Persistence | `Login Required` |
| Saved Screener | `Login Required` / `Official Documentation Only` |
| Alert Rule | `Elite Feature` / `Official Pricing` |
| Recent Stock / History | `Not Verified` |
| Mobile Navigation | `Not Verified` |

## Phase 4.3 추가 조사 범위

| 범위 | 확인 수준 |
| --- | --- |
| Home Density | `Observed` |
| Screener Density | `Observed` |
| Maps / Heatmap Density | `Partially Observed` / `Official Blog` |
| Groups Density | `Partially Observed` |
| Stock Quote Density | `Observed` |
| News Density | `Observed` |
| Insider Density | `Observed` |
| Asset Class Density | `Partially Observed` |
| Advertisement Density | `Observed` / `Official Pricing` |
| Market / Quote Freshness | `Observed` / `Official Documentation` |
| Screener Metric Methodology | `Official Documentation` |
| Heatmap Methodology | `Official Product Observation` / `Official Blog` |
| Financial Evidence Traceability | `Partially Observed` / `Official Documentation` |
| News External Source Traceability | `Observed` |
| Insider / SEC Filing Traceability | `Observed` |
| Product Flow Architecture | `Observed` / `Partial` / `Login Required` / `Elite Feature` / `Inferred` 구분 |

## Phase 4.4 추가 검토 범위

| 범위 | 확인 수준 |
| --- | --- |
| Structural Strength | Phase 4.1~4.3 Observation 기반 |
| User Friction | Phase 4.1~4.3 Observation 기반 |
| Information Density Assessment | Phase 4.3 Observation 기반 |
| Trust / Evidence Assessment | Phase 4.3 Observation 기반 |
| Advertisement Assessment | Phase 4.3 Observation 기반 |
| Context Preservation Assessment | Phase 4.2~4.3 Observation 기반 |
| Product Responsibility Matrix | Phase 4.2 Entity / State 분류 기반 |
| Cross Benchmark 준비 분류 | 기존 EidosLayer, TradingView, Koyfin 문서 읽기 기반 |
| Principle Extraction Readiness | Candidate Principle 작성 전 준비 상태 분류 |

## Secondary Source 사용 여부

Secondary Source는 사용하지 않았다.

검색 결과는 공식 Finviz URL을 찾거나 공식 페이지의 indexed text를 확인하는 보조 경로로만 사용했다. 검색 엔진 결과 요약만으로 기능 존재를 확정하지 않았다.

## Public 접근 범위

| 범위 | Observation |
| --- | --- |
| Home | 로그인 없이 접근 가능하다. Market breadth, signal lists, Headlines, Calendar, Insider, Futures / Forex 요약, delay disclosure를 확인했다. |
| Screener | 로그인 없이 접근 가능하다. Filter, view tab, result table, Stock Quote link를 확인했다. |
| News | 로그인 없이 접근 가능하다. category, timestamp, Source link를 확인했다. |
| Insider | 로그인 없이 접근 가능하다. insider transaction table과 SEC Form 4 link를 확인했다. |
| Stock Quote | 로그인 없이 접근 가능하다. AAPL detail page에서 metrics, peers, tabs, ratings, News를 확인했다. |
| Groups | 로그인 없이 접근 가능하다. 다만 동적 table의 일부는 indexed official text와 URL parameter page로 보완했다. |
| Maps | 로그인 없이 URL과 official indexed content를 확인했다. 동적 Heatmap interaction은 직접 조작하지 않았다. |

## Login Required 범위

| 범위 | Observation Status |
| --- | --- |
| Portfolio 생성과 Persistence | Login Required |
| Screener preset 저장 | Login Required / Partially Observed |
| Portfolio 기반 flag, filter, sync | Official Product Blog / Login Required |
| Account Settings | Login Required / Official Documentation Only |
| Login 후 Home 차이 | Not Verified |

## Elite Feature 범위

| 범위 | Evidence |
| --- | --- |
| Real-time Quotes, Charts, Screener Data | Finviz Elite page와 FAQ |
| Real-time Maps, Groups Data | Finviz Elite page |
| Intraday Charts | Finviz Elite page |
| Multi-layout Charts, Technical Studies | Finviz Elite page |
| Fundamental Charts | Finviz Elite page |
| Email Alerts / Push Notifications | Finviz Elite page |
| No Ads | Finviz Elite page |
| Export to Excel / APIs | Finviz Elite page |
| ETF complete holdings and structural metrics | Finviz Elite page |
| Screener custom filters, ETF filters, Stats View | Finviz Elite page |
| Portfolio count and ticker limit | Finviz Elite page |
| Layout customization | Finviz Elite page and official Blog |
| Backtests | Official Elite-related page / direct product interaction Not Verified |

## 확인 수준

| Observation Status | 사용 기준 |
| --- | --- |
| Observed | 로그인 없이 공식 Product page에서 Surface 또는 Screen의 핵심 구조를 확인했다. |
| Partially Observed | 공식 URL과 일부 구조는 확인했지만 동적 rendering 또는 interaction은 확인하지 못했다. |
| Official Documentation Only | 공식 Help, Knowledge Base, FAQ, Blog, Elite 안내에서만 확인했다. |
| Login Required | 계정 생성 또는 로그인 후에만 실제 조작을 확인할 수 있다. |
| Elite Feature | Finviz Elite 안내 또는 FAQ에서 유료 기능으로 명시된다. |
| Not Verified | 공식 자료로 기능 존재, 접근 범위, interaction을 충분히 확인하지 못했다. |
| Inference | 공식 Observation을 바탕으로 한 해석이며 Observation으로 사용하지 않는다. |

## 동적 렌더링 제한

Maps, Futures, Forex, Crypto, Calendar는 공개 URL과 Navigation은 확인했지만 web extraction에서 본문 detail이 제한적으로만 표시됐다.

Maps interaction은 official indexed text와 공식 Blog Evidence로 보완했다. Heatmap cell hover, double-click, pan, zoom, Stock Detail 새 창 이동은 직접 브라우저 조작으로 검증하지 않았다.

## 광고 노출 여부

공개 페이지 footer와 iframe / tracking 항목이 확인됐다. Elite page는 `No Ads`를 Elite Feature로 표시한다.

Advertisement가 실제 Screen에서 정보 hierarchy를 얼마나 방해하는지는 이번 단계에서 정량 검증하지 않았다.

## 알려진 조사 한계

- 로그인하지 않았다.
- Finviz Elite 계정으로 확인하지 않았다.
- Portfolio Persistence, saved Screener, alert 생성, settings 저장은 직접 확인하지 않았다.
- Mobile 또는 responsive Navigation은 직접 확인하지 않았다.
- Maps, Futures, Forex, Crypto의 동적 chart / Heatmap body는 일부만 확인했다.
- Backtests는 direct URL에서 정상 Product body를 확인하지 못했다.
- Error, Empty, Loading State는 대부분 Not Verified다.
- Official Blog는 공식 Product update로 사용했지만, 실제 현재 UI와 완전히 동일한지 별도 조작 검증이 필요하다.
- Phase 4.3의 Product Flow는 Finviz Observation 정리이며 DATE Architecture 제안이 아니다.
- Phase 4.4는 새로운 Source를 추가하지 않고 기존 Observation의 Evidence 품질만 검토했다.

## Confidence 기준

| Confidence | 기준 |
| --- | --- |
| High | 공식 Product page 또는 공식 Help / FAQ / Elite page에서 Surface 명칭과 책임이 직접 확인된다. |
| Medium | 공식 Source는 있으나 동적 UI 또는 로그인 후 interaction을 직접 확인하지 못했다. |
| Low | 공식 Source가 일부 clue만 제공하거나 현재 Product body가 제한적으로 확인됐다. |
