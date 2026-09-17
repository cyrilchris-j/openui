# Orbital Revolution

Satellites revolve a centre point on elliptical paths with independent periods and phases; each body's opacity and scale respond to depth (behind/in front of the centre), faking 3D with pure transforms.

## Install

```bash
openui add orbital-revolution
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `ambient-loop`
- Visual model: `depth-faked-orbits`
- Motion model: `elliptical-revolution`
- Semantic purpose: `system-diagram`

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
