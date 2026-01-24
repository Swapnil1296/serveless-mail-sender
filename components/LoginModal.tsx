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
      showAlert.success('Login successful!', 'Welcome Back');
      onSuccess();
      onClose();
    } catch (error) {
      showAlert.error(error instanceof Error ? error.message : 'Login failed', 'Authentication Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-cyan-500/50 p-6 sm:p-8 max-w-md w-full relative overflow-hidden">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Lock className="w-8 h-8 text-white relative z-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider">
            Admin Login
          </h2>
          <p className="text-cyan-300/70 text-sm mt-2">Enter your credentials to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cyan-300 text-sm font-bold mb-2 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-cyan-300 text-sm font-bold mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold rounded-lg uppercase tracking-wider transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-purple-400/30 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10">{loading ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-cyan-300/50 text-xs">
            Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
