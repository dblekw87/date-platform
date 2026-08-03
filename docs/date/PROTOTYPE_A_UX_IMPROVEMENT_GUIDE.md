# Prototype A UX Improvement Guide

## 1. 문서 목적

이 문서는 Prototype A를 High-Fidelity로 제작하기 위한 UX 요구사항이다.

Prototype B는 내부 UX 실험 프로젝트였으며 디자이너에게 전달하지 않는다. Prototype B의 화면, route, 구조, flow, visual direction은 최종 제품 기준이 아니다.

디자이너는 Prototype A만 작업 기준으로 사용한다. Prototype B에서 검증된 결과는 Prototype A를 개선하기 위한 요구사항으로만 추출한다.

작업 목표는 Prototype A의 Product Architecture를 유지하면서 High-Fidelity 단계에서 더 명확하고, 신뢰 가능하고, 한국 사용자가 이해하기 쉬운 경험으로 다듬는 것이다.

## 2. Prototype A에서 유지해야 하는 것

Prototype A는 DATE Platform의 기준 구조다. High-Fidelity 제작 시 다음 항목은 유지한다.

- Architecture: Evidence-first product architecture, domain responsibility, screen responsibility를 변경하지 않는다.
- IA: 현재 정보 그룹, 정보 우선순위, screen family, workspace 구조를 유지한다.
- Navigation: 기존 top-level navigation, screen 간 이동 방식, context preservation 방식을 변경하지 않는다.
- Screen Flow: Home, Discovery, Entity, Evidence, Research, Monitoring, Journal로 이어지는 핵심 흐름을 유지한다.
- Entity 구조: 종목, 기업, 테마, 시장, 관계 entity의 책임과 연결 구조를 유지한다.
- Evidence 구조: source, freshness, confidence, limitation, linked entity, related evidence의 구조를 유지한다.
- Research 구조: 공식 근거, 해석, 미확인 내용, 비교, 후속 확인으로 이어지는 research 책임을 유지한다.

변경 금지 항목:

- 새 route를 추가하지 않는다.
- 기존 route를 삭제하거나 이름을 바꾸지 않는다.
- 화면 간 flow를 재설계하지 않는다.
- 기능을 추가하거나 삭제하지 않는다.
- Prototype B의 `/kr` route 또는 화면 구조를 Prototype A로 이식하지 않는다.
- Prototype A의 domain model, data relationship, entity relationship을 바꾸지 않는다.
- Evidence가 아닌 가격, 뉴스, 추천 중심 제품으로 방향을 바꾸지 않는다.
- 투자 추천, 매수/매도 유도, 수익 보장처럼 보이는 표현을 추가하지 않는다.

## 3. Prototype A에서 개선해야 하는 UX

아래 항목은 Prototype B에서 검증된 UX 결과 중 Prototype A High-Fidelity에 반드시 반영해야 하는 요구사항이다. 구조를 바꾸는 것이 아니라 같은 Prototype A 화면 안에서 표현, 밀도, 시각적 우선순위, 문맥 전달 방식을 개선한다.

### 한국어 카피

필요한 이유: Prototype A의 영어 중심 표현은 제품 구조를 설명하는 데는 적합하지만, 한국 사용자에게는 판단 흐름이 즉시 읽히지 않을 수 있다.

사용자 도움: 사용자는 기능명을 해석하지 않고도 지금 무엇을 확인해야 하는지, 어떤 근거를 봐야 하는지, 다음 행동이 무엇인지 빠르게 이해한다.

요구사항:

- 핵심 label, heading, empty state, CTA는 자연스러운 한국어로 작성한다.
- 내부 용어를 그대로 번역하지 말고 사용자 행동 중심 문장으로 바꾼다.
- "판단", "근거", "확인", "아직 모르는 내용", "다음 확인"처럼 제품 책임을 드러내는 단어를 일관되게 사용한다.

### 오늘 먼저 확인해야 하는 변화

필요한 이유: 사용자는 투자 리서치 도구에 들어왔을 때 전체 정보보다 오늘 우선 확인할 변화가 무엇인지 먼저 알고 싶어 한다.

사용자 도움: 사용자는 변화 탐색 비용을 줄이고, 공식 근거가 생긴 항목부터 확인할 수 있다.

