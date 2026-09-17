# Reading Level Tinter

Each sentence is tinted by its own complexity — average word length and clause count map to an ink density ramp — so a paragraph shows you where it gets hard to read before you get there.

## Install

```bash
openui add reading-level-tinter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `static`
- Visual model: `complexity-tinted-sentences`
- Motion model: `none`
- Semantic purpose: `readability-analysis`

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
