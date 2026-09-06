/**
 * 보드 안에서 되풀이되는 작은 조각들.
 *
 * 화면 한 곳에서만 쓰이더라도 여기 둡니다 -- MarketBoard 본문이 레이아웃을
 * 읽는 자리로 남으려면, 조각의 속살이 그 사이에 끼어 있으면 안 됩니다.
 */

import Image from "next/image";
import styles from "../../page.module.scss";
import type { Disclosure, Headline, LeadingStock, MarketSnapshot } from "./board-types";
import type { MarketBoardData, NightTriggerDto } from "./types";
import { changeTone, displayProviderMessage, formatDateTimeMinute, rankIcons } from "./board-format";
import { isSurging, leaderChangeRate } from "./board-themes";
import { marketChangeLabel } from "./board-macro";

/**
 * 후보들의 테마에 맞는 밤 지표.
 *
 * 두 후보 화면 모두 오늘 종가에 사서 밤을 넘깁니다. 그런데 밤 맥락으로 내놓던 것은
 * 나스닥 선물 하나뿐이었습니다 — 나스닥은 시장 전체의 밤이지 이 종목의 밤이
 * 아닙니다. 반도체에는 SOX가, 코인에는 비트코인이 더 맞는다는 것을 이미 재 놓고도
 * 화면이 그 답을 안 쓰고 있었습니다.
 *
 * 오늘 목록에 실제로 걸린 갈래만 말합니다. 재 놓은 두 갈래 밖이면 아무 줄도 나오지
 * 않고 나스닥만 남습니다.
 */
export function NightTriggerNote({ candidates, items }: {
  candidates: { nightTrigger: NightTriggerDto | null }[];
  items: { btc?: MarketSnapshot; qqq?: MarketSnapshot; soxx?: MarketSnapshot };
}) {
  const present = new Set(candidates.map((row) => row.nightTrigger?.id).filter(Boolean));
  // 방향이 갈렸는지는 tone으로 봅니다. 문자열을 파싱하면 부호와 소수점 표기에
  // 끌려다닙니다.
  const diverged = items.soxx && items.qqq
    && items.soxx.tone !== "flat" && items.qqq.tone !== "flat"
    && items.soxx.tone !== items.qqq.tone;

  return (
    <>
      {present.has("sox") ? (
        <>
          {" "}반도체 후보가 있습니다. 국내 반도체는 나스닥(0.36)보다{" "}
          <EnglishText text={items.soxx?.symbol ?? "SOXX"} />(0.42)를 더 따라갑니다.
          현재 {marketChangeLabel(items.soxx)}.
          {diverged ? (
            <>
              {" "}<b>지금 둘이 갈려 있습니다.</b> 2년 실측에서 갈린 밤 다음 국내 반도체는
              동반 상승 때의 절반 이하였습니다(하이닉스 +2.01% → +0.93%·+0.25%).
            </>
          ) : null}
        </>
      ) : null}
      {present.has("btc") ? (
        <>
          {" "}가상화폐 후보가 있습니다. 미국 코인주보다 비트코인 자체가 낫습니다
          (BTC +5%↑ 다음날 국내 중앙값 +1.41%, 미국 코인주 +5%↑는 +0.56%).
          현재 {marketChangeLabel(items.btc)}. 다만 표본 14일로 얇고, 실제로 반응한 것은
          지분·창투사·발행 계열이라 결제 쪽 종목은 덜합니다.
        </>
      ) : null}
    </>
  );
}

export function DateLogo() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 55 28" width="55" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.61 27.3V3.9H28.13V0H41.39V3.9H36.9V27.3H32.61Z" fill="black" />
      <path d="M14.26 27.3L18.7 0H24.51L28.96 27.3H24.67L21.45 6.3L18.23 27.3H14.25H14.26Z" fill="black" />
      <path d="M0 0H6.55C10.84 0 12.95 2.38 12.95 6.75V20.56C12.95 24.93 10.84 27.31 6.55 27.31H0V0ZM4.29 23.4H6.47C7.84 23.4 8.65 22.7 8.65 20.75V6.55C8.65 4.6 7.83 3.9 6.47 3.9H4.29V23.4Z" fill="black" />
      <path d="M47.17 3.9H54.58V0H42.88V27.3H54.58V23.4H47.17V15.02H53.05V11.11H47.17V3.9Z" fill="black" />
    </svg>
  );
}

