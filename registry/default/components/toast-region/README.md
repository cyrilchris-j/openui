# Toast Region

A single notification region for the whole application.

## Usage

```tsx
<ToastProvider>
  <App />
</ToastProvider>

const { toast } = useToast();
toast({ tone: "success", message: "Installed." });
toast({ tone: "error", message: "Registry unreachable.", duration: 0 });
```

## Behaviour

| Tone      | Live region | Default duration |
| --------- | ----------- | ---------------- |
| `info`    | `polite`    | 5s               |
| `success` | `polite`    | 5s               |
| `error`   | `assertive` | 8s, or manual    |

- The region is always mounted, so announcements are reliable.
- Toasts never take focus and never block the page.
- `duration: 0` keeps a toast until it is dismissed.
- Animation is suppressed under `prefers-reduced-motion`.
