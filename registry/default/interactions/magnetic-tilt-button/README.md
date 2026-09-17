# Magnetic Tilt Button

A primary button that leans toward the mouse with tactile spring pull and specular light sheen reflection.

## Install

```bash
openui add magnetic-tilt-button
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `proximity-tether-pull`
- Visual model: `specular-beveled-capsule`
- Motion model: `damped-euler-lean`
- Semantic purpose: `magnetic-action-trigger`

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
