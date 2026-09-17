# Stacked Feature Cards

Vertical sequence of large alternating marketing feature showcase cards.

## Install

```bash
openui add stacked-feature-cards
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `alternating-feature-card-scroll`
- Visual model: `stacked-wide-feature-cards`
- Motion model: `none`
- Semantic purpose: `product-feature-stack`

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
