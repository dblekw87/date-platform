# KR Analysis Interaction Planner

## 1. 목적

이 문서는 KR Analysis Low-Fi Experience 이후 단계에서 필요한 상호작용 정책을 정의한다.

이번 문서는 화면 구현, API, 저장소, 인증, 데이터베이스, Journal 구현을 다루지 않는다. 목적은 사용자가 분석을 읽고, 작성하고, 수정하고, 투자 근거를 연결하고, 저장 상태를 이해하고, 변경 이력을 남기며, 특정 시점의 판단을 기록으로 보존하는 흐름의 경계를 정하는 것이다.

분석은 투자 결론을 내려주는 화면이 아니다. 분석은 사용자가 다음 내용을 분리해서 관리하도록 돕는 개인 판단 구조이다.

```text
공식 사실
→ 시장 관찰
→ 사용자 해석
→ 다른 해석 가능성
→ 현재 가설
→ 미확인 내용
→ 판단 변경 조건
→ 투자 근거
→ 신뢰 판단
→ 기록 Snapshot
```

## 2. 현재 구현 기준

현재 기준 Commit은 `0981b355506bed008a1d6a93ae0c5e0c021e5fc2`이다.

확인한 구현과 문서:

- `docs/date/kr-experience/KR_ANALYSIS_EXPERIENCE_PLANNER.md`
- `app/kr/analysis/page.tsx`
- `app/kr/analysis/analysis-mock-data.ts`
- `app/kr/analysis/page.module.scss`
- `app/kr/evidence/page.tsx`
- `app/kr/_components/design-language.tsx`

현재 Low-Fi에서 확정된 기준:

- Analysis 기본 단위는 종목 중심이다.
- 대표 종목 1개와 관련 종목 여러 개를 허용한다.
- 투자 근거는 Section 단위로 연결한다.
- 문장 단위 Annotation은 아직 구현하지 않는다.
- 상태별 Section Ordering은 이미 구현되어 있으며 이 문서에서 다시 설계하지 않는다.
- unknown Analysis는 Hero 다음 Empty State를 즉시 노출한다.
- Mobile에서는 다른 해석 가능성, 현재 가설, 관련 대상, 변경 이력을 기본 접기 구조로 둔다.
- 접기 상태는 URL에 저장하지 않는다.
- 초기 접기 상태는 Component Local State로 처리한다.

현재 구현의 Analysis 상태:

- 작성 중
- 근거 확인 중
- 추가 확인 필요
- 새 근거 검토 필요
- 현재 판단 유지
- 판단 수정 필요
- 검토 완료
- 종료

이 문서에서는 사용자가 직접 관리하는 Lifecycle 상태와 시스템이 알려주는 Attention Signal을 분리한다.

## 3. UX 원칙

1. 공식 사실과 사용자 해석은 같은 입력 영역에 섞지 않는다.
2. 사용자가 Analysis 상태와 신뢰 판단의 최종 결정권을 가진다.
3. 시스템은 Attention Signal과 변경 제안만 제공한다.
4. 투자 근거는 우선 Section 단위로 연결한다.
5. 문장 단위 Annotation은 향후 확장 범위로 둔다.
6. Read Mode와 Edit Mode를 명확히 분리한다.
7. Snapshot은 원본 Analysis와 분리된 시점 기록이다.
8. Snapshot은 기본적으로 불변 기록으로 취급한다.
9. 원본 Analysis는 Snapshot 생성 이후에도 계속 수정할 수 있다.
10. 저장 실패, Conflict, Offline 상태는 사용자의 작성 내용을 잃지 않는 방향으로 처리한다.
11. 모바일에서는 전체 문서 편집보다 Section 단위 짧은 수정과 확인을 우선한다.
12. 투자 추천, 매수·매도 유도, 목표가, 수익 가능성 표현은 금지한다.

## 4. 주요 사용자 시나리오

### 시나리오 A: 종목에서 분석 시작

1. 사용자가 종목 상세에서 “내 분석에 담기”를 선택한다.
2. 분석 대상, 종목 코드, 시장, 대표 투자 근거 후보가 자동으로 채워진다.
3. 사용자는 현재 질문을 작성한다.
4. 공식 사실과 시장 관찰은 시스템 영역으로 분리되어 표시된다.
5. 사용자는 내 해석, 미확인 내용, 판단 변경 조건을 작성한다.
6. 저장 후 Analysis는 Draft 또는 Active 상태가 된다.

### 시나리오 B: 투자 근거에서 분석에 연결

1. 사용자가 투자 근거 상세에서 “이 근거를 내 분석에 담기”를 선택한다.
2. 기존 Analysis 선택 또는 새 Analysis 시작 Entry를 본다.
3. 사용자는 연결 대상 Section을 선택한다.
4. 시스템은 연결 역할을 제안하지만 확정하지 않는다.
5. 사용자는 연결 역할과 확인 내용을 저장한다.

### 시나리오 C: 새 공식 정보 검토

1. 시스템이 새 투자 근거 또는 정정 정보를 Attention Signal로 표시한다.
2. Analysis 자체 상태는 자동 변경하지 않는다.
3. 사용자는 새 근거를 확인한다.
4. 기존 해석, 미확인 내용, 판단 변경 조건과 비교한다.
5. 사용자가 상태와 신뢰 판단을 유지, 수정, 보류 중 하나로 결정한다.
6. 의미 있는 변경이면 History가 생성된다.

### 시나리오 D: 판단 기록으로 남기기

