# Split Scroll Feature Showcase

Marketing feature showcase with sticky illustrative canvas on left and sequential scrolling feature steps on right.

## Install

```bash
openui add split-scroll-feature-showcase
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `sticky-graphic-scroll-steps`
- Visual model: `pin-on-scroll-showcase`
- Motion model: `none`
- Semantic purpose: `feature-walkthrough-split`

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
