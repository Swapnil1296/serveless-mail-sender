'use client';

import React, { useState } from 'react';
import { Lock, Github, Linkedin, Mail, ExternalLink, Briefcase } from 'lucide-react';
import LoginModal from './LoginModal';
import DashboardModal from './DashboardModal';
import { useAuth } from '@/contexts/AuthContext';

export default function PortfolioLanding() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const handleLoginSuccess = () => {
    setShowDashboard(true);
  };

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setShowDashboard(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Login/Projects Button - Fixed top right */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={handleButtonClick}
          disabled={loading}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold rounded-lg uppercase tracking-wider transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-wait border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 flex items-center gap-2 text-sm sm:text-base"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Loading...</span>
            </>
          ) : isAuthenticated ? (
            <>
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Projects</span>
              <span className="sm:hidden">Projects</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Login</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-24">
          {/* Profile Image Placeholder */}
          <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-6 sm:mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-black rounded-full flex items-center justify-center relative z-10">
              <span className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                SP
              </span>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-wider">
              SWAPNIL LANDAGE
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <span className="px-4 sm:px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 font-bold text-sm sm:text-base uppercase tracking-wider">
              Full Stack Developer
            </span>
            <span className="px-4 sm:px-6 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 font-bold text-sm sm:text-base uppercase tracking-wider">
              MERN Stack
            </span>
          </div>

          <p className="text-lg sm:text-xl text-cyan-200 max-w-3xl mx-auto leading-relaxed px-4">
            Building modern web applications with React, Next.js, Node.js, and MongoDB.
            Passionate about creating scalable and performant solutions.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>
        </div>

        {/* Skills Section Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills'].map((category, index) => (
            <div
              key={category}
              className="p-6 bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <p className="text-cyan-300/70 text-sm">
                Skills and technologies will be listed here...
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 uppercase tracking-wider">
            Get In Touch
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com/Swapnil1296"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-bold rounded-lg flex items-center gap-2 transition-all hover:scale-105 border-2 border-gray-500/50"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a
              href="https://swapnil-landage-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg flex items-center gap-2 transition-all hover:scale-105 border-2 border-cyan-400/50"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Portfolio</span>
            </a>
            
            <a
              href="tel:7666604697"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg flex items-center gap-2 transition-all hover:scale-105 border-2 border-purple-400/50"
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
      
      <DashboardModal
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
      />
    </div>
  );
}
