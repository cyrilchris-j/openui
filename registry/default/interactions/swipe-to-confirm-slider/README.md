# Swipe to Confirm Slider

A swipe-to-unlock horizontal action latch requiring full channel traversal to commit irreversible actions.

## Install

```bash
openui add swipe-to-confirm-slider
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `full-stroke-latch-swipe`
- Visual model: `retained-rail-chassis`
- Motion model: `threshold-locked-travel`
- Semantic purpose: `commit-authorization-slider`

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
