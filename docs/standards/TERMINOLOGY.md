# DATE 공식 용어집

이 문서는 DATE 프로젝트의 공식 용어를 정의한다. 설명은 한국어로 작성하지만, 아래 용어는 문서 전체에서 영어 그대로 사용한다.

## Entity

### Definition

DATE에서 독립적으로 식별 가능한 Product Object다. Stock, Company, Event, Theme, Industry처럼 Research와 Product 구조에서 관계를 가질 수 있는 단위가 포함될 수 있다.

### Why this term

투자 분석은 단일 화면보다 Entity 간 관계와 전환으로 구성된다.

### Usage Rule

항상 `Entity`라고 작성한다.

### Forbidden Translation

- 객체
- 개체
- 오브젝트

## Evidence

### Definition

투자 판단을 support하거나 contradict할 수 있는 Source, News, Metric, Event, 사용자 기록, 분석 메모의 후보 단위다.

### Why this term

DATE는 단순 정보 소비보다 판단 재검증과 traceability를 중요하게 다룬다.

### Usage Rule

항상 `Evidence`라고 작성한다.

### Forbidden Translation

- 근거
- 증거
- 참고자료

## Observation

### Definition

실제 화면, 공식 문서, 접근 제한, 사용자 Flow에서 확인한 사실이다.

### Why this term

Research 문서에서 사실과 해석을 분리하기 위한 기준 단위다.

### Usage Rule

항상 `Observation`이라고 작성한다.

### Forbidden Translation

- 관찰
- 확인 사실

## Interpretation

### Definition

Observation을 바탕으로 구조의 의도, 사용자 영향, Product 선택 이유를 해석한 내용이다.

### Why this term

Benchmark의 화면을 기능 목록이 아니라 설계 이유로 분석하기 위해 필요하다.

### Usage Rule

항상 `Interpretation`이라고 작성한다.

### Forbidden Translation

- 해석
- 설명

## Hypothesis

### Definition

아직 검증되지 않은 Product, UX, Information Architecture, Entity Architecture, Navigation 관련 가설이다.

### Why this term

Research 완료 전 Decision을 만들지 않기 위해 필요하다.

### Usage Rule

항상 `Hypothesis`라고 작성하고 Decision처럼 표현하지 않는다.

### Forbidden Translation

- 가설
- 추정안

## Candidate Principle

### Definition

여러 Benchmark에서 Cross Validation이 필요한 Product Principle 후보이다.

### Why this term

하나의 Benchmark에서 반복 관찰된 Pattern을 DATE 원칙으로 확정하지 않기 위해 필요하다.

### Usage Rule

항상 `Candidate Principle`이라고 작성한다.

### Forbidden Translation

- 후보 원칙
- 설계 원칙

## Navigation

### Definition

사용자가 Product Surface, Entity, Screen, Flow 사이를 이동하는 구조다.

### Why this term

투자 분석은 여러 정보 단위 사이의 이동과 Context Preservation에 크게 의존한다.

### Usage Rule

항상 `Navigation`이라고 작성한다.

### Forbidden Translation

- 탐색
- 이동 구조
- 메뉴

## Workspace

### Definition

사용자가 분석 상태, Entity 집합, Filter, Layout, Evidence를 저장하고 재사용할 수 있는 Product 영역 또는 구조 후보이다.

### Why this term

DATE의 Personal Continuity와 cross-session analysis를 설명하는 데 필요하다.

### Usage Rule

항상 `Workspace`라고 작성한다.

### Forbidden Translation

- 작업공간
- 작업 공간

## Dashboard

### Definition

개인화된 상태, Market 요약, Portfolio, Watchlist, 주요 Signal을 한 화면에서 확인할 수 있는 Product Surface 후보이다.

### Why this term

Home, Portfolio, Watchlist의 역할을 구분하기 위해 필요하다.

### Usage Rule

항상 `Dashboard`라고 작성한다.

### Forbidden Translation

- 대시보드
- 현황판

## Surface

### Definition

사용자가 인식할 수 있는 Product의 주요 접근 영역이다.

### Why this term

페이지, 기능, 화면을 혼동하지 않고 Product의 노출 영역을 기록하기 위해 필요하다.

### Usage Rule

항상 `Surface`라고 작성한다.

### Forbidden Translation

- 표면
- 영역

## Flow

### Definition

사용자가 Trigger에서 시작해 탐색, 비교, Evidence Validation, 저장, 재방문으로 이어지는 이동과 판단 흐름이다.

### Why this term

단순 page transition이 아니라 사용자의 판단 흐름을 기록하기 위해 필요하다.

### Usage Rule

항상 `Flow`라고 작성한다.

