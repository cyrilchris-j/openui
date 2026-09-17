# Press and Hold Button

A destructive confirmation trigger requiring sustained pointer hold with an animating circular progress stroke before firing.

## Install

```bash
openui add press-and-hold-button
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `sustained-pointer-hold`
- Visual model: `circumferential-fill-gauge`
- Motion model: `linear-hold-duration-sweep`
- Semantic purpose: `destructive-action-gate`

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
