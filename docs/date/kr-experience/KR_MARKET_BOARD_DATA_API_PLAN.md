# KR Market Board Data / API Plan

## 문서 목적

DATE 홈 보드의 실제 데이터를 가져오기 위해 필요한 API, 데이터 소스, 준비 항목, 구현 작업 리스트를 정리한다.

현재 화면의 핵심 방향은 사용자가 증권사에서 직접 판단하기 전에 `시황`, `뉴스`, `일정`, `속보·공시`, `수급·차트`를 빠르게 확인하는 것이다. 따라서 데이터도 매수/매도 근거를 만드는 방식이 아니라, 시장 확인판에 필요한 객관 데이터와 원문 링크를 우선한다.

## 기준 결론

1. 시세, 캔들, 랭킹, 체결, 호가, 장 운영 정보는 토스증권 Open API와 한국투자증권 Open API를 함께 사용한다.
2. 국내 공식 시장 데이터, 지수, 수급, 파생, 거래소 통계는 KRX Open API를 함께 사용한다.
3. 미국 공시는 SEC `data.sec.gov`를 1순위로 사용한다.
4. 국내 공시는 DART Open API를 1순위로 사용하고, 거래소 공시/시장조치 성격은 KRX/KIND를 보조로 사용한다.
5. FOMC, CPI, 금리, 국채금리는 공식 기관 소스를 별도로 붙인다.
6. 뉴스는 원문 링크, 출처, 발행 시각, 카테고리만 저장하고 종목 상승 원인으로 단정하지 않는다.
7. 토스증권/한국투자증권/KRX에서 제공하지 않는 원자재 선물, 일부 해외 지수선물, 속보성 뉴스는 별도 공급자를 확인한다.

## 최종 데이터 전략

DATE 홈 보드는 단일 API에 의존하지 않는다.

```text
토스증권 Open API
  -> 국내/미국 통합 시세, 캔들, 체결, 환율, 랭킹, 종목 기본 정보

한국투자증권 Open API
  -> 실시간 체결/호가, 국내선물옵션, 해외선물옵션, 수급, 순위분석, 프로그램매매 보강

KRX Open API / KRX KIND
  -> 국내 공식 시장 통계, 지수, 주식, 파생, 시장조치, 거래소 기준 데이터

DART
  -> 국내 기업 공시 원문

SEC
  -> 미국 기업 공시 원문

뉴스 공급자
  -> 국내/미국 헤드라인과 보도자료
```

이 구조의 장점:

- 토스증권은 국내/해외 통합 REST 구조가 깔끔하다.
- 한국투자증권은 실시간/파생/수급/순위분석 쪽 보강에 적합하다.
- KRX는 국내 시장 공식 기준값을 제공한다.
- DART/SEC는 공시 원문 출처로 분리할 수 있다.

## 한국투자증권 Open API 위치

한국투자증권 Open API는 DATE에서 `토스증권 대체재`라기보다 `실시간 시세 / 파생 / 수급 / 순위 보강 소스`로 보는 것이 맞다.

공식 포털 기준 제공 방식:

- REST API
- WebSocket 실시간 시세
- 국내주식, 해외주식, 국내선물옵션, 해외선물옵션, 장내채권
- 기본 시세, 시세 분석, 업종/기타, 종목 정보, 순위 분석
- 실시간 체결가, 호가, 예상체결가
- 투자자별 매매동향, 프로그램매매 등 시장 분석 계열

주의:

- 한국투자증권 Open API의 시세정보는 이용 목적과 제3자 제공 제한을 반드시 확인해야 한다.
- 제휴법인 또는 고객 대상 화면 표출은 거래소/코스콤 등 별도 시세정보 이용계약이 필요할 수 있다.
- 일반 뉴스/속보 피드가 공식 API 목록에서 안정적으로 제공되는지는 별도 확인이 필요하다. 확인 전까지 한국투자증권은 `뉴스 1순위`가 아니라 `시세·수급·랭킹·파생 1순위 후보`로 둔다.
- 공시는 DART/SEC 원문이 더 직접적인 공식 출처다. 한국투자증권에서 공시성 정보를 제공하더라도 원문 확인 링크는 DART/SEC로 연결한다.

## 데이터 소스 전체 맵

