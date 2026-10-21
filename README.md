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

## Run daily alerts with GitHub Actions

The workflow in `.github/workflows/daily-alert.yml` sends the daily countdown and
critical alerts at 06:00 Thailand time (23:00 UTC). To enable it, push this
repository to GitHub and add these repository secrets under **Settings → Secrets
and variables → Actions**:

- `DISCORD_TOKEN`
- `DISCORD_CHANNEL_ID`

You can also run the workflow manually from the **Actions** tab. GitHub may delay
scheduled runs during periods of high load. The scheduled workflow handles alerts;
the `/ping` command still requires `npm run start` to run as a persistent bot.

Edit TCAS dates in `src/data/events.ts`. Times are interpreted as `Asia/Bangkok`.

## Test the daily alert now

```bash
npm run alert:preview
```

This prints the exact Thai message that the 06:00 Bangkok workflow will send, without posting to Discord. Use `npm test` to check countdown behavior.

To send the daily countdown and any matching critical alerts immediately:

```bash
npm run alert:send
```
