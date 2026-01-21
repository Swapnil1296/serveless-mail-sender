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
      <nav className="bg-black/90 backdrop-blur-sm border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-cyan-400">
                📧 Email Sender
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-lg transition-all ${
                    router.pathname === '/'
                      ? 'bg-cyan-600 text-white'
                      : 'text-cyan-300 hover:bg-cyan-900/30'
                  }`}
                >
                  Send Emails
                </Link>
                <Link
                  href="/logs"
                  className={`px-4 py-2 rounded-lg transition-all ${
                    router.pathname === '/logs'
                      ? 'bg-cyan-600 text-white'
                      : 'text-cyan-300 hover:bg-cyan-900/30'
                  }`}
                >
                  View Logs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
