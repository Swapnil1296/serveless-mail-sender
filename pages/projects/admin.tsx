import Head from 'next/head';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { getAuthHeaders } from '@/lib/api';
import { PROJECT_SLUGS } from '@/lib/constants';
import { Settings, Save, Loader2, Shield, User as UserIcon, KeyRound } from 'lucide-react';

const PROJECT_LABELS: Record<string, string> = {
  'email-sender': 'Email',
  'interview-prep': 'Interview Prep',
  'interview-quiz': 'Interview Quiz',
  'format-converter': 'Format Converter',
  'resume-creator': 'Resume',
  'quiz-hub': 'Quiz',
  'naukari-scraper': 'Naukri Scraper',
  'expense-tracker': 'Expense Tracker',
};

interface ApiUser {
  id: string;
  username: string;
  email: string;
  role: string;
  visibleProjects: string[];
  createdAt: string;
}

export default function AdminPage() {
  const { refreshUser } = useAuth();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<string, string[]>>({});
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/users', { headers: getAuthHeaders() });
        if (!res.ok) throw new Error(res.status === 403 ? 'Forbidden' : 'Failed to load users');
        const data = await res.json();
        setUsers(data.users || []);
        setDirty({});
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleToggle = (userId: string, slug: string, current: string[]) => {
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    setDirty((d) => ({ ...d, [userId]: next }));
  };

  const saveVisibility = async (userId: string) => {
    const visibleProjects = dirty[userId];
    if (visibleProjects === undefined) return;
    setSavingId(userId);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ visibleProjects }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const data = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, visibleProjects: data.user.visibleProjects } : u)));
      setDirty((d) => {
        const next = { ...d };
        delete next[userId];
        return next;
      });
      await refreshUser();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setSavingId(null);
    }
  };

  const userList = users.filter((u) => u.role === 'user');
  const adminList = users.filter((u) => u.role === 'admin');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword.length < 8) return;
    setChangePasswordMessage(null);
    setChangePasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setChangePasswordMessage('success');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setChangePasswordMessage('error');
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <Head>
        <title>Admin | Project Hub</title>
      </Head>
      <div className="min-h-screen bg-black text-white font-mono p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/50">
              <Settings className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                Admin
              </h1>
              <p className="text-slate-400 text-sm">Manage user visibility and access</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 py-2 px-3 bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded">
              {error}
            </div>
          )}

          {/* Change my password (admin) */}
          <section className="mb-8">
            <button
              type="button"
              onClick={() => setShowChangePassword((v) => !v)}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300"
            >
              <KeyRound className="w-4 h-4" /> Change my password
            </button>
            {showChangePassword && (
              <form onSubmit={handleChangePassword} className="mt-3 p-4 rounded-lg border border-cyan-500/30 bg-slate-900/50 max-w-sm space-y-3">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm placeholder-slate-500"
                  required
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min 8 characters)"
                  minLength={8}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  disabled={changePasswordLoading}
                  className="px-3 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold uppercase disabled:opacity-50"
                >
                  {changePasswordLoading ? 'Saving...' : 'Update password'}
                </button>
                {changePasswordMessage === 'success' && (
                  <p className="text-green-400 text-sm">Password updated.</p>
                )}
              </form>
            )}
          </section>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
          ) : (
            <>
              {adminList.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Admins
                  </h2>
                  <div className="rounded-lg border border-cyan-500/30 bg-slate-900/50 p-4 space-y-2">
                    {adminList.map((u) => (
                      <div key={u.id} className="flex items-center gap-2 text-slate-300">
                        <UserIcon className="w-4 h-4 text-cyan-400" />
                        <span>{u.username}</span>
                        <span className="text-cyan-400/80 text-xs">(full access)</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Users & visibility
                </h2>
                {userList.length === 0 ? (
                  <p className="text-slate-500 text-sm">No users yet. Users sign up via the Sign up page.</p>
                ) : (
                  <div className="space-y-4">
                    {userList.map((u) => {
                      const visible = dirty[u.id] !== undefined ? dirty[u.id] : u.visibleProjects;
                      const isDirty = JSON.stringify(visible) !== JSON.stringify(u.visibleProjects);
                      return (
                        <div
                          key={u.id}
                          className="rounded-lg border border-slate-600 bg-slate-900/50 p-4 sm:p-5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div>
                              <span className="font-semibold text-white">{u.username}</span>
                              <span className="text-slate-500 text-sm ml-2">{u.email}</span>
                            </div>
                            {isDirty && (
                              <button
                                type="button"
                                onClick={() => saveVisibility(u.id)}
                                disabled={savingId === u.id}
                                className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase disabled:opacity-50"
                              >
                                {savingId === u.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Save className="w-3.5 h-3.5" />
                                )}
                                Save
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {PROJECT_SLUGS.map((slug) => (
                              <label
                                key={slug}
                                className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 hover:text-white"
                              >
                                <input
                                  type="checkbox"
                                  checked={visible.includes(slug)}
                                  onChange={() => handleToggle(u.id, slug, visible)}
                                  className="rounded border-cyan-500/50 bg-slate-800 text-cyan-500 focus:ring-cyan-400"
                                />
                                {PROJECT_LABELS[slug] || slug}
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
