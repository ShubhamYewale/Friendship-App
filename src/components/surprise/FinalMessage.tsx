import React, { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const FinalMessage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lines = siteConfig.finalMessage.split("\n");

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-16 md:py-24 max-w-xl mx-auto text-center"
    >
      <div
        className="transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
        }}
      >
        {/* Decorative top */}
        <div className="flex justify-center mb-8">
          <div
            className="w-12 h-1 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
        </div>

        <div
          className="glass-card p-8 md:p-10 text-left space-y-3"
          style={{ lineHeight: 1.85 }}
        >
          {lines.map((line, i) =>
            line.trim() === "" ? (
              <div key={i} className="h-3" />
            ) : (
              <p
                key={i}
                className="text-base md:text-lg text-foreground/90"
                style={{
                  fontStyle: line.startsWith("Thank") ? "italic" : "normal",
                }}
              >
                {line}
              </p>
            )
          )}
        </div>

        {/* Decorative bottom */}
        <div className="flex justify-center mt-8">
          <div
            className="w-12 h-1 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
