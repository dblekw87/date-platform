# KR Information Density Sprint Audit

## 1. Scope

대상 화면:

- Home
- Market
- Stock
- Evidence
- Analysis
- Changes
- Watchlist
- Search

이번 단계에서는 코드, Route, 기능, Planner를 추가하지 않는다. 목적은 현재 Prototype B의 정보 밀도를 줄이기 위한 감사와 재배치 기준을 문서화하는 것이다.

현재 기준 점수:

- Prototype B UX Score: 81 / 100

검토 기준:

- 각 화면에서 가장 중요한 정보 Top3만 fold 이전에 남긴다.
- fold 이후 정보는 접힘, 요약, 병합 대상으로 분류한다.
- 모바일 390px 기준 scroll length를 최소 30% 줄일 수 있는지 판단한다.
- 중복 CTA와 중복 섹션을 제거할 수 있는지 검토한다.
- 한 손 사용 기준으로 첫 화면과 주요 CTA 접근성을 평가한다.

측정 환경:

- Desktop: 1440 x 1000
- Mobile: 390 x 900
- 확인 Route:
  - `/kr`
  - `/kr/market`
  - `/kr/stock/005930`
  - `/kr/evidence?id=dart-samsung-001`
  - `/kr/analysis?id=samsung-semiconductor-001`
  - `/kr/changes?view=latest`
  - `/kr/watchlist?view=default`
  - `/kr/search?q=005930`

## 2. Density Baseline

| Screen | Mobile Scroll Height | Section / Article Count | Heading Count | Control Count | 30% Target Height | 30% Reduction 가능성 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Home | 5,936px | 22 | 15 | 20 | 4,155px | 가능 |
| Market | 8,706px | 23 | 14 | 10 | 6,094px | 가능 |
| Stock | 5,471px | 12 | 12 | 18 | 3,830px | 가능 |
| Evidence | 7,958px | 27 | 24 | 15 | 5,571px | 가능 |
| Analysis | 9,250px | 38 | 33 | 32 | 6,475px | 가능 |
| Changes | 14,052px | 30 | 20 | 28 | 9,836px | 가능 |
| Watchlist | 18,761px | 45 | 30 | 60 | 13,133px | 가능 |
| Search | 8,104px | 23 | 20 | 34 | 5,673px | 가능 |

판단:

- 모든 화면은 30% 이상 줄일 여지가 있다.
- 가장 급한 순서는 Watchlist → Changes → Analysis → Search → Market → Evidence → Home → Stock이다.
- Watchlist는 컨트롤 60개로 가장 과밀하다. 사용자는 추적 화면을 보는 것이 아니라 전체 앱 요약을 다시 읽는 느낌을 받을 수 있다.
- Changes는 비교 화면인데 섹션이 많아 "무엇이 달라졌는지"보다 "검토해야 할 모든 상태"가 먼저 보인다.
- Analysis는 기능적으로 중요한 화면이지만 fold 이전부터 다양한 섹션 후보가 노출되어 현재 질문과 판단 변경 조건이 약해진다.

## 3. Global Density Principles

### Fold 이전에 남길 것

각 화면 fold 이전에는 다음 3개만 남긴다.

1. 사용자가 지금 이 화면에서 확인해야 하는 핵심 대상
2. 이 화면에서만 확인할 수 있는 상태 또는 차이
3. 다음 화면으로 이동하는 Primary CTA

### Fold 이후로 내릴 것

- 관련 종목 상세 목록
- 연결된 Evidence 반복
- 전체 Timeline
- Empty State 샘플
- 사용자 지정 목록
- 보류 / 종료 / 기록성 정보
- Search의 보조 목적지 링크

### 기본 접힘 후보

- "연결된 다른 근거"
- "관련 대상"
- "시장 반응"
- "Timeline"
- "반영 완료"
- "현재 변화 없음"
- "추적 보류 / 종료"
- "최근 검색 관리"
- "Empty State 모음"

### CTA 원칙

- Hero CTA는 최대 3개.
- 카드 안 CTA는 최대 2개.
- 목록 row CTA는 Primary 1개만.
- 같은 destination을 가리키는 CTA가 한 화면에 3회 이상 나오면 병합한다.
- 화면명 CTA보다 행동 CTA를 우선한다.

## 4. Screen Recommendations

## 4.1 Home

현재 Mobile:

