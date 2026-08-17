import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Animated avatar / illustration */}
      <div className="float-bob mb-8 relative">
        <div
          className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-5xl"
          style={{
            background: "var(--gradient-card)",
            border: "2px solid hsla(340,80%,62%,0.4)",
            boxShadow: "0 0 40px hsla(340,80%,62%,0.3), 0 0 80px hsla(270,60%,65%,0.2)",
          }}
        >
          ✨
        </div>
        {/* Orbiting sparkles */}
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "hsl(var(--primary))",
              transform: `rotate(${deg}deg) translateX(52px) translateY(-50%)`,
              animation: `sparkle ${1.5 + deg / 200}s ease-in-out ${deg / 360}s infinite`,
              boxShadow: "0 0 6px hsl(var(--primary))",
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div className="space-y-3 max-w-sm md:max-w-md">
        <h1
          className="text-4xl md:text-5xl font-bold gradient-text"
          style={{ lineHeight: 1.2 }}
        >
          Hey {siteConfig.nickname || "You"}... 👀
        </h1>

        <p
          className="text-lg md:text-xl text-foreground/80 font-medium"
          style={{ animationDelay: "0.2s" }}
        >
          I made something for you.
        </p>

        <p
          className="text-base text-muted-foreground italic"
          style={{ animationDelay: "0.4s" }}
        >
          But first... you have to answer one question. 😏
        </p>
      </div>

      {/* CTA button */}
      <button
        onClick={onStart}
        className="btn-yes mt-10 px-8 py-4 text-base md:text-lg text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ animationDelay: "0.6s" }}
      >
        Okay, Show Me 👀
      </button>

      {/* Decorative line */}
      <div className="mt-12 flex items-center gap-2 text-muted-foreground/40 text-xs select-none">
        <div className="w-8 h-px bg-border" />
        <span>made with ❤️</span>
        <div className="w-8 h-px bg-border" />
      </div>
    </div>
  );
};

export default Hero;
