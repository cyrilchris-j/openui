import { SpringDropIn } from "./spring-drop-in";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <SpringDropIn>
        <div className="rounded-xl bg-ink px-8 py-5 text-paper shadow-xl">Drop me in</div>
      </SpringDropIn>
    </div>
  );
}
