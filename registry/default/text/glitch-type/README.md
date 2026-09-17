# Glitch Type

Burst-based glitching, not a permanent loop: on an interval the text fires a 3-frame RGB channel split with clip-path slicing, then rests clean — the disturbance reads as an event, not wallpaper.

## Install

```bash
openui add glitch-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `interval-burst`
- Visual model: `channel-split`
- Motion model: `burst-then-rest`
- Semantic purpose: `attention-signal`

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
