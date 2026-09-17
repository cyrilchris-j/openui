# Isometric Mesh

An angled 30-degree isometric rhomboid mesh background reminiscent of architectural axonometrics.

## Install

```bash
openui add isometric-mesh
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-isometric-canvas`
- Visual model: `rhomboid-isometric-plane`
- Motion model: `none`
- Semantic purpose: `architectural-mesh-layer`

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
