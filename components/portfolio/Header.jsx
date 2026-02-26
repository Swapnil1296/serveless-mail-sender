import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Lock, Terminal, Settings } from "lucide-react";

const Header = ({ darkMode, scrollPosition, isAuthenticated, loading, isAdmin, onButtonClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "proficiencies", label: "SKILLS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "upcoming", label: "UPCOMING" },
    { id: "contact", label: "CONTACT" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-cyan-500/20 backdrop-blur-md ${scrollPosition > 50
        ? "bg-slate-900/80 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
        : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 relative group cursor-pointer"
            >
              <span className="relative z-10">PORTFOLIO.SYS</span>
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-[11px] font-bold tracking-widest text-cyan-100/70 hover:text-cyan-400 transition-colors relative group"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </motion.button>
            ))}

            {/* Auth: Login / Sign up when not authenticated */}
            {!isAuthenticated && !loading && (
              <>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-cyan-400/50 text-cyan-400 hover:border-cyan-400 transition-all text-[10px] font-black tracking-widest uppercase"
                >
                  <Lock className="w-3.5 h-3.5" />
                  LOGIN
                </motion.a>
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 transition-all text-[10px] font-black tracking-widest text-white uppercase neon-text-cyan"
                >
                  SIGN UP
                </motion.a>
              </>
            )}
            {(isAuthenticated || loading) && (
            <motion.button
              onClick={onButtonClick}
              disabled={loading}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 transition-all group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-3 h-3 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              ) : (
                isAuthenticated ? <Terminal className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span className="text-[10px] font-black tracking-widest text-white uppercase translate-y-[0.5px] neon-text-cyan">
                {loading ? 'SYNCING' : (isAuthenticated ? 'DASHBOARD' : 'ADMIN_ACCESS')}
              </span>
            </motion.button>
            )}

            {isAuthenticated && isAdmin && (
              <Link
                href="/projects/admin"
                className="flex items-center gap-2 px-4 py-2.5 bg-transparent border-2 border-white/20 text-white/90 hover:text-white hover:border-white transition-all text-[10px] font-black tracking-widest uppercase"
              >
                <Settings className="w-3.5 h-3.5" />
                ADMIN
              </Link>
            )}

            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
              download
              className="text-[10px] font-black tracking-widest px-4 py-2.5 bg-transparent border-2 border-white/20 text-white/90 hover:text-white hover:border-white transition-all uppercase"
            >
              RESUME.pdf
            </motion.a>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden py-8 bg-slate-900/95 border-t border-cyan-500/20"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="px-4 py-2 text-xs font-bold tracking-[0.3em] text-cyan-100/70 hover:text-cyan-400 text-left transition-colors uppercase"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}

              <div className="grid grid-cols-1 gap-4 px-4 pt-4 border-t border-white/5">
                {!isAuthenticated && !loading ? (
                  <>
                    <a
                      href="/login"
                      className="flex items-center justify-center gap-3 py-4 border-2 border-cyan-500/50 text-cyan-400 font-black tracking-widest text-xs uppercase"
                    >
                      <Lock className="w-5 h-5" /> LOGIN
                    </a>
                    <a
                      href="/signup"
                      className="flex items-center justify-center gap-3 py-4 bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400 font-black tracking-widest text-xs uppercase neon-text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    >
                      SIGN UP
                    </a>
                  </>
                ) : (
                <>
                  <button
                    onClick={onButtonClick}
                    disabled={loading}
                    className="flex items-center justify-center gap-3 py-4 bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400 font-black tracking-widest text-xs uppercase neon-text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  >
                    {isAuthenticated ? <Terminal className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    {isAuthenticated ? 'ACCESS_PROJECT_NODES' : 'INITIALIZE_ADMIN_AUTH'}
                  </button>
                  {isAdmin && (
                    <Link
                      href="/projects/admin"
                      className="flex items-center justify-center gap-3 py-4 border-2 border-white/20 text-white/90 font-black tracking-widest text-xs uppercase hover:text-white hover:border-white transition-all"
                    >
                      <Settings className="w-5 h-5" />
                      ADMIN
                    </Link>
                  )}
                </>
                )}
                <a
                  href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
                  download
                  className="text-center text-xs font-black tracking-widest py-4 border-2 border-white/20 text-white uppercase"
                >
                  DOWNLOAD_CV.pdf
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
