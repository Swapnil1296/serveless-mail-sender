import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

/**
 * Minimal error page with no external icon deps so Next.js can always load it
 * when "missing required error components" would otherwise occur.
 */
function Error({ statusCode }: ErrorProps) {
  const is404 = statusCode === 404;
  const title = is404 ? 'Page Not Found' : 'Something went wrong';
  const message = is404
    ? 'The page you are looking for does not exist or has been moved.'
    : 'An error occurred while loading this page. Please try again.';

  return (
    <>
      <Head>
        <title>{statusCode ? `${statusCode} - ${title}` : 'Error - Project Hub'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-6 text-red-400 text-4xl" aria-hidden>
            !
          </div>
          <p className="text-cyan-400 font-mono text-6xl mb-2">{statusCode || '?'}</p>
          <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>
          <p className="text-gray-400 text-sm mb-8">{message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/30 transition-all"
            >
              Home
            </Link>
            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider bg-purple-500/20 border-2 border-purple-500/50 text-purple-300 hover:border-purple-400 hover:bg-purple-500/30 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as { statusCode?: number }).statusCode : 404;
  return { statusCode };
};

export default Error;
