# Bento Feature Showcase

Four-card modular bento grid showcasing core ecosystem features with varied aspect ratios.

## Install

```bash
openui add bento-feature-showcase
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `features`
- Interaction model: `bento-tile-inspection`
- Visual model: `four-card-bento-matrix`
- Motion model: `none`
- Semantic purpose: `product-features-bento`

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
