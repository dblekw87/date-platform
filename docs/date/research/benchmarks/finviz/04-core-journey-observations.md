# Finviz Core Journey Observation 기록

## 문서 목적

이 문서는 Finviz에서 12개 공통 Research Scenario를 수행 가능한 범위로 기록한다.

공식 Product 화면, 공식 Help / FAQ, 공식 Blog, Elite / Pricing 안내에서 확인 가능한 경로만 사용한다. 실제 클릭 수를 확인하지 못한 경우 임의 숫자를 만들지 않고 `Not Verified`로 기록한다.

## Scenario 요약

| 상태 | Scenario 수 |
| --- | ---: |
| 완료 가능 | 5 |
| 부분 완료 | 6 |
| 확인 불가 | 1 |

## Scenario Inventory

| Scenario ID | Scenario | 수행 가능 여부 | Observation Status | Entry Point | 주요 단계 | 최소 확인 가능한 Navigation 횟수 | Page Transition | View / Tab Transition | Context Preservation | Evidence Traceability | Save / Persistence | Public / Login / Elite Restriction | Advertisement Impact | Friction | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-001 | 오늘 Market 변화 파악 | 완료 가능 | Observed | Home | Home → Signal lists → Heatmap area → Headlines → Calendar / Insider / Futures summary | 0 | 없음 | section scan | Home 안에서는 유지 | News Source와 timestamp 일부, quote delay 표시 | 없음 | Public. Elite는 real-time / no ads / layout customization | public page에 tracking iframe, Elite upsell 일부 | 정보량이 많아 first scan 비용 있음 | High | 로그인 후 customized Home 확인 필요. |
| S-002 | 특정 Stock 상승·하락 원인 확인 | 부분 완료 | Partially Observed | Home Signal 또는 Screener | Signal ticker → Stock Quote → ratings / News / metrics 확인 | 1 | Home 또는 Screener에서 Stock Quote | Stock Quote tabs | Stock Context는 유지. Signal origin은 유지되지 않음 | News Source / timestamp, analyst action 일부 | 없음 | Public. real-time은 Elite | Stock Quote 상단 Elite upsell | price move 원인 자동 설명은 없음 | Medium | News와 price move relation 자동 연결 여부 확인 필요. |
| S-003 | 투자 대상 발견 | 완료 가능 | Observed | Screener | Screener → filters → result view → result row → Stock Quote | 1 이상 | Screener to Stock Quote | filter tabs, result view tabs | result view context는 Screener 안에서 유지. Stock Quote 이동 후 filter context Not Verified | Screener Help에서 Metric definitions 제공 | My Presets / Save as Portfolio는 Login Required | Public discovery 가능. advanced filters / Stats / presets limit는 Elite | Not Verified | filter와 result가 dense해 신규 사용자 비용 있음 | High | Back Navigation state 확인 필요. |
| S-004 | 특정 Company 또는 Stock 분석 | 완료 가능 | Observed | Stock Quote | Stock Quote → Overview → tabs → peers / ETF holders → News | 0 또는 1 | direct Stock Quote 또는 row click | Overview, Compare, Short Interest, Financials, Options, Filings | Stock ticker context 유지 | News Source, timestamp, analyst actions, quote timestamp | Portfolio save는 Login Required | Public. advanced chart / statements depth는 Elite | Elite upsell banner | Company와 Stock가 같은 page에서 혼재될 수 있음 | High | Company와 Security 분리 표시 확인 필요. |
| S-005 | 동일 Industry Stock 비교 | 부분 완료 | Partially Observed | Stock Quote / Screener / Groups | Stock Quote Industry link 또는 Screener Industry filter → result table → Stock Quote | 1 이상 | Screener to Stock Quote | Screener result views | Screener context는 Partial | Help가 Sector / Industry definition 제공 | Saved Screener는 Login Required | Public filter 가능. custom ranges / larger rows Elite | Not Verified | Industry link의 target behavior 직접 확인 필요 | Medium | Sector → Industry → Stock drill-down 확인 필요. |
| S-006 | News와 Financial Evidence 검증 | 부분 완료 | Partially Observed | Stock Quote / News | Stock Quote News → external Source → Stock Quote Financials | 1 이상 | external Source 이동 발생 | Stock Quote tabs | external 이동 후 Finviz context loss | News Source / timestamp 확인. Financial Metric Source detail은 이번 단계 범위 밖 | 없음 | Public. Media Source customization은 Elite | external site 광고 영향은 범위 밖 | external Source 이후 복귀 비용 | Medium | News에서 internal related Stock link 여부 확인 필요. |
| S-007 | Sector / Industry trend와 Stock 연결 | 부분 완료 | Partially Observed | Groups / Maps | Groups → group views → Maps view 또는 Screener Industry filter → Stock Quote | Not Verified | Groups to Stock Quote direct path Not Verified | Groups view tabs | group context 유지 Not Verified | group Metric Source는 상세 미확인 | 없음 | Public. real-time groups data는 Elite | Not Verified | group에서 Stock으로 내려가는 path 불명확 | Medium | Groups에서 Stock list로 직접 이동 가능한지 확인 필요. |
| S-008 | Portfolio 또는 Saved State 저장 | 부분 완료 | Login Required | Screener / Portfolio | Screener → Save as Portfolio 또는 My Presets → Portfolio redirect / Register | 1 | Portfolio URL redirects to Register | Not Verified | saved state는 account 필요 | account-linked saved data는 FAQ에서 설명 | Portfolio / Saved Screener candidate | Login Required. Portfolio limits and presets Elite | Not Verified | not logged in 상태에서는 생성 불가 | Medium | Save as Portfolio가 어떤 State를 만드는지 확인 필요. |
| S-009 | Alert 생성 | 부분 완료 | Elite Feature | Screener / Stock Quote candidate | Screener → Create Alert 또는 Elite alerts description | 1 | Not Verified | Not Verified | Alert Rule state candidate | alert trigger Source는 Not Verified | Alert Rule persistence candidate | Elite Feature | Not Verified | condition builder 확인 불가 | Medium | price, insider, ratings, news, SEC filings trigger UI 확인 필요. |
| S-010 | 다음 날 동일 분석 재개 | 확인 불가 | Login Required / Elite Feature | Portfolio / My Presets / Layout Preference | saved data → account access | Not Verified | Not Verified | Not Verified | account-linked saved data는 FAQ에서 설명 | Not Applicable | Portfolio, presets, layout, alerts candidate | Login Required / Elite Feature | Elite no ads | 실제 재방문 테스트 미수행 | Low | Recent Stock, History, saved layout restore 확인 필요. |
| S-011 | News / Insider Transaction에서 Stock 이동 | 완료 가능 | Observed | News / Insider | Insider → ticker → Stock Quote / SEC Form 4. News → external Source / Stock Quote partial | 1 | Insider to Stock Quote, Insider to SEC | Insider filters | Insider context는 Stock Quote에 유지되지 않음 | SEC Form 4 external Source, News Source / timestamp | 없음 | Public | Not Verified | external Source 이후 context loss | High for Insider, Medium for News | News headline과 Stock link 관계 확인 필요. |
| S-012 | 하나의 Stock에서 관련 Entity 연속 조사 | 완료 가능 | Observed | Stock Quote | Stock Quote → peers / Sector / Industry / ETF holders / News / tabs | 1 이상 | Stock Quote to related links | Stock tabs | current Stock header 유지. related 이동 후 previous context loss | News Source, timestamp, ratings, SEC Filing tab candidate | Portfolio save Login Required | Public. advanced features Elite | Elite upsell | relation reason이 명시되지 않을 수 있음 | High | related Entity graph depth 확인 필요. |

