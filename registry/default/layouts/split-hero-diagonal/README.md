# Split Hero Diagonal

Modern landing hero section with angled diagonal polygon dividing the typography from visual canvas.

## Install

```bash
openui add split-hero-diagonal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `diagonal-split-hero`
- Visual model: `angled-diagonal-halves`
- Motion model: `none`
- Semantic purpose: `dynamic-hero-banner`

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
