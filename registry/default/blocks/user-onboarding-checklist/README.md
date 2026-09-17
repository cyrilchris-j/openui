# User Onboarding Checklist

An interactive getting-started card with progress calculation, task completion toggles, and step guides.

## Install

```bash
openui add user-onboarding-checklist
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `onboarding`
- Interaction model: `task-completion-progress-checklist`
- Visual model: `gamified-onboarding-stepper`
- Motion model: `subtle`
- Semantic purpose: `user-activation-checklist`

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
