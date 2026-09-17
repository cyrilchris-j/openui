# Scatter Rain Text

On in-view, glyphs fall from above with per-letter delay, rotation and a tiny bounce, then stay put — a controlled storm where each drop lands on its own baseline slot, spring-free and transition-only.

## Install

```bash
openui add scatter-rain-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `in-view-trigger`
- Visual model: `glyph-drop-entrance`
- Motion model: `fall-bounce-settle`
- Semantic purpose: `entrance-heading`

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
