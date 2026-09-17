# Case Study Hero Card

Enterprise case study overview card with client logo, quantifiable outcome metrics, and quote.

## Install

```bash
openui add case-study-hero-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `case-studies`
- Interaction model: `case-study-hero-inspection`
- Visual model: `outcomes-and-narrative-split`
- Motion model: `none`
- Semantic purpose: `customer-success-study`

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
