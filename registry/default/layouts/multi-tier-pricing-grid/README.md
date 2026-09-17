# Multi Tier Pricing Grid

Three-tier pricing card layout featuring prominent central highlight for the recommended tier.

## Install

```bash
openui add multi-tier-pricing-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `plan-tier-selection`
- Visual model: `three-tier-card-cluster`
- Motion model: `none`
- Semantic purpose: `subscription-pricing-display`

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
