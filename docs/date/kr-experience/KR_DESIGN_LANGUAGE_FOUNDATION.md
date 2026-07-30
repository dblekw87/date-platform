# KR Design Language Foundation

## 문서 목적

이 문서는 KR Prototype B에서 반복적으로 사용할 UI Pattern의 역할과 사용 기준을 정의한다.

이 문서는 시각 디자인 시스템이 아니다. 색상, 브랜드 톤, 고정 Typography Scale, Icon Set, Motion은 확정하지 않는다. 목적은 Stock Detail 구현 전에 Home과 Market에서 이미 검증된 한국형 UX Pattern을 정리하고, 이후 화면에서 같은 정보 문법을 반복할 수 있게 만드는 것이다.

## 기본 원칙

1. 화면은 한국어로 읽혀야 한다.
2. 시장 정보보다 “오늘 무엇을 먼저 확인해야 하는가”가 먼저 보여야 한다.
3. 등락, 인기, 거래대금은 진입점일 뿐 판단 근거가 아니다.
4. 공식 정보, 확인 상태, 아직 단정할 수 없는 내용은 항상 분리한다.
5. 카드 반복보다 목록, 행, 흐름, 탭, 접기·펼치기를 우선 검토한다.
6. 모바일에서 한 손으로 주요 흐름을 따라갈 수 있어야 한다.
7. Placeholder는 기술 오류처럼 보이면 안 된다.
8. 실제 투자 추천, 매수·매도 유도, 수익 보장처럼 읽히는 표현은 금지한다.

## Pattern 1. Hero

### 목적

사용자가 화면에 들어왔을 때 5초 안에 현재 화면에서 가장 먼저 볼 정보를 이해하게 한다.

### 사용 위치

- Home
- Market
- Stock Detail
- Evidence Detail
- Analysis
- Changes
- Journal

### Desktop

- 전체 폭 또는 넓은 상단 영역을 사용한다.
- 핵심 문장, 설명, 신뢰 단서, Primary CTA를 포함한다.
- 보조 정보가 필요하면 우측 또는 하단에 상태 패널을 둔다.
- 대형 차트나 표가 Hero를 대체하면 안 된다.

### Mobile

- 첫 화면 안에 핵심 문장과 Primary CTA가 보여야 한다.
- 설명은 1~2문장으로 제한한다.
- 보조 CTA는 Primary CTA보다 약하게 둔다.

### Auto Layout 기준

- Vertical stack을 기본으로 한다.
- Desktop에서 보조 패널이 있을 때만 2-column grid를 사용한다.
- Hero 내부 항목은 `Eyebrow → Headline → Explanation → Trust Cue → CTA` 순서를 따른다.

### 상태

- 장 시작 전
- 장 중
- 장 마감 후
- 새 공식 정보 있음
- 공식 정보 없음
- 미확인 내용 있음

### 접근성 고려

- 화면의 `h1`은 Hero에 둔다.
- Primary CTA는 링크 목적이 명확해야 한다.
- 시장 상태가 선택형이면 현재 상태를 텍스트와 시각 상태 모두로 표현한다.

### 재사용 범위

모든 주요 화면에서 재사용한다. 단, 문구와 보조 패널의 책임은 화면별로 달라야 한다.

## Pattern 2. Section Header

### 목적

섹션의 존재 이유를 짧게 설명하고, 사용자가 다음 정보의 성격을 이해하게 한다.

### 사용 위치

모든 Section.

### Desktop

- `Eyebrow → Section Title → Description` 구조를 기본으로 한다.
- Description은 반드시 필요한 경우에만 둔다.

### Mobile

- 제목은 짧게 유지한다.
- Description은 한 문장으로 제한한다.

### Auto Layout 기준

- Vertical stack.
- 하단 content와 12~20px 수준의 간격을 둔다.

### 상태

- 기본
- 주의 필요
- 미확인 포함
- Placeholder

### 접근성 고려

- Section Title은 화면 위계에 맞는 heading level을 사용한다.
- Eyebrow만으로 의미가 전달되면 안 된다.

