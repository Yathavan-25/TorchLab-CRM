/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  Users, TrendingUp, DollarSign, Trophy, Search, Plus, Pencil, Trash2,
} from 'lucide-react';

interface DashboardData {
  totalLeads: number; newLeads: number; qualifiedLeads: number;
  wonLeads: number; lostLeads: number; totalDealValue: number; totalWonValue: number;
}
interface Lead {
  _id: string; leadName: string; companyName: string; email: string;
  phoneNumber: string; leadSource: string; assignedSalesperson: string;
  status: string; dealValue: number;
}

const statusStyles: Record<string, string> = {
  New: 'bg-sky-50 text-sky-700 ring-sky-200',
  Contacted: 'bg-amber-50 text-amber-700 ring-amber-200',
  Qualified: 'bg-violet-50 text-violet-700 ring-violet-200',
  'Proposal Sent': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  Won: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Lost: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    (async () => {
      try {
        const resStats = await fetch('http://localhost:5000/api/leads/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(await resStats.json());
        const resLeads = await fetch('http://localhost:5000/api/leads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const leadData = await resLeads.json();
        setLeads(leadData);
        setFilteredLeads(leadData);
      } catch (err) { console.error(err); }
    })();
  }, [router]);

  useEffect(() => {
    let result = leads;
    if (statusFilter) result = result.filter(l => l.status === statusFilter);
    if (sourceFilter) result = result.filter(l => l.leadSource === sourceFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.leadName.toLowerCase().includes(q) ||
        l.companyName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q));
    }
    setFilteredLeads(result);
  }, [statusFilter, sourceFilter, search, leads]);

  const deleteLead = async (id: string) => {
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to delete this lead?')) {
      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(leads.filter(l => l._id !== id));
    }
  };

  const stats = [
    { label: 'Total Leads', value: data?.totalLeads ?? 0, icon: Users, color: 'from-sky-500 to-indigo-500' },
    { label: 'Qualified', value: data?.qualifiedLeads ?? 0, icon: TrendingUp, color: 'from-violet-500 to-fuchsia-500' },
    { label: 'Pipeline Value', value: `$${(data?.totalDealValue ?? 0).toLocaleString()}`, icon: DollarSign, color: 'from-amber-500 to-orange-500' },
    { label: 'Won Value', value: `$${(data?.totalWonValue ?? 0).toLocaleString()}`, icon: Trophy, color: 'from-emerald-500 to-teal-500' },
  ];

  const selectCls = 'px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Track every lead through the pipeline.</p>
            </div>
            <Link href="/leads/create" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition">
              <Plus className="w-4 h-4" /> New Lead
            </Link>
          </div>

          {/* Stats */}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="relative overflow-hidden bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-linear-to-br ${s.color} opacity-10`} />
                  <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg shadow-slate-900/5 mb-3`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {data && (
            <div className="bg-white border border-slate-200/70 rounded-2xl p-5 mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="text-slate-500">Pipeline:</span>
              <span><span className="font-semibold text-slate-900">{data.newLeads}</span> <span className="text-slate-500">New</span></span>
              <span><span className="font-semibold text-slate-900">{data.qualifiedLeads}</span> <span className="text-slate-500">Qualified</span></span>
              <span><span className="font-semibold text-emerald-600">{data.wonLeads}</span> <span className="text-slate-500">Won</span></span>
              <span><span className="font-semibold text-rose-600">{data.lostLeads}</span> <span className="text-slate-500">Lost</span></span>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="relative flex-1 min-w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text" placeholder="Search by name, company, email…"
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectCls}>
              <option value="">All Statuses</option>
              <option>New</option><option>Contacted</option><option>Qualified</option>
              <option>Proposal Sent</option><option>Won</option><option>Lost</option>
            </select>
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className={selectCls}>
              <option value="">All Sources</option>
              <option>Website</option><option>LinkedIn</option><option>Referral</option><option>Cold Email</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3.5">Name</th>
                    <th className="px-6 py-3.5">Company</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Value</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{lead.leadName}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{lead.companyName}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[lead.status] ?? 'bg-slate-50 text-slate-700 ring-slate-200'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">${lead.dealValue?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/leads/${lead._id}`} className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => deleteLead(lead._id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">No leads match your filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