- Scroll height: 5,936px
- Fold 이전 노출: Hero, 검색 박스, 핵심 CTA 3개
- 문제: 검색 박스가 보조 진입임에도 fold 이전에서 오늘의 핵심 변화와 경쟁한다.

Top3만 남길 정보:

1. 오늘 먼저 확인할 공식 변화
2. 공식 확인 상태 / 아직 확인할 내용
3. 대표 공시 확인 또는 시장 흐름 CTA

Fold 이전:

- H1
- 1문장 요약
- 공식 확인 상태 2개만: `확인 상태`, `아직 확인할 내용`
- CTA: `대표 공시 확인하기`, `시장 흐름 먼저 보기`

Fold 이후:

- 검색 박스
- 주요 지수/환율/유가
- 핵심 변화 3개
- 테마 / 많이 보는 종목
- 움직인 이유
- 관심 종목 변화
- 이어서 분석 / 기록

접힘 제안:

- 주요 지수/환율/유가: `시장 기준점 펼치기`
- 테마 / 많이 보는 종목: 하나의 `관련 대상` summary로 병합
- 이어서 분석 / 최근 판단 기록: `내 작업 이어보기`로 병합

CTA 제거:

- Home 안에서 반복되는 `근거 보기` CTA는 첫 번째 대표 근거만 유지한다.
- 검색 박스는 fold 이후로 내리고 CTA는 Header의 `종목·근거 검색`과 중복되지 않게 한다.

Section Merge:

- `주목받는 테마` + `많이 보는 종목` → `관련 대상`
- `관심 종목에서 달라진 내용` + `이어서 분석` → `내가 이어서 볼 내용`

Hero 높이 줄이기:

- 우측 검색 박스를 fold 이후로 이동하면 모바일 첫 화면 높이를 약 18~22% 줄일 수 있다.
- trust list 4개를 2개로 줄이면 추가 8~10% 감소 가능.

30% 축소 가능성:

- 가능. 목표 4,155px.
- 검색 박스 이동, 시장 기준점 접힘, 관련 대상 병합으로 30~35% 축소 가능.

한 손 사용 평가:

- 현재: 좋음.
- 개선 후: 매우 좋음.
- 이유: Primary CTA가 엄지 영역에 더 빨리 도달한다.

## 4.2 Market

현재 Mobile:

- Scroll height: 8,706px
- Fold 이전 노출: Hero와 CTA 중심
- 문제: 시장 우선순위, 지수, Timeline, 관계 흐름, 테마, 종목, 확인 상태, Empty State가 모두 펼쳐져 있다.

Top3만 남길 정보:

1. 오늘 가장 먼저 볼 시장 변화
2. 관련 시장 기준점
3. 관련 종목 진입

Fold 이전:

- H1
- 시장 상태 요약
- Top priority 1개
- CTA: `관련 종목 보기`, `대표 공시 확인하기`

Fold 이후:

- Priority 2~3
- 지수/선물/환율/유가
- 시간 순서 흐름
- 시장 간 연결
- 관련 테마
- 확인 상태
- 정보가 적은 날 Empty State

접힘 제안:

- Priority 2~3: `다른 확인 후보 2개`
- 지수/선물/환율/유가: `시장 기준점`
- Timeline + 시장 간 연결: `시장 연결 흐름`
- Empty State: 실제 empty view가 아니면 기본 숨김

CTA 제거:

- Hero 내부 anchor CTA와 하단 다음 행동 CTA가 겹친다.
- Hero에서 관련 종목 / 대표 공시만 남기고 하단 `공식 근거 보기`는 제거 가능.

Section Merge:

- `시장 흐름` + `시장 간 연결` → `시장 연결 흐름`
- `관련 테마` + `관련 종목` → 유지하되 같은 section 내부 탭/summary로 압축
- `확인 상태`는 Hero badge 체계와 병합

Hero 높이 줄이기:

- 장 시작 전/장 중/장 마감 후 panel은 모바일에서 현재 상태 1개만 펼친다.
- 나머지 상태는 접힘 summary로 둔다.

30% 축소 가능성:

- 가능. 목표 6,094px.
- Timeline/관계 흐름 병합, Empty State 기본 숨김, Priority 후보 접힘으로 35% 내외 축소 가능.

한 손 사용 평가:

- 현재: 보통.
- 개선 후: 좋음.
- 이유: 관련 종목 이동이 fold 내에 남고, 지수/테마 반복 스크롤이 줄어든다.