### 재사용 범위

Home, Market, Stock, Evidence, Analysis, Changes, Journal 전체.

## Pattern 3. Priority Engine

### 목적

여러 정보 중 오늘 가장 먼저 확인해야 하는 변화의 우선순위를 한눈에 보여준다.

### 사용 위치

- Market
- Home의 Today Focus
- Stock Detail의 오늘 움직인 이유
- Changes의 먼저 확인할 변화

### Desktop

- 순위, 우선도, 판단 요인, 확인 상태를 한 묶음으로 보여준다.
- 단순 리스트가 아니라 점수 또는 강도 bar를 통해 중요도를 시각화한다.
- 판단 기준은 숨기지 않는다.

### Mobile

- Stack 형태로 전환한다.
- 우선도와 제목을 먼저 보여주고, 판단 요인은 아래로 접거나 줄바꿈한다.

### Auto Layout 기준

- Desktop: `Score Block + Detail Block`.
- Mobile: `Score Block → Title → Factors`.
- Factor는 작은 grid 또는 definition list로 유지한다.

### 상태

- 가장 먼저 확인
- 장 중 재확인
- 추가 근거 대기
- 미확인 포함
- 재검토 필요

### 접근성 고려

- 숫자만으로 우선순위를 설명하지 않는다.
- `우선도 92`처럼 텍스트 라벨을 함께 제공한다.
- bar는 시각 보조이며 의미 텍스트를 반드시 둔다.

### 재사용 범위

Market에서 우선 정의하고, Home과 Stock Detail에 축소형으로 재사용한다.

## Pattern 4. Confidence Badge

### 목적

정보를 신뢰할 수 있는 이유와 한계를 빠르게 구분한다.

### 사용 위치

- Market Priority
- Evidence Card
- Timeline Item
- Stock Detail의 움직인 이유
- Changes
- Journal Snapshot

### Desktop

- Badge는 정보 옆에 inline으로 배치한다.
- Badge가 제목보다 강하면 안 된다.

### Mobile

- 제목 아래 또는 메타 정보 첫 줄에 둔다.
- 긴 Badge는 줄바꿈을 허용한다.

### Auto Layout 기준

- Inline pill 또는 compact row.
- Badge 내부 문구는 1줄을 우선하되 줄바꿈 가능해야 한다.

### 상태

- 공식 확인
- 공식 발표
- 복수 출처 확인
- 단일 출처
- 미확인

### 접근성 고려

- 색만으로 상태를 구분하지 않는다.
- `미확인`은 dashed border 또는 별도 텍스트로 구분한다.

### 재사용 범위

시스템 전체에서 통일한다. 이름과 의미를 화면마다 바꾸지 않는다.

## Pattern 5. Evidence Card

### 목적

투자 근거를 뉴스 카드처럼 소비하지 않고, 출처와 확인 범위를 함께 검토하게 한다.

### 사용 위치

- Home의 공식 근거
- Market의 공식 근거 진입
- Stock Detail
- Evidence Detail
- Analysis 비교 영역

### Desktop

- 대표 근거 1개는 강조할 수 있다.
- 보조 근거는 목록 또는 row로 둔다.
- 출처, 공개 시각, 확인 상태를 제목 가까이에 둔다.

### Mobile

- 제목, 출처, 공개 시각, 확인 상태를 먼저 보여준다.
- 본문 요약은 짧게 유지한다.

### Auto Layout 기준

- `ID/Label → Title → Source/Time/Badge → Summary → CTA`.
- Card 안에 다시 Card를 중첩하지 않는다.

### 상태

- 확인됨
- 확인 중
- 추가 확인
- 다른 해석 필요
- 미확인 포함

### 접근성 고려

- 카드 전체가 링크일 경우 링크 목적이 명확해야 한다.
- 출처 링크와 상세 링크가 다르면 목적을 분리한다.

### 재사용 범위

Evidence 중심 화면 전체. 단, Analysis에서는 비교를 위해 row/matrix 형태로 변환할 수 있다.

