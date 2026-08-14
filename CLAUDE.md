# DATE Platform

투자 판단 전 확인 흐름을 돕는 시장 정보 보드 + 커뮤니티 + 매매 복기 서비스.

## 저장소 구조

이 프로젝트는 **두 개의 독립 저장소**로 나뉩니다. 형제 디렉터리에 나란히 있습니다.

```
C:\Users\Pangwoo\
├── date-platform\           ← 프론트엔드 (이 저장소, Next.js, Vercel 배포)
└── date-platform-backend\   ← 백엔드 (Node http 서버 + PostgreSQL)
```

**백엔드 코드를 이 저장소 안에 만들지 마세요.** 서버/DB/provider 연동은 전부
`../date-platform-backend`에 있습니다. 과거에 `date-platform/apps/backend/`가
실수로 생성된 적이 있으니 비슷한 경로가 다시 생기면 잘못된 것입니다.

`app/_lib/backend.ts`는 백엔드가 아니라 **프론트가 백엔드를 호출하는 HTTP 클라이언트**입니다.
이름이 비슷하지만 정상 파일이고 7곳에서 import합니다.

## 명령어

### 프론트엔드 (`date-platform`)

```powershell
npm run dev        # 개발 서버 http://localhost:3000
npm run build      # 프로덕션 빌드 (Turbopack)
npm run lint       # ESLint
npx tsc --noEmit   # 타입 검사
```

프론트에는 테스트가 없습니다. 시장 데이터 로직은 전부 백엔드에 있으므로
관련 테스트도 그쪽에 둡니다.

검증할 때는 `npm run lint` → `npx tsc --noEmit` → `npm run build` 순서로 돌립니다.

### 백엔드 (`date-platform-backend`)

```powershell
docker compose -f docker-compose.example.yml up -d postgres   # DB 먼저
npm run db:migrate # db/migrations/*.sql 적용
npm run db:check   # DB 연결과 테이블 확인
npm run dev        # node --watch, http://localhost:4010
npm test           # HTML sanitizer 테스트
npm run check      # node --check 문법 검사
```

PostgreSQL은 로컬에 설치하지 않고 **도커 컨테이너로만** 띄웁니다
(`date-platform-postgres`, 포트 5432).

## 아키텍처

```
브라우저
  │
  ├─ 서버 컴포넌트 ─→ app/_lib/backend.ts ────────┐
  │                    (세션 → Bearer 토큰)        │
  └─ 클라이언트 ───→ /api/backend/[...path] ──────┤
                       (프록시, 토큰 주입)          │
                                                    ▼
                                       date-platform-backend :4010
                                         ├─ PostgreSQL
                                         └─ provider 7종 (아래 참고)
```

**핵심 원칙: 프론트는 데이터를 만들지 않습니다.** 외부 API 호출과 시크릿은 전부
백엔드에 있고, 프론트는 정규화된 DTO를 받아 표시만 합니다. 프론트에 provider
어댑터나 목업 데이터를 다시 만들지 마세요 — 한 번 걷어낸 구조입니다.

### 시장 보드 데이터 흐름

**시장 데이터 provider는 전부 백엔드에 있습니다.** 프론트는 표시만 합니다.

`app/kr/market-board/providers.ts`의 `getMarketBoardData()`는 백엔드
`/api/market-board`를 읽어 그대로 반환합니다. 백엔드가 응답하지 않으면 탭·광고
슬롯 같은 고정 구조만 담은 보드를 돌려줘 화면이 깨지지 않게 합니다.
**여기에 자체 데이터 소스를 다시 만들지 마세요.**

백엔드 provider는 `date-platform-backend/src/providers/`에 있습니다
(kis, toss, market, sec, dart, krx, news). 추가하려면 모듈을 만들고
`src/routes/market-board.mjs`의 `providerAdapters` 배열에 등록합니다:

```js
{ id, label, hasCredentials, load, timeoutMs, licensed?, missingMessage? }
```

`licensed: true`는 시세 표시 권리가 필요한 provider(toss, kis)를 뜻하며
`MARKET_DATA_MODE`로 차단됩니다. 화면과 provider는 프론트 `types.ts`의
`MarketBoardData` DTO를 계약으로 공유하므로, 백엔드 응답 모양을 바꾸면
이 타입도 함께 고쳐야 합니다.

provider별 API 키는 전부 백엔드 `.env`에 둡니다.

### 인증

```
/auth/login → /auth/[provider] → provider 동의 → /auth/[provider]/callback
```

- state는 `date_oauth_state_<provider>` 쿠키(10분)로 검증
- 세션 쿠키 `date_session` = `v1.<base64url(JSON)>.<HMAC-SHA256>`, httpOnly, 30일
- `app/auth/session.ts`가 세션 발급/검증의 단일 소스
- 백엔드 호출은 `app/_lib/backend.ts`가 `INTERNAL_JWT_SECRET`으로 서명한 2분짜리
  HS256 토큰을 `Authorization: Bearer`로 보냅니다. 백엔드는 `src/auth/`에서 검증합니다.
  두 저장소의 `INTERNAL_JWT_SECRET` 값이 같아야 합니다
- `proxy.ts`(Next.js 16 미들웨어)가 `/community`, `/journal/trades/new`를 보호
- `DATE_MOCK_AUTH=true`일 때만 `/auth/mock` 지름길과 Mock Trader가 열립니다.
  개발 모드라는 이유만으로는 열리지 않습니다