## 4.3 Stock

현재 Mobile:

- Scroll height: 5,471px
- Fold 이전 노출: 종목 Hero, CTA, 변화 요약 일부
- 문제: Stock은 상대적으로 짧지만 Evidence 카드가 상세 내용을 많이 반복한다.

Top3만 남길 정보:

1. 종목명 / 코드 / 시장 / 현재 변화
2. 대표 공식 근거 상태
3. 아직 확인해야 할 내용

Fold 이전:

- 종목명, 코드, 시장
- 가격은 보조 aside 또는 compact row
- `지금 달라진 점` 요약 1개
- CTA: `대표 공시 확인하기`, `분석에 담기`

Fold 이후:

- Evidence stack
- 확인 필요 details
- 시장 반응
- 관련 관계
- Timeline
- 분석 entry

접힘 제안:

- Evidence stack: 대표 1개 외 `다른 근거 2개`
- 시장 반응: `보조 가격/거래량 보기`
- 관련 관계: `관련 기업 보기`
- Timeline: `시간순 변화 보기`

CTA 제거:

- Hero의 `관련 기업 보기`와 하단 `관련 기업 비교하기`는 하나만 유지.
- Evidence card 자체 링크가 많으면 하단 CTA는 줄인다.

Section Merge:

- `시장 반응` + `Timeline` → `가격과 시간 흐름`
- `관련 관계` + `분석으로 이어가기` → `분석에 필요한 관련 대상`

Hero 높이 줄이기:

- Quote panel을 모바일에서 한 줄 compact quote로 줄인다.
- Theme chip은 1개 대표 + `외 1`로 압축한다.

30% 축소 가능성:

- 가능. 목표 3,830px.
- Evidence stack 접힘과 Timeline 병합으로 30% 축소 가능.

한 손 사용 평가:

- 현재: 좋음.
- 개선 후: 매우 좋음.
- 이유: Stock은 원래 밀도가 낮은 편이고, 대표 근거만 남기면 CTA 접근이 빠르다.

## 4.4 Evidence

현재 Mobile:

- Scroll height: 7,958px
- Heading count: 24
- 문제: Evidence Detail 안에 quick view, 공식 사실, 단정 불가, 해석 범위, 관련 대상, 시장 반응, timeline, 출처, 다음 확인, 연결 근거, 분석 entry가 모두 펼쳐져 있다.

Top3만 남길 정보:

1. 출처와 공개 시각
2. 원문에서 확인 가능한 공식 사실
3. 이 근거로 단정할 수 없는 내용

Fold 이전:

- Evidence title
- 출처 / 공개 시각 / 마지막 확인
- 공식 사실 1개
- 단정 불가 1개
- CTA: `원문 확인하기`, `이 근거로 분석 이어가기`

Fold 이후:

- quick view 4카드
- 해석 범위
- 관련 대상
- 시장 반응
- Timeline
- 출처 상세
- 다음 확인 항목
- 연결된 다른 근거

접힘 제안:

- Quick view: 4카드 → 1문장 summary + `요약 펼치기`
- 해석 범위: `가능한 해석 보기`
- 관련 대상: `관련 종목/기업 보기`
- 시장 반응: 기본 접힘
- Timeline: 기본 접힘
- 연결 근거: 기본 접힘

CTA 제거:

- `관련 종목 보기`는 Related section anchor와 중복된다. Hero에서는 제거 가능.
- `관련 흐름 확인하기`와 Timeline anchor는 fold 이후로 낮춘다.

Section Merge:

- `Quick view` + `공식 사실` → `확인 가능한 내용`
- `단정할 수 없는 것` + `해석 범위` → `해석의 한계`
- `시장 반응` + `Timeline` → `공개 이후 참고 흐름`

Hero 높이 줄이기:

- Source panel은 모바일에서 title 아래 meta row로 압축한다.
- related stocks/theme chips는 2개까지만 노출한다.

30% 축소 가능성:

- 가능. 목표 5,571px.
- Quick view 병합, 관련 대상/시장 반응/Timeline 접힘으로 35~40% 축소 가능.

한 손 사용 평가:

- 현재: 보통.
- 개선 후: 좋음.
- 이유: 원문 확인과 분석 이동이 짧은 거리 안에 유지된다.

## 4.5 Analysis

