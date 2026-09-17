# Gradient Outline Type

Display text rendered as a gradient stroke with a transparent fill, layered twice — a wide soft pass under a crisp narrow pass — so the outline reads as an object rather than a filter.

## Install

```bash
openui add gradient-outline-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `static`
- Visual model: `stroke-paint`
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
