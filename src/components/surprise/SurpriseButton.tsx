import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const SurpriseButton: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  const lines = siteConfig.secretMessage.split("\n");

  return (
    <section className="relative z-10 px-6 py-10 md:py-16 flex flex-col items-center text-center">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            border: "1px solid hsla(340,80%,62%,0.3)",
            color: "hsl(var(--muted-foreground))",
            background: "hsla(0,0%,11%,0.6)",
          }}
        >
          <span className="group-hover:text-primary transition-colors">One last thing... 👀</span>
        </button>
      ) : (
        <div className="glass-card p-8 md:p-10 max-w-sm animate-[scene-in_0.5s_ease_forwards] space-y-3">
          {lines.map((line, i) =>
            line.trim() === "" ? (
              <div key={i} className="h-2" />
            ) : (
              <p key={i} className="text-base text-foreground/90">
                {line}
              </p>
            )
          )}
          <div className="pt-4 border-t border-border">
            <p className="text-lg font-semibold gradient-text">{siteConfig.secretClosing}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SurpriseButton;
