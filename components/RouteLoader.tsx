'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/80 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-progress-bar relative">
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-md opacity-70"></div>
        </div>
      </div>

      {/* Center loader */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
          </div>
          
          {/* Middle rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-transparent border-b-pink-500 border-l-cyan-500 rounded-full animate-spin-reverse"></div>
          </div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-50"></div>
          </div>
          
          {/* Core glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          {/* Center icon */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-20">
          <div className="relative">
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider animate-pulse">
              Loading
              <span className="inline-block animate-bounce-dots">.</span>
              <span className="inline-block animate-bounce-dots" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="inline-block animate-bounce-dots" style={{ animationDelay: '0.4s' }}>.</span>
            </p>
            {/* Text glow */}
            <p className="absolute top-0 left-0 text-2xl font-bold text-cyan-500 uppercase tracking-wider blur-lg opacity-50 animate-pulse">
              Loading...
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500 animate-pulse"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>
    </div>
  );
}
