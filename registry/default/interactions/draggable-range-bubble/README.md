# Draggable Range Bubble

A continuous range control where an elevated callout bubble floats dynamically over the dragged thumb handle.

## Install

```bash
openui add draggable-range-bubble
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `dragged-callout-bubble`
- Visual model: `floating-numeric-capsule`
- Motion model: `slaved-thumb-tracking`
- Semantic purpose: `continuous-range-callout`

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
