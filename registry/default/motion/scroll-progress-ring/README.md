# Scroll Progress Ring

Reading progress drawn as an SVG ring around a fixed badge: the stroke fills clockwise with scroll progress, the percentage ticks in tabular numerals in the centre, and clicking it scrolls back to top.

## Install

```bash
openui add scroll-progress-ring
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-progress-trigger`
- Visual model: `svg-stroke-ring`
- Motion model: `scroll-linked-dashoffset`
- Semantic purpose: `reading-progress`

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
