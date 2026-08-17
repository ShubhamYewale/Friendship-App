import React, { useRef } from "react";

const SYMBOLS = ["❤️", "♡", "✨", "✦", "•", "♡", "❤️"];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: SYMBOLS[i % SYMBOLS.length],
    x: Math.random() * 100,
    size: 10 + Math.random() * 16,
    opacity: 0.3 + Math.random() * 0.5,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 6,
  }));
}

interface FloatingHeartsProps {
  count?: number;
  active?: boolean;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 18, active = true }) => {
  const particles = useRef(makeParticles(count));

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {particles.current.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-5%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration}s ease-in ${p.delay}s infinite`,
            willChange: "transform, opacity",
            userSelect: "none",
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
