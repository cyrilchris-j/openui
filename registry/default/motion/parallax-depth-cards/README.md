# Parallax Depth Cards

A trio of floating cards translating at differential Z-depth velocities as the user interacts with the container.

## Install

```bash
openui add parallax-depth-cards
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `container-scroll-depth-parallax`
- Visual model: `tiered-elevation-card-deck`
- Motion model: `differential-z-velocity`
- Semantic purpose: `multi-depth-showcase`

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