| 데이터 영역 | 1순위 | 2순위 | 3순위 / 보완 | 필요한 키 / 계약 | 화면 사용처 |
| --- | --- | --- | --- | --- | --- |
| 국내/미국 종목 현재가 | 토스증권 Open API `prices` | 한국투자증권 Open API | Polygon / Finnhub / Alpha Vantage | Toss OAuth / KIS appkey | 시황, 주도주, 차트 |
| 국내/미국 1분봉·일봉 | 토스증권 Open API `candles` | 한국투자증권 Open API | Polygon / Finnhub | Toss OAuth / KIS appkey | 차트, VWAP, 주도주 |
| 최근 체결 | 토스증권 Open API `trades` | 한국투자증권 WebSocket / REST | Polygon Trades | Toss OAuth / KIS appkey | 순간 거래량, 체결 강도 |
| 호가 | 토스증권 Open API `orderbook` | 한국투자증권 WebSocket / REST | 유료 실시간 벤더 | Toss OAuth / KIS appkey | 단타 확인 보조 |
| 거래대금/거래량/등락률 랭킹 | 한국투자증권 순위 분석 | 토스증권 Ranking | KRX 데이터 | KIS appkey / Toss OAuth / KRX key | 주도주 |
| 국내 지수/투자자별 수급 | KRX Open API | 한국투자증권 시장 분석 | 토스증권 Market Indicators | KRX key / KIS appkey | 수급 |
| 국내 공식 지수/시장 통계 | KRX Open API | 한국투자증권 업종/기타 | 토스 Market Indicators | KRX key / KIS appkey | 시황, 수급 |
| 국내 파생상품 | KRX Open API | 한국투자증권 국내선물옵션 | 토스 지원 여부 확인 | KRX key / KIS appkey | 시황 |
| 원/달러 환율 | 토스증권 `exchange-rate` | 한국은행 ECOS | 서울외국환중개 | Toss OAuth 또는 공공 API key | 시황 |
| 미국 10Y 금리 | U.S. Treasury XML Feed | FRED | 토스 지표 지원 시 토스 | 없음 또는 FRED key | 시황 |
| FOMC 일정/성명 | Federal Reserve calendar / RSS | NewsAPI/Benzinga headline | 수동 보정 | 없음 | 일정, 속보 |
| CPI 일정/수치 | BLS calendar / BLS Public Data API | 경제 캘린더 API | 수동 보정 | 없음 또는 BLS key | 일정, 시황 |
| 미국 SEC 공시 | SEC `data.sec.gov` | Benzinga SEC Filings | Finnhub SEC Filings | 없음 / 일부 유료 | 속보·공시 |
| 국내 DART 공시 | DART Open API | KRX KIND | 한국투자증권 종목 이벤트 보조 | DART API key / KRX key | 속보·공시 |
| 미국 시장 뉴스 | Benzinga Newswire | Finnhub Market News / NewsAPI | GDELT / Event Registry | 유료 또는 API key | 뉴스, 속보 |
| 국내 시장 뉴스 | NAVER API Hub News Search | NEWSTORE / 뉴스와이어 API | 한국투자증권 뉴스 API 제공 여부 확인 | Naver API Hub key / 계약 / KIS appkey | 뉴스 |
| 기업 보도자료 | Benzinga Press Releases / Finnhub Press Releases | BusinessWire / GlobeNewswire / PRNewswire | 회사 IR RSS | 유료 계약 | 뉴스, 속보 |
| 국내 보도자료 | 뉴스와이어 API | NEWSTORE | 회사 IR / 공시 | 계약 또는 API key | 뉴스 |
| 증권사 제공 종목 뉴스 | 한국투자증권 제공 여부 확인 | NAVER API Hub | NEWSTORE | KIS appkey / 뉴스 권리 확인 | 뉴스, 속보 보조 |
| 실적발표 일정 | Benzinga Calendar | Finnhub Earnings Calendar | Nasdaq earnings calendar / 회사 IR | 유료/API key | 일정 |
| IPO/공모주 일정 | DART 증권신고서 + 국내 IPO 데이터 | 38커뮤니케이션 등 제휴 | 수동 관리 | DART key / 제휴 | 일정 |
| 원자재 선물 | 유료 시세 벤더 | Trading Economics / Polygon futures 지원 여부 | 거래소 데이터 | 계약 가능성 높음 | 시황 |
| BTC | 거래소 공개 API | CoinGecko / CoinMarketCap | 토스 지원 시 토스 | API key 선택 | 시황 |

## 탭별 데이터 수집 전략

### 시황

목표는 `시장 방향을 빠르게 확인`하는 것이다. 시황에는 원문 뉴스보다 숫자, 방향, 업데이트 시각이 중요하다.