현재 Mobile:

- Scroll height: 9,250px
- Section count: 38
- Control count: 32
- 문제: 편집 가능한 핵심 영역보다 변화, Evidence, observation, facts가 먼저 많아 보인다.

Top3만 남길 정보:

1. 현재 질문
2. 새 근거 또는 판단 변경 조건
3. 다음 확인 항목

Fold 이전:

- Analysis title
- 현재 질문
- 상태: 새 근거 검토 필요 / 판단 조건 접근 여부
- CTA: `새 근거 검토하기`, `내 해석 수정하기`

Fold 이후:

- Changes summary
- linked evidence
- official facts
- market observation
- alternatives
- hypotheses
- unknowns
- related targets
- history
- actions

접힘 제안:

- Changes summary: 1줄 alert + `변화 비교 보기`
- Evidence: 대표 1개 외 접힘
- Facts + Observation: `근거와 관찰`
- Alternatives + Hypotheses: `해석 후보`
- Related + History: 기본 접힘

CTA 제거:

- Hero의 `근거 추가하기`, `관련 종목 보기`, `관심 종목 상태 보기`는 secondary group으로 접는다.
- 하단 Actions의 `내 해석 수정하기`와 섹션별 수정 버튼이 겹치므로 하나만 primary로 둔다.

Section Merge:

- `official facts` + `market observation` → `근거와 관찰`
- `alternatives` + `hypotheses` → `다른 해석과 가설`
- `conditions` + `next` → `다시 볼 조건과 다음 확인`

Hero 높이 줄이기:

- State panel의 summary dl은 모바일에서 `연결 근거 n개 · 관련 종목 n개` 한 줄로 압축.
- Theme chip은 한 줄 scroll 대신 대표 theme만 노출.

30% 축소 가능성:

- 가능. 목표 6,475px.
- Evidence/Observation/History 접힘과 섹션 병합으로 35% 내외 축소 가능.

한 손 사용 평가:

- 현재: 보통.
- 개선 후: 좋음.
- 이유: 핵심 편집 행동이 fold 안으로 올라온다.

## 4.6 Changes

현재 Mobile:

- Scroll height: 14,052px
- Control count: 28
- 문제: 비교 화면인데 모든 변화, 분석 영향, 공식 정보, 정정, 관심 종목, 미확인, 반영 완료, 다음 확인이 모두 펼쳐져 있다.

Top3만 남길 정보:

1. 마지막 확인 이후 가장 중요한 변화
2. 기존 판단에 영향이 있는지
3. 새 근거 또는 정정 여부

Fold 이전:

- H1
- 변화 수 / 분석 영향 / 정정 수
- top change 1개
- CTA: `분석 다시 확인하기`, `새 근거 보기`

Fold 이후:

- 전체 변화 목록
- Analysis impact rows
- Official evidence cards
- Corrections
- Watchlist affected rows
- Unresolved details
- Applied
- Next checks

접힘 제안:

- 전체 변화 목록: top 1 외 `다른 변화 4개`
- Analysis impact: summary row
- Official evidence + Corrections: `새 공식 정보와 정정`
- Watchlist affected: `영향받은 관심 대상`
- Applied + Next checks: `처리 상태와 다음 확인`

CTA 제거:

- Change card마다 반복되는 `분석 다시 확인하기`, `새 근거 보기`는 list에서는 row 전체 클릭 + primary 1개로 축소.
- Hero의 `반영 완료 항목 보기`는 fold 이후 collapsed section에서만 제공.

Section Merge:

- `officialEvidence` + `corrections` → `새 공식 정보 / 정정`
- `unresolved` + `nextChecks` → `남은 미확인과 다음 확인`
- `applied` + `analysisImpact`는 상태가 다르므로 병합하지 않고 접힘 처리.

Hero 높이 줄이기:

- Summary panel의 dl을 badge row로 줄인다.
- Hero CTA는 2개만 유지.

30% 축소 가능성:

- 가능. 목표 9,836px.
- 전체 변화 목록과 하위 상태 섹션을 접으면 40% 이상 축소 가능.

한 손 사용 평가:

- 현재: 낮음.
- 개선 후: 보통+.
- 이유: top change 이후 반복 스크롤이 크게 줄어야 한다.

## 4.7 Watchlist

현재 Mobile:

