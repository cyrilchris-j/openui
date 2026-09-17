# Interactive Star Rating

A precision review star rating component calculating fractional hover preview and locked rating state.

## Install

```bash
openui add interactive-star-rating
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `hover-preview-star-rating`
- Visual model: `five-star-rating-row`
- Motion model: `stepwise-rating-highlight`
- Semantic purpose: `star-rating-input`

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
