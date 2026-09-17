# Interactive Terminal Playground

An embedded simulated developer terminal executing commands like help, inspect, and test with live output.

## Install

```bash
openui add interactive-terminal-playground
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `developer`
- Interaction model: `interactive-terminal-playground-interaction`
- Visual model: `interactive-terminal-playground-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-terminal-playground-section`

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
