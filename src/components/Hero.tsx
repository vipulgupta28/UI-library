import { Cover } from "../ui/cover";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <div id="home"
     className="relative min-h-screen flex flex-col  justify-center bg-black overflow-hidden">
      {/* Grid Background with Fading Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, white 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, white 40%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400">
          Build amazing websites <br /> at <Cover>warp speed</Cover>
        </h1>
        <Link 
        to ="components"
        smooth={true}
                duration={600}
                offset={-80}
        >
        <button className=" hover:cursor-pointer mt-6 px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
          Browse Components
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
