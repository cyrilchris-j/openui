import { ToastProvider, useToast } from "./toast-region";

function Controls() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]"
        onClick={() => toast({ tone: "success", message: "magnetic-button installed." })}
      >
        Success
      </button>
      <button
        type="button"
        className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]"
        onClick={() =>
          toast({
            tone: "info",
            message: "3 files written to src/components.",
            action: { label: "Undo", onClick: () => console.log("undo") },
          })
        }
      >
        With action
      </button>
      <button
        type="button"
        className="border border-oxide px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-oxide"
        onClick={() => toast({ tone: "error", message: "Registry unreachable. The install was not applied." })}
      >
        Error
      </button>
    </div>
  );
}

export default function Demo() {
  return (
    <ToastProvider>
      <div className="bg-paper p-10 text-ink">
        <Controls />
      </div>
    </ToastProvider>
  );
}
