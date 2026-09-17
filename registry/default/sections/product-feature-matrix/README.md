# Product Feature Matrix

A comprehensive checklist matrix detailing features across Free, Team, and Enterprise deployment tiers.

## Install

```bash
openui add product-feature-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `pricing`
- Interaction model: `product-feature-matrix-interaction`
- Visual model: `product-feature-matrix-visual`
- Motion model: `subtle`
- Semantic purpose: `product-feature-matrix-section`

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
