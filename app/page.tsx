"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.scss";

type TabId = "market" | "news" | "calendar" | "breaking" | "flow";
type DisclosureRegion = "us" | "kr";
type LeaderRegion = "us" | "kr";

const tabs: Array<{ id: TabId; label: string; description: string }> = [
  { id: "market", label: "시황", description: "미국 매크로와 국내 개장 기준점을 먼저 확인합니다." },
  { id: "news", label: "뉴스", description: "미국 뉴스, 국내 뉴스, 테마 흐름, 헤드라인 흐름을 확인합니다." },
  { id: "calendar", label: "일정", description: "공모주, 실적발표, FOMC, CPI처럼 날짜가 정해진 이벤트를 캘린더로 봅니다." },
  { id: "breaking", label: "속보·공시", description: "SEC, 인수합병, 매각, 금리, 정책 이벤트처럼 즉시 확인할 항목을 모읍니다." },
  { id: "flow", label: "수급·차트", description: "시황과 뉴스를 본 뒤 수급과 기술적 위치를 확인합니다." }
];

const macroSnapshot = [
  { label: "NASDAQ 선물", value: "+0.42%", tone: "up", note: "AI 대형주 반등 구간" },
  { label: "S&P 500 선물", value: "+0.28%", tone: "up", note: "미국장 전체 기준" },
  { label: "KOSPI 주간선물", value: "대기", tone: "flat", note: "장중 수급 확인" },
  { label: "KOSPI 야간선물", value: "+0.31%", tone: "up", note: "국내 개장 전 반응" },
  { label: "오일선물", value: "78.4", tone: "up", note: "에너지 비용 변수" },
  { label: "KOSDAQ 야간선물", value: "+0.44%", tone: "up", note: "중소형주 기준" },
  { label: "Russell 2000 선물", value: "+0.36%", tone: "up", note: "미국 중소형주 기준" },
  { label: "금선물", value: "2,3xx", tone: "flat", note: "안전자산 기준" },
  { label: "원/달러 환율", value: "1,36x", tone: "flat", note: "국내 개장 전 확인" },
  { label: "BTC", value: "6x,xxx", tone: "up", note: "위험 선호 참고" },
  { label: "VIX", value: "15.8", tone: "down", note: "위험 회피 완화" },
  { label: "10Y 금리", value: "4.18%", tone: "flat", note: "전일 고점 아래 유지" }
];

const marketBrief = [
  {
    region: "미국 매크로",
    title: "금리 부담은 줄었지만 CPI 전까지 방향성은 제한적입니다.",
    points: ["10Y 금리는 전일 고점 아래", "달러 강세는 둔화", "CPI 전 포지션 조정 가능성"]
  },
  {
    region: "미국 뉴스",
    title: "AI 인프라, 전력, 반도체 헤드라인이 같은 흐름으로 묶입니다.",
    points: ["대형 기술주 반등과 함께 관찰", "전력 설비 테마 동반", "개별 종목 원인 단정은 보류"]
  },
  {
    region: "국내 시황",
    title: "국내 개장은 미국장 기술주와 환율 반응을 먼저 확인합니다.",
    points: ["야간선물 방향 확인", "외국인 선물 수급 대기", "반도체 대형주 갭 출발 여부"]
  },
  {
    region: "국내 뉴스",
    title: "정책, 공시, 테마 뉴스는 소형주 반응 구간만 따로 봅니다.",
    points: ["테마주 뉴스 반응 감지", "공시 원문 여부 확인", "거래대금 동반 여부 확인"]
  }
];

const headlineFlow = [
  { time: "08:10", source: "미국", label: "AI 인프라", text: "데이터센터 투자 headline이 기술주 반등 구간과 함께 관찰됩니다." },
  { time: "08:35", source: "매크로", label: "금리", text: "장기금리 상승 압력이 둔화되며 성장주 부담이 완화되는 흐름입니다." },
  { time: "09:00", source: "국내", label: "반도체", text: "국내 반도체 대형주는 미국장 반응과 환율을 함께 확인해야 합니다." },
  { time: "09:18", source: "테마", label: "전력설비", text: "AI 전력 수요 뉴스 이후 일부 테마주 거래대금이 증가했습니다." }
];

