# Hover Image Zoom Crosshair

An inspection preview optic that tracks cursor coordinate pixels and displays calibrated crosshair graticules.

## Install

```bash
openui add hover-image-zoom-crosshair
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `coordinate-crosshair-tracking`
- Visual model: `calibrated-reticle-graticule`
- Motion model: `orthogonal-line-translation`
- Semantic purpose: `pixel-inspection-crosshair`

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
