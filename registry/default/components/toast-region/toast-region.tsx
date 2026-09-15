"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Toast Region
 *
 * The hard part of a toast system is not the animation, it is the announcement.
 * `role="status"` is polite and queues behind whatever the reader is saying;
 * `role="alert"` interrupts. Getting that wrong makes an interface unusable with
 * a screen reader, so this component picks per tone rather than globally, keeps
 * one live region mounted for the lifetime of the app (screen readers ignore
 * regions that appear at the same time as their content), and never traps focus.
 */

export type ToastTone = "info" | "success" | "error";

export interface Toast {
  id: string;
  message: string;
  tone: ToastTone;
  /** Milliseconds; 0 keeps the toast until dismissed. */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast: (input: Omit<Toast, "id"> & { id?: string }) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (input: Omit<Toast, "id"> & { id?: string }) => {
      counter.current += 1;
      const id = input.id ?? `toast-${counter.current}`;
      const duration = input.duration ?? (input.tone === "error" ? 8000 : 5000);
      setToasts((current) => [...current.filter((item) => item.id !== id), { ...input, id }]);
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismiss],
  );

  const clear = useCallback(() => {
    setToasts([]);
    for (const timer of timers.current.values()) clearTimeout(timer);
    timers.current.clear();
  }, []);

  useEffect(
    () => () => {
      for (const timer of timers.current.values()) clearTimeout(timer);
      timers.current.clear();
    },
    [],
  );

  const value = useMemo(() => ({ toast, dismiss, clear }), [clear, dismiss, toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 left-1/2 z-50 flex w-[min(30rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-2"
        aria-label="Notifications"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role={item.tone === "error" ? "alert" : "status"}
            aria-live={item.tone === "error" ? "assertive" : "polite"}
            className={cn(
              "pointer-events-auto flex items-start gap-3 border bg-paper px-4 py-3 text-sm shadow-[0_18px_40px_-24px_rgba(16,15,13,0.5)]",
              item.tone === "error" ? "border-oxide text-oxide" : "border-ink text-ink",
              "animate-[openui-toast-in_180ms_cubic-bezier(0.2,0,0,1)] motion-reduce:animate-none",
            )}
          >
            <span className="flex-1 font-sans leading-snug">{item.message}</span>
            {item.action ? (
              <button
                type="button"
                onClick={() => {
                  item.action?.onClick();
                  dismiss(item.id);
                }}
                className="font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-4"
              >
                {item.action.label}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Dismiss notification"
              className="font-mono text-xs text-graphite hover:text-ink"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes openui-toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
