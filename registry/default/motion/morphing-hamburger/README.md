# Morphing Hamburger

The three-bar icon that becomes an X through genuine morphing: bars are separate elements whose rotations and translations interpolate through a shared keyframe timeline, so the middle bar thins and fades while the outer bars cross precisely.

## Install

```bash
openui add morphing-hamburger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `page`
- Interaction model: `click-toggle`
- Visual model: `three-bar-cross-morph`
- Motion model: `keyframe-interpolation`
- Semantic purpose: `menu-toggle`

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
