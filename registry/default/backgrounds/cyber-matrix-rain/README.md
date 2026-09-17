# Cyber Matrix Rain

HTML5 Canvas falling green/cyan glyph characters stream inspired by classic cyberpunk terminal screens.

## Install

```bash
openui add cyber-matrix-rain
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-render`
- Visual model: `falling-code-rain`
- Motion model: `constant-stream-drop`
- Semantic purpose: `cyberpunk-matrix-stream`

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
