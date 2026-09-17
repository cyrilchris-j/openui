# Tilt Parallax Button

A primary button calculating 3D perspective rotation and specular rim lighting under mouse hover angle.

## Install

```bash
openui add tilt-parallax-button
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `button-tilt-perspective`
- Visual model: `beveled-action-pill`
- Motion model: `damped-perspective-swivel`
- Semantic purpose: `high-impact-cta-button`

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
