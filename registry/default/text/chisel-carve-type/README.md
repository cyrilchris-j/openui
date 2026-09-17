# Chisel Carve Type

Letters carved into stone: dark text with a top inner highlight and bottom occlusion shadow inverted from the emboss formula, sitting on a speckled granite background built from layered radial gradients.

## Install

```bash
openui add chisel-carve-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `static`
- Visual model: `inverted-shadow-carve`
- Motion model: `none`
- Semantic purpose: `monument-statement`

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
