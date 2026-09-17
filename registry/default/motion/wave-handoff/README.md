# Wave Handoff

Two rows of content hand off motion to each other: as the top row settles, its last element's exit velocity is inherited by the first element of the next row — energy conservation applied to entrance choreography.

## Install

```bash
openui add wave-handoff
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `sequence-handoff`
- Visual model: `row-to-row-transfer`
- Motion model: `inherited-velocity`
- Semantic purpose: `narrative-entrance`

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
