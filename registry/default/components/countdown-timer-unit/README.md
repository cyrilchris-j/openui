# Countdown Timer Unit

Multi-digit countdown clocks with hours, minutes, seconds cells, and time expiration state.

## Install

```bash
openui add countdown-timer-unit
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `interval-timer-presentation`
- Visual model: `segmented-clock-cells`
- Motion model: `none`
- Semantic purpose: `deadline-countdown`

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
