# Data Export Queue Monitor

A background asynchronous export task monitor with live progress percentage and download links.

## Install

```bash
openui add data-export-queue-monitor
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `export-job-progress-monitoring`
- Visual model: `async-task-queue-tray`
- Motion model: `subtle`
- Semantic purpose: `async-data-export-queue`

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
