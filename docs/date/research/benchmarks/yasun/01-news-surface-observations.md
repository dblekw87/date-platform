# YASUN.GG News Surface Observations

## 문서 목적

이 문서는 YASUN.GG `/news` public page에서 확인한 News Surface 구조를 DATE Prototype A High-Fidelity 개선 참고 자료로 기록한다.

현재 문서는 보조 Reference다. DATE Product Architecture, Route, Candidate Principle, Registry를 변경하지 않는다.

## Surface Summary

| Surface | Observation | Interpretation | Confidence |
| --- | --- | --- | --- |
| Header | `YASUN.GG BETA`, login button, symbol / index search input이 상단에 있다. | 사용자가 news feed로 들어와도 곧바로 symbol context로 전환할 수 있게 만든 구조로 해석된다. | High |
| Symbol Sidebar | crypto, weekend futures, indices, commodity, FX, Korean symbols 등 market watch 대상이 긴 목록으로 배치된다. | 한국 투자자가 장중 / 야간 / 글로벌 변화를 한 화면에서 스캔하도록 돕는 context rail일 수 있다. | High |
| Average Price Cue | `내 평단` 영역과 평단 등록 안내가 있다. | live news와 개인 포지션 context를 결합하려는 개인화 후보로 해석된다. 실제 저장과 계산은 Not Verified다. | Medium |
| Today Headline | `오늘의 헤드라인` 아래 자동 큐레이션된 주요 뉴스가 카드처럼 노출된다. | full feed 이전에 우선순위 높은 변화만 먼저 보여주는 summary layer다. | High |
| Live News Feed | `실시간 속보`는 최근 12건, 자동 갱신, category count, theme tag, list item을 함께 보여준다. | speed-first monitoring surface로, 사용자가 변화 발생 여부를 빠르게 판단하게 한다. | High |
| Source Count | 일부 item에는 `출처 n곳 펼치기` cue가 표시된다. | source clustering 또는 duplicate confirmation을 암시하지만, 펼친 내용은 이번 조사에서 확인하지 않았다. | Medium |
| Footer Disclaimer | 투자 권유가 아니며 정보는 참고용이라는 disclaimer가 footer에 있다. | 빠른 market information product에서 투자 책임 boundary를 명시하는 장치다. | High |

## News Item Information Structure

| Information Unit | Observation | DATE Relevance | Limitation |
| --- | --- | --- | --- |
| Time / Freshness | 각 속보에 시각과 상대 시간이 표시된다. | DATE Monitoring의 `freshness`와 `next check` 노출에 참고할 수 있다. | feed update reliability는 Not Verified |
| Urgency Score Candidate | headline 앞에 두 자리 숫자가 표시된다. | 변화 우선순위 cue로 참고 가능하지만 DATE에서는 의미 정의 없이 점수 UI를 쓰면 안 된다. | score meaning Not Verified |
| Category Label | 속보, 공시, 외신, SNS, 언론사명 후보가 item에 표시된다. | Evidence Type과 Source Type을 빠르게 구분하는 label 구조에 참고 가능하다. | label taxonomy Not Verified |
| Symbol Tag | `$엔비디아`, `$SK하이닉스`, `$삼성전자` 같은 심볼 tag가 headline 근처에 있다. | News / Change / Evidence를 Entity로 연결하는 compact pattern으로 참고 가능하다. | independent entity navigation Not Verified |
| Theme Tag | `#무역/관세`, `#금리/FED`, `#유가/원자재` 같은 theme tag가 있다. | DATE의 theme / market context 연결에 참고 가능하다. | theme taxonomy ownership Not Verified |
| Source Count | 여러 출처 수가 item 단위로 표시된다. | 공식 근거가 여러 개인지, 중복 보도인지, 원문 확인이 필요한지 알려주는 disclosure pattern 후보가 된다. | source quality and original link Not Verified |

## DATE에 참고할 수 있는 Pattern

### 빠른 변화 우선 노출

Observation:
YASUN.GG는 full feed 이전에 오늘의 headline을 먼저 보여주고, live feed에는 최신 12건과 자동 갱신 cue를 붙인다.

Interpretation:
사용자는 긴 뉴스 목록을 읽기 전에 지금 우선 볼 변화가 있는지 빠르게 판단할 수 있다.

DATE Implication:
Prototype A의 Home, Market, Monitoring에서 `오늘 먼저 확인할 변화`를 fold 이전에 노출할 때 참고할 수 있다. 단, DATE에서는 가격 급등락이나 속보 자체보다 `공식 근거가 생겼는가`, `기존 Analysis를 재검토해야 하는가`, `아직 확인할 source가 무엇인가`를 먼저 보여야 한다.

Confidence:
High

### Item 안의 Entity / Theme 압축

Observation:
YASUN.GG news item은 headline, symbol tag, theme tag, source count, freshness를 한 item 안에 함께 배치한다.

