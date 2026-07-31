# KR Prototype B UX Audit

## 1. Audit Scope

대상은 `/kr` 하위 Prototype B 전체 흐름이다.

검토 흐름:

Home
→ Market
→ Stock Detail
→ Evidence
→ Analysis
→ Changes
→ Watchlist
→ Search

이번 Audit에서는 새 Route, 새 기능, 새 Planner, React 구현, SCSS 수정, Prototype A 수정, Commit을 수행하지 않는다.

검토 기준:

- 실제 사용자가 Home에서 시작해 Search까지 이동한다고 가정한다.
- 각 화면이 다음 화면으로 이동해야 하는 이유를 설명하는지 확인한다.
- 화면 책임이 겹치는 구간과 정보 반복을 찾는다.
- CTA가 다음 행동을 명확히 유도하는지 확인한다.
- Desktop 1440px, Mobile 390px 기준의 흐름을 함께 본다.
- Prototype A와 Prototype B의 경험 차이를 비교한다.

검토 근거:

- KR Experience 기준 문서
- 현재 `/kr` 구현 파일
- Desktop 1440x1000 캡처
- Mobile 390x900 캡처
- Route별 첫 화면 CTA와 scroll height 관찰

확인된 렌더링 상태:

- Desktop horizontal overflow: 전체 확인 화면 0
- Mobile horizontal overflow: 전체 확인 화면 0
- Mobile Bottom Navigation: Home / Market / Analysis / Changes / Journal 유지
- Prototype A 파일 수정 없음

## 2. Overall Verdict

Prototype B는 Prototype A를 단순 번역하지 않고, 한국 사용자에게 익숙한 시장 진입과 DATE의 공식 근거 중심 원칙을 잘 결합했다. Home, Market, Stock, Evidence까지의 흐름은 특히 강하다. 사용자는 "오늘 무엇을 확인해야 하는지", "왜 가격보다 공식 근거를 봐야 하는지", "아직 단정할 수 없는 내용이 무엇인지"를 반복적으로 학습한다.

다만 Prototype B가 화면을 추가하면서 누적된 구조적 문제가 보인다. 거의 모든 화면이 "공식 근거 / 미확인 / Analysis / Changes / Watchlist / 다음 확인"을 반복해서 설명한다. 각 화면이 책임을 잘 지키려는 의도는 분명하지만, 사용자 입장에서는 중간 이후 화면들이 서로 비슷한 검토 목록처럼 느껴질 위험이 있다.

가장 큰 문제는 Navigation과 화면 길이다. Desktop은 주요 메뉴, Header Action, Route Map, Footer가 동시에 많고, Mobile은 Header의 검색 버튼, 보조 Route Map, Bottom Navigation이 함께 보여 현재 위치와 다음 행동의 위계가 약해진다. Changes와 Watchlist는 Mobile에서 각각 매우 긴 단일 흐름으로 늘어나며, 첫 화면은 좋지만 이후 깊은 섹션까지 도달하기 어렵다.

현재 완성도는 100점 기준 76점이다.

## 3. Step Audit

