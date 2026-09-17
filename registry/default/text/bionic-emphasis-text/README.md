# Bionic Emphasis Text

Reading-aid typography that bolds the leading fragment of every word at a set attention ratio, guiding the eye through long paragraphs without changing a single word — a genuine legibility system, not decoration.

## Install

```bash
openui add bionic-emphasis-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `fragment-weighting`
- Motion model: `none`
- Semantic purpose: `reading-assistance`

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
