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
        <div className="inline-block relative">
          <h2 className="text-3xl font-black tracking-widest text-white uppercase relative z-10">
            &lt; SKILLS_REPOSITORY /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={item}
            className="p-6 bg-slate-800/40 border-2 border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 -mr-8 -mt-8 rotate-45 group-hover:bg-cyan-500/10 transition-colors"></div>

            <div className="flex items-center mb-6">
              <span className="text-2xl mr-4 brightness-125">{skillGroup.icon}</span>
              <h3 className="text-sm font-black tracking-[0.2em] text-cyan-400 uppercase">
                {skillGroup.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(6,182,212,0.2)" }}
                  className="px-3 py-1 bg-cyan-500/5 border border-cyan-500/30 text-cyan-100/90 text-[10px] font-bold tracking-tighter"
                >
                  {skill.toUpperCase()}
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
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-cyan-950/20 to-purple-950/20 border-2 border-purple-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[10px] font-black text-purple-500/30">OVERVIEW_VER_3.0.1</div>

          <h3 className="text-xl font-black tracking-widest text-purple-400 mb-6 uppercase flex items-center gap-4">
            <span className="w-12 h-px bg-purple-500/30"></span>
            Professional_Manifesto
          </h3>
          <p className="text-sm text-cyan-100/80 leading-relaxed font-medium mb-8">
            With over 3 years of experience in the digital frontier, I have
            mastered frontend and backend constructs to create high-fidelity,
            responsive, and user-centric applications. My methodology integrates
            technical precision with creative problem-solving to deliver
            optimal-grade solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: "FAST_LEARNER", desc: "Rapid tech adaptation", icon: "⚡" },
              { label: "SOL_ORIENTED", desc: "Heuristic problem solver", icon: "🧠" },
              { label: "TEAM_SYNC", desc: "Comm-protocol efficient", icon: "📡" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-2 border-l-2 border-cyan-500/30 pl-4">
                <span className="text-xl mb-1">{feature.icon}</span>
                <h4 className="text-[10px] font-black tracking-[0.2em] text-cyan-400">{feature.label}</h4>
                <p className="text-[10px] text-cyan-100/60 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Proficiencies;
