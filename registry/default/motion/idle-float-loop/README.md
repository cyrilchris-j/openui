# Idle Float Loop

Multi-element idle float where each child bobs on its own sine wave with independent amplitude, period and phase — a still-life that breathes, with the entire system pausing via one reduced-motion check.

## Install

```bash
openui add idle-float-loop
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `ambient-loop`
- Visual model: `phase-offset-bobbing`
- Motion model: `sine-wave-superposition`
- Semantic purpose: `ambient-life`

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
