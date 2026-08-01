# KR Core Loop Interaction Audit

## Scope

Branch: `feature/kr-00-experience-foundation`

검증 대상 흐름:

1. 삼성전자 Analysis 재검토
   - `/kr/analysis?id=samsung-semiconductor-001`
   - `/kr/changes?view=analysis`
   - `/kr/watchlist?view=default`
2. SK하이닉스 새 공식 근거 검토
   - `/kr/changes?view=analysis`
   - `/kr/evidence?id=ir-semiconductor-001`
   - `/kr/analysis?id=hynix-hbm-001`
   - `/kr/watchlist?view=review`
3. Watchlist 우선순위 확인
   - `/kr/watchlist?view=review`
   - `/kr/changes?view=analysis`
   - browser back to Watchlist

검증 viewport:

- Desktop: 1440px
- Mobile: 390px

## Findings

### Critical

- 없음.

### Major

- Analysis 편집 취소/적용 후 keyboard focus가 편집을 시작한 버튼으로 복귀하지 않았다.
- Analysis의 접힌 보조 섹션 summary가 판단 변경 조건과 다음 확인 항목이 포함되어 있음을 명확히 말하지 않았다.

### Minor

- 삼성전자 Analysis hero에 보조 CTA가 많아 mobile 첫 화면에서 선택지가 다소 많다.
- Changes `view=analysis`는 삼성전자와 SK하이닉스가 함께 보이므로 SK하이닉스만 찾는 사용자는 두 번째 항목까지 스캔해야 한다.
- Evidence의 `내 분석에 담기`는 현재 실제 저장이 아니라 연결 이동이므로, 후속 문구에서는 "분석에서 비교하기" 계열 표현이 더 정확할 수 있다.

## Immediate Fixes

- Analysis 편집 시작 버튼을 기억하고, 취소 또는 적용 후 해당 버튼으로 focus를 복귀하도록 수정했다.
- Analysis 접힘 summary를 `판단 변경 조건·다음 확인을 포함한 나머지 분석 항목 n개 보기`로 변경했다.

## CTA / Query Validation

- `/kr/analysis?id=samsung-semiconductor-001`는 삼성전자 분석 재검토 CTA에서 Changes와 Watchlist로 이어진다.
- `/kr/analysis?id=hynix-hbm-001`는 SK하이닉스 공식 근거와 Watchlist review 맥락으로 이어진다.
- `/kr/analysis?id=unknown`는 알 수 없는 id 상태를 깨진 화면 없이 표시한다.
- `/kr/changes?view=analysis`는 Analysis에서 재검토할 변경 항목을 유지한다.
- `/kr/watchlist?view=default`와 `/kr/watchlist?view=review`는 각각 기본 확인과 재검토 맥락을 유지한다.
- `/kr/evidence?id=dart-samsung-001`와 `/kr/evidence?id=ir-semiconductor-001`는 공식 근거에서 Analysis로 이동할 수 있는 연결을 유지한다.

## Accessibility

- Analysis 편집 취소 후 keyboard focus는 편집을 시작한 버튼으로 복귀한다.
- Analysis 편집 적용 후 keyboard focus는 편집을 시작한 버튼으로 복귀한다.
- 접힌 보조 섹션 summary는 내부에 판단 변경 조건과 다음 확인 항목이 있음을 먼저 말한다.
- Desktop 1440px와 Mobile 390px에서 핵심 route의 가로 overflow를 확인한다.

## Flow Verdict

- 삼성전자 흐름은 Analysis에서 새 근거 검토, Changes 비교, Analysis 복귀, Watchlist 다음 확인으로 끊기지 않는다.
- SK하이닉스 흐름은 `ir-semiconductor-001` Evidence와 `hynix-hbm-001` Analysis가 정확히 연결된다.
- Watchlist는 가격 등락보다 확인 이유, 새 공식 정보, Analysis 재검토, 다음 확인 시점을 먼저 보여준다.
- Changes는 사용자 판단을 자동 수정하는 화면처럼 보이지 않고, 다시 볼 이유와 영향 영역을 표시하는 책임에 머문다.
- Evidence는 공식 사실과 미확인 내용을 분리한다.

## UX Score Rationale

- Critical 0: core loop를 막는 route, CTA, query, 또는 화면 단절은 확인되지 않았다.
- Major 2: keyboard focus 복귀와 접힌 summary 문맥 노출 문제가 있었고 모두 수정했다.
- Minor 3: mobile CTA 밀도, SK하이닉스 항목 스캔 비용, Evidence CTA 문구 정확성은 freeze 이후 별도 UX polish 후보로 보류한다.
- Desktop / Mobile: 1440px와 390px에서 핵심 route의 가로 overflow와 주요 CTA 노출을 확인 대상으로 둔다.

최종 판정: Core Loop는 유지된다. Critical blocker는 없고, Major 접근성/문맥 노출 문제는 즉시 수정했다.