| Step | Screen | Health | 다음 화면으로 이동하는 이유 | 주요 문제 |
| --- | --- | --- | --- | --- |
| 1 | Home | 좋음 | 오늘 먼저 확인할 공식 변화에서 Market, Evidence, Stock으로 이동한다. | Hero CTA는 강하지만 `/kr/evidence` 기본 진입이 상세 근거 id보다 약하다. |
| 2 | Market | 좋음 | 시장 변화의 우선순위와 관련 종목을 확인한 뒤 Stock/Evidence/Changes로 이동한다. | Market이 Changes와 일부 우선순위 설명을 공유한다. |
| 3 | Stock Detail | 좋음 | 특정 종목의 현재 상태를 확인한 뒤 Evidence와 Analysis로 이동한다. | 관련 Evidence 카드가 많아 Evidence Detail과 정보 반복이 크다. |
| 4 | Evidence | 좋음 | 공식 사실과 미확인 내용을 확인한 뒤 Analysis로 이동한다. | Evidence 안에서도 관련 대상, 시장 반응, Timeline이 길어 Stock/Changes와 겹친다. |
| 5 | Analysis | 보통+ | 기존 판단 구조를 다시 보고 Changes/Watchlist/Journal로 이어진다. | 유일하게 편집 가능한 화면이라 의미는 강하지만 화면이 매우 길고 상태별 우선순위가 복잡하다. |
| 6 | Changes | 보통 | 마지막 확인 이후 달라진 내용을 비교한 뒤 Analysis/Watchlist/Evidence로 이동한다. | Watchlist와 "확인 필요 / 새 공식 정보 / 분석 영향" 표현이 많이 겹친다. |
| 7 | Watchlist | 보통 | 관심 대상의 추적 이유와 우선순위를 보고 Changes/Search/Analysis로 이동한다. | Changes, Evidence, Analysis 요약을 많이 포함해 자체 책임이 무거워졌다. |
| 8 | Search | 좋음 | 사용자가 원하는 종목/기업/테마/공식 근거/분석을 찾아 상세 화면으로 이동한다. | Search가 거의 모든 목적지 링크를 제공해 Navigation 대체 화면처럼 커질 수 있다. |

## 4. Full Flow Audit

### Home → Market

Home은 "오늘은 반도체 관련 공식 정보를 먼저 확인해야 합니다."라는 명확한 H1로 시작한다. 사용자는 가격이나 종목 추천이 아니라 공식 정보 확인이 첫 행동이라는 점을 바로 이해한다. Market으로 가는 이유는 "오늘 시장 기준점과 관련 테마를 넓게 보려는 것"이다.

문제는 Home Hero의 Primary CTA가 Market이 아니라 Evidence다. Home이 전체 진입이라면 "공식 근거 확인하기"는 DATE 원칙에는 맞지만, 전체 Flow에서 Home → Market을 자연스럽게 강제하지는 않는다. Market은 Header나 아래 시장 기준점에서 발견해야 한다.

권장 방향:

- Home의 Hero Primary는 유지하되 Secondary에 "시장 흐름 먼저 보기"를 더 명확히 둔다.
- Home의 시장 기준점 섹션에서 Market 이동 CTA를 노출한다.

### Market → Stock Detail

Market은 시장 변화, 지수/선물/환율/유가, 관련 테마, 관련 종목을 하나의 흐름으로 묶는다. 관련 종목 row에서 Stock Detail로 이동하는 이유는 분명하다. "시장 변화가 어떤 종목과 연결되는지 확인"하기 위해서다.

문제는 Market의 Hero CTA가 내부 anchor, Evidence, Changes로 먼저 향한다는 점이다. Stock Detail은 중간 섹션의 종목 row에서 진입해야 한다. 시장 탐색 사용자는 관련 종목을 자연스럽게 발견하지만, "다음 화면은 Stock"이라는 Flow 목표는 약하다.

권장 방향:

- 관련 종목 섹션 헤더에 "대표 종목 상세 보기" CTA를 추가한다.
- Market Hero의 보조 CTA 중 하나를 "관련 종목 보기" anchor로 둔다.

### Stock Detail → Evidence

Stock Detail은 종목명, 코드, 시장, 가격 보조 정보, 관련 테마, 공식 근거 CTA를 잘 제공한다. 가격과 차트를 보조로 두고 공식 근거를 Primary로 둔 점은 강하다.

문제는 Stock Detail 내부에 `KREvidenceCard`가 여러 개 반복되어 Evidence Detail에서 확인해야 할 내용 일부를 이미 많이 보여준다. 사용자는 Evidence로 이동하기 전에 이미 확인 가능한 사실과 한계 문장을 봐서 상세 이동의 필요가 약해질 수 있다.

권장 방향:

- Stock에서는 대표 Evidence 1개와 "새 공식 근거 수 / 미확인 수 / 출처"만 보여준다.
- 상세 사실과 한계 문장은 Evidence Detail에서 더 깊게 다룬다.

### Evidence → Analysis

