# Ripple Touch Field

A tactile responsive canvas emitting expanding concentric shockwave rings on click with physics decay.

## Install

```bash
openui add ripple-touch-field
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `click-dispersion-shockwave`
- Visual model: `expanding-concentric-crests`
- Motion model: `radial-propagation-decay`
- Semantic purpose: `sensory-feedback-pad`

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
