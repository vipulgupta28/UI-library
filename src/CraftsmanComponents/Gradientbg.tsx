import React, { useState, useEffect } from 'react';

const GradientBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const colorSets = [
    ['from-indigo-500', 'to-purple-500'],
    ['from-purple-500', 'to-pink-500'],
    ['from-pink-500', 'to-rose-500'],
    ['from-rose-500', 'to-orange-500'],
    ['from-orange-500', 'to-amber-500'],
    ['from-amber-500', 'to-yellow-500'],
    ['from-yellow-500', 'to-lime-500'],
    ['from-lime-500', 'to-emerald-500'],
    ['from-emerald-500', 'to-teal-500'],
    ['from-teal-500', 'to-cyan-500'],
    ['from-cyan-500', 'to-sky-500'],
    ['from-sky-500', 'to-blue-500'],
    ['from-blue-500', 'to-indigo-500'],
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [prevSet, setPrevSet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSet(currentSet);
      setCurrentSet((prev) => (prev + 1) % colorSets.length);
      setIsTransitioning(true);

      // Stop transition after fade duration
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSet, colorSets.length]);

  const [fromColor, toColor] = colorSets[currentSet];
  const [prevFromColor, prevToColor] = colorSets[prevSet];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Previous Gradient */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${prevFromColor} ${prevToColor}
          transition-opacity duration-500 ease-in-out 
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Current Gradient */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${fromColor} ${toColor}
          transition-opacity duration-500 ease-in-out 
          ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
