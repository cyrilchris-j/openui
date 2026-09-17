# Deployment Environment Diff

A side-by-side environment inspector comparing staging vs production configuration variables.

## Install

```bash
openui add deployment-environment-diff
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `env-variable-diff-comparison`
- Visual model: `side-by-side-config-diff`
- Motion model: `none`
- Semantic purpose: `environment-variable-comparison`

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
