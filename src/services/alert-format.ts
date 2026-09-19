import { DateTime } from "luxon";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";

export function eventStart(event: TcasEvent): DateTime {
  return DateTime.fromISO(event.startAt, { zone: event.timezone });
}

export function eventEnd(event: TcasEvent): DateTime {
  return DateTime.fromISO(event.endAt, { zone: event.timezone });
}

export function formatThaiDate(date: DateTime): string {
  return `${date.setLocale("th").toFormat("d LLLL")} ${date.year + 543}`;
}

export function calendarDaysUntil(date: DateTime, now: DateTime): number {
  const targetDay = date.setZone(BANGKOK_TIMEZONE).startOf("day");
  const currentDay = now.setZone(BANGKOK_TIMEZONE).startOf("day");
  return Math.round(targetDay.diff(currentDay, "days").days);
}

export function formatExamTime(event: TcasEvent): string | undefined {
  const start = eventStart(event);
  const end = eventEnd(event);
  const isAllDay = start.hour === 0 && start.minute === 0 && end.hour === 23 && end.minute === 59;

  if (isAllDay) return undefined;
  return `${start.toFormat("HH:mm")}–${end.toFormat("HH:mm")} น.`;
}
