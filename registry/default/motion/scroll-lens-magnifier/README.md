# Scroll Lens Magnifier

A circular magnifying viewport that glides over underlying text during scroll, scaling the focus area dynamically.

## Install

```bash
openui add scroll-lens-magnifier
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `viewport-scrub-magnification`
- Visual model: `floating-convex-lens`
- Motion model: `smooth-damped-reticle-travel`
- Semantic purpose: `editorial-magnifying-glass`

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
