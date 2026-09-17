# Master Detail Split

Side-by-side master/detail split with entity list on left and selected record preview on right.

## Install

```bash
openui add master-detail-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `master-detail-list-inspection`
- Visual model: `dual-pane-record-preview`
- Motion model: `none`
- Semantic purpose: `record-detail-workbench`

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
