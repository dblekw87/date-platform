# DATE Writing Guideline 문서

## 목적

이 문서는 DATE 문서의 문체, 문장 길이, 확정 표현 금지, Framework 용어 사용 기준을 정의한다.

## 기본 원칙

- 설명은 한국어로 작성한다.
- Framework 용어는 영어로 유지한다.
- 파일명은 영어로 유지한다.
- Heading은 한국어 설명을 기본으로 한다.
- `Observation`, `Interpretation`, `Evidence`, `Confidence`, `Candidate Principle`, `DATE Implication`은 영어로 유지한다.

## 문장 길이

한 문장은 가능한 짧게 작성한다. 하나의 문장에는 하나의 판단만 담는다.

## 추측 표현

추측은 "~일 수 있다", "~로 보인다", "~로 해석된다"로 작성한다.

## 확정 표현

확정 표현은 Observation에서 실제 확인한 사실에만 사용한다. Interpretation, Implication, Candidate Principle에서는 확정 표현을 피한다.

## Interpretation 작성

Interpretation은 Why를 반드시 포함한다. 단순히 기능을 다시 설명하지 않는다.

## DATE 표현 규칙

DATE에 대해 다음 표현을 금지한다.

- DATE는 Search 중심으로 설계한다.
- DATE는 Entity 중심 구조를 사용한다.
- DATE는 Evidence Graph를 사용한다.
- DATE의 Home은 Market Discovery다.

허용되는 표현은 다음과 같다.

- DATE에서 검토할 가치가 있다.
- Cross Validation이 필요하다.
- 특정 User Journey에서 유효할 가능성이 있다.
- 적용 전 Trade-off 검증이 필요하다.

## Observation과 Interpretation 분리

`Observation`에는 실제 확인한 사실만 작성한다. 이유, 의도, 사용자 영향은 `Interpretation` 또는 `User Impact`에 작성한다.

## Evidence 표현

Evidence가 부족한 경우 `Not Verified`, `Insufficient`, `Partial`을 사용한다. 부족한 Evidence를 확정된 사실처럼 보완하지 않는다.

## Review 문체

Review는 발견한 문제, 수정한 내용, 남은 제한사항을 분리한다. Research 결과를 변경하지 않는다.
