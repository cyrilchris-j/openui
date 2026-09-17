# Pagination Dot Bar

Carousel pagination indicator with an elongated active capsule dot reflecting view index.

## Install

```bash
openui add pagination-dot-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `pagination-dot-selection`
- Visual model: `beaded-dot-row`
- Motion model: `none`
- Semantic purpose: `carousel-dot-indicator`

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
