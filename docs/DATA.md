# TCAS Event Data

Each TCAS event should contain:

- id
- name
- type
- start date/time
- end date/time
- timezone
- description

Example:

```ts
{
  id: "tpat1-application",
  name: "TPAT1 Application",
  type: "application",
  startAt: "...",
  endAt: "...",
  timezone: "Asia/Bangkok",
  description: "..."
}

## Application periods

1. TPAT1 (กสพท.)
- Start: 1 September 2569
- End: 20 September 2569
- Registration: กสพท.
- Type: application

2. TGAT / TPAT2-5
- Start: 4 November 2569
- End: 10 N## Application periods

1. TPAT1 (กสพท.)
- Start: 1 September 2569
- End: 20 September 2569
- Registration: กสพท.
- Type: application

2. TGAT / TPAT2-5
- Start: 4 November 2569
- End: 10 November 2569
- Late registration: 11-12 November 2569
- Registration: myTCAS
- Type: application

3. A-Level
- Start: 14 January 2570
- End: 20 January 2570
- Late registration: 21-22 January 2570
- Registration: myTCAS
- Type: application

## Exam schedule

1. TPAT3
- Date: 30 January 2570
- Time: 09:00-12:00
- Type: exam

2. TGAT
- Date: 30 January 2570
- Time: 13:00-16:00
- Type: exam

3. TPAT5
- Date: 31 January 2570
- Time: 09:00-12:00
- Type: exam

4. TPAT2
- Date: 31 January 2570
- Time: 13:00-16:00
- Type: exam

5. TPAT4
- Date: 1 February 2570
- Time: 09:00-12:00
- Type: exam

6. TPAT1 (กสพท.)
- Date: 13 February 2570
- Time: 08:30-12:30
- Type: exam

7. A-Level Day 1
- Date: 13 March 2570
- Subjects: Biology, Physics, Thai, Social Studies
- Type: exam

8. A-Level Day 2
- Date: 14 March 2570
- Subjects: Mathematics 1, English, Chemistry
- Type: exam

9. A-Level Day 3
- Date: 15 March 2570
- Subjects: Mathematics 2, Applied Science, Foreign Language
- Type: exam

Important:
- Use Asia/Bangkok for all event date/time values.
- Preserve Buddhist Era year references in the documentation where useful.
- Clearly distinguish application events from exam events.
- Clearly distinguish normal registration periods from late-registration periods.
- Keep the data format compatible with the existing src/data/events.ts implementation.
- Do not change application code yet.
- Do not add new features.
- Do not add a database.

After updating the file, show me the changes.ovember 2569
- Late registration: 11-12 November 2569
- Registration: myTCAS
- Type: application

3. A-Level
- Start: 14 January 2570
- End: 20 January 2570
- Late registration: 21-22 January 2570
- Registration: myTCAS
- Type: application

## Exam schedule

1. TPAT3
- Date: 30 January 2570
- Time: 09:00-12:00
- Type: exam

2. TGAT
- Date: 30 January 2570
- Time: 13:00-16:00
- Type: exam

3. TPAT5
- Date: 31 January 2570
- Time: 09:00-12:00
- Type: exam

4. TPAT2
- Date: 31 January 2570
- Time: 13:00-16:00
- Type: exam

5. TPAT4
- Date: 1 February 2570
- Time: 09:00-12:00
- Type: exam

6. TPAT1 (กสพท.)
- Date: 13 February 2570
- Time: 08:30-12:30
- Type: exam

7. A-Level Day 1
- Date: 13 March 2570
- Subjects: Biology, Physics, Thai, Social Studies
- Type: exam

8. A-Level Day 2
- Date: 14 March 2570
- Subjects: Mathematics 1, English, Chemistry
- Type: exam

9. A-Level Day 3
- Date: 15 March 2570
- Subjects: Mathematics 2, Applied Science, Foreign Language
- Type: exam

Important:
- Use Asia/Bangkok for all event date/time values.
- Preserve Buddhist Era year references in the documentation where useful.
- Clearly distinguish application events from exam events.
- Clearly distinguish normal registration periods from late-registration periods.
- Keep the data format compatible with the existing src/data/events.ts implementation.
- Do not change application code yet.
- Do not add new features.
- Do not add a database.

After updating the file, show me the changes.

## Alert Behavior

TCASAlert has two fundamentally different event categories:

### Exam Events

Exam events are included in the Daily Exam Countdown.

- Send the Daily Exam Countdown every day at exactly 06:00 Asia/Bangkok.
- Include ALL upcoming exam events, not only the nearest exam.
- Each exam event must be displayed separately.
- Show the exam date and remaining days.
- Show the exam time when available.
- Do not include application events in the Daily Exam Countdown.
- A-Level Day 1, Day 2, and Day 3 are separate exam events.

Exam events may also trigger Critical Alerts at important thresholds.

Suggested exam Critical Alert thresholds:
- 30 days before
- 14 days before
- 7 days before
- 3 days before
- 1 day before
- exam day

### Application Events

Application events are NOT included in the Daily Exam Countdown.

Application events only generate Critical Alerts during important periods.

Suggested application Critical Alert thresholds:
- 7 days before deadline
- 3 days before deadline
- 1 day before deadline
- deadline day
- expired / registration closed

Application events must NOT generate a daily reminder.

### Alert Separation

The alert system should conceptually work as:

TCAS Events
│
├── Application Events
│      └── Critical Alerts only
│
└── Exam Events
       ├── Daily Exam Countdown
       └── Critical Alerts

Keep Daily Countdown and Critical Alerts as separate alert mechanisms.

Use Asia/Bangkok for all scheduling and date calculations.

Keep alert thresholds configurable rather than scattering hardcoded values throughout the code.
