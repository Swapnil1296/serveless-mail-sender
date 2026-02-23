import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LogOut, MoreVertical } from 'lucide-react';
import RouteLoader from '@/components/RouteLoader';
import ErrorBoundary from '@/components/ErrorBoundary';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const navLinks = [
  { href: '/projects/email-sender', paths: ['/projects/email-sender', '/projects/email-logs'], icon: '📧', label: 'Email' },
  { href: '/projects/interview-prep', paths: ['/projects/interview-prep'], icon: '📝', label: 'Interview' },
  { href: '/projects/format-converter', paths: ['/projects/format-converter'], icon: '🔄', label: 'Converter' },
  { href: '/projects/resume-creator', paths: ['/projects/resume-creator'], icon: '📄', label: 'Resume' },
  { href: '/projects/quiz-hub', paths: ['/projects/quiz-hub'], icon: '📋', label: 'Quiz' },
];

function NavLink({
  href,
  paths,
  icon,
  label,
  isActive,
  onClick,
  compact = false,
}: {
  href: string;
  paths: string[];
  icon: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  const base =
    'relative rounded-lg font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2';
  const active =
    'bg-cyan-600/30 text-white border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]';
  const inactive =
    'text-gray-200 border border-slate-600 hover:text-white hover:border-cyan-500 hover:bg-slate-700/50';
  const size = compact
    ? 'px-4 py-3 text-sm w-full justify-start'
    : 'px-3 py-2 text-xs sm:text-sm justify-center';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${isActive ? active : inactive} ${size}`}
    >
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" aria-hidden />
      )}
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function Navigation() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only show navigation on project pages
  const isProjectPage = router.pathname.startsWith('/projects/');

  const closeModal = () => setModalOpen(false);
  const toggleModal = () => setModalOpen((o) => !o);

  // Close modal on route change
  useEffect(() => {
    setModalOpen(false);
  }, [router.pathname]);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [modalOpen]);

  if (!isProjectPage || !isAuthenticated) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 group-hover:border-cyan-400/60 transition-colors">
              <span className="text-lg sm:text-xl">🚀</span>
            </div>
            <div>
              <span className="block text-sm sm:text-base font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                PROJECT HUB
              </span>
              <span className="block text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest">
                {user?.username}
              </span>
            </div>
          </Link>

          {/* Desktop: Inline nav links (xl+) */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={link.paths.includes(router.pathname)}
              />
            ))}
          </div>

          {/* Right: Menu button (lg-xl) or full nav (xl+) + Logout */}
          <div className="flex items-center gap-2">
            {/* Menu button - shows on lg when nav is hidden, always on mobile */}
            <div ref={menuRef} className="relative xl:hidden">
              <button
                type="button"
                onClick={toggleModal}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-600/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label={modalOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={modalOpen}
                aria-haspopup="true"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Desktop dropdown (lg only, xl has inline nav) */}
              <div
                className={`hidden lg:block xl:hidden absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-600/60 bg-slate-900/98 backdrop-blur-md shadow-xl py-2 z-[9999] transition-all duration-200 ${
                  modalOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="px-2 space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      {...link}
                      isActive={link.paths.includes(router.pathname)}
                      compact
                      onClick={closeModal}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 hover:text-red-300 border border-slate-600/60 hover:border-red-500/40 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-slate-900/98 backdrop-blur-xl border-l border-slate-600/60 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            modalOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-6 pb-8 px-4 space-y-2">
            <p className="text-xs uppercase tracking-widest text-slate-500 px-4 mb-4">Navigate</p>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={link.paths.includes(router.pathname)}
                compact
                onClick={closeModal}
              />
            ))}
            <button
              onClick={() => {
                closeModal();
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-red-300 border border-slate-600/60 hover:border-red-500/40 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
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
      <PWAInstallPrompt />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