export function EnglishText({ text }: { text: string }) {
  const parts = text.split(/([A-Za-z0-9&.'+-]+(?:\s+[A-Za-z0-9&.'+-]+)*)/g);

  return (
    <>
      {parts.map((part, index) => (
        /[A-Za-z]/.test(part) ? <span className={styles.englishText} key={`${part}-${index}`}>{part}</span> : part
      ))}
    </>
  );
}

export function AdSlot({ label }: { label: string }) {
  return (
    <aside className={styles.adSlot} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}

export function OriginalLink({ href }: { href?: string }) {
  return href && href !== "#" ? (
    <a className={styles.originalLink} href={href} rel="noreferrer" target="_blank">
      링크
      <span className={styles.linkIcon} aria-hidden="true">↗</span>
    </a>
  ) : <span>원문 대기</span>;
}

export function HeadlineLink({ item }: { item: Headline }) {
  if (!item.originalUrl || item.originalUrl === "#") {
    return <span>{item.text}</span>;
  }

  return (
    <a href={item.originalUrl} rel="noreferrer" target="_blank">
      {item.text}
      <span className={styles.linkIcon} aria-hidden="true">↗</span>
    </a>
  );
}

export function ProviderStatusStrip({ board }: { board: MarketBoardData }) {
  const checkedAt = board.providerStatuses[0]?.checkedAt;

  return (
    <section className={styles.providerStrip} aria-label="데이터 연결 상태">
      <strong>데이터 연결 상태{checkedAt ? ` · ${formatDateTimeMinute(checkedAt)}` : ""}</strong>
      <div>
        {board.providerStatuses.map((provider) => (
          <span data-status={provider.status} key={provider.id} title={displayProviderMessage(provider.message)}>
            {provider.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function IssuerLabel({ issuerType }: { issuerType?: Disclosure["issuerType"] }) {
  if (issuerType === "small-cap") {
    return <span>소형주</span>;
  }

  if (issuerType === "mid-cap") {
    return <span>중형주</span>;
  }

  if (issuerType === "large-cap") {
    return <span>대형주</span>;
  }

  return null;
}

/**
 * One theme in the strength list, expanding to the stocks that make it up.
 *
 * Uses details/summary so the disclosure works without script and stays
 * reachable by keyboard and screen reader. A theme carrying a single name has
 * nothing to reveal, so it renders as a plain row.
 */
export function ThemeGroupRow({
  group,
  nameOf,
  rankIndex
}: {
  group: { theme: string; members: LeadingStock[] };
  nameOf: (stock: LeadingStock) => string;
  rankIndex: number;
}) {
  const [lead] = group.members;

  // Every ranked theme opens, including one holding a single name: a row that
  // looks the same as its neighbours but does nothing when clicked reads as
  // broken.
  return (
    <details className={styles.themeGroup}>
      <summary>
        <Image alt="" aria-hidden="true" height={20} src={rankIcons[rankIndex] ?? rankIcons[2]} width={20} />
        <span><EnglishText text={group.theme} /></span>
        {/* Beside the theme, so turnover stays right-aligned down the column. */}
        <em>{group.members.length}종목</em>
        <i />
        <small>{nameOf(lead)}</small>
        <b>{lead.turnover}</b>
      </summary>
      <ol className={styles.themeMembers}>
        {group.members.map((stock, index) => (
          <li key={stock.id}>
            <em>{index + 1}등주</em>
            <span><EnglishText text={nameOf(stock)} /></span>
            {isSurging(stock) ? (
              <mark title={`최근 ${stock.recentWindowMinutes}분 ${stock.recentTurnover}`}>급증</mark>
            ) : null}
            <i />
            <b data-tone={changeTone(leaderChangeRate(stock))}>{leaderChangeRate(stock)}</b>
            <small>{stock.turnover}</small>
          </li>
        ))}
      </ol>
    </details>
  );
}
