# KR Experience Overview

## 문서 목적

이 문서는 DATE Prototype B를 만들기 위한 한국형 투자 UX 재설계 기준을 정의한다.

Prototype B는 Prototype A를 한국어로 번역한 버전이 아니다. Prototype A에서 검증한 Product Principles, Entity Architecture, Evidence Architecture, Source / Freshness / Boundary 원칙, Research / Monitoring / Journal 책임 분리, Core Domain 관계, 사용자 흐름은 유지한다. 화면의 정보 구조와 표현 방식은 한국 투자자 관점에서 다시 설계한다.

## Prototype A 보존 기준

- Freeze Commit: `095a9aa0efff4a66e869d2f407962d45cc0f922d`
- Freeze Tag: `date-v1-global-wireframe-freeze`
- Prototype A 기존 route와 파일은 수정하지 않는다.
- Prototype B 구현은 `/kr` 하위 route에서만 진행한다.

## Prototype B 정의

Prototype B는 한국 투자자가 처음 서비스를 열었을 때 오늘 시장, 주요 변화, 관련 종목, 움직인 이유, 확인된 투자 근거, 아직 확인이 필요한 내용을 자연스럽게 이해하도록 돕는 한국형 투자 서비스 와이어프레임이다.

## 제품 인상

- 처음 들어와도 어렵지 않다.
- 전문적이지만 딱딱하지 않다.
- 정보가 많아도 읽는 순서가 분명하다.
- 주식 초보와 숙련 투자자가 함께 사용할 수 있다.
- 금융 포털보다 친절하고 증권 HTS보다 가볍다.
- 토스증권처럼 이해하기 쉽지만 지나치게 단순하지 않다.
- 네이버 증권처럼 정보 접근성이 높지만 복잡하게 나열하지 않는다.
- 증권플러스처럼 시장과 테마 탐색이 자연스럽다.
- DATE의 투자 근거 우선 원칙을 유지한다.

## 유지하는 것

- 투자 근거 우선 구조
- 종목과 기업의 내부 책임 분리
- 출처, 정보 최신성, 해석 범위 원칙
- 분석, 변화, 기록의 책임 분리
- Home → Market → Entity → Evidence → Analysis → Change → Record 흐름

## 새로 설계하는 것

- 사용자 화면 언어
- Global Navigation
- Home 정보 순서
- 시장 탐색 방식
- 종목 상세의 탭과 요약 구조
- 투자 근거 상세의 한국어 설명 구조
- 모바일 중심 흐름
- 카드, 목록, 탭, 표 사용 기준
- 안내 문구와 상태 문구

## 이번 Phase 범위

이번 Phase에서는 문서만 작성한다. `/kr` route 구현, 화면 구현, 기존 Prototype A 수정, Component Extraction, Design Token 구현, High Fidelity 디자인, 실제 API, Backend, Authentication은 수행하지 않는다.
