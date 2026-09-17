# Interactive Rating Collector

An instant user feedback mechanism with star selections and submit validation.

## Install

```bash
openui add interactive-rating-collector
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `reviews`
- Interaction model: `interactive-rating-collector-interaction`
- Visual model: `interactive-rating-collector-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-rating-collector-section`

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
