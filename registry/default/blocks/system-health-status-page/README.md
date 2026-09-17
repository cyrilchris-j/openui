# System Health Status Page

A complete service health status board displaying global edge availability, incident timeline, and uptime bars.

## Install

```bash
openui add system-health-status-page
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `status`
- Interaction model: `system-status-indicator-monitoring`
- Visual model: `uptime-history-status-board`
- Motion model: `subtle`
- Semantic purpose: `service-uptime-status`

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
