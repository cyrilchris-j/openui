# Sight Size Ruler

Specimen typography wrapped in a working ruler: cap-height, x-height and baseline rules are drawn to scale behind the glyphs, and hovering a rule calls out its name — type anatomy as an interactive diagram.

## Install

```bash
openui add sight-size-ruler
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `hover-callout`
- Visual model: `metric-rule-overlay`
- Motion model: `none`
- Semantic purpose: `type-education`

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
