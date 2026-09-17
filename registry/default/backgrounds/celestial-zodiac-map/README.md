# Celestial Zodiac Map

Antique star constellation chart with coordinate meridian lines and celestial astrological markers.

## Install

```bash
openui add celestial-zodiac-map
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-astronomy-chart`
- Visual model: `celestial-meridian-lattice`
- Motion model: `none`
- Semantic purpose: `celestial-cartography-backdrop`

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
