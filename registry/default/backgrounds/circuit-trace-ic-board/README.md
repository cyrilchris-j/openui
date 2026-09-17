# Circuit Trace IC Board

Dense microchip surface mount component bus traces with fine wire-bonded pinouts.

## Install

```bash
openui add circuit-trace-ic-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-silicon-microchip`
- Visual model: `ic-pinout-die-traces`
- Motion model: `none`
- Semantic purpose: `microchip-die-texture`

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
