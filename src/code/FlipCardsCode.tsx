const FlipCardsCode = `

import { useState } from 'react';

const FlipCards = () => {
  const [flippedCards, setFlippedCards] = useState([false, false, false, false]);

  const handleCardFlip = (index:number) => {
    setFlippedCards(prev =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const resetAllCards = () => {
    setFlippedCards([false, false, false, false]);
  };

  const cardData = [
    { front: "Card 1", back: <img src='https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546197.jpg?uid=R135059889&ga=GA1.1.1918914287.1739298480&semt=ais_items_boosted&w=740'/> },
    { front: "Card 2", back: <img src='https://img.freepik.com/free-photo/autumn-night-illuminated-lantern-tree-yellow-leaf-generated-by-ai_188544-15642.jpg?uid=R135059889&ga=GA1.1.1918914287.1739298480&semt=ais_items_boosted&w=740'/>},
    { front: "Card 3", back: <img src='https://img.freepik.com/free-photo/anime-character-traveling_23-2151140116.jpg?uid=R135059889&ga=GA1.1.1918914287.1739298480&semt=ais_items_boosted&w=740'/> },
    { front: "Card 4", back: <img src='https://img.freepik.com/free-photo/dystopian-landscape-with-futuristic-city-people_23-2149369692.jpg?uid=R135059889&ga=GA1.1.1918914287.1739298480&semt=ais_items_boosted&w=740'/>}
  ];

  return (
    <div className="min-h-screen overflow-x-hidden  flex flex-col items-center justify-center p-6">
      <div className="flex flex-wrap gap-6 justify-center mb-10 w-full max-w-6xl">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative w-[250px] h-[350px] cursor-pointer perspective-1000"
            onClick={() => handleCardFlip(index)}
          >
            <div
              className={\`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d \${
                flippedCards[index] ? 'rotate-y-180' : ''
              }\`}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 w-full h-full shadow-xl rounded-2xl bg-zinc-800 flex flex-col items-center justify-center backface-hidden p-6"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{card.front}</h3>
                <p className="text-white text-sm">Click to reveal</p>
              </div>

              {/* Back face */}
              <div
  className="absolute inset-0 w-full h-full shadow-xl border border-zinc-600 rounded-2xl overflow-hidden backface-hidden"
  style={{
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)'
  }}
>
  <img
    src={card.back.props.src}
    alt="Card Back"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>

            </div>
          </div>
        ))}
      </div>

      <button
        onClick={resetAllCards}
        className="px-8 py-3 bg-white text-black font-semibold rounded-xl border-2 border-zinc-400 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
      >
        Reset All Cards
      </button>

      {/* Tailwind Custom Styles */}
      <style>{\`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      \`}</style>
    </div>
  );
};

export default FlipCards;

`

export default FlipCardsCode
