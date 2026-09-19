import { SlashCommandBuilder } from "discord.js";

export const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("ตรวจสอบว่าบอตทำงานอยู่หรือไม่");

export async function handlePing(): Promise<string> {
  return "ปิง! บอต TCASAlert กำลังทำงานอยู่";
}
