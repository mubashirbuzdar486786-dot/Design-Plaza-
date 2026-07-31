import React from 'react';
import { TESTIMONIALS } from '../data/templates';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
          Verified Client Reviews
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
          Loved by CEOs, Founders & Business Leaders
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {TESTIMONIALS.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Client
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic font-light">
                "{test.text}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
              <img
                src={test.avatar}
                alt={test.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <p className="text-xs font-bold text-white">{test.name}</p>
                <p className="text-[10px] text-slate-400">{test.role}, {test.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