1. 사용자가 Analysis를 특정 시점 기준으로 기록하고 싶을 때 Snapshot 생성을 선택한다.
2. Snapshot에 포함될 공식 사실, 해석, 미확인 내용, 투자 근거, 신뢰 판단을 미리 확인한다.
3. 사용자는 사용자 메모를 추가할 수 있다.
4. Snapshot 생성 후 원본 Analysis는 계속 수정 가능하다.
5. Snapshot은 수정하지 않고, 필요한 경우 새 Snapshot을 추가 생성한다.

## 5. Analysis State Model

사용자 상태는 사용자가 직접 관리하거나 최종 확정하는 Lifecycle 상태이다. 시스템 Attention Signal과 합치지 않는다.

| 상태 | 의미 | 진입 조건 | 다음 행동 | 종료 조건 |
| --- | --- | --- | --- | --- |
| Draft | 분석 초안 | 분석 대상 또는 현재 질문만 있는 상태 | 현재 질문 작성, 투자 근거 연결 | 사용자가 Active 또는 Reviewing으로 전환 |
| Reviewing | 근거와 해석 검토 중 | 새 근거 확인, 미확인 내용 정리, 판단 조건 검토 중 | 근거 확인, 해석 수정, 조건 정리 | 사용자가 Active, On Hold, Archived 중 선택 |
| Active | 현재 추적 중인 분석 | 질문, 해석, 판단 조건이 있고 계속 관찰하는 상태 | 새 변화 확인, 다음 확인 시점 관리 | On Hold 또는 Archived 전환 |
| On Hold | 보류 중인 분석 | 추가 공식 정보가 필요하거나 판단을 유보한 상태 | 다음 확인 시점 설정, 미확인 내용 유지 | 새 근거 확인 후 Reviewing 또는 Active 전환 |
| Archived | 보관된 분석 | 더 이상 추적하지 않기로 한 상태 | 읽기, Snapshot 확인 | 사용자가 재개하면 Draft가 아니라 Reviewing으로 복귀 |

### 상태 전이 규칙

```text
Draft → Reviewing
Draft → Active
Reviewing → Active
Reviewing → On Hold
Reviewing → Archived
Active → Reviewing
Active → On Hold
Active → Archived
On Hold → Reviewing
On Hold → Archived
Archived → Reviewing
```

전이 원칙:

- 시스템은 상태 전이를 제안할 수 있지만 자동 확정하지 않는다.
- 상태 변경은 History 생성 후보이다.
- Archived에서 다시 열면 기존 상태를 덮어쓰지 않고 “재검토 시작” 이력을 남긴다.
- 저장 실패나 Conflict는 Lifecycle 상태가 아니라 Save State이다.

## 6. System Attention Model

System Attention은 사용자가 먼저 확인해야 할 상황을 알려주는 신호이다. 사용자가 관리하는 Analysis Lifecycle 상태와 분리한다.

Attention Signal 후보:

- 새 투자 근거 검토 필요
- 추가 확인 필요
- 판단 변경 조건 충족 가능성
- 장기간 업데이트 없음
- 저장 실패
- Conflict 발생
- Offline 상태
- 삭제된 Evidence 연결
- 정정 또는 수정 공시 발생

표시 원칙:

- Attention은 상단 또는 해당 Section 근처에 표시한다.
- Attention은 사용자 판단을 바꾸지 않는다.
- Attention은 “검토가 필요한 이유”를 함께 제공한다.
- Attention은 여러 개가 동시에 표시될 수 있다.
- 우선순위는 공식 정보 변경, 판단 변경 조건, 저장 위험, 오래된 분석 순으로 높게 둔다.

Attention과 상태의 차이:

| 구분 | 소유자 | 예시 | 자동 변경 여부 |
| --- | --- | --- | --- |
| Analysis 상태 | 사용자 최종 결정 | Draft, Reviewing, Active | 자동 확정 금지 |
| Attention Signal | 시스템 제안 | 새 근거 검토 필요, 저장 실패 | 시스템 표시 가능 |
| Save State | 저장 시스템 | Unsaved, Saving, Conflict | 시스템 표시 가능 |

## 7. Read Mode

Read Mode는 Analysis의 기본 진입 상태이다.

### 기본 표시 정보

- 분석 대상
- 현재 질문
- Analysis 상태
- Attention Signal
- 마지막 업데이트
- 새로 달라진 내용
- 공식적으로 확인된 사실
- 관찰된 시장 변화
- 내 해석
- 다른 해석 가능성
- 현재 가설
- 미확인 내용
- 판단 변경 조건
- 연결된 투자 근거
- 관련 대상
- 다음 확인 항목
- 변경 이력

### 읽기 전용 영역

다음 영역은 Read Mode에서 직접 편집하지 않는다.

- 공식 사실
- 시장 관찰
- 투자 근거 Metadata
- 출처
- 공개 시각
- 확인 상태
- 관련 종목과 시장 정보
- History
- Snapshot 생성 후 Snapshot 내용

### 편집 진입 CTA

Read Mode의 주요 CTA:

- 분석 수정하기
- 새 근거 검토하기
- 판단 조건 업데이트하기
- 기록으로 남기기

상태별 Primary CTA는 화면에 하나만 둔다. 보조 행동은 링크 또는 낮은 위계로 둔다.

### Evidence 확인

연결된 투자 근거는 Read Mode에서 상세 화면으로 이동할 수 있다. 근거 연결 변경은 Edit Mode 또는 Attachment Flow에서 수행한다.

### History 확인

History는 Read Mode에서 확인 가능하다. 변경 전후 비교는 기본 요약을 먼저 보여주고, 상세 비교는 펼쳐보기로 둔다.

### Snapshot 생성 진입

Snapshot 생성 CTA는 Read Mode에서 진입한다. Snapshot 생성 전 Preview 단계를 반드시 둔다.

### 모바일 표시

Mobile Read Mode에서는 현재 Low-Fi 정책을 유지한다.