- Scroll height: 18,761px
- Section count: 45
- Control count: 60
- 문제: 추적 화면이 아니라 Changes, Evidence, Analysis, Next Check, Empty State 전체 모음처럼 보인다.

Top3만 남길 정보:

1. 가장 먼저 확인할 관심 대상
2. 왜 지금 확인해야 하는지
3. 다음 확인 시점 또는 달라진 내용 CTA

Fold 이전:

- H1
- 확인 필요 수 / 새 공식 정보 수 / 분석 재검토 수
- lead item 1개
- CTA: `달라진 내용 확인하기`, `검색해서 관심 대상 추가`

Fold 이후:

- 확인 필요 전체
- 새 공식 정보 있음
- Analysis 재검토
- 다음 확인 시점
- 현재 변화 없음
- 사용자 지정 목록
- 추적 보류 / 종료
- 관심 추가 흐름
- Empty State 모음

접힘 제안:

- 확인 필요 전체: top 2 row만 펼침
- 새 공식 정보: summary count + 대표 1개
- Analysis 재검토: count + 대표 1개
- 다음 확인 시점: 오늘/이번 주만 펼침
- 현재 변화 없음: 기본 접힘
- 사용자 지정 목록: 기본 접힘
- 추적 보류 / 종료: 기본 접힘
- Empty State 모음: 별도 view에서만 표시

CTA 제거:

- 각 row의 반복 CTA를 `달라진 내용 확인하기` 또는 `분석 다시 보기` 중 하나로 제한.
- `새 근거 보기`는 Evidence summary 안에서만 제공.
- Empty State 모음의 CTA들은 default view에서 제거.

Section Merge:

- `새 공식 정보 있음` + `Analysis 재검토 필요` → `다시 볼 이유`
- `다음 확인 시점` + `현재 변화 없음` → `다음까지 유지할 대상`
- `사용자 지정 목록` + `추적 보류 / 종료` → `목록 관리`

Hero 높이 줄이기:

- Summary panel 제거 또는 fold 이후 이동.
- badge 4개를 3개로 줄인다. `전체 n개`는 H1 아래 meta로 흡수.

30% 축소 가능성:

- 가능. 목표 13,133px.
- Empty State 모음 제거, 목록 관리 접힘, 다시 볼 이유 병합으로 45~55% 축소 가능.

한 손 사용 평가:

- 현재: 낮음.
- 개선 후: 좋음.
- 이유: lead item과 확인 CTA가 첫 화면 안에 남고, 관리성 섹션은 뒤로 밀린다.

## 4.8 Search

현재 Mobile:

- Scroll height: 8,104px
- Control count: 34
- 문제: 검색 결과 화면인데 자동완성, 정확 결과, 종목, 기업, 테마, 공식 근거, 분석, 최근 검색 관리가 모두 펼쳐져 있다.

Top3만 남길 정보:

1. 검색 입력
2. 가장 정확한 결과
3. 결과 유형별 다음 이동 CTA

Fold 이전:

- Search input
- 검색 대상 안내는 축약
- 가장 정확한 결과 1개
- CTA: `종목 보기`, `공식 근거 보기`

Fold 이후:

- 입력 중 후보
- 종목 결과
- 기업 결과
- 테마 결과
- 공식 근거 결과
- 분석 결과
- 최근 검색 관리

접힘 제안:

- 입력 중 후보는 query 입력 중에만, 결과 화면에서는 숨김.
- 각 결과 group은 top 2개만 노출.
- 기업/테마/분석은 결과가 검색어와 직접 관련 있을 때만 펼침.
- 최근 검색 관리는 idle 상태에서만 노출.

CTA 제거:

- 결과가 있는 상태에서는 Hero의 `현재 검색 다시 보기` 제거 가능.
- 각 stock result에서 `추적 설정하기`, `공식 근거 보기`, `분석 보기`를 모두 노출하지 않고 primary + overflow action으로 축소.
- NextActionSection은 이미 결과 화면에서 제거됐으므로 유지.

Section Merge:

- `정확한 결과` + `종목 결과 첫 row`는 같은 대상이면 병합.
- `기업 결과` + `테마 결과`는 `관련 맥락`으로 묶을 수 있다.
- `공식 근거` + `분석`은 `확인과 이어보기`로 묶을 수 있다.

Hero 높이 줄이기:

- Summary panel은 검색 전 상태에서만 노출.
- 결과 상태에서는 input + exact result 중심으로 변경.