## Pattern 6. Timeline Item

### 목적

시간 순서로 시장 변화, 공식 정보, 종목 반응, 분석 업데이트가 어떻게 이어졌는지 보여준다.

### 사용 위치

- Market Timeline
- Stock Detail Timeline
- Evidence Detail
- Analysis
- Journal

### Desktop

- 시간, 사건, 연결 근거, 확인 상태를 한 행으로 보여준다.
- 단순 뉴스 시간표가 아니라 “무엇과 연결되는가”를 포함한다.

### Mobile

- 세로 Feed로 표현한다.
- 시간과 사건 제목을 먼저 보이게 한다.

### Auto Layout 기준

- Desktop: `Time / Event / Confidence`.
- Mobile: `Time → Event → Linked Context`.

### 상태

- 공식 정보 공개
- 시장 반응
- 추가 근거 확인
- 미확인 해소
- 분석 업데이트

### 접근성 고려

- Timeline은 의미 있는 `ol` 또는 list 구조를 우선한다.
- 시간 텍스트는 시각 장식이 아니라 읽히는 텍스트여야 한다.

### 재사용 범위

시간 흐름이 필요한 모든 화면.

## Pattern 7. Market Board

### 목적

한국 투자자가 매일 확인하는 시장 기준점을 빠르게 훑게 한다.

### 사용 위치

- Home
- Market
- Stock Detail의 시장 반응 요약

### Desktop

- 현물과 선물이 존재하는 시장은 같은 박스에 묶는다.
- 환율과 유가는 별도 축으로 보여준다.
- 지수가 화면을 지배하지 않게 compact하게 둔다.

### Mobile

- 가로 strip 또는 2열 grid.
- 화면 전체 horizontal overflow는 금지한다.

### Auto Layout 기준

- `Group → Name → Primary Value → Secondary Values → Status`.
- Secondary Values는 선물 주간, 선물 야간, 야간 환율 같은 보조 기준점이다.

### 상태

- 장 시작 전 참고
- 장중 확인
- 마감 후 참고
- 예시 값
- 확인 중

### 접근성 고려

- 현물/선물/환율/유가의 구분을 텍스트로 표시한다.
- 숫자만 나열하지 않는다.

### 재사용 범위

Home과 Market에서 공통 사용. Stock Detail에서는 축소형으로 사용한다.

## Pattern 8. Empty State

### 목적

정보가 없는 날에도 사용자가 다음에 무엇을 해야 하는지 이해하게 한다.

### 사용 위치

- Market
- Watchlist
- Changes
- Analysis
- Journal
- Search

### Desktop

- 빈 상태 설명과 다음 행동 목록을 함께 둔다.
- 빈 상태가 오류처럼 보이면 안 된다.

### Mobile

- 짧은 제목, 한 문장 설명, 1개 Primary Action을 우선한다.

### Auto Layout 기준

- `Title → Explanation → Next Actions`.
- 긴 설명보다 행동 안내를 우선한다.

### 상태

- 새 공식 정보 없음
- 관심 종목 없음
- 분석 중인 내용 없음
- 검색 결과 없음
- 기록 없음

### 접근성 고려

- disabled button처럼 보이는 요소를 사용하지 않는다.
- 가능한 행동은 실제 링크 또는 명확한 Placeholder로 표시한다.

### 재사용 범위

모든 Placeholder와 빈 상태.

## Pattern 9. CTA

### 목적

사용자가 다음 행동을 고민하지 않게 한다.

### 사용 위치

모든 주요 화면.

### Desktop

- Primary CTA는 화면 또는 섹션당 하나만 강조한다.
- Secondary CTA는 텍스트 링크 또는 얇은 버튼으로 둔다.

### Mobile

- Primary CTA는 한 손으로 누르기 쉬운 위치에 둔다.
- 하단 고정 CTA는 꼭 필요한 경우에만 사용한다.

### Auto Layout 기준

- CTA Group은 horizontal을 기본으로 하되 mobile에서는 vertical stack.

### 상태

- 기본
- 보조
- Placeholder
- 비활성