const calendarItems = [
  { date: "2026-08-04", day: "화", type: "실적", title: "미국 대형 기술주 실적 발표", market: "미국", check: "가이던스와 시간외 반응", detail: "발표 후 시간외 지수선물, QQQ, SOXX 반응을 같이 확인합니다." },
  { date: "2026-08-04", day: "화", type: "공모주", title: "국내 공모주 청약 일정", market: "국내", check: "수요예측, 환불일, 상장일", detail: "청약 경쟁률보다 수요예측, 의무보유확약, 상장일 유통물량을 우선 확인합니다." },
  { date: "2026-08-06", day: "목", type: "매크로", title: "CPI 발표", market: "미국", check: "컨센서스와 금리 반응", detail: "예상치 대비 결과보다 10Y 금리, 달러지수, 나스닥 선물의 동시 반응을 봅니다." },
  { date: "2026-08-07", day: "금", type: "FOMC", title: "연준 발언 / 금리 경로", market: "미국", check: "인상·동결 표현 변화", detail: "성명서 문구 변화와 기자회견에서 물가, 고용, 인하 시점 표현을 확인합니다." },
  { date: "2026-08-10", day: "월", type: "실적", title: "국내 반도체 / 2차전지 실적", market: "국내", check: "컨센서스 대비 매출과 마진", detail: "장전 발표면 시초가 갭보다 외국인 수급과 거래대금 유지 여부를 우선 봅니다." },
  { date: "2026-08-12", day: "수", type: "공모주", title: "신규 상장 예정 종목", market: "국내", check: "상장일 유통물량", detail: "시초가 형성 이후 거래대금과 기관 의무보유확약 해제 일정을 확인합니다." }
];

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 5 + 1;

  if (day < 1) {
    return null;
  }

  return {
    date: `2026-08-${String(day).padStart(2, "0")}`,
    day
  };
});

const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];

const disclosureTabs: Array<{ id: DisclosureRegion; label: string; description: string }> = [
  { id: "us", label: "미국 SEC", description: "SEC 공시, 인수합병, 지분 변동, 매각, 금리 이벤트를 미국장 기준으로 봅니다." },
  { id: "kr", label: "국내 DART", description: "DART 공시, 공급계약, 최대주주 변경, CB/BW, 유상증자, 테마주 재료를 국내장 기준으로 봅니다." }
];

const usDisclosures = [
  { source: "SEC 13D/G", urgency: "지분", title: "행동주의 / 대량보유 지분 변동", tag: "소형주도 포함", action: "보유 목적과 지분율 변화 확인" },
  { source: "SEC 8-K", urgency: "M&A", title: "인수합병, 합병계약, 주요 계약 체결", tag: "미국 잡주 반응 구간", action: "거래 조건과 종료 조건 확인" },
  { source: "SEC 8-K", urgency: "매각", title: "사업부 매각, 구조조정, 자산 처분", tag: "재료 지속성 확인", action: "현금 유입 규모와 부채 영향 확인" },
  { source: "SEC S-1", urgency: "증자", title: "신규 발행, 등록신고서, 워런트 포함 여부", tag: "희석 주의", action: "발행 주식수와 할인율 확인" },
  { source: "FOMC", urgency: "금리", title: "금리 인상 / 동결 / 인하 표현 변화", tag: "매크로 속보", action: "성명서 원문과 기자회견 확인" },
  { source: "FDA / 정책", urgency: "테마", title: "승인, 규제, 보조금, 제재 headline", tag: "바이오 / 에너지 / 방산", action: "공식 기관 원문 여부 확인" }
];

const krDisclosures = [
  { source: "DART", urgency: "계약", title: "단일판매·공급계약 체결", tag: "테마주 / 소형주 포함", action: "계약 금액, 매출 대비 비중, 기간 확인" },
  { source: "DART", urgency: "M&A", title: "타법인 주식 취득, 합병, 영업양수도", tag: "인수합병", action: "취득 목적과 자금 조달 방식 확인" },
  { source: "DART", urgency: "지배구조", title: "최대주주 변경, 경영권 변동, 대표이사 변경", tag: "경영권 재료", action: "변경 전후 지분과 보호예수 확인" },
  { source: "DART", urgency: "자금조달", title: "유상증자, CB, BW, 전환가액 조정", tag: "희석 / 급등락 주의", action: "납입일, 할인율, 전환 조건 확인" },
  { source: "DART", urgency: "실적", title: "잠정실적, 매출액 또는 손익구조 변동", tag: "실적발표", action: "컨센서스 대비와 일회성 여부 확인" },
  { source: "거래소", urgency: "주의", title: "투자경고, 조회공시, 거래정지 / 재개", tag: "잡주 필수 확인", action: "거래 제한과 해제 조건 확인" }
];

