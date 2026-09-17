# Subtle Grid Paper

Classic drafting quadrant grid paper with fine square divisions and major index lines.

## Install

```bash
openui add subtle-grid-paper
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-graph-paper`
- Visual model: `quad-ruled-drafting-paper`
- Motion model: `none`
- Semantic purpose: `engineering-drafting-grid`

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
