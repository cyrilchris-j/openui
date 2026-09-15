# Prompt: Hero Composition

A fill-in-the-slots prompt for page openings.

## Install

```bash
openui add hero-prompt
```

Written to `.openui/prompts/hero.md`.

## Why a prompt, not a chatbot

The platform deliberately ships targeted prompts rather than a general assistant.
A prompt with four required slots (`product`, `reader`, `design system`,
`resources`) makes the input quality visible, and it forces a plan before markup —
which is where generic output actually comes from.

## Related

`compose-page` for whole pages, `ui-designer` for the full agent loop.
