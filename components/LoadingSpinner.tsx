interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 border-2',
  md: 'w-12 h-12 border-3',
  lg: 'w-20 h-20 border-4',
};

export default function LoadingSpinner({
  size = 'md',
  label,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={wrapperClass}>
      <div className="inline-block relative">
        <div
          className={`${sizeClasses[size]} border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin`}
        />
      </div>
      {label && (
        <p className="text-cyan-300 mt-4 font-bold uppercase tracking-wider text-sm">{label}</p>
      )}
    </div>
  );
}
