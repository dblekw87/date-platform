# Koyfin Trust와 Evidence Observation 기록

## 문서 목적

이 문서는 Koyfin의 Source, Freshness, Financial Evidence, Methodology, Pricing transparency를 기록한다.

이번 문서는 공식 Product page, 공식 Help Center, 공식 Pricing에서 확인 가능한 Trust Signal만 사용한다. 실제 App 내부 값의 Source 표시, timestamp, News Detail 원문 링크는 직접 확인하지 않았다.

## Trust / Evidence Observation 요약

| 분류 | Observation 수 |
| --- | ---: |
| Strong Trust Signal | 4 |
| Supporting Trust Signal | 5 |
| Weak Trust Signal | 3 |
| Traceability Gap | 4 |
| Methodology Gap | 2 |
| Freshness Gap | 3 |
| Access-dependent Trust | 4 |
| Not Verified | 4 |

## Trust Signal Inventory

| Trust ID | 항목 | 분류 | Evidence Type | Observation | Trust Contribution | Traceability | Limitation | DATE Implication | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KYF-TR-001 | Data Provider Disclosure | Strong Trust Signal | Official Documentation | Data Overview는 S&P Capital IQ, Morningstar, I/B/E/S, FRED, NASDAQ Data Link, Coinmarketcap 등 data provider를 설명한다. | 사용자는 data category별 provider를 확인할 수 있다. | provider level까지 추적 가능하다. | 개별 화면 값에서 provider label이 표시되는지는 Not Verified다. | DATE에서 Source visibility는 category-level과 item-level을 분리해 검증해야 한다. | High |
| KYF-TR-002 | Live / Delayed / EOD Data | Supporting Trust Signal | Official Documentation | Data Questions는 US stocks와 selected global ETFs가 live이고, most global stocks는 EOD 또는 delayed라고 설명한다. | data timing 차이를 공개해 Freshness 기대치를 조정한다. | market/category level까지 추적 가능하다. | 실제 quote 화면의 delay label 표시 방식은 Not Verified다. | Freshness는 plan과 Market category를 함께 검증해야 한다. | High |
| KYF-TR-003 | Actuals and Consensus Labels | Strong Trust Signal | Official Documentation | Actuals and Consensus는 reported periods를 `A`, estimate periods를 `E`로 표시하고 average consensus, analyst count, median, high, low를 설명한다. | historical actual과 forward estimate를 구분해 판단 오류를 줄인다. | table value의 aggregation type을 일부 추적 가능하다. | estimate provider와 revision timestamp는 Not Verified다. | Actual / Estimate / Consensus 구분은 다른 Benchmark와 비교할 필요가 있다. | High |
| KYF-TR-004 | Adjusted and GAAP Label | Supporting Trust Signal | Official Documentation | Actuals and Consensus는 company가 adjusted와 GAAP를 모두 제공하는 경우 label이 있다고 설명한다. | accounting basis 차이를 사용자에게 표시한다. | statement type level까지 추적 가능하다. | restated data와 adjustment methodology는 Not Verified다. | Financial Evidence에서 accounting basis 표시 여부를 검증해야 한다. | Medium |
| KYF-TR-005 | Data Dictionary Formula | Strong Trust Signal | Official Documentation | Koyfin Data Dictionary는 EV/Sales, Forward Estimates Growth, Free Cash Flow, Price/Earnings NTM 등 Metric definition과 formula를 제공한다. | 사용자는 Metric 계산 기준을 확인할 수 있다. | Methodology page level까지 추적 가능하다. | 개별 화면에서 formula link가 직접 연결되는지는 Not Verified다. | DATE에서 Metric Methodology link의 위치를 검증해야 한다. | High |
| KYF-TR-006 | Portfolio P/L and FX Impact | Supporting Trust Signal | Official Documentation | My Portfolios는 account, lot, average cost, currency, FX impacts, P/L breakdown을 설명한다. | Portfolio performance가 입력 state와 currency context를 가진다는 점을 드러낸다. | lot/account level까지 추적 가능할 수 있다. | exact performance formula는 Not Verified다. | Portfolio Evidence는 holding state와 calculation Methodology를 분리해야 한다. | Medium |
| KYF-TR-007 | Portfolio Exposure Categories | Supporting Trust Signal | Official Documentation | Portfolio Exposure는 Sector, Industry, asset class, country 같은 category로 exposure를 분해한다고 설명한다. | Portfolio risk analysis의 분류 기준을 일부 확인할 수 있다. | category level까지 추적 가능하다. | category Source와 classification provider는 Not Verified다. | Portfolio와 Entity Taxonomy 연결을 Cross Validation해야 한다. | Medium |
| KYF-TR-008 | News Source and Premium News | Weak Trust Signal | Official Product Page / Official Pricing | Koyfin은 live news feed, combined news, premium news, press releases, filings/transcripts를 설명한다. | News coverage와 paid access 범위를 드러낸다. | Source 원문 link level은 확인하지 못했다. | News Detail timestamp, Source label, original URL은 Not Verified다. | News Evidence는 Source, Freshness, related Entity link를 별도로 검증해야 한다. | Medium |
| KYF-TR-009 | Filings / Transcripts Access | Supporting Trust Signal | Official Pricing / Official Product Page | Plus plan은 filings/transcripts와 press releases를 제공한다고 설명한다. Data Coverage는 company transcripts coverage를 설명한다. | 공식 company material 접근 가능성을 제시한다. | document category level까지 추적 가능하다. | Document Detail과 Company Surface 연결은 Not Verified다. | official Document와 News를 Evidence type으로 분리할 필요가 있다. | Medium |
| KYF-TR-010 | Pricing Data Transparency | Strong Trust Signal | Official Pricing | Pricing은 Free, Plus, Premium, Advisor plan별 financial years, estimates years, watchlist/screen/dashboard limits, news access 차이를 설명한다. | 사용자는 접근 가능한 data depth와 saved state limit을 사전에 알 수 있다. | plan level까지 추적 가능하다. | 실제 App gating UI는 Not Verified다. | access-dependent Evidence를 비교할 때 plan limit을 함께 기록해야 한다. | High |
| KYF-TR-011 | Screener Export Restriction | Access-dependent Trust | Official Documentation | My Screens와 My Portfolios 문서는 Capital IQ data export restriction이 일부 Metric에 적용된다고 설명한다. | data vendor restriction을 명시해 export 신뢰 범위를 조정한다. | export restriction level까지 추적 가능하다. | 어떤 Metric이 제한되는지는 Not Verified다. | DATE에서 data export와 Evidence retention 조건을 별도로 기록해야 한다. | Medium |
| KYF-TR-012 | Macro Event Consensus / Previous Figures | Supporting Trust Signal | Official Documentation | Economic Calendar 관련 문서는 Event click 시 consensus와 previous figures를 볼 수 있다고 설명한다. | Event 판단에 comparison baseline을 제공한다. | Event figure level까지 일부 추적 가능하다. | Source와 release timestamp는 Not Verified다. | Macro Event Evidence에서 forecast/actual/previous를 구분해야 한다. | Medium |
| KYF-TR-013 | Graph Latest Data Update | Freshness Gap | Official Documentation | My Graphs는 saved chart가 latest data로 update된다고 설명한다. | saved chart가 stale snapshot이 아니라 updated view일 수 있음을 알려준다. | update claim은 있으나 timestamp level은 Not Verified다. | chart series별 Freshness 표시 방식은 Not Verified다. | saved analysis와 live data update의 경계를 검증해야 한다. | Medium |
| KYF-TR-014 | API Availability | Access-dependent Trust | Official Documentation | Data Questions는 Koyfin API가 Enterprise와 Advisor Pro users only라고 설명한다. | external data verification 가능성이 plan에 따라 달라진다. | plan level까지 추적 가능하다. | API field-level Source는 Not Verified다. | DATE에서 API export 가능성은 Trust와 user segment별로 나눠야 한다. | Medium |
| KYF-TR-015 | News Detail Traceability | Traceability Gap | Not Verified | News Detail에서 original URL, timestamp, related Company link는 직접 확인하지 않았다. | Not Verified 항목이다. | 추적 불가 상태다. | News Evidence를 판단하는 데 필요한 핵심 정보가 부족하다. | 다음 단계에서 News Detail Source와 related Entity link를 직접 확인해야 한다. | Low |

