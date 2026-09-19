import assert from "node:assert/strict";
import test from "node:test";
import { BANGKOK_TIMEZONE } from "../types/event.js";
import { previewNowInBangkok } from "./clock.js";

test("preview clock accepts an injected ISO date/time in Bangkok", () => {
  const now = previewNowInBangkok("2026-09-19T06:00:00");
  assert.equal(now.zoneName, BANGKOK_TIMEZONE);
  assert.equal(now.toISO(), "2026-09-19T06:00:00.000+07:00");
});
