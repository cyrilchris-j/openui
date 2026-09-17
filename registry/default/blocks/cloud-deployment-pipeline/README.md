# Cloud Deployment Pipeline

A continuous integration and edge release runner displaying step progress (Build, Test, Deploy, Verify).

## Install

```bash
openui add cloud-deployment-pipeline
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `ci-pipeline-stage-tracking`
- Visual model: `horizontal-node-pipeline-graph`
- Motion model: `subtle`
- Semantic purpose: `continuous-deployment-status`

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
