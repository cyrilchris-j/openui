# Split Flap Solari Board

An airport departure style Solari split-flap mechanical display cascading through alphabet characters with realistic flap clicks.

## Install

```bash
openui add split-flap-solari-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `counter`
- Interaction model: `character-cascade-cycle`
- Visual model: `solari-bistable-leaves`
- Motion model: `rapid-flap-rotary-step`
- Semantic purpose: `departure-board-announcer`

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
