# Smart Document Tagger

An automated keyword and category tagger allowing content editors to categorize resources quickly.

## Install

```bash
openui add smart-document-tagger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `editor`
- Interaction model: `tag-addition-and-removal`
- Visual model: `interactive-pill-tagger-card`
- Motion model: `subtle`
- Semantic purpose: `document-tag-categorization`

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
