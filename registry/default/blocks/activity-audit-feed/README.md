# Activity Audit Feed

A chronological organization activity log displaying deployment timestamps, author details, and action metadata.

## Install

```bash
openui add activity-audit-feed
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `activity`
- Interaction model: `audit-stream-filtering`
- Visual model: `chronological-event-timeline`
- Motion model: `subtle`
- Semantic purpose: `organization-audit-trail`

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
