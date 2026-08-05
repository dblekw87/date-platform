# DATE Market Board

실시간 시장 확인 루틴을 하나의 보드로 압축한 Next.js 기반 금융 정보 대시보드입니다. 미국 시황, 국내 시황, 환율, 뉴스, 일정, 속보 공시, 수급과 차트 체크포인트를 탭별로 분리해 장중 의사결정 전 필요한 근거를 빠르게 스캔할 수 있게 설계했습니다.

> 투자 판단을 자동화하거나 매수/매도 의견을 제시하는 앱이 아니라, 여러 공개/연동 데이터의 확인 순서와 원문 접근성을 정리하는 시장 모니터링 UI입니다.

## Highlights

- **시황 보드**: 미국 지수, 국내 지수, 환율, 금리, 원자재, 강세 테마를 카드형 데이터 패널로 정리
- **뉴스 타임라인**: 국내/미국/테마/매크로 필터와 새 헤드라인 표시, 원문 링크 연결
- **일정 캘린더**: 실적, 공모주, 신규상장, 매크로, FOMC, 공시 일정을 월간 캘린더와 상세 패널로 분리
- **속보·공시**: SEC/DART/KRX 이벤트를 지역·이벤트 유형별로 필터링하고 원문 확인 액션을 노출
- **수급·차트**: 거래대금, 상승률, 거래량, ETF, 위험 필터 기반 주도주 테이블과 관련 뉴스/공시 패널 제공
- **데이터 연결 상태**: KIS, Toss, KRX/KIND, DART, SEC, 뉴스 공급자 상태를 보드 상단에서 즉시 확인
- **Graceful Fallback**: 외부 API 키가 없거나 어댑터가 실패해도 mock fallback으로 UI와 데이터 계약을 유지

## Tech Stack

| Area | Stack |
| --- | --- |
| Framework | Next.js App Router, React 19 |
| Language | TypeScript |
| Styling | SCSS Modules, CSS custom properties |
| Data Layer | Server route handlers, provider adapter pattern, cache layer |
| APIs | Korea Investment Open API, Toss Invest API, KRX/KIND, DART, SEC EDGAR, News providers |
| Quality | ESLint, TypeScript `--noEmit`, focused normalization tests |

## Architecture

```text
app/
  page.tsx                         # MarketBoard server container
  page.module.scss                 # Primary dashboard visual system
  api/market-board/route.ts        # Board data endpoint
  kr/market-board/
    MarketBoard.tsx                # Client-side tab UI and interactions
    providers.ts                   # Adapter orchestration, timeout, merge, fallback
    types.ts                       # DTO contract shared by UI and adapters
    adapters/                      # KIS, Toss, KRX, DART, SEC, News, Market adapters
```

The data layer is intentionally adapter-based. Each provider can fail independently, while `providers.ts` merges successful payloads over a stable mock baseline. This keeps the product demoable without credentials and lets individual integrations evolve without breaking the dashboard contract.

## UI Decisions

- 탭마다 과도하지 않은 색상 토큰을 부여해 시황, 뉴스, 일정, 공시, 수급의 성격을 구분했습니다.
- `+` 등락률은 빨간색, `-` 등락률은 파란색으로 표시해 국내 투자자에게 익숙한 방향성을 따릅니다.
- 미국 시황, 국내 시황, 환율 시황 같은 상단 데이터 카드는 상태 점, 하단 신호선, 숫자 배지를 사용해 지표 스캔 속도를 높였습니다.
- 뉴스/공시/수급 영역은 표와 카드의 중간 형태로 구성해 긴 텍스트와 원문 링크가 동시에 읽히도록 했습니다.
- 광고 영역은 실제 수익화 배치를 가정해 레이아웃 안에 예약하되, 핵심 정보 흐름을 방해하지 않게 낮은 대비로 처리했습니다.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Optional environment variables:

```bash
KIS_APP_KEY=
KIS_APP_SECRET=
KIS_HTS_ID=
TOSS_INVEST_CLIENT_ID=
TOSS_INVEST_CLIENT_SECRET=
DART_API_KEY=
SEC_USER_AGENT=
NEWSAPI_KEY=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NAVER_PAPAGO_CLIENT_ID=
NAVER_PAPAGO_CLIENT_SECRET=
KRX_CALENDAR_FEED_URL=
```

외부 키가 없으면 보드는 mock fallback을 사용합니다.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Interview Notes

이 프로젝트에서 중점적으로 보여줄 수 있는 역량은 다음과 같습니다.

- 외부 금융 API가 불안정하거나 지연될 수 있다는 전제를 둔 timeout/fallback 설계
- 여러 데이터 소스를 하나의 DTO 계약으로 정규화하는 어댑터 패턴
- 장중 사용자를 위한 고밀도 정보 UI 구성과 반응형 CSS 설계
- 투자 조언과 정보 확인 도구의 경계를 UI 문구와 데이터 구조에서 분리한 제품 판단
- API 키가 없어도 검토자가 실행 가능한 데모 상태 유지
