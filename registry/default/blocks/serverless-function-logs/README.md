# Serverless Function Logs

An edge serverless function invocation console reporting execution duration, memory consumption, and cold start metrics.

## Install

```bash
openui add serverless-function-logs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `serverless-execution-log-streaming`
- Visual model: `edge-function-invocation-ledger`
- Motion model: `none`
- Semantic purpose: `serverless-function-telemetry`

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
