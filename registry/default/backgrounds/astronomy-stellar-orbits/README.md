# Astronomy Stellar Orbits

Multi-body gravitational orbits tracing complex intersecting Spirograph rosettes.

## Install

```bash
openui add astronomy-stellar-orbits
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-stellar-rosette`
- Visual model: `spirograph-gravitational-rosette`
- Motion model: `none`
- Semantic purpose: `astronomical-rosette-canvas`

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
