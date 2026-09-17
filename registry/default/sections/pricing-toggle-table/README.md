# Pricing Toggle Table

An interactive billing matrix with a monthly/annual billing cycle switch, plan tiers, and recommended highlights.

## Install

```bash
openui add pricing-toggle-table
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `pricing`
- Interaction model: `pricing-toggle-table-interaction`
- Visual model: `pricing-toggle-table-visual`
- Motion model: `subtle`
- Semantic purpose: `pricing-toggle-table-section`

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