### Forbidden Translation

- 흐름
- 플로우

## Information Architecture

### Definition

정보, Entity, Screen, Navigation, Taxonomy가 어떤 기준으로 조직되는지 정의하는 Architecture 영역이다.

### Why this term

DATE의 구조를 기능 목록이 아니라 정보 조직 기준으로 검토하기 위해 필요하다.

### Usage Rule

항상 `Information Architecture`라고 작성한다.

### Forbidden Translation

- 정보 구조
- 정보 설계

## Entity Architecture

### Definition

Entity의 식별 기준, 관계, 전환, 저장, 표시 방식을 정의하는 Architecture 영역이다.

### Why this term

Company, Stock, Event, Theme, News의 관계를 확정하기 전 검증하기 위해 필요하다.

### Usage Rule

항상 `Entity Architecture`라고 작성한다.

### Forbidden Translation

- Entity 구조
- 개체 설계

## Navigation Architecture

### Definition

Global Navigation, Local Navigation, Contextual Navigation, Personal Navigation의 역할과 깊이를 정의하는 Architecture 영역이다.

### Why this term

Navigation을 메뉴 목록이 아니라 분석 Context와 연결된 구조로 검토하기 위해 필요하다.

### Usage Rule

항상 `Navigation Architecture`라고 작성한다.

### Forbidden Translation

- Navigation 구조
- 메뉴 구조

## Information Density

### Definition

한 Screen 또는 Surface에서 제공되는 정보량과 그 정보를 이해하는 데 필요한 구조적 비용이다.

### Why this term

전문 투자 도구의 높은 정보량이 언제 유효한지 판단하기 위해 필요하다.

### Usage Rule

항상 `Information Density`라고 작성한다.

### Forbidden Translation

- 정보 밀도
- 밀도

## Context Preservation

### Definition

사용자가 Flow 중 이전 Entity, Filter, Query, Chart State, Evidence 맥락을 잃지 않는 정도다.

### Why this term

투자 분석은 비교와 재검증 과정에서 context loss가 발생하기 쉽다.

### Usage Rule

항상 `Context Preservation`이라고 작성한다.

### Forbidden Translation

- 맥락 유지
- 컨텍스트 유지

## Trade-off

### Definition

어떤 Product 선택이 제공하는 이점과 동시에 발생시키는 비용 또는 제약이다.

### Why this term

Candidate Principle의 장점만 기록하지 않고 비용도 함께 검토하기 위해 필요하다.

### Usage Rule

항상 `Trade-off`라고 작성한다.

### Forbidden Translation

- 절충
- 장단점

## Confidence

### Definition

Observation과 Interpretation의 신뢰 수준이다.

### Why this term

검증 깊이가 다른 Research 결과를 같은 강도로 다루지 않기 위해 필요하다.

### Usage Rule

`High`, `Medium`, `Low` 중 하나로 기록한다.

### Forbidden Translation

- 신뢰도
- 확신도

## Cross Validation

### Definition

하나의 Benchmark에서 나온 Candidate를 다른 Benchmark와 사용자 Research에서 다시 검증하는 과정이다.

### Why this term

단일 Benchmark에서 나온 Pattern을 DATE 원칙으로 확정하지 않기 위해 필요하다.

### Usage Rule

항상 `Cross Validation`이라고 작성한다.

### Forbidden Translation

- 교차 검증
- 상호 검증

## Registry

### Definition

Candidate, Principle, 용어, 결정 기록을 누적 관리하는 공유 문서다.

### Why this term

장기 Research 프로젝트에서 누적 판단을 추적하기 위해 필요하다.

### Usage Rule

항상 `Registry`라고 작성한다.

### Forbidden Translation

- 등록부
- 목록

## Insight

### Definition

Market, Entity, Event, Metric, News에 대한 해석 또는 분석 콘텐츠다.

### Why this term

단순 News와 분석적 해석을 구분하기 위해 필요하다.

### Usage Rule

항상 `Insight`라고 작성한다.

### Forbidden Translation

- 통찰
- 분석글

## Prediction

### Definition

미래 Market, Event, 가격, 결과에 대한 예측 또는 참여형 판단 단위다.

### Why this term

Discussion, Signal, Evidence와 다른 참여형 판단 단위를 구분하기 위해 필요하다.

### Usage Rule

항상 `Prediction`이라고 작성한다.

### Forbidden Translation

- 예측
- 전망

## Market

### Definition

거래 가능한 자산과 관련 Signal, 가격 변화, 거시 환경을 포함하는 분석 범위다.

### Why this term

DATE가 단일 Stock 분석뿐 아니라 시장 변화와 연결되는 Product임을 표현하기 위해 필요하다.

