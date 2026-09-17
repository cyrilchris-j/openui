# Expandable Log Tile

A telemetry log row expanding stack trace payloads on click.

## Install

```bash
openui add expandable-log-tile
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `log-trace-disclosure`
- Visual model: `dark-terminal-row`
- Motion model: `none`
- Semantic purpose: `log-event-tile`

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
