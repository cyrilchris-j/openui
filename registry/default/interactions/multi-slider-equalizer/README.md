# Multi Slider Equalizer

A graphic equalizer rack featuring independent vertical sliders computing frequency spectrum balance.

## Install

```bash
openui add multi-slider-equalizer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `multi-channel-slider-rack`
- Visual model: `bandpass-slider-bank`
- Motion model: `vertical-channel-travel`
- Semantic purpose: `audio-frequency-attenuator`

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
