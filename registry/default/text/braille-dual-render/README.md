# Braille Dual Render

Renders a phrase in both Latin type and Unicode braille side by side, with per-cell dot animation on value change and real screen-reader behaviour (Latin spoken, braille aria-hidden decoration).

## Install

```bash
openui add braille-dual-render
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `accessible`
- Interaction model: `value-sync`
- Visual model: `dual-script-render`
- Motion model: `dot-cascade`
- Semantic purpose: `inclusive-display`

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
