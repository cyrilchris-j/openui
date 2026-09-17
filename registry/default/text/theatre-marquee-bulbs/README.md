# Theatre Marquee Bulbs

A theatre sign where the border is a string of chasing light bulbs (CSS radial dots animating in sequence) around the lettering — the chase runs the perimeter while the text stays still, unlike every other marquee.

## Install

```bash
openui add theatre-marquee-bulbs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `ambient-loop`
- Visual model: `perimeter-bulb-chase`
- Motion model: `sequential-phase-border`
- Semantic purpose: `signage`

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
