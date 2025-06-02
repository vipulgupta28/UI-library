import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Hover: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const CIRCLE_SIZE = 200;
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getRelativeMousePosition = () => {
    if (!textRef.current) return { x: 0, y: 0 };

    const rect = textRef.current.getBoundingClientRect();
    return {
      x: mousePosition.x - rect.left,
      y: mousePosition.y - rect.top,
    };
  };

  const relativePos = getRelativeMousePosition();

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center px-4">
      <motion.div className="w-full overflow-hidden flex justify-center">
        <h1
          ref={textRef}
          className="text-[clamp(100px,20vw,400px)] leading-[clamp(100px,30vw,300px)] font-bold text-transparent cursor-default select-none max-w-full overflow-hidden"
          style={{
            WebkitTextStroke: "1px zinc",
            backgroundImage: isHovering
              ? `radial-gradient(circle ${CIRCLE_SIZE}px at ${relativePos.x}px ${relativePos.y}px, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`
              : "none",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            transition: "background-image 0.2s ease",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          GROK
        </h1>
      </motion.div>
    </div>
  );
};

export default Hover;
