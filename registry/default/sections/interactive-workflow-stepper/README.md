# Interactive Workflow Stepper

A chronological process section showing numbered steps with live tab switching and interactive preview detail.

## Install

```bash
openui add interactive-workflow-stepper
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `process`
- Interaction model: `interactive-workflow-stepper-interaction`
- Visual model: `interactive-workflow-stepper-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-workflow-stepper-section`

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
