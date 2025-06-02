const CardStackCode = `
import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
}

const CardStack: React.FC = () => {
  const cards: Card[] = [
    {
      id: 1,
      title: "Card One",
      content: "This is the first card with some interesting content to display.",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Card Two", 
      content: "Second card showcasing different content and styling options.",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Card Three",
      content: "Third card demonstrating the continuous rotation effect.",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Card Four",
      content: "Fourth card completing our stack with vibrant colors.",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 5,
      title: "Card Five",
      content: "Fifth card adding more variety to the continuous animation.",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 2000); // Change card every 2 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + cards.length) % cards.length;
    
    switch (position) {
      case 0: // Front card
        return {
          transform: 'translateZ(0px) translateY(0px) scale(1)',
          zIndex: 50,
          opacity: 1
        };
      case 1: // Second card
        return {
          transform: 'translateZ(-20px) translateY(8px) scale(0.95)',
          zIndex: 40,
          opacity: 0.8
        };
      case 2: // Third card
        return {
          transform: 'translateZ(-40px) translateY(16px) scale(0.9)',
          zIndex: 30,
          opacity: 0.6
        };
      case 3: // Fourth card
        return {
          transform: 'translateZ(-60px) translateY(24px) scale(0.85)',
          zIndex: 20,
          opacity: 0.4
        };
      default: // Hidden cards
        return {
          transform: 'translateZ(-80px) translateY(32px) scale(0.8)',
          zIndex: 10,
          opacity: 0.2
        };
    }
  };

  return (
    <div className="flex items-center justify-center  p-8">
      <div className="relative w-80 h-96 perspective-1000">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={\`absolute inset-0 w-full h-full rounded-2xl shadow-2xl transition-all duration-700 ease-in-out cursor-pointer hover:scale-105\`}
            style={getCardStyle(index)}
          >
            <div className={\`w-full h-full rounded-2xl bg-gradient-to-br \${card.color} p-6 flex flex-col justify-between text-white\`}>
              <div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-lg opacity-90 leading-relaxed">{card.content}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
                </div>
                <div className="text-sm opacity-75">
                  {index + 1} / {cards.length}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Progress indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={\`w-2 h-2 rounded-full transition-all duration-300 \${ 
                index === currentIndex ? 'bg-blue-500 w-8' : 'bg-gray-300' 
              }\`}
            />
          ))}
        </div>
      </div>
      
   
    </div>
  );
};

export default CardStack;
`

export default CardStackCode
