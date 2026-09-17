# Interactive Audit Scorecard

Core Web Vitals scorecard grid displaying 100/100 performance grades for Performance, Accessibility, and Best Practices.

## Install

```bash
openui add interactive-audit-scorecard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `performance`
- Interaction model: `audit-score-inspection`
- Visual model: `four-gauge-scorecard-strip`
- Motion model: `none`
- Semantic purpose: `performance-audit-scorecard`

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
