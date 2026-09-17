# Stacked Card Deck

Vertical stacked card sequence where headers stick cleanly on top of one another during scroll.

## Install

```bash
openui add stacked-card-deck
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `stacking-sticky-card-scroll`
- Visual model: `overlapping-card-deck`
- Motion model: `none`
- Semantic purpose: `stacked-story-deck`

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
