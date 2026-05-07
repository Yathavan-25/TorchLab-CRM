/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Flame, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setEmail(isRegister ? '' : '');
    setPassword(isRegister ? '' : '');
    setName('');
    setError('');
    setMessage('');
  }, [isRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const url = isRegister
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';
    const payload = isRegister ? { name, email, password } : { email, password };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        if (isRegister) {
          setMessage('Registration successful! You can now sign in.');
          setIsRegister(false);
        } else {
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : err));
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition';

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50/50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {isRegister ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {isRegister ? 'Join Torch Lab CRM today' : 'Sign in to Torch Lab CRM'}
              </p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
                  !isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
                  isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Register
              </button>
            </div>

            {!isRegister && (
              <div className="mb-5 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-700">
                <span className="font-semibold">Test credentials:</span>{' '}
                admin@example.com / password123
              </div>
            )}

            {error && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-700">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  placeholder="Your name"
                />
              )}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="Email address"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition cursor-pointer"
              >
                {isRegister ? 'Create account' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
