# KR Market Board Runtime Policy

## Current Update Model

DATE 홈 시장 보드는 request-time rendering과 client polling을 함께 사용한다.

- `/` route: `force-dynamic`, `revalidate = 0`
- `/api/market-board`: `force-dynamic`, `Cache-Control: no-store`
- client refresh: 화면이 visible 상태일 때 60초마다 `/api/market-board` 재조회
- SEC disclosure cache TTL: 60초
- SEC accession tracking: `data/runtime/market-board-sec-state.json`에 CIK별 accessionNumber를 저장하고, 이후 새 accession만 `새 공시`로 표시
- SEC event log: `/api/market-board/sec-events`에서 최근 새 공시 감지 이벤트를 확인
- 뉴스 feed URL: `MARKET_BOARD_NEWS_FEED_URL`이 있으면 외부 JSON feed를 정규화해 뉴스 탭에 표시
- 뉴스 cache TTL: 30초
- 뉴스 headline tracking: `data/runtime/market-board-news-state.json`에 headline id를 저장하고, 이후 새 headline만 `NEW`로 표시
- 뉴스 event log: `/api/market-board/news-events`에서 최근 새 뉴스 감지 이벤트를 확인

따라서 SEC EDGAR submissions에 새 공시가 올라오면, 현재 구현 기준으로 사용자가 화면을 열어둔 상태에서 약 60초 단위로 다시 확인한다.
첫 서버 로딩 때 이미 존재하던 과거 공시는 새 공시로 표시하지 않고 기준 목록으로만 저장한다.

## SEC Feed Scope

SEC adapter는 설정된 티커 universe 기반으로 동작한다.

- large-cap: `SEC_LARGE_CAP_TICKERS`
- small-cap: `SEC_SMALL_CAP_TICKERS`
- 기본 small-cap 후보: `SOUN,BBAI,LUNR,RGTI,ACHR,IONQ,JOBY`

소형주는 매각, 인수합병, 증자, 지배권 변경, 주요 계약 8-K가 시장 반응과 연결될 수 있으므로 대형주보다 우선 노출한다.

## Event Classification

SEC adapter는 `submissions` metadata와 8-K 원문 HTML 일부를 함께 사용한다.

우선 분류 항목:

- `Item 2.01`: 인수합병 후보 / 매각·자산처분 후보
- `Item 3.02`: 증자·발행 후보
- `Item 5.01`, `Item 5.02`: 지배권 변경 후보
- `Item 1.01`, `Item 1.02`: 주요 계약 후보
- `Item 1.03`: 상장·재무 위험 후보

분류는 투자 판단이 아니라 원문 확인 queue를 만들기 위한 후보 라벨이다.
동일 Item 안에서 매각, 자산 처분, 합병, 인수 같은 키워드가 같이 걸릴 수 있으므로 키워드 매칭을 Item fallback보다 우선한다.

## Not Yet Implemented

아직 background worker나 push update는 없다. 현재 이벤트 로그는 파일 기반 로컬 런타임 저장소이므로 운영 배포에서는 DB나 KV로 교체해야 한다.

남은 작업:

- 서버 polling worker
- 운영용 DB/KV 기반 last accessionNumber 저장
- SSE 또는 WebSocket push
- NAVER API Hub / NewsAPI / Finnhub / Benzinga 전용 adapter
