import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const MemoryTimeline: React.FC = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(siteConfig.timeline.map(() => false));

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="relative z-10 px-6 py-16 md:py-24 max-w-2xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A little story. 🎞️
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)" }}
        />

        <div className="space-y-8 pl-16">
          {siteConfig.timeline.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="relative transition-all duration-700"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateX(0)" : "translateX(24px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Dot */}
              <div
                aria-hidden="true"
                className="absolute -left-10 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 0 10px hsla(340,80%,62%,0.5)",
                }}
              />

              {/* Content */}
              <div className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-base md:text-lg font-semibold text-foreground">{item.label}</p>
                    {item.sub && (
                      <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryTimeline;
