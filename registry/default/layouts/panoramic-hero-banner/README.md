# Panoramic Hero Banner

Ultra-wide 21:9 cinematic aspect ratio hero banner layout with centered title card overlay.

## Install

```bash
openui add panoramic-hero-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `panoramic-banner-view`
- Visual model: `twenty-one-nine-aspect-hero`
- Motion model: `none`
- Semantic purpose: `cinematic-hero-presentation`

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