30% 축소 가능성:

- 가능. 목표 5,673px.
- 자동완성 숨김, exact/stock 병합, 최근 검색 idle 전용화로 35~40% 축소 가능.

한 손 사용 평가:

- 현재: 보통.
- 개선 후: 좋음.
- 이유: 검색 결과 진입 후 첫 결과 CTA까지 이동 거리가 짧아진다.

## 5. Fold Reallocation Summary

| Screen | Fold 이전에 남길 것 | Fold 이후로 내릴 것 |
| --- | --- | --- |
| Home | 오늘 공식 변화, 확인 상태, 대표 CTA | 검색, 시장 기준점, 테마/종목, 기록 |
| Market | Top market change, 기준점 요약, 관련 종목 CTA | Timeline, 관계 흐름, Empty State |
| Stock | 종목 상태, 대표 근거, 미확인 1개 | Evidence stack, 시장 반응, Timeline |
| Evidence | 출처, 공식 사실, 단정 불가 | 해석 범위, 관련 대상, 시장 반응, 연결 근거 |
| Analysis | 현재 질문, 새 근거/조건, 다음 확인 | Facts, Observation, History, Related |
| Changes | Top change, 분석 영향, 정정 여부 | 전체 변화, 공식 정보, 적용 완료, 다음 확인 |
| Watchlist | Lead item, 확인 이유, 다음 CTA | 목록 관리, 보류/종료, Empty State 모음 |
| Search | 입력, 정확 결과, 상세 이동 CTA | 최근 검색, 보조 결과 group |

## 6. Accordion / Summary / Collapsed State Plan

우선순위 1:

- Watchlist: `다시 볼 이유`, `다음까지 유지할 대상`, `목록 관리`
- Changes: `다른 변화`, `새 공식 정보 / 정정`, `남은 미확인과 다음 확인`
- Analysis: `근거와 관찰`, `다른 해석과 가설`, `관련 대상과 변경 이력`

우선순위 2:

- Evidence: `해석의 한계`, `관련 대상`, `공개 이후 참고 흐름`
- Search: `관련 맥락`, `확인과 이어보기`, `최근 검색 관리`
- Market: `시장 기준점`, `시장 연결 흐름`

우선순위 3:

- Home: `시장 기준점`, `관련 대상`, `내가 이어서 볼 내용`
- Stock: `다른 근거`, `가격과 시간 흐름`, `관련 기업`

Collapsed State 기본 문구 원칙:

- 접힌 제목은 개수와 이유를 포함한다.
- 예: `다른 변화 4개`, `새 공식 근거 3개`, `현재 변화 없음 2개`, `관련 기업 3개`
- 접힘 상태에서도 사용자가 놓치면 안 되는 위험 신호는 badge로 남긴다.

## 7. Duplicate CTA Removal

우선 제거 후보:

1. Home의 반복 `근거 보기`
2. Market 하단 `공식 근거 보기`
3. Stock의 `관련 기업 보기`와 `관련 기업 비교하기` 중복
4. Evidence Hero의 `관련 종목 보기`
5. Analysis Hero의 `관련 종목 보기`
6. Changes list item마다 반복되는 `새 근거 보기`
7. Watchlist row마다 반복되는 `새 근거 보기`
8. Search result row의 4개 CTA 동시 노출
9. Search 결과 상태의 최근 검색 관리
10. Empty State 모음의 모든 CTA default 노출

CTA 목표 수:

| Screen | 현재 Control Count | 목표 Control Count |
| --- | ---: | ---: |
| Home | 20 | 12 이하 |
| Market | 10 | 8 이하 |
| Stock | 18 | 10 이하 |
| Evidence | 15 | 9 이하 |
| Analysis | 32 | 16 이하 |
| Changes | 28 | 14 이하 |
| Watchlist | 60 | 22 이하 |
| Search | 34 | 16 이하 |

## 8. Section Merge Plan