Interpretation:
별도 detail을 열기 전에도 news가 어떤 투자 대상과 market theme에 연결되는지 빠르게 스캔할 수 있다.

DATE Implication:
DATE Evidence list와 Monitoring item은 `Entity`, `Evidence Type`, `Theme`, `Freshness`, `Unknown`을 한 행에서 읽히게 만들 수 있다. 단, visual density를 높이더라도 verified / unverified boundary는 분리해야 한다.

Confidence:
High

### Source Count Disclosure

Observation:
일부 headline에는 여러 출처를 펼칠 수 있다는 cue가 있다.

Interpretation:
단일 기사보다 여러 source가 같은 event를 다루는지 확인하게 만드는 disclosure pattern일 수 있다.

DATE Implication:
DATE Evidence Detail과 Research 비교 화면에서 related evidence나 corroborating source를 compact disclosure로 제공할 때 참고할 수 있다. 단, `출처 수`가 곧 신뢰도처럼 보이면 안 되며, official source / media source / social source를 구분해야 한다.

Confidence:
Medium

### 한국 투자자용 Market Context Rail

Observation:
Symbol sidebar는 crypto, weekend futures, Korean index futures, US indices, semiconductor, FX, commodity, Korean blue-chip 후보를 한 rail에 배치한다.

Interpretation:
한국 사용자가 국내 장 종료 이후에도 글로벌 / 야간 market context를 연속적으로 확인하려는 사용 습관을 반영한 구조일 수 있다.

DATE Implication:
DATE Market와 Monitoring에서는 국내 종목만 고립해서 보여주기보다 글로벌 지수, FX, commodity, sector context와 연결된 변화 이유를 보여줄 수 있다. 단, DATE Prototype A의 route와 Entity model을 바꾸지 않고 현재 Information Group 안에서만 반영해야 한다.

Confidence:
High

## DATE에 직접 이식하면 안 되는 요소

| Element | Risk | DATE Treatment |
| --- | --- | --- |
| 속보 중심 hierarchy | 빠른 news consumption이 공식 근거 검증보다 앞설 수 있다. | speed cue는 Monitoring에 한정하고 Evidence-first order를 유지한다. |
| 의미가 불명확한 score | 사용자가 신뢰도나 투자 우선순위로 오해할 수 있다. | score를 쓰려면 definition, source, limitation을 함께 제공한다. |
| 평단 / 수익률 cue | DATE가 portfolio performance product처럼 보일 수 있다. | Prototype A High-Fidelity에는 직접 반영하지 않는다. |
| SNS source 혼합 | 검증된 official evidence와 rumor가 섞일 수 있다. | Source Type과 Verification Status를 분리한다. |
| 자동 갱신 urgency | 사용자가 즉시 투자 행동을 해야 한다고 느낄 수 있다. | `다음 확인`과 `재검토 필요`로 표현한다. |

## Prototype A High-Fidelity 반영 후보

| Prototype A Area | 반영 후보 | Guardrail |
| --- | --- | --- |
| Home | 오늘 먼저 확인할 변화 요약 | 투자 행동 CTA가 아니라 Evidence 확인 CTA로 연결 |
| Discovery | symbol / theme tag를 compact하게 노출 | popularity나 price movement를 판단처럼 강조하지 않음 |
| Entity | 관련 change와 source count를 상단 context로 노출 | 가격 / 차트가 Evidence보다 우선하지 않음 |
| Evidence | related source disclosure와 confirmed / unconfirmed 구분 | 출처 수를 confidence로 오해하지 않게 label 제공 |
| Research | headline을 판단 재료로 변환하는 summary 구조 | 결론이 아니라 confirmed, impact, unknown, next check 유지 |
| Monitoring | live cue, freshness, next check를 함께 표시 | 자동 갱신보다 재검토 조건을 먼저 설명 |

## Open Questions

- YASUN.GG mobile layout에서 live feed와 symbol sidebar의 우선순위는 어떻게 바뀌는가.
- source disclosure를 펼쳤을 때 original source, duplicate article, publisher type, timestamp가 어떻게 구분되는가.
- headline score의 정의가 공개되어 있는가.
- 개인화 기능이 login 기반인지 local input 기반인지 확인할 수 있는가.
- DATE Prototype A에서 source cluster를 보여줄 때 `공식 확인`, `언론 보도`, `SNS 관찰`을 어떤 visual hierarchy로 분리할 것인가.

## 다음 작업

1. `/news`를 desktop과 390px mobile에서 screenshot으로 확인한다.
2. source disclosure interaction을 확인한다.
3. DATE Prototype A Home / Monitoring / Evidence list에 적용 가능한 item pattern만 별도 High-Fidelity requirement로 추출한다.
4. Prototype A UX Improvement Guide에 YASUN.GG Reference 항목을 추가할지 검토한다.
