import { ScrollMaskWipe } from "./scroll-mask-wipe";

export default function Demo() {
  return (
    <div className="bg-paper">
      <div className="h-[40vh]" />
      <div className="flex min-h-[30vh] items-center justify-center p-10">
        <ScrollMaskWipe className="font-display text-step-4 text-ink">
          Read by scrolling
        </ScrollMaskWipe>
      </div>
      <div className="h-[40vh]" />
    </div>
  );
}
