import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    
    margin: "-100px 0px -100px 0px"
  });

  const text = "Craftsman";
  const letters = text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char, 
    index,
    isSpace: char === " "
  }));

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };


  const letterVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: 90,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const contentVariants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };


  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 2
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      id="contact"
      className="min-h-screen w-full bg-black mt-6 rounded-2xl flex items-center gap-10 justify-center px-6 relative overflow-hidden"
    >

      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
        transition={{ delay: 2.5, duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="flex flex-col items-center text-center space-y-6  relative z-10">
        <motion.h1 
          className="text-white font-bold text-[40rem] sm:text-[100px] md:text-[150px] lg:text-[250px] leading-none"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: "1000px" }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ 
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d"
              }}
              whileHover={{
                y: -10,
                rotateZ: letter.isSpace ? 0 : Math.random() * 10 - 5,
                scale: letter.isSpace ? 1 : 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {letter.char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="text-white text-lg sm:text-xl"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Star the Github repo if you like the components
        </motion.p>

        <motion.div 
          className="text-white flex gap-30 text-lg sm:text-xl space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p variants={itemVariants}>
            <strong>Email:</strong> <br />
            <motion.span
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#ffffff",
                textShadow: "0 0 8px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.2 }}
            >
              vilulgupta2802@gmail.com
            </motion.span>
          </motion.p>

            <motion.p variants={itemVariants}>
            <strong>Github repo</strong> <br />
            <motion.span
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#ffffff",
                textShadow: "0 0 8px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.2 }}
            >
              www.github.com/vipulgupta28/UI
            </motion.span>
          </motion.p>
          
          <motion.p variants={itemVariants}>
            <strong>Linkedin:</strong> <br />
            <motion.span
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#ffffff",
                textShadow: "0 0 8px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.2 }}
            >
              www.linkedin.com/in/vipul-li
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute -top-10 -left-10 w-6 h-6 bg-black/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-8 h-8 bg-black/15 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 3.2, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-4 h-4 bg-black/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 3.4, duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default Footer;