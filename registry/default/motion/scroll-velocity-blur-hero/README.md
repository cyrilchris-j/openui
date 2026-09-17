# Scroll Velocity Blur Hero

A hero whose letters gain directional blur proportional to scroll speed and settle crisp at rest — using a stacked text-shadow trick instead of filter blur so it stays GPU-cheap even on long pages.

## Install

```bash
openui add scroll-velocity-blur-hero
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-velocity-trigger`
- Visual model: `shadow-blur-text`
- Motion model: `speed-coupled-shadow`
- Semantic purpose: `hero-feedback`

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
