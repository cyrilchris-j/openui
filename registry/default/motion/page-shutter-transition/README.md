# Page Shutter Transition

An aperture shutter transition consisting of interleaved horizontal blinds wiping the viewport between states.

## Install

```bash
openui add page-shutter-transition
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `trigger-aperture-wipe`
- Visual model: `interleaved-horizontal-slats`
- Motion model: `staggered-scale-shutter`
- Semantic purpose: `page-view-interrupter`

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
