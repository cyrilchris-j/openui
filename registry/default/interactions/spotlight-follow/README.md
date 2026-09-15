# Spotlight Follow

A pointer-tracking highlight for cards, rows and panels.

## Props

| Prop     | Type        | Default                       | Notes                          |
| -------- | ----------- | ----------------------------- | ------------------------------ |
| `radius` | `number`    | `260`                         | Highlight radius in px.        |
| `color`  | CSS colour  | `rgba(200,69,43,0.16)`        | Keep alpha low.                |
| `...rest`| div         | —                             | Forwarded to the wrapper.      |

## Engineering notes

- Two CSS variables are written per frame; the gradient is CSS.
- Focus recentres the highlight, so the effect is not pointer-only.
- Disabled under `prefers-reduced-motion`.
- Use a semi-transparent colour; the highlight must never reduce text contrast.
