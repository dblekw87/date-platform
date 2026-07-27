# DATE Product Research Plan 문서

## Product Descriptor 설명

**DATE — 투자 근거 연결 플랫폼**

DATE는 기존 Invest Community를 개발하거나 개선하는 프로젝트가 아니다. DATE는 새로운 투자 플랫폼을 처음부터 설계하는 프로젝트다. 기존 구조, 코드, 문서, 메뉴, 페이지, 도메인 구조는 이번 작업의 기준으로 사용하지 않는다.

## 역할 범위

이번 Research Foundation 작업은 다음 역할 관점을 동시에 사용한다.

- Senior Product Designer
- Senior UX Architect
- Senior Information Architect
- Senior Frontend Architect
- Product Researcher

이번 단계에서는 개발, UI 설계, 화면 목업, API 설계, 데이터베이스 스키마 설계를 수행하지 않는다.

## 프로젝트 원칙

DATE는 다음 전체 구조를 처음부터 다시 설계한다.

- Product Research
- UX Architecture
- Information Architecture
- Entity Architecture
- Navigation
- Screen System
- Design Strategy

원칙:

- 기존 Invest Community의 구조를 기본값으로 사용하지 않는다.
- 기존 페이지를 이름만 바꾸어 재사용하지 않는다.
- 기능 목록부터 만들지 않는다.
- 경쟁 서비스 화면을 단순 복제하지 않는다.
- UI의 외형보다 왜 그렇게 설계되었는지를 분석한다.
- Research가 완료되기 전에 IA, Navigation, Entity, Screen System을 확정하지 않는다.

## 필수 Benchmark

다음 서비스는 반드시 분석 대상에 포함한다.

- EidosLayer
- TradingView
- Koyfin
- Finviz
- Yahoo Finance
- Bloomberg Terminal — UX 관점

Benchmark 분석은 기능 목록이 아니라 다음 설계 이유를 중심으로 수행한다.

- 왜 Search가 중심인가.
- 왜 Entity 중심 구조를 사용하는가.
- 왜 Card, Table, Chart, Panel을 구분하는가.
- 왜 높은 정보 밀도에도 복잡하지 않은가.
- 왜 특정 Navigation 구조를 사용하는가.
- 왜 사용자의 현재 분석 컨텍스트가 유지되는가.
- 왜 Watchlist, Workspace, Dashboard가 Navigation 역할까지 수행되는가.
- 왜 특정 정보는 새 페이지가 아니라 Side Panel이나 Overlay로 제공되는가.
- 왜 전문 사용자는 학습 비용이 높은 인터페이스도 계속 사용하는가.

## Phase 0 범위

이번 작업은 **Phase 0 — Research Foundation**만 수행한다. 실제 경쟁 서비스 전체 분석은 완료하지 않는다. 목적은 다음 Research 작업이 동일한 기준으로 수행될 수 있도록 조사 기반을 만드는 것이다.

Phase 0 산출물:

1. DATE Product Hypothesis Register
2. User Archetype Hypotheses
3. Investment Decision Journey Candidates
4. Benchmark Evaluation Framework
5. Screen Research Template
6. Benchmark Access Scope and Research Scenarios

추가로 Research Foundation의 범위와 원칙을 설명하는 Research Brief와 README를 작성한다.

## 필수 문서 구조

```text
docs/
  date/
    research/
      DATE_PRODUCT_RESEARCH_PLAN.md
      README.md
      00-research-brief.md
      01-product-hypothesis-register.md
      02-user-archetype-hypotheses.md
      03-investment-decision-journey-candidates.md
      04-benchmark-evaluation-framework.md
      05-screen-research-template.md
      06-benchmark-scope-and-scenarios.md
```

DATE 문서는 기존 Invest Community 문서와 명확히 분리한다.

## Research 기록 원칙

관찰과 해석을 명확히 분리한다. 확인하지 못한 사항은 추정으로 기록한다. 유료 기능이나 로그인 제한으로 확인하지 못한 구조를 사실처럼 작성하지 않는다.

권장 기록 형식:

```text
Observation:
실제 화면에서 확인한 사실

Interpretation:
해당 구조를 사용한 이유에 대한 해석

User Impact:
사용자 행동과 판단에 미치는 영향

DATE Implication:
DATE 설계에 적용 가능한 시사점

Confidence:
High / Medium / Low

Evidence:
URL, 화면 위치, 캡처 또는 확인 근거
```

## Phase 0 금지 사항

이번 작업에서는 다음을 수행하지 않는다.

- 애플리케이션 코드 수정
- 컴포넌트 생성
- 라우트 생성
- API 설계
- Database Schema 설계
- UI Mockup 제작
- 디자인 토큰 정의
- 최종 IA 작성
- 최종 Navigation 작성
- 최종 Entity Model 작성
- 최종 Screen System 작성
- 기존 프로젝트 리팩터링
- 기존 파일 삭제
- 기존 브랜치 병합
- Commit
- Push

## 품질 기준

산출물은 다음 조건을 만족해야 한다.

- 기존 Invest Community 구조를 정답으로 전제하지 않는다.
- 모든 가설은 검증 가능한 문장으로 작성한다.
- 관찰 사실과 해석을 분리한다.
- 경쟁 서비스 기능을 단순 나열하지 않는다.
- Research 완료 전 결론을 확정하지 않는다.
- 각 문서가 다음 Research 단계에서 바로 사용 가능해야 한다.
- 중복된 설명을 최소화한다.
- 용어를 문서 전체에서 일관되게 사용한다.
- DATE와 Invest Community의 문서 경계를 명확하게 유지한다.