Evidence는 공식 사실, 확인할 수 없는 내용, 해석 범위, 출처와 원문 정보를 분리한다. Analysis로 이동하는 이유는 명확하다. "이 근거를 내 분석에 담고 비교"하기 위해서다.

문제는 Evidence가 Related Entity, Market Reaction, Timeline, Linked Evidence까지 폭넓게 다룬다는 점이다. 이 구조는 신뢰를 주지만 Stock/Changes/Analysis와 일부 역할이 겹친다.

권장 방향:

- Evidence의 책임을 "원문 기반 사실, 한계, 출처, 다음 확인 항목"으로 더 좁힌다.
- Related Entity와 Market Reaction은 압축하고, 종목/시장 상세로 넘긴다.

### Analysis → Changes

Analysis는 사용자가 직접 질문, 해석, 미확인 내용, 판단 변경 조건, 다음 확인 항목을 관리하는 유일한 화면이다. Changes로 이동하는 이유는 "새 근거가 기존 판단 구조에 어떤 차이를 만들었는지 비교"하기 위해서다.

문제는 Analysis 자체에도 ChangesSection이 있고, Changes 화면에도 Analysis Impact가 있다. 두 화면 모두 "새로 달라진 내용", "분석 영향", "판단 조건"을 말한다. 책임 분리는 문구상 존재하지만 실제 정보 구조는 중복된다.

권장 방향:

- Analysis 안의 ChangesSection은 "알림 요약" 수준으로 줄인다.
- 실제 before/after 비교는 Changes 전용으로 둔다.

### Changes → Watchlist

Changes는 이전 상태와 현재 상태를 비교하고, 정정/분석 영향/미확인 항목을 보여준다. Watchlist로 돌아가는 이유는 "변화 확인 후 관심 대상 추적 우선순위를 다시 보는 것"이다.

문제는 Changes의 Watchlist Section과 Watchlist의 Changes 요약이 서로 닮아 있다. 둘 다 관심 종목 변화, 새 공식 정보, 분석 영향, 다음 확인 항목을 표시한다.

권장 방향:

- Changes의 Watchlist Section은 "영향받은 관심 대상 목록"만 남긴다.
- Watchlist는 "추적 이유 / 마지막 확인 / 다음 확인" 중심으로 유지한다.

### Watchlist → Search

Watchlist의 Empty State와 Add Flow는 Search로 자연스럽게 이어진다. 관심 종목이 없을 때 "종목 검색하기"가 첫 행동인 점은 좋다.

문제는 Watchlist 기본 상태에서는 Search로 이동할 이유가 약하다. 이미 추적 중인 목록이 있는 사용자는 추가 탐색보다 Changes/Analysis로 흐른다. Search는 Header Action으로는 접근 가능하지만 Watchlist 안에서 "새 대상 추가"가 화면 아래 Add Flow에 묻힐 수 있다.

권장 방향:

- Watchlist Hero의 "관심 종목 추가하기"를 Search 진입과 더 직접 연결한다.
- Add Flow anchor 이동 후 검색으로 돌아가는 흐름을 짧게 만든다.

### Search → Next Screens

Search는 종목, 기업, 테마, 공식 근거, 분석, 관심 목록 연결을 모두 지원한다. 검색 결과에서 Stock, Evidence, Analysis, Watchlist, Market, Changes로 이동하는 이유가 분명하다.

문제는 Search가 모든 화면으로 가는 "전체 목적지 허브"처럼 커질 수 있다는 점이다. Search는 발견과 분류를 담당해야 하는데, 현재 결과 화면에는 최근 검색 관리와 다음 행동 전체 링크까지 있어 Navigation 대체 화면으로 보일 수 있다.

권장 방향:

- Search 결과 화면의 "다음 행동" 섹션은 결과 없음 또는 idle 상태 중심으로 제한한다.
- 검색 결과가 있는 상태에서는 결과별 CTA를 우선한다.

## 5. UX Breakpoints

