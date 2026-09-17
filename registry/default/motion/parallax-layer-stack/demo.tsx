import { ParallaxLayerStack } from "./parallax-layer-stack";

export default function Demo() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-sky-100 to-paper p-10">
      <div className="h-[20vh]" />
      <ParallaxLayerStack
        className="rounded-2xl"
        layers={[
          { speed: 0.3, content: <div className="absolute inset-x-0 top-10 h-40 rounded-full bg-white/60 blur-2xl" /> },
          { speed: 0.6, content: <div className="relative mx-auto h-48 w-2/3 rounded-2xl bg-white/80 shadow-xl" /> },
          { speed: 1.2, content: <p className="relative z-10 py-16 text-center font-display text-3xl text-ink">Mountains move slower than foregrounds</p> },
        ]}
      />
      <div className="h-[50vh]" />
    </div>
  );
}
