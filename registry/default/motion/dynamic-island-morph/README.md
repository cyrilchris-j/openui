# Dynamic Island Morph

A compact floating pill header that morphs smoothly into a wide notification panel upon incoming state event.

## Install

```bash
openui add dynamic-island-morph
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `notifications`
- Interaction model: `expandable-island-capsule`
- Visual model: `black-pill-aperture`
- Motion model: `interpolated-aspect-expansion`
- Semantic purpose: `dynamic-status-capsule`

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
