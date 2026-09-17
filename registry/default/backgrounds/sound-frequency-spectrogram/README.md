# Sound Frequency Spectrogram

Waterfall audio spectrum analyzer heatmap spectrogram with chromatic acoustic intensity bands.

## Install

```bash
openui add sound-frequency-spectrogram
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-spectrogram-backdrop`
- Visual model: `frequency-intensity-heatmap`
- Motion model: `none`
- Semantic purpose: `audio-spectrogram-canvas`

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
