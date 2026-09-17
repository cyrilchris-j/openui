# Data Table Explorer

An interactive paginated table with real-time text query filtering, sortable column headers, and row selection.

## Install

```bash
openui add data-table-explorer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `data-table`
- Interaction model: `search-sort-pagination-table`
- Visual model: `enterprise-tabular-explorer`
- Motion model: `none`
- Semantic purpose: `tabular-data-inspection`

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
