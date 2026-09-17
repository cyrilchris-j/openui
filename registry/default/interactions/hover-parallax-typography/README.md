# Hover Parallax Typography

An editorial display heading where shadow, stroke, and fill layers translate at differential depths under pointer hover.

## Install

```bash
openui add hover-parallax-typography
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `typography-depth-tilt`
- Visual model: `multi-pass-typeset-planes`
- Motion model: `differential-layer-offset`
- Semantic purpose: `parallax-editorial-headline`

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
