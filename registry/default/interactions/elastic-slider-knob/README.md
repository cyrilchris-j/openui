# Elastic Slider Knob

A rotary dial providing resistance that springs back to zero origin when user releases dragging pressure.

## Install

```bash
openui add elastic-slider-knob
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `springback-rotary-dial`
- Visual model: `concentric-recoil-knob`
- Motion model: `torsional-zero-snap`
- Semantic purpose: `springback-jog-wheel`

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
