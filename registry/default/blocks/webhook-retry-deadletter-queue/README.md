# Webhook Retry Deadletter Queue

A dead-letter queue recovery tool displaying failed delivery events and bulk re-dispatch action triggers.

## Install

```bash
openui add webhook-retry-deadletter-queue
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `webhooks`
- Interaction model: `dead-letter-queue-redelivery`
- Visual model: `failed-job-retry-console`
- Motion model: `none`
- Semantic purpose: `dead-letter-queue-recovery`

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
