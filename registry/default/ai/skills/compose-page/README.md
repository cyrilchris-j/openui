# Skill: Compose Page

Instructions for an agent that assembles a page from registry resources.

## Install

```bash
openui add compose-page
```

Written to `.openui/compose-page.md`.

## What it changes

Without it, an agent improvises a layout and reaches for defaults. With it, the
agent must state a design system, a macrostructure and a six-to-nine band plan
using **real resource names from the index** before generating code — which makes
the plan reviewable and the output reproducible.

## Related

`audit-ui` (score the result), `anti-slop` (the constraints), `ui-designer`
(the agent that drives both).
