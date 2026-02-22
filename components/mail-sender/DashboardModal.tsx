'use client';

import React from 'react';
import { X, Mail, NotebookPen, Plus, Wallet, FileText, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/router';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  slug: string;
}

export default function DashboardModal({ isOpen, onClose }: DashboardModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const projects: Project[] = [
    {
      id: 'email-management',
      name: 'Email Management',
      slug: 'COMMS_v2',
      description: 'Bulk email sender and protocol log viewer',
      icon: <Mail className="w-8 h-8" />,
      route: '/projects/email-sender',
    },
   
    {
      id: 'expense-tracker',
      name: 'Expense Tracker',
      slug: 'FIN_TRK_v1',
      description: 'Track expenses, lendings, and owings',
      icon: <Wallet className="w-8 h-8" />,
      route: '/projects/expense-tracker',
    },
    {
      id: 'resume-creator',
      name: 'ATS Resume Creator',
      slug: 'RESUME_AI_v1',
      description: 'Generate ATS-friendly resume from 5 job descriptions using AI',
      icon: <FileText className="w-8 h-8" />,
      route: '/projects/resume-creator',
    },
    {
      id: 'naukari-scraper',
      name: 'Naukari Scraper',
      slug: 'NAUK_SCR_V1',
      description: 'Scrap jobs from naukari',
      icon: <Wallet className="w-8 h-8" />,
      route: '/projects/naukari-scraper',
    },
    {
      id: 'interview-preparation-kit',
      name: 'Interview Prep Kit',
      slug: 'INT_CORE_v1',
      description: 'Heuristic-based interview preparation modules',
      icon: <NotebookPen className="w-8 h-8" />,
      route: '/projects/interview-prep',
    },
    {
      id: 'quiz-hub',
      name: 'Quiz Hub',
      slug: 'QUIZ_HUB_v1',
      description: 'Quiz Hub with dashboard, quizzes, analytics',
      icon: <NotebookPen className="w-8 h-8" />,
      route: '/projects/quiz-hub',
    },
  ];

  const handleProjectClick = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-black border-2 border-cyan-500/30 p-8 max-w-4xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto cyberpunk-scrollbar">
        {/* Visual Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 -mr-12 -mt-12 rotate-45"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 transition-colors uppercase text-[10px] font-black flex items-center gap-2"
        >
          [ TERMINATE_SESSION ] <X className="w-3 h-3" />
        </button>

        {/* Header */}
        <div className="text-center mb-12 border-b border-cyan-500/20 pb-8">
          <h2 className="text-3xl font-black text-white tracking-[0.2em] uppercase neon-text-cyan mb-2">
            CONTROL_CENTER.SYS
          </h2>
          <p className="text-cyan-400/60 text-[10px] tracking-widest uppercase flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-cyan-500/30"></span>
            ACTIVE_NODES_IDENTIFIED
            <span className="w-8 h-px bg-cyan-500/30"></span>
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project.route)}
              className="group relative p-8 bg-cyan-500/5 border-2 border-cyan-500/20 hover:border-cyan-400 transition-all hover:bg-cyan-500/10 text-left overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-all"></div>

              {/* Icon Node */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black border border-cyan-500/30 mb-6 relative group-hover:border-cyan-400 transition-all">
                <div className="text-cyan-400 relative z-10 group-hover:scale-110 transition-transform">{project.icon}</div>
                <div className="absolute inset-0 bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-50 transition-all"></div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <span className="text-[9px] font-black text-cyan-400/40 tracking-widest block mb-1">{project.slug}</span>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
              </div>
              <p className="text-xs text-cyan-100/60 font-bold mb-6 leading-relaxed">
                &gt; {project.description}
              </p>

              {/* Action Indicator */}
              <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                [ ACCESS_PROTOCOL ]
                <div className="h-px flex-1 bg-cyan-500/30"></div>
              </div>
            </button>
          ))}

          {/* Locked/Empty Node - placeholder for future projects */}
          <div className="relative p-8 bg-white/5 border-2 border-white/5 opacity-30 text-left flex flex-col items-center justify-center border-dashed sm:col-span-2 lg:col-span-1">
            <Plus className="w-12 h-12 text-white/40 mb-4" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">RESTRICTED_ACCESS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