### Usage Rule

항상 `Market`이라고 작성한다.

### Forbidden Translation

- 시장
- 장세

## Watchlist

### Definition

사용자가 관심 있는 Stock, ETF, Company, Theme 등을 저장하고 반복 접근하는 목록이다.

### Why this term

Personal Continuity와 monitoring entry를 검토하기 위해 필요하다.

### Usage Rule

항상 `Watchlist`라고 작성한다.

### Forbidden Translation

- 관심종목
- 관심 목록

## Portfolio

### Definition

사용자가 보유하거나 추적하는 자산 집합과 그 위험, 기회, Evidence 변화를 관리하는 단위다.

### Why this term

보유 자산 중심 Journey와 Research 중심 Journey를 구분하기 위해 필요하다.

### Usage Rule

항상 `Portfolio`라고 작성한다.

### Forbidden Translation

- 포트폴리오
- 보유 자산

## Discussion

### Definition

사용자 의견, 질문, Market 반응, 참여형 맥락이 오가는 Product Surface 또는 Entity 관계 후보이다.

### Why this term

Community sentiment와 Evidence를 혼동하지 않기 위해 필요하다.

### Usage Rule

항상 `Discussion`이라고 작성한다.

### Forbidden Translation

- 토론
- 게시판

## Freshness

### Definition

정보가 얼마나 최신인지, 언제 업데이트되었는지, 지연 여부가 있는지를 나타내는 신뢰 신호다.

### Why this term

투자 정보는 Source뿐 아니라 시점이 중요하기 때문이다.

### Usage Rule

항상 `Freshness`라고 작성한다.

### Forbidden Translation

- 최신성
- 갱신 시점

## Signal

### Definition

투자 판단에 영향을 줄 수 있는 가격 변화, News, Event, Metric 변화, 사용자 행동, Market 상태의 감지 단위다.

### Why this term

단순 data point와 판단 trigger를 구분하기 위해 필요하다.

### Usage Rule

항상 `Signal`이라고 작성한다.

### Forbidden Translation

- 신호
- 단서

## Source

### Definition

Evidence가 유래한 원문, 데이터 제공자, 뉴스 매체, 공시, 방법론, API, 작성 주체다.

### Why this term

Trust와 Evidence Traceability를 판단하기 위해 필요하다.

### Usage Rule

항상 `Source`라고 작성한다.

### Forbidden Translation

- 출처
- 원천

## Event

### Definition

Market 또는 Entity에 영향을 줄 수 있는 구조화된 변화 단위다.

### Why this term

News 원문과 투자 판단에 필요한 변화 단위를 구분하기 위해 필요하다.

### Usage Rule

항상 `Event`라고 작성한다.

### Forbidden Translation

- 사건
- 이벤트

## Theme

### Definition

여러 Company, Stock, Industry, Event를 연결하는 투자 주제 또는 구조 변화 단위다.

### Why this term

개별 Stock보다 넓은 discovery와 relationship 탐색을 기록하기 위해 필요하다.

### Usage Rule

항상 `Theme`이라고 작성한다.

### Forbidden Translation

- 테마
- 주제

## Sector

### Definition

Market에서 Company나 Stock을 상위 산업 범주로 묶는 분류 단위다.

### Why this term

Industry보다 상위 범주의 비교 단위를 구분하기 위해 필요하다.

### Usage Rule

항상 `Sector`라고 작성한다.

### Forbidden Translation

- 섹터
- 업종

## Industry

### Definition

Sector보다 구체적인 사업 영역 또는 경쟁 구도 단위다.

### Why this term

Company와 peer comparison을 구조화하기 위해 필요하다.

### Usage Rule

항상 `Industry`라고 작성한다.

### Forbidden Translation

- 산업
- 업계

## Metric

### Definition

가격, 거래량, 재무 수치, 거시 지표, 성과 지표처럼 비교와 판단에 사용되는 정량 데이터다.

### Why this term

숫자 data를 Evidence, Signal, Entity와 구분해 기록하기 위해 필요하다.

### Usage Rule

항상 `Metric`이라고 작성한다.

### Forbidden Translation

- 지표
- 수치

## Evidence Graph

### Definition

Evidence, Entity, Event, Metric, Source, 사용자 판단을 관계로 연결해 재검증과 재방문을 가능하게 하는 구조 후보이다.

### Why this term

DATE의 핵심 Descriptor인 투자 근거 연결을 구조적으로 검토하기 위해 필요하다.

### Usage Rule

항상 `Evidence Graph`라고 작성한다.

### Forbidden Translation

- 근거 그래프
- 증거 그래프
