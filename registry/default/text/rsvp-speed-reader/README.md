# RSVP Speed Reader

Rapid Serial Visual Presentation: words flash one at a time at a fixed focal point with the optimal recognition letter (ORP) highlighted in red, play/pause and WPM control — reading 400 wpm without moving your eyes.

## Install

```bash
openui add rsvp-speed-reader
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `accessible`
- Interaction model: `playback-control`
- Visual model: `single-word-focus`
- Motion model: `fixed-interval-flash`
- Semantic purpose: `speed-reading`

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
