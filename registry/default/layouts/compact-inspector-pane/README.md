# Compact Inspector Pane

CAD/3D modeling application layout: scene tree on left, canvas in center, and property inspector on right.

## Install

```bash
openui add compact-inspector-pane
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `cad-three-pane-inspector`
- Visual model: `scene-viewport-property-triptych`
- Motion model: `none`
- Semantic purpose: `3d-editor-workbench`

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