| 카드 | 가져올 데이터 | 우선 소스 | 준비 사항 |
| --- | --- | --- | --- |
| NASDAQ 선물 | 현재가, 등락률, 업데이트 시각 | 토스증권 지원 여부 확인 | 선물 심볼 매핑 필요 |
| S&P 500 선물 | 현재가, 등락률, 업데이트 시각 | 토스증권 지원 여부 확인 | 선물 심볼 매핑 필요 |
| 필라델피아 반도체지수 | 현재가, 등락률, 업데이트 시각 | Toss/KIS 지원 여부 확인 | 심볼 후보 `SOX`, `^SOX`; 미지원 시 Finnhub/Polygon/Twelve Data 같은 지수 데이터 벤더 필요 |
| Russell 2000 선물 | 현재가, 등락률 | 토스증권 지원 여부 확인 | 미지원 시 벤더 필요 |
| KOSPI 주간선물 | 현재가, 등락률 | 토스증권 / KRX | 국내 선물 심볼 매핑 |
| KOSPI 야간선물 | 현재가, 등락률 | 한국투자증권 국내선물옵션 / 토스증권 지원 여부 확인 | 야간선물 지원 여부 확인 |
| KOSDAQ 야간선물 | 현재가, 등락률 | 한국투자증권 국내선물옵션 / 토스증권 지원 여부 확인 | 야간선물 지원 여부 확인 |
| 오일선물 | WTI 현재가, 등락률 | 유료 벤더 | 토스 미지원 가능성이 높음 |
| 금선물 | Gold futures 현재가, 등락률 | 유료 벤더 | 토스 미지원 가능성이 높음 |
| 원/달러 환율 | 현재 환율, 전일 대비 | 토스증권 `exchange-rate` | 환율 방향 문구 |
| BTC | BTC/USD 또는 BTC/KRW | 거래소 API / CoinGecko | 거래소 기준 선택 |
| VIX | 현재가, 등락률 | 토스증권 지원 여부 확인 / CBOE vendor | 라이선스 확인 |
| 10Y 금리 | 최신 10Y yield | U.S. Treasury XML Feed | 일중 실시간 여부 한계 표시 |

### 뉴스

뉴스는 `시장 분위기와 헤드라인 흐름`을 보여주는 용도다. 종목 상승 이유로 단정하지 않는다.

| 뉴스 유형 | 우선 소스 | 보조 소스 | 표시 데이터 | 주의 |
| --- | --- | --- | --- | --- |
| 미국 시장 전체 뉴스 | Benzinga Newswire | NewsAPI, Finnhub Market News, GDELT | headline, source, publishedAt, url, tickers/tags | 실시간/저작권은 유료 계약이 안정적 |
| 미국 기업 뉴스 | Finnhub Company News | Benzinga Stock News, 회사 IR RSS | symbol, headline, summary, url | 북미 기업 중심 |
| 미국 보도자료 | Benzinga Press Releases | Finnhub Press Releases, PRNewswire/GlobeNewswire/BusinessWire 계약 | headline, company, url, publishedAt | 전문 저장 금지, 링크 우선 |
| 국내 시장 뉴스 | NAVER API Hub News Search | NEWSTORE, 뉴스와이어, 언론사 RSS | title, originallink, link, pubDate, source | 네이버는 검색 결과 API 성격 |
| 국내 기업 뉴스 | NAVER API Hub keyword query | NEWSTORE 계약 뉴스 | title, source, originalUrl, pubDate | 종목명/테마 keyword query 필요 |
| 국내 보도자료 | 뉴스와이어 API | 회사 IR RSS, DART 공시 보조 | title, company, category, url | 계약/이용 조건 확인 |
| 글로벌 매크로 뉴스 | NewsAPI business / GDELT | Reuters/Bloomberg 계약 가능 시 최상 | headline, source, url, publishedAt | 무료 API는 금융 속보 품질 한계 |
| 테마 키워드 뉴스 | NAVER API Hub + NewsAPI query | GDELT / Event Registry | keyword, title, source, publishedAt | 소형주/테마주 탭에서만 종목 연결 |
| 증권사 종목 뉴스 | 한국투자증권 API 제공 여부 확인 | NAVER API Hub 종목명 query | headline, symbol, source, publishedAt | 제공 여부와 재표출 권리 확인 전까지 보조 후보 |

추천 조합:

1. 초기 MVP: `NAVER API Hub News Search` + `NewsAPI` + `SEC/DART/Fed/BLS 공식 원문`
2. 실전형 속보: `Benzinga Newswire` + `NAVER API Hub` + `SEC/DART`
3. 분석 확장형: `Event Registry` 또는 `GDELT`로 글로벌 기사 군집화
4. 증권사 보강형: `한국투자증권 시세·수급·순위` + `NAVER/Benzinga 뉴스` + `SEC/DART 원문`

뉴스 저장 정책:

- 저장: 제목, 요약 일부, 출처, 원문 URL, 발행 시각, 수집 시각, 태그
- 저장 금지: 유료 기사 전문, 무단 크롤링 전문, 라이선스 불명 본문
- 화면 문구: `같이 확인된 헤드라인`, `시장 반응 구간`, `원문 확인`

### 일정

| 일정 유형 | 우선 소스 | 보조 소스 | 준비 사항 |
| --- | --- | --- | --- |
| CPI / PPI / 고용지표 | BLS Calendar / BLS API | 경제 캘린더 API | release calendar importer |
| FOMC | Federal Reserve calendar | Fed RSS | statement/minutes URL 저장 |
| 미국 실적발표 | Benzinga Calendar | Finnhub earnings calendar, Nasdaq calendar | 유료/무료 범위 확인 |
| 국내 실적발표 | DART 잠정실적 / 정기보고서 | 거래소 일정, 기업 IR | 공시 유형 필터 필요 |
| 국내 공모주 | DART 증권신고서 | IPO 일정 공급자 | 청약일/환불일/상장일 파싱 |
| 상장 / 보호예수 / 락업 | DART / KRX | IPO 데이터 공급자 | 별도 데이터 상품 필요 가능 |

