# Event Keynote Schedule

A multi-track developer conference agenda with speaker profiles, track tags, and calendar reminders.

## Install

```bash
openui add event-keynote-schedule
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `events`
- Interaction model: `event-keynote-schedule-interaction`
- Visual model: `event-keynote-schedule-visual`
- Motion model: `subtle`
- Semantic purpose: `event-keynote-schedule-section`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
