# Aspect Ratio Selector

Aspect ratio buttons (16:9, 4:3, 1:1, 9:16) with dynamic proportional preview frame.

## Install

```bash
openui add aspect-ratio-selector
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `ratio-button-selection`
- Visual model: `proportional-bounding-box`
- Motion model: `none`
- Semantic purpose: `canvas-ratio-picker`

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
