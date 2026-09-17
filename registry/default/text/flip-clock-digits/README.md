# Flip Clock Digits

Split-flap style digit transitions: each changing digit folds through a two-panel rotateX with a shadow phase, built on real 3D transforms with backface culling and per-digit stagger.

## Install

```bash
openui add flip-clock-digits
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `numeric`
- Interaction model: `value-change`
- Visual model: `split-flap-panel`
- Motion model: `rotate-x-fold`
- Semantic purpose: `live-counter`

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
