# Orbit Satellite Badge

A small circular notification satellite executing continuous Keplerian orbit around an icon container.

## Install

```bash
openui add orbit-satellite-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `indicators`
- Interaction model: `keplerian-satellite-revolution`
- Visual model: `orbiting-status-dot`
- Motion model: `circular-orbital-path`
- Semantic purpose: `continuous-satellite-beacon`

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
