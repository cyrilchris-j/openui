# Multi Column Glossary Index

Three-column alphabetical glossary layout with letter jump anchors and definition cards.

## Install

```bash
openui add multi-column-glossary-index
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `glossary-alphabetical-scan`
- Visual model: `three-column-letter-matrix`
- Motion model: `none`
- Semantic purpose: `alphabetical-glossary-index`

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
