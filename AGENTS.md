# TCASAlert Development Guidelines

## Project

TCASAlert is a Discord bot for monitoring important TCAS
deadlines, exams, and other time-sensitive events.

The core purpose is to notify users about upcoming TCAS events
and show how much time remains.

## Tech Stack

- TypeScript
- Node.js
- discord.js

## Current Scope

The current version is an MVP.

The MVP should support:

- Discord bot startup
- `/ping`
- TCAS event data
- Countdown calculation
- Daily alert at 06:00 Asia/Bangkok
- Sending the daily alert to a configured Discord channel

## Do Not Add Yet

Do not introduce these unless explicitly requested:

- Database
- Web dashboard
- External TCAS APIs
- Authentication
- Docker
- AI features
- Complex frameworks
- Microservices

Prefer a simple implementation.

## Architecture

Keep the code modular.

Future features will include:

- Triggered alerts
- `/tcas`
- `/upcoming`
- `/event`
- Notification configuration
- Database-backed events

Design the MVP so these can be added later without a major rewrite.

## Timezone

All TCAS event times are based on Thailand time:

Asia/Bangkok (UTC+7)

Do not rely on the server's local timezone.

## Code Style

- Use TypeScript.
- Prefer small, focused modules.
- Avoid unnecessary abstractions.
- Use clear names.
- Keep configuration in environment variables.
- Do not hard-code secrets.
- Add comments only when they explain non-obvious logic.

## Before Changing Architecture

If a requested feature requires a significant architectural change,
explain the proposed change before implementing it.

## Language

All user-facing Discord messages must be written in Thai.

This includes:

- Daily countdown alerts
- Deadline alerts
- Event details
- Error messages shown to users
- Slash command responses

Code, variable names, function names, file names, and comments may use English.

Use clear and natural Thai wording.

Example:

พรุ่งนี้ 20 กันยายน 2569
คือวันสุดท้ายของการสมัครสอบ TPAT1

เหลือเวลาอีก 1 วัน
