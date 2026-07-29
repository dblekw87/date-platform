# Phase 17.2 Home Content Shell

## Phase 목적

Phase 17.2는 DATE의 첫 화면을 Dashboard가 아닌 Market Entry Page로 검증하기 위한 Home Content Shell 구현 산출물이다.

## `/` Home 역할

`/`는 일반 사용자가 오늘 시장, 대표 시장, 핵심 Evidence, Monitoring 상태를 빠르게 읽고 Research로 진입하는 콘텐츠 중심 Home이다.

## `/research` 역할

`/research`는 기존 Dashboard Workspace Wireframe을 보존한 전문 분석용 Research 화면이다.

## Viewport 목록

- 1920x1080
- 1440x900
- 1024x768
- 768x1024
- 390x844
- 320x568

## 광고 슬롯 정책

Native Advertisement Placeholder는 Today's Evidence 이후, Today's Monitoring 이전에 배치한다.
Optional Right Advertisement Rail은 wide desktop에서만 표시하고 1440px 이하에서는 제거한다.

## Drawer / Bottom Sheet 동작

Evidence 선택 시 Home에는 상시 Context Panel을 유지하지 않는다.
Desktop과 tablet에서는 Evidence Drawer로 열고, mobile에서는 Bottom Sheet로 연다.

## Mock / Prototype 데이터

모든 시장 값, 등락, 상태, 업데이트 시간, 광고 영역은 Mock 또는 Prototype 데이터다.
실시간 시장 데이터, 실제 광고, backend, authentication은 연결하지 않았다.

## Wireframe에서 확정된 항목

- Home과 Research 역할 분리
- Home 콘텐츠 순서
- Hero 내부 Search
- Market Snapshot 항목
- Evidence 이후 Native Ad 위치
- Wide Desktop 조건부 Ad Rail
- Evidence Drawer / Bottom Sheet
- 반응형 콘텐츠 우선순위

## 디자이너가 결정할 항목

- 브랜드 컬러
- Typography
- Spacing refinement
- Hero visual treatment
- Card와 List의 최종 표현
- 상태 및 등락 표현
- 광고 Placeholder의 시각적 처리
- Motion
- Iconography
- Glass / Soft Neumorphism 적용 여부와 강도