기본 접기:

- 다른 해석 가능성
- 현재 가설
- 관련 대상
- 변경 이력

기본 노출:

- 미확인 내용
- 판단 변경 조건
- 다음 확인 항목

접기 상태는 URL에 저장하지 않는다. 초기 상태는 Component Local State로 처리한다.

## 8. Edit Mode

### 진입과 종료

Edit Mode 진입 경로:

- “분석 수정하기”
- Section별 “수정”
- “새 근거 검토하기”
- “판단 조건 업데이트하기”
- “추가 확인 항목 정리하기”

종료 경로:

- 저장
- 취소
- 페이지 이탈
- 오류 복구 후 종료

### 권장 방식

전체 문서 편집보다 Section 단위 편집을 권장한다.

이유:

- 공식 사실과 사용자 해석의 경계를 유지하기 쉽다.
- 모바일에서 긴 문서 편집 부담이 적다.
- 저장 실패 시 복구 범위를 줄일 수 있다.
- History를 의미 있는 변경 단위로 남기기 쉽다.

전체 편집은 Desktop 고급 흐름으로 후속 검토한다.

### 저장 전 변경 표시

Section이 수정되면 다음을 표시한다.

- 변경됨
- 저장 전
- 마지막 저장 시각
- 취소 가능 여부

공식 사실과 시장 관찰처럼 사용자가 직접 수정할 수 없는 영역은 “수정 불가”가 아니라 “공식 근거에서 확인된 내용”으로 설명한다.

### 취소

취소 시 정책:

- 변경 내용이 없으면 즉시 Read Mode로 복귀한다.
- 변경 내용이 있으면 “작성 중인 내용을 버릴까요?” 확인을 표시한다.
- 취소해도 기존 저장본은 유지한다.

### 저장

저장은 Section 단위 저장을 기본으로 한다.

저장 후:

- Save State는 Saved가 된다.
- 변경 내용이 의미 있으면 History 후보가 생성된다.
- Attention Signal은 필요 시 유지 또는 해소 제안으로 바뀐다.

### Auto Save

Auto Save는 사용자가 작성한 내용 보존을 위해 도입한다. 단, 사용자의 판단 상태나 신뢰 판단을 자동 확정하지 않는다.

원칙:

- 짧은 입력 후 일정 시간 입력이 멈추면 저장 후보가 된다.
- 저장 중 중복 요청은 병합한다.
- 저장 실패 시 로컬 임시 상태를 유지한다.
- Auto Save 성공은 작게 표시한다.

### 페이지 이탈 경고

Unsaved 상태에서 페이지를 이탈하면 경고한다.

경고 문구 원칙:

- 기술 오류처럼 표현하지 않는다.
- “저장하지 않은 분석 내용이 있습니다.”처럼 작성 내용 보존 중심으로 안내한다.

### 키보드 Interaction

Desktop:

- `Tab`: 다음 입력 또는 CTA로 이동
- `Shift + Tab`: 이전 입력 또는 CTA로 이동
- `Esc`: Section 편집 취소 확인
- `Ctrl + S`: 저장
- `Ctrl + Enter`: 현재 Section 저장

Mobile:

- 키보드 단축키에 의존하지 않는다.
- 저장 CTA와 취소 CTA를 입력 영역 가까이에 둔다.

## 9. Section Editing Policy

### 현재 질문

소유자: 사용자 작성

생성:

- 새 Analysis 시작 시 필수 입력으로 권장한다.
- 비어 있어도 Draft 생성은 가능하지만 Active 전환 전에는 필요하다.

수정:

- Section 단위 Edit Mode에서 수정한다.
- 수정 시 기존 질문은 History 후보로 남긴다.

삭제:

- Draft에서는 삭제 가능하다.
- Active 이후에는 빈 질문으로 저장하지 않고 “질문 재작성 필요” 상태를 표시한다.

최소 검증:

- 5자 이상 권장
- 매수, 매도, 목표가 직접 지시형 질문은 경고

### 공식 사실

소유자: 외부 Evidence에서 파생되는 시스템 영역

생성:

- 투자 근거 연결 시 생성 후보가 된다.
- 사용자가 직접 사실 문장을 작성하지 않는다.

수정:

- Analysis에서 직접 수정하지 않는다.
- 연결된 투자 근거가 갱신되면 시스템이 변경 제안을 표시한다.

삭제:

- 공식 사실 자체 삭제가 아니라 연결 해제를 제공한다.

최소 검증:

- 공식 출처
- 공개 시각
- 확인 상태
- 연결된 투자 근거

### 시장 관찰

소유자: 시스템 관찰 영역

생성:

- 시장 데이터, 지수, 테마, 관련 기업 반응에서 생성한다.

수정:

- 사용자가 직접 수정하지 않는다.
- 사용자는 “분석에 참고하지 않기” 또는 “관련성 낮음”으로 표시할 수 있다.

삭제:

- 삭제보다 숨김 또는 연결 해제를 우선한다.

최소 검증:

- 관찰 시각
- 관찰 대상
- 인과관계 미확정 안내

### 내 해석

소유자: 사용자 작성

생성:

- 공식 사실 또는 시장 관찰 이후 작성한다.

수정:

- Section 단위 편집을 제공한다.
- 연결된 투자 근거를 함께 확인할 수 있어야 한다.

삭제:

- 삭제 가능하다.
- 삭제 후 Empty State는 “아직 내 해석이 없습니다.”로 표현한다.

최소 검증:

- 공식 사실처럼 단정하는 표현을 경고할 수 있다.
- 매수·매도 유도 문구는 금지한다.

### 다른 해석 가능성

소유자: 사용자 작성, 시스템 제안 가능

생성:

- 사용자가 직접 추가한다.
- 시스템은 “다른 설명 가능성” 후보만 제안한다.

수정:

- 각 항목 단위로 수정한다.

삭제:

- 삭제 가능하다.
- 마지막 항목 삭제 후 Empty State를 표시한다.

최소 검증:

- 대안 해석
- 대안이 가능한 이유
- 필요한 추가 근거

### 현재 가설

소유자: 사용자 작성

생성:

- 공식 확인 전 임시 판단으로 작성한다.

수정:

- 상태와 필요한 조건을 함께 수정한다.

삭제:

- 삭제 가능하되, 연결된 투자 근거가 있으면 연결 해제 확인을 표시한다.

최소 검증:

- 가설 문장
- 가설 상태
- 확인에 필요한 조건
- 연결된 근거 또는 미확인 항목

### 미확인 내용

소유자: 사용자 작성, Evidence에서 파생 가능

생성:

- 투자 근거 상세의 “확인할 수 없는 내용”에서 자동 제안될 수 있다.
- 사용자가 직접 추가할 수 있다.

수정:

- 항목 단위로 수정한다.

삭제:

- 삭제 가능하다.
- 삭제 시 “확인됨”, “관련 없음”, “잘못 추가됨” 이유 선택을 검토한다.

최소 검증:

- 미확인 항목
- 왜 중요한지
- 필요한 추가 정보
- 다시 확인할 조건

### 판단 변경 조건

소유자: 사용자 작성, 시스템 제안 가능

생성:

- 사용자가 직접 추가한다.
- 시스템은 미확인 내용 또는 새 근거에서 조건 후보를 제안한다.

수정:

- 조건 문장, 조건 유형, 현재 상태, 마지막 확인 시각을 수정한다.

삭제:

- 삭제 가능하다.
- Active 상태에서는 삭제 대신 “더 이상 추적하지 않음”을 권장한다.

최소 검증:

- 조건 문장
- 조건 유형
- 충족 여부
- 마지막 확인 시각

### 다음 확인 항목

소유자: 사용자 작성, 시스템 제안 가능

생성:

- 미확인 내용, 판단 변경 조건, 새 근거 검토 후 생성한다.

수정:

- 확인할 내용, 확인 이유, 다음 확인 시점, 완료 여부를 수정한다.

삭제:

- 삭제 가능하다.
- 완료된 항목은 삭제보다 완료 상태 유지가 우선이다.

최소 검증:

- 확인할 내용
- 다음 확인 시점
- 연결된 근거 또는 대상

## 10. Evidence Attachment Flow

### 연결 단위

지원 단위:

- Analysis 전체
- Section 단위

향후 확장:

- 문장 단위 Annotation
- 특정 문장과 Evidence의 직접 연결

문장 단위 Annotation은 이번 범위에서 구현하지 않는다.

### 연결 흐름

1. 사용자가 “근거 추가하기” 또는 Section 내부 “근거 연결”을 선택한다.
2. 기존 Evidence 검색 또는 선택 화면을 연다.
3. 사용자는 연결할 Evidence를 선택한다.
4. 연결 대상 Section을 선택한다.
5. 연결 역할을 선택한다.
6. 연결 전 Preview에서 확인 가능한 사실과 확인할 수 없는 내용을 본다.
7. 저장하면 Analysis에 연결된다.

### 새 Evidence 생성 진입

Analysis 안에서 직접 Evidence를 작성하지 않는다.

새 Evidence가 필요하면:

- 투자 근거 검색으로 이동
- 공식 출처 추가 요청 흐름으로 이동
- Evidence 생성 후보 화면으로 이동

Analysis는 Evidence truth를 소유하지 않는다.

### 연결 역할

권장 역할:

- 사실 확인
- 시장 관찰 근거
- 가설 지지
- 반대 근거
- 판단 변경 조건 확인
- 추가 검토 필요

역할은 분석 내 해석을 돕는 표시일 뿐, Evidence 자체의 공식 상태를 바꾸지 않는다.

### 연결 규칙

- 하나의 Evidence는 여러 Section에 연결될 수 있다.
- 하나의 Section에는 여러 Evidence를 연결할 수 있다.
- 같은 Evidence를 같은 Section에 중복 연결하지 않는다.
- Evidence 제거는 Analysis 연결만 해제한다.
- Evidence 원본은 삭제하지 않는다.

### Evidence 변경 처리

Evidence가 갱신되면:

- 연결된 Analysis에 Attention Signal을 표시한다.
- 기존 사용자 해석은 자동 수정하지 않는다.
- 변경 전후의 공식 사실 차이를 보여준다.
- 사용자가 Section 연결 유지, 교체, 제거 중 선택한다.

Evidence가 삭제되거나 접근 불가하면:

- “연결된 근거를 확인할 수 없습니다.” 상태를 표시한다.
- 기존 Analysis 문장은 유지한다.
- 해당 근거에 의존하는 공식 사실은 재검토 대상으로 표시한다.

## 11. Confidence Policy

이 문서에서 Confidence는 투자 확신도가 아니다. 공식 정보와 사용자의 판단 구조가 얼마나 충분히 뒷받침되는지에 대한 검토 상태이다.

권장 표현:

- 공식 확인
- 복수 출처 확인
- 단일 출처
- 미확인
- 재검토 필요

### 사용자 직접 변경

사용자는 Confidence를 직접 변경할 수 있다. 단, 변경 시 이유 입력을 권장한다.

변경 가능한 영역:

- 내 해석
- 다른 해석 가능성
- 현재 가설
- 판단 변경 조건
- Analysis 전체 신뢰 판단

변경 불가 영역:

