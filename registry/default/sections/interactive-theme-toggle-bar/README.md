# Interactive Theme Toggle Bar

A lightweight presentation strip showcasing light, dark, and system color mode switching.

## Install

```bash
openui add interactive-theme-toggle-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `theme`
- Interaction model: `interactive-theme-toggle-bar-interaction`
- Visual model: `interactive-theme-toggle-bar-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-theme-toggle-bar-section`

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
