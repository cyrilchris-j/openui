# Database Query Runner

An SQL workbench featuring query input, execution benchmark timer, and structured result record grid.

## Install

```bash
openui add database-query-runner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `database`
- Interaction model: `sql-query-execution-and-results-grid`
- Visual model: `database-console-workbench`
- Motion model: `none`
- Semantic purpose: `database-query-inspection`

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
