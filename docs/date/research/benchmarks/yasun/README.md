# YASUN.GG Benchmark

## 조사 목적

이 디렉터리는 YASUN.GG를 한국 투자자용 실시간 Trading Terminal Product Reference로 조사한 결과를 기록한다.

YASUN.GG는 DATE의 전체 Product Architecture 기준이 아니다. 이 Benchmark는 homepage, chart, news, macro, heatmap, calendar, stock report, community, simulated trading, utility, office-style workspace에서 확인되는 실시간 market context, 심볼 중심 탐색, 한국 투자자용 density, tool entry, community cue를 참고해 DATE의 Home, Market, Monitoring, Evidence entry, Workspace 경험을 보완할 수 있는지 검토하기 위한 보조 자료다.

## Benchmark가 필요한 이유

DATE는 투자 결론을 제공하지 않고 공식 근거 기반으로 다음 확인 행동을 돕는다. YASUN.GG는 빠른 시장 변화 감지, chart-first terminal shell, 한국어 투자자 친화적 표현, community / simulation engagement를 강하게 보여주므로, DATE High-Fidelity 단계에서 다음 항목을 비교하기에 적합하다.

- 실시간성이 있는 변화 feed를 사용자가 얼마나 빠르게 스캔하는가.
- headline, 심볼, 테마, source count, freshness가 한 list item 안에서 어떻게 결합되는가.
- 한국 사용자가 익숙한 market symbol과 해외 macro / crypto / commodity context가 어떻게 한 화면에 놓이는가.
- 자동 갱신, 알림, 음성 같은 monitoring cue가 화면 신뢰와 긴급도를 어떻게 만든다.
- 빠른 속보 UX가 Evidence-first 판단 흐름과 충돌할 수 있는 지점은 무엇인가.
- chart, chat, news, analysis tab이 같은 symbol context 안에서 어떻게 반복되는가.
- utility tool과 community surface가 terminal product 안에서 어떤 역할을 갖는가.

## Core Scope

- `/` homepage
- `/chart`
- 오늘의 헤드라인
- 실시간 속보 feed
- `/macro`
- `/heatmap`
- `/calendar`
- `/stock/{symbol}/report` example
- `/fees`
- `/tv-watchlist`
- `/lounge`
- `/trade`
- `/trade/leaderboard`
- `/chat-popup`
- `/about`
- `office.yasun.gg`
- 심볼 사이드바
- 차트 / 심볼 entry
- source count disclosure
- tag / theme / category label
- auto refresh and alert cue
- 투자 권유 아님 disclaimer

## Excluded Scope

- 로그인 이후 개인화
- 실제 MY watch behavior
- 평단 등록 이후 수익률 계산
- 알림 delivery
- 음성 기능 실제 동작
- 기사 source 원문 품질
- news ranking algorithm
- chart interaction
- community / lounge / office product
- pricing, data license, API
- simulated trading execution detail
- report generation output quality
- office app detail interaction

## 문서 구성

- [00-access-and-method.md](00-access-and-method.md): 조사 환경, Source, Access Boundary, Evidence Type을 기록한다.
- [01-news-surface-observations.md](01-news-surface-observations.md): `/news` 화면의 Product Surface, Information Density, DATE 적용 가능성과 제한을 기록한다.
- [02-product-surface-map.md](02-product-surface-map.md): YASUN.GG 전체 public surface와 Product Role 후보를 기록한다.
- [03-product-flow-architecture.md](03-product-flow-architecture.md): Site-wide navigation, entity context, engagement loop, DATE 적용 가능성과 제한을 기록한다.

## 작성 규칙

- 설명은 한국어로 작성한다.
- Framework 용어는 English로 유지한다.
- YASUN.GG의 화면 명칭과 label은 원문을 유지할 수 있다.
- Observation, Interpretation, DATE Implication, Limitation을 분리한다.
- 현재 단계에서는 Candidate Principle과 Registry를 만들지 않는다.
- 확인하지 못한 기능은 `Not Verified`로 기록한다.
- 투자 추천처럼 보이는 UX를 DATE에 직접 이식하지 않는다.

## 관련 문서

- [Prototype A UX Improvement Guide](../../../PROTOTYPE_A_UX_IMPROVEMENT_GUIDE.md)
- [KR Validation Checklist](../../../kr-experience/10-KR_VALIDATION_CHECKLIST.md)
- [DATE Product Principles](../../cross-benchmark/25-date-product-principles.md)
- [Information Visibility Model](../../cross-benchmark/38-information-visibility-model.md)
- [Navigation Context Preservation](../../cross-benchmark/42-navigation-context-preservation.md)
- [Documentation Standard](../../../../standards/DOCUMENTATION_STANDARD.md)
- [Naming Convention](../../../../standards/NAMING_CONVENTION.md)

## Access Limitation

- Login: Not Logged In
- Public Page: Observed
- Dynamic Data: Point-in-time Observation
- Source Detail: Not Expanded
- Personalization: Not Verified
- Alert / Voice: UI Cue Observed, behavior Not Verified
- Mobile: Not Observed
- Office Subdomain: Public Shell Observed, app detail Not Verified
- Stock Report: Search Snippet / Public Example Observed
- Simulated Trading: Entry and legal boundary Observed, execution Not Verified

## 현재 상태

YASUN.GG Benchmark는 보조 Reference 단계다. Cross Benchmark Matrix, Pattern Inventory, Candidate Principle Registry는 수정하지 않았다.

## 다음 단계

다음 권장 단계는 homepage, chart, news, macro, heatmap, stock report, community, simulated trading surface를 desktop / mobile viewport로 직접 캡처하고, DATE Prototype A의 Home, Market, Monitoring, Evidence, Research, Workspace 개선 항목으로 매핑하는 것이다.
