# Rating Feedback Scale

A 1-10 net promoter score rating scale with clickable score tiles and hover highlights.

## Install

```bash
openui add rating-feedback-scale
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `ten-point-scale-selection`
- Visual model: `numbered-tile-row`
- Motion model: `none`
- Semantic purpose: `nps-feedback-selector`

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
