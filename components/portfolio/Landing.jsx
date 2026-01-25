// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Introduction from "./Introduction";
import Proficiencies from "./Proficiencies";
import Experience from "./Experience";
import ProfessionalProjects from "./ProfessionalProjects";
import UpcomingProjects from "./UpcomingProjects";
import SocialLinks from "./SocialLinks";
import Contact from "./Contact";
import Footer from "./Footer";
import PersonalProjects from "./PersonalProjects";

export default function Landing({ isAuthenticated, loading, onButtonClick }) {
  const [darkMode] = useState(true); // Force dark mode for cyberpunk
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      <Header
        darkMode={darkMode}
        scrollPosition={scrollPosition}
        isAuthenticated={isAuthenticated}
        loading={loading}
        onButtonClick={onButtonClick}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Dynamic Background Elements */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_120%,#a855f7,transparent_50%)]"></div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Introduction darkMode={darkMode} />
            <Proficiencies darkMode={darkMode} />
            <Experience darkMode={darkMode} />
            <ProfessionalProjects darkMode={darkMode} />
            <PersonalProjects darkMode={darkMode} />
            <UpcomingProjects darkMode={darkMode} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
              <SocialLinks darkMode={darkMode} />
              <Contact darkMode={darkMode} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}


