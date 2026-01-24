import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Experience = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(0);
  const tabsRef = useRef([]);

  const experiences = [
    {
      title: "Software Engineer",
      company: "Indus Net Technologies",
      period: "Sep 2024 - Present",
      responsibilities: [
        "Assisted in mentoring junior developers and contributing to team projects.",
        "Collaborated in optimizing system performance and identifying bottlenecks.",
        "Redesigned the architecture of legacy systems resulting in 30% performance improvement",
        "Conducted code reviews.",
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    },
    {
      title: "Associate Software Engineer",
      company: "Indus Net Technologies",
      period: "Sep 2022 - Sep 2024",
      responsibilities: [
        "Developed responsive and interactive user interfaces for client projects.",
        "Collaborated with UX/UI designers to implement pixel-perfect designs.",
        "Worked closely with backend developers to integrate RESTful APIs, ensuring seamless data flow between the front-end and backend systems.",
        "Partnered with the Product team to comprehend requirements and business specifications.",
      ],
      technologies: [
        "ReactJS",
        "NextJS",
        "Redux",
        "JavaScript",
        "SCSS",
        "Webpack",
        "Jest",
        "TailwindCSS",
      ],
    },
    {
      title: "Web Developer Intern",
      company: "Nolan Edutech",
      period: "December 2021 - Sep 2022",
      responsibilities: [
        "Assisted in developing and maintaining client websites",
        "Created responsive layouts and components using HTML, CSS, and JavaScript",
        "Fixed bugs and implemented new features in existing applications",
        "Participated in team meetings and learned industry best practices",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React"],
    },
  ];
  const handleActiveTab = (index) => {
    setPrevTab(activeTab);
    setActiveTab(index);
  };
  useEffect(() => {
    let index = 0;
    const length = experiences.length;

    const interval = setInterval(() => {
      handleActiveTab(index);
      index = (index + 1) % length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section id="experience" className="pt-20 pb-16 ">
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
          Work Experience
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="relative flex space-x-2 overflow-x-auto mb-8 pb-2">
          {/* Tail effect */}
          <motion.div
            className="absolute h-full bg-blue-500 rounded-md z-0"
            initial={false}
            animate={{
              left: tabsRef.current[activeTab]?.offsetLeft || 0,
              width: tabsRef.current[activeTab]?.offsetWidth || 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {experiences.map((experience, index) => (
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleActiveTab(index)}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${activeTab === index
                ? "text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              {experience.company}
            </button>
          ))}
        </div>



        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold">
                {experiences[activeTab].title}
              </h3>
              <p
                className={`text-lg ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {experiences[activeTab].company}
              </p>
            </div>
            <p
              className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm inline-block ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {experiences[activeTab].period}
            </p>
          </div>

          <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
          <ul className="mb-6 space-y-2">
            {experiences[activeTab].responsibilities.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-start"
              >
                <div
                  className={`mt-1.5 mr-2 h-1.5 w-1.5 rounded-full ${
                    darkMode ? "bg-blue-400" : "bg-blue-600"
                  }`}
                ></div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <h4 className="font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {experiences[activeTab].technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-gray-700 text-blue-300"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
