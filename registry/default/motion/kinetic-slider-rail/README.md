# Kinetic Slider Rail

A continuous range slider with elastic thumb drag that snaps into discrete calibrated detents upon release.

## Install

```bash
openui add kinetic-slider-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `controls`
- Interaction model: `slider-rail-drag-detent`
- Visual model: `ruled-index-notches`
- Motion model: `detent-snapping-release`
- Semantic purpose: `continuous-range-dial`

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
