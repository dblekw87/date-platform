# DATE

장중 시장을 확인하고, 그 판단을 기록하고, 다른 사람과 나누는 **트레이딩 커뮤니티 플랫폼**입니다.

세 가지 화면이 하나의 흐름으로 이어집니다.

1. **시장 보드** — 시황, 뉴스, 일정, 공시, 수급을 한 화면에서 확인
2. **매매 복기** — 그날의 매수/매도 판단과 잘한 점·못한 점을 기록
3. **커뮤니티** — 판단 근거를 질문하고 서로의 복기를 읽음

> 매수/매도 추천 서비스가 아니라, 시장 데이터와 원문 링크를 정리해 투자 판단 전 확인 흐름을 돕고 그 판단을 기록으로 남기는 도구입니다.

## Repository Layout

**프론트엔드와 백엔드가 분리된 두 저장소**로 구성됩니다. 배포용 스냅샷 저장소가 하나 더 있는데, 코드가 아니라 아래 [배포 구조](#배포된-사이트는-데이터를-어디서-받는가)의 산물입니다.

| 저장소 | 역할 | 스택 |
| --- | --- | --- |
| [`date-platform`](https://github.com/dblekw87/date-platform) (이 저장소) | 화면, 세션, 라우팅 | Next.js 16 · React 19 · TypeScript |
| [`date-platform-backend`](https://github.com/dblekw87/date-platform-backend) | API, DB, 외부 데이터 provider | Node.js · PostgreSQL |

**설계 원칙: 프론트엔드는 데이터를 만들지 않습니다.** 증권사 API 시크릿과 외부 호출은 전부 백엔드에 있고, 프론트엔드는 정규화된 DTO를 받아 표시만 합니다. 브라우저를 향한 프로세스에 provider 키가 존재하지 않습니다.

## Live Demo

- Production: [https://date-platform.vercel.app](https://date-platform.vercel.app)
- Deployment: Vercel Production

### 배포된 사이트는 데이터를 어디서 받는가

수집기와 PostgreSQL은 **집 데스크톱에서** 돕니다. 배포된 프론트엔드는 거기에 닿을 수
없으므로, 그대로 두면 운영 사이트는 빈 보드를 그립니다.

데이터베이스와 수집기를 클라우드로 올리는 선택지는 접었습니다. 수집 데이터가 하루
4만 행씩 늘어 무료 Postgres 한도(0.5GB)를 몇 주면 넘고, 증권사 API 키가 남의 서버에
올라가며, 24시간 떠 있어야 하는데 무료 웹 호스팅은 유휴 상태에서 잠듭니다.

그래서 내보내는 것을 **데이터가 아니라 그려진 화면 한 장**으로 바꿨습니다.

```
브라우저 ─→ Vercel
             ├─ 백엔드 시도 → 닿지 않음 (집 데스크톱)
             └─ 공개 스냅샷 JSON 읽음 ← 수집기가 10분마다 갱신
```

수집기가 이미 만들어 둔 보드를 10분마다
[`date-board-snapshot`](https://github.com/dblekw87/date-board-snapshot)에 밀어올리고,
프론트엔드는 백엔드가 응답하지 않을 때 그 JSON을 읽습니다. provider 원본 payload는
빠져 있고, 키는 나가지 않으며, 저장소에는 JSON 두 개뿐입니다. 커밋은 하나를 계속
고쳐 씁니다 — 10분마다 쌓으면 하루 40MB에 가까운 히스토리가 남는데, 읽히는 것은
언제나 마지막 한 장뿐입니다.

**데이터베이스가 죽으면 발행을 멈춥니다.** 주도주와 뉴스는 provider에서 바로 오므로
DB 없이도 채워지지만 짝꿍 패널·테마 그룹은 기록에서 읽으므로 비어버립니다. 실제로
도커 엔진이 멈춘 동안 짝꿍 테마가 14개에서 4개로 줄어든 보드가 나간 적이 있고,
화면만 봐서는 조용한 날과 구분되지 않았습니다. **갱신이 멈춘 보드는 정직하고, 반쪽으로
갱신되는 보드는 그렇지 않습니다.**

## Screens

### 시장 보드

여섯 개 탭 전부를 아래 [Portfolio Screen Captures](#portfolio-screen-captures)에
데스크톱 전체 화면으로 실었습니다.

<img src="./docs/portfolio/2026-08-20/desktop-market.png" width="860" alt="시장 보드 시황 탭" />

### 로그인 — SNS OAuth

Google, Naver, Kakao OAuth 2.0 Authorization Code 흐름을 직접 구현했습니다. NextAuth 같은 라이브러리 없이 state 검증, 토큰 교환, 프로필 조회, 세션 서명까지 처리합니다.

![로그인 화면](./public/portfolio/login.png)

### 커뮤니티

카테고리 분류, 제목 검색, 커서 기반 무한 스크롤, 댓글, 조회수를 제공합니다.

![커뮤니티 목록](./public/portfolio/community.png)

![커뮤니티 상세와 댓글](./public/portfolio/community-post.png)

### 매매 복기

매수한 점, 매도한 점, 잘한 점, 못한 점을 나눠 기록합니다. 이미지 첨부가 가능한 에디터를 직접 구현했고, 공개/비공개를 선택할 수 있습니다.

![매매 복기 목록](./public/portfolio/trade-journal.png)

### 프로필과 내가 쓴 글

![프로필](./public/portfolio/profile.png)

![내가 쓴 글](./public/portfolio/my-posts.png)

### 모바일

정보량이 많은 화면을 좁은 폭에서 어떻게 재배치했는지 확인할 수 있습니다.

| 시장 보드 | 커뮤니티 | 매매 복기 |
| --- | --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-market.png" width="240" alt="시장 보드 모바일" /> | <img src="./public/portfolio/community-mobile.png" width="240" alt="커뮤니티 모바일" /> | <img src="./public/portfolio/trade-journal-mobile.png" width="240" alt="매매 복기 모바일" /> |

## Portfolio Screen Captures

포트폴리오 검토자가 주요 화면을 빠르게 확인할 수 있도록 여섯 개 탭 전부를 데스크톱
전체 화면으로 캡처했습니다. 2026-08-20 로컬 실행 기준이고, 표시되는 종목과 수치는
그 시각 실제 수집 데이터입니다.

| 시황 | 뉴스 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/desktop-market.png" width="420" alt="시황 탭 — 미국 매크로와 국내 개장 기준점" /> | <img src="./docs/portfolio/2026-08-20/desktop-news.png" width="420" alt="뉴스 탭 — 국내외 헤드라인 흐름" /> |

| 일정 | 속보·공시 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/desktop-calendar.png" width="420" alt="일정 탭 — 공모주·실적발표 캘린더" /> | <img src="./docs/portfolio/2026-08-20/desktop-breaking.png" width="420" alt="속보·공시 탭 — SEC와 DART" /> |

| 수급·차트 | 매매참고 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/desktop-flow.png" width="420" alt="수급·차트 탭 — 거래대금·상승률·거래량·ETF·주의" /> | <img src="./docs/portfolio/2026-08-20/desktop-trade.png" width="420" alt="매매참고 탭 — 주도주·짝꿍매매·강세 테마·급등 후보" /> |

**매매참고**는 가장 나중에 분리한 탭입니다. 주도주·강세 테마·짝꿍매매·급등 후보가
시황 탭 아래로 계속 쌓여 한 화면이 아니라 스크롤이 되어버려서, "시장이 무엇을 했나"와
"그래서 무엇을 볼까"를 갈랐습니다.

그 안의 **짝꿍매매**는 장 구간으로 다시 나뉩니다 — 왼쪽 정규장 09:00~15:30, 오른쪽
NXT 애프터마켓 15:40~20:00. 같은 두 종목이라도 KRX 14시와 NXT 18시는 다른 호가창·다른
유동성이라 한 패널에 섞으면 읽을 수 없기 때문이고, 오른쪽은 15:40 전에는 아예 렌더하지
않습니다. 1등주를 후보가 추월해 간격이 사라진 조합도 목록에서 빠집니다.

**수급·차트** 탭의 하위 필터도 여섯입니다 — 거래대금·상승률·거래량·ETF·주의. ETF와
주의는 원래 화면만 있고 채울 데이터가 없었습니다. ETF는 주도주 랭킹에서 걸러 버리던
것을 별도 목록으로 살렸고(지수 펀드를 테마 거래대금에 합산하면 "누가 KODEX 200을
샀으니 반도체가 움직인다"가 됩니다), 주의는 KIS 시세 응답에 이미 들어 있던 관리종목·
투자경고 지정을 읽어 채웠습니다.

## Responsive Frontend Review

면접관이 프론트엔드 구현 품질을 빠르게 확인할 수 있도록 실제 로컬 실행 화면을 탭별로 캡처했습니다. 단순히 `@media`로 폭만 줄인 화면이 아니라, 금융 대시보드처럼 정보량이 많은 UI를 모바일과 태블릿에서 어떻게 재배치했는지 확인할 수 있습니다.

### Verification Summary

| Check | Result |
| --- | --- |
| 검증 일자 | 2026-08-20 |
| 검증 방식 | Playwright full-page screenshot + DOM overflow scan |
| 검증 뷰포트 | Desktop `1440x900`, Tablet `768x1024`, Mobile `390x844`, Narrow Mobile `320x568` |
| 탭 범위 | 시황, 뉴스, 일정, 속보·공시, 수급·차트, 매매참고 |
| 렌더링 상태 | 모든 탭 HTTP `200`, 콘솔 오류 `0` |
| 반응형 상태 | 24개 조합(6탭 × 4뷰포트) 전부 문서 가로 스크롤 없음 |

### What To Look For

- **HERO reflow**: 상단 DATE 로고, 핵심 문구, 현재 시각, 확인 순서가 화면 폭에 맞춰 축소되며 첫 화면의 정보 우선순위를 유지합니다.
- **Tabbed information architecture**: 시황, 뉴스, 일정, 공시, 수급을 하나의 대시보드 안에서 분리해 사용자가 장중 확인 순서대로 이동할 수 있게 했습니다.
- **Dense data layout**: 데스크톱에서는 표와 상세 패널을 함께 보여주고, 모바일에서는 카드/리스트 중심으로 세로 흐름을 만들어 좁은 화면에서도 정보가 겹치지 않게 했습니다.
- **Overflow handling**: 모바일 탭 바와 필터칩은 의도적으로 가로 스크롤을 허용하지만, 페이지 자체에는 가로 스크롤이 생기지 않도록 `minmax`, `overflow-wrap`, 고정 컬럼 전환을 적용했습니다.
- **Failure-tolerant UI**: 외부 API가 비활성 또는 지연되어도 레이아웃은 유지되고, provider 상태와 fallback 데이터를 통해 화면이 빈 상태로 깨지지 않게 구성했습니다.

<details>
<summary><strong>1. 시황 탭 - 시장 기준점 요약</strong></summary>

시황 탭은 사용자가 가장 먼저 확인하는 기준 화면입니다. 모바일에서는 핵심 지표 카드가 2열로 압축되고, 태블릿에서는 3열 카드 그리드와 시황 흐름 카드가 유지됩니다. 상승/하락 색상, 지표명, 출처 메타가 카드 안에서 잘리지 않도록 텍스트 줄바꿈과 숫자 크기를 분리했습니다.

| Mobile 390x844 | Tablet 768x1024 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-market.png" width="260" alt="DATE Market Board mobile market tab" /> | <img src="./docs/portfolio/2026-08-20/tablet-market.png" width="360" alt="DATE Market Board tablet market tab" /> |

</details>

<details>
<summary><strong>2. 뉴스 탭 - 최신 헤드라인 타임라인</strong></summary>

뉴스 탭은 데이터가 가장 많이 늘어나는 화면입니다. 태블릿에서는 표 형태의 스캔 구조를 유지하고, 모바일에서는 각 뉴스가 세로 리스트로 풀리도록 구성했습니다. 필터 버튼은 모바일에서 가로 스크롤 영역으로 유지해 버튼 크기를 과도하게 줄이지 않았습니다.

| Mobile 390x844 | Tablet 768x1024 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-news.png" width="260" alt="DATE Market Board mobile news tab" /> | <img src="./docs/portfolio/2026-08-20/tablet-news.png" width="360" alt="DATE Market Board tablet news tab" /> |

</details>

<details>
<summary><strong>3. 일정 탭 - 이벤트 캘린더</strong></summary>

일정 탭은 월간 캘린더와 다가오는 일정을 함께 보여줍니다. 모바일에서는 캘린더, 주요 일정, 선택 날짜 상세가 한 컬럼으로 쌓이고, 태블릿에서는 캘린더와 주요 일정이 나란히 배치됩니다. 날짜 셀 내부 배지는 작은 화면에서도 넘치지 않도록 축약 스타일을 적용했습니다.

| Mobile 390x844 | Tablet 768x1024 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-calendar.png" width="260" alt="DATE Market Board mobile calendar tab" /> | <img src="./docs/portfolio/2026-08-20/tablet-calendar.png" width="360" alt="DATE Market Board tablet calendar tab" /> |

</details>

<details>
<summary><strong>4. 속보·공시 탭 - 원문 확인 중심 리스트</strong></summary>

속보·공시 탭은 SEC/DART/KRX 이벤트를 빠르게 훑고 원문으로 이동하는 화면입니다. 모바일에서는 공시 카드가 1열로 전환되고, 태블릿에서는 2열 카드 그리드를 유지합니다. 공시 유형, 긴 기업명, 접수번호, 원문 링크가 카드 안에서 깨지지 않도록 `overflow-wrap`과 카드 최소 폭을 조정했습니다.

| Mobile 390x844 | Tablet 768x1024 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-breaking.png" width="260" alt="DATE Market Board mobile breaking disclosure tab" /> | <img src="./docs/portfolio/2026-08-20/tablet-breaking.png" width="360" alt="DATE Market Board tablet breaking disclosure tab" /> |

</details>

<details>
<summary><strong>5. 수급·차트 탭 - 고밀도 랭킹과 근거 패널</strong></summary>

수급·차트 탭은 가장 정보 밀도가 높은 화면입니다. 데스크톱/태블릿에서는 랭킹 리스트와 선택 종목 근거 패널을 함께 보여주고, 모바일에서는 종목 행을 세로 카드처럼 재배치해 순위, 테마, 거래대금, 상승률, 뉴스 근거를 한 흐름으로 읽게 했습니다. 이 탭은 정보량이 많아 가장 긴 페이지가 되지만, 문서 전체 가로 스크롤 없이 렌더링됩니다.

| Mobile 390x844 | Tablet 768x1024 |
| --- | --- |
| <img src="./docs/portfolio/2026-08-20/mobile-flow.png" width="260" alt="DATE Market Board mobile flow chart tab" /> | <img src="./docs/portfolio/2026-08-20/tablet-flow.png" width="360" alt="DATE Market Board tablet flow chart tab" /> |

</details>

캡처 전체: [`docs/portfolio/2026-08-20/`](./docs/portfolio/2026-08-20/) — 여섯 개 탭을
Desktop `1440x900`, Tablet `768x1024`, Mobile `390x844`, Narrow `320x568`에서
찍은 24장입니다. 전부 전체 화면이고, 어느 조합에서도 문서 가로 스크롤이 없습니다.

## Project Summary

| Item | Description |
| --- | --- |
| 프로젝트명 | DATE |
| 목적 | 시장을 확인하고, 그 판단을 기록하고, 다른 사람과 나누는 트레이딩 커뮤니티 |
| 주요 사용자 | 국내/미국 주식 시장을 함께 확인하는 개인 투자자 |
| 핵심 가치 | 외부 API 실패에도 유지되는 대시보드 + 판단을 남기는 기록 도구 + 근거를 나누는 커뮤니티 |
| 구현 형태 | Next.js App Router 프론트엔드 + Node.js/PostgreSQL 백엔드 (저장소 분리) |

## Main Features

### 0. 인증과 계정

- Google, Naver, Kakao **OAuth 2.0 Authorization Code** 흐름을 라이브러리 없이 직접 구현했습니다.
- CSRF 방어를 위해 `state`를 httpOnly 쿠키에 저장하고 콜백에서 대조합니다.
- 세션은 `v1.<base64url payload>.<HMAC-SHA256>` 형식으로 서명하고 `timingSafeEqual`로 검증합니다.
- 프로필 닉네임, 소개, 관심 분야, 대표 이미지를 수정할 수 있습니다.

### 0-1. 커뮤니티

- 질문, 조언, 시황, 뉴스, 테마, 잡담 6개 분류와 제목 검색.
- **커서 기반 무한 스크롤** — `(created_at, id)` 튜플 비교로 offset 방식의 중복·누락을 없앴습니다.
- 댓글 작성/수정/삭제, 조회수 집계(작성자 본인 조회는 제외).
- 이미지 업로드가 가능한 리치 텍스트 에디터를 `contenteditable` 기반으로 직접 구현했습니다.

### 0-2. 매매 복기

- 매수한 점, 매도한 점, 잘한 점, 못한 점을 나눠 기록합니다.
- 공개/비공개 선택. 비공개 복기는 목록과 상세 모두에서 작성자에게만 보입니다.
- 매매 일자와 손익률을 함께 남겨 카드에서 바로 비교할 수 있습니다.

### 1. 시황 보드

- 미국 지수, 국내 지수, 반도체 ETF, 환율, 금리, 원자재 등 주요 시장 지표를 카드 UI로 표시합니다.
- 상승/하락 방향을 색상으로 구분합니다.
- `+` 등락률은 빨간색, `-` 등락률은 파란색으로 표시해 국내 투자자에게 익숙한 방향성을 따릅니다.
- 미국 시황, 국내 시황, 환율 시황, 강세 테마를 별도 브리프 카드로 요약합니다.

### 2. 뉴스 타임라인

- 국내 뉴스, 미국 뉴스, 테마 뉴스, 매크로 뉴스 필터를 제공합니다.
- 헤드라인 시간, 공급자, 분류, 원문 링크를 한 줄 타임라인 형태로 구성했습니다.
- 새로 들어온 헤드라인은 별도 상태 표시로 구분합니다.
- 뉴스 원문과 번역/정규화된 텍스트를 함께 관리할 수 있도록 DTO를 설계했습니다.

### 3. 일정 캘린더

- 실적, 공모주, 신규상장, 매크로, FOMC, 공시 일정을 월간 캘린더로 제공합니다.
- 날짜 선택 시 해당 날짜의 이벤트 상세 확인 항목을 보여줍니다.
- 다가오는 주요 일정을 별도 리스트로 분리해 사용자가 빠르게 스캔할 수 있게 구성했습니다.

### 4. 속보·공시

- SEC EDGAR, DART, KRX/KIND 기반 공시 이벤트를 탭과 필터로 분리했습니다.
- 새 공시, 소형주, 인수합병, 매각, 증자/지분 등 이벤트 유형 필터를 제공합니다.
- 각 공시는 원문 링크, 제출 시각, 확인 액션을 함께 노출합니다.

### 5. 수급·차트 보드

- 거래대금, 상승률, 거래량, ETF, 위험 필터 기반으로 주도주를 정리합니다.
- 선택한 종목에 대해 관련 뉴스, 관련 공시, 테마 뉴스, 랭킹 기준을 우측 상세 패널로 제공합니다.
- 현재가와 전일 대비를 별도 배지로 분리해 가독성을 높였습니다.
- 수급 테이블은 고밀도 정보 UI에 맞춰 컬럼 패딩과 정렬을 조정했습니다.

## APIs and Data Sources

이 프로젝트는 실제 시장 데이터 연동을 고려해 여러 외부 API 어댑터를 분리해 구성했습니다.

| Source | Usage | Environment |
| --- | --- | --- |
| 한국투자증권 Open API | 국내 지수, 거래대금/거래량 순위, 국내 종목 흐름, 분봉/차트 후보 데이터 | backend `KIS_APP_KEY`, `KIS_APP_SECRET`, `KIS_HTS_ID` |
| Yahoo Finance Screener | 미국 주도주 (거래대금, 등락률, 3개월 평균 거래량, 52주 신고가) | public, no key |
| Toss Invest API | 국내/미국 랭킹 (현재 계정 쿼터로 비활성) | backend `TOSS_INVEST_CLIENT_ID`, `TOSS_INVEST_CLIENT_SECRET` |
| KRX/KIND | 신규상장, 공모, 국내 시장 일정 | `KRX_CALENDAR_FEED_URL` |
| DART Open API | 국내 기업 공시 | `DART_API_KEY` |
| SEC EDGAR | 미국 기업 최신 공시, 8-K, 10-Q, 10-K 등 | public, optional `SEC_USER_AGENT` |
| NewsAPI | 글로벌 뉴스 헤드라인 | `NEWSAPI_KEY` |
| Finnhub | 미국 뉴스, 실적 일정, 시장 지표 | `FINNHUB_API_KEY` |
| Benzinga | 미국 주식 뉴스 후보 | `BENZINGA_API_KEY` |
| Naver Search API | 국내 뉴스 검색 | `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET` |
| Naver Papago API | 미국 뉴스 번역 보조 | `NAVER_PAPAGO_CLIENT_ID`, `NAVER_PAPAGO_CLIENT_SECRET` |
| Google News RSS | 키워드 기반 국내/미국 뉴스 fallback | public RSS |
| Frankfurter API | USD/KRW 환율 fallback | public |
| CoinGecko API | BTC 가격 fallback | public |
| U.S. Treasury XML | 미국 10년물 금리 fallback | public |

**모든 provider는 백엔드에서 실행됩니다.** 프론트엔드는 `DATE_BACKEND_URL`의 `/api/market-board`가 내려주는 정규화된 DTO를 읽어 표시만 하고, 자체 데이터 소스를 갖지 않습니다. 백엔드가 응답하지 않으면 탭·광고 슬롯 같은 고정 구조만 담긴 보드를 반환해 화면이 깨지지 않게 합니다.

`MARKET_DATA_MODE=demo`가 기본값이며, 시세 표시·재배포 권리가 확보된 환경에서만 `licensed-live`로 전환합니다.

### Provider 상태 표시

보드 상단 스트립이 provider별 `ready` / `mock` / `error` 상태와 사유를 그대로 보여줍니다.

- `ready` — live 데이터 수신 중
- `mock` — 키 미설정 또는 `MARKET_DATA_MODE=demo`로 차단
- `error` — timeout, 인증 실패, 레이트 리밋 등. 사유 문자열을 함께 표시

개별 provider가 실패해도 보드는 렌더링을 유지합니다. 실패한 provider의 데이터만 제외하고 나머지를 병합합니다.

### 데이터 정확성 검증

당일 누적 거래대금이 실제 시장값과 맞는지 외부 서비스와 대조했습니다.

| 종목 | DATE (KIS) | 대조군 |
| --- | --- | --- |
| 현대무벡스 | 2,557억 | 2,557억 |
| 현대차 | 3,922억 | 3,926억 |
| 한라캐스트 | 2,023억 | 2,024억 |
| SK텔레콤 | 2,017억 | 2,021억 |

`거래대금`은 서비스마다 정의가 달라 비교 시 주의가 필요합니다. 이 프로젝트는 **당일 누적 거래대금**(장 시작 이후 합계)을 사용하며, 일부 서비스가 표시하는 "실시간 거래대금"(최근 구간 합계)과는 자릿수가 다릅니다.

## Tech Stack

### Frontend — `date-platform`

| Area | Stack |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI Library | React 19 |
| Language | TypeScript 6 (strict) |
| Styling | SCSS Modules, CSS custom properties |
| Rendering | Server Component 컨테이너 + Client Component 인터랙션 |
| Routing | App Router, Route Handlers, `proxy.ts` 미들웨어 |
| Auth | OAuth 2.0 직접 구현, HMAC-SHA256 서명 세션 쿠키 |
| Editor | `contenteditable` 기반 리치 텍스트 + 이미지 업로드 |
| State | React `useState`, `useMemo`, `useCallback`, `IntersectionObserver` |
| Build | Next.js Turbopack |
| Tooling | ESLint (core-web-vitals + typescript), Playwright (캡처 스크립트) |

**의존성은 4개(`next`, `react`, `react-dom`, `sass`)입니다.** UI 프레임워크, 상태관리 라이브러리, 인증 라이브러리 없이 구현했습니다.

### Backend — `date-platform-backend`

| Area | Stack |
| --- | --- |
| Runtime | Node.js 20+ (ESM, `.mjs`) |
| HTTP | `node:http` — 프레임워크 없음 |
| Database | PostgreSQL 16 (Docker) |
| DB Driver | `pg` Pool |
| Auth | 프론트 발급 HS256 토큰 검증 (`node:crypto`) |
| Security | 허용목록 HTML sanitizer, 요청 검증, 매직바이트 업로드 판정 |
| Caching | 인메모리 TTL 캐시 + in-flight 중복 제거, 토큰 디스크 보존 |
| Migration | SQL 파일 기반 순차 마이그레이션 |
| Testing | sanitizer 테스트 스위트 (`npm test`) |

**의존성은 `pg` 하나입니다.** Express, ORM, JWT 라이브러리, sanitize 라이브러리를 쓰지 않고 표준 라이브러리로 구현했습니다.

### 직접 구현한 것들

포트폴리오 관점에서 라이브러리로 대체하지 않고 직접 만든 부분입니다.

| 구현 | 위치 | 왜 |
| --- | --- | --- |
| OAuth 2.0 클라이언트 | `app/auth/` | 3개 provider의 scope 구분자·응답 형태 차이를 직접 처리 |
| 세션 서명·검증 | `app/auth/session.ts` | HMAC + `timingSafeEqual` |
| 서비스 간 인증 토큰 | `_lib/backend.ts` ↔ `src/auth/` | HS256 서명·검증, `alg: none` 차단 |
| HTML sanitizer | `src/sanitize/html.mjs` | 파싱 후 허용목록으로 재직렬화 (45개 테스트) |
| multipart 파서 | `src/routes/media.mjs` | 업로드 처리, 경로 탈출 방어 |
| HTML 테이블 파서 | `src/providers/krx.mjs` | KIND에 JSON API가 없어 XHR 응답을 직접 파싱 |
| 뉴스 정규화·중복 제거 | `src/providers/news-normalizer.mjs` | 5개 공급자의 서로 다른 스키마를 하나로 |
| 테마 분류기 | `src/providers/themes.mjs` | 종목코드 맵 130여 개 + 종목명 규칙 30개 |
| 커서 페이지네이션 | `src/db/repositories.mjs` | 튜플 비교 기반 |

## Architecture

```text
app/
  page.tsx
    - 서버에서 MarketBoard 데이터를 로드하는 엔트리

  page.module.scss
    - 대시보드 전체 UI 시스템
    - 탭별 컬러 토큰, 카드, 테이블, 캘린더, 반응형 스타일 관리

  api/market-board/route.ts
    - 클라이언트 갱신용 시장 보드 API

  api/market-board/news-events/route.ts
    - 새 뉴스 이벤트 조회

  api/market-board/sec-events/route.ts
    - 새 SEC 공시 이벤트 조회

  kr/market-board/
    MarketBoard.tsx
      - 탭 UI, 필터, 캘린더 선택, 주도주 선택, 상세 패널 렌더링

    providers.ts
      - 백엔드 /api/market-board 조회
      - 백엔드 미응답 시 탭/광고 슬롯 등 고정 구조만 반환

    types.ts
      - 화면과 백엔드 provider가 공유하는 DTO 계약
```

시장 데이터 provider는 모두 `date-platform-backend/src/providers/`에 있습니다.

```text
date-platform-backend/src/providers/
  kis.mjs      toss.mjs     market.mjs
  sec.mjs      dart.mjs     krx.mjs      news.mjs
  themes.mjs   news-normalizer.mjs
  token-store.mjs  runtime-state.mjs
```

## Data Flow

```text
External APIs
  -> backend provider adapters
  -> provider orchestration (timeout, status, merge)
  -> normalized MarketBoardData DTO
  -> GET /api/market-board
  -> Next.js page / API route
  -> MarketBoard client component
  -> tabbed dashboard UI
```

### Adapter Pattern

각 데이터 공급자는 백엔드에서 독립적인 adapter로 분리되어 있습니다.

- API별 인증 방식과 응답 구조를 adapter 안에 격리
- adapter 실패 시 전체 화면이 깨지지 않도록 해당 provider 데이터만 제외
- provider 상태를 상단 상태 스트립에 표시
- 동일한 DTO로 정규화해 UI 컴포넌트가 공급자 차이를 몰라도 되게 설계
- provider 시크릿이 브라우저를 향한 프로세스에 존재하지 않음

### Timeout and Rate Limits

금융 데이터 API는 지연, 인증 실패, 레이트 리밋 가능성이 높기 때문에 백엔드
`market-board.mjs`에서 각 adapter를 timeout으로 감쌉니다.

- timeout 발생 시 해당 provider만 error 상태 처리
- 나머지 provider 데이터는 정상 반영
- 부족한 데이터는 빈 상태와 provider 상태로 명확히 표시
- 액세스 토큰은 디스크에 보존해 재시작마다 재발급하지 않음
- 동시 캐시 미스는 한 번의 호출로 합치고, 429 응답 후에는 일정 시간 호출을 멈춤
- UI는 항상 렌더링 가능한 상태 유지

## UI/UX Implementation

### 고밀도 금융 정보 UI

금융 대시보드는 일반 랜딩 페이지보다 정보 밀도가 높아야 합니다. 그래서 이 프로젝트는 큰 히어로나 장식적 그래픽보다, 실제 사용자가 장중에 빠르게 스캔할 수 있는 UI에 집중했습니다.

- 탭 기반 정보 분리
- 카드형 시황 요약
- 표 기반 수급 데이터
- 캘린더 기반 일정 확인
- 원문 링크 중심의 공시/뉴스 리스트
- 데이터 공급자 상태 표시

### Color System

색상은 많지 않게 유지하면서 탭별 성격을 구분했습니다.

| Tab | Tone |
| --- | --- |
| 시황 | Green |
| 뉴스 | Blue |
| 일정 | Yellow |
| 속보·공시 | Red |
| 수급·차트 | Cyan |

등락률 표기는 국내 시장 사용자 경험을 기준으로 적용했습니다.

- 상승: red
- 하락: blue
- 중립: gray

### Responsive Layout

- 데스크톱에서는 요약 카드, 표, 상세 패널을 동시에 노출합니다.
- 모바일에서는 카드와 테이블을 세로 흐름으로 재배치합니다.
- 긴 텍스트가 버튼, 카드, 배지 밖으로 넘치지 않도록 `overflow-wrap`, `minmax`, `grid` 제약을 적용했습니다.

## What I Focused On as a Frontend Developer

이 프로젝트에서 프론트엔드 개발자로서 특히 신경 쓴 부분입니다.

### 1. 데이터가 불안정해도 깨지지 않는 UI

외부 API 연동 프로젝트는 키 누락, 네트워크 지연, 응답 구조 변화가 자주 발생합니다. 그래서 UI가 특정 API 성공에 의존하지 않게 설계했습니다.

- provider status 표시
- adapter timeout
- provider fallback 상태
- DTO merge
- 원문 링크 대기 상태 처리

### 2. 정보 우선순위 설계

단순히 많은 정보를 보여주는 것이 아니라, 사용자의 확인 순서를 기준으로 화면을 나눴습니다.

1. 시장 기준점 확인
2. 뉴스 흐름 확인
3. 일정 이벤트 확인
4. 속보/공시 원문 확인
5. 수급과 주도주 확인

### 3. 재사용 가능한 데이터 계약

`types.ts`의 `MarketBoardData`를 중심으로 UI와 adapter가 같은 계약을 사용합니다. 덕분에 공급자가 늘어나도 UI 컴포넌트는 큰 변경 없이 확장할 수 있습니다.

### 4. 실제 서비스에 가까운 운영 상태 표현

상단 provider strip을 통해 어떤 데이터 공급자가 ready/mock/error 상태인지 보여줍니다. `mock` 상태는 콘텐츠 대체가 아니라 해당 provider 비활성 상태를 뜻하도록 정리했습니다.

## Running Locally

두 저장소를 형제 디렉터리로 두고 백엔드부터 실행합니다.

```bash
# 1) 백엔드 — date-platform-backend
cp .env.example .env
docker compose -f docker-compose.example.yml up -d postgres
npm install
npm run db:migrate
npm run dev            # http://localhost:4010

# 2) 프론트엔드 — date-platform
cp .env.example .env.local
npm install
npm run dev            # http://localhost:3000
```

`INTERNAL_JWT_SECRET`은 두 `.env`에 **같은 값**이어야 합니다. OAuth 앱 키가 없다면 `DATE_MOCK_AUTH=true`로 로그인 화면을 건너뛸 수 있습니다.

## Environment Variables

프론트에 남는 것은 백엔드 주소, 세션 시크릿, 서비스 간 토큰, OAuth 키뿐입니다.
**외부 데이터 provider 키는 전부 백엔드에 있습니다.**

```bash
# date-platform/.env.local
DATE_BACKEND_URL=http://localhost:4010
INTERNAL_JWT_SECRET=          # 백엔드와 동일한 값
AUTH_SESSION_SECRET=          # 프로덕션에서 없으면 기동 실패
DATE_MOCK_AUTH=false

GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
NAVER_OAUTH_CLIENT_ID=
NAVER_OAUTH_CLIENT_SECRET=
KAKAO_REST_API_KEY=
KAKAO_OAUTH_CLIENT_SECRET=
```

```bash
# date-platform-backend/.env
PORT=4010
FRONTEND_ORIGIN=http://localhost:3000
DATABASE_URL=postgres://date_user:date_password@localhost:5432/date_platform
INTERNAL_JWT_SECRET=          # 프론트와 동일한 값
MARKET_DATA_MODE=demo         # licensed-live는 시세 표시 권리 확보 후에만

TOSS_INVEST_CLIENT_ID=        KIS_APP_KEY=
TOSS_INVEST_CLIENT_SECRET=    KIS_APP_SECRET=
FINNHUB_API_KEY=              DART_API_KEY=
NEWSAPI_KEY=                  SEC_USER_AGENT=
NAVER_API_HUB_KEY_ID=         NAVER_API_HUB_KEY=
```

## Scripts

```bash
# date-platform
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run lint       # ESLint
node scripts/capture-portfolio.mjs   # README 캡처 갱신 (playwright 필요)

# date-platform-backend
npm run dev        # node --watch
npm run db:migrate # 마이그레이션 적용
npm run db:check   # DB 연결/테이블 확인
npm test           # HTML sanitizer 테스트
```

## Verification

작업 검증에 사용한 명령입니다.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Production deployment was verified with Vercel CLI:

```bash
vercel inspect https://date-platform.vercel.app
```

## Security

포트폴리오 프로젝트지만 실제 사용자 데이터를 다루는 만큼 다음을 구현했습니다.

| 항목 | 구현 |
| --- | --- |
| 세션 위조 | HMAC-SHA256 서명 + `timingSafeEqual` 검증. 서명 없는 쿠키는 거부 |
| CSRF (OAuth) | `state`를 httpOnly 쿠키에 저장하고 콜백에서 대조, 실패 시 쿠키 정리 |
| 서비스 간 신뢰 | 프론트가 서명한 2분 만료 HS256 토큰을 백엔드가 검증. `alg: none` 차단 |
| 저장형 XSS | 허용목록 sanitizer가 파싱 후 재직렬화. `script`/`iframe`/`svg`는 자식까지 제거, `href`/`src`는 허용 패턴 매칭 |
| 권한 | 소유권을 백엔드가 판정(`is_owner`). 타인 글 수정·삭제는 404 |
| 업로드 | 매직바이트로 타입 판정, 경로 탈출 방어, `nosniff` 응답 |
| SQL | 전 구간 파라미터 바인딩, 검색어의 `%`·`_` 이스케이프 |
| Open redirect | `next` 파라미터가 `//host` 형태면 거부 |

## Portfolio Review Points

면접관이나 리뷰어가 확인하면 좋은 포인트입니다.

- **프론트/백엔드 저장소 분리와 시크릿 경계** — 브라우저를 향한 프로세스에 provider 키가 없음
- **라이브러리 없이 구현한 OAuth 2.0과 세션 서명** (`app/auth/`)
- **파싱 후 재직렬화 방식의 HTML sanitizer**와 45개 테스트 (`src/sanitize/`)
- **커서 기반 페이지네이션** — 튜플 비교로 offset의 중복·누락 제거
- **외부 API 실패를 전제한 설계** — provider별 timeout, 토큰 디스크 보존, in-flight 중복 제거, 429 백오프
- **테마 분류와 강세 판정** — 거래대금 총액이 아닌 거래대금 가중 등락률로 순위를 매겨, 대형주가 항상 1위가 되는 문제를 해결
- 금융 정보 UI에 맞춘 고밀도 반응형 레이아웃

## Limitations and Next Steps

- 토스 랭킹 API가 계정 쿼터로 429를 반환합니다. 미국 주도주는 키가 필요 없는 Yahoo Finance 스크리너로 대체해 정상 동작하며, 토스 어댑터는 상태만 보고합니다.
- 커뮤니티 검색이 제목만 대상입니다.
- 조회수에 세션 단위 중복 방지가 없습니다.
- 실시간 WebSocket 기반 가격 업데이트, 관심 종목 저장, 대시보드 개인화가 남아 있습니다.
