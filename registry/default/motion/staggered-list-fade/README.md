# Staggered List Fade

A cascade of record items fading and sliding sequentially into position upon trigger with incremental delays.

## Install

```bash
openui add staggered-list-fade
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `viewport-stagger-fade`
- Visual model: `sequential-record-stack`
- Motion model: `incremental-delay-translation`
- Semantic purpose: `content-feed-staggerer`

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
