# Fluid Drawer Peek

A bottom sheet drawer with tactile peek resting states, rubberband drag boundary resistance, and spring release velocity interpolation.

## Install

```bash
openui add fluid-drawer-peek
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gesture`
- Interaction model: `vertical-flick-drawer`
- Visual model: `docked-bottom-sheet`
- Motion model: `bistable-spring-threshold`
- Semantic purpose: `modal-inspector-sheet`

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
