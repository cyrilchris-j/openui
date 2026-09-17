# Icon Action Strip

A vertical docked icon toolbar providing quick navigation shortcuts with active indicator highlights.

## Install

```bash
openui add icon-action-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `rail-icon-selection`
- Visual model: `vertical-rail-strip`
- Motion model: `none`
- Semantic purpose: `side-rail-navigation`

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