1. Home Hero에서 Market으로 가는 명시적 이유가 약하다.
2. Home과 Market에서 `/kr/evidence` 기본 route로 가는 링크는 특정 근거로 가는 느낌이 약하다.
3. Market의 관련 종목 진입이 Hero 이후 중간 섹션에 있어 Flow상 Stock으로 이어지는 힘이 약하다.
4. Stock 내부 Evidence 카드가 많아 Evidence Detail의 존재 이유가 일부 약해진다.
5. Evidence가 관련 대상, 시장 반응, Timeline까지 넓게 다뤄 Stock/Changes와 겹친다.
6. Analysis와 Changes가 "새로 달라진 내용 / 분석 영향"을 모두 다룬다.
7. Changes와 Watchlist가 "관심 종목 변화 / 새 공식 정보 / 다음 확인"을 모두 다룬다.
8. Watchlist 기본 화면에서 Search로 추가 탐색하는 동기가 약하다.
9. Search가 상세 화면으로 연결하는 역할을 넘어 전체 Navigation 허브처럼 보일 수 있다.
10. Mobile에서 Changes와 Watchlist는 너무 긴 단일 흐름으로 후반 섹션 접근성이 낮다.

## 6. Duplicate Information

| 정보 | 반복 화면 | 판단 |
| --- | --- | --- |
| 공식 근거 제목 / 출처 / 공개 시각 | Home, Stock, Evidence, Changes, Watchlist, Search | 필요하지만 상세 문장은 Evidence로 좁혀야 한다. |
| 아직 단정할 수 없는 내용 | Home, Stock, Evidence, Analysis, Changes | DATE 차별점이지만 반복 피로가 생길 수 있다. |
| Analysis 재검토 필요 | Analysis, Changes, Watchlist, Search | Watchlist/Search는 상태만, Changes는 영향 비교, Analysis는 수정 관리로 분리 필요. |
| 다음 확인 항목 | Evidence, Analysis, Changes, Watchlist | 각 화면마다 의미가 달라 보이지 않는다. |
| 관심 종목 변화 | Home, Changes, Watchlist | Home은 요약, Changes는 비교, Watchlist는 추적 이유로 축소 필요. |
| 관련 종목/기업/테마 | Market, Stock, Evidence, Analysis, Search | 발견/관계/검증 목적에 따라 표시 밀도 조정 필요. |

## 7. Responsibility Overlap

### Home

책임: 오늘 먼저 볼 변화 안내.

현재 적합성: 좋음.

위험: Evidence와 Watchlist 요약이 많아지면 Home이 미니 Dashboard가 될 수 있다.

### Market

책임: 시장 전체 탐색.

현재 적합성: 좋음.

위험: 우선순위/변화 비교 설명이 Changes 역할과 일부 겹친다.

### Stock Detail

책임: 특정 종목 현재 상태 이해.

현재 적합성: 좋음.

위험: Evidence 내용을 상세히 반복한다.

### Evidence

책임: 공식 정보 검증.

현재 적합성: 좋음.

위험: 관련 대상, 시장 반응, Timeline이 많아 Stock/Changes처럼 보일 수 있다.

### Analysis

책임: 사용자 판단 구조 관리.

현재 적합성: 좋음.

위험: Changes 요약과 Evidence 목록이 많아 실제 편집 가능한 판단 구조가 아래로 밀린다.

### Changes

책임: 이전 상태 이후 달라진 내용 비교.

현재 적합성: 보통+.

위험: Watchlist와 Analysis 상태 관리까지 일부 가져온다.

### Watchlist

책임: 관심 대상 지속 추적.

현재 적합성: 보통+.

위험: Changes, Analysis, Evidence 요약이 모두 들어와 추적 화면보다 종합 검토 화면처럼 보인다.

### Search

책임: 원하는 대상 발견 후 적절한 상세 화면 연결.

현재 적합성: 좋음.

위험: 모든 화면으로 이동하는 다음 행동 링크가 많아 Search가 보조 Navigation처럼 커질 수 있다.

## 8. CTA Audit

좋은 점:

