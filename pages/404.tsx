import Head from 'next/head';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Project Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 mb-6">
            <Search className="w-12 h-12 text-cyan-400" />
          </div>
          <p className="text-cyan-400 font-mono text-6xl mb-2">404</p>
          <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-gray-400 text-sm mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