- 공식 출처의 공개 시각
- Evidence 자체의 원문 정보
- 시스템이 관찰한 시장 데이터

### 시스템 제안

시스템은 다음 상황에서 Confidence 변경을 제안할 수 있다.

- 새 Evidence 추가
- 반대 Evidence 추가
- Evidence 정정
- 미확인 내용 공식 확인
- 판단 변경 조건 충족 가능성
- 오래된 Analysis

자동 변경 금지:

- 시스템은 Confidence를 자동 확정하지 않는다.
- “제안됨”과 “사용자 확정”을 구분한다.

### 변경 이력

Confidence 변경은 History 생성 후보이다.

History에 포함:

- 변경 전 Confidence
- 변경 후 Confidence
- 변경 이유
- 연결된 Evidence
- 변경 주체

## 12. Save State Machine

Save State는 Lifecycle 상태와 분리한다.

| Save State | 의미 | 사용자 표시 |
| --- | --- | --- |
| Clean | 저장된 상태와 화면 내용이 같음 | 저장됨 |
| Editing | 사용자가 입력 중 | 작성 중 |
| Unsaved | 저장되지 않은 변경 있음 | 저장 전 |
| Saving | 저장 요청 중 | 저장 중 |
| Saved | 저장 성공 | 방금 저장됨 |
| Save Failed | 저장 실패 | 저장 실패, 다시 시도 |
| Conflict | 다른 탭 또는 기기 변경과 충돌 | 충돌 확인 필요 |
| Offline | 네트워크 단절 | 연결 복구 후 저장 |

### Manual Save

Manual Save는 사용자가 명시적으로 저장하는 행동이다.

원칙:

- Section 단위 저장을 우선한다.
- 저장 중에는 중복 요청을 막는다.
- 저장 성공 시 작고 명확한 피드백을 제공한다.

### Auto Save

Auto Save는 보조 안전장치이다.

지연 시간 원칙:

- 입력이 멈춘 뒤 짧은 지연 후 저장한다.
- 너무 잦은 저장으로 History가 과도하게 늘어나지 않게 한다.
- 구체적인 초 단위는 구현 단계에서 정한다.

### 저장 실패

저장 실패 시:

- 사용자의 입력 내용은 화면에 유지한다.
- 재시도 CTA를 제공한다.
- 실패 이유는 기술 코드보다 사용자 행동 중심으로 표현한다.

### Conflict

Conflict 발생 시:

- 현재 작성 내용
- 서버에 저장된 최신 내용
- 마지막 저장 시각
- 변경된 Section

을 비교한다.

복구 우선순위:

1. 사용자 입력 보존
2. 최신 저장본 확인
3. Section 단위 병합
4. 병합 불가 시 사용자가 선택

### Offline

Offline에서는 임시 작성 상태를 유지한다.

범위:

- 읽기 중인 기존 내용 유지
- 사용자 작성 임시 보존
- 새 Evidence 검색이나 실제 연결은 제한
- 연결 복구 후 저장 재시도

## 13. History Policy

### 생성 기준

모든 입력마다 History를 생성하지 않는다. 의미 있는 변경만 생성한다.

History 생성 후보:

- Analysis 상태 변경
- 현재 질문 변경
- 내 해석 변경
- 현재 가설 상태 변경
- 미확인 내용 추가 또는 해소
- 판단 변경 조건 추가 또는 충족
- Evidence 연결, 교체, 제거
- Confidence 변경
- Snapshot 생성

### 변경 요약

History는 변경 항목 중심으로 표시한다.

포함:

- 변경 시각
- 변경한 영역
- 변경 전
- 변경 후
- 변경 이유
- 연결된 Evidence
- 변경 주체

### 사용자 수정과 시스템 제안 구분

표시 구분:

- 사용자 수정
- 시스템 제안
- 사용자가 시스템 제안을 확정
- 저장 복구
- Conflict 해결

### Rollback

Rollback은 기본 기능으로 바로 제공하지 않는다.

권장 정책:

- 초기 구현에서는 “이전 내용 보기”만 제공한다.
- Rollback은 후속 단계에서 검토한다.
- Rollback을 지원할 경우 기존 History를 삭제하지 않고 새 History를 생성한다.

### 모바일 표시

Mobile에서는 History 전체를 기본 노출하지 않는다.

표시 방식:

- 최근 1개 변경 요약
- “변경 이력 보기” 접기
- 상세 비교는 별도 화면 또는 Sheet 후보

## 14. Journal Snapshot Policy

Snapshot은 특정 시점의 Analysis를 기록으로 보존하는 행위이다.

### 생성 조건

Snapshot 생성은 사용자가 명시적으로 선택해야 한다.

권장 생성 시점:

- 사용자가 검토 완료 후 기록으로 남기고 싶을 때
- 중요한 판단 변경이 발생했을 때
- Analysis를 Archived로 전환할 때
- 실제 행동을 기록하기 전후
- 일정 기간 후 회고가 필요할 때

### Snapshot 생성 CTA

CTA 후보:

- 기록으로 남기기
- 현재 분석을 기록으로 남기기
- 이 시점의 판단 보존하기

투자 행동 CTA와 혼동되는 문구는 금지한다.

### 포함 데이터

Snapshot에 포함:

- Snapshot ID
- 원본 Analysis ID
- 생성 시각
- 생성 사용자
- 분석 대상
- 현재 질문
- Analysis 상태
- Attention Signal
- 공식 사실
- 시장 관찰
- 내 해석
- 다른 해석 가능성
- 현재 가설
- 미확인 내용
- 판단 변경 조건
- 연결된 Evidence
- 당시 Confidence
- 당시 시장 데이터
- 당시 가격 Mock 또는 가격 상태
- 다음 확인 항목
- 사용자 메모

