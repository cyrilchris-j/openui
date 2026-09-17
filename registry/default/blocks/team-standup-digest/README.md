# Team Standup Digest

An asynchronous standup card organizing squad updates across Completed, In Progress, and Blockers.

## Install

```bash
openui add team-standup-digest
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `team`
- Interaction model: `async-standup-task-logging`
- Visual model: `standup-progress-card`
- Motion model: `none`
- Semantic purpose: `agile-standup-tracking`

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
