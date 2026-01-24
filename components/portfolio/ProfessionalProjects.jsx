import React, { useState } from "react";
import { motion } from "framer-motion";
const ProfessionalProjects = ({ darkMode }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "State Bank Of India General Insurance",
      description:
        "An unambiguous and comprehensive online service to purchase any policy; that is exactly how important insurance policies have become in our lives",
      image: "sbig.png",
      technologies: [
        "React",
        "Next",
        "TailwindCSS",
        "JavaScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Strapi",
      ],
      link: "https://www.sbigeneral.in/",
      github: "#",
    },
    {
      id: 2,
      title: "Alkem Marketplace",

      description:
        "Alkem Market Place, owned by Alkem Labs, is an online platform simplifying the ordering of in-stock medicines. Designed for ease, it offers a seamless ordering experience for both healthcare providers and patients. With real-time stock updates and a user-friendly interface, it ensures timely and reliable delivery, reflecting Alkem's commitment to modernizing healthcare.",
      image: "alkem.png",
      technologies: [
        "React",
        "formik",
        "Redux",
        "Node",
        "PostgreSQL",
        "Express",
      ],
      link: "https://alkemmarketplace.in/",
      github: "#",
    },
    {
      id: 3,
      title: "Connect2Clinic",
      description:
        "Connect2Clinic, an exceptional digital initiative pioneered by Alkem Labs, is dedicated to transforming the management of healthcare practices. As a subsidiary of Alkem Labs, the project's unwavering goal is to carry forward the company’s rich tradition of excellence and unwavering dedication to healthcare. This cutting-edge platform stands as an AI-driven, comprehensive solution that not only streamlines and elevates the patient experience but also empowers healthcare providers with state-of-the-art tools and technologies.",
      image: "c2c.png",
      technologies: ["React", "Next", "TailwindCSS", "JavaScript"],
      link: "https://www.connect2clinic.com",
      github: "#",
    },
    {
      id: 4,
      title: "Ageas Federal Insurance",
      description:
        "Ageas Federal Life Insurance (AFLI) is one of India’s prominent life insurance companies that strives towards creating value for its stakeholders. We are a joint venture between Ageas, an international insurance giant based out of Europe and Federal Bank, one of India’s leading private sector banks.",
      image: "ageas.png",
      technologies: ["PHP", "Laravel", "NextJS", "ReactJS", "AzureCloud", "CI/CD", "strapi"],
      link: "https://www.ageasfederal.com/",
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
          Professional Projects
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

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalProjects;

