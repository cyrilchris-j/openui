# Type Stack

A vertical stack of phrases that cycles with a directional slide, reserving the height of the longest phrase so surrounding layout never reflows; pauses on hover and focus.

## Install

```bash
openui add type-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `timer-cycle`
- Visual model: `stacked-phrases`
- Motion model: `directional-slide`
- Semantic purpose: `heading-rotation`

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
