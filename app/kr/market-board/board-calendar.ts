/**
 * 달력.
 *
 * 주는 일요일부터 읽습니다(국내 달력 관행).
 */

import type { CalendarEvent } from "./board-types";
import { formatDateTimeMinute } from "./board-format";

// Sunday first, the way a Korean calendar is read.
export const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

export function buildCalendarDays(anchorDate: string) {
  const [year, month] = anchorDate.split("-").map(Number);
  const firstDate = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  // getUTCDay is already Sunday-indexed, so the week needs no shifting. It used
  // to be rotated by six to start on Monday.
  const leadingBlanks = firstDate.getUTCDay();
  const cellCount = Math.ceil((leadingBlanks + lastDay) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const day = index - leadingBlanks + 1;

    if (day < 1 || day > lastDay) {
      return null;
    }

    return {
      date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      day
    };
  });
}

export function formatCalendarMonth(value: string) {
  const [year, month] = value.split("-");

  return `${year}년 ${Number(month)}월`;
}

export function formatCalendarDayLabel(value: string) {
  const [, month, day] = value.split("-");

  return `${Number(month)}월 ${Number(day)}일`;
}

export function calendarTimeNote(item: CalendarEvent) {
  if (item.publishedAt) {
    return `한국 확인 ${formatDateTimeMinute(item.publishedAt)}`;
  }

  if (item.market === "미국" && item.type === "실적") {
    return `${formatCalendarDayLabel(item.date)} 미국 현지일 · 한국은 다음날 새벽 확인 가능`;
  }

  if (item.market === "미국") {
    return `${formatCalendarDayLabel(item.date)} 미국 현지일`;
  }

  return `${formatCalendarDayLabel(item.date)} 한국 기준`;
}

export function calendarDaySummary(events: CalendarEvent[]) {
  const domestic = events.filter((event) => event.market === "국내").length;
  const us = events.filter((event) => event.market === "미국").length;

  return [
    domestic > 0 ? `국내 ${domestic}` : null,
    us > 0 ? `미국 ${us}` : null
  ].filter(Boolean);
}

export function upcomingCalendarItems(items: CalendarEvent[], fromDate: string) {
  return items
    .filter((item) => item.date >= fromDate)
    .sort((left, right) => left.date.localeCompare(right.date) || left.type.localeCompare(right.type) || left.title.localeCompare(right.title))
    .slice(0, 8);
}
