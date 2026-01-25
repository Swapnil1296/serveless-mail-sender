import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfessionalProjects = ({ darkMode }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "SBI GENERAL INSURANCE",
      slug: "PROJ_001",
      description:
        "Comprehensive online portal for insurance policy management and procurement. High-availability architecture for critical financial operations.",
      image: "sbig.png",
      technologies: [
        "React",
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Strapi",
      ],
      link: "https://www.sbigeneral.in/",
    },
    {
      id: 2,
      title: "ALKEM MARKETPLACE",
      slug: "PROJ_002",
      description:
        "Centralized pharmaceutical supply chain platform. Real-time inventory tracking and automated order processing for healthcare nodes.",
      image: "alkem.png",
      technologies: [
        "React",
        "Formik",
        "Redux",
        "Node",
        "PostgreSQL",
        "Express",
      ],
      link: "https://alkemmarketplace.in/",
    },
    {
      id: 3,
      title: "CONNECT2CLINIC",
      slug: "PROJ_003",
      description:
        "AI-driven healthcare management ecosystem. Advanced patient-doctor telemetry and clinic workflow optimization protocols.",
      image: "c2c.png",
      technologies: ["React", "Next", "TailwindCSS", "JavaScript"],
      link: "https://www.connect2clinic.com",
    },
    {
      id: 4,
      title: "AGEAS FEDERAL INSURANCE",
      slug: "PROJ_004",
      description:
        "Multinational joint-venture fintech platform. Scalable cloud-native architecture for high-volume insurance transactions.",
      image: "ageas.png",
      technologies: ["PHP", "Laravel", "NextJS", "ReactJS", "AzureCloud", "CI/CD", "Strapi"],
      link: "https://www.ageasfederal.com/",
    },
  ];

  return (
    <section id="projects" className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-block relative">
          <h2 className="text-3xl font-black tracking-widest text-white uppercase relative z-10">
            &lt; DEPLOYED_ASSETS /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Holographic Border Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-sm blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>

            <div className="relative bg-black/80 border border-white/10 overflow-hidden">
              {/* Header Info */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                <span className="text-[9px] font-black tracking-widest text-cyan-400">{project.slug}</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-500 opacity-50"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 opacity-50"></div>
                </div>
              </div>

              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-50 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                {/* Visual Glitch Lines */}
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 pointer-events-none">
                  <div className="absolute top-1/4 left-0 w-full h-px bg-cyan-400"></div>
                  <div className="absolute top-2/4 left-0 w-full h-px bg-purple-400"></div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-black tracking-tighter text-white uppercase neon-text-cyan">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-cyan-100/60 leading-relaxed font-bold mb-6 h-12 overflow-hidden">
                  &gt; {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-cyan-500/5 border border-cyan-500/20 text-[8px] font-black text-white tracking-widest"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[8px] font-black text-cyan-400/50">+{project.technologies.length - 5}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black tracking-[0.3em] text-cyan-400 hover:text-white transition-colors"
                  >
                    [ ACCESS_NODE ]
                  </motion.a>
                  <div className="text-[8px] font-black text-cyan-400/20 italic tracking-tighter">DATA_ENCRYPTED_v2.0</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalProjects;
