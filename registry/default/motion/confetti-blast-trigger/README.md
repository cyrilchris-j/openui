# Confetti Blast Trigger

A celebratory burst of multi-colored vector fragments detonating outward on click with gravity falloff.

## Install

```bash
openui add confetti-blast-trigger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `click-detonation-blast`
- Visual model: `geometric-confetti-shards`
- Motion model: `radial-drag-gravity-drift`
- Semantic purpose: `celebratory-completion-burst`

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
