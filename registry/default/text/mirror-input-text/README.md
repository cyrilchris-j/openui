# Mirror Input Text

A display line that mirrors whatever the user types into a real input, character-aligned and caret-synced — the foundation for terminal UIs, live captions and autofill previews, built as one composable primitive.

## Install

```bash
openui add mirror-input-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `input-mirror`
- Visual model: `aligned-display-copy`
- Motion model: `none`
- Semantic purpose: `live-echo`

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
