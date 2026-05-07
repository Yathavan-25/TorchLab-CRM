'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, PlusCircle, LogOut, Flame } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const check = () => setIsAuthed(!!localStorage.getItem('token'));
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, [path]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthed(false);
    router.push('/login');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navItem = (href: string, label: string, Icon: any) => {
    const active = path === href;
    return (
      <Link
        key={href}
        href={href}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          active
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                TORCH LAB
              </span>
            </Link>
            {isAuthed && (
              <div className="hidden sm:flex items-center gap-1">
                {navItem('/dashboard', 'Dashboard', LayoutDashboard)}
                {navItem('/leads/create', 'Create Lead', PlusCircle)}
              </div>
            )}
          </div>
          {isAuthed && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