- Primary CTA는 대부분 투자 행동이 아니라 확인 행동이다.
- "공식 근거 확인하기", "분석 다시 확인하기", "달라진 내용 확인하기"는 DATE 원칙과 맞다.
- Search 결과별 CTA는 종목/공식 근거/분석/관심 목록 연결이 분명하다.

문제:

- "공식 근거 확인하기"가 여러 화면에서 반복되어 상황별 차이가 약하다.
- Home, Market의 Evidence CTA가 상세 id 없이 `/kr/evidence`로 갈 때 사용자는 어떤 근거를 보게 되는지 알기 어렵다.
- Watchlist에서 "관심 종목 추가하기"는 Add Flow anchor로 이동하지만 Search와의 실제 연결감이 약하다.
- Changes에서 "Watchlist로 돌아가기"는 영어 화면명 혼용이며 사용자 행동 문구로는 덜 자연스럽다.
- 일부 Primary CTA가 같은 화면 내 anchor로만 이동해 화면 전환 흐름이 약해진다.

권장 문구 방향:

- `공식 근거 확인하기` → `정정 공시 확인하기`, `대표 공시 확인하기`, `IR 근거 확인하기`
- `Watchlist로 돌아가기` → `관심 대상 다시 보기`
- `내 분석에 담기` → `이 근거로 분석 이어가기`
- `관심 종목 추가하기` → `검색해서 관심 대상 추가`

## 9. Navigation Audit

현재 Desktop:

- 주요 메뉴: 홈 / 시장 / 분석 / 변화 / 기록 / 검색
- Header Action: 종목·근거 검색 / 내 정보
- 보조 이동: 테마 / 투자 근거 / 관심 종목 / 종목 예시 / 설정
- Footer: 주요 메뉴와 보조 메뉴 반복

문제:

- 기준 문서의 Desktop Global Navigation 권장안은 홈 / 시장 / 분석 / 변화 / 기록이다. 실제 구현은 `검색`이 주요 메뉴에 들어가 있다.
- `검색`은 Desktop 주요 메뉴와 Header Action에 중복 노출된다.
- 보조 이동에 `투자 근거`, `관심 종목`, `종목 예시`가 항상 노출되어 사용자가 현재 핵심 흐름보다 샘플 route map을 먼저 볼 수 있다.
- Stock/Evidence/Watchlist/Search는 Bottom Navigation에는 없지만 보조 이동에서는 항상 보여 위계가 섞인다.

현재 Mobile:

- Header: DATE + 종목·근거 검색
- Route Map: 테마 / 투자 근거 / 관심 종목 / 종목 예시 / 설정
- Bottom Navigation: 홈 / 시장 / 분석 / 변화 / 기록

문제:

- Mobile에서 상단 검색, 보조 route map, 하단 nav가 모두 보인다.
- Bottom Navigation에는 Search/Watchlist가 없는데 route map에는 있어 현재 위치와 주요 앱 구조의 관계가 애매하다.
- `종목 예시`는 Prototype 검증용으로는 유용하지만 사용자 화면에서는 제품 메뉴처럼 보인다.

권장 방향:

- Desktop 주요 메뉴에서 Search를 제거하고 Header Action으로만 둔다.
- Route Map은 개발/검증용 성격이 강하므로 실제 Prototype UX에서는 접거나 "빠른 이동"으로 낮춘다.
- Mobile에서는 route map을 기본 노출하지 않고, Header Action 또는 메뉴로 숨긴다.
- `투자 근거`는 독립 메뉴보다 Search/Stock/Market에서 진입하는 보조 route로 유지한다.
- `종목 예시`는 사용자 메뉴가 아니라 QA 링크로 분리한다.

## 10. Desktop Flow

강점:

- Desktop 첫 화면은 정보 위계가 명확하다.
- Low-Fi grayscale 스타일이 일관된다.
- 가로 overflow가 없고 넓은 화면에서 읽기 순서가 안정적이다.
- Evidence-first 원칙이 Home부터 Search까지 유지된다.

문제:

