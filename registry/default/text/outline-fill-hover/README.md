# Outline Fill Hover

Text drawn as a stroke that fills from the reading direction on hover — two stacked copies, the fill one clipped by a width transition, so the fill sweeps like ink soaking into a letter rather than fading in.

## Install

```bash
openui add outline-fill-hover
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `hover-fill`
- Visual model: `stroke-plus-clipped-fill`
- Motion model: `directional-sweep`
- Semantic purpose: `link-emphasis`

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
