# Split Pane Resizer

A draggable vertical dividing sash that redistributes layout widths between adjacent panels with clamped constraints.

## Install

```bash
openui add split-pane-resizer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `divider-drag-resizing`
- Visual model: `bipartite-split-sash`
- Motion model: `constrained-1d-translation`
- Semantic purpose: `split-pane-divider`

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