### 원본 Analysis와 관계

- Snapshot과 원본 Analysis는 별도 Entity이다.
- Snapshot 생성 후 원본 Analysis는 계속 수정 가능하다.
- Snapshot은 생성 시점의 기록으로 남는다.
- Snapshot은 원본 Analysis의 최신 상태를 따라 자동 갱신되지 않는다.

### 수정 가능 여부

기본 정책:

- Snapshot은 불변이다.
- Snapshot 수정 대신 새 Snapshot을 생성한다.
- 사용자 메모도 Snapshot 생성 후 직접 수정하지 않는다.
- 오탈자 수정 필요가 있다면 정정 메모를 새 Snapshot 또는 후속 기록으로 남긴다.

### 권한

Snapshot 생성은 로그인 사용자만 가능하다.

비로그인 사용자는 Snapshot CTA를 보더라도 저장 불가 안내를 받는다.

## 15. Permission Matrix

| 기능 | 비로그인 | 로그인 |
| --- | --- | --- |
| Sample Analysis 열람 | 가능 | 가능 |
| Read Mode | 가능 | 가능 |
| 새 Analysis 생성 | 불가 | 가능 |
| Edit Mode | 불가 | 가능 |
| Draft 저장 | 불가 | 가능 |
| Auto Save | 불가 | 가능 |
| Evidence 연결 | 불가 | 가능 |
| Confidence 변경 | 불가 | 가능 |
| History 확인 | Sample만 가능 | 가능 |
| Snapshot 생성 | 불가 | 가능 |
| Archive | 불가 | 가능 |

비로그인 원칙:

- 로그인 전에는 예시 분석과 읽기 흐름을 제공한다.
- 저장 가능한 것처럼 보이지 않게 한다.
- 로그인 유도는 보조 행동으로 둔다.

로그인 원칙:

- 사용자의 작성 내용과 판단 구조를 저장한다.
- History와 Snapshot을 제공한다.
- 권한 만료 시 작성 내용을 잃지 않도록 복구 안내를 제공한다.

팀 또는 공유 권한:

- 이번 범위에서는 제외한다.
- 향후 개인 분석을 팀 분석으로 공유할 수 있는 확장 가능성만 남긴다.

## 16. Desktop Interaction

### Read/Edit 전환

Desktop에서는 Section 단위 Edit 버튼을 기본으로 둔다.

권장 흐름:

```text
Read Mode
→ Section 수정
→ 해당 Section만 Edit Mode
→ 저장 또는 취소
→ Read Mode 복귀
```

### 저장 상태 표시 위치

저장 상태는 다음 위치에 표시한다.

- Hero 상태 영역
- 편집 중인 Section 상단
- 저장 실패 시 해당 Section 근처

### Evidence 연결 진입

Desktop에서는 Section 내부 “근거 연결” Entry를 제공한다.

연결 UI 후보:

- Modal
- Inline Picker
- 별도 연결 화면

Low-Fi Interaction Phase에서는 Modal 또는 Inline Picker Mock을 우선 검토한다.

### History 진입

History는 하단 Section에서 확인한다. 긴 페이지에서 빠르게 이동할 수 있도록 “변경 이력 보기” 보조 링크를 제공한다.

### Snapshot 진입

Snapshot CTA는 하단 행동 영역과 검토 완료 상태에서 노출한다.

생성 전 Preview를 거친다.

### 긴 페이지에서 현재 편집 위치 유지

원칙:

- Section 저장 후 스크롤 위치를 유지한다.
- 저장 실패 시 실패한 Section으로 focus를 이동한다.
- 편집 중 다른 Section으로 이동하면 저장 여부를 확인한다.

### 키보드 중심 사용

Desktop은 키보드 편집 흐름을 지원한다.

- `Tab`: 다음 편집 가능 요소
- `Shift + Tab`: 이전 요소
- `Ctrl + S`: 저장
- `Esc`: 취소 확인
- `Enter`: 버튼 실행

## 17. Mobile Interaction

### Edit 진입

Mobile은 전체 문서 편집보다 Section 단위 편집을 우선한다.

권장 방식:

- Section 내부 “수정”
- Bottom Sheet 편집
- 저장 후 Sheet 닫기

### Bottom Action 영역

긴 편집 중에는 하단 고정 행동 영역을 검토한다.

포함:

- 취소
- 저장
- 저장 상태

하단 행동 영역은 Bottom Navigation과 충돌하지 않아야 한다.

### 모바일 키보드 대응

원칙:

- 입력창이 키보드에 가려지지 않아야 한다.
- 저장 CTA는 키보드 위 또는 Section 하단에서 접근 가능해야 한다.
- 긴 Textarea는 첫 화면에 두지 않는다.

### 접기 영역 편집

접힌 Section을 편집하려면 먼저 펼친다.

정책:

- 편집 중인 Section은 자동으로 펼친 상태를 유지한다.
- 저장 또는 취소 후 초기 접기 정책으로 돌아갈 수 있다.
- 접기 상태는 URL에 저장하지 않는다.

### Evidence 연결

Mobile에서는 Evidence 연결을 Sheet로 제공하는 것이 적합하다.

Sheet 포함:

- 검색 입력
- 기존 Evidence 목록
- 연결 대상 Section
- 연결 역할
- Preview
- 연결 CTA

### 페이지 이탈

Unsaved 상태에서 뒤로가기 또는 다른 탭 이동 시 확인을 표시한다.

문구:

- “저장하지 않은 분석 내용이 있습니다.”
- “나가면 이번 수정 내용이 사라질 수 있습니다.”

### History와 Snapshot

History는 기본 접기 상태로 둔다. Snapshot 생성은 Preview Sheet를 거친다.

