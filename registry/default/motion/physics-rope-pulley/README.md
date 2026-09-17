# Physics Rope Pulley

Two masses connected over a frictionless circular pulley simulating Newtonian gravity exchange when one is dragged.

## Install

```bash
openui add physics-rope-pulley
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `counterweight-displacement-pull`
- Visual model: `suspended-pulley-rigging`
- Motion model: `newtonian-tension-exchange`
- Semantic purpose: `physics-pulley-demonstrator`

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
