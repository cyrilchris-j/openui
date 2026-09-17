# Hero Media Showcase

A flagship hero section featuring browser frame window mockup, glowing gradients, callout badges, and dual action CTAs.

## Install

```bash
openui add hero-media-showcase
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `hero`
- Interaction model: `hero-media-showcase-interaction`
- Visual model: `hero-media-showcase-visual`
- Motion model: `subtle`
- Semantic purpose: `hero-media-showcase-section`

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
