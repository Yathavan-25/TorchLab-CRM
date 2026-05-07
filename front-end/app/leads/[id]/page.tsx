'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, MessageSquarePlus, User } from 'lucide-react';

interface Note { _id: string; content: string; createdBy: string; createdAt: string; }

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lead, setLead] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCreator, setNewNoteCreator] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [status, setStatus] = useState('');
  const [dealValue, setDealValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    (async () => {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setLead(data);
      setName(data.leadName); setCompany(data.companyName); setEmail(data.email);
      setPhone(data.phoneNumber); setSource(data.leadSource);
      setSalesperson(data.assignedSalesperson); setStatus(data.status); setDealValue(data.dealValue);
    })();
    (async () => {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setNotes(await res.json());
    })();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        leadName: name, companyName: company, email, phoneNumber: phone,
        leadSource: source, assignedSalesperson: salesperson, status,
        dealValue: Number(dealValue),
      }),
    });
    alert('Lead updated successfully');
    router.push('/dashboard');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: newNoteContent, createdBy: newNoteCreator }),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes([...notes, data]);
      setNewNoteContent(''); setNewNoteCreator('');
    }
  };

  if (!lead) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">Loading…</div>
      </>
    );
  }

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition';
  const labelCls = 'block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4 transition">
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Lead</h1>
          <p className="text-sm text-slate-500 mt-1 mb-8">Update details and track conversations.</p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Edit form */}
            <form onSubmit={handleUpdate} className="lg:col-span-3 bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className={labelCls}>Name</label><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Company</label><input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} /></div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                    <option>New</option><option>Contacted</option><option>Qualified</option>
                    <option>Proposal Sent</option><option>Won</option><option>Lost</option>
                  </select>
                </div>
                <div><label className={labelCls}>Deal Value</label><input type="number" value={dealValue} onChange={(e) => setDealValue(e.target.value)} className={inputCls} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>

            {/* Notes */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Internal Notes</h2>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {notes.map((n) => (
                    <div key={n._id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-800 leading-relaxed">{n.content}</p>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                        <User className="w-3 h-3" /> {n.createdBy} · {new Date(n.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <div className="text-sm text-slate-400 text-center py-8">No notes yet.</div>
                  )}
                </div>
              </div>

              <form onSubmit={handleAddNote} className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <MessageSquarePlus className="w-4 h-4 text-indigo-500" /> Add a note
                </h3>
                <textarea
                  required value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={3} placeholder="Write a note…" className={inputCls}
                />
                <input
                  required value={newNoteCreator} onChange={(e) => setNewNoteCreator(e.target.value)}
                  placeholder="Your name" className={inputCls}
                />
                <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition cursor-pointer">
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
