# Stepper Wizard Shell

Structured multi-step form container with fixed top stepper rail and centered form card.

## Install

```bash
openui add stepper-wizard-shell
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `wizard-step-progression`
- Visual model: `stepper-rail-form-card`
- Motion model: `none`
- Semantic purpose: `multi-step-form-shell`

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
