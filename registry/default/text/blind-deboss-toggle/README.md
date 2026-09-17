# Blind Deboss Toggle

A tactile switch rendered as typography: the word ON or OFF sits in a soft rubber pad and physically debosses on press — shadows invert, the glyph sinks — a state indicator you can feel with your eyes.

## Install

```bash
openui add blind-deboss-toggle
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `press-toggle`
- Visual model: `inverted-shadow-deboss`
- Motion model: `press-sink-release`
- Semantic purpose: `binary-state`

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
