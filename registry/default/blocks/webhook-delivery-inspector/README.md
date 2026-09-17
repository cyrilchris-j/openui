# Webhook Delivery Inspector

An HTTP webhook dispatch log displaying payload digests, status codes (200, 500), and retry action triggers.

## Install

```bash
openui add webhook-delivery-inspector
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `webhooks`
- Interaction model: `webhook-event-inspection-and-retry`
- Visual model: `http-delivery-status-ledger`
- Motion model: `subtle`
- Semantic purpose: `webhook-monitoring-console`

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
