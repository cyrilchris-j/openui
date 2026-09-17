# Hero Showcase Split

Marketing landing hero section with compelling value proposition on left and dynamic graphic showcase on right.

## Install

```bash
openui add hero-showcase-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `hero-value-prop-inspection`
- Visual model: `split-landing-hero`
- Motion model: `none`
- Semantic purpose: `landing-page-hero-split`

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
