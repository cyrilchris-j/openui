# Optical Illusion Grid

Famous Hermann grid optical illusion where phantom dark dots appear at white lane intersections.

## Install

```bash
openui add optical-illusion-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-hermann-illusion`
- Visual model: `phantom-dot-grid`
- Motion model: `none`
- Semantic purpose: `optical-illusion-texture`

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
