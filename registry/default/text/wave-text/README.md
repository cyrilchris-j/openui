# Wave Text

Each glyph rides a sine wave with a phase offset from its position, producing a travelling swell through the word; implemented with per-character spans and a shared animation-delay variable.

## Install

```bash
openui add wave-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `ambient-loop`
- Visual model: `glyph-spans`
- Motion model: `phase-offset-sine`
- Semantic purpose: `display-accent`

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
