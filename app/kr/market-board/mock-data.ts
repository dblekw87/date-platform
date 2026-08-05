import type { MarketBoardData } from "./types";

const timestamp = "2026-08-04T08:40:00+09:00";

export const mockMarketBoardData: MarketBoardData = {
  tabs: [
    { id: "market", label: "시황", description: "미국 매크로와 국내 개장 기준점을 먼저 확인합니다." },
    { id: "news", label: "뉴스", description: "미국 뉴스, 국내 뉴스, 테마 흐름, 헤드라인 흐름을 확인합니다." },
    { id: "calendar", label: "일정", description: "공모주, 실적발표, FOMC, CPI처럼 날짜가 정해진 이벤트를 캘린더로 봅니다." },
    { id: "breaking", label: "속보·공시", description: "SEC, 인수합병, 매각, 금리, 정책 이벤트처럼 즉시 확인할 항목을 모읍니다." },
    { id: "flow", label: "수급·차트", description: "시황과 뉴스를 본 뒤 수급과 기술적 위치를 확인합니다." }
  ],
  disclosureTabs: [
    { id: "us", label: "미국 SEC", description: "SEC 공시, 인수합병, 지분 변동, 매각, 금리 이벤트를 미국장 기준으로 봅니다." },
    { id: "kr", label: "국내 DART", description: "DART 공시, 공급계약, 최대주주 변경, CB/BW, 유상증자, 테마주 재료를 국내장 기준으로 봅니다." }
  ],
  leaderTabs: [
    { id: "us", label: "미국 주도주" },
    { id: "kr", label: "국내 주도주" }
  ],
  adSlots: [
    { id: "top", label: "상단 광고 영역", reserved: true },
    { id: "middle", label: "중단 광고 영역", reserved: true },
    { id: "bottom", label: "하단 광고 영역", reserved: true }
  ],
  providerStatuses: [
    { id: "toss", label: "토스증권 Open API", status: "mock", message: "API 키 없음 · provider 비활성", checkedAt: timestamp },
    { id: "kis", label: "한국투자증권 Open API", status: "mock", message: "API 키 없음 · provider 비활성", checkedAt: timestamp },
    { id: "krx", label: "KRX Open API / KIND", status: "mock", message: "API 키 없음 · provider 비활성", checkedAt: timestamp },
    { id: "dart", label: "DART Open API", status: "mock", message: "API 키 없음 · provider 비활성", checkedAt: timestamp },
    { id: "sec", label: "SEC EDGAR", status: "ready", message: "공개 API · adapter 준비", checkedAt: timestamp },
    { id: "news", label: "뉴스 공급자", status: "mock", message: "뉴스 API 키 없음 · provider 비활성", checkedAt: timestamp }
  ],
  macroSnapshot: [
    { id: "nasdaq-future", label: "NASDAQ 선물", market: "US", instrumentType: "future", symbol: "NQ", value: "+0.42%", tone: "up", note: "AI 대형주 반등 구간", timestamp, source: "mock" },
    { id: "sp500-future", label: "S&P 500 선물", market: "US", instrumentType: "future", symbol: "ES", value: "+0.28%", tone: "up", note: "미국장 전체 기준", timestamp, source: "mock" },
    { id: "phlx-sox", label: "필라델피아 반도체지수", market: "US", instrumentType: "index", symbol: "SOX", value: "+0.51%", tone: "up", note: "미국 반도체 섹터 기준", timestamp, source: "mock" },
    { id: "kospi-day-future", label: "KOSPI 주간선물", market: "KR", instrumentType: "future", symbol: "K200", value: "대기", tone: "flat", note: "장중 수급 확인", timestamp, source: "mock" },
    { id: "kospi-night-future", label: "KOSPI 야간선물", market: "KR", instrumentType: "future", symbol: "K200N", value: "+0.31%", tone: "up", note: "국내 개장 전 반응", timestamp, source: "mock" },
    { id: "wti", label: "오일선물", market: "GLOBAL", instrumentType: "commodity", symbol: "WTI", value: "78.4", tone: "up", note: "에너지 비용 변수", timestamp, source: "mock" },
    { id: "kosdaq-night-future", label: "KOSDAQ 야간선물", market: "KR", instrumentType: "future", symbol: "KQ150N", value: "+0.44%", tone: "up", note: "중소형주 기준", timestamp, source: "mock" },
    { id: "russell-future", label: "Russell 2000 선물", market: "US", instrumentType: "future", symbol: "RTY", value: "+0.36%", tone: "up", note: "미국 중소형주 기준", timestamp, source: "mock" },
    { id: "gold", label: "금선물", market: "GLOBAL", instrumentType: "commodity", symbol: "GC", value: "2,3xx", tone: "flat", note: "안전자산 기준", timestamp, source: "mock" },
    { id: "usd-krw", label: "원/달러 환율", market: "KR", instrumentType: "fx", symbol: "USD/KRW", value: "1,36x", tone: "flat", note: "국내 개장 전 확인", timestamp, source: "mock" },
    { id: "btc", label: "BTC", market: "CRYPTO", instrumentType: "crypto", symbol: "BTC", value: "6x,xxx", tone: "up", note: "위험 선호 참고", timestamp, source: "mock" },
    { id: "vix", label: "VIX", market: "US", instrumentType: "index", symbol: "VIX", value: "15.8", tone: "down", note: "위험 회피 완화", timestamp, source: "mock" },
    { id: "us10y", label: "10Y 금리", market: "US", instrumentType: "rate", symbol: "US10Y", value: "4.18%", tone: "flat", note: "전일 고점 아래 유지", timestamp, source: "mock" }
  ],
  marketBrief: [
    { id: "us-macro", region: "미국 매크로", title: "금리 부담은 줄었지만 CPI 전까지 방향성은 제한적입니다.", points: ["10Y 금리는 전일 고점 아래", "달러 강세는 둔화", "CPI 전 포지션 조정 가능성"], source: "mock", timestamp },
    { id: "kr-market", region: "국내 시황", title: "국내 개장은 미국장 기술주와 환율 반응을 먼저 확인합니다.", points: ["야간선물 방향 확인", "외국인 선물 수급 대기", "반도체 대형주 갭 출발 여부"], source: "mock", timestamp }
  ],
  headlineFlow: [
    { id: "hf-power", time: "09:18", source: "테마", region: "KR", publishedAt: "2026-08-04T09:18:00+09:00", originalUrl: "#", label: "전력설비", text: "AI 전력 수요 뉴스 이후 일부 테마주 거래대금이 증가했습니다.", provider: "mock", isNew: true },
    { id: "hf-chip", time: "09:00", source: "국내", region: "KR", publishedAt: "2026-08-04T09:00:00+09:00", originalUrl: "#", label: "반도체", text: "국내 반도체 대형주는 미국장 반응과 환율을 함께 확인해야 합니다.", provider: "mock", isNew: true },
    { id: "hf-rate", time: "08:35", source: "매크로", region: "GLOBAL", publishedAt: "2026-08-04T08:35:00+09:00", originalUrl: "#", label: "금리", text: "장기금리 상승 압력이 둔화되며 성장주 부담이 완화되는 흐름입니다.", provider: "mock" },
    { id: "hf-ai", time: "08:10", source: "미국", region: "US", publishedAt: "2026-08-04T08:10:00+09:00", originalUrl: "#", label: "AI 인프라", text: "데이터센터 투자 headline이 기술주 반등 구간과 함께 관찰됩니다.", provider: "mock" },
    { id: "hf-futures", time: "07:58", source: "매크로", region: "GLOBAL", publishedAt: "2026-08-04T07:58:00+09:00", originalUrl: "#", label: "선물", text: "미국 지수선물과 국내 야간선물 방향을 개장 전 기준점으로 확인합니다.", provider: "mock" },
    { id: "hf-bio", time: "07:44", source: "미국", region: "US", publishedAt: "2026-08-04T07:44:00+09:00", originalUrl: "#", label: "바이오", text: "FDA 관련 헤드라인은 원문과 공시 여부를 분리해 확인합니다.", provider: "mock" },
    { id: "hf-policy", time: "07:31", source: "국내", region: "KR", publishedAt: "2026-08-04T07:31:00+09:00", originalUrl: "#", label: "정책", text: "정책 뉴스는 업종별 반응과 거래대금 동반 여부만 참고합니다.", provider: "mock" },
    { id: "hf-fx", time: "07:12", source: "매크로", region: "GLOBAL", publishedAt: "2026-08-04T07:12:00+09:00", originalUrl: "#", label: "환율", text: "원/달러 환율은 국내 수출주와 외국인 수급 확인의 보조 지표입니다.", provider: "mock" },
    { id: "hf-oil", time: "06:55", source: "매크로", region: "GLOBAL", publishedAt: "2026-08-04T06:55:00+09:00", originalUrl: "#", label: "유가", text: "WTI 흐름은 에너지 비용 민감 업종과 함께 참고합니다.", provider: "mock" },
    { id: "hf-ma", time: "06:42", source: "미국", region: "US", publishedAt: "2026-08-04T06:42:00+09:00", originalUrl: "#", label: "M&A", text: "인수합병 보도는 SEC 원문과 거래 조건 확인 전까지 후보로만 표시합니다.", provider: "mock" }
  ],
  calendarItems: [
    { id: "cal-big-tech", date: "2026-08-04", day: "화", type: "실적", title: "미국 대형 기술주 실적 발표", market: "미국", check: "가이던스와 시간외 반응", detail: "발표 후 시간외 지수선물, QQQ, SOXX 반응을 같이 확인합니다.", source: "mock" },
    { id: "cal-ipo", date: "2026-08-04", day: "화", type: "공모주", title: "국내 공모주 청약 일정", market: "국내", check: "수요예측, 환불일, 상장일", detail: "청약 경쟁률보다 수요예측, 의무보유확약, 상장일 유통물량을 우선 확인합니다.", source: "mock" },
    { id: "cal-cpi", date: "2026-08-06", day: "목", type: "매크로", title: "CPI 발표", market: "미국", check: "컨센서스와 금리 반응", detail: "예상치 대비 결과보다 10Y 금리, 달러지수, 나스닥 선물의 동시 반응을 봅니다.", source: "BLS" },
    { id: "cal-fomc", date: "2026-08-07", day: "금", type: "FOMC", title: "연준 발언 / 금리 경로", market: "미국", check: "인상·동결 표현 변화", detail: "성명서 문구 변화와 기자회견에서 물가, 고용, 인하 시점 표현을 확인합니다.", source: "Federal Reserve" },
    { id: "cal-kr-earnings", date: "2026-08-10", day: "월", type: "실적", title: "국내 반도체 / 2차전지 실적", market: "국내", check: "컨센서스 대비 매출과 마진", detail: "장전 발표면 시초가 갭보다 외국인 수급과 거래대금 유지 여부를 우선 봅니다.", source: "mock" },
    { id: "cal-listing", date: "2026-08-12", day: "수", type: "신규상장", title: "신규 상장 예정 종목", market: "국내", check: "상장일 유통물량", detail: "시초가 형성 이후 거래대금과 기관 의무보유확약 해제 일정을 확인합니다.", source: "mock" }
  ],
  usDisclosures: [
    { id: "sec-13dg", market: "US", source: "SEC", urgency: "지분", formType: "13D/G", title: "행동주의 / 대량보유 지분 변동", filedAt: "2026-08-04T08:20:00+09:00", originalUrl: "#", tags: ["소형주도 포함"], action: "보유 목적과 지분율 변화 확인" },
    { id: "sec-8k-ma", market: "US", source: "SEC", urgency: "M&A", formType: "8-K", title: "인수합병, 합병계약, 주요 계약 체결", filedAt: "2026-08-04T08:22:00+09:00", originalUrl: "#", tags: ["미국 잡주 반응 구간"], action: "거래 조건과 종료 조건 확인" },
    { id: "sec-8k-sale", market: "US", source: "SEC", urgency: "매각", formType: "8-K", title: "사업부 매각, 구조조정, 자산 처분", filedAt: "2026-08-04T08:25:00+09:00", originalUrl: "#", tags: ["재료 지속성 확인"], action: "현금 유입 규모와 부채 영향 확인" },
    { id: "sec-s1", market: "US", source: "SEC", urgency: "증자", formType: "S-1", title: "신규 발행, 등록신고서, 워런트 포함 여부", filedAt: "2026-08-04T08:28:00+09:00", originalUrl: "#", tags: ["희석 주의"], action: "발행 주식수와 할인율 확인" },
    { id: "fed-rate", market: "US", source: "FED", urgency: "금리", formType: "FOMC", title: "금리 인상 / 동결 / 인하 표현 변화", filedAt: "2026-08-04T08:30:00+09:00", originalUrl: "#", tags: ["매크로 속보"], action: "성명서 원문과 기자회견 확인" },
    { id: "fda-policy", market: "US", source: "FDA", urgency: "테마", formType: "Policy", title: "승인, 규제, 보조금, 제재 headline", filedAt: "2026-08-04T08:33:00+09:00", originalUrl: "#", tags: ["바이오 / 에너지 / 방산"], action: "공식 기관 원문 여부 확인" }
  ],
  krDisclosures: [
    { id: "dart-contract", market: "KR", source: "DART", urgency: "계약", formType: "주요사항", title: "단일판매·공급계약 체결", filedAt: "2026-08-04T08:12:00+09:00", originalUrl: "#", tags: ["테마주 / 소형주 포함"], action: "계약 금액, 매출 대비 비중, 기간 확인" },
    { id: "dart-ma", market: "KR", source: "DART", urgency: "M&A", formType: "주요사항", title: "타법인 주식 취득, 합병, 영업양수도", filedAt: "2026-08-04T08:15:00+09:00", originalUrl: "#", tags: ["인수합병"], action: "취득 목적과 자금 조달 방식 확인" },
    { id: "dart-control", market: "KR", source: "DART", urgency: "지배구조", formType: "공시", title: "최대주주 변경, 경영권 변동, 대표이사 변경", filedAt: "2026-08-04T08:17:00+09:00", originalUrl: "#", tags: ["경영권 재료"], action: "변경 전후 지분과 보호예수 확인" },
    { id: "dart-financing", market: "KR", source: "DART", urgency: "자금조달", formType: "유상증자", title: "유상증자, CB, BW, 전환가액 조정", filedAt: "2026-08-04T08:19:00+09:00", originalUrl: "#", tags: ["희석 / 급등락 주의"], action: "납입일, 할인율, 전환 조건 확인" },
    { id: "dart-earnings", market: "KR", source: "DART", urgency: "실적", formType: "잠정실적", title: "잠정실적, 매출액 또는 손익구조 변동", filedAt: "2026-08-04T08:23:00+09:00", originalUrl: "#", tags: ["실적발표"], action: "컨센서스 대비와 일회성 여부 확인" },
    { id: "krx-warning", market: "KR", source: "KRX", urgency: "주의", formType: "시장조치", title: "투자경고, 조회공시, 거래정지 / 재개", filedAt: "2026-08-04T08:27:00+09:00", originalUrl: "#", tags: ["잡주 필수 확인"], action: "거래 제한과 해제 조건 확인" }
  ],
  flowItems: [
    { id: "flow-foreign", label: "외국인", status: "개장 후 확인", detail: "선물과 현물 방향이 같은지 봅니다.", source: "mock", timestamp },
    { id: "flow-institution", label: "기관", status: "보조 확인", detail: "프로그램 매매와 대형주 수급을 함께 봅니다.", source: "mock", timestamp },
    { id: "flow-etf", label: "ETF", status: "중요", detail: "QQQ, SOXX, 반도체 ETF 반응을 확인합니다.", source: "mock", timestamp },
    { id: "flow-turnover", label: "거래대금", status: "필수", detail: "테마주와 소형주는 거래대금 동반 여부를 봅니다.", source: "mock", timestamp },
    { id: "flow-chart", label: "차트", status: "마지막", detail: "전일 고점, VWAP, 눌림 구간만 확인합니다.", source: "mock", timestamp },
    { id: "flow-risk", label: "리스크", status: "필수", detail: "갭 상승, 저유동성, 뉴스 소멸 구간을 표시합니다.", source: "mock", timestamp }
  ],
  usLeadingStocks: [
    { id: "us-ai-b", symbol: "AIB", name: "AI 인프라 B", market: "US", marketLabel: "미국 저유동", burst: "1분 거래량 680%", turnover: "$42M", intraday: "VWAP 위 유지", reason: "프리마켓 속보 이후 체결 강도 증가", caution: "스프레드 확인", timestamp, source: "mock" },
    { id: "us-bio-d", symbol: "BIOD", name: "소형 바이오 D", market: "US", marketLabel: "미국 잡주", burst: "5분 거래량 540%", turnover: "$31M", intraday: "전고점 돌파", reason: "FDA headline 이후 거래대금 집중", caution: "갭 상승 부담", timestamp, source: "mock" },
    { id: "us-ma-e", symbol: "MAE", name: "M&A 후보 E", market: "US", marketLabel: "미국 중소형", burst: "1분 거래량 430%", turnover: "$58M", intraday: "첫 눌림 대기", reason: "인수합병 보도와 SEC 8-K 확인 구간", caution: "원문 조건 확인", timestamp, source: "mock" }
  ],
  krLeadingStocks: [
    { id: "kr-power-a", symbol: "000A", name: "전력설비 A", market: "KR", marketLabel: "한국 테마주", burst: "5분 거래량 420%", turnover: "860억", intraday: "1분봉 재돌파", reason: "AI 전력 headline 이후 테마 내 거래대금 집중", caution: "고점 추격 주의", timestamp, source: "mock" },
    { id: "kr-chip-c", symbol: "000C", name: "반도체 장비 C", market: "KR", marketLabel: "국내 중소형", burst: "5분 거래량 310%", turnover: "520억", intraday: "첫 눌림 후 반등", reason: "섹터 강세와 외국인 선물 방향 동반", caution: "거래대금 유지 필요", timestamp, source: "mock" },
    { id: "kr-policy-f", symbol: "000F", name: "정책 테마 F", market: "KR", marketLabel: "국내 소형주", burst: "1분 거래량 390%", turnover: "310억", intraday: "상한가 근처", reason: "정책 keyword와 DART 공시 확인 구간", caution: "조회공시 여부 확인", timestamp, source: "mock" }
  ],
  smallCapScanner: [
    { id: "scan-us-lowfloat", group: "미국 잡주", name: "저유동 AI 전력 후보", signal: "headline 이후 거래량 증가", caution: "스프레드와 급등락 확인", source: "mock", timestamp },
    { id: "scan-kr-theme", group: "한국 테마주", name: "전력설비 테마 후보", signal: "AI 전력 뉴스와 검색량 증가", caution: "공시 원문 없음", source: "mock", timestamp },
    { id: "scan-small-policy", group: "소형주", name: "정책 수혜 후보군", signal: "정책 keyword와 종목 반응 동시 관찰", caution: "매출 연결 근거 확인", source: "mock", timestamp }
  ]
};
