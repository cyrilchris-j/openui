# Developer Webhook Debugger

An interactive webhook payload simulator with JSON syntax validation and instant HTTP response inspector.

## Install

```bash
openui add developer-webhook-debugger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `webhooks`
- Interaction model: `webhook-payload-replay-sandbox`
- Visual model: `debugger-payload-console`
- Motion model: `none`
- Semantic purpose: `webhook-endpoint-debugging`

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
