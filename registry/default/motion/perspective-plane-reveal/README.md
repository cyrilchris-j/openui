# Perspective Plane Reveal

Content reveals as a plane rotating up from the floor of its own perspective container — rotateX from -75° with transform-origin at the bottom edge, so the element rises like a drawbridge instead of sliding.

## Install

```bash
openui add perspective-plane-reveal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `in-view-trigger`
- Visual model: `floor-hinged-plane`
- Motion model: `rotate-x-rise`
- Semantic purpose: `section-entrance`

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
