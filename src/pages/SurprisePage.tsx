import React, { useState, useCallback } from "react";
import BackgroundBlobs from "@/components/surprise/BackgroundBlobs";
import FloatingHearts from "@/components/surprise/FloatingHearts";
import CustomCursor from "@/components/surprise/CustomCursor";
import MusicPlayer from "@/components/surprise/MusicPlayer";
import Hero from "@/components/surprise/Hero";
import QuestionGame from "@/components/surprise/QuestionGame";
import PhotoReveal from "@/components/surprise/PhotoReveal";
import Gallery from "@/components/surprise/Gallery";
import MemoryTimeline from "@/components/surprise/MemoryTimeline";
import FinalMessage from "@/components/surprise/FinalMessage";
import FinalSurprise from "@/components/surprise/FinalSurprise";
import SurpriseButton from "@/components/surprise/SurpriseButton";

type Scene =
  | "hero"
  | "questions"
  | "photo-reveal"
  | "memories"
  | "final";

const SurprisePage: React.FC = () => {
  const [scene, setScene] = useState<Scene>("hero");
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((next: Scene) => {
    setTransitioning(true);
    setTimeout(() => {
      setScene(next);
      setTransitioning(false);
    }, 450);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* Persistent layers */}
      <BackgroundBlobs />
      <FloatingHearts count={18} active />
      <CustomCursor />
      <MusicPlayer />

      {/* Scene wrapper */}
      <div
        className={`w-full min-h-screen transition-all duration-500 ${transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
      >
        {scene === "hero" && (
          <Hero onStart={() => goTo("questions")} />
        )}

        {scene === "questions" && (
          <QuestionGame onComplete={() => goTo("photo-reveal")} />
        )}

        {scene === "photo-reveal" && (
          <PhotoReveal onContinue={() => goTo("memories")} />
        )}

        {scene === "memories" && (
          <div className="relative z-10">
            {/* Gallery */}
            <Gallery />

            {/* Timeline */}
            <MemoryTimeline />

            {/* Final message */}
            <FinalMessage />

            {/* Continue to final */}
            <div className="flex justify-center py-10 relative z-10">
              <button
                onClick={() => goTo("final")}
                className="btn-yes px-8 py-4 text-white text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                One more thing... ❤️
              </button>
            </div>
          </div>
        )}

        {scene === "final" && (
          <div>
            <FinalSurprise />
            <SurpriseButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurprisePage;
