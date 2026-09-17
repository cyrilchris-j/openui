# Scroll Shear Type

Headline that skews proportionally to scroll velocity and springs back to true when scrolling stops — the letters lean into the motion like pages fanned by wind, driven by a critically damped spring.

## Install

```bash
openui add scroll-shear-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `scroll`
- Interaction model: `scroll-velocity-trigger`
- Visual model: `skewed-block`
- Motion model: `damped-spring-return`
- Semantic purpose: `kinetic-heading`

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
