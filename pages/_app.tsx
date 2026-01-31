import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import RouteLoader from '@/components/RouteLoader';

function Navigation() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  // Only show navigation on project pages
  const isProjectPage = router.pathname.startsWith('/projects/');

  if (!isProjectPage || !isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b-2 border-cyan-500/30 sticky top-0 z-50 overflow-hidden">
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
        <div className="flex items-center justify-between gap-2">
          {/* Logo with glow effect */}
          <Link href="/" className="group relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/30 transition-all rounded-lg"></div>
            <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all">
              <span className="text-xl sm:text-2xl">🚀</span>
              <div>
                <div className="text-sm sm:text-base md:text-xl font-bold bg-clip-text text-blue-600 bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                  PROJECT HUB
                </div>
                <div className="text-[8px] sm:text-xs text-cyan-300/70 uppercase tracking-widest -mt-1">
                  {user?.username}
                </div>
              </div>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <Link
              href={(router.pathname === '/projects/email-sender' || router.pathname === '/projects/email-logs') ? "/projects/interview-prep" : "/projects/email-sender"}
              className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all overflow-hidden group ${
                router.pathname === '/projects/email-sender' || router.pathname === '/projects/email-logs'
                  ? 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/50'
                  : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-200'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                {(router.pathname === '/projects/email-sender' || router.pathname === '/projects/email-logs') ?<><span className="hidden sm:inline">📧</span>
                  <span>Interviw Kit</span></> : <><span className="hidden sm:inline">📧</span>
                    <span>Email Management</span>
                 </>}
                
              </span>
              {(router.pathname === '/projects/email-sender' || router.pathname === '/projects/email-logs') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
              )}
            </Link>

            <button
              onClick={logout}
              className="relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all overflow-hidden group text-red-300 border-2 border-red-500/30 hover:border-red-400/50 hover:text-red-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Glowing bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </nav>
  );
}

function AppContent({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log startup info on client side
    if (typeof window !== 'undefined') {
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
      
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
      console.log('%cApp Status: Running', 'color: #10b981');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #06b6d4');
    }
  }, []);

  return (
    <>
      <RouteLoader />
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  );
}