### 속보·공시

| 구분 | 우선 소스 | 가져올 항목 | 필터 키워드 |
| --- | --- | --- | --- |
| 미국 SEC | SEC submissions | 8-K, 13D, 13G, S-1, 424B, 10-Q, 10-K | merger, acquisition, disposition, offering, agreement, bankruptcy |
| 미국 정책/금리 속보 | Federal Reserve RSS / calendar | statement, minutes, speech, rate decision | FOMC, rate, inflation, monetary policy |
| 미국 바이오/정책 | FDA / 회사 PR / Benzinga | approval, CRL, trial, regulation | FDA, approval, phase, trial |
| 국내 DART | DART 공시검색 | 공급계약, 최대주주 변경, 합병, 유증, CB/BW, 실적 | 단일판매, 공급계약, 최대주주, 합병, 유상증자, 전환사채 |
| 국내 거래소 | KRX KIND | 조회공시, 투자경고, 거래정지/재개 | 투자경고, 단기과열, 거래정지, 조회공시 |
| 증권사 알림/종목 이벤트 | 한국투자증권 종목정보/일정/권리 API | 종목 일정, 권리, 투자 유의 정보 | 권리락, 배당, 유상증자, 투자주의 |

### 수급

| 데이터 | 우선 소스 | 보조 소스 | 사용 방식 |
| --- | --- | --- | --- |
| 코스피/코스닥 외국인·기관·개인 | 한국투자증권 시장 분석 | KRX / 토스 Market Indicators | 시장 전체 수급 카드 |
| 선물 외국인/기관 | 한국투자증권 국내선물옵션 | KRX / 토스 지원 여부 확인 | 개장 전 방향 확인 |
| 프로그램매매 | 한국투자증권 시장 분석 | KRX | 장중 수급 압력 확인 |
| ETF 수급 / 대형 ETF 반응 | 토스 현재가/캔들 | 한국투자증권 / Polygon/Finnhub | QQQ, SOXX, SPY 등 |
| 거래대금 상위 | 한국투자증권 순위 분석 / 토스 Ranking | KRX | 주도주 후보 |
| 거래량 급증 | 한국투자증권 순위 분석 + Candles | 토스 Ranking + Candles | 1분/5분 급증 탐지 |

### 차트

| 데이터 | 우선 소스 | 산출 값 |
| --- | --- | --- |
| 1분봉 OHLCV | 토스 `candles` / 한국투자증권 차트 | 단기 추세, 거래량 급증 |
| 5분봉 OHLCV | 토스 `candles` / 한국투자증권 차트 | 주도주 유지 여부 |
| 일봉 OHLCV | 토스 `candles` / 한국투자증권 차트 | 전일 고점/저점, 갭 |
| 최근 체결 | 토스 `trades` / 한국투자증권 실시간 체결 | 체결 속도, 순간 거래량 |
| VWAP | 자체 계산 | 현재가가 VWAP 위/아래 |
| 거래대금 | 캔들 OHLCV + 현재가 | 주도주 점수 |

## Toss vs 한국투자증권 역할 분담

| 역할 | Toss 우선 | 한국투자증권 우선 |
| --- | --- | --- |
| 단순 현재가 / 캔들 | 가능 | 가능 |
| 국내/해외 통합 REST 구조 | 강점 | 상품별 API가 더 세분화됨 |
| 실시간 체결/호가 | REST 중심, WebSocket 지원 여부 확인 | WebSocket 실시간 시세 강점 |
| 국내선물옵션 / 야간선물 | 지원 범위 확인 필요 | 강점 |
| 수급 / 프로그램매매 / 순위분석 | 지원 범위 확인 필요 | 강점 |
| 뉴스 | 지원 여부 제한적 | 제공 여부 확인 필요 |
| 공시 원문 | 부적합 | 보조 가능성, 원문은 DART/SEC 우선 |
| 서비스 화면 재표출 | 약관 확인 필요 | 시세정보 제3자 제공 제한 확인 필요 |

## 화면 컴포넌트별 데이터 매핑

