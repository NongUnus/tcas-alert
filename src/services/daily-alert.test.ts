import assert from "node:assert/strict";
import test from "node:test";
import { DateTime } from "luxon";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";
import { createDailyAlertMessage } from "./daily-alert.js";

const now = DateTime.fromISO("2026-09-19T06:00:00", { zone: BANGKOK_TIMEZONE });

const events: TcasEvent[] = [
  {
    id: "application",
    name: "สมัครสอบ A-Level",
    type: "application",
    startAt: "2026-09-20T00:00:00",
    endAt: "2026-09-30T23:59:59",
    timezone: BANGKOK_TIMEZONE,
    description: "",
  },
  {
    id: "later",
    name: "A-Level",
    type: "exam",
    startAt: "2026-10-01T09:00:00",
    endAt: "2026-10-20T18:00:00",
    timezone: BANGKOK_TIMEZONE,
    description: "",
  },
  {
    id: "expired",
    name: "กิจกรรมที่สิ้นสุดแล้ว",
    type: "other",
    startAt: "2026-09-01T09:00:00",
    endAt: "2026-09-18T18:00:00",
    timezone: BANGKOK_TIMEZONE,
    description: "",
  },
  {
    id: "nearest",
    name: "TGAT / TPAT3",
    type: "exam",
    startAt: "2026-09-20T09:00:00",
    endAt: "2026-09-30T18:00:00",
    timezone: BANGKOK_TIMEZONE,
    description: "",
  },
];

test("daily alert includes every upcoming exam in chronological order, but no applications", () => {
  const message = createDailyAlertMessage(now, events);

  assert.match(message, /🌅 TCASAlert — นับถอยหลังการสอบประจำวัน/);
  assert.match(message, /📝 TGAT \/ TPAT3/);
  assert.match(message, /📝 A-Level/);
  assert.match(message, /🕘 เวลา 09:00–18:00 น\./);
  assert.doesNotMatch(message, /สมัครสอบ A-Level/);
  assert.doesNotMatch(message, /กิจกรรมที่สิ้นสุดแล้ว/);
  assert.ok(message.indexOf("TGAT / TPAT3") < message.indexOf("A-Level"));
  assert.match(message, /📅 20 กันยายน 2569/);
  assert.match(message, /📅 1 ตุลาคม 2569/);
  assert.match(message, /⏳ เหลืออีก 1 วัน/);
});

test("daily alert uses Bangkok day boundaries for an injected UTC clock", () => {
  const utcTimeAtBangkokMidnight = DateTime.fromISO("2026-09-19T17:00:00Z");
  const message = createDailyAlertMessage(utcTimeAtBangkokMidnight, [events[3]]);

  assert.match(message, /📅 20 กันยายน 2569/);
  assert.match(message, /⏳ เหลืออีก 0 วัน/);
});
