# Cybernetic Hex Shield

Futuristic energy deflector force field shield with glowing cyan hexagonal barrier tiles.

## Install

```bash
openui add cybernetic-hex-shield
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-deflector-shield`
- Visual model: `hexagonal-energy-barrier`
- Motion model: `none`
- Semantic purpose: `energy-shield-backdrop`

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
