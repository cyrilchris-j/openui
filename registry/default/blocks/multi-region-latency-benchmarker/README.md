# Multi-region Latency Benchmarker

An edge ping diagnostic utility testing real-time connection latencies against Frankfurt, Virginia, Tokyo, and Singapore.

## Install

```bash
openui add multi-region-latency-benchmarker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `telemetry`
- Interaction model: `ping-benchmark-execution`
- Visual model: `edge-region-ping-comparison-card`
- Motion model: `subtle`
- Semantic purpose: `multi-region-latency-testing`

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
