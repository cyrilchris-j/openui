# Click Wave Emitter

An omnidirectional pulse origin emitting expanding wave ripples outward upon any pointer down event.

## Install

```bash
openui add click-wave-emitter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `feedback`
- Interaction model: `click-origin-wave-pulse`
- Visual model: `expanding-wave-front`
- Motion model: `radial-shockwave-decay`
- Semantic purpose: `sensory-wave-emitter`

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
