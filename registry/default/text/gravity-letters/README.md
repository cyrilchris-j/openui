# Gravity Letters

Click the headline and each letter drops off its baseline with individual delay and bounce easing, then reassembles on the next click — a deterministic physics sketch using transitions, not an engine.

## Install

```bash
openui add gravity-letters
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `click-toggle`
- Visual model: `displaced-glyph-spans`
- Motion model: `bounce-fall-return`
- Semantic purpose: `playful-heading`

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
