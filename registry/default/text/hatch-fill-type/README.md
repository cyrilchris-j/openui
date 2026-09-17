# Hatch Fill Type

Glyphs filled with diagonal hatching instead of ink: a repeating-linear-gradient clipped to the text, with hatch angle, spacing and weight exposed as controls — engraved-plate shading as a fill system.

## Install

```bash
openui add hatch-fill-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `pattern-dial`
- Visual model: `hatch-pattern-clipped-fill`
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
