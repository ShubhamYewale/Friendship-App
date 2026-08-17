import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

interface PhotoRevealProps {
  onContinue: () => void;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%231C1C1C'/%3E%3Ctext x='50%25' y='44%25' font-size='48' text-anchor='middle' dominant-baseline='middle'%3E🌸%3C/text%3E%3Ctext x='50%25' y='56%25' font-size='13' fill='%23888' text-anchor='middle' dominant-baseline='middle' font-family='system-ui'%3EPlace her-photo.jpg in public/assets/%3C/text%3E%3C/svg%3E";

const PhotoReveal: React.FC<PhotoRevealProps> = ({ onContinue }) => {
  const [phase, setPhase] = useState<"teasing" | "revealing" | "shown">("teasing");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("revealing"), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "revealing") {
      const t = setTimeout(() => setPhase("shown"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center relative z-10">
      {/* Teasing text */}
      <div
        className="mb-10 space-y-3 transition-all duration-700"
        style={{
          opacity: phase === "teasing" ? 1 : 0.0,
          transform: phase === "teasing" ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        <p className="text-2xl md:text-3xl text-foreground font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Okay... enough teasing.
        </p>
        <p className="text-xl md:text-2xl gradient-text font-bold">
          Now for the actual surprise. ❤️
        </p>
      </div>

      {/* Photo */}
      <div
        className="float-bob transition-all duration-1000"
        style={{
          opacity: phase === "shown" ? 1 : 0,
          transform: phase === "shown" ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        }}
      >
        {/* Glow ring behind photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsla(340,80%,62%,0.35) 0%, hsla(270,60%,65%,0.2) 50%, transparent 75%)",
            filter: "blur(24px)",
            transform: "scale(1.2)",
          }}
        />
        <div
          className="photo-frame relative"
          style={{ width: "min(320px, 80vw)", height: "min(480px, 107vw)" }}
        >
          <img
            src={imgError ? PLACEHOLDER : siteConfig.mainPhoto}
            alt={`${siteConfig.personName} — the guest of honor`}
            onError={() => setImgError(true)}
            loading="eager"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
          {/* Pink overlay shimmer */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 60%, hsla(340,80%,10%,0.5) 100%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Continue CTA */}
      {phase === "shown" && (
        <button
          onClick={onContinue}
          className="btn-yes mt-10 px-8 py-3 text-white text-base font-semibold animate-[scene-in_0.5s_ease_forwards] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Keep going... 🥹
        </button>
      )}
    </div>
  );
};

export default PhotoReveal;
