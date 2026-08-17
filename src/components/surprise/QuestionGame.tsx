import React, { useState, useRef, useCallback, useEffect } from "react";
import { questions } from "@/config/siteConfig";
import ParticleBurst from "./ParticleBurst";

interface QuestionGameProps {
  onComplete: () => void;
}

const TOTAL = questions.length;

const QuestionGame: React.FC<QuestionGameProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"question" | "response" | "exiting">("question");
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noText, setNoText] = useState("No 😏");
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstOrigin, setBurstOrigin] = useState({ x: 50, y: 50 });
  const [cardVisible, setCardVisible] = useState(true);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const q = questions[currentIndex];

  // Reset NO button when question changes
  useEffect(() => {
    setNoAttempts(0);
    setNoPos({ x: 0, y: 0 });
    setNoScale(1);
    setNoText("No 😏");
    setCardVisible(true);
    setPhase("question");
  }, [currentIndex]);

  const handleYes = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setBurstOrigin({ x: ox, y: oy });
    setBurstTrigger((t) => t + 1);
    setPhase("response");

    setTimeout(() => {
      setCardVisible(false);
      setTimeout(() => {
        if (currentIndex + 1 >= TOTAL) {
          onComplete();
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 400);
    }, 1000);
  }, [currentIndex, onComplete]);

  const handleNo = useCallback(() => {
    const attempts = noAttempts + 1;
    setNoAttempts(attempts);

    // After 5 attempts, give up gracefully
    if (attempts >= 5) {
      setNoText("Okay okay... you win 😂");
      setNoPos({ x: 0, y: 0 });
      setNoScale(0.85);
      // Allow progression after 1.2s
      setTimeout(() => {
        setPhase("response");
        setTimeout(() => {
          setCardVisible(false);
          setTimeout(() => {
            if (currentIndex + 1 >= TOTAL) {
              onComplete();
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }, 400);
        }, 1000);
      }, 1200);
      return;
    }

    // Update text
    const texts = q.noTexts;
    setNoText(texts[Math.min(attempts, texts.length - 1)]);

    // Shrink a bit at attempt 4
    if (attempts === 4) setNoScale(0.8);
    else if (attempts === 3) setNoScale(0.9);

    // Calculate safe random position within card bounds
    const card = cardRef.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const btn = noButtonRef.current;
    if (!btn) return;

    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    // Max displacement relative to card
    const maxX = Math.min(80, cardRect.width / 2 - btnW / 2 - 16);
    const maxY = Math.min(50, cardRect.height / 2 - btnH / 2 - 16);
    const multiplier = Math.min(attempts * 0.6, 2);

    const rx = (Math.random() * 2 - 1) * maxX * multiplier;
    const ry = (Math.random() * 2 - 1) * maxY * multiplier;

    // Clamp
    const clampedX = Math.max(-maxX, Math.min(maxX, rx));
    const clampedY = Math.max(-maxY, Math.min(maxY, ry));

    setNoPos({ x: clampedX, y: clampedY });
  }, [noAttempts, q, currentIndex, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
      <ParticleBurst trigger={burstTrigger} originX={burstOrigin.x} originY={burstOrigin.y} />

      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-8 select-none" aria-label={`Question ${currentIndex + 1} of ${TOTAL}`}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <span
            key={i}
            className="text-base transition-all duration-300"
            style={{
              color: i <= currentIndex ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
              fontSize: i === currentIndex ? "1.1rem" : "0.9rem",
              textShadow: i === currentIndex ? "0 0 8px hsl(var(--primary))" : "none",
            }}
          >
            {i < currentIndex ? "❤️" : i === currentIndex ? "♡" : "·"}
          </span>
        ))}
        <span className="ml-2 text-xs text-muted-foreground">{currentIndex + 1} / {TOTAL}</span>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className={`glass-card w-full max-w-[calc(100%-2rem)] md:max-w-lg relative transition-all duration-400 ${cardVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{
          padding: "2.5rem 2rem",
          minHeight: 260,
        }}
      >
        {/* Question / response text */}
        <div className="text-center mb-10">
          {phase === "question" ? (
            <p
              className="text-xl md:text-2xl font-semibold text-foreground leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {q.question}
            </p>
          ) : (
            <p className="text-xl md:text-2xl gradient-text font-bold animate-[scene-in_0.4s_ease_forwards]">
              {q.yesText}
            </p>
          )}
        </div>

        {/* Buttons (only when asking) */}
        {phase === "question" && (
          <div className="flex justify-center gap-4 relative" style={{ minHeight: 52 }}>
            {/* YES */}
            <button
              onClick={handleYes}
              className="btn-yes px-8 py-3 text-white text-base font-semibold z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Yes ❤️
            </button>

            {/* NO */}
            <button
              ref={noButtonRef}
              onClick={handleNo}
              className="btn-no px-6 py-3 text-sm z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
                position: "relative",
              }}
              aria-label="No (but you might want to reconsider)"
            >
              {noText}
            </button>
          </div>
        )}
      </div>

      {/* Hint text */}
      {phase === "question" && noAttempts > 0 && noAttempts < 5 && (
        <p className="mt-4 text-xs text-muted-foreground/60 animate-[fade-in_0.3s_ease]">
          The YES button is right there... 👀
        </p>
      )}
    </div>
  );
};

export default QuestionGame;
