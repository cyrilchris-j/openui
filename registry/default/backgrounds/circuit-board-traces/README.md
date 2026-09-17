# Circuit Board Traces

Printed circuit board etched copper bus traces with 45-degree angle elbows and terminal pads.

## Install

```bash
openui add circuit-board-traces
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-schematic-backdrop`
- Visual model: `copper-bus-traces`
- Motion model: `none`
- Semantic purpose: `pcb-schematic-texture`

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
