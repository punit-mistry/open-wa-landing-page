"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

export function AudioPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.currentTime = 0;
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="absolute left-0 bottom-24"
    >
      <audio
        ref={ref}
        src="/audio/intro.mp3"
        preload="auto"
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="glass flex items-center gap-2 rounded-2xl p-2.5 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-glow-wa"
        aria-label={playing ? "Pause intro audio" : "Play intro audio"}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-wa-green/15 text-wa-green-dark">
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-px" />}
        </span>
        <div className="flex-1 text-left min-w-0">
          <div className="text-[10px] font-semibold text-foreground">Intro Audio</div>
          <div className="mt-0.5 flex items-center gap-1">
            <Volume2 className="h-2.5 w-2.5 text-muted-foreground" />
            <div className="flex items-center gap-[2px]">
              {[0.3, 1, 0.5, 0.8, 0.4, 0.9, 0.6].map((h, i) => (
                <span
                  key={i}
                  className={`w-[2px] rounded-full bg-wa-green transition-all ${playing ? "animate-pulse" : ""}`}
                  style={{
                    height: `${h * 8}px`,
                    animationDelay: playing ? `${i * 0.15}s` : "0s",
                    opacity: playing ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
            <span className="text-[8px] text-muted-foreground">{playing ? "Playing" : "Tap"}</span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
