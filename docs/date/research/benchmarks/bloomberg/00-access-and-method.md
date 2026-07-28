# Bloomberg Access and Method

## 조사 환경

| 항목 | 값 |
| --- | --- |
| 조사 날짜 | 2026-07-28 KST |
| Timezone | Asia/Seoul |
| Device | Desktop |
| Browser | Web extraction / official URL review |
| Bloomberg.com Public Access | Partially Observed |
| Bloomberg Account Login | Not Logged In |
| Digital Subscription | No Digital Subscription |
| Bloomberg Terminal Access | No Direct Terminal Session |
| Bloomberg Anywhere Access | No Bloomberg Anywhere session |
| Bloomberg Subscription | No Terminal or Digital Subscription |
| Bloomberg Professional Services 계약 | No Institutional Contract |
| Mobile App 조사 | Official Documentation Only |
| Official Demonstration 사용 | Not Used in this phase |
| Secondary Source 사용 | Not Used |

## Terminal Access Boundary

```text
Bloomberg Terminal:
Institutional Access Required
No Direct Terminal Session
Official Documentation and Official Product Description Only
```

Observation:
Bloomberg Terminal과 Bloomberg Anywhere는 공식 Product Page와 Access Page에서 Terminal subscription, Bloomberg Anywhere, biometric / multiple-method authentication, Bloomberg Professional App, Request a Demo를 설명한다.

Interpretation:
Terminal은 Public Web Product가 아니라 Professional / Institutional workflow Product로 분리해야 한다. 직접 session 없이 Function 실행, command parsing, workspace persistence, entitlement behavior를 확정할 수 없다.

Evidence:
https://professional.bloomberg.com/products/bloomberg-terminal/
https://professional.bloomberg.com/products/bloomberg-terminal/access/
https://bba.bloomberg.com/
확인 날짜: 2026-07-28 KST

Confidence:
High

## Public Access 범위

| Scope | Access Level | Observation Status | Evidence Type | Limitation |
| --- | --- | --- | --- | --- |
| Bloomberg.com Home | Public | Partially Observed | Official Product Observation | Dynamic rendering과 region / subscription state 차이는 Not Verified |
| Bloomberg Markets | Public | Observed | Official Product Observation | 일부 table 값과 order는 time-sensitive |
| Stocks / Futures / Commodities / Currencies / Rates & Bonds | Public | Observed / Partially Observed | Official Product Observation | 일부 pages는 search snippet 또는 direct page extraction 기준 |
| Bloomberg Quote / Security Page | Public | Partially Observed | Official Product Observation | AAPL direct open은 bot challenge로 제한. Search result snippet으로 quote structure만 Partial 기록 |
| Bloomberg News Article | Public / Subscription Candidate | Partially Observed | Official Product Observation | article body depth와 paywall behavior는 article별로 다를 수 있음 |
| Search | Public | Partially Observed | Official Product Observation | search result ranking과 suggestion behavior는 Not Verified |
| Subscription | Public | Observed | Official Pricing / Sales | actual subscriber experience는 Not Verified |

## Official Source 범위

| Source | 사용 범위 | Evidence Type |
| --- | --- | --- |
| Bloomberg Professional Services | Terminal, Access, News, Charts, Portfolio Analytics, Collaboration, Research, Data, Trading | Official Product Description |
| Bloomberg Anywhere | remote Terminal login, B-Unit requirement, mobile access | Official Product Observation |
| Bloomberg.com | Home, Markets, market data, article, subscription | Official Product Observation |
| Bloomberg Subscription Page | Digital Subscription, All Access, app access, newsletters, live TV / radio | Official Pricing / Sales |
| Bloomberg Help / Support | support, software updates, API components, B-Unit setup | Official Documentation |
| Bloomberg Law / Tax / Government / BNEF official sites | Separate Domain 또는 Supporting Scope 존재 확인 | Official Product Description |

## Official Demonstration 범위

Official Demonstration은 이번 Phase 6.1에서 직접 사용하지 않았다.

Bloomberg Terminal Product Page에는 Terminal Essentials video / playlist 진입이 표시되지만, 이번 단계에서는 video 내용을 Interaction Evidence로 사용하지 않았다.

## Secondary Source 사용 여부

Secondary Source는 사용하지 않았다.

Search engine snippet은 Bloomberg official URL에서 수집된 공개 페이지 요약을 보조 Evidence로만 사용했다. 공식 URL과 연결되지 않는 제3자 자료는 사용하지 않았다.

## Observation Status 정의

| Status | 정의 |
| --- | --- |
| Observed | Public Web 또는 공식 Product Page에서 직접 확인한 항목 |
| Partially Observed | 일부 구조는 확인했으나 dynamic UI, login state, direct interaction이 제한된 항목 |
| Official Documentation Only | 공식 Help / Support / Documentation에서만 확인한 항목 |
| Official Demonstration Only | 공식 영상, demo, screenshot에서만 확인한 항목 |
| Subscription Required | Digital Subscription 또는 paid subscription이 필요한 항목 |
| Institutional Access Required | Bloomberg Terminal / Professional Services 계약이 필요한 항목 |
| Login Required | Bloomberg account 또는 Bloomberg Anywhere login이 필요한 항목 |
| Inference | 공식 자료 기반 관계 후보이나 직접 확인하지 못한 항목 |
| Not Verified | 이번 단계에서 확인하지 못한 항목 |

## Evidence Type 정의

| Evidence Type | 정의 |
| --- | --- |
| Official Product Observation | Bloomberg.com 또는 Bloomberg-owned Product page에서 직접 확인한 화면 / page 구조 |
| Official Documentation | Bloomberg Help, Support, Documentation에서 확인한 설명 |
| Official Demonstration | Bloomberg 공식 demo, video, screenshot에서 확인한 구조 |
| Official Product Description | Bloomberg Professional Services Product Page의 공식 설명 |
| Official Pricing / Sales | subscription, request demo, sales, pricing 관련 공식 설명 |
| Secondary Source | 공식 자료로 확인할 수 없는 경우에만 사용하는 제3자 자료 |
| Inference | 공식 Evidence에서 도출한 제한적 추론 |

## Access Limitation

- Bloomberg Terminal 직접 session은 없다.
- Function Code 실행은 확인하지 않았다.
- Command Line autocomplete, recent function, favorite function, history는 Not Verified다.
- Launchpad workspace persistence는 공식 Product Description 기준 후보로만 기록한다.
- Bloomberg Anywhere login은 B-Unit이 필요하므로 직접 확인하지 않았다.
- Digital Subscription article depth와 subscriber-only personalization은 Not Verified다.
- Mobile App은 Official Documentation Only다.
- Exchange entitlement와 organization-level permission은 직접 확인하지 않았다.

## 조사 제외 범위

- Navigation Architecture
- User Journey
- Entity Relationship 확정
- User State 분석
- Information Density 분석
- Trust / Evidence 평가
- Product Flow Architecture
- Candidate Principle
- Registry 업데이트
- Commit / Push

## Confidence 기준

| Confidence | 기준 |
| --- | --- |
| High | 공식 Product Page 또는 Public Web에서 명확한 Product / Surface 존재와 Access Level을 확인 |
| Medium | 공식 자료는 있으나 실제 UI interaction 또는 내부 detail이 제한됨 |
| Low | Evidence가 간접적이며 관계 또는 책임이 후보 수준임 |
