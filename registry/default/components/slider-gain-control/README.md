# Slider Gain Control

A precision gain control slider with dB calibrated notches and decibel label outputs.

## Install

```bash
openui add slider-gain-control
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `calibrated-gain-slider`
- Visual model: `db-metered-track`
- Motion model: `none`
- Semantic purpose: `audio-gain-control-bar`

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
