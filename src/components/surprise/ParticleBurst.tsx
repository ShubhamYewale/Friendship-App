import React, { useEffect, useState } from "react";

interface Burst {
  id: number;
  x: number;
  y: number;
}

interface ParticleBurstProps {
  trigger: number; // increment to fire a burst
  originX?: number;
  originY?: number;
}

const COLORS = [
  "hsl(340,80%,62%)",
  "hsl(270,60%,65%)",
  "hsl(310,70%,70%)",
  "hsl(350,75%,75%)",
  "#fff",
];

const ParticleBurst: React.FC<ParticleBurstProps> = ({ trigger, originX = 50, originY = 50 }) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const id = Date.now();
    setBursts((b) => [...b, { id, x: originX, y: originY }]);
    const t = setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
    return () => clearTimeout(t);
  }, [trigger, originX, originY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {bursts.map((burst) =>
        Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * 360;
          const dist = 60 + Math.random() * 60;
          const tx = Math.cos((angle * Math.PI) / 180) * dist;
          const ty = Math.sin((angle * Math.PI) / 180) * dist;
          const color = COLORS[i % COLORS.length];
          return (
            <div
              key={`${burst.id}-${i}`}
              style={
                {
                  position: "absolute",
                  left: `${burst.x}%`,
                  top: `${burst.y}%`,
                  width: 7 + Math.random() * 5,
                  height: 7 + Math.random() * 5,
                  borderRadius: "50%",
                  background: color,
                  "--tx": `${tx}px`,
                  "--ty": `${ty}px`,
                  animation: "burst 0.8s cubic-bezier(0.4,0,0.2,1) forwards",
                  willChange: "transform, opacity",
                } as React.CSSProperties
              }
            />
          );
        })
      )}
    </div>
  );
};

export default ParticleBurst;
