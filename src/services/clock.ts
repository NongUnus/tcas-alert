import { DateTime } from "luxon";
import { BANGKOK_TIMEZONE } from "../types/event.js";

export function nowInBangkok(): DateTime {
  return DateTime.now().setZone(BANGKOK_TIMEZONE);
}

export function previewNowInBangkok(testNow = process.env.TCAS_ALERT_TEST_NOW): DateTime {
  if (!testNow) return nowInBangkok();

  const parsed = DateTime.fromISO(testNow, { zone: BANGKOK_TIMEZONE });
  if (!parsed.isValid) {
    throw new Error("TCAS_ALERT_TEST_NOW must be a valid ISO 8601 date/time");
  }
  return parsed.setZone(BANGKOK_TIMEZONE);
}
