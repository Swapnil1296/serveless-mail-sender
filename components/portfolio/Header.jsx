import React, { useState } from "react";
import { motion } from "framer-motion";

const Header = ({ darkMode, scrollPosition }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "proficiencies", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "upcoming", label: "Upcoming" },
    { id: "contact", label: "Contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 50
          ? darkMode
            ? "bg-gray-900 shadow-lg shadow-gray-800/20"
            : "bg-white shadow-lg"
          : darkMode
          ? "bg-gray-900"
          : "bg-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`text-2xl font-bold ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Portfolio
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium transition-colors duration-300 hover:cursor-pointer ${
                  darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
              download
              className={`text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Download Resume
            </motion.a>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-md ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
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
            className={`md:hidden py-4 ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 text-sm font-medium ${
                    darkMode
                      ? "hover:bg-gray-800 rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
                download
                className={`mx-4 text-center text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300 ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
