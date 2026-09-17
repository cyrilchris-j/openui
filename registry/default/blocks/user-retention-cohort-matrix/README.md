# User Retention Cohort Matrix

A SaaS analytics retention heatmap table visualizing weekly active cohorts and retention percentages.

## Install

```bash
openui add user-retention-cohort-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `analytics`
- Interaction model: `cohort-matrix-cell-inspection`
- Visual model: `saas-retention-heatmap-grid`
- Motion model: `none`
- Semantic purpose: `user-cohort-retention-analysis`

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
