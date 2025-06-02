const TypeWriterCode = `

import React, { useState, useEffect, useRef } from 'react';

const DotTypewriter: React.FC = () => {
  // ✅ Hardcoded sentences and colors
  const sentences = [
    'Aditi hi sheetal hai',
    'Sheetal Nisha hai',
    'Nisha Munni hai na',
  ];
  const colors = ['#111827', '#1f2937', '#0f172a'];

  const typingSpeed = 60;
  const deletingSpeed = 60;
  const pauseBetween = 1500;
  const dotColor = 'white';

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentSentence = sentences[currentIndex];

    const handleTyping = () => {
      const updatedText = isDeleting
        ? currentSentence.substring(0, displayText.length - 1)
        : currentSentence.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && updatedText === currentSentence) {
        timeoutDuration = pauseBetween;
        timeoutRef.current = setTimeout(() => setIsDeleting(true), timeoutDuration);
        return;
      }

      if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
        setCurrentColorIndex((prev) => (prev + 1) % colors.length);
        return;
      }

      timeoutRef.current = setTimeout(handleTyping, timeoutDuration);
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting]);

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full transition-colors duration-1000"
      style={{ backgroundColor: colors[currentColorIndex] }}
    >
      <div className="text-center p-8 rounded-xl  backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-white mb-4">
          {displayText}
          <span
            className="ml-2 inline-block h-8 w-8 rounded-full animate-pulse"
            style={{ backgroundColor: dotColor }}
          />
        </h1>
      </div>
    </div>
  );
};

export default DotTypewriter;

`

export default TypeWriterCode