요구사항:

- Home과 Monitoring 계열 화면에서 "오늘 먼저 볼 변화"를 fold 이전에 드러낸다.
- 변화는 가격 등락보다 공식 정보, 분석 재검토 필요성, 확인 이유를 먼저 보여준다.
- 변화 항목은 바로 Evidence 또는 Research로 이어져야 한다.

### 왜 중요한가

필요한 이유: 단순 이벤트 나열은 사용자가 그 정보를 자신의 판단에 연결하기 어렵다.

사용자 도움: 사용자는 변화가 어떤 entity, evidence, research question에 영향을 주는지 이해한다.

요구사항:

- 주요 card, list item, evidence item에는 "왜 중요한가"에 해당하는 짧은 설명을 포함한다.
- 설명은 추천이나 결론이 아니라 확인해야 하는 이유를 말한다.
- 영향 범위와 남은 불확실성을 함께 보여준다.

### 공식 확인 Badge

필요한 이유: DATE의 핵심 차별점은 공식 근거와 해석을 분리하는 것이다.

사용자 도움: 사용자는 확인된 사실과 추정, 관찰, 미확인 정보를 혼동하지 않는다.

요구사항:

- Evidence, Entity, Research, Monitoring에서 공식 확인 상태를 badge로 명확히 표시한다.
- badge는 source quality, freshness, confidence를 보조한다.
- 색상만으로 상태를 구분하지 않고 텍스트 label도 함께 제공한다.

### 확인되지 않은 내용

필요한 이유: 투자 판단에서 확인된 사실만큼 아직 확인되지 않은 내용도 중요하다.

사용자 도움: 사용자는 성급한 결론을 피하고 다음 확인 대상을 명확히 안다.

요구사항:

- Research와 Evidence 화면에서 "확인되지 않은 내용"을 기본 정보 구조 안에 포함한다.
- 미확인 내용은 오류나 빈 상태처럼 보이지 않게 설계한다.
- 공식 근거와 시각적으로 구분하되 같은 판단 흐름 안에서 읽히게 한다.

### 다음 확인 항목

필요한 이유: DATE는 판단을 대신하는 제품이 아니라 다음 확인 행동을 안내하는 제품이다.

사용자 도움: 사용자는 화면을 닫은 뒤 무엇을 다시 확인해야 하는지 기억할 수 있다.

요구사항:

- Research, Monitoring, Journal에서 다음 확인 항목을 명확히 노출한다.
- 다음 확인은 일정, source, 조건, 관련 entity와 연결해 표현한다.
- CTA는 투자 행동이 아니라 확인 행동으로 설계한다.

### CTA 구조

필요한 이유: Prototype B 검증에서 CTA가 많으면 mobile 첫 화면의 선택 부담이 커질 수 있음이 확인됐다.

사용자 도움: 사용자는 primary action과 secondary action을 혼동하지 않고 다음 화면으로 이동한다.

요구사항:

- 각 screen 또는 section에는 primary CTA를 1개 중심으로 둔다.
- secondary CTA는 보조 링크, compact action, accordion 내부 action으로 낮춘다.
- CTA label은 "확인하기", "비교하기", "다시 보기", "기록하기"처럼 행동 결과를 말한다.
- "담기", "저장"처럼 실제 저장 기능으로 오해될 수 있는 표현은 기능이 없으면 사용하지 않는다.

### Information Density

필요한 이유: Prototype A는 정보 밀도가 높지만 High-Fidelity에서는 밀도가 시각적 피로로 이어지지 않도록 조정해야 한다.

사용자 도움: 사용자는 많은 정보를 빠르게 스캔하면서도 핵심 근거와 다음 행동을 놓치지 않는다.

요구사항:

- 정보량은 줄이지 않는다.
- group, spacing, heading scale, list rhythm으로 읽기 순서를 명확히 한다.
- 반복 card를 과도하게 키우지 않고, workspace 성격에 맞는 compact density를 유지한다.
- 중요 정보는 fold 이전에 배치하고, 보조 정보는 progressive disclosure로 이동한다.

### Hero 높이

필요한 이유: 과도한 hero는 핵심 정보 접근을 늦춘다.

