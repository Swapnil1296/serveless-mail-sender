import React, { useState } from "react";
import { motion } from "framer-motion";

const PersonalProjects = ({ darkMode }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "MEESHO_CLONE",
      slug: "EXP_001",
      description:
        "Full-stack e-commerce simulation with telemetry-based tracking and encrypted transaction flows.",
      image: "meesho.png",
      technologies: ["NodeJS", "ReactJS", "ReduxJS", "MaterialUI", "MongoDB", "Express.js", "JWT"],
      link: "https://meesho-clone-xi.vercel.app/",
      github: "https://github.com/Swapnil1296/Meesho-",
    },
  ];

  return (
    <section id="personal-projects" className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-block relative">
          <h2 className="text-3xl font-black tracking-widest text-white uppercase relative z-10">
            &lt; EXPERIMENTAL_LABS /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Holographic Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm blur opacity-20 group-hover:opacity-75 transition duration-1000"></div>

            <div className="relative bg-slate-800/90 border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                <span className="text-[9px] font-black tracking-widest text-purple-400">{project.slug}</span>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>

              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-black tracking-tighter text-white uppercase neon-text-purple">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-purple-100/60 leading-relaxed font-bold mb-8">
                  &gt; {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-purple-500/5 border border-purple-500/20 text-[8px] font-black text-purple-200 tracking-tighter"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(168,85,247,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 border border-purple-500/50 text-[10px] font-black tracking-widest text-purple-400 transition-all uppercase"
                  >
                    [ LIVE_FEED ]
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 border border-white/20 text-[10px] font-black tracking-widest text-white transition-all uppercase"
                  >
                    [ SOURCE_CODE ]
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;
