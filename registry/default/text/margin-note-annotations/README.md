# Margin Note Annotations

Body text with superscript markers that open notes in the outer margin on wide viewports and inline expanders on narrow ones — a responsive recomposition of the scholarly annotation, not just a hidden block.

## Install

```bash
openui add margin-note-annotations
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `click-expand-note`
- Visual model: `margin-anchored-notes`
- Motion model: `grid-reflow`
- Semantic purpose: `annotation`

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
