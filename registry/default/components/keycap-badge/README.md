# Keycap Badge

A mechanical keycap badge styled with bottom beveled edge shadows to simulate physical mechanical keyboard caps.

## Install

```bash
openui add keycap-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `keycap-badge-press`
- Visual model: `beveled-keycap-slab`
- Motion model: `tactile-depression`
- Semantic purpose: `hotkey-keycap-indicator`

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
