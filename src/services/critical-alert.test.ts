import assert from "node:assert/strict";
import test from "node:test";
import { DateTime } from "luxon";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";
import { createCriticalAlertMessages } from "./critical-alert.js";

const application: TcasEvent = {
  id: "application", name: "สมัครสอบ A-Level", type: "application",
  startAt: "2026-09-01T00:00:00", endAt: "2026-09-20T23:59:59", timezone: BANGKOK_TIMEZONE, description: "",
};
const exam: TcasEvent = {
  id: "exam", name: "สอบ TGAT", type: "exam",
  startAt: "2026-10-20T13:00:00", endAt: "2026-10-20T16:00:00", timezone: BANGKOK_TIMEZONE, description: "",
};

function bangkokTime(value: string): DateTime {
  return DateTime.fromISO(value, { zone: BANGKOK_TIMEZONE });
}

test("application critical alerts trigger at every configured deadline threshold", () => {
  const cases = [
    ["2026-09-13T06:00:00", /เหลืออีก 7 วันก่อนปิดรับสมัคร/],
    ["2026-09-17T06:00:00", /เหลืออีก 3 วันก่อนปิดรับสมัคร/],
    ["2026-09-19T06:00:00", /เหลืออีก 1 วันก่อนปิดรับสมัคร/],
    ["2026-09-20T06:00:00", /วันนี้เป็นวันสุดท้ายในการสมัคร/],
    ["2026-09-21T06:00:00", /ปิดรับสมัครแล้ว/],
  ] as const;

  for (const [now, expected] of cases) {
    const message = createCriticalAlertMessages(bangkokTime(now), [application])[0];
    assert.match(message, expected);
  }
});

test("application critical alerts do not trigger on normal days", () => {
  assert.deepEqual(createCriticalAlertMessages(bangkokTime("2026-09-15T06:00:00"), [application]), []);
});

test("exam critical alerts trigger at every configured threshold", () => {
  const cases = [
    ["30 days before", "2026-09-20T06:00:00", /เหลืออีก 30 วันก่อนสอบ/],
    ["14 days before", "2026-10-06T06:00:00", /เหลืออีก 14 วันก่อนสอบ/],
    ["7 days before", "2026-10-13T06:00:00", /เหลืออีก 7 วันก่อนสอบ/],
    ["3 days before", "2026-10-17T06:00:00", /เหลืออีก 3 วันก่อนสอบ/],
    ["1 day before", "2026-10-19T06:00:00", /พรุ่งนี้มีสอบ TGAT/],
    ["day before", "2026-10-19T18:00:00", /พรุ่งนี้มีสอบ TGAT/],
    ["exam day", "2026-10-20T06:00:00", /วันนี้มีสอบ TGAT/],
  ] as const;

  for (const [, now, expected] of cases) {
    const message = createCriticalAlertMessages(bangkokTime(now), [exam])[0];
    assert.match(message, expected);
    assert.match(message, /🕘 เวลา 13:00–16:00 น\./);
  }
});

test("exam critical alerts do not trigger on normal days", () => {
  assert.deepEqual(createCriticalAlertMessages(bangkokTime("2026-10-09T06:00:00"), [exam]), []);
});

test("critical alerts use Bangkok calendar boundaries for injected UTC times", () => {
  const utcTimeAtBangkokExamDay = DateTime.fromISO("2026-10-19T17:30:00Z");
  const message = createCriticalAlertMessages(utcTimeAtBangkokExamDay, [exam])[0];
  assert.match(message, /วันนี้มีสอบ TGAT/);
});