## Source 기록

Observation:
Data Overview는 financials와 estimates, market data, macro data, crypto data, News 등 category별 provider를 설명한다. Data Questions는 US stocks와 selected global ETFs의 live data, most global stocks의 EOD 또는 delayed data를 설명한다.

Evidence Type:
Official Documentation

Trust Contribution:
사용자는 data category와 provider를 연결해 이해할 수 있다.

Traceability:
provider category level까지 가능하다. 개별 Screen value level은 Not Verified다.

Limitation:
실제 App 내부 value 옆 Source label 또는 provider link는 확인하지 못했다.

DATE Implication:
DATE에서 Source는 category-level disclosure와 item-level traceability를 분리해 비교해야 한다.

Confidence:
High

## Freshness 기록

Observation:
Data Questions는 live, delayed, EOD data 차이를 설명한다. My Graphs는 saved charts가 latest data로 update된다고 설명한다. Mobile App page는 desktop과 synced Watchlists, Portfolio를 설명한다.

Evidence Type:
Official Documentation / Official Product Page

Trust Contribution:
사용자는 data timing과 saved state update 가능성을 일부 이해할 수 있다.

Traceability:
market category level 또는 saved graph behavior level까지 가능하다.

Limitation:
실제 quote, chart, table, News item의 timestamp 표시 방식은 Not Verified다.

