# Onboarding Flow Shell

Centered welcoming user onboarding dialog container with step dots indicator and forward controls.

## Install

```bash
openui add onboarding-flow-shell
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `onboarding-step-modal`
- Visual model: `centered-welcome-card`
- Motion model: `none`
- Semantic purpose: `first-run-onboarding-shell`

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
