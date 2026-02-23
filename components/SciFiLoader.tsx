interface SciFiLoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export default function SciFiLoader({ label = 'PROCESSING', size = 'md' }: SciFiLoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizeClasses[size]} relative`} aria-hidden>
        {/* Outer hex frame */}
        <div
          className="absolute inset-0 border-2 border-cyan-500/60 rounded-sm rotate-45"
          style={{ boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
        />
        {/* Rotating inner gear ring */}
        <div
          className="absolute inset-1 border border-cyan-400/80 rounded-sm rotate-45 animate-spin"
          style={{
            borderStyle: 'dashed',
            animationDuration: '2s',
            boxShadow: 'inset 0 0 10px rgba(6,182,212,0.2)',
          }}
        />
        {/* Corner brackets */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        {/* Scanning line */}
        <div
          className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center animate-sciFi-scan"
        />
        {/* Center pulse */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-sciFi-pulse"
        />
      </div>
      {label && (
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <p className="text-cyan-300 font-mono text-xs font-bold uppercase tracking-[0.3em]">
            {label}
          </p>
          <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
    </div>
  );
}
