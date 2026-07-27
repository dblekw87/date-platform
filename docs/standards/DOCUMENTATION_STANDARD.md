# DATE Documentation Standard 문서

## 목적

이 문서는 DATE 프로젝트의 모든 Research, Product, UX, Information Architecture, Entity Architecture, Navigation, Design Strategy 문서에 적용되는 공통 Documentation Standard를 정의한다.

## 문서 계층 구조

- `docs/standards/`: 문서 작성 표준과 공식 용어를 관리한다.
- `docs/date/research/`: DATE Research 기준 문서와 Phase별 Research 산출물을 관리한다.
- `docs/date/research/benchmarks/{service}/`: 개별 Benchmark Observation과 Review 문서를 관리한다.
- `docs/date/research/principles/`: Cross Benchmark Candidate Principle Registry를 관리한다.

## Markdown Heading 규칙

- H1, H2, H3는 한국어 설명을 기본으로 작성한다.
- `Observation`, `Interpretation`, `Evidence`, `Confidence`, `Candidate Principle`, `DATE Implication`처럼 Framework field는 영어를 유지한다.
- ID Heading은 `H-001`, `S-001`, `P-001`처럼 유지할 수 있다.
- Screen명, Service명, Product명은 원문 명칭을 유지할 수 있다.

## Table 규칙

- Table column은 Framework 용어를 영어로 유지할 수 있다.
- Table cell의 설명 문장은 한국어로 작성한다.
- 평가 값은 `High`, `Medium`, `Low`, `Pending`, `Not Verified`처럼 Registry에서 정의한 값을 유지한다.
- Table은 Research 결과를 요약할 뿐 자동 결론 기준으로 사용하지 않는다.

## Mermaid Diagram 규칙

- Mermaid Diagram은 실제 확인된 관계만 solid edge로 작성한다.
- Partial, Inferred, Not Verified 관계는 dashed edge 또는 label로 구분한다.
- Diagram 아래에는 검증 수준과 한계를 한국어로 설명한다.
- Diagram은 Product Architecture 확정안으로 사용하지 않는다.

## Observation 작성 규칙

- `Observation`에는 실제 확인한 사실만 작성한다.
- 추론, 의도, DATE 적용 의견을 섞지 않는다.
- URL, 화면 위치, 메뉴 위치, 확인 날짜, 접근 제한 중 하나 이상의 Evidence를 연결한다.
- 확인하지 못한 항목은 `Not Verified`, `Unavailable`, `Login Required`, `Paid Required`로 표시한다.

## Interpretation 작성 규칙

- `Interpretation`은 Observation을 바탕으로 한 해석이다.
- 왜 그런 구조를 사용했는지에 대한 Why를 포함한다.
- 단정 표현을 피하고 "~일 수 있다", "~로 해석된다"를 사용한다.
- DATE 적용 여부를 확정하지 않는다.

## Evidence 작성 규칙

- `Evidence`에는 공식 화면, 공식 문서, 화면 위치, 접근 조건, 기존 Research 문서 링크를 기록한다.
- Secondary Source는 공식 Observation과 분리한다.
- Evidence가 부족한 항목은 Hypothesis 또는 Open Question으로 낮춘다.

## Candidate Principle 작성 규칙

Candidate Principle은 다음 구조를 따른다.

- Principle ID
- Observation
- Supporting Evidence
- Interpretation
- Candidate Principle
- User Benefit
- Potential Trade-off
- Needs Cross Validation
- Candidate Validation Targets
- DATE Implication
- Confidence

모든 Candidate Principle은 Cross Validation 전까지 확정하지 않는다.

## Registry 작성 규칙

Registry는 다음 column을 사용한다.

| Principle ID | Candidate Principle | Category | Source Benchmarks | Supporting Benchmarks | Contradicting Benchmarks | Confidence | Cross Validation Status | Evidence References | Notes |
| ------------ | ------------------- | -------- | ----------------- | --------------------- | ------------------------ | ---------- | ----------------------- | ------------------- | ----- |

`Confirmed Benchmarks`라는 표현은 사용하지 않는다. `Supporting Benchmarks`와 `Cross Validation Status`로 구분한다.

## README 작성 규칙

README는 다음 구조를 따른다.

- `# 문서 목적`
- `## 범위`
- `## 문서 구성`
- `## 작성 규칙`
- `## 관련 문서`
- `## 주의사항`

README에는 새로운 Research 결과를 추가하지 않는다. 문서 사용법과 범위만 설명한다.

## Quality Review 작성 규칙

Quality Review 문서는 다음을 포함한다.

- Review Scope
- 주요 Finding
- 수정 내용
- Confidence 변경
- 남아 있는 제한사항
- 완료 판단

Quality Review는 Research 결과를 변경하지 않고 문서 품질과 Evidence 수준만 정리한다.

## 한국어 / 영어 사용 기준

- 설명, 본문, 요약, Review, 결론, 주의사항은 한국어로 작성한다.
- Framework 용어는 영어로 유지한다.
- 파일명과 폴더명은 영어 kebab-case를 유지한다.
- DATE Architecture, IA, Navigation, Entity Model은 Research 완료 전 확정 표현으로 작성하지 않는다.
