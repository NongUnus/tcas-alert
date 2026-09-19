# TCASAlert

Discord bot MVP for daily TCAS deadline countdowns.

## Install

```bash
npm install
```

Copy `.env.example` to `.env`, then set `DISCORD_TOKEN` and `DISCORD_CHANNEL_ID`.
`DISCORD_GUILD_ID` is optional and makes `/ping` register immediately in that server during development.

## Run

```bash
npm run dev
```

Edit TCAS dates in `src/data/events.ts`. Times are interpreted as `Asia/Bangkok`.

## Test the daily alert now

```bash
npm run alert:preview
```

This prints the exact Thai message that the 06:00 Bangkok scheduler will send, without posting to Discord. Use `npm test` to check countdown behavior.

To send that same message to the configured Discord channel immediately:

```bash
npm run alert:test
```
