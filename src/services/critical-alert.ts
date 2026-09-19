import { DateTime } from "luxon";
import type { Client } from "discord.js";
import { tcasEvents } from "../data/events.js";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";
import { APPLICATION_ALERT_DAYS, EXAM_ALERT_DAYS } from "./alert-thresholds.js";
import { calendarDaysUntil, eventEnd, eventStart, formatExamTime, formatThaiDate } from "./alert-format.js";
import { nowInBangkok } from "./clock.js";

function createApplicationCriticalAlert(event: TcasEvent, now: DateTime): string | undefined {
  const deadline = eventEnd(event);
  const daysUntilDeadline = calendarDaysUntil(deadline, now);

  if (daysUntilDeadline === -1) {
    return ["🚨 TCASAlert — แจ้งเตือนสำคัญ", `ปิดรับสมัครแล้ว: ${event.name}`, `กำหนดปิดรับ: ${formatThaiDate(deadline)}`].join("\n");
  }
  if (daysUntilDeadline === 0) {
    return ["🚨 TCASAlert — แจ้งเตือนสำคัญ", `วันนี้เป็นวันสุดท้ายในการสมัคร: ${event.name}`, `ปิดรับเวลา ${deadline.toFormat("HH:mm")} น.`].join("\n");
  }
  if (!APPLICATION_ALERT_DAYS.includes(daysUntilDeadline as (typeof APPLICATION_ALERT_DAYS)[number])) return undefined;

  return [
    "🚨 TCASAlert — แจ้งเตือนสำคัญ",
    `เหลืออีก ${daysUntilDeadline} วันก่อนปิดรับสมัคร`,
    `📚 ${event.name}`,
    `📅 วันสุดท้าย ${formatThaiDate(deadline)}`,
  ].join("\n");
}

function createExamCriticalAlert(event: TcasEvent, now: DateTime): string | undefined {
  const examDate = eventStart(event);
  const daysUntilExam = calendarDaysUntil(examDate, now);
  const time = formatExamTime(event);
  let reason: string | undefined;

  if (daysUntilExam === 0) reason = `วันนี้มี${event.name}`;
  else if (daysUntilExam === 1) reason = `พรุ่งนี้มี${event.name}`;
  else if (EXAM_ALERT_DAYS.includes(daysUntilExam as (typeof EXAM_ALERT_DAYS)[number])) {
    reason = `เหลืออีก ${daysUntilExam} วันก่อนสอบ`;
  }
  if (!reason) return undefined;

  return [
    "🚨 TCASAlert — แจ้งเตือนสำคัญ",
    reason,
    `📚 ${event.name}`,
    `📅 ${formatThaiDate(examDate)}`,
    ...(time ? [`🕘 เวลา ${time}`] : []),
  ].join("\n");
}

export function createCriticalAlertMessages(
  now = nowInBangkok(),
  events: TcasEvent[] = tcasEvents,
): string[] {
  return [...events]
    .sort((a, b) => eventStart(a).toMillis() - eventStart(b).toMillis())
    .flatMap((event) => {
      const message = event.type === "application"
        ? createApplicationCriticalAlert(event, now)
        : event.type === "exam"
          ? createExamCriticalAlert(event, now)
          : undefined;
      return message ? [message] : [];
    });
}

export async function sendCriticalAlerts(
  client: Client,
  channelId: string,
  now = nowInBangkok(),
  events: TcasEvent[] = tcasEvents,
): Promise<void> {
  const messages = createCriticalAlertMessages(now, events);
  if (messages.length === 0) return;

  const channel = await client.channels.fetch(channelId);
  if (!channel || !channel.isSendable()) {
    throw new Error("Configured Discord channel is not a text channel");
  }
  for (const message of messages) {
    await channel.send(message);
  }
}
