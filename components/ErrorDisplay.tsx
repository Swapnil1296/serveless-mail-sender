import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
  compact?: boolean;
}

export default function ErrorDisplay({
  message = 'Failed to load. Please try again.',
  onRetry,
  title = 'Something went wrong',
  compact = false,
}: ErrorDisplayProps) {
  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center justify-center p-6 text-center'
          : 'min-h-[200px] flex flex-col items-center justify-center p-8 text-center'
      }
    >
      <div
        className={
          compact
            ? 'inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4'
            : 'inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4'
        }
      >
        <AlertTriangle className={compact ? 'w-6 h-6 text-red-400' : 'w-8 h-8 text-red-400'} />
      </div>
      <h3 className={compact ? 'text-sm font-bold text-white mb-1' : 'text-lg font-bold text-white mb-2'}>
        {title}
      </h3>
      <p className={compact ? 'text-xs text-gray-400 mb-4' : 'text-sm text-gray-400 mb-6'}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/30 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
