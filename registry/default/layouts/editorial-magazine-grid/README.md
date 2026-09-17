# Editorial Magazine Grid

Swiss editorial typography grid with hero lede column, multi-column prose flow, and pull-quote sidebars.

## Install

```bash
openui add editorial-magazine-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `passive-magazine-columns`
- Visual model: `asymmetric-editorial-columns`
- Motion model: `none`
- Semantic purpose: `longform-editorial-reading`

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