| Screen | Merge Candidate | Merge Result |
| --- | --- | --- |
| Home | 테마 + 많이 보는 종목 | 관련 대상 |
| Home | 관심 종목 변화 + 이어서 분석 | 내가 이어서 볼 내용 |
| Market | 시장 흐름 + 시장 간 연결 | 시장 연결 흐름 |
| Market | 관련 테마 + 관련 종목 | 관련 대상 |
| Stock | 시장 반응 + Timeline | 가격과 시간 흐름 |
| Evidence | Quick view + 공식 사실 | 확인 가능한 내용 |
| Evidence | 단정 불가 + 해석 범위 | 해석의 한계 |
| Analysis | Facts + Observation | 근거와 관찰 |
| Analysis | Alternatives + Hypotheses | 다른 해석과 가설 |
| Analysis | Conditions + Next | 다시 볼 조건과 다음 확인 |
| Changes | Official Evidence + Corrections | 새 공식 정보 / 정정 |
| Changes | Unresolved + Next Checks | 남은 미확인과 다음 확인 |
| Watchlist | 새 공식 정보 + Analysis 재검토 | 다시 볼 이유 |
| Watchlist | 다음 확인 + 현재 변화 없음 | 다음까지 유지할 대상 |
| Search | 정확한 결과 + 동일 종목 결과 | 가장 정확한 결과 |
| Search | 기업 + 테마 | 관련 맥락 |

## 9. Hero Height Reduction

공통 Hero 압축 기준:

- H1은 유지한다.
- 설명 문장은 1문장으로 제한한다.
- Hero metric badge는 최대 3개.
- Hero CTA는 최대 2~3개.
- aside panel은 모바일에서 숨기거나 compact meta row로 전환한다.

화면별 Hero 압축 우선순위:

1. Watchlist: aside summary panel 제거 또는 fold 이후 이동
2. Changes: summary panel을 badge row로 전환
3. Evidence: source panel을 compact meta row로 전환
4. Analysis: state panel을 compact meta row로 전환
5. Market: 시장 상태 panel을 현재 상태 1개만 노출
6. Search: 결과 상태에서는 summary panel 제거
7. Home: 검색 box를 fold 이후로 이동
8. Stock: quote panel을 compact quote로 전환

## 10. Desktop vs Mobile Density

Desktop:

- 긴 세로 흐름이지만 1440px에서는 두 column이나 grid 덕분에 아직 읽을 수 있다.
- 문제는 "정보가 많다"보다 "모든 화면이 비슷한 검토 문서처럼 보인다"는 점이다.
- Desktop에서는 접힘보다 section merge가 더 중요하다.

Mobile:

- overflow는 없지만 scroll height가 지나치게 길다.
- 한 손 사용에서는 "첫 화면 CTA 이후 다음 핵심 섹션까지의 거리"가 가장 중요하다.
- Mobile에서는 접힘과 hero 압축이 먼저다.
- 특히 Watchlist, Changes, Analysis는 mobile-first section order를 별도로 가져야 한다.

Density 차이:

| Screen | Desktop 판단 | Mobile 판단 |
| --- | --- | --- |
| Home | 읽을 수 있음 | 검색 box가 fold를 밀어냄 |
| Market | 구조는 명확 | 너무 긴 시장 설명 흐름 |
| Stock | 가장 안정적 | Evidence stack만 줄이면 좋음 |
| Evidence | 신뢰는 강함 | 검증 항목이 과하게 길다 |
| Analysis | 도구성은 강함 | 편집 핵심까지 도달이 늦다 |
| Changes | 비교 의도는 보임 | 너무 긴 변화/상태 목록 |
| Watchlist | 정보 풍부 | 과밀, 한 손 사용 낮음 |
| Search | 결과 다양성 좋음 | 검색 결과가 너무 많은 그룹으로 분산 |

## 11. One-Hand Use Evaluation

평가 기준:

- 첫 화면에서 핵심 대상이 보이는가
- Primary CTA가 엄지 영역에 빠르게 도달하는가
- 다음 핵심 섹션까지 스크롤이 짧은가
- CTA가 너무 많아 선택 부담이 생기지 않는가

| Screen | 현재 평가 | 개선 후 예상 | 이유 |
| --- | --- | --- | --- |
| Home | 좋음 | 매우 좋음 | 검색 box를 내리면 CTA 집중도가 오른다. |
| Market | 보통 | 좋음 | Top change와 관련 종목만 남기면 이동이 빨라진다. |
| Stock | 좋음 | 매우 좋음 | 대표 근거만 남기면 가장 안정적인 화면이 된다. |
| Evidence | 보통 | 좋음 | 공식 사실/한계 중심으로 줄이면 확인 행동이 빨라진다. |
| Analysis | 보통 | 좋음 | 현재 질문과 수정 CTA가 위로 올라와야 한다. |
| Changes | 낮음 | 보통+ | top change 외 목록을 접어야 한다. |
| Watchlist | 낮음 | 좋음 | lead item 중심으로 줄이고 관리 섹션을 접어야 한다. |
| Search | 보통 | 좋음 | exact result와 stock result를 병합하면 좋아진다. |