### 접근성 고려

- 링크와 버튼의 역할을 섞지 않는다.
- 실제 이동은 Link, 화면 내 조작은 button을 사용한다.

### 재사용 범위

전체 화면.

## Pattern 10. Information Badge

### 목적

정보의 유형을 빠르게 구분한다.

### 사용 위치

- 시장 정보
- 종목 정보
- 투자 근거
- 테마
- 분석

### Desktop

- 제목 위 또는 메타 정보 줄에 둔다.

### Mobile

- 짧은 단어만 사용한다.

### Auto Layout 기준

- Inline pill.

### 상태

- 예시 값
- 공식 정보
- 시장 데이터
- 관심 종목
- 관련 테마
- 분석 중

### 접근성 고려

- Badge가 유일한 정보 전달 수단이면 안 된다.

### 재사용 범위

전체 화면.

## Pattern 11. Status Badge

### 목적

진행 상태나 검토 상태를 보여준다.

### 사용 위치

- Analysis
- Changes
- Journal
- Stock Detail
- Evidence Detail

### Desktop

- 테이블 또는 row의 마지막 열에 둔다.

### Mobile

- 제목 아래 첫 메타 줄에 둔다.

### Auto Layout 기준

- Compact inline badge.

### 상태

- 확인 중
- 확인됨
- 추가 확인
- 다시 확인 필요
- 기록됨
- 준비 중

### 접근성 고려

- 상태 문구는 한국어 설명형이어야 한다.

### 재사용 범위

Confidence Badge와 혼동하지 않는다. Confidence는 정보 신뢰도, Status는 화면/작업 진행 상태다.

## Pattern 12. Entity Chip

### 목적

관련 종목 또는 기업을 짧게 표시하고 상세 진입을 제공한다.

### 사용 위치

- Home
- Market
- Stock Detail
- Evidence Detail
- Analysis

### Desktop

- 종목명, 코드, 관계 이유를 함께 둘 수 있다.

### Mobile

- 종목명과 코드만 먼저 보여주고, 관계 이유는 row에서 보완한다.

### Auto Layout 기준

- `Name / Code / Relation`.

### 상태

- 관련 종목
- 관심 종목
- 비교 대상
- 미국 관련 기업
- ETF

### 접근성 고려

- 단순 chip이 링크라면 `삼성전자 종목 정보 보기`처럼 목적이 명확해야 한다.

### 재사용 범위

종목과 기업을 표시하는 모든 곳.

## Pattern 13. Theme Chip

### 목적

시장 변화에서 파생된 테마를 빠르게 탐색하게 한다.

### 사용 위치

- Home
- Market
- Stock Detail
- Search

### Desktop

- 선택형 chip 또는 tab 형태.
- 연결된 근거 수나 관련 종목 수를 함께 표시할 수 있다.

### Mobile

- 가로 스크롤 strip을 허용하되 화면 전체 overflow는 금지한다.

### Auto Layout 기준

- Horizontal wrap 또는 scroll strip.

### 상태

- 선택됨
- 관련 근거 있음
- 미확인 포함
- 새 변화 있음

### 접근성 고려

- 선택형이면 `aria-pressed` 또는 `aria-current`를 사용한다.

### 재사용 범위

테마 탐색이 필요한 화면.

## Pattern 14. Related Entity Row

### 목적

관련 기업, ETF, 산업 연결 이유를 설명한다.

### 사용 위치

- Stock Detail
- Evidence Detail
- Market
- Analysis

### Desktop

- row 구조를 우선한다.
- 종목명, 유형, 연결 이유, 관련 근거 수, 상세 진입을 표시한다.

### Mobile

- compact row 또는 2줄 list.

### Auto Layout 기준

- `Entity → Type → Relation Reason → Evidence Count → Entry`.

### 상태

- 같은 산업
- 같은 테마
- 공급망 연결
- 경쟁 기업
- 관련 ETF
- 미국 관련 기업

### 접근성 고려

- 추천 종목처럼 보이지 않게 “왜 연결되는가”를 반드시 표시한다.

