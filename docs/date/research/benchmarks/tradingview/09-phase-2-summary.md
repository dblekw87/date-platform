# 벤치마크 TradingView Phase 2 Summary 문서

## 목적

이 문서는 TradingView Benchmark Package의 요약이다. DATE 구조를 확정하지 않고 EidosLayer와 비교 가능한 관찰 결과만 정리한다.

## 조사 범위

| 항목 | 결과 |
| ---- | ---- |
| Benchmark | TradingView |
| 조사 날짜 | 2026-07-27 |
| Primary Evidence | Official Product Observation, Official Documentation |
| Product Surface 수 | 10 |
| Screen 수 | 10 |
| Research Scenario 수 | 12 |
| Candidate Principle 수 | 15 |

## 확인한 Product Surface

1. Home
2. Markets
3. Supercharts
4. Symbol Page
5. News
6. Community Ideas
7. Stock Screener
8. Watchlist
9. Alerts
10. Economic Calendar

## 주요 Navigation Pattern

- Global Navigation은 Product Surface, Community, Markets, Brokers, Search를 병렬 진입점으로 제공한다.
- Symbol Search는 Chart 실행과 Symbol Overview 진입을 연결한다.
- Symbol Page는 Overview, Financials, Documents, News, Community, Technicals 등 분석 모드별 Local Navigation을 제공한다.
- Supercharts는 Chart Context 안에서 Watchlist, Alerts, Screeners, Calendars, News Flow에 접근하게 한다.

## 주요 Entity 후보

- Market
- Symbol
- Stock
- Company
- News
- Source
- Idea
- User
- Event
- Metric
- Watchlist User State Candidate
- Alert User State Candidate
- Chart Workspace Surface Candidate
- Layout User State Candidate
- Document
- Option
- ETF
- Bond
- Indicator

## 주요 Information Density Pattern

- Home과 Markets는 Market Summary Grid를 사용한다.
- Stock Discovery는 Table-first Comparison 구조가 강하다.
- Symbol Page는 탭 기반 Progressive Disclosure를 제공한다.
- Supercharts는 Chart-centered Panel System으로 높은 Information Density를 관리한다.
- News와 Economic Calendar는 Source, Freshness, forecast, actual 등 판단 Metadata를 노출한다.

## 주요 Trust Pattern

- News 목록 단계에서 Source와 Timestamp가 노출된다.
- Symbol Page에는 Documents 탭이 있고 공식 문서는 filings, transcripts, investor materials를 설명한다.
- Economic Calendar는 forecast와 actual을 비교 가능하게 한다.
- Community Ideas는 작성자 기반 Trust Signal을 제공하지만 Opinion과 Evidence 경계는 사용자가 판단해야 할 수 있다.
- AI Disclosure는 확인하지 못했다.

## 비교 EidosLayer와 동일한 Pattern

- Home 또는 Market Surface가 Discovery Entry 역할을 수행할 수 있다.
- Card, List, Table 항목은 정보 표시뿐 아니라 Entity 또는 Surface 전환 단위로 작동한다.
- Watchlist는 저장 기능을 넘어 Personal Continuity와 Navigation 역할을 수행할 수 있다.
- Source와 Freshness는 Trust 판단에 필요한 초기 Signal로 노출된다.
- Community Surface는 Market Entity와 연결된 참여 또는 해석의 장으로 작동할 수 있다.

## 비교 EidosLayer와 다른 Pattern

- TradingView는 Chart와 Symbol을 중심 Context로 강하게 유지한다.
- TradingView는 Supercharts 오른쪽 Toolbar를 통해 Contextual Panel 접근을 제공한다.
- TradingView는 Screener와 Table View를 통한 조건 기반 Discovery가 강하다.
- TradingView는 Documents 탭을 Symbol Page에 배치해 공식 Evidence 접근을 제공한다.
- TradingView에서는 EidosLayer처럼 AI Persona 또는 task-specific AI Tool Surface를 확인하지 못했다.
- P-011~P-015는 TradingView에서만 강하게 관찰된 Benchmark-specific Pattern으로 분리했다.

## 주요 Hypothesis 영향

- H-001 Search-first 가능성은 TradingView에서 Search as Entity Transition 근거를 일부 얻었다.
- H-003 Company와 Security 분리는 TradingView에서 Symbol 중심 통합 Hub와 비교 검증이 필요하다.
- H-004 Home이 Dashboard가 아니라 Discovery Entry일 수 있다는 가설은 Supporting Evidence를 얻었다.
- H-005 Evidence Graph 가설은 News, Documents, Source, Timestamp, Calendar Event 연결 관찰을 통해 추가 검증 가치가 있다.
- H-009 Watchlist와 Workspace의 Navigation 역할 가설은 TradingView에서 Watchlist, Alerts, Layout 분리 구조로 강화되었다.

## 완료하지 못한 Scenario

| Scenario ID | 상태 | 이유 |
| ----------- | ---- | ---- |
| S-005 | Partial | 특정 Industry 경쟁사 비교를 직접 수행하지 못했다. |
| S-009 | Partial | Alert 생성은 공식 문서로 확인했으나 로그인 이후 생성 화면을 직접 수행하지 않았다. |
| S-010 | Partial | 다음 날 재방문은 실제 시간 경과 테스트를 수행하지 않았다. |

## 남아 있는 제한사항

- Login 이후 Watchlist, Alert, saved screens 생성 흐름은 직접 검증하지 않았다.
- Paid 기능 범위는 공식 Pricing 기준으로 별도 검증하지 않았다.
- Mobile Navigation은 직접 확인하지 않았다.
- AI 관련 Product Surface는 이번 조사 범위에서 확인하지 않았다.

## 최종 Phase 2 완료 판단

Phase 2 TradingView Benchmark Package는 EidosLayer와 비교 가능한 수준으로 작성되었다. 다만 Cross Validation은 전체 Benchmark 완료 전까지 Pending이다.
