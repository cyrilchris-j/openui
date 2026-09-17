# Stepped Progress Rail

A segmented workflow milestone indicator showing current execution step and completed checkpoints.

## Install

```bash
openui add stepped-progress-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `step-station-milestones`
- Visual model: `segmented-station-rail`
- Motion model: `step-indicator-advance`
- Semantic purpose: `workflow-phase-indicator`

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
