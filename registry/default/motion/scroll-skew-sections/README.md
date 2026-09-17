# Scroll Skew Sections

Alternating sections skew in opposing directions with scroll velocity — even sections lean forward, odd sections lean back, creating a shear wave through the page that flattens when scrolling stops.

## Install

```bash
openui add scroll-skew-sections
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-velocity-trigger`
- Visual model: `alternating-skew-planes`
- Motion model: `velocity-shear-opposing`
- Semantic purpose: `kinetic-sections`

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
