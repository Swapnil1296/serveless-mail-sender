import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) {
      router.replace('/');
      return;
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | Project Hub</title>
      </Head>
      <div className="min-h-screen bg-black/95 flex items-center justify-center p-4 font-mono">
        <div className="bg-black border-2 border-cyan-500/30 p-8 max-w-md w-full relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-cyan-500/50 relative mb-6">
              <div className="absolute inset-0 bg-cyan-400/10 animate-pulse" />
              <Lock className="w-10 h-10 text-cyan-400 relative z-10" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Login</h1>
            <p className="text-cyan-400/50 text-xs mt-2 tracking-widest uppercase">Enter your credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="py-2 px-3 bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-cyan-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">
                Username or email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-cyan-500/5 border border-cyan-500/30 text-white text-sm placeholder-cyan-500/20 focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="Username or email"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-cyan-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-cyan-500/5 border border-cyan-500/30 text-white text-sm placeholder-cyan-500/20 focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-cyan-500 border-2 border-cyan-400 text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-wait transition-all flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin shrink-0" aria-hidden />
              )}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-cyan-400/70 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
