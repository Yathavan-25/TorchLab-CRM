'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateLeadPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('Website');
  const [salesperson, setSalesperson] = useState('');
  const [status, setStatus] = useState('New');
  const [dealValue, setDealValue] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const payload = {
        leadName: name, companyName: company, email, phoneNumber: phone,
        leadSource: source, assignedSalesperson: salesperson, status,
        dealValue: Number(dealValue),
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push('/dashboard');
      else { const d = await res.json(); setError(d.message); }
    } catch { setError('Network error'); }
  };

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition';
  const labelCls = 'block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4 transition">
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create New Lead</h1>
          <p className="text-sm text-slate-500 mt-1 mb-8">Add a new opportunity to your pipeline.</p>

          {error && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Company</label>
                <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Source</label>
                <select value={source} onChange={(e) => setSource(e.target.value)} className={inputCls}>
                  <option>Website</option><option>LinkedIn</option><option>Referral</option><option>Cold Email</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Assigned Salesperson</label>
                <input type="text" value={salesperson} onChange={(e) => setSalesperson(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                  <option>New</option><option>Contacted</option><option>Qualified</option>
                  <option>Proposal Sent</option><option>Won</option><option>Lost</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Estimated Deal Value ($)</label>
                <input type="number" value={dealValue} onChange={(e) => setDealValue(e.target.value)} className={inputCls} />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition">
                Cancel
              </Link>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition cursor-pointer">
                Create Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
