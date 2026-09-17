# Perspective Tilt Text

Display text on a plane that tilts toward the pointer with rotateX/rotateY, layered with a translateZ shadow copy so the depth reads as physical; the transform origin eases back to centre on leave.

## Install

```bash
openui add perspective-tilt-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `3d`
- Interaction model: `pointer-tilt`
- Visual model: `z-layered-plane`
- Motion model: `spring-return`
- Semantic purpose: `display-statement`

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
