# Laser Scan Bar

Sweeping horizontal crimson laser line simulating a security barcode optical scanner.

## Install

```bash
openui add laser-scan-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-laser-scan`
- Visual model: `sweeping-crimson-beam`
- Motion model: `vertical-bounce-sweep`
- Semantic purpose: `security-laser-scanner`

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
