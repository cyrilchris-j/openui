# Millimetre Ruler Scale

A physical ruler rendered in CSS: millimetre ticks every 4px, centimetre ticks taller with numerals, edge-accurate against the page — hold a credit card against it in the demo to check your screen's true DPI.

## Install

```bash
openui add millimetre-ruler-scale
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `drag-measure`
- Visual model: `css-physical-ruler`
- Motion model: `none`
- Semantic purpose: `physical-calibration`

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
