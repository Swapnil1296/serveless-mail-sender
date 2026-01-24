// components/UpcomingProjects.jsx
import React from "react";
import { motion } from "framer-motion";

const UpcomingProjects = ({ darkMode }) => {
  const upcomingProjects = [
    {
      title: "AI Image Generation Platform",
      description:
        "A platform that leverages AI to generate and edit images based on text prompts.",
      progress: 60,
      expectedCompletion: "March 2025",
      technologies: ["React", "Python", "TensorFlow", "FastAPI"],
    },
    // {
    //   title: "Blockchain Marketplace",
    //   description:
    //     "A decentralized marketplace for digital assets with secure transactions.",
    //   progress: 40,
    //   expectedCompletion: "May 2025",
    //   technologies: ["Solidity", "Ethereum", "Web3.js", "Next.js"],
    // },
    // {
    //   title: "AR Navigation App",
    //   description:
    //     "An augmented reality app that provides interactive navigation in indoor spaces.",
    //   progress: 25,
    //   expectedCompletion: "July 2025",
    //   technologies: ["Swift", "ARKit", "CoreML", "Firebase"],
    // },
  ];

  return (
    <section id="upcoming" className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          className={`inline-block text-3xl font-bold pb-2 border-b-4 ${
            darkMode ? "border-blue-400" : "border-blue-600"
          }`}
        >
          Upcoming Projects
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {upcomingProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`mb-8 p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p
                className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm inline-block ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                Expected: {project.expectedCompletion}
              </p>
            </div>

            <p className="mb-4">{project.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div
                className={`w-full h-2 rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${
                    darkMode ? "bg-blue-400" : "bg-blue-600"
                  }`}
                ></motion.div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full text-xs ${
                    darkMode
                      ? "bg-gray-700 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingProjects;
