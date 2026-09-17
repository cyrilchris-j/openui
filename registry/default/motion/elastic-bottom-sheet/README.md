# Elastic Bottom Sheet

A tactile mobile-style bottom sheet featuring drag resistance, velocity snap points, and rubberband bounds.

## Install

```bash
openui add elastic-bottom-sheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `vertical-flick-sheet`
- Visual model: `docked-drawer-panel`
- Motion model: `snap-point-spring-detents`
- Semantic purpose: `interactive-sheet-drawer`

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
