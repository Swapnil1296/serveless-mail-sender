import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Log startup info on client side
    if (typeof window !== 'undefined') {
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
      console.log('%c🚀 Next.js Bulk Email Sender', 'color: #06b6d4; font-size: 16px; font-weight: bold');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
      console.log('%cApp Status: Running', 'color: #10b981');
      console.log('%cAPI Endpoint: /api/send-bulk-emails', 'color: #8b5cf6');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
    }
  }, []);

  return (
    <>
      <nav className="bg-black/95 backdrop-blur-md border-b-2 border-cyan-500/30 sticky top-0 z-50 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}></div>
        </div>
        
        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo with glow effect */}
            <Link href="/" className="group relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/30 transition-all rounded-lg"></div>
              <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all">
                <span className="text-xl sm:text-2xl">📧</span>
                <div>
                  <div className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                    EMAIL SENDER
                  </div>
                  <div className="text-[8px] sm:text-xs text-cyan-300/70 uppercase tracking-widest -mt-1">
                    Serverless System
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <Link
                href="/"
                className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all overflow-hidden group ${
                  router.pathname === '/'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/50'
                    : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-200'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Icon and text */}
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <span className="hidden sm:inline">📨</span>
                  <span className="hidden sm:inline">Send</span>
                  <span className="sm:hidden">Send</span>
                </span>
                
                {/* Active indicator */}
                {router.pathname === '/' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-pulse"></div>
                )}
              </Link>
              
              <Link
                href="/logs"
                className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all overflow-hidden group ${
                  router.pathname === '/logs'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50'
                    : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-purple-400/50 hover:text-purple-200'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Icon and text */}
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <span className="hidden sm:inline">📊</span>
                  <span className="hidden sm:inline">Logs</span>
                  <span className="sm:hidden">Logs</span>
                </span>
                
                {/* Active indicator */}
                {router.pathname === '/logs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse"></div>
                )}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Glowing bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
