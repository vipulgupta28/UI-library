import React from "react";

const FadingGridLines: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Grid with fading edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, white 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, white 40%, transparent 100%)",
        }}
      />

      {/* Content goes here */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-3xl font-bold">
        Grid with Fading Edges
      </div>
    </div>
  );
};

export default FadingGridLines;
