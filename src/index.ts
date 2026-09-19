import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { pingCommand, handlePing } from "./commands/ping.js";
import { loadConfig } from "./config.js";
import { scheduleDailyAlert } from "./services/daily-alert.js";

async function registerCommands(client: Client, token: string, guildId?: string): Promise<void> {
  const commands = [pingCommand.toJSON()];
  const rest = new REST().setToken(token);

  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(client.user!.id, guildId), { body: commands });
    return;
  }
  await rest.put(Routes.applicationCommands(client.user!.id), { body: commands });
}

async function start(): Promise<void> {
  const config = loadConfig();
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, async (readyClient) => {
    try {
      await registerCommands(readyClient, config.discordToken, config.discordGuildId);
      scheduleDailyAlert(readyClient, config.discordChannelId);
      console.log(`TCASAlert is ready as ${readyClient.user.tag}`);
    } catch (error) {
      console.error("Unable to initialize TCASAlert:", error);
      process.exitCode = 1;
      readyClient.destroy();
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand() || interaction.commandName !== "ping") return;
    await interaction.reply(await handlePing());
  });

  await client.login(config.discordToken);
}

start().catch((error) => {
  console.error("Unable to start TCASAlert:", error);
  process.exitCode = 1;
});
