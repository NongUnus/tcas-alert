import assert from "node:assert/strict";
import test from "node:test";
import { DateTime } from "luxon";
import { findUpcomingEvent, formatRemainingTime } from "./countdown.js";
import { BANGKOK_TIMEZONE, type TcasEvent } from "../types/event.js";

const event: TcasEvent = {
  id: "test",
  name: "ทดสอบ",
  type: "other",
  startAt: "2026-09-20T09:00:00",
  endAt: "2026-09-21T06:00:00",
  timezone: BANGKOK_TIMEZONE,
  description: "ทดสอบ",
};

test("findUpcomingEvent selects the nearest unexpired event in Bangkok time", () => {
  const now = DateTime.fromISO("2026-09-20T06:00:00", { zone: BANGKOK_TIMEZONE });
  const result = findUpcomingEvent([event], now);
  assert.equal(result?.event.id, "test");
  assert.equal(result?.remainingMilliseconds, 86_400_000);
});

test("formatRemainingTime produces Thai duration units", () => {
  assert.equal(formatRemainingTime(90 * 60_000), "1 ชั่วโมง 30 นาที");
  assert.equal(formatRemainingTime(26 * 60 * 60_000), "1 วัน 2 ชั่วโมง");
});
