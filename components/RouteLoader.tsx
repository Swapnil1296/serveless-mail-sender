import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SciFiLoader from '@/components/SciFiLoader';

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
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      role="status"
      aria-live="polite"
      aria-label="Page loading"
    >
      {/* Slim progress bar at top */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex-shrink-0">
        <div
          className="h-full w-1/3 bg-white/80 animate-[shimmer_1.5s_ease-in-out_infinite]"
          style={{ animationDirection: 'alternate' }}
        />
      </div>
      {/* Loading overlay */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <SciFiLoader label="LOADING" size="lg" />
      </div>
    </div>
  );
}
