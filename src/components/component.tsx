import { useState } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "../ui/code-block";
import SpaceParticles from "../CraftsmanComponents/Stars";
import Accordion from "../CraftsmanComponents/Accordion";
import Keyboard from "../CraftsmanComponents/Keyboard";
import Hover from "../CraftsmanComponents/TextHover";
import Navbar from "../CraftsmanComponents/Navbar";
import ScrollRollAnimation from "../CraftsmanComponents/scrollRoll";
import VolumeSlider from "../CraftsmanComponents/VolumeSlider";
import DotTypewriter from "../CraftsmanComponents/TypeWriter";
import FlipCards from "../CraftsmanComponents/FlipCards";
import FadingGridLines from "../CraftsmanComponents/grid";
import Mask from "../CraftsmanComponents/Mask";
import BendingCardDemo from "../CraftsmanComponents/bend";
import CardStack from "../CraftsmanComponents/CradStack";
import CardCarousel from "../CraftsmanComponents/carousel";
import FileUpload3D from "../CraftsmanComponents/FileUpload";
import CustomCursorCards from "../CraftsmanComponents/Tip";
import GradientBackground from "../CraftsmanComponents/Gradientbg";

import Testimonials from "../CraftsmanComponents/ScrollingImages";

import scrollingcode from "../code/Scrollingcode";


import AccordionCode from "../code/Accordion";
import KeyboardCode from "../code/KeyboardCode";
import SpaceParticlesCode from "../code/StarsCode";
import HoverCode from "../code/HoverCode";
import NavbarCode from "../code/NavbarCode";
import Carousel from "../code/CarouselCode";





import ScrollRollCode from "../code/ScrollRollCode";
import VolCode from "../code/VolCOde";
import GradientbgCode from "../code/GradientbgCode";
import TypeWriterCode from "../code/TypeWriterCode";
import FlipCardsCode from "../code/FlipCardsCode";
import FileUploadCode from "../code/FileUploadCode";
import GridbgCode from "../code/GridbgCode";
import MaskCode from "../code/MaskCode";
import d from "../code/3d";
import TipCode from "../code/TipCode";
import CardStackCode from "../code/CardStackCode";
import AuroraParticles from "../CraftsmanComponents/ShimmerRing";
import ShimmerCode from "../code/ShimmerCode";

// Example previews
//  for components
const components = {
  Accordion: (
   <Accordion/>
   
  ),
  ShimmerRing:(
    <AuroraParticles/>
  ),
  ScrollingImages:(
    <Testimonials/>
  ),
  Keyboard: (
    <Keyboard/>
  ),
  Stars:(
    <SpaceParticles/>
  ),
 
  HoverEffect: (
    <Hover/>
  ),
  Navbar: (
    <Navbar/>
  ),

  CardCarousel:(
    <CardCarousel/>
  ),
  ScrollRoll: (
    <ScrollRollAnimation/>
  ),
  VolumeSlider: (
    <VolumeSlider/>
  ),
  GradientBackground:(
    <GradientBackground/>

  ),
  FileUpload:(
    <FileUpload3D/>
  ),
  Typewriter:(
    <DotTypewriter/>

  ),
  FlipCards:(
    <FlipCards/>
  ),
  GridBackground:(
    <FadingGridLines/>
  ),
  Mask:(
    <Mask/>
  ),
  Three:(
    <BendingCardDemo/>

  ),
  Tip:(
    <CustomCursorCards/>
  ),
 
  CardStack:(
    <CardStack/>
  )

  
} as const


const componentCodes = {
  Accordion: AccordionCode,

  ShimmerRing:ShimmerCode,

  Keyboard: KeyboardCode,

  ScrollingImages:scrollingcode,

  Stars: SpaceParticlesCode,

  HoverEffect: HoverCode,

  Navbar: NavbarCode,

  CardCarousel: Carousel,

  ScrollRoll: ScrollRollCode,

  VolumeSlider: VolCode,

  GradientBackground: GradientbgCode,

  FileUpload: FileUploadCode,

  Typewriter: TypeWriterCode,

  FlipCards: FlipCardsCode,

  GridBackground: GridbgCode,

  Mask: MaskCode,

  Three: d,

  Tip: TipCode,

  CardStack: CardStackCode,
} as const





const ComponentsPage = () => {
  type ComponentKey = keyof typeof components;

const [selected, setSelected] = useState<ComponentKey>("Accordion");

  return (
    <div id="components" className="flex min-h-screen bg-black text-white border-b border-t border-zinc-800">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-6">Components</h2>
        <ul className="space-y-2">
         {(Object.keys(components) as ComponentKey[]).map((name) => (
  <li key={name}>
    <button
      onClick={() => setSelected(name)}
      className={`w-full text-left px-4 py-2 rounded-lg transition ${
        selected === name
          ? "bg-white/10 text-white font-semibold"
          : "hover:bg-white/5 text-white/70"
      }`}
    >
      {name}
    </button>
  </li>
))}

        </ul>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-10">
       
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center min-h-[200px]"
        >
          {components[selected]}
        </motion.div>

          <div>
    <h3 className="text-xl font-semibold mb-2">Code</h3>
    <div className="w-[75rem] rounded-lg bg-zinc-900 p-4 font-mono text-sm">
 <CodeBlock
  code={componentCodes[selected]}
  language="tsx" // or "jsx", "javascript", etc. depending on your code type
  filename={`${selected}.tsx`} // optional, can also just be `selected`
/>

</div>

  </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
