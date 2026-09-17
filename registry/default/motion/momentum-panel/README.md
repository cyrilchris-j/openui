# Momentum Panel

A draggable panel that keeps its release velocity: throw it and it coasts with friction, bounces off container edges with restitution, and comes to rest where physics puts it — gesture + inertia in one primitive.

## Install

```bash
openui add momentum-panel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gesture`
- Interaction model: `drag-throw`
- Visual model: `free-floating-panel`
- Motion model: `friction-coast-restitution`
- Semantic purpose: `playful-panel`

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
