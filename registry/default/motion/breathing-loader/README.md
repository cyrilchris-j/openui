# Breathing Loader

A loader that breathes instead of spins: concentric rings expand and contract on offset sine phases with opacity tied to the exhale — calm by design, with a minutes-elapsed counter for long operations.

## Install

```bash
openui add breathing-loader
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `ambient-loop`
- Visual model: `phase-offset-rings`
- Motion model: `sine-scale-opacity`
- Semantic purpose: `loading-calm`

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