| 화면 영역 | 필요한 실제 데이터 | 1순위 소스 | 대체 / 보조 소스 | 비고 |
| --- | --- | --- | --- | --- |
| 시황 - NASDAQ / S&P / Russell / SOX | 지수 또는 지수선물 현재가, 등락률, 캔들 | 토스증권 Market Indicators / Market Data | 유료 시세 공급자, 거래소/데이터 벤더 | 토스 제공 범위 확인 필요. 선물 심볼과 `SOX`/`^SOX` 지원 여부가 핵심이다. |
| 시황 - KOSPI / KOSDAQ 주간·야간선물 | 국내 지수선물 현재가, 등락률, 캔들 | 토스증권 Market Indicators | KRX, eSignal류 데이터 벤더 | 야간선물/선물옵션 심볼 지원 여부 확인 필요. |
| 시황 - 원/달러 환율 | KRW/USD 환율 | 토스증권 `GET /api/v1/exchange-rate` | 한국은행, 서울외국환중개 | 홈 보드에는 현재값과 전일 대비만 우선. |
| 시황 - 10Y 금리 | 미국 10년물 금리 | 토스증권 지표 지원 시 사용 | U.S. Treasury XML Feed | 공식 Treasury 피드는 일중 실시간보다는 일일 데이터 성격. |
| 시황 - WTI / 금 / BTC | 원자재, crypto 현재가와 등락률 | 토스증권 지원 범위 확인 | 유료 데이터 벤더, 거래소 API | 토스가 미지원하면 별도 계약/연동 필요. |
| 뉴스 탭 | 헤드라인, 출처, 발행시각, 링크, 카테고리 | 뉴스 공급자 별도 필요 | RSS, 제휴 뉴스 API, 크롤링 허용 사이트 | 저작권 때문에 전문 저장 금지. 요약/원문 링크 중심. |
| 일정 탭 | CPI, FOMC, 실적발표, 공모주, 상장일 | BLS, Federal Reserve, DART, 토스 시장 캘린더 | IPO 일정 공급자, 거래소 일정 | 날짜 기반 정규화가 필요하다. |
| 속보·공시 - 미국 | 8-K, 13D/G, S-1, M&A, 매각, 지분 변동 | SEC `data.sec.gov/submissions` | SEC RSS / full-text search | CIK / ticker 매핑 테이블 필요. |
| 속보·공시 - 국내 | 공급계약, 최대주주 변경, 합병, 유증, CB/BW, 조회공시 | DART Open API | KRX KIND | corp_code 매핑 테이블 필요. |
| 수급 | 외국인/기관/개인 매매대금, 지수 수급 | 토스증권 Market Indicators | KRX 데이터, 증권사 API | 시장별 집계와 종목별 수급을 분리. |
| 차트 | 1분봉, 일봉 OHLCV, VWAP 계산, 거래량 급증 | 토스증권 `GET /api/v1/candles`, `GET /api/v1/trades` | 증권사/데이터 벤더 | VWAP은 자체 계산. |
| 주도주 | 거래대금 랭킹, 거래량 랭킹, 등락률, 1분/5분 거래량 급증 | 토스증권 Ranking + Candles + Trades | KRX, NASDAQ 데이터 벤더 | `순간 거래량 x 거래대금 x 분봉 위치` 조합으로 산출. |

## 준비해야 할 API / 계정

### 1. 토스증권 Open API

필수 준비:

- 토스증권 계좌
- Open API 사전 신청 / 사용 승인
- `client_id`
- `client_secret`
- OAuth 2.0 access token 발급 로직
- 서버 환경변수 저장

우선 사용할 API:

| 기능 | 엔드포인트 후보 | 사용처 |
| --- | --- | --- |
| 토큰 발급 | `POST /oauth2/token` | 모든 토스 API 호출 전 인증 |
| 현재가 | `GET /api/v1/prices` | 시황 카드, 종목 현재가 |
| 호가 | `GET /api/v1/orderbook` | 단타 대응 전 호가 확인 |
| 최근 체결 | `GET /api/v1/trades` | 순간 거래량, 체결 강도 |
| 캔들 | `GET /api/v1/candles` | 1분봉, 일봉, VWAP 계산 |
| 상하한가 | `GET /api/v1/price-limits` | 국내 테마주 리스크 표시 |
| 종목 정보 | `GET /api/v1/stocks` | 종목명, 시장, 통화, 상장 상태 |
| 매수 유의사항 | `GET /api/v1/stocks/{symbol}/warnings` | 투자경고, 단기과열, VI 등 |
| 환율 | `GET /api/v1/exchange-rate` | 원/달러 환율 |
| 장 운영 정보 | `GET /api/v1/market-calendar/KR` | 국내 장, NXT 세션 |
| 랭킹 | Ranking API | 주도주, 거래대금/거래량/등락률 |
| 지표 | Market Indicators API | 지수, 국채, 투자자별 매매대금 |

주의:

- 시세/시장 데이터는 토큰만 필요하지만, 주문/계좌 API는 `X-Tossinvest-Account`가 필요하다.
- DATE 홈 보드는 주문 기능이 목적이 아니므로 1차 범위에서는 주문/계좌 API를 제외한다.
- 토스 문서상 WebSocket은 추후 지원 예정이므로 1차 구현은 REST polling 기준으로 잡는다.

### 2. SEC EDGAR / data.sec.gov

### 2. 한국투자증권 Open API

필수 준비:

