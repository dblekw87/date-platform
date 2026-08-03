# KR Market Board Next Work Prompt

다음 작업을 이어갈 때 사용할 프롬프트.

```text
DATE 홈 시장 확인 보드 작업을 이어서 진행해줘.

현재 방향:
- 메인 `/`은 한국 투자자용 시장 확인 보드다.
- 사용자는 증권사에서 직접 투자 판단을 한다.
- 이 화면은 대응 전에 확인할 시황, 뉴스, 일정, 속보·공시, 수급·차트만 빠르게 보여준다.
- 뉴스와 종목을 무리하게 1:1 원인으로 연결하지 않는다.
- 단, 미국 저유동성 종목, 소형주, 한국 테마주는 속보·공시/뉴스 반응 감지 영역에서만 연결 후보로 보여준다.

참고 문서:
- docs/date/kr-experience/KR_US_MACRO_NEWS_BOARD_DIRECTION.md
- docs/date/kr-experience/KR_MARKET_BOARD_DATA_API_PLAN.md
- docs/date/kr-experience/KR_SAVETICKER_YASUN_WIREFRAME_STUDY.md

현재 데이터 전략:
- 토스증권 Open API: 국내/미국 시세, 캔들, 체결, 환율, 랭킹, 종목 기본 정보
- 한국투자증권 Open API: 실시간 체결/호가, 국내선물옵션, 해외선물옵션, 수급, 순위분석, 프로그램매매
- KRX Open API / KRX KIND: 국내 공식 지수, 시장 통계, 수급, 파생, 시장조치, 거래소 공시
- DART: 국내 공시 원문
- SEC: 미국 공시 원문
- 뉴스: NAVER API Hub, NewsAPI, Finnhub, Benzinga, NEWSTORE, 뉴스와이어 후보

다음 작업 목표:
1. 홈 보드 컴포넌트를 mock data와 UI 렌더링으로 분리한다.
2. 각 탭별 DTO 타입을 만든다.
3. provider adapter 구조를 만든다.
4. Toss/KIS/KRX/DART/SEC/news adapter는 실제 키 없이도 mock fallback으로 동작하게 한다.
5. 추후 광고 영역이 들어갈 수 있게 상단/중단/하단 광고 slot을 레이아웃에 과하지 않게 설계한다.
6. 기존 화면 톤은 유지하되, 카드 간격/내부 여백은 현재 스타일을 기준으로 맞춘다.

주의:
- 투자 조언처럼 보이는 문구는 피한다.
- 뉴스 때문에 올랐다고 단정하지 않는다.
- 공시와 뉴스는 원문 링크, 발행/제출 시각, 출처를 반드시 보여주는 구조로 설계한다.
- 브라우저 확대/축소 이슈와 실제 CSS 스케일 이슈를 구분한다.
- 작업 후 npm.cmd run lint, npm.cmd run build를 실행한다.
```
