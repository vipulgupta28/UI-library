import PackageManagers from "./PackageManagerCode";
import { CodeBlock } from "../ui/code-block";

const code1 = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
`;

const code2 = `
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const SpaceParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const particles: Particle[] = [];
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Clear particles and re-initialize when canvas is resized
      particles.length = 0;
      initParticles();
    };
    
    const initParticles = () => {
      const particleCount = Math.floor(canvas.width * canvas.height * 2 / 12000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset particles if they go offscreen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255, 255, 255, \${particle.opacity})\`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full min-h-screen pointer-events-none"
    />
  );
};

export default SpaceParticles
`;


const code3 = `
import SpaceParticles from "../ui/SpaceParticles";

const App = () =>{
    return(
    <>
    <SpaceParticles/>
    </>
    )
}

export default App;
`

const viteCommands = {
  npm: "npm create vite@latest",
  yarn: "yarn create vite",
};

const tailwindCommands = {
  npm: "npm install tailwindcss @tailwindcss/vite",
  yarn: "yarn install tailwindcss @tailwindcss/vite",
};

const replaceCommand = {
  npm:"import @tailwindcss"
}

const initCommand = {
  npm:"npm install framer-motion react-icons/fa clsx lucide-react  ",
  yarn:"yarn install craftsman"
}

const Docs = () => {
  return (
    <div id="docs" className="min-h-screen bg-black text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-4xl space-y-12">
        
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4">Vite</h1>
          <p className="text-lg text-gray-300">Install and configure craftsman for Vite</p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Create Project</h2>
          <p className="text-gray-300 mb-4">
            Start by creating a new React project using Vite. Select the React + TypeScript template:
          </p>
          <PackageManagers commands={viteCommands} />
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Add Tailwind CSS</h2>
          <PackageManagers commands={tailwindCommands} />
          <p className="text-gray-300 mt-6 mb-2">
            Replace everything in <code>src/index.css</code> and <code>App.css</code> with the following:
          </p>
          <PackageManagers commands={replaceCommand} />
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Update vite.config.ts</h2>
          <p className="text-gray-300 mb-4">
            Add the following code to <code>vite.config.ts</code> so your app can resolve paths without error:
          </p>
          <CodeBlock
            language="jsx"
            filename="vite.config.ts"
            highlightLines={[3, 9]}
            code={code1}
          />
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Run the CLI</h2>
          <p className="text-gray-300 mb-4">
            Run the <code>necessary packages</code> command to set up your project:
          </p>
          <div className="space-y-4">
            <div>
            
              <PackageManagers commands={initCommand} />
            </div>
           
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Add Components</h2>
          <p className="text-gray-300 mb-4">In your src folder create a ui/ folder.</p>
    
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Usage Example</h2>
          <CodeBlock
            language="jsx"
            filename="ui/SpaceParticles.tsx"
            highlightLines={[9, 13, 14, 18]}
            code={code2}
          />
        </section>

         <section>
          <h2 className="text-3xl font-semibold mb-4">Then in App.tsx</h2>

        <CodeBlock
            language="jsx"
            filename="ui/SpaceParticles.tsx"
            highlightLines={[9, 13, 14, 18]}
            code={code3}
          />
    
        </section>
        
      </div>
    </div>
  );
};

export default Docs;
