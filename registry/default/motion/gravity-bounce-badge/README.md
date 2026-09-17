# Gravity Bounce Badge

A notification counter token dropping into screen space and settling via damped harmonic bouncing.

## Install

```bash
openui add gravity-bounce-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `trigger-drop-bounce`
- Visual model: `elastic-rubber-orb`
- Motion model: `damped-gravity-rebound`
- Semantic purpose: `drop-in-status-counter`

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
