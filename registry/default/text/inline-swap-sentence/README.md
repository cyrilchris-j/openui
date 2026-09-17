# Inline Swap Sentence

A sentence with one clickable word that cycles through alternatives on click — a live copy-testing widget where the sentence grammar stays intact and the swapped word rolls in with a vertical slide.

## Install

```bash
openui add inline-swap-sentence
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `click-cycle`
- Visual model: `inline-slot-swap`
- Motion model: `vertical-slide`
- Semantic purpose: `copy-exploration`

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
