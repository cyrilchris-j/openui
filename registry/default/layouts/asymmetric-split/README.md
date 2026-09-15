# Asymmetric Split

A two-column shell with an intentional ratio.

## Props

| Prop         | Type            | Default     | Notes                            |
| ------------ | --------------- | ----------- | -------------------------------- |
| `main`       | `ReactNode`     | —           | Primary column (`<main>`).        |
| `aside`      | `ReactNode`     | —           | Secondary column (`<aside>`).     |
| `ratio`      | `4 \| 5 \| 6`   | `5`         | 2/1, 7/5, 3/2.                    |
| `asideFirst` | `boolean`       | `false`     | Aside on the left at `lg`.        |
| `gap`        | `sm \| md \| lg`| `md`        | Gutter scale.                     |

## Notes

Below 1024px the layout collapses to one column and the aside follows the main
content in the reading order. Nothing is hidden, nothing is reordered by CSS
alone in a way that breaks tab order.
