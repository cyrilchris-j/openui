# Project Roadmap Gantt Chart

A milestone timeline Gantt visualization displaying deliverable progress across sprints and quarters.

## Install

```bash
openui add project-roadmap-gantt-chart
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `roadmap`
- Interaction model: `gantt-timeline-scrubbing`
- Visual model: `quarterly-milestone-bar-chart`
- Motion model: `none`
- Semantic purpose: `milestone-gantt-roadmap`

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
