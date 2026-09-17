# Emboss Paint Type

Letterpress typography built from four stacked text-shadow layers on a single element — no images, no SVG — with the layer offsets derived from one custom property so the depth is themeable.

## Install

```bash
openui add emboss-paint-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `static`
- Visual model: `multi-shadow-paint`
- Motion model: `none`
- Semantic purpose: `display-statement`

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