const flowItems = [
  { label: "외국인", status: "개장 후 확인", detail: "선물과 현물 방향이 같은지 봅니다." },
  { label: "기관", status: "보조 확인", detail: "프로그램 매매와 대형주 수급을 함께 봅니다." },
  { label: "ETF", status: "중요", detail: "QQQ, SOXX, 반도체 ETF 반응을 확인합니다." },
  { label: "거래대금", status: "필수", detail: "테마주와 소형주는 거래대금 동반 여부를 봅니다." },
  { label: "차트", status: "마지막", detail: "전일 고점, VWAP, 눌림 구간만 확인합니다." },
  { label: "리스크", status: "필수", detail: "갭 상승, 저유동성, 뉴스 소멸 구간을 표시합니다." }
];

const leaderTabs: Array<{ id: LeaderRegion; label: string }> = [
  { id: "us", label: "미국 주도주" },
  { id: "kr", label: "국내 주도주" }
];

const usLeadingStocks = [
  {
    name: "AI 인프라 B",
    market: "미국 저유동",
    burst: "1분 거래량 680%",
    value: "$42M",
    intraday: "VWAP 위 유지",
    reason: "프리마켓 속보 이후 체결 강도 증가",
    caution: "스프레드 확인"
  },
  {
    name: "소형 바이오 D",
    market: "미국 잡주",
    burst: "5분 거래량 540%",
    value: "$31M",
    intraday: "전고점 돌파",
    reason: "FDA headline 이후 거래대금 집중",
    caution: "갭 상승 부담"
  },
  {
    name: "M&A 후보 E",
    market: "미국 중소형",
    burst: "1분 거래량 430%",
    value: "$58M",
    intraday: "첫 눌림 대기",
    reason: "인수합병 보도와 SEC 8-K 확인 구간",
    caution: "원문 조건 확인"
  }
];

const krLeadingStocks = [
  {
    name: "전력설비 A",
    market: "한국 테마주",
    burst: "5분 거래량 420%",
    value: "860억",
    intraday: "1분봉 재돌파",
    reason: "AI 전력 headline 이후 테마 내 거래대금 집중",
    caution: "고점 추격 주의"
  },
  {
    name: "반도체 장비 C",
    market: "국내 중소형",
    burst: "5분 거래량 310%",
    value: "520억",
    intraday: "첫 눌림 후 반등",
    reason: "섹터 강세와 외국인 선물 방향 동반",
    caution: "거래대금 유지 필요"
  },
  {
    name: "정책 테마 F",
    market: "국내 소형주",
    burst: "1분 거래량 390%",
    value: "310억",
    intraday: "상한가 근처",
    reason: "정책 keyword와 DART 공시 확인 구간",
    caution: "조회공시 여부 확인"
  }
];

const smallCapScanner = [
  { group: "미국 잡주", name: "저유동 AI 전력 후보", signal: "headline 이후 거래량 증가", caution: "스프레드와 급등락 확인" },
  { group: "한국 테마주", name: "전력설비 테마 후보", signal: "AI 전력 뉴스와 검색량 증가", caution: "공시 원문 없음" },
  { group: "소형주", name: "정책 수혜 후보군", signal: "정책 keyword와 종목 반응 동시 관찰", caution: "매출 연결 근거 확인" }
];

