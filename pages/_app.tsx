import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LogOut, MoreVertical, X } from 'lucide-react';
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
    'text-slate-200 border border-slate-600 hover:text-white hover:border-cyan-500 hover:bg-slate-700/50';
  const size = compact
    ? 'px-4 py-3.5 text-sm w-full justify-start min-h-[48px] font-mono'
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

const DRAWER_DURATION_MS = 300;

function Navigation() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerExiting, setDrawerExiting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show navigation on project pages
  const isProjectPage = router.pathname.startsWith('/projects/');

  const closeModal = () => setModalOpen(false);
  const toggleModal = () => setModalOpen((o) => !o);

  // Mobile drawer: open animation (start closed, then animate in)
  useEffect(() => {
    if (modalOpen && !drawerExiting) {
      setDrawerVisible(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawerVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [modalOpen, drawerExiting]);

  // Mobile drawer: close animation (keep mounted until transition ends)
  useEffect(() => {
    if (!modalOpen && (drawerVisible || drawerExiting)) {
      setDrawerExiting(true);
    }
  }, [modalOpen]);
  useEffect(() => {
    if (!drawerExiting) return;
    const id = setTimeout(() => {
      setDrawerExiting(false);
      setDrawerVisible(false);
    }, DRAWER_DURATION_MS);
    return () => clearTimeout(id);
  }, [drawerExiting]);

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

  const showDrawer = modalOpen || drawerExiting;
  const drawerOpen = drawerVisible && !drawerExiting;

  const mobileDrawerContent = (
    <div
      className={`fixed inset-0 lg:hidden transition-opacity duration-300 ease-out ${
        drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 2147483647 }}
      aria-hidden={!drawerOpen}
    >
      <div
        className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
          drawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: 'inset 0 0 80px rgba(6,182,212,0.03)' }}
        onClick={closeModal}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 z-10 h-full w-full max-w-[280px] sm:max-w-xs flex flex-col transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
          borderLeft: '2px solid rgba(6,182,212,0.6)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.08)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/90 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/80 via-cyan-500/40 to-transparent" />
        <div className="relative pt-6 pb-8 px-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/90 px-2 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM NAV
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              isActive={link.paths.includes(router.pathname)}
              compact
              onClick={closeModal}
            />
          ))}
          <div className="mt-4 pt-4 border-t border-cyan-500/20">
            <button
              type="button"
              onClick={() => {
                closeModal();
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider text-slate-200 bg-slate-800/90 hover:bg-red-950/80 border border-slate-600 hover:border-red-500/60 transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <nav
      className={`sticky top-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-z-index ${
        modalOpen ? 'z-[100000]' : 'z-50'
      }`}
    >
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

              {/* Desktop dropdown (lg only, xl has inline nav) - sci-fi style */}
              <div
                className={`hidden lg:block xl:hidden absolute right-0 top-full mt-2 w-56 rounded-lg overflow-hidden z-[9999] transition-all duration-300 ease-out ${
                  modalOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
                  border: '1px solid rgba(6,182,212,0.5)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(6,182,212,0.1)',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/90 to-transparent" />
                <div className="px-3 py-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/90 mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    SYSTEM NAV
                  </p>
                  <div className="space-y-1.5">
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
                  <div className="mt-3 pt-3 border-t border-cyan-500/20">
                    <button
                      type="button"
                      onClick={() => {
                        closeModal();
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono font-bold uppercase tracking-wider text-slate-200 bg-slate-800/90 hover:bg-red-950/80 border border-slate-600 hover:border-red-500/60 transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
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

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
    </nav>
    {mounted && showDrawer && typeof document !== 'undefined' && createPortal(mobileDrawerContent, document.body)}
    </>
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