- 화면 대부분이 긴 세로 문서처럼 구성되어 반복 사용 도구보다는 검토 문서 느낌이 강하다.
- Hero 이후 섹션이 많아 주요 CTA 이후의 하위 작업을 찾기 어렵다.
- Header, Route Map, Footer가 합쳐지면 route 선택지가 지나치게 많다.
- Changes와 Watchlist는 Desktop에서도 scroll height가 매우 길다.

## 11. Mobile Flow

강점:

- 390px에서 가로 overflow는 없다.
- 주요 Hero와 Primary CTA는 첫 화면 내에 잘 들어온다.
- Bottom Navigation은 5개로 제한되어 있다.
- Search, Watchlist 첫 화면의 핵심 수치와 CTA는 모바일에 잘 맞는다.

문제:

- Mobile에서 route map이 Bottom Navigation과 중복된다.
- Changes mobile scroll height가 약 14,132px, Watchlist mobile scroll height가 약 18,893px로 매우 길다.
- Evidence, Analysis도 길어 "확인 → 판단 → 변화" 흐름에서 사용자가 중간에 지칠 수 있다.
- 일부 긴 링크 텍스트가 카드 전체를 클릭 가능한 긴 문장처럼 읽혀 스캔성이 떨어진다.
- Search 입력은 첫 화면에 보이지만 검색 결과 이후 최근 검색/다음 행동까지 이어져 화면이 길다.

## 12. Prototype A vs Prototype B

### Prototype A 특성

- Discover, Research, Monitoring, Journal 중심.
- 영어 용어와 Workspace 구조가 강하다.
- Evidence, Source, Freshness, Boundary 원칙이 명확하다.
- 정보 밀도가 높고 분석 도구에 가깝다.
- Search/Resolver는 Discovery 안의 기능에 가깝다.
- Monitoring은 Rule, Trigger, Freshness, Review Queue 중심이다.

### Prototype B 특성

- Home, Market, Stock Detail, Evidence, Analysis, Changes, Watchlist, Search로 한국 사용자 흐름을 재구성했다.
- 한국어 설명형 문구가 많고 첫 진입 이해도가 높다.
- 시장 흐름과 종목 상세가 한국 투자자에게 익숙한 방식으로 추가됐다.
- Monitoring 역할은 Changes와 Watchlist로 분리되어 더 사용자 친화적이다.
- Search는 Discovery 번역이 아니라 종목/기업/테마/공식 근거/분석 발견 화면으로 바뀌었다.

### B가 A보다 좋아진 점

1. 첫 진입 이해도가 높다.
2. 한국어 화면 목적이 명확하다.
3. 시장 → 종목 → 근거 흐름이 자연스럽다.
4. 투자 추천처럼 보이는 표현을 대부분 피한다.
5. Watchlist가 단순 즐겨찾기보다 추적 화면으로 확장됐다.
6. Search가 Resolver보다 사용자에게 친숙하다.
7. Mobile-first 고려가 A보다 강하다.

### B가 A보다 약해진 점

1. 화면 책임 경계가 A보다 느슨해졌다.
2. 긴 설명 문구가 많아 정보 밀도 조절이 어렵다.
3. Evidence/Analysis/Changes/Watchlist가 비슷한 검토 언어를 반복한다.
4. Navigation이 A보다 더 많은 진입점을 동시에 노출한다.
5. A의 Workspace 목적성은 강했지만 B는 각 화면이 모두 "다음 확인"을 말해 차이가 흐려진다.

## 13. Top 10 UX Problems

