# Stat Counter Badge

A metric badge displaying live numerical count with delta arrow indicator.

## Install

```bash
openui add stat-counter-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `kpi-counter-display`
- Visual model: `numeric-pill-badge`
- Motion model: `none`
- Semantic purpose: `metric-counter-badge`

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
