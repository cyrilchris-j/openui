# Hover Lens Magnifier

An inspection loupe following pointer movement to provide high-detail magnification over technical graphics.

## Install

```bash
openui add hover-lens-magnifier
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `coordinate-loupe-tracking`
- Visual model: `bordered-magnification-optic`
- Motion model: `linear-pointer-slave`
- Semantic purpose: `technical-inspection-loupe`

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
