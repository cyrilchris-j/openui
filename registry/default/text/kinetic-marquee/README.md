# Kinetic Marquee

A continuous text band whose speed responds to scroll velocity — faster scrolling accelerates the ticker and skews it proportionally, settling back to base speed when scrolling stops.

## Install

```bash
openui add kinetic-marquee
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `scroll-velocity`
- Visual model: `repeating-band`
- Motion model: `velocity-coupled-translate`
- Semantic purpose: `announcement-band`

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
