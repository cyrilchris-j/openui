import { PageWipeTransition } from "./page-wipe-transition";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <PageWipeTransition
        className="w-full max-w-lg rounded-xl border border-line"
        pages={[
          { label: "one", content: "The cut is a design decision." },
          { label: "two", content: "Cover fast, reveal slow." },
          { label: "three", content: "Navigation becomes choreography." },
        ]}
      />
    </div>
  );
}
