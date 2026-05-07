import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-linear-to-b from-white via-indigo-50/40 to-white flex items-center justify-center">
      {/* decorative blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-600 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          The modern CRM for ambitious teams
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
          Manage leads & deals with{' '}
          <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            TORCH LAB
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          The simple, intuitive CRM platform built to help sales teams track,
          qualify, and convert leads into long-term customers.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
