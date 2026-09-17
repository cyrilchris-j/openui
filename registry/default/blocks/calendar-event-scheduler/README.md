# Calendar Event Scheduler

An interactive date and time reservation widget supporting slot booking and automated invitation generation.

## Install

```bash
openui add calendar-event-scheduler
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `calendar`
- Interaction model: `calendar-slot-selection-booking`
- Visual model: `date-picker-agenda-scheduler`
- Motion model: `subtle`
- Semantic purpose: `meeting-appointment-booking`

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
