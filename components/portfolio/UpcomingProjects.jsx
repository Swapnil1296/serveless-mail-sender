import React from "react";
import { motion } from "framer-motion";

const UpcomingProjects = ({ darkMode }) => {
  const upcomingProjects = [
    {
      title: "AI IMAGE GENERATOR",
      slug: "NEXT_GEN_001",
      description:
        "Neural-network based image synthesis engine. Real-time text-to-visual encoding with custom filter protocols.",
      progress: 60,
      expectedCompletion: "MARCH_2025",
      technologies: ["React", "Python", "TensorFlow", "FastAPI"],
    }
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
        <div className="inline-block relative">
          <h2 className="text-3xl font-black tracking-widest text-white uppercase relative z-10">
            &lt; FUTURE_NODES /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {upcomingProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-8 p-8 bg-slate-800/40 border border-cyan-500/20 relative group overflow-hidden"
          >
            {/* Background Data Stream Effect */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="text-[40px] font-black tracking-tighter text-cyan-400 uppercase leading-none">
                ENCRYPT_DATA
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 mb-2 block">{project.slug}</span>
                <h3 className="text-2xl font-black tracking-tighter text-white uppercase">{project.title}</h3>
              </div>
              <div className="px-4 py-1 border border-cyan-500/30 bg-cyan-500/5 text-[10px] font-black text-cyan-400 tracking-widest uppercase">
                EST_TIME: {project.expectedCompletion}
              </div>
            </div>

            <p className="text-sm text-cyan-100/60 leading-relaxed font-bold mb-8">
              &gt; {project.description}
            </p>

            <div className="mb-10">
              <div className="flex justify-between text-[10px] font-black tracking-widest text-cyan-400 uppercase mb-3 px-1">
                <span>SYSTEM_SYNC_PROGRESS</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-3 border border-white/10 bg-black p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative overflow-hidden"
                >
                  {/* Animated Glint */}
                  <div className="absolute inset-0 bg-white/20 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-black text-cyan-100/40 tracking-[0.1em] px-2 py-0.5 border border-white/5 uppercase"
                >
                  #{tech.toUpperCase()}
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
