# Calendar Month Grid

Seven-column calendar monthly schedule matrix with weekday header row and date cells.

## Install

```bash
openui add calendar-month-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `monthly-calendar-cell-inspection`
- Visual model: `seven-column-day-matrix`
- Motion model: `none`
- Semantic purpose: `monthly-schedule-matrix`

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
