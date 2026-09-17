# Rating Star Group

An accessible rating group displaying star glyphs with locked status and numeric feedback score.

## Install

```bash
openui add rating-star-group
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `star-rating-scoring`
- Visual model: `five-star-glyph-chain`
- Motion model: `glyph-highlight-step`
- Semantic purpose: `review-star-group`

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
