# Industrial Dashboard

An operations surface built from rules, not cards.

## Props

| Prop      | Type                 | Notes                                     |
| --------- | -------------------- | ----------------------------------------- |
| `title`   | `string`             | Header label, monospace uppercase.         |
| `metrics` | `Metric[]`           | Counter row; `trend` renders a glyph.      |
| `panels`  | `DashboardPanel[]`   | `span` is a 12-column lg span.             |

## Design notes

Regions differ in **weight**, not in elevation. If you find yourself adding a
shadow to separate two panels, add a hairline instead — that is what makes this
read as instrumentation rather than a SaaS template.
