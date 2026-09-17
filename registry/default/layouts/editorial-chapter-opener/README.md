# Editorial Chapter Opener

Book chapter opening spread featuring oversized Roman numeral, ornamental drop cap, and dual columns.

## Install

```bash
openui add editorial-chapter-opener
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `reading`
- Interaction model: `chapter-opening-reading`
- Visual model: `numeral-and-dropcap-opener`
- Motion model: `none`
- Semantic purpose: `book-chapter-title-spread`

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
