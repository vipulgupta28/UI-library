import React, { useState, useRef } from 'react';

interface BendingCardProps {
  title: string;
  description: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const BendingCard: React.FC<BendingCardProps> = ({ 
  title, 
  description, 
 
  children 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setPosition({ x, y });
    
    // Calculate rotation based on cursor position relative to center
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center p-8 perspective-1000">
      <div
        ref={cardRef}
        className={`w-80 h-96 rounded-2xl p-6 shadow-2xl text-white bg-zinc-800 transition-all duration-300 ease-out`}
        style={{
          transform: isHovering 
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.2)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Inner shadow effect based on cursor position */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.1) 0%, transparent 70%)`
              : 'transparent',
          }}
        />
        
        <div className="h-full flex flex-col" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/80 mb-6">{description}</p>
          
          <div className="mt-auto">
            {children || (
              <button 
                className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all border border-white/10"
                style={{ transform: 'translateZ(20px)' }}
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage
const BendingCardDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <BendingCard
        title="3D Interactive Card"
        description="Hover and move your cursor to see the bending effect. The card responds to your cursor position with realistic 3D perspective."
      />
    </div>
  );
};

export default BendingCardDemo;