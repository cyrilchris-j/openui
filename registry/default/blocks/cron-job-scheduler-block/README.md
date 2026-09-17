# Cron Job Scheduler Block

A recurring task scheduler with 5-field cron syntax parser, human-readable translation, and trigger actions.

## Install

```bash
openui add cron-job-scheduler-block
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `cron-expression-input-and-trigger`
- Visual model: `scheduled-job-timeline-card`
- Motion model: `none`
- Semantic purpose: `scheduled-cron-task-execution`

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
