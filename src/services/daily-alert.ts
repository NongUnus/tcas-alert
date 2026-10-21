import type { Client } from "discord.js";
import { tcasEvents } from "../data/events.js";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";
import { calendarDaysUntil, eventStart, formatExamTime, formatThaiDate } from "./alert-format.js";
import { nowInBangkok } from "./clock.js";

export function createDailyAlertMessage(
  now = nowInBangkok(),
  events: TcasEvent[] = tcasEvents,
): string {
  const upcomingExams = events
    .filter((event) => event.type === "exam" && eventStart(event) > now)
    .sort((a, b) => eventStart(a).toMillis() - eventStart(b).toMillis());
  if (upcomingExams.length === 0) {
    return "🌅 TCASAlert — นับถอยหลังการสอบประจำวัน\n\nวันนี้ไม่มีการสอบ TCAS ที่กำลังจะมาถึง";
  }

  const eventMessages = upcomingExams.map((event) => {
    const startAt = eventStart(event);
    const time = formatExamTime(event);
    return [
      `📝 ${event.name}`,
      `📅 ${formatThaiDate(startAt)}`,
      ...(time ? [`🕘 เวลา ${time}`] : []),
      `⏳ เหลืออีก ${calendarDaysUntil(startAt, now)} วัน`,
    ].join("\n");
  });

  return ["🌅 TCASAlert — นับถอยหลังการสอบประจำวัน", ...eventMessages].join("\n\n");
}

export async function sendDailyAlert(client: Client, channelId: string): Promise<void> {
  const channel = await client.channels.fetch(channelId);
  if (!channel || !channel.isSendable()) {
    throw new Error("Configured Discord channel is not a text channel");
  }
  await channel.send(createDailyAlertMessage());
}
