# YASUN.GG Product Flow Architecture

## 문서 목적

이 문서는 YASUN.GG 전체 public surface에서 보이는 Product Flow Architecture 후보를 정리한다.

현재 문서는 Reference Architecture가 아니다. DATE Prototype A의 High-Fidelity 표현과 information flow 개선에 참고할 수 있는 구조만 추출한다.

## Core Flow 후보

```text
Home / Symbol Sidebar
  -> Chart / Symbol Context
  -> News / Macro / Heatmap / Calendar
  -> Stock Report / Analysis Candidate
  -> Community / Chat / Simulation Candidate
  -> Utility / External Workflow
```

이 flow는 실제 user journey 검증이 아니라 public surface 연결을 바탕으로 한 후보 구조다.

## Flow 1. Market State에서 Symbol Context로

Observation:
Home은 지금 시장, 시장 도미넌스, 24시간 인기 종목, 핫 테마, 환율을 보여준다. 공통 shell은 symbol / index search와 symbol sidebar를 제공한다. Chart와 symbol routes는 chart, chat, news, analysis tab을 반복한다.

Interpretation:
사용자는 market-level 변화에서 특정 symbol로 이동하고, 같은 symbol context에서 chart, news, analysis, chat을 전환할 수 있다.

DATE Implication:
DATE Home과 Market은 시장 변화에서 Entity, Evidence, Research로 이어지는 path를 더 직접적으로 보여줄 수 있다. 단, DATE에서는 chart / chat보다 official evidence와 확인 이유가 우선이다.

Confidence:
High

## Flow 2. Live News에서 Entity / Theme Context로

Observation:
News item은 freshness, headline, category, symbol tag, theme tag, source count를 함께 노출한다. Home에서도 실시간 속보 entry가 존재한다.

Interpretation:
news를 독립 article이 아니라 market entity와 theme에 연결된 event candidate로 취급한다.

DATE Implication:
DATE Monitoring과 Evidence entry는 news-like event를 바로 결론으로 연결하지 않고, `공식 확인`, `영향 대상`, `아직 확인되지 않은 내용`, `다음 확인 source`로 변환해야 한다.

Confidence:
High

## Flow 3. Macro / Calendar에서 Next Check로

Observation:
Macro는 commodities, FX, rates, global indices, crypto를 grouped dashboard로 제공한다. Calendar는 monthly view, KST, domestic / overseas, importance filter, search를 제공한다.

Interpretation:
YASUN.GG는 price movement와 scheduled event를 같은 terminal ecosystem 안에서 다룬다.

DATE Implication:
DATE는 Monitoring과 Research에서 `다음 확인 항목`을 market event schedule과 연결할 수 있다. Calendar 자체를 새 route로 이식하기보다 existing Journal / Monitoring / Research context 안에 due date, source, condition을 더 명확히 표시한다.

Confidence:
High

## Flow 4. Signal / Report에서 Trading Action으로

Observation:
Stock report example은 valuation, RS, Minervini, leader history, market signal, news tabs를 제공한다. Trade와 Leaderboard는 simulated trading, seed point, leverage, PnL, win rate를 노출한다.

Interpretation:
YASUN.GG는 analysis / signal consumption에서 simulated action and competition으로 이어지는 engagement loop를 갖는 것으로 보인다.

DATE Implication:
DATE는 이 loop를 직접 따르지 않는다. Research output은 매수 / 매도 / leverage / competition이 아니라 확인해야 할 근거와 판단 변경 조건으로 끝나야 한다.

Confidence:
Medium

## Flow 5. Utility에서 External Workflow로

Observation:
Fees는 input preset, calculated result summary, comparison table, FAQ를 제공한다. TV Watchlist는 KOSPI / KOSDAQ / coin selection, TradingView TXT output, copy / download, usage guide를 제공한다.

Interpretation:
YASUN.GG는 core terminal에서 벗어난 반복 작업을 standalone utility로 제공하고, external trading tool workflow와 연결한다.

DATE Implication:
DATE에서 export / save / external workflow를 제공할 경우, core Evidence flow와 명확히 분리하고 사용자가 무엇을 내보내는지, 어떤 context가 유지되는지 설명해야 한다.

Confidence:
High

## Flow 6. Community Opinion Boundary

Observation:
Lounge는 post entry를 제공하고, Chat popup은 채팅 시작 전 투자 자문이 아니며 채팅 내용을 매매 근거로 쓰지 말라는 안내를 보여준다. Chat에는 long / short cue가 있다.

Interpretation:
YASUN.GG는 real-time community opinion을 market terminal 안에 넣되, legal / responsibility boundary를 별도 안내로 둔다.

DATE Implication:
DATE Prototype A에는 community opinion을 넣지 않는다. 다만 사용자-generated 또는 third-party interpretation을 다룰 때 `근거 아님`, `공식 확인 필요`, `판단에 직접 사용 금지` 같은 boundary wording은 참고할 수 있다.

Confidence:
Medium

## Flow 7. Workspace Metaphor

Observation:
Office subdomain은 Excel, Outlook, VS Code, Slack, Teams, ChatGPT, Gemini, Notion, Jira 같은 app launcher를 market data context와 연결하는 shell을 제공한다.

Interpretation:
YASUN.GG는 trading data를 familiar productivity workspace metaphor로 재배치하는 concept surface를 실험하는 것으로 보인다.

DATE Implication:
DATE는 playful office metaphor를 직접 쓰지 않는다. 대신 Research Workspace, Journal, Monitoring 사이에서 context restore, saved set, next action을 유지하는 workspace responsibility만 참고한다.

Confidence:
Medium

## DATE 적용 Guardrail

| YASUN.GG Pattern | DATE에서 가능한 변환 | 금지 또는 주의 |
| --- | --- | --- |
| Terminal shell | persistent context, symbol / evidence search, next check rail | chart / price-first dominance |
| Live feed | official evidence change feed | unverified headline urgency |
| Source count | related evidence disclosure | source count as confidence |
| Macro groups | market context group | macro dashboard가 main task를 압도 |
| Calendar filter | next check condition / due date | event speculation |
| Quant report | structured research input | buy / sell / better stock recommendation |
| Community boundary | interpretation / opinion disclaimer | chat or long / short cue |
| Utility workflow | compact tool pattern | external trading action push |

## Prototype A 반영 우선순위

| Priority | Area | Reason |
| --- | --- | --- |
| High | Home first fold change summary | YASUN.GG Home은 market state와 latest cue를 첫 화면에서 압축한다. |
| High | Monitoring item density | freshness, symbol, theme, source cue를 한 item에 담는 pattern이 유용하다. |
| High | Evidence source disclosure | source cluster cue는 DATE의 related evidence disclosure로 변환 가능하다. |
| Medium | Market macro grouping | Macro category grouping은 DATE Market context에 참고 가능하다. |
| Medium | Calendar / next check link | economic event filter는 다음 확인 항목 설계에 참고 가능하다. |
| Low | Utility pattern | Fees / TV Watchlist는 core architecture 밖의 tool reference다. |
| Excluded | Community / simulation | DATE Prototype A 방향과 충돌한다. |

## 남은 확인

- desktop / mobile screenshot으로 common shell이 실제 viewport에서 어떻게 배치되는지 확인한다.
- chart and symbol route에서 analysis tab이 report로 연결되는지 직접 확인한다.
- source disclosure를 펼쳐 official source와 media / SNS source가 어떻게 분리되는지 확인한다.
- stock report의 method, source, freshness를 확인한다.
- privacy / terms / non-commercial disclaimer를 별도 policy reference로 검토한다.
