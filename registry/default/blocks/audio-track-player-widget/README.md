# Audio Track Player Widget

A rich multimedia audio card with waveform mockup, play/pause controls, time scrubber, and volume bar.

## Install

```bash
openui add audio-track-player-widget
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `media`
- Interaction model: `audio-playback-and-scrubbing`
- Visual model: `waveform-audio-player-card`
- Motion model: `subtle`
- Semantic purpose: `media-audio-player`

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
