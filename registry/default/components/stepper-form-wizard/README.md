# Stepper Form Wizard

Multi-step navigation bar with completed checkmarks, current step indicator, and next/previous controls.

## Install

```bash
openui add stepper-form-wizard
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `sequential-wizard-stepping`
- Visual model: `stepper-rail-nodes`
- Motion model: `none`
- Semantic purpose: `form-wizard-flow`

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
