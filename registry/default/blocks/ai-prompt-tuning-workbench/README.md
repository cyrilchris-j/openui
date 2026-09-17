# AI Prompt Tuning Workbench

An interactive LLM prompt development playground with temperature sliders, token counters, and live response streaming.

## Install

```bash
openui add ai-prompt-tuning-workbench
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `ai`
- Interaction model: `prompt-engineering-parameter-tuning`
- Visual model: `dual-pane-prompt-workbench`
- Motion model: `subtle`
- Semantic purpose: `ai-prompt-engineering`

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
