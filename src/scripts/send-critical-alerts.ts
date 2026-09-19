import { Client, Events, GatewayIntentBits } from "discord.js";
import { loadConfig } from "../config.js";
import { previewNowInBangkok } from "../services/clock.js";
import { sendCriticalAlerts } from "../services/critical-alert.js";

async function main(): Promise<void> {
  if (!process.env.TCAS_ALERT_TEST_NOW) {
    throw new Error("TCAS_ALERT_TEST_NOW is required for this test-only command");
  }

  const config = loadConfig();
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const ready = new Promise<void>((resolve) => client.once(Events.ClientReady, () => resolve()));

  try {
    await client.login(config.discordToken);
    await ready;
    await sendCriticalAlerts(client, config.discordChannelId, previewNowInBangkok());
    console.log("Critical alert test completed.");
  } finally {
    client.destroy();
  }
}

main().catch((error) => {
  console.error("Unable to send critical alert test:", error);
  process.exitCode = 1;
});
