# Dock Navigation

A macOS-style navigation dock that magnifies icons by pointer distance with a falloff curve, magnification driven by one rAF-throttled pointermove and disabled on touch and reduced motion.

## Install

```bash
openui add dock-navigation
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `pointer-proximity-scale`
- Visual model: `icon-rail`
- Motion model: `distance-falloff`
- Semantic purpose: `primary-navigation`

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
