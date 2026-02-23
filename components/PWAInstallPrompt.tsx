'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const STORAGE_KEY = 'pwa_install_dismissed';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(!!ios);

    if (ios && !localStorage.getItem(STORAGE_KEY)) {
      setShowPrompt(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowPrompt(false);
      setDeferredPrompt(null);
    }
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[100] p-4 rounded-xl bg-black/95 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-cyan-300 text-sm uppercase tracking-wider mb-1">
            Install App
          </h3>
          <p className="text-gray-400 text-xs">
            {isIOS
              ? 'Add to home screen for a better experience'
              : 'Install for offline access and faster loading'}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded text-gray-500 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Install
          </button>
        )}
        {isIOS && (
          <p className="text-xs text-cyan-400">
            Tap <span className="font-bold">Share</span> → <span className="font-bold">Add to Home Screen</span>
          </p>
        )}
        <button
          onClick={handleDismiss}
          className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider border border-cyan-500/50 text-cyan-300 hover:border-cyan-400 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}
