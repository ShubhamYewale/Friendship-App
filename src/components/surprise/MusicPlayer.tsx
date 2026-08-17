import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(siteConfig.music);
    audio.loop = true;
    audio.volume = 0.4;

    audio.addEventListener("canplaythrough", () => setAvailable(true), { once: true });
    audio.addEventListener("error", () => setAvailable(false), { once: true });

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current || !available) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // Don't render if music file is not available
  if (!available && playing === false) {
    // We show the button always but it will appear disabled if unavailable
    // (available state resolves asynchronously)
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause music" : "Play music"}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center text-base transition-all duration-200"
      style={{
        background: "hsla(0,0%,11%,0.8)",
        border: "1px solid hsla(340,80%,62%,0.3)",
        backdropFilter: "blur(8px)",
        color: playing ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        boxShadow: playing ? "0 0 14px hsla(340,80%,62%,0.4)" : "none",
        opacity: available ? 1 : 0.4,
        cursor: available ? "pointer" : "default",
      }}
    >
      {playing ? "♫" : "♩"}
    </button>
  );
};

export default MusicPlayer;
