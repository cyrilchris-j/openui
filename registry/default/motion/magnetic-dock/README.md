# Magnetic Dock

A dock where icons gravitate toward the pointer within an influence field: displacement falls off with distance (inverse-square), neighbours lean toward the cursor, and the dock lifts as a whole when engaged.

## Install

```bash
openui add magnetic-dock
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `hover`
- Interaction model: `pointer-field`
- Visual model: `displacement-icon-rail`
- Motion model: `inverse-square-attraction`
- Semantic purpose: `app-launcher`

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
