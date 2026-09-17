# Time of Day Greeting

A greeting that recomposes by clock: morning/afternoon/evening/night word, a gradient sky bar reflecting the hour, and a live minute hand of text — the heading itself is the clock, no icons involved.

## Install

```bash
openui add time-of-day-greeting
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `clock-driven`
- Visual model: `time-gradient-word`
- Motion model: `minute-refresh`
- Semantic purpose: `personal-greeting`

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
