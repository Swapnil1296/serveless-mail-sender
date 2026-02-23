import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import RouteLoader from '@/components/RouteLoader';

const navLinks = [
  { href: '/projects/email-sender', paths: ['/projects/email-sender', '/projects/email-logs'], icon: '📧', label: 'Email' },
  { href: '/projects/interview-prep', paths: ['/projects/interview-prep'], icon: '📝', label: 'Interview' },
  { href: '/projects/format-converter', paths: ['/projects/format-converter'], icon: '🔄', label: 'Converter' },
  { href: '/projects/resume-creator', paths: ['/projects/resume-creator'], icon: '📄', label: 'Resume' },
  { href: '/projects/quiz-hub', paths: ['/projects/quiz-hub'], icon: '📋', label: 'Quizs' },
];

function NavLink({ href, paths, icon, label, isActive, onClick }: {
  href: string; paths: string[]; icon: string; label: string; isActive: boolean; onClick?: () => void;
}) {
  const activeClass = isActive
    ? 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white border-2 border-cyan-400/50'
    : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-cyan-400/50';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all overflow-hidden group w-full sm:w-auto text-center sm:text-left ${activeClass}`}
    >
      <span className="relative z-10 flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    </Link>
  );
}

function Navigation() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Only show navigation on project pages
  const isProjectPage = router.pathname.startsWith('/projects/');

  const closeModal = () => setModalOpen(false);
  const toggleModal = () => setModalOpen((o) => !o);

  // Close modal on route change
  useEffect(() => {
    setModalOpen(false);
  }, [router.pathname]);

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

          {/* Mobile: Hamburger button */}
          <button
            type="button"
            onClick={toggleModal}
            className="lg:hidden p-2.5 rounded-lg border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400/70 hover:text-cyan-200 transition-all"
            aria-label={modalOpen ? 'Close menu' : 'Open menu'}
          >
            {modalOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop: Inline nav links */}
          <div className="hidden lg:flex gap-2 xl:gap-4 flex-wrap">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={link.paths.includes(router.pathname)}
              />
            ))}
            <button
              onClick={logout}
              className="relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all overflow-hidden group text-red-300 border-2 border-red-500/30 hover:border-red-400/50 hover:text-red-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Collapsible modal overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
          aria-hidden="true"
        />

        {/* Modal panel - slide from right, mobile-first */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-xs bg-black/95 border-l-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col transition-transform duration-300 ease-out ${
            modalOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
          <div className="relative flex flex-col gap-2 p-4 pt-16">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={link.paths.includes(router.pathname)}
                onClick={closeModal}
              />
            ))}
            <button
              onClick={() => {
                closeModal();
                logout();
              }}
              className="relative px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all overflow-hidden group text-red-300 border-2 border-red-500/30 hover:border-red-400/50 hover:text-red-200 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
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