export default function KoreanHome() {
  const [activeTab, setActiveTab] = useState<TabId>("market");
  const [disclosureRegion, setDisclosureRegion] = useState<DisclosureRegion>("us");
  const [leaderRegion, setLeaderRegion] = useState<LeaderRegion>("us");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("2026-08-04");
  const activeDescription = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.description, [activeTab]);
  const activeDisclosures = disclosureRegion === "us" ? usDisclosures : krDisclosures;
  const activeDisclosureDescription = disclosureTabs.find((tab) => tab.id === disclosureRegion)?.description;
  const activeLeadingStocks = leaderRegion === "us" ? usLeadingStocks : krLeadingStocks;
  const selectedCalendarItems = calendarItems.filter((item) => item.date === selectedCalendarDate);

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <strong>DATE</strong>
        <span>시장 확인 보드 · Prototype</span>
      </header>

      <section className={styles.summary} aria-labelledby="kr-home-title">
        <div>
          <p className={styles.eyebrow}>오늘 확인할 것만 빠르게 보기</p>
          <h1 id="kr-home-title">미국장 시황, 국내 뉴스, 일정, 속보를 한 화면에서 확인합니다.</h1>
          <p>판단은 사용자가 증권사에서 직접 합니다. 이 화면은 대응 전에 봐야 할 시장 정보만 정리합니다.</p>
        </div>
        <aside className={styles.statusBox} aria-label="오늘 확인 순서">
          <strong>확인 순서</strong>
          <ol>
            <li>시황</li>
            <li>뉴스</li>
            <li>일정</li>
            <li>속보·공시</li>
            <li>수급·차트</li>
          </ol>
        </aside>
      </section>

      <nav className={styles.tabs} aria-label="홈 탭">
        {tabs.map((tab) => (
          <button aria-pressed={activeTab === tab.id} key={tab.id} onClick={() => setActiveTab(tab.id)} type="button">
            {tab.label}
          </button>
        ))}
      </nav>

      <p className={styles.tabDescription}>{activeDescription}</p>

      {activeTab === "market" ? (
        <section className={styles.tabPanel} aria-labelledby="market-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>시황</p>
            <h2 id="market-panel-title">미국 매크로와 국내 장 연결을 먼저 봅니다.</h2>
          </div>
          <div className={styles.macroGrid}>
            {macroSnapshot.map((item) => (
              <article data-tone={item.tone} key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
          <div className={`${styles.briefGrid} ${styles.marketBriefGrid}`}>
            {marketBrief.filter((brief) => brief.region.includes("시황") || brief.region.includes("매크로")).map((brief) => (
              <article key={brief.region}>
                <span>{brief.region}</span>
                <h3>{brief.title}</h3>
                <ul>
                  {brief.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "news" ? (
        <section className={styles.tabPanel} aria-labelledby="news-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>뉴스</p>
            <h2 id="news-panel-title">뉴스는 원인 단정이 아니라 흐름으로 봅니다.</h2>
          </div>
          <div className={styles.briefGrid}>
            {marketBrief.filter((brief) => brief.region.includes("뉴스")).map((brief) => (
              <article key={brief.region}>
                <span>{brief.region}</span>
                <h3>{brief.title}</h3>
                <ul>
                  {brief.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <section className={styles.headlineFlow} aria-labelledby="headline-flow-title">
            <h3 id="headline-flow-title">헤드라인 흐름</h3>
            <ol>
              {headlineFlow.map((item) => (
                <li key={`${item.time}-${item.label}`}>
                  <time>{item.time}</time>
                  <b>{item.source}</b>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          </section>
        </section>
      ) : null}

      {activeTab === "calendar" ? (
        <section className={styles.tabPanel} aria-labelledby="calendar-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>일정</p>
            <h2 id="calendar-panel-title">월간 캘린더에서 오늘 볼 이벤트만 먼저 확인합니다.</h2>
          </div>
          <div className={styles.calendarShell}>
            <header>
              <strong>2026년 8월</strong>
              <span>오늘 8월 4일 기준</span>
            </header>
            <div className={styles.weekdays} aria-hidden="true">
              {weekdayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className={styles.monthGrid} role="grid" aria-label="2026년 8월 일정">
              {calendarDays.map((day, index) => {
                const events = day ? calendarItems.filter((item) => item.date === day.date) : [];

                return (
                  <button
                    aria-label={day ? `8월 ${day.day}일 일정 ${events.length}개` : "빈 날짜"}
                    aria-pressed={day?.date === selectedCalendarDate}
                    className={!day ? styles.emptyDay : undefined}
                    disabled={!day}
                    key={`${index}-${day?.date ?? "empty"}`}
                    onClick={() => day ? setSelectedCalendarDate(day.date) : undefined}
                    type="button"
                  >
                    {day ? <strong>{day.day}</strong> : null}
                    {events.slice(0, 2).map((event) => (
                      <span key={`${event.date}-${event.title}`}>{event.type}</span>
                    ))}
                    {events.length > 2 ? <em>+{events.length - 2}</em> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <section className={styles.calendarDetail} aria-live="polite" aria-labelledby="calendar-detail-title">
            <span>{selectedCalendarDate.replace("2026-08-", "8월 ")}일</span>
            <h3 id="calendar-detail-title">선택한 날짜의 이벤트</h3>
            {selectedCalendarItems.length > 0 ? (
              <div className={styles.calendarEvents}>
                {selectedCalendarItems.map((item) => (
                  <article key={`${item.date}-${item.title}`}>
                    <b>{item.type} · {item.market}</b>
                    <h4>{item.title}</h4>
                    <dl>
                      <div>
                        <dt>먼저 볼 것</dt>
                        <dd>{item.check}</dd>
                      </div>
                      <div>
                        <dt>상세 확인</dt>
                        <dd>{item.detail}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCalendar}>등록된 주요 이벤트가 없습니다.</p>
            )}
          </section>
        </section>
      ) : null}

      {activeTab === "breaking" ? (
        <section className={styles.tabPanel} aria-labelledby="breaking-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>속보·공시</p>
            <h2 id="breaking-panel-title">잡주와 테마주까지 움직일 수 있는 공시와 속보를 모두 봅니다.</h2>
          </div>
          <div className={styles.disclosureTabs} role="group" aria-label="공시 지역 선택">
            {disclosureTabs.map((tab) => (
              <button aria-pressed={disclosureRegion === tab.id} key={tab.id} onClick={() => setDisclosureRegion(tab.id)} type="button">
                {tab.label}
              </button>
            ))}
          </div>
          <p className={styles.disclosureDescription}>{activeDisclosureDescription}</p>
          <div className={styles.breakingList}>
            {activeDisclosures.map((item) => (
              <article key={`${item.source}-${item.title}`}>
                <header>
                  <span>{item.source}</span>
                  <b>{item.urgency}</b>
                </header>
                <h3>{item.title}</h3>
                <p>{item.tag}</p>
                <strong>{item.action}</strong>
              </article>
            ))}
          </div>
          <section className={styles.scanner} aria-labelledby="scanner-title">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>뉴스 반응 감지</p>
              <h2 id="scanner-title">소형주, 미국 잡주, 한국 테마주는 여기서만 종목과 연결합니다.</h2>
            </div>
            <div className={styles.scannerRows}>
              {smallCapScanner.map((item) => (
                <article key={`${item.group}-${item.name}`}>
                  <span>{item.group}</span>
                  <h3>{item.name}</h3>
                  <p>{item.signal}</p>
                  <small>{item.caution}</small>
                </article>
              ))}
            </div>
          </section>
        </section>
      ) : null}

      {activeTab === "flow" ? (
        <section className={styles.tabPanel} aria-labelledby="flow-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>수급·차트</p>
            <h2 id="flow-panel-title">시황과 뉴스를 본 뒤 돈의 방향과 자리만 확인합니다.</h2>
          </div>
          <div className={styles.flowGrid}>
            {flowItems.map((item) => (
              <article key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.status}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <section className={styles.chartBoard} aria-labelledby="chart-board-title">
            <h3 id="chart-board-title">차트 확인 기준</h3>
            <div>
              <span>전일 고점</span>
              <span>VWAP</span>
              <span>첫 눌림</span>
              <span>거래대금 유지</span>
              <span>갭 상승 부담</span>
            </div>
          </section>
          <section className={styles.leaderBoard} aria-labelledby="leader-board-title">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>주도주</p>
              <h2 id="leader-board-title">1분봉·5분봉에서 거래량과 거래대금이 동시에 몰리는 종목입니다.</h2>
            </div>
            <div className={styles.leaderTabs} role="group" aria-label="주도주 시장 선택">
              {leaderTabs.map((tab) => (
                <button aria-pressed={leaderRegion === tab.id} key={tab.id} onClick={() => setLeaderRegion(tab.id)} type="button">
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.leaderRows}>
              {activeLeadingStocks.map((stock) => (
                <article key={`${stock.market}-${stock.name}`}>
                  <header>
                    <span>{stock.market}</span>
                    <strong>{stock.name}</strong>
                  </header>
                  <dl>
                    <div>
                      <dt>순간 거래량</dt>
                      <dd>{stock.burst}</dd>
                    </div>
                    <div>
                      <dt>거래대금</dt>
                      <dd>{stock.value}</dd>
                    </div>
                    <div>
                      <dt>분봉 위치</dt>
                      <dd>{stock.intraday}</dd>
                    </div>
                  </dl>
                  <p>{stock.reason}</p>
                  <small>{stock.caution}</small>
                </article>
              ))}
            </div>
          </section>
        </section>
      ) : null}
    </main>
  );
}