### 라우트

`app/` 아래 라우트는 전부 내비게이션에서 도달 가능합니다.

| 경로 | 화면 |
|---|---|
| `/` | 시장 보드. 구현은 `app/kr/market-board/`에 있습니다 |
| `/community`, `/community/new`, `/community/posts/[id]`, `.../edit` | 커뮤니티 |
| `/journal/trades`, `/new`, `/[id]`, `/[id]/edit` | 매매 복기 |
| `/profile`, `/profile/posts` | 프로필 |
| `/auth/login`, `/auth/[provider]`, `/callback`, `/logout`, `/mock` | 인증 |
| `/terms`, `/privacy` | 약관 |
| `/api/market-board`, `/news-events`, `/sec-events`, `/api/backend/[...path]` | 라우트 핸들러 |

`app/kr/page.tsx`와 `app/community/review/new/page.tsx`는 각각 `/`와
`/journal/trades/new`로 보내는 리다이렉트 스텁입니다. 옛 링크를 살려두려고
남겨둔 것이니 화면이 없다고 지우지 마세요.

`app/kr/` 아래에는 `market-board/`와 이 리다이렉트만 남아 있습니다. 프로토타입
잔재(`kr/market`, `kr/theme` 등)와 리서치 실험 화면(`/discover`, `/entity`,
`/evidence`, `/research`, `/monitoring`)은 제거했습니다. 관련 설계 문서는
`docs/date/research/`에 그대로 있습니다.

## 코드 컨벤션

두 저장소가 같은 스타일을 씁니다.

- 세미콜론 사용, 큰따옴표, 2칸 들여쓰기
- **객체 키·타입 멤버·JSX props를 알파벳순으로 정렬합니다.** 기존 코드 전반에
  일관되게 지켜지고 있으니 새 코드도 맞춥니다.
- 변수 선언 블록과 `return` 사이에 빈 줄을 둡니다
- named export 사용. default export는 Next.js 페이지/라우트 핸들러만
- **경로 alias 없음** — tsconfig에 `paths`가 없으므로 상대경로로 import합니다
- 스타일은 SCSS Modules를 화면 옆에 `page.module.scss`로 나란히 둡니다
- UI 문구는 한국어, 코드 식별자·주석은 영어
- 백엔드는 `.mjs` ESM. 의존성은 `pg` 하나뿐이니 새 패키지 추가 전에 상의합니다
- 등락 색상은 국내 관행을 따릅니다: 상승 red, 하락 blue, 보합 gray

## 환경변수

`.env.example`을 항상 최신으로 유지합니다. 새 변수를 코드에서 읽으면 예제에도 추가합니다.

프론트(`date-platform/.env.local`)에 남는 것은 **백엔드 주소, 세션 시크릿,
`INTERNAL_JWT_SECRET`, OAuth 키뿐**입니다.

**외부 데이터 provider 키는 전부 백엔드(`date-platform-backend/.env`)에 둡니다** —
Toss, KIS, Finnhub, DART, KRX, NewsAPI, Naver, SEC User-Agent. 프론트에서
provider를 호출하지 않으므로 프론트에 그 키가 있으면 잘못된 것입니다.

`INTERNAL_JWT_SECRET`은 양쪽 `.env`에 **같은 값**이어야 합니다. 값이 다르면 모든
백엔드 호출이 401이 되고, 백엔드에 없으면 위조 가능한 헤더 모드로 떨어집니다.

OAuth 앱 설정과 Redirect URI 등록 절차는 `docs/oauth-login-setup.md`를 참고합니다.

## 알려진 이슈

작업 중 마주치면 참고할 미해결 항목입니다.

1. **백엔드 입력 검증 부재** — `title`/`category`/`tradeDate`/`visibility`를 검증하지 않아
   잘못된 입력이 400 대신 NOT NULL 위반 500으로 나갑니다.
2. **`authorId` 생성 로직 중복** — 프론트 `currentUserAuthorId`와 백엔드 `authorIdFrom`이
   별개 구현입니다. 수정 버튼 노출 판정이 두 값의 일치에 의존합니다.
3. **`market_board_snapshots` 무한 증가** — licensed-live 모드에서 TTL 60초 행을 계속
   INSERT하는데 만료 행을 지우는 코드가 없습니다.
4. **업로드 MIME이 헤더 기반** — 매직바이트 검증이 없고 `/uploads/` 응답에
   `X-Content-Type-Options: nosniff`가 없습니다.
5. **커뮤니티·매매복기 목업 혼재** — 두 화면의 목록·상세가 하드코딩 배열을 먼저
   렌더하고 클라이언트에서 백엔드 데이터로 교체합니다. 시장 보드는 정리했지만
   이 둘은 남아 있습니다.
6. **댓글 API 부재** — `community_comments` 테이블은 있지만 엔드포인트가 없어 화면은 목업입니다.
7. **토스 랭킹 API 429** — 토큰 발급은 성공하는데 `/api/v1/rankings`가 쿼터를
   반환합니다. 코드 완화책(토큰 디스크 보존, in-flight 중복 제거, 90초 쿨다운)은
   적용했으니 남은 건 계정 한도 문제입니다. 미국 주도주가 비어 있는 원인입니다.
