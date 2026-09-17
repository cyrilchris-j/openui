# Hero Callout Grid

Three-card callout feature layout with elevated centerpiece highlighting the premier value proposition.

## Install

```bash
openui add hero-callout-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `callout-feature-inspection`
- Visual model: `elevated-center-triptych`
- Motion model: `none`
- Semantic purpose: `feature-callout-rack`

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
