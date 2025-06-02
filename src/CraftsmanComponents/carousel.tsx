import React, { useState, useRef} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  id: number;
  title: string;
  image: string;
}

const CardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cards: Card[] = [
    {
      id: 1,
      title: "Mountain Retreat",
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Ocean View Villa",
      image: "https://images.unsplash.com/photo-1609748573239-28fe24d71448?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Urban Loft",
      image: "https://plus.unsplash.com/premium_photo-1681233750830-dfbb25c7abc0?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      title: "Forest Cabin",
      image: "https://images.unsplash.com/photo-1696517170961-661e9dca962e?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 5,
      title: "Desert Oasis",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=500&fit=crop"
    }
  ];

  const cardsPerView = 3;
  const maxIndex = Math.max(0, cards.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const x = e.clientX - left;

    const threshold = 80; // area near edges in px

    // Clear previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Left zone
    if (x < threshold) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }, 300);
    }
    // Right zone
    else if (x > width - threshold) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Cards Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="overflow-hidden mx-12"
        >
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {cards.map(card => (
              <div
                key={card.id}
                className="flex-none w-100 h-[40rem] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
