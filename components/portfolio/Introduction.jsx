import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Introduction = ({ darkMode }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg font-semibold mb-2">
            <span className={darkMode ? "text-blue-400" : "text-blue-600"}>
              Hello, I'm
            </span>
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <TypeAnimation
              sequence={[
                "Swapnil ",
                1000,
                "A Developer",
                1000,
                "A Designer",
                1000,
                "A Creator",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className={darkMode ? "text-blue-400" : "text-blue-600"}
            />
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
            Passionate Full Stack Developer
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-lg">
            I create stunning digital experiences that make an impact. With
            expertise in front-end and back-end technologies, I build scalable
            and efficient applications that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-md text-white font-medium transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get in Touch
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1fa6ZZkbo0xYR-YHXy_jQIn0nYYraaVe3/view?usp=sharing"
              download
              className={`px-6 py-3 rounded-md font-medium border-2 transition-colors duration-300 ${
                darkMode
                  ? "border-blue-500 text-blue-400 hover:bg-blue-500 hover:bg-opacity-10"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div
            className={`w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            } bg-opacity-20 flex items-center justify-center`}
          >
            <div
              className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 ${
                darkMode ? "border-blue-400" : "border-blue-600"
              }`}
            >
              <img
                src="profile.jpg"
                alt="Profile"
                className="w-full h-full object-fill"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              type: "spring",
              stiffness: 200,
            }}
            className={`absolute -top-4 -right-4 p-4 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <span className="text-3xl">👨‍💻</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1,
              type: "spring",
              stiffness: 200,
            }}
            className={`absolute top-1/2 -left-8 p-4 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <span className="text-3xl">🚀</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.2,
              type: "spring",
              stiffness: 200,
            }}
            className={`absolute -bottom-4 left-1/4 p-4 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <span className="text-3xl">💡</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
