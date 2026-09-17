# Acoustic Sound Nodes

Chladni plate acoustic resonance nodal line patterns formed by harmonic frequency standing waves.

## Install

```bash
openui add acoustic-sound-nodes
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-chladni-plate`
- Visual model: `acoustic-nodal-geometry`
- Motion model: `none`
- Semantic purpose: `acoustic-resonance-pattern`

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
