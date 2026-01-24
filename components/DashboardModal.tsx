'use client';

import React from 'react';
import { X, Mail, FileText, Plus } from 'lucide-react';
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
  color: string;
  gradient: string;
}

export default function DashboardModal({ isOpen, onClose }: DashboardModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const projects: Project[] = [
    {
      id: 'email-management',
      name: 'Email Management',
      description: 'Bulk email sender and logs viewer',
      icon: <Mail className="w-8 h-8" />,
      route: '/projects/email-sender',
      color: 'cyan',
      gradient: 'from-cyan-600 via-purple-600 to-pink-600',
    },
    // Add more projects here in the future
  ];

  const handleProjectClick = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-cyan-500/50 p-6 sm:p-8 max-w-4xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider mb-2">
            Project Dashboard
          </h2>
          <p className="text-cyan-300/70 text-sm">Select a project to access</p>
          <div className="h-0.5 w-32 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mt-4"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project.route)}
              className={`group relative p-6 bg-gradient-to-br ${project.gradient} bg-opacity-20 border-2 border-${project.color}-500/50 rounded-xl hover:border-${project.color}-400 transition-all hover:scale-105 text-left overflow-hidden`}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-${project.color}-500/20 rounded-xl mb-4 relative`}>
                <div className={`absolute inset-0 bg-${project.color}-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                <div className="text-white relative z-10">{project.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">
                {project.name}
              </h3>
              <p className="text-cyan-300/70 text-sm">{project.description}</p>

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          ))}

          {/* Coming Soon Card */}
          <div className="group relative p-6 bg-gradient-to-br from-gray-600 to-gray-800 bg-opacity-20 border-2 border-gray-500/30 rounded-xl text-left opacity-50">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/20 rounded-xl mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wider">
              More Projects
            </h3>
            <p className="text-gray-500 text-sm">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
