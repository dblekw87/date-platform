# 접근 범위와 조사 방법

## 접속 환경

- Service: EidosLayer
- Official service URL: https://eidoslayer.com/
- Access Date: 2026-07-27
- Timezone Context: Asia/Seoul
- Access Mode: Public, not logged in
- Device: Desktop research environment
- Viewport: Not directly measured in this text extraction pass
- Browser/Fetcher: Official product pages accessed through rendered web text extraction

## 공개 접근 범위

Public으로 확인한 화면:

- Home: https://eidoslayer.com/
- Stocks / Market: https://eidoslayer.com/stocks
- Eidos AI: https://eidoslayer.com/eidos-ai
- Insight Feed: https://eidoslayer.com/feed
- Community: https://eidoslayer.com/community
- EidosMarket: https://eidoslayer.com/predictions
- Circuit Breaker AI Waiting Room: https://eidoslayer.com/stocks/circuit-breaker

## 로그인 필요 범위

Observation:
Stocks 화면은 `계정 정보를 불러오는 중`과 `내 관심종목 실시간` 영역을 표시했고, 관심종목이 없을 때 `종목 목록에서 ★을 눌러 추가하세요`라고 안내했다. Eidos AI 화면은 `회원 전용 도구는 로그인 후 실시간 데이터와 상세 AI 멘트를 볼 수 있어요`라고 표시했다. Circuit Breaker AI 화면은 `회원 전용`, `회원 상태 확인 중`, `계정 확인 중` 상태를 표시했다.

Interpretation:
EidosLayer는 공개 discovery surface와 로그인 기반 personal/AI tool surface를 분리하는 것으로 보인다. Watchlist, 상세 AI comment, live tool detail은 로그인 후 continuity나 personalization으로 확장될 가능성이 있다.

User Impact:
비로그인 사용자는 시장/뉴스/인사이트의 구조는 이해할 수 있지만, 저장, 상세 AI, 개인화된 재방문 가능성은 검증하기 어렵다.

DATE Implication:
DATE 조사에서도 공개 discovery와 로그인 continuity 기능을 분리해 평가해야 한다.

Confidence:
High for visible login gates, Medium for personalization interpretation.

Evidence:
Official Product Observation, https://eidoslayer.com/stocks, https://eidoslayer.com/eidos-ai, https://eidoslayer.com/stocks/circuit-breaker, accessed 2026-07-27.

## 유료 기능 제한

공개 화면에서 명시적인 유료 구독 문구는 확인하지 못했다. Eidos AI와 Circuit Breaker AI에는 회원 전용 문구가 있었지만 유료 여부는 확인되지 않았다.

## 조사 방법

- Phase 0의 `05-screen-research-template.md` 항목을 화면별 inventory 필드로 변환했다.
- `06-benchmark-scope-and-scenarios.md`의 12개 공통 Research Scenario를 EidosLayer에 적용했다.
- 공식 서비스 화면에서 직접 확인한 텍스트와 링크만 Observation으로 기록했다.
- 공식 화면을 열지 못한 News detail, Theme detail, Community detail, Prediction detail 등은 사실처럼 기록하지 않았다.

## 증거 수집 방식

Evidence Type은 다음 값을 사용한다.

- Official Product Observation: 공식 서비스 화면에서 확인
- Official Documentation: 공식 문서 또는 공식 블로그에서 확인
- Secondary Source: 제3자 자료
- Inference: Observation에서 도출한 해석

이번 문서 세트는 `Official Product Observation`과 `Inference`만 사용했다.

## 알려진 한계

- 화면은 렌더링된 텍스트 기준으로 확인했으며 실제 픽셀 배치, hover, keyboard support, mobile menu interaction은 직접 조작하지 못했다.
- 일부 동적 영역은 `불러오는 중`, `LIVE 연결 중`, `시세 불러오는 중` 상태로 관찰되었다.
- `/news`, `/themes`, 일부 detail route는 공식 링크는 확인됐지만 열람 시 cache/fetch 제한으로 내용을 확인하지 못했다.
- 로그인 후 Watchlist, notification, AI 상세 멘트, 댓글 작성, 저장, 재방문 기능은 확인하지 못했다.

## Observation Confidence 규칙

- High: 공식 화면에서 직접 텍스트, 링크, 상태를 확인했다.
- Medium: 공식 화면 Observation을 바탕으로 구조적 의도를 해석했다.
- Low: 접근 제한 또는 동적 로딩 때문에 부분 Observation만 가능했다.