DATE Implication:
Freshness는 saved state와 data update를 분리해 검증해야 한다.

Confidence:
Medium

## Financial Evidence 기록

| 개념 | 확인 내용 | Observation Status | Evidence | Confidence |
| --- | --- | --- | --- | --- |
| Actual | reported periods가 `A`로 표시된다고 설명된다. | Official Documentation Only | Actuals and Consensus. Access Date: 2026-07-28. | High |
| Estimate | estimate periods가 `E`로 표시된다고 설명된다. | Official Documentation Only | Actuals and Consensus. Access Date: 2026-07-28. | High |
| Consensus | average consensus, analyst count, median, high, low가 설명된다. | Official Documentation Only | Actuals and Consensus. Access Date: 2026-07-28. | High |
| Historical | Free plan은 2Y financials, Plus는 10Y financials를 설명한다. | Official Pricing | Pricing. Access Date: 2026-07-28. | High |
| Forward | Free plan은 1Y estimates, Plus는 10Y estimates를 설명한다. | Official Pricing | Pricing. Access Date: 2026-07-28. | High |
| Reported | Actual periods와 company reported data context로 설명된다. | Official Documentation Only | Actuals and Consensus. Access Date: 2026-07-28. | Medium |
| Restated | 직접 확인하지 못했다. | Not Verified | Not Verified. Access Date: 2026-07-28. | Low |

## Methodology 기록

Observation:
Koyfin Data Dictionary는 valuation과 forward estimate 관련 Metric definition과 formula를 제공한다. Portfolio 문서는 P/L, lot, FX impacts를 설명하지만 exact performance formula는 확인하지 못했다.

Evidence Type:
Official Documentation

Trust Contribution:
Metric 계산의 일부 Methodology를 확인할 수 있다.

Traceability:
Metric definition level까지 가능하다. 개별 Screen value에서 formula로 이동하는 direct path는 Not Verified다.

Limitation:
Portfolio Performance, Economic Indicator, Screener Filter의 full methodology는 일부만 확인했다.

DATE Implication:
Methodology는 Metric, Portfolio, Macro, Screener별로 다른 깊이로 검증해야 한다.

Confidence:
Medium

## Paid Data Transparency 기록

Observation:
Pricing은 plan별 data depth, saved state limit, News access, Portfolio advanced analytics, custom data/formulas, reports 기능 차이를 공개한다.

Evidence Type:
Official Pricing

Trust Contribution:
사용자는 기능 제한과 data depth 차이를 사전에 알 수 있다.

Traceability:
plan level까지 가능하다.

Limitation:
실제 App 내부에서 제한된 기능이 어떤 message로 표시되는지는 Not Verified다.

DATE Implication:
Access-dependent Trust는 Benchmark마다 별도 field로 비교해야 한다.

Confidence:
High

## Evidence Gap 목록

- News Detail의 original URL, timestamp, related Entity link는 Not Verified다.
- 개별 Table cell에서 Source 또는 formula로 이동 가능한지는 Not Verified다.
- Chart series별 Freshness와 provider label은 Not Verified다.
- Portfolio Performance exact calculation Methodology는 Not Verified다.
- Macro Event Source와 release timestamp는 Not Verified다.
- Company와 Security의 Trust Signal이 같은 Surface에서 어떻게 분리되는지는 Not Verified다.
