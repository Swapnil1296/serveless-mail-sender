import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

const Introduction = ({ darkMode }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 rounded-sm mb-4">
            <span className="text-xs font-black tracking-[0.2em] text-cyan-400">
              CONNECTING_TO_PORTFOLIO.SYS
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase relative group">
            <span className="relative z-10 text-white">SWAPNIL</span>
            <span className="absolute top-0 left-0 -ml-1 text-cyan-500 opacity-70 animate-glitch-1 hidden group-hover:block">SWAPNIL</span>
            <span className="absolute top-0 left-0 ml-1 text-purple-500 opacity-70 animate-glitch-2 hidden group-hover:block">SWAPNIL</span>
            <br />
            <TypeAnimation
              sequence={[
                "DEVELOPER",
                2000,
                "DESIGNER",
                2000,
                "CREATOR",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-cyan-400 neon-text-cyan"
            />
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-cyan-100/60 tracking-wider flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-500/50"></span>
            PASSIONATE_FULL_STACK_DEV
          </h2>

          <p className="text-sm md:text-base mb-12 max-w-lg leading-relaxed text-cyan-50/80 font-medium">
            &gt; I create stunning digital experiences that make an impact.
            With expertise in front-end and back-end technologies, I build scalable
            and efficient applications that solve real-world problems. _
          </p>

          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-cyan-500/10 border-2 border-cyan-400 text-cyan-400 font-black tracking-widest text-xs rounded-sm transition-all uppercase"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              INITIALIZE_CONTACT
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(139,92,246,0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
              download
              className="px-8 py-4 bg-purple-500/10 border-2 border-purple-400 text-purple-400 font-black tracking-widest text-xs rounded-sm transition-all uppercase"
            >
              SYNC_RESUME.pdf
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative w-80 h-80 mx-auto group">
            <div className="absolute -inset-4 border border-cyan-500/30 animate-pulse transition-all group-hover:border-cyan-500/50"></div>
            <div className="absolute -inset-8 border border-purple-500/10 animate-pulse delay-700 transition-all group-hover:border-purple-500/30"></div>

            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400"></div>

            <div className="relative w-full h-full p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm">
              <div className="relative w-full h-full overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-110">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="scale-110 group-hover:scale-100 transition-transform duration-1000"
                />

                <div className="absolute inset-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#06b6d4] animate-scanline"></div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -right-8 bg-black/80 border border-cyan-500/50 p-3 rounded-sm backdrop-blur-md"
            >
              <p className="text-[10px] font-black tracking-widest text-cyan-400">SYSTEM_ID: S_L_96</p>
            </motion.div>

            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-12 -left-12 bg-black/80 border border-purple-500/50 p-3 rounded-sm backdrop-blur-md"
            >
              <p className="text-[10px] font-black tracking-widest text-purple-400">LOC: PUNE_STATION</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