사용자 도움: 사용자는 첫 viewport에서 제품 맥락과 실제 확인 대상을 동시에 본다.

요구사항:

- Hero는 브랜드 설명보다 현재 작업 맥락을 전달한다.
- 첫 viewport에 다음 section의 일부가 보이게 한다.
- Home 외 화면에서는 hero를 compact하게 유지한다.
- hero 내부 CTA는 primary action 중심으로 제한한다.

### Fold 이전 정보

필요한 이유: 사용자는 scroll 전 첫 화면에서 이 화면의 가치와 다음 행동을 판단한다.

사용자 도움: 사용자는 현재 화면이 자신에게 필요한 화면인지 즉시 알 수 있다.

요구사항:

- 첫 fold 안에 title, context, primary evidence/change/research cue, primary CTA가 보여야 한다.
- 가격, decoration, marketing copy보다 공식 근거와 확인 이유를 먼저 배치한다.
- mobile에서는 fold 이전 정보가 더 엄격하게 정리되어야 한다.

### Accordion

필요한 이유: Prototype B 검증에서 보조 분석 항목은 접되, 접힌 summary가 내부 내용을 충분히 설명해야 함이 확인됐다.

사용자 도움: 사용자는 화면 밀도를 낮추면서도 숨겨진 정보의 성격을 예측할 수 있다.

요구사항:

- Accordion은 보조 정보, 상세 근거, 추가 비교, history에 사용한다.
- 핵심 공식 사실, 주요 변화, primary CTA는 기본 접힘 처리하지 않는다.
- summary는 "몇 개 보기"만 말하지 않고 내부 정보의 의미를 설명한다.

### Summary 구조

필요한 이유: 사용자는 긴 research나 evidence를 모두 읽기 전에 핵심 판단 구조를 파악해야 한다.

사용자 도움: 사용자는 확인된 사실, 영향, 미확인 내용, 다음 확인 항목을 한 번에 이해한다.

요구사항:

- Summary는 결론이 아니라 판단 재료의 구조를 요약한다.
- summary에는 confirmed, impact, unknown, next check를 포함한다.
- summary와 detail의 내용은 서로 모순되면 안 된다.

### Mobile 우선 UX

필요한 이유: Prototype B 검증에서 390px mobile viewport에서도 core route가 유지되어야 함이 확인됐다.

사용자 도움: 사용자는 mobile에서도 정보 누락, 가로 overflow, CTA 과밀 없이 핵심 흐름을 수행한다.

요구사항:

- 390px 기준으로 overflow가 없어야 한다.
- mobile first 화면에서는 primary action, 핵심 변화, 공식 확인 상태를 먼저 보여준다.
- table이나 multi-column layout은 mobile에서 list 또는 stacked structure로 전환한다.
- touch target, focus state, accordion summary, sticky context를 mobile 기준으로 검토한다.

## 4. 디자이너 작업 원칙

디자이너는 Prototype A만 전달받고 Prototype A만 기준으로 작업한다.

금지:

- Architecture 변경 금지
- Route 변경 금지
- 기능 변경 금지
- Flow 변경 금지
- Prototype B 화면 전달 금지
- Prototype B route 또는 layout 복제 금지
- 투자 추천처럼 보이는 visual hierarchy 금지

허용 및 집중 영역:

- Visual만 개선한다.
- Information Density를 개선한다.
- 한국 서비스 감성을 적용한다.
- Typography를 정교화한다.
- Spacing과 grid rhythm을 정리한다.
- Color system으로 상태, 신뢰, 중요도를 구분한다.
- Motion은 context change, accordion open/close, focus transition, feedback에 한정해 설계한다.
- Brand Experience는 Evidence-first, official, calm, decision-support 성격을 강화하는 방향으로 설계한다.

디자인 결과물은 Prototype A의 structure 위에 얹히는 High-Fidelity layer여야 한다. 제품의 뼈대는 바꾸지 않고, 사용자가 더 빠르게 이해하고 더 신뢰하며 더 자연스럽게 다음 확인으로 이동하도록 만든다.

## 5. 외부 Reference 사용 기준

