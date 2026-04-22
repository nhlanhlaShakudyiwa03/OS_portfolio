import React, { useMemo, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const playlist = [
  { id: "track-1", title: "Lo-fi Build Session", src: "/assets/audio/lofi-build.mp3" },
  { id: "track-2", title: "Night Debug Loop", src: "/assets/audio/night-debug.mp3" },
];

export default function MusicPlayerApp() {
  const [currentId, setCurrentId] = useState(playlist[0].id);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const current = useMemo(() => playlist.find((t) => t.id === currentId), [currentId]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="h-full rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 text-white p-6">
      <audio ref={audioRef} src={current?.src} onEnded={() => setPlaying(false)} />
      <div className="text-xl font-semibold">Music Player</div>
      <div className="text-slate-400 mt-1">Background lo-fi/dev soundtrack</div>

      <div className="mt-8 p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="text-lg font-medium">{current?.title}</div>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={togglePlayback} className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
            {playing ? <Pause className="w-5 h-5 text-slate-950" /> : <Play className="w-5 h-5 text-slate-950" />}
          </button>
          <button onClick={toggleMute} className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {playlist.map((track) => (
          <button
            key={track.id}
            onClick={() => {
              setCurrentId(track.id);
              setPlaying(false);
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.load();
              }
            }}
            className={`w-full text-left rounded-xl px-4 py-3 ${currentId === track.id ? "bg-slate-800" : "bg-slate-900/60 hover:bg-slate-800/80"}`}
          >
            {track.title}
          </button>
        ))}
      </div>
    </div>
  );
}