- 한국투자증권 계좌
- KIS Developers Open API 신청
- 실전/모의 app key
- app secret
- HTS ID
- REST access token 발급 로직
- WebSocket approval key 발급 로직

우선 사용할 API 영역:

| 기능 | 사용처 |
| --- | --- |
| 국내주식 기본 시세 | 시황, 주도주 |
| 국내주식 실시간 체결가 | 순간 거래량, 체결 강도 |
| 국내주식 실시간 호가 | 단타 확인 보조 |
| 국내주식 순위 분석 | 거래대금/거래량/등락률 주도주 |
| 국내주식 투자자별 매매동향 | 수급 |
| 프로그램매매 | 수급 |
| 국내선물옵션 시세 | KOSPI/KOSDAQ 선물, 야간선물 |
| 해외주식 시세 | 미국 종목 확인 |
| 해외선물옵션 시세 | NASDAQ/S&P/Russell 선물 지원 여부 확인 |
| 종목정보/일정/권리 | 일정, 종목 이벤트 보조 |

주의:

- 시세정보의 화면 표출/제3자 제공은 약관과 거래소 데이터 이용계약 확인이 필요하다.
- WebSocket은 서버에서 받아 캐시/정규화 후 화면에 내려주는 구조로 설계한다.
- 주문/계좌 기능은 홈 보드 1차 범위에서 제외한다.

### 3. KRX Open API / KRX KIND

필수 준비:

- KRX Open API 인증키
- 필요한 데이터상품 신청 여부 확인
- KRX 데이터 이용약관 확인
- KRX KIND 공시/시장조치 접근 방식 확인

우선 사용할 데이터:

| 기능 | 사용처 |
| --- | --- |
| 주식 시장 통계 | 국내 시황 |
| 지수 데이터 | KOSPI, KOSDAQ, 업종 |
| 파생상품 데이터 | KOSPI/KOSDAQ 선물, 옵션 |
| 투자자별 매매동향 | 수급 |
| 거래대금/거래량 공식 통계 | 주도주 검증 |
| 시장조치 | 투자주의, 투자경고, 거래정지/재개 |
| KRX KIND 공시 | DART 보조, 거래소 공시/조회공시 |

주의:

- KRX는 공식 기준값으로 좋지만 실시간성/상품별 제공 범위는 신청 상품에 따라 달라질 수 있다.
- 서비스 화면에 표출할 경우 데이터 라이선스 조건을 반드시 확인한다.

### 4. SEC EDGAR / data.sec.gov

필수 준비:

- 별도 API key는 필요 없음
- 서버 사이드 호출
- `User-Agent` 정책 준수
- CIK / ticker 매핑 테이블
- 요청 제한과 캐시 정책

우선 사용할 데이터:

| 기능 | 엔드포인트 / 데이터 | 사용처 |
| --- | --- | --- |
| 회사별 제출 이력 | `https://data.sec.gov/submissions/CIK##########.json` | 8-K, 13D/G, S-1 감지 |
| 재무 XBRL | `companyfacts`, `companyconcept` | 실적/재무 상세 확장 시 |
| Bulk submissions | `submissions.zip` | 초기 CIK/공시 캐시 구축 |

주의:

- 브라우저 직접 호출이 아니라 서버 API route / worker에서 호출한다.
- 속보성은 `submissions`를 주기적으로 확인하고, 상세 원문 링크는 SEC Archives로 연결한다.

### 5. DART Open API

필수 준비:

- DART API 인증키
- corp_code 전체 목록 동기화
- 회사명 / 종목코드 / corp_code 매핑
- 공시 유형 필터링 규칙

우선 사용할 데이터:

| 기능 | 사용처 |
| --- | --- |
| 공시검색 | 속보·공시 국내 탭 |
| 공시 원문 XML | 공급계약, 유증, CB/BW 등 원문 확인 |
| 주요사항보고서 | M&A, 영업양수도, 자금조달 |
| 지분공시 | 최대주주, 대량보유, 임원 지분 |
| 정기보고서 / 재무정보 | 실적발표, 재무 상세 확장 |

주의:

- 국내 잡주/테마주까지 포함하려면 코스피/코스닥 전체 corp_code 매핑이 먼저 필요하다.
- 공시 제목 keyword만으로 단정하지 말고 `공시 유형`, `원문 링크`, `제출 시각`을 같이 저장한다.

### 6. 공식 매크로 / 일정 소스

| 데이터 | 소스 | 사용처 |
| --- | --- | --- |
| CPI 발표 일정 / 수치 | BLS calendar, BLS Public Data API | 일정 탭, 시황 이벤트 |
| FOMC 일정 / 성명 | Federal Reserve calendar / RSS | 일정 탭, 속보·공시 |
| 미국 국채금리 | U.S. Treasury XML Feed | 10Y 금리 카드 |
| 연준 보도자료 | Federal Reserve RSS | 속보성 매크로 |

### 5. 별도 공급자 검토가 필요한 데이터

