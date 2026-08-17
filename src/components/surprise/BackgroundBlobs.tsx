import React from "react";

const BackgroundBlobs: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* top-left purple blob */}
    <div
      style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "55vw",
        height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, hsla(270,50%,20%,0.55) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "float-bob 10s ease-in-out infinite",
        willChange: "transform",
      }}
    />
    {/* bottom-right pink blob */}
    <div
      style={{
        position: "absolute",
        bottom: "-10%",
        right: "-10%",
        width: "50vw",
        height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, hsla(340,70%,22%,0.5) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "float-bob 13s ease-in-out 2s infinite",
        willChange: "transform",
      }}
    />
    {/* center faint accent */}
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "35%",
        width: "30vw",
        height: "30vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, hsla(310,50%,18%,0.35) 0%, transparent 70%)",
        filter: "blur(50px)",
        animation: "float-bob 16s ease-in-out 4s infinite",
        willChange: "transform",
      }}
    />
  </div>
);

export default BackgroundBlobs;