1. Navigation 위계가 넓다. Desktop은 주요 메뉴, Header Action, Route Map이 겹치고 Mobile은 Route Map과 Bottom Navigation이 동시에 보인다.
2. Changes와 Watchlist가 너무 길다. Mobile에서 핵심 이후 섹션 접근성이 낮다.
3. Evidence 내용이 Stock, Evidence, Analysis, Changes, Watchlist, Search에 반복된다.
4. Analysis와 Changes가 새 변화와 분석 영향 책임을 나눠 갖지 못하고 반복한다.
5. Watchlist가 추적 화면을 넘어 Evidence/Analysis/Changes 요약 화면처럼 커졌다.
6. Home → Market 흐름이 의도보다 약하다. Home Hero는 Evidence로 바로 보낸다.
7. Market → Stock 흐름이 중간 섹션에 묻힌다.
8. `/kr/evidence` 기본 진입 링크가 많아 사용자가 어떤 공식 근거를 보게 되는지 불명확하다.
9. 일부 CTA가 화면명 또는 영어 용어를 그대로 사용한다. 예: `Watchlist로 돌아가기`, `Analysis 보기`, `Evidence 상세 보기`.
10. Search가 결과 화면을 넘어 전체 목적지 허브처럼 커질 위험이 있다.

## 14. Quick Wins Top 10

1. Desktop 주요 메뉴에서 `검색`을 제거하고 Header Action으로만 둔다.
2. Mobile Route Map을 기본 노출하지 않거나 접힌 "빠른 이동"으로 낮춘다.
3. `종목 예시`를 사용자 메뉴에서 제거하거나 QA 전용 문구로 바꾼다.
4. Home Hero Secondary CTA에 `시장 흐름 먼저 보기`를 추가한다.
5. Market Hero에 `관련 종목 보기` anchor CTA를 추가한다.
6. Home/Market의 `/kr/evidence` 링크를 대표 id가 있는 `/kr/evidence?id=dart-samsung-001`로 바꾼다.
7. `Watchlist로 돌아가기`를 `관심 대상 다시 보기`로 바꾼다.
8. Watchlist의 `Analysis 보기`, `Evidence 상세 보기`를 `분석 다시 보기`, `새 근거 확인하기`로 한국어화한다.
9. Search 결과가 있는 상태에서는 하단 `다음 행동` 링크 수를 줄인다.
10. Changes/Watchlist Hero 아래에 섹션 바로가기 3개만 남기고 나머지 보조 CTA를 접는다.

## 15. Major Refactor Top 10

1. Navigation 체계를 실제 사용자용과 QA route map으로 분리한다.
2. Evidence summary contract를 만든다. 모든 화면에서 Evidence는 "제목 / 출처 / 공개 시각 / 확인 상태 / 상세 이동"까지만 반복한다.
3. Changes와 Watchlist의 책임 경계를 재정의한다. Changes는 비교, Watchlist는 추적 이유와 다음 확인만 담당한다.
4. Analysis의 section priority를 모바일 전용으로 재구성한다. 편집 가능한 판단 구조가 더 빨리 나오게 한다.
5. Changes를 view별로 압축한다. latest, analysis, empty 외에 모바일용 우선순위 preview 구조가 필요하다.
6. Watchlist를 default 화면에서 모든 섹션을 펼치지 않고 상태 그룹 단위로 접는다.
7. Search 결과 페이지를 결과 유형별 "Top result + focused groups"로 더 짧게 만든다.
8. Stock Detail에서 Evidence 카드 반복을 줄이고 Evidence Detail로 넘기는 정보 경계를 강화한다.
9. Home과 Market 사이의 product path를 명확히 한다. Home은 오늘 먼저 볼 변화, Market은 전체 탐색이라는 CTA 구조를 고정한다.
10. Journal의 Prototype B 구현이 아직 Placeholder 수준이므로 Analysis/Changes와 연결되는 KR Journal 경험을 별도 구현한다.

## 16. Completeness Score

현재 Prototype B 완성도: 76 / 100

세부 평가:

