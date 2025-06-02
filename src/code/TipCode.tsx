const TipCode = `

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Eye } from 'lucide-react';

interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  cursorMessage: string;
  cursorType: 'play' | 'love' | 'shop' | 'view' | 'explore';
}

interface CursorState {
  x: number;
  y: number;
  isVisible: boolean;
  message: string;
  type: string;
}

const CustomCursorCards: React.FC = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    message: '',
    type: ''
  });

  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  const updateCursorSmooth = useCallback(() => {
    setCursor(prev => ({
      ...prev,
      x: cursorRef.current.x,
      y: cursorRef.current.y
    }));
    animationFrame.current = null;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };
    if (!animationFrame.current) {
      animationFrame.current = requestAnimationFrame(updateCursorSmooth);
    }
  }, [updateCursorSmooth]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleMouseMove]);

  const handleCardHover = (card: CardData) => {
    setCursor(prev => ({
      ...prev,
      isVisible: true,
      message: card.cursorMessage,
      type: card.cursorType
    }));
    document.body.style.cursor = 'none';
  };

  const handleCardLeave = () => {
    setCursor(prev => ({
      ...prev,
      isVisible: false,
      message: '',
      type: ''
    }));
    document.body.style.cursor = 'auto';
  };

  const getCursorIcon = (type: string) => {
    switch (type) {
      case 'play': return <Play className="w-4 h-4 fill-current" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const cards: CardData[] = [
    {
      id: 1,
      title: "Cinematic Adventure",
      description: "Immerse yourself in stunning visuals and captivating storytelling that will transport you to another world.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmlsbXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Entertainment",
      cursorMessage: "Click to Play",
      cursorType: 'play'
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      <div className="w-full max-w-md">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            onMouseEnter={() => handleCardHover(card)}
            onMouseLeave={handleCardLeave}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  {card.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {card.description}
              </p>
              <button className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20">
                {card.cursorMessage}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Cursor */}
      {cursor.isVisible && (
        <>
          <div
            className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
            style={{
              left: cursor.x + 15,
              top: cursor.y - 15,
              transform: 'translate(0, -100%)'
            }}
          >
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium shadow-2xl">
              {getCursorIcon(cursor.type)}
              <span>{cursor.message}</span>
            </div>
            <div className="w-0 h-0 mx-4 mt-1 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
          </div>

          <div
            className="fixed pointer-events-none z-40 w-3 h-3 bg-white rounded-full"
            style={{
              left: cursor.x - 6,
              top: cursor.y - 6
            }}
          />
        </>
      )}
    </div>
  );
};

export default CustomCursorCards;

`

export default TipCode;