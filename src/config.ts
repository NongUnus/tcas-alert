import "dotenv/config";

export interface Config {
  discordToken: string;
  discordChannelId: string;
  discordGuildId?: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function loadConfig(): Config {
  return {
    discordToken: requiredEnv("DISCORD_TOKEN"),
    discordChannelId: requiredEnv("DISCORD_CHANNEL_ID"),
    discordGuildId: process.env.DISCORD_GUILD_ID?.trim() || undefined,
  };
}