## 18. Error and Recovery

### 저장 실패

사용자 메시지:

- “저장하지 못했습니다. 작성 내용은 화면에 남아 있습니다.”

복구 행동:

- 다시 시도
- 임시 내용 유지
- 나중에 저장

데이터 원칙:

- 사용자 입력을 잃지 않는다.

### Evidence 연결 실패

사용자 메시지:

- “투자 근거를 연결하지 못했습니다. 분석 내용은 그대로 유지됩니다.”

복구 행동:

- 다시 연결
- 다른 근거 선택
- 연결 없이 저장

### 네트워크 단절

사용자 메시지:

- “연결이 끊겼습니다. 작성 중인 내용은 임시로 유지됩니다.”

복구 행동:

- 연결 복구 후 저장
- 현재 내용 복사 안내는 최후 수단

### Conflict

사용자 메시지:

- “다른 곳에서 같은 분석이 수정됐습니다.”

복구 행동:

- 내 수정 유지
- 최신 내용 보기
- Section 단위로 선택

### 권한 만료

사용자 메시지:

- “로그인이 만료되어 저장할 수 없습니다.”

복구 행동:

- 다시 로그인
- 작성 내용 유지
- 읽기 상태로 전환

### 삭제된 Evidence

사용자 메시지:

- “연결된 투자 근거를 확인할 수 없습니다.”

복구 행동:

- 연결 해제
- 다른 근거로 교체
- 재검토 대상으로 표시

### 오래된 Analysis

사용자 메시지:

- “마지막 확인 이후 시간이 지났습니다.”

복구 행동:

- 새 공식 정보 확인
- 다음 확인 시점 재설정

### Snapshot 생성 실패

사용자 메시지:

- “기록으로 남기지 못했습니다. 원본 분석은 그대로 유지됩니다.”

복구 행동:

- 다시 시도
- 원본 Analysis로 돌아가기

### 변경사항 버리기

사용자 메시지:

- “이번 수정 내용을 버릴까요?”

복구 행동:

- 계속 편집
- 버리고 돌아가기

## 19. Accessibility

### 키보드 탐색

- 모든 CTA는 키보드로 접근 가능해야 한다.
- Section 편집 진입과 저장, 취소는 명확한 focus 순서를 가진다.
- Modal 또는 Sheet는 열린 뒤 첫 의미 있는 요소로 focus를 이동한다.

### Focus 이동

- 저장 성공 후 focus는 편집한 Section 제목 또는 저장 상태 메시지로 이동한다.
- 저장 실패 후 focus는 오류 메시지 또는 실패한 입력 영역으로 이동한다.
- Snapshot 생성 후 focus는 생성 완료 안내로 이동한다.

### Screen Reader Label

필수 label:

- 분석 상태
- 저장 상태
- Attention Signal
- Evidence 연결 역할
- 접기/펼치기 상태
- Snapshot Preview

### Live Region

저장 상태는 보조 기술에 전달되어야 한다.

대상:

- 저장 중
- 저장됨
- 저장 실패
- Conflict 발생
- Offline 전환

### Error 안내

오류 메시지는 색상만으로 전달하지 않는다.

포함:

- 무엇이 문제인지
- 작성 내용이 보존되는지
- 다음 행동

### 접기/펼치기 접근성

- `aria-expanded` 또는 native `details` semantics를 사용한다.
- Summary는 Section의 성격을 설명해야 한다.
- 항목 수를 표시하는 방안은 High-Fi Backlog로 둔다.

### Modal 또는 Sheet Focus Trap

- Modal/Sheet가 열린 동안 focus는 내부에 머문다.
- 닫으면 원래 진입 CTA로 focus를 돌린다.
- `Esc` 또는 닫기 버튼을 제공한다.

### 상태 표현

상태는 색상만으로 구분하지 않는다.

함께 제공:

- 상태 문구
- 설명 문장
- 필요 시 아이콘 또는 형태

## 20. 구현 Phase

각 Phase는 독립적으로 구현, 검증, Commit 가능한 단위여야 한다.

### Phase 1: Edit Mode Mock Interaction

목표:

- Section 단위 Edit Mode를 Mock으로 구현한다.

범위:

- 현재 질문
- 내 해석
- 다른 해석 가능성
- 현재 가설
- 미확인 내용
- 판단 변경 조건

검증:

- Read Mode와 Edit Mode가 구분되는가
- 공식 사실은 직접 편집되지 않는가
- 저장 전 변경 표시가 보이는가
- 모바일에서 Section 단위 편집이 가능한가

### Phase 2: Draft Save State Mock

목표:

- 저장 상태를 화면에서 이해할 수 있게 한다.

범위:

- Clean
- Editing
- Unsaved
- Saving
- Saved
- Save Failed
- Conflict
- Offline

검증:

- 저장 상태가 Lifecycle 상태와 혼동되지 않는가
- 저장 실패 시 작성 내용이 유지되는가
- 페이지 이탈 경고가 있는가

### Phase 3: Evidence Attachment Mock

목표:

- Section 단위 Evidence 연결 흐름을 Mock으로 구현한다.

범위:

- 기존 Evidence 선택
- 연결 대상 Section 선택
- 연결 역할 선택
- 연결 Preview
- 연결 해제
- 갱신된 Evidence 처리 Placeholder

검증:

- Evidence를 Analysis 안에서 새로 쓰는 것처럼 보이지 않는가
- 하나의 Evidence가 여러 Section에 연결 가능한가
- 연결 역할이 보이는가

### Phase 4: Confidence 및 System Attention

목표:

- 사용자 확정형 Confidence와 시스템 Attention Signal을 분리한다.

범위:

