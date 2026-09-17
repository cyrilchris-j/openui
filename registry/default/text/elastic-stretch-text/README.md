# Elastic Stretch Text

Glyphs stretch horizontally away from the pointer like a material with tension, using scaleX with an overshoot curve on release; the stretch is per-glyph so the word deforms, not just moves.

## Install

```bash
openui add elastic-stretch-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `pointer-deform`
- Visual model: `glyph-scale-field`
- Motion model: `overshoot-release`
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
