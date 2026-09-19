import { createCriticalAlertMessages } from "../services/critical-alert.js";
import { previewNowInBangkok } from "../services/clock.js";

const alerts = createCriticalAlertMessages(previewNowInBangkok());
console.log(alerts.length > 0 ? alerts.join("\n\n") : "วันนี้ไม่มีการแจ้งเตือนสำคัญ");
