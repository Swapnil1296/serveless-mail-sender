import React from "react";
import { motion } from "framer-motion";

const Footer = ({ darkMode }) => {
  return (
    <footer className="py-12 bg-black border-t-2 border-cyan-500/20 relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              PORTFOLIO.SYS
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400/50 uppercase mt-1">
              v3.0.1_STABLE_BUILD
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          >
            {[
              { label: "INDEX", href: "#home" },
              { label: "RESOURCES", href: "#proficiencies" },
              { label: "CHRONICLE", href: "#experience" },
              { label: "TERMINAL", href: "#contact" }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[10px] font-black tracking-widest text-cyan-100/40 hover:text-cyan-400 transition-colors uppercase"
              >
                [ {link.label} ]
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="text-[10px] font-black text-cyan-100/30 tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} SWAPNIL_LANDAGE // ALL_SYSTEMS_OPERATIONAL
          </p>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            <p className="text-[10px] font-black text-white/20 tracking-tighter uppercase italic">
              ENGINEERED_IN_VIRTUAL_SPACE
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
