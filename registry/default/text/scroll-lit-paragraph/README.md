# Scroll Lit Paragraph

A long paragraph where words illuminate one by one as scroll progress passes them — reading position made spatial, like a cursor of light sweeping through the copy as the page moves.

## Install

```bash
openui add scroll-lit-paragraph
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `scroll`
- Interaction model: `scroll-progress-trigger`
- Visual model: `word-illumination-ramp`
- Motion model: `scroll-linked-fill`
- Semantic purpose: `reading-progress`

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