## 주요 Journey별 기록

### S-001 오늘 Market 변화 파악

Observation:
Home은 Market breadth, Signal lists, S&P 500 Heatmap area, Headlines, Major News ticker list, Calendar, Insider, Futures, Forex & Bonds summary를 한 Screen에 표시한다. footer에는 NASDAQ, NYSE, AMEX quotes delayed 1 minute disclosure가 표시된다.

Interpretation:
Home은 Market status, News, Event, insider activity, asset class snapshot을 동시에 제공하는 dense Market entry로 해석된다.

User Impact:
사용자는 한 Screen에서 여러 Signal을 빠르게 확인할 수 있다. 반면 첫 방문자는 Signal list, Heatmap, Calendar, Insider table의 우선순위를 스스로 판단해야 한다.

DATE Implication:
DATE에서 Home을 Market summary로 볼 경우, Surface별 priority와 Context Preservation 비용을 별도 검증해야 한다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/, 확인일 2026-07-28.

### S-003 투자 대상 발견

Observation:
Screener는 Descriptive, Fundamental, Technical, News, ETF, All filters와 Overview, Valuation, Financial, Ownership, Performance, Technical, ETF, Charts, News, Snapshot, Maps result views를 제공한다. Result table row는 ticker, company, Sector, Industry, Country, Metric columns를 포함한다.

