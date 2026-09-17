# Multi Step Form Rail

Vertical step checklist rail on left with active form step inputs on right.

## Install

```bash
openui add multi-step-form-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `vertical-rail-stepper-form`
- Visual model: `step-rail-and-input-stage`
- Motion model: `none`
- Semantic purpose: `complex-wizard-workflow`

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
