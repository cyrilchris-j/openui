# Page Diagonal Wipe

A 45-degree angled clip-path diagonal wipe sweeping across the screen boundary on section change.

## Install

```bash
openui add page-diagonal-wipe
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `angled-mask-reveal`
- Visual model: `diagonal-45deg-shutter`
- Motion model: `polygon-clip-translation`
- Semantic purpose: `diagonal-section-shutter`

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
