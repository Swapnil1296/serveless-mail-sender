import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      {/* Progress bar */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse">
        <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-[shimmer_1s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Loading overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            {/* Outer spinning ring */}
            <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-cyan-300 mt-6 font-bold uppercase tracking-wider text-lg">
            Loading<span className="animate-pulse">...</span>
          </p>
        </div>
      </div>
    </div>
  );
}
