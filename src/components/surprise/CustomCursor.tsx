import React, { useEffect, useRef, useState } from "react";

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on fine-pointer (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    let trailX = 0;
    let trailY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
    };

    const loop = () => {
      trailX += (dotX - trailX) * 0.22;
      trailY += (dotY - trailY) * 0.22;
      if (trailRef.current) {
        trailRef.current.style.left = `${trailX}px`;
        trailRef.current.style.top = `${trailY}px`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-trail" ref={trailRef} aria-hidden="true">
        ♡
      </div>
    </>
  );
};

export default CustomCursor;
