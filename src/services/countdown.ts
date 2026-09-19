import { DateTime } from "luxon";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";

export interface UpcomingEvent {
  event: TcasEvent;
  remainingMilliseconds: number;
}

export function findUpcomingEvent(
  events: TcasEvent[],
  now = DateTime.now().setZone(BANGKOK_TIMEZONE),
): UpcomingEvent | undefined {
  return findUpcomingEvents(events, now)[0];
}

export function findUpcomingEvents(
  events: TcasEvent[],
  now = DateTime.now().setZone(BANGKOK_TIMEZONE),
): UpcomingEvent[] {
  return events
    .map((event) => ({
      event,
      remainingMilliseconds: DateTime.fromISO(event.endAt, { zone: event.timezone }).toMillis() - now.toMillis(),
    }))
    .filter((item) => item.remainingMilliseconds > 0)
    .sort((a, b) => a.remainingMilliseconds - b.remainingMilliseconds);
}

export function formatRemainingTime(remainingMilliseconds: number): string {
  const totalMinutes = Math.ceil(remainingMilliseconds / 60_000);
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days} วัน ${hours} ชั่วโมง`;
  if (hours > 0) return `${hours} ชั่วโมง ${minutes} นาที`;
  return `${Math.max(minutes, 1)} นาที`;
}
