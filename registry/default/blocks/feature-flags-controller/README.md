# Feature Flags Controller

An environment release toggle panel managing boolean feature flags, rollout percentages, and target cohorts.

## Install

```bash
openui add feature-flags-controller
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `feature-flag-toggle-and-rollout`
- Visual model: `environment-switch-matrix`
- Motion model: `subtle`
- Semantic purpose: `release-feature-management`

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