| 항목 | 점수 | 판단 |
| --- | ---: | --- |
| 첫 진입 이해도 | 85 | Home의 메시지는 강하다. |
| 정보 탐색 속도 | 74 | 화면 길이와 반복 정보가 속도를 낮춘다. |
| 한국어 자연스러움 | 78 | 전반적으로 좋지만 Analysis, Evidence, Watchlist 용어가 일부 남아 있다. |
| 시장 친숙도 | 82 | Market/Stock 흐름은 한국 사용자에게 친숙하다. |
| 투자 근거 접근성 | 84 | 모든 화면에서 공식 근거로 이어진다. |
| 정보 신뢰성 표현 | 86 | 공식 확인/미확인/정정 표현이 일관적이다. |
| 모바일 사용성 | 68 | overflow는 없지만 Changes/Watchlist/Analysis가 너무 길다. |
| 책임 분리 | 65 | Evidence/Analysis/Changes/Watchlist 중복이 크다. |
| CTA 명확성 | 74 | 확인 행동 중심은 좋지만 일부 목적지가 모호하다. |
| DATE 차별성 | 84 | 추천/매매보다 근거/검토 중심이 잘 유지된다. |

## 17. Next Phase Priority

### Phase 1: Navigation Cleanup

목표:

- 사용자용 Navigation과 QA route map을 분리한다.
- Desktop/Mobile에서 Search, Watchlist, Evidence의 보조 진입 위계를 정리한다.

가장 먼저 해야 할 일:

- Desktop 주요 메뉴를 기준 문서와 맞춘다.
- Mobile route map 노출 방식을 바꾼다.
- 화면명 기반 CTA를 사용자 행동 문구로 정리한다.

### Phase 2: Responsibility Boundary Tightening

목표:

- Evidence, Analysis, Changes, Watchlist의 반복 정보를 줄인다.

가장 먼저 해야 할 일:

- Evidence summary contract 작성 없이 코드 수준에서 반복 표시 기준을 정한다.
- Stock/Changes/Watchlist/Search의 Evidence 표시 범위를 압축한다.
- Analysis 안의 Changes 요약과 Changes 화면의 Analysis Impact 경계를 조정한다.

### Phase 3: Mobile Compression

목표:

- 긴 화면을 모바일에서 실제 사용 가능한 검토 흐름으로 만든다.

가장 먼저 해야 할 일:

- Changes와 Watchlist의 후반 섹션을 접힘 구조로 바꾼다.
- Hero 아래 핵심 3개 섹션만 우선 노출한다.
- 섹션 간 바로가기 또는 상태 그룹 이동을 추가한다.

### Phase 4: KR Journal Completion

목표:

- Home → Market → Stock → Evidence → Analysis → Changes → Watchlist 이후 기록 보존 흐름을 완성한다.

가장 먼저 해야 할 일:

- `/kr/journal`을 Prototype B 기준으로 재설계하고 구현한다.
- Analysis에서 "기록으로 남기기"가 실제 Journal 책임과 맞도록 연결한다.

### Phase 5: Interaction QA

목표:

- Low-Fi 수준의 링크, focus, keyboard, empty state를 전 화면에서 검증한다.

가장 먼저 해야 할 일:

- Search input keyboard behavior
- Analysis edit focus and error recovery
- Mobile bottom navigation overlap
- Long page focus jump behavior

## 18. Open Risks

1. Prototype B가 설명형 문구에 의존해 실제 사용 반복성이 약해질 수 있다.
2. 화면마다 DATE 원칙을 다시 설명해 사용자에게 교육 문서처럼 느껴질 수 있다.
3. Low-Fi 상태에서 route map이 QA 도구인지 실제 제품 Navigation인지 혼재되어 있다.
4. Watchlist와 Changes의 경계가 흐려지면 이후 알림/추적 기능 설계가 어려워진다.
5. Evidence가 모든 화면에 많이 노출되면 Evidence Detail의 정보 가치가 낮아질 수 있다.
6. Search가 강해질수록 Home/Market 발견 흐름이 약해질 수 있다.

## 19. Final Recommendation

다음 작업은 새 화면 추가보다 정리가 우선이다.

우선순위는 다음과 같다.

1. Navigation Cleanup
2. Evidence/Analysis/Changes/Watchlist 책임 경계 정리
3. Changes와 Watchlist Mobile 압축
4. CTA 문구와 목적지 정리
5. KR Journal 완성

Prototype B는 핵심 방향이 맞다. 지금 필요한 것은 더 많은 기능이 아니라, 이미 구현된 화면들이 각자의 책임만 남기도록 덜어내는 작업이다.
