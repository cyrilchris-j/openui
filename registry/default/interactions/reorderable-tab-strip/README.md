# Reorderable Tab Strip

A browser-style tab bar allowing tabs to be dragged horizontally to swap places with animated displacement.

## Install

```bash
openui add reorderable-tab-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `horizontal-tab-reorder`
- Visual model: `browser-tab-strip`
- Motion model: `lateral-tab-displacement`
- Semantic purpose: `reorderable-browser-tabs`

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
