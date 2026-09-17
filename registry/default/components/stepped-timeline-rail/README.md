# Stepped Timeline Rail

A vertical progress timeline connecting milestone nodes with status descriptions.

## Install

```bash
openui add stepped-timeline-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `vertical-timeline-inspection`
- Visual model: `connected-milestone-rail`
- Motion model: `none`
- Semantic purpose: `vertical-timeline-display`

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
