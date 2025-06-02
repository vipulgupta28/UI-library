import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full flex justify-center fixed top-6 z-50"
    >
      <div className="flex items-center  justify-center gap-8 px-8 py-2 rounded-full bg-black/60 backdrop-blur-md shadow-xl border border-white/20">
        {["Home", "Components", "Docs", "Contact"].map((link) => {
          const to = link.toLowerCase();
          return (
            <motion.div
              key={link}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative p-3  group overflow-hidden rounded-xl"
            >
              <Link
                to={to}
                smooth={true}
                duration={600}
                offset={-80}
                className="relative hover:cursor-none p-3 z-10  text-white font-medium uppercase tracking-wide "
              >
                {link}
              </Link>

              {/* Glowing expanding background on hover */}
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Navbar;
