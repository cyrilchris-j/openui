# Telemetry Live Tail Stream

A streaming log terminal with pause/resume controls, log severity filters, and auto-scrolling telemetry.

## Install

```bash
openui add telemetry-live-tail-stream
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `telemetry`
- Interaction model: `streaming-log-tail-pause-resume`
- Visual model: `console-log-streaming-window`
- Motion model: `mechanical`
- Semantic purpose: `edge-log-tail-streaming`

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
