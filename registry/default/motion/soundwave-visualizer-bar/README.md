# Soundwave Visualizer Bar

An audio equalizer bar array pulsating with organic harmonic frequency fluctuations and vertical dancing springs.

## Install

```bash
openui add soundwave-visualizer-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `continuous-frequency-bounce`
- Visual model: `vertical-spectrum-columns`
- Motion model: `pseudo-random-harmonic-bounce`
- Semantic purpose: `audio-activity-visualizer`

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
