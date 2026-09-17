# Origami Hex Rosette

Six-fold rotational origami paper tessellation forming star-shaped kaleidoscopic florets.

## Install

```bash
openui add origami-hex-rosette
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-origami-rosette`
- Visual model: `six-fold-paper-florets`
- Motion model: `none`
- Semantic purpose: `folded-rosette-texture`

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
