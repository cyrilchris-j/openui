# Ecommerce Product Stage

Product detail stage with vertical image thumbnail rack, central visualizer, and checkout panel.

## Install

```bash
openui add ecommerce-product-stage
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `product-gallery-and-buy-box`
- Visual model: `thumbnail-stage-and-actions`
- Motion model: `none`
- Semantic purpose: `ecommerce-product-detail-layout`

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
