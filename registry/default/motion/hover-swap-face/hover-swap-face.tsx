import { cn } from "@/lib/cn";

export interface HoverSwapFaceProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function HoverSwapFace({ front, back, className }: HoverSwapFaceProps) {
  return (
    <div className={cn("group h-44 w-72 [perspective:900px]", className)} tabIndex={0}>
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] group-focus-visible:[transform:rotateX(180deg)]">
        <div className="absolute inset-0 rounded-xl border border-line bg-paper p-6 [backface-visibility:hidden]">
          {front}
        </div>
        <div
          className="absolute inset-0 rounded-xl bg-ink p-6 text-paper [backface-visibility:hidden]"
          style={{ transform: "rotateX(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

export default HoverSwapFace;
