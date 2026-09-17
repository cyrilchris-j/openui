# Interactive Calculator Section

ROI developer hours savings calculator with interactive team size slider and live annual savings output.

## Install

```bash
openui add interactive-calculator-section
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `calculator`
- Interaction model: `roi-slider-calculation`
- Visual model: `input-slider-and-savings-kpi`
- Motion model: `none`
- Semantic purpose: `roi-savings-estimator`

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
