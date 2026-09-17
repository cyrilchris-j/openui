# Wave Progress Bar

A fluid meter simulating dynamic liquid surging across a container as its percentage fill level rises.

## Install

```bash
openui add wave-progress-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `fill-percentage-scrub`
- Visual model: `sinusoidal-liquid-crest`
- Motion model: `harmonic-wave-undulation`
- Semantic purpose: `fluid-level-indicator`

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
