'use client';

import React, { useState } from 'react';
import { Lock, Briefcase, Terminal } from 'lucide-react';
import LoginModal from '../LoginModal';
import DashboardModal from '../mail-sender/DashboardModal';
import { useAuth } from '@/contexts/AuthContext';
import Landing from './Landing';

export default function PortfolioLanding() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, loading, isAdmin } = useAuth();

  const handleLoginSuccess = () => {
    setShowDashboard(true);
  };

  const handleButtonClick = () => {
    // PWA fix: verify token exists; bfcache/visibility can leave stale isAuthenticated
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('auth_token');
    if (isAuthenticated && hasToken) {
      setShowDashboard(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden font-mono">
      {/* Dynamic Background Overlays (Complements Landing.jsx) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>
      </div>

      {/* Main Content Node */}
      <div className="relative z-10">
        <Landing
          isAuthenticated={isAuthenticated}
          loading={loading}
          isAdmin={isAdmin}
          onButtonClick={handleButtonClick}
        />
      </div>

      {/* Auth Modals */}
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
