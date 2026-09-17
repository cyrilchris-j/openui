# Interactive Node Graph Layout

Full-bleed spatial node graph workflow stage with top tool strip and floating canvas controls.

## Install

```bash
openui add interactive-node-graph-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `node-graph-canvas-stage`
- Visual model: `graph-stage-with-controls`
- Motion model: `none`
- Semantic purpose: `visual-programming-stage`

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
