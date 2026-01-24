import React from "react";
import { motion } from "framer-motion";

const Proficiencies = ({ darkMode }) => {
  const skills = [
    {
      category: "Frontend",
      items: [
        "ReactJS",
        "NextJS",
        "ReduxJS",

        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "MaterialUI",
        "BootStrap",
        "SASS/SCSS",
      ],
      icon: "🎨",
    },
    {
      category: "Backend",
      items: ["Node.js", "Express"],
      icon: "⚙️",
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      icon: "💾",
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "Docker", "AWS", "Jest", "Webpack", "Vite"],
      icon: "🛠️",
    },
    {
      category: "Frameworks/Tools",
      items: ["Strapi", "Formik", "Redux Toolkit", "Joi", "Zod"],
      icon: "🧩",
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="proficiencies" className="pt-20 pb-16">
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
          My Skills & Expertise
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`p-6 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50"
            } transition-all duration-300`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">{skillGroup.icon}</span>
              <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    darkMode
                      ? "bg-gray-700 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div
          className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Professional Overview</h3>
          <p className="mb-4">
            With over 3 years of experience in software development, I've
            mastered both frontend and backend technologies to create seamless,
            responsive, and user-friendly applications. My approach combines
            technical expertise with creative problem-solving to deliver
            solutions that exceed expectations.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Fast Learner</h4>
                <p className="text-sm">Quick to master new technologies</p>
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Solution-Oriented</h4>
                <p className="text-sm">Creative approach to problem solving</p>
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Team Player</h4>
                <p className="text-sm">Collaborative and communicative</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Proficiencies;
