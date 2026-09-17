# Event Speaker Spotlight

A showcase cards section highlighting conference keynote speakers and presentation summaries.

## Install

```bash
openui add event-speaker-spotlight
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `events`
- Interaction model: `event-speaker-spotlight-interaction`
- Visual model: `event-speaker-spotlight-visual`
- Motion model: `subtle`
- Semantic purpose: `event-speaker-spotlight-section`

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
