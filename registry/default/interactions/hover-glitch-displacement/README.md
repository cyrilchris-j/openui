# Hover Glitch Displacement

An image surface that triggers chromatic aberration and horizontal slice displacements under pointer interaction.

## Install

```bash
openui add hover-glitch-displacement
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `hover-glitch-activation`
- Visual model: `rgb-split-scanlines`
- Motion model: `pseudo-random-slice-jitter`
- Semantic purpose: `cypherpunk-glitch-surface`

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