## 12. 30% Reduction Feasibility

| Screen | 현재 Mobile | 목표 | 주요 방법 | 예상 축소 |
| --- | ---: | ---: | --- | ---: |
| Home | 5,936px | 4,155px | 검색 box 이동, 시장 기준점 접힘, 관련 대상 병합 | 30~35% |
| Market | 8,706px | 6,094px | Timeline/관계 병합, Empty State 숨김 | 35% |
| Stock | 5,471px | 3,830px | Evidence stack 접힘, Timeline 병합 | 30% |
| Evidence | 7,958px | 5,571px | Quick view 병합, 관련 대상/반응 접힘 | 35~40% |
| Analysis | 9,250px | 6,475px | 근거/관찰 병합, history 접힘 | 35% |
| Changes | 14,052px | 9,836px | 다른 변화/정정/미확인 접힘 | 40%+ |
| Watchlist | 18,761px | 13,133px | Empty State 제거, 목록 관리 접힘, 섹션 병합 | 45~55% |
| Search | 8,104px | 5,673px | 자동완성 숨김, 결과 병합, 최근 검색 idle 전용 | 35~40% |

결론:

- 8개 화면 모두 30% 축소 가능하다.
- 가장 큰 효과는 Watchlist와 Changes에서 나온다.
- Stock은 이미 상대적으로 안정적이라 축소 폭은 30% 근처가 적절하다.

## 13. Revised UX Score

현재 점수:

- 81 / 100

Information Density Sprint 문서 기준 잠재 개선 점수:

- 구현 전: 81 / 100 유지
- 제안 반영 후 예상: 86 / 100

항목별 예상 변화:

| 항목 | 현재 | 제안 반영 후 | 이유 |
| --- | ---: | ---: | --- |
| 첫 진입 이해도 | 86 | 88 | Top3 중심으로 메시지가 더 선명해진다. |
| 정보 탐색 속도 | 78 | 86 | 접힘과 병합으로 스캔 속도가 오른다. |
| 모바일 사용성 | 73 | 84 | scroll height 30% 이상 감소 가능. |
| CTA 명확성 | 80 | 85 | 반복 CTA 제거로 선택 부담 감소. |
| 책임 분리 | 68 | 75 | 섹션 병합과 정보 경계가 명확해진다. |
| DATE 차별성 | 85 | 86 | 근거 중심은 유지하고 반복 설명만 줄인다. |

최종 판단:

- 이번 Sprint는 구현이 아니라 감사 단계이므로 공식 UX Score는 81 / 100이다.
- 다만 문서의 density 기준을 적용하면 86 / 100까지 올릴 수 있다.

## 14. Next Implementation Priority

코드 수정 단계로 넘어간다면 순서는 다음이 적절하다.

1. Watchlist density reduction
2. Changes density reduction
3. Analysis mobile priority reorder
4. Search result group compression
5. Evidence detail compression
6. Market section merge
7. Home fold cleanup
8. Stock evidence stack cleanup

가장 먼저 할 일:

- Watchlist에서 Empty State 모음과 목록 관리 섹션을 default view에서 접는다.
- Changes에서 Top Change 외 변화 목록을 접는다.
- Search에서 exact result와 동일 stock result를 병합한다.

## 15. Final Recommendation

Prototype B의 다음 병목은 기능 부족이 아니라 정보량이다.

사용자가 한 화면에서 배워야 하는 개념이 너무 많다. 각 화면은 이미 좋은 내용을 갖고 있지만, 모든 내용을 동시에 펼쳐 보여주기 때문에 "무엇을 먼저 봐야 하는지"가 약해진다.

다음 구현 Sprint에서는 다음 원칙을 고정한다.

- 화면마다 fold 이전 Top3만 남긴다.
- Watchlist와 Changes는 반드시 30% 이상 줄인다.
- Evidence 문장은 여러 화면에서 반복하지 않는다.
- Mobile에서는 접힘이 기본이고 Desktop에서는 병합이 기본이다.
- CTA는 적을수록 강하다.