토스증권 API 지원 범위를 실제 계정으로 확인해야 하는 항목:

- NASDAQ 선물
- S&P 500 선물
- 필라델피아 반도체지수 `SOX` / `^SOX`
- Russell 2000 선물
- KOSPI 야간선물
- KOSDAQ 야간선물
- WTI 선물
- 금 선물
- BTC 실시간 시세
- 미국 프리마켓 / 애프터마켓 저유동 종목 체결
- 뉴스 전문 / 속보 라이선스

이 항목이 토스에서 부족하면 다음 중 하나가 필요하다.

- 유료 시세 벤더
- 거래소 또는 공식 데이터 상품
- 뉴스 API 제휴
- 허용된 RSS / 공공 데이터 기반 제한 구현

## 데이터 모델 초안

```ts
type MarketSnapshot = {
  id: string;
  label: string;
  market: "US" | "KR" | "GLOBAL" | "CRYPTO";
  instrumentType: "index" | "future" | "rate" | "fx" | "commodity" | "crypto";
  symbol: string;
  value: string;
  change?: string;
  changeRate?: string;
  timestamp: string;
  source: "toss" | "treasury" | "vendor";
};

type DisclosureItem = {
  id: string;
  market: "US" | "KR";
  source: "SEC" | "DART" | "KRX";
  symbol?: string;
  companyName: string;
  formType: string;
  title: string;
  filedAt: string;
  originalUrl: string;
  tags: string[];
};

type CalendarEvent = {
  id: string;
  date: string;
  time?: string;
  market: "US" | "KR";
  type: "macro" | "earnings" | "ipo" | "fomc" | "disclosure";
  title: string;
  source: string;
  originalUrl?: string;
};

type LeadingStock = {
  symbol: string;
  name: string;
  market: "US" | "KR";
  price: string;
  changeRate: string;
  turnover: number;
  volumeSpikeRate: number;
  candleWindow: "1m" | "5m";
  vwapPosition: "above" | "below" | "near";
  timestamp: string;
};
```

## 주도주 산출 기준

주도주는 단순 등락률이 아니라 아래 조건을 함께 본다.

1. 1분봉 또는 5분봉 거래량이 직전 평균 대비 급증
2. 거래대금이 시장 평균보다 큼
3. 현재가가 VWAP 위 또는 전일 고점 근처
4. 같은 시간대에 체결 강도 또는 최근 체결량 증가
5. 투자경고, 단기과열, 유동성 부족 같은 리스크 플래그 표시

초기 점수식:

```text
leaderScore =
  volumeSpikeRate * 0.35
  + turnoverRankScore * 0.30
  + priceChangeScore * 0.15
  + vwapPositionScore * 0.10
  + recentTradeAccelerationScore * 0.10
```

## 구현 작업 리스트

### Phase 0. API 준비 / 계정 발급

1. 토스증권 Open API 신청 후 `client_id`, `client_secret` 발급
2. 한국투자증권 Open API 신청 후 app key, app secret, HTS ID 준비
3. KRX Open API 인증키 발급 및 필요한 데이터상품 확인
4. DART Open API 인증키 발급
5. NAVER API Hub News Search 사용 가능 여부 확인 및 key 발급
6. NewsAPI 또는 Finnhub 무료 tier key 발급
7. Benzinga Newswire / Calendar / Press Releases 견적 확인
8. 원자재/선물 데이터 공급자 후보 선정
9. 뉴스 전문 저장 가능 여부와 저작권 정책 검토

### Phase 1. 데이터 계약 정리

1. 화면 컴포넌트별 DTO 확정
2. `MarketSnapshot`, `DisclosureItem`, `CalendarEvent`, `LeadingStock` 타입 추가
3. mock data를 실제 DTO 형태로 교체
4. source / timestamp / originalUrl 필드를 모든 외부 데이터에 강제

### Phase 2. 증권사 / 거래소 연동 기반

1. 환경변수 추가: `TOSS_INVEST_CLIENT_ID`, `TOSS_INVEST_CLIENT_SECRET`
2. OAuth token 발급 모듈 구현
3. token 캐시 / 만료 갱신 처리
4. Toss REST client 구현
5. 한국투자증권 REST token 발급 모듈 구현
6. 한국투자증권 WebSocket approval key 발급 모듈 구현
7. KIS REST/WebSocket client 구현
8. KRX Open API client 구현
9. 현재가, 캔들, 체결, 호가, 랭킹, 환율, 시장 캘린더 adapter 구현
10. API rate limit header 로깅

### Phase 3. 시황 탭 실제 데이터 연결

1. macroSnapshot을 Toss / KIS / KRX / Treasury / vendor adapter에서 가져오게 변경
2. 지원 불가 심볼은 `데이터 준비중` 상태로 표시
3. 업데이트 시각 표시
4. 실패 시 stale cache fallback 적용
5. 지표별 source badge 추가

