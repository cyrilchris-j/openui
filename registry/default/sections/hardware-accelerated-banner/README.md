# Hardware Accelerated Banner

A high-performance technical callout banner emphasizing GPU composition and 120fps animations.

## Install

```bash
openui add hardware-accelerated-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `hardware`
- Interaction model: `hardware-accelerated-banner-interaction`
- Visual model: `hardware-accelerated-banner-visual`
- Motion model: `subtle`
- Semantic purpose: `hardware-accelerated-banner-section`

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
