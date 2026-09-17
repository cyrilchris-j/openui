"use client";

import { MediaPlayerTheater } from "./media-player-theater";

export default function MediaPlayerTheaterDemo() {
  return (
    <MediaPlayerTheater
      screen={<div className="font-mono text-xs text-white/60">16:9 Cinema Playback Viewport</div>}
      playlist={<div className="font-mono text-xs text-ink/70">Next: Lecture 02 — Motion Physics</div>}
    >
      <h2 className="text-base font-bold text-ink">Lecture 01: The Calculus of Visual Balance</h2>
      <p className="text-xs text-ink/60">Prof. Elena Rostova • Stanford Design Laboratory</p>
    </MediaPlayerTheater>
  );
}
