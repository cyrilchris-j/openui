# Blueprint Grid

A visible modular grid for technical surfaces.

## Props

| Prop          | Type     | Default | Notes                              |
| ------------- | -------- | ------- | ---------------------------------- |
| `cell`        | `string` | `24px`  | Fine grid size.                     |
| `module`      | `string` | `96px`  | Coarse module size.                 |
| `cellColor`   | `string` | derived | Fine line colour.                   |
| `moduleColor` | `string` | derived | Module line colour.                 |

## Notes

Pure CSS `background-image`. Match `cell` to your baseline and `module` to your
column width and the surface documents the layout it sits inside.
