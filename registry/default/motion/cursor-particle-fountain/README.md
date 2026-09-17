# Cursor Particle Fountain

A decorative canvas fountain erupting gravity-bound sparkles as pointer travels rapidly across the surface.

## Install

```bash
openui add cursor-particle-fountain
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `cursor`
- Interaction model: `pointer-motion-emission`
- Visual model: `gravity-spark-fountain`
- Motion model: `ballistic-projectile-arc`
- Semantic purpose: `celebratory-spark-fountain`

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
