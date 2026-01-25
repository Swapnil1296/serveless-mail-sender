'use client';

import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { showAlert } from '@/lib/alerts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      showAlert.success('CRYPTO_AUTH_SUCCESS', 'ACCESS_GRANTED');
      onSuccess();
      onClose();
    } catch (error) {
      showAlert.error(error instanceof Error ? error.message : 'AUTH_FAILED', 'SECURITY_BREACH');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-black border-2 border-cyan-500/30 p-8 max-w-md w-full relative overflow-hidden">
        {/* Visual Scanline Effect for Modal */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>

        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-cyan-400 hover:bg-cyan-400/10 transition-colors uppercase text-[10px] font-black"
        >
          [ EXIT ]
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-cyan-500/50 relative mb-6">
            <div className="absolute inset-0 bg-cyan-400/10 animate-pulse"></div>
            <Lock className="w-10 h-10 text-cyan-400 relative z-10" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase neon-text-cyan">
            ADMIN_AUTH.SYS
          </h2>
          <p className="text-cyan-400/50 text-[10px] mt-2 tracking-widest uppercase">ENCRYPTION_LEVEL: OMEGA_7</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-cyan-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">
              USER_ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyan-500/5 border border-cyan-500/30 text-white text-sm placeholder-cyan-500/20 focus:border-cyan-400 focus:outline-none transition-all uppercase"
                placeholder="ENTER_UID"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-cyan-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">
              SECRET_KEY
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyan-500/5 border border-cyan-500/30 text-white text-sm placeholder-cyan-500/20 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-cyan-500 border-2 border-cyan-400 text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-wait transition-all relative overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <span className="relative z-10">{loading ? 'AUTHENTICATING...' : 'EXECUTE_LOGIN'}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center border-t border-white/5 pt-6">
          <p className="text-cyan-400/20 text-[8px] font-black tracking-widest uppercase">
            WARNING: UNAUTHORIZED_ACCESS_STRICTLY_PROHIBITED // IP_LOGGED
          </p>
        </div>
      </div>
    </div>
  );
}
