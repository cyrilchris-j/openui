# Lasso Select Box

A bounding rectangle drag selection tool highlighting and grouping multiple coordinate items within its active marquee.

## Install

```bash
openui add lasso-select-box
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `selection`
- Interaction model: `rectangular-marquee-selection`
- Visual model: `dashed-boundary-crosshair`
- Motion model: `coordinate-bounding-expansion`
- Semantic purpose: `multi-item-lasso-selector`

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
