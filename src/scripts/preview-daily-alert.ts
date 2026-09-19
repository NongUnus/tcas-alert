import { createDailyAlertMessage } from "../services/daily-alert.js";
import { previewNowInBangkok } from "../services/clock.js";

console.log(createDailyAlertMessage(previewNowInBangkok()));
