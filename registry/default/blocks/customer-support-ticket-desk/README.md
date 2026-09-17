# Customer Support Ticket Desk

A customer service ticket triage queue with priority labels, status toggles, and assignee badges.

## Install

```bash
openui add customer-support-ticket-desk
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `support`
- Interaction model: `ticket-status-triage-filter`
- Visual model: `support-queue-workbench`
- Motion model: `none`
- Semantic purpose: `support-ticket-resolution`

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
