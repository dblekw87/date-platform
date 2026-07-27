# 벤치마크 TradingView Trust 및 Evidence Observations 기록 문서

## 목적

이 문서는 TradingView에서 확인된 Trust Signal과 Evidence Traceability를 기록한다.

## 주요 Trust Pattern 요약

| Pattern | 주요 Surface | Confidence |
| ------- | ------------ | ---------- |
| Source / Timestamp 노출 | News | High |
| Symbol Page Documents | Symbol Page | Medium |
| Financial Data 설명 | Help Center | Medium |
| Community Author 표시 | Community Ideas | Medium |
| Forecast / Actual 비교 | Economic Calendar | High |
| AI Disclosure | Not Verified | Low |

## 기록 Pattern: Source / Timestamp 노출

### Observation

News Screen은 Reuters, Dow Jones 등 Source와 minutes 단위 Timestamp를 News 항목에 표시한다.

### Interpretation

TradingView는 News의 신뢰 판단에 필요한 최소 Evidence Metadata를 목록 단계에서 노출하는 구조일 수 있다.

### User Impact

사용자는 News를 열기 전 Source와 Freshness를 기준으로 판단할 수 있다.

### DATE Implication

DATE에서 Evidence 목록을 구성할 경우 Source와 Freshness가 Navigation 이전 단계에서 보여야 하는지 검증해야 한다.

### Confidence

High

### Evidence

Official Product Observation. `https://www.tradingview.com/news/`, 확인일 2026-07-27.

## 기록 Pattern: Symbol Page Documents

### Observation

AAPL Symbol Page에는 Documents 탭이 있다. 공식 Blog는 Documents 탭이 earnings call transcripts, annual/quarterly filings, investor presentations 등을 제공한다고 설명한다.

### Interpretation

TradingView는 Symbol Context 안에서 공식 Company Document를 확인하게 해 News와 공식 Evidence 사이의 이동 비용을 줄이는 구조일 수 있다.

### User Impact

사용자는 기업 관련 주장이나 News를 공식 Document로 검증할 가능성이 있다.

### DATE Implication

DATE에서 Evidence Graph 후보를 검토할 때 News와 Document 연결을 별도 Pattern으로 비교해야 한다.

### Confidence

Medium

### Evidence

Official Product Observation 및 Official Documentation. 확인일 2026-07-27.

## 기록 Pattern: Financial Data 설명

### Observation

공식 Help Center는 Financial Data가 company financial statements에서 파생되며, Supercharts Financial Data가 corporate reports와 다를 수 있다고 설명한다.

### Interpretation

TradingView는 데이터 Source와 계산 차이에 대한 설명을 Help Center에서 제공해 전문 사용자 Trust를 보완하는 구조일 수 있다.

### User Impact

사용자는 지표의 출처와 한계를 이해할 수 있지만, 화면 안에서 즉시 확인되는지는 미확인이다.

### DATE Implication

DATE에서 Metric을 제공할 경우 화면 내 Source 표시와 Help 문서 기반 설명의 역할을 구분해야 한다.

### Confidence

Medium

### Evidence

Official Documentation. TradingView Help Center, Financial data, 확인일 2026-07-27.

## 기록 Pattern: Community Author 표시

### Observation

Community Ideas는 작성자와 Idea Content를 표시한다.

### Interpretation

Community Evidence는 공식 Source가 아니라 작성자 Identity와 공개 Content 형식으로 Trust Signal을 형성할 수 있다.

### User Impact

사용자는 작성자의 맥락을 보고 Idea의 신뢰도를 판단할 수 있지만, 검증 가능한 Evidence와 Opinion의 경계는 별도로 판단해야 한다.

### DATE Implication

DATE에서 Discussion 또는 Insight를 Evidence와 함께 다룰 경우 Source 유형을 명확히 구분해야 한다.

### Confidence

Medium

### Evidence

Official Product Observation. Community Ideas, 확인일 2026-07-27.

## 기록 Pattern: Forecast / Actual 비교

### Observation

Economic Calendar는 forecast, actual, historical data, importance, country filter를 제공한다고 공식 화면과 설명에서 확인된다.

### Interpretation

Macro Event의 Evidence는 단일 News가 아니라 예상치와 실제치 차이를 비교하는 Metric 구조로 제공될 수 있다.

### User Impact

사용자는 Event impact를 정성 설명보다 수치 차이로 판단할 수 있다.

### DATE Implication

DATE에서 Event Evidence를 설계할 경우 forecast vs actual 구조를 Benchmark 비교 대상으로 유지해야 한다.

### Confidence

High

### Evidence

Official Product Observation. Economic Calendar, 확인일 2026-07-27.

## 기록 Pattern: AI Disclosure

### Observation

이번 조사 범위에서 TradingView의 AI Disclosure 또는 AI 생성 정보 구분은 확인하지 않았다.

### Interpretation

AI Trust Pattern은 TradingView Benchmark에서 충분히 검증되지 않았다.

### User Impact

AI 정보의 Source, 생성 여부, 책임 범위에 대한 사용자 판단 영향은 확인할 수 없다.

### DATE Implication

AI 관련 Candidate Principle은 TradingView에서 Supporting Evidence를 얻지 못했으며 다른 Benchmark가 필요하다.

### Confidence

Low

### Evidence

Not Verified. 공식 Product Observation 및 읽은 공식 문서 범위에서 확인하지 못함.
