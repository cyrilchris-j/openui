# System Load Stress Tester

A simulated concurrent traffic stress tester with virtual user (VU) slider and live latency benchmarking curve.

## Install

```bash
openui add system-load-stress-tester
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `testing`
- Interaction model: `concurrency-load-stress-simulation`
- Visual model: `stress-test-benchmark-console`
- Motion model: `mechanical`
- Semantic purpose: `load-concurrency-benchmarking`

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
