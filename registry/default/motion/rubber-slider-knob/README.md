# Rubber Slider Knob

A rotary dial knob providing tactile angular drag resistance that rebounds smoothly when released past threshold.

## Install

```bash
openui add rubber-slider-knob
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `controls`
- Interaction model: `rotational-angular-drag`
- Visual model: `notched-calibrated-dial`
- Motion model: `torsional-spring-recoil`
- Semantic purpose: `rotary-audio-attenuator`

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
