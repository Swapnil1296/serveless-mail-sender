'use client';

import React, { useState } from 'react';
import { Lock, Briefcase } from 'lucide-react';
import LoginModal from '../LoginModal';
import DashboardModal from '../mail-sender/DashboardModal';
import { useAuth } from '@/contexts/AuthContext';
import Landing from './Landing';

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
    

      {/* Main Content */}
      <Landing />

        <div className="fixed top-4 right-4 z-40 mt-[100px]">
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
