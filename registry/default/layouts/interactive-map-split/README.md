# Interactive Map Split

Dual-pane directory layout with sticky map visualizer on right and scrollable facility cards on left.

## Install

```bash
openui add interactive-map-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `location-card-map-sync`
- Visual model: `sticky-map-with-card-stream`
- Motion model: `none`
- Semantic purpose: `location-directory-map`

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
