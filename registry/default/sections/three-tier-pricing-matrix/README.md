# Three Tier Pricing Matrix

SaaS subscription pricing section with monthly/yearly billing toggle and highlighted recommended tier.

## Install

```bash
openui add three-tier-pricing-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `pricing`
- Interaction model: `billing-interval-toggle`
- Visual model: `three-tier-card-comparison`
- Motion model: `none`
- Semantic purpose: `saas-subscription-section`

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
