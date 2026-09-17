# Color Eyedropper Loupe

An interactive sampling loupe displaying pixel grid magnification and instantaneous hex readouts.

## Install

```bash
openui add color-eyedropper-loupe
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `loupe-color-sampling`
- Visual model: `reticle-color-well`
- Motion model: `instantaneous-reticle-positioning`
- Semantic purpose: `pixel-color-sampler`

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