Interpretation:
Screener는 후보 발견, 비교, Stock Quote 진입을 연결하는 중심 Discovery Surface로 해석된다.

User Impact:
사용자는 criteria를 조합해 candidate set을 만들고, table row를 통해 Stock Quote로 이동할 수 있다. advanced 저장과 alert는 접근 제한이 있다.

DATE Implication:
DATE에서 Saved Screener와 Portfolio Membership을 구분해 검토할 필요가 있다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/screener. Official Documentation, https://finviz.com/help/screener. 확인일 2026-07-28.

### S-004 특정 Company 또는 Stock 분석

Observation:
Stock Quote는 ticker, company link, price timestamps, Overview / Compare / Short Interest / Financials / Options / Filings tabs, Sector, Industry, Country, exchange, peers, ETF holders, analyst ratings, News를 표시한다.

Interpretation:
Stock Quote는 Single Dense Page와 Tab Hub의 혼합 구조로 보인다. Company name은 외부 company site로 연결되고, Finviz 내부 context는 Stock ticker 중심이다.

User Impact:
사용자는 Stock Context 안에서 여러 related Entity와 Evidence 후보로 이동할 수 있다. Company와 Stock가 하나의 header에서 처리되어 Entity boundary가 불명확할 수 있다.

DATE Implication:
DATE에서 Company, Stock, Security의 관계를 직접 분리할지 여부는 추가 Benchmark와 사용자 검증이 필요하다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/stock?t=AAPL, 확인일 2026-07-28.

### S-006 News와 Financial Evidence 검증

Observation:
News page는 timestamp, external Source domain, category를 표시한다. Stock Quote 내부 News list도 timestamp와 Source label을 표시한다. News headline은 external Source로 이동한다. Financials tab은 Stock Quote Local Navigation에 표시되지만 이번 단계에서는 detailed Financials body를 깊게 확인하지 않았다.

Interpretation:
News는 Evidence discovery보다 external Source routing에 가깝게 작동할 수 있다. Financial Evidence와 News가 같은 Stock Context에 있지만, News item과 Financial Metric 간 직접 연결은 확인되지 않았다.

User Impact:
사용자는 Source와 Freshness를 확인할 수 있으나 external Source 이동 후 Finviz context를 잃을 수 있다.

DATE Implication:
DATE에서 News Evidence와 Stock Financial Evidence를 연결하려면 external Source traceability와 internal context 복귀를 함께 설계 검토해야 한다.

Confidence:
Medium

Evidence:
Official Product Observation, https://finviz.com/news, https://finviz.com/stock?t=AAPL, 확인일 2026-07-28.

### S-011 News / Insider Transaction에서 Stock 이동

Observation:
Insider table은 Ticker link, Owner, Relationship, Date, Transaction, Cost, Shares, Value, SEC Form 4 external link를 표시한다. Ticker link는 Stock Quote로 이동한다. SEC Form 4는 sec.gov external Source로 이동한다.

Interpretation:
Insider는 Transaction-first Evidence Surface로 볼 수 있다. News와 달리 Stock link와 external filing link가 같은 row에 있어 Entity와 External Evidence가 더 명확히 병렬 배치된다.

User Impact:
사용자는 insider activity에서 Stock Quote와 SEC filing을 빠르게 열 수 있다. 그러나 Stock Quote로 이동하면 원래 transaction context는 보존되지 않는다.

DATE Implication:
DATE에서 Transaction, Insider Person, Stock, SEC Filing 관계를 어떻게 유지할지 검토할 필요가 있다.

Confidence:
High

Evidence:
Official Product Observation, https://finviz.com/insidertrading, 확인일 2026-07-28.

## 완료하지 못한 Scenario

- S-010은 실제 다음 날 재방문을 수행하지 않았다.
- Portfolio, Saved Screener, Alert Rule은 Login Required 또는 Elite Feature이므로 실제 persistence는 Not Verified다.
- Maps Heatmap dynamic interaction은 직접 조작하지 않았다.
- Asset Class Detail Surface는 dynamic body가 제한적으로만 확인됐다.
