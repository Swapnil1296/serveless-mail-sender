import React, { useState } from "react";
import { motion } from "framer-motion";
const PersonalProjects = ({ darkMode }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [

    {
      id: 1,
      title: "Meesho",
      description:
        "A full-stack clone of E-commerce platform with payment processing, and user authentication ",
      image: "meesho.png",
      technologies: ["NodeJS", "ReactJS", "ReduxJS", "MaterialUI", "Javascript", "MongoDB", "Express.js", "Mongoose", "NPM - Dotenv, jsonwebtoken , bcryptjs", "Local storage"],
      link: "https://meesho-clone-xi.vercel.app/",
      github: "https://github.com/Swapnil1296/Meesho-",
    },
  ];

  return (
    <section id="projects" className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          className={`inline-block text-3xl font-bold pb-2 border-b-4 ${darkMode ? "border-blue-400" : "border-blue-600"
            }`}
        >
          Personal Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"
              }`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="relative overflow-hidden"
              style={{ height: "200px" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                style={{
                  transform:
                    hoveredId === project.id ? "scale(1.1)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-xs ${darkMode
                      ? "bg-gray-700 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  View Live
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                >
                  View Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;

