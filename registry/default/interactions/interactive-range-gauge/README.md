# Interactive Range Gauge

A semicircular speedometer gauge needle tracking pointer scrub position with calibrated numeric ticks.

## Install

```bash
openui add interactive-range-gauge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `semicircular-needle-scrub`
- Visual model: `arc-tachometer-dial`
- Motion model: `angular-tachometer-sweep`
- Semantic purpose: `tachometer-range-gauge`

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
