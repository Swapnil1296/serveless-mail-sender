import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Experience = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
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
    setActiveTab(index);
  };

  return (
    <section id="experience" className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-block relative">
          <h2 className="text-3xl font-black tracking-widest text-white uppercase relative z-10">
            &lt; CAREER_CHRONOLOGY /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Tech-inspired Sidebar Tabs */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-l-2 border-purple-500/20 md:w-64 shrink-0">
          {experiences.map((experience, index) => (
            <button
              key={index}
              onClick={() => handleActiveTab(index)}
              className={`px-6 py-4 text-left transition-all relative group ${activeTab === index
                ? "bg-purple-500/10 text-purple-400"
                : "text-cyan-100/40 hover:text-cyan-400 hover:bg-cyan-500/5"
                }`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-tighter opacity-50">
                  {index.toString().padStart(2, '0')}.EXEC
                </span>
                <span className="text-sm font-bold tracking-widest uppercase">
                  {experience.company.split(' ')[0]}
                </span>
              </div>
              {activeTab === index && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-purple-400 shadow-[0_0_10px_#8b5cf6]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Node */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-8 bg-slate-800/40 border-2 border-purple-500/20 relative group"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-50"></div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white uppercase mb-1">
                {experiences[activeTab].title}
              </h3>
              <p className="text-purple-400 font-bold tracking-[0.2em] text-xs">
                @ {experiences[activeTab].company.toUpperCase()}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-[10px] font-black bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-purple-300 tracking-widest uppercase">
              {experiences[activeTab].period}
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {experiences[activeTab].responsibilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="mt-1 text-purple-500 text-xs font-black">❯</span>
                <p className="text-sm text-cyan-100/70 leading-relaxed font-medium">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {experiences[activeTab].technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-500/5 border border-purple-500/20 text-[9px] font-black text-purple-300 tracking-tighter uppercase"
              >
                #{tech.replace(/\s+/g, '_').toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
