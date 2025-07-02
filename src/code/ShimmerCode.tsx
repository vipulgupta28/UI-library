const ShimmerCode = `import React, { useRef, useEffect } from "react";

interface Particle {
  angle: number;
  baseRadius: number;
  oscillationSpeed: number;
  oscillationAmplitude: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

const AuroraParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const particles = useRef<Particle[]>([]);
  const PARTICLE_COUNT = 200;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const baseRadius = 120 + Math.random() * 100;
      const oscillationSpeed = 0.002 + Math.random() * 0.003;
      const oscillationAmplitude = 15 + Math.random() * 20;
      const dynamicRadius = baseRadius + Math.sin(angle * 5) * oscillationAmplitude;
      const x = centerX + Math.cos(angle) * dynamicRadius;
      const y = centerY + Math.sin(angle) * dynamicRadius;

      particles.current.push({
        angle,
        baseRadius,
        oscillationSpeed,
        oscillationAmplitude,
        vx: 0,
        vy: 0,
        x,
        y,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.shadowBlur = 20;
      ctx.lineWidth = 1.5;
      time += 1;

      // Draw particle band lines first
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40) {
            const alpha = 1 - dist / 40;
            const hue = 180 + Math.sin(time * 0.01 + p1.angle) * 60;
            ctx.strokeStyle = \`hsla(\${hue}, 100%, 70%, \${alpha})\`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let p of particles.current) {
        const dynamicRadius =
          p.baseRadius + Math.sin(time * p.oscillationSpeed + p.angle * 5) * p.oscillationAmplitude;
        const targetX = centerX + Math.cos(p.angle) * dynamicRadius;
        const targetY = centerY + Math.sin(p.angle) * dynamicRadius;

        // Mouse attraction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isHovering.current && dist < 150) {
          const force = (150 - dist) / 150;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 2;
          p.vy += Math.sin(angle) * force * 2;
        } else {
          p.vx += (targetX - p.x) * 0.02;
          p.vy += (targetY - p.y) * 0.02;
        }

        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        const hue = 180 + Math.sin(time * 0.02 + p.angle * 6) * 80;
        ctx.fillStyle = \`hsl(\${hue}, 100%, 85%)\`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-10 left-10 text-white text-2xl font-bold z-10 pointer-events-none">
      </div>
    </div>
  );
};

export default AuroraParticles;
`;

export default ShimmerCode;