- Confidence 제안
- 사용자 확정
- 반대 근거 발생
- 장기간 업데이트 없음
- 판단 변경 조건 충족 가능성

검증:

- 시스템이 Confidence를 자동 확정하지 않는가
- Attention이 Analysis 상태와 혼동되지 않는가

### Phase 5: History

목표:

- 의미 있는 변경 항목 중심의 History를 구현한다.

범위:

- 변경 요약
- 변경 전후
- 변경 주체
- 연결 Evidence
- 모바일 접기 표시

검증:

- 저장마다 과도하게 History가 생성되지 않는가
- 사용자 수정과 시스템 제안이 구분되는가

### Phase 6: Journal Snapshot

목표:

- Analysis를 특정 시점 기록으로 보존하는 Snapshot Mock을 구현한다.

범위:

- Snapshot Preview
- 포함 데이터 확인
- 로그인 필요 안내
- 생성 성공/실패 상태
- 원본 Analysis와 Snapshot 분리 표시

검증:

- Snapshot이 원본 Analysis를 덮어쓰지 않는가
- Snapshot이 수정 가능한 문서처럼 보이지 않는가
- 원본 Analysis는 계속 수정 가능하다는 점이 명확한가

## 21. Acceptance Criteria

Interaction 설계와 후속 구현은 다음 기준을 통과해야 한다.

- 공식 사실과 사용자 해석이 편집 구조에서도 분리되는가
- 사용자 상태와 System Attention이 하나의 상태처럼 합쳐지지 않는가
- Confidence는 시스템 자동 확정이 아니라 사용자 확정인가
- Evidence는 우선 Section 단위로 연결되는가
- 문장 단위 Annotation은 확장 범위로 남아 있는가
- Read Mode와 Edit Mode가 명확히 구분되는가
- Save State가 Lifecycle 상태와 혼동되지 않는가
- Snapshot은 불변 시점 기록으로 표현되는가
- 원본 Analysis는 Snapshot 이후에도 계속 수정 가능한가
- 비로그인 사용자는 저장 가능한 것처럼 오해하지 않는가
- 모바일에서 긴 문서 편집이 아니라 Section 단위 편집이 가능한가
- 오류 상황에서 사용자 작성 내용이 보존되는가
- 색상만으로 상태를 구분하지 않는가
- 투자 추천, 매수·매도 유도, 목표가, 수익 예측 표현이 없는가

## 22. Open Questions

### 1. Lifecycle 상태를 현재 구현의 한국어 상태와 어떻게 매핑할 것인가?

현재 권장안:

- Interaction 내부 모델은 Draft, Reviewing, Active, On Hold, Archived로 단순화한다.
- 화면 표시는 한국어로 제공한다.

대안:

- 현재 구현의 8개 상태를 그대로 Lifecycle로 사용한다.

보류 이유:

- 현재 8개 상태에는 Attention 성격이 섞여 있어 장기적으로 혼동될 수 있다.

### 2. Section 단위 저장과 전체 저장을 함께 제공할 것인가?

현재 권장안:

- Section 단위 저장을 기본으로 하고 전체 저장은 후속 검토한다.

대안:

- 전체 문서 저장만 제공한다.

보류 이유:

- 모바일과 오류 복구에서 Section 단위가 더 안전하지만, Desktop 고급 사용자는 전체 저장을 기대할 수 있다.

### 3. Auto Save 지연 시간은 얼마가 적절한가?

현재 권장안:

- 이 문서에서는 원칙만 정의하고 구현 단계에서 정한다.

대안:

- 구체 초 단위를 지금 확정한다.

보류 이유:

- 실제 입력 밀도와 성능 검증 전에는 확정하지 않는다.

### 4. Confidence 단계는 현재 4단계로 충분한가?

현재 권장안:

- 공식 확인, 복수 출처 확인, 단일 출처, 미확인에 재검토 필요를 보조 상태로 둔다.

대안:

- 점수형 Confidence를 둔다.

보류 이유:

- 점수형은 투자 확신도처럼 오해될 위험이 있다.

### 5. Evidence 연결 역할은 사용자가 직접 고르는가?

현재 권장안:

- 시스템이 후보를 제안하고 사용자가 확정한다.

대안:

- 시스템이 자동 지정한다.

보류 이유:

- 자동 지정은 해석의 책임이 시스템으로 넘어가는 것처럼 보일 수 있다.

### 6. Snapshot 사용자 메모도 불변으로 둘 것인가?

현재 권장안:

- Snapshot 전체를 불변으로 둔다.

대안:

- 사용자 메모만 수정 가능하게 한다.

보류 이유:

- 수정 가능 영역이 생기면 시점 기록의 의미가 약해질 수 있다.

### 7. Archived Analysis를 다시 열면 어떤 상태가 되는가?

현재 권장안:

- Reviewing으로 복귀하고 재검토 History를 남긴다.

대안:

- Draft로 복사본을 만든다.

보류 이유:

- 원본을 재개할지 복제할지는 Journal과의 관계까지 검토해야 한다.

### 8. Offline 임시 저장은 어디까지 보장할 것인가?

현재 권장안:

- 작성 중인 화면의 임시 보존만 정의한다.

대안:

- 여러 Analysis의 Offline 작성까지 지원한다.

보류 이유:

- 실제 저장소와 인증 정책이 필요하다.

## 23. 명시적 제외 범위

이번 Planner에서 제외한다.

- 실제 UI 구현
- API 구현
- Database Schema 구현
- Authentication 구현
- 실제 저장
- 실제 Evidence 연결
- Journal 구현
- High-Fi Visual Design
- 문장 단위 Annotation
- 협업 편집
- 팀 권한
- 알림 시스템
- 투자 추천
- 매수·매도 기능
- 목표가
- 수익률 예측