High-Fidelity 제작 시 외부 제품은 Prototype A의 Architecture를 대체하지 않고 특정 UX 문제를 검토하기 위한 참고 자료로만 사용한다.

### YASUN.GG Site Reference

관련 문서:

- [YASUN.GG Benchmark](research/benchmarks/yasun/README.md)
- [YASUN.GG News Surface Observations](research/benchmarks/yasun/01-news-surface-observations.md)
- [YASUN.GG Product Surface Map](research/benchmarks/yasun/02-product-surface-map.md)
- [YASUN.GG Product Flow Architecture](research/benchmarks/yasun/03-product-flow-architecture.md)

YASUN.GG는 한국 투자자가 즉시 이해할 수 있는 실시간 trading terminal density reference로 참고한다. Prototype A의 Architecture를 대체하지 않고, 화면 표현, 정보 압축, market context 배치, freshness cue, disclaimer boundary를 개선하는 참고 자료로만 사용한다.

참고 가능한 항목은 다음이다.

- 오늘 먼저 볼 변화 요약
- live feed의 freshness 표현
- headline 안의 symbol / theme tag 압축
- source count disclosure
- 국내 사용자에게 익숙한 글로벌 / 야간 market context rail
- Home에서 시장, 속보, 테마, 환율을 한 화면에 압축하는 방식
- Macro, Heatmap, Calendar처럼 market context를 빠르게 훑는 grouped surface
- Symbol context 안에서 chart, news, analysis entry를 반복 노출하는 방식
- Utility page에서 input, preset, result summary, table, FAQ를 한 흐름으로 묶는 방식
- 투자 권유 아님 disclaimer의 boundary 표현

단, 다음 요소는 Prototype A에 직접 이식하지 않는다.

- 속보 중심 hierarchy
- 의미가 정의되지 않은 urgency score
- 평단, 수익률, 포지션 중심 cue
- SNS와 공식 근거가 섞여 보이는 source 처리
- 즉시 투자 행동을 유도하는 자동 갱신 긴급감
- leverage simulation, leaderboard, long / short cue
- community chat을 판단 근거처럼 보이게 하는 구조
- playful office metaphor를 제품 핵심 workspace처럼 사용하는 방식

DATE에 반영할 때는 `빠른 변화 감지`를 `공식 근거 확인`, `분석 재검토`, `다음 확인 항목`으로 변환한다. YASUN.GG의 speed-first terminal 구조는 Home, Market, Monitoring, Evidence entry의 표현 참고로만 사용하고, Prototype A의 Evidence-first 구조와 route는 유지한다.

## 6. Prototype A 최종 UX Guideline

High-Fidelity 제작 시 다음 원칙을 반드시 지킨다.

1. Evidence first: 모든 핵심 화면은 공식 근거와 출처 신뢰를 먼저 보여준다.
2. No recommendation: 매수, 매도, 수익, 확정 판단처럼 보이는 표현과 visual emphasis를 피한다.
3. Clear uncertainty: 확인된 사실과 확인되지 않은 내용을 같은 수준으로 명확히 구분한다.
4. Action as verification: CTA는 투자 행동이 아니라 확인, 비교, 재검토, 기록 행동으로 설계한다.
5. Compact but readable: 정보량은 유지하되 grouping, spacing, typography로 스캔 가능하게 만든다.
6. Mobile credible: mobile에서도 핵심 route, CTA, summary, official badge, next check가 깨지지 않아야 한다.
7. Fold discipline: 첫 viewport는 화면 목적, 핵심 변화 또는 근거, primary CTA를 보여준다.
8. Progressive disclosure: 보조 정보는 접을 수 있지만 summary가 내부 정보의 의미를 설명해야 한다.
9. Context preservation: 사용자가 Entity, Evidence, Research, Monitoring 사이를 이동해도 이전 판단 맥락을 잃지 않아야 한다.
10. Korean service quality: 한국어 카피, spacing, density, visual tone은 국내 사용자가 신뢰할 수 있는 금융 서비스 수준으로 설계한다.

최종 기준: Prototype A의 Architecture와 Flow는 유지하고, Prototype B에서 검증된 UX 결과만 High-Fidelity 요구사항으로 흡수한다. Prototype B는 폐기하며 디자이너에게 전달하지 않는다.