### Phase 4. 뉴스 데이터 연결

1. `NewsItem` DTO 추가
2. NAVER API Hub adapter 구현
3. NewsAPI 또는 Finnhub adapter 구현
4. provider별 결과를 하나의 normalized news item으로 변환
5. 중복 기사 제거: title similarity + originalUrl 기준
6. 뉴스 카테고리 분류: 미국 매크로, 미국 기업, 국내 시장, 국내 테마, 정책, 공시 보조
7. 원문 URL / 발행 시각 / 출처 표시
8. 뉴스 전문 저장 금지 정책 적용
9. Benzinga 계약 시 Newswire adapter 추가
10. headline id 기반 새 뉴스 감지 상태를 DB/KV로 이전

### Phase 5. SEC / DART 공시 연결

1. SEC CIK ticker mapping 저장
2. SEC submissions polling worker 구현
3. DART corp_code 동기화 job 구현
4. DART 공시검색 adapter 구현
5. KRX KIND 사용 가능 여부 확인
6. 공시 유형 keyword classifier 구현
7. 미국 / 국내 탭에 원문 링크와 제출 시각 표시

### Phase 6. 일정 캘린더 연결

1. BLS CPI 일정 importer
2. Federal Reserve FOMC calendar / RSS importer
3. DART 실적 / 공모 / 상장 이벤트 importer
4. 일정 중복 제거
5. 캘린더 클릭 시 상세 이벤트를 실제 데이터로 렌더링

### Phase 7. 주도주 / 수급·차트 연결

1. KIS 순위분석 + Toss Ranking + KRX 거래대금 데이터로 후보군 수집
2. 후보군별 1분봉/5분봉 캔들 조회
3. VWAP 계산
4. 전일 고점 / 당일 고점 / 첫 눌림 상태 계산
5. 국내 / 미국 주도주 탭 분리 유지
6. 리스크 플래그 표시

### Phase 8. 운영 안정화

1. 서버 캐시 계층 추가
2. provider별 장애 fallback 정의
3. API 호출 로그와 실패율 모니터링
4. source별 rate limit 문서화
5. 저작권/약관 검토 필요한 뉴스 소스 분리

## 우선순위

1. 토스증권 Open API 키 발급 및 실제 지원 심볼 확인
2. 한국투자증권 Open API 키 발급 및 국내선물옵션/순위/수급 API 확인
3. KRX Open API key 발급 및 신청 가능한 국내 시장/파생 데이터 확인
4. DART Open API key 발급
5. NAVER API Hub News Search 또는 대체 국내 뉴스 소스 확정
6. 미국 뉴스 소스 확정: MVP는 NewsAPI/Finnhub, 실전형은 Benzinga
7. 시황 탭 현재가 / 환율 / 지수 / 선물 데이터 연결
8. 수급 탭 KRX/KIS 데이터 연결
9. DART 공시검색 연결
10. SEC submissions 연결
11. 뉴스 탭 연결
12. 캘린더 이벤트 연결
13. 주도주 계산 로직 연결
14. 원자재/선물 미지원 데이터 공급자 확정

## 당장 준비해야 할 환경변수

```text
TOSS_INVEST_CLIENT_ID=
TOSS_INVEST_CLIENT_SECRET=
KIS_APP_KEY=
KIS_APP_SECRET=
KIS_HTS_ID=
KIS_ACCOUNT_NO=
KIS_ACCOUNT_PRODUCT_CODE=
KRX_API_KEY=
DART_API_KEY=
NAVER_API_HUB_KEY_ID=
NAVER_API_HUB_KEY=
MARKET_BOARD_NEWS_FEED_URL=
NEWSAPI_KEY=
FINNHUB_API_KEY=
BENZINGA_API_KEY=
FRED_API_KEY=
```

`BENZINGA_API_KEY`, `FINNHUB_API_KEY`, `NEWSAPI_KEY`, `FRED_API_KEY`는 선택이다. 초기 구현은 Toss + DART + SEC + NAVER API Hub만으로 시작할 수 있지만, 미국 시장 뉴스와 실적 캘린더 품질을 올리려면 유료 공급자를 검토해야 한다.

## 참고 출처

- 토스증권 Open API: https://developers.tossinvest.com/
- 토스증권 Market Data: https://developers.tossinvest.com/docs/market-data
- SEC EDGAR APIs: https://www.sec.gov/search-filings/edgar-application-programming-interfaces
- DART Open API: https://opendart.fss.or.kr/intro/main.do
- BLS CPI Release Calendar: https://www.bls.gov/schedule/news_release/cpi.htm
- BLS Public Data API: https://www.bls.gov/bls/api_features.htm
- Federal Reserve FOMC Calendar: https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
- Federal Reserve RSS Feeds: https://www.federalreserve.gov/feeds/feeds.htm
- U.S. Treasury XML Feed: https://home.treasury.gov/treasury-daily-interest-rate-xml-feed
