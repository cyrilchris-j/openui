# Magnetic Repel Field

The anti-magnet: grid tiles flee the pointer with force proportional to proximity, then spring back with damped oscillation — a field of objects that keeps its shape only when you leave it alone.

## Install

```bash
openui add magnetic-repel-field
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `hover`
- Interaction model: `pointer-repel`
- Visual model: `displaced-grid-tiles`
- Motion model: `spring-return-oscillation`
- Semantic purpose: `playful-grid`

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
