# Three Tier Pricing Table

Comparative SaaS pricing table layout with vertical plan columns and horizontal feature checkmark rows.

## Install

```bash
openui add three-tier-pricing-table
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `three-tier-plan-matrix`
- Visual model: `columnar-pricing-table`
- Motion model: `none`
- Semantic purpose: `subscription-plan-matrix`

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
