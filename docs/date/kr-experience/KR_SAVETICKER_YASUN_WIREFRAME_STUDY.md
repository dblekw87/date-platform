# SaveTicker + YASUN.GG Wireframe Study

## 문서 목적

이 문서는 SaveTicker와 YASUN.GG를 함께 참고해 DATE 한국형 High-Fidelity 방향의 예시 Wireframe 기준을 정리한다.

핵심 결론은 `뉴스와 종목을 직접 연결하지 않는다`는 것이다. News, 속보, 시장 변화는 바로 종목 판단으로 이어지지 않고, 미국장 매크로 시황, Source Boundary, Evidence State, 확인 질문, 다음 확인 조건을 거친 뒤 대응 맥락으로만 사용한다.

## 두 Reference의 역할 분리

| Reference | 강점 | DATE에 가져올 것 | DATE에 가져오지 않을 것 |
| --- | --- | --- | --- |
| SaveTicker | Source, Publisher, timestamp, AI Summary, Translation / Original control을 같은 Article context에 둔다. | 원문 / 요약 / 번역 / 출처의 경계, summary는 evidence가 아니라 compression layer라는 원칙 | AI Summary를 근거처럼 보이게 하는 구조, ticker tag를 verified entity relation처럼 보이게 하는 구조 |
| YASUN.GG | 한국 투자자가 바로 읽는 terminal density, market rail, live feed, symbol / theme compression, macro context | 첫 화면의 market context 압축, freshness cue, source count disclosure, grouped macro / event context | 평단, 수익률, 롱숏 채팅, 레버리지, leaderboard, speed-first urgency |

## 조합 원칙

1. Market first, not recommendation first.
2. News is an input, not a decision.
3. Entity is a candidate until evidence confirms relation.
4. Summary and translation are interpretation layers.
5. Source count is not confidence.
6. Freshness is useful only with source state.
7. Next check is the primary action.
8. Cause wording is avoided unless evidence directly proves the relation.
9. Macro context comes before entity context in short-term trading use cases.
10. News-to-entity linking is allowed only in a separate small-cap / theme reaction scanner.
11. The short-term trading hierarchy is market/news first, flow second, chart/technical analysis third.

## Wireframe 방향

화면 이름:
`미국장 매크로 뉴스 보드`

사용자 질문:

- 미국장 분위기는 위험 선호인가, 회피인가?
- 금리, 달러, 지수선물, 원자재 중 무엇이 먼저 움직이는가?
- 같은 시간대에 어떤 헤드라인 흐름이 관찰되는가?
- 이 headline은 공식 이벤트인가, 언론 보도인가, 시장 관찰인가?
- 대응 전 어떤 조건을 다시 확인해야 하는가?

## 화면 구조

```text
Top Shell
  - 검색
  - 시장 기준점 rail
  - session / freshness cue

Main Board
  - 미국장 분위기
  - Headline flow
  - Macro rail
  - 수급
  - 차트 / 기술적 분석
  - 시장 반응 구간
  - 각 item: 변화 / macro variable / 출처 상태 / 확인 질문 / 다음 확인

Evidence Boundary Panel
  - 공식 출처
  - 언론 보도
  - SNS / 관찰
  - 요약 / 번역은 해석 layer로 분리

Candidate Impact Panel
  - 영향 후보 Entity는 보조 정보로만 노출
  - 연결 상태: 확인됨 / 보류 / 제외
  - 연결 이유보다 부족한 근거를 먼저 표시

News Reaction Scanner
  - 소형주 / 미국 저유동성 종목 / 한국 테마주
  - headline과 가격 반응이 같은 시간대에 관찰된 종목
  - 원문 확인, 유동성, 급등락, 재료 지속성을 함께 표시

Next Check Queue
  - 일정
  - source
  - condition
  - owner screen
```

## 핵심 Guardrail

| 위험 | Wireframe 처리 |
| --- | --- |
| 속보가 종목 추천처럼 보임 | 종목을 하단 보조 정보로 낮추고, 상단은 macro context와 확인 조건으로 구성한다. |
| 출처 수가 신뢰도로 오해됨 | source count 옆에 source type과 official status를 함께 표시한다. |
| 요약이 원문을 대체함 | summary card에 `해석 레이어` label을 고정한다. |
| 시장 rail이 price-first가 됨 | price보다 `확인 이유`, `freshness`, `source state`를 먼저 둔다. |
| 다음 행동이 투자 행동으로 보임 | primary CTA는 `원문 확인`, `근거 비교`, `다음 확인 설정`으로 제한한다. |
| 뉴스가 원인처럼 보임 | `때문에 상승` 대신 `같은 시간대에 관찰`, `함께 확인할 변수`로 표현한다. |
| 테마주 news-driven 움직임을 놓침 | 별도 `뉴스 반응 감지` section에서만 종목 연결을 허용한다. |

## 구현 위치

예시 Wireframe route:

`/kr/reference-board`

이 route는 Prototype A 구조를 대체하지 않는다. SaveTicker + YASUN.GG 조합을 검토하기 위한 독립 와이어프레임이다.
