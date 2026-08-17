import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%231C1C1C'/%3E%3Ctext x='50%25' y='44%25' font-size='48' text-anchor='middle' dominant-baseline='middle'%3E🌸%3C/text%3E%3C/svg%3E";

const FinalSurprise: React.FC = () => {
  const [step, setStep] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Stagger the text reveals
    const timers = [800, 1800, 2800, 3800].map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center overflow-hidden">
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsla(270,40%,8%,0.92) 0%, hsla(0,0%,5%,0.97) 100%)",
          zIndex: -1,
        }}
      />

      {/* Photo */}
      <div
        className="float-bob transition-all duration-1000 mb-10"
        style={{
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "scale(1)" : "scale(0.85)",
        }}
      >
        <div
          className="relative"
          style={{ width: "min(260px, 70vw)", height: "min(390px, 104vw)" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: "2rem",
              background:
                "radial-gradient(ellipse at center, hsla(340,80%,62%,0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          />
          <div className="photo-frame w-full h-full">
            <img
              src={imgError ? PLACEHOLDER : siteConfig.mainPhoto}
              alt={siteConfig.personName}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </div>

      {/* Staggered text */}
      <div className="space-y-4 max-w-sm">
        {[
          { text: siteConfig.finalTitle, className: "text-xl md:text-2xl gradient-text font-bold" },
          { text: siteConfig.finalLines[0], className: "text-lg md:text-xl text-foreground/90 italic" },
          { text: siteConfig.finalLines[1], className: "text-lg md:text-xl text-foreground/80" },
          ...(siteConfig.occasionText
            ? [{ text: siteConfig.occasionText, className: "text-2xl md:text-3xl gradient-text font-bold mt-4" }]
            : []),
        ].map((item, i) => (
          <p
            key={i}
            className={`transition-all duration-700 ${item.className}`}
            style={{
              opacity: step >= i + 1 ? 1 : 0,
              transform: step >= i + 1 ? "translateY(0)" : "translateY(16px)",
              fontFamily: i === 3 ? "'Playfair Display', serif" : undefined,
            }}
          >
            {item.text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default FinalSurprise;
