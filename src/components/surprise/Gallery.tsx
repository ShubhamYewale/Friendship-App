import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const PLACEHOLDER_BASE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%231C1C1C'/%3E%3Ctext x='50%25' y='45%25' font-size='36' text-anchor='middle' dominant-baseline='middle'%3E🌸%3C/text%3E%3Ctext x='50%25' y='62%25' font-size='11' fill='%23666' text-anchor='middle' font-family='system-ui'%3Ememory photo%3C/text%3E%3C/svg%3E";

const Gallery: React.FC = () => {
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  return (
    <section className="relative z-10 px-6 py-16 md:py-24 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Somehow, you make ordinary moments better.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          A few memories worth keeping. 🎞️
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {siteConfig.gallery.map((item, i) => (
          <div
            key={i}
            className="memory-card group"
            style={{
              transform: `rotate(${item.rotation ?? 0}deg)`,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={errors[i] ? PLACEHOLDER_BASE : item.image}
                alt={item.caption}
                loading="lazy"
                onError={() => setErrors((e) => ({ ...e, [i]: true }))}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Caption */}
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-foreground/80">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
