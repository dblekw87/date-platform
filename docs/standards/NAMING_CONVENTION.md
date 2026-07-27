# DATE Naming Convention 문서

## 목적

이 문서는 DATE 프로젝트 문서의 파일명, 폴더명, ID, Registry naming 규칙을 정의한다.

## 파일명 규칙

- Markdown 파일명은 영어 kebab-case를 사용한다.
- Phase 순서가 있는 문서는 두 자리 번호 prefix를 사용한다.
- 예: `01-product-hypothesis-register.md`
- 파일명은 변경하지 않는 것을 원칙으로 한다.

## 폴더명 규칙

- 폴더명은 영어 kebab-case 또는 서비스 공식 lowercase name을 사용한다.
- Benchmark 폴더는 `docs/date/research/benchmarks/{service}/` 구조를 사용한다.
- Service 폴더명은 공식 서비스명을 소문자로 정규화한다.

## Scenario ID 규칙

- Scenario ID는 `S-001` 형식을 사용한다.
- 같은 문서 안에서 중복하지 않는다.
- Scenario 설명은 ID 뒤에 한국어로 작성할 수 있다.

## Principle ID 규칙

- Candidate Principle ID는 `P-001` 형식을 사용한다.
- Registry와 개별 Benchmark 문서에서 같은 ID를 사용한다.
- 삭제된 ID는 재사용하지 않는다.

## Hypothesis ID 규칙

- Product Hypothesis ID는 `H-001` 형식을 사용한다.
- Hypothesis Register의 ID는 Evidence Log에서 그대로 참조한다.
- Status는 별도 Registry 또는 Evidence Log에서 업데이트 제안만 기록한다.

## Entity ID 규칙

- Entity ID는 아직 확정하지 않는다.
- Entity Architecture Research 전까지 Entity name은 Candidate로 기록한다.
- 실제 Product ID schema는 별도 Architecture 단계에서 결정한다.

## Benchmark 디렉터리 규칙

Benchmark 디렉터리는 다음 구조를 따른다.

```text
docs/date/research/benchmarks/{service}/
  README.md
  00-access-and-method.md
  01-product-surface-map.md
  02-navigation-map.md
  ...
```

## README 규칙

- 모든 주요 디렉터리는 README를 가진다.
- README는 문서 목적, 범위, 문서 구성, 작성 규칙, 관련 문서, 주의사항을 포함한다.
- README는 Research 결과를 확정하거나 새 Observation을 추가하지 않는다.

## 번호 규칙

- `00`은 접근 방법, brief, method처럼 전체 기준 문서에 사용한다.
- `01` 이후는 Research 진행 순서에 맞춘다.
- 중간 Phase 추가가 필요하면 소수점 Phase 이름은 문서 제목에만 쓰고 파일 번호는 다음 번호를 사용한다.
