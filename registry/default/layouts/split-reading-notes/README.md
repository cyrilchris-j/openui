# Split Reading Notes

Edward Tufte-style margin notes layout with annotations aligned adjacent to corresponding prose paragraphs.

## Install

```bash
openui add split-reading-notes
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `reading`
- Interaction model: `marginal-annotation-reading`
- Visual model: `side-margin-sidenotes`
- Motion model: `none`
- Semantic purpose: `scholarly-reading-layout`

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
