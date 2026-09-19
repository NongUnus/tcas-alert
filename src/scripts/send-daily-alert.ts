import { Client, Events, GatewayIntentBits } from "discord.js";
import { loadConfig } from "../config.js";
import { sendDailyAlert } from "../services/daily-alert.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const ready = new Promise<void>((resolve) => client.once(Events.ClientReady, () => resolve()));

  try {
    await client.login(config.discordToken);
    await ready;
    await sendDailyAlert(client, config.discordChannelId);
    console.log("Daily alert sent successfully.");
  } finally {
    client.destroy();
  }
}

main().catch((error) => {
  console.error("Unable to send daily alert:", error);
  process.exitCode = 1;
});