### 재사용 범위

Stock Detail에서 우선 구현하고 Evidence와 Analysis로 확장한다.

## Pattern 15. Loading Skeleton

### 목적

시장 데이터, 공식 정보, 검색 결과를 불러오는 동안 레이아웃 흔들림을 줄인다.

### 사용 위치

- Market Board
- Evidence Card
- Search
- Watchlist
- Changes

### Desktop

- 실제 content 영역과 같은 크기를 유지한다.

### Mobile

- 높이가 급격히 변하지 않게 한다.

### Auto Layout 기준

- Skeleton은 실제 content block과 같은 container 안에 둔다.

### 상태

- 시장 정보 확인 중
- 공식 정보 확인 중
- 관련 종목 확인 중
- 검색 결과 확인 중

### 접근성 고려

- 장식 skeleton에는 불필요한 스크린리더 노출을 피한다.
- 별도 상태 문구가 필요하면 “공식 정보를 확인하는 중입니다.”처럼 설명형 문장을 사용한다.

### 재사용 범위

데이터 연결 전 모든 Prototype 화면.

## Home / Market 적용 가능성

### 즉시 공통화 후보

1. `KRHero`
   - Home과 Market 모두 Hero 구조가 유사하다.
   - 다만 Market은 Market State Panel을 포함한다.

2. `KRSectionHeader`
   - 모든 화면에서 반복된다.
   - 가장 먼저 추출할 가치가 높다.

3. `KRConfidenceBadge`
   - Market에서 이미 상태가 정리됐다.
   - Evidence와 Stock Detail에서 반드시 재사용해야 한다.

4. `KRMarketBoard`
   - Home과 Market에서 공통으로 사용 가능하다.
   - Home은 축소형, Market은 확장형으로 variant가 필요하다.

5. `KREmptyState`
   - Placeholder Route와 실제 Empty State를 통합할 수 있다.

### 아직 공통화 보류

1. `PriorityEngine`
   - Market에서는 확장형, Home에서는 Today Focus와 가까운 축소형이다.
   - Stock Detail에서 한 번 더 검증 후 추출한다.

2. `EvidenceCard`
   - Stock Detail과 Evidence Detail에서 실제 정보 밀도를 확인한 뒤 추출한다.

3. `TimelineItem`
   - Market Timeline과 Stock Timeline의 책임 차이를 먼저 검증한다.

4. `RelatedEntityRow`
   - Stock Detail에서 관련 기업 네트워크를 구현한 뒤 추출한다.

## 리팩터링 계획

### Phase 1

- `KRSectionHeader`
- `KRConfidenceBadge`
- `KREmptyState`

이 세 가지는 정보 책임이 명확하고 재사용 범위가 넓다.

### Phase 2

- `KRHero`
- `KRMarketBoard`
- `KRCTAGroup`

Home과 Market의 구조 차이를 유지하면서 variant 기반으로 추출한다.

### Phase 3

- `KRPriorityEngine`
- `KREvidenceCard`
- `KRTimelineItem`
- `KRRelatedEntityRow`

Stock Detail과 Evidence Detail 구현 이후 공통화한다.

## Open Questions

1. Confidence Badge와 Status Badge를 시각적으로 얼마나 다르게 표현할 것인가?
2. Market State Panel은 Market 전용인가, Home에도 축소형으로 필요한가?
3. Priority Engine의 우선도 점수는 실제 제품에서 숫자로 노출할 것인가, 단계형 표현으로 바꿀 것인가?
4. Evidence Card는 카드 형태를 유지할 것인가, 한국형 목록 row로 전환할 것인가?
5. Timeline은 모든 화면에서 같은 시각 문법을 써도 되는가, Journal에서는 다른 문법이 필요한가?
6. Loading Skeleton은 Low-Fi 단계에서 실제 구현할 것인가, 문서 기준으로만 둘 것인가?
7. Mobile에서 하단 고정 CTA와 Bottom Navigation이 충돌하는 상황을 어떻게 처리할 것인가?
