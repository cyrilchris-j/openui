# Split Screen Billboard

Full-viewport 50/50 split layout with sticky visual showcase on left and scrollable narrative on right.

## Install

```bash
openui add split-screen-billboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `sticky-billboard-split`
- Visual model: `half-screen-sticky-stage`
- Motion model: `none`
- Semantic purpose: `product-showcase-split`

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
